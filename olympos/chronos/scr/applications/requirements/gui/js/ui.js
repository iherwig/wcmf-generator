uwm.ui.createLogin = function(){
	var submitHandler = function(){
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


uwm.ui.create = function(){
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
				items: [{
					region: "north",
					title: "New Elements",
					collapsible: true,
					split: true,
					autoScroll: true,
					height: 250,
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
								return this.checkDrop(nodeData, source, e, data);
							},
							onNodeDrop: function(nodeData, source, e, data){
								var source = data.node;
								var target = nodeData.node;
								
								var result = this.checkDrop(nodeData, source, e, data);
								
								if (result) {
									if (source) {
									
										target.appendChild(source);
										uwm.postConnection(source.id, target.id);
									}
									else {
										uwm.createNewFigure(data.uwmClassName, null, null, null, function(response, newClassName, uwmClassName, x, y, compartment){
											var data = Ext.util.JSON.decode(response.responseText);
											
											if (data.oid) {
												var oid = data.oid;
												
												uwm.changeField("Name", newClassName, oid);
												
												uwm.postConnection(oid, target.id);
												
												target.appendChild(new Ext.tree.TreeNode({
													id: oid,
													iconCls: "Figure" + uwmClassName,
													leaf: false,
													text: newClassName
												}))
											}
										});
									}
								}
								
								return result;
							},
							checkDrop: function(nodeData, source, e, data){
								var result = Ext.tree.TreeDropZone.prototype.onNodeOver.call(this, nodeData, source, e, data);
								
								var sourceNode = data.node;
								var sourceClass = data.uwmClassName;
								var targetNode = nodeData.node
								
								if (sourceNode != targetNode) {
								
									var sourceUwmClassName;
									if (sourceNode) {
										sourceUwmClassName = sourceNode.id.match(/[^:]+/);
									}
									else {
										sourceUwmClassName = sourceClass;
									}
									var targetUwmClassName = targetNode.id.match(/[^:]+/);
									
									if (uwm.connection.getConstraints(targetUwmClassName, sourceUwmClassName).relationship == "child") {
										//result = true
									}
									else {
										result = false;
									}
									
								}
								
								return result;
							}
						},
						rootVisible: false,
						root: new Ext.tree.AsyncTreeNode({
							id: "root"
						}),
						loader: new Ext.tree.TreeLoader({
							url: uwm.config.jsonUrl,
							baseParams: {
								sid: uwm.data.sid,
								controller: "TreeViewController",
								response_format: "JSON",
								usr_action: "loadChildren"
							},
							listeners: {
								load: function(self, node, response){
									uwm.changeTreeNode(node);
								}
							}
						}),
						contextMenu: new Ext.menu.Menu({
							items: [{
								text: "Delete from model",
								handler: function(item){
									var n = item.parentMenu.contextNode;
									if (n.parentNode) {
										n.remove();
									}
									uwm.deleteFigureFromModel(n.id);
								}
							}]
						}),
						listeners: {
							click: function(node, e){
								var uwmClassName = node.id.match(/[^:]+/);
								
								uwm.showProperties(uwmClassName, node.id);
							},
							contextmenu: function(node, e){
								node.select();
								var c = node.getOwnerTree().contextMenu;
								c.contextNode = node;
								c.showAt(e.getXY());
							}
						}
					})]
				}]
			}
		}, {
			region: "east",
			collapsible: true,
			split: true,
			width: 250,
			layout: "fit",
			title: "Properties",
			items: [{
				id: "propertiesContainer"
			}]
		}, new Ext.BoxComponent({
			region: "center",
			el: "viewport",
			listeners: {
				render: function(g){
					uwm.initializeDropZone(g);
				}
			}
		})]
	});
	
	uwm.ui.createNewFigureTemplates(Ext.getCmp("newFiguresContainer"));
	
	uwm.ui.initWorkflow();
	
	uwm.setUnselectable(document.getElementById("viewport"));
	
	Ext.EventManager.on(window, 'beforeunload', function(e){
		uwm.jsonRequest({
			usr_action: "logout",
		}, "Logging out");
		
		uwm.util.sleep(1111);
	});
}

uwm.ui.createNewFigureTemplates = function(container){
	for (var currIndex = 0; currIndex < uwm.config.figureList.length; currIndex++) {
		var currFigure = uwm.config.figureList[currIndex];
		
		container.add(new Ext.BoxComponent({
			autoEl: {
				tag: "div",
				html: currFigure
			},
			cls: "FigureTemplate Figure" + currFigure,
			uwmClassName: currFigure,
			listeners: {
				render: function(v){
					uwm.setUnselectable(v.getEl().dom);
					uwm.initializeTemplateDragZone(v, v.uwmClassName);
				}
			}
		}));
	}
	
	container.doLayout();
}

uwm.ui.createExistingFigureTabs = function(container){
	uwm.data.stores = new draw2d.ArrayList();
	
	for (var currIndex = 0; currIndex < uwm.config.tabList.length; currIndex++) {
		var currFigure = uwm.config.tabList[currIndex];
		
		var storeString = uwm.getModelFunction(currFigure, "getStore");
		
		if (storeString) {
			var store = eval(storeString + "()");
			
			uwm.data.stores.add(store);
			
			container.add(new Ext.Panel({
				iconCls: "FigureGraphic Figure" + currFigure,
				layout: "fit",
				items: eval(uwm.getModelFunction(currFigure, "getGrid") + "(store)")
			}));
		}
	}
	
	
	container.setActiveTab(0);
	
	Ext.getCmp("contentContainer").doLayout();
}

uwm.ui.initWorkflow = function(){
	uwm.ui.workflow = new draw2d.Workflow("canvas");
	uwm.ui.workflow.setViewPort("viewport");
	
	uwm.ui.workflow.scrollTo(uwm.ui.workflow.getHeight() / 2, uwm.ui.workflow.getWidth() / 2);
	
	var propertyHandler = new uwm.PropertyHandler();
	uwm.ui.workflow.addSelectionListener(propertyHandler);
	uwm.ui.workflow.getCommandStack().addCommandStackEventListener(propertyHandler);
	uwm.ui.workflow.getCommandStack().addCommandStackEventListener(new uwm.DeleteHandler());
	
	uwm.data.snapToObjects = false;
	
	Ext.fly("canvas").on("mousedown", function(e){
		if (e.button == 2) {
			var contextMenu = new Ext.menu.Menu({
				items: [new Ext.menu.CheckItem({
					text: "Snap to objects",
					checked: uwm.data.snapToObjects,
					listeners: {
						checkchange: function(self, checked){
							uwm.data.snapToObjects = checked;
							uwm.ui.workflow.setSnapToGeometry(checked);
						}
					}
				})]
			});
			
			contextMenu.showAt(e.xy);
			
			e.stopEvent();
			
			return false;
		}
	});
}


