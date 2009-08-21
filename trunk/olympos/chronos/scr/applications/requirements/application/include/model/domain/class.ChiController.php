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
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Fri Aug 21 14:36:35 CEST 2009. 
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
