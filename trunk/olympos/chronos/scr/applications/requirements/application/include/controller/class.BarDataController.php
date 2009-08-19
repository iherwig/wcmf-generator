<?php
/*
 * Copyright (c) 2009 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 * 
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code,
 * this entire header must remain intact.
 */

/**
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Wed Aug 19 14:27:53 CEST 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
 require_once(BASE."wcmf/lib/presentation/class.Controller.php");
// PROTECTED REGION ID(application/include/controller/class.BarDataController.php/Import) ENABLED START

require_once (BASE.'wcmf/lib/persistence/class.PersistenceFacade.php');
require_once (BASE.'wcmf/lib/util/class.SessionData.php');

//require_once ('class.BrowserUtil.php');

require_once('php-ofc-library/open-flash-chart.php');

// PROTECTED REGION END

/**
 * @class BarDataController
 * @ingroup Controller
 * @brief @class BarDataController
 * @ingroup Controller
 * @brief Feeds data taken from the current session to the CWB bar chart. 
 * <b>Input actions:</b> - @em barData Feeds the CWB bar chart. 
 * <b>Output actions:</b> - none 
 * 
 * The following configuration settings are defined for this controller:
 *
 * [actionmapping]
 * ??barData = BarDataController
 *
 * [views]
 * 
 * @author 
 * @version 1.0
 */
class BarDataController extends Controller
{
// PROTECTED REGION ID(application/include/controller/class.BarDataController.php/Body) ENABLED START
	public function execute() {
		//$modelOid = $this->_request->getValue('modelOid');
	
		//$exportFile = BrowserUtil::runGenerator($modelOid, 'barchart');

		//include($exportFile);
		$session = &SessionData::getInstance();
		$barchartData = $session->get('barchart'); 
	
		$bars = new bar_stack();
		$bars->set_colours(array('#00ff00', '#ff0000'));
		$bars->set_keys(array(
			new bar_stack_key('#00ff00', 'Conform', 12),
			new bar_stack_key('#ff0000', 'Non-Conform', 12)
		));
		
		
		$labels = array();
		$max = 0;

		foreach($barchartData as $currItem) {
			$bars->append_stack(array($currItem['conform'], $currItem['nonConform']));
			$labels[] = $currItem['label'];
			$max = max($max, $currItem['conform'] + $currItem['nonConform']);
		}
		
		$xAxis = new x_axis();
		$xAxis->set_labels_from_array($labels);
		
		$yAxis = new y_axis();
		$yAxis->set_range(0, round($max * 1.05 + 0,5), round($max / 7));

		$tooltip = new tooltip();
		$tooltip->set_hover();
		
		$chart = new open_flash_chart();
		$chart->set_title(new title('Rule-conformity of objects'));

		$chart->add_element($bars);

		$chart->set_bg_colour('#ffffff');
		$chart->set_x_axis($xAxis);
		$chart->set_y_axis($yAxis);
		$chart->set_tooltip($tooltip);

		echo $chart->toPrettyString();
	
		return false;
	}

	public function hasView()
	{
		return false;
	}

// PROTECTED REGION END

}
?>
