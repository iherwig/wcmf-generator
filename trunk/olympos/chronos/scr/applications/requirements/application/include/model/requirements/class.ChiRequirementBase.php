<?php
/**
 * This file was generated by wCMFGenerator 2.6.0001 from model/requirements.xmi on 03.04.08 20:09. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/class.ChiBase.php");

/**
 * @class ChiRequirement
 * ChiRequirement description: A Business guide line about the Enterprise or the project.
 *
 * @author Giuseppe Platania
 * @version 1.0
 */
class ChiRequirementBase extends ChiBase
{
    function ChiRequirementBase($oid=null, $type=null)
    {
    if ($type == null)
      parent::ChiBase($oid, 'ChiRequirement');
    else
      parent::ChiBase($oid, $type);
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("ChiRequirement");
    }
    /**
     * @see PersistentObject::getObjectDescription()
     */
    function getObjectDescription()
    {
      return Message::get("A Business guide line about the Enterprise or the project.");
    }
    /**
     * @see PersistentObject::getValueDisplayName()
     */
    function getValueDisplayName($name, $type=null)
    {
      $displayName = $name;
      if ($name == 'id') $displayName = Message::get("id");
      if ($name == 'fk_chibusinessprocess_id') $displayName = Message::get("fk_chibusinessprocess_id");
      if ($name == 'fk_package_id') $displayName = Message::get("fk_package_id");
      if ($name == 'fk_chigoal_id') $displayName = Message::get("fk_chigoal_id");
      if ($name == 'fk_chirequirement_id') $displayName = Message::get("fk_chirequirement_id");
      if ($name == 'reqType') $displayName = Message::get("reqType");
      if ($name == 'Priority') $displayName = Message::get("Priority");
      if ($name == 'Author') $displayName = Message::get("Author");
      if ($name == 'Proofreader') $displayName = Message::get("Proofreader");
      if ($name == 'Status') $displayName = Message::get("Status");
      return Message::get($displayName);
    }
    /**
     * @see PersistentObject::getValueDescription()
     */
    function getValueDescription($name, $type=null)
    {
      $description = $name;
      if ($name == 'id') $description = Message::get("");
      if ($name == 'fk_chibusinessprocess_id') $description = Message::get("");
      if ($name == 'fk_package_id') $description = Message::get("");
      if ($name == 'fk_chigoal_id') $description = Message::get("");
      if ($name == 'fk_chirequirement_id') $description = Message::get("");
      if ($name == 'reqType') $description = Message::get("");
      if ($name == 'Priority') $description = Message::get("A priority in %. Requirements are ordered by priority.");
      if ($name == 'Author') $description = Message::get("This requirement's author's name and role in the project");
      if ($name == 'Proofreader') $description = Message::get("Each requirement needs to be confirmed.
This requirement's proofreader's name and role in the project");
      if ($name == 'Status') $description = Message::get("");
      return Message::get($description);
    }
    /**
     * See if the node is an association object, that implements a many to many relation
     */
    function isManyToManyObject()
    {
      return false;
    }
    /**
     * Getter/Setter
     */
    function getId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('id', DATATYPE_IGNORE);
      else
        return $this->getValue('id', DATATYPE_IGNORE);
    }
    function setId($id)
    {
      return $this->setValue('id', $id, DATATYPE_IGNORE);
    }
    function getFkChibusinessprocessId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chibusinessprocess_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chibusinessprocess_id', DATATYPE_IGNORE);
    }
    function setFkChibusinessprocessId($fk_chibusinessprocess_id)
    {
      return $this->setValue('fk_chibusinessprocess_id', $fk_chibusinessprocess_id, DATATYPE_IGNORE);
    }
    function getFkPackageId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_package_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_package_id', DATATYPE_IGNORE);
    }
    function setFkPackageId($fk_package_id)
    {
      return $this->setValue('fk_package_id', $fk_package_id, DATATYPE_IGNORE);
    }
    function getFkChigoalId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chigoal_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chigoal_id', DATATYPE_IGNORE);
    }
    function setFkChigoalId($fk_chigoal_id)
    {
      return $this->setValue('fk_chigoal_id', $fk_chigoal_id, DATATYPE_IGNORE);
    }
    function getFkChirequirementId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chirequirement_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chirequirement_id', DATATYPE_IGNORE);
    }
    function setFkChirequirementId($fk_chirequirement_id)
    {
      return $this->setValue('fk_chirequirement_id', $fk_chirequirement_id, DATATYPE_IGNORE);
    }
    function getReqType($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('reqType', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('reqType', DATATYPE_ATTRIBUTE);
    }
    function setReqType($reqType)
    {
      return $this->setValue('reqType', $reqType, DATATYPE_ATTRIBUTE);
    }
    function getPriority($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('Priority', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('Priority', DATATYPE_ATTRIBUTE);
    }
    function setPriority($Priority)
    {
      return $this->setValue('Priority', $Priority, DATATYPE_ATTRIBUTE);
    }
    function getAuthor($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('Author', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('Author', DATATYPE_ATTRIBUTE);
    }
    function setAuthor($Author)
    {
      return $this->setValue('Author', $Author, DATATYPE_ATTRIBUTE);
    }
    function getProofreader($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('Proofreader', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('Proofreader', DATATYPE_ATTRIBUTE);
    }
    function setProofreader($Proofreader)
    {
      return $this->setValue('Proofreader', $Proofreader, DATATYPE_ATTRIBUTE);
    }
    function getStatus($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('Status', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('Status', DATATYPE_ATTRIBUTE);
    }
    function setStatus($Status)
    {
      return $this->setValue('Status', $Status, DATATYPE_ATTRIBUTE);
    }
    function getChiRequirementOID()
    {
      $fkValue = $this->getValue('fk_chirequirement_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiRequirement', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiRequirement(&$node)
    {
      if ($node != null)
        $this->setValue('fk_chirequirement_id', $node->getDBID(), DATATYPE_IGNORE);
    }
    function getChiGoalOID()
    {
      $fkValue = $this->getValue('fk_chigoal_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiGoal', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiGoal(&$node)
    {
      if ($node != null)
        $this->setValue('fk_chigoal_id', $node->getDBID(), DATATYPE_IGNORE);
    }
    function getPackageOID()
    {
      $fkValue = $this->getValue('fk_package_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'Package', 'id' => array($fkValue)));
      else
        return null;
    }
    function setPackage(&$node)
    {
      if ($node != null)
        $this->setValue('fk_package_id', $node->getDBID(), DATATYPE_IGNORE);
    }
    function getChiBusinessProcessOID()
    {
      $fkValue = $this->getValue('fk_chibusinessprocess_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiBusinessProcess', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiBusinessProcess(&$node)
    {
      if ($node != null)
        $this->setValue('fk_chibusinessprocess_id', $node->getDBID(), DATATYPE_IGNORE);
    }
    function getChiRequirementList()
    {
      return $this->getChildrenEx(null, 'ChiRequirement', array('fk_chirequirement_id' => $this->getDBID()), null);
    }
    function getNMFeatureRequirementsList()
    {
      return $this->getChildrenEx(null, 'NMFeatureRequirements', array('fk_chirequirement_id' => $this->getDBID()), null);
    }
    function getChiFeatureList()
    {
      // the foreign key column does not exist
      return $this->getChildrenEx(null, 'ChiFeature', null, null);
    }
    function getChiIssueList()
    {
      return $this->getChildrenEx(null, 'ChiIssue', array('fk_chirequirement_id' => $this->getDBID()), null);
    }

    /**
     * Node class overrides
     */
     
    /**
     * @see Node::loadChildren()
     * Override this to also load the children of many-to-many relations
     */
    function loadChildren($type, $buildDepth=BUILDDEPTH_SINGLE, $forceUpdate=false)
    {
      // handle NMFeatureRequirements as many-to-many type
      if ($type == 'ChiFeature')
      {
        // for every NMFeatureRequirements we have to load the ChiFeature 
        $this->loadChildren('NMFeatureRequirements');
        $children = parent::getChildrenEx(null, 'NMFeatureRequirements', array('fk_chirequirement_id' => $this->getDBID()), null);
        $persistenceFacade = &PersistenceFacade::getInstance();
        $grandChildren = array();
        for($i=0; $i<sizeof($children); $i++)
        {
          if (PersistenceFacade::isValidOID($children[$i]->getChiFeatureOID()))
          {
            $grandChild = &$persistenceFacade->load($children[$i]->getChiFeatureOID(), BUILDDEPTH_SINGLE);
            if ($grandChild != null)
            {
              // establish connetcion
              $grandChild->addChild($children[$i]);
              $grandChild->setState(STATE_CLEAN);
              $children[$i]->setState(STATE_CLEAN);
            }
          }
        }
        return;
      }
      // do default
      parent::loadChildren($type, $buildDepth, $forceUpdate);
    }
    /**
     * @see Node::getChildren()
     * Override this to include the children of many-to-many relations
     */
    function getChildren()
    {
      // get default children
      $children = parent::getChildren();

      // for every NMFeatureRequirements we have to get the ChiFeature parents
      $childrenNMFeatureRequirements = parent::getChildrenEx(null, 'NMFeatureRequirements', array('fk_chirequirement_id' => $this->getDBID()), null);
      for($i=0; $i<sizeof($childrenNMFeatureRequirements); $i++)
      {
        $grandChildren = $childrenNMFeatureRequirements[$i]->getParentsEx(null, 'ChiFeature', null, null);
      	for($j=0; $j<sizeof($grandChildren); $j++)
          $children[sizeof($children)] = &$grandChildren[$j];
      }
      return $children;
    }
    /**
     * @see Node::getChildrenEx()
     * Override this to also get the children of many-to-many relations
     */
    function getChildrenEx($oid, $type, $values, $properties)
    {
      // handle NMFeatureRequirements as many-to-many type
      if ($type == 'ChiFeature' || PersistenceFacade::getOIDParameter($oid, 'type') == 'ChiFeature')
      {
        // for every NMFeatureRequirements we have to get the ChiFeature parents 
        $children = parent::getChildrenEx(null, 'NMFeatureRequirements', array('fk_chirequirement_id' => $this->getDBID()), null);
        $grandChildren = array();
        for($i=0; $i<sizeof($children); $i++)
        {
          $grandChildrenParents = $children[$i]->getChiFeatureList();
          for($j=0; $j<sizeof($grandChildrenParents); $j++)
            $grandChildren[sizeof($grandChildren)] = &$grandChildrenParents[$j];
        }
        return Node::filter($grandChildren, $oid, $type, $values, $properties);
      }
      // do default
      return parent::getChildrenEx($oid, $type, $values, $properties);
    }
    /**
     * @see Node::addChild()
     * Override this to insert association objects if necessary
     */
    function addChild(&$child, $addtype=ADDCHILD_BACK)
    {
      if ($child != null && $child->getType() == 'ChiFeature')
      {
        // for every ChiFeature we have to insert a NMFeatureRequirements
        $persistenceFacade = &PersistenceFacade::getInstance();
        // check if the relation already exists
        $relOID = $persistenceFacade->getFirstOID('NMFeatureRequirements', array('fk_chirequirement_id' => $this->getDBID(), 'fk_chifeature_id' => $child->getDBID()));
        if ($relOID == null)
        {
          // add the child only if it is not added already
          $associationNode = &$persistenceFacade->create('NMFeatureRequirements', BUILDTYPE_SINGLE);
          $associationNode->setChiRequirement($this);
          $child->addChild($associationNode);
        }
        else
          $associationNode = &$persistenceFacade->load($relOID, BUILDTYPE_SINGLE);
        // set child parameter to associationNode and prodeed with default behaviour
        $child = &$associationNode;
      }
      // do default
      parent::addChild($child, $addtype);
    }
   /**
     * @see Node::deleteChild()
     * Override this to delete association objects if necessary
     */
    function deleteChild($childOID, $reallyDelete=false)
    {
      if (PersistenceFacade::isValidOID($childOID) && PersistenceFacade::getOIDParameter($childOID, 'type') == 'ChiFeature')
      {
        // for every ChiFeature we have to delete the NMFeatureRequirements
        $persistenceFacade = &PersistenceFacade::getInstance();
        // check if the relation exists
        $relOID = $persistenceFacade->getFirstOID('NMFeatureRequirements', array('fk_chirequirement_id' => $this->getDBID(), 'fk_chifeature_id' => PersistenceFacade::getOIDParameter($childOID, 'id')));
        if ($relOID != null)
        {
          // set childOID parameter to relOID and prodeed with default behaviour
          $childOID = $relOID;
        }
      }
      // do default
      parent::deleteChild($childOID, $reallyDelete);
    }
}
?>
