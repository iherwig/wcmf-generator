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
Ext.namespace("cwl.ui");

/**
 * @class The main Workbench (perspective).
 *
 * @constructor
 * @param {Object} config The configuration object.
 */
cwl.ui.Workbench = function(config) {
	cwl.ui.Workbench.superclass.constructor.call(this, Ext.apply(this, {
		layout: 'border',
		items: [{
			region: 'west',
			title: chi.Dict.translate('Available Content'),
			collapsible: true,
			split: true,
      border: false,
			width: 260,
			layout: 'fit',
			id: 'availableContentContainer',
			items: new Ext.Panel({
        layout: 'border',
        items: [{
          region: 'north',
          layout: 'fit',
          border: false,
          height: 300,
          split: true,
          items: new cwl.newobjects.Accordion()
        },{
          region: 'center',
          layout: 'fit',
          border: false,
          split: true,
          items: new cwl.modeltree.ModelTree()
        }]
      })
    },{
			region: 'center',
			id: 'ruleContainer',
			items: new Ext.Panel({
        layout: 'fit',
        border: false,
        items: new Ext.Panel({
          height: 900,
          layout: 'border',
          items: [{
            region: 'center',
            layout: 'fit',
            border: false,
            items: new Ext.TabPanel({
              enableTabScroll: true,
              activeTab: 0,
              items: [new cwl.diagram.RuleDiagram({
                closable: true,
                title: "Rule",
                autoScroll: true,
                workspaceWidth: 100,
                workspaceHeight: 100
              })]
            })
          },{
            region: 'south',
            title: 'Rule Definition',
            layout: 'fit',
            border: false,
            height: 100
          }]
        })
      })
    },{
			region: 'east',
			title: chi.Dict.translate('Objects In Use'),
			collapsible: true,
			split: true,
			width: 260,
			layout: 'fit',
      border: false,
			id: 'usedContentContainer',
			items: new cwl.objecttree.ObjectTree()
    }]
	}, config));
}

Ext.extend(cwl.ui.Workbench, Ext.Viewport);
