<?php
/**
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Thu Jan 13 15:12:30 CET 2011. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/UseCases/class.ChiWorker.php");

/**
 * @class ChiWorkerInternal
 * ChiWorkerInternal description: A Chi  Worker Internal is an employee of the enterprise that has no contact with Business partners.
 *
 * @author 
 * @version 1.0
 */
class ChiWorkerInternalBase extends ChiWorker
{
    function ChiWorkerInternalBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::__construct($oid, 'ChiWorkerInternal');
      else
        parent::__construct($oid, $type);
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("ChiWorkerInternal");
    }
    /**
     * @see PersistentObject::getObjectDescription()
     */
    function getObjectDescription()
    {
      return Message::get("A Chi  Worker Internal is an employee of the enterprise that has no contact with Business partners.");
    }
    /**
     * @see PersistentObject::getValueDisplayName()
     */
    function getValueDisplayName($name, $type=null)
    {
      $displayName = $name;
      if ($name == 'id') $displayName = Message::get("id");
      if ($name == 'fk_package_id') $displayName = Message::get("fk_package_id");
      if ($name == 'fk_chiworkerinternal_id') $displayName = Message::get("fk_chiworkerinternal_id");
      if ($name == 'Status') $displayName = Message::get("Status");
      if ($name == 'Alias') $displayName = Message::get("Alias");
      if ($name == 'Author') $displayName = Message::get("Author");
      if ($name == 'Version') $displayName = Message::get("Version");
      if ($name == 'Name') $displayName = Message::get("Name");
      if ($name == 'Notes') $displayName = Message::get("Notes");
      if ($name == 'created') $displayName = Message::get("created");
      if ($name == 'creator') $displayName = Message::get("creator");
      if ($name == 'last_editor') $displayName = Message::get("last_editor");
      if ($name == 'modified') $displayName = Message::get("modified");
      if ($name == 'umi') $displayName = Message::get("umi");
      return Message::get($displayName);
    }
    /**
     * @see PersistentObject::getValueDescription()
     */
    function getValueDescription($name, $type=null)
    {
      $description = $name;
      if ($name == 'id') $description = Message::get("");
      if ($name == 'fk_package_id') $description = Message::get("");
      if ($name == 'fk_chiworkerinternal_id') $description = Message::get("");
      if ($name == 'Status') $description = Message::get("");
      if ($name == 'Alias') $description = Message::get("the Project Id of this object.");
      if ($name == 'Author') $description = Message::get("");
      if ($name == 'Version') $description = Message::get("the model version of this object");
      if ($name == 'Name') $description = Message::get("the name of this object.");
      if ($name == 'Notes') $description = Message::get("the actual description of the object.");
      if ($name == 'created') $description = Message::get("the creation date of this object");
      if ($name == 'creator') $description = Message::get("the user that created this object");
      if ($name == 'last_editor') $description = Message::get("the last user that edited this object");
      if ($name == 'modified') $description = Message::get("the date when this object was modified");
      if ($name == 'umi') $description = Message::get("the model version of this object");
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
     * Getter/Setter for properties
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
    function getFkChiworkerinternalId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chiworkerinternal_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chiworkerinternal_id', DATATYPE_IGNORE);
    }
    function setFkChiworkerinternalId($fk_chiworkerinternal_id)
    {
      return $this->setValue('fk_chiworkerinternal_id', $fk_chiworkerinternal_id, DATATYPE_IGNORE);
    }
    function getSortkey()
    {
      return $this->getValue('sortkey', DATATYPE_IGNORE);
    }
    function setSortkey($sortkey)
    {
      return $this->setValue('sortkey', $sortkey, DATATYPE_IGNORE);
    }
    /**
     * Getter/Setter for related objects
     */
    function __call($name, $arguments)
    {
      // foreign key: ChiWorkerInternal
      if ($name == 'getChiWorkerInternalOID')
    {
      $fkValue = $this->getValue('fk_chiworkerinternal_id', DATATYPE_IGNORE);
        if ($fkValue != null) {
        return PersistenceFacade::composeOID(array('type' => 'ChiWorkerInternal', 'id' => array($fkValue)));
        }
        else {
        return null;
    }
      }
      if ($name == 'setChiWorkerInternal')
    {
        $node = &$arguments[0];
      if ($node != null)
        {
          if (!is_a($node, 'node') && !is_a($node, 'Node')) {
            call_user_func_array(array(parent, 'setChiWorkerInternal'), $arguments);
          }
          else {
        $this->setValue('fk_chiworkerinternal_id', $node->getDBID(), DATATYPE_IGNORE);
    }
        }
        return;
      }
      // foreign key: Package
      if ($name == 'getPackageOID')
    {
      $fkValue = $this->getValue('fk_package_id', DATATYPE_IGNORE);
        if ($fkValue != null) {
        return PersistenceFacade::composeOID(array('type' => 'Package', 'id' => array($fkValue)));
        }
        else {
        return null;
    }
      }
      if ($name == 'setPackage')
    {
        $node = &$arguments[0];
      if ($node != null)
        {
          if (!is_a($node, 'node') && !is_a($node, 'Node')) {
            call_user_func_array(array(parent, 'setPackage'), $arguments);
          }
          else {
        $this->setValue('fk_package_id', $node->getDBID(), DATATYPE_IGNORE);
    }
        }
        return;
      }
      // parent: ChiWorkerInternal
      if ($name == 'getChiWorkerInternalParents') {
      return $this->getParentsEx(null, 'ChiWorkerInternal', null, null);
    }
      // parent: Package
      if ($name == 'getPackageParents') {
      return $this->getParentsEx(null, 'Package', null, null);
    }
      // child: ChiWorkerInternal
      if ($name == 'getChiWorkerInternalList')
    {
      Log::warn("use of deprecated method getChiWorkerInternalList. use getChiWorkerInternalChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getChiWorkerInternalChildren();
    }
      if ($name == 'getChiWorkerInternalChildren') {
        return $this->getChildrenEx(null, 'ChiWorkerInternal', array('fk_chiworkerinternal_id' => $this->getDBID()), null, false);
    }
      // child: Figure
      if ($name == 'getFigureList')
    {
      Log::warn("use of deprecated method getFigureList. use getFigureChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getFigureChildren();
    }
      if ($name == 'getFigureChildren') {
        return $this->getChildrenEx(null, 'Figure', array('fk_chiworkerinternal_id' => $this->getDBID()), null, false);
    }
      // child: NMUCActor
      if ($name == 'getNMUCActorList')
    {
      Log::warn("use of deprecated method getNMUCActorList. use getNMUCActorChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getNMUCActorChildren();
    }
      if ($name == 'getNMUCActorChildren') {
        return $this->getChildrenEx(null, 'NMUCActor', array('fk_chiworkerinternal_id' => $this->getDBID()), null, false);
    }
      if ($name == 'getChiBusinessUseCaseList')
    {
      Log::warn("use of deprecated method getChiBusinessUseCaseList. use getChiBusinessUseCaseChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getChiBusinessUseCaseChildren();
    }
      if ($name == 'getChiBusinessUseCaseChildren')
    {
      // the foreign key column does not exist
        return $this->getChildrenEx(null, 'ChiBusinessUseCase', null, null, false);
    }
      if ($name == 'getChiBusinessUseCaseCoreList')
    {
      Log::warn("use of deprecated method getChiBusinessUseCaseCoreList. use getChiBusinessUseCaseCoreChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getChiBusinessUseCaseCoreChildren();
    }
      if ($name == 'getChiBusinessUseCaseCoreChildren')
    {
      // the foreign key column does not exist
        return $this->getChildrenEx(null, 'ChiBusinessUseCaseCore', null, null, false);
    }
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
      // handle NMUCActor as many-to-many type
      if ($type == 'ChiBusinessUseCase')
      {
        // for every NMUCActor we have to load the ChiBusinessUseCase 
        $this->loadChildren('NMUCActor');
        $children = parent::getChildrenEx(null, 'NMUCActor', array('fk_chiworkerinternal_id' => $this->getDBID()), null, false);
        $persistenceFacade = &PersistenceFacade::getInstance();
        $grandChildren = array();
        for($i=0; $i<sizeof($children); $i++)
        {
          if (PersistenceFacade::isValidOID($children[$i]->getChiBusinessUseCaseOID()))
          {
            $grandChild = &$persistenceFacade->load($children[$i]->getChiBusinessUseCaseOID(), BUILDDEPTH_SINGLE);
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
      // handle NMUCActor as many-to-many type
      if ($type == 'ChiBusinessUseCaseCore')
      {
        // for every NMUCActor we have to load the ChiBusinessUseCaseCore 
        $this->loadChildren('NMUCActor');
        $children = parent::getChildrenEx(null, 'NMUCActor', array('fk_chiworkerinternal_id' => $this->getDBID()), null, false);
        $persistenceFacade = &PersistenceFacade::getInstance();
        $grandChildren = array();
        for($i=0; $i<sizeof($children); $i++)
        {
          if (PersistenceFacade::isValidOID($children[$i]->getChiBusinessUseCaseCoreOID()))
          {
            $grandChild = &$persistenceFacade->load($children[$i]->getChiBusinessUseCaseCoreOID(), BUILDDEPTH_SINGLE);
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
    function getChildrenEx($oid, $type, $values, $properties, $useRegExp=true)
    {
      // handle NMUCActor as many-to-many type
      if ($type == 'ChiBusinessUseCase' || PersistenceFacade::getOIDParameter($oid, 'type') == 'ChiBusinessUseCase')
      {
        // for every NMUCActor we have to get the ChiBusinessUseCase parents 
        $children = parent::getChildrenEx(null, 'NMUCActor', array('fk_chiworkerinternal_id' => $this->getDBID()), null, false);
        $grandChildren = array();
        $persistenceFacade = &PersistenceFacade::getInstance();
        for($i=0; $i<sizeof($children); $i++)
        {
          // load the parents
          $grandChildrenParents = array();
          foreach ($children[$i]->getProperty('parentoids') as $parentoid)
          {
            if (PersistenceFacade::getOIDParameter($parentoid, 'type') == 'ChiBusinessUseCase')
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
        return Node::filter($grandChildren, $oid, $type, $values, $properties, $useRegExp);
      }
      // handle NMUCActor as many-to-many type
      if ($type == 'ChiBusinessUseCaseCore' || PersistenceFacade::getOIDParameter($oid, 'type') == 'ChiBusinessUseCaseCore')
      {
        // for every NMUCActor we have to get the ChiBusinessUseCaseCore parents 
        $children = parent::getChildrenEx(null, 'NMUCActor', array('fk_chiworkerinternal_id' => $this->getDBID()), null, false);
        $grandChildren = array();
        $persistenceFacade = &PersistenceFacade::getInstance();
        for($i=0; $i<sizeof($children); $i++)
        {
          // load the parents
          $grandChildrenParents = array();
          foreach ($children[$i]->getProperty('parentoids') as $parentoid)
          {
            if (PersistenceFacade::getOIDParameter($parentoid, 'type') == 'ChiBusinessUseCaseCore')
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
        return Node::filter($grandChildren, $oid, $type, $values, $properties, $useRegExp);
      }
      // do default
      return parent::getChildrenEx($oid, $type, $values, $properties, $useRegExp);
    }
    /**
     * @see Node::addChild()
     * Override this to insert association objects if necessary
     */
    function addChild(&$child, $addtype=ADDCHILD_BACK)
    {
      if ($child != null && $child->getType() == 'ChiBusinessUseCase')
      {
        // for every ChiBusinessUseCase we have to insert a NMUCActor
        $persistenceFacade = &PersistenceFacade::getInstance();
        // check if the relation already exists
        $relOID = $persistenceFacade->getFirstOID('NMUCActor', array('fk_chiworkerinternal_id' => $this->getDBID(), 'fk_chibusinessusecase_id' => $child->getDBID()));
        if ($relOID == null)
        {
          // add the child only if it is not added already
          $associationNode = &$persistenceFacade->create('NMUCActor', BUILDTYPE_SINGLE);
          $associationNode->setChiWorkerInternal($this);
          $associationNode->setChiBusinessUseCase($child);
          // physically add the child to allow tree iteration for CommitVisior
          $this->addChild($associationNode);
          $child->addChild($associationNode);
        }
        else
          $associationNode = &$persistenceFacade->load($relOID, BUILDTYPE_SINGLE);
        // set child parameter to associationNode and prodeed with default behaviour
        $child = &$associationNode;
      }
      if ($child != null && $child->getType() == 'ChiBusinessUseCaseCore')
      {
        // for every ChiBusinessUseCaseCore we have to insert a NMUCActor
        $persistenceFacade = &PersistenceFacade::getInstance();
        // check if the relation already exists
        $relOID = $persistenceFacade->getFirstOID('NMUCActor', array('fk_chiworkerinternal_id' => $this->getDBID(), 'fk_chibusinessusecasecore_id' => $child->getDBID()));
        if ($relOID == null)
        {
          // add the child only if it is not added already
          $associationNode = &$persistenceFacade->create('NMUCActor', BUILDTYPE_SINGLE);
          $associationNode->setChiWorkerInternal($this);
          $associationNode->setChiBusinessUseCaseCore($child);
          // physically add the child to allow tree iteration for CommitVisior
          $this->addChild($associationNode);
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
      if (PersistenceFacade::isValidOID($childOID) && PersistenceFacade::getOIDParameter($childOID, 'type') == 'ChiBusinessUseCase')
      {
        // for every ChiBusinessUseCase we have to delete the NMUCActor
        // set childOID parameter to the NMUCActor's object id and proceed with default behaviour
        // check if the connection child is loaded already
        $ids = PersistenceFacade::getOIDParameter($childOID, 'id');
        $associationNodeConstraint = array('fk_chiworkerinternal_id' => $this->getDBID(), 'fk_chibusinessusecase_id' => $ids[0]);
        $associationNode = &$this->getFirstChild('NMUCActor', $associationNodeConstraint, null, false);
        if ($associationNode != null)
          $childOID = $associationNode->getOID();
        else
        {
          // try to get it from the database
          $persistenceFacade = &PersistenceFacade::getInstance();
          $relOID = $persistenceFacade->getFirstOID('NMUCActor', $associationNodeConstraint);
          if ($relOID != null)
            $childOID = $relOID;
        }
      }
      if (PersistenceFacade::isValidOID($childOID) && PersistenceFacade::getOIDParameter($childOID, 'type') == 'ChiBusinessUseCaseCore')
      {
        // for every ChiBusinessUseCaseCore we have to delete the NMUCActor
        // set childOID parameter to the NMUCActor's object id and proceed with default behaviour
        // check if the connection child is loaded already
        $ids = PersistenceFacade::getOIDParameter($childOID, 'id');
        $associationNodeConstraint = array('fk_chiworkerinternal_id' => $this->getDBID(), 'fk_chibusinessusecasecore_id' => $ids[0]);
        $associationNode = &$this->getFirstChild('NMUCActor', $associationNodeConstraint, null, false);
        if ($associationNode != null)
          $childOID = $associationNode->getOID();
        else
        {
          // try to get it from the database
          $persistenceFacade = &PersistenceFacade::getInstance();
          $relOID = $persistenceFacade->getFirstOID('NMUCActor', $associationNodeConstraint);
          if ($relOID != null)
            $childOID = $relOID;
        }
      }
      // do default
      parent::deleteChild($childOID, $reallyDelete);
    }
}
?>
