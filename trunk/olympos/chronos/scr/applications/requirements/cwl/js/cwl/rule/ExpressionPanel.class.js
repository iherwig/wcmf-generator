/*
 * Copyright (c) 2009 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 * 
 * All rights reserved. This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License v1.0 which
 * accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code, this
 * entire header must remain intact.
 */
Ext.namespace("cwl.rule");

/**
 * @class The Rule Expression panel.
 * 
 * <p>
 * The Rule Expression panel is a <i>Singleton</i>.
 * </p>
 * 
 * @extends Ext.Panel
 * @constructor
 * @param {Object}
 *            config The configuration object.
 */
cwl.rule.ExpressionPanel = function() {
  this.conditions = null;
  this.actions = null;
  this.expressionField = null;
}

cwl.rule.ExpressionPanel = Ext.extend(Ext.Panel, {
	initComponent : function() {
    this.expressionField = new Ext.form.HtmlEditor({
      enableAlignments: false,
      enableColors: false,
      enableFont: false,
      enableFontSize: false,
      enableFormat: false,
      enableLinks: false,
      enableLists: false,
      enableSourceEdit: false
    });
    this.conditions = {};
    this.actions = {};
		Ext.apply(this, {
      layout: 'fit',
		  title: chi.Dict.translate('Rule Expression'),
      items: new Ext.form.FormPanel({
        layout: 'fit',
        items: this.expressionField
      })
		});
		
		cwl.rule.ExpressionPanel.superclass.initComponent.apply(this, arguments);
	}
});

/**
 * Set the condition text.
 */
cwl.rule.ExpressionPanel.prototype.setConditionText = function(id, conditionStr) {
  this.conditions[""+id] = conditionStr;
  this.updateDisplay();
}

/**
 * Set the action text.
 */
cwl.rule.ExpressionPanel.prototype.setActionText = function(id, actionStr) {
  this.actions[""+id] = actionStr;
  this.updateDisplay();
}

/**
 * Set the expression text.
 */
cwl.rule.ExpressionPanel.prototype.updateDisplay = function() {

  var conditionStr = "";
  for(var i in this.conditions)
    conditionStr += this.conditions[i]+" ";
  conditionStr = conditionStr.substr(0, conditionStr.length-1);
  var actionStr = "";
  for(var i in this.actions)
    actionStr += this.actions[i]+"<br />&nbsp;&nbsp;&nbsp;&nbsp;";
  actionStr = actionStr.substr(0, actionStr.length-"<br />&nbsp;&nbsp;&nbsp;&nbsp;".length);
    
  this.expressionField.setValue("<strong>IF</strong> ("+conditionStr+") <strong>THEN</strong> ("+actionStr+"<br />)");
}

/**
 * Returns the instance of ExpressionPanel.
 *
 * @return The instance of ExpressionPanel.
 * @type cwl.rule.ExpressionPanel
 */
cwl.rule.ExpressionPanel.getInstance = function() {
	if (!cwl.rule.ExpressionPanel.instance) {
		cwl.rule.ExpressionPanel.instance = new cwl.rule.ExpressionPanel();
	}
	
	return cwl.rule.ExpressionPanel.instance;
}
