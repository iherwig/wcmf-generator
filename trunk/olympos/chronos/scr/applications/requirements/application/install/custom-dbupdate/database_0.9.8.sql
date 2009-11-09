ALTER TABLE `ControlFlow` CHANGE `id` `id` INT( 11 ) NOT NULL AUTO_INCREMENT;

# ActivityInitial -> Activity
INSERT INTO `ControlFlow` (`fk_activityinitial_id`, `fk_acontrolflowtarget_id`) SELECT `fk_activityinitial_id`, `id` FROM `Activity` WHERE `fk_activityinitial_id` IS NOT NULL;
UPDATE `Activity` SET `fk_activityinitial_id` = NULL WHERE `fk_activityinitial_id` IS NOT NULL;

# Activity -> ActivityFinal
INSERT INTO `ControlFlow` (`fk_activityfinal_id`, `fk_acontrolflowsource_id`) SELECT `id`, `fk_activity_id` FROM `ActivityFinal` WHERE `fk_activity_id` IS NOT NULL;
UPDATE `ActivityFinal` SET `fk_activity_id` = NULL WHERE `fk_activity_id` IS NOT NULL;

# ActivityReceive -> Activity
INSERT INTO `ControlFlow` (`fk_arcontrolflowsource_id`, `fk_acontrolflowtarget_id`) SELECT `fk_activityreceive_id`, `id` FROM `Activity` WHERE `fk_activityreceive_id` IS NOT NULL;
UPDATE `Activity` SET `fk_activityreceive_id` = NULL WHERE `fk_activityreceive_id` IS NOT NULL;

# Activity -> ActivitySend
INSERT INTO `ControlFlow` (`fk_ascontrolflowtarget_id`, `fk_acontrolflowsource_id`) SELECT `id`, `fk_activity_id` FROM `ActivitySend` WHERE `fk_activity_id` IS NOT NULL;
UPDATE `ActivitySend` SET `fk_activity_id` = NULL WHERE `fk_activity_id` IS NOT NULL;

# ActivitySend -> ActivityReceive
INSERT INTO `ControlFlow` (`fk_ascontrolflowsource_id`, `fk_arcontrolflowtarget_id`) SELECT `fk_activitysend_id`, `id` FROM `ActivityReceive` WHERE `fk_activitysend_id` IS NOT NULL;
UPDATE `ActivityReceive` SET `fk_activitysend_id` = NULL WHERE `fk_activitysend_id` IS NOT NULL;

# Activity -> Activity
INSERT INTO `ControlFlow` (`fk_acontrolflowsource_id`, `fk_acontrolflowtarget_id`) SELECT `fk_activity_id`, `id` FROM `Activity` WHERE `fk_activity_id` IS NOT NULL;
UPDATE `Activity` SET `fk_activity_id` = NULL WHERE `fk_activity_id` IS NOT NULL;

# Activity -> ActivityDecision (ActivityDecision -> Activity not possible)
INSERT INTO `ControlFlow` (`fk_adcontrolflowtarget_id`, `fk_acontrolflowsource_id`) SELECT `fk_activitydecision_id`, `fk_activity_id` FROM `NMActivityActivityDecision` WHERE `fk_activity_id` IS NOT NULL;
UPDATE `NMActivityActivityDecision` SET `fk_activity_id` = NULL WHERE `fk_activity_id` IS NOT NULL;

# Activity -> ChiObject (ChiObject -> Activity not possible), Table NMActivityChiObject is already renamed to ObjectFlow !!!!
UPDATE `ObjectFlow` SET `fk_chiobjectobjectflowtarget_id` = `fk_chiobject_id`, `fk_aobjectflowsource_id` = `fk_activity_id`;

ALTER TABLE `ControlFlow` CHANGE `id` `id` INT( 11 ) NOT NULL;
