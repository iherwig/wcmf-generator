<?php
/**
 * This file was generated by wCMFGenerator 2.6.1.0026 from model/requirements.xmi on 17.11.08 18:35. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/class.EntityBaseExtended.php");

/**
 * @class Diagram
 * Diagram description: 
 *
 * @author Giuseppe Platania
 * @version 1.0
 */
class DiagramBase extends EntityBaseExtended
{
    function DiagramBase($oid=null, $type=null)
    {
    if ($type == null)
      parent::EntityBaseExtended($oid, 'Diagram');
    else
      parent::EntityBaseExtended($oid, $type);
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("Diagram");
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
      if ($name == 'fk_package_id') $displayName = Message::get("fk_package_id");
      if ($name == 'Width') $displayName = Message::get("Width");
      if ($name == 'Height') $displayName = Message::get("Height");
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
      if ($name == 'Width') $description = Message::get("The weight of the diagram in pixel");
      if ($name == 'Height') $description = Message::get("The height of the diagram");
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
    function getWidth($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('Width', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('Width', DATATYPE_ATTRIBUTE);
    }
    function setWidth($Width)
    {
      return $this->setValue('Width', $Width, DATATYPE_ATTRIBUTE);
    }
    function getHeight($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('Height', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('Height', DATATYPE_ATTRIBUTE);
    }
    function setHeight($Height)
    {
      return $this->setValue('Height', $Height, DATATYPE_ATTRIBUTE);
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
        $node->addChild($this);
    }
    function getPackageParents()
    {
      return $this->getParentsEx(null, 'Package', null, null);
    }
    /**
     * @deprecated use getFigureChildren() instead
     */
    function getFigureList()
    {
      Message::log("use of deprecated method getFigureList. use getFigureChildren() instead.\n".Message::getStackTrace(), __FILE__, __LINE__);
      return $this->getFigureChildren();
    }
    function getFigureChildren()
    {
      return $this->getChildrenEx(null, 'Figure', array('fk_diagram_id' => $this->getDBID()), null);
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
      // do default
      parent::loadChildren($type, $buildDepth, $forceUpdate);
    }
    /**
     * @see Node::getChildrenEx()
     * Override this to also get the children of many-to-many relations
     */
    function getChildrenEx($oid, $type, $values, $properties)
    {
      // do default
      return parent::getChildrenEx($oid, $type, $values, $properties);
    }
    /**
     * @see Node::addChild()
     * Override this to insert association objects if necessary
     */
    function addChild(&$child, $addtype=ADDCHILD_BACK)
    {
      // do default
      parent::addChild($child, $addtype);
    }
   /**
     * @see Node::deleteChild()
     * Override this to delete association objects if necessary
     */
    function deleteChild($childOID, $reallyDelete=false)
    {
      // do default
      parent::deleteChild($childOID, $reallyDelete);
    }
}
?>
