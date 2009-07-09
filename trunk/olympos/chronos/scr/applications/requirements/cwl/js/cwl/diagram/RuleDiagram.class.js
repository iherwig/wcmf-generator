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
Ext.namespace("cwl.diagram");

/**
 * @class One tab containing a Diagram.
 * 
 * @extends Ext.Panel
 * @constructor
 * @param {Object} config Configuraton of this tab.
 * @config diagram The diagram of this tab.
 */
cwl.diagram.RuleDiagram = function(config) {
	cwl.diagram.RuleDiagram.superclass.constructor.call(this, Ext.apply(this, {
		elements: "body",
    border: false,
	}, config));
	
	this.figures = new Ext.util.MixedCollection();
	this.objects = new Ext.util.MixedCollection();
	
	this.dropWindow = null;
	this.canvas = null;
  /*
  this.graph = new Graph();
  
  this.graph.addNode({
    id:'n0',
    name:'test',
    data:{}
  });*/
	
}

Ext.extend(cwl.diagram.RuleDiagram, Ext.Panel);

/**
 * Initiates the contained diagram.
 *
 * @private
 */
cwl.diagram.RuleDiagram.prototype.render = function() {
	cwl.diagram.RuleDiagram.superclass.render.apply(this, arguments);
	
  this.initCanvas();
  //this.initDropZone();
}

/**
 * Installs the canvas
 *
 * @private
 */
cwl.diagram.RuleDiagram.prototype.initCanvas = function() {
	/**
	 * The viewport of this diagram.
	 *
	 * @private
	 * @type Ext.Element
	 */
	this.viewPort = this.body;
	this.viewPort.applyStyles( {
	    overflow: "auto",
	    display: "block",
	    position: "fixed"
	});
	
	var canvasEl = Ext.DomHelper.append(this.viewPort, {
		tag: "div"
	}, true);
	canvasEl.applyStyles( {
	    width: this.workspaceWidth + "px",
	    height: this.workspaceHeight + "px"
	    //width: 100 + "px",
	    //height: 100 + "px"
	});

	/**
	 * The canvas of this diagram.
	 * 
	 * @private
	 * @type Canvas (JIT)
	 */
  this.canvas = new Canvas('mycanvas', {  
    'injectInto': canvasEl.id,
    'width': this.workspaceWidth,
    'height': this.workspaceHeight,
    'styles': {  
      'fillStyle': '#ccddee',  
      'strokeStyle': '#772277'  
    }
  });
}

/**
 * Initiates the drop zone of this diagram.
 *
 * @private
 */
cwl.diagram.RuleDiagram.prototype.initDropZone = function() {
	var self = this;
	
	/**
	 * The drop zone of this diagram.
	 * 
	 * @private
	 * @type cwl.diagram.DropZone
	 */
	this.dropZone = new cwl.diagram.DropZone(this.viewPort, {
		diagram : this
	});
}

cwl.diagram.RuleDiagram.prototype.addCondition = function(modelElement) {
  
}

cwl.diagram.RuleDiagram.prototype.addOperator = function(modelElement) {
}
