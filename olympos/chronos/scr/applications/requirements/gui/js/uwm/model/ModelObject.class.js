/*
 * Copyright (c) 2008 The Olympos Development Team.
 *
 * http://sourceforge.net/projects/olympos/
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code,
 * this entire header must remain intact.
 */
Ext.namespace("uwm.model");

uwm.model.ModelObject = function(modelNodeClass) {
	uwm.model.ModelNode.call(this, modelNodeClass);
}

uwm.model.ModelObject.prototype = new uwm.model.ModelNode;

uwm.model.ModelObject.prototype.connectableWith = function(otherObject) {
	return this.getModelNodeClass().getConnectionInfo(otherObject.getModelNodeClass()) != null;
}
