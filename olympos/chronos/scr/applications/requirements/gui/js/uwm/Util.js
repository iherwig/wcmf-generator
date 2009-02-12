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

uwm.Util.getUwmClassNameFromOid = function(oid){
    return oid.match(/^[^:]+/)[0];
}

uwm.Util.getNumericFromOid = function(oid) {
	return oid.match(/:([0-9]+)/)[1];
}

uwm.Util.showMessage = function(title, message, messageType){
    var messageContainer = Ext.get("messageContainer");
    if (!messageContainer) {
        messageContainer = Ext.DomHelper.insertFirst(document.body, {
            id: "messageContainer",
            style: "position: absolute"
        }, true);
    }
    messageContainer.alignTo(document, 't-t');
    var messageBox = Ext.DomHelper.append(messageContainer, {
        html: '<div>' +
        '<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>' +
        '<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc"><h3>' +
        title +
        '</h3>' +
        message +
        '</div></div></div>' +
        '<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>' +
        '</div>'
    }, true);
    messageBox.slideIn('t').pause(3).ghost("t", {
        remove: true
    });
}

uwm.Util.messageType = {
    INFO: 1,
    WARNING: 2,
    ERROR: 3
}

uwm.Util.setElementUnselectable = function(elem){
    if (elem) {
        elem.style.MozUserSelect = "none";
        elem.style.KhtmlUserSelect = "none";
        elem.unselectable = "on";
    }
}
