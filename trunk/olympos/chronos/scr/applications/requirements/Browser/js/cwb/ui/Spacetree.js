/**
 * Hand tool for scrolling
 * 
 * @param {Event}
 *            e
 */
startDragScroll = function(e) {
	this.scrolling = true;
	this.oldPosition = e.screenY;
	document.body.style.cursor = "pointer";
}

dragScroll = function(e) {
	if (this.scrolling) {
		if (this.oldPosition) {
			window.scrollBy(0, this.oldPosition - e.screenY);
			this.oldPosition = e.screenY;
		}
	}
}

stopDragScroll = function(e) {
	this.scrolling = false;
	this.oldPosition = null;
	document.body.style.cursor = "default";
}

init = function() {
	if (cwb.ObjectContainer.getInstance().modelLoaded) {
		start();
	} else {
		Ext.get(cwb.ui.StructureTabPanel.PACKAGE_ID).innerHTML = cwb.Dict.translate('Please select a model.');
	}
}

var spacetreeCounter = 0;
var spacetreeCanvas = null;

function start() {
	var json = cwb.ObjectContainer.getInstance().objectsForSpacetree;
	// var json = ObjectContainer.getInstance().objectsForSpacetree;
	
	// Containers for fillStyle, strokeStyle and lineWith canvas properties.
	var fStyle, sStyle, lineWidth;
	// Create a new canvas instance.
	spacetreeCanvas = spacetreeCanvas || new Canvas('mycanvas', {
	    //Where to inject canvas. Any HTML container will do.
	    'injectInto' : cwb.ui.StructureTabPanel.PACKAGE_ID,
	    //Set width and height, default's to 200.
	    'width' : 2000,
	    'height' : 2000,
	    
	    //Set a background color in case the browser
	    // does not support clearing a specific area.
	    'backgroundColor' : '#fff',
	    //Set canvas styles.
	    'styles' : {
	        'fillStyle' : '#eee',
	        'strokeStyle' : '#111'
	    },
	    setColor : function(color) {
		    this.styles.fillStyle = color;
	    }
	});
	
	Tree.Label.nodeHash = {};
	cwb.Util.emptyDiv("mycanvas-label");
	cwb.Util.showDiv("mycanvas-label");
	
	// Create a new ST instance
	var st = new ST(spacetreeCanvas, {
	    //Add an event handler to the node when creating it.
	    onCreateLabel : function(label, node) {
		    label.id = node.id;
		    label.innerHTML = "<div class='outer'><div class='inner'><img src=\"img/icons/" + node.uwmClassName + ".png\" />" + node.name + "</div></div>";
		    // if (node.data[2]){
		    // canvas.setColor(node.data[2].value);
		    // }
		    label.onclick = function() {
			    st.onClick(label.id);
		    };
	    },
	    //Set color as selected if the node is selected.
	    onBeforePlotNode : function(node) {
		    var ctx = spacetreeCanvas.getCtx();
		    fStyle = ctx.fillStyle;
		    sStyle = ctx.strokeStyle;
		    if (node.selected) {
			    ctx.fillStyle = "#eee";
			    ctx.strokeStyle = "#000";
		    }
	    },
	    //Restore color.
	    onAfterPlotNode : function(node) {
		    var ctx = spacetreeCanvas.getCtx();
		    ctx.fillStyle = fStyle;
		    ctx.stroleStyle = sStyle;
	    },
	    //Set color as selected if the edge belongs to the path.
	    onBeforePlotLine : function(adj) {
		    var ctx = spacetreeCanvas.getCtx();
		    lineWidth = ctx.lineWidth;
		    sStyle = ctx.strokeStyle;
		    if (adj.nodeFrom.selected && adj.nodeTo.selected) {
			    ctx.strokeStyle = "#000";
			    ctx.lineWidth = 3;
		    }
	    },
	    //Restore color and line width
	    onAfterPlotLine : function(adj) {
		    var ctx = spacetreeCanvas.getCtx();
		    ctx.lineWidth = lineWidth;
		    ctx.stroleStyle = sStyle;
	    },
	    request : function(nodeId, level, onComplete) {
		    var self = this;
		    
		    cwb.persistency.Persistency.getInstance().display(nodeId.indexOf("_") > 0 ? nodeId.substring(0, nodeId.indexOf("_")) : nodeId, 2, function(options, data) {
			    var result = self.loadFromDisplay(data.node);
			    
			    onComplete.onComplete(nodeId, result);
		    });
	    },
	    
	    loadFromDisplay : function(currNode) {
		    var result = {
		        id : currNode.oid + "_" + spacetreeCounter,
		        name : currNode.values[1].Name,
		        data : [ {
		            key : 'content',
		            value : 0
		        }, {
		            key : 'color',
		            value : 1
		        } ],
		        children : [],
		        uwmClassName : currNode.type
		    };
		    
		    spacetreeCounter++;
		    
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
	st.loadFromJSON(json);
	// compute node positions and layout
	st.compute();
	// optional: make a translation of the tree
	Tree.Geometry.translate(st.tree, new Complex(-200, 0), "startPos");
	// Emulate a click on the root node.
	st.onClick(st.tree.id);
}
