<?php
/**
 * This file was generated by wCMFGenerator 2.6.1.0026 from model/requirements.xmi on 17.11.08 18:35. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/class.EntityBase.php");

/**
 * @class Figure
 * Figure description: A figure is the graphical reppresentation of a node can be linked with manies diagrams.
 *
 * @author Giuseppe Platania
 * @version 1.0
 */
class FigureBase extends EntityBase
{
    function FigureBase($oid=null, $type=null)
    {
    if ($type == null)
      parent::EntityBase($oid, 'Figure');
    else
      parent::EntityBase($oid, $type);
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("Figure");
    }
    /**
     * @see PersistentObject::getObjectDescription()
     */
    function getObjectDescription()
    {
      return Message::get("A figure is the graphical reppresentation of a node can be linked with manies diagrams.");
    }
    /**
     * @see PersistentObject::getValueDisplayName()
     */
    function getValueDisplayName($name, $type=null)
    {
      $displayName = $name;
      if ($name == 'id') $displayName = Message::get("id");
      if ($name == 'fk_diagram_id') $displayName = Message::get("fk_diagram_id");
      if ($name == 'BackgroundColor') $displayName = Message::get("BackgroundColor");
      if ($name == 'ForegroundColor') $displayName = Message::get("ForegroundColor");
      if ($name == 'GID') $displayName = Message::get("GID");
      if ($name == 'Height') $displayName = Message::get("Height");
      if ($name == 'PositionY') $displayName = Message::get("PositionY");
      if ($name == 'PositionX') $displayName = Message::get("PositionX");
      if ($name == 'Width') $displayName = Message::get("Width");
      return Message::get($displayName);
    }
    /**
     * @see PersistentObject::getValueDescription()
     */
    function getValueDescription($name, $type=null)
    {
      $description = $name;
      if ($name == 'id') $description = Message::get("");
      if ($name == 'fk_diagram_id') $description = Message::get("");
      if ($name == 'BackgroundColor') $description = Message::get("the background color in RBG");
      if ($name == 'ForegroundColor') $description = Message::get("the foreground color in RBG");
      if ($name == 'GID') $description = Message::get("");
      if ($name == 'Height') $description = Message::get("");
      if ($name == 'PositionY') $description = Message::get("the orizontal position of this object");
      if ($name == 'PositionX') $description = Message::get("the vertical position of this object");
      if ($name == 'Width') $description = Message::get("");
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
    function getFkDiagramId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_diagram_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_diagram_id', DATATYPE_IGNORE);
    }
    function setFkDiagramId($fk_diagram_id)
    {
      return $this->setValue('fk_diagram_id', $fk_diagram_id, DATATYPE_IGNORE);
    }
    function getBackgroundColor($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('BackgroundColor', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('BackgroundColor', DATATYPE_ATTRIBUTE);
    }
    function setBackgroundColor($BackgroundColor)
    {
      return $this->setValue('BackgroundColor', $BackgroundColor, DATATYPE_ATTRIBUTE);
    }
    function getForegroundColor($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('ForegroundColor', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('ForegroundColor', DATATYPE_ATTRIBUTE);
    }
    function setForegroundColor($ForegroundColor)
    {
      return $this->setValue('ForegroundColor', $ForegroundColor, DATATYPE_ATTRIBUTE);
    }
    function getGID($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('GID', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('GID', DATATYPE_ATTRIBUTE);
    }
    function setGID($GID)
    {
      return $this->setValue('GID', $GID, DATATYPE_ATTRIBUTE);
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
    function getPositionY($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('PositionY', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('PositionY', DATATYPE_ATTRIBUTE);
    }
    function setPositionY($PositionY)
    {
      return $this->setValue('PositionY', $PositionY, DATATYPE_ATTRIBUTE);
    }
    function getPositionX($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('PositionX', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('PositionX', DATATYPE_ATTRIBUTE);
    }
    function setPositionX($PositionX)
    {
      return $this->setValue('PositionX', $PositionX, DATATYPE_ATTRIBUTE);
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
    function getDiagramOID()
    {
      $fkValue = $this->getValue('fk_diagram_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'Diagram', 'id' => array($fkValue)));
      else
        return null;
    }
    function setDiagram(&$node)
    {
      if ($node != null)
        $node->addChild($this);
    }
    function getDiagramParents()
    {
      return $this->getParentsEx(null, 'Diagram', null, null);
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
