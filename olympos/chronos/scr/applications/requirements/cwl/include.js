var Log = {
    elem: false,
    write: function(text){
        if (!this.elem) 
            this.elem = document.getElementById('log');
        this.elem.innerHTML = text;
        this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
    }
};

function addEvent(obj, type, fn) {
    if (obj.addEventListener) obj.addEventListener(type, fn, false);
    else obj.attachEvent('on' + type, fn);
};

function getLabelWidth(text, fontSize) {
    var measure = document.getElementById("measure");
    measure.innerHTML = text;
    measure.style.fontSize = fontSize;
    return (measure.clientWidth + 1) + "px";
};

function init(){
    var infovis = document.getElementById('infovis');
    var w = infovis.offsetWidth, h = infovis.offsetHeight;

    //init canvas
    //Create a new canvas instance.
    var canvas = new Canvas('mycanvas', {
        'injectInto': 'infovis',
        'width': w,
        'height': h,
        'backgroundColor': '#1a1a1a'
    });
    //end
    
    var labelFontSize = '0.8em';
    
    //init st
    //Create a new ST instance
    var st = new ST(canvas, {
        //add styles/shapes/colors
        //to nodes and edges
        orientation: "right",
        transition: Trans.Quart.easeOut,
        duration: 0,
        
        //set overridable=true if you want
        //to set styles for nodes individually 
        Node: {
          overridable: true,
          width: 80,
          height: 30,
          color: '#ccc'
        },
        Edge: {  
          type: 'bezier',  
          overridable: true  
        },  
        
        onBeforeCompute: function(node){
        },
        
        onAfterCompute: function(node){
        },

        //This method is triggered on label
        //creation. This means that for each node
        //this method is triggered only once.
        //This method is useful for adding event
        //handlers to each node label.
        onCreateLabel: function(label, node){            
            //add some styles to the node label
            var style = label.style;
            label.id = node.id;
            style.color = '#000';
            style.fontSize = labelFontSize;
            style.textAlign = 'center';
            style.width = "80px";
            style.height = "30px";
            label.innerHTML = node.name;
            
            //Make condition nodes editable
            if (node.data.type == "condition") {
              style.cursor = 'pointer';
              label.onclick = function() {
                 label.innerHTML = prompt("Please enter a condition:", label.innerHTML);
              }
            }
        },
        //This method is triggered right before plotting a node.
        //This method is useful for adding style 
        //to a node before it's being rendered.
        onBeforePlotNode: function(node) {
            //Mark operation nodes
            if (node.data.type == "operator") {
                node.data.$color = '#f77';
            }
        }
    });
    //load json data
    st.loadJSON(data);
    //compute node positions and layout
    st.compute();
    //optional: make a translation of the tree
    st.geom.translate(new Complex(-200, 0), "startPos");
    //Emulate a click on the root node.
    st.onClick(st.root);
    //end
    
    //init handler
    //Add an event handler to the add button for
    //adding a subtree.
    var addAndButton = document.getElementById('addAnd');
    addAndButton.onclick = function() {
        //add the subtree
        st.loadJSON(addAnd());
        //compute node positions and layout
        st.refresh();
    };
    var addOrButton = document.getElementById('addOr');
    addOrButton.onclick = function() {
        //add the subtree
        st.loadJSON(addOr());
        //compute node positions and layout
        st.refresh();
    };
    //end
}
