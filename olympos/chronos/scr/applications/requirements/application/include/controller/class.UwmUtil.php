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

class UwmUtil {
	const XML_VERSION = "1.0";
	const ENCODING = "UTF-8";
	const STANDALONE = "yes";

	private static $dom;
	private static $persistenceFacade;

	private static $lastTime = 0;

	private static function check($msg)
	{
		$newTime = microtime(true);
	
		//echo $newTime - self::$lastTime, ": $msg<br/ >";
		
		self::$lastTime = $newTime;
	}

	public static function exportXml($tmpUwmExportPath, $startModel, $startPackage) {
		self::$dom = new XMLWriter();
		//self::$dom->setIndent(true);
		//self::$dom->setIndentString("\t");
		self::$dom->openURI($tmpUwmExportPath);
		self::$dom->startDocument(self::XML_VERSION, self::ENCODING, self::STANDALONE);
	
		self::$dom->startElement("UwmExport");
	
		self::$persistenceFacade = PersistenceFacade::getInstance();
	
		if ($startModel) {
			$currModel = self::$persistenceFacade->load($startModel);
			if ($currModel) {
				self::processModel($currModel);
			} else {
				echo 'Error: Unknown model id '+$startModel;
			}
		} else if ($startPackage) {
			$currPackage = self::$persistenceFacade->load($startPackage);
			if ($currPackage) {
				self::$dom->startElement('Model');
				self::processPackage($currPackage);
				self::$dom->endElement();
			} else {
				echo 'Error: Unknown package id '+$startPackage;
			}
		} else {
			self::processModels();
		}
	
		self::$dom->endElement();
	
		
		self::$dom->endDocument();
		self::$dom->flush();
		
		self::$dom = null;
	}

	private function appendAttributes($node)
	{
		$valueNames = $node->getValueNames();
	
		foreach ($valueNames as $currValueName)
		{
			$value = $node->getValue($currValueName);
			if ($value !== null && $value !== '') {
				self::$dom->writeAttribute($currValueName, $value);
			}
		}
	}

	private function processModels()
	{
		$modelIds = self::$persistenceFacade->getOIDs('Model');
		foreach ($modelIds as $currModelId)
		{
			self::check($currModelId);
			$currModel = self::$persistenceFacade->load($currModelId);
		
			self::processModel($currModel);
		}
	}

	private function processModel($currModel) {
		self::$dom->startElement('Model');
	
		self::appendAttributes($currModel);
	
		$currModel->loadChildren();
		$packages = $currModel->getPackageChildren();
		foreach ($packages as $currPackage)
		{
			self::processPackage($currPackage);
		
			$currPackage = $currPackage->getNextSibling();
		}
	
		unset ($currModel);
		self::$dom->endElement();
	}

	private function processPackage($currPackage)
	{
		self::check($currPackage->getId());
		self::$dom->startElement('Package');
	
		self::appendAttributes($currPackage);
	
		$currPackage->loadChildren();
		$children = $currPackage->getChildren();
		foreach ($children as $currChild)
		{
			if ($currChild->getType() != 'Package') {
				self::processNode($currChild);
			} else {
				self::processPackage($currChild);
			}
		
			$currChild = $currChild->getNextSibling();
		}
	
		self::$dom->endElement();
	}

	private function processNode($currNode)
	{
		self::check($currNode->getId());
		self::$dom->startElement($currNode->getType());
	
		self::appendAttributes($currNode);
	
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
						self::$dom->startElement('ManyToMany');
						self::$dom->writeAttribute('targetType', $currParent->getType());
						self::$dom->writeAttribute('targetOid', $currParent->getValue('id'));
						self::$dom->endElement();
					}
				}
			}   /*else if ($currNode->getType() != 'Diagram' && $currChild->getType() == 'Figure')
			 {
			 self::processNode($currChild);
			 }*/
			else {
				self::$dom->startElement('Child');
				self::$dom->writeAttribute('targetType', $currChild->getType());
				self::$dom->writeAttribute('targetOid', $currChild->getValue('id'));
				self::$dom->endElement();
			}
		}
		
		$parents = $currNode->getParents();
		foreach($parents as $currParent) {
			self::$dom->startElement('Parent');
			self::$dom->writeAttribute('targetType', $currParent->getType());
			self::$dom->writeAttribute('targetOid', $currParent->getValue('id'));
			self::$dom->endElement();
		}
	
		self::$dom->endElement();
	}
}

?>