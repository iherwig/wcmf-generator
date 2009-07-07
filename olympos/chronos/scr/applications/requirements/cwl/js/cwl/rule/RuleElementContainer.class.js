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

cwl.rule.RuleElementContainer = function() {
	this.elements = new Ext.util.MixedCollection();
}

cwl.rule.RuleElementContainer.prototype.registerElement = function(ruleElement) {
	this.elements.add(ruleElement.getId(), ruleElement);
}

cwl.rule.RuleElementContainer.prototype.getElement = function(cwlRuleElementId) {
	return this.elements.get(cwlRuleElementId);
}

cwl.rule.RuleElementContainer.prototype.getAllElements = function() {
	return this.elements;
}

cwl.rule.RuleElementContainer.getInstance = function() {
	if (!cwl.rule.RuleElementContainer.instance) {
		cwl.rule.RuleElementContainer.instance = new cwl.rule.RuleElementContainer();
	}
	
	return cwl.rule.RuleElementContainer.instance;
}
