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
 * $Id: class.PagingController.php 295 2007-02-17 17:25:25Z iherwig $
 */
require_once (BASE."wcmf/lib/presentation/class.Controller.php");
require_once (BASE."wcmf/lib/util/class.Obfuscator.php");

/**
 * @class ListboxController
 * @ingroup Controller
 * @brief ListboxMultiController is a controller that uses g_getOIDs to retrieve listbox data.
 *
 * <b>Input actions:</b>
 * - unspecified: List Nodes of given type
 *
 * <b>Output actions:</b>
 * - @em ok In any case
 *
 * @param[in] type The entity type to list
 * @param[in] filter A query passed to g_getOIDs
 * @param[out] totalCount The total number of all entities that match the criteria
 * @param[out] objects An associative array with keys 'key' and 'val'
 *
 * @author 	ingo herwig <ingo@wemove.com>
 */
class ListboxMultController extends Controller
{
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
			$tradlistbox = g_getOIDs(&$val, $this->filter);
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

}

?>
