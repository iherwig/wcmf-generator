<?php
/**
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Mon Aug 03 13:49:05 CEST 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/domain/class.ChiControllerBase.php");
// PROTECTED REGION ID(application/include/model/domain/class.ChiController.php/Import) ENABLED START
// PROTECTED REGION END

/**
 * @class ChiController
 * ChiController description: A ChiController, Views and Associations define the application flow. A controller represent the Business logic where a certain flow is physical implemented.
 *
 * @author 
 * @version 1.0
 */
class ChiController extends ChiControllerBase
{
// PROTECTED REGION ID(application/include/model/domain/class.ChiController.php/Body) ENABLED START
public function draw($image, $xPos, $yPos, $width, $height) {
		$this->loadChildren();
		
		$attributes = array();
		$operations = array(); //$this->getOperationChildren();
		
		ExportDiagramImageController::drawClassFigure($image, $xPos, $yPos, $width, $height, $this->getDisplayValue(), 'ChiController', $attributes, $operations);
	}
// PROTECTED REGION END
}
?>
