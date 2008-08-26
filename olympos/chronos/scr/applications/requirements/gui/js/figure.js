//Header

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


//Class: ChiGoal

req.figure.ChiGoal = function(label) {
	req.figure.RectFigure.call(this, "ChiGoal", label);
}

req.figure.ChiGoal.prototype = new req.figure.RectFigure;

req.figure.ChiGoal.prototype.type = "req.figure.ChiGoal";

req.figure.ChiGoal.prototype.getGrid = function(store) {
	return new Ext.grid.GridPanel({
					columns: [{
						header: "ChiGoal",
						dataIndex: "Name",
						sortable: true
					}],
					store: store,
					enableDragDrop: true,
					selModel: new Ext.grid.RowSelectionModel({
						singleSelect: true
					}),
					ddGroup: "gridDDGroup",
					reqClassName: "ChiGoal"
				});
}

req.figure.ChiGoal.prototype.getStore = function(url){
	return new Ext.data.Store({
		url: url + "&type=ChiGoal",
		reader: new Ext.data.JsonReader({
			totalProperty: "totalCount",
			root: "objects",
			id: "oid",
			fields: [{
				name: "Name",
				mapping: "values[1].Name.value"
			}]
		})
	});
}

req.figure.ChiGoal.prototype.showEdit = function(bd){

	Ext.form.Field.prototype.msgTarget = 'side';
	
	var form = new Ext.FormPanel({
	
		labelWidth: 150,
		url: '',
		frame: true,
		title: 'ChiGoal Edit View',
		bodyStyle: 'padding:5px 5px 0',
		width: 500,
		defaults: {
			width: 230
		},
		defaultType: 'textfield',
		items: [{
			fieldLabel: 'id',
			name: 'id',
			allowBlank: false,
			inputType: 'textfield'
		}, {
			fieldLabel: 'fk_chibusinessprocess_id',
			name: 'fk_chibusinessprocess_id',
			allowBlank: false,
			inputType: 'textfield'
		}, {
			fieldLabel: 'fk_package_id',
			name: 'fk_package_id',
			allowBlank: false,
			inputType: 'textfield'
		}, {
			fieldLabel: 'fk_chigoal_id',
			name: 'fk_chigoal_id',
			allowBlank: false,
			inputType: 'textfield'
		}, {
			fieldLabel: 'Priority',
			name: 'Priority',
			allowBlank: false,
			inputType: 'textfield'
		}, {
			fieldLabel: 'Value_Name',
			name: 'Value_Name',
			allowBlank: false,
			inputType: 'textfield'
		}, {
			fieldLabel: 'Value_ammount',
			name: 'Value_ammount',
			allowBlank: false,
			inputType: 'textfield'
		}, {
			fieldLabel: 'Value_Goal',
			name: 'Value_Goal',
			allowBlank: false,
			inputType: 'textfield'
		}],
		buttons: [{
			text: 'Save',
			handler: function(){
				form.getForm().submit({
					url: 'main.php',
					method: 'POST',
					success: function(form, action){
						alert('Success: ' + action.response.responseText);
					},
					failure: function(form, action){
						alert('Failure: ' + action.failureType);
					}
				});
			}
		}, {
			text: 'Cancel',
			handler: function(){
				form.getForm().reset();
			}
		}]
	});
	
	form.render(bd);
};

req.figure.ChiGoal.prototype.getConstraints = function() {
	return {
		ChiGoal: {
			label: "depends on",
			inverse: false,
			sourceMaxConns: -1,
			targetMaxConns: -1
		},
		ChiRequirement: {
			label: "defines",
			inverse: true,
			sourceMaxConns: -1,
			targetMaxConns: 1
		
		}
	};
}

//Class: ChiRequirement

req.figure.ChiRequirement = function(label) {
	req.figure.RectFigure.call(this, "ChiRequirement", label);
}

req.figure.ChiRequirement.prototype = new req.figure.RectFigure;

req.figure.ChiRequirement.prototype.type = "req.figure.ChiRequirement";

req.figure.ChiRequirement.prototype.getGrid = function(store) {
	return new Ext.grid.GridPanel({
					columns: [{
						header: "ChiRequirement",
						dataIndex: "Name",
						sortable: true
					}],
					store: store,
					enableDragDrop: true,
					selModel: new Ext.grid.RowSelectionModel({
						singleSelect: true
					}),
					ddGroup: "gridDDGroup",
					reqClassName: "ChiRequirement"
				});
}

req.figure.ChiRequirement.prototype.getStore = function(url){
	return new Ext.data.Store({
		url: url + "&type=ChiRequirement",
		reader: new Ext.data.JsonReader({
			totalProperty: "totalCount",
			root: "objects",
			id: "oid",
			fields: [{
				name: "Name",
				mapping: "values[1].Name.value"
			}]
		})
	});
}

req.figure.ChiRequirement.prototype.showEdit = function(bd){

	Ext.form.Field.prototype.msgTarget = 'side';
	
	var form = new Ext.FormPanel({
	
		labelWidth: 150,
		url: '',
		frame: true,
		title: 'ChiRequirement Edit View',
		bodyStyle: 'padding:5px 5px 0',
		width: 500,
		defaults: {
			width: 230
		},
		defaultType: 'textfield',
		items: [{
			fieldLabel: 'id',
			name: 'id',
			allowBlank: false,
			inputType: 'textfield'
		}, {
			fieldLabel: 'fk_chibusinessprocess_id',
			name: 'fk_chibusinessprocess_id',
			allowBlank: false,
			inputType: 'textfield'
		}, {
			fieldLabel: 'fk_package_id',
			name: 'fk_package_id',
			allowBlank: false,
			inputType: 'textfield'
		}, {
			fieldLabel: 'fk_chirequirement_id',
			name: 'fk_chirequirement_id',
			allowBlank: false,
			inputType: 'textfield'
		}, {
			fieldLabel: 'fk_chigoal_id',
			name: 'fk_chigoal_id',
			allowBlank: false,
			inputType: 'textfield'
		}, {
			fieldLabel: 'reqType',
			name: 'reqType',
			allowBlank: false,
			inputType: 'textfield'
		}, {
			fieldLabel: 'Priority',
			name: 'Priority',
			allowBlank: false,
			inputType: 'textfield'
		}, {
			fieldLabel: 'Author',
			name: 'Author',
			allowBlank: false,
			inputType: 'textfield'
		}, {
			fieldLabel: 'Proofreader',
			name: 'Proofreader',
			allowBlank: false,
			inputType: 'textfield'
		}, {
			fieldLabel: 'Status',
			name: 'Status',
			allowBlank: false,
			inputType: 'textfield'
		}],
		buttons: [{
			text: 'Save',
			handler: function(){
				form.getForm().submit({
					url: 'main.php',
					method: 'POST',
					success: function(form, action){
						alert('Success: ' + action.response.responseText);
					},
					failure: function(form, action){
						alert('Failure: ' + action.failureType);
					}
				});
			}
		}, {
			text: 'Cancel',
			handler: function(){
				form.getForm().reset();
			}
		}]
	});
	
	form.render(bd);
};

req.figure.ChiRequirement.prototype.getConstraints = function(){
	return {
		ChiGoal: {
			label: "defines",
			inverse: false,
			sourceMaxConns: 1,
			targetMaxConns: -1
		
		},
		ChiRequirement: {
			label: "defines",
			inverse: false,
			sourceMaxConns: -1,
			targetMaxConns: -1
		
		},
		ChiIssue: {
			label: "contradicts",
			inverse: true,
			sourceMaxConns: -1,
			targetMaxConns: 1
		
		},
		ChiFeature: {
			label: "implements",
			inverse: true,
			sourceMaxConns: -1,
			targetMaxConns: -1
		
		}
	}
}


//Following classes are incomplete


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
