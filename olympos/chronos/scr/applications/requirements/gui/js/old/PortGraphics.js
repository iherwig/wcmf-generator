/**
 * @author nikostotz
 */
/**
 * @author nikostotz
 */
PortGraphics = function(){
	draw2d.VectorFigure.call(this);
	this.setDimension(10, 10);
}

PortGraphics.prototype = new draw2d.VectorFigure;
PortGraphics.prototype.type = "PortGraphics";

PortGraphics.prototype.paint = function(){
	draw2d.VectorFigure.prototype.paint.call(this);
	
	var width = this.getWidth();
	var height = this.getHeight();
	
	
	this.graphics.drawLine(0, height / 2, width, height / 2);
	this.graphics.drawLine(width / 2, 0, width, height / 2);
	this.graphics.drawLine(width / 2, height, width, height / 2);
	
	this.graphics.paint();
	
}
