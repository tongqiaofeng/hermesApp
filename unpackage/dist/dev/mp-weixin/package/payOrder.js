require('./common/vendor.js');(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["package/payOrder"],{

/***/ 112:
/*!*************************************************************************************!*\
  !*** G:/aa-tong/my-project/hermesApp_Web_Pay/main.js?{"page":"package%2FpayOrder"} ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 5);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 3));
var _payOrder = _interopRequireDefault(__webpack_require__(/*! ./package/payOrder.vue */ 113));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_payOrder.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 113:
/*!********************************************************************!*\
  !*** G:/aa-tong/my-project/hermesApp_Web_Pay/package/payOrder.vue ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _payOrder_vue_vue_type_template_id_8c1bb986_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./payOrder.vue?vue&type=template&id=8c1bb986&scoped=true& */ 114);
/* harmony import */ var _payOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./payOrder.vue?vue&type=script&lang=js& */ 116);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _payOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _payOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _payOrder_vue_vue_type_style_index_0_id_8c1bb986_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./payOrder.vue?vue&type=style&index=0&id=8c1bb986&lang=scss&scoped=true& */ 118);
/* harmony import */ var _Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../Download/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 11);

var renderjs





/* normalize component */

var component = Object(_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _payOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _payOrder_vue_vue_type_template_id_8c1bb986_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _payOrder_vue_vue_type_template_id_8c1bb986_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "8c1bb986",
  null,
  false,
  _payOrder_vue_vue_type_template_id_8c1bb986_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "package/payOrder.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 114:
/*!***************************************************************************************************************!*\
  !*** G:/aa-tong/my-project/hermesApp_Web_Pay/package/payOrder.vue?vue&type=template&id=8c1bb986&scoped=true& ***!
  \***************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_payOrder_vue_vue_type_template_id_8c1bb986_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../Download/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../Download/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../Download/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../Download/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../Download/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../Download/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./payOrder.vue?vue&type=template&id=8c1bb986&scoped=true& */ 115);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_payOrder_vue_vue_type_template_id_8c1bb986_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_payOrder_vue_vue_type_template_id_8c1bb986_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_payOrder_vue_vue_type_template_id_8c1bb986_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_payOrder_vue_vue_type_template_id_8c1bb986_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 115:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!G:/aa-tong/my-project/hermesApp_Web_Pay/package/payOrder.vue?vue&type=template&id=8c1bb986&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
try {
  components = {
    uniPopup: function() {
      return __webpack_require__.e(/*! import() | uni_modules/uni-popup/components/uni-popup/uni-popup */ "uni_modules/uni-popup/components/uni-popup/uni-popup").then(__webpack_require__.bind(null, /*! @/uni_modules/uni-popup/components/uni-popup/uni-popup.vue */ 289))
    }
  }
} catch (e) {
  if (
    e.message.indexOf("Cannot find module") !== -1 &&
    e.message.indexOf(".vue") !== -1
  ) {
    console.error(e.message)
    console.error("1. 排查组件名称拼写是否正确")
    console.error(
      "2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"
    )
    console.error(
      "3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件"
    )
  } else {
    throw e
  }
}
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 116:
/*!*********************************************************************************************!*\
  !*** G:/aa-tong/my-project/hermesApp_Web_Pay/package/payOrder.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Download_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_payOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../Download/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../Download/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../Download/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../Download/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../Download/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./payOrder.vue?vue&type=script&lang=js& */ 117);
/* harmony import */ var _Download_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_payOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Download_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_payOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Download_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_payOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Download_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_payOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Download_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_payOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 117:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!G:/aa-tong/my-project/hermesApp_Web_Pay/package/payOrder.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default =
{
  data: function data() {
    return {
      current: 0,
      payList: [{
        value: '0',
        name: '微信支付' },

      {
        value: '1',
        name: '支付宝支付' }] };



  },
  onShow: function onShow() {

  },
  onLoad: function onLoad() {

  },
  methods: {
    // 选择支付方式
    radioChange: function radioChange(evt) {
      for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].value === evt.detail.value) {
          this.current = i;
          break;
        }
      }
    },
    // 支付
    pay: function pay() {
      this.$refs.payPopup.open();
    },
    // 调取支付界面支付
    paySure: function paySure() {
      // 传递参数
      // 商品id、数量、商品价格、交易金额
      // 交易类型（JSAPI--JSAPI支付（或小程序支付）、NATIVE--Native支付、APP--app支付，MWEB--H5支付）
      // 货币类型  境内商户号仅支持人民币  CNY：人民币
      // 调用后端支付接口，后端调用微信统一下单接口返回给前端订单信息
      // 前端根据订单信息调用  uni.requestPayment()调取支付界面进行支付，成功后异步从新请求列表页，更新订单状态
      // md5() 加密签名字段

      /*let time = String(Date.now());
      let $chars = 'ABCDEFGHJKMNPQRSTWXYZ2345678';
      let maxPos = $chars.length;
      let str = '';
      for (let i = 0; i < 32; i++) {
      	str += $chars.charAt(Math.floor(Math.random() * maxPos));
      };
      
      let paySign ="wxd7cb2e8575630361\n" + time + "\n" + str +"\n" + res.data.payMsg.package + '\n';
      
      let key = "-----BEGIN PRIVATE KEY-----" +
      	"MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDSAfmcCgYjQcF0" +
      	"/UqUszy4UMF9AgbPcXhy9WUk3esc+xYwMsTb5J/yNFZxJZG3AaYUy/GT5Iju4ynY" +
      	"M5FMJtJC2is8cGtDEv1wdzpjpK3/9M8nlU3UA1vvAbXB9B4Fd4N03qUpg04t4dik" +
      	"b5IRd0oUMO2dHoA8dAKTD5anz+jh78lt3xhWk+eo2ipbq+ewTrUh9aRMDK2x++TV" +
      	"URYvp0X0fdJcgjAzGtvGnb/xRpU9l6cYCWy5Gbc5qTuc6reanB+YlsKmKc/FIRDN" +
      	"7mNSvnAL6IfbgCb7XzCdPiQuXVvks9rjXqDALAuatsK4iMhsL9B3Xr4eWNlCZn1z" +
      	"HBtTvRN7AgMBAAECggEAQn6rmVO3M8yrQ667wa+rBzVSvpE4tNBZ8hRvTSgTPN7n" +
      	"3KUGnhWa62bVBAiARfD4tFcLC+ftz64P3swdMn6MTuyjigSSge9uXgDydQB8s7HB" +
      	"Mehdd0cFAf2Jnnr8UoDQF94zb5yK0Y5UOWS2XF9oDlKbugchVYLqGcRy0HnNZFQk" +
      	"nLdRvxIcyhgwDCh71tQeoXbhzE5KXafN9mupjbUG2Rl2PYUMdy3vRek3wkgHSGrO" +
      	"Sr9IMHsL3DHIBEMSiT4OwLt+BmKzBxGS8FS/G3Nh3cqdqMmxWk3qaRtGFn/JWHfB" +
      	"FGlSzZiBN0O6qgblFKVudG345Oz3MoZsRp9tEzp/gQKBgQDqYwXDeuN8PJTIS2g5" +
      	"tmi5YAoTxRzcTh2NvSPWxk+AdgnoReVUZoaoLslxHXApZB1aEX8ldSkjNeSK+oN9" +
      	"Rj1B+tH7O5iAxxNGhRxMndxbGKmTjYqfgWTCbSmWSPfxymPWPn/IySmGbuvC5Ea/" +
      	"tzLOQ0cncwWKmJSHVC2Tpc5xQQKBgQDlX3SL/H6LOXsbncwi7+TORuqZW58QyhOQ" +
      	"0LoVnCnCxz+HQkGwrerJonUiSSAwKKdoW2Kg+y/ftcefnxiL6J0w54CfE5v2YV6i" +
      	"AZFEF0/jK1Kmin2/+pXp/8xR94hg9UbCQgX/cYjh0qxE9HmC1Y0QSzS5VjdDqk5U" +
      	"qCUTE6EZuwKBgEukFVIWsJ+BdYqGO2aUpYtdoSLsM/otA4Cgj5ZafYG5lkztcash" +
      	"Q0e3ga8NjwrskkRk7SGLg/EnDVCEtDaTmmVWqrlnbDnzBRd3EcDwGRMVDHTf8uKz" +
      	"AW91hzxG5C2V4U5c8SQ9Nzd5SICm5uYsGytRrv7eMeWehCCAXA0QL2WBAoGAM8KP" +
      	"pUtMLxTAkCHSwAuMgXQFWqgPRBWlxqcjZt7/mYGm91nfQwRsGCY98oe36MYzyNve" +
      	"bN9iFUSLEJ0xR9ktJ60GHF+rcTTVyw85fbkZAPV0yDo2WE0u6UgdDl4ie2a+GfYW" +
      	"LmercPI+h6z3gqu4EnY2JqCrBez3kikDfMOQNiMCgYAVyXfjqQWFPryaggpR+60b" +
      	"pzvTul0Bgp8eKX4kvvn4WOo7i5QPw+sMFs35RME1QbWbUmirInRscKPdPqyCPjeC" +
      	"6q6reAr8/RfmtKUA9P0IX+8ysOy0Fll8+aj+vyOQfVSgbsFROz7ktSOH2ASwnqfK" +
      	"rz922JiOXkHQk+9MXIx31w==" + "-----END PRIVATE KEY-----";
      
      let en = new JSEncrypt();
      en.setPublicKey(key);
      let encStr = en.encrypt(paySign);
      
      console.log('签名')
      console.log(time)
      console.log(str)
      console.log(paySign);
      console.log(res.data.prepayId)
      console.log(encStr);*/

      uni.request({
        url: this.$baseUrl + "/weChatCreateOrder",
        method: "POST",
        data: {},


        header: {
          "content-type": "application/json",
          // token: uni.getStorageSync('token')
          token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuaWNrIjoiYWRtaW4iLCJhdWQiOiIxNCIsInJvbGUiOiJhZG1pbiIsImlkIjoiMTQiLCJ1c2VybmFtZSI6ImFkbWluX2hrIn0.zGu2d3hDhyXBdN8Awmo7RVyYTQhCT_b4tgSQniNQ7Qg" },

        complete: function complete(res) {
          uni.hideLoading();
          console.log('生成订单');
          console.log(res);
          var verification = res.data;

          /*let time = String(Date.now());
                                       let $chars = 'ABCDEFGHJKMNPQRSTWXYZ2345678';
                                       let maxPos = $chars.length;
                                       let str = '';
                                       for (let i = 0; i < 32; i++) {
                                       	str += $chars.charAt(Math.floor(Math.random() * maxPos));
                                       };
                                       				let paySign ="wxd7cb2e8575630361\n" + time + "\n" + str +"\n" + res.data.payMsg.package + '\n';
                                       				let key = "-----BEGIN PRIVATE KEY-----" +
                                       	"MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDSAfmcCgYjQcF0" +
                                       	"/UqUszy4UMF9AgbPcXhy9WUk3esc+xYwMsTb5J/yNFZxJZG3AaYUy/GT5Iju4ynY" +
                                       	"M5FMJtJC2is8cGtDEv1wdzpjpK3/9M8nlU3UA1vvAbXB9B4Fd4N03qUpg04t4dik" +
                                       	"b5IRd0oUMO2dHoA8dAKTD5anz+jh78lt3xhWk+eo2ipbq+ewTrUh9aRMDK2x++TV" +
                                       	"URYvp0X0fdJcgjAzGtvGnb/xRpU9l6cYCWy5Gbc5qTuc6reanB+YlsKmKc/FIRDN" +
                                       	"7mNSvnAL6IfbgCb7XzCdPiQuXVvks9rjXqDALAuatsK4iMhsL9B3Xr4eWNlCZn1z" +
                                       	"HBtTvRN7AgMBAAECggEAQn6rmVO3M8yrQ667wa+rBzVSvpE4tNBZ8hRvTSgTPN7n" +
                                       	"3KUGnhWa62bVBAiARfD4tFcLC+ftz64P3swdMn6MTuyjigSSge9uXgDydQB8s7HB" +
                                       	"Mehdd0cFAf2Jnnr8UoDQF94zb5yK0Y5UOWS2XF9oDlKbugchVYLqGcRy0HnNZFQk" +
                                       	"nLdRvxIcyhgwDCh71tQeoXbhzE5KXafN9mupjbUG2Rl2PYUMdy3vRek3wkgHSGrO" +
                                       	"Sr9IMHsL3DHIBEMSiT4OwLt+BmKzBxGS8FS/G3Nh3cqdqMmxWk3qaRtGFn/JWHfB" +
                                       	"FGlSzZiBN0O6qgblFKVudG345Oz3MoZsRp9tEzp/gQKBgQDqYwXDeuN8PJTIS2g5" +
                                       	"tmi5YAoTxRzcTh2NvSPWxk+AdgnoReVUZoaoLslxHXApZB1aEX8ldSkjNeSK+oN9" +
                                       	"Rj1B+tH7O5iAxxNGhRxMndxbGKmTjYqfgWTCbSmWSPfxymPWPn/IySmGbuvC5Ea/" +
                                       	"tzLOQ0cncwWKmJSHVC2Tpc5xQQKBgQDlX3SL/H6LOXsbncwi7+TORuqZW58QyhOQ" +
                                       	"0LoVnCnCxz+HQkGwrerJonUiSSAwKKdoW2Kg+y/ftcefnxiL6J0w54CfE5v2YV6i" +
                                       	"AZFEF0/jK1Kmin2/+pXp/8xR94hg9UbCQgX/cYjh0qxE9HmC1Y0QSzS5VjdDqk5U" +
                                       	"qCUTE6EZuwKBgEukFVIWsJ+BdYqGO2aUpYtdoSLsM/otA4Cgj5ZafYG5lkztcash" +
                                       	"Q0e3ga8NjwrskkRk7SGLg/EnDVCEtDaTmmVWqrlnbDnzBRd3EcDwGRMVDHTf8uKz" +
                                       	"AW91hzxG5C2V4U5c8SQ9Nzd5SICm5uYsGytRrv7eMeWehCCAXA0QL2WBAoGAM8KP" +
                                       	"pUtMLxTAkCHSwAuMgXQFWqgPRBWlxqcjZt7/mYGm91nfQwRsGCY98oe36MYzyNve" +
                                       	"bN9iFUSLEJ0xR9ktJ60GHF+rcTTVyw85fbkZAPV0yDo2WE0u6UgdDl4ie2a+GfYW" +
                                       	"LmercPI+h6z3gqu4EnY2JqCrBez3kikDfMOQNiMCgYAVyXfjqQWFPryaggpR+60b" +
                                       	"pzvTul0Bgp8eKX4kvvn4WOo7i5QPw+sMFs35RME1QbWbUmirInRscKPdPqyCPjeC" +
                                       	"6q6reAr8/RfmtKUA9P0IX+8ysOy0Fll8+aj+vyOQfVSgbsFROz7ktSOH2ASwnqfK" +
                                       	"rz922JiOXkHQk+9MXIx31w==" + "-----END PRIVATE KEY-----";
                                       
                                       let en = new JSEncrypt();
                                       en.setPublicKey(key);
                                       let encStr = en.encrypt(paySign);
                                       				console.log('签名')
                                       console.log(time)
                                       console.log(str)
                                       console.log(paySign);
                                       console.log(res.data.prepayId)
                                       console.log(encStr);*/




          uni.requestPayment({
            timeStamp: verification.payMsg.timeStamp.toString(),
            nonceStr: verification.payMsg.nonceStr,
            package: verification.payMsg.package,
            signType: 'RSA',
            paySign: verification.payMsg.paySign,
            // timeStamp: time,
            // nonceStr: str,
            // package: 'prepay_id=' + res.data.prepayId,
            // signType: 'RSA',
            // paySign: encStr,
            success: function success(ret) {
              console.log('success:');
              console.log(ret);
            },
            fail: function fail(err) {
              console.log('fail:');
              console.log(err);
            } });

        } });

    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 118:
/*!******************************************************************************************************************************!*\
  !*** G:/aa-tong/my-project/hermesApp_Web_Pay/package/payOrder.vue?vue&type=style&index=0&id=8c1bb986&lang=scss&scoped=true& ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Download_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Download_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Download_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_payOrder_vue_vue_type_style_index_0_id_8c1bb986_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../Download/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../Download/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../Download/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../Download/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../Download/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../Download/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../Download/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../Download/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../Download/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./payOrder.vue?vue&type=style&index=0&id=8c1bb986&lang=scss&scoped=true& */ 119);
/* harmony import */ var _Download_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Download_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Download_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_payOrder_vue_vue_type_style_index_0_id_8c1bb986_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Download_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Download_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Download_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_payOrder_vue_vue_type_style_index_0_id_8c1bb986_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Download_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Download_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Download_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_payOrder_vue_vue_type_style_index_0_id_8c1bb986_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Download_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Download_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Download_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_payOrder_vue_vue_type_style_index_0_id_8c1bb986_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Download_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Download_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Download_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Download_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_payOrder_vue_vue_type_style_index_0_id_8c1bb986_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 119:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!G:/aa-tong/my-project/hermesApp_Web_Pay/package/payOrder.vue?vue&type=style&index=0&id=8c1bb986&lang=scss&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[112,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/package/payOrder.js.map