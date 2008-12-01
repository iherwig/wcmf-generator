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

uwm.graphics.figure.RectangleFigure = function(label, figure) {
	uwm.graphics.figure.BaseFigure.call(this, label, figure, 80, 30, 150, 50);
}

uwm.graphics.figure.RectangleFigure.prototype = new uwm.graphics.figure.BaseFigure;

uwm.graphics.figure.RectangleFigure.prototype.setDimension = function(width, height) {
	uwm.graphics.figure.BaseFigure.prototype.setDimension.call(this, width, height);
	
	if (this.label != null) {
		this.label.style.width = this.getWidth() - 40 + "px";
		this.label.style.height = this.getHeight() - 3 + "px";
	}
}

uwm.graphics.figure.RectangleFigure.prototype.createHTMLElement = function() {
	var item = uwm.graphics.figure.BaseFigure.prototype.createHTMLElement.call(this);
	
	this.label = document.createElement("div");
	this.label.style.position = "absolute";
	this.label.style.left = "20px";
	this.label.style.top = "5px";
	this.label.style.overflow = "hidden";
	
	this.image = document.createElement("div");
	this.image.className = this.getFigure().getModelObject().getModelNodeClass().getFigureIcon();
	this.image.style.position = "absolute";
	this.image.style.top = "2px";
	this.image.style.right = "2px";
	this.image.style.width = "24px";
	this.image.style.height = "24px";
	this.image.style.backgroundRepeat = "no-repeat";
	
	return item;
}

uwm.graphics.figure.RectangleFigure.prototype.paint = function() {
	uwm.graphics.figure.BaseFigure.prototype.paint.call(this);
	
	var width = this.getWidth() - 1;
	var height = this.getHeight() - 1;
	
	this.graphics.drawRect(0, 0, width, height);
	this.graphics.drawLine(10, 0, 10, height);
	this.graphics.drawLine(15, 0, 15, height);
	
	this.graphics.paint();
	
	this.html.appendChild(this.label);
	this.html.appendChild(this.image);
}
