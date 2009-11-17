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
 * @config rule The TextRule of this tab.
 */
cwl.textrule.TextRulePanel = function(config) {
	this.rule = config.rule;
	var self = this;

	var newInputBtn = new Ext.form.TriggerField({
		id: 'new-input-btn',
		fieldLabel: 'New Input',
		value: '',
		triggerClass: 'x-form-trigger' 
	});
	newInputBtn.onTriggerClick = function(e) {
		if (this.getValue() != '') {
			//self.form.
		}
	};

	var newActionBtn = new Ext.form.TriggerField({
		id: 'new-action-btn',
		fieldLabel: 'New Action',
		value: '',
		triggerClass: 'x-form-trigger' 
	});
	newActionBtn.onTriggerClick = function(e) {};

	var newOutputBtn = new Ext.form.TriggerField({
		id: 'new-output-btn',
		fieldLabel: 'New Output',
		value: '',
		triggerClass: 'x-form-trigger' 
	});
	newOutputBtn.onTriggerClick = function(e) {};

	this.form = new Ext.FormPanel({
		labelWidth: 75, // label settings here cascade unless overridden
		frame: false,
		bodyStyle: 'padding:5px 5px 0',
		defaults: {width: 650},
		defaultType: 'textfield',

		items: [{
			xtype: 'fieldset',
			checkboxToggle: false,
			title: 'Input Variables',
			collapsible: false,
			autoHeight: true,
			defaults: {width: 500},
			defaultType: 'textfield',
			collapsed: false,
			items :[{
							name: 'input1',
							allowBlank: false
					},
					newInputBtn
			]
		},{
			xtype:'fieldset',
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
		},{
			xtype:'fieldset',
			title: 'Actions',
			collapsible: false,
			autoHeight:true,
			defaults: {width: 500},
			defaultType: 'textfield',
			items :[{
							name: 'action1',
							allowBlank: false
					},
					newActionBtn
			]
		},{
			xtype: 'fieldset',
			checkboxToggle: false,
			title: 'Output Variables',
			collapsible: false,
			autoHeight: true,
			defaults: {width: 500},
			defaultType: 'textfield',
			collapsed: false,
			items :[{
							name: 'output1',
							allowBlank: false
					},
					newOutputBtn
			]
		}]
	});
	
	cwl.textrule.TextRulePanel.superclass.constructor.call(this, Ext.apply(this, {
		elements: "body",
		border: false,
		autoscroll: true,
		layout: 'fit',
		items: this.form
	}, config));
	
}

Ext.extend(cwl.textrule.TextRulePanel, Ext.Panel);

/**
 * Initiates a new diagram.
 *
 * <p>
 * Creates a new panel for the tab, initiates internal state to default values.
 * </p>
 */
cwl.textrule.TextRulePanel.prototype.init = function() {
}

/**
 * Initiates the contained diagram.
 *
 * @private
 */
cwl.textrule.TextRulePanel.prototype.render = function() {

	cwl.textrule.TextRulePanel.superclass.render.apply(this, arguments);
	
	this.init();
}
