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
			width: 260,
			layout: 'fit',
			id: 'availableContentContainer',
			items: new Ext.Panel({
        layout: 'border',
        items: [{
          region: 'north',
          layout: 'fit',
          height: 300,
          split: true,
          items: new cwl.newobjects.Accordion()
        },{
          region: 'center',
          layout: 'fit',
          split: true,
          items: new cwl.modeltree.ModelTree()
        }]
      })
    },{
			region: 'center',
			collapsible: false,
			width: 260,
			id: 'ruleContainer',
			layout: 'fit',
			items: new Ext.Panel({
        height: 800,
        id: 'centerPanel',
        layout: 'border',
        items: [{
          region: 'center',
          layout: 'fit',
          split: true,
          items: new cwl.diagram.DiagramTabPanel({
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
          layout: 'fit',
          title: chi.Dict.translate('Rule Expression'),
          split: true,
          height: 100,
          items: new Ext.Panel()
        }]
      })
    },{
			region: 'east',
			title: chi.Dict.translate('Objects In Use'),
			collapsible: true,
			split: true,
			width: 260,
			layout: 'fit',
			id: 'usedContentContainer',
			items: new cwl.objecttree.ObjectTree()
    }],
    listeners: {
      resize: function(component, adjWidth, adjHeight, rawWidth, rawHeight ) {
        if (Ext.get('centerPanel'))
          Ext.get('centerPanel').setHeight(Ext.get('availableContentContainer').dom.clientHeight);
      }
    }    
	}, config));
}

Ext.extend(cwl.ui.Workbench, Ext.Viewport);

