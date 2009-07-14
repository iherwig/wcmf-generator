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
Ext.namespace("cwl.objecttree");

/**
 * @class The Model Tree (lower left view).
 * 
 * <p>
 * This tree displays models, packages and contained diagrams and model objects.
 * </p>
 * 
 * <p>
 * The Model Tree is a <i>Singleton</i>.
 * </p>
 * 
 * @extends Ext.tree.TreePanel
 * @constructor
 * @param {Object}
 *            config The configuration object.
 */
cwl.objecttree.ObjectTree = function() {
}

cwl.objecttree.ObjectTree = Ext.extend(Ext.tree.TreePanel, {
	initComponent : function() {
    var self = this;
    
		Ext.apply(this, {
		    width: 250,
		    autoScroll: true,
		    animate: true,
		    containerScroll: true,
		    rootVisible: false,
        layout: 'fit',
        appendOnly: true,
        enableDD: true,
        dropConfig: {
          ddGroup: cwl.Constants.DD_GROUP,
          allowContainerDrop: true,
          onContainerDrop: function(source, e, data) {
            e.dropNode = data.node;
            return self.fireEvent('nodedrop', e);
          },
          onContainerOver: function(source, e, data) {
            return self.checkDropable(data.node) ? this.dropAllowed : this.dropNotAllowed;
          },
        },
        dragConfig: {
          ddGroup: cwl.Constants.DD_GROUP
        },        
		    title: chi.Dict.translate("Object In Use"),
        header: false
		});
    
		cwl.objecttree.ObjectTree.superclass.initComponent.apply(this, arguments);
    
    this.on('nodedrop', function(e) {
      self.receiveModelNode(e.dropNode);
    });
		
		this.setRootNode(new cwl.objecttree.UsedObjectsPackage());
	}
});

cwl.objecttree.ObjectTree.prototype.render = function() {
	cwl.objecttree.ObjectTree.superclass.render.apply(this, arguments);
  
	// make sure that the container drop zone covers the whole area
  this.dropZone.setPadding(0, 0, 10000, 0);
}

cwl.objecttree.ObjectTree.prototype.loadTree = function(currPackage) {
	var currNode = new cwl.objecttree.Node( {
		modelElement : currPackage
	});
	var children = currPackage.getChildren();
	
	var self = this;
	
	children.each( function(currChild) {
		if (currChild instanceof cwl.model.ModelPackage) {
			currNode.appendChild(self.loadTree(currChild));
		} else {
			currNode.appendChild(new cwl.objecttree.Node( {
				modelElement : currChild
			}));
		}
	});
	
	return currNode;
}

/**
 * Check if a node can be dropped
 */
cwl.objecttree.ObjectTree.prototype.checkDropable = function(modelData) {
  if (modelData.getModelElement().getType() == "ChiNode" || modelData.getModelElement().getType() == "ChiObject")
    return true;
  return false;
}

/**
 * Convert a Node dragged from the ModelTree to the owned format
 */
cwl.objecttree.ObjectTree.prototype.receiveModelNode = function(modelData) {
  if (this.checkDropable(modelData)) {
    var modelElement = modelData.getModelElement();
    //var objectNode = new cwl.objecttree.ObjectNode(Ext.apply({}, modelData.attributes));
    var objectNode = new cwl.objecttree.ObjectNode({modelElement: modelElement});
    
    // append attributes
    var attributes = modelElement.getAttributes();
    for (var i=0; i<attributes.length; i++) {
      var e = new cwl.model.ChiValue(modelElement);
      e.cwlModelElementId = Ext.id();
      e.name = attributes[i];
      e.type = "ChiValue";
      e.treeIconClass = "FigureChiValue";
      
      objectNode.appendChild(new cwl.modeltree.Node({
        text: attributes[i],
        iconCls : "FigureChiValue",
        modelElement: e
      }));
    }
    
    // create instance name
    objectNode.text = "My" + modelElement.getName() + ": " + modelElement.getName();
    objectNode.iconCls = "FigureChiObject";
    
    this.root.appendChild(objectNode);
  }
}

/**
 * Returns the instance of ObjectTree.
 *
 * @return The instance of ObjectTree.
 * @type cwl.objecttree.ObjectTree
 */
cwl.objecttree.ObjectTree.getInstance = function() {
	if (!cwl.objecttree.ObjectTree.instance) {
		cwl.objecttree.ObjectTree.instance = new cwl.objecttree.ObjectTree();
	}
	
	return cwl.objecttree.ObjectTree.instance;
}
