/*
 * Copyright (c) 2008 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 * 
 * All rights reserved. This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License v1.0 which
 * accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code, this
 * entire header must remain intact.
 */
Ext.namespace("uwm.modeltree");

/**
 * @class A diagram in the Model Tree. Serves as base for ActivitySet or
 *        Diagram.
 * 
 * @extends uwm.objecttree.Node
 * @see uwm.modeltree.ModelTree
 * @constructor
 * @param {Object}
 *            config The configuration object.
 */
uwm.modeltree.AbstractDiagramNode = function(config) {
	
	uwm.modeltree.AbstractDiagramNode.superclass.constructor.call(this, Ext.apply(this, {}, config));
	
	var self = this;
	
	this.on("dblclick", function(item, e) {
		self.open(item, e);
	});
	
}

Ext.extend(uwm.modeltree.AbstractDiagramNode, uwm.objecttree.Node);

uwm.modeltree.AbstractDiagramNode.prototype.buildContextMenu = function() {
	var self = this;
	
	this.contextMenu = new Ext.menu.Menu( {
		items : [ {
		    text : uwm.Dict.translate('Open'),
		    handler : function(item, e) {
			    self.open(item, e);
		    }
		}, {
		    text : uwm.Dict.translate('Delete from model'),
		    handler : function(item, e) {
			    self.deleteFromModel(item.e);
		    }
		} ]
	});
	
	return this.contextMenu;
}

uwm.modeltree.AbstractDiagramNode.prototype.open = function(self, e) {
	uwm.diagram.DiagramContainer.getInstance().loadDiagram(this.getModelNode());
}
