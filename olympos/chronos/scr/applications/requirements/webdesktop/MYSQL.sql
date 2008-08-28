
SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for qo_dialogs
-- ----------------------------
CREATE TABLE `qo_dialogs` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` varchar(55) default NULL,
  `path` text,
  `type` varchar(15) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for qo_files
-- ----------------------------
CREATE TABLE `qo_files` (
  `id` int(11) unsigned NOT NULL auto_increment,
  `name` varchar(55) default NULL,
  `path` text,
  `type` varchar(15) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for qo_groups
-- ----------------------------
CREATE TABLE `qo_groups` (
  `id` int(11) unsigned NOT NULL auto_increment,
  `name` varchar(35) default NULL,
  `description` text,
  `active` set('false','true') NOT NULL default 'false',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for qo_groups_has_modules
-- ----------------------------
CREATE TABLE `qo_groups_has_modules` (
  `qo_groups_id` int(11) unsigned NOT NULL default '0',
  `qo_modules_id` int(11) unsigned NOT NULL default '0',
  `active` set('false','true') NOT NULL default 'false',
  PRIMARY KEY  (`qo_groups_id`,`qo_modules_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='This table stores what modules each group has access to';

-- ----------------------------
-- Table structure for qo_launchers
-- ----------------------------
CREATE TABLE `qo_launchers` (
  `id` int(2) unsigned NOT NULL auto_increment,
  `name` varchar(25) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for qo_members
-- ----------------------------
CREATE TABLE `qo_members` (
  `id` int(11) unsigned NOT NULL auto_increment,
  `first_name` varchar(25) default NULL,
  `last_name` varchar(35) default NULL,
  `email_address` varchar(55) default NULL,
  `password` varchar(15) default NULL,
  `active` set('false','true') NOT NULL default 'false',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for qo_members_has_groups
-- ----------------------------
CREATE TABLE `qo_members_has_groups` (
  `qo_members_id` int(11) unsigned NOT NULL default '0',
  `qo_groups_id` int(11) unsigned NOT NULL default '0',
  `active` set('false','true') NOT NULL default '',
  `admin_flag` set('false','true') NOT NULL default 'false' COMMENT 'true if member is the admin of this group',
  PRIMARY KEY  (`qo_members_id`,`qo_groups_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for qo_modules
-- ----------------------------
CREATE TABLE `qo_modules` (
  `id` int(11) unsigned NOT NULL auto_increment,
  `moduleName` varchar(55) default NULL,
  `moduleType` varchar(35) default NULL,
  `moduleId` varchar(35) default NULL,
  `version` varchar(15) default NULL,
  `author` varchar(35) default NULL,
  `description` text,
  `path` text,
  `active` set('false','true') NOT NULL default 'false',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for qo_modules_has_files
-- ----------------------------
CREATE TABLE `qo_modules_has_files` (
  `qo_modules_id` int(11) unsigned NOT NULL default '0',
  `name` varchar(35) NOT NULL default '',
  `type` varchar(15) default NULL,
  PRIMARY KEY  (`qo_modules_id`,`name`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for qo_modules_has_launchers
-- ----------------------------
CREATE TABLE `qo_modules_has_launchers` (
  `qo_members_id` int(11) unsigned NOT NULL default '0',
  `qo_groups_id` int(11) unsigned NOT NULL default '0',
  `qo_modules_id` int(11) unsigned NOT NULL default '0',
  `qo_launchers_id` int(10) unsigned NOT NULL default '0',
  `sort_order` int(5) unsigned NOT NULL default '0' COMMENT 'sort within each launcher',
  PRIMARY KEY  (`qo_members_id`,`qo_groups_id`,`qo_modules_id`,`qo_launchers_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for qo_sessions
-- ----------------------------
CREATE TABLE `qo_sessions` (
  `id` varchar(128) NOT NULL default '' COMMENT 'a randomly generated id',
  `qo_members_id` int(11) unsigned NOT NULL default '0',
  `ip` varchar(16) default NULL,
  `date` datetime default NULL,
  PRIMARY KEY  (`id`,`qo_members_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for qo_styles
-- ----------------------------
CREATE TABLE `qo_styles` (
  `qo_members_id` int(11) unsigned NOT NULL default '0',
  `qo_groups_id` int(11) unsigned NOT NULL default '0',
  `qo_themes_id` int(11) unsigned NOT NULL default '1',
  `qo_wallpapers_id` int(11) unsigned NOT NULL default '1',
  `backgroundcolor` varchar(6) NOT NULL default 'ffffff',
  `fontcolor` varchar(6) default NULL,
  `transparency` varchar(5) NOT NULL default 'false',
  `wallpaperposition` varchar(6) NOT NULL default 'center',
  PRIMARY KEY  (`qo_members_id`,`qo_groups_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for qo_themes
-- ----------------------------
CREATE TABLE `qo_themes` (
  `id` int(11) unsigned NOT NULL auto_increment,
  `name` varchar(25) default NULL,
  `path_to_thumbnail` varchar(255) default NULL,
  `path_to_file` varchar(255) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for qo_wallpapers
-- ----------------------------
CREATE TABLE `qo_wallpapers` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` varchar(25) default NULL,
  `path_to_thumbnail` varchar(255) default NULL,
  `path_to_file` varchar(255) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records 
-- ----------------------------
INSERT INTO `qo_files` VALUES ('1', 'cookies.js', 'system/login/', 'javascript');
INSERT INTO `qo_files` VALUES ('2', 'StartMenu.js', 'system/core/', 'javascript');
INSERT INTO `qo_files` VALUES ('3', 'TaskBar.js', 'system/core/', 'javascript');
INSERT INTO `qo_files` VALUES ('4', 'Desktop.js', 'system/core/', 'javascript');
INSERT INTO `qo_files` VALUES ('5', 'App.js', 'system/core/', 'javascript');
INSERT INTO `qo_files` VALUES ('6', 'Module.js', 'system/core/', 'javascript');
INSERT INTO `qo_files` VALUES ('7', 'DesktopConfig.js', 'system/core/', 'javascript');
INSERT INTO `qo_files` VALUES ('8', 'desktop.css', 'resources/css/', 'css');
INSERT INTO `qo_files` VALUES ('13', 'Shortcut.js', 'system/core/', 'javascript');
INSERT INTO `qo_groups` VALUES ('1', 'administrator', 'System administrator', 'true');
INSERT INTO `qo_groups` VALUES ('2', 'user', 'General user', 'true');
INSERT INTO `qo_groups` VALUES ('3', 'demo', 'Demo user', 'true');
INSERT INTO `qo_groups_has_modules` VALUES ('1', '1', 'true');
INSERT INTO `qo_groups_has_modules` VALUES ('1', '2', 'true');
INSERT INTO `qo_groups_has_modules` VALUES ('1', '5', 'true');
INSERT INTO `qo_groups_has_modules` VALUES ('1', '4', 'true');
INSERT INTO `qo_groups_has_modules` VALUES ('1', '3', 'true');
INSERT INTO `qo_groups_has_modules` VALUES ('1', '6', 'true');
INSERT INTO `qo_groups_has_modules` VALUES ('1', '7', 'true');
INSERT INTO `qo_groups_has_modules` VALUES ('1', '8', 'true');
INSERT INTO `qo_groups_has_modules` VALUES ('2', '1', 'true');
INSERT INTO `qo_groups_has_modules` VALUES ('2', '2', 'true');
INSERT INTO `qo_groups_has_modules` VALUES ('2', '3', 'true');
INSERT INTO `qo_groups_has_modules` VALUES ('2', '4', 'true');
INSERT INTO `qo_groups_has_modules` VALUES ('2', '5', 'true');
INSERT INTO `qo_groups_has_modules` VALUES ('2', '6', 'true');
INSERT INTO `qo_groups_has_modules` VALUES ('2', '7', 'true');
INSERT INTO `qo_groups_has_modules` VALUES ('2', '8', 'true');
INSERT INTO `qo_groups_has_modules` VALUES ('3', '1', 'true');
INSERT INTO `qo_groups_has_modules` VALUES ('3', '2', 'true');
INSERT INTO `qo_groups_has_modules` VALUES ('3', '3', 'true');
INSERT INTO `qo_groups_has_modules` VALUES ('3', '4', 'true');
INSERT INTO `qo_groups_has_modules` VALUES ('3', '5', 'true');
INSERT INTO `qo_groups_has_modules` VALUES ('3', '6', 'true');
INSERT INTO `qo_groups_has_modules` VALUES ('3', '7', 'true');
INSERT INTO `qo_groups_has_modules` VALUES ('3', '8', 'true');
INSERT INTO `qo_launchers` VALUES ('1', 'autorun');
INSERT INTO `qo_launchers` VALUES ('2', 'contextmenu');
INSERT INTO `qo_launchers` VALUES ('3', 'quickstart');
INSERT INTO `qo_launchers` VALUES ('4', 'shortcut');
INSERT INTO `qo_launchers` VALUES ('5', 'startmenu');
INSERT INTO `qo_launchers` VALUES ('6', 'startmenutool');
INSERT INTO `qo_members` VALUES ('3', 'Todd', 'Murdock', 'demo', 'demo', 'true');
INSERT INTO `qo_members` VALUES ('4', 'Todd', 'Murdock', 'info@qwikioffice.com', 'Todd', 'true');
INSERT INTO `qo_members_has_groups` VALUES ('3', '3', 'true', 'false');
INSERT INTO `qo_members_has_groups` VALUES ('4', '1', 'true', 'false');
INSERT INTO `qo_modules` VALUES ('1', 'QoDesk.QoPreferences', 'system', 'qo-preferences', '1.0', 'Todd Murdock', 'A system application.  Allows users to set, and save their desktop preferences to the database.', 'system/modules/qo-preferences/', 'true');
INSERT INTO `qo_modules` VALUES ('2', 'QoDesk.GridWindow', 'demo', 'demo-grid', '1.0', 'Jack Slocum', 'Demo of window with grid.', 'system/modules/grid-win/', 'true');
INSERT INTO `qo_modules` VALUES ('3', 'QoDesk.TabWindow', 'demo', 'demo-tabs', '1.0', 'Jack Slocum', 'Demo of window with tabs.', 'system/modules/tab-win/', 'true');
INSERT INTO `qo_modules` VALUES ('4', 'QoDesk.AccordionWindow', 'demo', 'demo-acc', '1.0', 'Jack Slocum', 'Demo of window with accordion.', 'system/modules/acc-win/', 'true');
INSERT INTO `qo_modules` VALUES ('5', 'QoDesk.LayoutWindow', 'demo', 'demo-layout', '1.0', 'Jack Slocum', 'Demo of window with layout.', 'system/modules/layout-win/', 'true');
INSERT INTO `qo_modules` VALUES ('6', 'QoDesk.BogusMenu', 'demo', 'demo-menu', '1.0', 'Todd Murdock', 'Demo of bogus menu.', 'system/modules/bogus/bogus-menu/', 'true');
INSERT INTO `qo_modules` VALUES ('7', 'QoDesk.BogusSubMenu', 'demo', 'demo-submenu', '1.0', 'Todd Murdock', 'Demo of bogus submenu.', 'system/modules/bogus/bogus-submenu/', 'true');
INSERT INTO `qo_modules` VALUES ('8', 'QoDesk.BogusModule', 'demo', 'demo-bogus', '1.0', 'Jack Slocum', 'Demo of bogus window.', 'system/modules/bogus/bogus-win/', 'true');
INSERT INTO `qo_modules_has_files` VALUES ('1', 'preferences.css', 'css');
INSERT INTO `qo_modules_has_files` VALUES ('1', 'Preferences.js', 'javascript');
INSERT INTO `qo_modules_has_files` VALUES ('1', 'Preferences.php', 'php');
INSERT INTO `qo_modules_has_files` VALUES ('2', 'grid-win.js', 'javascript');
INSERT INTO `qo_modules_has_files` VALUES ('2', 'grid-win.css', 'css');
INSERT INTO `qo_modules_has_files` VALUES ('3', 'tab-win.js', 'javascript');
INSERT INTO `qo_modules_has_files` VALUES ('4', 'acc-win.js', 'javascript');
INSERT INTO `qo_modules_has_files` VALUES ('4', 'acc-win.css', 'css');
INSERT INTO `qo_modules_has_files` VALUES ('5', 'layout-win.js', 'javascript');
INSERT INTO `qo_modules_has_files` VALUES ('6', 'bogus-menu.js', 'javascript');
INSERT INTO `qo_modules_has_files` VALUES ('7', 'bogus-submenu.js', 'javascript');
INSERT INTO `qo_modules_has_files` VALUES ('8', 'bogus-win.js', 'javascript');
INSERT INTO `qo_modules_has_files` VALUES ('3', 'tab-win.css', 'css');
INSERT INTO `qo_modules_has_files` VALUES ('5', 'layout-win.css', 'css');
INSERT INTO `qo_modules_has_files` VALUES ('8', 'bogus-win.css', 'css');
INSERT INTO `qo_modules_has_launchers` VALUES ('0', '0', '1', '2', '0');
INSERT INTO `qo_modules_has_launchers` VALUES ('0', '0', '1', '6', '0');
INSERT INTO `qo_modules_has_launchers` VALUES ('0', '0', '2', '5', '0');
INSERT INTO `qo_modules_has_launchers` VALUES ('0', '0', '3', '5', '10');
INSERT INTO `qo_modules_has_launchers` VALUES ('0', '0', '4', '5', '20');
INSERT INTO `qo_modules_has_launchers` VALUES ('0', '0', '6', '5', '30');
INSERT INTO `qo_modules_has_launchers` VALUES ('0', '0', '5', '5', '40');
INSERT INTO `qo_modules_has_launchers` VALUES ('3', '3', '1', '4', '0');
INSERT INTO `qo_modules_has_launchers` VALUES ('3', '3', '1', '3', '0');
INSERT INTO `qo_modules_has_launchers` VALUES ('3', '3', '2', '4', '1');
INSERT INTO `qo_modules_has_launchers` VALUES ('3', '3', '3', '4', '2');
INSERT INTO `qo_modules_has_launchers` VALUES ('3', '3', '4', '4', '3');
INSERT INTO `qo_modules_has_launchers` VALUES ('3', '3', '5', '4', '4');
INSERT INTO `qo_modules_has_launchers` VALUES ('3', '3', '8', '4', '5');
INSERT INTO `qo_sessions` VALUES ('a3a0b9c47a796fb7852047af4caaa945', '3', '127.0.0.1', '2008-06-01 11:52:59');
INSERT INTO `qo_styles` VALUES ('0', '0', '2', '1', 'f9f9f9', '000000', 'false', 'center');
INSERT INTO `qo_styles` VALUES ('3', '3', '3', '7', 'f9f9f9', 'FFFFFF', 'true', 'center');
INSERT INTO `qo_themes` VALUES ('1', 'Vista Blue', 'resources/themes/xtheme-vistablue/xtheme-vistablue.png', 'resources/themes/xtheme-vistablue/css/xtheme-vistablue.css');
INSERT INTO `qo_themes` VALUES ('2', 'Vista Black', 'resources/themes/xtheme-vistablack/xtheme-vistablack.png', 'resources/themes/xtheme-vistablack/css/xtheme-vistablack.css');
INSERT INTO `qo_themes` VALUES ('3', 'Vista Glass', 'resources/themes/xtheme-vistaglass/xtheme-vistaglass.png', 'resources/themes/xtheme-vistaglass/css/xtheme-vistaglass.css');
INSERT INTO `qo_wallpapers` VALUES ('1', 'qWikiOffice', 'resources/wallpapers/thumbnails/qwikioffice.jpg', 'resources/wallpapers/qwikioffice.jpg');
INSERT INTO `qo_wallpapers` VALUES ('2', 'Colorado Farm', 'resources/wallpapers/thumbnails/colorado-farm.jpg', 'resources/wallpapers/colorado-farm.jpg');
INSERT INTO `qo_wallpapers` VALUES ('3', 'Curls On Green', 'resources/wallpapers/thumbnails/curls-on-green.jpg', 'resources/wallpapers/curls-on-green.jpg');
INSERT INTO `qo_wallpapers` VALUES ('4', 'Emotion', 'resources/wallpapers/thumbnails/emotion.jpg', 'resources/wallpapers/emotion.jpg');
INSERT INTO `qo_wallpapers` VALUES ('5', 'Eos', 'resources/wallpapers/thumbnails/eos.jpg', 'resources/wallpapers/eos.jpg');
INSERT INTO `qo_wallpapers` VALUES ('6', 'Fields of Peace', 'resources/wallpapers/thumbnails/fields-of-peace.jpg', 'resources/wallpapers/fields-of-peace.jpg');
INSERT INTO `qo_wallpapers` VALUES ('7', 'Fresh Morning', 'resources/wallpapers/thumbnails/fresh-morning.jpg', 'resources/wallpapers/fresh-morning.jpg');
INSERT INTO `qo_wallpapers` VALUES ('8', 'Ladybuggin', 'resources/wallpapers/thumbnails/ladybuggin.jpg', 'resources/wallpapers/ladybuggin.jpg');
INSERT INTO `qo_wallpapers` VALUES ('9', 'Summer', 'resources/wallpapers/thumbnails/summer.jpg', 'resources/wallpapers/summer.jpg');
INSERT INTO `qo_wallpapers` VALUES ('10', 'Blue Swirl', 'resources/wallpapers/thumbnails/blue-swirl.jpg', 'resources/wallpapers/blue-swirl.jpg');
INSERT INTO `qo_wallpapers` VALUES ('11', 'Blue Psychedelic', 'resources/wallpapers/thumbnails/blue-psychedelic.jpg', 'resources/wallpapers/blue-psychedelic.jpg');
INSERT INTO `qo_wallpapers` VALUES ('12', 'Blue Curtain', 'resources/wallpapers/thumbnails/blue-curtain.jpg', 'resources/wallpapers/blue-curtain.jpg');
INSERT INTO `qo_wallpapers` VALUES ('13', 'Blank', 'resources/wallpapers/thumbnails/blank.gif', 'resources/wallpapers/blank.gif');
