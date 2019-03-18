# Rollup.js 学习手记

## 背景
近端时间以来开发JS库和组件库时，总需要费力去配置`webpack`，还要配置各种`loader`, 不仅是配置费劲，也导致代码仓库越来越大。（啊！ 没法用ES的我要死了  _(:з」∠)__)。   
因此在需要轻便的编译工具时，发现`React`等源码都用了`rollup.js`来编译代码，同时也支持`AMD`,`CommonJS`等模块规范。嘿！小伙子 就你了。

## 简介
此手记作为`rollpu.js`的学习笔记，将学习的过程中记录，也沉淀了学习过程中的demo，方便以后快速搭建脚手架时候查看吧 (ﾟ▽ﾟ)/


## 目录

 章节一： `rollup`的快速简单配置
 章节二： `rollup`支持ES6+特性编译
 章节三： `rollup`的本地开发环境配置
 章节四： `rollup`的生产环境打包配置
 章节五： `rollup`的多文件编译环境配置