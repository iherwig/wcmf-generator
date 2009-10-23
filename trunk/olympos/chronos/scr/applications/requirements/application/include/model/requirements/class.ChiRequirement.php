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
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Fri Oct 23 13:32:28 CEST 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/requirements/class.ChiRequirementBase.php");
// PROTECTED REGION ID(application/include/model/requirements/class.ChiRequirement.php/Import) ENABLED START
// PROTECTED REGION END

/**
 * @class ChiRequirement
 * ChiRequirement description: A Business guide line about the Enterprise or the project.
 *
 * @author 
 * @version 1.0
 */
class ChiRequirement extends ChiRequirementBase
{
// PROTECTED REGION ID(application/include/model/requirements/class.ChiRequirement.php/Body) ENABLED START
public function draw($image, $xPos, $yPos, $width, $height) {
		ExportDiagramImageController::drawRectangleFigure($image, $xPos, $yPos, $width, $height, $this->getDisplayValue(), 'ChiRequirement');
	}
// PROTECTED REGION END
}
?>
