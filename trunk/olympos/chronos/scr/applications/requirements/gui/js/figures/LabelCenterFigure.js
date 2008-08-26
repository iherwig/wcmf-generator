/**
 * @author nikostotz
 */
/**
 * @author nikostotz
 */
LabelCenterFigure = function(className, width, height){
	AbstractFigure.call(this, className, width, height);
	
	this.setClassName(className);
}

LabelCenterFigure.prototype = new AbstractFigure;
LabelCenterFigure.prototype.type = "LabelCenterFigure";

LabelCenterFigure.prototype.setLabelDimension = function(width, height){
	if (this.label != null) {
		//this.label.style.width = this.width - 10 + "px";
	}
	
}

LabelCenterFigure.prototype.createHTMLElement = function(){
	var item = draw2d.Figure.prototype.createHTMLElement.call(this);
	
	this.label = document.createElement("div");
	this.label.style.position = "absolute";
	this.label.style.width = "100%";
	this.label.style.textAlign = "center";
	this.label.style.left = "5px";
	this.label.style.overflow = "hidden";
	this.label.style.height = "20px";
	
	return item;
}
