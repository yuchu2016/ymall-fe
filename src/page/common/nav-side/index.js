/*
* @Author: dell
* @Date:   2017-09-06 18:46:03
* @Last Modified by:   dell
* @Last Modified time: 2017-09-12 10:36:45
*/
'use strict';
require('./index.css');
var _ym     = require('util/ym.js');
var templateIndex     = require('./index.string');
// 侧边导航
var navSide = {
    option:{
        name : '',
        navList : [
            {name: 'user-center',desc:'个人中心',href:'./user-center.html'},
            {name: 'order-list',desc:'我的订单',href:'./order-list.html'},
            {name: 'user-pass-update',desc:'修改密码',href:'./user-pass-update.html'},
            {name: 'about',desc:'关于YMail',href:'./about.html'}
        ]
    },
    init : function(option){
        //合并选项
        $.extend(this.option,option);
        this.renderNav();
    },
    //渲染导航菜单
    renderNav : function(){
        //计算active数据
        for(var i = 0, iLength = this.option.navList.length; i < iLength;i++){
            if (this.option.navList[i].name === this.option.name) {
                this.option.navList[i].isActive = true;
            }
        };
        //渲染List数据
        var navHtml = _ym.renderHtml(templateIndex,{
            navList : this.option.navList
        });
        //把HTML放入容器
        $('.nav-side').html(navHtml);
    },
};

module.exports = navSide;