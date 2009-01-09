<?php
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

require_once (BASE."wcmf/lib/presentation/class.Controller.php");
require_once (BASE."wcmf/lib/persistence/class.PersistenceFacade.php");

class UWMExporterController extends Controller
{
	const XML_VERSION = "1.0";
	const ENCODING = "UTF-8";
	const STANDALONE = "yes";

	private $dom;
	private $persistenceFacade;

	private $lastTime = 0;

	private function check($msg)
	{
		$newTime = microtime(true);
	
		//echo $newTime - $this->lastTime, ": $msg<br/ >";
		
		$this->lastTime = $newTime;
	}

	public function execute()
	{
		$this->check("start");
	
		echo $this->_request->getValue('werst');
	
		$tmpFileName = tempnam(null, 'uwm');
	
		$this->dom = new XMLWriter();
		//$this->dom->setIndent(true);
		//$this->dom->setIndentString("\t");
		$this->dom->openURI($tmpFileName);
		$this->dom->startDocument($this->XML_VERSION, $this->ENCODING, $this->STANDALONE);
	
		$this->dom->startElement("uwm-export");
	
		$this->persistenceFacade = PersistenceFacade::getInstance();
	
		$startModel = $this->_request->getValue('startModel');
		$startPackage = $this->_request->getValue('startPackage');
		if ($startModel) {
			$currModel = $this->persistenceFacade->load($startModel);
			if ($currModel) {
				$this->processModel($currModel);
			} else {
				echo 'Error: Unknown model id '+$startModel;
			}
		} else if ($startPackage) {
			$currPackage = $this->persistenceFacade->load($startPackage);
			if ($currPackage) {
				$this->processPackage($currPackage);
			} else {
				echo 'Error: Unknown package id '+$startPackage;
			}
		} else {
			$this->processModels();
		}
	
		$this->dom->endElement();
	
		
		$this->dom->endDocument();
		$this->dom->flush();
		echo $tmpFileName;
	
		//header('Content-type: application/octet-stream');
		//header('Content-Disposition: attachment; filename="cwm.xmi"');
		//header('Content-type: text/xml');
		
		//echo $this->dom->outputMemory();
		
		$this->check("finished");
	
		return false;
	}

	private function appendAttributes($node)
	{
		$valueNames = $node->getValueNames();
	
		foreach ($valueNames as $currValueName)
		{
			$this->dom->writeAttribute($currValueName, $node->getValue($currValueName));
		}
	}

	private function processModels()
	{
		$modelIds = $this->persistenceFacade->getOIDs('Model');
		foreach ($modelIds as $currModelId)
		{
			$this->check($currModelId);
			$currModel = $this->persistenceFacade->load($currModelId);
		
			$this->processModel($currModel);
		}
	}

	private function processModel($currModel) {
		$this->dom->startElement('Model');
	
		$this->appendAttributes($currModel);
	
		$currModel->loadChildren();
		$packages = $currModel->getPackageChildren();
		foreach ($packages as $currPackage)
		{
			$this->processPackage($currPackage);
		
			$currPackage = $currPackage->getNextSibling();
		}
	
		unset ($currModel);
		$this->dom->endElement();
	}

	private function processPackage($currPackage)
	{
		$this->check($currPackage->getId());
		$this->dom->startElement('Package');
	
		$this->appendAttributes($currPackage);
	
		$currPackage->loadChildren();
		$children = $currPackage->getChildren();
		foreach ($children as $currChild)
		{
			$this->processNode($currChild);
		
			$currChild = $currChild->getNextSibling();
		}
	
		$this->dom->endElement();
	}

	private function processNode($currNode)
	{
		$this->check($currNode->getId());
		$this->dom->startElement($currNode->getType());
	
		$this->appendAttributes($currNode);
	
		$currNode->loadChildren();
		$children = $currNode->getChildren();
		foreach ($children as $currChild)
		{
			if ($currChild->isManyToManyObject())
			{
				$currChild->loadParents();
				$parents = $currChild->getParents();
				foreach ($parents as $currParent)
				{
					if ($currParent->getId() != $currNode->getId())
					{
						$this->dom->startElement('manyToMany');
						$this->dom->writeAttribute('targetType', $currParent->getType());
						$this->dom->writeAttribute('targetOid', $currParent->getValue('id'));
						$this->dom->endElement();
					}
				}
			}   /*else if ($currNode->getType() != 'Diagram' && $currChild->getType() == 'Figure')
			 {
			 $this->processNode($currChild);
			 }*/

		
			
		}
	
		$this->dom->endElement();
	}

	public function hasView()
	{
		return false;
	}

}

?>
