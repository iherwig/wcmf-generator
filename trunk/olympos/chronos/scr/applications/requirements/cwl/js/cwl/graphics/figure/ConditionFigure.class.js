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

cwl.graphics.figure.ConditionFigure = function(label) {
  cwl.graphics.figure.BaseFigure.prototype.constructor.call(this, label);
  
  this.lineColor = new draw2d.Color(0, 0, 0);  
}

Ext.extend(cwl.graphics.figure.ConditionFigure, cwl.graphics.figure.BaseFigure);

cwl.graphics.figure.ConditionFigure.prototype.onElementDrop = function(modelElement) {
  if (modelElement.getType() == "ChiValue") {
    this.setLabel(this.label+"\n"+modelElement.getOwner().getName()+"."+modelElement.getName());
    return true;
  }
  return false;
}

/**
 * The paint method is the place to put your own draw calls.
 * This method will be called from the framework. Don't call them manually.
 * @private
 **/
cwl.graphics.figure.ConditionFigure.prototype.paint = function() {
  // you must call the super-method to initialize the device context.
  cwl.graphics.figure.BaseFigure.prototype.paint.call(this);

  // the coords for the shape
  //
  var x = new Array(
    0, 
    this.getWidth()/2, 
    this.getWidth(), 
    this.getWidth()/2
  );
  var y = new Array(
    this.getHeight()/2, 
    0, 
    this.getHeight()/2, 
    this.getHeight()
  ); 

  // set the line width
  this.graphics.setStroke(this.stroke);

  // fill the area if the user has set a background color
  //
  if (this.bgColor != null) {
    this.graphics.setColor(this.bgColor.getHTMLStyle());
    this.graphics.fillPolygon(x,y);
  }

  // paint the outline if the user has set the line color (default:black)
  //
  if (this.lineColor != null) {
    this.graphics.setColor(this.lineColor.getHTMLStyle());
    this.graphics.drawPolygon(x,y);
  }

  // flush the paint instructions to the device context
  this.graphics.paint();
}
