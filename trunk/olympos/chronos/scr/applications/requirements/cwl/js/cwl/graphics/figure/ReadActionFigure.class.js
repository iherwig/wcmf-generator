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

cwl.graphics.figure.ReadActionFigure = function(diagram, label) {
  cwl.graphics.figure.ActionFigure.prototype.constructor.call(this, diagram, label);
}

Ext.extend(cwl.graphics.figure.ReadActionFigure, cwl.graphics.figure.ActionFigure);

cwl.graphics.figure.ReadActionFigure.prototype.createForm = function() {
  var self = this;
  
  this.conditionLeft = new Ext.form.ComboBox({
    store: new Ext.data.ArrayStore({
      autoDestroy: true,
      fields: [
         {name: 'id'},
         {name: 'displayText'},
         {name: 'className'},
         {name: 'operationName'}
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
    store: new Ext.data.ArrayStore({
      autoDestroy: true,
      fields: [
         {name: 'id'},
         {name: 'displayText'},
         {name: 'className'},
         {name: 'operationName'}
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

cwl.graphics.figure.ReadActionFigure.prototype.updateForm = function() {
  // get all possible values for the left/right part of the expression
  var attributes = [];
  var operations = [];
  var usedObjectsPackage = chi.model.ModelPackageContainer.getInstance().getPackage(cwl.objecttree.UsedObjectsPackage.PACKAGE_ID);
  usedObjectsPackage.getChildren().each(function(item, index, length) {
    var ops = item.getOperations();
    for (var i=0; i<ops.length; i++) {
      var text = "My"+item.name+"."+ops[i]+"()";
      operations.push({id: text, displayText: text, className: item.name, operationName: ops[i]});
    }
    var attrs = item.getAttributes();
    for (var i=0; i<attrs.length; i++) {
      var text = "My"+item.name+"."+attrs[i];
      attributes.push({id: text, displayText: text, className: item.name, operationName: attrs[i]});
    }
  });
  // add all values to the comboboxes
  var leftStore = this.conditionLeft.getStore();
  var rightStore = this.conditionRight.getStore();
  leftStore.removeAll();
  rightStore.removeAll();

  for (var i=0; i<attributes.length; i++) {
    var recordData = attributes[i];
    recordData.id = attributes[i].displayText;
    
    leftStore.insert(0, new rightStore.recordType(recordData, recordData.id));
    rightStore.insert(0, new rightStore.recordType(recordData, recordData.id));
  }
  for (var i=0; i<operations.length; i++) {
    var recordData = operations[i];
    recordData.id = operations[i].displayText;
    
    leftStore.insert(0, new rightStore.recordType(recordData, recordData.id));
    rightStore.insert(0, new rightStore.recordType(recordData, recordData.id));
  }
  
  rightStore.insert(0, new rightStore.recordType({id: 'false', displayText: 'false'}, 'false'));
  rightStore.insert(0, new rightStore.recordType({id: 'true', displayText: 'true'}, 'true'));

  leftStore.sort("displayText");
  rightStore.sort("displayText");
}

cwl.graphics.figure.ReadActionFigure.prototype.save = function() {
  var conditionText = this.conditionLeft.getRawValue()+" "+this.operator.getValue()+" "+this.conditionRight.getRawValue();
  var selectedRecord = this.conditionLeft.getStore().getById(this.conditionLeft.getRawValue());
  var actionText = "READ("+conditionText+")";
  if (selectedRecord)
    actionText = "READ("+selectedRecord.data.className+" | "+conditionText+")";
  
  this.setLabel(actionText);

  cwl.rule.ExpressionPanel.getInstance().setActionText(this.getId(), actionText.replace(/^READ/, '<strong>READ</strong>'));
}