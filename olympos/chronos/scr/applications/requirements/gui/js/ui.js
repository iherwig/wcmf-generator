uwm.ui.createLogin = function() {
	var submitHandler = function() {
		if (loginForm.getForm().isValid()) {
			uwm.initSession(loginForm.getForm().findField("login").getValue(), loginForm.getForm().findField("password").getValue(), loginForm);
		}
	};
	
	var loginForm = new Ext.FormPanel({
		labelWidth: 75,
		frame: true,
		title: 'Login',
		bodyStyle: 'padding:5px 5px 0',
		width: 350,
		defaults: {
			width: 230
		},
		keys: [{
			key: [10, 13],
			handler: function() {
				submitHandler(loginForm);
			}
			
		}],
		
		items: [new Ext.form.TextField({
			fieldLabel: 'Login',
			name: 'login',
			allowBlank: false,
			value: uwm.config.defaultLogin
		}), new Ext.form.TextField({
			fieldLabel: 'Password',
			name: 'password',
			inputType: "password",
			allowBlank: false,
			value: uwm.config.defaultPassword
		})],
		buttons: [{
			text: 'Login',
			type: 'submit',
			handler: function() {
				submitHandler(loginForm);
			}
		}]
	});
	
	var viewport = new Ext.Viewport({
		id: "loginViewport",
		layout: "absolute",
		items: [loginForm]
	});
	
	var viewportSize = viewport.getSize();
	var formSize = loginForm.getSize();
	
	var x = viewportSize.width / 2 - formSize.width / 2;
	var y = viewportSize.height / 2 - formSize.height / 2;
	
	loginForm.setPosition(x, y);
	loginForm.getForm().findField("login").focus();
}


uwm.ui.create = function() {
	var viewport = new Ext.Viewport({
		layout: "border",
		items: [{
			region: "west",
			title: "Available Content",
			collapsible: true,
			split: true,
			width: 250,
			layout: "fit",
			id: "contentContainer",
			items: {
				layout: "border",
				items: [new uwm.newobjects.NewObjectsGrid({}), {
					region: "center",
					title: "Existing Classes",
					xtype: "tabpanel",
					//tabPosition: "bottom",
					enableTabScroll: true,
					id: "existingFiguresContainer",
					items: [new uwm.modeltree.ModelTree(), new uwm.hierarchytree.HierarchyTree()]
				}]
			}
		}, new uwm.ui.PropertyContainer(), uwm.diagram.DiagramContainer.getInstance().getTabPanel()]
	});
	
	//uwm.ui.createNewFigureTemplates(Ext.getCmp("newFiguresContainer"));
	
	if (uwm.data.autoLogout) {
		Ext.EventManager.on(window, 'beforeunload', function(e) {
			uwm.jsonRequest({
				usr_action: "logout",
			}, "Logging out");
			
			uwm.util.sleep(1111);
		});
	}
	
	//uwm.diagram.DiagramContainer.getInstance().createNewDiagram();
	
	uwm.ui.createExistingFigureTabs(Ext.getCmp("existingFiguresContainer"));
	
	uwm.loadStores();
}

uwm.ui.createNewFigureTemplates = function(container) {
	for (var currIndex = 0; currIndex < uwm.config.figureList.length; currIndex++) {
		var currFigure = uwm.config.figureList[currIndex];
		
		var component = new Ext.BoxComponent({
			autoEl: {
				tag: "div",
				html: currFigure,
				id: "new" + currFigure
			},
			cls: "FigureTemplate Figure" + currFigure,
			uwmClassName: currFigure,
			listeners: {
				render: function(v) {
					uwm.setUnselectable(v.getEl().dom);
					uwm.initializeTemplateDragZone(v, v.uwmClassName);
				}
			}
		});
		
		container.add(component);
		container.doLayout();
		
		
		var descFunc = uwm.getModelFunction(currFigure, "getDescription");
		
		if (descFunc) {
			var description = eval(descFunc + "()");
			
			if (description) {
				new Ext.ToolTip({
					target: "new" + currFigure,
					html: description
				});
			}
		}
	}
}

uwm.ui.createExistingFigureTabs = function(container) {
	uwm.data.stores = new draw2d.ArrayList();
	
	for (var currIndex = 0; currIndex < uwm.config.tabList.length; currIndex++) {
		var currFigure = uwm.config.tabList[currIndex];
		
		var storeString = uwm.getModelFunction(currFigure, "getStore");
		
		if (storeString) {
			var store = eval(storeString + "()");
			
			uwm.data.stores.add(store);
			
			container.add(eval(uwm.getModelFunction(currFigure, "getGrid") + "(store)"));
		}
	}
	
	
	container.setActiveTab(0);
	
	Ext.getCmp("contentContainer").doLayout();
}


uwm.ui.getContextMenuPosition = function(x, y) {
	var viewport = uwm.data.currentDiagram.viewPort;
	var scroll = viewport.getScroll();
	var xy = viewport.getXY();
	
	return [x - scroll.left + xy[0] + 2, y - scroll.top + xy[1] + 2];
}

uwm.ui.showDiagramEdit = function(parentComponent) {
	var getKey = function(hash, key) {
		for (curr in hash) {
			if (hash[curr] == key) {
				return curr;
			}
		}
	}
	
	var getArray = function(hash) {
		var result = new Array();
		for (curr in hash) {
			if (curr != "remove") {
				result[result.length] = curr;
			}
		}
		
		return result;
	}
	
	var form = new Ext.form.FormPanel({
		labelWidth: 90,
		frame: true,
		labelAlign: "top",
		title: 'Diagram Edit View',
		defaults: {
			width: 222
		},
		defaultType: 'textfield',
		items: [new Ext.form.NumberField({
			fieldLabel: "Preferred connection length",
			value: uwm.data.currentDiagram.layouter.getPreferredEdgeLength(),
			allowBlank: false,
			allowDecimals: false,
			allowNegative: false,
			listeners: {
				change: function(self, newValue, oldValue) {
					uwm.data.currentDiagram.layouter.setPreferredEdgeLength(newValue);
				}
			}
		}), new Ext.form.ComboBox({
			fieldLabel: "Optimization procedure",
			value: getKey(uwm.autolayout.Layouter.opt, uwm.data.currentDiagram.layouter.getOptimizationProcedure()),
			typeAhead: true,
			mode: "local",
			forceSelection: true,
			triggerAction: "all",
			store: getArray(uwm.autolayout.Layouter.opt),
			listeners: {
				select: function(self, record, index) {
					uwm.data.currentDiagram.layouter.setOptimizationProcedure(uwm.autolayout.Layouter.opt[record.data.text]);
				}
			}
		}), new Ext.form.NumberField({
			fieldLabel: "Line Search Accuracy",
			value: uwm.data.currentDiagram.layouter.getLineSearchAccuracy(),
			allowBlank: false,
			allowDecimals: true,
			allowNegative: false,
			decimalPrecision: 6,
			listeners: {
				change: function(self, newValue, oldValue) {
					uwm.data.currentDiagram.layouter.setLineSearcHAccuracy(newValue);
				}
			}
		}), new Ext.form.NumberField({
			fieldLabel: "Conjugate Gradients Restart Threshold",
			value: uwm.data.currentDiagram.layouter.getCgRestartThreshold(),
			allowBlank: false,
			allowDecimals: true,
			allowNegative: false,
			decimalPrecision: 3,
			listeners: {
				change: function(self, newValue, oldValue) {
					uwm.data.currentDiagram.layouter.setCgRestartThreshold(newValue);
				}
			}
		}), new Ext.form.ComboBox({
			fieldLabel: "Spring Type",
			value: getKey(uwm.autolayout.Layouter.spring, uwm.data.currentDiagram.layouter.getSprings()),
			typeAhead: true,
			mode: "local",
			forceSelection: true,
			triggerAction: "all",
			store: getArray(uwm.autolayout.Layouter.spring),
			listeners: {
				select: function(self, record, index) {
					uwm.data.currentDiagram.layouter.setSprings(uwm.autolayout.Layouter.spring[record.data.text]);
				}
			}
		}), new Ext.form.ComboBox({
			fieldLabel: "Vertex Vertex Repulsion",
			value: getKey(uwm.autolayout.Layouter.vvRepulsion, uwm.data.currentDiagram.layouter.getVertexVertexRepulsion()),
			typeAhead: true,
			mode: "local",
			forceSelection: true,
			triggerAction: "all",
			store: getArray(uwm.autolayout.Layouter.vvRepulsion),
			listeners: {
				select: function(self, record, index) {
					uwm.data.currentDiagram.layouter.setVertexVertexRepulsion(uwm.autolayout.Layouter.vvRepulsion[record.data.text]);
				}
			}
		}), new Ext.form.Checkbox({
			fieldLabel: "Use Barnes-Hut",
			checked: uwm.data.currentDiagram.layouter.getBarnesHut(),
			listeners: {
				check: function(self, checked) {
					uwm.data.currentDiagram.layouter.setBarnesHut(checked);
				}
			}
		}), new Ext.form.NumberField({
			fieldLabel: "Theta",
			value: uwm.data.currentDiagram.layouter.getTheta(),
			allowBlank: false,
			allowDecimals: true,
			allowNegative: false,
			decimalPrecision: 3,
			listeners: {
				change: function(self, newValue, oldValue) {
					uwm.data.currentDiagram.layouter.setTheta(newValue);
				}
			}
		}), new Ext.form.Checkbox({
			fieldLabel: "Use Gridding",
			checked: uwm.data.currentDiagram.layouter.getGridding(),
			listeners: {
				check: function(self, checked) {
					uwm.data.currentDiagram.layouter.setGridding(checked);
				}
			}
		}), new Ext.form.NumberField({
			fieldLabel: "Iterations",
			value: uwm.data.currentDiagram.layouter.getIterations(),
			allowBlank: false,
			allowDecimals: false,
			allowNegative: false,
			listeners: {
				change: function(self, newValue, oldValue) {
					uwm.data.currentDiagram.layouter.setIterations(newValue);
				}
			}
		})]
	});
	
	parentComponent.add(form);
	parentComponent.doLayout();
}

