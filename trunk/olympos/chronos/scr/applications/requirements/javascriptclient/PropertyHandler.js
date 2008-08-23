/**
 * @author nikostotz
 */
PropertyHandler = function(targetId){
	this.target = Ext.get(targetId);
	this.currentSelection = null;
}

PropertyHandler.prototype.onSelectionChanged = function(figure){
/*
	if (figure != this.currentSelection) {
		if (this.currentSelection != null) {
			this.currentSelection.detachMoveListener(this);
		}
		
		this.currentSelection = figure;
		if (figure != null) {
			figure.attachMoveListener(this);
		}
	}
	
	if (figure != null) {
		this.target.innerHTML = figure.type + Math.random();
		
		if (figure.getClassName) {
			nameEditor.setValue(figure.getClassName());
		}
		else {
			nameEditor.setValue("");
		}
	}
*/

	if (figure != null) {
		if (figure.getClassName) {
			var className = figure.getClassName();
			
			var currChild = this.target.first();
			
			while (currChild) {
				var nextChild = currChild.next();
				currChild.remove();
				currChild = nextChild;
			}
			
			switch(className) {
				case "ChiGoal":
					createChiGoal(this.target);
					break;
				case "ChiRequirement":
					createChiRequirement(this.target);
					break;
			}
		}
	}	
}

PropertyHandler.prototype.onOtherFigureMoved = function(figure){
	this.onSelectionChanged(figure);
}
PropertyHandler.prototype.stackChanged = function(event){
	if (event.getCommand() instanceof draw2d.CommandConnect) {
		var command = event.getCommand();
		var source = command.source;
		var parent = source.getParent();
		
		if (parent == this.currentSelection) {
			this.onSelectionChanged(parent);
		}
		
	}
}
