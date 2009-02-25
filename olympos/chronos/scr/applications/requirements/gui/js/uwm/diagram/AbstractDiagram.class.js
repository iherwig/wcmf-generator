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
 * @class A Diagram displaying graphic depiction of a subset of a model. Serves
 *        as base for ActivitySet or Diagram.
 * 
 * <p>
 * A Diagram or ActivitySet consists of a drawing area and figures on the
 * drawing area. It contains an auto-layouter, the panel for its tab, and two
 * lists for both the contained figures and the contained Model Objects.
 * </p>
 * 
 * @extends uwm.diagram.DiagramBase
 * @constructor
 * @param {uwm.model.ModelNodeClass}
 *            modelNodeClass
 */
uwm.diagram.AbstractDiagram = function(modelNodeClass) {
	uwm.diagram.AbstractDiagram.superclass.constructor.call(this,
			modelNodeClass);

	this.containedPackage = null;
	this.propertyDisplayEnabled = true;
	this.eventHandlerEnabled = true;
	this.semanticGroups = [ 'Use Cases', 'requirements', 'domain', "activity" ];

	this.figures = new Ext.util.MixedCollection();
	this.objects = new Ext.util.MixedCollection();

	this.dropWindow = null;
}

Ext.extend(uwm.diagram.AbstractDiagram, uwm.diagram.DiagramBase);

uwm.diagram.AbstractDiagram.prototype.initByDisplayResult = function(node) {
	uwm.diagram.AbstractDiagram.superclass.initByDisplayResult.call(this, node);
}

uwm.diagram.AbstractDiagram.prototype.getOwnContainer = function() {
	var self = this;

	uwm.model.ModelContainer.getInstance().loadByOid(this.parentOids[0],
			self.actionSet, 0, function(packageModel) {
				self.setContainedPackage(packageModel);
			});
}

uwm.diagram.AbstractDiagram.prototype.setContainedPackage = function(
		packageModel) {
	this.containedPackage = packageModel;
}

/**
 * Initiates a new diagram.
 * 
 * <p>
 * Creates a new panel for the tab, initiates internal state to default values.
 * </p>
 */
uwm.diagram.AbstractDiagram.prototype.init = function() {
	var container = uwm.diagram.DiagramContainer.getInstance();

	/**
	 * The panel for the tab of this diagram.
	 * 
	 * @private
	 * @type uwm.diagram.DiagramTab
	 */
	this.tab = new uwm.diagram.DiagramTab( {
		title :this.getLabel(),
		diagram :this
	});

	/**
	 * Whether Objects should snap to other objects when moving.
	 * 
	 * @private
	 * @type boolean
	 */
	this.snapToObjects = false;

	/**
	 * The width of this diagram.
	 * 
	 * @private
	 * @type int
	 */
	this.workspaceWidth = 10000;

	/**
	 * The height of this diagram.
	 * 
	 * @private
	 * @type int
	 */
	this.workspaceHeight = 10000;

	container.getTabPanel().add(this.tab);

	this.createdObjects = new Array();

	this.actionSet = new uwm.persistency.ActionSet();

	var self = this;

	uwm.event.EventBroker.getInstance().addListener( {
		"delete" : function(modelObject) {
			self.handleDeleteEvent(modelObject);
		},
		"changeLabel" : function(modelObject, oldLabel) {
			self.handleChangeLabelEvent(modelObject, oldLabel);
		},
		"associate" : function(parentModelObject, childModelObject) {
			self.handleAssociateEvent(parentModelObject, childModelObject);
		}
	});

	if (!this.containedPackage) {
		this.getOwnContainer();
	}
}

/**
 * Initiates the draw2d elements of this diagram.
 * 
 * @private
 */
uwm.diagram.AbstractDiagram.prototype.initWorkflow = function() {
	/**
	 * The viewport of this diagram.
	 * 
	 * @private
	 * @type Ext.Element
	 */
	this.viewPort = this.tab.body;
	this.viewPort.applyStyles( {
		overflow :"auto",
		display :"block",
		position :"fixed"
	});

	var canvas = Ext.DomHelper.append(this.viewPort, {
		tag :"div"
	}, true);
	canvas.applyStyles( {
		width :this.workspaceWidth + "px",
		height :this.workspaceHeight + "px"
	})

	uwm.Util.setElementUnselectable(this.viewPort.dom);

	/**
	 * The draw2d workflow of this diagram.
	 * 
	 * @private
	 * @type uwm.diagram.UwmWorkflow
	 */
	this.workflow = new uwm.diagram.UwmWorkflow(canvas.id, this);

	this.workflow.diagram = this;

	this.workflow.setViewPort(this.viewPort.id);

	// this.workflow.scrollTo(this.workspaceHeight / 2, this.workspaceWidth /
	// 2);

	this.scrollToCenter();

	/**
	 * The Selection Lister of this diagram.
	 * 
	 * @private
	 * @type uwm.diagram.SelectionListener
	 */
	this.selectionListener = new uwm.diagram.SelectionListener(this);
	this.workflow.addSelectionListener(this.selectionListener);

	/**
	 * The Workflow Event Listener of this diagram.
	 * 
	 * @private
	 * @type uwm.diagram.WorkflowEventListener
	 */
	this.workflowEventListener = new uwm.diagram.WorkflowEventListener(this);
	this.workflow.getCommandStack().addCommandStackEventListener(
			this.workflowEventListener);

	/**
	 * The auto-layouter of this diagram.
	 * 
	 * @private
	 * @type uwm.diagram.autolayout.Layouter
	 */
	this.layouter = new uwm.diagram.autolayout.Layouter(this.workflow);
}

/**
 * Checks whether a
 * 
 * @link{uwm.model.ModelObject} with the given oid is contained in this diagram.
 * 
 * @param {modelObject}
 *            modelObject The ModelObject to check.
 * @return <code>true</code> if a Model Object with <code>oid</code> is
 *         contained in this diagram. <code>false</code> otherwise.
 * @type boolean
 */
uwm.diagram.AbstractDiagram.prototype.containsObject = function(modelObject) {
	return this.objects.containsKey(modelObject.getOid());
}

uwm.diagram.AbstractDiagram.prototype.scrollToObject = function(modelObject) {
	var figure = this.figures.get(modelObject.getOid());
	var graphics = figure.getGraphics();
	var canvas = this.viewPort.getSize();

	this.getWorkflow().scrollTo(
			graphics.x - canvas.width / 2 + graphics.getWidth() / 2,
			graphics.y - canvas.height / 2 + graphics.getHeight() / 2);
}

uwm.diagram.AbstractDiagram.prototype.isPropertyDisplay = function() {
	return this.propertyDisplayEnabled;
}

uwm.diagram.AbstractDiagram.prototype.isEventHandler = function() {
	return this.eventHandlerEnabled;
}

uwm.diagram.AbstractDiagram.prototype.scrollToCenter = function() {
	var workflow = this.workflow;
	var height = this.workspaceHeight / 2;
	var width = this.workspaceWidth / 2;

	var self = this;

	setTimeout( function() {
		workflow.scrollTo(height, width, true);
	}, 500);
}

/**
 * Return the tab of this diagram.
 * 
 * @return The tab of this diagram.
 * @type uwm.diagram.DiagramTab
 */
uwm.diagram.AbstractDiagram.prototype.getTab = function() {
	return this.tab;
}

/**
 * Initiates the drop zone of this diagram.
 * 
 * @private
 */
uwm.diagram.AbstractDiagram.prototype.initDropZone = function() {
	var self = this;

	/**
	 * The drop zone of this diagram.
	 * 
	 * @private
	 * @type uwm.diagram.DropZone
	 */
	this.dropZone = new uwm.diagram.DropZone(this.viewPort, {
		diagram :this
	});
}

/**
 * Loads saved figures.
 * 
 * @private
 */
uwm.diagram.AbstractDiagram.prototype.loadFigures = function(forceReload) {
	this.propertyDisplayEnabled = false;
	this.eventHandlerEnabled = false;

	// workaround: shows over all tabs
	this.loadMask = new Ext.LoadMask(this.tab.container);
	this.loadMask.show();

	if (!this.childOids || this.childOids.length == 0) {
		forceReload = true;
	} else {
		var firstFigureOid = null;

		for ( var i = 0; i < this.childOids.length; i++) {
			if (uwm.Util.getUwmClassNameFromOid(this.childOids[i]) == "Figure") {
				firstFigureOid = this.childOids[i];

				break;
			}
		}

		if (firstFigureOid) {
			if (!uwm.model.ModelContainer.getInstance()
					.getByOid(firstFigureOid)) {
				forceReload = true;
			}
		}
	}

	if (forceReload) {
		var self = this;

		uwm.model.ModelContainer.getInstance().loadByOid(this.getOid(),
				function(modelNode) {
					self.handleLoaded();
				}, 1);
	} else {
		this.handleLoaded();
	}
}

uwm.diagram.AbstractDiagram.prototype.handleLoaded = function() {
	this.figuresToLoad = 0;

	var modelContainer = uwm.model.ModelContainer.getInstance();

	for (i in this.childOids) {
		if (!(this.childOids[i] instanceof Function)) {
			var figure = modelContainer.getByOid(this.childOids[i]);

			var self = this;

			var parentOids = figure.getParentOids();

			for ( var j in parentOids) {
				var parentOid = parentOids[j];

				if (!(parentOid instanceof Function)
						&& parentOid != this.getOid()
						&& figure instanceof uwm.diagram.Figure) {
					this.figures.add(parentOid, figure);
					this.figuresToLoad++;

					modelContainer.loadByOid(parentOid, this.actionSet, 2);
				}
			}
		}
	}

	this.actionSet.commit( function() {
		self.handleLoadedObjects();
	});

	if (this.figuresToLoad == 0) {
		this.loadMask.hide();
		this.propertyDisplayEnabled = true;
		this.eventHandlerEnabled = true;
	}
}

uwm.diagram.AbstractDiagram.prototype.handleLoadedObjects = function() {
	var self = this;
	var modelContainer = uwm.model.ModelContainer.getInstance();

	this.figures.eachKey( function(key, val) {
		self.handleLoadedObject(modelContainer.getByOid(key));
	});
}

uwm.diagram.AbstractDiagram.prototype.handleLoadedObject = function(modelObject) {
	var figure = this.figures.get(modelObject.getOid());

	figure.load(modelObject, this);

	this.objects.add(modelObject.getOid(), modelObject);

	this.establishExistingConnections(modelObject, modelObject.getParentOids());
	this.establishExistingConnections(modelObject, modelObject.getChildOids());

	if (modelObject instanceof cwm.ChiNode) {
		var childOids = modelObject.getChildOids();
		var modelContainer = uwm.model.ModelContainer.getInstance();

		for ( var i = 0; i < childOids.length; i++) {
			var currChild = modelContainer.getByOid(childOids[i]);

			if (currChild instanceof cwm.ChiValue) {
				var propertyGraphics = new uwm.graphics.figure.Property(
						currChild.getLabel(), currChild);
				figure.getGraphics().addChildElement(propertyGraphics, false);
			} else if (currChild instanceof cwm.Operation) {
				var operationGraphics = new uwm.graphics.figure.Operation(
						currChild.getLabel(), currChild);
				figure.getGraphics().addChildElement(operationGraphics, false);
			}
		}
	}

	this.figuresToLoad--;

	if (this.figuresToLoad == 0) {
		this.propertyDisplayEnabled = true;
		this.eventHandlerEnabled = true;
		this.loadMask.hide();
		this.scrollToCenter();
	}
}

uwm.diagram.AbstractDiagram.prototype.establishExistingConnections = function(
		newObject, list) {
	if (list) {
		for ( var i = 0; i < list.length; i++) {
			var connectedObject = this.objects.get(list[i]);

			if (!connectedObject) {
				var childObject = uwm.model.ModelContainer.getInstance()
						.getByOid(list[i]);
				if (childObject instanceof uwm.model.Relation) {
					var parentOids = childObject.getParentOids();

					for ( var j = 0; j < parentOids.length; j++) {
						if (parentOids[j] != newObject.getOid()) {
							connectedObject = this.objects.get(parentOids[j]);
							break;
						}
					}
				}
			}

			if (connectedObject) {
				var newFigure = this.figures.get(newObject.getOid());
				var connectedFigure = this.figures
						.get(connectedObject.getOid());

				var newPort = newFigure.getGraphics().getPorts().get(0);
				var connectedPort = connectedFigure.getGraphics().getPorts()
						.get(0);

				var connectionInfo = newObject.getModelNodeClass()
						.getConnectionInfo(connectedObject.getModelNodeClass());

				if (Ext.isArray(connectionInfo)) {
					// TODO: Select appropriate connection type
					connectionInfo = connectionInfo[0];
				}

				// TODO: prevent re-establish existing connections in
				// WorkflowEventListener
				this.createSpecificConnection(newObject, connectedObject,
						newPort, connectedPort, connectionInfo);
			}
		}
	}
}

uwm.diagram.AbstractDiagram.prototype.createConnection = function(sourceObject,
		targetObject, sourcePort, targetPort, x, y) {
	if (sourceObject.connectableWith(targetObject)) {
		var connectionInfo = sourceObject.getModelNodeClass()
				.getConnectionInfo(targetObject.getModelNodeClass());

		if (!Ext.isArray(connectionInfo)) {
			this.createSpecificConnection(sourceObject, targetObject,
					sourcePort, targetPort, connectionInfo);
		} else {
			var menu = new Ext.menu.Menu();

			var self = this;

			for ( var i = 0; i < connectionInfo.length; i++) {

				var currConnectionInfo = connectionInfo[i];
				menu.add(new Ext.menu.Item( {
					text :currConnectionInfo.label,
					connectionInfo :currConnectionInfo,
					handler : function() {
						self.createSpecificConnection(sourceObject,
								targetObject, sourcePort, targetPort,
								this.connectionInfo);
					}
				}));
			}

			menu.showAt(this.getContextMenuPosition(x, y));
		}
	}
}

uwm.diagram.AbstractDiagram.prototype.createSpecificConnection = function(
		sourceObject, targetObject, sourcePort, targetPort, connectionInfo) {
	var decorators = this
			.getConnectionTypeDecorators(connectionInfo.connectionType);

	var startPort;
	var endPort;

	if (connectionInfo.invert) {
		startPort = targetPort;
		endPort = sourcePort;
	} else {
		startPort = sourcePort;
		endPort = targetPort;
	}

	var command = new draw2d.CommandConnect(this.workflow, startPort, endPort);
	command.connectionInfo = connectionInfo;
	command.setConnection(new uwm.graphics.connection.BaseConnection(
			connectionInfo.label, decorators));
	this.workflow.getCommandStack().execute(command);
}

/**
 * Assigns proper graphical representations according to connection type.
 * 
 * @param {String}
 *            connectionType The type of connection. Currently supported are
 *            <code>aggregation</code> and <code>composition</code>.
 * @return Array of proper connection decorators.
 * @type Array
 */
uwm.diagram.AbstractDiagram.prototype.getConnectionTypeDecorators = function(
		connectionType) {
	var result = new Array();

	switch (connectionType) {
	case "aggregation":
		result.source = new uwm.graphics.connection.OpenDiamondDecorator();
		result.target = new uwm.graphics.connection.ArrowDecorator();
		break;

	case "composition":
		result.source = new uwm.graphics.connection.FilledDiamondDecorator();
		result.target = new uwm.graphics.connection.ArrowDecorator();
		break;

	case "realization":
		result.source = new uwm.graphics.connection.ClosedArrowDecorator();
		break;

	case "generalization":
		result.source = new uwm.graphics.connection.ClosedArrowDecorator();
		break;

	case "association":
		result.source = new uwm.graphics.connection.ArrowDecorator();
		break;

	case "associationType":
		result.source = new uwm.graphics.connection.ArrowDecorator();
		break;

	default:
		result.source = new uwm.graphics.connection.ArrowDecorator();
	}

	return result;
}

/**
 * Returns the draw2d workflow of this diagram.
 * 
 * @return The draw2d workflow of this diagram.
 * @type uwm.diagram.UwmWorkflow
 */
uwm.diagram.AbstractDiagram.prototype.getWorkflow = function() {
	return this.workflow;
}

/**
 * Returns whether snap to objects is activated for this diagram.
 * 
 * @return <code>true</code> if snap to objects is activated for this diagram,
 *         <code>false</code> otherwise.
 * @type boolean
 */
uwm.diagram.AbstractDiagram.prototype.isSnapToObjects = function() {
	return this.snapToObjects;
}

/**
 * Sets snap to objects for this diagram.
 * 
 * @param {boolean}
 *            snapToObjects <code>true</code> if object should snap to other
 *            objects, <code>false</code> if objects should not snap to other
 *            objects when moving.
 */
uwm.diagram.AbstractDiagram.prototype.setSnapToObjects = function(snapToObjects) {
	this.snapToObjects = snapToObjects;
	this.workflow.setSnapToGeometry(snapToObjects);
}

/**
 * Shows the Diagram in Model Tree.
 * 
 * @see uwm.modeltree.ModelTree
 */
uwm.diagram.AbstractDiagram.prototype.showInModelTree = function() {
	uwm.modeltree.ModelTree.getInstance().markNodeByOid(this.getOid());
}

/**
 * Reloads the diagram.
 * 
 * @see uwm.modeltree.ModelTree
 */
uwm.diagram.AbstractDiagram.prototype.reloadDiagram = function() {
	var container = uwm.diagram.DiagramContainer.getInstance();
	container.getTabPanel().remove(this.tab);

	uwm.diagram.DiagramContainer.getInstance().loadDiagram(this);
}

/**
 * Starts the auto-layouter.
 */
uwm.diagram.AbstractDiagram.prototype.doLayout = function() {
	this.layouter.doLayout();
}

/**
 * Returns the position a context menu should be shown at.
 * 
 * @param {int}
 *            x The draw2d event x position.
 * @param {int}
 *            y The draw2d event y position.
 * @return The position of the context menu in Ext format.
 * @type Object
 */
uwm.diagram.AbstractDiagram.prototype.getContextMenuPosition = function(x, y) {
	var scroll = this.viewPort.getScroll();
	var xy = this.viewPort.getXY();

	return [ x - scroll.left + xy[0] + 2, y - scroll.top + xy[1] + 2 ];
}

/**
 * Adds an existing object to this diagram.
 * 
 * @param {uwm.model.ModelObject}
 *            modelObject The ModelObject to add to the diagram.
 * @param {int}
 *            x The draw2d x position to add the ModelObject at.
 * @param {int}
 *            y The draw2d x position to add the ModelObject at.
 */
uwm.diagram.AbstractDiagram.prototype.addExistingObject = function(modelObject,
		x, y) {
	this.createdObjects.push( {
		modelClass :null,
		x :x,
		y :y
	});

	uwm.model.ModelContainer.getInstance().createFigure(this, modelObject);
}

/**
 * Creates a new object on this diagram.
 * 
 * <p>
 * The new ModelObject is added to the package this diagram is contained in.
 * </p>
 * 
 * @param {uwm.model.ModelClass}
 *            modelClass The ModelClass of which a new ModelObject should be
 *            created.
 * @param {int}
 *            x The draw2d x position to add the ModelObject at.
 * @param {int}
 *            y The draw2d x position to add the ModelObject at.
 */
uwm.diagram.AbstractDiagram.prototype.createNewObject = function(modelClass, x,
		y) {
	this.createdObjects.push( {
		modelClass :modelClass,
		x :x,
		y :y
	});

	uwm.model.ModelContainer.getInstance().createFigure(this);
}

/**
 * Creates a new Figure.
 * 
 * @private
 * @return the new Figure.
 * @type uwm.diagram.Figure
 */
uwm.diagram.AbstractDiagram.prototype.getFigure = function() {
	return new uwm.diagram.Figure(uwm.model.ModelNodeClassContainer
			.getInstance().getClass("Figure"));
}

uwm.diagram.AbstractDiagram.prototype.handleDeleteEvent = function(modelNode) {
	if (modelNode == this) {
		uwm.diagram.DiagramContainer.getInstance().getTabPanel().remove(
				this.tab);
	} else if (modelNode instanceof cwm.ChiValue
			|| modelNode instanceof cwm.Operation) {
		var parentModelNode = uwm.model.ModelContainer.getInstance().getByOid(
				modelNode.getParentOids()[0]);

		if (this.containsObject(parentModelNode)) {
			parentModelNode.removeChild(modelNode, this.figures
					.get(parentModelNode.getOid()));
		}
	} else {
		var figure = this.figures.get(modelNode.getOid());

		if (figure) {
			this.figures.removeKey(modelNode.getOid());
			this.objects.removeKey(modelNode.getOid());
			figure.remove();
		}
	}
}

uwm.diagram.AbstractDiagram.prototype.handleChangeLabelEvent = function(
		modelNode, oldLabel) {
	if (modelNode == this) {
		this.tab.setTitle(this.getLabel());
	} else if (this.containsObject(modelNode)) {
		var figure = this.figures.get(modelNode.getOid());

		figure.getGraphics().setLabel(modelNode.getLabel());
		// TODO: Remove dependency on CWM
	} else if (modelNode instanceof cwm.ChiValue
			|| modelNode instanceof cwm.Operation) {
		var parentOids = modelNode.getParentOids();

		if (parentOids) {
			var parentModelNode = uwm.model.ModelContainer.getInstance()
					.getByOid(parentOids[0]);

			if (this.containsObject(parentModelNode)) {
				parentModelNode.updateChildLabel(modelNode, this.figures
						.get(parentModelNode.getOid()));
			}
		}
	}
}

uwm.diagram.AbstractDiagram.prototype.handleAssociateEvent = function(
		parentModelNode, childModelNode) {
	if (parentModelNode == this) {
		var config = this.createdObjects[0];

		if (config && config.modelClass) {
			uwm.model.ModelContainer.getInstance().createModelObject(
					config.modelClass.getUwmClassName(), this.containedPackage,
					childModelNode);
		}
	} else if (childModelNode instanceof uwm.diagram.Figure) {
		var diagram = childModelNode.getDiagram();

		if (diagram == this) {
			this.objects.add(parentModelNode.getOid(), parentModelNode);
			this.figures.add(parentModelNode.getOid(), childModelNode);

			var config = this.createdObjects.shift();

			childModelNode.init(parentModelNode, config.x, config.y);

			childModelNode.changeProperties( {
				PositionX :config.x,
				PositionY :config.y,
				Width :childModelNode.getGraphics().getWidth(),
				Height :childModelNode.getGraphics().getHeight()
			});

			this.establishExistingConnections(parentModelNode, parentModelNode
					.getParentOids());
			this.establishExistingConnections(parentModelNode, parentModelNode
					.getChildOids());

			this.dropWindow.destroy();
		}
		// TODO: remove dependency on CWM
	} else if (childModelNode instanceof cwm.ChiValue) {
		var figure = this.figures.get(parentModelNode.getOid());

		var graphics = figure.getGraphics();
		var propertyGraphics = new uwm.graphics.figure.Property(childModelNode
				.getLabel(), childModelNode);

		graphics.addChildElement(propertyGraphics, true);
	} else if (childModelNode instanceof cwm.Operation) {
		var figure = this.figures.get(parentModelNode.getOid());

		var graphics = figure.getGraphics();
		var operationGraphics = new uwm.graphics.figure.Operation(
				childModelNode.getLabel(), childModelNode);

		graphics.addChildElement(operationGraphics, true);
	}
}
