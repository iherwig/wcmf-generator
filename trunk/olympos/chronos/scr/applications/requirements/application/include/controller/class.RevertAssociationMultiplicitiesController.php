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
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Thu Jan 13 15:13:16 CET 2011. 
 * Manual modifications should be placed inside the protected regions.
 */
 require_once(BASE."wcmf/lib/presentation/class.Controller.php");
// PROTECTED REGION ID(application/include/controller/class.RevertAssociationMultiplicitiesController.php/Import) ENABLED START
require_once (BASE."wcmf/lib/persistence/class.PersistenceFacade.php");
require_once (BASE."wcmf/lib/persistence/class.ObjectQuery.php");
//require_once (BASE."wcmf/lib/model/class.Node.php");
//require_once (BASE."wcmf/lib/security/class.RightsManager.php");
// PROTECTED REGION END

/**
 * @class RevertAssociationMultiplicitiesController
 * @ingroup Controller
 * @brief Reverts all multiplicities between ChiNodes in a given package and its subpackages.
 * 
 * <b>Input actions:</b>
 * - @em revert
 * 
 * <b>Output actions:</b>
 * - @em ok in any case
 * 
 * @param[in] oid of selected package
 * @param[out] oid of processed package
 * 
 * The following configuration settings are defined for this controller:
 *
 * [actionmapping]
 *
 * [views]
 * 
 * @author 
 * @version 1.0
 */
class RevertAssociationMultiplicitiesController extends Controller
{
// PROTECTED REGION ID(application/include/controller/class.RevertAssociationMultiplicitiesController.php/Body) ENABLED START
	/**
	* @var PersistenceFacade
	*/
	private $persistenceFacade;

	/**
	 * @var ChiNode
	 */
	private $nodeList = array();

	function hasView()
	{
		return false;
	}

	function executeKernel()
	{
		$this->log('start');
		$rootPackageOid = $this->_request->getValue('package');

		$this->log("oid: $rootPackageOid");
		if (PersistenceFacade::isValidOID($rootPackageOid)) {
			$this->log('validPackageOid');
				
			$this->persistenceFacade = PersistenceFacade::getInstance();
				
			$rootPackage = $this->persistenceFacade->load($rootPackageOid, 0);
				
			if ($rootPackage) {
				$this->log('rootPackageLoaded');

				$this->loadNodes($rootPackage);

				$this->revertMultiplicities();
			}
		}

		$this->log('end');

		//	Success
		return false;
	}

	private function loadNodes(Package $package) {
		$this->log('Diving package ' . $package->getBaseOID() . ' (' . $package->getName() . ')');
		
		$package->loadChildren('ChiNode', 1);
		$package->loadChildren('Package', 1);

		$children = $package->getChildren();

		foreach ($children as $currChild) {
			if ($currChild instanceof Package) {
				$this->loadNodes($currChild);
			} else if ($currChild instanceof ChiNode) {
				$this->log('Loading node ' . $currChild->getBaseOID() . ' (' . $currChild->getName() . ')');
				
				$currChild->loadChildren('ChiAssociation', 1);
				$this->nodeList[$currChild->getBaseOID()] = $currChild;
			}
		}
	}

	private function revertMultiplicities() {
		/**
		 * @var ChiAssociation[]
		 */
		$processedAssocs = array();

		foreach ($this->nodeList as $currNode) {
			$currAssocs = $currNode->getChildren();
				
			foreach($currAssocs as $currAssoc) {
				if ($currAssoc instanceof ChiAssociation) {
					$sourceOid = PersistenceFacade::composeOID(array('type' => 'ChiNode', 'id' => $currAssoc->getFkChinodesourceId()));
					$targetOid = PersistenceFacade::composeOID(array('type' => 'ChiNode', 'id' => $currAssoc->getFkChinodetargetId()));
						
					if (
					!array_key_exists($currAssoc->getBaseOID(), $processedAssocs)
					&& array_key_exists($sourceOid, $this->nodeList)
					&& array_key_exists($targetOid, $this->nodeList)
					) {
						$sourceNode = $this->nodeList[$sourceOid];
						$targetNode = $this->nodeList[$targetOid];
						
						$this->log("Reverting Multiplicity of $sourceOid (" . $sourceNode->getName() . ') --' . $currAssoc->getBaseOID() . ' (' . $currAssoc->getName() . ")--> $targetOid (" . $targetNode->getName() . ')');

						$sourceMultiplicity = $currAssoc->getSourceMultiplicity();
						$targetMultiplicity = $currAssoc->getTargetMultiplicity();

						$currAssoc->setSourceMultiplicity($targetMultiplicity);
						$currAssoc->setTargetMultiplicity($sourceMultiplicity);

						$currAssoc->save();

						$processedAssocs[$currAssoc->getBaseOID()] = true;
					}
				}
			}
		}
	}

	private function log($msg) {
		Log::debug($msg, __CLASS__);
		echo "<p>$msg</p>";
	}

	// PROTECTED REGION END

}
?>
