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
Ext.namespace("uwm.Dict");
 
uwm.Dict.voc = {
		'Perspectives': {'de':'Perspektiven'},
		'Properties' : {'de':'Eigenschaften','kl':'Aignschaffdn'}
}
uwm.Dict.translate = function(){
		strword=arguments[0];
		try {
			strresult = uwm.Dict.voc[strword][uwm.Session.getInstance().getLang()];
			if(!strresult){strresult = strword;}
		}catch(e){
			strresult = strword;
		}
		return strresult;
}

