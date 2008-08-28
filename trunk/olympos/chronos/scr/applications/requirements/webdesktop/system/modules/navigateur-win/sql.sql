-- phpMyAdmin SQL Dump
-- version 2.11.0
-- http://www.phpmyadmin.net
--
-- Serveur: localhost
-- Généré le : Ven 01 Août 2008 à 14:07
-- Version du serveur: 4.1.22
-- Version de PHP: 5.2.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Base de données: `desktop`
--

-- --------------------------------------------------------

--
-- Structure de la table `navigateur_favoris`
--

CREATE TABLE IF NOT EXISTS `navigateur_favoris` (
  `id` int(11) NOT NULL auto_increment,
  `nom` varchar(30) NOT NULL default '',
  `adresse` varchar(100) NOT NULL default '',
  `commentaires` varchar(100) NOT NULL default '',
  `date` date NOT NULL default '0000-00-00',
  PRIMARY KEY  (`id`),
  FULLTEXT KEY `nombre` (`adresse`,`commentaires`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=490 ;

--
-- Contenu de la table `navigateur_favoris`
--

INSERT INTO `navigateur_favoris` (`id`, `nom`, `adresse`, `commentaires`, `date`) VALUES
(480, 'Youtube', 'http://www.youtube.fr', 'Youtube', '2008-07-24'),
(481, 'GX-Mod', 'http://www.gx-mod.com', 'GX-Mod', '2007-07-12'),
(479, 'Clubic', 'http://www.clubic.fr', 'Clubic', '2008-07-31'),
(484, 'Pixmania', 'http://www.pixmania.fr', 'Le site d''achat des appareils photos, etc...', '0000-00-00'),
(483, 'Le Monde', 'http://www.lemonde.fr', 'Le site officiel du journal Le Monde', '0000-00-00'),
(485, 'XDA Developpers', 'http://forum.xda-developers.com', 'Le forum du Hack GSM, spÃ©cialisÃ© HTC', '0000-00-00'),
(486, 'Yahoo', 'http://www.yahoo.fr', 'Portail Yahoo', '0000-00-00'),
(487, 'Ext JS', 'http://extjs.com/forum', 'Forum Ext JS', '0000-00-00'),
(488, 'Daily Motion', 'http://www.dailymotion.com', 'Site de vidÃ©os Daily Motion', '0000-00-00'),
(489, 'La Redoute', 'http://www.laredoute.fr', 'Le site du cÃ©lÃ¨bre magasin', '0000-00-00');
