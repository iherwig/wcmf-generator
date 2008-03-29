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
require_once(BASE."wcmf/lib/security/class.RightsManager.php");
require_once(BASE."wcmf/lib/security/class.UserManager.php");
require_once(BASE."wcmf/lib/util/class.ObjectFactory.php");

Message::hint("initializing wCMF database tables...");

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
    
$rightsManager = &RightsManager::getInstance();
$rightsManager->deactivate();

// initialize database sequence, create default user/role
$persistenceFacade = &PersistenceFacade::getInstance();
if(sizeof($persistenceFacade->getOIDs("Adodbseq")) == 0)
{
  Message::hint("initializing database sequence...");
  $seq = $persistenceFacade->create("Adodbseq", BUILDDEPTH_SINGLE);
  $seq->setValue("id", 1);
  $seq->save();
}
$objectFactory = &ObjectFactory::getInstance();
$userManager = &$objectFactory->createInstanceFromConfig('implementation', 'UserManager');
$userManager->startTransaction();
if (sizeof($userManager->listRoles()) == 0)
{
  Message::hint("creating role with name 'administrators'...");
  $userManager->createRole("administrators");
}
if (sizeof($userManager->listUsers()) == 0)
{
  Message::hint("creating user with login 'admin' password 'admin'...");
  $userManager->createUser("Administrator", "", "admin", "admin", "admin");
  $userManager->setUserProperty("admin", USER_PROPERTY_CONFIG, "include/admin.ini");
}
$admin = $userManager->getUser("admin");
if (!$admin->hasRole('administrators'))
{
  Message::hint("adding user 'admin' to role 'administrators'...");
  $userManager->addUserToRole("administrators", "admin");
}
$userManager->commitTransaction();
Message::hint("done.");
