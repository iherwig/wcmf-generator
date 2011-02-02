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
require_once(BASE."wcmf/lib/persistence/class.PersistenceFacade.php");
require_once(BASE."wcmf/lib/model/class.Node.php");
require_once(BASE."wcmf/lib/model/class.NodeIterator.php");
require_once(BASE."wcmf/lib/model/class.NodeProcessor.php");

/**
 * @class DionysosNodeSerializer
 * @ingroup Util
 * @brief DionysosNodeSerializer provides helper functions to de-/serialize Nodes.
 *
 * @author ingo herwig <ingo@wemove.com>
 */
class DionysosNodeSerializer
{
  static $_serializedOIDs = array();

  /**
   * Deserialize a Node from serialized data. Only values given in data are be set.
   * @param type The type the data belong to
   * @param data The serialized node data (either as object or as array)
   * @param parent The parent node [default: null]
   * @return A reference to the node deserialized from the data or null if the type does not exist
   */
  function &deserializeNode($type, $data, $parent=null)
  {
    if (PersistenceFacade::isKnownType($type))
    {
      $persistenceFacade = &PersistenceFacade::getInstance();
      // don't create all values by default (-> don't use PersistenceFacade::create())
      $node = new Node($type);
      if ($parent != null) {
        $parent->addChild($node);
      }
      $template = &$persistenceFacade->create($type, BUILDDEPTH_SINGLE);
      foreach($data['attributes'] as $key => $value) {
        if (!$template->hasValue($key)) {
          throw new DionysosException(null, null, 'The attribute id '.$key.' is unknown in '.$type, DionysosException::ATTRIBUTE_NAME_INVALID);
        }
        DionysosNodeSerializer::deserializeValue($node, $key, $value);
      }
      return $node;
    }
    else
      return null;
  }
  /**
   * Deserialize an node value
   * @param node A reference to the node
   * @param key The value name or type if value is an array
   * @param value The value or child data, if value is an array
   */
  function deserializeValue(&$node, $key, $value)
  {
    if (!is_array($value)) {
      // since the node is not created by PersistenceFacade::create, the values
      // are unknown. so we have to guess the datatype
      $node->setValue($key, $value, DATATYPE_ATTRIBUTE);
    }
    else
    {
      // deserialize children
      foreach($value as $childData) {
        DionysosNodeSerializer::deserializeNode($key, $childData, $node);
      }
    }
  }
  /**
   * Serialize a Node into an array
   * @param node A reference to the node to serialize
   * @return The node serialized into an associated array
   */
  function serializeNode(&$node)
  {
    self::$_serializedOIDs = array();
    $serializedNode = self::serializeNodeImpl($node);
    return $serializedNode;
  }

  /**
   * Serialize a Node into an array
   * @param node A reference to the node to serialize
   * @return The node serialized into an associated array
   */
  function serializeNodeImpl(&$node)
  {
    $curResult = array();
    $curResult['className'] = $node->getBaseType();
    $curResult['oid'] = $node->getBaseOID();
    $curResult['lastChange'] = strtotime($node->getValue('modified', DATATYPE_ATTRIBUTE));

    $oid = $node->getOID();
    if (in_array($oid, self::$_serializedOIDs))
    {
      // the node is serialized already
      $curResult['isReference'] = true;
    }
    else
    {
      // the node is not serialized yet
      $curResult['isReference'] = false;
      self::$_serializedOIDs[] = $node->getOID();

      // serialize attributes
      $curResult['attributes'] = array();
      // use NodeProcessor to iterate over all Node values
      // and call the global convert function on each
      $processor = new NodeProcessor('serializeAttribute', array(&$curResult['attributes']), new DionysosNodeSerializer());
      $processor->run($node, false);

      // add related objects by creating an attribute that is named as the role of the object
      // multivalued relations will be serialized into an array
      $lastRole = null;
      $relatedOIDs = array_merge((array)$node->getProperty('parentoids'), (array)$node->getProperty('childoids'));
      $relatedObjects = array_merge((array)$node->getChildren(), (array)$node->getParents());
      foreach($relatedOIDs as $oid)
      {
        // get the oid serialized as reference
        $ref = self::serializeOid($oid, $node->getType());
        $role = $ref['type'];

        // create the relation attribute on first appearance
        if ($role != $lastRole) {
          if ($ref['isMultiValued']) {
            $curResult['attributes'][$role] = array();
          }
        }

        // serialize the node as complete object or as reference
        $relatedNode = self::getFromNodelist($relatedObjects, $oid);
		if ($relatedNode && !in_array($oid, self::$_serializedOIDs)) {
          $data = self::serializeNodeImpl($relatedNode);
		}
        else {
          $data = array('className' => $ref['baseType'], 'oid' => $oid, 'isReference' => true);
        }

        // add the data to the relation attribute
        if ($ref['isMultiValued']) {
          $curResult['attributes'][$role][] = $data;
        }
        else {
          $curResult['attributes'][$role] = $data;
        }
      }
    }
    return $curResult;
  }
  /**
   * Callback function for NodeProcessor (see NodeProcessor).
   */
  function serializeAttribute(&$node, $valueName, $dataType, &$result)
  {
    $result[$valueName] = $node->getValue($valueName, $dataType);
  }
  /**
   * Serialize a oid as a reference.
   * @param oid The oid
   * @param parentType The parent node type (optional, default: null)
   * @return An associative array with keys 'baseType', 'baseOID', 'type', 'isMultiValued' or null,
   * if the oid is a dummy id
   */
  function serializeOid($oid, $parentType=null)
  {
    $oidParts = PersistenceFacade::decomposeOID($oid);
    if (!PersistenceFacade::isDummyId(join('', $oidParts['id'])))
    {
      $type = $oidParts['type'];
      $persistenceFacade = &PersistenceFacade::getInstance();
      $node = &$persistenceFacade->create($type, BUILDDEPTH_SINGLE);
      $baseType = $node->getBaseType();
      $baseOID = PersistenceFacade::composeOID(array('type' => $baseType, 'id' => $oidParts['id']));

      $isMultiValued = false;
      if ($parentType) {
        $isMultiValued = DionysosNodeSerializer::isMultiValued($parentType, $type);
      }
      return array('baseType' => $baseType, 'baseOID' => $baseOID, 'type' => $type, 
        'isMultiValued' => $isMultiValued);
    }
    else {
      return null;
    }
  }
  /**
   * Check if a releation can hold one or more than one objects.
   * @param parentType The parent type in the relation 
   * @param childType The child type in the relation 
   * @return True if the relation can hold more than one objects, false else
   */
  function isMultiValued($thisType, $otherType)
  {
    $isMultiValued = false;
    $persistenceFacade = &PersistenceFacade::getInstance();
    $node = &$persistenceFacade->create($thisType, BUILDDEPTH_SINGLE);
    if ($node)
    {
      $mapper = $node->getMapper();
      $objectDef = $mapper->getObjectDefinition();
      $found = false;
      // check if otherType is a child of thisType
      foreach ($objectDef['_children'] as $childDef)
      {
        if ($childDef['type'] == $otherType) {
          $found = true;
          // check multiplicity
          if ($childDef['maxOccurs'] > 1 || $childDef['maxOccurs'] == 'unbounded') {
            $isMultiValued = true;
          }
        }
      }
      // check if otherType is a parent of thisType
      foreach ($objectDef['_parents'] as $parentDef)
      {
        if ($parentDef['type'] == $otherType) {
          // parents are single valued
          $found = true;
          $isMultiValued = false;
        }
      }
      if (!$found) {
        // fallback: assume that the connetion is established by a many to many object
        $isMultiValued = true;
      }
    }
    return $isMultiValued;
  }
  /**
   * Get the node with oid from a list of nodes.
   * @param nodes An array of nodes
   * @param oid The oid to look for
   * @return The node or null, if not found
   */
  function getFromNodelist($nodes, $oid)
  {
    foreach($nodes as $node) {
      if ($node->getOID() == $oid) {
        return $node;
      }
    }
    return null;
  }
}
?>
