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
Ext.namespace("chi.ui");

/**
 * @class A slideshow component.
 * Based on code from http://www.extjs.com/forum/showthread.php?t=36229
 * 
 * @extends Ext.Container
 * @constructor
 * @param {Object} config The configuration object.
 * @config {Integer} transitionTime The time in seconds used for fading images
 * @config {String} easing The easing effect used in transitions (a valid Ext.lib.Easing value)
 * @config {Integer} imageDuration The default time in milliseconds each image is displayed
 * @config {Ext.data.Store} store The data store that describes the images to display (optional, see url)
 *   Each record has the values 'url' and 'duration'
 * @config url The url to load the store records from (ignored, if store is given)
 */
chi.ui.ImageSlideshow = Ext.extend(Ext.Container, {

	constructor: function(config) {
		this.transitionTime = config.transitionTime || 1;
		this.easing = config.easing || 'easeNone';
		this.imageDuration = config.imageDuration || 5000;
		
		/*
		.slideshow {
			display: table-cell;
			vertical-align: middle;
			text-align: center;
		}
		*/
		// this css class is necessary for centering the images
		this.baseCls = 'slideshow';

		this.imageIndex = 0;
		this.timeoutId = undefined;

		this.tpl = new Ext.Template('<img src="{url}"');
		this.tpl.compile();

		if (config.store) {
				this.store = config.store;
		} else if (config.url) {
				this.store = new Ext.data.JsonStore({
				autoLoad: this.autoLoad,
				baseParams: this.params,
				url: config.url,
				root: 'data',
				fields: [
					{name: 'url', type: 'string'},
					{name: 'duration', type: 'int'}
				]
			});
		} else {
			throw "No store configured";
		}

		chi.ui.ImageSlideshow.superclass.constructor.call(this, Ext.apply(this, {}, config));
		
		this.store = Ext.StoreMgr.lookup(this.store);
		this.store.on('load', this.preload, this);
	},

	onRender: function(ct, position) {
		this.el = ct.createChild({
				id: this.id,
				cls: this.baseCls
		}, position);

		this.el.setWidth(this.width);
		this.el.setHeight(this.height);
	},

	load: function() {
		this.store.load();
	},
		
	preload: function() {
		if (this.el) {
			var count = this.store.getCount();
			for (var i=0; i<count; i++) {
				var r = this.store.getAt(i);
				Ext.getBody().insertHtml('afterEnd', '<img src="'+r.get('url')+'">', true).hide();
			}
		}
		this.loop();
	},
		
	loop: function() {
		// clear the timeout
		if (this.timeoutId != undefined) {
			clearTimeout(this.timeoutId);
			this.timeoutId = undefined;
		}
		
		if (this.store.getCount() > 0) {
			var r = this.store.getAt(this.imageIndex);
			
			// use individual image duration, if defined
			var pause = r.get('duration') || this.pause;
			
			// fade out the old image
			this.el.fadeOut({
				duration: this.transitionTime,
				easing: this.easing,
				scope: this,
				useDisplay: true,
				concurrent: false,
				callback: function() {
					
					// fade in the new image
					this.tpl.overwrite(this.el.dom, r.data);
					this.el.fadeIn({
						duration: this.transitionTime,
						easing: this.easing,
						scope: this,
						callback: function() {

						// prevent multiple calls to this callback
							if (this.timeoutId == undefined) {
								this.imageIndex++;
								if( this.imageIndex == this.store.getCount() ) {
									this.imageIndex = 0;
								}
								// recall the loop method after the given display duration
								this.timeoutId = this.loop.defer(pause, this);
							}
						}
					});
				}
			});
		}
	}
});
