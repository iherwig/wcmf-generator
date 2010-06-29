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
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Tue Jun 29 10:43:07 CEST 2010. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/UseCases/class.ChiBusinessUseCaseBase.php");
// PROTECTED REGION ID(application/include/model/UseCases/class.ChiBusinessUseCase.php/Import) ENABLED START
// PROTECTED REGION END

/**
 * @class ChiBusinessUseCase
 * ChiBusinessUseCase description: A Business Use Case is part of a business process that produces an advantage to the enterprise.
 *
 * @author 
 * @version 1.0
 */
class ChiBusinessUseCase extends ChiBusinessUseCaseBase
{
// PROTECTED REGION ID(application/include/model/UseCases/class.ChiBusinessUseCase.php/Body) ENABLED START
public function draw($image, $xPos, $yPos, $width, $height) {
		ExportDiagramImageController::drawImageLabelCenterFigure($image, $xPos, $yPos, $width, $height, $this->getDisplayValue(), 'ChiBusinessUseCase');
	}
// PROTECTED REGION END
}
?>
