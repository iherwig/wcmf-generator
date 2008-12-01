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
Ext.namespace("uwm.diagram");

uwm.diagram.DiagramTab = Ext.extend(Ext.BoxComponent, {
	initComponent: function() {
		Ext.apply(this, {
			el: Ext.DomHelper.append(Ext.getBody(), {
				tag: 'div'
			}, true),
			closable: true
		})
		
		uwm.diagram.DiagramTab.superclass.initComponent.apply(this, arguments);
		
		this.diagram = this.initialConfig.diagram;
	},
	
	onRender: function() {
		uwm.diagram.DiagramTab.superclass.onRender.apply(this, arguments);
		
		this.diagram.initWorkflow();
		this.diagram.initDropZone();
		this.diagram.loadFigures();
	},
});
