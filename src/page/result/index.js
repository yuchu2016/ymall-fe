/*
* @Author: dell
* @Date:   2017-09-06 20:13:08
* @Last Modified by:   dell
* @Last Modified time: 2017-09-23 14:57:41
*/
'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _ym = require('util/ym.js');

$(function(){
    var type    = _ym.getUrlParam('type') || 'default',
    $element    = $('.'+type+'-success');
    //alert($element);
    if (type === 'payment') {
        var orderNumber = _ym.getUrlParam('orderNumber'),
            $orderNumber = $element.find('.order-number');
        $orderNumber.attr('href',$orderNumber.attr('href')+orderNumber);
    }
    //显示对应的提示类型
    $element.show();
})