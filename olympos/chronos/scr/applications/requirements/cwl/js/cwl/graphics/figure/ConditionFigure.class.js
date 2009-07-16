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

cwl.graphics.figure.ConditionFigure = function(diagram, label) {  
  this.conditionLeft = null;
  this.conditionRight = null;
  this.operator = null;
  
  cwl.graphics.figure.EditableFigure.prototype.constructor.call(this, diagram, label);  
}

Ext.extend(cwl.graphics.figure.ConditionFigure, cwl.graphics.figure.EditableFigure);

cwl.graphics.figure.ConditionFigure.prototype.onElementDrop = function(modelElement) {
  if (modelElement.getType() == "ChiValue") {
    this.conditionLeft.setValue(modelElement.getOwner().getName()+"."+modelElement.getName());
    this.save();
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
  this.lineColor = new draw2d.Color(200, 200, 200);

  // you must call the super-method to initialize the device context.
  cwl.graphics.figure.EditableFigure.prototype.paint.call(this);

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

cwl.graphics.figure.ConditionFigure.prototype.createForm = function() {
  var self = this;
  
  this.conditionLeft = new Ext.form.ComboBox({
    id: 'leftCombo',
    store: new Ext.data.ArrayStore({
      autoDestroy: true,
      fields: [
         {name: 'id'},
         {name: 'displayText'}
      ]
    }),
    valueField: 'id',
    displayField: 'displayText',
    mode: 'local',
    resizable: true,
    columnWidth:.4,
    hideLabel: true
  });

  this.conditionRight = new Ext.form.ComboBox({
    id: 'rightCombo',
    store: new Ext.data.ArrayStore({
      autoDestroy: true,
      fields: [
         {name: 'id'},
         {name: 'displayText'}
      ]
    }),
    valueField: 'id',
    displayField: 'displayText',
    mode: 'local',
    resizable: true,
    columnWidth:.4,
    hideLabel: true
  });

  this.operator = new Ext.form.ComboBox({
    store: ['+', '-', '*', '/', '>', '>=', '<', '<=', '=='],
    columnWidth:.2,
    editable: true,
    forceSelection: true,
    hideLabel: true
  });

  var form = new Ext.form.FormPanel({
    renderTo: Ext.Element.get(this.formNode).id,
    frame: true,
    width: 280,
    items: [{
      layout:'column',
      items: [
        this.conditionLeft,
        this.operator,
        this.conditionRight
      ]
    }],
    buttons: [{
      text: 'Save',
      type: 'submit',
      handler: function() {
        self.save();
        self.closeForm();
      }
    },{
      text: 'Cancel',
      handler: function() {
        self.closeForm();
      }
    },{
      text: 'Add Condition',
      handler: function() {}
    }],
    keys: [{
      key: [27], // escape
      handler: function() {
        self.closeForm();
      },
      key: [13], // return
      handler: function() {
        self.save();
        self.closeForm();
      }
    }],
		listeners: {
			'afterrender' : function() {
        setTimeout(function() {self.conditionLeft.focus();}, 10);
      }
    }
  });
  return form;
}

cwl.graphics.figure.ConditionFigure.prototype.updateForm = function() {
  // get all possible values for the left/right part of the expression
  var attributes = [];
  var operations = [];
  var usedObjectsPackage = cwl.model.ModelElementContainer.getInstance().getElement(cwl.objecttree.UsedObjectsPackage.PACKAGE_ID);
  usedObjectsPackage.getChildren().each(function(item, index, length) {
    var ops = item.getOperations();
    for (var i=0; i<ops.length; i++)
      operations.push(item.name+"."+ops[i]+"()")
    var attrs = item.getAttributes();
    for (var i=0; i<attrs.length; i++)
      attributes.push(item.name+"."+attrs[i])
  });
  // add all values to the comboboxes
  var leftStore = this.conditionLeft.getStore();
  var rightStore = this.conditionRight.getStore();
  leftStore.removeAll();
  rightStore.removeAll();

  for (var i=0; i<attributes.length; i++) {
    leftStore.insert(0, new rightStore.recordType({id: attributes[i], displayText: attributes[i]}));
    rightStore.insert(0, new rightStore.recordType({id: attributes[i], displayText: attributes[i]}));
  }
  for (var i=0; i<operations.length; i++) {
    leftStore.insert(0, new rightStore.recordType({id: operations[i], displayText: operations[i]}));
    rightStore.insert(0, new rightStore.recordType({id: operations[i], displayText: operations[i]}));
  }
  leftStore.sort("displayText");
  rightStore.sort("displayText");
}

cwl.graphics.figure.ConditionFigure.prototype.save = function() {
  var conditionText = this.conditionLeft.getRawValue()+" "+this.operator.getValue()+" "+this.conditionRight.getRawValue();

  this.setLabel(conditionText);
  cwl.rule.ExpressionPanel.getInstance().setConditionText(conditionText);
}