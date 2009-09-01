<?php
/*
 * Copyright (c) 2009 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 * 
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code,
 * this entire header must remain intact.
 */

/**
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Tue Sep 01 17:10:00 CEST 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
 require_once(BASE."wcmf/lib/presentation/class.Controller.php");
// PROTECTED REGION ID(application/include/controller/class.DisplayByAliasController.php/Import) ENABLED START
require_once (BASE."wcmf/lib/persistence/class.PersistenceFacade.php");
require_once (BASE."wcmf/lib/model/class.Node.php");
require_once (BASE."wcmf/lib/model/class.NodeUtil.php");
// PROTECTED REGION END

/**
 * @class DisplayByAliasController
 * @ingroup Controller
 * @brief @class DisplayByAliasController
 * @ingroup Controller
 * @brief Returns all data of a given list of aliases. 
 * <b>Input actions:</b> - @em displayByAlias Returns all data of passed aliases. 
 * <b>Output actions:</b> - @em failure If a fatal error occurs - @em ok In any other case 
 * @param[in] aliasList Comma-separated list of aliases to display.
 * @param[out] list The data of each object referenced by an alias. 
 * 
 * The following configuration settings are defined for this controller:
 *
 * [actionmapping]
 * ??displayByAlias = DisplayByAliasController
 *
 * [views]
 * 
 * @author 
 * @version 1.0
 */
class DisplayByAliasController extends Controller
{
// PROTECTED REGION ID(application/include/controller/class.DisplayByAliasController.php/Body) ENABLED START
 	/**
	 * @see Controller::initialize()
	 */
	function initialize( & $request, & $response)
	{
		if (strlen($request->getContext()) == 0)
		{
			$request->setContext('cms');
			$response->setContext('cms');
		}
	
		parent::initialize($request, $response);
	}

	/**
	 * @see Controller::hasView()
	 */
	function hasView()
	{
		return false;
	}

	function executeKernel()
	{
		$persistenceFacade = & PersistenceFacade::getInstance();
	
		// load model
		$aliasListString = $this->_request->getValue('aliasList');
	
		$encodedAliases = explode(',', $aliasListString);
	
		$aliasTypes = array ();
	
		foreach ($encodedAliases as $currEncodedAlias) {
			list ($currType, $currAlias) = explode('::', $currEncodedAlias);
		
			if (!array_key_exists($currType, $aliasTypes)) {
				$aliasTypes[$currType] = array ();
			}
		
			array_push($aliasTypes[$currType], $currAlias);
		}

		$foundObjects = array ();
	
		foreach ($aliasTypes as $currType=>$currAliasList) {
			$query = $persistenceFacade->createObjectQuery($currType);
		
			foreach ($currAliasList as $currAlias) {
				$currTemplate = $query->getObjectTemplate($currType, QUERYOP_OR);

				$currTemplate->setValue('Alias', $currAlias, DATATYPE_ATTRIBUTE);
			}

			$currFoundObjects = $query->execute(BUILDDEPTH_SINGLE);

			$foundObjects = array_merge($foundObjects, $currFoundObjects);
		}
	
		// translate values if requested
		if ($this->_request->getValue('translateValues'))
		{
			NodeUtil::translateValues($foundObjects);
		}
	
		// assign node data
		$this->_response->setValue('list', $foundObjects);
		
		return false;
	}

// PROTECTED REGION END

}
?>
