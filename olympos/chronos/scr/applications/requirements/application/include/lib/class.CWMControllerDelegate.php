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
require_once(BASE."wcmf/lib/util/class.Log.php");

/**
 * @class CWMControllerDelegate
 * @ingroup Presentation
 * @brief CWMControllerDelegate handles request to remote CWM
 * instances.
 *
 * @author ingo herwig <ingo@wemove.com>
 */
class CWMControllerDelegate
{
	/**
	 * @see ControllerDelegate::postInitialize()
	 */
	function postInitialize(&$controller)
	{
		$request = $controller->getRequest();
		if ($request->getAction() == 'associate' || $request->getAction() == 'disassociate')
		{
			// replace remote oids by proxy oids
			$oid = $request->getValue('oid');
			$oids = $this->replaceRemoteOIDs(array($oid));
			$request->setValue('oid', join(',', $oids));
			$associateOIDs = split(',', $request->getValue('associateoids'));
			$associateOIDs = $this->replaceRemoteOIDs($associateOIDs);
			$request->setValue('associateoids', join(',', $associateOIDs));
			// tell the PersistenceFacade to not resolve proxies
			$persistenceFacade = PersistenceFacade::getInstance();
			if ($persistenceFacade instanceof RemoteCapablePersistenceFacadeImpl) {
				$persistenceFacade->setResolveProxies(false);
			}
			$controller->_request = &$request;
		}
	}
	/**
	 * @see ControllerDelegate::validate()
	 */
	function validate(&$controller)
	{
		$request = $controller->getRequest();
		if ($request->getAction() == 'save')
		{
			$requestData = $request->getData();
			if ($this->containsRemoteOID(array_keys($requestData))) {
				$controller->setErrorMsg("Remote objects are immutable.");
				return false;
			}
		}
		if ($request->getAction() == 'delete')
		{
			$deleteOIDs = split(',', $request->getValue('deleteoids'));
			if ($this->containsRemoteOID($deleteOIDs)) {
				$controller->setErrorMsg("Remote objects are immutable.");
				return false;
			}
		}
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
		$request = $controller->getRequest();
		if ($request->getAction() == 'associate' || $request->getAction() == 'disassociate')
		{
			// reset PersistenceFacade state
			$persistenceFacade = PersistenceFacade::getInstance();
			if ($persistenceFacade instanceof RemoteCapablePersistenceFacadeImpl) {
				$persistenceFacade->setResolveProxies(true);
			}
		}
		return $result;
	}
	/**
	 * @see ControllerDelegate::assignAdditionalViewValues()
	 */
	function assignAdditionalViewValues(&$controller)
	{
	}
	/**
	 * Check if a list of object ids contains a remote object id
	 * @param $oids The list of oids
	 * @return True/False
	 */
	function containsRemoteOID($oids)
	{
		foreach ($oids as $oid)
		{
			if (PersistenceFacade::isValidOID($oid))
			{
				$prefix = PersistenceFacade::getOIDParameter($oid, 'prefix');
				if (strlen($prefix) > 0) {
					return true;
				}
			}
		}
		return false;
	}
	/**
	 * Replace all remote object ids in a list by it's local proxy's oid
	 * @param $oids The list of object ids
	 * @return A list of local object ids
	 */
	function replaceRemoteOIDs($oids)
	{
		// check if the PersistenceFacade implementation is capable of 
		// resolving remote object ids
		$persistenceFacade = PersistenceFacade::getInstance();
		if (!($persistenceFacade instanceof RemoteCapablePersistenceFacadeImpl)) {
			return $oids;
		}
		// result the object ids
		$result = array();
		foreach ($oids as $oid)
		{
			if (PersistenceFacade::isValidOID($oid)) {
				$proxy = $persistenceFacade->getProxyObject($oid);
				if ($proxy) {
					$result[] = $proxy->getOID();
				}
				else {
					$result[] = $oid;
				}
			}
		}
		return $result;
	}
}
?>
