/**
 * @author nikostotz
 */
AbstractClass = function(className, icnPath){
	this.iconPath = icnPath;
	
	draw2d.VectorFigure.call(this);
	this.setDimension(150, 50);
	
	this.setClassName(className);
}

AbstractClass.prototype = new draw2d.VectorFigure;
AbstractClass.prototype.type = "AbstractClass";
AbstractClass.prototype.setWorkflow = function(workflow){
	draw2d.VectorFigure.prototype.setWorkflow.call(this, workflow);
	
	if (workflow != null && this.port == null) {
		this.port = new ModelPort();
		this.port.setWorkflow(workflow);
		this.addPort(this.port, this.width + 8, 0);
		
		//this.recalculateSize();
	}
}

AbstractClass.prototype.setClassName = function(name){
	this.label.innerHTML = name;
	this.className = name;
}

AbstractClass.prototype.getClassName = function(){
	return this.className;
}

AbstractClass.prototype.setDimension = function(width, height){
	if (width < 80) {
		width = 80;
	}
	if (height < 30) {
		height = 30;
	}
	
	draw2d.VectorFigure.prototype.setDimension.call(this, width, height);
	
	if (this.port != null) {
		this.port.setPosition(this.getWidth() + 8, 0);
	}
	
	if (this.label != null) {
		this.label.style.width = this.getWidth() - 40 + "px";
	}
}

AbstractClass.prototype.createHTMLElement = function(){
	var item = draw2d.Figure.prototype.createHTMLElement.call(this);
	
	this.label = document.createElement("div");
	this.label.style.position = "absolute";
	this.label.style.left = "20px";
	this.label.style.top = "5px";
	this.label.style.overflow = "hidden";
	this.image = document.createElement("img");
	this.image.setAttribute("src", this.iconPath);
	this.image.style.position = "absolute";
	this.image.style.top = "2px";
	this.image.style.right = "2px";
	this.image.style.width = "24px";
	this.image.style.height = "24px";
	
	return item;
}

AbstractClass.prototype.paint = function(){
	draw2d.VectorFigure.prototype.paint.call(this);
	
	var width = this.getWidth() - 1;
	var height = this.getHeight() - 1;
	
	this.graphics.drawRect(0, 0, width, height);
	this.graphics.drawLine(10, 0, 10, height);
	this.graphics.drawLine(15, 0, 15, height);
	
	this.graphics.paint();
	
	this.html.appendChild(this.label);
	this.html.appendChild(this.image);
}

AbstractClass.prototype.getPersistentAttributes = function(){
	var result = {id: this.id, label: this.label.innerHTML, x: this.x, y: this.y, width: this.width, height: this.height}
	
	return result;
}
