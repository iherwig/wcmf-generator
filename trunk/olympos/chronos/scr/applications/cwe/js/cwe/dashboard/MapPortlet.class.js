/*
 * Copyright (c) 2009 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 * 
 * All rights reserved. This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License v1.0 which
 * accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code, this
 * entire header must remain intact.
 */
Ext.namespace("cwe.dashboard");

/**
 * @class The main Workbench (perspective).
 * 
 * @constructor
 * @extends Ext.Viewport
 * @param {Object}
 *            config The configuration object.
 */
cwe.dashboard.MapPortlet = function(config) {
	var self = this;
	
	this.modelDescription = chi.model.ModelDescriptionContainer.getInstance().getDescription(config.cweModelElementId);
	
	this.limit = config.limit;
	this.sortAttributeName = config.sortAttributeName;
	this.sortDirection = config.sortDirection;
	
	/**
	 * The store holding the objects.
	 * 
	 * @private
	 * @type chi.model.Store
	 */
	this.store = new chi.model.Store( {
	    modelDescription : this.modelDescription,
	    proxy : new cwe.dashboard.ChartProxy( {
		    modelDescription : this.modelDescription
	    }),
	    sortInfo : {
	        field : this.sortAttributeName,
	        direction : this.sortDirection
	    }
	});
	
	this.map = new chi.MapPanel( {
	    gmapType : 'map',
	    mapConfOpts : [ 'enableScrollWheelZoom', 'enableDoubleClickZoom', 'enableDragging' ],
	    mapControls : [ 'GSmallMapControl', 'GMapTypeControl', 'NonExistantControl' ],
	    setCenter : {
		    geoCodeAddr : "Deutschland"
	    },
	    markers : [ {
	        geoCodeAddr : "New York",
	        marker : {
		        title : "Singatra"
	        }
	    }, {
	        geoCodeAddr : "Rio de Janero",
	        marker : {
		        title : "Tschuggahut"
	        },
	        listeners : {
		        click : function(point) {
			        self.map.getMap().openInfoWindow(point, "KITT");
		        }
	        }
	    }, {
	        geoCodeAddr : "Tokyo",
	        marker : {
		        title : "Beben"
	        }
	    } ]
	});
	
	cwe.dashboard.MapPortlet.superclass.constructor.call(this, Ext.apply(this, {
	    title : chi.Dict.translate("Map of") + " " + this.modelDescription.getName(),
	    iconCls : this.modelDescription.getTreeIconClass(),
	    height : 300,
	    items : [ this.map ]
	}, config));
	
	setTimeout(function() {
		self.map.autoZoomAndCenter();
	}, 5000);
	
	var refresh = function() {
		if (self.map && self.map.getMap()) {
			self.map.setHeight(self.getInnerHeight());
			self.map.setWidth(self.getInnerWidth());
			self.map.getMap().checkResize();
		}
	};
	
	this.on("resize", refresh);
	this.on("expand", refresh);
	this.on("show", refresh);
	this.on("move", refresh);
	
	/*
	this.store.load( {
		params : {
			limit : this.limit
		}
	});
	*/
};

Ext.extend(cwe.dashboard.MapPortlet, Ext.ux.Portlet);
