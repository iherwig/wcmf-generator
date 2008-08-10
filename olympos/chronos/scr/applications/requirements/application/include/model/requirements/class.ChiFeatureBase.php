<?php
/**
 * This file was generated by wCMFGenerator 2.6.1.0010 from model/requirements.xmi on 10.08.08 11:37. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/class.ChiBase.php");

/**
 * @class ChiFeature
 * ChiFeature description: 
 *
 * @author Giuseppe Platania
 * @version 1.0
 */
class ChiFeatureBase extends ChiBase
{
    function ChiFeatureBase($oid=null, $type=null)
    {
    if ($type == null)
      parent::ChiBase($oid, 'ChiFeature');
    else
      parent::ChiBase($oid, $type);
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("ChiFeature");
    }
    /**
     * @see PersistentObject::getObjectDescription()
     */
    function getObjectDescription()
    {
      return Message::get("");
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
      if ($name == 'Author') $description = Message::get("This feature's author's name and role in the project");
      if ($name == 'Proofreader') $description = Message::get("This feature's revisor's name and role in the project");
      if ($name == 'Status') $description = Message::get("This feature's status");
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
    function getPackageParents()
    {
      return $this->getParentsEx(null, 'Package', null, null);
    }
    function getChiBusinessProcessParents()
    {
      return $this->getParentsEx(null, 'ChiBusinessProcess', null, null);
    }
    /**
     * @deprecated use getNMFeatureRequirementsChildren() instead
     */
    function getNMFeatureRequirementsList()
    {
      Message::log("use of deprecated method getNMFeatureRequirementsList. use getNMFeatureRequirementsChildren() instead.\n".Message::getStackTrace(), __FILE__, __LINE__);
      return $this->getNMFeatureRequirementsChildren();
    }
    function getNMFeatureRequirementsChildren()
    {
      return $this->getChildrenEx(null, 'NMFeatureRequirements', array('fk_chifeature_id' => $this->getDBID()), null);
    }
    /**
     * @deprecated use getChiRequirementChildren() instead
     */
    function getChiRequirementList()
    {
      Message::log("use of deprecated method getChiRequirementList. use getChiRequirementChildren() instead.\n".Message::getStackTrace(), __FILE__, __LINE__);
      return $this->getChiRequirementChildren();
    }
    function getChiRequirementChildren()
    {
      // the foreign key column does not exist
      return $this->getChildrenEx(null, 'ChiRequirement', null, null);
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
      if ($type == 'ChiRequirement')
      {
        // for every NMFeatureRequirements we have to load the ChiRequirement 
        $this->loadChildren('NMFeatureRequirements');
        $children = parent::getChildrenEx(null, 'NMFeatureRequirements', array('fk_chifeature_id' => $this->getDBID()), null);
        $persistenceFacade = &PersistenceFacade::getInstance();
        $grandChildren = array();
        for($i=0; $i<sizeof($children); $i++)
        {
          if (PersistenceFacade::isValidOID($children[$i]->getChiRequirementOID()))
          {
            $grandChild = &$persistenceFacade->load($children[$i]->getChiRequirementOID(), BUILDDEPTH_SINGLE);
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
     * @see Node::getChildrenEx()
     * Override this to also get the children of many-to-many relations
     */
    function getChildrenEx($oid, $type, $values, $properties)
    {
      // handle NMFeatureRequirements as many-to-many type
      if ($type == 'ChiRequirement' || PersistenceFacade::getOIDParameter($oid, 'type') == 'ChiRequirement')
      {
        // for every NMFeatureRequirements we have to get the ChiRequirement parents 
        $children = parent::getChildrenEx(null, 'NMFeatureRequirements', array('fk_chifeature_id' => $this->getDBID()), null);
        $grandChildren = array();
        $persistenceFacade = &PersistenceFacade::getInstance();
        for($i=0; $i<sizeof($children); $i++)
        {
          // load the parents
          $grandChildrenParents = array();
          foreach ($children[$i]->getProperty('parentoids') as $parentoid)
          {
            if (PersistenceFacade::getOIDParameter($parentoid, 'type') == 'ChiRequirement')
            {
              $tmpParents = $children[$i]->getParentsEx($parentoid, null, null, null);
              if (sizeof($tmpParents) > 0)
                $curChildParent = &$tmpParents[0];
              else
                $curChildParent = &$persistenceFacade->load($parentoid, BUILDDEPTH_SINGLE);
              if ($curChildParent != null)
                $grandChildrenParents[sizeof($grandChildrenParents)] = &$curChildParent;
            }
          }
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
      if ($child != null && $child->getType() == 'ChiRequirement')
      {
        // for every ChiRequirement we have to insert a NMFeatureRequirements
        $persistenceFacade = &PersistenceFacade::getInstance();
        // check if the relation already exists
        $relOID = $persistenceFacade->getFirstOID('NMFeatureRequirements', array('fk_chifeature_id' => $this->getDBID(), 'fk_chirequirement_id' => $child->getDBID()));
        if ($relOID == null)
        {
          // add the child only if it is not added already
          $associationNode = &$persistenceFacade->create('NMFeatureRequirements', BUILDTYPE_SINGLE);
          $associationNode->setChiFeature($this);
          $associationNode->setChiRequirement($child);
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
      if (PersistenceFacade::isValidOID($childOID) && PersistenceFacade::getOIDParameter($childOID, 'type') == 'ChiRequirement')
      {
        // for every ChiRequirement we have to delete the NMFeatureRequirements
        // set childOID parameter to the NMFeatureRequirements's object id and prodeed with default behaviour
        $ids = PersistenceFacade::getOIDParameter($childOID, 'id');
        array_unshift($ids, $this->getDBID());
        $childOID = PersistenceFacade::composeOID(array('type' => 'NMFeatureRequirements', 'id' => $ids));
      }
      // do default
      parent::deleteChild($childOID, $reallyDelete);
    }
}
?>
