/*
 * Copyright (c) 2008 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 * 
 * All rights reserved. This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License v1.0 which
 * accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code, this
 * entire header must remain intact.
 */
Ext.namespace("cwl.graphics.figure");

/**
 * EditableFigure adds an input form to the figure that is shown,
 * on mouse rollover.
 */
cwl.graphics.figure.EditableFigure = function(label) {
  this.formNode = null;
  this.form = null;
  this.formOpened = false;

  cwl.graphics.figure.BaseFigure.call(this, label);
}

Ext.extend(cwl.graphics.figure.EditableFigure, cwl.graphics.figure.BaseFigure);

/**
 * Creates the form element.
 *
 * @private
 */
cwl.graphics.figure.EditableFigure.prototype.createHTMLElement = function(){
    var item = cwl.graphics.figure.BaseFigure.prototype.createHTMLElement.call(this);
    
  /**
   * The form of this figure.
   *
   * @private
   * @type HTMLElement
   */
  this.formNode = document.createElement("div");
  this.formNode.style.position = "absolute";

	item.appendChild(this.formNode);

	return item;
}

cwl.graphics.figure.EditableFigure.prototype.setDimension = function(w,h) {
  cwl.graphics.figure.BaseFigure.prototype.setDimension.call(this,w,h);
  
  if (this.formNode)
    this.formNode.style.left = (this.getWidth()+5) + "px";
}

cwl.graphics.figure.EditableFigure.prototype.onMouseEnter = function() {
  this.openForm();
}

/**
 * Initially create the form. Subclasses must implement this method.
 */
cwl.graphics.figure.EditableFigure.prototype.createForm = function() {
}

/**
 * Update the form content before showing the form. Subclasses must implement this method.
 */
cwl.graphics.figure.EditableFigure.prototype.updateForm = function() {
}

cwl.graphics.figure.EditableFigure.prototype.openForm = function() {
  if (!this.formOpened) {    
    if (!this.form)
      this.form = this.createForm();
    this.updateForm();
    this.setCanDrag(false);
    this.setDeleteable(false);
    this.setResizeable(false);
    this.setSelectable(false);
    if (this.form)
      this.form.show();
    this.formOpened = true;
  }
}

cwl.graphics.figure.EditableFigure.prototype.closeForm = function() {
  if (this.formOpened) {
    if (this.form)
      this.form.hide();
    this.setCanDrag(true);
    this.setDeleteable(true);
    this.setResizeable(true);
    this.setSelectable(true);
    this.formOpened = false;
  }
}