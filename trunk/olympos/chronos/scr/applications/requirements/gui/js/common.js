Ext.namespace("uwm", "uwm.ui", "uwm.config", "uwm.figure", "uwm.data", "uwm.connection", "uwm.util");

uwm.setUnselectable = function(elem){
	if (elem) {
		elem.style.MozUserSelect = "none";
		elem.style.KhtmlUserSelect = "none";
		elem.unselectable = "on";
	}
}

uwm.data.oidList = new Array();

uwm.figure.BaseFigure = function(uwmClassName, label, oid, parentoids, childoids, minWidth, minHeight, startWidth, startHeight){
	this.uwmClassName = uwmClassName;
	this.minWidth = minWidth;
	this.minHeight = minHeight;
	
	this.oid = oid;
	this.parentoids = parentoids;
	this.childoids = childoids;
	
	if (oid) {
		uwm.addOid(oid, this);
	}
	
	draw2d.VectorFigure.call(this);
	
	if (startWidth && startHeight) {
		this.setDimension(startWidth, startHeight);
	}
	if (label) {
		this.setLabel(label);
	}
}

uwm.figure.BaseFigure.prototype = new draw2d.VectorFigure;

uwm.figure.BaseFigure.prototype.setWorkflow = function(workflow){
	draw2d.VectorFigure.prototype.setWorkflow.call(this, workflow);
	
	if (workflow != null && this.port == null) {
		this.port = new uwm.connection.Port();
		this.port.setWorkflow(workflow);
		this.addPort(this.port, this.width + 8, 0);
	}
	
	var htmlElem = this.getHTMLElement();
	if (htmlElem) {
		var self = this;
		
		Ext.fly(htmlElem).on("mousedown", function(e){
			self.showContextMenu(e, self)
		})
	}
}

uwm.figure.BaseFigure.prototype.getUwmClass = function(){
	return this.uwmClassName;
}

uwm.figure.BaseFigure.prototype.getMinWidth = function(){
	var result = draw2d.VectorFigure.prototype.getMinWidth.call(this);
	
	if (this.minWidth) {
		result = this.minWidth;
	}
	return result;
}

uwm.figure.BaseFigure.prototype.getMinHeight = function(){
	var result = draw2d.VectorFigure.prototype.getMinHeight.call(this);
	
	if (this.minHeight) {
		result = this.minHeight;
	}
	
	return result;
}

uwm.figure.BaseFigure.prototype.getParentOids = function(){
	return this.parentoids;
}

uwm.figure.BaseFigure.prototype.getChildOids = function(){
	return this.childoids;
}

uwm.figure.BaseFigure.prototype.getOid = function(){
	return this.oid;
}

uwm.figure.BaseFigure.prototype.setDimension = function(width, height){
	draw2d.VectorFigure.prototype.setDimension.call(this, width, height);
	
	if (this.port != null) {
		this.port.setPosition(this.getWidth() + 8, 0);
	}
}

uwm.figure.BaseFigure.prototype.createHTMLElement = function(){
	var item = draw2d.Figure.prototype.createHTMLElement.call(this);
	item.className = "uwmFigure";
	
	uwm.setUnselectable(item);
	
	return item;
}

uwm.figure.BaseFigure.prototype.setLabel = function(newText){
	if (this.label) {
		this.label.innerHTML = newText;
	}
}

uwm.figure.BaseFigure.prototype.getLabel = function(){
	if (this.label) {
		return this.label.innerHTML;
	}
}

uwm.figure.BaseFigure.prototype.showContextMenu = function(e, figure){
	if (e.button == 2) {
	
		var contextMenu = new Ext.menu.Menu({
			items: ([new Ext.menu.Item({
				text: "Delete from diagram",
				handler: function(item, e){
					uwm.ui.workflow.getCommandStack().execute(new draw2d.CommandDelete(figure));
				}
			}), new Ext.menu.Item({
				text: "Delete from model",
				handler: function(tiem, e){
					uwm.deleteFigureFromModel(figure.getOid());
				}
			})])
		});
		
		contextMenu.showAt(e.xy);
		
		e.stopEvent();
		
		return false;
	}
}



uwm.figure.RectFigure = function(uwmClassName, label, oid, parentoids, childoids){
	uwm.figure.BaseFigure.call(this, uwmClassName, label, oid, parentoids, childoids, 80, 30, 150, 50);
}

uwm.figure.RectFigure.prototype = new uwm.figure.BaseFigure;

uwm.figure.RectFigure.prototype.setDimension = function(width, height){
	uwm.figure.BaseFigure.prototype.setDimension.call(this, width, height);
	
	if (this.label != null) {
		this.label.style.width = this.getWidth() - 40 + "px";
		this.label.style.height = this.getHeight() - 3 + "px";
	}
}

uwm.figure.RectFigure.prototype.createHTMLElement = function(){
	var item = uwm.figure.BaseFigure.prototype.createHTMLElement.call(this);
	
	this.label = document.createElement("div");
	this.label.style.position = "absolute";
	this.label.style.left = "20px";
	this.label.style.top = "5px";
	this.label.style.overflow = "hidden";
	
	this.image = document.createElement("div");
	this.image.className = "Figure" + this.getUwmClass();
	this.image.style.position = "absolute";
	this.image.style.top = "2px";
	this.image.style.right = "2px";
	this.image.style.width = "24px";
	this.image.style.height = "24px";
	this.image.style.backgroundRepeat = "no-repeat";
	
	return item;
}

uwm.figure.RectFigure.prototype.paint = function(){
	uwm.figure.BaseFigure.prototype.paint.call(this);
	
	var width = this.getWidth() - 1;
	var height = this.getHeight() - 1;
	
	this.graphics.drawRect(0, 0, width, height);
	this.graphics.drawLine(10, 0, 10, height);
	this.graphics.drawLine(15, 0, 15, height);
	
	this.graphics.paint();
	
	this.html.appendChild(this.label);
	this.html.appendChild(this.image);
}




uwm.figure.ComplexFigure = function(uwmClassName, label, minWidth, minHeight, startWidth, startHeight){
	uwm.figure.BaseFigure.call(this, uwmClassName, label, minWidth, minHeight, startWidth, startHeight);
}

uwm.figure.ComplexFigure.prototype = new uwm.figure.BaseFigure;

uwm.figure.ComplexFigure.prototype.setDimension = function(width, height){
	uwm.figure.BaseFigure.prototype.setDimension.call(this, width, height);
	
	this.setLabelDimension();
}

uwm.figure.ComplexFigure.prototype.setLabelDimension = function(){

}



uwm.figure.LabelBelowFigure = function(uwmClassName, label, minWidth, minHeight, startWidth, startHeight){
	uwm.figure.ComplexFigure.call(this, uwmClassName, label, minWidth, minHeight, startWidth, startHeight);
}

uwm.figure.LabelBelowFigure.prototype = new uwm.figure.ComplexFigure;

uwm.figure.LabelBelowFigure.prototype.setLabelDimension = function(){
	if (this.label != null) {
		this.label.style.left = (-(this.label.clientWidth - this.width) / 2) + "px";
	}
	
}

uwm.figure.LabelBelowFigure.prototype.createHTMLElement = function(){
	var item = uwm.figure.ComplexFigure.prototype.createHTMLElement.call(this);
	
	this.label = document.createElement("div");
	this.label.style.position = "absolute";
	this.label.style.width = "auto";
	this.label.style.textAlign = "center";
	this.label.style.bottom = "-24px";
	this.label.style.height = "20px";
	
	return item;
}



uwm.figure.LabelCenterFigure = function(uwmClassName, label, minWidth, minHeight, startWidth, startHeight){
	uwm.figure.ComplexFigure.call(this, uwmClassName, label, minWidth, minHeight, startWidth, startHeight);
}

uwm.figure.LabelCenterFigure.prototype = new uwm.figure.ComplexFigure;

uwm.figure.LabelCenterFigure.prototype.createHTMLElement = function(){
	var item = uwm.figure.ComplexFigure.prototype.createHTMLElement.call(this);
	
	this.label = document.createElement("div");
	this.label.style.position = "absolute";
	this.label.style.width = "100%";
	this.label.style.textAlign = "center";
	this.label.style.left = "5px";
	this.label.style.overflow = "hidden";
	this.label.style.height = "20px";
	
	return item;
}



uwm.connection.BaseConnection = function(label){
	draw2d.Connection.call(this);
	
	this.setTargetDecorator(new uwm.connection.ArrowDecorator());
	
	this.setSourceAnchor(new draw2d.ChopboxConnectionAnchor(this));
	this.setTargetAnchor(new draw2d.ChopboxConnectionAnchor(this));
	this.setRouter(new draw2d.ManhattanConnectionRouter());
	
	this.stroke = jsgStroke.DOTTED;
	
	if (label) {
		this.label = new draw2d.Label(label);
		this.label.setBackgroundColor(new draw2d.Color(255, 255, 255));
		
		this.createHTMLElement();
		this.html = this.getHTMLElement();
		
		this.addFigure(this.label, new uwm.connection.MidpointLocator(this));
	}
	
	this.setDeleteable(true);
}

uwm.connection.BaseConnection.prototype = new draw2d.Connection();
uwm.connection.BaseConnection.prototype.type = "uwm.connection.BaseConnection";

uwm.connection.BaseConnection.prototype.setWorkflow = function(workflow){
	draw2d.Connection.prototype.setWorkflow.call(this, workflow);
	
	var htmlElem = this.getHTMLElement();
	if (htmlElem) {
		var self = this;
		
		Ext.fly(htmlElem).on("mousedown", function(e){
			self.showContextMenu(e, self)
		})
	}
}

uwm.connection.BaseConnection.prototype.getLabel = function(){
	return this.label;
}

uwm.connection.BaseConnection.prototype.showContextMenu = function(e, connection){
	if (e.button == 2) {
	
		var contextMenu = new Ext.menu.Menu({
			items: ([new Ext.menu.Item({
				text: "Delete from diagram",
				handler: function(item, e){
					uwm.ui.workflow.getCommandStack().execute(new draw2d.CommandDelete(connection));
				}
			}), new Ext.menu.Item({
				text: "Delete from model",
				handler: function(tiem, e){
					uwm.ui.workflow.getCommandStack().execute(new draw2d.CommandDelete(connection));
					uwm.deleteConnectionFromModel(connection.sourcePort.parentNode.getOid(), connection.targetPort.parentNode.getOid());
				}
			})])
		});
		
		contextMenu.showAt(e.xy);
		
		e.stopEvent();
		
		return false;
	}
}



uwm.connection.ArrowDecorator = function(){
	this.setBackgroundColor(new draw2d.Color(255, 255, 255));
}

uwm.connection.ArrowDecorator.prototype = new draw2d.ConnectionDecorator;
uwm.connection.ArrowDecorator.prototype.type = "uwm.connection.ArrowDecorator";

uwm.connection.ArrowDecorator.prototype.paint = function(g){
	g.setColor(this.color);
	g.setStroke(1);
	g.drawLine(20, 8, 0, 0);
	g.drawLine(0, 0, 20, -8);
}


uwm.connection.MidpointLocator = function(connection){
	draw2d.ConnectionLocator.call(this, connection);
}

uwm.connection.MidpointLocator.prototype = new draw2d.ConnectionLocator;

uwm.connection.MidpointLocator.prototype.type = "uwm.connection.MidpointLocator";

uwm.connection.MidpointLocator.prototype.relocate = function(target){
	var conn = this.getConnection();
	var p = new draw2d.Point();
	var points = conn.getPoints();
	var index = Math.floor((points.getSize() - 2) / 2);
	var p1 = points.get(index);
	var p2 = points.get(index + 1);
	
	p.x = (p2.x - p1.x) / 2 + p1.x - this.getConnection().getLabel().getWidth() / 2;
	p.y = (p2.y - p1.y) / 2 + p1.y - this.getConnection().getLabel().getHeight() / 2;
	
	target.setPosition(p.x, p.y);
}



uwm.connection.Port = function(){
	draw2d.Port.call(this, new uwm.connection.PortGraphics());
	
	this.setDimension(10, 10);
}

uwm.connection.Port.prototype = new draw2d.Port;
uwm.connection.Port.prototype.type = "uwm.connection.Port";


uwm.connection.Port.prototype.onDragEnter = function(port){
	var connectionData = uwm.connection.getConstraints(port.parentNode.getUwmClass(), this.parentNode.getUwmClass());
	
	if (connectionData != null && this.checkConnection(port, this, connectionData)) {
		draw2d.Port.prototype.onDragEnter.call(this, port);
	}
}

uwm.connection.Port.prototype.onDrop = function(port){
	if (this.parentNode.id == port.parentNode.id) {
		// same parentNode -> do nothing
	}
	else {
		var connectionData = uwm.connection.getConstraints(this.parentNode.getUwmClass(), port.parentNode.getUwmClass());
		
		if (connectionData != null && this.checkConnection(this, port, connectionData)) {
			if (connectionData.inverse) {
				var startPort = port;
				var endPort = this;
			}
			else {
				var startPort = this;
				var endPort = port;
			}
			
			var command = new draw2d.CommandConnect(this.parentNode.workflow, startPort, endPort);
			command.setConnection(new uwm.connection.BaseConnection(connectionData.label));
			this.parentNode.workflow.getCommandStack().execute(command);
			
			uwm.postConnection(startPort.parentNode.getOid(), endPort.parentNode.getOid());
		}
		
	}
}

uwm.postConnection = function(parentOid, childOid){
	uwm.jsonRequest({
		usr_action: "associate",
		oid: parentOid,
		associateoids: childOid,
		associateAs: "parent"
	}, "Creating new connection");
	
}

uwm.connection.Port.prototype.checkConnection = function(sourcePort, targetPort, connectionData){
	var result = true;
	
	var sourceConnections = 0;
	var targetConnections = 0;
	
	var sourceClass = targetPort.parentNode.getUwmClass();
	var targetClass = sourcePort.parentNode.getUwmClass();
	
	
	result = this.testConnections(sourcePort, targetPort, sourceClass, connectionData.sourceMaxConns);
	
	if (result) {
		result = this.testConnections(targetPort, sourcePort, targetClass, connectionData.targetMaxConns);
	}
	
	return result;
}

uwm.connection.Port.prototype.testConnections = function(thisPort, otherPort, className, maxConns){
	var result = true;
	
	var connections = thisPort.getConnections();
	
	for (var i = 0; i < connections.getSize(); i++) {
		var connection = connections.get(i);
		if ((connection.targetPort == otherPort || connection.sourcePort == otherPort)) {
			result = false;
			break;
		}
		
		var connCount = 0;
		
		if (maxConns != -1) {
			var foreignPort = connection.targetPort != thisPort ? connection.targetPort : connection.sourcePort;
			
			if (foreignPort.parentNode.getUwmClass() == className) {
				connCount++;
				if (connCount >= maxConns) {
					result = false;
					break;
				}
			}
		}
	}
	
	return result;
}


uwm.connection.PortGraphics = function(){
	draw2d.VectorFigure.call(this);
	this.setDimension(10, 10);
}

uwm.connection.PortGraphics.prototype = new draw2d.VectorFigure;
uwm.connection.PortGraphics.prototype.type = "uwm.connection.PortGraphics";

uwm.connection.PortGraphics.prototype.paint = function(){
	draw2d.VectorFigure.prototype.paint.call(this);
	
	var width = this.getWidth();
	var height = this.getHeight();
	
	
	this.graphics.drawLine(0, height / 2, width, height / 2);
	this.graphics.drawLine(width / 2, 0, width, height / 2);
	this.graphics.drawLine(width / 2, height, width, height / 2);
	
	this.graphics.paint();
	
}

uwm.connection.getConstraints = function(sourceClass, targetClass){
	return eval(uwm.getModelFunction(sourceClass, "getConstraints") + "()[targetClass]");
}


uwm.PropertyHandler = function(){
	this.currentSelectionOid = null;
}

uwm.PropertyHandler.prototype.onSelectionChanged = function(figure){
	if (figure != null && figure.getOid != null && figure.getOid() != this.currentSelectionOid) {
		this.currentSelectionOid = figure.getOid();
		
		if (figure.getUwmClass) {
			var uwmClassName = figure.getUwmClass();
			
			uwm.showProperties(uwmClassName, figure.getOid());
		}
	}
	else {
		this.currentSelection = null;
	}
}

uwm.PropertyHandler.prototype.onOtherFigureMoved = function(figure){
	this.onSelectionChanged(figure);
}

uwm.PropertyHandler.prototype.stackChanged = function(event){
	if (event.getCommand() instanceof draw2d.CommandConnect) {
		var command = event.getCommand();
		var source = command.source;
		var parent = source.getParent();
		
		if (parent == this.currentSelection) {
			this.onSelectionChanged(parent);
		}
		
	}
}


uwm.DeleteHandler = function(){

}

uwm.DeleteHandler.prototype = new draw2d.CommandStackEventListener;

uwm.DeleteHandler.prototype.stackChanged = function(event){
	var command = event.getCommand();
	
	if (command instanceof draw2d.CommandDelete) {
		var source = command.figure;
		
		if (source instanceof uwm.figure.BaseFigure) {
			uwm.removeOid(source.getOid());
		}
	}
}


uwm.showProperties = function(uwmClassName, oid){
	var target = Ext.get("propertiesContainer");
	
	var currChild = target.first();
	
	while (currChild) {
		var nextChild = currChild.next();
		currChild.remove();
		currChild = nextChild;
	}
	
	eval(uwm.getModelFunction(uwmClassName, "showEdit") + "(target, oid)");
}

uwm.initializeTemplateDragZone = function(v, uwmClassName){
	v.dragZone = new Ext.dd.DragZone(v.getEl(), {
		ddGroup: 'gridDDGroup',
		
		getDragData: function(e){
			var sourceEl = e.getTarget(v.itemSelector, 10);
			if (sourceEl) {
				d = sourceEl.cloneNode(true);
				d.id = Ext.id();
				
				return v.dragData = {
					sourceEl: sourceEl,
					repairXY: Ext.fly(sourceEl).getXY(),
					uwmClassName: uwmClassName,
					ddel: d
				}
			}
		},
		
		getRepairXY: function(){
			return this.dragData.repairXY;
		}
	});
}

uwm.initializeDropZone = function(g){
	g.dropZone = new Ext.dd.DropZone(g.getEl(), {
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
			
			if (oid && uwm.getByOid(oid)) {
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
			
			if (oid && uwm.getByOid(oid)) {
				result = false;
			}
			
			if (result) {
				var xOffset = uwm.ui.workflow.getAbsoluteX();
				var yOffset = uwm.ui.workflow.getAbsoluteY();
				var scrollLeft = uwm.ui.workflow.getScrollLeft();
				var scrollTop = uwm.ui.workflow.getScrollTop();
				
				var x = e.xy[0] - xOffset + scrollLeft;
				var y = e.xy[1] - yOffset + scrollTop;
				
				var compartment = uwm.ui.workflow.getBestCompartmentFigure(x, y);
				
				if (data.grid != undefined) {
					uwm.createExistingFigure(data.grid.uwmClassName, data.selections[0].get("Name"), oid, data.selections[0].get("parentoids"), data.selections[0].get("childoids"), x, y, compartment);
				}
				else if (data.node != undefined) {
					uwm.createFigureFromTree(dd.dragData.node.id, x, y, compartment);
				}
				else {
					uwm.createNewFigure(dd.dragData.uwmClassName, x, y, compartment, uwm.handleFigureCreated);
				}
				
			}
			
			return result;
		}
	});
}

uwm.createExistingFigure = function(uwmClassName, label, oid, parentoids, childoids, x, y, compartment){
	var drawElem = uwm.createModelClass(uwmClassName, label, oid, parentoids, childoids);
	if (drawElem) {
		uwm.ui.workflow.getCommandStack().execute(new draw2d.CommandAdd(uwm.ui.workflow, drawElem, x, y, compartment));
		
		uwm.establishExistingConnections(drawElem, drawElem.getParentOids());
		uwm.establishExistingConnections(drawElem, drawElem.getChildOids());
	}
}

uwm.establishExistingConnections = function(drawElem, list){
	if (list) {
	
		for (var i = 0; i < list.length; i++) {
			var target = uwm.getByOid(list[i]);
			
			if (target) {
				var connectionData = uwm.connection.getConstraints(drawElem.getUwmClass(), target.getUwmClass());
				
				if (connectionData != null && drawElem.getPorts().get(0).checkConnection(drawElem.getPorts().get(0), target.getPorts().get(0), connectionData)) {
					if (connectionData.inverse) {
						var startPort = target.getPorts().get(0);
						var endPort = drawElem.getPorts().get(0);
					}
					else {
						var startPort = drawElem.getPorts().get(0);
						var endPort = target.getPorts().get(0);
					}
					
					var command = new draw2d.CommandConnect(drawElem.workflow, startPort, endPort);
					command.setConnection(new uwm.connection.BaseConnection(connectionData.label));
					drawElem.workflow.getCommandStack().execute(command);
				}
				
			}
		}
	}
}

uwm.createFigureFromTree = function(oid, x, y, compartment){
	uwm.jsonRequest({
		usr_action: "display",
		oid: oid
	}, "Creating new figure", function(data){
		var uwmClassName = data.rootType;
		var parentoids = data.node.properties.parentoids;
		var childoids = data.node.properties.childoids;
		var label = data.node.values[1].Name.value;
		
		uwm.createExistingFigure(uwmClassName, label, oid, parentoids, childoids, x, y, compartment);
	});
}


uwm.createNewFigure = function(uwmClassName, x, y, compartment, successHandler){
	Ext.MessageBox.prompt("Create new " + uwmClassName, "Please enter name of new " + uwmClassName + ":", function(button, text){
		uwm.handleFigureName(button, text, uwmClassName, x, y, compartment, successHandler)
	});
}

uwm.handleFigureName = function(button, newClassName, uwmClassName, x, y, compartment, successHandler){
	if (button == "ok") {
		uwm.jsonRequest({
			usr_action: "new",
			newtype: uwmClassName
		}, "Creating new figure", function(data){
			successHandler(data, newClassName, uwmClassName, x, y, compartment);
		});
	}
}

uwm.handleFigureCreated = function(data, newClassName, uwmClassName, x, y, compartment){
	if (data.oid) {
		var oid = data.oid;
		
		uwm.changeField("Name", newClassName, oid);
		
		var drawElem = uwm.createModelClass(uwmClassName, newClassName, oid, [], []);
		if (drawElem) {
			uwm.ui.workflow.getCommandStack().execute(new draw2d.CommandAdd(uwm.ui.workflow, drawElem, x, y, compartment));
		}
	}
}


uwm.initSession = function(login, password, form){
	uwm.jsonRequest({
		usr_action: "dologin",
		login: login,
		password: password
	}, "Login", function(data){
		uwm.handleLogin(data, form)
	}, function(data){
		uwm.handleLogin(data, form)
		
	});
}

uwm.handleLogin = function(data, form){
	if (data.errorMsg) {
		uwm.util.showMessage("Login Failed", data.errorMsg);
		
		var passwordField = form.getForm().findField("password");
		
		passwordField.setValue("");
		passwordField.focus();
	}
	else {
		uwm.data.sid = data.sid;
		
		Ext.getCmp("loginViewport").destroy();
		Ext.get("viewport").dom.style.display = "block";
		
		uwm.ui.create();
		
		uwm.ui.createExistingFigureTabs(Ext.getCmp("existingFiguresContainer"));
		
		uwm.loadStores();
	}
	
}

uwm.util.showMessage = function(title, message){
	var messageContainer = Ext.get("messageContainer");
	if (!messageContainer) {
		messageContainer = Ext.DomHelper.insertFirst(document.body, {
			id: "messageContainer"
		}, true);
	}
	messageContainer.alignTo(document, 't-t');
	var messageBox = Ext.DomHelper.append(messageContainer, {
		html: '<div>' +
		'<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>' +
		'<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc"><h3>' +
		title +
		'</h3>' +
		message +
		'</div></div></div>' +
		'<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>' +
		'</div>'
	}, true);
	messageBox.slideIn('t').pause(3).ghost("t", {
		remove: true
	});
}


uwm.loadStores = function(){
	for (var i = 0; i < uwm.data.stores.getSize(); i++) {
		var store = uwm.data.stores.get(i);
		
		store.load();
	}
}


uwm.util.ellipseX = function(centerX, deg){
	return centerX + centerX * Math.cos(uwm.util.deg2rad(deg));
}

uwm.util.ellipseY = function(centerY, deg){
	return centerY + centerY * Math.sin(uwm.util.deg2rad(deg));
}

uwm.util.deg2rad = function(deg){
	return deg * Math.PI / 180;
}

uwm.addOid = function(oid, figure){
	uwm.data.oidList[oid] = figure;
}

uwm.removeOid = function(oid){
	uwm.data.oidList[oid] = null;
}

uwm.getByOid = function(oid){
	return uwm.data.oidList[oid];
}

uwm.fieldChanged = function(field, newValue, oldValue, oid){
	uwm.changeField(field.getName(), newValue, oid);
}

uwm.changeField = function(fieldName, newValue, oid){
	var params = {
		sid: uwm.data.sid,
		controller: "ExitController",
		usr_action: "save",
		response_format: "JSON"
	}
	
	params["value--" + fieldName + "-" + oid] = newValue;
	
	uwm.jsonRequest(params, "Showing properties");
}

uwm.changeTreeNode = function(node){
	if (node.id != "root") {
		var uwmClassName = node.id.match(/^[^:]+/);
		
		var iconEl = node.ui.getIconEl();
		iconEl.className += " Figure" + uwmClassName;
		
		var anchorEl = node.ui.getAnchor();
		anchorEl.removeAttribute("href");
	}
	
	node.eachChild(uwm.changeTreeNode);
	
}

uwm.util.sleep = function(milliseconds){
	var start = new Date();
	
	var now = new Date();
	while (now.getElapsed(start) < milliseconds) {
		now = new Date();
	}
}

uwm.processConfig = function(){
	Ext.namespace(uwm.config.namespace, uwm.config.namespace + ".figure");
	
	document.title = uwm.config.appTitle;
}

uwm.getModelFunction = function(uwmClassName, functionName){
	var result = null;
	
	var qualifiedClassName = uwm.config.namespace + ".figure." + uwmClassName;
	var qualifiedFunctionName = qualifiedClassName + ".prototype." + functionName;
	
	if (eval(qualifiedClassName + " && " + qualifiedFunctionName)) {
		result = qualifiedFunctionName;
	}
	else {
		uwm.util.showMessage("Invalid model function called", "Cannot find function " + qualifiedFunctionName);
	}
	
	return result;
}

uwm.createModelClass = function(uwmClassName, label, oid, parentoids, childoids){
	var result = null;
	
	var qualifiedName = uwm.config.namespace + ".figure." + uwmClassName;
	
	if (eval(qualifiedName)) {
		result = new (eval(qualifiedName))(label, oid, parentoids, childoids);
	}
	else {
		uwm.util.showMessage("Invalid model class instantiated", "Cannot find class " + qualifiedName);
	}
	
	return result;
}

uwm.jsonRequest = function(params, context, successFunction, failureFunction){
	params.sid = uwm.data.sid;
	params.response_format = "JSON";
	
	Ext.Ajax.request({
		url: uwm.config.jsonUrl,
		method: "post",
		params: params,
		callback: function(options, success, response){
			if (success) {
				var data = Ext.util.JSON.decode(response.responseText);
				
				if (!data.errorMsg) {
					if (successFunction) {
						successFunction(data, options);
					}
				}
				else {
					uwm.util.showMessage(context + " failed", data.errorMsg);
					if (failureFunction) {
						failureFunction(data, options);
					}
				}
			}
			else {
				uwm.util.showMessage("JSON request failed", "JSON request failed.");
				if (failureFunction) {
					failureFunction(null, options);
				}
			}
		}
	});
}

uwm.deleteFigureFromModel = function(oid){
	var figure = uwm.getByOid(oid);
	if (figure) {
		uwm.ui.workflow.getCommandStack().execute(new draw2d.CommandDelete(figure));
	}
	
	uwm.jsonRequest({
		usr_action: "delete",
		deleteoids: oid
	}, "Deleting element");
}

uwm.deleteConnectionFromModel = function(parentOid, childOid){
	uwm.jsonRequest({
		usr_action: "disassociate",
		oid: parentOid,
		associateoids: childOid,
		associateAs: "parent"
	})
}
