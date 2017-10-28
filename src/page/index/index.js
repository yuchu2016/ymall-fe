/*
* @Author: dell
* @Date:   2017-09-05 21:14:09
* @Last Modified by:   dell
* @Last Modified time: 2017-09-13 10:06:24
*/
"use strict";
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js')
var navSide         = require('page/common/nav-side/index.js');
var templateBanner  = require('./banner.string');
var _ym             = require('util/ym.js');

$(function() {
    //渲染banner的HTML
    var bannerHtml =_ym.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    //banner初始化
    var $slider = $('.banner').unslider({
        dots: true, 
    });
    //前后点击事件绑定
    $('.banner-con .banner-arrow').click(function(){
        var forward = $(this).hasClass('prev')?'prev':'next';
        $slider.data('unslider')[forward]();
    });
});

