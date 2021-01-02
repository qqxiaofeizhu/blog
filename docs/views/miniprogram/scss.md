---
title: 小程序内使用 scss
date: 2020-04-14
sidebar: false
tags:
 - miniprogram
categories:
 - miniprogram
---

以下以小程序插件项目下引入`scss`为例，基础配置如下

```js
// 小程序scss转wxml, 解决样式嵌套问题
// 思路： 查找文件夹下所有的scss, 转成wxml

let gulp = require('gulp')
let sass = require('gulp-sass')
let rename = require("gulp-rename")
let minifycss = require('gulp-minify-css')

gulp.task('sass', function () {
    return gulp.src(['./plugin/**/*.scss', '!./plugin/node_modules/**', '!./plugin/miniprogram_npm/**', '!./plugin/styles/**'])
        .pipe(sass().on('error', sass.logError))
        .pipe(minifycss())
        .pipe(rename({
            extname: '.wxss'
        }))
        .pipe(gulp.dest('plugin'))
})

gulp.task('watch', function () {
    gulp.watch('./plugin/**/*.scss', gulp.parallel('sass'));
});
```