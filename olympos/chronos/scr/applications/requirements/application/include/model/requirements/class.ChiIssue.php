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
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Thu Aug 06 14:30:59 CEST 2009. 
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
