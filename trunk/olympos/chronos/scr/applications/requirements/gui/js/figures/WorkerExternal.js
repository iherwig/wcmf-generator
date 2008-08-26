/**
 * @author nikostotz
 */
/**
 * @author nikostotz
 */
WorkerExternal = function(className){
	LabelBelowFigure.call(this, className, 100, 100);
	this.minWidth = 80;
	this.minHeight = 80;
	
	this.setClassName(className);
}

WorkerExternal.prototype = new LabelBelowFigure;
WorkerExternal.prototype.type = "WorkerExternal";

WorkerExternal.prototype.paint = function(){
	draw2d.VectorFigure.prototype.paint.call(this);
	
	var width = this.getWidth() - 1;
	var height = this.getHeight() - 1;
	
	this.graphics.setColor("#ffffff");
	this.graphics.fillOval(0 + width * 0.4, height * 0.1, width * 0.2, height * 0.2);
	this.graphics.setStroke(2);
	this.graphics.setColor("#000000");
	this.graphics.drawOval(0 + width * 0.4, height * 0.1, width * 0.2, height * 0.2);
	this.graphics.drawLine(width / 2, height * 0.3, width / 2, height * 0.6);
	this.graphics.drawLine(width * 0.3, height * 0.4, width * 0.7, height * 0.4);
	this.graphics.drawLine(width / 2, height * 0.6, width * 0.3, height * 0.8);
	this.graphics.drawLine(width / 2, height * 0.6, width * 0.7, height * 0.8);
	
	this.graphics.drawLine(0, 0, 0, height);
	this.graphics.drawOval(2, 0, width - 2, height);
	
	this.graphics.paint();
	
	this.html.appendChild(this.label);
	this.setLabelDimension();
}
