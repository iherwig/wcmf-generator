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

	const INI_SECTION = 'generator';
	const INI_EXECUTABLE = 'executable';

	private static $TEMP_PATHS = array('/tmp', '/temp', '/var/tmp', '/var/temp', 'C:/temp', 'C:/tmp', 'C:/windows/temp');
	private $tempPath;

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
	
		$tmpUwmExportPath = $this->tempName();
		
		$this->exportXml($tmpUwmExportPath);
		
	    $parser = InifileParser::getInstance();
	    if (($params = $parser->getSection(self::INI_SECTION)) === false) {
	    	Message::error($parser->getErrorMsg(), __FILE__, __LINE__);
		}
		$executablePath = $params[self::INI_EXECUTABLE];
	
		$cwd = dirname(realpath($executablePath));
		$executable = basename($executablePath);
		
		$numSlashes = substr_count(str_replace('\\', '/', $cwd), '/');
		$relativeCwdPath = '';
		for ($i = 0; $i < $numSlashes; $i++) {
			$relativeCwdPath .= '../';
		}
		$tmpUmlPath = $this->tempName();
		//echo "tmpUmlPath: '$tmpUmlPath'<br/>";
		$tmpUmlRelativePath = $relativeCwdPath . preg_replace('/^[a-zA-Z]:\\\\/', '', $tmpUmlPath);
		
		$tmpPropertiesPath = $this->tempName();
		$propertiesFile = fopen($tmpPropertiesPath, 'w');
		fwrite($propertiesFile, "inputUri = file://$tmpUwmExportPath\n");
		fwrite($propertiesFile, "outputRelativePath = $tmpUmlRelativePath\n");
		fclose($propertiesFile);

		//header('Content-type: text/plain');
		header('Content-type: application/octet-stream');
		header('Content-Disposition: attachment; filename="uwm-export.uml2"');
	
		$this->check("start generator");
	
		$descriptorspec = array (
		0=> array ('pipe', 'r'), // stdin is a pipe that the child will read from
		1=> array ('pipe', 'w'), // stdout is a pipe that the child will write to
		2=> array ('pipe', 'w')
		);
	
		$cmd = "java -Djava.library.path=./lib/ -jar $executable templates/uwm/uwm2uml2.oaw -basePath=. \"-propertyFile=$tmpPropertiesPath\"";
	
		//echo "cwd: $cwd<br />\n";
		//echo "cmd: $cmd<br />\n";

		mkdir($tmpUmlPath);

		$process = proc_open($cmd, $descriptorspec, $pipes, $cwd, $env);
	
		if (is_resource($process)) {
			// $pipes now looks like this:
			// 0 => writeable handle connected to child stdin
			// 1 => readable handle connected to child stdout
			
			fclose($pipes[0]);
		
			//echo 'Output: ', stream_get_contents($pipes[1]), "\n";
			fclose($pipes[1]);
		
			//echo 'Error: ', stream_get_contents($pipes[2]), "\n";
			fclose($pipes[2]);
		
			// It is important that you close any pipes before calling
			// proc_close in order to avoid a deadlock
			$return_value = proc_close($process);
		
			//echo "command returned $return_value\n";
		}
		$this->check('Generator finished');
		
		$exportFile = "$tmpUmlPath/uml-output.uml";
		
		readfile($exportFile);
		
		$this->check('File written to output');

		unlink($tmpUwmExportPath);
		unlink($tmpPropertiesPath);
		unlink($exportFile);
		rmdir($tmpUmlPath);
		
		$this->check("finished");
	
		return false;
	}

	private function exportXml($tmpUwmExportPath) {
		$this->dom = new XMLWriter();
		//$this->dom->setIndent(true);
		//$this->dom->setIndentString("\t");
		$this->dom->openURI($tmpUwmExportPath);
		$this->dom->startDocument($this->XML_VERSION, $this->ENCODING, $this->STANDALONE);
	
		$this->dom->startElement("UwmExport");
	
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
				$this->dom->startElement('Model');
				$this->processPackage($currPackage);
				$this->dom->endElement();
			} else {
				echo 'Error: Unknown package id '+$startPackage;
			}
		} else {
			$this->processModels();
		}
	
		$this->dom->endElement();
	
		
		$this->dom->endDocument();
		$this->dom->flush();
		
		unset($this->dom);
	}

	private function appendAttributes($node)
	{
		$valueNames = $node->getValueNames();
	
		foreach ($valueNames as $currValueName)
		{
			$value = $node->getValue($currValueName);
			if ($value !== null && $value !== '') {
				$this->dom->writeAttribute($currValueName, $value);
			}
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
			if ($currChild->getType() != 'Package') {
				$this->processNode($currChild);
			} else {
				$this->processPackage($currChild);
			}
		
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
						$this->dom->startElement('ManyToMany');
						$this->dom->writeAttribute('targetType', $currParent->getType());
						$this->dom->writeAttribute('targetOid', $currParent->getValue('id'));
						$this->dom->endElement();
					}
				}
			}   /*else if ($currNode->getType() != 'Diagram' && $currChild->getType() == 'Figure')
			 {
			 $this->processNode($currChild);
			 }*/
			else {
				$this->dom->startElement('Child');
				$this->dom->writeAttribute('targetType', $currChild->getType());
				$this->dom->writeAttribute('targetOid', $currChild->getValue('id'));
				$this->dom->endElement();
			}
		}
		
		$parents = $currNode->getParents();
		foreach($parents as $currParent) {
			$this->dom->startElement('Parent');
			$this->dom->writeAttribute('targetType', $currParent->getType());
			$this->dom->writeAttribute('targetOid', $currParent->getValue('id'));
			$this->dom->endElement();
		}
	
		$this->dom->endElement();
	}

	private function tempName() {
		$tempPath = $this->getTempPath();
		
		$result = '';
		
		do {
			$rand = rand(0, 0xffffff);
			$result = "$tempPath/uwm$rand.tmp";
		} while (file_exists($result));

		return $result;
	}
	
	private function getTempPath() {
		if (!$this->tempPath) {
			for ($i = 0; $i < count(self::$TEMP_PATHS); $i++) {
				$currPath = self::$TEMP_PATHS[$i];
				
				if (is_dir($currPath)) {
					$this->tempPath = $currPath;
					break;
				}
			}
		}
		if (!$this->tempPath) {
			$this->tempPath = '/tmp';
		}
		
		return $this->tempPath;
	}

	public function hasView()
	{
		return false;
	}

}

?>
