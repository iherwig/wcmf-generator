/**
 * @author nikostotz
 */
/**
 * @author nikostotz
 */
BusinessPartnerPassive = function(className){
    LabelBelowFigure.call(this, className, 50, 150);
    this.minWidth = 30;
	this.minHeight = 80;
    
    this.setClassName(className);
}

BusinessPartnerPassive.prototype = new LabelBelowFigure;
BusinessPartnerPassive.prototype.type = "BusinessPartnerPassive";

BusinessPartnerPassive.prototype.paint = function(){
    draw2d.VectorFigure.prototype.paint.call(this);
    
    var width = this.getWidth() - 1;
    var height = this.getHeight() - 1;
    
    this.graphics.setColor("#ffffff");
    this.graphics.fillOval(0 + width / 10, 0, width / 1.25, height * 0.3);
    this.graphics.setStroke(3);
    this.graphics.setColor("#000000");
    this.graphics.drawOval(0 + width / 10, 0, width / 1.25, height * 0.3);
    this.graphics.drawLine(width / 2, height * 0.3, width / 2, height * 0.7);
    this.graphics.drawLine(width / 2, height * 0.4, 0, height * 0.6);
    this.graphics.drawLine(width / 2, height * 0.4, width, height * 0.6);
    this.graphics.drawLine(width / 2, height * 0.7, 0, height);
    this.graphics.drawLine(width / 2, height * 0.7, width, height);
    
    this.graphics.paint();
    
    this.html.appendChild(this.label);
	this.setLabelDimension();
}
