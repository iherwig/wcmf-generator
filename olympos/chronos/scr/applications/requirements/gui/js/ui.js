req.ui.createLogin = function(){
	var submitHandler = function(){
		if (loginForm.getForm().isValid()) {
			req.initSession(loginForm.getForm().findField("login").getValue(), loginForm.getForm().findField("password").getValue(), loginForm);
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
			handler: function(){
				submitHandler(loginForm);
			}
			
		}],
		
		items: [new Ext.form.TextField({
			fieldLabel: 'Login',
			name: 'login',
			allowBlank: false
		}), new Ext.form.TextField({
			fieldLabel: 'Password',
			name: 'password',
			inputType: "password",
			allowBlank: false
		})],
		buttons: [{
			text: 'Login',
			type: 'submit',
			handler: function(){
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


req.ui.create = function(){
	var viewport = new Ext.Viewport({
		layout: "border",
		items: [{
			region: "west",
			title: "Available Content",
			collapsible: true,
			split: true,
			width: 300,
			layout: "fit",
			id: "contentContainer",
			items: {
				layout: "border",
				items: [{
					region: "north",
					title: "New Elements",
					collapsible: true,
					split: true,
					autoScroll: true,
					height: 300,
					id: "newFiguresContainer"
				}, {
					region: "center",
					title: "Existing Classes",
					xtype: "tabpanel",
					draggable: true,
					//tabPosition: "bottom",
					enableTabScroll: true,
					id: "existingFiguresContainer",
					items: [new Ext.tree.TreePanel({
						layout: "fit",
						iconCls: "TreeTab",
						autoScroll: true,
						enableDD: true,
						dragConfig: {
							ddGroup: "gridDDGroup"
						},
						dropConfig: {
							ddGroup: "gridDDGroup",
							appendOnly: true,
							onNodeOver: function(nodeData, source, e, data){
								return this.checkDrop(data, nodeData.node);
							},
							onNodeDrop: function(nodeData, source, e, data){
								var source = data.node;
								var target = nodeData.node;
								
								var result = this.checkDrop(data, target);
								
								if (result) {
									if (source) {
									
										target.appendChild(source);
										req.postConnection(source.id, target.id);
									}
									else {
										req.createNewFigure(data.reqClassName, null, null, null, function(response, newClassName, reqClassName, x, y, compartment){
											var data = Ext.util.JSON.decode(response.responseText);
											
											if (data.oid) {
												var oid = data.oid;
												
												req.changeField("Name", newClassName, oid);
												
												req.postConnection(oid, target.id);
												
												target.appendChild(new Ext.tree.TreeNode({
													id: oid,
													iconCls: "Figure" + reqClassName,
													leaf: false,
													text: newClassName
												}))
											}
										});
									}
								}
								
								return result;
							},
							checkDrop: function(source, target){
								var result = false;
								
								if (source.node != target) {
								
									var sourceReqClassName;
									if (source.node) {
										sourceReqClassName = source.node.id.match(/[^:]+/);
									}
									else {
										sourceReqClassName = source.reqClassName;
									}
									var targetReqClassName = target.id.match(/[^:]+/);
									
									result = (req.connection.getConstraints(sourceReqClassName, targetReqClassName)) ? true : false;
									
								}
								
								return result;
							}
						},
						rootVisible: false,
						root: new Ext.tree.AsyncTreeNode({
							id: "root"
						}),
						loader: new Ext.tree.TreeLoader({
							url: req.data.jsonUrl,
							baseParams: {
								sid: req.data.sid,
								controller: "TreeViewController",
								response_format: "JSON",
								usr_action: "loadChildren"
							},
							listeners: {
								load: function(self, node, response){
									req.changeTreeNode(node);
								}
							}
						})
					})]
				}]
			}
		}, {
			region: "east",
			title: "Settings",
			collapsible: true,
			split: true,
			width: 200,
			layout: "fit",
			items: {
				layout: "border",
				items: [{
					region: "north",
					title: "Controls",
					collapsible: true,
					split: true,
					height: 100,
					id: "controlsContainer",
					items: [new Ext.Button({
						enableToggle: true,
						text: "Snap to Objects",
						toggleHandler: function(self, pressed){
							req.ui.workflow.setSnapToGeometry(pressed);
						}
					}), new Ext.Button({
						text: "Undo",
						disabled: true,
						id: "undoButton",
						handler: function(self, oEvent){
							req.ui.workflow.getCommandStack().undo();
						}
					}), new Ext.Button({
						text: "Redo",
						disabled: true,
						id: "redoButton",
						handler: function(self, oEvent){
							req.ui.workflow.getCommandStack().redo();
						}
					})]
				}, {
					region: "center",
					title: "Properties",
					id: "propertiesContainer"
				}]
			}
		}, new Ext.BoxComponent({
			region: "center",
			el: "viewport",
			listeners: {
				render: function(g){
					req.initializeDropZone(g);
				}
			}
		})]
	});
	
	req.ui.createNewFigureTemplates(Ext.getCmp("newFiguresContainer"));
	
	req.ui.initWorkflow();
	
	req.setUnselectable(document.getElementById("viewport"));
	
}

req.ui.createNewFigureTemplates = function(container){
	for (var currIndex = 0; currIndex < req.figure.list.length; currIndex++) {
		var currFigure = req.figure.list[currIndex];
		
		container.add(new Ext.BoxComponent({
			autoEl: {
				tag: "div",
				html: currFigure
			},
			cls: "FigureTemplate Figure" + currFigure,
			reqClassName: currFigure,
			listeners: {
				render: function(v){
					req.initializeTemplateDragZone(v, v.reqClassName);
				}
			}
		}));
	}
	
	container.doLayout();
}

req.ui.createExistingFigureTabs = function(container){
	req.data.stores = new draw2d.ArrayList();
	
	for (var currIndex = 0; currIndex < req.figure.list.length; currIndex++) {
		var currFigure = req.figure.list[currIndex];
		
		var store = eval("if (req.figure." + currFigure + " && req.figure." + currFigure + ".prototype.getStore) req.figure." + currFigure + ".prototype.getStore()");
		
		if (store) {
			req.data.stores.add(store);
			
			container.add(new Ext.Panel({
				iconCls: "FigureGraphic Figure" + currFigure,
				layout: "fit",
				items: eval("if (req.figure." + currFigure + " && req.figure." + currFigure + ".prototype.getGrid) req.figure." + currFigure + ".prototype.getGrid(store)")
			}));
		}
	}
	
	
	container.setActiveTab(0);
	
	Ext.getCmp("contentContainer").doLayout();
}

req.ui.initWorkflow = function(){
	req.ui.workflow = new draw2d.Workflow("canvas");
	req.ui.workflow.setViewPort("viewport");
	
	req.ui.workflow.scrollTo(req.ui.workflow.getHeight() / 2, req.ui.workflow.getWidth() / 2);
	
	var propertyHandler = new req.PropertyHandler("propertiesContainer");
	req.ui.workflow.addSelectionListener(propertyHandler);
	req.ui.workflow.getCommandStack().addCommandStackEventListener(propertyHandler);
	req.ui.workflow.getCommandStack().addCommandStackEventListener(new req.UndoButtonHandler(Ext.getCmp("undoButton"), Ext.getCmp("redoButton")));
}


