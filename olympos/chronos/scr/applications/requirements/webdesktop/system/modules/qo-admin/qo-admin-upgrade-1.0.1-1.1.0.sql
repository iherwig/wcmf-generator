-- ----------------------------------------------------------------------------
-- Add modules to qo_modules
-- ----------------------------------------------------------------------------
INSERT INTO `qo_modules` (`moduleName`, `moduleType`, `moduleId`, `version`, `author`, `description`, `path`, `active`) VALUES 
('QoDesk.QoAdminMyGroups', 'system', 'qo-admin-my-groups', '1.1.0', 'Paul Simmons', 'Allows members with admin rights to groups to add and remove other members', 'system/modules/qo-admin/qo-admin-my-groups/', 'true');

-- ----------------------------------------------------------------------------
-- Add files to qo_modules_has_files
-- ----------------------------------------------------------------------------
-- QoAdminMyGroups
insert into `qo_modules_has_files` (`qo_modules_id`, `name`, `type`)
select a.id, b.name, b.type 
from (select id from qo_modules where moduleId = 'qo-admin-my-groups') a
   , (select 'qo-admin-my-groups.js' as name, 'javascript' as type) b;
insert into `qo_modules_has_files` (`qo_modules_id`, `name`, `type`)
select a.id, b.name, b.type 
from (select id from qo_modules where moduleId = 'qo-admin-my-groups') a
   , (select 'qo-admin-my-groups.php' as name, 'php' as type) b;
-- ----------------------------------------------------------------------------
-- Add My Profile to groups
-- ----------------------------------------------------------------------------
insert into `qo_groups_has_modules` (`qo_groups_id`, `qo_modules_id`, `active`)
select g.id, m.id, 'true'
from (select id from qo_groups) g
   , (select id from qo_modules where moduleId = 'qo-admin-my-groups') m;
-- ----------------------------------------------------------------------------
-- Add Modules to launchers
-- ----------------------------------------------------------------------------
insert into `qo_modules_has_launchers` (`qo_modules_id`, `qo_launchers_id`, `sort_order`)
select m.id, l.id, 0
from (select id from qo_modules where moduleId = 'qo-admin-my-groups') m
   , (select id from qo_launchers where name = 'startmenu') l;
-- ----------------------------------------------------------------------------
-- Update Module Versions to 1.1.0
-- ----------------------------------------------------------------------------
update `qo_modules`
set `version` = '1.1.0'
where `moduleId` like 'qo-admin-%'