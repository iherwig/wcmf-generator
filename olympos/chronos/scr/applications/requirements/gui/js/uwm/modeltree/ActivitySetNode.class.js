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
Ext.namespace("uwm.modeltree");

/**
 * @class An ActivitySet in the Model Tree.
 * 
 * @extends uwm.modeltree.AbstractDiagramNode
 * @constructor
 * @param {Object} config The configuration object.
 */
uwm.modeltree.ActivitySetNode = function(config) {
	this.modelNode = uwm.model.ModelContainer.getInstance().createByClassAndNameAndOid("ActivitySet", config.text, config.oid);
	
	uwm.modeltree.ActivitySetNode.superclass.constructor.call(this, Ext.apply(this, {
		id: config.oid,
		iconCls: this.modelNode.getModelNodeClass().getTreeIcon(),
		allowDrop: true
	}, config));
	
	}

Ext.extend(uwm.modeltree.ActivitySetNode, uwm.modeltree.AbstractDiagramNode);

/**
 * @member uwm.modeltree.PackageNode
 */
uwm.modeltree.ActivitySetNode.prototype.buildContextMenu = function() {
	var self = this;
	
	this.contextMenu = new Ext.menu.Menu({
		items: [{
			text: uwm.Dict.translate('Open'),
			handler: function(item, e) {
				self.open(item, e);
			}
		}, {
			text: uwm.Dict.translate('Delete from model'),
			handler: function(item, e) {
				self.deleteFromModel(item.e);
			}
		},	{
			text: uwm.Dict.translate('Put ActivitySet childnodes on ActivitySet diagram'),
			handler: function(item, e) {
				self.putChildnodesToActivitySetDiagramAndOpen(item, e);
			}
		}]
	});
	
	return this.contextMenu;
}


uwm.modeltree.ActivitySetNode.prototype.putChildnodesToActivitySetDiagramAndOpen = function(self, e) {
	//start controller actsdiagr and get back acts oid
	uwm.persistency.Persistency.getInstance().putChildnodesToActivitySetDiagram(this.oid, function(options, data) {
		uwm.model.ModelContainer.getInstance().loadByOid(data['oid'], function(modelNodeDiagr) {
			//open acts diagram from acts id
			uwm.diagram.DiagramContainer.getInstance().loadDiagram(modelNodeDiagr);
		});
	});
}
