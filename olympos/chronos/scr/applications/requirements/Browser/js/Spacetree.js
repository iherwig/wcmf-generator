startDragScroll=function(e){
	this.scrolling=true;
	this.oldPosition=e.screenY;
	document.body.style.cursor="pointer";
}

dragScroll=function(e){
	if (this.scrolling) {
		if (this.oldPosition) {
			window.scrollBy(0, this.oldPosition - e.screenY);
			this.oldPosition = e.screenY;
		}
	}
}

stopDragScroll=function(e){
	this.scrolling=false;
	this.oldPosition=null;
	document.body.style.cursor="default";
}

init= function(){
	//if (ObjectContainer.getInstance().modelLoaded) {
	if (parent.ObjectContainer.getInstance().modelLoaded) {	
	start();
	

	}else{
		document.write(parent.uwm.Dict.translate('Please select a model.'))
	}
}

function start() {
	var json = parent.ObjectContainer.getInstance().objectsForSpacetree;
	//var json = ObjectContainer.getInstance().objectsForSpacetree;
	
	
    //Containers for fillStyle, strokeStyle and lineWith canvas properties.
    var fStyle, sStyle, lineWidth;
     //Create a new canvas instance.
      var canvas = new Canvas('mycanvas', {
         //Where to inject canvas. Any HTML container will do.
         'injectInto':'infovis',
         //Set width and height, default's to 200.
         'width': 700,
         'height': 2000,
		 
         //Set a background color in case the browser
         //does not support clearing a specific area.
        'backgroundColor': '#fff',
        //Set canvas styles.
        'styles': {
            'fillStyle': '#eee',
            'strokeStyle': '#111'
        },
		setColor: function(color){
			this.styles.fillStyle=color;
		}
      });
    //Create a new ST instance
    var st= new ST(canvas, {
    //Add an event handler to the node when creating it.
        onCreateLabel: function(label, node) {
            var d = $(label);
            label.id = node.id;
            d.setStyle('cursor', 'pointer')
              .set('html', node.name)
			  //if (node.data[2]){
			  //canvas.setColor(node.data[2].value);
			  //}
                d.addEvent('click', function() {
                st.onClick(d.id);
            });
        },
        //Set color as selected if the node is selected.
        onBeforePlotNode: function(node) {
            var ctx = canvas.getCtx();
            fStyle = ctx.fillStyle;
            sStyle = ctx.strokeStyle;
            if(node.selected) {
                ctx.fillStyle = "#eee";
                ctx.strokeStyle = "#000";
            }
        },
        //Restore color.
        onAfterPlotNode: function(node) {
            var ctx = canvas.getCtx();
            ctx.fillStyle = fStyle;
            ctx.stroleStyle = sStyle;
        },
        //Set color as selected if the edge belongs to the path.
        onBeforePlotLine: function(adj) {
            var ctx = canvas.getCtx();
            lineWidth = ctx.lineWidth;
            sStyle = ctx.strokeStyle;
            if(adj.nodeFrom.selected && adj.nodeTo.selected) {
                ctx.strokeStyle = "#000";
                ctx.lineWidth = 3;
            }
        },
        //Restore color and line width
        onAfterPlotLine: function(adj) {
            var ctx = canvas.getCtx();
            ctx.lineWidth = lineWidth;
            ctx.stroleStyle = sStyle;
        }

    });
    //load json data
    st.loadFromJSON(json);
    //compute node positions and layout
    st.compute();
    //optional: make a translation of the tree
    Tree.Geometry.translate(st.tree, new Complex(-200, 0), "startPos");
    //Emulate a click on the root node.
    st.onClick(st.tree.id);
}