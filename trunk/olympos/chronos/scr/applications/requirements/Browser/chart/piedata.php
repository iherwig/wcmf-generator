<?php

// generate some random data
srand((double)microtime()*1000000);

$data = array(4,7,10,3,15);


include_once( 'ofc-library/open-flash-chart.php' );
$g = new graph();
$g->bg_colour = '#FFFFFF';

//
// PIE chart, 60% alpha
//
$g->pie(80,'#505050','{font-size: 12px; color: #404040;');
//
// pass in two arrays, one of data, the other data labels
//
$g->pie_values( $data, array('Goals','Requirements','Features','Issues','Other') );
//
// Colours for each slice, in this case some of the colours
// will be re-used (3 colurs for 5 slices means the last two
// slices will have colours colour[0] and colour[1]):
//
$g->pie_slice_colours( array('#e42217', '#f87217', '#fffa40','#b1fb17','#6cc217') ); //('#e42217', '#f87217', '#fffa40', '#b1fb17', '#6cc217')

$g->set_tool_tip( '#val#%' );

$g->title( 'Object types', '{font-size:18px; color: #000000}' );
echo $g->render();
?>