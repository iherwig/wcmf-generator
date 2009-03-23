<?php

include_once( 'ofc-library/open-flash-chart.php' );
srand((double)microtime()*1000000);


$bar_red = new bar_3d( 75, 'e42217' );
$bar_red->key( 'non-conform', 7 );

// add random height bars:

  $bar_red->data[]=2;
  $bar_red->data[]=6;
  $bar_red->data[]=3;
  $bar_red->data[]=2;
  $bar_red->data[]=7;
  $bar_red->data[]=3;
  $bar_red->data[]=0;

//
// create a 2nd set of bars:
//
$bar_blue = new bar_3d( 75, 'fffa40' );
$bar_blue->key( 'conform', 7 );

// add random height bars:

  
  $bar_blue->data=array(1,4,4,0,3,1,0);

// create the graph object:
$g = new graph();
$g->bg_colour = '#FFFFFF';
$g->title( 'Rule-conformity of objects', '{font-size:20px; color: #000000; margin: 5px; background-color: #FFFFFF; padding:5px; padding-left: 20px; padding-right: 20px;}' );

//$g->set_data( $data_1 );
//$g->bar_3D( 75, '#D54C78', '2006', 10 );

//$g->set_data( $data_2 );
//$g->bar_3D( 75, '#3334AD', '2007', 10 );

$g->data_sets[] = $bar_red;
$g->data_sets[] = $bar_blue;

$g->set_x_axis_3d( 12 );
$g->x_axis_colour( '#909090', '#ADB5C7' );
$g->y_axis_colour( '#909090', '#ADB5C7' );

$g->set_x_labels( array( 'Goals','Requirements','Features','Issues','UseCases','BusinessPartners','Workers' ) );
$g->set_y_max( 10 );
$g->y_label_steps( 5 );
$g->set_y_legend( '', 12, '#736AFF' );
echo $g->render();
?>