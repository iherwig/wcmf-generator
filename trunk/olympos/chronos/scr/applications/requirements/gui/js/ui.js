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
	Ext.get("viewport").dom.style.display = "block";
	
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
					//tabPosition: "bottom",
					enableTabScroll: true,
					id: "existingFiguresContainer",
					items: [new uwm.TreePanel({
						layout: "fit",
						id: "figureTree",
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
										uwm.createNewFigure(data.uwmClassName, null, null, null, function(data, newClassName, uwmClassName, x, y, compartment){
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
									
									var constraints = uwm.connection.getConstraints(targetUwmClassName, sourceUwmClassName);
									
									if (constraints && constraints.relationship == "child") {
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
						listeners: {
							click: function(node, e){
								var uwmClassName = node.id.match(/[^:]+/);
								
								uwm.showProperties(uwmClassName, node.id);
							},
							contextmenu: function(node, e){
								var contextMenu = new Ext.menu.Menu({
									items: [new Ext.menu.Item({
										text: "Show in diagram",
										handler: function(item, e){
											var oid = node.id;
											
											uwm.showInDiagram(oid);
										},
										disabled: !uwm.getByOid(node.id)
									}), new Ext.menu.Item({
										text: "Show in grid",
										handler: function(item, e){
											var oid = node.id;
											var uwmClassName = oid.match(/[^:]+/);
											
											uwm.showInGrid(uwmClassName, oid);
										}
									}), new Ext.menu.Item({
										text: "Show in Hierarchy",
										handler: function(item, e){
											var oid = node.id;
											
											uwm.showInHierarchy(oid);
										}
									}), "-", {
										text: "Delete from model",
										handler: function(item){
											var oid = node.id;
											var uwmClassName = oid.match(/[^:]+/);
											
											uwm.deleteFigureFromModel(uwmClassName, oid);
										}
									}]
								});
								node.select();
								
								contextMenu.showAt(e.getXY());
							}
						}
					}), new Ext.tree.TreePanel({
						layout: "fit",
						id: "hierarchyTree",
						iconCls: "TreeTab",
						autoScroll: true,
						enableDD: true,
						dragConfig: {
							ddGroup: "gridDDGroup"
						},
						root: new Ext.tree.TreeNode(),
						rootVisible: false,
						listeners: {
							click: function(node, e){
								var uwmClassName = node.attributes.oid.match(/[^:]+/);
								
								uwm.showProperties(uwmClassName, node.attributes.oid);
							},
							contextmenu: function(node, e){
								var contextMenu = new Ext.menu.Menu({
									items: [new Ext.menu.Item({
										text: "Show in diagram",
										handler: function(item, e){
											var oid = node.attributes.oid;
											
											uwm.showInDiagram(oid);
										},
										disabled: !uwm.getByOid(node.attributes.oid)
									}), new Ext.menu.Item({
										text: "Show in grid",
										handler: function(item, e){
											var oid = node.attributes.oid;
											var uwmClassName = oid.match(/[^:]+/);
											
											uwm.showInGrid(uwmClassName, oid);
										}
									}), new Ext.menu.Item({
										text: "Show in tree",
										handler: function(item, e){
											var oid = node.attributes.oid;
											
											uwm.showInTree(oid);
										}
									}), new Ext.menu.Item({
										text: "Show in Hierarchy",
										handler: function(item, e){
											var oid = node.attributes.oid;
											
											uwm.showInHierarchy(oid);
										}
									}), "-", {
										text: "Delete from model",
										handler: function(item){
											var oid = node.attributes.oid;
											var uwmClassName = oid.match(/[^:]+/);
											
											uwm.deleteFigureFromModel(uwmClassName, oid);
										}
									}]
								});
								node.select();
								
								contextMenu.showAt(e.getXY());
							}
							
						},
						loader: new Ext.tree.TreeLoader({
							dataUrl: uwm.config.jsonUrl,
							baseParams: {
								sid: uwm.data.sid,
								response_format: "JSON",
								usr_action: "display",
								depth: 2,
								omitMetaData: true
							},
							listeners: {
								beforeload: function(self, node, callback){
									self.baseParams.oid = node.attributes.oid;
								},
								load: function(self, node, response){
									var responseArray = Ext.decode(response.responseText);
									
									uwm.loadHierarchyNode(responseArray.node, node, null);
								}
								
							}
						})
					})]
				}]
			}
		}, {
			region: "east",
			collapsible: true,
			split: true,
			width: 250,
			autoScroll: true,
			title: "Properties",
			items: [{
				id: "propertiesContainer"
			}]
		}, new Ext.BoxComponent({
			region: "center",
			el: "viewport",
			id: "canvas",
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
	
	if (uwm.data.autoLogout) {
		Ext.EventManager.on(window, 'beforeunload', function(e){
			uwm.jsonRequest({
				usr_action: "logout",
			}, "Logging out");
			
			uwm.util.sleep(1111);
		});
	}
	
	uwm.ui.createExistingFigureTabs(Ext.getCmp("existingFiguresContainer"));
	
	uwm.loadStores();
}

uwm.ui.createNewFigureTemplates = function(container){
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
				render: function(v){
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

uwm.ui.createExistingFigureTabs = function(container){
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

uwm.ui.initWorkflow = function(){
	uwm.ui.workflow = new uwm.Workflow("canvas");
	uwm.ui.workflow.setViewPort("viewport");
	
	uwm.ui.workflow.scrollTo(uwm.ui.workflow.getHeight() / 2, uwm.ui.workflow.getWidth() / 2);
	
	var propertyHandler = new uwm.PropertyHandler();
	uwm.ui.workflow.addSelectionListener(propertyHandler);
	uwm.ui.workflow.getCommandStack().addCommandStackEventListener(propertyHandler);
	uwm.ui.workflow.getCommandStack().addCommandStackEventListener(new uwm.DeleteHandler());
	
	uwm.data.snapToObjects = false;
	
	uwm.data.layouter = new uwm.autolayout.Layouter(uwm.ui.workflow);
}


uwm.ui.getContextMenuPosition = function(x, y){
	var viewport = Ext.get("viewport");
	var scroll = viewport.getScroll();
	var xy = viewport.getXY();
	
	return [x - scroll.left + xy[0] + 2, y - scroll.top + xy[1] + 2];
}

uwm.ui.showDiagramEdit = function(parentComponent){
	var getKey = function(hash, key){
		for (curr in hash) {
			if (hash[curr] == key) {
				return curr;
			}
		}
	}
	
	var getArray = function(hash){
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
			value: uwm.data.layouter.getPreferredEdgeLength(),
			allowBlank: false,
			allowDecimals: false,
			allowNegative: false,
			listeners: {
				change: function(self, newValue, oldValue){
					uwm.data.layouter.setPreferredEdgeLength(newValue);
				}
			}
		}), new Ext.form.ComboBox({
			fieldLabel: "Optimization procedure",
			value: getKey(uwm.autolayout.Layouter.opt, uwm.data.layouter.getOptimizationProcedure()),
			typeAhead: true,
			mode: "local",
			forceSelection: true,
			triggerAction: "all",
			store: getArray(uwm.autolayout.Layouter.opt),
			listeners: {
				select: function(self, record, index){
					uwm.data.layouter.setOptimizationProcedure(uwm.autolayout.Layouter.opt[record.data.text]);
				}
			}
		}), new Ext.form.NumberField({
			fieldLabel: "Line Search Accuracy",
			value: uwm.data.layouter.getLineSearchAccuracy(),
			allowBlank: false,
			allowDecimals: true,
			allowNegative: false,
			decimalPrecision: 6,
			listeners: {
				change: function(self, newValue, oldValue){
					uwm.data.layouter.setLineSearcHAccuracy(newValue);
				}
			}
		}), new Ext.form.NumberField({
			fieldLabel: "Conjugate Gradients Restart Threshold",
			value: uwm.data.layouter.getCgRestartThreshold(),
			allowBlank: false,
			allowDecimals: true,
			allowNegative: false,
			decimalPrecision: 3,
			listeners: {
				change: function(self, newValue, oldValue){
					uwm.data.layouter.setCgRestartThreshold(newValue);
				}
			}
		}), new Ext.form.ComboBox({
			fieldLabel: "Spring Type",
			value: getKey(uwm.autolayout.Layouter.spring, uwm.data.layouter.getSprings()),
			typeAhead: true,
			mode: "local",
			forceSelection: true,
			triggerAction: "all",
			store: getArray(uwm.autolayout.Layouter.spring),
			listeners: {
				select: function(self, record, index){
					uwm.data.layouter.setSprings(uwm.autolayout.Layouter.spring[record.data.text]);
				}
			}
		}), new Ext.form.ComboBox({
			fieldLabel: "Vertex Vertex Repulsion",
			value: getKey(uwm.autolayout.Layouter.vvRepulsion, uwm.data.layouter.getVertexVertexRepulsion()),
			typeAhead: true,
			mode: "local",
			forceSelection: true,
			triggerAction: "all",
			store: getArray(uwm.autolayout.Layouter.vvRepulsion),
			listeners: {
				select: function(self, record, index){
					uwm.data.layouter.setVertexVertexRepulsion(uwm.autolayout.Layouter.vvRepulsion[record.data.text]);
				}
			}
		}), new Ext.form.Checkbox({
			fieldLabel: "Use Barnes-Hut",
			checked: uwm.data.layouter.getBarnesHut(),
			listeners: {
				check: function(self, checked){
					uwm.data.layouter.setBarnesHut(checked);
				}
			}
		}), new Ext.form.NumberField({
			fieldLabel: "Theta",
			value: uwm.data.layouter.getTheta(),
			allowBlank: false,
			allowDecimals: true,
			allowNegative: false,
			decimalPrecision: 3,
			listeners: {
				change: function(self, newValue, oldValue){
					uwm.data.layouter.setTheta(newValue);
				}
			}
		}), new Ext.form.Checkbox({
			fieldLabel: "Use Gridding",
			checked: uwm.data.layouter.getGridding(),
			listeners: {
				check: function(self, checked){
					uwm.data.layouter.setGridding(checked);
				}
			}
		}), new Ext.form.NumberField({
			fieldLabel: "Iterations",
			value: uwm.data.layouter.getIterations(),
			allowBlank: false,
			allowDecimals: false,
			allowNegative: false,
			listeners: {
				change: function(self, newValue, oldValue){
					uwm.data.layouter.setIterations(newValue);
				}
			}
		})]
	});
	
	parentComponent.add(form);
	parentComponent.doLayout();
}
