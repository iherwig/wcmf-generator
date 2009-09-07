UPDATE `nm_user_role` SET `fk_user_id` = `fk_userrdb_id` WHERE (`fk_userrdb_id` <> 0 AND NOT `fk_userrdb_id` IS NULL);
UPDATE `nm_user_role` SET `fk_role_id` = `fk_rolerdb_id` WHERE (`fk_rolerdb_id` <> 0 AND NOT `fk_rolerdb_id` IS NULL);
ALTER TABLE `nm_user_role` DROP PRIMARY KEY, ADD PRIMARY KEY(`fk_user_id`, `fk_role_id`);
