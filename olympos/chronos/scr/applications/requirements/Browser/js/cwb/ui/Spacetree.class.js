/*
 * Copyright (c) 2010 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 * 
 * All rights reserved. This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License v1.0 which
 * accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code, this
 * entire header must remain intact.
 */

Ext.namespace("cwb.ui");

/**
 * Spacetree containing the package tree
 */
cwb.ui.Spacetree = function() {
	this.spacetreeCounter = 0;
	this.spacetreeCanvas = 0;
};

cwb.ui.Spacetree.prototype.show = function() {
	var json = cwb.ObjectContainer.getInstance().objectsForSpacetree;
	if (json.data) {
		// Containers for fillStyle, strokeStyle and lineWith canvas properties.
		var fStyle, sStyle, lineWidth;
		// Create a new canvas instance.
		this.spacetreeCanvas = this.spacetreeCanvas || new Canvas('mycanvas', {
		    //Where to inject canvas. Any HTML container will do.
		    'injectInto': cwb.ui.StructureTabPanel.PACKAGE_ID,
		    //Set width and height, default's to 200.
		    'width': 2000,
		    'height': 2000,
		    
		    //Set a background color in case the browser
		    // does not support clearing a specific area.
		    'backgroundColor': '#fff',
		    //Set canvas styles.
		    'styles': {
		        'fillStyle': '#eee',
		        'strokeStyle': '#111'
		    },
		    setColor: function(color) {
			    this.styles.fillStyle = color;
		    }
		});
		
		Tree.Label.nodeHash = {};
		cwb.Util.emptyDiv("mycanvas-label");
		cwb.Util.showDiv("mycanvas-label");
		
		// Create a new ST instance
		var self = this;
		var st = new ST(this.spacetreeCanvas, {
		    //Add an event handler to the node when creating it.
		    onCreateLabel: function(label, node) {
			    label.id = node.id;
			    label.innerHTML = "<div class='outer'><div class='inner'><img src='"+cwb.Config.baseHref+"img/icons/"+
			    	node.uwmClassName+".png' />"+node.name+"</div></div>";
			    // if (node.data[2]){
			    // canvas.setColor(node.data[2].value);
			    // }
			    label.onclick = function() {
				    st.onClick(label.id);
			    };
		    },
		    //Set color as selected if the node is selected.
		    onBeforePlotNode: function(node) {
			    var ctx = self.spacetreeCanvas.getCtx();
			    fStyle = ctx.fillStyle;
			    sStyle = ctx.strokeStyle;
			    if (node.selected) {
				    ctx.fillStyle = "#eee";
				    ctx.strokeStyle = "#000";
			    }
		    },
		    //Restore color.
		    onAfterPlotNode: function(node) {
			    var ctx = self.spacetreeCanvas.getCtx();
			    ctx.fillStyle = fStyle;
			    ctx.stroleStyle = sStyle;
		    },
		    //Set color as selected if the edge belongs to the path.
		    onBeforePlotLine: function(adj) {
			    var ctx = self.spacetreeCanvas.getCtx();
			    lineWidth = ctx.lineWidth;
			    sStyle = ctx.strokeStyle;
			    if (adj.nodeFrom.selected && adj.nodeTo.selected) {
				    ctx.strokeStyle = "#000";
				    ctx.lineWidth = 3;
			    }
		    },
		    //Restore color and line width
		    onAfterPlotLine: function(adj) {
			    var ctx = self.spacetreeCanvas.getCtx();
			    ctx.lineWidth = lineWidth;
			    ctx.stroleStyle = sStyle;
		    },
		    request: function(nodeId, level, onComplete) {
			    var self = this;
			    
			    cwb.persistency.Persistency.getInstance().display(nodeId.indexOf("_") > 0 ? nodeId.substring(0, nodeId.indexOf("_")): nodeId, 2, function(options, data) {
				    var result = self.loadFromDisplay(data.node);
				    
				    onComplete.onComplete(nodeId, result);
			    });
		    },
		    
		    loadFromDisplay: function(currNode) {
			    var result = {
			        id: currNode.oid + "_" + this.spacetreeCounter,
			        name: currNode.values[1].Name,
			        data: [ {
			            key: 'content',
			            value: 0
			        }, {
			            key: 'color',
			            value: 1
			        } ],
			        children: [],
			        uwmClassName: currNode.type
			    };
			    
			    this.spacetreeCounter++;
			    
			    for ( var currType in currNode) {
				    var currTypeData = currNode[currType];
				    
				    if (!(currTypeData instanceof Function)) {
					    switch (currType) {
						    case "values":
						    case "oid":
						    case "type":
						    case "properties":
							    //do nothing
								break;
							
							default:
								for ( var currNodeKey in currTypeData) {
									var currChild = currTypeData[currNodeKey];
									
									if (!(currChild instanceof Function)) {
										if (currChild.values && currChild.values[1] && currChild.values[1].Name) {
											result.children.push(this.loadFromDisplay(currChild));
										}
									}
								}
					    }
				    }
			    }
	
			    return result;
		    }
		});
		// load json data
		st.loadJSON(json);
		// compute node positions and layout
		st.compute();
		// optional: make a translation of the tree
		Tree.Geometry.translate(st.tree, new Complex(-200, 0), "startPos");
		// Emulate a click on the root node.
		st.onClick(st.tree.id);
	}
};
