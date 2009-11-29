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
  if (array_key_exists('gDionysosUsed', $GLOBALS))
  {
    $data = $GLOBALS['gDionysosData'];
    if ($data != null)
    {
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
    if (array_key_exists('oid', $data) && array_key_exists('attributes', $data)) {
      $data[$data['oid']] = array('oid' => $data['oid'], 'attributes' => $data['attributes']);
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
    $syntaxOk = ((is_object($value) || is_array($value)) && array_key_exists('oid', $value) && array_key_exists('attributes', $value));
    // check for oid variables
    if ($syntaxOk && preg_match('/^\{.+\}$/', $value['oid'])) {
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
    return DionysosNodeSerializer::serializeNode($value, false);
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
