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
 * @class A slideshow component. After configuring the slideshow and image store, the slideshow 
 * is started using the start method. An alternative way to manual setup is using the
 * static chi.ui.ImageSlideshow.createFromConfig method, which returns a slideshow instance.
 * Based on code from http://www.extjs.com/forum/showthread.php?t=36229
 *
 * Two alternatives exist for image positioning. To change the behaviour the stylesheet has
 * to be modified according to the definitions below.
 * 
 * 1. center all images, larger images will resize the container
 * 
 * .slideshow {
 * 	display: table-cell;
 * 	vertical-align: middle;
 * 	text-align: center;
 * }
 * 
 * 2. align all images to the upper left corner, crop larger images to the container size
 * 
 * .slideshow {
 * 	overflow: hidden;
 * 	position: relative;
 * }
 * .slideshow img {
 * 	display:block;
 * 	position:absolute;
 * 	left:0;
 * 	top:0;
 * }
 * 
 * @extends Ext.Container
 * @constructor
 * @param {Object} config The configuration object.
 * @config {Integer} transitionTime The time in seconds used for fading images [default: 1]
 * @config {String} easing The easing effect used in transitions (a valid Ext.lib.Easing value) [default: easeNone]
 * @config {Boolean} random True/False wether images should be displayed in random order or not [default: false]
 * @config {Integer} imageDuration The default time in milliseconds each image is displayed [default: 5000]
 * @config {Ext.data.Store} store The data store that describes the images to display (optional, see url)
 *   Each record has the values 'url', 'duration' and optionally 'width'
 * @config url The url to load the store records from (ignored, if store is given)
 */
chi.ui.ImageSlideshow = Ext.extend(Ext.Container, {

	constructor: function(config) {
		this.transitionTime = config.transitionTime || 1;
		this.easing = config.easing || 'easeNone';
		this.random = config.random || false;
		this.imageDuration = config.imageDuration || 5000;
		
		// this css class is necessary for image positioning
		this.baseCls = 'slideshow';

		this.imageIndex = 0;
		this.timeoutId = undefined;

		this.unsizedTpl = new Ext.Template('<img src="{url}">');
		this.unsizedTpl.compile();
		this.widthTpl = new Ext.Template('<img src="{url}" style="width:{width}px">');
		this.widthTpl.compile();

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
					{name: 'duration', type: 'int'},
					{name: 'width', type: 'int'}
				]
			});
		} else {
			throw "No store configured";
		}

		chi.ui.ImageSlideshow.superclass.constructor.call(this, Ext.apply(this, {}, config));
		
		this.store = Ext.StoreMgr.lookup(this.store);
	},

	onRender: function(ct, position) {
		this.el = ct.createChild({
				id: this.id,
				cls: this.baseCls
		}, position);

		this.el.setWidth(this.width);
		this.el.setHeight(this.height);
	},

	/**
	 * Start the slideshow.
	 */
	start: function() {
		if (this.random) {
			this.shuffleRecords();
		}
		this.preload();
	},
		
	/**
	 * Preload images by creating hidden image layers.
	 */
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
		
	/**
	 * Slideshow loop.
	 */
	loop: function() {
		// clear the timeout
		if (this.timeoutId != undefined) {
			clearTimeout(this.timeoutId);
			this.timeoutId = undefined;
		}
		
		if (this.store.getCount() > 0) {
			var r = this.store.getAt(this.imageIndex);
			
			// use individual image duration, if defined
			var duration = r.get('duration') || this.imageDuration;
			
			// fade out the old image
			this.el.fadeOut({
				duration: this.transitionTime,
				easing: this.easing,
				scope: this,
				useDisplay: true,
				concurrent: false,
				callback: function() {
					
					// fade in the new image
					if (r.get('width')) {
						this.widthTpl.overwrite(this.el.dom, r.data);
					}
					else {
						this.unsizedTpl.overwrite(this.el.dom, r.data);
					}
					this.el.fadeIn({
						endOpacity: 0.9999,
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
								this.timeoutId = this.loop.defer(duration, this);
							}
						}
					});
				}
			});
		}
	},

	/**
	 * Shuffle the records contained in the store.
	 */
	shuffleRecords: function() {
		var records = this.store.getRange();
		var tmp, rand;
		for(var i=0; i<records.length; i++) {
			rand = Math.floor(Math.random() * records.length);
			tmp = records[i]; 
			records[i] = records[rand]; 
			records[rand] =tmp;
		}
		// replace records with shuffled records
		this.store.suspendEvents(false);
		this.store.removeAll();
		this.store.add(records);
		this.store.resumeEvents();
	}
});

/**
 * Create a slideshow instance from a configuration.
 * @param {Object} config A configuration object with properties width, height, random, 
 *   imageDuration, images (array of arrays with entries for url, duration, width)
 * @return {chi.ui.ImageSlideshow} A slideshow instance
 *
 * A configuration example:
 * wmm.Slides.CREATE_PROJECT = {
 * 	width: 800,
 * 	height: 450,
 * 	random: false,
 * 	imageDuration: 1000,
 * 	images: [
 * 		['img/slides/img1.jpg', 1000, 800],
 * 		['img/slides/img2.jpg', 4000]
 * 	]
 * };
 */
chi.ui.ImageSlideshow.createFromConfig = function(config) {
	var store = new Ext.data.SimpleStore({
		fields: [
			{name: 'url', type: 'string'},
			{name: 'duration', type: 'int'},
			{name: 'width', type: 'int'}
		]
	});
	var slideshow = new chi.ui.ImageSlideshow({
		store: store,
		width: config.width,
		height: config.height,
		random: config.random,
		imageDuration: config.imageDuration
	});
	store.loadData(config.images);
	return slideshow;
}
