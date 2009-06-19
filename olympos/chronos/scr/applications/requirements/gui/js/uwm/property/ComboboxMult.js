
Ext.namespace("uwm.property");

uwm.property.ComboboxMult = function(config){
		uwm.property.ComboboxMult.superclass.constructor.call(this, Ext.apply(this, {
		labelWidth: 75, 
		autoWidth : true 
		}, config));
	
	this.toolTipText = config.toolTip
	this.modelNode = config.modelNode;
	
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = 'side';
	
	var multiselect = new Ext.ux.Multiselect({
		enableToolbar	  :  true,
		name              :  'multiselect',
//		fieldLabel        :  config.fieldLabel+' Multiselect',
		dataFields        :  ['code', 'desc'], 
		data              :  [['1', 'One'], ['2', 'Two'], ['3', 'Three'], ['4', 'Four'], ['5', 'Five']],
		valueField        :  'code',
		displayField      :  'desc',
		width             :  150,
		height            :  150,
		allowBlank        :  true
	});
	
	this.add(multiselect);
	this.addButton('Get Value', function() { alert(formMultiselect.getForm().getValues(true)); })
	this.addButton('Set Value (2,3)', function() { multiselect.setValue('2,3'); })
	this.addButton('Mark Invalid', function() { multiselect.markInvalid('Invalid'); })
	this.addButton('Toggle Enabled', function() { if(!multiselect.disabled) {multiselect.disable();} else {multiselect.enable();} });
	this.addButton('Reset', function() { multiselect.reset();});

//	alert('before render form-ct-multiselect');
//	this.render('form-ct-multiselect','GoalInContext');
	alert('4');
}
Ext.extend(uwm.property.ComboboxMult, Ext.form.FormPanel);


uwm.property.ComboboxMult.prototype.render = function(container, position) {
	uwm.property.ComboboxMult.superclass.render.apply(this, arguments);
	
	if (this.toolTipText) {
		this.toolTip = new Ext.ToolTip( {
		    target : container,
		    html : this.toolTipText
		});
	}
}
/*
uwm.property.ComboboxMult.prototype.fieldChanged = function(field, newValue,
		oldValue) {
	this.persistValue(newValue);
}

uwm.property.ComboboxMult.prototype.handleDestroy = function(field) {
	if (this.isDirty()) {
		this.persistValue(this.getValue());
	}
}

uwm.property.ComboboxMult.prototype.persistValue = function(newValue) {
	this.originalValue = newValue;
	
	var tmp = new Object();
	tmp[this.getName()] = newValue;

	this.modelNode.changeProperties(tmp);
}
*/
