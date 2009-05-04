/*
 * This file was generated by wCMFGenerator 3.0.0004 from ./model/cwm.uml on Thu
 * Feb 12 11:45:24 CET 2009. Manual modifications should be placed inside the
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

cwm.ChiControllerClass = function() {
	cwm.ChiControllerClass.superclass.constructor.call(this);
	
	this.uwmClassName = "ChiController";
	this.instanceClassName = "cwm.ChiController";
	this.treeIcon = "FigureChiController";
	this.figureIcon = "FigureChiController";
	this.figureClass = "uwm.graphics.figure.RectangleFigure";
	this.initialWidth = 96;
	this.initialHeight = 95;
	this.description = " A ChiController, Views and Associations define the application flow. A controller represent the Business logic where a certain flow is physical implemented.";
	this.helpUrl = "help/index.html#ChiController|outline";
	this.defaultLabel = "New ChiController";
	this.semanticGroup = "domain";
	this.labelProperties = {
		Name : true
	};
	
	this.gridTabIconClass = "ChiControllerTab";
	this.gridTabTip = "Shows all <b>ChiController</b> within selected scope";
	this.gridFields = [ {
	    name : "oid",
	    mapping : "oid"
	}, {
	    name : "Label",
	    mapping : "Label"
	} ];
	this.gridColumns = [ {
	    header : "Label",
	    dataIndex : "Label",
	    sortable : true
	} ];
	
	this.connectionInfo = {
	    "ChiNode" : {
	        label : "instantiates",
	        invert : false,
	        connectionType : "association",
	        cardinality : 1
	    },
	    
	    "ChiController" : {
	        nmUwmClassName : "SourceEnd",
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
	            label : "Composition",
	            invert : false,
	            connectionType : "composition",
	            nmSelf : true,
	            cardinality : -1
	        } ]
		},
		"ChiBusinessUseCase": {
			label: "implemented by",
			invert: true,
			connectionType: 'composition',
			cardinality: 1
		},
		"ChiBusinessUseCaseCore": {
			label: "implemented by",
			invert: true,
			connectionType: 'composition',
			cardinality: 1
	    }
	};
	
	this.maskInfo = {
	    "TargetEnd" : "NMChiControllerChiController",
	    "SourceEnd" : "NMChiControllerChiController"
	};
}

Ext.extend(cwm.ChiControllerClass, uwm.model.ClassObjectClass);

cwm.ChiControllerClass.prototype.getPropertyForm = function(modelNode, isLockedByOtherUser) {
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

cwm.ChiControllerClass.prototype.getGraphics = function(label, figure) {
	return new uwm.graphics.figure.ClassFigure(label, figure);
}

cwm.ChiControllerClass.prototype.isAttributeEnabled = function() {
	return false;
}

uwm.model.ModelNodeClassContainer.getInstance().registerClass(new cwm.ChiControllerClass());
