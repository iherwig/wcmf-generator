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
	this.condition = new Ext.form.TextField({
		name: 'condition',
		allowBlank: false
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
				items: [this.ruleText]
			}),
			this.inputVariables,
			new Ext.form.FieldSet({
				title: 'Condition',
				collapsible: false,
				autoHeight:true,
				defaults: {width: 500},
				defaultType: 'textfield',
				items: this.condition
			}),
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
		self.addOrUpdateRuleVariable(field.id, field.getValue(), 'in');
	});
	this.inputVariables.on('fieldRemoved', function(field) {
		self.removeRulePart(field.id);
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
		self.removeRulePart(field.id);
	});
	this.outputVariables.on('fieldChanged', function(field) {
		self.addOrUpdateRuleVariable(field.id, field.getValue(), 'out');
	});
	this.outputVariables.on('fieldRemoved', function(field) {
		self.removeRulePart(field.id);
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

/**
 * Fill the panel with the rule content
 */
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
		this.condition.setValue(ruleCondition.get('Name'));
	}
	// actions
	var ruleActions = this.productionRule.get('RuleAction');
	if (ruleActions) {
		for (var i=0, max=ruleActions.length; i<max; i++) {
			if (i>this.actions.getNumberOfFields()-1) {
				this.actions.addField();
			}
			var id = this.actions.getFieldId(i);
			this.actions.setFieldValue(id, ruleActions[i].get('Name'));
			this.fieldOidMapping.add(id, ruleActions[i].getOid());
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

/**
 * Update the read only display
 */
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
		this.condition.setValue(ruleCondition.get('Name'));
			text += ruleCondition.get('Name')+'<br/>';
	}
	// actions
	text += '<br/><b>Actions:</b><br/>';
	var ruleActions = this.productionRule.get('RuleAction');
	if (ruleActions) {
		for (var i=0, max=ruleActions.length; i<max; i++) {
			text += ruleActions[i].get('Name')+'<br/>';
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

cwl.textrule.TextRulePanel.prototype.showLoading = function() {
	this.ruleText.getEl().dom.innerHTML = '<div class="msg-active loading-indicator">Loading...</div>';
}

/**
 * Rule management
 */

cwl.textrule.TextRulePanel.prototype.addOrUpdateRuleVariable = function(fieldId, value, context) {
	this.showLoading();
	
	var actionSet = new chi.persistency.ActionSet();
  var self = this;
	
	// check if a field for the variable already exists
	if (this.fieldOidMapping.containsKey(fieldId)) {
		var variable = this.productionRule.getRulePartByOid(this.fieldOidMapping.get(fieldId));
		variable.set('ruleValue', value);
		actionSet.addUpdate(variable.getOid(), {ruleValue:value});
	}
	else {
		// create the variable
		if (!this.productionRule.get('RuleVariable')) {
			this.productionRule.set('RuleVariable', []);
		}
		actionSet.addCreate('RuleVariable');
		actionSet.addAssociate(this.productionRule.getOid(), '{RuleVariable:?}', 'RuleVariable');
		actionSet.addUpdate('{RuleVariable:?}', {ruleValue:value, context:context});
		actionSet.addRead('{RuleVariable:?}', 1, function(data) {
			var variable = data.record;
			self.productionRule.get('RuleVariable').push(variable);
			self.fieldOidMapping.add(fieldId, variable.getOid());
		});
	}
	
	// commit
	actionSet.commit(
		function(request, data) {
			self.updateDisplay();
		}, function(data, errorMessage) {
			chi.Log.log(errorMessage, chi.Log.ERROR);
		}
	);
}

cwl.textrule.TextRulePanel.prototype.removeRulePart = function(fieldId) {
	this.showLoading();

	if (this.fieldOidMapping.containsKey(fieldId)) {
		var rulePart = this.productionRule.getRulePartByOid(this.fieldOidMapping.get(fieldId));
		var oid = rulePart.getOid();
		chi.persistency.Persistency.getInstance().destroy(oid);
		this.productionRule.get(chi.Util.getClassNameFromOid(oid)).remove(rulePart);
		this.fieldOidMapping.removeKey(fieldId);
		this.updateDisplay();
	}
}

cwl.textrule.TextRulePanel.prototype.updateCondition = function(value) {
	this.showLoading();

	var actionSet = new chi.persistency.ActionSet();
  var self = this;
	
	// check if a condition already exists
	var condition = this.productionRule.get('RuleCondition');
	if (condition) {
		condition.set('Name', value);
		actionSet.addUpdate(condition.getOid(), {Name:value});
	}
	else {
		// create the condition
		actionSet.addCreate('RuleCondition');
		actionSet.addAssociate(this.productionRule.getOid(), '{RuleCondition:?}', 'RuleCondition');
		actionSet.addUpdate('{RuleCondition:?}', {Name:value});
		actionSet.addRead('{RuleCondition:?}', 1, function(data) {
			var condition = data.record;
			self.productionRule.set('RuleCondition', condition);
		});
	}
	
	// commit
	actionSet.commit(
		function(request, data) {
			self.updateDisplay();
		}, function(data, errorMessage) {
			chi.Log.log(errorMessage, chi.Log.ERROR);
		}
	);
}

cwl.textrule.TextRulePanel.prototype.addOrUpdateAction = function(fieldId, value) {
	this.showLoading();

	var actionSet = new chi.persistency.ActionSet();
  var self = this;
	
	// check if a field for the action already exists
	if (this.fieldOidMapping.containsKey(fieldId)) {
		var action = this.productionRule.getRulePartByOid(this.fieldOidMapping.get(fieldId));
		action.set('Name', value);
		actionSet.addUpdate(action.getOid(), {Name:value});
	}
	else {
		// create the action
		if (!this.productionRule.get('RuleAction')) {
			this.productionRule.set('RuleAction', []);
		}
		actionSet.addCreate('RuleAction');
		actionSet.addAssociate(this.productionRule.getOid(), '{RuleAction:?}', 'RuleAction');
		actionSet.addUpdate('{RuleAction:?}', {Name:value});
		actionSet.addRead('{RuleAction:?}', 1, function(data) {
			var action = data.record;
			self.productionRule.get('RuleAction').push(action);
			self.fieldOidMapping.add(fieldId, action.getOid());
		});
	}
	
	// commit
	actionSet.commit(
		function(request, data) {
			self.updateDisplay();
		}, function(data, errorMessage) {
			chi.Log.log(errorMessage, chi.Log.ERROR);
		}
	);
}
