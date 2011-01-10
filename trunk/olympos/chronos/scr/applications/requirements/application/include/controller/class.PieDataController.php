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
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Mon Jan 10 18:22:58 CET 2011. 
 * Manual modifications should be placed inside the protected regions.
 */
 require_once(BASE."wcmf/lib/presentation/class.Controller.php");
// PROTECTED REGION ID(application/include/controller/class.PieDataController.php/Import) ENABLED START
 require_once(BASE."application/include/controller/class.AllBrowserStatisticsController.php");
 require_once('php-ofc-library/open-flash-chart.php');
// PROTECTED REGION END

/**
 * @class PieDataController
 * @ingroup Controller
 * @brief Feeds data taken from a previous run of AllBrowserStatisticsController into the CWB pie chart. 
 * 
 * <b>Input actions:</b> 
 * - @em pieData Feeds the CWB pie chart. 
 * 
 * <b>Output actions:</b> 
 * - none 
 * 
 * @param[in] modelOid The OID of the model to generate statistical Data for. 
 * 
 * The following configuration settings are defined for this controller:
 *
 * [actionmapping]
 * ??pieData = PieDataController
 *
 * [views]
 * 
 * @author 
 * @version 1.0
 */
class PieDataController extends Controller
{
// PROTECTED REGION ID(application/include/controller/class.PieDataController.php/Body) ENABLED START
	public function execute()
	{
		// get the working directory for the model 
		// (the model oid contains '_' instead of ':')
		$modelOid = str_replace('_', ':', $this->_request->getValue('modelOid'));
		$workingDir = AllBrowserStatisticsController::getWorkingDir($modelOid);
		
		// load the generated data form the working directory
		// defines $piechartData
		include($workingDir.'/piechart/browser.dat');
			
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
		Log::debug($chart->toPrettyString(), __CLASS__);
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
