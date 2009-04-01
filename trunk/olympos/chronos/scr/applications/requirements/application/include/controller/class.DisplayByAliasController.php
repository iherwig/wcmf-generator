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
 * $Id: class.DisplayController.php 929 2009-02-22 23:20:49Z iherwig $
 */
require_once (BASE."wcmf/lib/presentation/class.Controller.php");
require_once (BASE."wcmf/lib/persistence/class.PersistenceFacade.php");
require_once (BASE."wcmf/lib/model/class.Node.php");
require_once (BASE."wcmf/lib/model/class.NodeUtil.php");

class DisplayByAliasController extends Controller
{
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

}

?>
