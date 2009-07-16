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

cwl.graphics.figure.ActionFigure = function(diagram, label) {
  cwl.graphics.figure.EditableFigure.prototype.constructor.call(this, diagram, label);
}

Ext.extend(cwl.graphics.figure.ActionFigure, cwl.graphics.figure.EditableFigure);

cwl.graphics.figure.ActionFigure.prototype.checkDropable = function(modelElement, x, y) {
  if (modelElement.getType() == "Operation")
    return true;
  return false;
}

cwl.graphics.figure.ActionFigure.prototype.onElementDrop = function(modelElement) {
  if (modelElement.getType() == "Operation") {
    var actionText = modelElement.getOwner().getName()+"."+modelElement.getName()+"()";
    
    this.setLabel(actionText);
    cwl.rule.ExpressionPanel.getInstance().setActionText(this.getId(), actionText);
    return true;
  }
  return false;
}

/**
 * The paint method is the place to put your own draw calls.
 * This method will be called from the framework. Don't call them manually.
 * @private
 **/
cwl.graphics.figure.ActionFigure.prototype.paint = function() {
  // you must call the super-method to initialize the device context.
  cwl.graphics.figure.EditableFigure.prototype.paint.call(this);

  this.graphics.drawImage('js/cwl/graphics/figure/images/Activity.png', 
    0, 0, this.getWidth(), this.getHeight(), 1);

  // flush the paint instructions to the device context
  this.graphics.paint();
}
