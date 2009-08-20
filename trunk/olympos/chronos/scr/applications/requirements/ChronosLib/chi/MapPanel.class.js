Ext.namespace("chi");

chi.MapPanel = function() {
	this.pointList = [];
	
	chi.MapPanel.superclass.constructor.apply(this, arguments);
};

Ext.extend(chi.MapPanel, Ext.ux.GMapPanel);

chi.MapPanel.prototype.addMarkers = function(markers) {
	if (Ext.isArray(markers)) {
		for ( var i = 0; i < markers.length; i++) {
			var mkr_point;
			if (markers[i].geoCodeAddr) {
				this.geoCodeLookup(markers[i].geoCodeAddr, markers[i]);
			} else {
				mkr_point = new GLatLng(markers[i].lat, markers[i].lng);
				this.addMarker(mkr_point, markers[i].marker, false, markers[i].center, markers[i].listeners);
			}
		}
	}
	
};

chi.MapPanel.prototype.addMarker = function(point, marker, clear, center, listeners) {
	Ext.applyIf(marker, G_DEFAULT_ICON);
	
	if (clear === true) {
		this.getMap().clearOverlays();
		this.pointList = [];
	}
	if (center === true) {
		this.getMap().setCenter(point, this.zoomLevel);
	}
	
	if (marker) {
		var mark = new GMarker(point, marker);
		if (typeof listeners === 'object') {
			for (evt in listeners) {
				GEvent.bind(mark, evt, this, listeners[evt]);
			}
		}
		this.getMap().addOverlay(mark);
		this.pointList.push(point);
	}
};

chi.MapPanel.prototype.autoZoomAndCenter = function() {
	var latlngbounds = new GLatLngBounds();
	for ( var i = 0; i < this.pointList.length; i++) {
		latlngbounds.extend(this.pointList[i]);
	}
	
	var map = this.getMap();
	if (map) {
		map.setCenter(latlngbounds.getCenter(), map.getBoundsZoomLevel(latlngbounds));
	}
};

chi.MapPanel.prototype.geoCodeLookup = function(addr, marker) {
	var self = this;
	
	this.geocoder = new GClientGeocoder();
	this.geocoder.getLocations(addr, function(response) {
		self.addAddressToMap(response, marker);
	});
	
};

chi.MapPanel.prototype.addAddressToMap = function(response, marker) {
	if (!response || response.Status.code != 200) {
		chi.Util.showMessage("Error", "Code " + response.Status.code + " Error Returned", chi.Util.messageType.ERROR);
	} else {
		if (!marker) {
			marker = this.setCenter;
			marker.center = true;
		}
		place = response.Placemark[0];
		addressinfo = place.AddressDetails;
		accuracy = addressinfo.Accuracy;
		if (accuracy === 0) {
			chi.Util.showMessage(chi.Dict.Translate("Unable to Locate Address"), chi.Dict.translate("Unable to Locate the Address you provided"), chi.Util.messageType.WARNING);
		} else {
			point = new GLatLng(place.Point.coordinates[1], place.Point.coordinates[0]);
			if (typeof marker === 'object' && typeof point === 'object') {
				this.addMarker(point, marker.marker, marker.clear, marker.center, marker.listeners);
			}
		}
	}
};
