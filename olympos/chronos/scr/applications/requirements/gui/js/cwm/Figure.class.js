
/*
 * This file was generated by wCMFGenerator 3.0.0 from src/requirements.uml on Mon Jan 12 18:10:09 CET 2009. 
 * Manual modifications should be placed inside the protected regions.
 *
 * Copyright (c) 2008 The Olympos Development Team.
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

cwm.Figure = function(modelNodeClass) {
	cwm.Figure.superclass.constructor.call(this, modelNodeClass);
}

Ext.extend(cwm.Figure, uwm.model.ModelObject);

cwm.Figure.prototype.initByDisplayResult = function(node) {
	cwm.Figure.superclass.initByDisplayResult.call(this, node);
      this.data.BackgroundColor = node.values[1].BackgroundColor;
      this.data.ForegroundColor = node.values[1].ForegroundColor;
      this.data.GID = node.values[1].GID;
      this.data.Height = node.values[1].Height;
      this.data.PositionY = node.values[1].PositionY;
      this.data.PositionX = node.values[1].PositionX;
      this.data.Width = node.values[1].Width;
	  this.data.Author = node.values[1].Author;
	  this.data.Status = node.values[1].Status;
      this.data.created = node.values[1].created;
      this.data.creator = node.values[1].creator;
      this.data.last_editor = node.values[1].last_editor;
      this.data.modified = node.values[1].modified;
}

cwm.Figure.prototype.populatePropertyForm = function(form) {
	var realForm = form.getForm();
      realForm.findField("BackgroundColor").loadValue(this.data.BackgroundColor);
      realForm.findField("ForegroundColor").loadValue(this.data.ForegroundColor);
      realForm.findField("GID").loadValue(this.data.GID);
      realForm.findField("Height").loadValue(this.data.Height);
      realForm.findField("PositionY").loadValue(this.data.PositionY);
      realForm.findField("PositionX").loadValue(this.data.PositionX);
      realForm.findField("Width").loadValue(this.data.Width);
	  realForm.findField("Author").loadValue(this.data.Author);
	  realForm.findField("Status").loadValue(this.data.Status);
      realForm.findField("created").loadValue(this.data.created);
      realForm.findField("creator").loadValue(this.data.creator);
      realForm.findField("last_editor").loadValue(this.data.last_editor);
      realForm.findField("modified").loadValue(this.data.modified);
}

cwm.Figure.prototype.getGridData = function() {
	return {
		oid: this.getOid(),
		label: this.getLabel()
	}
}
	