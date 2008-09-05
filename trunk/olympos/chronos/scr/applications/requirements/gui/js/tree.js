uwm.TreePanel = function(config){
	/**
	 * @cfg {Array} customParams An assoziative array of additional values passed to the controller [optional]
	 */
	Ext.apply(this, config);
	
	// create the root node
	var root = new Ext.tree.AsyncTreeNode({
		text: "root",
		draggable: false,
		id: 'root'
	});
	
	// add default config properties
	config.autoScroll = true;
	config.animate = true;
	config.containerScroll = true;
	config.root = root;
	config.loader = new uwm.TreeLoader({
		dataUrl: uwm.config.jsonUrl,
		baseParams: {
			sid: uwm.data.sid,
			controller: "TreeViewController",
			response_format: "JSON",
			usr_action: "loadChildren"
		}
	})
	
	uwm.TreePanel.superclass.constructor.call(this, config);
	
	// add custom parameters to the baseParams of the TreeLoader
	if (this.customParams) 
		for (var i in this.customParams) 
			this.loader.baseParams.add(this.customParams[i]);
};

Ext.extend(uwm.TreePanel, Ext.tree.TreePanel, {});

uwm.TreeLoader = function(config){
	uwm.TreeLoader.superclass.constructor.call(this, config);
}
Ext.extend(uwm.TreeLoader, Ext.tree.TreeLoader, {
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
					oid: responseNode.oid
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
