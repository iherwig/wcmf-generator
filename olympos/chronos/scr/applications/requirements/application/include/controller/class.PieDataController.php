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

require_once (BASE.'wcmf/lib/presentation/class.Controller.php');
require_once (BASE.'wcmf/lib/persistence/class.PersistenceFacade.php');
require_once (BASE.'wcmf/lib/util/class.SessionData.php');

//require_once ('class.BrowserUtil.php');

require_once('php-ofc-library/open-flash-chart.php');

class PieDataController extends Controller
{
	public function execute() {
		//$modelOid = $this->_request->getValue('modelOid');
	
		//$exportFile = BrowserUtil::runGenerator($modelOid, 'barchart');

		//include($exportFile);
		$session = &SessionData::getInstance();
		$piechartData = $session->get('piechart'); 
	
		$pie = new pie();
		
		$values = array();

		foreach($piechartData as $currItem) {
			if ($currItem['count'] > 0) {
				$values[] = new pie_value($currItem['count'], $currItem['label']);
			}
		}
		
		$pie->set_values($values);

		$tooltip = new tooltip();
		$tooltip->set_hover();
		
		$chart = new open_flash_chart();
		$chart->set_title(new title('Object count'));

		$chart->add_element($pie);

		$chart->set_bg_colour('#ffffff');
		$chart->set_tooltip($tooltip);

		echo $chart->toPrettyString();
	
		return false;
	}

	public function hasView()
	{
		return false;
	}

}

