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
require_once(BASE."application/dionysos/include/lib/class.DionysosException.php");
require_once(BASE."wcmf/lib/security/class.RightsManager.php");
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
    
    // add the request data to the response
    $requestData = $request->getData();
    foreach ($requestData as $key => $value) {
      $response->setValue($key, $value);
    }
    
    // remove wcmf specific response values
    $ignoreValues = array('usr_action');
    foreach ($ignoreValues as $key) {
      $response->clearValue($key);
    }
    
    // do controller/action specific value mappings
    switch ($request->getAction())
    {
      case 'dologin':
        $request->setValue('login', $request->getValue('user'));
        break;

      case 'list':
        if ($request->getValue('offset') < 0) {
          throw new DionysosException($request, $response, DionysosException::OFFSET_OUT_OF_BOUNDS, DionysosException::OFFSET_OUT_OF_BOUNDS);
        }
        if ($request->getValue('limit') < 0) {
          throw new DionysosException($request, $response, DionysosException::LIMIT_NEGATIVE, DionysosException::LIMIT_NEGATIVE);
        }
        if (!PersistenceFacade::isKnownType($request->getValue('className'))) {
          throw new DionysosException($request, $response, DionysosException::CLASS_NAME_INVALID, DionysosException::CLASS_NAME_INVALID);
        }
        $type = PersistenceFacade::getInstance()->create($request->getValue('className'), BUILDDEPTH_SINGLE);
        if ($request->hasValue('sortFieldName') && !$type->hasValue($request->getValue('sortFieldName'))) {
          throw new DionysosException($request, $response, DionysosException::SORT_FIELD_UNKNOWN, DionysosException::SORT_FIELD_UNKNOWN);
        }
        if ($request->hasValue('sortDirection') && !in_array($request->getValue('sortDirection'), array('asc', 'desc'))) {
          throw new DionysosException($request, $response, DionysosException::SORT_DIRECTION_UNKNOWN, DionysosException::SORT_DIRECTION_UNKNOWN);
        }

        $request->setValue('type', $request->getValue('className'));
        $request->setValue('start', $request->getValue('offset'));
        $request->setValue('sort', $request->getValue('sortFieldName'));
        $request->setValue('dir', $request->getValue('sortDirection'));
        $request->setValue('completeObjects', true);
        break;

      case 'display':
        // cast to requested format
        if ($response->hasValue('depth')) {
          $response->setValue('depth', intval($response->getValue('depth')));
        }
        if ($request->hasValue('depth') && $request->getValue('depth') < -1) {
          throw new DionysosException($request, $response, DionysosException::DEPTH_INVALID, DionysosException::DEPTH_INVALID);
        }

        if (!$request->hasValue('depth')) {
          $request->setValue('depth', 1);
        }
        break;

      case 'save':
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

    // remove wcmf specific response values
    $ignoreValues = array('controller');
    foreach ($ignoreValues as $key) {
      $response->clearValue($key);
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
          throw new DionysosException($request, $response, DionysosException::AUTHENTICATION_FAILED, DionysosException::AUTHENTICATION_FAILED);
        }
        break;

       case 'list':
        $response->clearValue('type');
        $response->clearValue('start');
        $response->clearValue('sort');
        $response->clearValue('dir');
        $response->clearValue('completeObjects');

        if ($request->getValue('offset') >= $response->getValue('totalCount')) {
          $response->clearValue('list');
          throw new DionysosException($request, $response, DionysosException::OFFSET_OUT_OF_BOUNDS, DionysosException::OFFSET_OUT_OF_BOUNDS);
        }
        // cast to requested format
        if ($response->hasValue('offset')) {
          $response->setValue('offset', intval($response->getValue('offset')));
        }
        if ($response->hasValue('limit')) {
          $response->setValue('limit', intval($response->getValue('limit')));
        }
        $response->setValue('list', $response->getValue('objects'));
        $response->clearValue('objects');
        break;

       case 'display':
        $response->clearValue('rootType');
        $response->clearValue('rootTemplateNode');
        $response->clearValue('possibleparents');
        $response->clearValue('possiblechildren');
        $response->clearValue('lockMsg');
        $response->clearValue('viewMode');
        $response->setValue('object', $response->getValue('node'));
        $response->clearValue('node');
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
