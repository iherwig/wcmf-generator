<?php
/*
 * qWikiOffice Desktop 0.7.1
 * Copyright(c) 2007-2008, Integrated Technologies, Inc.
 * licensing@qwikioffice.com
 * 
 * http://www.qwikioffice.com/license
 */

/* This file is NOT being used.  It could be used if you want to
 * use an AJAX call to get the config
 */

/*
 * need to return something like this:
 * 
 * {
 * 		'success': true,
 * 		'config': {
 * 			'launchers': {
 * 				'autorun': [
 * 					'grid-win'
 * 				],
 * 				'contextmenu': [
 * 					'docs-win',
 * 					'qo-preferences'
 * 				],
 * 				'quickstart': [
 * 					'demo-grid',
 * 					'demo-tabs',
 * 					'demo-acc',
 * 					'demo-layout'
 * 				],
 * 				'shortcuts': [
 *					'demo-grid',
 *					'demo-tabs',
 *					'demo-acc'
 *				],
 * 				'startmenu': [
 * 					'docs-win',
 * 					'demo-grid',
 * 					'demo-tab',
 * 					'demo-acc',
 * 					'demo-layout',
 * 					'bogus-menu'
 * 				]
 * 			},
 * 			'styles': {
 * 				'backgroundcolor': 'f9f9f9',
 * 				'theme': {
 *					'id': 2,
 *					'name': 'Vista Black',
 *					'filepath': 'resources/themes/xtheme-vistablack/css/xtheme-vistablack.css'
 *				},
 * 				'transparency': false,
 * 				'wallpaper': {
 *					'id': 1,
 *					'name': 'qWikiOffice',
 *					'filepath': 'resources/wallpapers/qwikioffice.jpg'
 *				},
 * 				'wallpaperposition': 'center'
 * 			}
 * 		}
 * }
 */

require_once("os.php");	
if(class_exists('os')){
	$os = new os();
	$response = $os->get_configuration();
	
	print $response;
}
?>