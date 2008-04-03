<?php
/**
 * wCMF - wemove Content Management Framework
 * Copyright (C) 2005 wemove digital solutions GmbH
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 *
 * $Id: class.XMLExportController.php 295 2007-02-17 17:25:25Z iherwig $
 */
require_once(BASE."wcmf/application/controller/class.BatchController.php");
require_once(BASE."wcmf/lib/persistence/class.PersistenceFacade.php");
require_once(BASE."wcmf/lib/model/class.PersistentIterator.php");
require_once(BASE."wcmf/lib/util/class.InifileParser.php");
require_once(BASE."wcmf/lib/util/class.FileUtil.php");

class XMIImportEAController extends BatchController
{
	var $SRCFILE = "import.xmi";

	var $NAME = "name";
	var $XMI_ID = "xmi:id";
	var $XMI_IDREF = "idref";
	var $XMI_TYPE = "xmi:type";

	var $dom;
	var $elements;
	
	var $goals = array();
	var $reqs = array();
	var $features = array();
	var $issues = array();
	
	var $reqStatus = array();
	var $reqType = array();
	var $featureStatus = array();
	var $author = array();
	
	var $savedGoals = array();
	var $savedReqs = array();
	var $savedFeatures = array();
	var $savedIssues = array();

	var $persistenceFacade;
	/* @var $persistenceFacade PersistenceFacade */
	
	var $lastTime = 0;
	
	function check($msg) {
		$newTime = microtime(true);
		
		echo $newTime - $this->lastTime, ": $msg<br/ >";
		flush();
		
		$this->lastTime = $newTime;
	}
	
	/**
	 * @see BatchController::getWorkPackage()
	 */
	function getWorkPackage($number)
	{
		if ($number == 0)
		return array('name' => Message::get('Initialization'), 'size' => 1, 'oids' => array(1), 'callback' => 'initImport');
		else
		return null;
	}
	/**
	 * @see LongTaskController::getDisplayText()
	 */
	function getDisplayText($step)
	{
		return "Processing ...";
	}

	function initImport($oids)
	{
echo "<pre>";		
		
		$this->check("start");
		$dom = domxml_open_file($this->SRCFILE);
		$this->check("file parsed");
		
		$this->dom = $dom;

		$tmp = $dom->get_elements_by_tagname("Model");
		$this->model = $tmp[0];
		$tmp = $dom->get_elements_by_tagname("packagedElement");
		$this->package = $tmp[0];
		$tmp = $dom->get_elements_by_tagname("elements");
		$this->elements = $tmp[0];
		$tmp = $dom->get_elements_by_tagname("connectors");
		$this->connectors = $tmp[0];
		unset($tmp);
		$this->check("found anchors");
		
		$persistenceFacade = &PersistenceFacade::getInstance();
		$this->persistenceFacade = $persistenceFacade;
		
		$reqStatusIds = $persistenceFacade->getOIDs("ChiRequirementStatus");
		foreach ($reqStatusIds as $currReqStatusId) {
			$currReqStatus = $persistenceFacade->load($currReqStatusId);
			$this->reqStatus[$currReqStatus->getName()] = $currReqStatus->getId();
		}

		$reqTypeIds = $persistenceFacade->getOIDS("ChiRequirementType");
		foreach($reqTypeIds as $currReqTypeId) {
			$currReqType = $persistenceFacade->load($currReqTypeId);
			$this->reqType[$currReqType->getName()] = $currReqType->getId();
		}

		$featureStatusIds = $persistenceFacade->getOIDS("ChiFeatureStatus");
		foreach($featureStatusIds as $currFeatureStatusId) {
			$currFeatureStatus = $persistenceFacade->load($currFeatureStatusId);
			$this->featureStatus[$currFeatureStatus->getName()] = $currFeatureStatus->getId();
		}

		$authorIds = $persistenceFacade->getOIDS("ChiAuthors");
		foreach($authorIds as $currAuthorId) {
			$currAuthor = $persistenceFacade->load($currAuthorId);
			$this->author[$currAuthor->getName()] = $currAuthor->getId();
		}

		$currElem = $this->getFirstChildElem($this->elements);
		
		while (! is_null($currElem)) {
			$currId = $currElem->get_attribute($this->XMI_IDREF);
			$this->check("Reading id=" . $currId);
			
			$tmp = $currElem->get_elements_by_tagname("properties");
			if(count($tmp) < 1) {
				echo "Missing properties for element id= $currId";
				continue;
			}
			$props = $tmp[0];
			$stereotype = $props->get_attribute("stereotype");
			
			switch($stereotype) {
				case "ChiGoal":
					$this->readGoal($currId, $currElem, $props);
					break;

				case "ChiRequirement":
					$this->readRequirement($currId, $currElem, $props);
					break;

				case "ChiFeature":
					$this->readFeature($currId, $currElem, $props);
					break;

				case "ChiIssue":
					$this->readIssue($currId, $currElem, $props);
					break;
			}
					
			$currElem = $this->getNextElem($currElem);
		}
		
		$this->saveGoals();
		$this->saveReqs();
		$this->saveFeatures();
		$this->saveIssues();

		$this->check("finished");
	}
	
	function saveGoals() {
		
		foreach ($this->goals as $id => $goal) {
			$this->check("Saving Goal $goal[name]");
			
			$newGoal = $this->persistenceFacade->create("ChiGoal", 0);
			
			/* @var $newGoal ChiGoal */
			
			$newGoal->setName($goal["name"]);
			$newGoal->setNotes($goal["notes"]);
			$newGoal->setAlias($goal["alias"]);
			$newGoal->setPriority($goal["Priority"]);
			$newGoal->setValueAmmount($goal["Value_ammount"]);
			$newGoal->setValueGoal($goal["Value_Goal"]);
			$newGoal->setValueName($goal["Value_Name"]);
			
			$newGoal->save();
			
			$this->savedGoals[$id] = $newGoal;
		}
	}
	
	function saveReqs() {
		foreach($this->reqs as $id => $req) {
			$this->check("Saving Requirement $req[name]");
			
			$newReq = $this->persistenceFacade->create("ChiRequirement", 0);
			
			/* @var $newReq ChiRequirement */
			
			$newReq->setName($req["name"]);
			$newReq->setNotes($req["notes"]);
			$newReq->setAlias(($req["alias"]));
			$newReq->setAuthor($req["Author"]);
			$newReq->setPriority($req["Priority"]);
			$newReq->setProofreader($req["Proofreader"]);
			$newReq->setStatus($req["Status"]);
			$newReq->setReqType($req["Type"]);
			
			$newReq->setChiGoal($this->savedGoals[$req["parent"]]);
			
			$newReq->save();
			
			$this->savedReqs[$id] = $newReq;
		}
	}

	function saveFeatures() {
		foreach($this->features as $id => $feature) {
			$this->check("Saving Feature $feature[name]");
			
			$newFeature = $this->persistenceFacade->create("ChiFeature", 0);
			
			/* @var $newFeature ChiFeature */
			
			$newFeature->setName($feature["name"]);
			$newFeature->setNotes($feature["notes"]);
			$newFeature->setAlias(($feature["alias"]));
			$newFeature->setAuthor($feature["Author"]);
			$newFeature->setProofreader($feature["Proofreader"]);
			$newFeature->setStatus($feature["Status"]);
			
			$newFeature->save();
			
			foreach($feature["parents"] as $parent) {
				$req = $this->savedReqs[$parent];

				$link = $this->persistenceFacade->create("NMFeatureRequirements");
				
				/* @var $link NMFeatureRequirements */
				
				$link->setChiFeature($newFeature);
				$link->setChiRequirement($req);
				
				$link->save();
			}
			
			$this->savedFeatures[$id] = $newFeature;
		}
	}

	function saveIssues() {
		foreach($this->issues as $id => $issue) {
			$this->check("Saving Issue $issue[name]");
			
			$newIssue = $this->persistenceFacade->create("ChiIssue", 0);
			
			/* @var $newIssue ChiIssue */
			
			$newIssue->setName($issue["name"]);
			$newIssue->setNotes($issue["notes"]);
			$newIssue->setAlias(($issue["alias"]));
			$newIssue->setAuthor($issue["Author"]);
			$newIssue->setResponsible($issue["Responsible"]);
			
			$newIssue->setChiRequirement($this->savedReqs[$issue["parent"]]);
			
			$newIssue->save();
			
			$this->savedIssues[$id] = $newIssue;
		}
	}

	function readGoal($id, $elem, $props) {
		$name = $elem->get_attribute($this->NAME);
		$notes = $props->get_attribute("documentation");
		$alias = $props->get_attribute("alias");
		
		$tmp = $elem->get_elements_by_tagname("tags");
		if (count($tmp) < 1) {
			echo "Missing tags for Goal id=$id";
			
			return;
		}
		$tags = $tmp[0];
		
		$Priority = null;
		$Value_ammount = null;
		$Value_Goal = null;
		$Value_Name = null;
				
		$tag = $this->getFirstChildElem($tags);
		while (!is_null($tag)) {
			$tagName = $tag->get_attribute("name");
			$tagValue = $tag->get_attribute("value");
			
			switch($tagName) {
				case "Priority":
					$Priority = $this->getValue($tagValue);
					break;
					
				case "Value_ammount":
					$Value_ammount = $this->getValue($tagValue);
					break;
				
				case "Value_Goal":
					$Value_Goal = $this->getValue($tagValue);
					break;
				
				case "Value_Name":
					$Value_Name = $this->getValue($tagValue);
					break;
					
				default:
					echo "Unknown Tagged Value name=$tagName";
			}
			
			$tag = $this->getNextElem($tag);
		}
		
		$tmp = $elem->get_elements_by_tagname("links");
		if (count($tmp) < 1) {
			echo "Missing links for Goal id=$id";
			
			return;
		}
		$links = $tmp[0];

		$this->goals[$id] = array(
			"name" => $name,
			"notes" => $notes,
			"alias" => $alias,
			"Priority" => $Priority,
			"Value_ammount" => $Value_ammount,
			"Value_Goal" => $Value_Goal,
			"Value_Name" => $Value_Name
		);
	}
	
	function readRequirement($id, $elem, $props) {
		$name = $elem->get_attribute($this->NAME);
		$notes = $props->get_attribute("documentation");
		$alias = $props->get_attribute("alias");
		
		$tmp = $elem->get_elements_by_tagname("tags");
		if (count($tmp) < 1) {
			echo "Missing tags for Requirement id=$id";
			
			return;
		}
		$tags = $tmp[0];
		
		$Author = null;
		$Priority = null;
		$Proofreader = null;
		$Status = null;
		$Type = null;
				
		$tag = $this->getFirstChildElem($tags);
		while (!is_null($tag)) {
			$tagName = $tag->get_attribute("name");
			$tagValue = $tag->get_attribute("value");
			
			switch($tagName) {
				case "Author":
					$Author = $this->resolveAuthor($tagValue);
					break;
					
				case "Priority":
					$Priority = $this->getValue($tagValue);
					break;
				
				case "Proofreader":
					$Proofreader = $this->resolveAuthor($tagValue);
					break;
				
				case "Status":
					$Status = $this->resolveReqStatus($tagValue);
					break;
				
				case "Type":
					$Type = $this->resolveReqType($tagValue);
					break;
					
				default:
					echo "Unknown Tagged Value name=$tagName";
			}
			
			$tag = $this->getNextElem($tag);
		}
		
		$tmp = $elem->get_elements_by_tagname("links");
		if (count($tmp) < 1) {
			echo "Missing links for Requirement id=$id";
			
			return;
		}
		$links = $tmp[0];

		$parent = null;
		
		$link = $this->getFirstChildElem($links);
		while (!is_null($link)) {
			if ($link->tagname() == "Aggregation") {
				$parent = $link->get_attribute("end");
			}
			
			$link = $this->getNextElem($link);
		}
				
		$this->reqs[$id] = array(
			"name" => $name,
			"notes" => $notes,
			"alias" => $alias,
			"Author" => $Author,
			"Priority" => $Priority,
			"Proofreader" => $Proofreader,
			"Status" => $Status,
			"Type" => $Type,
			"parent" => $parent
		);
	}
	
	function resolveAuthor($tagValue) {
		$val = $this->getValue($tagValue);
		
		$result = null;
		
		if ($val && $val != "none") {
			if (!array_key_exists($val, $this->author)) {
				$persistenceFacade = $this->persistenceFacade;
				
				/* @var $persistenceFacade PersistenceFacade */
				
				$newAuthor = $persistenceFacade->create("ChiAuthors", 0);
				
				/* @var $newAuthor ChiAuthors */
				
				$newAuthor->setName($val);
				$newAuthor->setRole("");
				$newAuthor->save();
				
				$this->author[$val] = $newAuthor->getId();
			}

			 $result = $this->author[$val];
		}
		
		return $result;
	}
	
	function resolveReqStatus($tagValue) {
		$val = $this->getValue($tagValue);
		
		$result = null;
		
		if ($val && $val != "none") {
			if (!array_key_exists($val, $this->reqStatus)) {
				$persistenceFacade = $this->persistenceFacade;
				
				/* @var $persistenceFacade PersistenceFacade */
				
				$newReqStatus = $persistenceFacade->create("ChiRequirementStatus", 0);
				$newReqStatus->setName($val);
				$newReqStatus->save();
				
				$this->reqStatus[$val] = $newReqStatus->getId();
			}

			 $result = $this->reqStatus[$val];
		}
		
		return $result;
	}

	function resolveReqType($tagValue) {
		$val = $this->getValue($tagValue);
		
		$result = null;
		
		if ($val && $val != "none") {
			if (!array_key_exists($val, $this->reqType)) {
				$persistenceFacade = $this->persistenceFacade;
				
				/* @var $persistenceFacade PersistenceFacade */
				
				$newReqType = $persistenceFacade->create("ChiRequirementType", 0);
				$newReqType->setName($val);
				$newReqType->save();
				
				$this->reqType[$val] = $newReqType->getId();
			}

			 $result = $this->reqType[$val];
		}
		
		return $result;
	}

	function readFeature($id, $elem, $props) {
		$name = $elem->get_attribute($this->NAME);
		$notes = $props->get_attribute("documentation");
		$alias = $props->get_attribute("alias");
		
		$tmp = $elem->get_elements_by_tagname("tags");
		if (count($tmp) < 1) {
			echo "Missing tags for Feature id=$id";
			
			return;
		}
		$tags = $tmp[0];
		
		$Author = null;
		$Proofreader = null;
		$Status = null;
				
		$tag = $this->getFirstChildElem($tags);
		while (!is_null($tag)) {
			$tagName = $tag->get_attribute("name");
			$tagValue = $tag->get_attribute("value");
			
			switch($tagName) {
				case "Author":
					$Author = $this->resolveAuthor($tagValue);
					break;
					
				case "Proofreader":
					$Proofreader = $this->resolveAuthor($tagValue);
					break;
				
				case "Status":
					$Status = $this->resolveFeatureStatus($tagValue);
					break;
				
				default:
					echo "Unknown Tagged Value name=$tagName";
			}
			
			$tag = $this->getNextElem($tag);
		}
		
		$tmp = $elem->get_elements_by_tagname("links");
		if (count($tmp) < 1) {
			echo "Missing links for Feature id=$id";
			
			return;
		}
		$links = $tmp[0];

		$parents = array();
		
		$link = $this->getFirstChildElem($links);
		while (!is_null($link)) {
			if ($link->tagname() == "Realisation") {
				$parents[] = $link->get_attribute("end");
			}

			$link = $this->getNextElem($link);
		}
				
		$this->features[$id] = array(
			"name" => $name,
			"notes" => $notes,
			"alias" => $alias,
			"Author" => $Author,
			"Proofreader" => $Proofreader,
			"Status" => $Status,
			"parents" => $parents
		);
	}

	function resolveFeatureStatus($tagValue) {
		$val = $this->getValue($tagValue);
		
		$result = null;
		
		if ($val && $val != "none") {
			if (!array_key_exists($val, $this->featureStatus)) {
				$persistenceFacade = $this->persistenceFacade;
				
				/* @var $persistenceFacade PersistenceFacade */
				
				$newFeatureStatus = $persistenceFacade->create("ChiFeatureStatus", 0);
				$newFeatureStatus->setName($val);
				$newFeatureStatus->save();
				
				$this->featureStatus[$val] = $newFeatureStatus->getId();
			}

			 $result = $this->featureStatus[$val];
		}
		
		return $result;
	}

	function readIssue($id, $elem, $props) {
		$name = $elem->get_attribute($this->NAME);
		$notes = $props->get_attribute("documentation");
		$alias = $props->get_attribute("alias");
		
		$tmp = $elem->get_elements_by_tagname("tags");
		if (count($tmp) < 1) {
			echo "Missing tags for Issue id=$id";
			
			return;
		}
		$tags = $tmp[0];
		
		$Author = null;
		$Responsible = null;
				
		$tag = $this->getFirstChildElem($tags);
		while (!is_null($tag)) {
			$tagName = $tag->get_attribute("name");
			$tagValue = $tag->get_attribute("value");
			
			switch($tagName) {
				case "Author":
					$Author = $this->resolveAuthor($tagValue);
					break;
					
				case "Responsible":
					$Responsible = $this->resolveAuthor($tagValue);
					break;
				
				default:
					echo "Unknown Tagged Value name=$tagName";
			}
			
			$tag = $this->getNextElem($tag);
		}
		
		$tmp = $elem->get_elements_by_tagname("links");
		if (count($tmp) < 1) {
			echo "Missing links for Issue id=$id";
			
			return;
		}
		$links = $tmp[0];

		$parent = null;
		
		$link = $this->getFirstChildElem($links);
		while (!is_null($link)) {
			if ($link->tagname() == "Dependency") {
				$parent = $link->get_attribute("end");
			}

			$link = $this->getNextElem($link);
		}
				
		$this->issues[$id] = array(
			"name" => $name,
			"notes" => $notes,
			"alias" => $alias,
			"Author" => $Author,
			"Responsible" => $Responsible,
			"parent" => $parent
		);
	}

	function getValue($val) {
		$end = strpos($val, "#");
		
		$result = null;
		
		if ($end !== false) {
			$result = substr($val, 0, $end); 
		} else {
			$result = $val;
		}
		
		return $result;
	}
	
	function getFirstChildElem($parent) {
		$result = $parent->first_child();
		
		while($result && $result->node_type() != XML_ELEMENT_NODE) {
			$result = $result->next_sibling();
		}
		
		return $result;
	}
	
	function getNextElem($node) {
		do {
			$node = $node->next_sibling();
		} while ($node && $node->node_type() != XML_ELEMENT_NODE);		
	
		return $node;
	}
}
?>
