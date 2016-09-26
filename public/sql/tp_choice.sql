/*
Navicat MySQL Data Transfer

Source Server         : workspace
Source Server Version : 50631
Source Host           : 192.168.195.128:3306
Source Database       : Project

Target Server Type    : MYSQL
Target Server Version : 50631
File Encoding         : 65001

Date: 2016-09-26 18:29:45
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for tp_choice
-- ----------------------------
DROP TABLE IF EXISTS `tp_choice`;
CREATE TABLE `tp_choice` (
  `id` int(11) NOT NULL,
  `courseNo` int(11) NOT NULL,
  `stuName` varchar(25) NOT NULL,
  `courseName` varchar(25) NOT NULL,
  PRIMARY KEY (`id`,`courseNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tp_choice
-- ----------------------------
INSERT INTO `tp_choice` VALUES ('1', '1', '谭', '语文');
INSERT INTO `tp_choice` VALUES ('2', '1', '龙', '语文');
