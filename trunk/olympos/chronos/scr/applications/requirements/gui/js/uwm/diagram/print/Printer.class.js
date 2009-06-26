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
Ext.namespace("uwm.diagram.print");


/**
 * @class Class for printing a {@link uwm.diagram.AbstractDiagram}.
 *
 * @constructor
 */
uwm.diagram.print.Printer = function() {
}

/**
 * Prints a {@link uwm.diagram.AbstractDiagram} by opening a new window
 * containing the diagram and starting the browser print dialog.
 * 
 * @param {uwm.diagram.AbstractDiagram}
 *            diagram The Diagram to print.
 * @param {Function}
 *            callback The callback to call after the operation finished.
 */
uwm.diagram.print.Printer.prototype.print = function(diagram, callback) {

	var BORDER = 50;
	var minX = Number.MAX_VALUE;
	var minY = Number.MAX_VALUE;
	var workflowFigures = diagram.getWorkflow().getFigures();
	
	// calculate the minimum upper left position of all diagram figures
	for (var i = 0; i < workflowFigures.getSize(); i++) {
		var currFigure = workflowFigures.get(i);
		minX = Math.min(minX, currFigure.getAbsoluteX());
		minY = Math.min(minY, currFigure.getAbsoluteY());
	}
	var deltaX = minX;
	var deltaY = minY;

	// move all figures temporary to the upper left corner
	for (var i = 0; i < workflowFigures.getSize(); i++) {
		var currFigure = workflowFigures.get(i);
		if (currFigure.getParent() == null)
			currFigure.setPosition(parseInt(currFigure.getAbsoluteX()-deltaX+BORDER), 
				parseInt(currFigure.getAbsoluteY()-deltaY+BORDER));
	}
	var currSelection = diagram.workflow.getCurrentSelection();
	diagram.workflow.setCurrentSelection(null);
	
	// get the diagram html
	var diagramEl = Ext.get(Ext.get(diagram.getCanvas().id));
	var diagramStr = diagramEl.dom.innerHTML;
    
	// print the diagram html to a new window
	var strTemplate = '<html><head>';
	var strTemplate = '<title>{0}</title>';
	strTemplate += '<link rel="stylesheet" type="text/css" href="css/common.css" />';
	strTemplate += '<link rel="stylesheet" type="text/css" href="css/figures.css" />';
	strTemplate += '<link rel="stylesheet" type="text/css" href="css/print.css" />';
	strTemplate += '</head><body onload="{1}"><div id="diagInfo">{0}</div>';
  strTemplate += '<div id="bgNote">'+uwm.Dict.translate('Please make sure that background printing is enabled in page setup.');
  strTemplate += '<br /><br />'+uwm.Dict.translate('NOTE: This message will not be printed.')+'</div>';
  strTemplate += '{2}';
  strTemplate += '</body></html>';
	var strHTML = String.format(
		strTemplate
		, diagram.getLabel()
		, Ext.isIE? 'document.execCommand(\'print\');': 'window.print();'
		, diagramStr
	);
	var printWindow = window.open("", "_blank");
	printWindow.document.open();
	printWindow.document.write(strHTML);
	printWindow.document.close();

	// move all figures back
	for (var i = 0; i < workflowFigures.getSize(); i++) {
		var currFigure = workflowFigures.get(i);
		if (currFigure.getParent() == null)
			currFigure.setPosition(parseInt(currFigure.getAbsoluteX()+deltaX-BORDER), 
				parseInt(currFigure.getAbsoluteY()+deltaY-BORDER));
	}
	diagram.workflow.setCurrentSelection(currSelection);
  
	if (callback instanceof Function) {
		callback(this);
	}
}
