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
 * $Id: main.php 599 2007-12-07 17:13:18Z iherwig $
 */
error_reporting(E_ERROR | E_PARSE);

require_once("base_dir.php");  
require_once(BASE."wcmf/lib/presentation/class.Application.php");

// initialize the application
$application = &Application::getInstance();
$callParams = &$application->initialize();

// set the error handler
$GLOBALS['MESSAGE_ERROR_HANDLER'] = "onError";

// process the requested action (we don't use the result here)
$result = ActionMapper::processAction($callParams['controller'], $callParams['context'], $callParams['action'], $callParams['data']);
exit;

/**
 * Global error handling function. Assigned to MESSAGE_ERROR_HANDLER 
 * which means it is called by Message::error()
 * @param message The error message
 * @param file The php file in which the error occured (optional)
 * @param line The line in the php file in which the error occured (optional)
 * @return The value
 */
function onError($message, $file='', $line='') 
{ 
  global $controller, $context, $action, $data, $MESSAGE_LOG_FILE;
  static $numCalled = 0;
  
  $data['errorMsg'] = $message;
  Message::log($message."\n".Message::getStackTrace(), $file, $line);
  
  // rollback current transaction
  $persistenceFacade = &PersistenceFacade::getInstance();
  $persistenceFacade->rollbackTransaction();

  // prevent recursive calls
  $numCalled++;
  if ($numCalled == 2)
  {
    ActionMapper::processAction('FailureController', '', 'fatal', $data); 
  }
  else if ($numCalled == 3)
  {
    Message::hint('FATAL. See \''.$MESSAGE_LOG_FILE.'\' for details.');
    exit;
  }
  else
  {    
    // get old contoller/context/action triple to restore application status
    $controller = Application::getCallParameter('old_controller', $controller);
    $context = Application::getCallParameter('old_context', $context);
    $action = Application::getCallParameter('old_usr_action', $action);
  
    // process old action
    ActionMapper::processAction($controller, $context, $action, $data);
  }
  exit;
}
?>
