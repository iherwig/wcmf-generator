/**
 * @author nikostotz
 */
/**
 * @author nikostotz
 */
AbstractFigure = function(className, width, height){
	draw2d.VectorFigure.call(this);
	this.setDimension(width, height);
	
	this.setClassName(className);
}

AbstractFigure.prototype = new draw2d.VectorFigure;
AbstractFigure.prototype.type = "AbstractFigure";
AbstractFigure.prototype.setWorkflow = function(workflow){
	draw2d.VectorFigure.prototype.setWorkflow.call(this, workflow);
	
	if (workflow != null && this.port == null) {
		this.port = new ModelPort();
		this.port.setWorkflow(workflow);
		this.addPort(this.port, this.getWidth() + 8, 0);
		
	}
}

AbstractFigure.prototype.setClassName = function(name){
	if (name != null) {
		this.label.innerHTML = name;
		this.className = name;
	}
}

AbstractFigure.prototype.getClassName = function(){
	return this.className;
}


AbstractFigure.prototype.setDimension = function(width, height){
	if (width < this.minWidth) {
		width = this.minWidth;
	}
	if (height < this.minHeight) {
		height = this.minHeight;
	}
	
	draw2d.VectorFigure.prototype.setDimension.call(this, width, height);
	
	if (this.port != null) {
		this.port.setPosition(this.getWidth() + 8, 0);
	}
	
	this.setLabelDimension();
}

AbstractFigure.prototype.setLabelDimension = function(){

}
