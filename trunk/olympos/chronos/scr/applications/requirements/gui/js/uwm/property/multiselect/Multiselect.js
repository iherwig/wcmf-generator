Ext.namespace("Ext.ux");

/**
 * @class Ext.ux.Multiselect
 * Ext implementation of the traditional HTML select/multiple widget
 * @param {Object} config The configuration properties. These include all the config options of
 * {@link Ext.form.Field} plus some specific to this class.<br>
 * 
 */

Ext.ux.Multiselect = function(config){

	Ext.ux.Multiselect.superclass.constructor.call(this, config);
	
	this.addEvents({
		'dblclick' : true,
		'click' : true,
		'change' : true,
		'drop' : true
	});
	this.on('valid', this.onValid);
	this.on('invalid', this.onInvalid);

}
Ext.extend(Ext.ux.Multiselect, Ext.form.Field,  {
		
	store             :  null,
	dataFields		  :  ["key", "val"],  
	data			  :	 null, 
	width             :  0,
	height            :  0,
 	valueField        :  0,
 	displayField      :  1,
	minLength         :  0,
	maxLength         :  Number.MAX_VALUE,
	blankText         :  Ext.form.TextField.prototype.blankText,
	minLengthText     : 'Minimum {0} item(s) required',
	maxLengthText     : 'Maximum {0} item(s) allowed',
	isFormField       :  true,
	copy              :  false,
	allowDup          :  false,
	enableToolbar     :  false,
	focusClass        :  undefined,
	delimiter         :  ',',
	legend            :  null,
	view              :  null,
	draggable         :  false,
	defaultAutoCreate :  {tag: "input", type: "hidden", value: ""},
    
    // private
    afterRender : function(){
        Ext.form.Field.superclass.afterRender.call(this);
        this.initValue();
        this.initEvents();
    },

    // private
    initEvents : function(){
        this.el.on(Ext.isIE || Ext.isSafari3 ? "keydown" : "keypress", this.fireKey,  this);
        this.el.on("focus", this.onFocus,  this);
        this.el.on("blur", this.onBlur,  this);

        // reference to original value for reset
        this.originalValue = this.getValue();
    },

    // private
    initValue : function(){
        if(this.value !== undefined){
            this.setValue(this.value);
//        }else if(this.el.dom.value.length > 0 && this.el.dom.value != this.emptyText){
//            this.setValue(this.el.dom.value);
        }

        // reference to original value for reset
        this.originalValue = this.getValue();
    },

	
	onRender : function(ct, position) {

		var fs, div, cls, lw, lh, toolbardiv, tpl;
	
		this.el = ct.createChild(); 
		this.el.dom.style.zoom = 1;
		this.el.addClass(this.fieldCls);
		this.el.setWidth(this.width);
		this.el.setHeight(this.height);
	
		if (this.legend && this.legend.length) {
			fs = new Ext.form.FieldSet({legend:this.legend, labelHide:true});
			fs.render(this.el);
			div = fs.getEl();
		} else {
			div = this.el.createChild({tag: div});
		}

		if (!this.store) {
			this.store = new Ext.data.SimpleStore({
				fields: this.dataFields,
				data : this.data
			});
		}
		
		this.store.on('clear', this.reset, this);
			
		cls = 'x-combo-list';
		
		this.list = new Ext.Layer({
			shadow: false, cls: [cls, 'ux-mselect-valid'].join(' '), constrain:false
		}, div);
		
		lw = this.width - this.el.getFrameWidth('lr');
		lh = this.height - this.el.getFrameWidth('tb');

		this.list.setWidth(lw);
		this.list.setHeight(lh);
		this.list.swallowEvent('mousewheel');

		if (fs) {
			lh = lh - 15;
			if (Ext.isIE7 || Ext.isIE) { lh = lh - 10; }
		}
		
		if(this.enableToolbar){
			toolbardiv = this.list.createChild({tag:'div'});
			this.toolbar=new Ext.Toolbar(toolbardiv);
			lh = lh - 27;
		}
		
		this.innerList = this.list.createChild({tag: 'div', cls: cls + '-inner'});
		this.innerList.setWidth(lw - this.list.getFrameWidth('lr'));
		this.innerList.setHeight(lh - this.list.getFrameWidth('tb'));
				
		if (Ext.isIE || Ext.isIE7) {
			tpl = '<div unselectable=on class="' + cls + '-item ux-mselect-pointer">{' + this.displayField + '}</div>';
		} else {
			tpl = '<div class="' + cls + '-item ux-mselect-pointer x-unselectable">{' + this.displayField + '}</div>';
		}

		if (this.draggable) {
			this.view = new Ext.ux.DDView(this.innerList, tpl, {
				multiSelect: true, store: this.store, selectedClass: 'x-combo-selected'
				, allowDup:this.allowDup, copy: this.copy, allowCopy: false, dragGroup: this.dragGroup, dropGroup: this.dragGroup, jsonRoot: 'collection'
			});
		} else {
			this.view = new Ext.ux.DDView(this.innerList, tpl, {
				multiSelect: true, store: this.store, selectedClass: 'x-combo-selected'
			});			
		}
		this.view.on('drop', function(ddView, n, dd, e, data, r){
	    	return this.fireEvent("drop", ddView, n, dd, e, data, r);
		}, this);
		
		this.view.on('click', this.onViewClick, this);
		this.view.on('beforeClick', this.onViewBeforeClick, this);
		this.view.on('dblclick', this.onViewDblClick, this);
		
		this.list.setStyle('position', '');
		this.list.show();
		
		this.hiddenName = this.name;
		this.defaultAutoCreate.name = this.name;
		if (this.isFormField) { 
			this.hiddenField = this.el.createChild(this.defaultAutoCreate);
		} else {
			this.hiddenField = Ext.get(document.body).createChild(this.defaultAutoCreate);
		}
	},

	onViewClick: function(vw, index, node, e) {
		var arrayIndex = this.preClickSelections.indexOf(index);
		if (arrayIndex  != -1)
		{
			this.preClickSelections.splice(arrayIndex, 1);
			this.view.clearSelections(true);
			this.view.select(this.preClickSelections);
		}
		this.fireEvent('change', this, this.getValue(), this.hiddenField.dom.value);
		this.hiddenField.dom.value = this.getValue();
		this.fireEvent('click', this, e);
		this.validate();
		
	},

	onViewBeforeClick: function(vw, index, node, e) {
		this.preClickSelections = this.view.getSelectedIndexes();
		if (this.disabled) {return false;}
	},

	onViewDblClick : function(vw, index, node, e) {
		return this.fireEvent('dblclick', vw, index, node, e);
	},

	getValue: function(valueField){
		var returnArray = [];
		var selectionsArray = this.view.getSelectedIndexes();
		if (selectionsArray.length == 0) {return '';}
		for (var i=0; i<selectionsArray.length; i++) {
			returnArray.push(this.store.getAt(selectionsArray[i]).get(((valueField != null)? valueField : this.valueField)));
		}
		return returnArray.join(this.delimiter);
	},

	setValue: function(values) {
		var index;
		var selections = [];
		this.view.clearSelections();
		this.hiddenField.dom.value = '';
		
		if (!values || (values == '')) { return; }
		
		if (!(values instanceof Array)) { values = values.split(this.delimiter); }
		for (var i=0; i<values.length; i++) {
			index = this.view.store.indexOf(this.view.store.query(this.valueField, 
				new RegExp('^' + values[i] + '$', "i")).itemAt(0));
			selections.push(index);
		}
		this.view.select(selections);
		this.hiddenField.dom.value = this.getValue();
		this.validate();
	},
	
	reset : function() {
		this.setValue('');
	},
	
	getRawValue: function(valueField) {
        var tmp = this.getValue(valueField);
        if (tmp.length) {
            tmp = tmp.split(this.delimiter);
        }
        else{
            tmp = [];
        }
        return tmp;
    },

    setRawValue: function(values){
        setValue(values);
    },

    validateValue : function(value){
        if (value.length < 1) { // if it has no value
             if (this.allowBlank) {
                 this.clearInvalid();
                 return true;
             } else {
                 this.markInvalid(this.blankText);
                 return false;
             }
        }
        if (value.length < this.minLength) {
            this.markInvalid(String.format(this.minLengthText, this.minLength));
            return false;
        }
        if (value.length > this.maxLength) {
            this.markInvalid(String.format(this.maxLengthText, this.maxLength));
            return false;
        }
        return true;
    },
	
	onValid : function() {
		this.list.addClass('ux-mselect-valid');
		this.list.removeClass('ux-mselect-invalid');
	},
	
	onInvalid : function() {
		this.list.addClass('ux-mselect-invalid');
		this.list.removeClass('ux-mselect-valid');
	}
});
