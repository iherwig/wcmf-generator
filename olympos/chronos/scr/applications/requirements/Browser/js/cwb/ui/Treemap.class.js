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

/*
 * JIT Treemap overrides
 */
TM.Squarified.implement({
	/*
	 * Override setColor method to use our own scheme
	 */
	'setColor': function(json) {
		var x = json.data.$color;
		var switchColors=function(dataValue){
			switch(dataValue){
				case 1:
				return '#e42217';
				break;
				case 2:
				return '#f87217';
				break;
				case 3:
				return '#fffa40';
				break;
				case 4:
				return '#b1fb17';
				break;
				case 5:
				default:
				return '#6cc217';
				break;
			}
		}
		return switchColors(x);
	}
});



/**
 * Treemap containing the package weight
 */
cwb.ui.Treemap = function() {
};

cwb.ui.Treemap.prototype.show = function() {
	var objContainer = cwb.ObjectContainer.getInstance();
	
	var self = this;
	
	objContainer.loadJitData(objContainer.currModelOid, function() {
		self.showTreemap();
	});
};

cwb.ui.Treemap.prototype.showTreemap = function() {
	var objContainer = cwb.ObjectContainer.getInstance();
	
	if (objContainer.modelLoaded) {
		
		var json = objContainer.objectsForTreemap;
		var tm = new TM.Squarified( {
			// Where to inject the treemap.
			rootId : cwb.ui.StructureTabPanel.WEIGHT_ID,

			// Add click handlers for
			// zooming the Treemap in and out
			addLeftClickHandler : true,
			addRightClickHandler : true,

			// When hovering a node highlight the nodes
			// between the root node and the hovered node. This
			// is done by adding the 'in-path' CSS class to each node.
			selectPathOnHover : true,

			Color : {
				// Allow coloring
				allow : true,
				// <irrelevant, colors are now calculated differently, see above>
				// Set min value and max value constraints
				// for the *$color* property value.
				// Default's to -100 and 100.
				minValue : 0,
				maxValue : 5,
				tips : true,
				// Set color range. Default's to reddish and greenish.
				// It takes an array of three
				// integers as R, G and B values.
				maxColorValue : [ 0, 255, 50 ],
				minColorValue : [ 255, 0, 50 ]
				// </irrelevant>
			},
			Tips : {
				// Allow tips
				allow : true,
				// add positioning offsets
				offsetX : 20,
				offsetY : 20,
				// implement the onShow method to
				// add content to the tooltip when a node
				// is hovered
				onShow : function(tip, node, isLeaf, domElement) {
					tip.innerHTML = "<div class=\"tip-title\">" + node.name
							+ "</div>" + "<div class=\"tip-text\">"
							+ this.makeHTMLFromData(node.data) + "</div>";
				},

				// Build the tooltip inner html by taking each node data
				// property
				makeHTMLFromData : function(data) {
					var html = '';
					html += parent.cwb.Dict.translate('Content') + ': '
							+ data.$area + '<br />';
					// Insert further tooltip information here.
					return html;
				}
			},
			// Remove all element events before destroying it.
			onDestroyElement : function(content, tree, isLeaf, leaf) {
				if (leaf.clearAttributes)
					leaf.clearAttributes();
			}
		});
		tm.loadJSON(json);
	}
};
