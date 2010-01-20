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
Ext.namespace("chi.editor.control");

/**
 * @class Base class for chi ComboBoxes
 * 
 * @extends Ext.form.ComboBox
 * @constructor
 * @param {Object} config The configuration object.
 */
chi.editor.control.ComboBoxBase = function(config) {
	chi.editor.control.ComboBoxBase.superclass.constructor.call(this, Ext.apply(this, {
	}, config));
}

Ext.extend(chi.editor.control.ComboBoxBase, Ext.form.ComboBox);

/**
 * Override findRecord method from Ext.form.ComboBox, to avoid NPEs.
 * Sometimes the store is null, when you try to open a combo box
 * by clicking the pulldown button and a (different) combo box instance 
 * was opened before.
 * In this case the call stack is the following (all in ext-all-debug.js):
 * mimicBlur() -> triggerBlur() -> onBlur() -> beforeBlur() -> findRecord()
 */
chi.editor.control.ComboBoxBase.prototype.findRecord = function(prop, value) {
	// return immediatly if store is null (doesn't change visible functionality)
	if (this.store == null)
		return null;
		
	var record;
	if(this.store.getCount() > 0) {
		this.store.each(function(r) {
			if(r.data[prop] == value) {
				record = r;
				return false;
			}
		});
	}
	return record;
}

/**
 * Override base class method to let the ComboBox react more natural,
 * if forceSelection == false
 * Code from http://www.extjs.com/forum/archive/index.php/t-48601.html
 */
Ext.override(Ext.form.ComboBox, {
	initEvents : function(){
			Ext.form.ComboBox.superclass.initEvents.call(this);

			this.keyNav = new Ext.KeyNav(this.el, {
					"up" : function(e){
							this.inKeyMode = true;
							this.selectPrev();
					},

					"down" : function(e){
							if(!this.isExpanded()){
									this.onTriggerClick();
							}else{
									this.inKeyMode = true;
									this.selectNext();
							}
					},

					"enter" : function(e){
							// Fix for tab key selecting a value from the dropdown even,
							// if forceSelection == false
							if(this.forceSelection) {
								this.onViewClick();
							} else {
								this.collapse();
							}
							this.delayedCheck = true;
							this.unsetDelayCheck.defer(10, this);
					},

					"esc" : function(e){
							this.collapse();
					},

					"tab" : function(e){
							// Fix for tab key selecting a value from the dropdown even,
							// if forceSelection == false
							if(this.forceSelection) {
								this.onViewClick(false);
							} else {
								this.collapse();
							}
							return true;
					},

					scope : this,

					doRelay : function(foo, bar, hname){
							if(hname == 'down' || this.scope.isExpanded()){
								 return Ext.KeyNav.prototype.doRelay.apply(this, arguments);
							}
							return true;
					},

					forceKeyDown : true
			});
			this.queryDelay = Math.max(this.queryDelay || 10,
							this.mode == 'local' ? 10 : 250);
			this.dqTask = new Ext.util.DelayedTask(this.initQuery, this);
			if(this.typeAhead){
					this.taTask = new Ext.util.DelayedTask(this.onTypeAhead, this);
			}
			if(this.editable !== false && !this.enableKeyEvents){
					this.mon(this.el, 'keyup', this.onKeyUp, this);
			}
			// Fix for tab key selecting a value from the dropdown even,
			// if forceSelection == false
			if(this.forceSelection){
					this.on('blur', this.doForce, this);
			}
	}
})
