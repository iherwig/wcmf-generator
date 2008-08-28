-- ----------------------------------------------------------------------------
-- Add modules to qo_modules
-- ----------------------------------------------------------------------------
INSERT INTO `qo_modules` (`moduleName`, `moduleType`, `moduleId`, `version`, `author`, `description`, `path`, `active`) VALUES 
('QoDesk.QoAdminMenu', 'menu', 'qo-admin-menu', '1.0.0', 'Paul Simmons', 'Menu for QO Admin modules', 'system/modules/qo-admin/', 'true'),
('QoDesk.QoAdminMembers', 'system', 'qo-admin-members', '1.0.0', 'Paul Simmons', 'QO Admin module for Members', 'system/modules/qo-admin/qo-admin-members/', 'true'),
('QoDesk.QoAdminModules', 'system', 'qo-admin-modules', '1.0.0', 'Paul Simmons', 'Admin module to edit/delete/add members', 'system/modules/qo-admin/qo-admin-modules/', 'true'),
('QoDesk.QoAdminModuleFiles', 'system', 'qo-admin-module-files', '1.0.0', 'Paul Simmons', 'Admin module to edit/delete/add module files', 'system/modules/qo-admin/qo-admin-module-files/', 'true'),
('QoDesk.QoAdminGroups', 'system', 'qo-admin-groups', '1.0.0', 'Paul Simmons', 'Admin module to edit/delete/add groups', 'system/modules/qo-admin/qo-admin-groups/', 'true'),
('QoDesk.QoAdminGroupModules', 'system', 'qo-admin-group-modules', '1.0.0', 'Paul Simmons', 'Admin module to edit/delete/add module group authorities', 'system/modules/qo-admin/qo-admin-group-modules/', 'true'),
('QoDesk.QoAdminMemberGroups', 'system', 'qo-admin-member-groups', '1.0.0', 'Paul Simmons', 'Admin module to edit/delete/add member group authorities', 'system/modules/qo-admin/qo-admin-member-groups/', 'true'),
('QoDesk.QoAdminModuleLaunchers', 'system', 'qo-admin-module-launchers', '1.0.0', 'Paul Simmons', 'Admin module to edit/delete/add module launcher authorities', 'system/modules/qo-admin/qo-admin-module-launchers/', 'true');

-- ----------------------------------------------------------------------------
-- Add files to qo_modules_has_files
-- ----------------------------------------------------------------------------
-- QoAdminMenu
insert into `qo_modules_has_files` (`qo_modules_id`, `name`, `type`)
select a.id, b.name, b.type 
from (select id from qo_modules where moduleId = 'qo-admin-menu') a
   , (select 'qo-admin-menu.js' as name, 'javascript' as type) b;
-- QoAdminMembers
insert into `qo_modules_has_files` (`qo_modules_id`, `name`, `type`)
select a.id, b.name, b.type 
from (select id from qo_modules where moduleId = 'qo-admin-members') a
   , (select 'qo-admin-members.js' as name, 'javascript' as type) b;
insert into `qo_modules_has_files` (`qo_modules_id`, `name`, `type`)
select a.id, b.name, b.type 
from (select id from qo_modules where moduleId = 'qo-admin-members') a
   , (select 'qo-admin-members.php' as name, 'php' as type) b;
-- QoAdminMemberGroups
insert into `qo_modules_has_files` (`qo_modules_id`, `name`, `type`)
select a.id, b.name, b.type 
from (select id from qo_modules where moduleId = 'qo-admin-member-groups') a
   , (select 'qo-admin-member-groups.js' as name, 'javascript' as type) b;
insert into `qo_modules_has_files` (`qo_modules_id`, `name`, `type`)
select a.id, b.name, b.type 
from (select id from qo_modules where moduleId = 'qo-admin-member-groups') a
   , (select 'qo-admin-member-groups.php' as name, 'php' as type) b;
-- QoAdminGroups
insert into `qo_modules_has_files` (`qo_modules_id`, `name`, `type`)
select a.id, b.name, b.type 
from (select id from qo_modules where moduleId = 'qo-admin-groups') a
   , (select 'qo-admin-groups.js' as name, 'javascript' as type) b;
insert into `qo_modules_has_files` (`qo_modules_id`, `name`, `type`)
select a.id, b.name, b.type 
from (select id from qo_modules where moduleId = 'qo-admin-groups') a
   , (select 'qo-admin-groups.php' as name, 'php' as type) b;
-- QoAdminGroupModules
insert into `qo_modules_has_files` (`qo_modules_id`, `name`, `type`)
select a.id, b.name, b.type 
from (select id from qo_modules where moduleId = 'qo-admin-group-modules') a
   , (select 'qo-admin-group-modules.js' as name, 'javascript' as type) b;
insert into `qo_modules_has_files` (`qo_modules_id`, `name`, `type`)
select a.id, b.name, b.type 
from (select id from qo_modules where moduleId = 'qo-admin-group-modules') a
   , (select 'qo-admin-group-modules.php' as name, 'php' as type) b;
-- QoAdminModules
insert into `qo_modules_has_files` (`qo_modules_id`, `name`, `type`)
select a.id, b.name, b.type 
from (select id from qo_modules where moduleId = 'qo-admin-modules') a
   , (select 'qo-admin-modules.js' as name, 'javascript' as type) b;
insert into `qo_modules_has_files` (`qo_modules_id`, `name`, `type`)
select a.id, b.name, b.type 
from (select id from qo_modules where moduleId = 'qo-admin-modules') a
   , (select 'qo-admin-modules.php' as name, 'php' as type) b;
-- QoAdminModuleFiles
insert into `qo_modules_has_files` (`qo_modules_id`, `name`, `type`)
select a.id, b.name, b.type 
from (select id from qo_modules where moduleId = 'qo-admin-module-files') a
   , (select 'qo-admin-module-files.js' as name, 'javascript' as type) b;
insert into `qo_modules_has_files` (`qo_modules_id`, `name`, `type`)
select a.id, b.name, b.type 
from (select id from qo_modules where moduleId = 'qo-admin-module-files') a
   , (select 'qo-admin-module-files.php' as name, 'php' as type) b;
-- QoAdminModuleLaunchers
insert into `qo_modules_has_files` (`qo_modules_id`, `name`, `type`)
select a.id, b.name, b.type 
from (select id from qo_modules where moduleId = 'qo-admin-module-launchers') a
   , (select 'qo-admin-module-launchers.js' as name, 'javascript' as type) b;
insert into `qo_modules_has_files` (`qo_modules_id`, `name`, `type`)
select a.id, b.name, b.type 
from (select id from qo_modules where moduleId = 'qo-admin-module-launchers') a
   , (select 'qo-admin-module-launchers.php' as name, 'php' as type) b;
-- ----------------------------------------------------------------------------
-- Add modules to administrator group
-- ----------------------------------------------------------------------------
insert into `qo_groups_has_modules` (`qo_groups_id`, `qo_modules_id`, `active`)
select g.id, m.id, 'true'
from (select id from qo_groups where ucase(name) = 'ADMINISTRATOR') g
   , (select id from qo_modules where moduleId like 'qo-admin%') m;
-- ----------------------------------------------------------------------------
-- Add Modules to launchers
-- ----------------------------------------------------------------------------
insert into `qo_modules_has_launchers` (`qo_modules_id`, `qo_launchers_id`, `sort_order`)
select m.id, l.id, 0
from (select id from qo_modules where moduleId = 'qo-admin-menu') m
   , (select id from qo_launchers where name = 'startmenu') l;