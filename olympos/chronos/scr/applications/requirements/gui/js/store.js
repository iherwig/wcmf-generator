req.store.createChiGoal = function(){
	return new Ext.data.Store({
		url: "../application/main.php?sid=" + req.data.sid + "&usr_action=list&response_format=JSON&type=ChiGoal",
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

req.store.createChiRequirement = function(){
	return new Ext.data.Store({
		url: "../application/main.php?sid=" + req.data.sid + "&usr_action=list&response_format=JSON&type=ChiRequirement",
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

