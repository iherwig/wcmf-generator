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

/*
 * Note: The extension mechanism used for this class differs from all other's
 * extension mechanism. The mechanism used elsewhere led to errors in this component.
 */
/**
 * @class The tab panel of center view.
 *
 * @extends Ext.TabPanel
 * @constructor
 * @param {Object} config Configuration of this TabPanel.
 * @config diagramContainer The DigramContainer object.
 */
cwl.textrule.TextRuleTabPanel = function() {
}
cwl.textrule.TextRuleTabPanel = Ext.extend(Ext.TabPanel, {
	initComponent: function() {
		Ext.apply(this, {
			//region: "center",
			xtype: "tabpanel",
			enableTabScroll: true,
			activeTab: 0,
			id: cwl.textrule.TextRuleTabPanel.COMPONENT_ID/*,
			items: uwm.ui.HelpViewer.getInstance()*/
		})
		
		cwl.textrule.TextRuleTabPanel.superclass.initComponent.apply(this, arguments);

		this.newRuleBtn = new Ext.Panel({
			title: 'New Rule',
			closable: false
		});
		this.add(this.newRuleBtn).show();

		var self = this;
		this.on("beforetabchange", function(tabPanel, newTab, currentTab) {
			if (newTab == self.newRuleBtn) {
				var newTab = self.addRule();
				self.setActiveTab(newTab.getId());
				return false;
			}
			return true;
		});
	}
});

cwl.textrule.TextRuleTabPanel.prototype.addRule = function() {
	var newRuleTab = new cwl.textrule.TextRulePanel({
		title: 'Rule',
		closable: true
	})
	this.remove(this.newRuleBtn);
	this.add(newRuleTab).show();
	this.add(this.newRuleBtn);
	return newRuleTab;
}

/**
 * Component ID of TextRuleTabPanel.
 *
 * @private
 * @type String
 */
cwl.textrule.TextRuleTabPanel.COMPONENT_ID = "cwl.textrule.TextRuleTabPanel.ID";
