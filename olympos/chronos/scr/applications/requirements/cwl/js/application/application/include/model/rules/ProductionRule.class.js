/*
 * Copyright (c) 2009 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 * 
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code,
 * this entire header must remain intact.
 */
Ext.namespace("application.application.include.model.rules");

/**
 * @class ProductionRule
 * ProductionRule description: 
 *
 * @constructor
 */
application.application.include.model.rules.ProductionRule = function(oid, data) {
// PROTECTED REGION ID(application/include/model/rules/ProductionRuleclass.js/Constructor) ENABLED START
// PROTECTED REGION END
	var modelDescription = chi.model.ModelDescriptionContainer.getInstance().getDescription('ProductionRule');
	return application.application.include.model.rules.ProductionRule.superclass.constructor.call(this, modelDescription, oid, data);
};
Ext.extend(application.application.include.model.rules.ProductionRule, chi.model.ModelRecord);

// PROTECTED REGION ID(application/include/model/rules/ProductionRuleclass.js/Body) ENABLED START
/**
 * Get all {application.application.include.model.rules.RuleVariable} instances of this rule that have
 * a given context value
 * @param {String} context The context value (in|out)
 * @return An array of {application.application.include.model.rules.RuleVariable} instances
 */
application.application.include.model.rules.ProductionRule.prototype.getVariablesByContext = function(context) {
	var result = [];
	var variables = this.get('RuleVariable');
	if (variables) {
		for (var i=0, max=variables.length; i<max; i++) {
			if (variables[i].get('context') == context) {
				result.push(variables[i]);
			}
		}
	}
	return result;
}

/**
 * Get a rule part by it's oid
 * @param {String} oid The objects oid
 * @return A specialized {chi.mode.ModelRecord} instance
 */
application.application.include.model.rules.ProductionRule.prototype.getRulePartByOid = function(oid) {

	// check condition
	var condition = this.get('RuleCondition');
	if (condition) {
		if (condition.getOid() == oid) {
			return this.RuleCondition;
		}
	}
	// check actions
	var actions = this.get('RuleAction');
	if (actions) {
		for (var i=0, max=actions.length; i<max; i++) {
			if (actions[i].getOid() == oid) {
				return actions[i];
			}
		}
	}
	// check variables
	var variables = this.get('RuleVariable');
	if (variables) {
		for (var i=0, max=variables.length; i<max; i++) {
			if (variables[i].getOid() == oid) {
				return variables[i];
			}
		}
	}
}
// PROTECTED REGION END

/**
 * Returns the label of this record.
 * 
 * @return The label of this record.
 * @type String
 */
application.application.include.model.rules.ProductionRule.prototype.getLabel = function() {
	var label = this.get("");
	if (label == undefined || label.length == 0) {
		label = this.getOid(); 
	}
	return label;
};
	