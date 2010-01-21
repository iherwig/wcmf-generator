/*
 * <copyright>
 *
 * Copyright (c) 2005-2006 Sven Efftinge (http://www.efftinge.de) and others.
 * All rights reserved.   This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Sven Efftinge (http://www.efftinge.de) - Initial API and implementation
 *
 * </copyright>
 */
package net.sourceforge.olympos.oaw.workflow;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;

import org.eclipse.emf.common.util.URI;
import org.eclipse.emf.ecore.resource.Resource;
import org.eclipse.emf.ecore.resource.impl.ResourceSetImpl;
import org.eclipse.emf.ecore.xmi.impl.XMIResourceFactoryImpl;
import org.openarchitectureware.workflow.ConfigurationException;
import org.openarchitectureware.workflow.WorkflowContext;
import org.openarchitectureware.workflow.issues.Issues;
import org.openarchitectureware.workflow.lib.AbstractWorkflowComponent;
import org.openarchitectureware.workflow.monitor.ProgressMonitor;

/**
 * @author Sven Efftinge (http://www.itemis.eu)
 * 
 * 
 * @deprecated use org.eclipse.mwe.emf.Reader instead
 */
@Deprecated
public class XmiUrlReader extends AbstractWorkflowComponent {

	protected String modelUrl;

	protected String outputSlot = WorkflowContext.DEFAULT_SLOT;

	protected boolean firstElementOnly = true;

	public String getLogMessage() {
		return "file '" + modelUrl + "' => slot '" + outputSlot + "'";
	}

	public void setModelUrl(final String modelUrl) {
		this.modelUrl = modelUrl;
	}

	public void setOutputSlot(final String outputSlot) {
		this.outputSlot = outputSlot;
	}

	public void setFirstElementOnly(final boolean firstElementOnly) {
		this.firstElementOnly = firstElementOnly;
	}

	public void checkConfiguration(final Issues issues) {
		loadUrl(issues);
	}

	public void invoke(final WorkflowContext model,
			final ProgressMonitor monitor, final Issues issues) {
		final URI uri = URI.createURI(loadUrl(issues).toString());

		final Resource r = new ResourceSetImpl().createResource(uri);
		try {
			r.load(null);
		} catch (final IOException e) {
			throw new ConfigurationException(e);
		}

		if (firstElementOnly) {
			model.set(outputSlot, r.getContents().get(0));
		} else {
			model.set(outputSlot, r.getContents());
		}
	}

	protected URL loadUrl(final Issues issues) {
		Resource.Factory.Registry.INSTANCE.getExtensionToFactoryMap().put("*",
				new XMIResourceFactoryImpl());
		if (modelUrl == null) {
			issues.addError("No modelUrl specified!");
			return null;
		}
		URL url;
		try {
			url = new URL(modelUrl);
		} catch (MalformedURLException e) {
			issues.addError(this, "cannot find url: " + modelUrl);
			return null;
		}

		return url;
	}

}