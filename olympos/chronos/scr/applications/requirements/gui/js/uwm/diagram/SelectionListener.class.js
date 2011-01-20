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
Ext.namespace("uwm.diagram");

/**
 * @class Changes the property view to the appropriate ModelObject when clicked on it in the diagram.
 * 
 * @constructor
 * @param {uwm.diagram.Diagram} diagram The diagram of this Selection Listener.
 * @see uwm.property.PropertyContainer
 */
uwm.diagram.SelectionListener = function(diagram) {
	/**
	 * The containing diagram.
	 * 
	 * @private
	 * @type uwm.diagram.Diagram
	 */
	this.diagram = diagram;
	/**
	 * Indicates if any figures are faded in the diagram
	 */
	this.hasFadedFigures = false;
}

/**
 * Handler for changed selection in diagram.
 * 
 * @param {uwm.graphics.figure.BaseFigure} figure The graphical figure the user clicked on.
 */
uwm.diagram.SelectionListener.prototype.onSelectionChanged = function(figure) {
	
	var workflow = this.diagram.getWorkflow();
	var multiSelection = workflow.getMultiSelection();
	if (!workflow.isMultiSelecting()) {
		// clear existing multi selection, if one object is selected
		// and the workflow is not in multi selection mode
		multiSelection.clearSelection();
	}
	else {
		// prevent default selection behaviour in multi selection mode
		if (workflow.getCurrentSelection()) {
			workflow.setCurrentSelection(null);
		}
	}
	// notify workflow
	if (figure) {
		workflow.figureClicked(figure);
	}
	
	if (!workflow.isMultiSelecting()) {
		// show property dialog for the selected figure
		if (figure) {
			if (figure instanceof uwm.graphics.figure.BaseFigure || figure instanceof uwm.graphics.figure.ClassFigure) {
				if (this.diagram.isPropertyDisplay()) {
					uwm.property.PropertyContainer.getInstance().showProperty(figure.getFigure().getModelObject());
				}
			} else if (figure instanceof uwm.graphics.figure.AbstractClassPart) {
				if (this.diagram.isPropertyDisplay()) {
					uwm.property.PropertyContainer.getInstance().showProperty(figure.getModelObject());
				}
			} else if (figure instanceof uwm.graphics.connection.BaseConnection) {
				var relationObject = figure.getRelationObject();
				
				if (relationObject instanceof uwm.model.EditableRelation) {
					uwm.property.PropertyContainer.getInstance().showProperty(relationObject);
				}
			}
		}
		
		// highlight the selected ChiValue mapping if selected
		var doc = this.diagram.getWorkflow().getDocument();
		if (figure instanceof uwm.graphics.connection.MappingConnection) {
	
			// fade all figures ...
			var figures = doc.getFigures();
			for (var i=0, count=figures.getSize(); i<count; i++) {
				this.fadeFigure(figures.get(i));
			}
			var lines = doc.getLines();
			for (var i=0, count=lines.getSize(); i<count; i++) {
				this.fadeFigure(lines.get(i));
			}
			// ... except for the mapping connection and its attributes
			this.unfadeFigure(figure);
			this.unfadeFigure(figure.sourceAnchor.owner.parentNode);
			this.unfadeFigure(figure.targetAnchor.owner.parentNode);
			
			this.hasFadedFigures = true;
		}
		else {
			if (this.hasFadedFigures) {
				// unfade all elements
				var figures = doc.getFigures();
				for (var i=0, count=figures.getSize(); i<count; i++) {
					this.unfadeFigure(figures.get(i));
				}
				var lines = doc.getLines();
				for (var i=0, count=lines.getSize(); i<count; i++) {
					if (lines.get(i) != figure)
					this.unfadeFigure(lines.get(i));
				}
	
				this.hasFadedFigures = false;
			}
		}
	}
}

/**
 * Fade a figure.
 * 
 * @param figure A figure on the diagram.
 * @private
 */
uwm.diagram.SelectionListener.prototype.fadeFigure = function(figure) {
	if (figure instanceof draw2d.Connection) {
		this.setConnectionColor(figure, new draw2d.Color(200,200,200));
		figure.getLabel().setAlpha(0.2);
	}
	else {
		figure.setAlpha(0.2);
		if (figure instanceof draw2d.CompartmentFigure && figure.childElements) {
			for (var i=0, count=figure.childElements.length; i<count; i++) {
				figure.childElements[i].setAlpha(0.2);
			}
		}
	}
}

/**
 * Unfade a figure.
 * 
 * @param figure A figure on the diagram.
 * @private
 */
uwm.diagram.SelectionListener.prototype.unfadeFigure = function(figure) {
	if (figure instanceof draw2d.Connection) {
		this.setConnectionColor(figure, new draw2d.Color(0,0,0));
		figure.getLabel().setAlpha(1.0);
	}
	else {
		figure.setAlpha(1.0);
		if (figure instanceof draw2d.CompartmentFigure && figure.childElements) {
			for (var i=0, count=figure.childElements.length; i<count; i++) {
				figure.childElements[i].setAlpha(1.0);
			}
		}
	}
}

/**
 * Change the color of a connection
 * @param connection The connection
 * @param color The color
 * @private
 */
uwm.diagram.SelectionListener.prototype.setConnectionColor = function(connection, color) {
	connection.setColor(color);
	if (connection.sourceDecorator) {
		connection.sourceDecorator.setColor(color);
	}
	if (connection.targetDecorator) {
		connection.targetDecorator.setColor(color);
	}
	connection.paint();
}