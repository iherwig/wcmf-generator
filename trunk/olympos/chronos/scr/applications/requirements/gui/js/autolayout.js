Ext.namespace("uwm.autolayout");

///JiggleObject

uwm.autolayout.JiggleObject = function(){
	this.booleanField = false;
	this.intField = 0;
	this.objectField = null;
	/* The context of a JiggleObject identifies the parent JiggleObject
	 (if any) that contains it.  The context of a Vertex or Cell is either
	 a Graph or a Cell; the context of an Edge is a Graph; the context of
	 an EdgeLabel is an Edge.  For now, we assume that the	context of a
	 Graph is null; if, however, we extend the present implementation to
	 include composite graphs, then the context of a Graph	could be a
	 JiggleObject (e.g. a Vertex) that contains the graph inside	it. */
	this.context = null;
}

uwm.autolayout.JiggleObject.prototype.getContext = function(){
	return this.context;
}

uwm.autolayout.JiggleObject.prototype.setContext = function(c){
	this.context = c;
}

uwm.autolayout.JiggleObject.prototype.square = function(d){
	return d * d;
}

uwm.autolayout.JiggleObject.prototype.cube = function(d){
	return d * d * d;
}

uwm.autolayout.JiggleObject.prototype.intSquare = function(n){
	return n * n;
}

uwm.autolayout.JiggleObject.prototype.power = function(base, d){
	if (d == 0) 
		return 1;
	else if (d == 1) 
		return base;
	else if (d % 2 == 0) 
		return intSquare(power(base, d / 2));
	else 
		return base * intSquare(power(base, d / 2));
}

///ForceLaw

uwm.autolayout.ForceLaw = function(graph){
	uwm.autolayout.JiggleObject.call(this);
	
	this.graph = graph;
	this.cap = Number.MAX_VALUE / 1000
}

uwm.autolayout.ForceLaw.prototype = new uwm.autolayout.JiggleObject;


uwm.autolayout.ForceLaw.prototype.getCap = function(){
	return this.cap;
}

uwm.autolayout.ForceLaw.prototype.setCap = function(cap){
	this.cap = cap;
}

///SpringLaw

uwm.autolayout.SpringLaw = function(graph, preferredEdgeLength){
	uwm.autolayout.ForceLaw.call(this, graph);
	this.preferredEdgeLength = preferredEdgeLength;
}

uwm.autolayout.SpringLaw.prototype = new uwm.autolayout.ForceLaw;

uwm.autolayout.SpringLaw.prototype.apply = function(negativeGradient){
	var m = this.graph.numberOfEdges;
	var d = this.graph.getDimensions();
	for (var i = 0; i < m; i++) {
		var e = this.graph.edges.get(i);
		var from = e.getFrom();
		var to = e.getTo();
		var fromWeight = from.getWeight();
		var toWeight = to.getWeight();
		var f = from.intField;
		var t = to.intField;
		var w = Math.min(this.springAttraction(e), this.cap / e.getLength());
		var fromCoords = from.getCoords();
		var toCoords = to.getCoords();
		for (var j = 0; j < d; j++) {
			var force = (toCoords[j] - fromCoords[j]) * w;
			negativeGradient[f][j] += force * toWeight;
			negativeGradient[t][j] -= force * fromWeight;
		}
	}
}

///QuadraticSpringLaw

uwm.autolayout.QuadraticSpringLaw = function(graph, preferredEdgeLength){
	uwm.autolayout.SpringLaw.call(this, graph, preferredEdgeLength);
}

uwm.autolayout.QuadraticSpringLaw.prototype = new uwm.autolayout.SpringLaw;

uwm.autolayout.QuadraticSpringLaw.prototype.springAttraction = function(edge){
	var r = uwm.autolayout.Cell.prototype.sumOfRadii(edge.getFrom(), edge.getTo());
	var len = edge.getLength();
	return (len - r) / this.preferredEdgeLength;
}

///VertexVertexRepulsionLaw
uwm.autolayout.VertexVertexRepulsionLaw = function(graph, preferredEdgeLength){
	uwm.autolayout.ForceLaw.call(this, graph);
	this.preferredEdgeLength = preferredEdgeLength;
	this.barnesHutTheta = 0;
}

uwm.autolayout.VertexVertexRepulsionLaw.prototype = new uwm.autolayout.ForceLaw;

uwm.autolayout.VertexVertexRepulsionLaw.prototype.getBarnesHutTheta = function(){
	return this.barnesHutTheta;
}
uwm.autolayout.VertexVertexRepulsionLaw.prototype.setBarnesHutTheta = function(t){
	this.barnesHutTheta = t;
}

uwm.autolayout.VertexVertexRepulsionLaw.prototype.apply = function(negativeGradient){
	if (this.barnesHutTheta > 0) {
		this.applyUsingBarnesHut(negativeGradient);
	}
	var n = this.graph.numberOfVertices;
	var d = this.graph.getDimensions();
	for (var i = 0; i < n - 1; i++) {
		var v1 = this.graph.vertices.get(i);
		var v1Coords = v1.getCoords();
		var weight1 = v1.getWeight();
		for (var j = i + 1; j < n; j++) {
			var v2 = this.graph.vertices.get(j);
			var w = Math.min(this.pairwiseRepulsion(v1, v2), this.cap / uwm.autolayout.Vertex.prototype.getDistance(v1, v2));
			var v2Coords = v2.getCoords();
			var weight2 = v2.getWeight();
			for (var k = 0; k < d; k++) {
				var force = (v1Coords[k] - v2Coords[k]) * w;
				negativeGradient[i][k] += force * weight2;
				negativeGradient[j][k] -= force * weight1;
			}
		}
	}
}

uwm.autolayout.VertexVertexRepulsionLaw.prototype.applyUsingBarnesHut = function(negativeGradient){
	var n = graph.numberOfVertices;
	var d = graph.getDimensions();
	if (n <= 1) 
		return;
	this.graph.recomputeBoundaries();
	var root = new uwm.autolayout.QuadTree(this.graph);
	for (var i = 0; i < n; i++) {
		var v = this.graph.vertices.get(i);
		var qt = v.getContext();
		var cur = qt;
		while (cur.getContext() != this.graph) {
			var p = cur.getContext();
			var numberOfSubtrees = this.power(2, d);
			for (var j = 0; j < numberOfSubtrees; j++) {
				var st = p.subtrees[j];
				if (cur != st) {
					this.computeQTRepulsion(qt, st, negativeGradient);
				}
			}
			cur = p;
		}
	}
	this.pushForcesDownTree(root);
	for (var i = 0; i < n; i++) {
		var v = graph.vertices.get(i);
		var qt = v.getContext();
		for (var j = 0; j < d; j++) 
			negativeGradient[i][j] += qt.force[j];
		v.setContext(this.graph);
	}
}

uwm.autolayout.VertexVertexRepulsionLaw.prototype.computeQTRepulsion = function(leaf, cell, negativeGradient){
	if (cell == null) 
		return;
	var d = leaf.getDimensions();
	if ((cell.objectField == null) && (!this.wellSeparated(leaf, cell))) {
		var numberOfSubtrees = this.power(2, d);
		for (var i = 0; i < numberOfSubtrees; i++) {
			this.computeQTRepulsion(leaf, cell.subtrees[i], negativeGradient);
		}
	}
	else {
		var w = Math.min(this.pairwiseRepulsion(leaf, cell), this.cap / uwm.autolayout.Cell.getDistance(leaf, cell));
		var leafWeight = leaf.getWeight();
		var cellWeight = cell.getWeight();
		var leafCoords = leaf.getCoords();
		var cellCoords = cell.getCoords();
		var i = leaf.intField;
		for (var j = 0; j < d; j++) {
			var force = 0.5 * w * (leafCoords[j] - cellCoords[j]);
			negativeGradient[i][j] += force * cellWeight;
			cell.force[j] -= force * leafWeight;
		}
	}
}

uwm.autolayout.VertexVertexRepulsionLaw.prototype.wellSeparated = function(leaf, cell){
	if (cell == null) 
		throw new Error("cell == null");
	if (cell.objectField != null) 
		return true;
	else {
		var d = cell.getDimensions();
		var len = Number.MAX_VALUE;
		var lo = cell.getMin();
		var hi = cell.getMax();
		for (var i = 0; i < d; i++) {
			len = Math.min(len, hi[i] - lo[i]);
		}
		var dist = uwm.autolayout.Cell.getDistance(leaf, cell);
		return ((len / dist) < this.barnesHutTheta);
	}
}

uwm.autolayout.VertexVertexRepulsionLaw.prototype.pushForcesDownTree = function(qt){
	if ((qt != null) && (qt.objectField == null) && (qt.getWeight() > 0)) {
		var d = qt.getDimensions();
		var numberOfSubtrees = this.power(2, d);
		for (var i = 0; i < numberOfSubtrees; i++) {
			for (var j = 0; j < d; j++) {
				qt.subtrees[i].force[j] += qt.force[j];
			}
		}
		for (var i = 0; i < numberOfSubtrees; i++) {
			pushForcesDownTree(qt.subtrees[i]);
		}
	}
}


///HybridVertexVertexRepulsionLaw

uwm.autolayout.HybridVertexVertexRepulsionLaw = function(graph, preferredEdgeLength){
	uwm.autolayout.VertexVertexRepulsionLaw.call(this, graph, preferredEdgeLength);
}

uwm.autolayout.HybridVertexVertexRepulsionLaw.prototype = new uwm.autolayout.VertexVertexRepulsionLaw;

uwm.autolayout.HybridVertexVertexRepulsionLaw.prototype.pairwiseRepulsion = function(c1, c2){
	var r = uwm.autolayout.Cell.prototype.sumOfRadii(c1, c2);
	var k = this.preferredEdgeLength + r;
	var dSquared = uwm.autolayout.Cell.prototype.getDistanceSquared(c1, c2);
	if (dSquared < k * k) {
		return k * k / dSquared;
	}
	else {
		return this.cube(k / uwm.autolayout.Cell.prototype.getDistance(c1, c2));
	}
}


///ForceModel

uwm.autolayout.ForceModel = function(graph){

	this.graph = graph;
	this.preferredEdgeLength = 0;
	this.forceLaws = new draw2d.ArrayList();
	this.constraints = new draw2d.ArrayList();
}

uwm.autolayout.ForceModel.prototype.getPreferredEdgeLength = function(){
	return this.preferredEdgeLength;
}

uwm.autolayout.ForceModel.prototype.setPreferredEdgeLength = function(k){
	this.preferredEdgeLength = k;
}

uwm.autolayout.ForceModel.prototype.addForceLaw = function(fl){
	this.forceLaws.add(fl);
}

uwm.autolayout.ForceModel.prototype.removeForceLaw = function(fl){
	this.forceLaws.remove(fl);
}

uwm.autolayout.ForceModel.prototype.addConstraint = function(c){
	this.constraints.add(c);
}

uwm.autolayout.ForceModel.prototype.removeConstraint = function(c){
	this.constraints.remove(c);
}

uwm.autolayout.ForceModel.prototype.getNegativeGradient = function(negativeGradient){
	var n = this.graph.numberOfVertices;
	var d = this.graph.getDimensions();
	for (var i = 0; i < n; i++) {
		for (var j = 0; j < d; j++) {
			negativeGradient[i][j] = 0;
		}
		this.graph.vertices.get(i).intField = i;
	}
	for (var i = 0; i < this.forceLaws.getSize(); i++) {
		var law = this.forceLaws.get(i);
		law.apply(negativeGradient);
	}
}

uwm.autolayout.ForceModel.prototype.getPenaltyVector = function(penaltyVector){
	var n = this.graph.numberOfVertices;
	var d = this.graph.getDimensions();
	for (var i = 0; i < n; i++) {
		for (var j = 0; j < d; j++) {
			penaltyVector[i][j] = 0;
		}
		this.graph.vertices.get(i).intField = i;
	}
	for (var i = 0; i < this.constraints.getSize(); i++) {
		var constraint = this.constraints.get(i);
		constraint.apply(penaltyVector);
	}
}

///Constraint
uwm.autolayout.Constraint = function(graph){
	uwm.autolayout.JiggleObject.call(this);
	
	this.graph = graph;
}

uwm.autolayout.Constraint.prototype = new uwm.autolayout.JiggleObject;


///ProjectionConstraint
uwm.autolayout.ProjectionConstraint = function(graph, dimensions){
	uwm.autolayout.Constraint.call(this, graph);
	
	this.dimensions = dimensions;
}

uwm.autolayout.ProjectionConstraint.prototype = new uwm.autolayout.Constraint;

uwm.autolayout.ProjectionConstraint.prototype.apply = function(penalty){
	var d = this.graph.getDimensions();
	var n = this.graph.numberOfVertices;
	for (var i = 0; i < n; i++) {
		var coords = this.graph.vertices.get(i).getCoords();
		for (var j = this.dimensions; j < d; j++) {
			penalty[i][j] += (-coords[j]);
		}
	}
}

///ForceDirectedOptimizationProcedure

uwm.autolayout.ForceDirectedOptimizationProcedure = function(graph, fm){
	uwm.autolayout.JiggleObject.call(this);
	
	this.graph = graph;
	this.forceModel = fm;
	
	this.constrained = false;
}

uwm.autolayout.ForceDirectedOptimizationProcedure.prototype = new uwm.autolayout.JiggleObject;

uwm.autolayout.ForceDirectedOptimizationProcedure.prototype.getConstrained = function(){
	return this.constrained;
}

uwm.autolayout.ForceDirectedOptimizationProcedure.prototype.setConstrained = function(c){
	this.constrained = c;
}

///FirstOrderOptimizationProcedure
/** Abstract base class for first-order graph-drawing optimization procedures.
 Includes concrete method for performing adaptive line search. */
uwm.autolayout.FirstOrderOptimizationProcedure = function(graph, fm, accuracy){
	uwm.autolayout.ForceDirectedOptimizationProcedure.call(this, graph, fm);
	this.maxCos = accuracy;
	
	this.negativeGradient = null;
	this.descentDirection = null;
	this.penaltyVector = null;
	this.penaltyFactor = 0;
	
	this.stepSize = 0.1;
	this.previousStepSize = 0;
	
}

uwm.autolayout.FirstOrderOptimizationProcedure.prototype = new uwm.autolayout.ForceDirectedOptimizationProcedure;

uwm.autolayout.FirstOrderOptimizationProcedure.prototype.improveGraph = function(){
	var n = this.graph.numberOfVertices;
	var d = this.graph.getDimensions();
	if ((this.negativeGradient == null) || (this.negativeGradient.length != n)) {
		this.negativeGradient = new Array();
		this.penaltyVector = new Array();
		for (var i = 0; i < n; i++) {
			this.negativeGradient[i] = new Array();
			this.penaltyVector[i] = new Array();
		}
		this.getNegativeGradient();
	}
	this.computeDescentDirection();
	return this.lineSearch();
}

uwm.autolayout.FirstOrderOptimizationProcedure.prototype.reset = function(){
	this.negativeGradient = null;
	this.penaltyFactor = 0;
}

uwm.autolayout.FirstOrderOptimizationProcedure.prototype.computePenaltyFactor = function(){
	var m1 = this.l2Norm(this.negativeGradient);
	var m2 = this.l2Norm(this.penaltyVector);
	if (m2 == 0) {
		this.penaltyFactor = 0;
	}
	else if (m1 == 0) {
		this.penaltyFactor = 1;
	}
	else {
		var cos = this.dotProduct(this.negativeGradient, this.penaltyVector) / (m1 * m2);
		var penaltyFactor = Math.max(0.00000001, (0.00000001 - cos)) * Math.max(1, (m1 / m2));
	}
}

uwm.autolayout.FirstOrderOptimizationProcedure.prototype.getNegativeGradient = function(){
	this.forceModel.getNegativeGradient(this.negativeGradient);
	if (this.constrained) {
		this.getPenaltyVector();
		this.computePenaltyFactor();
		var n = this.graph.numberOfVertices;
		var d = this.graph.getDimensions();
		for (var i = 0; i < n; i++) {
			for (var j = 0; j < d; j++) {
				this.negativeGradient[i][j] += this.penaltyFactor * this.penaltyVector[i][j];
			}
		}
	}
}

uwm.autolayout.FirstOrderOptimizationProcedure.prototype.getPenaltyVector = function(){
	this.forceModel.getPenaltyVector(this.penaltyVector);
}

uwm.autolayout.FirstOrderOptimizationProcedure.prototype.lineSearch = function(){
	this.previousStepSize = 0;
	var n = this.graph.numberOfVertices;
	var magDescDir = this.l2Norm(this.descentDirection);
	if (magDescDir < 0.0001) {
		return 0;
	}
	var magLo = this.l2Norm(this.negativeGradient);
	this.step();
	this.getNegativeGradient();
	var magHi = this.l2Norm(this.negativeGradient);
	var m = magDescDir * magHi;
	var cos = this.dotProduct(this.negativeGradient, this.descentDirection) / m;
	var lo = 0;
	var hi = Number.MAX_VALUE;
	var i = 0;
	while (((cos < 0) || (cos > this.maxCos)) && (hi - lo > 0.00000001)) {
		if (cos < 0) {
			hi = this.stepSize;
			this.stepSize = (lo + hi) / 2;
		}
		else {
			if (hi < Number.MAX_VALUE) {
				lo = this.stepSize;
				this.stepSize = (lo + hi) / 2;
			}
			else {
				lo = this.stepSize;
				this.stepSize *= 2;
			}
		}
		this.step();
		this.getNegativeGradient();
		m = magDescDir * this.l2Norm(this.negativeGradient);
		cos = this.dotProduct(this.negativeGradient, this.descentDirection) / m;
	}
	return this.l2Norm(this.negativeGradient);
}

uwm.autolayout.FirstOrderOptimizationProcedure.prototype.step = function(){
	var n = this.graph.numberOfVertices;
	var s = this.stepSize - this.previousStepSize;
	for (var i = 0; i < n; i++) {
		this.graph.vertices.get(i).translate(s, this.descentDirection[i]);
	}
	this.previousStepSize = this.stepSize;
}

uwm.autolayout.FirstOrderOptimizationProcedure.prototype.dotProduct = function(u, v){
	var n = this.graph.numberOfVertices;
	var d = this.graph.getDimensions();
	var sum = 0;
	for (var i = 0; i < n; i++) {
		for (var j = 0; j < d; j++) {
			sum += u[i][j] * v[i][j];
		}
	}
	return sum;
}

uwm.autolayout.FirstOrderOptimizationProcedure.prototype.l2Norm = function(vect){
	return Math.sqrt(this.dotProduct(vect, vect));
}

uwm.autolayout.FirstOrderOptimizationProcedure.prototype.lInfinityNorm = function(vect){
	var n = this.graph.numberOfVertices;
	var d = this.graph.getDimensions();
	var max = 0;
	for (var i = 0; i < n; i++) {
		for (var j = 0; j < d; j++) {
			max = Math.max(max, Math.abs(vect[i][j]));
		}
	}
	return max;
}

///ConjugateGradients
/** Class for conjugate gradient method. */

uwm.autolayout.ConjugateGradients = function(graph, fm, accuracy, restartThreshold){
	uwm.autolayout.FirstOrderOptimizationProcedure.call(this, graph, fm, accuracy);
	
	this.magnitudeOfPreviousGradientSquared = null;
	this.previousDescentDirection = null;
	this.restartThreshold = 0;
	
	if (restartThreshold) {
		this.restartThreshold = restartThreshold;
	}
}

uwm.autolayout.ConjugateGradients.prototype = new uwm.autolayout.FirstOrderOptimizationProcedure;


uwm.autolayout.ConjugateGradients.prototype.reset = function(){
	this.negativeGradient = null;
	this.descentDirection = null;
}

uwm.autolayout.ConjugateGradients.prototype.computeDescentDirection = function(){
	var n = this.graph.numberOfVertices;
	var d = this.graph.getDimensions();
	var magnitudeOfCurrentGradientSquared = 0;
	if ((this.descentDirection == null) || (this.descentDirection.length != n)) {
		this.descentDirection = new Array();
		this.previousDescentDirection = new Array();
		for (var i = 0; i < n; i++) {
			this.descentDirection[i] = new Array();
			this.previousDescentDirection[i] = new Array();
			for (var j = 0; j < d; j++) {
				var temp = this.negativeGradient[i][j];
				this.descentDirection[i][j] = temp;
				magnitudeOfCurrentGradientSquared += this.square(temp);
			}
		}
	}
	else {
		for (var i = 0; i < n; i++) {
			for (var j = 0; j < d; j++) {
				var temp = this.negativeGradient[i][j];
				magnitudeOfCurrentGradientSquared += this.square(temp);
			}
		}
		if (magnitudeOfCurrentGradientSquared < 0.000001) {
			for (var i = 0; i < n; i++) {
				for (var j = 0; j < d; j++) {
					this.previousDescentDirection[i][j] = 0;
					this.descentDirection[i][j] = 0;
				}
			}
			return;
		}
		var w = magnitudeOfCurrentGradientSquared / this.magnitudeOfPreviousGradientSquared;
		var dotProduct = 0;
		var magnitudeOfDescentDirectionSquared = 0;
		var m;
		for (var i = 0; i < n; i++) {
			for (var j = 0; j < d; j++) {
				this.descentDirection[i][j] = this.negativeGradient[i][j] +
				w * this.previousDescentDirection[i][j];
				dotProduct += this.descentDirection[i][j] * this.negativeGradient[i][j];
				magnitudeOfDescentDirectionSquared += this.square(this.descentDirection[i][j]);
			}
		}
		m = magnitudeOfCurrentGradientSquared * magnitudeOfDescentDirectionSquared;
		if (dotProduct / Math.sqrt(m) < this.restartThreshold) {
			this.descentDirection = null;
			this.computeDescentDirection();
			return;
		}
	}
	this.magnitudeOfPreviousGradientSquared = magnitudeOfCurrentGradientSquared;
	for (var i = 0; i < n; i++) {
		for (var j = 0; j < d; j++) {
			this.previousDescentDirection[i][j] = this.descentDirection[i][j];
		}
	}
}

///Cell

/** Abstract base class for all JIGGLE objects that have rectangular
 representations.  Known subclasses: Vertex, EdgeLabel, QuadTree. */
uwm.autolayout.Cell = function(){
	uwm.autolayout.JiggleObject.call(this);
	
	this.dimensions = 2; /* default is a 2-D cell */
	this.weight = 0; /* weight of cell */
	this.coords = null; /* coordinates of center of cell */
	this.min = null;
	this.max = null; /* bounding box of cell */
	this.size = null; /* dimensions of cell */
	this.setDimensions(2);
}

uwm.autolayout.Cell.prototype = new uwm.autolayout.JiggleObject;

uwm.autolayout.Cell.prototype.getWeight = function(){
	return this.weight;
}

uwm.autolayout.Cell.prototype.setWeight = function(w){
	this.weight = w;
}

uwm.autolayout.Cell.prototype.getDimensions = function(){
	return this.dimensions;
}

uwm.autolayout.Cell.prototype.setDimensions = function(d){
	this.dimensions = d;
	this.coords = new Array();
	this.size = new Array();
	this.min = new Array();
	this.max = new Array();
}

uwm.autolayout.Cell.prototype.getCoords = function(){
	return this.coords;
}

uwm.autolayout.Cell.prototype.setCoords = function(c){
	for (var i = 0; i < this.dimensions; i++) {
		this.coords[i] = c[i];
	}
}

uwm.autolayout.Cell.prototype.getMin = function(){
	return this.min;
}

uwm.autolayout.Cell.prototype.setMin = function(c){
	for (var i = 0; i < this.dimensions; i++) {
		this.min[i] = c[i];
	}
	this.recomputeSize();
}

uwm.autolayout.Cell.prototype.getMax = function(){
	return this.max;
}

uwm.autolayout.Cell.prototype.setMax = function(c){
	for (var i = 0; i < this.dimensions; i++) {
		this.max[i] = c[i];
	}
	this.recomputeSize();
}

uwm.autolayout.Cell.prototype.recomputeSize = function(){
	for (var i = 0; i < this.dimensions; i++) {
		this.size[i] = this.max[i] - this.min[i];
	}
}

uwm.autolayout.Cell.prototype.getSize = function(){
	return this.size;
}

uwm.autolayout.Cell.prototype.setSize = function(c){
	for (var i = 0; i < this.dimensions; i++) {
		this.size[i] = c[i];
	}
	this.recomputeBoundaries();
}

uwm.autolayout.Cell.prototype.recomputeBoundaries = function(){
	for (var i = 0; i < this.dimensions; i++) {
		this.min[i] = this.coords[i] - this.size[i] / 2;
		this.max[i] = this.coords[i] + this.size[i] / 2;
	}
}

uwm.autolayout.Cell.prototype.translate = function(scalar, vector){
	if (!vector) {
		scalar = vector;
		scalar = 1;
	}
	
	for (var i = 0; i < this.dimensions; i++) {
		var translation = scalar * vector[i];
		this.coords[i] += translation;
		this.min[i] += translation;
		this.max[i] += translation;
	}
}

uwm.autolayout.Cell.prototype.getDistanceSquared = function(c1, c2){
	var sum = 0;
	var d = c1.getDimensions();
	for (var i = 0; i < d; i++) 
		sum += this.square(c1.coords[i] - c2.coords[i]);
	return sum;
}

uwm.autolayout.Cell.prototype.getDistanceSquaredPoint = function(cell, point){
	var sum = 0;
	var d = cell.getDimensions();
	for (var i = 0; i < d; i++) 
		sum += this.square(cell.coords[i] - point[i]);
	return sum;
}

uwm.autolayout.Cell.prototype.getDistance = function(c1, c2){
	return Math.sqrt(this.getDistanceSquared(c1, c2));
}

uwm.autolayout.Cell.prototype.getDistancePoint = function(cell, point){
	return Math.sqrt(this.getDistanceSquaredPoint(cell, point));
}

uwm.autolayout.Cell.prototype.sumOfRadii = function(c1, c2){
	var d = c1.getDimensions();
	var coords1 = c1.getCoords();
	var coords2 = c2.getCoords();
	var seg = new Array();
	for (var i = 0; i < d; i++) {
		seg[i] = coords2[i] - coords1[i];
	}
	return this.radiusSegment(d, c1.getSize(), seg) + this.radiusSegment(d, c2.getSize(), seg);
}

uwm.autolayout.Cell.prototype.radius = function(cell, point){
	var d = cell.getDimensions();
	var coords = cell.getCoords();
	var seg = new Array();
	for (var i = 0; i < d; i++) {
		seg[i] = point[i] - coords[i];
	}
	return this.radiusSegment(d, cell.getSize(), seg);
}


uwm.autolayout.Cell.prototype.radiusSegment = function(d, cellSize, segment){
	var sum = 0;
	for (var i = 0; i < d; i++) {
		sum += cellSize[i];
	}
	if (sum == 0) {
		return 0;
	}
	var t = Number.MAX_VALUE;
	for (var i = 0; i < d; i++) {
		t = Math.min(t, Math.abs(cellSize[i] / segment[i]));
	}
	var lengthSquared = 0;
	for (var i = 0; i < d; i++) {
		lengthSquared += this.square(t * segment[i]);
	}
	return Math.sqrt(lengthSquared) / 2;
}

///QuadTree

uwm.autolayout.QuadTree = function(graph, max, parent){
	uwm.autolayout.Cell.call(this);
	
	this.setContext(graph);
	this.objectField = null;
	this.subtrees = new Array();
	
	var d;
	
	if (!max) {
		d = graph.getDimensions();
		this.setDimensions(d);
		var n = graph.numberOfVertices;
		this.setMin(graph.getMin());
		this.setMax(graph.getMax());
		for (var i = 0; i < n; i++) {
			graph.vertices.get(i).objectField = null;
		}
		for (var i = 0; i < n; i++) {
			this.insert(graph.vertices.get(i));
		}
	}
	else {
		//graph == min
		d = parent.getDimensions();
		this.setDimensions(d);
		this.setMin(graph);
		this.setMax(max);
	}
	
	this.force = new Array();
	for (var i = 0; i < d; i++) {
		force[i] = 0;
	}
}

uwm.autolayout.QuadTree.prototype = new uwm.autolayout.Cell;

uwm.autolayout.QuadTree.prototype.lookUp = function(v){
	if (this.objectField == v) {
		return this;
	}
	else if (this.objectField != null) {
		return null;
	}
	else {
		return this.subtrees[this.getIndex(v)].lookUp(v);
	}
}

uwm.autolayout.QuadTree.prototype.getIndex = function(v){
	var c = v.getCoords();
	var center = this.getCenter();
	var d = this.getDimensions();
	var index = 0
	var column = 1;
	for (var i = 0; i < d; i++) {
		if (c[i] > center[i]) {
			index += column;
		}
		column *= 2;
	}
	
	return index;
}

uwm.autolayout.QuadTree.prototype.getCenter = function(){
	var d = this.getDimensions();
	var mp = new Array();
	var lo = this.getMin();
	var hi = this.getMax();
	for (var i = 0; i < d; i++) {
		mp[i] = (lo[i] + hi[i]) / 2;
	}
	return mp;
}

uwm.autolayout.QuadTree.prototype.recomputeSize = function(){

}

uwm.autolayout.QuadTree.prototype.recomputeBoundaries = function(){

}
/* NOTE: Size for quadtrees has nothing to do with min and max! It stores
 the average size of the vertices that have been inserted into the tree. */
uwm.autolayout.QuadTree.prototype.insert = function(v){
	var w = this.getWeight();
	var vw = v.getWeight();
	var d = this.getDimensions();
	var vCoords = v.getCoords();
	var vSize = v.getSize();
	if (w == 0) {
		v.setContext(this);
		this.setWeight(v.getWeight());
		this.setCoords(vCoords);
		this.setSize(v.getSize());
		this.objectField = v;
		return;
	}
	if (this.objectField != null) {
		this.splitCell();
	}
	var c = this.getCoords();
	var s = this.getSize();
	for (var i = 0; i < d; i++) {
		c[i] = (c[i] * w + vCoords[i] * vw) / (w + vw);
		s[i] = (s[i] * w + vSize[i] * vw) / (w + vw);
	}
	this.setWeight(w + vw);
	this.subtrees[this.getIndex(v)].insert(v);
}

uwm.autolayout.QuadTree.prototype.splitCell = function(){
	var v = this.objectField;
	this.objectField = null;
	var cellMin = this.getMin();
	var cellMax = this.getMax();
	var center = this.getCenter();
	var d = this.getDimensions();
	var n = this.power(2, d);
	var lo = new Array();
	var hi = new Array();
	for (var index = 0; index < n; index++) {
		var column = 1;
		for (var i = 0; i < d; i++) {
			if ((index & column) > 0) {
				lo[i] = center[i];
				hi[i] = cellMax[i];
			}
			else {
				lo[i] = cellMin[i];
				hi[i] = center[i];
			}
			column *= 2;
		}
		this.subtrees[index] = new uwm.autolayout.QuadTree(lo, hi, this);
	}
	this.subtrees[this.getIndex(v)].insert(v);
}

///Vertex

/** Class for vertices of a graph. */
uwm.autolayout.Vertex = function(graph){
	uwm.autolayout.Cell.call(this);
	
	this.undirectedDegree = 0;
	this.inDegree = 0
	this.outDegree = 0;
	this.undirectedEdges = new draw2d.ArrayList();
	this.inEdges = new draw2d.ArrayList();
	this.outEdges = new draw2d.ArrayList();
	this.undirectedNeighbors = new draw2d.ArrayList();
	this.inNeighbors = new draw2d.ArrayList();
	this.outNeighbors = new draw2d.ArrayList();
	
	/* NOTE: the above are made package-accessible for reasons of
	 efficiency.  They should NOT, however, be modified except by
	 insertNeighbor and deleteNeighbor methods below. */
	this.name = ""; /* name of vertex */
	this.fixed = false; /* is the vertex anchored? */
	this.setContext(graph);
	this.setWeight(1);
	this.setDimensions(graph.getDimensions());
}

uwm.autolayout.Vertex.prototype = new uwm.autolayout.Cell;

uwm.autolayout.Vertex.prototype.getName = function(){
	return this.name;
}

uwm.autolayout.Vertex.prototype.setName = function(str){
	this.name = str;
}

uwm.autolayout.Vertex.prototype.getFixed = function(){
	return this.fixed;
}

uwm.autolayout.Vertex.prototype.setFixed = function(f){
	this.fixed = f;
}

uwm.autolayout.Vertex.prototype.insertNeighbor = function(e){
	var from = e.getFrom();
	var to = e.getTo();
	var v = null;
	if (this == from) {
		v = to;
	}
	else if (this == to) {
		v = from;
	}
	else {
		throw new uwm.autolayout.Error(e + " not incident to " + this);
	}
	if (!e.getDirected()) {
		this.undirectedEdges.add(e);
		this.undirectedNeighbors.add(v);
		this.undirectedDegree++;
	}
	else if (this == from) {
		this.outEdges.add(e);
		this.outNeighbors.add(to);
		this.outDegree++;
	}
	else {
		this.inEdges.add(e);
		this.inNeighbors.add(from);
		this.inDegree++;
	}
}

uwm.autolayout.Vertex.prototype.deleteNeighbor = function(e){
	var from = e.getFrom();
	var to = e.getTo();
	var v = null;
	if (this == from) {
		v = to;
	}
	else if (this == to) {
		v = from;
	}
	else {
		throw new uwm.autolayout.Error(e + " not incident to " + this);
	}
	try {
		if (!e.getDirected()) {
			this.undirectedEdges.remove(e);
			this.undirectedNeighbors.remove(v);
			this.undirectedDegree--;
		}
		else if (this == from) {
			this.outEdges.remove(e);
			this.outNeighbors.remove(to);
			this.outDegree--;
		}
		else {
			this.inEdges.remove(e);
			this.inNeighbors.remove(from);
			this.inDegree--;
		}
	} 
	catch (exc) {
		throw new uwm.autolayout.Error(e + " not incident to " + this);
	}
}

uwm.autolayout.Vertex.prototype.toString = function(){
	return "(Vertex: " + this.name + ")";
}

///Edge

/** Class for edges of a graph.  NOTE: the only mutable characteristics
 of an edge are its label, directedness, and preferred length. */
uwm.autolayout.Edge = function(graph, from, to, directed){
	uwm.autolayout.JiggleObject.call(this);
	
	this.from = from;
	this.to = to; /* endpoints of the edge */
	this.label = null; /* label of edge */
	this.directed = false; /* is the edge directed? */
	if (directed) {
		this.directed = directed;
	}
	this.preferredLength = 0; /* preferred length of edge */
	this.setContext(graph);
}

uwm.autolayout.Edge.prototype = new uwm.autolayout.JiggleObject;

uwm.autolayout.Edge.prototype.getFrom = function(){
	return this.from;
}

uwm.autolayout.Edge.prototype.getTo = function(){
	return this.to;
}

uwm.autolayout.Edge.prototype.getLabel = function(){
	return this.label;
}

uwm.autolayout.Edge.prototype.setLabel = function(lbl){
	this.label = lbl;
}

uwm.autolayout.Edge.prototype.getDirected = function(){
	return this.directed;
}

uwm.autolayout.Edge.prototype.setDirected = function(d){
	this.directed = d;
}

uwm.autolayout.Edge.prototype.getPreferredLength = function(){
	return this.preferredLength;
}

uwm.autolayout.Edge.prototype.setPreferredLength = function(len){
	this.preferredLength = len;
}

uwm.autolayout.Edge.prototype.getLengthSquared = function(){
	return uwm.autolayout.Vertex.getDistanceSquared(this.from, this.to);
}

uwm.autolayout.Edge.prototype.getLength = function(){
	return uwm.autolayout.Vertex.prototype.getDistance(this.from, this.to);
}

uwm.autolayout.Edge.prototype.toString = function(){
	return "(Edge: " + this.from + ", " + this.to + ", " +
	(this.directed ? "directed" : "undirected") +
	")";
}

///EdgeLabel

/** Class for edge labels. */
uwm.autolayout.EdgeLabel = function(edge, name){
	uwm.autolayout.Cell.call(this);
	
	this.name = name;
	this.setContext(e)
}

uwm.autolayout.EdgeLabel.prototype = new uwm.autolayout.Cell;

uwm.autolayout.EdgeLabel.prototype.getName = function(){
	return this.name;
}

uwm.autolayout.EdgeLabel.prototype.setName = function(str){
	this.name = str;
}

uwm.autolayout.EdgeLabel.prototype.toString = function(){
	return "(EdgeLabel: " + this.name + ")";
}

///Graph

/** Class for graphs. */
uwm.autolayout.Graph = function(dimensions){
	uwm.autolayout.Cell.call(this);
	
	this.numberOfVertices = 0;
	this.numberOfMarkedVertices = 0;
	this.numberOfEdges = 0;
	this.vertices = new draw2d.ArrayList();
	this.edges = new draw2d.ArrayList();
	
	/* NOTE: the above are made publicly accessible for reasons of
	 efficiency.  They should NOT, however, be modified except by
	 insertVertex, deleteVertex, insertEdge, and deleteEdge methods
	 below. */
	if (dimensions) {
		this.setDimensions(dimensions);
	}
}

uwm.autolayout.Graph.prototype = new uwm.autolayout.Cell;

uwm.autolayout.Graph.prototype.insertVertex = function(){
	var v = new uwm.autolayout.Vertex(this);
	this.vertices.add(v);
	this.numberOfVertices++;
	return v;
}

uwm.autolayout.Graph.prototype.insertEdge = function(from, to, dir){
	if (!dir) {
		dir = false;
	}
	
	var e = new uwm.autolayout.Edge(this, from, to, dir);
	from.insertNeighbor(e);
	to.insertNeighbor(e);
	this.edges.add(e);
	this.numberOfEdges++;
	return e;
}

uwm.autolayout.Graph.prototype.deleteVertex = function(v){
	try {
		for (var i = 0; i < v.inDegree; i++) {
			var e = v.undirectedEdges.get(i);
			v.undirectedNeighbors.get(i).deleteNeighbor(e);
			this.edges.remove(e);
			this.numberOfEdges--;
		}
		for (var i = 0; i < v.inDegree; i++) {
			var e = v.inEdges.get(i);
			v.inNeighbors.get(i).deleteNeighbor(e);
			this.edges.remove(e);
			this.numberOfEdges--;
		}
		for (var i = 0; i < v.outDegree; i++) {
			var e = v.outEdges.get(i);
			v.outNeighbors.get(i).deleteNeighbor(e);
			this.edges.remove(e);
			this.numberOfEdges--;
		}
		this.vertices.remove(v);
		this.numberOfVertices--;
	} 
	catch (exc) {
		throw new uwm.autolayout.Error(v + " not found");
	}
}

uwm.autolayout.Graph.prototype.deleteEdge = function(e){
	try {
		e.getFrom().deleteNeighbor(e);
		e.getTo().deleteNeighbor(e);
		this.edges.remove(e);
		this.numberOfEdges--;
	} 
	catch (exc) {
		throw new uwm.autolayout.Error(e + " not found");
	}
}

uwm.autolayout.Graph.prototype.recomputeBoundaries = function(){
	var d = this.getDimensions();
	var lo = this.getMin();
	var hi = this.getMax();
	for (var i = 0; i < d; i++) {
		lo[i] = Number.MAX_VALUE;
		hi[i] = -Number.MAX_VALUE;
	}
	for (var i = 0; i < this.numberOfVertices; i++) {
		var v = vertices.get(i);
		var c = v.getCoords();
		for (var j = 0; j < d; j++) {
			lo[j] = Math.min(lo[j], c[j]);
			hi[j] = Math.max(hi[j], c[j]);
		}
	}
	this.recomputeSize();
}

/**The isConnected method tests whether a graph is connected.
 An empty graph is considered to be not connected.*/
uwm.autolayout.Graph.prototype.isConnected = function(){
	if (this.numberOfVertices == 0) {
		return false;
	}
	for (var i = 0; i < this.numberOfVertices; i++) {
		this.vertices.get(i).booleanField = false;
	}
	this.numberOfMarkedVertices = 0;
	this.dft(vertices.get(0));
	return (this.numberOfMarkedVertices == this.numberOfVertices);
}

uwm.autolayout.Graph.prototype.dft = function(v){
	v.booleanField = true;
	++this.numberOfMarkedVertices;
	for (var i = 0; i < v.undirectedDegree; i++) {
		var neighbor = v.undirectedNeighbors.get(i);
		if (!neighbor.booleanField) {
			this.dft(neighbor);
		}
	}
	for (var i = 0; i < v.undirectedDegree; i++) {
		var neighbor = v.inNeighbors.get(i);
		if (!neighbor.booleanField) {
			this.dft(neighbor);
		}
	}
	for (var i = 0; i < v.undirectedDegree; i++) {
		var neighbor = v.outNeighbors.get(i);
		if (!neighbor.booleanField) {
			this.dft(neighbor);
		}
	}
}


uwm.autolayout.doLayout = function(workflow){
	var dimensions = 2;
	
	var graph = new uwm.autolayout.Graph(dimensions);
	
	var figures = workflow.getFigures();
	var vertexes = new draw2d.ArrayList();
	for (var i = 0; i < figures.getSize(); i++) {
		var figure = figures.get(i);
		var vertex = graph.insertVertex();
		vertex.setName(figure.getId());
		vertex.setCoords([figure.getX(), figure.getY()]);
		vertex.setSize([figure.getWidth(), figure.getHeight()]);
		vertexes.add(vertex);
	}
	
	var clusterIds = new Array();
	var nextClusterId = 1;
	
	var clusters = new Array();
	
	for (var i = 0; i < figures.getSize(); i++) {
		if (!clusterIds[i]) {
			uwm.autolayout.walkAndPopulateClusters(figures, i, clusterIds, nextClusterId);
			nextClusterId++;
		}
		
		var figure = figures.get(i);
		var ports = figure.getPorts();
		var numConnections = 0;
		for (var j = 0; j < ports.getSize(); j++) {
			var port = ports.get(j);
			var connections = port.getConnections();
			for (var k = 0; k < connections.getSize(); k++) {
				numConnections++;
				
				var connection = connections.get(k);
				if (connection.getSource() == port) {
					var from = vertexes.get(i);
					var targetPort = connection.getTarget();
					var targetFigure = targetPort.getParent();
					var targetIndex = figures.indexOf(targetFigure);
					var to = vertexes.get(targetIndex)
					var edge = graph.insertEdge(from, to, true);
				}
			}
		}
		var clustersEntry = clusters[clusterIds[i]];
		if (clustersEntry) {
			if (clustersEntry.maxConnections < numConnections) {
				clustersEntry.maxConnections = numConnections;
				clustersEntry.vertex = vertexes.get(i);
			}
		}
		else {
			clusters[clusterIds[i]] = {
				maxConnections: numConnections,
				vertex: vertexes.get(i)
			};
		}
	}
	
	for (var i = 1; i < clusters.length; i++) {
		for (var j = 1; j < clusters.length; j++) {
			if (i != j) {
				var from = clusters[i].vertex;
				var to = clusters[j].vertex;
				var edge = graph.insertEdge(from, to, false);
			}
		}
	}
	
	var preferredEdgeLength = 100;
	
	var springLaw = new uwm.autolayout.QuadraticSpringLaw(graph, preferredEdgeLength);
	
	var vvRepulsionLaw = new uwm.autolayout.HybridVertexVertexRepulsionLaw(graph, preferredEdgeLength);
	
	var forceModel = new uwm.autolayout.ForceModel(graph);
	forceModel.addForceLaw(springLaw);
	forceModel.addForceLaw(vvRepulsionLaw);
	
	var projDim = 2;
	if (projDim > 0) {
		forceModel.addConstraint(new uwm.autolayout.ProjectionConstraint(graph, projDim));
	}
	
	var accuracy = 0.00001;
	var restartThreshold = 2;
	var opt = new uwm.autolayout.ConjugateGradients(graph, forceModel, accuracy, restartThreshold);
	
	for (var i = 0; i < 100; i++) {
		opt.improveGraph();
	}
	
	for (var i = 0; i < vertexes.getSize(); i++) {
		var vertex = vertexes.get(i);
		var figure = figures.get(i);
		
		var coords = vertex.getCoords();
		
		while (!isFinite(coords[0])) {
			coords = coords[0];
		}
		
		if (coords) {
			figure.setPosition(coords[0], coords[1]);
		}
	}
}

uwm.autolayout.walkAndPopulateClusters = function(figures, index, clusterIds, thisClusterId){
	var figure = figures.get(index);
	if (!clusterIds[index]) {
		clusterIds[index] = thisClusterId;
		
		var ports = figure.getPorts();
		for (var j = 0; j < ports.getSize(); j++) {
			var port = ports.get(j);
			var connections = port.getConnections();
			for (var k = 0; k < connections.getSize(); k++) {
				var connection = connections.get(k);
				if (connection.getSource() == port) {
					var targetPort = connection.getTarget();
					var targetFigure = targetPort.getParent();
					var targetIndex = figures.indexOf(targetFigure);
					uwm.autolayout.walkAndPopulateClusters(figures, targetIndex, clusterIds, thisClusterId);
				}
				else {
					var sourcePort = connection.getSource();
					var sourceFigure = sourcePort.getParent();
					var sourceIndex = figures.indexOf(sourceFigure);
					uwm.autolayout.walkAndPopulateClusters(figures, sourceIndex, clusterIds, thisClusterId);
				}
			}
		}
	}
}
