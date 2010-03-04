<?php
/*
 * Copyright (c) 2010 The Olympos Development Team.
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
 * This job generates Chronos Web Browser data for all CWM models.
 */
define("BASE", realpath ("../../")."/");
error_reporting(E_ALL | E_PARSE);

require_once(BASE."wcmf/lib/util/class.InifileParser.php");
require_once(BASE."wcmf/lib/util/class.Log.php");

set_include_path(get_include_path().PATH_SEPARATOR.'lib');
require_once('lib/Zend/Http/Client.php');

// get configuration from file
$parser = InifileParser::getInstance();
if (!$parser->parseIniFile('config.ini', true)) {
  handleError($parser->getErrorMsg());
}

/**
 * Job definition
 */
Log::info("Job start", "Statistics");

// STEP 1: Log into CWM
$response = doRequest(array(
  'usr_action' => 'dologin',
  'login' => $parser->getValue('login', 'server'),
  'password' => $parser->getValue('password', 'server')
));

// STEP 2: Get all models
$response = doRequest(array(
  'usr_action' => 'list',
  'completeObjects' => 'DisplayController',
  'type' => 'Model'
));
$models = $response->objects;

// STEP 3: Generate statistics for all models
for ($i=0, $count=sizeof($models); $i<$count; $i++) {
  $model = $models[$i];
  Log::info("Processing model: ".$model->oid, "Statistics");

  // initial request
  $response = doRequest(array(
    'usr_action' => 'loadAllStatisticsOverview',
    'modelOid' => $model->oid,
    'useCache' => false
  ));
  Log::debug($response, "Statistics");
  $stepNumber = $response->stepNumber;
  $numberOfSteps = $response->numberOfSteps;
  
  // loop until done
  while ($stepNumber <= $numberOfSteps) {
    Log::info($stepNumber."/".$numberOfSteps, "Statistics");
    $response = doRequest(array(
      'usr_action' => 'continue',
      'controller' => 'AllBrowserStatisticsController'
    ));
    Log::debug($response, "Statistics");
    $stepNumber = $response->stepNumber;
    $numberOfSteps = $response->numberOfSteps;
  }
  Log::info("Done", "Statistics");
}
Log::info("Job finished", "Statistics");

/**
 * Functions
 */

/**
 * Do a server request with the given post parameters
 * @param postParameters An associative array with parameter names as keys
 * @return A standard object with the response parameters as attributes
 */
function doRequest($postParameters) {
  static $client;
  
  if ($client == null) {
    // setup the HTTP client that does the automatic requests
    $parser = InifileParser::getInstance();
    $url = $parser->getValue('url', 'server');
    Log::info("Setup client for: ".$url, "Statistics");
    $client = new Zend_Http_Client($url, array(
        'keepalive' => true,
        'timeout' => 3600
      )
    );
    $client->setMethod(Zend_Http_Client::POST);
    $client->setCookieJar();
  }
  
  // do request
  $client->resetParameters();
  $postParameters['response_format'] = 'JSON';
  $client->setParameterPost($postParameters);
  $response = $client->request();
  $jsonResponse = json_decode($response->getBody());
  
  // handle errors
  if (!$jsonResponse->success) {
    handleError($jsonResponse->errorMsg);
  }
  return $jsonResponse;
}
/**
 * Handle errors. Prints the message to the console
 * @param msg The message
 */
function handleError($msg) {
  Log::error($msg, "Statistics");
  exit(1);
}
?>