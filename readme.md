# Tomorrow Application

## 简介

我能理解你们对技术提升和学习的渴望，以帮助你们在职场上如鱼得水，此应用开源不意味着肆意使用<font color="#F56C6C">（禁止商用）</font>，变成你个人利益项目，作者在预研此应用上耗费大量的休息时间，沉淀了大量技术性成果，每一个细节和每一个技术特性得到实质性的成果资料，期望各位同仁，在阅读此应用源码时，作者希望能提供给你的是正确的技术方案和思想引导，而不是抄袭，给作者未来的作品造成致命性的打击。

此开源技术是作者实验性项目DEMO，其开源的目的是为了寻找更多为自由开发而努力的同仁，希望加入者是有共享、平等、极积面对问题的合作者，当然，我也会同时分享此次实验性作品中获取的大量资料信息，我们不欢迎的是为了利益，套取研发成果的人！让我们为自己的未来而创造机会！

>  * 请仔细阅读上述简介，如忽略上述作者表达的真诚，执意破坏，一经发现，永久拉黑！
>  * 支持学术交流，方案性讨论，各种益于成长性活动，禁止商业活动，再次感谢。
>  * <font color="#F56C6C">再次警告申明，禁止商用，禁止商用，禁止商用！</font>

## 开发环境
**UI 使用**
`vue all` `tsx-vue-support` `vue-property-decorator` `element-ui` `socket-client`
**Server 端使用**
`featherJS` `vue-server-renderer` `socket-io` `inversify`
**数据库**
`mysql2` `knex` `objection`

框架                    | 技术说明
-----------------------|------------------------------------------------------------------
vue all                | 中国人耳熟能详的一个MVVM框架，使用了全系。
tsx-vue-support        | 未来前端趋势，VUE一直不能很好兼容tsx语法，此库技术方案上解决90%Vue兼容
vue-property-decorator | Vue 大量特性的解藕框架，能提升很大的开发工作量，并且具有很好的开发体验
element-ui             | 作者随意使用的一个UI组件框架，你也可以使用其它的Vue系组件框架
socket-client          | 前端（客户端）即时通信组件框架
featherJS              | 一个基于express 服务的MVC框架，具有很好的生态库和强大的跨平台能力
vue-server-renderer    | Vue SSR 技术主要提供方案，为前端UI渲染&SEO优化提供很好的支持
socket-io              | NodeJS 服务端的即时通信组件框架
inversify              | IoC 框架
mysql2                 | MySQL 底层驱动库
knex                   | MySQL DbHelp框架
objection              | ORM 框架

## 此实验性项目优点
- [x] 一切所有即时通信能力，都具可实现，（人机交互、即时聊天、社交视频、服务器监控等）。
- [x] 高速渲染能力，此实验性项目UI渲染级别在100ms以内！
- [x] 脱离Java，.Net,  PHP 等后端语言，让前端更接近业务！
- [x] 轻量级，以此实验性项目编译结果源码3M！还可以做得更小！
- [x] 强大的扩展能力，所有框架具有良好的生态，非小众化脚本，让未来一切可期！
- [x] 强大的中间件开发能力，让此实验性项目具有更无限的创造性。

## 此实验性的项目缺点
- [x] 因开发时间成本，优化深度不够，我还可以做得更好。
- [x] 需要大量的学习成本，此项目只能依赖个人知识储蓄，除官方API文档，没有任何参考资料。
- [x] 没有做到启动自检数据库能力，此实验性项目可以做到！
- [x] 没有作者实验资料，部份模块调试需要开启“自悟模式 ”。
- [x] 没有做到分布式能力，此实验性项目可以做到！因某些原因没有得到很好的支持，所以暂停此能力开发。
- [x] 源码且看且珍惜，<font color="#F56C6C">禁止商用</font>！

## 如何启动项目
### SQL 数据库的生成
```sql
/*
 Navicat Premium Data Transfer
 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80020
 Source Host           : localhost:3306
 Source Schema         : tomorrow

 Target Server Type    : MySQL
 Target Server Version : 80020
 File Encoding         : 65001

 Date: 08/08/2020 11:58:36
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `userName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `trueName` varchar(1024) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `createTime` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `type` int(0) NULL DEFAULT 1,
  `key` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `token` varchar(80) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `avatar` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FOMAT = Dynamic;

-- ----------------------------
-- Table structure for piazza
-- ----------------------------
DROP TABLE IF EXISTS `piazza`;
CREATE TABLE `piazza`  (
  `id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `text` varchar(6000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `image` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `createTime` timestamp(0) NULL DEFAULT NULL,
  `uid` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_PIAZZA_USERS`(`uid`) USING BTREE,
  CONSTRAINT `FK_PIAZZA_USERS` FOREIGN KEY (`uid`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
```

### 编译项目
持行命令： `npm run start`
### 启动项目
持行命令： `node ./`
