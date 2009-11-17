<?php
/**
 * wCMF - wemove Content Management Framework
 * Copyright (C) 2005-2009 wemove digital solutions GmbH
 *
 * Licensed under the terms of any of the following licenses 
 * at your choice:
 *
 * - GNU Lesser General Public License (LGPL)
 *   http://www.gnu.org/licenses/lgpl.html
 * - Eclipse Public License (EPL)
 *   http://www.eclipse.org/org/documents/epl-v10.php
 *
 * See the license.txt file distributed with this work for 
 * additional information.
 *
 * $Id$
 */
require_once(BASE."wcmf/lib/core/class.WCMFException.php");
require_once(BASE."wcmf/lib/util/class.ObjectFactory.php");
require_once(BASE."wcmf/lib/util/class.Message.php");
require_once(BASE."wcmf/lib/util/class.FormUtil.php");
require_once(BASE."wcmf/lib/util/class.FileUtil.php");
require_once(BASE."wcmf/lib/presentation/class.View.php");
require_once(BASE."wcmf/lib/presentation/format/class.Formatter.php");
require_once(BASE."wcmf/lib/presentation/class.WCMFInifileParser.php");
require_once(BASE."wcmf/lib/model/class.NodeUtil.php");
require_once(BASE."wcmf/lib/i18n/class.Localization.php");
require_once(BASE."wcmf/lib/security/class.RightsManager.php");
require_once(BASE."wcmf/lib/util/class.Obfuscator.php");
require_once(BASE."wcmf/lib/util/class.Log.php");

/**
 * @class DionysosControllerDelegate
 * @ingroup Presentation
 * @brief DionysosControllerDelegate maps wCMF request/response data in a 
 * Dionysos compliant way.
 *
 * @author ingo herwig <ingo@wemove.com>
 */
class DionysosControllerDelegate
{
  /**
   * @see ControllerDelegate::postInitialize()
   */
  function postInitialize(&$controller) 
  {
    $request = &$controller->_request;
    $response = &$controller->_response;
    
    // always return dionysos json format
    $response->setFormat('Dionysos');
    
    // do controller/action specific value mappings
    switch ($request->getAction())
    {
      case 'dologin':
        $request->setValue('login', $request->getValue('user'));
        break;
    }
  }
  /**
   * @see ControllerDelegate::validate()
   */
  function validate(&$controller) 
  { 
    return true;
  }
  /**
   * @see ControllerDelegate::preExecute()
   */
  function preExecute(&$controller) 
  {
  }
  /**
   * @see ControllerDelegate::postExecute()
   */
  function postExecute(&$controller, $result) 
  {
    $request = &$controller->_request;
    $response = &$controller->_response;

    // add the request data to the response
    $requestData = $request->getData();
    foreach ($requestData as $key => $value) {
      $response->setValue($key, $value);
    }
    
    // do controller/action specific value mappings
    switch ($request->getAction())
    {
      case 'dologin':
        $authUser = &RightsManager::getInstance()->getAuthUser();
        if ($authUser) {
          $roles = $authUser->getRoles();
          $roleNames = array();
          for($i=0, $numRoles=sizeof($roles); $i<$numRoles; $i++) {
            $roleNames[] = $roles[$i]->getName();
          }
          $response->setValue('roles', $roleNames);
          $response->setValue('implementedPackages', array('base'));
        }
        else {
          $response->setValue('errorCode', 'AUTHENTICATION_FAILED');
        }
        break;
    }
    
    return $result;
  }
  /**
   * @see ControllerDelegate::assignAdditionalViewValues()
   */  
  function assignAdditionalViewValues(&$controller) 
  {
  }
}
?>
