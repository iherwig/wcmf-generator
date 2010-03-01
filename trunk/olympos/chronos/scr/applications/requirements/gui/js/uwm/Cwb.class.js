/*
 * Copyright (c) 2010 The Olympos Development Team.
 *
 * http://sourceforge.net/projects/olympos/
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code,
 * this entire header must remain intact.
 */
Ext.namespace("uwm");

/**
 * @class Integration of Chronos Web Browser.
 *
 * @constructor
 */
uwm.Cwb = function() {
}

uwm.Cwb.getInstance = function() {
	
	if (!uwm.Cwb.instance) {
		
		// prepare CWB integration
		// - must not inherit from Viewport!
		// - set resource base url
		Ext.extend(cwb.ui.Workbench, Ext.Panel, {
	    	showMask: cwb.ui.Workbench.prototype.showMask
		});
		cwb.Config.baseHref = "../Browser/";
		document.title = "Chronos Web Modeller";
		
		// listen to object selection on browser panels
		cwb.ui.StructureTabPanel.getInstance().on('objectSelected', function(oid) {
			uwm.modeltree.ModelTree.getInstance().markNodeByOid(oid);
		});
		
		// instantiate CWB
		var cwbInstance = cwb.ui.Workbench.getInstance();
		cwbInstance.setTitle(uwm.Dict.translate('Chronos Web Browser'));
		uwm.Cwb.instance = cwbInstance;
	}
	
	return uwm.Cwb.instance;
}
