<?php
/**
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Wed Jul 01 16:44:43 CEST 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/requirements/class.ChiIssueBase.php");
// PROTECTED REGION ID(application/include/model/requirements/class.ChiIssue.php/Import) ENABLED START
// PROTECTED REGION END

/**
 * @class ChiIssue
 * ChiIssue description: 
 *
 * @author 
 * @version 1.0
 */
class ChiIssue extends ChiIssueBase
{
// PROTECTED REGION ID(application/include/model/requirements/class.ChiIssue.php/Body) ENABLED START
public function draw($image, $xPos, $yPos, $width, $height) {
		ExportDiagramImageController::drawRectangleFigure($image, $xPos, $yPos, $width, $height, $this->getDisplayValue(), 'ChiIssue');
	}
// PROTECTED REGION END
}
?>
