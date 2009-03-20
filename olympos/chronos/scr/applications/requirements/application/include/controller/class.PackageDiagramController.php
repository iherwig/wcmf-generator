<?php
require_once (BASE."wcmf/lib/presentation/class.Controller.php");
require_once (BASE."wcmf/lib/persistence/class.PersistenceFacade.php");
require_once (BASE."wcmf/lib/persistence/class.ObjectQuery.php");
//require_once (BASE."wcmf/lib/model/class.Node.php");
//require_once (BASE."wcmf/lib/security/class.RightsManager.php");

class PackageDiagramController extends Controller
{
	var $currentUser ; 
	var $currentTimestamp ; 
	var $currentReadableTimestamp ; 
	
	function hasView()
	{
		return true;
	}

	function executeKernel()
	{	
		// execute this code only if the action is autocomplete
		if ($this->_request->getAction() == 'packdiagr') {
		
			//init values
			$packageid = $this->_request->getValue('pid');
			//echo '<br/> packageid: '; print_r($packageid);
			$this->currentUser = self::getCurrentUser();
			$this->currentTimestamp = self::getTimeStamp();
			$this->currentReadableTimestamp = self::makeReadableTimestamp($this->currentTimestamp);
			$persistenceFacade = & PersistenceFacade::getInstance(); // get the persistence information (database)
		
			// search all elems with fk_package_id = $packageid
			$ObjPackage = $persistenceFacade->load('Package:'.$packageid);
			//echo '<br/>ObjPackage: '; print_r($ObjPackage);
			foreach($ObjPackage as $k=>$v){
				if($k == '_properties'){
					foreach($v as $k=>$v){
						if($k == 'childoids'){
							$packagechildoids = $v;
						}
					}
				}
			}
			//echo '<br/> packagename: '; print_r($ObjPackage->getName());
			
			// create new diagram entry
			$objQueryDiagrWrite = & $persistenceFacade->createObjectQuery('Diagram');
			$objTplDiagrWrite = & $objQueryDiagrWrite->getObjectTemplate('Diagram'); //new row
			$objTplDiagrWrite->setValue('Name', $ObjPackage->getName(), DATATYPE_ATTRIBUTE);
			$objTplDiagrWrite->setValue('fk_package_id', $packageid , DATATYPE_IGNORE);
			$persistenceFacade->save($objTplDiagrWrite);
			
			// read diagramid of created diagram
			$diagramid = $objTplDiagrWrite->getValue('id');
			//echo '<br/> diagramid: '; print_r($diagramid);
			
			//for all childs of package - not diagram create figure and set position
			$posx = 5050;
			$posy = 5050;
			$posct = 0;
			foreach($packagechildoids as $k=>$v){
				
				$oid = strval($v);
				$chldtype = substr($oid,0,strpos($oid,':'));
				$chldid = substr($oid,strpos($oid,':')+1);
				
				$posct = $posct +1;
				$posx = $posx + 100;
				if( $posct > 9 ){
					$posy = $posy + 100;
					$posx = $posx - 1000;
					$posct = 0;
				};
				
				if( $chldtype !== 'Diagram'){
					
					$ObjCurVal = $persistenceFacade->load($v);
					// e.g. Goal echo '<br/> chldtype: '.$chldtype;
					//create figure and set fk_diagram_id to diagramid
					$objQueryFigureWrite = & $persistenceFacade->createObjectQuery('Figure');
					$objTplFigureWrite = & $objQueryFigureWrite->getObjectTemplate('Figure'); //new row
					$objTplFigureWrite->setValue('fk_diagram_id', $diagramid , DATATYPE_IGNORE);
					$objTplFigureWrite->setValue('fk_'.strtolower($chldtype).'_id', $chldid , DATATYPE_IGNORE);
					$objTplFigureWrite->setValue('Width', 50, DATATYPE_ATTRIBUTE);
					$objTplFigureWrite->setValue('Height', 50, DATATYPE_ATTRIBUTE);
					$objTplFigureWrite->setValue('PositionX', $posx, DATATYPE_ATTRIBUTE);
					$objTplFigureWrite->setValue('PositionY', $posy, DATATYPE_ATTRIBUTE);
					$persistenceFacade->save($objTplFigureWrite);
					
				}
			}
					
			//	Set the next action
			$this->_response->setAction('ok');
			//	Response
			$this->_response->setValue('ok', 'ok');
		
		};
	
		//	Success
		return false;
	}

	private function getCurrentUser() {
	
		$rightsManager = RightsManager::getInstance();
		$authUser = & $rightsManager->getAuthUser();
		$currUser = $authUser->getLogin();
	
		return $currUser;
	}

	private function getTimeStamp() {
	
		$now = microtime();
		return substr($now, -10).substr($now, 2, 6);
	
	}

	private function makeReadableTimestamp($unreadableTimestamp) {
	
		$lastpart = substr($unreadableTimestamp, 0, 10);
		$firstpart = substr($unreadableTimestamp, -6);
		$prepart = '0.';
		$betwpart = '00 ';
		$unixTimestamp = $prepart.$firstpart.$betwpart.$lastpart;
		$readableTimestamp = date("Y-m-d H:i:s", $lastpart);
	
		return $readableTimestamp;
	}
	
}

?>
