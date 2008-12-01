/*
 * Copyright (c) 2008 The Olympos Development Team.
 *
 * http://sourceforge.net/projects/olympos/
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code,
 * this entire header must remain intact.
 */
Ext.namespace("uwm.graphics.figure");

uwm.graphics.figure.ComplexFigure = function(label, figure, minWidth, minHeight, startWidth, startHeight) {
	uwm.graphics.figure.BaseFigure.call(this, label, figure, minWidth, minHeight, startWidth, startHeight);
}

uwm.graphics.figure.ComplexFigure.prototype = new uwm.graphics.figure.BaseFigure;

uwm.graphics.figure.ComplexFigure.prototype.setDimension = function(width, height) {
	uwm.graphics.figure.BaseFigure.prototype.setDimension.call(this, width, height);
	
	this.setLabelDimension();
}

uwm.graphics.figure.ComplexFigure.prototype.setLabelDimension = function() {

}
