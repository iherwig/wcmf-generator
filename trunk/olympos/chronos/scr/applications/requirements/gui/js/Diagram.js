
uwm.Diagram = Ext.extend(Ext.BoxComponent, {
	workspaceWidth: 10000,
	workspaceHeight: 10000,
	
	initComponent: function(){
		Ext.apply(this, {
			el: Ext.DomHelper.append(Ext.getBody(), {
				tag: 'div'
			}, true),
			closable: true,
			listener: {
				close: function(tab){
					var projectTree = Ext.getCmp(uwm.ProjectTree.TREE_ID);
					var diagramNode = projectTree.getNodeById(tab.oid);
					if (diagramNode) {
						diagramNode.attributes.diagram = null;
					}
				}
			}
		})
		
		uwm.Diagram.superclass.initComponent.apply(this, arguments);
		
		this.oidList = new Array();
		this.oid = this.initialConfig.oid;
		this.packageOid = this.initialConfig.packageOid;
	},
	
	
	onRender: function(){
		uwm.Diagram.superclass.onRender.apply(this, arguments);
		
		this.initWorkflow();
		this.initializeDropZone();
		this.loadDiagram();
		
	},
	
	
	initWorkflow: function(){
	
		this.viewPort = this.getEl();
		this.viewPort.applyStyles({
			overflow: "auto",
			display: "block",
			position: "fixed"
		});
		
		var canvas = Ext.DomHelper.append(this.viewPort, {
			tag: "div"
		}, true);
		canvas.applyStyles({
			width: this.workspaceWidth + "px",
			height: this.workspaceHeight + "px"
		})
		
		uwm.setUnselectable(this.viewPort.dom);
		
		this.workflow = new uwm.Workflow(canvas.id);
		
		this.workflow.diagram = this;
		
		this.workflow.setViewPort(this.viewPort.id);
		
		//this.workflow.scrollTo(this.workspaceHeight / 2, this.workspaceWidth / 2);
		
		var workflow = this.workflow;
		var height = this.workspaceHeight / 2;
		var width = this.workspaceWidth / 2;
		
		setTimeout(function(){
			workflow.scrollTo(height, width, true);
		}, 500);
		
		var propertyHandler = new uwm.PropertyHandler();
		this.workflow.addSelectionListener(propertyHandler);
		this.workflow.getCommandStack().addCommandStackEventListener(propertyHandler);
		this.workflow.getCommandStack().addCommandStackEventListener(new uwm.DeleteHandler());
		this.workflow.getCommandStack().addCommandStackEventListener(new uwm.DiagramPersistenceListener(this.oid, this));
		
		this.snapToObjects = false;
		
		this.layouter = new uwm.autolayout.Layouter(this.workflow);
	},
	
	initializeDropZone: function(){
		var self = this;
		this.dropZone = new Ext.dd.DropZone(this.viewPort, {
			ddGroup: 'gridDDGroup',
			
			//      If the mouse is over a target node, return that node. This is
			//      provided as the "target" parameter in all "onNodeXXXX" node event handling functions
			getTargetFromEvent: function(e){
				return e.getTarget();
			},
			
			//      On entry into a target node, highlight that node.
			onNodeEnter: function(target, dd, e, data){
			},
			
			//      On exit from a target node, unhighlight that node.
			onNodeOut: function(target, dd, e, data){
			},
			
			//      While over a target node, return the default drop allowed class which
			//      places a "tick" icon into the drag proxy.
			onNodeOver: function(target, dd, e, data){
				var result = Ext.dd.DropZone.prototype.dropAllowed;
				
				if (data.grid != undefined) {
					var oid = data.selections[0].id;
				}
				else if (data.node != undefined) {
					var oid = dd.dragData.node.id;
				}
				
				if (oid && self.getByOid(oid)) {
					result = false;
				}
				
				return result;
			},
			
			//      On node drop, we can interrogate the target node to find the underlying
			//      application object that is the real target of the dragged data.
			//      In this case, it is a Record in the GridPanel's Store.
			//      We can use the data set up by the DragZone's getDragData method to read
			//      any data we decided to attach.
			onNodeDrop: function(target, dd, e, data){
				var result = true;
				
				if (data.grid != undefined) {
					var oid = data.selections[0].id;
				}
				else if (data.node != undefined) {
					var oid = dd.dragData.node.id;
				}
				
				if (oid && self.getByOid(oid)) {
					result = false;
				}
				
				if (result) {
					var xOffset = self.workflow.getAbsoluteX();
					var yOffset = self.workflow.getAbsoluteY();
					var scrollLeft = self.workflow.getScrollLeft();
					var scrollTop = self.workflow.getScrollTop();
					
					var x = e.xy[0] - xOffset + scrollLeft;
					var y = e.xy[1] - yOffset + scrollTop;
					
					var compartment = self.workflow.getBestCompartmentFigure(x, y);
					
					if (data.grid != undefined) {
						uwm.createExistingFigure(data.grid.uwmClassName, data.selections[0].get("Name"), oid, data.selections[0].get("parentoids"), data.selections[0].get("childoids"), x, y, compartment);
					}
					else if (data.node != undefined) {
						uwm.createFigureFromTree(dd.dragData.node.attributes.oid, x, y, compartment);
					}
					else {
						uwm.createNewFigure(dd.dragData.uwmClassName, x, y, compartment, uwm.handleFigureCreated);
					}
					
				}
				
				return result;
			}
		});
	},
	
	loadDiagram: function(){
		if (this.oid) {
			uwm.data.currentDiagram = this;
			var self = this;
			
			uwm.jsonRequest({
				usr_action: "display",
				depth: 3,
				omitMetaData: true,
				oid: self.oid
			}, "Loading diagram", function(data){
				var figures = data.node.Figure;
				
				if (figures) {
					self.initialLoad = true;
					
					var numFigures = 0;
					var processedFigures = 0;
					
					for (var i = 0; i < figures.length; i++) {
						var currFigure = figures[i];
						
						for (var j = 0; j < currFigure.properties.parentoids.length; j++) {
						
							var modelElem = currFigure.properties.parentoids[j];
							
							if (modelElem) {
								if (modelElem != self.oid) {
									numFigures++;

									uwm.jsonRequest({
										usr_action: "display",
										depth: 0,
										omitMetaData: true,
										oid: modelElem,
										xpos: parseInt(currFigure.values[1].PositionX),
										ypos: parseInt(currFigure.values[1].PositionY),
										self: self
									}, "Loading diagram element", function(data, request){
										var oid = data.node.oid;
										var uwmClassName = data.node.type;
										var parentoids = data.node.properties.parentoids;
										var childoids = data.node.properties.childoids;
										var label = data.node.values[1].Name;
										uwm.createExistingFigure(uwmClassName, label, oid, parentoids, childoids, request.params.xpos, request.params.ypos);
										
										processedFigures++;
										
										if (processedFigures >= numFigures) {
											self.initialLoad = false;
										}
										
									});
								}
							}
						}
					}
				}
			});
		}
	},
	
	
	addOid: function(oid, figure){
		this.oidList[oid] = figure;
	},
	
	removeOid: function(oid){
		this.oidList[oid] = null;
	},
	
	getByOid: function(oid){
		return this.oidList[oid];
	}
});

uwm.Diagram.CONTAINER_ID = "diagramsContainer";

uwm.DiagramPersistenceListener = function(diagramOid, diagram){
	this.oid = diagramOid;
	this.diagram = diagram;
}

uwm.DiagramPersistenceListener.prototype = new draw2d.CommandStackEventListener;

uwm.DiagramPersistenceListener.prototype.stackChanged = function(stackEvent){
	var command = stackEvent.command;
	var self = this;
	
	if (!this.diagram.initialLoad && stackEvent.getDetails() == draw2d.CommandStack.POST_EXECUTE) {
		if (command instanceof draw2d.CommandAdd) {
			uwm.jsonRequest({
				usr_action: "new",
				newtype: "Figure"
			}, "Creating new Figure", function(data){
				command.figure.figureOid = data.oid;
				uwm.changeFields({
					PositionX: command.x,
					PositionY: command.y,
					Height: command.figure.getHeight(),
					Width: command.figure.getWidth()
				}, data.oid);
				uwm.postConnection(data.oid, self.oid);
				uwm.postConnection(data.oid, command.figure.oid);
			});
		}
		else if (command instanceof draw2d.CommandDelete) {
			uwm.deleteElementFromModel(command.figure.uwmClassName, command.figure.figureOid);
		}
		else if (command instanceof draw2d.CommandMove) {
			uwm.changeFields({
				PositionX: command.newX,
				PositionY: command.newY
			}, command.figure.figureOid);
		}
		else if (command instanceof draw2d.CommandResize) {
			uwm.changeFields({
				Height: command.newHeight,
				Width: command.newWidth
			}, command.figure.figureOid);
		}
		else if (command instanceof draw2d.CommandSetBackgroundColor) {
		}
		else if (command instanceof draw2d.CommandSetColor) {
		}
	}
}
