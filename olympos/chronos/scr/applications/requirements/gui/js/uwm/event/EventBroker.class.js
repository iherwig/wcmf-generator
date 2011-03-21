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
Ext.namespace("uwm.event");

/**
 * Receives events on ModelNodes and distributes them to all listeners.
 * 
 * <p>Available events:</p>
 * <ul>
 * 	<li><b>create:</b> When a new ModelNode was created.</li>
 * 	<li><b>load:</b> When a new ModelNode was loaded.</li>
 * 	<li><b>delete:</b> When an existing ModelNode was deleted.</li>
 * 	<li><b>changeLabel:</b> When a label property of an ModelNode was changed. Fires additionally to the changeProperty event.</li>
 * 	<li><b>changeProperty:</b> When a property of an ModelNode was changed.</li>
 * 	<li><b>associate:</b> When a ModelNode was associated to another modelNode.</li>
 * 	<li><b>disassociate:</b> When a ModelNode was disassociated from another modelNode.</li>
 *  <li><b>mappingBroken:</b> When a mapping for an AttributeObject was found to be broken.</li>
 *  <li><b>reloadDiagram:</b> When a diagram is reloaded.</li>
 * </ul>
 * 
 * <p>This class is a <i>Singleton</i>.</p>
 * 
 * @extends Ext.util.Observable.
 * @constructor
 */
uwm.event.EventBroker = function() {
	uwm.event.EventBroker.superclass.constructor.call(this);
	
	this.addEvents({
		"create": true,
		"load": true,
		"delete": true,
		"changeLabel": true,
		"changeProperty": true,
		"associate": true, /* parameters: parentObject, childObject, relationObject, connection */
		"disassociate": true,
		"mappingBroken": true, /* parameters: attributeModelObject */
		"reloadDiagram": true /* parameters: diagram */
	});
}

Ext.extend(uwm.event.EventBroker, Ext.util.Observable);

uwm.event.EventBroker.getInstance = function() {
	if (!uwm.event.EventBroker.instance) {
		uwm.event.EventBroker.instance = new uwm.event.EventBroker();
	}
	
	return uwm.event.EventBroker.instance;
}
