req.figure.list = [
	"ChiGoal",
	"ChiRequirement",
	"ChiFeature",
	"ChiIssue",
	"ChiBusinessPartnerActive",
	"ChiBusinessPartnerPassive",
	"ChiBusinessProcess",
	"ChiBusinessUseCase",
	"ChiBusinessUseCaseCore",
	"ChiWorkerExternal",
	"ChiWorkerInternal"
];



req.figure.ChiGoal = function(label) {
	req.figure.RectFigure.call(this, "ChiGoal", label);
}

req.figure.ChiGoal.prototype = new req.figure.RectFigure;
req.figure.ChiGoal.prototype.type = "req.figure.ChiGoal";


req.figure.ChiRequirement = function(label) {
	req.figure.RectFigure.call(this, "ChiRequirement", label);
}

req.figure.ChiRequirement.prototype = new req.figure.RectFigure;
req.figure.ChiRequirement.prototype.type = "req.figure.ChiRequirement";



req.figure.ChiFeature = function(label) {
	req.figure.RectFigure.call(this, "ChiFeature", label);
}

req.figure.ChiFeature.prototype = new req.figure.RectFigure;
req.figure.ChiFeature.prototype.type = "req.figure.ChiFeature";



req.figure.ChiIssue = function(label) {
	req.figure.RectFigure.call(this, "ChiIssue", label);
}

req.figure.ChiIssue.prototype = new req.figure.RectFigure;
req.figure.ChiIssue.prototype.type = "req.figure.ChiIssue";



req.figure.ChiBusinessPartnerActive = function(label) {
    req.figure.LabelBelowFigure.call(this, "ChiBusinessParnerActive", label, 30, 80, 50, 150);
}

req.figure.ChiBusinessPartnerActive.prototype = new req.figure.LabelBelowFigure;
req.figure.ChiBusinessPartnerActive.prototype.type = "req.figure.ChiBusinessPartnerActive";

req.figure.ChiBusinessPartnerActive.prototype.paint = function() {
    req.figure.LabelBelowFigure.prototype.paint.call(this);
    
    var width = this.getWidth() - 1;
    var height = this.getHeight() - 1;
    
    this.graphics.setColor("#ffffff");
    this.graphics.fillOval(0 + width / 10, 0, width / 1.25, height * 0.3);
    this.graphics.setStroke(3);
    this.graphics.setColor("#000000");
    this.graphics.drawOval(0 + width / 10, 0, width / 1.25, height * 0.3);
    this.graphics.drawLine(width / 2, height * 0.3, width / 2, height * 0.7);
    this.graphics.drawLine(width / 2, height * 0.4, 0, height * 0.2);
    this.graphics.drawLine(width / 2, height * 0.4, width, height * 0.2);
    this.graphics.drawLine(width / 2, height * 0.7, 0, height);
    this.graphics.drawLine(width / 2, height * 0.7, width, height);
    
    this.graphics.paint();
    
    this.html.appendChild(this.label);
	this.setLabelDimension();
}



req.figure.ChiBusinessPartnerPassive = function(label) {
    req.figure.LabelBelowFigure.call(this, "ChiBusinessPartnerPassive", label, 30, 80, 50, 150);
}

req.figure.ChiBusinessPartnerPassive.prototype = new req.figure.LabelBelowFigure;
req.figure.ChiBusinessPartnerPassive.prototype.type = "req.figure.ChiBusinessPartnerPassive";

req.figure.ChiBusinessPartnerPassive.prototype.paint = function() {
    req.figure.LabelBelowFigure.prototype.paint.call(this);
    
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



req.figure.ChiBusinessProcess = function(label) {
    req.figure.LabelCenterFigure.call(this, "ChiBusinessProcess", label, 80, 30, 150, 50);
}

req.figure.ChiBusinessProcess.prototype = new req.figure.LabelCenterFigure;
req.figure.ChiBusinessProcess.prototype.type = "req.figure.ChiBusinessProcess";

req.figure.ChiBusinessProcess.prototype.paint = function() {
    req.figure.LabelCenterFigure.prototype.paint.call(this);
	
	var width = this.getWidth() - 1;
	var height = this.getHeight() - 1;
    
    this.graphics.drawPolygon([0, width - 15, width, width - 15, 0], [0, 0, height / 2, height, height]);
    
    this.graphics.paint();

	this.label.style.top = ((height / 2) - (parseInt(this.label.style.height) / 2)) + "px";
    
    this.html.appendChild(this.label);
}


req.figure.ChiBusinessUseCase = function(label) {
    req.figure.LabelCenterFigure.call(this, "ChiBusinessUseCase", label, 80, 30, 150, 50);
}

req.figure.ChiBusinessUseCase.prototype = new req.figure.LabelCenterFigure;
req.figure.ChiBusinessUseCase.prototype.type = "req.figure.ChiBusinessUseCase";

req.figure.ChiBusinessUseCase.prototype.paint = function() {
    req.figure.LabelCenterFigure.prototype.paint.call(this);
    
    var width = this.getWidth() - 1;
	var height = this.getHeight() - 1;
	
	this.graphics.drawOval(0, 0, width, height);

	var centerX = width / 2;
	var centerY = height / 2;

    this.graphics.drawLine(req.util.ellipseX(centerX, 0), req.util.ellipseY(centerY, 0), req.util.ellipseX(centerX, 90), req.util.ellipseY(centerY, 90));
	
    this.graphics.paint();

	this.label.style.top = ((height / 2) - (parseInt(this.label.style.height) / 2)) + "px";
    
    this.html.appendChild(this.label);
}



req.figure.ChiBusinessUseCaseCore = function(label) {
	req.figure.LabelCenterFigure.call(this, "ChiBusinessUseCaseCore", label, 80, 30, 150, 50);
}

req.figure.ChiBusinessUseCaseCore.prototype = new req.figure.LabelCenterFigure;
req.figure.ChiBusinessUseCaseCore.prototype.type = "req.figure.ChiBusinessUseCaseCore";

req.figure.ChiBusinessUseCaseCore.prototype.paint = function() {
	req.figure.LabelCenterFigure.prototype.paint.call(this);
	
    var width = this.getWidth() - 1;
	var height = this.getHeight() - 1;

	this.graphics.drawOval(0, 0, width, height);
	
	var centerX = width / 2;
	var centerY = height / 2;
	
	this.graphics.drawLine(req.util.ellipseX(centerX, 0), req.util.ellipseY(centerY, 0), req.util.ellipseX(centerX, 90), req.util.ellipseY(centerY, 90));
	this.graphics.drawLine(req.util.ellipseX(centerX, 15), req.util.ellipseY(centerY, 15), req.util.ellipseX(centerX, 75), req.util.ellipseY(centerY, 75));
	
	this.graphics.paint();
	
	this.label.style.top = ((height / 2) - (parseInt(this.label.style.height) / 2)) + "px";
	
	this.html.appendChild(this.label);
}



req.figure.ChiWorkerExternal = function(label) {
	req.figure.LabelBelowFigure.call(this, "ChiWorkerExternal", label, 80, 80, 100, 100);
}

req.figure.ChiWorkerExternal.prototype = new req.figure.LabelBelowFigure;
req.figure.ChiWorkerExternal.prototype.type = "req.figure.ChiWorkerExternal";

req.figure.ChiWorkerExternal.prototype.paint = function() {
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



req.figure.ChiWorkerInternal = function(label) {
	req.figure.LabelBelowFigure.call(this, "ChiWorkerInternal", label, 80, 80, 100, 100);
}

req.figure.ChiWorkerInternal.prototype = new req.figure.LabelBelowFigure;
req.figure.ChiWorkerInternal.prototype.type = "req.figure.ChiWorkerInternal";

req.figure.ChiWorkerInternal.prototype.paint = function() {
	req.figure.LabelBelowFigure.prototype.paint.call(this);
	
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
