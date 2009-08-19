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
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Wed Aug 19 14:27:49 CEST 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/domain/class.ChiNodeBase.php");
// PROTECTED REGION ID(application/include/model/domain/class.ChiNode.php/Import) ENABLED START
// PROTECTED REGION END

/**
 * @class ChiNode
 * ChiNode description: A Domain Object type used in Chronos. ChiNodes and ChiValues define the application data model.
 *
 * @author 
 * @version 1.0
 */
class ChiNode extends ChiNodeBase
{
// PROTECTED REGION ID(application/include/model/domain/class.ChiNode.php/Body) ENABLED START
public function draw($image, $xPos, $yPos, $width, $height) {
		$this->loadChildren();
		
		$attributes = $this->getChiValueChildren();
		$operations = $this->getOperationChildren();
		
		ExportDiagramImageController::drawClassFigure($image, $xPos, $yPos, $width, $height, $this->getDisplayValue(), 'ChiNode', $attributes, $operations);
	}
// PROTECTED REGION END
}
?>
