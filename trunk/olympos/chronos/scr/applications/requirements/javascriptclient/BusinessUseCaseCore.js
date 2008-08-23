/**
 * @author nikostotz
 */
/**
 * @author nikostotz
 */
BusinessUseCaseCore = function(className){
	LabelCenterFigure.call(this, className, 150, 50);
	this.minWidth = 80;
	this.minHeight = 30;
	
	this.setClassName(className);
}

BusinessUseCaseCore.prototype = new LabelCenterFigure;
BusinessUseCaseCore.prototype.type = "BusinessUseCaseCore";

BusinessUseCaseCore.prototype.paint = function(){
	draw2d.VectorFigure.prototype.paint.call(this);
	
    var width = this.getWidth() - 1;
	var height = this.getHeight() - 1;

	this.graphics.drawOval(0, 0, width, height);
	
	var centerX = width / 2;
	var centerY = height / 2;
	
	this.graphics.drawLine(ellipseX(centerX, 0), ellipseY(centerY, 0), ellipseX(centerX, 90), ellipseY(centerY, 90));
	this.graphics.drawLine(ellipseX(centerX, 15), ellipseY(centerY, 15), ellipseX(centerX, 75), ellipseY(centerY, 75));
	
	this.graphics.paint();
	
	this.label.style.top = ((height / 2) - (parseInt(this.label.style.height) / 2)) + "px";
	
	this.html.appendChild(this.label);
}
