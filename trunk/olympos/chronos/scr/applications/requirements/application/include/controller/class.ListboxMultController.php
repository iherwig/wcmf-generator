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
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Tue Jan 05 15:38:17 CET 2010. 
 * Manual modifications should be placed inside the protected regions.
 */
 require_once(BASE."wcmf/lib/presentation/class.Controller.php");
// PROTECTED REGION ID(application/include/controller/class.ListboxMultController.php/Import) ENABLED START
require_once (BASE."wcmf/lib/util/class.Obfuscator.php");

// PROTECTED REGION END

/**
 * @class ListboxMultController
 * @ingroup Controller
 * @brief @class ListboxMultController
 * @ingroup Controller
 * @brief works like traditional ListboxController but retrieves listbox data from more than one data type. 
 * <b>Input actions:</b> - @em listbox List Nodes of given types 
 * <b>Output actions:</b> - @em ok In any case 
 * @param[in] type The different entity types to list separated by comma
 * @param[in] filter A query passed to g_getOIDs
 * @param[out] totalCount The total number of all entities of all types that match the criteria
 * @param[out] objects An associative array with keys 'key' and 'val' 
 * 
 * The following configuration settings are defined for this controller:
 *
 * [actionmapping]
 * ??listbox = ListboxMultController
 *
 * [views]
 * 
 * @author 
 * @version 1.0
 */
class ListboxMultController extends Controller
{
// PROTECTED REGION ID(application/include/controller/class.ListboxMultController.php/Body) ENABLED START
	var $filter;
	var $unveiled;
	var $types;

	/**
	 * @see Controller::hasView()
	 */
	function hasView()
	{
		return false;
	}

	/**
	 * Do processing and assign Node data to View.
	 * @return False in every case.
	 * @see Controller::executeKernel()
	 */
	function executeKernel()
	{
		self::initValues();

		$counts = 0;
		$responseObjects = array ();
		foreach ($this->types as $key=>$val) {
			if ($this->isLocalizedRequest()) {
				$tradlistbox = g_getOIDs($val, $this->filter, null, false, $this->_request->getValue('language'));
			}
			else {
				$tradlistbox = g_getOIDs($val, $this->filter);
			}
		
			$counts = $counts + sizeof($tradlistbox);
			foreach ($tradlistbox as $k=>$v){
			array_push($responseObjects,array('key'=>$k, 'val'=>$v));
			}
		}
		// return
		$this->_response->setValue('totalCount', $counts);
		$this->_response->setValue('objects', $responseObjects);
	
		// success
		$this->_response->setAction('ok');
		return false;
	}

	private function initValues()
	{
		// unveil the filter value if it is ofuscated
		$this->filter = $this->_request->getValue('filter');
		$this->unveiled = Obfuscator::unveil($this->filter);
		if (strlen($this->filter) > 0 && strlen($this->unveiled) > 0)
		$this->filter = $this->unveiled;
		$this->types = array ();
		$strtypes = $this->_request->getValue('type');
		$this->types = spliti(',', $strtypes);
	}
// PROTECTED REGION END

}
?>
