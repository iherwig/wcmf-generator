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
 * Treemap containing the package weight
 */
cwb.ui.Treemap = function() {
}

cwb.ui.Treemap.prototype.show = function() {
	Ext.get(cwb.ui.StructureTabPanel.WEIGHT_ID).dom.style.width = (window.innerWidth - 80) + "px";
	Ext.get(cwb.ui.StructureTabPanel.WEIGHT_ID).dom.style.height = (window.innerHeight - 20) + "px";

	var json = parent.cwb.ObjectContainer.getInstance().objectsForTreemap;
	
	var tm = new TM.Squarified( {
	    //main container id.
	    rootId : cwb.ui.StructureTabPanel.WEIGHT_ID,
	    //orientation
	    orientation : "v",
	    
	    Color : {
	        //Allow coloring
	        allow : true,
	        // <irrelevant, colors are now calculated differently>
	        // Set min value and max value for
	        // the second *dataset* object values.
	        // Default's to -100 and 100.
	        minValue : 0,
	        maxValue : 2,
	        tips : true,
	        //Set color range. Default's to reddish and
	        // greenish. It takes an array of three
	        // integers as R, G and B values.
	        maxColorValue : [ 0, 255, 50 ],
	        minColorValue : [ 255, 0, 50 ]
	    // </irrelevant>
	    },
	    onAfterCompute : function() {
		    var that = this, parent;
		    var cssId = '#'+cwb.ui.StructureTabPanel.WEIGHT_ID;
		    $$(cssId+' .leaf', cssId+' .head').each( function(elem, i) {
			    //get the JSON tree node element having the same id
			        // as the dom element queried and makeTip.
			        if (p = elem.getParent()) {
				        var sTree = TreeUtil.getSubtree(tm.tree, p.id);
				        if (sTree)
					        that.makeTip(elem, sTree);
			        }
		        });
	    },
	    //Tooltip content is setted by setting the *title* of the element to be *tooltiped*.
	    // Read the mootools docs for further understanding.
	    makeTip : function(elem, json) {
		    var title = json.name;
		    var html = this.makeHTMLFromData(json.data);
		    elem.store('tip:title', title).store('tip:text', html);
	    },
	    //Take each dataset object key and value and make an HTML from it.
	    makeHTMLFromData : function(data) {
		    var html = '';
		    html += parent.cwb.Dict.translate('Content') + ': ' + data[0].value + '<br />';
		    // Insert further tooltip information here.
		    return html;
	    }
	});
	tm.loadFromJSON(json);
}
