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
Ext.namespace("cwl.textrule");

/**
 * @class One tab containing a TextRule.
 * 
 * @extends Ext.Panel
 * @constructor
 * @param {Object} config Configuraton of this tab.
 * @config productionRule The ProductionRule of this tab.
 */
cwl.textrule.TextRulePanel = function(config) {
	this.productionRule = config.productionRule;
	
	// initial data
	/*
	this.productionRule = chi.model.ModelDescriptionContainer.getInstance().getDescription('ProductionRule').createInstance('ProductionRule:1', {});
	var variable1 = chi.model.ModelDescriptionContainer.getInstance().getDescription('RuleVariable').createInstance('RuleVariable:1', {ruleValue:'1234'});
	var variable2 = chi.model.ModelDescriptionContainer.getInstance().getDescription('RuleVariable').createInstance('RuleVariable:2', {ruleValue:'1234'});
	this.productionRule.ruleVariable = [variable1, variable2];
	*/
	
	var self = this;
	
	// setup the field to oid mapping
	this.fieldOidMapping = new Ext.util.MixedCollection();
	
	// setup ui
	
	this.ruleText = new Ext.form.FieldSet({
		title: 'Rule',
		collapsible: false,
		autoHeight:true,
		defaults: {width: 500},
		defaultType: 'textarea',
		items :[{
				readOnly: true,
				height: 200
			}
		]
	});
	this.inputVariables = new cwl.form.ExtendableFieldSet({
			title: 'Input Variables'
	});
	this.condition = new Ext.form.FieldSet({
		title: 'Condition',
		collapsible: false,
		autoHeight:true,
		defaults: {width: 500},
		defaultType: 'textfield',
		items :[{
				name: 'condition',
				allowBlank: false
			}
		]
	});
	this.actions = new cwl.form.ExtendableFieldSet({
			title: 'Actions'
	});
	this.outputVariables = new cwl.form.ExtendableFieldSet({
			title: 'Output Variables'
	});

	this.form = new Ext.FormPanel({
		labelWidth: 75,
		frame: false,
		autoScroll: true,
		bodyStyle: 'padding:5px 5px 0',
		defaults: {width: 610},
		defaultType: 'textfield',

		items: [
			this.ruleText,
			this.inputVariables,
			this.condition,
			this.actions,
			this.outputVariables
		]
	});

	cwl.textrule.TextRulePanel.superclass.constructor.call(this, Ext.apply(this, {
		elements: "body",
		border: false,
		layout: 'fit',
		items: this.form
	}, config));
	
	// setup listeners
	
	this.inputVariables.on('fieldChanged', function(field) {
		self.addOrUpdateInputVariable(field.id, field.getValue());
	});
	this.inputVariables.on('fieldRemoved', function(field) {
		self.removeInputVariable(field.id);
	});
	this.condition.on('change', function(field, oldValue, newValue) {
		if (field.validate() && newValue != oldValue) {
			self.updateCondition(field.getValue());
		}
	});
	this.actions.on('fieldChanged', function(field) {
		self.addOrUpdateAction(field.id, field.getValue());
	});
	this.actions.on('fieldRemoved', function(field) {
		self.removeAction(field.id);
	});
	this.outputVariables.on('fieldChanged', function(field) {
		self.addOrUpdateOutputVariable(field.id, field.getValue());
	});
	this.outputVariables.on('fieldRemoved', function(field) {
		self.removeOutputVariable(field.id);
	});
	
}

Ext.extend(cwl.textrule.TextRulePanel, Ext.Panel);

cwl.textrule.TextRulePanel.prototype.init = function() {

	// fill the rule into the panel
	var ruleInputVariables = this.productionRule.ruleVariable;
	if (ruleInputVariables) {
		var numVars=ruleInputVariables.length
		for (var i=0; i<numVars; i++) {
			if (i>this.inputVariables.getNumberOfFields()-1) {
				this.inputVariables.addField();
			}
			var id = this.inputVariables.getFieldId(i);
			this.inputVariables.setFieldValue(id, ruleInputVariables[i].get('ruleValue'));
		}
	}
}

cwl.textrule.TextRulePanel.prototype.render = function() {
	cwl.textrule.TextRulePanel.superclass.render.apply(this, arguments);
	this.init();
}

cwl.textrule.TextRulePanel.prototype.updateDisplay = function() {

}

/**
 * Rule management
 */

cwl.textrule.TextRulePanel.prototype.addOrUpdateInputVariable = function(fieldId, value) {
	// TODO: check if a rule variable matching the field id already exists in fieldOidMapping, if not create it
	this.updateDisplay();
	chi.Log.log("input variable added/changed "+fieldId+" "+value, chi.Log.ERROR);
}

cwl.textrule.TextRulePanel.prototype.removeInputVariable = function(fieldId) {
	// TODO: remove the rule variable matching the field id
	this.updateDisplay();
	chi.Log.log("input variable removed "+fieldId, chi.Log.ERROR);
}

cwl.textrule.TextRulePanel.prototype.updateCondition = function(value) {
	// TODO: update the condition
	this.updateDisplay();
	chi.Log.log("condition changed "+value, chi.Log.ERROR);
}

cwl.textrule.TextRulePanel.prototype.addOrUpdateAction = function(fieldId, value) {
	// TODO: check if a action matching the field id already exists in fieldOidMapping, if not create it
	this.updateDisplay();
	chi.Log.log("action added/changed "+fieldId+" "+value, chi.Log.ERROR);
}

cwl.textrule.TextRulePanel.prototype.removeAction = function(fieldId) {
	// TODO: remove the action matching the field id
	this.updateDisplay();
	chi.Log.log("action removed "+fieldId, chi.Log.ERROR);
}

cwl.textrule.TextRulePanel.prototype.addOrUpdateOutputVariable = function(fieldId, value) {
	// TODO: check if a rule variable matching the field id already exists in fieldOidMapping, if not create it
	this.updateDisplay();
	chi.Log.log("output variable added/changed "+fieldId+" "+value, chi.Log.ERROR);
}

cwl.textrule.TextRulePanel.prototype.removeOutputVariable = function(fieldId) {
	// TODO: remove the rule variable matching the field id
	this.updateDisplay();
	chi.Log.log("output variable removed "+fieldId, chi.Log.ERROR);
}
