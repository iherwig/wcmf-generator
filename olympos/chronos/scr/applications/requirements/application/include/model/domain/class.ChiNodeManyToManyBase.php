<?php
/**
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Thu Jan 13 15:12:46 CET 2011. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/domain/class.ChiNode.php");

/**
 * @class ChiNodeManyToMany
 * ChiNodeManyToMany description: A many to many node used in Chronos. It is used to realize a many to many relation between two ChiNodes.
 *
 * @author 
 * @version 1.0
 */
class ChiNodeManyToManyBase extends ChiNode
{
    function ChiNodeManyToManyBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::__construct($oid, 'ChiNodeManyToMany');
      else
        parent::__construct($oid, $type);
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("ChiNodeManyToMany");
    }
    /**
     * @see PersistentObject::getObjectDescription()
     */
    function getObjectDescription()
    {
      return Message::get("A many to many node used in Chronos. It is used to realize a many to many relation between two ChiNodes.");
    }
    /**
     * @see PersistentObject::getValueDisplayName()
     */
    function getValueDisplayName($name, $type=null)
    {
      $displayName = $name;
      if ($name == 'id') $displayName = Message::get("id");
      if ($name == 'fk_chicontroller_id') $displayName = Message::get("fk_chicontroller_id");
      if ($name == 'fk_package_id') $displayName = Message::get("fk_package_id");
      if ($name == 'display_value') $displayName = Message::get("display_value");
      if ($name == 'table_name') $displayName = Message::get("table_name");
      if ($name == 'is_ordered') $displayName = Message::get("is_ordered");
      if ($name == 'parent_order') $displayName = Message::get("parent_order");
      if ($name == 'child_order') $displayName = Message::get("child_order");
      if ($name == 'pk_name') $displayName = Message::get("pk_name");
      if ($name == 'is_searchable') $displayName = Message::get("is_searchable");
      if ($name == 'orderby') $displayName = Message::get("orderby");
      if ($name == 'is_soap') $displayName = Message::get("is_soap");
      if ($name == 'initparams') $displayName = Message::get("initparams");
      if ($name == 'visibility') $displayName = Message::get("visibility");
      if ($name == 'isAbstract') $displayName = Message::get("isAbstract");
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
      if ($name == 'fk_chicontroller_id') $description = Message::get("");
      if ($name == 'fk_package_id') $description = Message::get("");
      if ($name == 'display_value') $description = Message::get("The value that is displayed in a list view. a single value or '|' -separated list of values");
      if ($name == 'table_name') $description = Message::get("");
      if ($name == 'is_ordered') $description = Message::get("");
      if ($name == 'parent_order') $description = Message::get("The order of the associated parents. a single value or '|' -separated list of values");
      if ($name == 'child_order') $description = Message::get("The order of the associated children. a single value or '|' -separated list of values");
      if ($name == 'pk_name') $description = Message::get("The name of the primary key column on the database (optional). The generator will add this automatically if there is no appropriate attribute.");
      if ($name == 'is_searchable') $description = Message::get("Indicates wether this type should be included in the default search.");
      if ($name == 'orderby') $description = Message::get("Definition of default sorting. Possible values: 'none' (no order), 'sortkey' (generates a 'sortkey' column, that is used for explicit sorting) or any the name of any WCMFValue defined in the node optionally.");
      if ($name == 'is_soap') $description = Message::get("Define if the type should be exposed to the SOAP interface.");
      if ($name == 'initparams') $description = Message::get("Name of the configuration file's (config.ini) section, in which the initial parameters for the corresponding mapper are defined");
      if ($name == 'visibility') $description = Message::get("the visibility of this class (Public, Private, Protected, Package)");
      if ($name == 'isAbstract') $description = Message::get("if this type reppresent an abstract type only.");
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
    function getFkChicontrollerId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chicontroller_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chicontroller_id', DATATYPE_IGNORE);
    }
    function setFkChicontrollerId($fk_chicontroller_id)
    {
      return $this->setValue('fk_chicontroller_id', $fk_chicontroller_id, DATATYPE_IGNORE);
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
    /**
     * Getter/Setter for related objects
     */
    function __call($name, $arguments)
    {
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
      // foreign key: ChiController
      if ($name == 'getChiControllerOID')
    {
      $fkValue = $this->getValue('fk_chicontroller_id', DATATYPE_IGNORE);
        if ($fkValue != null) {
        return PersistenceFacade::composeOID(array('type' => 'ChiController', 'id' => array($fkValue)));
        }
        else {
        return null;
    }
      }
      if ($name == 'setChiController')
    {
        $node = &$arguments[0];
      if ($node != null)
        {
          if (!is_a($node, 'node') && !is_a($node, 'Node')) {
            call_user_func_array(array(parent, 'setChiController'), $arguments);
          }
          else {
        $this->setValue('fk_chicontroller_id', $node->getDBID(), DATATYPE_IGNORE);
    }
        }
        return;
      }
      // parent: Package
      if ($name == 'getPackageParents') {
      return $this->getParentsEx(null, 'Package', null, null);
    }
      // parent: ChiController
      if ($name == 'getChiControllerParents') {
      return $this->getParentsEx(null, 'ChiController', null, null);
    }
      // child: NMChiNodeChiMany2Many
      if ($name == 'getNMChiNodeChiMany2ManyList')
    {
      Log::warn("use of deprecated method getNMChiNodeChiMany2ManyList. use getNMChiNodeChiMany2ManyChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getNMChiNodeChiMany2ManyChildren();
    }
      if ($name == 'getNMChiNodeChiMany2ManyChildren') {
        return $this->getChildrenEx(null, 'NMChiNodeChiMany2Many', array('fk_chinodemanytomany_id' => $this->getDBID()), null, false);
    }
      // child: NodeManyToManyTargetEnd
      if ($name == 'getNodeManyToManyTargetEndList')
    {
      Log::warn("use of deprecated method getNodeManyToManyTargetEndList. use getNodeManyToManyTargetEndChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getNodeManyToManyTargetEndChildren();
    }
      if ($name == 'getNodeManyToManyTargetEndChildren') {
        return $this->getChildrenEx(null, 'ChiAssociation', array('fk_chinodemanytomanytarget_id' => $this->getDBID()), null, false);
    }
      // child: NodeManyToManySourceEnd
      if ($name == 'getNodeManyToManySourceEndList')
    {
      Log::warn("use of deprecated method getNodeManyToManySourceEndList. use getNodeManyToManySourceEndChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getNodeManyToManySourceEndChildren();
    }
      if ($name == 'getNodeManyToManySourceEndChildren') {
        return $this->getChildrenEx(null, 'ChiAssociation', array('fk_chinodemanytomanysource_id' => $this->getDBID()), null, false);
    }
      // child: Figure
      if ($name == 'getFigureList')
    {
      Log::warn("use of deprecated method getFigureList. use getFigureChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getFigureChildren();
    }
      if ($name == 'getFigureChildren') {
        return $this->getChildrenEx(null, 'Figure', array('fk_chinodemanytomany_id' => $this->getDBID()), null, false);
    }
      // child: ChiValue
      if ($name == 'getChiValueList')
    {
      Log::warn("use of deprecated method getChiValueList. use getChiValueChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getChiValueChildren();
    }
      if ($name == 'getChiValueChildren') {
        return $this->getChildrenEx(null, 'ChiValue', array('fk_chinodemanytomany_id' => $this->getDBID()), null, false);
    }
      // child: ChiView
      if ($name == 'getChiViewList')
    {
      Log::warn("use of deprecated method getChiViewList. use getChiViewChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getChiViewChildren();
    }
      if ($name == 'getChiViewChildren') {
        return $this->getChildrenEx(null, 'ChiView', array('fk_chinodemanytomany_id' => $this->getDBID()), null, false);
    }
      // child: ChiObject
      if ($name == 'getChiObjectList')
    {
      Log::warn("use of deprecated method getChiObjectList. use getChiObjectChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getChiObjectChildren();
    }
      if ($name == 'getChiObjectChildren') {
        return $this->getChildrenEx(null, 'ChiObject', array('fk_chinodemanytomany_id' => $this->getDBID()), null, false);
    }
      // child: ChiValueRef
      if ($name == 'getChiValueRefList')
    {
      Log::warn("use of deprecated method getChiValueRefList. use getChiValueRefChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getChiValueRefChildren();
    }
      if ($name == 'getChiValueRefChildren') {
        return $this->getChildrenEx(null, 'ChiValueRef', array('fk_chinodemanytomany_id' => $this->getDBID()), null, false);
    }
      // child: Operation
      if ($name == 'getOperationList')
    {
      Log::warn("use of deprecated method getOperationList. use getOperationChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getOperationChildren();
    }
      if ($name == 'getOperationChildren') {
        return $this->getChildrenEx(null, 'Operation', array('fk_chinodemanytomany_id' => $this->getDBID()), null, false);
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
      // do default
      parent::loadChildren($type, $buildDepth, $forceUpdate);
    }
    /**
     * @see Node::getChildrenEx()
     * Override this to also get the children of many-to-many relations
     */
    function getChildrenEx($oid, $type, $values, $properties, $useRegExp=true)
    {
      // do default
      return parent::getChildrenEx($oid, $type, $values, $properties, $useRegExp);
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
