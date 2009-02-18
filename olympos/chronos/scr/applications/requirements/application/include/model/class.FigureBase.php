<?php
/**
 * This file was generated by wCMFGenerator 3.0.0004 from ./model/cwm.uml on Tue Feb 17 13:00:31 CET 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/class.EntityBase.php");

/**
 * @class Figure
 * Figure description: A figure is the graphical reppresentation of a node can be linked with manies diagrams.
 *
 * @author 
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
      if ($name == 'fk_nmactivityactivitydecision_id') $displayName = Message::get("fk_nmactivityactivitydecision_id");
      if ($name == 'fk_activity_id') $displayName = Message::get("fk_activity_id");
      if ($name == 'fk_activitydecision_id') $displayName = Message::get("fk_activitydecision_id");
      if ($name == 'fk_activityreceive_id') $displayName = Message::get("fk_activityreceive_id");
      if ($name == 'fk_activitysend_id') $displayName = Message::get("fk_activitysend_id");
      if ($name == 'fk_activityinitial_id') $displayName = Message::get("fk_activityinitial_id");
      if ($name == 'fk_activityfinal_id') $displayName = Message::get("fk_activityfinal_id");
      if ($name == 'fk_chiworkerexternal_id') $displayName = Message::get("fk_chiworkerexternal_id");
      if ($name == 'fk_chiworkerinternal_id') $displayName = Message::get("fk_chiworkerinternal_id");
      if ($name == 'fk_chiworker_id') $displayName = Message::get("fk_chiworker_id");
      if ($name == 'fk_chibusinesspartneractive_id') $displayName = Message::get("fk_chibusinesspartneractive_id");
      if ($name == 'fk_chibusinesspartnerpassive_id') $displayName = Message::get("fk_chibusinesspartnerpassive_id");
      if ($name == 'fk_chibusinesspartner_id') $displayName = Message::get("fk_chibusinesspartner_id");
      if ($name == 'fk_actor_id') $displayName = Message::get("fk_actor_id");
      if ($name == 'fk_chibusinessprocess_id') $displayName = Message::get("fk_chibusinessprocess_id");
      if ($name == 'fk_chibusinessusecasecore_id') $displayName = Message::get("fk_chibusinessusecasecore_id");
      if ($name == 'fk_chibusinessusecase_id') $displayName = Message::get("fk_chibusinessusecase_id");
      if ($name == 'fk_chigoal_id') $displayName = Message::get("fk_chigoal_id");
      if ($name == 'fk_chirequirement_id') $displayName = Message::get("fk_chirequirement_id");
      if ($name == 'fk_chifeature_id') $displayName = Message::get("fk_chifeature_id");
      if ($name == 'fk_chiissue_id') $displayName = Message::get("fk_chiissue_id");
      if ($name == 'fk_chicontroller_id') $displayName = Message::get("fk_chicontroller_id");
      if ($name == 'fk_chinode_id') $displayName = Message::get("fk_chinode_id");
      if ($name == 'fk_chiview_id') $displayName = Message::get("fk_chiview_id");
      if ($name == 'fk_diagram_id') $displayName = Message::get("fk_diagram_id");
      if ($name == 'fk_chibase_id') $displayName = Message::get("fk_chibase_id");
      if ($name == 'BackgroundColor') $displayName = Message::get("BackgroundColor");
      if ($name == 'ForegroundColor') $displayName = Message::get("ForegroundColor");
      if ($name == 'GID') $displayName = Message::get("GID");
      if ($name == 'Height') $displayName = Message::get("Height");
      if ($name == 'PositionY') $displayName = Message::get("PositionY");
      if ($name == 'PositionX') $displayName = Message::get("PositionX");
      if ($name == 'Width') $displayName = Message::get("Width");
      if ($name == 'created') $displayName = Message::get("created");
      if ($name == 'creator') $displayName = Message::get("creator");
      if ($name == 'last_editor') $displayName = Message::get("last_editor");
      if ($name == 'modified') $displayName = Message::get("modified");
      return Message::get($displayName);
    }
    /**
     * @see PersistentObject::getValueDescription()
     */
    function getValueDescription($name, $type=null)
    {
      $description = $name;
      if ($name == 'id') $description = Message::get("");
      if ($name == 'fk_nmactivityactivitydecision_id') $description = Message::get("");
      if ($name == 'fk_activity_id') $description = Message::get("");
      if ($name == 'fk_activitydecision_id') $description = Message::get("");
      if ($name == 'fk_activityreceive_id') $description = Message::get("");
      if ($name == 'fk_activitysend_id') $description = Message::get("");
      if ($name == 'fk_activityinitial_id') $description = Message::get("");
      if ($name == 'fk_activityfinal_id') $description = Message::get("");
      if ($name == 'fk_chiworkerexternal_id') $description = Message::get("");
      if ($name == 'fk_chiworkerinternal_id') $description = Message::get("");
      if ($name == 'fk_chiworker_id') $description = Message::get("");
      if ($name == 'fk_chibusinesspartneractive_id') $description = Message::get("");
      if ($name == 'fk_chibusinesspartnerpassive_id') $description = Message::get("");
      if ($name == 'fk_chibusinesspartner_id') $description = Message::get("");
      if ($name == 'fk_actor_id') $description = Message::get("");
      if ($name == 'fk_chibusinessprocess_id') $description = Message::get("");
      if ($name == 'fk_chibusinessusecasecore_id') $description = Message::get("");
      if ($name == 'fk_chibusinessusecase_id') $description = Message::get("");
      if ($name == 'fk_chigoal_id') $description = Message::get("");
      if ($name == 'fk_chirequirement_id') $description = Message::get("");
      if ($name == 'fk_chifeature_id') $description = Message::get("");
      if ($name == 'fk_chiissue_id') $description = Message::get("");
      if ($name == 'fk_chicontroller_id') $description = Message::get("");
      if ($name == 'fk_chinode_id') $description = Message::get("");
      if ($name == 'fk_chiview_id') $description = Message::get("");
      if ($name == 'fk_diagram_id') $description = Message::get("");
      if ($name == 'fk_chibase_id') $description = Message::get("");
      if ($name == 'BackgroundColor') $description = Message::get("the background color in RBG");
      if ($name == 'ForegroundColor') $description = Message::get("the foreground color in RBG");
      if ($name == 'GID') $description = Message::get("");
      if ($name == 'Height') $description = Message::get("");
      if ($name == 'PositionY') $description = Message::get("the orizontal position of this object");
      if ($name == 'PositionX') $description = Message::get("the vertical position of this object");
      if ($name == 'Width') $description = Message::get("");
      if ($name == 'created') $description = Message::get("the creation date of this object");
      if ($name == 'creator') $description = Message::get("the user that created this object");
      if ($name == 'last_editor') $description = Message::get("the last user that edited this object");
      if ($name == 'modified') $description = Message::get("the date when this object was modified");
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
    function getFkNmactivityactivitydecisionId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_nmactivityactivitydecision_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_nmactivityactivitydecision_id', DATATYPE_IGNORE);
    }
    function setFkNmactivityactivitydecisionId($fk_nmactivityactivitydecision_id)
    {
      return $this->setValue('fk_nmactivityactivitydecision_id', $fk_nmactivityactivitydecision_id, DATATYPE_IGNORE);
    }
    function getFkActivityId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_activity_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_activity_id', DATATYPE_IGNORE);
    }
    function setFkActivityId($fk_activity_id)
    {
      return $this->setValue('fk_activity_id', $fk_activity_id, DATATYPE_IGNORE);
    }
    function getFkActivitydecisionId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_activitydecision_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_activitydecision_id', DATATYPE_IGNORE);
    }
    function setFkActivitydecisionId($fk_activitydecision_id)
    {
      return $this->setValue('fk_activitydecision_id', $fk_activitydecision_id, DATATYPE_IGNORE);
    }
    function getFkActivityreceiveId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_activityreceive_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_activityreceive_id', DATATYPE_IGNORE);
    }
    function setFkActivityreceiveId($fk_activityreceive_id)
    {
      return $this->setValue('fk_activityreceive_id', $fk_activityreceive_id, DATATYPE_IGNORE);
    }
    function getFkActivitysendId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_activitysend_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_activitysend_id', DATATYPE_IGNORE);
    }
    function setFkActivitysendId($fk_activitysend_id)
    {
      return $this->setValue('fk_activitysend_id', $fk_activitysend_id, DATATYPE_IGNORE);
    }
    function getFkActivityinitialId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_activityinitial_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_activityinitial_id', DATATYPE_IGNORE);
    }
    function setFkActivityinitialId($fk_activityinitial_id)
    {
      return $this->setValue('fk_activityinitial_id', $fk_activityinitial_id, DATATYPE_IGNORE);
    }
    function getFkActivityfinalId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_activityfinal_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_activityfinal_id', DATATYPE_IGNORE);
    }
    function setFkActivityfinalId($fk_activityfinal_id)
    {
      return $this->setValue('fk_activityfinal_id', $fk_activityfinal_id, DATATYPE_IGNORE);
    }
    function getFkChiworkerexternalId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chiworkerexternal_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chiworkerexternal_id', DATATYPE_IGNORE);
    }
    function setFkChiworkerexternalId($fk_chiworkerexternal_id)
    {
      return $this->setValue('fk_chiworkerexternal_id', $fk_chiworkerexternal_id, DATATYPE_IGNORE);
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
    function getFkChiworkerId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chiworker_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chiworker_id', DATATYPE_IGNORE);
    }
    function setFkChiworkerId($fk_chiworker_id)
    {
      return $this->setValue('fk_chiworker_id', $fk_chiworker_id, DATATYPE_IGNORE);
    }
    function getFkChibusinesspartneractiveId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chibusinesspartneractive_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chibusinesspartneractive_id', DATATYPE_IGNORE);
    }
    function setFkChibusinesspartneractiveId($fk_chibusinesspartneractive_id)
    {
      return $this->setValue('fk_chibusinesspartneractive_id', $fk_chibusinesspartneractive_id, DATATYPE_IGNORE);
    }
    function getFkChibusinesspartnerpassiveId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chibusinesspartnerpassive_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chibusinesspartnerpassive_id', DATATYPE_IGNORE);
    }
    function setFkChibusinesspartnerpassiveId($fk_chibusinesspartnerpassive_id)
    {
      return $this->setValue('fk_chibusinesspartnerpassive_id', $fk_chibusinesspartnerpassive_id, DATATYPE_IGNORE);
    }
    function getFkChibusinesspartnerId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chibusinesspartner_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chibusinesspartner_id', DATATYPE_IGNORE);
    }
    function setFkChibusinesspartnerId($fk_chibusinesspartner_id)
    {
      return $this->setValue('fk_chibusinesspartner_id', $fk_chibusinesspartner_id, DATATYPE_IGNORE);
    }
    function getFkActorId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_actor_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_actor_id', DATATYPE_IGNORE);
    }
    function setFkActorId($fk_actor_id)
    {
      return $this->setValue('fk_actor_id', $fk_actor_id, DATATYPE_IGNORE);
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
    function getFkChibusinessusecasecoreId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chibusinessusecasecore_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chibusinessusecasecore_id', DATATYPE_IGNORE);
    }
    function setFkChibusinessusecasecoreId($fk_chibusinessusecasecore_id)
    {
      return $this->setValue('fk_chibusinessusecasecore_id', $fk_chibusinessusecasecore_id, DATATYPE_IGNORE);
    }
    function getFkChibusinessusecaseId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chibusinessusecase_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chibusinessusecase_id', DATATYPE_IGNORE);
    }
    function setFkChibusinessusecaseId($fk_chibusinessusecase_id)
    {
      return $this->setValue('fk_chibusinessusecase_id', $fk_chibusinessusecase_id, DATATYPE_IGNORE);
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
    function getFkChifeatureId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chifeature_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chifeature_id', DATATYPE_IGNORE);
    }
    function setFkChifeatureId($fk_chifeature_id)
    {
      return $this->setValue('fk_chifeature_id', $fk_chifeature_id, DATATYPE_IGNORE);
    }
    function getFkChiissueId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chiissue_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chiissue_id', DATATYPE_IGNORE);
    }
    function setFkChiissueId($fk_chiissue_id)
    {
      return $this->setValue('fk_chiissue_id', $fk_chiissue_id, DATATYPE_IGNORE);
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
    function getFkChinodeId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chinode_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chinode_id', DATATYPE_IGNORE);
    }
    function setFkChinodeId($fk_chinode_id)
    {
      return $this->setValue('fk_chinode_id', $fk_chinode_id, DATATYPE_IGNORE);
    }
    function getFkChiviewId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chiview_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chiview_id', DATATYPE_IGNORE);
    }
    function setFkChiviewId($fk_chiview_id)
    {
      return $this->setValue('fk_chiview_id', $fk_chiview_id, DATATYPE_IGNORE);
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
    function getFkChibaseId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chibase_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chibase_id', DATATYPE_IGNORE);
    }
    function setFkChibaseId($fk_chibase_id)
    {
      return $this->setValue('fk_chibase_id', $fk_chibase_id, DATATYPE_IGNORE);
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
    function getChiBaseOID()
    {
      $fkValue = $this->getValue('fk_chibase_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiBase', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiBase(&$node)
    {
      if ($node != null)
        $this->setValue('fk_chibase_id', $node->getDBID(), DATATYPE_IGNORE);
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
        $this->setValue('fk_diagram_id', $node->getDBID(), DATATYPE_IGNORE);
    }
    function getChiViewOID()
    {
      $fkValue = $this->getValue('fk_chiview_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiView', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiView(&$node)
    {
      if ($node != null)
        $this->setValue('fk_chiview_id', $node->getDBID(), DATATYPE_IGNORE);
    }
    function getChiNodeOID()
    {
      $fkValue = $this->getValue('fk_chinode_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiNode', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiNode(&$node)
    {
      if ($node != null)
        $this->setValue('fk_chinode_id', $node->getDBID(), DATATYPE_IGNORE);
    }
    function getChiControllerOID()
    {
      $fkValue = $this->getValue('fk_chicontroller_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiController', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiController(&$node)
    {
      if ($node != null)
        $this->setValue('fk_chicontroller_id', $node->getDBID(), DATATYPE_IGNORE);
    }
    function getChiIssueOID()
    {
      $fkValue = $this->getValue('fk_chiissue_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiIssue', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiIssue(&$node)
    {
      if ($node != null)
        $this->setValue('fk_chiissue_id', $node->getDBID(), DATATYPE_IGNORE);
    }
    function getChiFeatureOID()
    {
      $fkValue = $this->getValue('fk_chifeature_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiFeature', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiFeature(&$node)
    {
      if ($node != null)
        $this->setValue('fk_chifeature_id', $node->getDBID(), DATATYPE_IGNORE);
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
    function getChiBusinessUseCaseOID()
    {
      $fkValue = $this->getValue('fk_chibusinessusecase_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiBusinessUseCase', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiBusinessUseCase(&$node)
    {
      if ($node != null)
        $this->setValue('fk_chibusinessusecase_id', $node->getDBID(), DATATYPE_IGNORE);
    }
    function getChiBusinessUseCaseCoreOID()
    {
      $fkValue = $this->getValue('fk_chibusinessusecasecore_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiBusinessUseCaseCore', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiBusinessUseCaseCore(&$node)
    {
      if ($node != null)
        $this->setValue('fk_chibusinessusecasecore_id', $node->getDBID(), DATATYPE_IGNORE);
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
    function getActorOID()
    {
      $fkValue = $this->getValue('fk_actor_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'Actor', 'id' => array($fkValue)));
      else
        return null;
    }
    function setActor(&$node)
    {
      if ($node != null)
        $this->setValue('fk_actor_id', $node->getDBID(), DATATYPE_IGNORE);
    }
    function getChiBusinessPartnerOID()
    {
      $fkValue = $this->getValue('fk_chibusinesspartner_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiBusinessPartner', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiBusinessPartner(&$node)
    {
      if ($node != null)
        $this->setValue('fk_chibusinesspartner_id', $node->getDBID(), DATATYPE_IGNORE);
    }
    function getChiBusinessPartnerPassiveOID()
    {
      $fkValue = $this->getValue('fk_chibusinesspartnerpassive_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiBusinessPartnerPassive', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiBusinessPartnerPassive(&$node)
    {
      if ($node != null)
        $this->setValue('fk_chibusinesspartnerpassive_id', $node->getDBID(), DATATYPE_IGNORE);
    }
    function getChiBusinessPartnerActiveOID()
    {
      $fkValue = $this->getValue('fk_chibusinesspartneractive_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiBusinessPartnerActive', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiBusinessPartnerActive(&$node)
    {
      if ($node != null)
        $this->setValue('fk_chibusinesspartneractive_id', $node->getDBID(), DATATYPE_IGNORE);
    }
    function getChiWorkerOID()
    {
      $fkValue = $this->getValue('fk_chiworker_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiWorker', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiWorker(&$node)
    {
      if ($node != null)
        $this->setValue('fk_chiworker_id', $node->getDBID(), DATATYPE_IGNORE);
    }
    function getChiWorkerInternalOID()
    {
      $fkValue = $this->getValue('fk_chiworkerinternal_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiWorkerInternal', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiWorkerInternal(&$node)
    {
      if ($node != null)
        $this->setValue('fk_chiworkerinternal_id', $node->getDBID(), DATATYPE_IGNORE);
    }
    function getChiWorkerExternalOID()
    {
      $fkValue = $this->getValue('fk_chiworkerexternal_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiWorkerExternal', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiWorkerExternal(&$node)
    {
      if ($node != null)
        $this->setValue('fk_chiworkerexternal_id', $node->getDBID(), DATATYPE_IGNORE);
    }
    function getActivityFinalOID()
    {
      $fkValue = $this->getValue('fk_activityfinal_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ActivityFinal', 'id' => array($fkValue)));
      else
        return null;
    }
    function setActivityFinal(&$node)
    {
      if ($node != null)
        $this->setValue('fk_activityfinal_id', $node->getDBID(), DATATYPE_IGNORE);
    }
    function getActivityInitialOID()
    {
      $fkValue = $this->getValue('fk_activityinitial_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ActivityInitial', 'id' => array($fkValue)));
      else
        return null;
    }
    function setActivityInitial(&$node)
    {
      if ($node != null)
        $this->setValue('fk_activityinitial_id', $node->getDBID(), DATATYPE_IGNORE);
    }
    function getActivitySendOID()
    {
      $fkValue = $this->getValue('fk_activitysend_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ActivitySend', 'id' => array($fkValue)));
      else
        return null;
    }
    function setActivitySend(&$node)
    {
      if ($node != null)
        $this->setValue('fk_activitysend_id', $node->getDBID(), DATATYPE_IGNORE);
    }
    function getActivityReceiveOID()
    {
      $fkValue = $this->getValue('fk_activityreceive_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ActivityReceive', 'id' => array($fkValue)));
      else
        return null;
    }
    function setActivityReceive(&$node)
    {
      if ($node != null)
        $this->setValue('fk_activityreceive_id', $node->getDBID(), DATATYPE_IGNORE);
    }
    function getActivityDecisionOID()
    {
      $fkValue = $this->getValue('fk_activitydecision_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ActivityDecision', 'id' => array($fkValue)));
      else
        return null;
    }
    function setActivityDecision(&$node)
    {
      if ($node != null)
        $this->setValue('fk_activitydecision_id', $node->getDBID(), DATATYPE_IGNORE);
    }
    function getActivityOID()
    {
      $fkValue = $this->getValue('fk_activity_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'Activity', 'id' => array($fkValue)));
      else
        return null;
    }
    function setActivity(&$node)
    {
      if ($node != null)
        $this->setValue('fk_activity_id', $node->getDBID(), DATATYPE_IGNORE);
    }
    function getNMActivityActivityDecisionOID()
    {
      $fkValue = $this->getValue('fk_nmactivityactivitydecision_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'NMActivityActivityDecision', 'id' => array($fkValue)));
      else
        return null;
    }
    function setNMActivityActivityDecision(&$node)
    {
      if ($node != null)
        $this->setValue('fk_nmactivityactivitydecision_id', $node->getDBID(), DATATYPE_IGNORE);
    }
    function getChiBaseParents()
    {
      return $this->getParentsEx(null, 'ChiBase', null, null);
    }
    function getDiagramParents()
    {
      return $this->getParentsEx(null, 'Diagram', null, null);
    }
    function getChiViewParents()
    {
      return $this->getParentsEx(null, 'ChiView', null, null);
    }
    function getChiNodeParents()
    {
      return $this->getParentsEx(null, 'ChiNode', null, null);
    }
    function getChiControllerParents()
    {
      return $this->getParentsEx(null, 'ChiController', null, null);
    }
    function getChiIssueParents()
    {
      return $this->getParentsEx(null, 'ChiIssue', null, null);
    }
    function getChiFeatureParents()
    {
      return $this->getParentsEx(null, 'ChiFeature', null, null);
    }
    function getChiRequirementParents()
    {
      return $this->getParentsEx(null, 'ChiRequirement', null, null);
    }
    function getChiGoalParents()
    {
      return $this->getParentsEx(null, 'ChiGoal', null, null);
    }
    function getChiBusinessUseCaseParents()
    {
      return $this->getParentsEx(null, 'ChiBusinessUseCase', null, null);
    }
    function getChiBusinessUseCaseCoreParents()
    {
      return $this->getParentsEx(null, 'ChiBusinessUseCaseCore', null, null);
    }
    function getChiBusinessProcessParents()
    {
      return $this->getParentsEx(null, 'ChiBusinessProcess', null, null);
    }
    function getActorParents()
    {
      return $this->getParentsEx(null, 'Actor', null, null);
    }
    function getChiBusinessPartnerParents()
    {
      return $this->getParentsEx(null, 'ChiBusinessPartner', null, null);
    }
    function getChiBusinessPartnerPassiveParents()
    {
      return $this->getParentsEx(null, 'ChiBusinessPartnerPassive', null, null);
    }
    function getChiBusinessPartnerActiveParents()
    {
      return $this->getParentsEx(null, 'ChiBusinessPartnerActive', null, null);
    }
    function getChiWorkerParents()
    {
      return $this->getParentsEx(null, 'ChiWorker', null, null);
    }
    function getChiWorkerInternalParents()
    {
      return $this->getParentsEx(null, 'ChiWorkerInternal', null, null);
    }
    function getChiWorkerExternalParents()
    {
      return $this->getParentsEx(null, 'ChiWorkerExternal', null, null);
    }
    function getActivityFinalParents()
    {
      return $this->getParentsEx(null, 'ActivityFinal', null, null);
    }
    function getActivityInitialParents()
    {
      return $this->getParentsEx(null, 'ActivityInitial', null, null);
    }
    function getActivitySendParents()
    {
      return $this->getParentsEx(null, 'ActivitySend', null, null);
    }
    function getActivityReceiveParents()
    {
      return $this->getParentsEx(null, 'ActivityReceive', null, null);
    }
    function getActivityDecisionParents()
    {
      return $this->getParentsEx(null, 'ActivityDecision', null, null);
    }
    function getActivityParents()
    {
      return $this->getParentsEx(null, 'Activity', null, null);
    }
    function getNMActivityActivityDecisionParents()
    {
      return $this->getParentsEx(null, 'NMActivityActivityDecision', null, null);
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
