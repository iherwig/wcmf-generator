<?php
/**
 * wCMF - wemove Content Management Framework
 * Copyright (C) 2005-2009 wemove digital solutions GmbH
 *
 * Licensed under the terms of any of the following licenses
 * at your choice:
 *
 * - GNU Lesser General Public License (LGPL)
 *   http://www.gnu.org/licenses/lgpl.html
 * - Eclipse Public License (EPL)
 *   http://www.eclipse.org/org/documents/epl-v10.php
 *
 * See the license.txt file distributed with this work for
 * additional information.
 *
 * $Id$
 */
require_once(BASE."wcmf/lib/util/class.JSONUtil.php");
require_once(BASE."wcmf/lib/presentation/format/class.HierarchicalFormat.php");
require_once(BASE."application/dionysos/include/lib/class.DionysosNodeSerializer.php");

/**
 * DionysosFormatter collects the response data from all executed controllers
 * into one response array and returns it all at once at the end of
 * script execution. This prevents from having multiple junks of json
 * from each controller response that can't be decoded by clients.
 */
$GLOBALS['gDionysosData'] = array();
$GLOBALS['gDionysosUsed'] = false;
function gPrintDionysosResult()
{
  if (isset($GLOBALS['gDionysosUsed']))
  {
    $data = $GLOBALS['gDionysosData'];
    if ($data != null)
    {
      // set role names to lowercase
      if (Log::isDebugEnabled('DionysosFormat')) {
        Log::debug("data before dionysos post processing: ".StringUtil::getDump($data), 'DionysosFormat');
      }
      foreach ($data as $key => $value) {
        $data[$key] = gPostProcessDionysosResult($key, $value);
      }
      $encoded = JSONUtil::encode($data);
      if (Log::isDebugEnabled('DionysosFormat'))
      {
        Log::debug($data, 'DionysosFormat');
        Log::debug($encoded, 'DionysosFormat');
      }
      print($encoded);
    }
  }
}
function gPostProcessDionysosResult($key, $item)
{
  // change role names to first char lower
  if (is_array($item)) {
    if (Log::isDebugEnabled('DionysosFormat')) {
      Log::error("process array item: ".$key." ".StringUtil::getDump($item), 'DionysosFormat');
    }
    foreach ($item as $name => $value) {
      $value = gPostProcessDionysosResult($name, $value);
      $item[$name] = $value;
      if (Log::isDebugEnabled('DionysosFormat')) {
        Log::debug("check attribute: ".$name." => ".StringUtil::getDump($value), 'DionysosFormat');
      }
      // search for relation attributes
      if (is_array($value) && is_string($name) && (
           (gIsSerializedNode($value)) // single valued relation
        || (sizeof($value) > 0 && gIsSerializedNode($value[0])) // multi valued relation
      ))
      {
	    $newRolename = lcfirst($name);
        if (Log::isDebugEnabled('DionysosFormat')) {
          Log::debug($name." is relation -> change rolename: ".$newRolename, 'DionysosFormat');
        }
	    $item[$newRolename] = $value;
        unset($item[$name]);
      }
    }
  }
  return $item;
}
function gIsSerializedNode($array)
{
  return isset($array['oid']) && isset($array['className']) && !isset($array['action']);
}
register_shutdown_function('gPrintDionysosResult');

/**
 * @class DionysosFormat
 * @ingroup Format
 * @brief DionysosFormat realizes the JSON request/response format compliant to the
 * Dionysos specification.
 *
 * @author ingo herwig <ingo@wemove.com>
 */
class DionysosFormat extends HierarchicalFormat
{
  /**
   * @see HierarchicalFormat::beforeDeserialize()
   */
  function beforeDeserialize(&$data)
  {
    // decode the json data into an array
    foreach(array_keys($data) as $key) {
      $data[$key] = &JSONUtil::decode($data[$key], true);
    }
    // combine oid, attributes key into one array for node deserialization
    if (isset($data['oid']) && isset($data['attributes'])) {
      $data[$data['oid']] = array('oid' => $data['oid'], 'attributes' => $data['attributes']);
    }
  }
  /**
   * Callback function for array_walk_recursive. De-/Serializes any Node instances
   * using the function given in method parameter.
   * @param value The array value
   * @param key The array key
   * @param method The method to apply to each value
   */
  function processValues(&$value, $key, $method)
  {
    if (EncodingUtil::isUtf8($value)) {
      $value = EncodingUtil::convertCp1252Utf8ToIso($value);
    }
    if (strpos($method, 'deserialize') === 0 && $this->isSerializedNode($key, $value))
    {
      $node = &$this->$method($key, $value);
      if ($key == $node->getOID()) {
        $value = $node;
      }
      else {
        $value[$node->getOID()] = $node;
      }
    }
    if (strpos($method, 'serialize') === 0 && $this->isDeserializedNode($key, $value)) {
      $value = $this->$method($key, $value);
    }
  }

  /**
   * @see HierarchicalFormat::afterSerialize()
   */
  function afterSerialize(&$data)
  {
    // merge data into global data array
    // new values override old
    $GLOBALS['gDionysosData'] = array_merge($GLOBALS['gDionysosData'], $data);
    $GLOBALS['gDionysosUsed'] = true;
  }

  /**
   * @see HierarchicalFormat::isSerializedNode()
   */
  function isSerializedNode($key, &$value)
  {
    $tmpValue = $value;
    if (is_object($tmpValue)) {
      $tmpValue = (array)$tmpValue;
    }
    $syntaxOk = (is_array($tmpValue) && isset($tmpValue['oid']) && isset($tmpValue['attributes']));
    // check for oid variables
    if ($syntaxOk && preg_match('/^\{.+\}$/', $tmpValue['oid'])) {
      return false;
    }
    return $syntaxOk;
  }

  /**
   * @see HierarchicalFormat::serializeNode()
   */
  function serializeNode($key, &$value)
  {
    // use DionysosNodeSerializer to serialize
    $serializedNode = DionysosNodeSerializer::serializeNode($value);
    return $serializedNode;
  }

  /**
   * @see HierarchicalFormat::deserializeNode()
   */
  function &deserializeNode($key, &$value)
  {
    if (is_array($value)) {
      $oid = $value['oid'];
    }
    if (is_object($value)) {
      $oid = $value->oid;
    }
    if (!PersistenceFacade::isValidOID($oid)) {
      throw new DionysosException(null, null, 'The object id '.$oid.' is unknown', DionysosException::OID_INVALID);
    }

    $type = PersistenceFacade::getOIDParameter($oid, 'type');
    if (!PersistenceFacade::isKnownType($type)) {
      throw new DionysosException(null, null, 'Entity type '.$type.' is unknown', DionysosException::CLASS_NAME_INVALID);
    }

    // use DionysosNodeSerializer to deserialize
    $node = &DionysosNodeSerializer::deserializeNode($type, $value, false);
    $node->setOID($oid);
    if (Log::isDebugEnabled(__CLASS__)) {
      Log::debug($node->toString(), __CLASS__);
    }
    return $node;
  }
}
?>