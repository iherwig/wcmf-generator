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

/**
 * @class 
 * @ingroup 
 * @brief throws away undesirable formatting of html fields content and changes special characters
 * 
 * <b>Input actions:</b>
 * - @em 
 *
 * <b>Output actions:</b>
 * - @em 
 * 
 * @param[in] source html text from field
 * @param[out] decodedhtmltext new formatted html text to replace field content
 * 
 * @author 	Sabine 
 */
class HtmlSanitizer {

	const ALLOWED = '<b><u><i><p><ul><ol><li><br><span>';
	const SEARCHWHOLESPAN = "/(<SPAN)(([ .]*[\w-]*[=]['\"]*[\w: -;.]*['\"]*[ .]*)*)([>])([<>\/\w: -;.]*)(<\/SPAN>)/i";
	const SEARCHWHOLEELSE = "/(<)(b|u|i|p|ul|ol|li|br)(([ .]*[\w-]*[=]['\"]*[\w: -;.]*['\"]*[ .]*)*)(>|\/>)/i";
	const SEARCHHTMLPARTS = "/(&)([\w]*)(;)/";
	
	private static $transTable;
	
	public static function sanitize($source) {
	
		$transTable = get_html_translation_table(HTML_ENTITIES);
		$transTable = self::get_html_translation_table_WordCodes($transTable); // add for translations of copy paste from word
		$transTable = self::get_html_translation_table_SomeMoreCodes($transTable); // add for some more codes

		$strippedtext = strip_tags($source, self::ALLOWED);
		$spanattribedtext = preg_replace_callback(self::SEARCHWHOLESPAN, array('HtmlSanitizer','cbspan'), $strippedtext);
		$elseattribedtext = preg_replace_callback(self::SEARCHWHOLEELSE, array('HtmlSanitizer','cbelse'), $spanattribedtext);
		$decodedhtmltext = preg_replace_callback(self::SEARCHHTMLPARTS, array('HtmlSanitizer','numeric_entities'), $elseattribedtext);
	
		return $decodedhtmltext;
	}

	private static function cbelse($cpelsematches) {
	
		if (substr($cpelsematches[3], -1) == "/") {
			$ret = $cpelsematches[1].$cpelsematches[2]."/".$cpelsematches[5];
		} else {
			$ret = $cpelsematches[1].$cpelsematches[2].$cpelsematches[5];
		}
		return $ret;
	}

	private static function cbspan($cpspanmatches) {
		$searchclassattribs = "/(CLASS=['\"]*[\w]*['\"]*)/i";
	
		preg_match_all($searchclassattribs, $cpspanmatches[2], $attribs);
		return
		$cpspanmatches[1].
		' '.
		$attribs[0][0].
		$cpspanmatches[4].$cpspanmatches[5].$cpspanmatches[6];
	}

	private static function numeric_entities($nematches) {
		$searchthmlparts = "/(&)([\w]*)(;)/";
		$stringmtch = $nematches[1].$nematches[2].$nematches[3];
		$mapping = array ();
		$table = self::$transTable;
		foreach ($table as $char=>$entity) {
			$mapping[$entity] = '&#'.ord($char).';';
		}
	
		$changechar = str_replace(array_keys($mapping), $mapping, $stringmtch);
		return preg_replace($searchthmlparts, '', $changechar);
	}

	private static function get_html_translation_table_WordCodes($trans) {
	
		// to add for translations of copy paste from word
		$trans[chr(130)] = '&sbquo;'; // Single Low-9 Quotation Mark
		$trans[chr(131)] = '&fnof;'; // Latin Small Letter F With Hook
		$trans[chr(132)] = '&bdquo;'; // Double Low-9 Quotation Mark
		$trans[chr(133)] = '&hellip;'; // Horizontal Ellipsis
		$trans[chr(134)] = '&dagger;'; // Dagger
		$trans[chr(135)] = '&Dagger;'; // Double Dagger
		$trans[chr(136)] = '&circ;'; // Modifier Letter Circumflex Accent
		$trans[chr(137)] = '&permil;'; // Per Mille Sign
		$trans[chr(138)] = '&Scaron;'; // Latin Capital Letter S With Caron
		$trans[chr(139)] = '&lsaquo;'; // Single Left-Pointing Angle Quotation Mark
		$trans[chr(140)] = '&OElig;    '; // Latin Capital Ligature OE
		$trans[chr(145)] = '&lsquo;'; // Left Single Quotation Mark
		$trans[chr(146)] = '&rsquo;'; // Right Single Quotation Mark
		$trans[chr(147)] = '&ldquo;'; // Left Double Quotation Mark
		$trans[chr(148)] = '&rdquo;'; // Right Double Quotation Mark
		$trans[chr(149)] = '&bull;'; // Bullet
		$trans[chr(150)] = '&ndash;'; // En Dash
		$trans[chr(151)] = '&mdash;'; // Em Dash
		$trans[chr(152)] = '&tilde;'; // Small Tilde
		$trans[chr(153)] = '&trade;'; // Trade Mark Sign
		$trans[chr(154)] = '&scaron;'; // Latin Small Letter S With Caron
		$trans[chr(155)] = '&rsaquo;'; // Single Right-Pointing Angle Quotation Mark
		$trans[chr(156)] = '&oelig;'; // Latin Small Ligature OE
		$trans[chr(159)] = '&Yuml;'; // Latin Capital Letter Y With Diaeresis
	
		//	 "\x82", "\x84", "\x85", "\x91", "\x92", "\x93", "\x94", "\x95", "\x96",  "\x97",
		//	 "&#8218;", "&#8222;", "&#8230;", "&#8216;", "&#8217;", "&#8220;", "&#8221;", "&#8226;", "&#8211;", "&#8212;"
		
		
		ksort($trans);
		return $trans;
	}

	private static function get_html_translation_table_SomeMoreCodes($trans) {
	
		/* add for some more codes */
		$trans[chr(39)] = '&apos;';
		$trans[chr(45)] = '&minus;';
		$trans[chr(94)] = '&circ;';
		$trans[chr(126)] = '&tilde;';
		$trans[chr(138)] = '&Scaron;';
		$trans[chr(139)] = '&lsaquo;';
		$trans[chr(140)] = '&OElig;';
		$trans[chr(145)] = '&lsquo;';
		$trans[chr(146)] = '&rsquo;';
		$trans[chr(147)] = '&ldquo;';
		$trans[chr(148)] = '&rdquo;';
		$trans[chr(149)] = '&bull;';
		$trans[chr(150)] = '&ndash;';
		$trans[chr(151)] = '&mdash;';
		$trans[chr(152)] = '&tilde;';
		$trans[chr(153)] = '&trade;';
		$trans[chr(154)] = '&scaron;';
		$trans[chr(155)] = '&rsaquo;';
		$trans[chr(156)] = '&oelig;';
		$trans[chr(159)] = '&Yuml;';
		$trans[chr(255)] = '&yuml;';
		$trans[chr(338)] = '&OElig;';
		$trans[chr(339)] = '&oelig;';
		$trans[chr(352)] = '&Scaron;';
		$trans[chr(353)] = '&scaron;';
		$trans[chr(376)] = '&Yuml;';
		$trans[chr(402)] = '&fnof;';
		$trans[chr(710)] = '&circ;';
		$trans[chr(732)] = '&tilde;';
		$trans[chr(913)] = '&Alpha;';
		$trans[chr(914)] = '&Beta;';
		$trans[chr(915)] = '&Gamma;';
		$trans[chr(916)] = '&Delta;';
		$trans[chr(917)] = '&Epsilon;';
		$trans[chr(918)] = '&Zeta;';
		$trans[chr(919)] = '&Eta;';
		$trans[chr(920)] = '&Theta;';
		$trans[chr(921)] = '&Iota;';
		$trans[chr(922)] = '&Kappa;';
		$trans[chr(923)] = '&Lambda;';
		$trans[chr(924)] = '&Mu;';
		$trans[chr(925)] = '&Nu;';
		$trans[chr(926)] = '&Xi;';
		$trans[chr(927)] = '&Omicron;';
		$trans[chr(928)] = '&Pi;';
		$trans[chr(929)] = '&Rho;';
		$trans[chr(931)] = '&Sigma;';
		$trans[chr(932)] = '&Tau;';
		$trans[chr(933)] = '&Upsilon;';
		$trans[chr(934)] = '&Phi;';
		$trans[chr(935)] = '&Chi;';
		$trans[chr(936)] = '&Psi;';
		$trans[chr(937)] = '&Omega;';
		$trans[chr(945)] = '&alpha;';
		$trans[chr(946)] = '&beta;';
		$trans[chr(947)] = '&gamma;';
		$trans[chr(948)] = '&delta;';
		$trans[chr(949)] = '&epsilon;';
		$trans[chr(950)] = '&zeta;';
		$trans[chr(951)] = '&eta;';
		$trans[chr(952)] = '&theta;';
		$trans[chr(953)] = '&iota;';
		$trans[chr(954)] = '&kappa;';
		$trans[chr(955)] = '&lambda;';
		$trans[chr(956)] = '&mu;';
		$trans[chr(957)] = '&nu;';
		$trans[chr(958)] = '&xi;';
		$trans[chr(959)] = '&omicron;';
		$trans[chr(960)] = '&pi;';
		$trans[chr(961)] = '&rho;';
		$trans[chr(962)] = '&sigmaf;';
		$trans[chr(963)] = '&sigma;';
		$trans[chr(964)] = '&tau;';
		$trans[chr(965)] = '&upsilon;';
		$trans[chr(966)] = '&phi;';
		$trans[chr(967)] = '&chi;';
		$trans[chr(968)] = '&psi;';
		$trans[chr(969)] = '&omega;';
		$trans[chr(977)] = '&thetasym;';
		$trans[chr(978)] = '&upsih;';
		$trans[chr(982)] = '&piv;';
		$trans[chr(8194)] = '&ensp;';
		$trans[chr(8195)] = '&emsp;';
		$trans[chr(8201)] = '&thinsp;';
		$trans[chr(8204)] = '&zwnj;';
		$trans[chr(8205)] = '&zwj;';
		$trans[chr(8206)] = '&lrm;';
		$trans[chr(8207)] = '&rlm;';
		$trans[chr(8211)] = '&ndash;';
		$trans[chr(8212)] = '&mdash;';
		$trans[chr(8216)] = '&lsquo;';
		$trans[chr(8217)] = '&rsquo;';
		$trans[chr(8218)] = '&sbquo;';
		$trans[chr(8220)] = '&ldquo;';
		$trans[chr(8221)] = '&rdquo;';
		$trans[chr(8222)] = '&bdquo;';
		$trans[chr(8224)] = '&dagger;';
		$trans[chr(8225)] = '&Dagger;';
		$trans[chr(8226)] = '&bull;';
		$trans[chr(8230)] = '&hellip;';
		$trans[chr(8240)] = '&permil;';
		$trans[chr(8242)] = '&prime;';
		$trans[chr(8243)] = '&Prime;';
		$trans[chr(8249)] = '&lsaquo;';
		$trans[chr(8250)] = '&rsaquo;';
		$trans[chr(8254)] = '&oline;';
		$trans[chr(8260)] = '&frasl;';
		$trans[chr(8364)] = '&euro;';
		$trans[chr(8465)] = '&image;';
		$trans[chr(8472)] = '&weierp;';
		$trans[chr(8476)] = '&real;';
		$trans[chr(8482)] = '&trade;';
		$trans[chr(8501)] = '&alefsym;';
		$trans[chr(8592)] = '&larr;';
		$trans[chr(8593)] = '&uarr;';
		$trans[chr(8594)] = '&rarr;';
		$trans[chr(8595)] = '&darr;';
		$trans[chr(8596)] = '&harr;';
		$trans[chr(8629)] = '&crarr;';
		$trans[chr(8656)] = '&lArr;';
		$trans[chr(8657)] = '&uArr;';
		$trans[chr(8658)] = '&rArr;';
		$trans[chr(8659)] = '&dArr;';
		$trans[chr(8660)] = '&hArr;';
		$trans[chr(8704)] = '&forall;';
		$trans[chr(8706)] = '&part;';
		$trans[chr(8707)] = '&exist;';
		$trans[chr(8709)] = '&empty;';
		$trans[chr(8711)] = '&nabla;';
		$trans[chr(8712)] = '&isin;';
		$trans[chr(8713)] = '&notin;';
		$trans[chr(8715)] = '&ni;';
		$trans[chr(8719)] = '&prod;';
		$trans[chr(8721)] = '&sum;';
		$trans[chr(8722)] = '&minus;';
		$trans[chr(8727)] = '&lowast;';
		$trans[chr(8730)] = '&radic;';
		$trans[chr(8733)] = '&prop;';
		$trans[chr(8734)] = '&infin;';
		$trans[chr(8736)] = '&ang;';
		$trans[chr(8743)] = '&and;';
		$trans[chr(8744)] = '&or;';
		$trans[chr(8745)] = '&cap;';
		$trans[chr(8746)] = '&cup;';
		$trans[chr(8747)] = '&int;';
		$trans[chr(8756)] = '&there4;';
		$trans[chr(8764)] = '&sim;';
		$trans[chr(8773)] = '&cong;';
		$trans[chr(8776)] = '&asymp;';
		$trans[chr(8800)] = '&ne;';
		$trans[chr(8801)] = '&equiv;';
		$trans[chr(8804)] = '&le;';
		$trans[chr(8805)] = '&ge;';
		$trans[chr(8834)] = '&sub;';
		$trans[chr(8835)] = '&sup;';
		$trans[chr(8836)] = '&nsub;';
		$trans[chr(8838)] = '&sube;';
		$trans[chr(8839)] = '&supe;';
		$trans[chr(8853)] = '&oplus;';
		$trans[chr(8855)] = '&otimes;';
		$trans[chr(8869)] = '&perp;';
		$trans[chr(8901)] = '&sdot;';
		$trans[chr(8968)] = '&lceil;';
		$trans[chr(8969)] = '&rceil;';
		$trans[chr(8970)] = '&lfloor;';
		$trans[chr(8971)] = '&rfloor;';
		$trans[chr(9001)] = '&lang;';
		$trans[chr(9002)] = '&rang;';
		$trans[chr(9674)] = '&loz;';
		$trans[chr(9824)] = '&spades;';
		$trans[chr(9827)] = '&clubs;';
		$trans[chr(9829)] = '&hearts;';
		$trans[chr(9830)] = '&diams;';
	
		ksort($trans);
		return $trans;
	}

}

?>
