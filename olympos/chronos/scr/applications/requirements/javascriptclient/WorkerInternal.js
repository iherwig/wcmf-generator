/**
 * @author nikostotz
 */
/**
 * @author nikostotz
 */
WorkerInternal = function(className){
	LabelBelowFigure.call(this, className, 100, 100);
	this.minWidth = 80;
	this.minHeight = 80;
	
	this.setClassName(className);
}

WorkerInternal.prototype = new LabelBelowFigure;
WorkerInternal.prototype.type = "WorkerInternal";

WorkerInternal.prototype.paint = function(){
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
	
	this.graphics.drawLine(width / 2, height / 20, width / 20 * 12, 0);
	this.graphics.drawLine(width / 2, height / 20, width / 20 * 12, height / 20 * 2);
	this.graphics.drawOval(0, height / 20, width, height / 20 * 19);
	
	this.graphics.paint();
	
	this.html.appendChild(this.label);
	this.setLabelDimension();
}
