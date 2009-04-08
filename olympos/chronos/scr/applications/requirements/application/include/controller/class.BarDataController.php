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

require_once ('open-flash-chart.php');

class BarDataController extends Controller
{
	public function execute() {
		$modelOid = $this->_request->getValue('modelOid');
	
		//$exportFile = BrowserUtil::runGenerator($modelOid, 'barchart');

		//include($exportFile);
		$session = &SessionData::getInstance();
		$barchartData = $session->get('barchart'); 
	
		$bar_red = new bar_3d(75, 'e42217');
		$bar_red->key('non-conform', 7);
	
		$bar_blue = new bar_3d(75, 'e4aabb');
		$bar_blue->key('conform', 7);

		// create the graph object:
		$g = new graph();
		$g->bg_colour = '#FFFFFF';
		$g->title('Rule-conformity of objects', '{font-size:20px; color: #000000; margin: 5px; background-color: #FFFFFF; padding:5px; padding-left: 20px; padding-right: 20px;}');
	
		//$g->set_data( $data_1 );
		//$g->bar_3D( 75, '#D54C78', '2006', 10 );
		
		//$g->set_data( $data_2 );
		//$g->bar_3D( 75, '#3334AD', '2007', 10 );
		
		$g->set_x_axis_3d(12);
		$g->x_axis_colour('#909090', '#ADB5C7');
		$g->y_axis_colour('#909090', '#ADB5C7');
	
		$g->set_y_max(10);
		$g->y_label_steps(5);
		$g->set_y_legend('', 12, '#736AFF');

		$nonConform = array();
		$conform = array();
		$labels = array();

		foreach($barchartData as $currItem) {
			$nonConform[] = $currItem['nonConform'];
			$conform[] = $currItem['conform'];
			$labels[] = $currItem['label'];
		}

		// add random height bars:
		$bar_red->data = $nonConform;
	
		// add random height bars:
		$bar_blue->data = $conform;
	
		$g->data_sets[] = $bar_red;
		$g->data_sets[] = $bar_blue;
	
		$g->set_x_labels($labels);

		echo $g->render();
	
		return false;
	}

	public function hasView()
	{
		return false;
	}

}

