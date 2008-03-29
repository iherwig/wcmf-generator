<?
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
 * $Id: main.php 295 2007-02-17 17:25:25Z iherwig $
 */
error_reporting(E_ERROR | E_PARSE);

/**
 * Script for inclusion of dynamic javascript files.
 * The following parameters are known:
 * file: The javascript file to include
 * initApp: 0/1 wether to initialize the wCMF application (read configuration etc.)
 *          This causes some overhead, but gives you the ability to use wCMF messages, logging
 *          etc. using php inside the js file
 */
require_once("base_dir.php");
require_once(BASE."wcmf/lib/util/class.Message.php");
require_once(BASE."wcmf/lib/util/class.URIUtil.php");

if ($_GET['initApp'] == 1)
{
  // initialize the application
  require_once(BASE."wcmf/lib/presentation/class.Application.php");
  $application = &Application::getInstance();
  $application->setupGlobals();
}

// the script url
$SCRIPT_URL = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['SCRIPT_NAME'];

// the application url (used for Ajax calls)
$APP_URL = URIUtil::makeAbsolute("main.php", $SCRIPT_URL);

// wcmf parameters
$controller = $_GET['controller'];
$context = $_GET['context'];

// deliver the requested javascript file
Header("content-type: application/x-javascript");
require_once($_GET['file']);
?>
