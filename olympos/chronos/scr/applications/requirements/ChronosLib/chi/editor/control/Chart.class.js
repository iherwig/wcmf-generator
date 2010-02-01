/*
 * Copyright (c) 2009 The Olympos Development Team.
 *
 * http://sourceforge.net/projects/olympos/
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code,
 * this entire header must remain intact.
 */

 /**
  * This file contains overrides that need to be installed in order to use
  * the chart flash movie contained in yui_2.8.0r4.
  * Code from: http://www.extjs.com/forum/showthread.php?t=72557
  */
 Ext.override(Ext.FlashComponent, {

  /* changes are done in order to be able to use YUI Library - Charts 2.8.0
  * The following changes have been made to the charts.swf. (This will not impact the behavior or API of the Charts Control)
  - The flashvar elementID has changed to YUISwfId
  - The flashvar eventHandler has changed to YUIBridgeCallback
  */
  flashVersion : '9.0.45',

  onRender : function(){
      Ext.FlashComponent.superclass.onRender.apply(this, arguments);

      var params = Ext.apply({
          allowScriptAccess: 'always',
          bgcolor: this.backgroundColor,
          wmode: this.wmode
      }, this.flashParams),
      vars = Ext.apply({
          allowedDomain: document.location.hostname,
          YUISwfId: this.getId(),
          YUIBridgeCallback: 'Ext.FlashEventProxy.onEvent'
      }, this.flashVars);

      new swfobject.embedSWF(this.url, this.id, this.swfWidth, this.swfHeight, this.flashVersion,
          this.expressInstall ? Ext.FlashComponent.EXPRESS_INSTALL_URL : undefined, vars, params);

      this.swf = Ext.getDom(this.id);
      this.el = Ext.get(this.swf);
  }
});

Ext.override(Ext.chart.CartesianChart, {
  onSwfReady : function(isReset){
      Ext.chart.CartesianChart.superclass.onSwfReady.call(this, isReset);

      if(this.xField){
          this.setXField(this.xField);
      }
      if(this.yField){
          this.setYField(this.yField);
      }
      if(this.xAxis){
          this.setXAxis(this.xAxis);
      }
      if(this.yAxis){
          this.setYAxis(this.yAxis);
      }
      if(this.yAxes){
          this.setYAxes(this.yAxes);
      }
      if (this.constrainViewport !== undefined) {
          this.setConstrainViewport(this.constrainViewport);
      }
  },

  setYAxes : function(value){
    for(var i = 0; i < value.length; i++) {
      var axis = this.createAxis('yAxis' + i, value[i]);
      this.swf.setVerticalAxis(axis);
    }
  },

  setConstrainViewport: function(value) {
    this.swf.setConstrainViewport(value);
  }
});


Ext.override(Ext.chart.Axis, {
  /**
   * The space, in pixels, between labels on an axis.
   *
   * @property labelSpacing
   * @type Number
   */
  labelSpacing: 2,

  /**
   * The text that will appear next to the axis to indicate information about the data that it displays.
   *
   * @property title
   * @type String
   */
  title: null
});

Ext.override(Ext.chart.NumericAxis, {
  /**
   * Indicates whether to round the major unit.
   *
   * @property roundMajorUnit
   * @type Boolean
   */
  roundMajorUnit: true,

  /**
   * Indicates whether to factor in the size of the labels when calculating a major unit.
   *
   * @property calculateByLabelSize
   * @type Boolean
   */
  calculateByLabelSize: true,

  /**
   * Indicates the position of the axis relative to the chart
   *
   * @property position
   * @type String
   */
  position:"left",

  /**
   * Indicates whether to extend maximum beyond data's maximum to the nearest
   * majorUnit.
   *
   * @property adjustMaximumByMajorUnit
   * @type Boolean
   */
  adjustMaximumByMajorUnit:true,

  /**
   * Indicates whether to extend the minimum beyond data's minimum to the nearest
   * majorUnit.
   *
   * @property adjustMinimumByMajorUnit
   * @type Boolean
   */
  adjustMinimumByMajorUnit:true
});

Ext.override(Ext.chart.TimeAxis, {
  /**
   * Series that are stackable will only stack when this value is set to true.
   *
   * @property stackingEnabled
   * @type Boolean
   */
  stackingEnabled: false,

  /**
   * Indicates whether to factor in the size of the labels when calculating a major unit.
   *
   * @property calculateByLabelSize
   * @type Boolean
   */
  calculateByLabelSize: true
});

Ext.override(Ext.chart.CategoryAxis, {
  /**
   * Indicates whether or not to calculate the number of categories (ticks and labels)
   * when there is not enough room to display all labels on the axis. If set to true, the axis
   * will determine the number of categories to plot. If not, all categories will be plotted.
   *
   * @property calculateCategoryCount
   * @type Boolean
   */
  calculateCategoryCount: false
});

Ext.override(Ext.chart.CartesianSeries, {
  /**
   * Indicates which axis the series will bind to
   *
   * @property axis
   * @type String
   */
  axis: "primary",

  /**
   * When a Legend is present, indicates whether the series will show in the legend.
   *
   * @property showInLegend
   * @type Boolean
   */
  showInLegend: true
});