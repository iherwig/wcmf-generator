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
	
	var self = this;
	
	// setup the field to oid mapping
	this.fieldOidMapping = new Ext.util.MixedCollection();
	
	// setup ui
	this.ruleText = new Ext.Panel();
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
			new Ext.form.FieldSet({
				title: 'Rule',
				collapsible: false,
				autoHeight:true,
				defaults: {width: 500},
				defaultType: 'textarea',
				items :[this.ruleText]
			}),
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
	
	this.on('afterlayout', function() {
		self.updateDisplay();
	});
}

Ext.extend(cwl.textrule.TextRulePanel, Ext.Panel);

cwl.textrule.TextRulePanel.prototype.init = function() {

	this.fillRuleIntoPanel();
	this.updateDisplay();
}

cwl.textrule.TextRulePanel.prototype.render = function() {
	cwl.textrule.TextRulePanel.superclass.render.apply(this, arguments);
	this.init();
}

cwl.textrule.TextRulePanel.prototype.fillRuleIntoPanel = function() {
	if (!this.productionRule) {
		return;
	}

	// input variables
	var ruleInputVariables = this.productionRule.getVariablesByContext('in');
	if (ruleInputVariables) {
		for (var i=0, max=ruleInputVariables.length; i<max; i++) {
			if (i>this.inputVariables.getNumberOfFields()-1) {
				this.inputVariables.addField();
			}
			var id = this.inputVariables.getFieldId(i);
			this.inputVariables.setFieldValue(id, ruleInputVariables[i].get('ruleValue'));
			this.fieldOidMapping.add(id, ruleInputVariables[i].getOid());
		}
	}
	// condition
	var ruleCondition = this.productionRule.get('RuleCondition');
	if (ruleCondition) {
		this.condition.setValue(ruleCondition.get('name'));
	}
	// actions
	var ruleActions = this.productionRule.get('RuleAction');
	if (ruleActions) {
		for (var i=0, max=ruleActions.length; i<max; i++) {
			if (i>this.actions.getNumberOfFields()-1) {
				this.actions.addField();
			}
			var id = this.actions.getFieldId(i);
			this.actions.setFieldValue(id, ruleActions[i].get('name'));
			this.fieldOidMapping.add(id, actions[i].getOid());
		}
	}
	// output variables
	var ruleOutputVariables = this.productionRule.getVariablesByContext('out');
	if (ruleOutputVariables) {
		for (var i=0, max=ruleOutputVariables.length; i<max; i++) {
			if (i>this.outputVariables.getNumberOfFields()-1) {
				this.outputVariables.addField();
			}
			var id = this.outputVariables.getFieldId(i);
			this.outputVariables.setFieldValue(id, ruleOutputVariables[i].get('ruleValue'));
			this.fieldOidMapping.add(id, ruleOutputVariables[i].getOid());
		}
	}
}

cwl.textrule.TextRulePanel.prototype.updateDisplay = function() {
	if (!this.productionRule) {
		return;
	}
	var text = '<p>';
	
	// input variables
	text += '<b>Input:</b><br/>';
	var ruleInputVariables = this.productionRule.getVariablesByContext('in');
	if (ruleInputVariables) {
		for (var i=0, max=ruleInputVariables.length; i<max; i++) {
			text += ruleInputVariables[i].get('ruleValue')+'<br/>';
		}
	}
	// condition
	text += '<br/><b>Condition:</b><br/>';
	var ruleCondition = this.productionRule.get('RuleCondition');
	if (ruleCondition) {
		this.condition.setValue(ruleCondition.get('name'));
			text += ruleCondition.get('name')+'<br/>';
	}
	// actions
	text += '<br/><b>Actions:</b><br/>';
	var ruleActions = this.productionRule.get('RuleAction');
	if (ruleActions) {
		for (var i=0, max=ruleActions.length; i<max; i++) {
			text += ruleActions[i].get('name')+'<br/>';
		}
	}
	// output variables
	text += '<br/><b>Output:</b><br/>';
	var ruleOutputVariables = this.productionRule.getVariablesByContext('out');
	if (ruleOutputVariables) {
		for (var i=0, max=ruleOutputVariables.length; i<max; i++) {
			text += ruleOutputVariables[i].get('ruleValue')+'<br/>';
		}
	}
	text += '</p>';
	
	if (this.ruleText.getEl()) {
		this.ruleText.getEl().dom.innerHTML = text;
	}
}

/**
 * Rule management
 */

cwl.textrule.TextRulePanel.prototype.addOrUpdateInputVariable = function(fieldId, value) {
	chi.Log.log("input variable added/changed "+fieldId+" "+value, chi.Log.DEBUG);
	// TODO: do all server calls inside an ActionSet
	var self = this;
	if (this.fieldOidMapping.containsKey(fieldId)) {
		var variable = this.productionRule.getRulePartByOid(this.fieldOidMapping.get(fieldId));
		variable.set('ruleValue', value);
		chi.persistency.Persistency.getInstance().update(variable.getOid(), {ruleValue:value});
		this.updateDisplay();
	}
	else {
		chi.persistency.Persistency.getInstance().create('RuleVariable', function(createData) {
			chi.persistency.Persistency.getInstance().associate(self.productionRule.getOid(), createData.oid, 'RuleVariable', function(associateData) {
				chi.persistency.Persistency.getInstance().read(createData.oid, 1, function(readData) {
					var variable = readData.record;
					if (!self.productionRule.get('RuleVariable')) {
						self.productionRule.set('RuleVariable', []);
					}
					self.productionRule.get('RuleVariable').push(variable);
					variable.set('ruleValue', value);
					variable.set('context', 'in');
					chi.persistency.Persistency.getInstance().update(variable.getOid(), {ruleValue:value, context:'in'});
					self.fieldOidMapping.add(fieldId, variable.getOid());
					self.updateDisplay();
				});
			});
		});
	}
}

cwl.textrule.TextRulePanel.prototype.removeInputVariable = function(fieldId) {
	chi.Log.log("input variable removed "+fieldId, chi.Log.DEBUG);
	if (this.fieldOidMapping.containsKey(fieldId)) {
		var variable = this.productionRule.getRulePartByOid(this.fieldOidMapping.get(fieldId));
		chi.persistency.Persistency.getInstance().destroy(variable.getOid());
		this.productionRule.get('RuleVariable').remove(variable);
		this.fieldOidMapping.removeKey(fieldId);
		this.updateDisplay();
	}
}

cwl.textrule.TextRulePanel.prototype.updateCondition = function(value) {
	chi.Log.log("condition changed "+value, chi.Log.DEBUG);
	// TODO: update the condition
	this.updateDisplay();
}

cwl.textrule.TextRulePanel.prototype.addOrUpdateAction = function(fieldId, value) {
	chi.Log.log("action added/changed "+fieldId+" "+value, chi.Log.DEBUG);
	// TODO: check if a action matching the field id already exists in fieldOidMapping, if not create it
	this.updateDisplay();
}

cwl.textrule.TextRulePanel.prototype.removeAction = function(fieldId) {
	chi.Log.log("action removed "+fieldId, chi.Log.DEBUG);
	// TODO: remove the action matching the field id
	this.updateDisplay();
}

cwl.textrule.TextRulePanel.prototype.addOrUpdateOutputVariable = function(fieldId, value) {
	chi.Log.log("output variable added/changed "+fieldId+" "+value, chi.Log.DEBUG);
	// TODO: check if a rule variable matching the field id already exists in fieldOidMapping, if not create it
	this.updateDisplay();
}

cwl.textrule.TextRulePanel.prototype.removeOutputVariable = function(fieldId) {
	chi.Log.log("output variable removed "+fieldId, chi.Log.DEBUG);
	// TODO: remove the rule variable matching the field id
	this.updateDisplay();
}
