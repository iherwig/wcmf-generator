/*
 * This file was generated by wCMFGenerator 3.0.0004 from ./model/cwm.uml on Thu
 * Feb 12 11:45:26 CET 2009. Manual modifications should be placed inside the
 * protected regions. Copyright (c) 2009 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 * 
 * All rights reserved. This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License v1.0 which
 * accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code, this
 * entire header must remain intact.
 */
Ext.namespace("cwm");

cwm.ChiValueClass = function() {
	cwm.ChiValueClass.superclass.constructor.call(this);
	
	this.uwmClassName = "ChiValue";
	this.instanceClassName = "cwm.ChiValue";
	this.treeIcon = "FigureChiValue";
	this.figureIcon = "FigureChiValue";
	this.figureClass = "uwm.graphics.figure.RectangleFigure";
	this.description = " ";
	this.helpUrl = "help/index.html#ChiValue|outline";
	this.defaultLabel = "New ChiValue";
	this.semanticGroup = "domain";
	this.labelProperties = {
		Name : true
	};
	
	this.gridTabIconClass = "ChiValueTab";
	this.gridTabTip = "Shows all <b>ChiValue</b> within selected scope";
	this.gridFields = [ {
	    name : "oid",
	    mapping : "oid"
	}, {
	    name : "label",
	    mapping : "label"
	} ];
	this.gridColumns = [ {
	    header : "Label",
	    dataIndex : "label",
	    sortable : true
	} ];
	
	this.connectionInfo = {
		"ChiNode" : {
		    label : "has properties",
		    invert : true,
		    connectionType : "Composition"
		}
	
	};
}

Ext.extend(cwm.ChiValueClass, uwm.model.ModelNodeClass);

cwm.ChiValueClass.prototype.getPropertyForm = function(modelNode, isLockedByOtherUser) {
	return new uwm.property.PropertyForm( {
		items : [ new uwm.property.TextField( {
		    fieldLabel : 'Name',
		    toolTip : "the name of this object.",
		    name : 'Name',
		    
		    modelNode : modelNode,
		    
		    readOnly : isLockedByOtherUser
		}), new uwm.property.HtmlEditor( {
		    fieldLabel : 'Notes',
		    toolTip : "the actual description of the object.",
		    name : 'Notes',
		    
		    modelNode : modelNode,
		    
		    readOnly : isLockedByOtherUser
		}), new uwm.property.TextField( {
		    fieldLabel : 'default',
		    toolTip : "his reppresent the default value that a property takes automagically.",
		    name : 'default',
		    
		    modelNode : modelNode,
		    
		    readOnly : isLockedByOtherUser
		}), new uwm.property.TextField( {
		    fieldLabel : 'PropertyType',
		    toolTip : "this is the type of this property (e.g. string. int, etc.). not necessary",
		    name : 'PropertyType',
		    
		    modelNode : modelNode,
		    
		    readOnly : isLockedByOtherUser
		}), new uwm.property.ComboBox( {
		    fieldLabel : 'display_type',
		    toolTip : "The HTML display type for the attribute e.g. image<sup>11</sup>The interpretation of the display_type is done by DefaultValueRenderer or its subclasses..",
		    name : 'display_type',
		    listType : "DiplayType",
		    modelNode : modelNode,
		    disabled : isLockedByOtherUser
		}), new uwm.property.TextField( {
		    fieldLabel : 'restrictions_description',
		    toolTip : "A text describing the restrictions (both the negative and the positives), which will be shown in case of an error.",
		    name : 'restrictions_description',
		    
		    modelNode : modelNode,
		    
		    readOnly : isLockedByOtherUser
		}), new uwm.property.TextField( {
		    fieldLabel : 'restrictions_match',
		    toolTip : "Regular expression, which must be matched by the attribute value<sup>11</sup>The PHP function preg_match is used for comparison..",
		    name : 'restrictions_match',
		    
		    modelNode : modelNode,
		    
		    readOnly : isLockedByOtherUser
		}), new uwm.property.TextField( {
		    fieldLabel : 'restrictions_not_match',
		    toolTip : "Regular expression, which must not be matched by the attribute value<sup>11</sup>The PHP function preg_match is used for comparison..",
		    name : 'restrictions_not_match',
		    
		    modelNode : modelNode,
		    
		    readOnly : isLockedByOtherUser
		}), new uwm.property.ComboBox( {
		    fieldLabel : 'input_type',
		    toolTip : "Definition of the attribute's input control in the HTML form<sup>11</sup>The interpretation of the input_type is done by DefaultControlRenderer or its subclasses..",
		    name : 'input_type',
		    listType : "InputType",
		    modelNode : modelNode,
		    disabled : isLockedByOtherUser
		}), new uwm.property.TextField( {
		    fieldLabel : 'app_data_type',
		    toolTip : "The attribute's application datatype. This can be used in the application to group attributes and execute special logic on them.",
		    name : 'app_data_type',
		    
		    modelNode : modelNode,
		    
		    readOnly : isLockedByOtherUser
		}), new uwm.property.TextField( {
		    fieldLabel : 'db_data_type',
		    toolTip : "The atribute's database type. This will be used in the table definition. e.g. INT, VARCHAR, TEXT, ...",
		    name : 'db_data_type',
		    
		    modelNode : modelNode,
		    
		    readOnly : isLockedByOtherUser
		}), 
		
		new uwm.property.Checkbox( {
			fieldLabel : 'is_editable',
			toolTip : "Declares, if the attribute is editable in the UI. The backend can always edit atributes",
			name : 'is_editable',	
			modelNode : modelNode,
			stateful : true,
		    disabled : isLockedByOtherUser
		}), 
		new uwm.property.TextField( {
		    fieldLabel : 'column_name',
		    toolTip : "The name of the database column. If not given the attribute name will be used.",
		    name : 'column_name',
		    
		    modelNode : modelNode,
		    
		    readOnly : isLockedByOtherUser
		}), new uwm.property.ComboBox({
			fieldLabel: 'Author',
			toolTip: "This ChiValue's author's name and role in the project",
			name: 'Author',
			listType: "ChiAuthors",
			modelNode: modelNode,
			disabled : isLockedByOtherUser
		}), new uwm.property.ComboBox({
			fieldLabel: 'Status',
			toolTip: "state",
			name: 'Status',
			listType: "ChiStatus",
			modelNode: modelNode,
			disabled : isLockedByOtherUser
		}), new uwm.property.TextField( {
		    fieldLabel : 'created',
		    toolTip : "the creation date of this object",
		    name : 'created',
		    
		    modelNode : modelNode,
		    
		    readOnly : true
		}), new uwm.property.TextField( {
		    fieldLabel : 'creator',
		    toolTip : "the user that created this object",
		    name : 'creator',
		    
		    modelNode : modelNode,
		    
		    readOnly : true
		}), new uwm.property.TextField( {
		    fieldLabel : 'last_editor',
		    toolTip : "the last user that edited this object",
		    name : 'last_editor',
		    
		    modelNode : modelNode,
		    
		    readOnly : true
		}), new uwm.property.TextField( {
		    fieldLabel : 'modified',
		    toolTip : "the date when this object was modified",
		    name : 'modified',
		    
		    modelNode : modelNode,
		    
		    readOnly : true
		}) ]
	});
}

cwm.ChiValueClass.prototype.getGraphics = function(label, figure) {
	return new uwm.graphics.figure.ImageFigure(label, figure, "../application/images/ChiValue.PNG", 96, 95, 96, 95);
}

uwm.model.ModelNodeClassContainer.getInstance().registerClass(new cwm.ChiValueClass());
