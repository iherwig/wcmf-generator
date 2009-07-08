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
 * @class A Model in Model Tree.
 * 
 * @extends uwm.objecttree.Node
 * @see uwm.modeltree.ModelTree
 * @constructor
 * @param {Object}
 *            config The configuration object.
 */
uwm.modeltree.ModelNode = function(config) {
	this.modelNode = uwm.model.ModelContainer.getInstance().createByClassAndNameAndOid("Model", config.text, config.oid);
	
	uwm.modeltree.ModelNode.superclass.constructor.call(this, Ext.apply(this, {
	    id : config.oid,
	    iconCls : this.modelNode.getModelNodeClass().getTreeIcon(),
	    allowDrag : false
	}, config));
}

Ext.extend(uwm.modeltree.ModelNode, uwm.objecttree.Node);

uwm.modeltree.ModelNode.prototype.buildContextMenu = function() {
	var self = this;
	
	this.contextMenu = new Ext.menu.Menu( {
		items : [
		        {
		            text : uwm.Dict.translate('Add package'),
		            handler : function(item, e) {
			            self.addPackage(item, e);
		            }
		        },
		        {
		            text : uwm.Dict.translate('Delete from model'),
		            handler : function(item, e) {
			            self.deleteFromModel(item, e);
		            }
		        },
		        {
		            text : uwm.Dict.translate('Select as grid scope'),
		            handler : function(item, e) {
			            self.selectAsScope(item, e);
		            }
		        },
		        {
		            text : uwm.Dict.translate("Reload"),
		            handler : function(item, e) {
			            self.reload();
		            }
		        },
		        {
		            text : uwm.Dict.translate('Export as UML'),
		            handler : function(item, e) {
			            new uwm.ui.LongTaskRunner( {
			                title : uwm.Dict.translate('Exporting UML ...'),
			                call : function(successHandler, errorHandler) {
				                uwm.persistency.Persistency.getInstance().exportUwm(self.getModelNode().getOid(), '', successHandler, errorHandler);
			                },
			                successHandler : function() {
			                },
			                errorHandler : function() {
				                uwm.Util.showMessage(uwm.Dict.translate("Error while exporting"), uwm.Dict.translate("The export was unsuccessful. Please try again."), uwm.Util.messageType.ERROR);
			                },
			                isReturningDocument : true
			            }).show();
		            }
		        },
		        {
		            text : uwm.Dict.translate('Export Documentation'),
		            handler : function(item, e) {
			            new uwm.ui.ExportAssistent("Model", self.getModelNode().getOid());
		            }
		        },
		        {
		            text : uwm.Dict.translate("Generate"),
		            menu : {
			            items : [ {
			                text : uwm.Dict.translate("Expeditor"),
			                handler : function(item, e) {
				                new uwm.ui.LongTaskRunner( {
				                    title : uwm.Dict.translate('Generating Expeditor ...'),
				                    call : function(successHandler, errorHandler) {
					                    uwm.persistency.Persistency.getInstance().generateExpeditor(self.getModelNode().getOid(), successHandler, errorHandler);
				                    },
				                    successHandler : function() {
				                    },
				                    errorHandler : function() {
					                    uwm.Util.showMessage(uwm.Dict.translate("Error while exporting"), uwm.Dict.translate("The generation was unsuccessful. Please try again."),
					                            uwm.Util.messageType.ERROR);
				                    },
				                    isReturningDocument : false
				                }).show();
			                }
			            } ]
		            }
		        } ]
	});
	
	return this.contextMenu;
}

uwm.modeltree.ModelNode.prototype.addPackage = function(self, e) {
	uwm.model.ModelContainer.getInstance().createPackage(this.getModelNode());
}

uwm.modeltree.ModelNode.prototype.selectAsScope = function(self, e) {
	uwm.objectgrid.ObjectGridContainer.getInstance().loadScope(this.modelNode);
}
