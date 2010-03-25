<?php
/*
 * Copyright (c) 2010 The Olympos Development Team.
 *
 * http://sourceforge.net/projects/olympos/
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code,
 * this entire header must remain intact.
 */

require_once BASE . 'wcmf/lib/model/class.Node.php';

require_once BASE . 'application/include/controller/iface.UwmExporterReferenceStrategy.php';

require_once BASE . 'application/include/model/activity/class.ChiObject.php';
require_once BASE . 'application/include/model/domain/class.ChiNode.php';
require_once BASE . 'application/include/model/domain/class.ChiAssociation.php';

class UcDomainExporterReference implements UwmExporterReferenceStrategy {
	private $containers = array();
	private $superclasses = array();

	public function getReferences(Node $node) {
		$result = array();

		if ($node instanceof ChiObject) {
			$sourceCount = $node->getNumChildren(false, 'ChiObjectObjectFlowSourceEnd');
			$targetCount = $node->getNumChildren(false, 'ChiObjectObjectFlowTargetEnd');

			if (($sourceCount == 1 && $targetCount == 0) || ($sourceCount == 0 && $targetCount == 1)) {
				$node->loadParents('ChiNode');

				$parents = $node->getParents();
				foreach($parents as $parent) {
					if ($parent instanceof ChiNode) {
						$result[] = $parent->getOid();
						$this->containers[] = $parent->getOid();
					}
				}
			}
		} else if ($node instanceof ChiNode) {
			$persistenceFacade = PersistenceFacade::getInstance();
				
			if (array_search($node->getOid(), $this->containers, true) !== false) {
				//found a container
				$node->loadChildren('NodeTargetEnd', 1);
				$node->loadChildren('NodeSourceEnd', 1);

				$children = $node->getChildren();
				foreach($children as $child) {
					if ($child instanceof ChiAssociation) {
						if ($child->getType() == 'NodeTargetEnd') {
							$otherEndId = $child->getFkChinodesourceId();
						} else {
							$otherEndId = $child->getFkChinodetargetId();
						}
						$otherEndOid = PersistenceFacade::composeOid(array('type' => 'ChiNode', 'id' => $otherEndId));

						if ($child->getRelationType() == 'generalization') {
							$this->superclasses[] = $otherEndOid;
						}
						$result[] = $otherEndOid;
					}
				}
			} else {
				$node->loadChildren('NodeSourceEnd');

				$children = $node->getChildren();
				foreach($children as $child) {
					if ($child instanceof ChiAssociation) {
						if ($child->getRelationType() == 'generalization') {
							$otherEndId = $child->getFkChinodetargetId();
							$otherEndOid = PersistenceFacade::composeOid(array('type' => 'ChiNode', 'id' => $otherEndId));
								
							$result[] = $otherEndOid;

							$this->superclasses[] = $otherEndOid;
						}
					}
				}
			}
		}

		return $result;
	}
}
