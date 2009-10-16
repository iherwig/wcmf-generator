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
Ext.namespace("cwe.Constants");

/**
 * Most recent SVN revision.
 *
 * <p>Run updaterevision.bat in root dir to update.</p>
 *
 * @type String
 */
cwe.Constants.SVN_REVISION = "";

cwe.Constants.AggregationKind = {
	NONE: "AggregationKind.NONE",
	SHARED: "AggregationKind.SHARED",
	COMPOSITE: "AggregationKind.COMPOSITE"
};
