/**
 * @author nikostotz
 */
/**
 * @author nikostotz
 */
LabelBelowFigure = function(className, width, height){
	AbstractFigure.call(this, className, width, height);
	
	this.setClassName(className);
}

LabelBelowFigure.prototype = new AbstractFigure;
LabelBelowFigure.prototype.type = "LabelBelowFigure";

LabelBelowFigure.prototype.setLabelDimension = function(){
	if (this.label != null) {
		this.label.style.left = (-(this.label.clientWidth - this.width) / 2) + "px";
	}
	
}

LabelBelowFigure.prototype.createHTMLElement = function(){
	var item = draw2d.Figure.prototype.createHTMLElement.call(this);
	
	this.label = document.createElement("div");
	this.label.style.position = "absolute";
	this.label.style.width = "auto";
	this.label.style.textAlign = "center";
	this.label.style.bottom = "-24px";
	this.label.style.height = "20px";
	
	return item;
}
