<?php
/**
 * This file was generated by wCMFGenerator 2.6.1.0026 from model/requirements.xmi on 16.11.08 18:45. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/UseCases/class.ChiWorker.php");

/**
 * @class ChiWorkerInternal
 * ChiWorkerInternal description: A Chi  Worker Internal is an employee of the enterprise that has no contact with Business partners.
 *
 * @author Giuseppe Platania
 * @version 1.0
 */
class ChiWorkerInternalBase extends ChiWorker
{
    function ChiWorkerInternalBase($oid=null, $type=null)
    {
    if ($type == null)
      parent::ChiWorker($oid, 'ChiWorkerInternal');
    else
      parent::ChiWorker($oid, $type);
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
      if ($name == 'fk_figure_id') $displayName = Message::get("fk_figure_id");
      if ($name == 'fk_package_id') $displayName = Message::get("fk_package_id");
      return Message::get($displayName);
    }
    /**
     * @see PersistentObject::getValueDescription()
     */
    function getValueDescription($name, $type=null)
    {
      $description = $name;
      if ($name == 'id') $description = Message::get("");
      if ($name == 'fk_figure_id') $description = Message::get("");
      if ($name == 'fk_package_id') $description = Message::get("");
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
    function getFkFigureId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_figure_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_figure_id', DATATYPE_IGNORE);
    }
    function setFkFigureId($fk_figure_id)
    {
      return $this->setValue('fk_figure_id', $fk_figure_id, DATATYPE_IGNORE);
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
    function getFigureOID()
    {
      $fkValue = $this->getValue('fk_figure_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'Figure', 'id' => array($fkValue)));
      else
        return null;
    }
    function setFigure(&$node)
    {
      if ($node != null)
        $this->setValue('fk_figure_id', $node->getDBID(), DATATYPE_IGNORE);
    }
    function getPackageParents()
    {
      return $this->getParentsEx(null, 'Package', null, null);
    }
    function getFigureParents()
    {
      return $this->getParentsEx(null, 'Figure', null, null);
    }
    /**
     * @deprecated use getNMUCActorChildren() instead
     */
    function getNMUCActorList()
    {
      Message::log("use of deprecated method getNMUCActorList. use getNMUCActorChildren() instead.\n".Message::getStackTrace(), __FILE__, __LINE__);
      return $this->getNMUCActorChildren();
    }
    function getNMUCActorChildren()
    {
      return $this->getChildrenEx(null, 'NMUCActor', array('fk_chiworkerinternal_id' => $this->getDBID()), null);
    }
    /**
     * @deprecated use getChiBusinessUseCaseChildren() instead
     */
    function getChiBusinessUseCaseList()
    {
      Message::log("use of deprecated method getChiBusinessUseCaseList. use getChiBusinessUseCaseChildren() instead.\n".Message::getStackTrace(), __FILE__, __LINE__);
      return $this->getChiBusinessUseCaseChildren();
    }
    function getChiBusinessUseCaseChildren()
    {
      // the foreign key column does not exist
      return $this->getChildrenEx(null, 'ChiBusinessUseCase', null, null);
    }
    /**
     * @deprecated use getActorChildren() instead
     */
    function getActorList()
    {
      Message::log("use of deprecated method getActorList. use getActorChildren() instead.\n".Message::getStackTrace(), __FILE__, __LINE__);
      return $this->getActorChildren();
    }
    function getActorChildren()
    {
      // the foreign key column does not exist
      return $this->getChildrenEx(null, 'Actor', null, null);
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
        $children = parent::getChildrenEx(null, 'NMUCActor', array('fk_chiworkerinternal_id' => $this->getDBID()), null);
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
      if ($type == 'Actor')
      {
        // for every NMUCActor we have to load the Actor 
        $this->loadChildren('NMUCActor');
        $children = parent::getChildrenEx(null, 'NMUCActor', array('fk_chiworkerinternal_id' => $this->getDBID()), null);
        $persistenceFacade = &PersistenceFacade::getInstance();
        $grandChildren = array();
        for($i=0; $i<sizeof($children); $i++)
        {
          if (PersistenceFacade::isValidOID($children[$i]->getActorOID()))
          {
            $grandChild = &$persistenceFacade->load($children[$i]->getActorOID(), BUILDDEPTH_SINGLE);
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
        $children = parent::getChildrenEx(null, 'NMUCActor', array('fk_chiworkerinternal_id' => $this->getDBID()), null);
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
      // handle NMUCActor as many-to-many type
      if ($type == 'ChiBusinessPartner')
      {
        // for every NMUCActor we have to load the ChiBusinessPartner 
        $this->loadChildren('NMUCActor');
        $children = parent::getChildrenEx(null, 'NMUCActor', array('fk_chiworkerinternal_id' => $this->getDBID()), null);
        $persistenceFacade = &PersistenceFacade::getInstance();
        $grandChildren = array();
        for($i=0; $i<sizeof($children); $i++)
        {
          if (PersistenceFacade::isValidOID($children[$i]->getChiBusinessPartnerOID()))
          {
            $grandChild = &$persistenceFacade->load($children[$i]->getChiBusinessPartnerOID(), BUILDDEPTH_SINGLE);
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
      if ($type == 'ChiBusinessPartnerPassive')
      {
        // for every NMUCActor we have to load the ChiBusinessPartnerPassive 
        $this->loadChildren('NMUCActor');
        $children = parent::getChildrenEx(null, 'NMUCActor', array('fk_chiworkerinternal_id' => $this->getDBID()), null);
        $persistenceFacade = &PersistenceFacade::getInstance();
        $grandChildren = array();
        for($i=0; $i<sizeof($children); $i++)
        {
          if (PersistenceFacade::isValidOID($children[$i]->getChiBusinessPartnerPassiveOID()))
          {
            $grandChild = &$persistenceFacade->load($children[$i]->getChiBusinessPartnerPassiveOID(), BUILDDEPTH_SINGLE);
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
      if ($type == 'ChiBusinessPartnerActive')
      {
        // for every NMUCActor we have to load the ChiBusinessPartnerActive 
        $this->loadChildren('NMUCActor');
        $children = parent::getChildrenEx(null, 'NMUCActor', array('fk_chiworkerinternal_id' => $this->getDBID()), null);
        $persistenceFacade = &PersistenceFacade::getInstance();
        $grandChildren = array();
        for($i=0; $i<sizeof($children); $i++)
        {
          if (PersistenceFacade::isValidOID($children[$i]->getChiBusinessPartnerActiveOID()))
          {
            $grandChild = &$persistenceFacade->load($children[$i]->getChiBusinessPartnerActiveOID(), BUILDDEPTH_SINGLE);
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
      if ($type == 'ChiWorker')
      {
        // for every NMUCActor we have to load the ChiWorker 
        $this->loadChildren('NMUCActor');
        $children = parent::getChildrenEx(null, 'NMUCActor', array('fk_chiworkerinternal_id' => $this->getDBID()), null);
        $persistenceFacade = &PersistenceFacade::getInstance();
        $grandChildren = array();
        for($i=0; $i<sizeof($children); $i++)
        {
          if (PersistenceFacade::isValidOID($children[$i]->getChiWorkerOID()))
          {
            $grandChild = &$persistenceFacade->load($children[$i]->getChiWorkerOID(), BUILDDEPTH_SINGLE);
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
      if ($type == 'ChiWorkerExternal')
      {
        // for every NMUCActor we have to load the ChiWorkerExternal 
        $this->loadChildren('NMUCActor');
        $children = parent::getChildrenEx(null, 'NMUCActor', array('fk_chiworkerinternal_id' => $this->getDBID()), null);
        $persistenceFacade = &PersistenceFacade::getInstance();
        $grandChildren = array();
        for($i=0; $i<sizeof($children); $i++)
        {
          if (PersistenceFacade::isValidOID($children[$i]->getChiWorkerExternalOID()))
          {
            $grandChild = &$persistenceFacade->load($children[$i]->getChiWorkerExternalOID(), BUILDDEPTH_SINGLE);
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
      // handle NMUCActor as many-to-many type
      if ($type == 'ChiBusinessUseCase' || PersistenceFacade::getOIDParameter($oid, 'type') == 'ChiBusinessUseCase')
      {
        // for every NMUCActor we have to get the ChiBusinessUseCase parents 
        $children = parent::getChildrenEx(null, 'NMUCActor', array('fk_chiworkerinternal_id' => $this->getDBID()), null);
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
        return Node::filter($grandChildren, $oid, $type, $values, $properties);
      }
      // handle NMUCActor as many-to-many type
      if ($type == 'Actor' || PersistenceFacade::getOIDParameter($oid, 'type') == 'Actor')
      {
        // for every NMUCActor we have to get the Actor parents 
        $children = parent::getChildrenEx(null, 'NMUCActor', array('fk_chiworkerinternal_id' => $this->getDBID()), null);
        $grandChildren = array();
        $persistenceFacade = &PersistenceFacade::getInstance();
        for($i=0; $i<sizeof($children); $i++)
        {
          // load the parents
          $grandChildrenParents = array();
          foreach ($children[$i]->getProperty('parentoids') as $parentoid)
          {
            if (PersistenceFacade::getOIDParameter($parentoid, 'type') == 'Actor')
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
      // handle NMUCActor as many-to-many type
      if ($type == 'ChiBusinessUseCaseCore' || PersistenceFacade::getOIDParameter($oid, 'type') == 'ChiBusinessUseCaseCore')
      {
        // for every NMUCActor we have to get the ChiBusinessUseCaseCore parents 
        $children = parent::getChildrenEx(null, 'NMUCActor', array('fk_chiworkerinternal_id' => $this->getDBID()), null);
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
        return Node::filter($grandChildren, $oid, $type, $values, $properties);
      }
      // handle NMUCActor as many-to-many type
      if ($type == 'ChiBusinessPartner' || PersistenceFacade::getOIDParameter($oid, 'type') == 'ChiBusinessPartner')
      {
        // for every NMUCActor we have to get the ChiBusinessPartner parents 
        $children = parent::getChildrenEx(null, 'NMUCActor', array('fk_chiworkerinternal_id' => $this->getDBID()), null);
        $grandChildren = array();
        $persistenceFacade = &PersistenceFacade::getInstance();
        for($i=0; $i<sizeof($children); $i++)
        {
          // load the parents
          $grandChildrenParents = array();
          foreach ($children[$i]->getProperty('parentoids') as $parentoid)
          {
            if (PersistenceFacade::getOIDParameter($parentoid, 'type') == 'ChiBusinessPartner')
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
      // handle NMUCActor as many-to-many type
      if ($type == 'ChiBusinessPartnerPassive' || PersistenceFacade::getOIDParameter($oid, 'type') == 'ChiBusinessPartnerPassive')
      {
        // for every NMUCActor we have to get the ChiBusinessPartnerPassive parents 
        $children = parent::getChildrenEx(null, 'NMUCActor', array('fk_chiworkerinternal_id' => $this->getDBID()), null);
        $grandChildren = array();
        $persistenceFacade = &PersistenceFacade::getInstance();
        for($i=0; $i<sizeof($children); $i++)
        {
          // load the parents
          $grandChildrenParents = array();
          foreach ($children[$i]->getProperty('parentoids') as $parentoid)
          {
            if (PersistenceFacade::getOIDParameter($parentoid, 'type') == 'ChiBusinessPartnerPassive')
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
      // handle NMUCActor as many-to-many type
      if ($type == 'ChiBusinessPartnerActive' || PersistenceFacade::getOIDParameter($oid, 'type') == 'ChiBusinessPartnerActive')
      {
        // for every NMUCActor we have to get the ChiBusinessPartnerActive parents 
        $children = parent::getChildrenEx(null, 'NMUCActor', array('fk_chiworkerinternal_id' => $this->getDBID()), null);
        $grandChildren = array();
        $persistenceFacade = &PersistenceFacade::getInstance();
        for($i=0; $i<sizeof($children); $i++)
        {
          // load the parents
          $grandChildrenParents = array();
          foreach ($children[$i]->getProperty('parentoids') as $parentoid)
          {
            if (PersistenceFacade::getOIDParameter($parentoid, 'type') == 'ChiBusinessPartnerActive')
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
      // handle NMUCActor as many-to-many type
      if ($type == 'ChiWorker' || PersistenceFacade::getOIDParameter($oid, 'type') == 'ChiWorker')
      {
        // for every NMUCActor we have to get the ChiWorker parents 
        $children = parent::getChildrenEx(null, 'NMUCActor', array('fk_chiworkerinternal_id' => $this->getDBID()), null);
        $grandChildren = array();
        $persistenceFacade = &PersistenceFacade::getInstance();
        for($i=0; $i<sizeof($children); $i++)
        {
          // load the parents
          $grandChildrenParents = array();
          foreach ($children[$i]->getProperty('parentoids') as $parentoid)
          {
            if (PersistenceFacade::getOIDParameter($parentoid, 'type') == 'ChiWorker')
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
      // handle NMUCActor as many-to-many type
      if ($type == 'ChiWorkerExternal' || PersistenceFacade::getOIDParameter($oid, 'type') == 'ChiWorkerExternal')
      {
        // for every NMUCActor we have to get the ChiWorkerExternal parents 
        $children = parent::getChildrenEx(null, 'NMUCActor', array('fk_chiworkerinternal_id' => $this->getDBID()), null);
        $grandChildren = array();
        $persistenceFacade = &PersistenceFacade::getInstance();
        for($i=0; $i<sizeof($children); $i++)
        {
          // load the parents
          $grandChildrenParents = array();
          foreach ($children[$i]->getProperty('parentoids') as $parentoid)
          {
            if (PersistenceFacade::getOIDParameter($parentoid, 'type') == 'ChiWorkerExternal')
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
          $child->addChild($associationNode);
        }
        else
          $associationNode = &$persistenceFacade->load($relOID, BUILDTYPE_SINGLE);
        // set child parameter to associationNode and prodeed with default behaviour
        $child = &$associationNode;
      }
      if ($child != null && $child->getType() == 'Actor')
      {
        // for every Actor we have to insert a NMUCActor
        $persistenceFacade = &PersistenceFacade::getInstance();
        // check if the relation already exists
        $relOID = $persistenceFacade->getFirstOID('NMUCActor', array('fk_chiworkerinternal_id' => $this->getDBID(), 'fk_actor_id' => $child->getDBID()));
        if ($relOID == null)
        {
          // add the child only if it is not added already
          $associationNode = &$persistenceFacade->create('NMUCActor', BUILDTYPE_SINGLE);
          $associationNode->setChiWorkerInternal($this);
          $associationNode->setActor($child);
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
          $child->addChild($associationNode);
        }
        else
          $associationNode = &$persistenceFacade->load($relOID, BUILDTYPE_SINGLE);
        // set child parameter to associationNode and prodeed with default behaviour
        $child = &$associationNode;
      }
      if ($child != null && $child->getType() == 'ChiBusinessPartner')
      {
        // for every ChiBusinessPartner we have to insert a NMUCActor
        $persistenceFacade = &PersistenceFacade::getInstance();
        // check if the relation already exists
        $relOID = $persistenceFacade->getFirstOID('NMUCActor', array('fk_chiworkerinternal_id' => $this->getDBID(), 'fk_chibusinesspartner_id' => $child->getDBID()));
        if ($relOID == null)
        {
          // add the child only if it is not added already
          $associationNode = &$persistenceFacade->create('NMUCActor', BUILDTYPE_SINGLE);
          $associationNode->setChiWorkerInternal($this);
          $associationNode->setChiBusinessPartner($child);
          $child->addChild($associationNode);
        }
        else
          $associationNode = &$persistenceFacade->load($relOID, BUILDTYPE_SINGLE);
        // set child parameter to associationNode and prodeed with default behaviour
        $child = &$associationNode;
      }
      if ($child != null && $child->getType() == 'ChiBusinessPartnerPassive')
      {
        // for every ChiBusinessPartnerPassive we have to insert a NMUCActor
        $persistenceFacade = &PersistenceFacade::getInstance();
        // check if the relation already exists
        $relOID = $persistenceFacade->getFirstOID('NMUCActor', array('fk_chiworkerinternal_id' => $this->getDBID(), 'fk_chibusinesspartnerpassive_id' => $child->getDBID()));
        if ($relOID == null)
        {
          // add the child only if it is not added already
          $associationNode = &$persistenceFacade->create('NMUCActor', BUILDTYPE_SINGLE);
          $associationNode->setChiWorkerInternal($this);
          $associationNode->setChiBusinessPartnerPassive($child);
          $child->addChild($associationNode);
        }
        else
          $associationNode = &$persistenceFacade->load($relOID, BUILDTYPE_SINGLE);
        // set child parameter to associationNode and prodeed with default behaviour
        $child = &$associationNode;
      }
      if ($child != null && $child->getType() == 'ChiBusinessPartnerActive')
      {
        // for every ChiBusinessPartnerActive we have to insert a NMUCActor
        $persistenceFacade = &PersistenceFacade::getInstance();
        // check if the relation already exists
        $relOID = $persistenceFacade->getFirstOID('NMUCActor', array('fk_chiworkerinternal_id' => $this->getDBID(), 'fk_chibusinesspartneractive_id' => $child->getDBID()));
        if ($relOID == null)
        {
          // add the child only if it is not added already
          $associationNode = &$persistenceFacade->create('NMUCActor', BUILDTYPE_SINGLE);
          $associationNode->setChiWorkerInternal($this);
          $associationNode->setChiBusinessPartnerActive($child);
          $child->addChild($associationNode);
        }
        else
          $associationNode = &$persistenceFacade->load($relOID, BUILDTYPE_SINGLE);
        // set child parameter to associationNode and prodeed with default behaviour
        $child = &$associationNode;
      }
      if ($child != null && $child->getType() == 'ChiWorker')
      {
        // for every ChiWorker we have to insert a NMUCActor
        $persistenceFacade = &PersistenceFacade::getInstance();
        // check if the relation already exists
        $relOID = $persistenceFacade->getFirstOID('NMUCActor', array('fk_chiworkerinternal_id' => $this->getDBID(), 'fk_chiworker_id' => $child->getDBID()));
        if ($relOID == null)
        {
          // add the child only if it is not added already
          $associationNode = &$persistenceFacade->create('NMUCActor', BUILDTYPE_SINGLE);
          $associationNode->setChiWorkerInternal($this);
          $associationNode->setChiWorker($child);
          $child->addChild($associationNode);
        }
        else
          $associationNode = &$persistenceFacade->load($relOID, BUILDTYPE_SINGLE);
        // set child parameter to associationNode and prodeed with default behaviour
        $child = &$associationNode;
      }
      if ($child != null && $child->getType() == 'ChiWorkerExternal')
      {
        // for every ChiWorkerExternal we have to insert a NMUCActor
        $persistenceFacade = &PersistenceFacade::getInstance();
        // check if the relation already exists
        $relOID = $persistenceFacade->getFirstOID('NMUCActor', array('fk_chiworkerinternal_id' => $this->getDBID(), 'fk_chiworkerexternal_id' => $child->getDBID()));
        if ($relOID == null)
        {
          // add the child only if it is not added already
          $associationNode = &$persistenceFacade->create('NMUCActor', BUILDTYPE_SINGLE);
          $associationNode->setChiWorkerInternal($this);
          $associationNode->setChiWorkerExternal($child);
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
        // set childOID parameter to the NMUCActor's object id and prodeed with default behaviour
        $ids = PersistenceFacade::getOIDParameter($childOID, 'id');
        array_unshift($ids, $this->getDBID());
        $childOID = PersistenceFacade::composeOID(array('type' => 'NMUCActor', 'id' => $ids));
      }
      if (PersistenceFacade::isValidOID($childOID) && PersistenceFacade::getOIDParameter($childOID, 'type') == 'Actor')
      {
        // for every Actor we have to delete the NMUCActor
        // set childOID parameter to the NMUCActor's object id and prodeed with default behaviour
        $ids = PersistenceFacade::getOIDParameter($childOID, 'id');
        array_unshift($ids, $this->getDBID());
        $childOID = PersistenceFacade::composeOID(array('type' => 'NMUCActor', 'id' => $ids));
      }
      if (PersistenceFacade::isValidOID($childOID) && PersistenceFacade::getOIDParameter($childOID, 'type') == 'ChiBusinessUseCaseCore')
      {
        // for every ChiBusinessUseCaseCore we have to delete the NMUCActor
        // set childOID parameter to the NMUCActor's object id and prodeed with default behaviour
        $ids = PersistenceFacade::getOIDParameter($childOID, 'id');
        array_unshift($ids, $this->getDBID());
        $childOID = PersistenceFacade::composeOID(array('type' => 'NMUCActor', 'id' => $ids));
      }
      if (PersistenceFacade::isValidOID($childOID) && PersistenceFacade::getOIDParameter($childOID, 'type') == 'ChiBusinessPartner')
      {
        // for every ChiBusinessPartner we have to delete the NMUCActor
        // set childOID parameter to the NMUCActor's object id and prodeed with default behaviour
        $ids = PersistenceFacade::getOIDParameter($childOID, 'id');
        array_unshift($ids, $this->getDBID());
        $childOID = PersistenceFacade::composeOID(array('type' => 'NMUCActor', 'id' => $ids));
      }
      if (PersistenceFacade::isValidOID($childOID) && PersistenceFacade::getOIDParameter($childOID, 'type') == 'ChiBusinessPartnerPassive')
      {
        // for every ChiBusinessPartnerPassive we have to delete the NMUCActor
        // set childOID parameter to the NMUCActor's object id and prodeed with default behaviour
        $ids = PersistenceFacade::getOIDParameter($childOID, 'id');
        array_unshift($ids, $this->getDBID());
        $childOID = PersistenceFacade::composeOID(array('type' => 'NMUCActor', 'id' => $ids));
      }
      if (PersistenceFacade::isValidOID($childOID) && PersistenceFacade::getOIDParameter($childOID, 'type') == 'ChiBusinessPartnerActive')
      {
        // for every ChiBusinessPartnerActive we have to delete the NMUCActor
        // set childOID parameter to the NMUCActor's object id and prodeed with default behaviour
        $ids = PersistenceFacade::getOIDParameter($childOID, 'id');
        array_unshift($ids, $this->getDBID());
        $childOID = PersistenceFacade::composeOID(array('type' => 'NMUCActor', 'id' => $ids));
      }
      if (PersistenceFacade::isValidOID($childOID) && PersistenceFacade::getOIDParameter($childOID, 'type') == 'ChiWorker')
      {
        // for every ChiWorker we have to delete the NMUCActor
        // set childOID parameter to the NMUCActor's object id and prodeed with default behaviour
        $ids = PersistenceFacade::getOIDParameter($childOID, 'id');
        array_unshift($ids, $this->getDBID());
        $childOID = PersistenceFacade::composeOID(array('type' => 'NMUCActor', 'id' => $ids));
      }
      if (PersistenceFacade::isValidOID($childOID) && PersistenceFacade::getOIDParameter($childOID, 'type') == 'ChiWorkerExternal')
      {
        // for every ChiWorkerExternal we have to delete the NMUCActor
        // set childOID parameter to the NMUCActor's object id and prodeed with default behaviour
        $ids = PersistenceFacade::getOIDParameter($childOID, 'id');
        array_unshift($ids, $this->getDBID());
        $childOID = PersistenceFacade::composeOID(array('type' => 'NMUCActor', 'id' => $ids));
      }
      // do default
      parent::deleteChild($childOID, $reallyDelete);
    }
}
?>
