-- upgrade pre 0.9.5 to 0.9.5
UPDATE `nm_user_role` SET `fk_user_id` = `fk_userrdb_id` WHERE (`fk_userrdb_id` <> 0 AND NOT `fk_userrdb_id` IS NULL);
UPDATE `nm_user_role` SET `fk_role_id` = `fk_rolerdb_id` WHERE (`fk_rolerdb_id` <> 0 AND NOT `fk_rolerdb_id` IS NULL);
ALTER TABLE `nm_user_role` DROP PRIMARY KEY, ADD PRIMARY KEY(`fk_user_id`, `fk_role_id`);

-- upgrade 0.9.5 to 0.9.7
INSERT INTO `language` (`id`, `code`, `name`, `notes`, `created`, `creator`, `last_editor`, `modified`) VALUES(1, 'en', 'English', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `language` (`id`, `code`, `name`, `notes`, `created`, `creator`, `last_editor`, `modified`) VALUES(2, 'de', 'Deutsch', NULL, NULL, NULL, NULL, NULL);
