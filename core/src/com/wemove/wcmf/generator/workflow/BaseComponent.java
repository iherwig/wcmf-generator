package com.wemove.wcmf.generator.workflow;


import org.openarchitectureware.workflow.lib.AbstractWorkflowComponent2;

/**
 * @author ingo herwig <ingo@wemove.com>
 */
public abstract class BaseComponent extends AbstractWorkflowComponent2 {

	protected String getMessage(String msg) {
		return this.getClass().getSimpleName()+": "+msg;
	}
}
