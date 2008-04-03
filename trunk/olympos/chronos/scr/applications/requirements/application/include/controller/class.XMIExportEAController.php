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

class XMIExportEAController extends BatchController
{
	var $SRCFILE = "uml2.1-xmi2.1.xml";
	var $DOCFILE = "export.xml";
	var $XML_VERSION = "1.0";
	var $ENCODING = "UTF-8";
	var $XMI_VERSION = "1.1";
	var $UML_NAMESPACE = "omg.org/UML1.3";
	var $XMI_EXPORTER = "ChiRequirementsXMIExport";
	var $XMI_EXPORTER_VERSION = "0.1";
	var $PACKAGE_NAME = "ChiRequirementsPackage.000";

	var $NAME = "name";
	var $XMI_ID = "xmi:id";
	var $XMI_IDREF = "xmi:idref";
	var $XMI_TYPE = "xmi:type";
	var $BASE_REQUIREMENT = "base_Requirement";
	var $SCOPE = "scope";
	var $VISIBILITY = "visibility";
	var $UML_REQUIREMENT = "uml:Requirement";

	var $dom;
	var $model;
	var $package;
	var $elements;
	var $connectors;
	var $stereotypeExt = array();
	var $realIdCounter = 0;

	var $lastTime = 0;
	
	function check($msg) {
		$newTime = microtime(true);
		
		echo $newTime - $this->lastTime, ": $msg<br/ >";
		
		$this->lastTime = $newTime;
	}
	
	/**
	 * @see BatchController::getWorkPackage()
	 */
	function getWorkPackage($number)
	{
		if ($number == 0)
		return array('name' => Message::get('Initialization'), 'size' => 1, 'oids' => array(1), 'callback' => 'initExport');
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

	function initExport($oids)
	{
		$this->check("start");
		$loadDom = domxml_open_file($this->SRCFILE);
		$this->check("file parsed");
		
		$root = $loadDom->document_element();
		$rootClone = $root->clone_node(true);
		$dom = domxml_new_doc($this->XML_VERSION);
		$dom->append_child($rootClone);
		unset($root);
		unset($loadDom);
		
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

		$reqStatusIds = $persistenceFacade->getOIDs("ChiRequirementStatus");
		$reqStatus = array();
		foreach ($reqStatusIds as $currReqStatusId) {
			$currReqStatus = $persistenceFacade->load($currReqStatusId);
			$reqStatus[$currReqStatus->getId()] = $currReqStatus->getName();
		}

		$reqTypeIds = $persistenceFacade->getOIDS("ChiRequirementType");
		$reqType = array();
		foreach($reqTypeIds as $currReqTypeId) {
			$currReqType = $persistenceFacade->load($currReqTypeId);
			$reqType[$currReqType->getid()] = $currReqType->getName();
		}

		$featureStatusIds = $persistenceFacade->getOIDS("ChiFeatureStatus");
		$featureStatus = array();
		foreach($featureStatusIds as $currFeatureStatusId) {
			$currFeatureStatus = $persistenceFacade->load($currFeatureStatusId);
			$featureStatus[$currFeatureStatus->getid()] = $currFeatureStatus->getName();
		}

		$authorIds = $persistenceFacade->getOIDS("ChiAuthors");
		$author = array();
		foreach($authorIds as $currAuthorId) {
			$currAuthor = $persistenceFacade->load($currAuthorId);
			$author[$currAuthor->getid()] = $currAuthor->getName();
		}

		$this->check("extracted array");
		
		$goalIds = $persistenceFacade->getOIDS("ChiGoal");
		foreach($goalIds as $currGoalId) {
			$currGoal = $persistenceFacade->load($currGoalId, BUILDDEPTH_INFINITE);
			/* @var $currGoal ChiGoal */
				
			$this->check("starting $currGoalId");
			
			$this->addClass($currGoal->getName(), $currGoalId);
				
			$chiGoal = $dom->create_element("Chronos:ChiGoal");
			$chiGoal->set_attribute($this->BASE_REQUIREMENT, $currGoalId);
			$chiGoal->set_attribute("ChiGoal", "50");
			$this->model->append_child($chiGoal);
				
			$elem = $this->addElem($this->UML_REQUIREMENT, $currGoal->getName(), $currGoalId);
			$this->addModel($elem);
			$this->addProperties($elem, "Requirement", $currGoal->getNotes(), $currGoal->getAlias(), "ChiGoal");
			$this->addModelDocument($elem);
				
			$tags = $this->addTags($elem);
			$tagCounter = 0;
			$this->addTag($tags, $currGoalId . "." . $tagCounter++, "Priority", "50", $currGoalId);
				
			$this->addXrefs($elem);
			$this->addExtendedProperties($elem);
			$goalLinks = $this->addLinks($elem);

			$reqs = $currGoal->getChiRequirementList();
				
			foreach ($reqs as $currReq) {
				/* @var $currReq ChiRequirement */

				$currReqId = "ChiRequirement:" . $currReq->getId();

				$this->check("starting $currReqId");
				
				$class = $this->addClass($currReq->getName(), $currReqId);
				$ownedAttrId = $currReqId . ".property";
				$assocId = "Association." . $currReqId;
				$this->addOwnedAttribute($class, $ownedAttrId, $assocId, $currGoalId);

				$assoc = $this->addClass("containing", $assocId, "uml:Association");
				$this->addMemberEnd($assoc, $ownedAttrId);
				$memberEndId = $assocId . ".MemberEnd";
				$this->addMemberEnd($assoc, $memberEndId);
				$this->addOwnedEnd($assoc, $memberEndId, $assocId, $currReqId);

				$chiReq = $dom->create_element("Chronos:ChiRequirement");
				$chiReq->set_attribute($this->BASE_REQUIREMENT, $currReqId);
				$chiReq->set_attribute("ChiRequirement", "none");
				$this->model->append_child($chiReq);

				$elem = $this->addElem($this->UML_REQUIREMENT, $currReq->getName(), $currReqId);
				$this->addModel($elem);
				$this->addProperties($elem, "Requirement", $currReq->getNotes(), $currReq->getAlias(), "ChiRequirement");
				$this->addModelDocument($elem);

				$tags = $this->addTags($elem);
				$tagCounter = 0;
				$this->addTag($tags, $currReqId . "." . $tagCounter++, "Author", $this->getSet($author, $currReq->getAuthor()), $currReqId);
				$this->addTag($tags, $currReqId . "." . $tagCounter++, "Priority", $currReq->getPriority(), $currReqId);
				$this->addTag($tags, $currReqId . "." . $tagCounter++, "Proofreader", $this->getSet($author, $currReq->getProofreader()), $currReqId);
				$this->addTag($tags, $currReqId . "." . $tagCounter++, "Status", $this->getSet($reqStatus, $currReq->getStatus()), $currReqId);
				$this->addTag($tags, $currReqId . "." . $tagCounter++, "Type", $this->getSet($reqType, $currReq->getReqType()), $currReqId);

				$this->addXrefs($elem);
				$this->addExtendedProperties($elem);

				$reqLinks = $this->addLinks($elem);

				$this->addLink($goalLinks, "Aggregation", $assocId, $currReqId, $currGoalId);
				$this->addLink($reqLinks, "Aggregation", $assocId, $currReqId, $currGoalId);

				$conn = $this->addConnector($assocId);
				$this->addEdge($conn, "source", $currGoalId, "Requirement", $currGoal->getName());
				$this->addEdge($conn, "target", $currReqId, "Requirement", $currReq->getName(), "composite");
				$this->addModel($conn);

				$this->addConnProperties($conn, "Aggregation", "Strong");

				$modifiers = $dom->create_element("modifiers");
				$modifiers->set_attribute("isRoot", "false");
				$modifiers->set_attribute("isLeaf", "false");
				$conn->append_child($modifiers);

				$this->addDocumentation($conn);
				$this->addLabels($conn, "containing");
				$this->addConnExtendedProperties($conn);
				$this->addXrefs($conn);
				$this->addTags($conn);

				$issues = $currReq->getChiIssueList();

				foreach($issues as $currIssue) {
					/* @var $currIssue ChiIssue */
						
					$currIssueId = "ChiIssue:" . $currIssue->getId();
						
					$this->check("starting $currIssueId");
					
					$this->addClass($currIssue->getName(), $currIssueId);

					$dependId = "Dependency." . currIssueId;
					$this->addDependency("breaking", $dependId, $currReqId, $currIssueId);
						
					$chiIssue = $dom->create_element("Chronos:ChiIssue");
					$chiIssue->set_attribute("base_Issue", $currIssueId);
					$chiIssue->set_attribute("ChiIssue", "none");
					$this->model->append_child($chiIssue);
						
					$chiDepend = $dom->create_element("thecustomprofile:brakes");
					$chiDepend->set_attribute("base_Dependency", $dependId);
					$this->model->append_child($chiDepend);
						
					$elem = $this->addElem("uml:Issue", $currIssue->getName(), $currIssueId);
						
					$this->addModel($elem);
					$this->addProperties($elem, "Issue", $currIssue->getNotes(), $currIssue->getAlias(), "ChiIssue");
					$this->addModelDocument($elem);
						
					$tags = $this->addTags($elem);
					$tagCounter = 0;
					$this->addTag($tags, $currIssueId . "." . $tagCounter++, "Author", $this->getSet($author, $currIssue->getAuthor()), $currIssueId);
					$this->addTag($tags, $currIssueId . "." . $tagCounter++, "Responsible", $this->getSet($author, $currIssue->getResponsible()), $currIssueId);
						
					$this->addXrefs($elem);
					$this->addExtendedProperties($elem);
						
					$issueLinks = $this->addLinks($elem);
						
					$this->addLink($reqLinks, "Dependency", $currIssueId, $currReqId);
					$this->addLink($issueLinks, "Dependency", $currIssueId, $currReqId);
						
					$conn = $this->addConnector($dependId);
					$this->addEdge($conn, "source", $currIssueId, "Issue", $currIssue->getName());
					$this->addEdge($conn, "target", $currReqId, "Requirement", $currReq->getName());
					$this->addModel($conn);

					$this->addConnProperties($conn, "Dependency", null, "brakes");
					$this->addDocumentation($conn);
					$this->addLabels($conn, "breaking");
					$this->addConnExtendedProperties($conn, "�brakes�");
					$this->addXrefs($conn);
					$this->addTags($conn);
				}

				$features = $currReq->getChiFeatureList();

				foreach ($features as $currFeature) {
					/* @var $currFeature ChiFeature */
						
					$currFeatureId = "ChiFeature:" . $currFeature->getId();

					$this->check("starting $currFeatureId");
					
					if (!array_key_exists($currFeatureId, $this->processedFeatures)) {
						$this->processedFeatures[$currFeatureId] = true;

						$this->addClass($currFeature->getName(), $currFeatureId);

						$chiFeature = $dom->create_element("Chronos:ChiFeature");
						$chiFeature->set_attribute("base_Feature", $currFeatureId);
						$this->model->append_child($chiFeature);

						$elem = $this->addElem("uml:Feature", $currFeature->getName(), $currFeatureId);

						$this->addModel($elem);
						$this->addProperties($elem, "Feature", $currFeature->getNotes(), $currFeature->getAlias(), "ChiFeature");
						$this->addModelDocument($elem);

						$tags = $this->addTags($elem);
						$tagCounter = 0;
						$this->addTag($tags, $currFeatureId . "." . $tagCounter++, "Author", $this->getSet($author, $currFeature->getAuthor()), $currFeatureId);
						$this->addTag($tags, $currFeatureId . "." . $tagCounter++, "Proofreader", $this->getSet($author, $currFeature->getProofreader()), $currFeatureId);
						$this->addTag($tags, $currFeatureId . "." . $tagCounter++, "Status", $this->getSet($featureStatus, $currFeature->getStatus()), $currFeatureId);
						
						$this->addXrefs($elem);
						$this->addExtendedProperties($elem);
						
						$featureLinks = $this->addLinks($elem);
					}
					
					$realId = "Realization." . $this->realIdCounter++;

					$this->addRealization("realizing", $realId, $currReqId, $currFeatureId);
					
					$this->addLink($reqLinks, "Realization", $realId, $currFeatureId, $currReqId);
					$this->addLink($featureLinks, "Realization", $realId, $currFeatureId, $currReqId);
					
					$conn = $this->addConnector($realId);
					$this->addEdge($conn, "source", $currFeatureId, "Feature", $currFeature->getName());
					$this->addEdge($conn, "target", $currReqId, "Requirement", $currReq->getName(), "none", "true");
					$this->addModel($conn);

					$this->addConnProperties($conn, "Realisation");
					$this->addDocumentation($conn);
					$this->addLabels($conn, "realizing");
					$this->addConnExtendedProperties($conn);
					$this->addXrefs($conn);
					$this->addTags($conn);
				}
			}
		}


		$this->check("calulation done");
		
		echo "output to: " . $this->DOCFILE . "<br />";
		
		$dom->dump_file($this->DOCFILE);

		$this->check("finished");
	}
	
	function getSet($array, $selected) {
		$result = "#NOTES#Values: ";
		
		$first = true;
		foreach ($array as $val) {
			if (!$first) {
				$result .= ",";
			} else {
				$first = false;
			}
			$result .= $val;
		}
		
		$result .= chr(0x0a);
		$result .= $array[$selected];
		
		return $result;
	}

	function addConnExtendedProperties($container, $conditional = null) {
		$extProp = $this->dom->create_element("extendedProperties");
		$extProp->set_attribute("virtualInheritance", "0");
		if (!is_null($conditional)) {
			$extProp->set_attribute("conditional", $conditional);
		}
		$container->append_child($extProp);

		return $extProp;
	}

	function addLabels($container, $name) {
		$labels = $this->dom->create_element("labels");
		$labels->set_attribute("mt", $name);
		$container->append_child($labels);

		return $labels;
	}

	function addDocumentation($container) {
		$documentation = $this->dom->create_element("documentation");
		$container->append_child($documentation);

		return $documentation;
	}

	function addConnProperties($container, $eaType, $subtype = null, $stereotype = null) {
		$props = $this->dom->create_element("properties");
		$props->set_attribute("ea_type", $eaType);
		if (!is_null($subtype)) {
			$props->set_attribute("subtype", $subtype);
		}
		if (!is_null($stereotype)) {
			$props->set_attribute("stereotype", $stereotype);
		}
		$props->set_attribute("direction", "Source -> Destination");
		$container->append_child($props);
			
		return $props;
	}

	function addEdge($container, $edgeName, $idref, $type, $name, $aggregation = "none", $navigable = "false") {
		$edge = $this->dom->create_element($edgeName);
		$edge->set_attribute($this->XMI_IDREF, $idref);
		$container->append_child($edge);

		$model = $this->dom->create_element("model");
		$model->set_attribute("type", $type);
		$model->set_attribute("name", $name);
		$edge->append_child($model);

		$role = $this->dom->create_element("role");
		$role->set_attribute($this->VISIBILITY, "Public");
		$role->set_attribute("targetScope", "instance");
		$edge->append_child($role);

		$type = $this->dom->create_element("type");
		$type->set_attribute("aggregation", $aggregation);
		$type->set_attribute("containment", "Unspecified");
		$edge->append_child($type);

		$constraints = $this->dom->create_element("constraints");
		$edge->append_child($constraints);

		$modifiers = $this->dom->create_element("modifiers");
		$modifiers->set_attribute("isOrdered", "false");
		$modifiers->set_attribute("changeable", "none");
		$modifiers->set_attribute("isNavigable", $navigable);
		$edge->append_child($modifiers);

		$documentation = $this->dom->create_element("documentation");
		$edge->append_child($documentation);

		$tags = $this->dom->create_element("tags");
		$edge->append_child($tags);

		return $edge;
	}

	function addConnector($idref) {
		$conn = $this->dom->create_element("connector");
		$conn->set_attribute($this->XMI_IDREF, $idref);
		$this->connectors->append_child($conn);

		return $conn;
	}

	function addLink($container, $linkType, $id, $start, $end) {
		$link = $this->dom->create_element($linkType);
		$link->set_attribute($this->XMI_ID, $id);
		$link->set_attribute("start", $start);
		$link->set_attribute("end", $end);
		$container->append_child($link);

		return $link;
	}


	function addOwnedEnd($container, $id, $assoc, $idref) {
		$ownedEnd = $this->dom->create_element("ownedEnd");
		$ownedEnd->set_attribute($this->XMI_TYPE, "uml:Property");
		$ownedEnd->set_attribute($this->XMI_ID, $id);
		$ownedEnd->set_attribute("association", $assoc);
		$ownedEnd->set_attribute($this->VISIBILITY, "public");
		$ownedEnd->set_attribute("isOrdered", "false");
		$ownedEnd->set_attribute("isDerived", "false");
		$ownedEnd->set_attribute("isDerivedUnion", "false");
		$ownedEnd->set_attribute("aggregation", "none");
		$container->append_child($ownedEnd);

		$type = $this->dom->create_element("type");
		$type->set_attribute($this->XMI_IDREF, $idref);
		$ownedEnd->append_child($type);

		return $ownedEnd;
	}

	function addMemberEnd($container, $idref) {
		$memberEnd = $this->dom->create_element("memberEnd");
		$memberEnd->set_attribute($this->XMI_IDREF, $idref);
		$container->append_child($memberEnd);

		return $memberEnd;
	}

	function addOwnedAttribute($container, $id, $assoc, $idref) {
		$ownedAttr = $this->dom->create_element("ownedAttribute");
		$ownedAttr->set_attribute($this->XMI_TYPE, "uml:Property");
		$ownedAttr->set_attribute($this->XMI_ID, $id);
		$ownedAttr->set_attribute("association", $assoc);
		$ownedAttr->set_attribute($this->VISIBILITY, "public");
		$ownedAttr->set_attribute("isOrdered", "false");
		$ownedAttr->set_attribute("isDerived", "false");
		$ownedAttr->set_attribute("isDerivedUnion", "false");
		$ownedAttr->set_attribute("aggregation", "composite");
		$container->append_child($ownedAttr);

		$type = $this->dom->create_element("type");
		$type->set_attribute($this->XMI_IDREF, $idref);
		$ownedAttr->append_child($type);

		return $ownedAttr;
	}

	function addLinks($container) {
		$links = $this->dom->create_element("links");
		$container->append_child($links);

		return $links;
	}

	function addExtendedProperties($container) {
		$extProp = $this->dom->create_element("extendedProperties");
		$extProp->set_attribute("tagged", "0");
		$extProp->set_attribute("package_name", "requirement");
		$container->append_child($extProp);

		return $extProp;
	}

	function addXrefs($container) {
		$xrefs = $this->dom->create_element("xrefs");
		$container->append_child($xrefs);

		return $xrefs;
	}

	function addTag($container, $tagId, $name, $value, $elemId) {
		$tag = $this->dom->create_element("tag");
		$tag->set_attribute($this->XMI_ID, $tagId);
		$tag->set_attribute($this->NAME, $name);
		$tag->set_attribute("value", $value);
		$tag->set_attribute("modelElement", $elemId);
		$container->append_child($tag);

		return $tag;
	}
	
	function addTags($container) {
		$tags = $this->dom->create_element("tags");
		$container->append_child($tags);

		return $tags;
	}

	function addModelDocument($container) {
		$modelDoc = $this->dom->create_element("modelDocument");
		$container->append_child($modelDoc);

		return $modelDoc;
	}

	function addProperties($container, $type, $documentation, $alias, $stereotype) {
		$properties = $this->dom->create_element("properties");
		$properties->set_attribute("documentation", $documentation);
		$properties->set_attribute("isSpecification", "false");
		$properties->set_attribute("sType", $type);
		$properties->set_attribute("nType", "0");
		$properties->set_attribute("alias", $alias);
		$properties->set_attribute($this->SCOPE, "public");
		$properties->set_attribute("stereotype", $stereotype);
		$container->append_child($properties);

		return $properties;
	}

	function addModel($container) {
		$model = $this->dom->create_element("model");
		$model->set_attribute("package", $this->PACKAGE_NAME);
		$container->append_child($model);

		return $model;

	}

	function addElem($type, $name, $id) {
		$elem = $this->dom->create_element("element");
		$elem->set_attribute($this->XMI_IDREF, $id);
		$elem->set_attribute($this->NAME, $name);
		$elem->set_attribute($this->XMI_TYPE, $type);
		$elem->set_attribute($this->SCOPE, "public");
		$this->elements->append_child($elem);

		return $elem;
	}

	function addRealization($name, $id, $supplier, $client) {
		$depend = $this->dom->create_element("packagedElement");
		$depend->set_attribute($this->XMI_TYPE, "uml:Realization");
		$depend->set_attribute($this->NAME, $name);
		$depend->set_attribute($this->XMI_ID, $id);
		$depend->set_attribute($this->VISIBILITY, "public");
		$depend->set_attribute("supplier", $supplier);
		$depend->set_attribute("client", $client);
		$depend->set_attribute("realizingClassifier", $supplier);
		
		$this->package->append_child($depend);

		return $depend;
	}

	function addDependency($name, $id, $supplier, $client) {
		$depend = $this->dom->create_element("packagedElement");
		$depend->set_attribute($this->XMI_TYPE, "uml:Dependency");
		$depend->set_attribute($this->NAME, $name);
		$depend->set_attribute($this->XMI_ID, $id);
		$depend->set_attribute($this->VISIBILITY, "public");
		$depend->set_attribute("supplier", $supplier);
		$depend->set_attribute("client", $client);

		$this->package->append_child($depend);

		return $depend;
	}

	function addClass($name, $id, $type = "uml:Class") {
		$class = $this->dom->create_element("packagedElement");
		$class->set_attribute($this->XMI_TYPE, $type);
		$class->set_attribute($this->NAME, $name);
		$class->set_attribute($this->XMI_ID, $id);
		$class->set_attribute($this->VISIBILITY, "public");

		$this->package->append_child($class);

		return $class;
	}
}
?>
