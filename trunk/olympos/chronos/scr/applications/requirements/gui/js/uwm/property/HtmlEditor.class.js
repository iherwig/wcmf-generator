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
Ext.namespace("uwm.property");

/**
 * @class An HTML Editor for use in Property View.
 * 
 * <p>
 * Additional feature: On pressing Shift-Space, an inline autocomplete helper is
 * invoked.
 * </p>
 * 
 * @extends Ext.form.HtmlEditor
 * @constructor
 * @param {Object}
 *            config The configuration object.
 */
uwm.property.HtmlEditor = function(config) {
	var self = this;
	
	uwm.property.HtmlEditor.superclass.constructor.call(this, Ext.apply(this, {
	    enableAlignments : false,
	    enableColors : false,
	    enableFont : false,
	    enableFontSize : false,
	    enableLinks : false,
	    enableSourceEdit : false,
	    listeners : {
	        "initialize" : function() {
		        self.handleInitialize();
	        },
	        "beforedestroy" : function(field) {
		        self.handleDestroy(field);
	        }
	    }
	}, config));
	
	this.toolTipText = config.toolTip
	this.modelNode = config.modelNode;
	
	if (config.readOnly) {
		
		this.autoMonitorDesignMode = false;
	}
}

Ext.extend(uwm.property.HtmlEditor, Ext.form.HtmlEditor);

uwm.property.HtmlEditor.prototype.handleInitialize = function() {
	
	var link = this.doc.createElement("link");
	link.setAttribute("rel", "stylesheet");
	link.setAttribute("type", "text/css");
	link.setAttribute("href", "css/htmledit.css");
	var head = this.doc.getElementsByTagName("head")[0];
	head.appendChild(link);
	
	if (this.readOnly) {
		
		this.doc.body.setAttribute("class", 'readOnly');
		try {
			Ext.EventManager.removeAll(this.doc);
		} catch (e) {
		}
		
		this.doc.designMode = "off";
	} else {
		this.doc.body.setAttribute("class", 'editable');
		
		Ext.EventManager.on(this.doc, 'keypress', function(e) {
			if (e.shiftKey && e.getKey() == e.SPACE) {
				this.insertAtCursor("<span id='" + uwm.property.HtmlEditor.INLINE_COMBO_BOX_SPAN_ID + "' />");
				
				this.span = this.doc.getElementById(uwm.property.HtmlEditor.INLINE_COMBO_BOX_SPAN_ID);
				var fullPreText = this.span.previousSibling.nodeValue;
				this.preText = "";
				
				if (fullPreText) {
					var matchArray = fullPreText.match(/[^\t\n ]+$/);
					if (matchArray) {
						this.preText = matchArray[0];
						this.span.previousSibling.nodeValue = fullPreText.substr(0, fullPreText.length - this.preText.length);
					}
				}
				
				this.wrap = new Ext.Layer();
				
				this.comboBox = new uwm.property.InlineComboBox( {
				    htmledit : this,
				    doc : this.doc,
				    renderTo : this.wrap.dom,
				    value : this.preText.trim()
				});
				
				var htmlpos = this.getPosition(true);
				var htmlbox = this.getBox();
				var combobox = this.comboBox.getBox();
				var spanbox = this.span.getBoundingClientRect();
				
				// the fixed offsets are determined by trial & error, no deeper
				// meaning (just looks better this way)
				this.wrap.setBounds(htmlbox.x - htmlpos[0] + spanbox.left, htmlbox.y - htmlpos[1] + spanbox.top + combobox.height * 1.1, combobox.width + 20, combobox.height);
				this.wrap.show();
				
				this.comboBox.focus(undefined, true);
			}
		}, this);
		
		var value = this.getValue();
		
		if (value == "&nbsp;" || value.trim() == "") {
			this.execCmd('delete');
			if (Ext.isIE) {
				e.updateToolbar();
			}
		}
	}
}

uwm.property.HtmlEditor.prototype.resolveInlineComboBox = function(newValue, newValueType) {
	this.comboBox.destroy();
	this.wrap.remove();
	this.span.parentNode.removeChild(this.span);
	this.insertAtCursor(" <span class='autocomplete-" + newValueType + "'>" + newValue + "</span>&ensp;");
	this.focus(undefined, 100);
}

uwm.property.HtmlEditor.prototype.revertInlineComboBox = function() {
	if (this.store) {
		this.comboBox.destroy();
	}
	this.wrap.remove();
	this.span.parentNode.removeChild(this.span);
	this.insertAtCursor(this.preText);
	this.focus(undefined, 100);
}

uwm.property.HtmlEditor.prototype.render = function(container, position) {
	uwm.property.HtmlEditor.superclass.render.apply(this, arguments);
	
	if (this.toolTipText) {
		this.toolTip = new Ext.ToolTip( {
		    target : container,
		    html : this.toolTipText
		});
	}
}

uwm.property.HtmlEditor.prototype.handleDestroy = function(field) {
	if (this.isDirty()) {
		var tmp = new Object();
		tmp[this.getName()] = this.getValue();
		
		this.modelNode.changeProperties(tmp);
	}
}

/**
 * This method is a copy out of ext-all-debug.js, with some additional checks
 * preventing failure if the HtmlEditor is destroyed before it is fully initialized.
 * 
 * TODO: Update for newer ExtJS-Versions (copied from 2.2.0)
 */
uwm.property.HtmlEditor.prototype.getEditorBody = function(){
	if (this.doc) {
		return this.doc.body || this.doc.documentElement;
	}
}

/**
* This method is a copy out of ext-all-debug.js, with some additional checks
* preventing failure if the HtmlEditor is destroyed before it is fully initialized.
* 
* TODO: Update for newer ExtJS-Versions (copied from 2.2.0)
*/
uwm.property.HtmlEditor.prototype.initEditor = function() {
	var dbody = this.getEditorBody();

	if (dbody) {
		var ss = this.el.getStyles('font-size', 'font-family', 'background-image', 'background-repeat');
		ss['background-attachment'] = 'fixed';
		dbody.bgProperties = 'fixed';
		
		Ext.DomHelper.applyStyles(dbody, ss);
		
		if (this.doc) {
			try {
				Ext.EventManager.removeAll(this.doc);
			} catch (e) {
			}
		}
		
		this.doc = this.getDoc();
		
		if (this.doc) {
			Ext.EventManager.on(this.doc, {
			    'mousedown' : this.onEditorEvent,
			    'dblclick' : this.onEditorEvent,
			    'click' : this.onEditorEvent,
			    'keyup' : this.onEditorEvent,
			    buffer : 100,
			    scope : this
			});
			
			if (Ext.isGecko) {
				Ext.EventManager.on(this.doc, 'keypress', this.applyCommand, this);
			}
			if (Ext.isIE || Ext.isSafari || Ext.isOpera) {
				Ext.EventManager.on(this.doc, 'keydown', this.fixKeys, this);
			}
			this.initialized = true;
			
			this.fireEvent('initialize', this);
			
			this.doc.editorInitialized = true;
			
			this.pushValue();
		}
	}
}

uwm.property.HtmlEditor.INLINE_COMBO_BOX_SPAN_ID = "inlineComboBoxSpanId";
