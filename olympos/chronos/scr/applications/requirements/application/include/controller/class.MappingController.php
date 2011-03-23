<?php
/*
 * Copyright (c) 2011 The Olympos Development Team.
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
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Wed Mar 23 15:36:19 CET 2011. 
 * Manual modifications should be placed inside the protected regions.
 */
 require_once(BASE."wcmf/lib/presentation/class.Controller.php");
// PROTECTED REGION ID(application/include/controller/class.MappingController.php/Import) ENABLED START
// PROTECTED REGION END

/**
 * @class MappingController
 * @ingroup Controller
 * @brief Creates a mapping between two ChiValue instances.
 * The mapping is realized as a ChiValueRef that is attached to the target ChiValue. 
 * The attribute reference_type of the ChiValueRef will be the oid of the ChiNode that contains
 * the source ChiValue, the attribute reference_value the oid of the ChiValue.
 * 
 * <b>Input actions:</b> 
 * - @em createMapping Create a mapping between sourceoid and targetoid
 * - @em deleteMapping Delete the mapping between sourceoid and targetoid
 * 
 * <b>Output actions:</b> 
 * - @em ok in any case
 * 
 * @param[in] sourceoid The object id of the source ChiValue (only for action createMapping)
 * @param[in] sourcenodeoid The object id of the source ChiNode. Can be different from ChiValue parent node in case of inheritance (only for action createMapping)
 * @param[in] targetoid The object id of the target ChiValue
 * 
 * The following configuration settings are defined for this controller:
 *
 * [actionmapping]
 * ??deleteMapping = MappingController
 * ??createMapping = MappingController
 *
 * [views]
 * 
 * @author 
 * @version 1.0
 */
class MappingController extends Controller
{
// PROTECTED REGION ID(application/include/controller/class.MappingController.php/Body) ENABLED START
	/**
	* @see Controller::hasView()
	*/
	function hasView()
	{
		return false;
	}
	/**
	 * @see Controller::validate()
	 */
	function validate()
	{
		if ($this->_request->getAction() == 'createMapping') {
			$sourceOid = $this->_request->getValue('sourceoid');
			if (strlen($sourceOid) == 0 || PersistenceFacade::getOIDParameter($sourceOid, 'type') != 'ChiValue')
			{
				$this->appendErrorMsg("Invalid 'sourceoid' parameter: ".$sourceOid);
				return false;
			}
			$sourceNodeOid = $this->_request->getValue('sourcenodeoid');
			if (strlen($sourceNodeOid) == 0 || PersistenceFacade::getOIDParameter($sourceNodeOid, 'type') != 'ChiNode') {
				$this->appendErrorMsg("Invalid 'sourcenodeoid' parameter: ".$sourceNodeOid);
				return false;
			}
		}
		$targetOid = $this->_request->getValue('targetoid');
		if (strlen($targetOid) == 0 || PersistenceFacade::getOIDParameter($targetOid, 'type') != 'ChiValue')
		{
			$this->appendErrorMsg("Invalid 'targetoid' parameter: ".$targetOid);
			return false;
		}
		return true;
	}
	/**
	 * @see Controller::executeKernel()
	 */
	function executeKernel()
	{
		$persistenceFacade = PersistenceFacade::getInstance();
		$sourceChiValueOid = $this->_request->getValue('sourceoid');
		$sourceChiNodeOid = $this->_request->getValue('sourcenodeoid');
		$targetChiValueOid = $this->_request->getValue('targetoid');
			
		// execute actions
		if ($this->_request->getAction() == 'createMapping')
		{
			// load model
			$sourceChiValue = $persistenceFacade->load($sourceChiValueOid, BUILDDEPTH_SINGLE);
			if (!$sourceChiValue) {
				$this->appendErrorMsg("The source ChiValue with oid ".$sourceChiValueOid." does not exist");
				return false;
			}
			$targetChiValue = $persistenceFacade->load($targetChiValueOid, 1);
			if (!$targetChiValue) {
				$this->appendErrorMsg("The target ChiValue with oid ".$targetChiValueOid." does not exist");
				return false;
			}
			// make sure that the target value does not map another source value already
			$chiValueRef = $targetChiValue->getFirstChild('ChiValueRef', null, null);
			if ($chiValueRef) {
				$this->appendErrorMsg("There already exists a mapping to '".$chiValueRef->getReferenceValue()."' in '".
				$chiValueRef->getReferenceType()."'. You must delete that first in order to create a new one.");
				return false;
			}
			$sourceChiNode = $persistenceFacade->load($sourceChiNodeOid, BUILDDEPTH_SINGLE);

			// create the ChiValueRef...
			$chiValueRef = $persistenceFacade->create('ChiValueRef', BUILDDEPTH_SINGLE);
			$chiValueRef->setReferenceType($sourceChiNode->getOid());
			$chiValueRef->setReferenceValue($sourceChiValue->getOid());

			// ...and add it to the target ChiValue
			$targetChiValue->addChild($chiValueRef);
			$chiValueRef->save();
			Log::info("Added mapping: ".$chiValueRef->toString(), __CLASS__);
		}
		else if ($this->_request->getAction() == 'deleteMapping')
		{
			// load model
			$targetChiValue = $persistenceFacade->load($targetChiValueOid, 1);
			if (!$targetChiValue) {
				$this->appendErrorMsg("The target ChiValue with oid ".$targetChiValueOid." does not exist");
				return false;
			}
			$chiValueRef = $targetChiValue->getFirstChild('ChiValueRef', null, null);
			if ($chiValueRef) {
				$chiValueRef->delete();
			}
		}
		return false;
	}

	/**
	 * Get the full qualified name of a ChiNode (including package structure and model name)
	 * @param chinode The ChiNode instance to get the name for
	 * @return The full qualified name
	 */
	function getFullQualifiedName(&$chiNode)
	{
		$name = $chiNode->getName();
		$persistenceFacade = PersistenceFacade::getInstance();
		$packageOID = $chiNode->getPackageOID();
		while ($packageOID) {
			$package = $persistenceFacade->load($packageOID, BUILDDEPTH_SINGLE);
			if ($package) {
				$name = $package->getName().'.'.$name;
				$packageOID = $package->getPackageOID();
				$modelOID = $package->getModelOID();
			}
			else {
				// prepend model name
				$model = $persistenceFacade->load($modelOID, BUILDDEPTH_SINGLE);
				if ($model) {
					$name = $model->getName().'.'.$name;
				}
				// stop iteration
				$packageOID = null;
			}
		}
		return $name;
	}
	// PROTECTED REGION END

}
?>
