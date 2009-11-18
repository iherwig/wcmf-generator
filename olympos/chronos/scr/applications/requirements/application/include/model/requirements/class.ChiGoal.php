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
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Wed Nov 18 16:43:31 CET 2009. 
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
