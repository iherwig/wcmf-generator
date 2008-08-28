-- ----------------------------------------------------------------------------
-- Add modules to qo_modules
-- ----------------------------------------------------------------------------
INSERT INTO `qo_modules` (`moduleName`, `moduleType`, `moduleId`, `version`, `author`, `description`, `path`, `active`) VALUES 
('QoDesk.QoAdminMyProfile', 'system', 'qo-admin-my-profile', '1.0.1', 'Paul Simmons', 'Allows users to modify their own profile', 'system/modules/qo-admin/qo-admin-my-profile/', 'true');

-- ----------------------------------------------------------------------------
-- Add files to qo_modules_has_files
-- ----------------------------------------------------------------------------
-- QoAdminMyProfile
insert into `qo_modules_has_files` (`qo_modules_id`, `name`, `type`)
select a.id, b.name, b.type 
from (select id from qo_modules where moduleId = 'qo-admin-my-profile') a
   , (select 'qo-admin-my-profile.js' as name, 'javascript' as type) b;
insert into `qo_modules_has_files` (`qo_modules_id`, `name`, `type`)
select a.id, b.name, b.type 
from (select id from qo_modules where moduleId = 'qo-admin-my-profile') a
   , (select 'qo-admin-my-profile.php' as name, 'php' as type) b;
-- ----------------------------------------------------------------------------
-- Add My Profile to groups
-- ----------------------------------------------------------------------------
insert into `qo_groups_has_modules` (`qo_groups_id`, `qo_modules_id`, `active`)
select g.id, m.id, 'true'
from (select id from qo_groups) g
   , (select id from qo_modules where moduleId = 'qo-admin-my-profile') m;
-- ----------------------------------------------------------------------------
-- Add Modules to launchers
-- ----------------------------------------------------------------------------
insert into `qo_modules_has_launchers` (`qo_modules_id`, `qo_launchers_id`, `sort_order`)
select m.id, l.id, 0
from (select id from qo_modules where moduleId = 'qo-admin-my-profile') m
   , (select id from qo_launchers where name = 'startmenu') l;
-- ----------------------------------------------------------------------------
-- Update Module Versions to 1.0.1
-- ----------------------------------------------------------------------------
update `qo_modules`
set `version` = '1.0.1'
where `moduleId` like 'qo-admin-%'