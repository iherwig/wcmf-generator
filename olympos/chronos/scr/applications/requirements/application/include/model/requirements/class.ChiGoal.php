<?php
/**
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Thu Jul 02 15:19:07 CEST 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/requirements/class.ChiGoalBase.php");
// PROTECTED REGION ID(application/include/model/requirements/class.ChiGoal.php/Import) ENABLED START
// PROTECTED REGION END

/**
 * @class ChiGoal
 * ChiGoal description: a Measurable scope that the enterprise wants to achieve. 
 *
 * @author 
 * @version 1.0
 */
class ChiGoal extends ChiGoalBase
{
// PROTECTED REGION ID(application/include/model/requirements/class.ChiGoal.php/Body) ENABLED START
	
	public function draw($image, $xPos, $yPos, $width, $height) {
		ExportDiagramImageController::drawRectangleFigure($image, $xPos, $yPos, $width, $height, $this->getDisplayValue(), 'ChiGoal');
	}
	
	// PROTECTED REGION END
}
?>
