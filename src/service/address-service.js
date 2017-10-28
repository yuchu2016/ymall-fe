/*
* @Author: dell
* @Date:   2017-09-22 11:05:21
* @Last Modified by:   dell
* @Last Modified time: 2017-09-23 11:02:54
*/
'use strict';

var _ym = require('util/ym.js');

var _address = {
   // 获取地址列表
   getAddressList : function(resolve, reject){
       _ym.request({
           url     : _ym.getServerUrl('/shipping/list.do'),
           data    :{
                pageSize    :    50
           },
           success : resolve,
           error   : reject
       });
   },
   //新建收件人地址
   save : function(addressInfo,resolve, reject){
       _ym.request({
           url     : _ym.getServerUrl('/shipping/add.do'),
           data    : addressInfo,
           success : resolve,
           error   : reject
       });
   },
   //更新收件人地址
   update : function(addressInfo,resolve, reject){
       _ym.request({
           url     : _ym.getServerUrl('/shipping/update.do'),
           data    : addressInfo,
           success : resolve,
           error   : reject
       });
   },
   //删除收件人信息
   deleteAddress  :  function(shippingId,resolve, reject){
       _ym.request({
           url     : _ym.getServerUrl('/shipping/del.do'),
           data    : {
            shippingId  :  shippingId,
           },
           success : resolve,
           error   : reject
       });
   },
   //获取单条收件人信息
   getAddress : function(shippingId,resolve, reject){
       _ym.request({
           url     : _ym.getServerUrl('/shipping/select.do'),
           data    : {
              shippingId    :   shippingId,

           },
           success : resolve,
           error   : reject
       });
   },

}
module.exports = _address;