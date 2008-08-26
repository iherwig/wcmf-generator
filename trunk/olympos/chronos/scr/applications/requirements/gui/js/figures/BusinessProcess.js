/**
 * @author nikostotz
 */
/**
 * @author nikostotz
 */
BusinessProcess = function(className){
    LabelCenterFigure.call(this, className, 150, 50);
    this.minWidth = 80;
	this.minHeight = 30;
    
    this.setClassName(className);
}

BusinessProcess.prototype = new LabelCenterFigure;
BusinessProcess.prototype.type = "BusinessProcess";

BusinessProcess.prototype.paint = function(){
    draw2d.VectorFigure.prototype.paint.call(this);
	
	var width = this.getWidth() - 1;
	var height = this.getHeight() - 1;
    
    this.graphics.drawPolygon([0, width - 15, width, width - 15, 0], [0, 0, height / 2, height, height]);
    
    this.graphics.paint();

	this.label.style.top = ((height / 2) - (parseInt(this.label.style.height) / 2)) + "px";
    
    this.html.appendChild(this.label);
}