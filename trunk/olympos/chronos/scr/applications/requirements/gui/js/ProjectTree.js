uwm.ProjectTree = Ext.extend(Ext.tree.TreePanel, {
	autoScroll: true,
	animate: true,
	containerScroll: true,
	root: new Ext.tree.AsyncTreeNode({
		text: "root",
		draggable: false,
		id: 'root'
	}),
	
	listeners: {
		click: function(node, e){
			var uwmClassName = node.id.match(/[^:]+/);
			
			var diagramContainer = Ext.getCmp(uwm.Diagram.CONTAINER_ID);
			
			if (false && uwmClassName == "Diagram") {
				if (!node.attributes.diagram) {
					node.attributes.diagram = new uwm.Diagram({
						title: node.text,
						oid: node.id
					});
					
					diagramContainer.add(node.attributes.diagram);
					
				}
				diagramContainer.activate(node.attributes.diagram);
			}
			else {
				uwm.showProperties(uwmClassName, node.id);
			}
		},
		contextmenu: function(node, e){
			this.contextMenuShown = true;
			var self = this;
			
			var contextMenu = null;
			
			switch (node.attributes.uwmClassName) {
				case "Model":
					contextMenu = new Ext.menu.Menu({
						items: [new Ext.menu.Item({
							text: "Add package",
							handler: function(item, e){
								var oid = node.id;
								
								uwm.createNewPackage(oid, node);
							}
						}), "-", new Ext.menu.Item({
							text: "Delete model",
							handler: function(item, e){
								var oid = node.id;
								
								uwm.deleteElementFromModel("Model", oid);
							}
						})],
						listeners: {
							hide: function(){
								self.contextMenuShown = false;
							}
						}
					});
					break;
					
				case "Package":
					contextMenu = new Ext.menu.Menu({
						items: [new Ext.menu.Item({
							text: "Add package",
							handler: function(item, e){
								var oid = node.id;
								
								uwm.createNewPackage(oid, node);
							}
						}), new Ext.menu.Item({
							text: "Add diagram",
							handler: function(item, e){
								var oid = node.id;
								
								uwm.createNewDiagram(oid, node);
							}
						}), "-", new Ext.menu.Item({
							text: "Delete package",
							handler: function(item, e){
								var oid = node.id;
								
								uwm.deleteElementFromModel("Package", oid);
							}
						})],
						listeners: {
							hide: function(){
								self.contextMenuShown = false;
							}
						}
					});
					break;
					
				default:
					contextMenu = new Ext.menu.Menu({
						items: [new Ext.menu.Item({
							text: "Show in diagram",
							handler: function(item, e){
								var oid = node.id;
								
								uwm.showInDiagram(oid);
							},
							disabled: !uwm.data.currentDiagram.getByOid(node.id)
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
								
								uwm.deleteElementFromModel(uwmClassName, oid);
							}
						}],
						listeners: {
							hide: function(){
								self.contextMenuShown = false;
							}
						}
					
					});
					break;
			}
			node.select();
			
			contextMenu.showAt(e.getXY());
		}
		
	},
	
	initComponent: function(){
		Ext.apply(this, {
			loader: new uwm.ProjectTreeLoader({
				dataUrl: uwm.config.jsonUrl,
				baseParams: {
					sid: uwm.data.sid,
					controller: "TreeViewController",
					response_format: "JSON",
					usr_action: "loadChildren"
				}
			}),
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
		}, true);
		
		uwm.ProjectTree.superclass.initComponent.apply(this, arguments);
	},
	
	render: function(){
		uwm.ProjectTree.superclass.render.apply(this, arguments);
		
		var self = this;
		
		this.el.on("contextmenu", function(e, el){
			if (!self.contextMenuShown) {
				e.preventDefault();
				
				var contextMenu = new Ext.menu.Menu({
					items: [new Ext.menu.Item({
						text: "Add model",
						handler: function(item, e){
							Ext.MessageBox.prompt("Create new Model", "Please enter name of new Model:", function(button, text){
								uwm.handleModelName(button, text);
							});
							
						},
					})]
				});
				
				contextMenu.showAt(e.getXY());
			}
		});
	}
});

uwm.ProjectTree.TREE_ID = "projectTree";

uwm.ProjectTreeLoader = Ext.extend(Ext.tree.TreeLoader, {
	processResponse: function(response, node, callback){
		var responseArray = Ext.decode(response.responseText);
		
		try {
			for (var i = 0; i < responseArray['objects'].length; i++) {
				var responseNode = responseArray['objects'][i];
				var uwmClassName = responseNode.oid.match(/^[^:]+/);
				
				var nodeDef = {
					'text': responseNode.text,
					'id': responseNode.oid,
					'leaf': !responseNode.hasChildren,
					'qtip': '',
					'qtipTitle': responseNode.oid,
					'iconCls': "Figure" + uwmClassName,
					oid: responseNode.oid,
					uwmClassName: uwmClassName[0]
				}
				var n = this.createNode(nodeDef);
				if (n) {
					node.appendChild(n);
				}
			}
			if (typeof callback == "function") {
				callback(this, node);
			}
		} 
		catch (e) {
			this.handleFailure(response);
		}
	}
});
