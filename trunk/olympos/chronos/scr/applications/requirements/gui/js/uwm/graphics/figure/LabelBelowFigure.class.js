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

uwm.graphics.figure.LabelBelowFigure = function(label, figure, minWidth, minHeight, startWidth, startHeight) {
	uwm.graphics.figure.ComplexFigure.call(this, label, figure, minWidth, minHeight, startWidth, startHeight);
}

uwm.graphics.figure.LabelBelowFigure.prototype = new uwm.graphics.figure.ComplexFigure;

uwm.graphics.figure.LabelBelowFigure.prototype.setLabelDimension = function() {
	if (this.label != null) {
		this.label.style.left = (-(this.label.clientWidth - this.width) / 2) + "px";
	}
}

uwm.graphics.figure.LabelBelowFigure.prototype.createHTMLElement = function() {
	var item = uwm.graphics.figure.ComplexFigure.prototype.createHTMLElement.call(this);
	
	this.label = document.createElement("div");
	this.label.style.position = "absolute";
	this.label.style.width = "auto";
	this.label.style.textAlign = "center";
	this.label.style.bottom = "-24px";
	this.label.style.height = "20px";
	
	return item;
}
