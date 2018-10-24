/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var fetch = $app_require$('@app-module/system.fetch');
var storage = $app_require$('@app-module/system.storage');

var API_ROOT = 'http://www.wanandroid.com/';

var headers = {};

// function getAuth(next) {
//   storage.get({
//     key: 'auth',
//     success: function(data) {
//       headers.Cookie = data
//       next(true)
//     },
//     fail: function(data, code) {
//       next(false)
//     }
//   })
// }

function getAuth() {
  // 古人云：“君子一诺千金”，这种“承诺将来会执行”的对象在JavaScript中称为Promise对象 xk 2018-10-24 21:54:13
  return new Promise((resolve, reject) => {
    storage.get({
      key: 'auth',
      success: function (data) {
        headers.Cookie = data;
        resolve(true);
      },
      fail: function (data, code) {
        resolve(false);
      }
    });
  });
}

function realFetch(url, data = null, method = 'get') {
  console.log('┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('┃ url: ', API_ROOT + url);
  console.log('┃ method: ', method);
  console.log('┃ data: ', JSON.stringify(data));
  console.log('┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  return new Promise((resolve, reject) => {
    fetch.fetch({
      url: API_ROOT + url,
      data: data,
      header: headers,
      method: method,
      success: function (data) {
        resolve(data);
      },
      fail: function (data, code) {
        reject(data);
      }
    });
  });
}

function withAuth(url, data = null, method = 'get', canSkip = false) {
  return getAuth().then(auth => {
    if (auth || canSkip) {
      return realFetch(url, data, method);
    } else {
      return new Promise((resolve, reject) => {
        reject('请先登录！');
      });
    }
  });
}

function post(url, data = null, config = {}) {
  if (config.withAuth) {
    return withAuth(url, data, 'post', config.canSkip);
  } else {
    return realFetch(url, data, 'post');
  }
}

function get(url, data = null, config = {}) {
  if (config.withAuth) {
    return withAuth(url, data, 'get', config.canSkip);
  } else {
    return realFetch(url, data, 'get');
  }
}

/* harmony default export */ __webpack_exports__["a"] = ({
  /**
   * 获取首页banner列表
   */
  getBanner(success, fail) {
    return get('banner/json', null);
  },
  /**
   * 获取首页文章列表
   */
  getArticle(page) {
    return get('article/list/' + page + '/json', null, {
      withAuth: true,
      canSkip: true
    });
  },
  /**
   * 获取体系分类
   */
  getClassifyList() {
    return get('tree/json', null);
  },
  /**
   * 根据分类获取文章列表
   */
  getArticleByClassify(page, cid) {
    return get('article/list/' + page + '/json?cid=' + cid, null, {
      withAuth: true,
      canSkip: true
    });
  },
  /**
   * 登录
   */
  login(params) {
    return post('user/login', params);
  },
  /**
   * 注册
   */
  register(params) {
    return post('user/register', params);
  },
  /**
   * 获取收藏文章列表
   */
  getCollectArticle(page) {
    return get('lg/collect/list/' + page + '/json', null, { withAuth: true });
  },
  /**
   * 收藏站内文章
   */
  collectArticle(id) {
    return post('lg/collect/' + id + '/json', null, { withAuth: true });
  },
  /**
   * 收藏站外文章
   */
  collectArticleAdd(params) {
    return post('lg/collect/add/json', params, { withAuth: true });
  },
  /**
   * 从文章列表取消收藏
   */
  uncollectArticle(id) {
    return post('lg/uncollect_originId/' + id + '/json', null, { withAuth: true });
  },
  /**
   * 从收藏列表取消收藏
   */
  uncollect(id, originId) {
    return post('lg/uncollect/' + id + '/json', { originId: originId }, { withAuth: true });
  },
  /**
   * 获取收藏网站列表
   */
  getCollectWeb() {
    return get('lg/collect/usertools/json', null, { withAuth: true });
  },
  /**
   * 收藏网站
   */
  collectWeb(params) {
    return post('lg/collect/addtool/json', params, { withAuth: true });
  },
  /**
   * 编辑收藏的网址
   */
  editCollectWeb(params) {
    return post('lg/collect/updatetool/json', params, { withAuth: true });
  },
  /**
   * 删除收藏的网址
   */
  deleteCollectWeb(id) {
    return post('lg/collect/deletetool/json', { id: id }, { withAuth: true });
  }
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["getCollectArticle"] = getCollectArticle;
/* harmony export (immutable) */ __webpack_exports__["collectArticle"] = collectArticle;
/* harmony export (immutable) */ __webpack_exports__["collectArticleAdd"] = collectArticleAdd;
/* harmony export (immutable) */ __webpack_exports__["uncollectArticle"] = uncollectArticle;
/* harmony export (immutable) */ __webpack_exports__["uncollect"] = uncollect;
/* harmony export (immutable) */ __webpack_exports__["getCollectWeb"] = getCollectWeb;
/* harmony export (immutable) */ __webpack_exports__["collectWeb"] = collectWeb;
/* harmony export (immutable) */ __webpack_exports__["editCollectWeb"] = editCollectWeb;
/* harmony export (immutable) */ __webpack_exports__["deleteCollectWeb"] = deleteCollectWeb;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__(0);


function getCollectArticle(page) {
  return __WEBPACK_IMPORTED_MODULE_0__index__["a" /* default */].getCollectArticle(page).then(response => {
    return Promise.resolve(JSON.parse(response.data).data);
  }).catch(err => {
    return Promise.reject(err);
  });
}

function collectArticle(id) {
  return __WEBPACK_IMPORTED_MODULE_0__index__["a" /* default */].collectArticle(id).then(response => {
    var value = JSON.parse(response.data);
    if (value.errorCode === -1) {
      return Promise.reject('请先登录');
    } else {
      return Promise.resolve(value.data);
    }
  }).catch(err => {
    return Promise.reject(err);
  });
}

function collectArticleAdd(title, author, link) {
  return __WEBPACK_IMPORTED_MODULE_0__index__["a" /* default */].collectArticleAdd({
    title: title,
    author: author,
    link: link
  }).then(response => {
    return Promise.resolve(JSON.parse(response.data).data);
  }).catch(err => {
    return Promise.reject(err);
  });
}

function uncollectArticle(id) {
  return __WEBPACK_IMPORTED_MODULE_0__index__["a" /* default */].uncollectArticle(id).then(response => {
    return Promise.resolve(JSON.parse(response.data).data);
  }).catch(err => {
    return Promise.reject(err);
  });
}

function uncollect(id, originId) {
  return __WEBPACK_IMPORTED_MODULE_0__index__["a" /* default */].uncollect(id, originId).then(response => {
    return Promise.resolve(JSON.parse(response.data).data);
  }).catch(err => {
    return Promise.reject(err);
  });
}

function getCollectWeb() {
  return __WEBPACK_IMPORTED_MODULE_0__index__["a" /* default */].getCollectWeb().then(response => {
    return Promise.resolve(JSON.parse(response.data).data);
  }).catch(err => {
    return Promise.reject(err);
  });
}

function collectWeb(name, link) {
  return __WEBPACK_IMPORTED_MODULE_0__index__["a" /* default */].collectWeb({
    name: name,
    link: link
  }).then(response => {
    return Promise.resolve(JSON.parse(response.data).data);
  }).catch(err => {
    return Promise.reject(err);
  });
}

function editCollectWeb(id, name, link) {
  return __WEBPACK_IMPORTED_MODULE_0__index__["a" /* default */].editCollectWeb({
    id: id,
    name: name,
    link: link
  }).then(response => {
    return Promise.resolve(JSON.parse(response.data).data);
  }).catch(err => {
    return Promise.reject(err);
  });
}

function deleteCollectWeb(id) {
  return __WEBPACK_IMPORTED_MODULE_0__index__["a" /* default */].deleteCollectWeb(id).then(response => {
    return Promise.resolve(JSON.parse(response.data).data);
  }).catch(err => {
    return Promise.reject(err);
  });
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var $app_template$ = __webpack_require__(3)
var $app_style$ = __webpack_require__(4)
var $app_script$ = __webpack_require__(5)

$app_define$('@app-component/c-input', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = {
  "type": "div",
  "attr": {},
  "classList": [
    "c-input"
  ],
  "children": [
    {
      "type": "div",
      "attr": {},
      "classList": [
        "c-input-content"
      ],
      "children": [
        {
          "type": "text",
          "attr": {
            "value": function () {return this.label}
          },
          "classList": [
            "input-label"
          ],
          "shown": function () {return this.label}
        },
        {
          "type": "input",
          "attr": {
            "type": function () {return this.type},
            "placeholder": function () {return this.placeholder},
            "value": function () {return this.inputValue}
          },
          "classList": [
            "input-native"
          ],
          "events": {
            "change": "onInput"
          }
        },
        {
          "type": "div",
          "attr": {},
          "classList": [
            "clear-box"
          ],
          "shown": function () {return this.clearable},
          "children": [
            {
              "type": "div",
              "attr": {},
              "classList": [
                "input-clear"
              ],
              "shown": function () {return this.clear},
              "events": {
                "click": "onClear"
              },
              "children": [
                {
                  "type": "text",
                  "attr": {
                    "value": "×"
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = {
  ".c-input-content": {
    "display": "flex",
    "width": "100%",
    "paddingLeft": "40px",
    "fontSize": "30px",
    "paddingRight": "20px",
    "height": "80px",
    "alignItems": "center"
  },
  ".input-label": {
    "width": "120px"
  },
  ".input-native": {
    "flex": 1,
    "fontSize": "30px"
  },
  ".clear-box": {
    "height": "40px",
    "width": "40px"
  },
  ".input-clear": {
    "display": "flex",
    "height": "40px",
    "width": "40px",
    "borderRadius": "25px",
    "backgroundColor": "#dddddd"
  },
  ".input-clear text": {
    "width": "100%",
    "textAlign": "center",
    "fontSize": "35px",
    "color": "#ffffff",
    "marginTop": "-5px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-clear"
        },
        {
          "t": "d"
        },
        {
          "t": "t",
          "n": "text"
        }
      ]
    }
  }
}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function(module, exports, $app_require$){'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _props$props$data$onI;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = (_props$props$data$onI = {
  props: ['label', 'placeholder', 'type', 'value', 'clearable']
}, _defineProperty(_props$props$data$onI, 'props', {
  placeholder: '请输入...',
  type: 'text',
  value: '',
  clearable: false
}), _defineProperty(_props$props$data$onI, 'data', function data() {
  return {
    clear: false,
    inputValue: ''
  };
}), _defineProperty(_props$props$data$onI, 'onInit', function onInit() {
  this.inputValue = this.value;
}), _defineProperty(_props$props$data$onI, 'onInput', function onInput(_ref) {
  var value = _ref.value;

  this.clear = value !== '';
  this.inputValue = value;
  this.$dispatch('input', { value: value });
}), _defineProperty(_props$props$data$onI, 'onClear', function onClear() {
  this.clear = false;
  this.inputValue = '';
  this.$dispatch('clear', { value: this.value });
}), _props$props$data$onI);
var moduleOwn = exports.default || module.exports;
var accessors = ['public', 'protected', 'private'];
if (moduleOwn.data && accessors.some(function (acc) {
    return moduleOwn[acc];
  })) {
  throw new Error('页面VM对象中属性data不可与public, protected, private同时存在，请使用public替代data！');
} else if (!moduleOwn.data) {
  moduleOwn.data = {};
  moduleOwn._descriptor = {};
  accessors.forEach(function(acc) {
    var accType = typeof moduleOwn[acc];
    if (accType === 'object') {
      moduleOwn.data = Object.assign(moduleOwn.data, moduleOwn[acc]);
      for (var name in moduleOwn[acc]) {
        moduleOwn._descriptor[name] = {access : acc};
      }
    } else if (accType === 'function') {
      console.warn('页面VM对象中的属性' + acc + '的值不能使函数，请使用对象');
    }
  });
}}

/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2)
var $app_template$ = __webpack_require__(16)
var $app_style$ = __webpack_require__(17)
var $app_script$ = __webpack_require__(18)

$app_define$('@app-component/addcollectweb', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})

$app_bootstrap$('@app-component/addcollectweb',{ packagerName:'fa-toolkit', packagerVersion: '1.0.6-Stable.300'})

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = {
  "type": "div",
  "attr": {},
  "classList": [
    "add-article-page"
  ],
  "children": [
    {
      "type": "c-input",
      "attr": {
        "label": "名称",
        "clearable": "true",
        "placeholder": "请输入网站名称",
        "value": function () {return this.name}
      },
      "classList": [
        "input-border"
      ],
      "events": {
        "input": "onInputName"
      }
    },
    {
      "type": "c-input",
      "attr": {
        "label": "链接",
        "clearable": "true",
        "placeholder": "请输入网站链接",
        "value": function () {return this.link}
      },
      "classList": [
        "input-border"
      ],
      "events": {
        "input": "onInputLink"
      }
    },
    {
      "type": "text",
      "attr": {
        "value": function () {return (this.id===''||this.id===null)?'添加收藏':'确认修改'}
      },
      "classList": [
        "add-btn"
      ],
      "events": {
        "click": "add"
      }
    }
  ]
}

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = {
  ".add-article-page": {
    "display": "flex",
    "flexDirection": "column"
  },
  ".input-border": {
    "borderBottomWidth": "1px",
    "borderBottomColor": "#eeeeee"
  },
  ".add-btn": {
    "height": "80px",
    "width": "100%",
    "textAlign": "center",
    "marginTop": "50px",
    "backgroundColor": "#24b9ff",
    "color": "#ffffff"
  }
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(module, exports, $app_require$){'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _collect = __webpack_require__(1);

exports.default = {
  data: function data() {
    return {
      id: '',
      name: '',
      link: ''
    };
  },
  onInit: function onInit() {
    this.$page.setTitleBar({ text: this.id === '' || this.id === null ? '收藏网站' : '编辑网站' });
  },
  onInputName: function onInputName(_ref) {
    var value = _ref.detail.value;

    this.name = value;
  },
  onInputLink: function onInputLink(_ref2) {
    var value = _ref2.detail.value;

    this.link = value;
  },
  add: function add() {
    if (this.name.length <= 0) {
      this.$app.$def.prompt.showToast({ message: '网站名称不能为空' });
    } else if (this.link.length <= 0) {
      this.$app.$def.prompt.showToast({ message: '链接不能为空' });
    } else {
      if (this.id === '') {
        this.addArticle();
      } else {
        this.editArticle();
      }
    }
  },
  addArticle: function addArticle() {
    var _this = this;

    (0, _collect.collectWeb)(this.name, this.link).then(function (data) {
      _this.$app.$data.dataAddWeb = {
        gotoPage: 'collectWebList',
        params: {
          success: true
        }
      };
      _this.$app.$def.prompt.showToast({ message: '收藏成功~' });
      _this.$app.$def.router.back();
    }).catch(function (err) {
      _this.$app.$def.prompt.showToast({ message: '收藏失败!' });
    });
  },
  editArticle: function editArticle() {
    var _this2 = this;

    (0, _collect.editCollectWeb)(this.id, this.name, this.link).then(function (data) {
      _this2.$app.$data.dataAddWeb = {
        gotoPage: 'collectWebList',
        params: {
          success: true
        }
      };
      _this2.$app.$def.prompt.showToast({ message: '修改成功~' });
      _this2.$app.$def.router.back();
    }).catch(function (err) {
      _this2.$app.$def.prompt.showToast({ message: '修改失败!' });
    });
  }
};
var moduleOwn = exports.default || module.exports;
var accessors = ['public', 'protected', 'private'];
if (moduleOwn.data && accessors.some(function (acc) {
    return moduleOwn[acc];
  })) {
  throw new Error('页面VM对象中属性data不可与public, protected, private同时存在，请使用public替代data！');
} else if (!moduleOwn.data) {
  moduleOwn.data = {};
  moduleOwn._descriptor = {};
  accessors.forEach(function(acc) {
    var accType = typeof moduleOwn[acc];
    if (accType === 'object') {
      moduleOwn.data = Object.assign(moduleOwn.data, moduleOwn[acc]);
      for (var name in moduleOwn[acc]) {
        moduleOwn._descriptor[name] = {access : acc};
      }
    } else if (accType === 'function') {
      console.warn('页面VM对象中的属性' + acc + '的值不能使函数，请使用对象');
    }
  });
}}

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRcXEFkZENvbGxlY3RXZWJcXGFkZGNvbGxlY3R3ZWIuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDMxYTExOWRkMGM4MWU3YjFkNWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbW1vbi9BcGkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbW1vbi9BcGkvY29sbGVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ29tbW9uL0NvbXBvbmVudC9DSW5wdXQvaW5kZXgudXgiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbW1vbi9Db21wb25lbnQvQ0lucHV0L2luZGV4LnV4PzY1MTUiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbW1vbi9Db21wb25lbnQvQ0lucHV0L2luZGV4LnV4PzczNTUiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbW1vbi9Db21wb25lbnQvQ0lucHV0L2luZGV4LnV4P2IxMTkiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FkZENvbGxlY3RXZWIvYWRkY29sbGVjdHdlYi51eCIsIndlYnBhY2s6Ly8vLi9zcmMvQWRkQ29sbGVjdFdlYi9hZGRjb2xsZWN0d2ViLnV4P2MzZDYiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FkZENvbGxlY3RXZWIvYWRkY29sbGVjdHdlYi51eD8yMmM0Iiwid2VicGFjazovLy8uL3NyYy9BZGRDb2xsZWN0V2ViL2FkZGNvbGxlY3R3ZWIudXg/ODRkNyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxNSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNDMxYTExOWRkMGM4MWU3YjFkNWUiLCJ2YXIgZmV0Y2ggPSAkYXBwX3JlcXVpcmUkKCdAYXBwLW1vZHVsZS9zeXN0ZW0uZmV0Y2gnKTtcbnZhciBzdG9yYWdlID0gJGFwcF9yZXF1aXJlJCgnQGFwcC1tb2R1bGUvc3lzdGVtLnN0b3JhZ2UnKTtcblxudmFyIEFQSV9ST09UID0gJ2h0dHA6Ly93d3cud2FuYW5kcm9pZC5jb20vJztcblxudmFyIGhlYWRlcnMgPSB7fTtcblxuLy8gZnVuY3Rpb24gZ2V0QXV0aChuZXh0KSB7XG4vLyAgIHN0b3JhZ2UuZ2V0KHtcbi8vICAgICBrZXk6ICdhdXRoJyxcbi8vICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4vLyAgICAgICBoZWFkZXJzLkNvb2tpZSA9IGRhdGFcbi8vICAgICAgIG5leHQodHJ1ZSlcbi8vICAgICB9LFxuLy8gICAgIGZhaWw6IGZ1bmN0aW9uKGRhdGEsIGNvZGUpIHtcbi8vICAgICAgIG5leHQoZmFsc2UpXG4vLyAgICAgfVxuLy8gICB9KVxuLy8gfVxuXG5mdW5jdGlvbiBnZXRBdXRoKCkge1xuICAvLyDlj6TkurrkupHvvJrigJzlkJvlrZDkuIDor7rljYPph5HigJ3vvIzov5nnp43igJzmib/or7rlsIbmnaXkvJrmiafooYzigJ3nmoTlr7nosaHlnKhKYXZhU2NyaXB05Lit56ew5Li6UHJvbWlzZeWvueixoSB4ayAyMDE4LTEwLTI0IDIxOjU0OjEzXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgc3RvcmFnZS5nZXQoe1xuICAgICAga2V5OiAnYXV0aCcsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBoZWFkZXJzLkNvb2tpZSA9IGRhdGE7XG4gICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICB9LFxuICAgICAgZmFpbDogZnVuY3Rpb24gKGRhdGEsIGNvZGUpIHtcbiAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZWFsRmV0Y2godXJsLCBkYXRhID0gbnVsbCwgbWV0aG9kID0gJ2dldCcpIHtcbiAgY29uc29sZS5sb2coJ+KUj+KUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgScpO1xuICBjb25zb2xlLmxvZygn4pSDIHVybDogJywgQVBJX1JPT1QgKyB1cmwpO1xuICBjb25zb2xlLmxvZygn4pSDIG1ldGhvZDogJywgbWV0aG9kKTtcbiAgY29uc29sZS5sb2coJ+KUgyBkYXRhOiAnLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gIGNvbnNvbGUubG9nKCfilJfilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIEnKTtcblxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGZldGNoLmZldGNoKHtcbiAgICAgIHVybDogQVBJX1JPT1QgKyB1cmwsXG4gICAgICBkYXRhOiBkYXRhLFxuICAgICAgaGVhZGVyOiBoZWFkZXJzLFxuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICByZXNvbHZlKGRhdGEpO1xuICAgICAgfSxcbiAgICAgIGZhaWw6IGZ1bmN0aW9uIChkYXRhLCBjb2RlKSB7XG4gICAgICAgIHJlamVjdChkYXRhKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHdpdGhBdXRoKHVybCwgZGF0YSA9IG51bGwsIG1ldGhvZCA9ICdnZXQnLCBjYW5Ta2lwID0gZmFsc2UpIHtcbiAgcmV0dXJuIGdldEF1dGgoKS50aGVuKGF1dGggPT4ge1xuICAgIGlmIChhdXRoIHx8IGNhblNraXApIHtcbiAgICAgIHJldHVybiByZWFsRmV0Y2godXJsLCBkYXRhLCBtZXRob2QpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICByZWplY3QoJ+ivt+WFiOeZu+W9le+8gScpO1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gcG9zdCh1cmwsIGRhdGEgPSBudWxsLCBjb25maWcgPSB7fSkge1xuICBpZiAoY29uZmlnLndpdGhBdXRoKSB7XG4gICAgcmV0dXJuIHdpdGhBdXRoKHVybCwgZGF0YSwgJ3Bvc3QnLCBjb25maWcuY2FuU2tpcCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHJlYWxGZXRjaCh1cmwsIGRhdGEsICdwb3N0Jyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0KHVybCwgZGF0YSA9IG51bGwsIGNvbmZpZyA9IHt9KSB7XG4gIGlmIChjb25maWcud2l0aEF1dGgpIHtcbiAgICByZXR1cm4gd2l0aEF1dGgodXJsLCBkYXRhLCAnZ2V0JywgY29uZmlnLmNhblNraXApO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiByZWFsRmV0Y2godXJsLCBkYXRhLCAnZ2V0Jyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAvKipcbiAgICog6I635Y+W6aaW6aG1YmFubmVy5YiX6KGoXG4gICAqL1xuICBnZXRCYW5uZXIoc3VjY2VzcywgZmFpbCkge1xuICAgIHJldHVybiBnZXQoJ2Jhbm5lci9qc29uJywgbnVsbCk7XG4gIH0sXG4gIC8qKlxuICAgKiDojrflj5bpppbpobXmlofnq6DliJfooahcbiAgICovXG4gIGdldEFydGljbGUocGFnZSkge1xuICAgIHJldHVybiBnZXQoJ2FydGljbGUvbGlzdC8nICsgcGFnZSArICcvanNvbicsIG51bGwsIHtcbiAgICAgIHdpdGhBdXRoOiB0cnVlLFxuICAgICAgY2FuU2tpcDogdHJ1ZVxuICAgIH0pO1xuICB9LFxuICAvKipcbiAgICog6I635Y+W5L2T57O75YiG57G7XG4gICAqL1xuICBnZXRDbGFzc2lmeUxpc3QoKSB7XG4gICAgcmV0dXJuIGdldCgndHJlZS9qc29uJywgbnVsbCk7XG4gIH0sXG4gIC8qKlxuICAgKiDmoLnmja7liIbnsbvojrflj5bmlofnq6DliJfooahcbiAgICovXG4gIGdldEFydGljbGVCeUNsYXNzaWZ5KHBhZ2UsIGNpZCkge1xuICAgIHJldHVybiBnZXQoJ2FydGljbGUvbGlzdC8nICsgcGFnZSArICcvanNvbj9jaWQ9JyArIGNpZCwgbnVsbCwge1xuICAgICAgd2l0aEF1dGg6IHRydWUsXG4gICAgICBjYW5Ta2lwOiB0cnVlXG4gICAgfSk7XG4gIH0sXG4gIC8qKlxuICAgKiDnmbvlvZVcbiAgICovXG4gIGxvZ2luKHBhcmFtcykge1xuICAgIHJldHVybiBwb3N0KCd1c2VyL2xvZ2luJywgcGFyYW1zKTtcbiAgfSxcbiAgLyoqXG4gICAqIOazqOWGjFxuICAgKi9cbiAgcmVnaXN0ZXIocGFyYW1zKSB7XG4gICAgcmV0dXJuIHBvc3QoJ3VzZXIvcmVnaXN0ZXInLCBwYXJhbXMpO1xuICB9LFxuICAvKipcbiAgICog6I635Y+W5pS26JeP5paH56ug5YiX6KGoXG4gICAqL1xuICBnZXRDb2xsZWN0QXJ0aWNsZShwYWdlKSB7XG4gICAgcmV0dXJuIGdldCgnbGcvY29sbGVjdC9saXN0LycgKyBwYWdlICsgJy9qc29uJywgbnVsbCwgeyB3aXRoQXV0aDogdHJ1ZSB9KTtcbiAgfSxcbiAgLyoqXG4gICAqIOaUtuiXj+ermeWGheaWh+eroFxuICAgKi9cbiAgY29sbGVjdEFydGljbGUoaWQpIHtcbiAgICByZXR1cm4gcG9zdCgnbGcvY29sbGVjdC8nICsgaWQgKyAnL2pzb24nLCBudWxsLCB7IHdpdGhBdXRoOiB0cnVlIH0pO1xuICB9LFxuICAvKipcbiAgICog5pS26JeP56uZ5aSW5paH56ugXG4gICAqL1xuICBjb2xsZWN0QXJ0aWNsZUFkZChwYXJhbXMpIHtcbiAgICByZXR1cm4gcG9zdCgnbGcvY29sbGVjdC9hZGQvanNvbicsIHBhcmFtcywgeyB3aXRoQXV0aDogdHJ1ZSB9KTtcbiAgfSxcbiAgLyoqXG4gICAqIOS7juaWh+eroOWIl+ihqOWPlua2iOaUtuiXj1xuICAgKi9cbiAgdW5jb2xsZWN0QXJ0aWNsZShpZCkge1xuICAgIHJldHVybiBwb3N0KCdsZy91bmNvbGxlY3Rfb3JpZ2luSWQvJyArIGlkICsgJy9qc29uJywgbnVsbCwgeyB3aXRoQXV0aDogdHJ1ZSB9KTtcbiAgfSxcbiAgLyoqXG4gICAqIOS7juaUtuiXj+WIl+ihqOWPlua2iOaUtuiXj1xuICAgKi9cbiAgdW5jb2xsZWN0KGlkLCBvcmlnaW5JZCkge1xuICAgIHJldHVybiBwb3N0KCdsZy91bmNvbGxlY3QvJyArIGlkICsgJy9qc29uJywgeyBvcmlnaW5JZDogb3JpZ2luSWQgfSwgeyB3aXRoQXV0aDogdHJ1ZSB9KTtcbiAgfSxcbiAgLyoqXG4gICAqIOiOt+WPluaUtuiXj+e9keermeWIl+ihqFxuICAgKi9cbiAgZ2V0Q29sbGVjdFdlYigpIHtcbiAgICByZXR1cm4gZ2V0KCdsZy9jb2xsZWN0L3VzZXJ0b29scy9qc29uJywgbnVsbCwgeyB3aXRoQXV0aDogdHJ1ZSB9KTtcbiAgfSxcbiAgLyoqXG4gICAqIOaUtuiXj+e9keermVxuICAgKi9cbiAgY29sbGVjdFdlYihwYXJhbXMpIHtcbiAgICByZXR1cm4gcG9zdCgnbGcvY29sbGVjdC9hZGR0b29sL2pzb24nLCBwYXJhbXMsIHsgd2l0aEF1dGg6IHRydWUgfSk7XG4gIH0sXG4gIC8qKlxuICAgKiDnvJbovpHmlLbol4/nmoTnvZHlnYBcbiAgICovXG4gIGVkaXRDb2xsZWN0V2ViKHBhcmFtcykge1xuICAgIHJldHVybiBwb3N0KCdsZy9jb2xsZWN0L3VwZGF0ZXRvb2wvanNvbicsIHBhcmFtcywgeyB3aXRoQXV0aDogdHJ1ZSB9KTtcbiAgfSxcbiAgLyoqXG4gICAqIOWIoOmZpOaUtuiXj+eahOe9keWdgFxuICAgKi9cbiAgZGVsZXRlQ29sbGVjdFdlYihpZCkge1xuICAgIHJldHVybiBwb3N0KCdsZy9jb2xsZWN0L2RlbGV0ZXRvb2wvanNvbicsIHsgaWQ6IGlkIH0sIHsgd2l0aEF1dGg6IHRydWUgfSk7XG4gIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvQ29tbW9uL0FwaS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCIsImltcG9ydCBhcGkgZnJvbSAnLi9pbmRleCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb2xsZWN0QXJ0aWNsZShwYWdlKSB7XG4gIHJldHVybiBhcGkuZ2V0Q29sbGVjdEFydGljbGUocGFnZSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShKU09OLnBhcnNlKHJlc3BvbnNlLmRhdGEpLmRhdGEpO1xuICB9KS5jYXRjaChlcnIgPT4ge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbGxlY3RBcnRpY2xlKGlkKSB7XG4gIHJldHVybiBhcGkuY29sbGVjdEFydGljbGUoaWQpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgIHZhciB2YWx1ZSA9IEpTT04ucGFyc2UocmVzcG9uc2UuZGF0YSk7XG4gICAgaWYgKHZhbHVlLmVycm9yQ29kZSA9PT0gLTEpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgn6K+35YWI55m75b2VJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUuZGF0YSk7XG4gICAgfVxuICB9KS5jYXRjaChlcnIgPT4ge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbGxlY3RBcnRpY2xlQWRkKHRpdGxlLCBhdXRob3IsIGxpbmspIHtcbiAgcmV0dXJuIGFwaS5jb2xsZWN0QXJ0aWNsZUFkZCh7XG4gICAgdGl0bGU6IHRpdGxlLFxuICAgIGF1dGhvcjogYXV0aG9yLFxuICAgIGxpbms6IGxpbmtcbiAgfSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShKU09OLnBhcnNlKHJlc3BvbnNlLmRhdGEpLmRhdGEpO1xuICB9KS5jYXRjaChlcnIgPT4ge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuY29sbGVjdEFydGljbGUoaWQpIHtcbiAgcmV0dXJuIGFwaS51bmNvbGxlY3RBcnRpY2xlKGlkKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKEpTT04ucGFyc2UocmVzcG9uc2UuZGF0YSkuZGF0YSk7XG4gIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5jb2xsZWN0KGlkLCBvcmlnaW5JZCkge1xuICByZXR1cm4gYXBpLnVuY29sbGVjdChpZCwgb3JpZ2luSWQpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoSlNPTi5wYXJzZShyZXNwb25zZS5kYXRhKS5kYXRhKTtcbiAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb2xsZWN0V2ViKCkge1xuICByZXR1cm4gYXBpLmdldENvbGxlY3RXZWIoKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKEpTT04ucGFyc2UocmVzcG9uc2UuZGF0YSkuZGF0YSk7XG4gIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29sbGVjdFdlYihuYW1lLCBsaW5rKSB7XG4gIHJldHVybiBhcGkuY29sbGVjdFdlYih7XG4gICAgbmFtZTogbmFtZSxcbiAgICBsaW5rOiBsaW5rXG4gIH0pLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoSlNPTi5wYXJzZShyZXNwb25zZS5kYXRhKS5kYXRhKTtcbiAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlZGl0Q29sbGVjdFdlYihpZCwgbmFtZSwgbGluaykge1xuICByZXR1cm4gYXBpLmVkaXRDb2xsZWN0V2ViKHtcbiAgICBpZDogaWQsXG4gICAgbmFtZTogbmFtZSxcbiAgICBsaW5rOiBsaW5rXG4gIH0pLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoSlNPTi5wYXJzZShyZXNwb25zZS5kYXRhKS5kYXRhKTtcbiAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVDb2xsZWN0V2ViKGlkKSB7XG4gIHJldHVybiBhcGkuZGVsZXRlQ29sbGVjdFdlYihpZCkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShKU09OLnBhcnNlKHJlc3BvbnNlLmRhdGEpLmRhdGEpO1xuICB9KS5jYXRjaChlcnIgPT4ge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9Db21tb24vQXBpL2NvbGxlY3QuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQiLCJ2YXIgJGFwcF90ZW1wbGF0ZSQgPSByZXF1aXJlKFwiISFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1qc29uLWxvYWRlci5qcyFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS10ZW1wbGF0ZS1sb2FkZXIuanMhYzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT10ZW1wbGF0ZXMhLi9pbmRleC51eFwiKVxudmFyICRhcHBfc3R5bGUkID0gcmVxdWlyZShcIiEhYzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtanNvbi1sb2FkZXIuanMhYzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtc3R5bGUtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWU6XFxcXFhrV29ya1xcXFxGYXN0QXBwV29ya1NwYWNlXFxcXGZhc3RhcHBcXFxcY29tLnhrLmZhc3RhcHBcXFxcc3JjXFxcXENvbW1vblxcXFxDb21wb25lbnRcXFxcQ0lucHV0XFxcXGluZGV4LnV4IWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1lOlxcXFxYa1dvcmtcXFxcRmFzdEFwcFdvcmtTcGFjZVxcXFxmYXN0YXBwXFxcXGNvbS54ay5mYXN0YXBwXFxcXHNyY1xcXFxDb21tb25cXFxcQ29tcG9uZW50XFxcXENJbnB1dFxcXFxpbmRleC51eCEuL2luZGV4LnV4XCIpXG52YXIgJGFwcF9zY3JpcHQkID0gcmVxdWlyZShcIiEhYzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtc2NyaXB0LWxvYWRlci5qcyFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1hY2Nlc3MtbG9hZGVyLmpzIWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGJhYmVsLWxvYWRlcj9wcmVzZXRzW109YzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcYmFiZWwtcHJlc2V0LWVudiZwcmVzZXRzPWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGJhYmVsLXByZXNldC1lbnYmcGx1Z2luc1tdPWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGpzeC1sb2FkZXIuanMmcGx1Z2lucz1jOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxqc3gtbG9hZGVyLmpzJmNvbW1lbnRzPWZhbHNlIWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyEuL2luZGV4LnV4XCIpXG5cbiRhcHBfZGVmaW5lJCgnQGFwcC1jb21wb25lbnQvYy1pbnB1dCcsIFtdLCBmdW5jdGlvbigkYXBwX3JlcXVpcmUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX21vZHVsZSQpe1xuICAgICAkYXBwX3NjcmlwdCQoJGFwcF9tb2R1bGUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX3JlcXVpcmUkKVxuICAgICBpZiAoJGFwcF9leHBvcnRzJC5fX2VzTW9kdWxlICYmICRhcHBfZXhwb3J0cyQuZGVmYXVsdCkge1xuICAgICAgICAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMgPSAkYXBwX2V4cG9ydHMkLmRlZmF1bHRcbiAgICAgICAgfVxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy50ZW1wbGF0ZSA9ICRhcHBfdGVtcGxhdGUkXG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnN0eWxlID0gJGFwcF9zdHlsZSRcbn0pXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9sb2FkZXIuanM/dHlwZT1jb21wb25lbnQhLi9zcmMvQ29tbW9uL0NvbXBvbmVudC9DSW5wdXQvaW5kZXgudXg/bmFtZT1jLWlucHV0XG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAzIDQiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gIFwiYXR0clwiOiB7fSxcbiAgXCJjbGFzc0xpc3RcIjogW1xuICAgIFwiYy1pbnB1dFwiXG4gIF0sXG4gIFwiY2hpbGRyZW5cIjogW1xuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcImMtaW5wdXQtY29udGVudFwiXG4gICAgICBdLFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiB0aGlzLmxhYmVsfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJpbnB1dC1sYWJlbFwiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gdGhpcy5sYWJlbH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImlucHV0XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwidHlwZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuIHRoaXMudHlwZX0sXG4gICAgICAgICAgICBcInBsYWNlaG9sZGVyXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gdGhpcy5wbGFjZWhvbGRlcn0sXG4gICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gdGhpcy5pbnB1dFZhbHVlfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJpbnB1dC1uYXRpdmVcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgXCJjaGFuZ2VcIjogXCJvbklucHV0XCJcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJjbGVhci1ib3hcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuIHRoaXMuY2xlYXJhYmxlfSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwiaW5wdXQtY2xlYXJcIlxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gdGhpcy5jbGVhcn0sXG4gICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwib25DbGVhclwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLDl1wiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICBdXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gYzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtanNvbi1sb2FkZXIuanMhYzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtdGVtcGxhdGUtbG9hZGVyLmpzIWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9dGVtcGxhdGVzIS4vc3JjL0NvbW1vbi9Db21wb25lbnQvQ0lucHV0L2luZGV4LnV4XG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAzIDQiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgXCIuYy1pbnB1dC1jb250ZW50XCI6IHtcbiAgICBcImRpc3BsYXlcIjogXCJmbGV4XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiNDBweFwiLFxuICAgIFwiZm9udFNpemVcIjogXCIzMHB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIyMHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCI4MHB4XCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCIuaW5wdXQtbGFiZWxcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMjBweFwiXG4gIH0sXG4gIFwiLmlucHV0LW5hdGl2ZVwiOiB7XG4gICAgXCJmbGV4XCI6IDEsXG4gICAgXCJmb250U2l6ZVwiOiBcIjMwcHhcIlxuICB9LFxuICBcIi5jbGVhci1ib3hcIjoge1xuICAgIFwiaGVpZ2h0XCI6IFwiNDBweFwiLFxuICAgIFwid2lkdGhcIjogXCI0MHB4XCJcbiAgfSxcbiAgXCIuaW5wdXQtY2xlYXJcIjoge1xuICAgIFwiZGlzcGxheVwiOiBcImZsZXhcIixcbiAgICBcImhlaWdodFwiOiBcIjQwcHhcIixcbiAgICBcIndpZHRoXCI6IFwiNDBweFwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiMjVweFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2RkZGRkZFwiXG4gIH0sXG4gIFwiLmlucHV0LWNsZWFyIHRleHRcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJ0ZXh0QWxpZ25cIjogXCJjZW50ZXJcIixcbiAgICBcImZvbnRTaXplXCI6IFwiMzVweFwiLFxuICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgXCJtYXJnaW5Ub3BcIjogXCItNXB4XCIsXG4gICAgXCJfbWV0YVwiOiB7XG4gICAgICBcInJ1bGVEZWZcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0XCI6IFwiYVwiLFxuICAgICAgICAgIFwiblwiOiBcImNsYXNzXCIsXG4gICAgICAgICAgXCJpXCI6IGZhbHNlLFxuICAgICAgICAgIFwiYVwiOiBcImVsZW1lbnRcIixcbiAgICAgICAgICBcInZcIjogXCJpbnB1dC1jbGVhclwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInRcIjogXCJkXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidFwiOiBcInRcIixcbiAgICAgICAgICBcIm5cIjogXCJ0ZXh0XCJcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWpzb24tbG9hZGVyLmpzIWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLXN0eWxlLWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1lOi9Ya1dvcmsvRmFzdEFwcFdvcmtTcGFjZS9mYXN0YXBwL2NvbS54ay5mYXN0YXBwL3NyYy9Db21tb24vQ29tcG9uZW50L0NJbnB1dC9pbmRleC51eCFjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZTovWGtXb3JrL0Zhc3RBcHBXb3JrU3BhY2UvZmFzdGFwcC9jb20ueGsuZmFzdGFwcC9zcmMvQ29tbW9uL0NvbXBvbmVudC9DSW5wdXQvaW5kZXgudXghLi9zcmMvQ29tbW9uL0NvbXBvbmVudC9DSW5wdXQvaW5kZXgudXhcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDMgNCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCAkYXBwX3JlcXVpcmUkKXsndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfcHJvcHMkcHJvcHMkZGF0YSRvbkk7XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHsgaWYgKGtleSBpbiBvYmopIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTsgfSBlbHNlIHsgb2JqW2tleV0gPSB2YWx1ZTsgfSByZXR1cm4gb2JqOyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IChfcHJvcHMkcHJvcHMkZGF0YSRvbkkgPSB7XG4gIHByb3BzOiBbJ2xhYmVsJywgJ3BsYWNlaG9sZGVyJywgJ3R5cGUnLCAndmFsdWUnLCAnY2xlYXJhYmxlJ11cbn0sIF9kZWZpbmVQcm9wZXJ0eShfcHJvcHMkcHJvcHMkZGF0YSRvbkksICdwcm9wcycsIHtcbiAgcGxhY2Vob2xkZXI6ICfor7fovpPlhaUuLi4nLFxuICB0eXBlOiAndGV4dCcsXG4gIHZhbHVlOiAnJyxcbiAgY2xlYXJhYmxlOiBmYWxzZVxufSksIF9kZWZpbmVQcm9wZXJ0eShfcHJvcHMkcHJvcHMkZGF0YSRvbkksICdkYXRhJywgZnVuY3Rpb24gZGF0YSgpIHtcbiAgcmV0dXJuIHtcbiAgICBjbGVhcjogZmFsc2UsXG4gICAgaW5wdXRWYWx1ZTogJydcbiAgfTtcbn0pLCBfZGVmaW5lUHJvcGVydHkoX3Byb3BzJHByb3BzJGRhdGEkb25JLCAnb25Jbml0JywgZnVuY3Rpb24gb25Jbml0KCkge1xuICB0aGlzLmlucHV0VmFsdWUgPSB0aGlzLnZhbHVlO1xufSksIF9kZWZpbmVQcm9wZXJ0eShfcHJvcHMkcHJvcHMkZGF0YSRvbkksICdvbklucHV0JywgZnVuY3Rpb24gb25JbnB1dChfcmVmKSB7XG4gIHZhciB2YWx1ZSA9IF9yZWYudmFsdWU7XG5cbiAgdGhpcy5jbGVhciA9IHZhbHVlICE9PSAnJztcbiAgdGhpcy5pbnB1dFZhbHVlID0gdmFsdWU7XG4gIHRoaXMuJGRpc3BhdGNoKCdpbnB1dCcsIHsgdmFsdWU6IHZhbHVlIH0pO1xufSksIF9kZWZpbmVQcm9wZXJ0eShfcHJvcHMkcHJvcHMkZGF0YSRvbkksICdvbkNsZWFyJywgZnVuY3Rpb24gb25DbGVhcigpIHtcbiAgdGhpcy5jbGVhciA9IGZhbHNlO1xuICB0aGlzLmlucHV0VmFsdWUgPSAnJztcbiAgdGhpcy4kZGlzcGF0Y2goJ2NsZWFyJywgeyB2YWx1ZTogdGhpcy52YWx1ZSB9KTtcbn0pLCBfcHJvcHMkcHJvcHMkZGF0YSRvbkkpO1xudmFyIG1vZHVsZU93biA9IGV4cG9ydHMuZGVmYXVsdCB8fCBtb2R1bGUuZXhwb3J0cztcbnZhciBhY2Nlc3NvcnMgPSBbJ3B1YmxpYycsICdwcm90ZWN0ZWQnLCAncHJpdmF0ZSddO1xuaWYgKG1vZHVsZU93bi5kYXRhICYmIGFjY2Vzc29ycy5zb21lKGZ1bmN0aW9uIChhY2MpIHtcbiAgICByZXR1cm4gbW9kdWxlT3duW2FjY107XG4gIH0pKSB7XG4gIHRocm93IG5ldyBFcnJvcign6aG16Z2iVk3lr7nosaHkuK3lsZ7mgKdkYXRh5LiN5Y+v5LiOcHVibGljLCBwcm90ZWN0ZWQsIHByaXZhdGXlkIzml7blrZjlnKjvvIzor7fkvb/nlKhwdWJsaWPmm7/ku6NkYXRh77yBJyk7XG59IGVsc2UgaWYgKCFtb2R1bGVPd24uZGF0YSkge1xuICBtb2R1bGVPd24uZGF0YSA9IHt9O1xuICBtb2R1bGVPd24uX2Rlc2NyaXB0b3IgPSB7fTtcbiAgYWNjZXNzb3JzLmZvckVhY2goZnVuY3Rpb24oYWNjKSB7XG4gICAgdmFyIGFjY1R5cGUgPSB0eXBlb2YgbW9kdWxlT3duW2FjY107XG4gICAgaWYgKGFjY1R5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBtb2R1bGVPd24uZGF0YSA9IE9iamVjdC5hc3NpZ24obW9kdWxlT3duLmRhdGEsIG1vZHVsZU93blthY2NdKTtcbiAgICAgIGZvciAodmFyIG5hbWUgaW4gbW9kdWxlT3duW2FjY10pIHtcbiAgICAgICAgbW9kdWxlT3duLl9kZXNjcmlwdG9yW25hbWVdID0ge2FjY2VzcyA6IGFjY307XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChhY2NUeXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ+mhtemdolZN5a+56LGh5Lit55qE5bGe5oCnJyArIGFjYyArICfnmoTlgLzkuI3og73kvb/lh73mlbDvvIzor7fkvb/nlKjlr7nosaEnKTtcbiAgICB9XG4gIH0pO1xufX1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1zY3JpcHQtbG9hZGVyLmpzIWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWFjY2Vzcy1sb2FkZXIuanMhYzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYj9wcmVzZXRzW109YzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvYmFiZWwtcHJlc2V0LWVudiZwcmVzZXRzPWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2JhYmVsLXByZXNldC1lbnYmcGx1Z2luc1tdPWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2pzeC1sb2FkZXIuanMmcGx1Z2lucz1jOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9qc3gtbG9hZGVyLmpzJmNvbW1lbnRzPWZhbHNlIWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyEuL3NyYy9Db21tb24vQ29tcG9uZW50L0NJbnB1dC9pbmRleC51eFxuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMyA0IiwicmVxdWlyZShcIiEhYzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50IS4uL0NvbW1vbi9Db21wb25lbnQvQ0lucHV0L2luZGV4LnV4P25hbWU9Yy1pbnB1dFwiKVxudmFyICRhcHBfdGVtcGxhdGUkID0gcmVxdWlyZShcIiEhYzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtanNvbi1sb2FkZXIuanMhYzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtdGVtcGxhdGUtbG9hZGVyLmpzIWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9dGVtcGxhdGVzIS4vYWRkY29sbGVjdHdlYi51eFwiKVxudmFyICRhcHBfc3R5bGUkID0gcmVxdWlyZShcIiEhYzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtanNvbi1sb2FkZXIuanMhYzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtc3R5bGUtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWU6XFxcXFhrV29ya1xcXFxGYXN0QXBwV29ya1NwYWNlXFxcXGZhc3RhcHBcXFxcY29tLnhrLmZhc3RhcHBcXFxcc3JjXFxcXEFkZENvbGxlY3RXZWJcXFxcYWRkY29sbGVjdHdlYi51eCFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZTpcXFxcWGtXb3JrXFxcXEZhc3RBcHBXb3JrU3BhY2VcXFxcZmFzdGFwcFxcXFxjb20ueGsuZmFzdGFwcFxcXFxzcmNcXFxcQWRkQ29sbGVjdFdlYlxcXFxhZGRjb2xsZWN0d2ViLnV4IS4vYWRkY29sbGVjdHdlYi51eFwiKVxudmFyICRhcHBfc2NyaXB0JCA9IHJlcXVpcmUoXCIhIWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLXNjcmlwdC1sb2FkZXIuanMhYzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtYWNjZXNzLWxvYWRlci5qcyFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxiYWJlbC1sb2FkZXI/cHJlc2V0c1tdPWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGJhYmVsLXByZXNldC1lbnYmcHJlc2V0cz1jOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxiYWJlbC1wcmVzZXQtZW52JnBsdWdpbnNbXT1jOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxqc3gtbG9hZGVyLmpzJnBsdWdpbnM9YzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcanN4LWxvYWRlci5qcyZjb21tZW50cz1mYWxzZSFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXNjcmlwdHMhLi9hZGRjb2xsZWN0d2ViLnV4XCIpXG5cbiRhcHBfZGVmaW5lJCgnQGFwcC1jb21wb25lbnQvYWRkY29sbGVjdHdlYicsIFtdLCBmdW5jdGlvbigkYXBwX3JlcXVpcmUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX21vZHVsZSQpe1xuICAgICAkYXBwX3NjcmlwdCQoJGFwcF9tb2R1bGUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX3JlcXVpcmUkKVxuICAgICBpZiAoJGFwcF9leHBvcnRzJC5fX2VzTW9kdWxlICYmICRhcHBfZXhwb3J0cyQuZGVmYXVsdCkge1xuICAgICAgICAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMgPSAkYXBwX2V4cG9ydHMkLmRlZmF1bHRcbiAgICAgICAgfVxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy50ZW1wbGF0ZSA9ICRhcHBfdGVtcGxhdGUkXG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnN0eWxlID0gJGFwcF9zdHlsZSRcbn0pXG5cbiRhcHBfYm9vdHN0cmFwJCgnQGFwcC1jb21wb25lbnQvYWRkY29sbGVjdHdlYicseyBwYWNrYWdlck5hbWU6J2ZhLXRvb2xraXQnLCBwYWNrYWdlclZlcnNpb246ICcxLjAuNi1TdGFibGUuMzAwJ30pXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvQWRkQ29sbGVjdFdlYi9hZGRjb2xsZWN0d2ViLnV4XG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDMiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gIFwiYXR0clwiOiB7fSxcbiAgXCJjbGFzc0xpc3RcIjogW1xuICAgIFwiYWRkLWFydGljbGUtcGFnZVwiXG4gIF0sXG4gIFwiY2hpbGRyZW5cIjogW1xuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImMtaW5wdXRcIixcbiAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgIFwibGFiZWxcIjogXCLlkI3np7BcIixcbiAgICAgICAgXCJjbGVhcmFibGVcIjogXCJ0cnVlXCIsXG4gICAgICAgIFwicGxhY2Vob2xkZXJcIjogXCLor7fovpPlhaXnvZHnq5nlkI3np7BcIixcbiAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuIHRoaXMubmFtZX1cbiAgICAgIH0sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwiaW5wdXQtYm9yZGVyXCJcbiAgICAgIF0sXG4gICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgIFwiaW5wdXRcIjogXCJvbklucHV0TmFtZVwiXG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJjLWlucHV0XCIsXG4gICAgICBcImF0dHJcIjoge1xuICAgICAgICBcImxhYmVsXCI6IFwi6ZO+5o6lXCIsXG4gICAgICAgIFwiY2xlYXJhYmxlXCI6IFwidHJ1ZVwiLFxuICAgICAgICBcInBsYWNlaG9sZGVyXCI6IFwi6K+36L6T5YWl572R56uZ6ZO+5o6lXCIsXG4gICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiB0aGlzLmxpbmt9XG4gICAgICB9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcImlucHV0LWJvcmRlclwiXG4gICAgICBdLFxuICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICBcImlucHV0XCI6IFwib25JbnB1dExpbmtcIlxuICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmlkPT09Jyd8fHRoaXMuaWQ9PT1udWxsKT8n5re75Yqg5pS26JePJzon56Gu6K6k5L+u5pS5J31cbiAgICAgIH0sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwiYWRkLWJ0blwiXG4gICAgICBdLFxuICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICBcImNsaWNrXCI6IFwiYWRkXCJcbiAgICAgIH1cbiAgICB9XG4gIF1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1qc29uLWxvYWRlci5qcyFjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS10ZW1wbGF0ZS1sb2FkZXIuanMhYzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT10ZW1wbGF0ZXMhLi9zcmMvQWRkQ29sbGVjdFdlYi9hZGRjb2xsZWN0d2ViLnV4XG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDMiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgXCIuYWRkLWFydGljbGUtcGFnZVwiOiB7XG4gICAgXCJkaXNwbGF5XCI6IFwiZmxleFwiLFxuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiXG4gIH0sXG4gIFwiLmlucHV0LWJvcmRlclwiOiB7XG4gICAgXCJib3JkZXJCb3R0b21XaWR0aFwiOiBcIjFweFwiLFxuICAgIFwiYm9yZGVyQm90dG9tQ29sb3JcIjogXCIjZWVlZWVlXCJcbiAgfSxcbiAgXCIuYWRkLWJ0blwiOiB7XG4gICAgXCJoZWlnaHRcIjogXCI4MHB4XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiLFxuICAgIFwibWFyZ2luVG9wXCI6IFwiNTBweFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiIzI0YjlmZlwiLFxuICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCJcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWpzb24tbG9hZGVyLmpzIWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLXN0eWxlLWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1lOi9Ya1dvcmsvRmFzdEFwcFdvcmtTcGFjZS9mYXN0YXBwL2NvbS54ay5mYXN0YXBwL3NyYy9BZGRDb2xsZWN0V2ViL2FkZGNvbGxlY3R3ZWIudXghYzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWU6L1hrV29yay9GYXN0QXBwV29ya1NwYWNlL2Zhc3RhcHAvY29tLnhrLmZhc3RhcHAvc3JjL0FkZENvbGxlY3RXZWIvYWRkY29sbGVjdHdlYi51eCEuL3NyYy9BZGRDb2xsZWN0V2ViL2FkZGNvbGxlY3R3ZWIudXhcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCAkYXBwX3JlcXVpcmUkKXsndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY29sbGVjdCA9IHJlcXVpcmUoJy4uL0NvbW1vbi9BcGkvY29sbGVjdCcpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSB7XG4gIGRhdGE6IGZ1bmN0aW9uIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiAnJyxcbiAgICAgIG5hbWU6ICcnLFxuICAgICAgbGluazogJydcbiAgICB9O1xuICB9LFxuICBvbkluaXQ6IGZ1bmN0aW9uIG9uSW5pdCgpIHtcbiAgICB0aGlzLiRwYWdlLnNldFRpdGxlQmFyKHsgdGV4dDogdGhpcy5pZCA9PT0gJycgfHwgdGhpcy5pZCA9PT0gbnVsbCA/ICfmlLbol4/nvZHnq5knIDogJ+e8lui+kee9keermScgfSk7XG4gIH0sXG4gIG9uSW5wdXROYW1lOiBmdW5jdGlvbiBvbklucHV0TmFtZShfcmVmKSB7XG4gICAgdmFyIHZhbHVlID0gX3JlZi5kZXRhaWwudmFsdWU7XG5cbiAgICB0aGlzLm5hbWUgPSB2YWx1ZTtcbiAgfSxcbiAgb25JbnB1dExpbms6IGZ1bmN0aW9uIG9uSW5wdXRMaW5rKF9yZWYyKSB7XG4gICAgdmFyIHZhbHVlID0gX3JlZjIuZGV0YWlsLnZhbHVlO1xuXG4gICAgdGhpcy5saW5rID0gdmFsdWU7XG4gIH0sXG4gIGFkZDogZnVuY3Rpb24gYWRkKCkge1xuICAgIGlmICh0aGlzLm5hbWUubGVuZ3RoIDw9IDApIHtcbiAgICAgIHRoaXMuJGFwcC4kZGVmLnByb21wdC5zaG93VG9hc3QoeyBtZXNzYWdlOiAn572R56uZ5ZCN56ew5LiN6IO95Li656m6JyB9KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubGluay5sZW5ndGggPD0gMCkge1xuICAgICAgdGhpcy4kYXBwLiRkZWYucHJvbXB0LnNob3dUb2FzdCh7IG1lc3NhZ2U6ICfpk77mjqXkuI3og73kuLrnqbonIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5pZCA9PT0gJycpIHtcbiAgICAgICAgdGhpcy5hZGRBcnRpY2xlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmVkaXRBcnRpY2xlKCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBhZGRBcnRpY2xlOiBmdW5jdGlvbiBhZGRBcnRpY2xlKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAoMCwgX2NvbGxlY3QuY29sbGVjdFdlYikodGhpcy5uYW1lLCB0aGlzLmxpbmspLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIF90aGlzLiRhcHAuJGRhdGEuZGF0YUFkZFdlYiA9IHtcbiAgICAgICAgZ290b1BhZ2U6ICdjb2xsZWN0V2ViTGlzdCcsXG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIHN1Y2Nlc3M6IHRydWVcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIF90aGlzLiRhcHAuJGRlZi5wcm9tcHQuc2hvd1RvYXN0KHsgbWVzc2FnZTogJ+aUtuiXj+aIkOWKn34nIH0pO1xuICAgICAgX3RoaXMuJGFwcC4kZGVmLnJvdXRlci5iYWNrKCk7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgX3RoaXMuJGFwcC4kZGVmLnByb21wdC5zaG93VG9hc3QoeyBtZXNzYWdlOiAn5pS26JeP5aSx6LSlIScgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGVkaXRBcnRpY2xlOiBmdW5jdGlvbiBlZGl0QXJ0aWNsZSgpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICgwLCBfY29sbGVjdC5lZGl0Q29sbGVjdFdlYikodGhpcy5pZCwgdGhpcy5uYW1lLCB0aGlzLmxpbmspLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIF90aGlzMi4kYXBwLiRkYXRhLmRhdGFBZGRXZWIgPSB7XG4gICAgICAgIGdvdG9QYWdlOiAnY29sbGVjdFdlYkxpc3QnLFxuICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICBzdWNjZXNzOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBfdGhpczIuJGFwcC4kZGVmLnByb21wdC5zaG93VG9hc3QoeyBtZXNzYWdlOiAn5L+u5pS55oiQ5YqfficgfSk7XG4gICAgICBfdGhpczIuJGFwcC4kZGVmLnJvdXRlci5iYWNrKCk7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgX3RoaXMyLiRhcHAuJGRlZi5wcm9tcHQuc2hvd1RvYXN0KHsgbWVzc2FnZTogJ+S/ruaUueWksei0pSEnIH0pO1xuICAgIH0pO1xuICB9XG59O1xudmFyIG1vZHVsZU93biA9IGV4cG9ydHMuZGVmYXVsdCB8fCBtb2R1bGUuZXhwb3J0cztcbnZhciBhY2Nlc3NvcnMgPSBbJ3B1YmxpYycsICdwcm90ZWN0ZWQnLCAncHJpdmF0ZSddO1xuaWYgKG1vZHVsZU93bi5kYXRhICYmIGFjY2Vzc29ycy5zb21lKGZ1bmN0aW9uIChhY2MpIHtcbiAgICByZXR1cm4gbW9kdWxlT3duW2FjY107XG4gIH0pKSB7XG4gIHRocm93IG5ldyBFcnJvcign6aG16Z2iVk3lr7nosaHkuK3lsZ7mgKdkYXRh5LiN5Y+v5LiOcHVibGljLCBwcm90ZWN0ZWQsIHByaXZhdGXlkIzml7blrZjlnKjvvIzor7fkvb/nlKhwdWJsaWPmm7/ku6NkYXRh77yBJyk7XG59IGVsc2UgaWYgKCFtb2R1bGVPd24uZGF0YSkge1xuICBtb2R1bGVPd24uZGF0YSA9IHt9O1xuICBtb2R1bGVPd24uX2Rlc2NyaXB0b3IgPSB7fTtcbiAgYWNjZXNzb3JzLmZvckVhY2goZnVuY3Rpb24oYWNjKSB7XG4gICAgdmFyIGFjY1R5cGUgPSB0eXBlb2YgbW9kdWxlT3duW2FjY107XG4gICAgaWYgKGFjY1R5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBtb2R1bGVPd24uZGF0YSA9IE9iamVjdC5hc3NpZ24obW9kdWxlT3duLmRhdGEsIG1vZHVsZU93blthY2NdKTtcbiAgICAgIGZvciAodmFyIG5hbWUgaW4gbW9kdWxlT3duW2FjY10pIHtcbiAgICAgICAgbW9kdWxlT3duLl9kZXNjcmlwdG9yW25hbWVdID0ge2FjY2VzcyA6IGFjY307XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChhY2NUeXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ+mhtemdolZN5a+56LGh5Lit55qE5bGe5oCnJyArIGFjYyArICfnmoTlgLzkuI3og73kvb/lh73mlbDvvIzor7fkvb/nlKjlr7nosaEnKTtcbiAgICB9XG4gIH0pO1xufX1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1zY3JpcHQtbG9hZGVyLmpzIWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWFjY2Vzcy1sb2FkZXIuanMhYzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYj9wcmVzZXRzW109YzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvYmFiZWwtcHJlc2V0LWVudiZwcmVzZXRzPWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2JhYmVsLXByZXNldC1lbnYmcGx1Z2luc1tdPWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2pzeC1sb2FkZXIuanMmcGx1Z2lucz1jOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9qc3gtbG9hZGVyLmpzJmNvbW1lbnRzPWZhbHNlIWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyEuL3NyYy9BZGRDb2xsZWN0V2ViL2FkZGNvbGxlY3R3ZWIudXhcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN4TEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QSIsInNvdXJjZVJvb3QiOiIifQ==