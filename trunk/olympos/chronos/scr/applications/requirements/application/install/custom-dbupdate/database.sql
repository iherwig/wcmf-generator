-- upgrade pre 0.9.5 to 0.9.5
UPDATE `nm_user_role` SET `fk_user_id` = `fk_userrdb_id`;
UPDATE `nm_user_role` SET `fk_role_id` = `fk_rolerdb_id`;
ALTER TABLE `nm_user_role` DROP PRIMARY KEY, ADD PRIMARY KEY(`fk_user_id`, `fk_role_id`);
