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
Ext.namespace("cwe.editor");

/**
 * @class An Editor form allowing to edit all properties of an object.
 * 
 * <p>
 * The object to edit is loaded from the back-end.
 * </p>
 * <p>
 * Changes are only saved when the user clicks the save button.
 * </p>
 * <p>
 * The cancel button resets the form to the last saved values on existing
 * objects or closes the editor on new objects.
 * </p>
 * 
 * @extends Ext.form.FormPanel
 * @constructor
 * @param {Object}
 *            config The configuration object.
 * @config modelClass The Model Class of the object to edit.
 * @config oid The oid of the object to edit. <code>null</code> for new
 *         objects.
 * @config newObject Whether the edited object is a new object.
 * @config editorContainer The container this editor belongs to.
 * 
 */
cwe.editor.Editor = function() {
};

cwe.editor.Editor = Ext.extend(Ext.form.FormPanel, {
	initComponent : function() {
		var self = this;
		
		/**
		 * The record of this editor.
		 * 
		 * @private
		 * @type Object
		 */
		this.record = null;
		
		/**
		 * The button for saving the object.
		 * 
		 * @private
		 * @type Ext.Toolbar.Button
		 */
		this.saveButton = new Ext.Toolbar.Button( {
		    text : chi.Dict.translate("Save"),
		    iconCls : "saveButton",
		    handler : function() {
			    self.save();
		    }
		});
		
		/**
		 * The button for canceling recent changes.
		 * 
		 * @private
		 * @type Ext.Toolbar.Button
		 */
		this.cancelButton = new Ext.Toolbar.Button( {
		    text : chi.Dict.translate("Cancel"),
		    iconCls : "cancelButton",
		    handler : function() {
			    self.cancel();
		    }
		});
		
		/**
		 * A list of associate buttons this editor created in model grids.
		 * 
		 * <p>
		 * Required for removing the buttons when this editor is closed.
		 * </p>
		 * 
		 * @private
		 * @type Ext.util.MixedCollection
		 */
		this.associateButtons = new Ext.util.MixedCollection();
		
		Ext.apply(this, {
		    iconCls : this.modelClass.getTreeIconClass(),
		    bodyStyle : "padding: 5px;",
		    closable : true,
		    frame : false,
		    autoScroll : true,
		    labelAlign : "left",
		    labelWidth : 200,
		    tbar : [ this.saveButton, this.cancelButton ],
		    items : this.modelClass.getEditorItems(),
		    msgTarget : "side"
		});
		
		this.propagateEditor(this.items);
		
		cwe.editor.Editor.superclass.initComponent.apply(this, arguments);
		
		this.on("afterlayout", function(editor, layout) {
			self.doLayout();
		}, undefined, {
			single : true
		});
		
		this.on("show", function() {
			self.editorContainer.setActiveTab(self);
			self.editorContainer.show();
		});
		
		if (!this.newObject) {
			this.loadFromOid(this.oid);
		}
	}
});

/**
 * inserts this editor as property to all items in the form as
 * <code>editor</code>.
 * 
 * <p>
 * Recursively calls itself on nested items.
 * </p>
 * 
 * @private
 * @param {Array}
 *            items The items to insert the editor into.
 */
cwe.editor.Editor.prototype.propagateEditor = function(items) {
	var self = this;
	
	if (items) {
		if (Ext.isArray(items)) {
			for ( var i = 0; i < items.length; i++) {
				var currItem = items[i];
				if (currItem) {
					currItem.editor = self;
					self.propagateEditor(currItem.items);
				}
			}
		} else if (items instanceof Ext.util.MixedCollection) {
			items.each(function(elem) {
				elem.editor = self;
				self.propagateEditor(elem.items);
			});
		}
	}
};

/**
 * Saves the current state of the object.
 * 
 * <p>
 * Handles if the object is new and needs to be created first.
 * </p>
 * 
 * @private
 */
cwe.editor.Editor.prototype.save = function() {
	if (!this.newObject) {
		var record = this.getRecord();
		
		this.getForm().updateRecord(record);
		this.setTitle(record.getLabel());
		record.commit();
	} else {
		var record = new cwe.model.ModelRecord(this.modelClass);
		
		this.getForm().updateRecord(record);
		
		var self = this;
		
		var actionSet = new chi.persistency.ActionSet();
		
		actionSet.addCreate(this.modelClass.getId());
		
		record.commit(actionSet);
		
		actionSet.commit(function(data) {
			self.loadRecord(record);
			self.newObject = false;
		});
	}
};

/**
 * Reverts the values to last saved state (existing object) or closes the editor
 * (new object).
 * 
 * @private
 */
cwe.editor.Editor.prototype.cancel = function() {
	if (!this.newObject) {
		this.getForm().loadRecord(this.getRecord());
	} else {
		this.findParentBy(function() {
			return true;
		}).remove(this);
	}
};

/**
 * Returns the record of this editor.
 * 
 * @return The record of this editor.
 * @type cwe.model.ModelRecord
 */
cwe.editor.Editor.prototype.getRecord = function() {
	return this.record;
};

/**
 * Returns the oid of the edited object.
 * 
 * @return The oid of the edited object.
 * @type String
 */
cwe.editor.Editor.prototype.getOid = function() {
	return this.oid;
};

/**
 * Returns the label of the edited object.
 * 
 * @return The label of the edited object.
 * @type String
 */
cwe.editor.Editor.prototype.getLabel = function() {
	return this.getRecord().getLabel();
};

/**
 * Returns the Model Class of the edited object.
 * 
 * @return The Model Class of the edited object.
 * @type cwe.model.ModelClass
 */
cwe.editor.Editor.prototype.getModelClass = function() {
	return this.modelClass;
};

/**
 * Loads the object to edit from persistency.
 * 
 * @private
 * @param {String}
 *            oid The oid of the object to load.
 */
cwe.editor.Editor.prototype.loadFromOid = function(oid) {
	var self = this;
	
	chi.persistency.Persistency.getInstance().read(oid, 1, function(data) {
		self.loadRecord(data.record);
	});
};

cwe.editor.Editor.prototype.loadRecord = function(record) {
	this.record = record;
	this.oid = record.getOid();
	this.getForm().loadRecord(record);
	this.setTitle(record.getLabel());
};

/**
 * Registers an associate button for this editor.
 * 
 * @param {cwe.modelgrid.ModelGrid}
 *            grid The model grid the button is added to.
 * @param {cwe.modelgrid.AssociateButton}
 *            button The added button.
 */
cwe.editor.Editor.prototype.addAssociateButton = function(grid, button) {
	this.associateButtons.add(button, {
	    grid : grid,
	    button : button
	});
};

/**
 * Unregisters an associate button for this editor.
 * 
 * @param {cwe.modelgrid.AssociateButton}
 *            button The button to unregister.
 */
cwe.editor.Editor.prototype.removeAssociateButton = function(button) {
	this.associateButtons.removeKey(button);
};

/**
 * Removes all remaining associate buttons from their model grids.
 * 
 * @private
 */
cwe.editor.Editor.prototype.removeAllAssociateButtons = function() {
	this.associateButtons.each(function(data) {
		data.grid.removeAssociateButton(data.button);
	});
};
