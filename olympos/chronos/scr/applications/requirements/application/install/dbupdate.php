<?php
/** 
 * wCMF - wemove Content Management Framework
 * Copyright (C) 2005 wemove digital solutions GmbH
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 * 
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 * 
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 *
 * $Id: main.php,v 1.3 2005/10/24 13:31:56 iherwig Exp $
 */
define("BASE", realpath ("../../")."/");
error_reporting(E_ERROR | E_PARSE);

require_once(BASE."wcmf/lib/util/class.Message.php");
require_once(BASE."wcmf/lib/output/class.LogOutputStrategy.php");
require_once(BASE."wcmf/lib/util/class.InifileParser.php");
require_once(BASE."wcmf/lib/persistence/class.PersistenceFacade.php");

Message::hint("updating wCMF database tables...");

// get configuration from file
$configFile = '../include/config.ini';
Message::hint("configuration file: ".$configFile);
$parser = &InifileParser::getInstance();
if (!$parser->parseIniFile($configFile, true))
  Message::error($parser->getErrorMsg(), __FILE__, __LINE__);
    
// message globals
$GLOBALS['MESSAGE_LOG_FILE'] = '../log/'.date($parser->getValue('logFile', 'cms'));
$GLOBALS['MESSAGE_LOG_FLUSH'] = $parser->getValue('flushLogFile', 'cms');
$GLOBALS['MESSAGE_DEBUG'] = $parser->getValue('debug', 'cms');
$GLOBALS['MESSAGE_LOCALE_DIR'] = $parser->getValue('localeDir', 'cms');
$GLOBALS['MESSAGE_LANGUAGE'] = $parser->getValue('language', 'cms');
    
// set locale
if ($GLOBALS['MESSAGE_LANGUAGE'] !== false)
  setlocale(LC_ALL, $GLOBALS['MESSAGE_LANGUAGE']);
    
// parse tables.sql
$tables = array();
$readingTable = false;
$tableDef = '';
$lines = file('tables.sql');
foreach($lines as $line)
{
  $line = trim($line);
  if(strlen($line) > 0)
  {
    // check table start
    if (preg_match('/CREATE\s+TABLE/', $line))
    {
      // table definition
      $readingTable = true;      
    }
    // add line to table definition
    if ($readingTable)
    {
      $tableDef .= $line."\n";
    }
    // check table end
    if ($readingTable && strpos($line, ';') !== false)
    {
      // end table definition
      $readingTable = false;
      processTableDef($tableDef, $tables);
      $tableDef = '';
    }
  }
}
//Message::dump($tables);

// process table definitions
$persistenceFacade = &PersistenceFacade::getInstance();
foreach ($tables as $tableDef)
{
  Message::hint(nl2br("\nprocessing table ".$tableDef['name']."..."));
  $mapper = &$persistenceFacade->getMapper($tableDef['entityType']);
  $connection = &$mapper->getConnection();
  $connection->StartTrans();
  
  if (ensureUpdateTable($connection))
  {
    $oldValue = getOldValue($connection, $tableDef['id'], null, 'table');
    $oldColumns = $connection->MetaColumns($tableDef['name']);

    // check if the table already has an update entry
    if ($oldValue == null && $oldColumns === false)
    {
      // the table has no update entry and does not exist
      createTable($connection, $tableDef);        
    }
    else
    {
      if ($oldValue != null && $oldColumns === false)
      {
        // the old table needs to be renamed
        alterTable($connection, $oldValue['table'], $tableDef['name']);
        $oldColumns = $connection->MetaColumns($tableDef['name']);
      }
      // the table has an update entry and/or exists
      updateColumns($connection, $tableDef, $oldColumns);      
    }
    // update table update entry
    updateEntry($connection, $tableDef);
  }

  if (true) $connection->FailTrans();
  $connection->CompleteTrans();
}
Message::hint("done.");


/*
 * Ensure the existance of the update table 'dbupdate'
 * @param connection The database connection
 * @return True/False
 */ 
function ensureUpdateTable(&$connection)
{
  $tables = $connection->MetaTables();
  if (!in_array('dbupdate', $tables))
  {
    $sql = $connection->Prepare('CREATE TABLE `dbupdate` (`table_id` VARCHAR(150) NOT NULL, `column_id` VARCHAR(150) NOT NULL, `type` VARCHAR(150) NOT NULL, '.
                                '`table` VARCHAR(255), `column` VARCHAR(255), `updated` DATETIME, PRIMARY KEY (`table_id`, `column_id`, `type`)) TYPE=MyISAM');
    $rs = $connection->Execute($sql);
  	if ($rs === false)
  	{
  	  Message::error('Error creating update table '.$connection->ErrorMsg(), __FILE__, __LINE__);
  	  return false;
  	}
  }
  return true;
}

/*
 * Get the existing table/column definition that is stored in the update table
 * @param connection The database connection
 * @param tableId The id of the table definition
 * @param columnId The id of the column definition (ignored for type table)
 * @param type 'table' or 'column'
 * @return An array with keys 'table' and 'column' or null if not stored
 */ 
function getOldValue(&$connection, $tableId, $columnId, $type)
{
  if ($type == 'column')
  {
    // selection for columns
    $sql = $connection->Prepare('SELECT * FROM `dbupdate` WHERE `table_id`=? AND `column_id`=? AND `type`=\'column\'');
    $rs = $connection->Execute($sql, array($tableId, $columnId));
  }
  else
  {
    // selection for tables
    $sql = $connection->Prepare('SELECT * FROM `dbupdate` WHERE `table_id`=? AND `type`=\'table\'');
    $rs = $connection->Execute($sql, array($tableId));
  }
	if ($rs !== false && $rs->RecordCount() > 0)
	{
	  $data = $rs->FetchRow();
	  return array('table' => $data['table'], 'column' => $data['column']);
	}
	if ($rs !== false)
    $rs->close();
	return null;
}

/*
 * Store a table/column definition in the update table
 * @param connection The database connection
 * @param tableId The id of the table definition
 * @param columnId The id of the column definition
 * @param type 'table' or 'column'
 * @param table The table name
 * @param column The column name
 * @return An array with keys 'table', 'column' and 'type' or null if not stored
 */ 
function updateValue(&$connection, $tableId, $columnId, $type, $table, $column)
{
  $oldValue = getOldValue($connection, $tableId, $columnId, $type);
  if ($oldValue === null)
  {
    $sql = $connection->Prepare('INSERT INTO `dbupdate` (`table_id`, `column_id`, `type`, `table`, `column`, `updated`) VALUES (?, ?, ?, ?, ?, ?)');
    $rs = $connection->Execute($sql, array($tableId, $columnId, $type, $table, $column, date("Y-m-d H:i:s")));
  }
  else
  {
    $sql = $connection->Prepare('UPDATE `dbupdate` SET `table`=?, `column`=?, `updated`=? WHERE `table_id`=? AND `column_id`=? AND `type`=?');
    $rs = $connection->Execute($sql, array($table, $column, date("Y-m-d H:i:s"), $tableId, $columnId, $type));
  }
	if ($rs === false)
    Message::error('Error inserting/updating entry '.$connection->ErrorMsg(), __FILE__, __LINE__);
}

/*
 * Store a table/column definition in the update table
 * @param connection The database connection
 * @param tableDef The table definition array as provided by processTableDef
 */ 
function updateEntry($connection, $tableDef)
{
  updateValue($connection, $tableDef['id'], '-', 'table', $tableDef['name'], '-');
  foreach ($tableDef['columns'] as $columnDef)
    if ($columnDef['id'])
      updateValue($connection, $tableDef['id'], $columnDef['id'], 'column', $tableDef['name'], $columnDef['name']);
}

/*
 * Create a table
 * @param connection The database connection
 * @param tableDef The table definition array as provided by processTableDef
 */ 
function createTable(&$connection, $tableDef)
{
  Message::hint("> create table '".$tableDef['name']."'");
  $sql = $tableDef['create'];
  $rs = $connection->Execute($sql);
	if ($rs === false)
	  Message::error('Error creating table '.$connection->ErrorMsg(), __FILE__, __LINE__);
}

/*
 * Alter a table
 * @param connection The database connection
 * @param oldName The old name
 * @param name The new name
 */ 
function alterTable(&$connection, $oldName, $name)
{
  Message::hint("> alter table '".$name."'");
  $sql = $connection->Prepare('ALTER TABLE `'.$oldName.'` RENAME `'.$name.'`');
  $rs = $connection->Execute($sql);
	if ($rs === false)
	  Message::error('Error altering table '.$connection->ErrorMsg()."\n".$sql, __FILE__, __LINE__);
}

/*
 * Create a column
 * @param connection The database connection
 * @param table The name of the table
 * @param columnDef An associative array with keys 'name' and 'type'
 */ 
function createColumn(&$connection, $table, $columnDef)
{
  Message::hint("> create column '".$table.".".$columnDef['name']);
  $sql = $connection->Prepare('ALTER TABLE `'.$table.'` ADD `'.$columnDef['name'].'` '.$columnDef['type']);
  $rs = $connection->Execute($sql);
	if ($rs === false)
	  Message::error('Error creating column '.$connection->ErrorMsg(), __FILE__, __LINE__);
}

/*
 * Alter a column
 * @param connection The database connection
 * @param table The name of the table
 * @param oldColumnDef An associative array with keys 'name' and 'type'
 * @param columnDef An associative array with keys 'name' and 'type'
 */ 
function alterColumn(&$connection, $table, $oldColumnDef, $columnDef)
{
  Message::hint("> alter column '".$table.".".$columnDef['name']);
  $sql = $connection->Prepare('ALTER TABLE `'.$table.'` CHANGE `'.$oldColumnDef['name'].'` `'.$columnDef['name'].'` '.$columnDef['type']);
  $rs = $connection->Execute($sql);
	if ($rs === false)
	  Message::error('Error altering column '.$connection->ErrorMsg()."\n".$sql, __FILE__, __LINE__);
}

/*
 * Update the columns of a table
 * @param connection The database connection
 * @param tableDef The table definition array as provided by processTableDef
 * @param columnDefs The column definitions as provided by conncetion->MetaColumns
 */ 
function updateColumns(&$connection, $tableDef, $oldColumnDefs)
{
  foreach ($tableDef['columns'] as $columnDef)
  {
    $oldValue = getOldValue($connection, $tableDef['id'], $columnDef['id'], 'column');
    if ($oldValue)
      $oldColumnDef = $oldColumnDefs[strtoupper($oldValue['column'])];
    else
      $oldColumnDef = $oldColumnDefs[strtoupper($columnDef['name'])];
    // translate oldColumnDef type
    $oldColumnType = strtoupper($oldColumnDef->type);
    if ($oldColumnDef->max_length > 0)
      $oldColumnType .= '('.$oldColumnDef->max_length.')';
    if ($oldColumnDef->not_null)
      $oldColumnType .= ' NOT NULL';
    $oldColumnDefTransl = array('name' => $oldColumnDef->name, 'type' => $oldColumnType);

    if ($oldValue === null && $oldColumnDef === null)
    {
      // the column has no update entry and does not exist
      createColumn($connection, $tableDef['name'], $columnDef);
    }
    else if (($oldValue != null && $oldValue['column'] != $columnDef['name']) || strtolower($oldColumnDefTransl['type']) != strtolower($columnDef['type']))
    {
      // ignore changes in 'not null' for primary keys ('not null' is set anyway)
      $typeDiffersInNotNull = strtolower(trim(str_replace($columnDef['type'], "", $oldColumnDefTransl['type']))) == 'not null';
      if ($typeDiffersInNotNull && in_array($columnDef['name'], $tableDef['pks']))
        continue;

      // the column has an update entry and does exist
      alterColumn($connection, $tableDef['name'], $oldColumnDefTransl, $columnDef);
    }
  }
}

/*
 * Extract table information from a sql command string
 */ 
function processTableDef($tableDef, &$tables)
{
  preg_match('/CREATE\s+TABLE\s+`(.*?)`.+entityType=(.*?)\s+tableId=(.*?)\s+\((.*)\)/s', $tableDef, $matches);
  $tableName = $matches[1];
  $entityType = $matches[2];
  $id = $matches[3];
  $tables[$tableName] = array('name' => $tableName, 'create' => $tableDef, 'entityType' => $entityType, 'id' => $id);

  // extract columns/pks
  $columns = array();
  $pks = array();
  $columnDef = split("\n", $matches[4]);
  foreach ($columnDef as $columnDef)
  {
    if (strlen(trim($columnDef)) > 0)
    {
      preg_match_all('/`(.*?)`\s+(.*?),([^`]*)/', $columnDef, $matches);
      $columnNames = $matches[1];
      $columnTypes = $matches[2];
      $comments = $matches[3];
      for($i=0; $i<sizeof($columnNames); $i++)
      {
        preg_match('/columnId=([a-zA-Z0-9\-\_\{\}]+)/', $comments[$i], $matches1);
        if ($matches1[1] == 'UNDEFINED')
          $matches1[1] = '';
        array_push($columns, array('name' => $columnNames[$i], 'type' => $columnTypes[$i], 'id' => $matches1[1]));
      }
      preg_match_all('/PRIMARY KEY \(`(.*?)`\)/', $columnDef, $matches);
      if (sizeof($matches[1]) > 0)
        $pks = preg_split('/`\s*,\s*`/', $matches[1][0]);
    }
  }
  $tables[$tableName]['pks'] = $pks;
  $tables[$tableName]['columns'] = $columns;
}
