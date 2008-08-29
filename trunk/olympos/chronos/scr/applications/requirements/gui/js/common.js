Ext.namespace("req", "req.ui", "req.figure", "req.data", "req.connection", "req.util");

req.setUnselectable = function(elem){
	if (elem) {
		elem.style.MozUserSelect = "none";
		elem.style.KhtmlUserSelect = "none";
		elem.unselectable = true;
	}
}

req.data.oidList = new Array();

req.figure.BaseFigure = function(reqClassName, label, oid, parentoids, childoids, minWidth, minHeight, startWidth, startHeight){
	this.reqClassName = reqClassName;
	this.minWidth = minWidth;
	this.minHeight = minHeight;
	
	this.oid = oid;
	this.parentoids = parentoids;
	this.childoids = childoids;
	
	if (oid) {
		req.addOid(oid, this);
	}
	
	draw2d.VectorFigure.call(this);
	
	if (startWidth && startHeight) {
		this.setDimension(startWidth, startHeight);
	}
	if (label) {
		this.setLabel(label);
	}
}

req.figure.BaseFigure.prototype = new draw2d.VectorFigure;

req.figure.BaseFigure.prototype.setWorkflow = function(workflow){
	draw2d.VectorFigure.prototype.setWorkflow.call(this, workflow);
	
	if (workflow != null && this.port == null) {
		this.port = new req.connection.Port();
		this.port.setWorkflow(workflow);
		this.addPort(this.port, this.width + 8, 0);
	}
}

req.figure.BaseFigure.prototype.getReqClass = function(){
	return this.reqClassName;
}

req.figure.BaseFigure.prototype.getMinWidth = function(){
	var result = draw2d.VectorFigure.prototype.getMinWidth.call(this);
	
	if (this.minWidth) {
		result = this.minWidth;
	}
	return result;
}

req.figure.BaseFigure.prototype.getMinHeight = function(){
	var result = draw2d.VectorFigure.prototype.getMinHeight.call(this);
	
	if (this.minHeight) {
		result = this.minHeight;
	}
	
	return result;
}

req.figure.BaseFigure.prototype.getParentOids = function(){
	return this.parentoids;
}

req.figure.BaseFigure.prototype.getChildOids = function(){
	return this.childoids;
}

req.figure.BaseFigure.prototype.getOid = function(){
	return this.oid;
}

req.figure.BaseFigure.prototype.setDimension = function(width, height){
	draw2d.VectorFigure.prototype.setDimension.call(this, width, height);
	
	if (this.port != null) {
		this.port.setPosition(this.getWidth() + 8, 0);
	}
}

req.figure.BaseFigure.prototype.createHTMLElement = function(){
	var item = draw2d.Figure.prototype.createHTMLElement.call(this);
	
	req.setUnselectable(item);
	
	return item;
}

req.figure.BaseFigure.prototype.setLabel = function(newText){
	if (this.label) {
		this.label.innerHTML = newText;
	}
}

req.figure.BaseFigure.prototype.getLabel = function(){
	if (this.label) {
		return this.label.innerHTML;
	}
}



req.figure.RectFigure = function(reqClassName, label, oid, parentoids, childoids){
	req.figure.BaseFigure.call(this, reqClassName, label, oid, parentoids, childoids, 80, 30, 150, 50);
}

req.figure.RectFigure.prototype = new req.figure.BaseFigure;

req.figure.RectFigure.prototype.setDimension = function(width, height){
	req.figure.BaseFigure.prototype.setDimension.call(this, width, height);
	
	if (this.label != null) {
		this.label.style.width = this.getWidth() - 40 + "px";
		this.label.style.height = this.getHeight() - 3 + "px";
	}
}

req.figure.RectFigure.prototype.createHTMLElement = function(){
	var item = req.figure.BaseFigure.prototype.createHTMLElement.call(this);
	
	this.label = document.createElement("div");
	this.label.style.position = "absolute";
	this.label.style.left = "20px";
	this.label.style.top = "5px";
	this.label.style.overflow = "hidden";
	
	this.image = document.createElement("div");
	this.image.className = "Figure" + this.getReqClass();
	this.image.style.position = "absolute";
	this.image.style.top = "2px";
	this.image.style.right = "2px";
	this.image.style.width = "24px";
	this.image.style.height = "24px";
	this.image.style.backgroundRepeat = "no-repeat";
	
	return item;
}

req.figure.RectFigure.prototype.paint = function(){
	req.figure.BaseFigure.prototype.paint.call(this);
	
	var width = this.getWidth() - 1;
	var height = this.getHeight() - 1;
	
	this.graphics.drawRect(0, 0, width, height);
	this.graphics.drawLine(10, 0, 10, height);
	this.graphics.drawLine(15, 0, 15, height);
	
	this.graphics.paint();
	
	this.html.appendChild(this.label);
	this.html.appendChild(this.image);
}




req.figure.ComplexFigure = function(reqClassName, label, minWidth, minHeight, startWidth, startHeight){
	req.figure.BaseFigure.call(this, reqClassName, label, minWidth, minHeight, startWidth, startHeight);
}

req.figure.ComplexFigure.prototype = new req.figure.BaseFigure;

req.figure.ComplexFigure.prototype.setDimension = function(width, height){
	req.figure.BaseFigure.prototype.setDimension.call(this, width, height);
	
	this.setLabelDimension();
}

req.figure.ComplexFigure.prototype.setLabelDimension = function(){

}



req.figure.LabelBelowFigure = function(reqClassName, label, minWidth, minHeight, startWidth, startHeight){
	req.figure.ComplexFigure.call(this, reqClassName, label, minWidth, minHeight, startWidth, startHeight);
}

req.figure.LabelBelowFigure.prototype = new req.figure.ComplexFigure;

req.figure.LabelBelowFigure.prototype.setLabelDimension = function(){
	if (this.label != null) {
		this.label.style.left = (-(this.label.clientWidth - this.width) / 2) + "px";
	}
	
}

req.figure.LabelBelowFigure.prototype.createHTMLElement = function(){
	var item = req.figure.ComplexFigure.prototype.createHTMLElement.call(this);
	
	this.label = document.createElement("div");
	this.label.style.position = "absolute";
	this.label.style.width = "auto";
	this.label.style.textAlign = "center";
	this.label.style.bottom = "-24px";
	this.label.style.height = "20px";
	
	return item;
}



req.figure.LabelCenterFigure = function(reqClassName, label, minWidth, minHeight, startWidth, startHeight){
	req.figure.ComplexFigure.call(this, reqClassName, label, minWidth, minHeight, startWidth, startHeight);
}

req.figure.LabelCenterFigure.prototype = new req.figure.ComplexFigure;

req.figure.LabelCenterFigure.prototype.createHTMLElement = function(){
	var item = req.figure.ComplexFigure.prototype.createHTMLElement.call(this);
	
	this.label = document.createElement("div");
	this.label.style.position = "absolute";
	this.label.style.width = "100%";
	this.label.style.textAlign = "center";
	this.label.style.left = "5px";
	this.label.style.overflow = "hidden";
	this.label.style.height = "20px";
	
	return item;
}



req.connection.BaseConnection = function(label){
	draw2d.Connection.call(this);
	
	this.setTargetDecorator(new req.connection.ArrowDecorator());
	
	this.setSourceAnchor(new draw2d.ChopboxConnectionAnchor(this));
	this.setTargetAnchor(new draw2d.ChopboxConnectionAnchor(this));
	this.setRouter(new draw2d.ManhattanConnectionRouter());
	
	this.stroke = jsgStroke.DOTTED;
	
	if (label) {
		this.label = new draw2d.Label(label);
		this.label.setBackgroundColor(new draw2d.Color(255, 255, 255));
		
		this.createHTMLElement();
		this.html = this.getHTMLElement();
		
		this.addFigure(this.label, new req.connection.MidpointLocator(this));
	}
	
	this.setDeleteable(true);
}

req.connection.BaseConnection.prototype = new draw2d.Connection();
req.connection.BaseConnection.prototype.type = "req.connection.BaseConnection";

req.connection.BaseConnection.prototype.getLabel = function(){
	return this.label;
}


req.connection.ArrowDecorator = function(){
	this.setBackgroundColor(new draw2d.Color(255, 255, 255));
}

req.connection.ArrowDecorator.prototype = new draw2d.ConnectionDecorator;
req.connection.ArrowDecorator.prototype.type = "req.connection.ArrowDecorator";

req.connection.ArrowDecorator.prototype.paint = function(g){
	g.setColor(this.color);
	g.setStroke(1);
	g.drawLine(20, 8, 0, 0);
	g.drawLine(0, 0, 20, -8);
}


req.connection.MidpointLocator = function(connection){
	draw2d.ConnectionLocator.call(this, connection);
}

req.connection.MidpointLocator.prototype = new draw2d.ConnectionLocator;

req.connection.MidpointLocator.prototype.type = "req.connection.MidpointLocator";

req.connection.MidpointLocator.prototype.relocate = function(target){
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



req.connection.Port = function(){
	draw2d.Port.call(this, new req.connection.PortGraphics());
	
	this.setDimension(10, 10);
}

req.connection.Port.prototype = new draw2d.Port;
req.connection.Port.prototype.type = "req.connection.Port";


req.connection.Port.prototype.onDragEnter = function(port){
	var connectionData = req.connection.getConstraints(port.parentNode.getReqClass(), this.parentNode.getReqClass());
	
	if (connectionData != null && this.checkConnection(port, this, connectionData)) {
		draw2d.Port.prototype.onDragEnter.call(this, port);
	}
}

req.connection.Port.prototype.onDrop = function(port){
	if (this.parentNode.id == port.parentNode.id) {
		// same parentNode -> do nothing
	}
	else {
		var connectionData = req.connection.getConstraints(this.parentNode.getReqClass(), port.parentNode.getReqClass());
		
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
			command.setConnection(new req.connection.BaseConnection(connectionData.label));
			this.parentNode.workflow.getCommandStack().execute(command);
		}
		
	}
}

req.connection.Port.prototype.checkConnection = function(sourcePort, targetPort, connectionData){
	var result = true;
	
	var sourceConnections = 0;
	var targetConnections = 0;
	
	var sourceClass = targetPort.parentNode.getReqClass();
	var targetClass = sourcePort.parentNode.getReqClass();
	
	
	result = this.testConnections(sourcePort, targetPort, sourceClass, connectionData.sourceMaxConns);
	
	if (result) {
		result = this.testConnections(targetPort, sourcePort, targetClass, connectionData.targetMaxConns);
	}
	
	return result;
}

req.connection.Port.prototype.testConnections = function(thisPort, otherPort, className, maxConns){
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
			
			if (foreignPort.parentNode.getReqClass() == className) {
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


req.connection.PortGraphics = function(){
	draw2d.VectorFigure.call(this);
	this.setDimension(10, 10);
}

req.connection.PortGraphics.prototype = new draw2d.VectorFigure;
req.connection.PortGraphics.prototype.type = "req.connection.PortGraphics";

req.connection.PortGraphics.prototype.paint = function(){
	draw2d.VectorFigure.prototype.paint.call(this);
	
	var width = this.getWidth();
	var height = this.getHeight();
	
	
	this.graphics.drawLine(0, height / 2, width, height / 2);
	this.graphics.drawLine(width / 2, 0, width, height / 2);
	this.graphics.drawLine(width / 2, height, width, height / 2);
	
	this.graphics.paint();
	
}

req.connection.getConstraints = function(sourceClass, targetClass){
	return eval("if (req.figure." + sourceClass + " && req.figure." + sourceClass + ".prototype.getConstraints) req.figure." + sourceClass + ".prototype.getConstraints()[targetClass]");
}


req.PropertyHandler = function(targetId){
	this.target = Ext.get(targetId);
	this.currentSelection = null;
}

req.PropertyHandler.prototype.onSelectionChanged = function(figure){
	/*
	 if (figure != this.currentSelection) {
	 if (this.currentSelection != null) {
	 this.currentSelection.detachMoveListener(this);
	 }
	 
	 this.currentSelection = figure;
	 if (figure != null) {
	 figure.attachMoveListener(this);
	 }
	 }
	 
	 if (figure != null) {
	 this.target.innerHTML = figure.type + Math.random();
	 
	 if (figure.getClassName) {
	 nameEditor.setValue(figure.getClassName());
	 }
	 else {
	 nameEditor.setValue("");
	 }
	 }
	 */
	if (figure != null) {
		if (figure.getReqClass) {
			var className = figure.getReqClass();
			
			var currChild = this.target.first();
			
			while (currChild) {
				var nextChild = currChild.next();
				currChild.remove();
				currChild = nextChild;
			}
			
			eval("if (req.figure." + className + " && req.figure." + className + ".prototype.showEdit) req.figure." + className + ".prototype.showEdit(this.target, figure.getOid())");
		}
	}
}

req.PropertyHandler.prototype.onOtherFigureMoved = function(figure){
	this.onSelectionChanged(figure);
}

req.PropertyHandler.prototype.stackChanged = function(event){
	if (event.getCommand() instanceof draw2d.CommandConnect) {
		var command = event.getCommand();
		var source = command.source;
		var parent = source.getParent();
		
		if (parent == this.currentSelection) {
			this.onSelectionChanged(parent);
		}
		
	}
}

req.initializeTemplateDragZone = function(v, reqClassName){
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
					reqClassName: reqClassName,
					ddel: d
				}
			}
		},
		
		getRepairXY: function(){
			return this.dragData.repairXY;
		}
	});
}

req.initializeDropZone = function(g){
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
			
			if (data.grid) {
				var oid = data.selections[0].id;
				
				if (req.getByOid(oid)) {
					result = false;
				}
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
			
			if (data.grid) {
				var oid = data.selections[0].id;
				
				if (req.getByOid(oid)) {
					result = false;
				}
			}
			
			if (result) {
				var xOffset = req.ui.workflow.getAbsoluteX();
				var yOffset = req.ui.workflow.getAbsoluteY();
				var scrollLeft = req.ui.workflow.getScrollLeft();
				var scrollTop = req.ui.workflow.getScrollTop();
				
				if (data.grid) {
					var drawElem = new (eval("req.figure." + data.grid.reqClassName))(data.selections[0].get("Name"), data.selections[0].id, data.selections[0].get("parentoids"), data.selections[0].get("childoids"));
				}
				else {
					var drawElem = new (eval("req.figure." + dd.dragData.reqClassName))(dd.dragData.reqClassName);
				}
				
				var x = e.xy[0] - xOffset + scrollLeft;
				var y = e.xy[1] - yOffset + scrollTop;
				
				var compartment = req.ui.workflow.getBestCompartmentFigure(x, y);
				req.ui.workflow.getCommandStack().execute(new draw2d.CommandAdd(req.ui.workflow, drawElem, x, y, compartment));
				
				req.establishExistingConnections(drawElem, drawElem.getParentOids());
				req.establishExistingConnections(drawElem, drawElem.getChildOids());
			}
			
			return result;
		}
	});
}

req.establishExistingConnections = function(drawElem, list){
	if (list) {
	
		for (var i = 0; i < list.length; i++) {
			var target = req.getByOid(list[i]);
			
			if (target) {
				var connectionData = req.connection.getConstraints(drawElem.getReqClass(), target.getReqClass());
				
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
					command.setConnection(new req.connection.BaseConnection(connectionData.label));
					drawElem.workflow.getCommandStack().execute(command);
				}
				
			}
		}
	}
}

req.UndoButtonHandler = function(undoButton, redoButton){
	draw2d.CommandStackEventListener.call(this);
	
	this.undoButton = undoButton;
	this.redoButton = redoButton;
}

req.UndoButtonHandler.prototype = draw2d.CommandStackEventListener;

req.UndoButtonHandler.prototype.stackChanged = function(oEvent){
	this.undoButton.setDisabled(!req.ui.workflow.getCommandStack().canUndo());
	this.redoButton.setDisabled(!req.ui.workflow.getCommandStack().canRedo());
}


req.initSession = function(login, password, form){
	Ext.Ajax.request({
		url: req.data.jsonUrl,
		method: "post",
		success: function(response){
			req.handleLogin(response, form)
		},
		params: {
			usr_action: "dologin",
			login: login,
			password: password,
			response_format: "JSON"
		},
	});
}

req.handleLogin = function(response, form){
	var data = Ext.util.JSON.decode(response.responseText);
	
	if (data.errorMsg) {
		req.util.showMessage("Login Failed", data.errorMsg);
		
		var passwordField = form.getForm().findField("password");
		
		passwordField.setValue("");
		passwordField.focus();
	}
	else {
		req.data.sid = data.sid;
		
		Ext.getCmp("loginViewport").destroy();
		Ext.get("viewport").dom.style.display = "block";
		
		req.ui.create();
		
		req.ui.createExistingFigureTabs(Ext.getCmp("existingFiguresContainer"));
		
		req.loadStores();
	}
	
}

req.util.showMessage = function(title, message){
	var messageContainer = Ext.getCmp("messageContainer");
	if (!messageContainer) {
		messageContainer = Ext.DomHelper.insertFirst(document.body, {
			id: "messageContainer"
		}, true);
	}
	messageContainer.alignTo(document, 't-t');
	var messageBox = Ext.DomHelper.append(messageContainer, {
		html: '<div class="msg">' +
		'<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>' +
		'<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc"><h3>' +
		title +
		'</h3>' +
		message +
		'</div></div></div>' +
		'<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>' +
		'</div>'
	}, true);
	messageBox.slideIn('t').pause(1).ghost("t", {
		remove: true
	});
}


req.loadStores = function(){
	for (var i = 0; i < req.data.stores.getSize(); i++) {
		var store = req.data.stores.get(i);
		
		store.load();
	}
}


req.util.ellipseX = function(centerX, deg){
	return centerX + centerX * Math.cos(req.util.deg2rad(deg));
}

req.util.ellipseY = function(centerY, deg){
	return centerY + centerY * Math.sin(req.util.deg2rad(deg));
}

req.util.deg2rad = function(deg){
	return deg * Math.PI / 180;
}

req.addOid = function(oid, figure){
	req.data.oidList[oid] = figure;
}

req.getByOid = function(oid){
	return req.data.oidList[oid];
}

req.fieldChanged = function(field, newValue, oldValue, oid) {
	var params = {
		sid: req.data.sid,
		controller: "ExitController",
		usr_action: "save",
		response_format: "JSON"
	}
	
	params["value--" + field.getName() + "-" + oid] = newValue;

	Ext.Ajax.request({
		url: req.data.jsonUrl,
		method: "POST",
		params: params
	});
}
