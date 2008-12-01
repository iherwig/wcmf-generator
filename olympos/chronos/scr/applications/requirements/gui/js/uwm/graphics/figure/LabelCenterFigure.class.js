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

uwm.graphics.figure.LabelCenterFigure = function(label, figure, minWidth, minHeight, startWidth, startHeight) {
	uwm.graphics.figure.ComplexFigure.call(this, label, figure, minWidth, minHeight, startWidth, startHeight);
}

uwm.graphics.figure.LabelCenterFigure.prototype = new uwm.graphics.figure.ComplexFigure;

uwm.graphics.figure.LabelCenterFigure.prototype.createHTMLElement = function() {
	var item = uwm.graphics.figure.ComplexFigure.prototype.createHTMLElement.call(this);
	
	this.label = document.createElement("div");
	this.label.style.position = "absolute";
	this.label.style.width = "100%";
	this.label.style.textAlign = "center";
	this.label.style.left = "5px";
	this.label.style.overflow = "hidden";
	this.label.style.height = "20px";
	
	return item;
}
