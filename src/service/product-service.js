/*
* @Author: dell
* @Date:   2017-09-13 10:13:01
* @Last Modified by:   dell
* @Last Modified time: 2017-09-14 16:34:29
*/

'use strict';

var _ym = require('util/ym.js');

var _product = {
   // 获取商品列表
   getProductList : function(ListParam, resolve, reject){
       _ym.request({
           url     : _ym.getServerUrl('/product/list.do'),
           data    : ListParam,
           success : resolve,
           error   : reject
       });
   },
   // 获取商品详细信息
   getProductDetail : function(productId, resolve, reject){
       _ym.request({
           url     : _ym.getServerUrl('/product/detail.do'),
           data    : {
               productId : productId
           },
           success : resolve,
           error   : reject
       });
   }
}
module.exports = _product;