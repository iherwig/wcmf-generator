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
					tabPosition: "bottom",
					id: "existingFiguresContainer"
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
	
	req.initSession();	
	
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
		
		var store = eval("if (req.store.create" + currFigure + ") req.store.create" + currFigure + "()");
		
		if (store) {
			req.data.stores.add(store);
			
			container.add(new Ext.Panel({
				iconCls: "FigureGraphic Figure" + currFigure,
				layout: "fit",
				items: new Ext.grid.GridPanel({
					columns: [{
						header: currFigure,
						dataIndex: "Name",
						sortable: true
					}],
					store: store,
					enableDragDrop: true,
					selModel: new Ext.grid.RowSelectionModel({
						singleSelect: true
					}),
					ddGroup: 'gridDDGroup',
					reqClassName: currFigure
				})
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


