/*
Navicat MySQL Data Transfer

Source Server         : workspace
Source Server Version : 50631
Source Host           : 192.168.195.128:3306
Source Database       : Project

Target Server Type    : MYSQL
Target Server Version : 50631
File Encoding         : 65001

Date: 2016-09-26 18:29:33
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for tp_student
-- ----------------------------
DROP TABLE IF EXISTS `tp_student`;
CREATE TABLE `tp_student` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '学生id',
  `name` varchar(50) NOT NULL COMMENT '学生姓名',
  `sex` varchar(5) NOT NULL COMMENT '性别',
  `qq` varchar(25) NOT NULL,
  `phone` varchar(25) DEFAULT NULL,
  `time` int(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tp_student
-- ----------------------------
INSERT INTO `tp_student` VALUES ('1', '谭', '男', '1111111111', '123456', '1474880191');
INSERT INTO `tp_student` VALUES ('2', '龙', '男', '11111111111111', '12345611', '1474880222');
INSERT INTO `tp_student` VALUES ('13', '谭', '男', '111111', '123456', '1474879327');
