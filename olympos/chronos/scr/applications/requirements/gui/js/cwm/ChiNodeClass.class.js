/*
 * This file was generated by wCMFGenerator 3.0.0004 from ./model/cwm.uml on Thu
 * Feb 12 11:45:25 CET 2009. Manual modifications should be placed inside the
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

cwm.ChiNodeClass = function() {
	cwm.ChiNodeClass.superclass.constructor.call(this);
	
	this.uwmClassName = "ChiNode";
	this.instanceClassName = "cwm.ChiNode";
	this.treeIcon = "FigureChiNode";
	this.figureIcon = "FigureChiNode";
	this.figureClass = "uwm.graphics.figure.RectangleFigure";
	this.initialWidth = 96;
	this.initialHeight = 95;
	this.description = " A Domain Object type used in Chronos. ChiNodes and ChiValues define the application data model.";
	this.helpUrl = "help/index.html#ChiNode|outline";
	this.defaultLabel = "New ChiNode";
	this.semanticGroup = "domain";
	this.labelProperties = {
		Name : true
	};
	
	this.gridTabIconClass = "ChiNodeTab";
	this.gridTabTip = "Shows all <b>ChiNode</b> within selected scope";
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
	    "ChiController" : {
	        label : "instantiates",
	        invert : true,
	        connectionType : "Association",
	        cardinality : 1
	    }

	    ,
	    
		"ChiObject": {
			label: "is instance of",
			invert: true,
			invertBackendRelation: true,
			connectionType: "is instance of",
			cardinality: -1
		}

	    ,
	    
	    "ChiValue" : {
	        label : "has properties",
	        invert : false,
	        connectionType : "Composition",
	        cardinality : -1
	    }

	    ,
	    
	    "Operation" : {
	        label : "Contains",
	        invert : false,
	        connectionType : "Composition",
	        cardinality : -1
	    },
	    "ChiNode" : {
	        nmUwmClassName : "NodeSourceEnd",
	        connections : [ {
	            label : "Generalization",
	            invert : false,
	            connectionType : "generalization",
	            nmSelf : true,
	            cardinality : -1
	        }, {
	            label : "Association",
	            invert : false,
	            connectionType : "association",
	            nmSelf : true,
	            cardinality : -1
	        }, {
	            label : "Aggregation",
	            invert : false,
	            connectionType : "aggregation",
	            nmSelf : true,
	            cardinality : -1
	        }, {
	            label : "Composition",
	            invert : false,
	            connectionType : "composition",
	            nmSelf : true,
	            cardinality : -1
	        } ]
	    }
	
	};
	
	this.maskInfo = {
	    "NodeTargetEnd" : "NMChiNodeChiNode",
	    "NodeSourceEnd" : "NMChiNodeChiNode"
	};
}

Ext.extend(cwm.ChiNodeClass, uwm.model.ClassObjectClass);

cwm.ChiNodeClass.prototype.getPropertyForm = function(modelNode, isLockedByOtherUser) {
	return new uwm.property.PropertyForm(
	        {
		        items : [
		                new uwm.property.TextField( {
		                    fieldLabel : 'Name',
		                    toolTip : "the name of this object.",
		                    name : 'Name',
		                    
		                    modelNode : modelNode,
		                    
		                    readOnly : isLockedByOtherUser
		                }),
		                new uwm.property.HtmlEditor( {
		                    fieldLabel : 'Notes',
		                    toolTip : "the actual description of the object.",
		                    name : 'Notes',
		                    
		                    modelNode : modelNode,
		                    
		                    readOnly : isLockedByOtherUser
		                }),
		                new uwm.property.TextField( {
		                    fieldLabel : 'display_value',
		                    toolTip : "The value that is displayed in a list view. a single value or '|' -separated list of values",
		                    name : 'display_value',
		                    
		                    modelNode : modelNode,
		                    
		                    readOnly : isLockedByOtherUser
		                }),
		                new uwm.property.TextField( {
		                    fieldLabel : 'parent_order',
		                    toolTip : "The order of the associated parents. a single value or '|' -separated list of values",
		                    name : 'parent_order',
									                    
		                    modelNode : modelNode,	
								                    
		                    readOnly : isLockedByOtherUser
		                }),
		                new uwm.property.TextField( {
		                    fieldLabel : 'child_order',
		                    toolTip : "The order of the associated children. a single value or '|' -separated list of values",
		                    name : 'child_order',		                    
		                    modelNode : modelNode,		
		
		                    readOnly : isLockedByOtherUser
							
		                }),
		                new uwm.property.TextField( {
		                    fieldLabel : 'pk_name',
		                    toolTip : "The name of the primary key column on the database (optional). The generator will add this automatically if there is no appropriate attribute.",
		                    name : 'pk_name',	
								                    
		                    modelNode : modelNode,	
								                    
		                    readOnly : isLockedByOtherUser
		                }),
						
						new uwm.property.Checkbox( {
							fieldLabel : 'is_searchable',							
							name : 'is_searchable',	
							modelNode : modelNode,
							stateful : true,
		                    disabled : isLockedByOtherUser	
								                    
						}),
						
		                new uwm.property.TextField( {
		                   	fieldLabel : 'orderby',
		                    toolTip : "Definition of default sorting. Possible values: 'none' (no order), 'sortkey' (generates a 'sortkey' column, that is used for explicit sorting) or any the name of any WCMFValue defined in the node optionally.",
		                    name : 'orderby',		                            
		                    modelNode : modelNode,		                            
		                    readOnly : isLockedByOtherUser
		                }), 
								
						new uwm.property.Checkbox( {
							fieldLabel : 'is_soap',
							name : 'is_soap',	
							modelNode : modelNode,
							stateful : true,
		                    disabled : isLockedByOtherUser
		                }),
						
						new uwm.property.TextField( {
		                    fieldLabel : 'initparams',
		                    toolTip : "Name of the configuration file's (config.ini) section, in which the initial parameters for the corresponding mapper are defined",
		                    name : 'initparams',
		                    
		                    modelNode : modelNode,
		                    
		                    readOnly : isLockedByOtherUser
							
		                }), new uwm.property.TextField( {
		                    fieldLabel : 'table_name',
		                    toolTip : "",
		                    name : 'table_name',
		                    
		                    modelNode : modelNode,
		                    
		                    readOnly : isLockedByOtherUser
		                }), 
						
						new uwm.property.Checkbox( {
							fieldLabel : 'is_ordered',
							name : 'is_ordered',	
							modelNode : modelNode,
							stateful : true,
		                    disabled : isLockedByOtherUser
		                }), 
						
						new uwm.property.TextField( {
		                    fieldLabel : 'Alias',
		                    toolTip : "the Project Id of this object.",
		                    name : 'Alias',
		                    
		                    modelNode : modelNode,
		                    
		                    readOnly : isLockedByOtherUser
		                }), new uwm.property.TextField( {
		                    fieldLabel : 'Version',
		                    toolTip : "the model version of this object",
		                    name : 'Version',
		                    
		                    modelNode : modelNode,
		                    
		                    readOnly : isLockedByOtherUser
		                }), new uwm.property.ComboBox({
			fieldLabel: 'Author',
			toolTip: "This ChiNode's author's name and role in the project",
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

cwm.ChiNodeClass.prototype.getGraphics = function(label, figure) {
	return new uwm.graphics.figure.ClassFigure(label, figure);
}

uwm.model.ModelNodeClassContainer.getInstance().registerClass(new cwm.ChiNodeClass());
