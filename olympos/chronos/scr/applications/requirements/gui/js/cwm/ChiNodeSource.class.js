
/*
 * This file was generated by wCMFGenerator 3.0.0004 from ./model/cwm.uml on Thu Feb 12 11:45:24 CET 2009. 
 * Manual modifications should be placed inside the protected regions.
 *
 * Copyright (c) 2009 The Olympos Development Team.
 *
 * http://sourceforge.net/projects/olympos/
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code,
 * this entire header must remain intact.
 *  
 */
Ext.namespace("cwm");

cwm.ChiNodeSource = function(modelNodeClass) {
	cwm.ChiNodeSource.superclass.constructor.call(this, modelNodeClass);
}

Ext.extend(cwm.ChiNodeSource, uwm.model.ModelObject);

cwm.ChiNodeSource.prototype.initByDisplayResult = function(node) {
	cwm.ChiNodeSource.superclass.initByDisplayResult.call(this, node);
      this.data.display_value = node.values[1].display_value;
      this.data.parent_order = node.values[1].parent_order;
      this.data.child_order = node.values[1].child_order;
      this.data.pk_name = node.values[1].pk_name;
      this.data.is_searchable = node.values[1].is_searchable;
      this.data.orderby = node.values[1].orderby;
      this.data.is_soap = node.values[1].is_soap;
      this.data.initparams = node.values[1].initparams;
      this.data.table_name = node.values[1].table_name;
      this.data.is_ordered = node.values[1].is_ordered;
      this.data.Alias = node.values[1].Alias;
      this.data.Version = node.values[1].Version;
      this.data.Name = node.values[1].Name;
      this.data.Notes = node.values[1].Notes;
      this.data.created = node.values[1].created;
      this.data.creator = node.values[1].creator;
      this.data.last_editor = node.values[1].last_editor;
      this.data.modified = node.values[1].modified;
}

cwm.ChiNodeSource.prototype.populatePropertyForm = function(form) {
	var realForm = form.getForm();
      realForm.findField("display_value").loadValue(this.data.display_value);
      realForm.findField("parent_order").loadValue(this.data.parent_order);
      realForm.findField("child_order").loadValue(this.data.child_order);
      realForm.findField("pk_name").loadValue(this.data.pk_name);
      realForm.findField("is_searchable").loadValue(this.data.is_searchable);
      realForm.findField("orderby").loadValue(this.data.orderby);
      realForm.findField("is_soap").loadValue(this.data.is_soap);
      realForm.findField("initparams").loadValue(this.data.initparams);
      realForm.findField("table_name").loadValue(this.data.table_name);
      realForm.findField("is_ordered").loadValue(this.data.is_ordered);
      realForm.findField("Alias").loadValue(this.data.Alias);
      realForm.findField("Version").loadValue(this.data.Version);
      realForm.findField("Name").loadValue(this.data.Name);
      realForm.findField("Notes").loadValue(this.data.Notes);
      realForm.findField("created").loadValue(this.data.created);
      realForm.findField("creator").loadValue(this.data.creator);
      realForm.findField("last_editor").loadValue(this.data.last_editor);
      realForm.findField("modified").loadValue(this.data.modified);
}

cwm.ChiNodeSource.prototype.getGridData = function() {
	return {
		oid: this.getOid(),
		label: this.getLabel()
	}
}
	