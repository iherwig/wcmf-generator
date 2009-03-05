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
Ext.namespace("uwm.Util");

/**
 * Extracts the UWM Class Name out of an OID.
 * 
 * @param {String}
 *            oid The OID to extract UWM Class Name from.
 * @return {String} The UWM Class Name of the OID.
 */
uwm.Util.getUwmClassNameFromOid = function(oid) {
	var result = oid.match(/^[^:]+/)[0];
	
	if (oid.charAt(0) == "{") {
		result = oid.match(/:([^}]+)/)[1];
	}
	
	return result;
}

/**
 * Extracts the numeric part out of an OID.
 * 
 * @param {String}
 *            oid The OID to extract numeric part from.
 * @return {int} The numeric part of the OID
 */
uwm.Util.getNumericFromOid = function(oid) {
	return oid.match(/:([0-9]+)/)[1];
}

/**
 * Displays a message to the user.
 * 
 * @param {String}
 *            title Title of the message.
 * @param {String}
 *            message The message body. May contain HTML tags.
 * @param {uwm.Util.messageType}
 *            messageType The type of the message.
 */
uwm.Util.showMessage = function(title, message, messageType) {
	var messageContainer = Ext.get("messageContainer");
	if (!messageContainer) {
		messageContainer = Ext.DomHelper.insertFirst(document.body, {
			id :"messageContainer",
			style :"position: absolute"
		}, true);
	}
	messageContainer.alignTo(document, 't-t');
	var messageBox = Ext.DomHelper
			.append(
					messageContainer,
					{
						html :'<div>'
								+ '<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>'
								+ '<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc"><h3>'
								+ title
								+ '</h3>'
								+ message
								+ '</div></div></div>'
								+ '<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>'
								+ '</div>'
					}, true);
	messageBox.slideIn('t').pause(3).ghost("t", {
		remove :true
	});
}

/**
 * List of message types.
 */
uwm.Util.messageType = {
	INFO :1,
	WARNING :2,
	ERROR :3
}

/**
 * Disables text selection on a DOM element.
 * 
 * @param {DOMElement}
 *            elem The DOM element to disable selection on.
 */
uwm.Util.setElementUnselectable = function(elem) {
	if (elem) {
		elem.style.MozUserSelect = "none";
		elem.style.KhtmlUserSelect = "none";
		elem.unselectable = "on";
	}
}
