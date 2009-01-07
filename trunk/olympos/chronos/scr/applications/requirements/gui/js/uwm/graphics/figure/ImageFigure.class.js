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

uwm.graphics.figure.ImageFigure = function(label, figure, imageUrl, minWidth, minHeight, startWidth, startHeight) {
	this.url = imageUrl;
	
	uwm.graphics.figure.LabelBelowFigure.call(this, label, figure, minWidth, minHeight, startWidth, startHeight);
}

Ext.extend(uwm.graphics.figure.ImageFigure, uwm.graphics.figure.LabelBelowFigure);

uwm.graphics.figure.ImageFigure.prototype.createHTMLElement = function() {
	var item = uwm.graphics.figure.LabelBelowFigure.prototype.createHTMLElement.call(this);
	
	if (Ext.isIE6) {
		// we must creeate an addition div. 
		// REASON: AlphaImageLoader clip all children. In this case no ports are visible.
		//         The ports of a node are DOM children of "this.html". Additional effort. :-(
		//
		this.d = document.createElement("div");
		this.d.style.position = "absolute";
		this.d.style.left = "0px";
		this.d.style.top = "0px";
		this.d.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader (src='" + this.url + "', sizingMethod='scale')";
		this.d = item.appendChild(this.d);
	} else {
		this.img = document.createElement("img");
		this.img.style.position = "absolute";
		this.img.style.left = "0px";
		this.img.style.top = "0px";
		this.img.src = this.url;
		
		this.img = item.appendChild(this.img);
		
		// Add an div above the img. Required for a propper drag&drop handling.
		// If you remove this div, the image will crap the event and the internal drag&drop handling
		// is corrupt......bug?
		//
		this.d = document.createElement("div");
		this.d.style.position = "absolute";
		this.d.style.left = "0px";
		this.d.style.top = "0px";
		this.d = item.appendChild(this.d);
	}
	
	item.style.left = this.x + "px";
	item.style.top = this.y + "px";
	
	return item;
}

uwm.graphics.figure.ImageFigure.prototype.paint = function() {
	draw2d.Node.prototype.paint.call(this);
}

uwm.graphics.figure.ImageFigure.prototype.setDimension = function(w, h) {
	uwm.graphics.figure.LabelBelowFigure.prototype.setDimension.call(this, w, h);
	
	// Adjust the different layer/div/img object of the figure
	//
	if (this.d != null) {
		this.d.style.width = this.width + "px";
		this.d.style.height = this.height + "px";
	}
	
	if (this.img != null) {
		this.img.setAttribute("width", this.width);
		this.img.setAttribute("height", this.height);
	}
}
