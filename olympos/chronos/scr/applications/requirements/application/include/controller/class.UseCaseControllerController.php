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
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Mon Mar 21 15:09:16 CET 2011. 
 * Manual modifications should be placed inside the protected regions.
 */
 require_once(BASE."wcmf/lib/presentation/class.Controller.php");
// PROTECTED REGION ID(application/include/controller/class.UseCaseControllerController.php/Import) ENABLED START
 require_once (BASE."wcmf/lib/persistence/class.PersistenceFacade.php");
 require_once (BASE."wcmf/lib/persistence/class.ObjectQuery.php");
// PROTECTED REGION END

/**
 * @class UseCaseControllerController
 * @ingroup Controller
 * @brief Creates a ChiController from a ChiBusinessUseCase(Core).
 * From all ActivitySets contained in the use case operations will be created in the controller.
 * A "realization" relation is created between the use case and the controller
 * 
 * <b>Input actions:</b> 
 * - @em usecasectrl
 * 
 * <b>Output actions:</b> 
 * - @em ok in any case
 * 
 * @param[in] oid of selected ChiBusinessUseCase(Core)
 * @param[out] oid of created ChiController
 * 
 * The following configuration settings are defined for this controller:
 *
 * [actionmapping]
 * ??usecasectrl = UseCaseControllerController
 *
 * [views]
 * 
 * @author 
 * @version 1.0
 */
class UseCaseControllerController extends Controller
{
// PROTECTED REGION ID(application/include/controller/class.UseCaseControllerController.php/Body) ENABLED START
	/**
	 * @see Controller::validate
	 */
	function validate()
	{
		if(!$this->_request->hasValue('oid'))
		{
			$this->setErrorMsg("No 'oid' given in data.");
			return false;
		}
		
		if (!PersistenceFacade::isValidOID($this->_request->getValue('oid')))
		{
			$this->setErrorMsg("No valid 'oid' given in data.");
			return false;
		}
		$type = PersistenceFacade::getOIDParameter($this->_request->getValue('oid'), 'type');
		if($type != 'ChiBusinessUseCase' && $type != 'ChiBusinessUseCaseCore')
		{
			$this->setErrorMsg("The 'oid' parameter must belong to a ChiBusinessUseCase(Code).");
			return false;
		}
		return true;
	}
	
	/**
	 * @see Controller::hasView
	 */
	function hasView()
	{
		return false;
	}

	/**
	 * @see Controller::executeKernel
	 */
	function executeKernel()
	{
		// load the UseCase
		$persistenceFacade = &PersistenceFacade::getInstance();
		$useCaseOid = $this->_request->getValue('oid');
		$useCase = $persistenceFacade->load($useCaseOid, BUILDDEPTH_SINGLE);
		if ($useCase == null)
		{
			$this->setErrorMsg("An object with oid ".$useCaseOid." could not be found");
			return false;
		}
		
		// create the controller
		$controller = &$persistenceFacade->create("ChiController", BUILDDEPTH_REQUIRED);
		$controller->setName($this->getControllerName($useCase));
		$controller->setNotes($useCase->getNotes());
		$controller->setVisibility($this->getDefaultVisibilityId("ChiController"));
		$useCase->addChild($controller);
		$controller->save();
		
		// add the operations from the UseCase ActivitySet elements
		$useCase->loadChildren("ActivitySet");
		$activitySets = $useCase->getActivitySetChildren();
		for ($i=0; $i<sizeof($activitySets); $i++)
		{
			$curActivitySet = &$persistenceFacade->load($activitySets[$i]->getOID(), 1);
			$curActivitySet->sortChildren('sortkey');
			$curElements = $curActivitySet->getChildren();
			for ($j=0; $j<sizeof($curElements); $j++)
			{
				$curElement = &$curElements[$j];
				if ($this->isOperationType($curElement))
				{
					$operation = &$persistenceFacade->create("Operation", BUILDDEPTH_REQUIRED);
					$operation->setName($this->getOperationName($curElement));
					$operation->setNotes($curElement->getNotes());
					$operation->setVisibility($this->getDefaultVisibilityId("Operation"));
					$controller->addChild($operation);
					$operation->save();
				}
			}
		}
		
		$this->_response->setValue('oid', $controller->getOID());
		return false;
	}
	
	/**
	 * Get the controller name for a use case
	 * @param useCase The use case
	 * @return The name
	 */
	protected function getControllerName($useCase)
	{
		return $this->sanitizeName($useCase->getName()."Controller", false);
	}

	/**
	 * Get the controller name for a use case
	 * @param useCase The use case
	 * @return The name
	 */
	protected function getOperationName($activityElement)
	{
		$nameSuffice = $activityElement->getType();
		$nameSuffice = preg_replace('/^Activity(.+)/', '$1', $nameSuffice);
		return $this->sanitizeName($activityElement->getName().$nameSuffice, true);
	}

	/**
	 * Sanitize a given name for use as a class name
	 * @param name The name
	 * @return The sanitized name
	 */
	protected function isOperationType($node)
	{
		return in_array($node->getType(), array(
			'Activity',
			'ActivityDecision',
			'ActivitySend',
			'ActivityReceive',
			'ActivityInitial',
			'ActivityFinal'
		));
	}
	
	/**
	 * Sanitize a given name for use as a class/operation name
	 * @param name The name
	 * @param firstLower True if the first letter should be lowercase, False, if it should be uppercase
	 * @return The sanitized name
	 */
	protected function sanitizeName($name, $firstLower)
	{
		// remove special chars
		$name = preg_replace('/[^a-zA-Z0-9\s]/', '', $name);
		
		// make camel case (first letter lower case)
		$nameParts = preg_split('/\s/', $name);
		$nameParts[0] = $this->correctCase($nameParts[0], $firstLower);
		for($i=1; $i<sizeof($nameParts); $i++) {
			$nameParts[$i] = $this->correctCase($nameParts[$i], false);
		}
		$name = implode('', $nameParts);
		
		// shorten to 255 chars
		$name = substr($name, 0, 255);
		
		return $name;
	}
	
	/**
	 * Correct the case of the first letter of a sting
	 * @param str The string
	 * @param firstLower True if the first letter should be lowercase, False, if it should be uppercase
	 * @return The string with the correct case
	 */
	private function correctCase($str, $firstLower)
	{
		if ($firstLower) {
			$str = strtolower(substr($str, 0, 1)).substr($str, 1);
		}
		else {
			$str = strtoupper(substr($str, 0, 1)).substr($str, 1);
		}
		return $str;
	}

	/**
	 * Get the default visibility id for a given type (ChiController, Operation)
	 * @param type The type
	 * @return The database id of the default Visibility instance for the type
	 */
	private function getDefaultVisibilityId($type)
	{
		$DEFAULT_VISIBILTIES = array(
			'ChiController' => 'Protected',
			'Operation' => 'Protected',
		);
		
		$oid = PersistenceFacade::getInstance()->getFirstOID('Visibility', 
			array('Name' => $DEFAULT_VISIBILTIES[$type]));
		if (PersistenceFacade::isValidOID($oid)) {
			return join('', PersistenceFacade::getOIDParameter($oid, 'id'));
		}
		return null;
	}
// PROTECTED REGION END

}
?>
