/*
Navicat MySQL Data Transfer

Source Server         : workspace
Source Server Version : 50631
Source Host           : 192.168.195.128:3306
Source Database       : Project

Target Server Type    : MYSQL
Target Server Version : 50631
File Encoding         : 65001

Date: 2016-09-26 18:29:58
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for tp_course
-- ----------------------------
DROP TABLE IF EXISTS `tp_course`;
CREATE TABLE `tp_course` (
  `courseNo` int(11) NOT NULL AUTO_INCREMENT COMMENT '课程id',
  `name` varchar(50) NOT NULL COMMENT '课程名字',
  `time` int(50) NOT NULL COMMENT '添加时间',
  PRIMARY KEY (`courseNo`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tp_course
-- ----------------------------
INSERT INTO `tp_course` VALUES ('1', '语文', '0');
INSERT INTO `tp_course` VALUES ('2', '数学', '0');
INSERT INTO `tp_course` VALUES ('3', '离散', '0');
INSERT INTO `tp_course` VALUES ('4', '物理', '0');
INSERT INTO `tp_course` VALUES ('5', '化学', '0');
INSERT INTO `tp_course` VALUES ('6', '软件', '0');
INSERT INTO `tp_course` VALUES ('7', '英语', '0');
INSERT INTO `tp_course` VALUES ('8', '测试', '0');
INSERT INTO `tp_course` VALUES ('9', '需求', '0');
INSERT INTO `tp_course` VALUES ('10', '完美', '0');
INSERT INTO `tp_course` VALUES ('11', '哇哇', '0');
