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
 * @class A Package in Model Tree.
 *
 * @extends uwm.objecttree.Node
 * @see uwm.modeltree.ModelTree
 * @constructor
 * @param {Object} config The configuration object.
 */
uwm.modeltree.PackageNode = function(config) {
	this.modelNode = uwm.model.ModelContainer.getInstance().createByClassAndNameAndOid("Package", config.text, config.oid);
	
	uwm.modeltree.PackageNode.superclass.constructor.call(this, Ext.apply(this, {
		id: config.oid,
		iconCls: this.modelNode.getModelNodeClass().getTreeIcon()
	}, config));
}

Ext.extend(uwm.modeltree.PackageNode, uwm.objecttree.Node);

/**
 * @member uwm.modeltree.PackageNode
 */
uwm.modeltree.PackageNode.prototype.buildContextMenu = function() {
	var self = this;
	
	this.contextMenu = new Ext.menu.Menu({
		items: [{
			text: uwm.Dict.translate('Add package'),
			handler: function(item, e) {
				self.addPackage(item, e);
			}
		}, {
			text: uwm.Dict.translate('Add diagram'),
			handler: function(item, e) {
				self.addDiagram(item, e);
			}
		}, {
			text: uwm.Dict.translate('New diagram from package'),
			handler: function(item, e) {
				self.addDiagramFromPackageAndReload(item, e, self, self.addDiagramFromPackage(item, e ) );
			}
		}, {
			text: uwm.Dict.translate('Delete from model'),
			handler: function(item, e) {
				self.deleteFromModel(item, e);
			}
		}, {
			text: uwm.Dict.translate('Select as grid scope'),
			handler: function(item, e) {
				self.selectAsScope(item, e);
			}
		}, {
			text: uwm.Dict.translate("Reload"),
			handler: function(item, e) {
				self.reload();
			}
		}, {
			text: uwm.Dict.translate('Export as UML'),
			handler: function(item, e) {
			var localization = uwm.i18n.Localization.getInstance();
			var userLanguage = localization.getModelLanguage();
		
				new uwm.ui.LongTaskRunner( {
						title : uwm.Dict.translate('Exporting UML ...'),
						call : function(successHandler, errorHandler) {
							uwm.persistency.Persistency.getInstance().exportUwm('', self.getModelNode().getOid(), userLanguage, successHandler, errorHandler);
						},
						successHandler : function(data) {},
						errorHandler : function(data) {
							uwm.Util.showMessage(uwm.Dict.translate("Error while exporting"), uwm.Dict.translate("The export was unsuccessful. Please try again."), uwm.Util.messageType.ERROR);
						},
						isReturningDocument : true
				}).show();
			}
		}, {
			text: uwm.Dict.translate('Export Documentation'),
			handler : function(item, e) {
					new uwm.ui.ExportAssistent("Package", self.getModelNode().getOid());
			}
		}]
	});
	
	return this.contextMenu;
}

uwm.modeltree.PackageNode.prototype.addPackage = function(self, e) {
	uwm.model.ModelContainer.getInstance().createPackage(this.getModelNode());
}

uwm.modeltree.PackageNode.prototype.addDiagram = function(self, e) {
	uwm.model.ModelContainer.getInstance().createDiagram(this.getModelNode());
}

uwm.modeltree.PackageNode.prototype.selectAsScope = function(self, e) {
	uwm.objectgrid.ObjectGridContainer.getInstance().loadScope(this.modelNode);
}

uwm.modeltree.PackageNode.prototype.addDiagramFromPackageAndReload = function(self, e, menuEntry, addDiagramFromPackage) {
	menuEntry.reload();
}

uwm.modeltree.PackageNode.prototype.addDiagramFromPackage = function(self, e) {
	//start controller packdiagr and get back diagram oid
	uwm.persistency.Persistency.getInstance().createDiagramFromPackage(this.oid, function(options, data) {
		uwm.model.ModelContainer.getInstance().loadByOid(data['oid'], function(modelNodeDiagr) {
			//open diagram from diagram id
			uwm.diagram.DiagramContainer.getInstance().loadDiagram(modelNodeDiagr);
		});
	});
}
