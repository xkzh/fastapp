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
/******/ 	return __webpack_require__(__webpack_require__.s = 29);
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
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["login"] = login;
/* harmony export (immutable) */ __webpack_exports__["register"] = register;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__(0);

var storage = $app_require$('@app-module/system.storage');

function login(username, password) {
  return __WEBPACK_IMPORTED_MODULE_0__index__["a" /* default */].login({
    username: username,
    password: password
  }).then(response => {
    var value = JSON.parse(response.data);
    if (value.errorCode === -1) {
      Promise.reject(value.errorMsg);
    }
    storage.set({
      key: 'auth',
      value: response.headers['Set-Cookie'],
      success: function (data) {
        console.log('cookies保存成功');
      }
    });
    storage.set({
      key: 'user',
      value: value.data
    });
    storage.set({
      key: 'isLogin',
      value: true
    });
    return Promise.resolve(value.data);
  }).catch(err => {
    return Promise.reject('登录失败');
  });
}

function register(username, password, repassword) {
  return __WEBPACK_IMPORTED_MODULE_0__index__["a" /* default */].register({
    username: username,
    password: password,
    repassword: repassword
  }).then(response => {
    var value = JSON.parse(response.data);
    if (value.errorCode === -1) {
      Promise.reject(value.errorMsg);
    }
    storage.set({
      key: 'auth',
      value: response.headers['Set-Cookie'],
      success: function (data) {
        console.log('cookies保存成功');
      }
    });
    storage.set({
      key: 'user',
      value: value.data
    });
    storage.set({
      key: 'isLogin',
      value: true
    });
    return Promise.resolve(value.data);
  }).catch(err => {
    return Promise.reject('注册失败');
  });
}

/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(30)
__webpack_require__(35)
__webpack_require__(40)
var $app_template$ = __webpack_require__(56)
var $app_style$ = __webpack_require__(57)
var $app_script$ = __webpack_require__(58)

$app_define$('@app-component/main', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})

$app_bootstrap$('@app-component/main',{ packagerName:'fa-toolkit', packagerVersion: '1.0.6-Stable.300'})

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var $app_template$ = __webpack_require__(31)
var $app_style$ = __webpack_require__(32)
var $app_script$ = __webpack_require__(33)

$app_define$('@app-component/home', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})


/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = {
  "type": "refresh",
  "attr": {
    "refreshing": function () {return this.isRefreshing}
  },
  "events": {
    "refresh": "refresh"
  },
  "children": [
    {
      "type": "list",
      "attr": {},
      "classList": [
        "home-page"
      ],
      "events": {
        "scrollbottom": "loadMoreData"
      },
      "children": [
        {
          "type": "list-item",
          "attr": {
            "type": "banner"
          },
          "children": [
            {
              "type": "swiper",
              "attr": {
                "autoplay": "true",
                "interval": "4000"
              },
              "classList": [
                "banner"
              ],
              "children": [
                {
                  "type": "stack",
                  "attr": {},
                  "classList": [
                    "banner"
                  ],
                  "repeat": function () {return this.bannerlist},
                  "children": [
                    {
                      "type": "image",
                      "attr": {
                        "src": function () {return this.$item.imagePath}
                      },
                      "classList": [
                        "banner-image"
                      ],
                      "events": {
                        "click": function (evt) {this.openArticle(this.$item.url,'',this.$item.title,evt)}
                      }
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": function () {return this.$item.title}
                      },
                      "classList": [
                        "banner-title"
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "list-item",
          "attr": {
            "type": "tip"
          },
          "children": [
            {
              "type": "text",
              "attr": {
                "value": "最新博文--长按可分享文章~"
              },
              "classList": [
                "text-tip"
              ]
            }
          ]
        },
        {
          "type": "block",
          "attr": {},
          "repeat": function () {return this.articleList},
          "children": [
            {
              "type": "list-item",
              "attr": {
                "type": "article"
              },
              "classList": [
                "article-item"
              ],
              "events": {
                "click": function (evt) {this.openArticle(this.$item.link,this.$item.projectLink,this.$item.title,evt)},
                "longpress": function (evt) {this.shareLink(this.$item.link,evt)}
              },
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "style": {
                    "display": "flex"
                  },
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "show": function () {return this.$item.fresh},
                        "value": "新"
                      },
                      "classList": [
                        "tag"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": function () {return this.$item.title}
                      },
                      "classList": [
                        "text-title"
                      ],
                      "style": {
                        "flex": 1
                      }
                    },
                    {
                      "type": "image",
                      "attr": {
                        "src": function () {return this.collectIcon[this.$item.collect?1:0]}
                      },
                      "style": {
                        "width": "52px",
                        "height": "52px"
                      },
                      "events": {
                        "click": function (evt) {this.clickCollect(this.$item,evt)}
                      }
                    }
                  ]
                },
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "article-tip"
                  ],
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": function () {return '分类: ' + (this.$item.superChapterName) + '/' + (this.$item.chapterName)}
                      },
                      "classList": [
                        "tip"
                      ]
                    }
                  ]
                },
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "article-tip"
                  ],
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": function () {return '作者: ' + (this.$item.author)}
                      },
                      "classList": [
                        "tip"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": function () {return this.$item.niceDate}
                      },
                      "classList": [
                        "time"
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "list-item",
          "attr": {
            "type": "loadMore"
          },
          "classList": [
            "load-more"
          ],
          "shown": function () {return this.articleList.length>0},
          "children": [
            {
              "type": "progress",
              "attr": {
                "type": "circular",
                "show": function () {return this.hasMoreData}
              }
            },
            {
              "type": "text",
              "attr": {
                "show": function () {return this.hasMoreData},
                "value": "加载更多"
              }
            },
            {
              "type": "text",
              "attr": {
                "show": function () {return !this.hasMoreData},
                "value": "没有更多了~"
              }
            }
          ]
        }
      ]
    }
  ]
}

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = {
  ".banner": {
    "width": "100%",
    "height": "420px"
  },
  ".banner-image": {
    "width": "100%",
    "height": "420px"
  },
  ".banner-title": {
    "textOverflow": "ellipsis",
    "lines": 1,
    "textAlign": "center",
    "height": "90px",
    "width": "100%",
    "color": "#ffffff",
    "backgroundColor": "#000000",
    "opacity": 0.5
  },
  ".article-item": {
    "paddingTop": "20px",
    "paddingRight": "20px",
    "paddingBottom": "20px",
    "paddingLeft": "20px",
    "display": "flex",
    "flexDirection": "column",
    "borderBottomWidth": "1px",
    "borderBottomColor": "#eeeeee"
  },
  ".text-tip": {
    "width": "100%",
    "paddingTop": "20px",
    "paddingRight": "10px",
    "paddingBottom": "20px",
    "paddingLeft": "10px",
    "borderBottomWidth": "1px",
    "borderBottomColor": "#eeeeee"
  },
  ".article-item .text-title": {
    "fontSize": "30px",
    "color": "#2e3135",
    "textOverflow": "ellipsis",
    "lines": 1,
    "marginBottom": "5px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "article-item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "text-title"
        }
      ]
    }
  },
  ".article-item .article-tip": {
    "display": "flex",
    "flexDirection": "row",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "article-item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "article-tip"
        }
      ]
    }
  },
  ".article-tip .tip": {
    "fontSize": "26px",
    "color": "#999999",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "article-tip"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "tip"
        }
      ]
    }
  },
  ".article-tip .time": {
    "fontSize": "26px",
    "color": "#999999",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "article-tip"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "time"
        }
      ]
    }
  },
  ".time": {
    "flex": 1,
    "textAlign": "right"
  },
  ".tag": {
    "fontSize": "22px",
    "color": "#FF0000",
    "borderTopWidth": "1px",
    "borderRightWidth": "1px",
    "borderBottomWidth": "1px",
    "borderLeftWidth": "1px",
    "borderTopColor": "#FF0000",
    "borderRightColor": "#FF0000",
    "borderBottomColor": "#FF0000",
    "borderLeftColor": "#FF0000",
    "marginRight": "10px",
    "paddingTop": "2px",
    "paddingRight": "2px",
    "paddingBottom": "2px",
    "paddingLeft": "2px",
    "height": "32px"
  },
  ".load-more": {
    "paddingTop": "20px",
    "paddingRight": "20px",
    "paddingBottom": "20px",
    "paddingLeft": "20px",
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "center"
  }
}

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(module, exports, $app_require$){'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _home = __webpack_require__(34);

var _collect = __webpack_require__(1);

exports.default = {
  data: {
    bannerlist: [],
    articleList: [],
    page: 0,
    hasMoreData: true,
    isRefreshing: false,
    collectIcon: ['../Common/Image/icon_uncollect.png', '../Common/Image/icon_collect.png']
  },
  onInit: function onInit() {
    this.refresh({ refreshing: true });
  },
  getBanner: function getBanner() {
    var _this = this;

    (0, _home.getBanner)().then(function (data) {
      _this.bannerlist = data;
    });
  },
  getArticle: function getArticle() {
    var _this2 = this;

    (0, _home.getArticle)(this.page).then(function (data) {
      _this2.hasMoreData = !data.over;
      if (_this2.page > 0) {
        _this2.articleList = _this2.articleList.concat(data.datas);
      } else {
        _this2.isRefreshing = false;
        _this2.articleList = data.datas;
      }
    }).catch(function (err) {
      _this2.isRefreshing = false;
    });
  },
  loadMoreData: function loadMoreData() {
    if (this.hasMoreData) {
      this.page++;
      this.getArticle();
    }
  },
  openArticle: function openArticle(link, projectLink, title) {
    var url = projectLink === '' ? link : projectLink;
    if (url !== '') {
      this.$app.$def.router.push({
        uri: 'ArticleDetail',
        params: {
          title: title,
          url: url
        }
      });
    }
  },
  refresh: function refresh(evt) {
    this.isRefreshing = evt.refreshing;
    this.page = 0;
    this.getBanner();
    this.getArticle();
  },
  clickCollect: function clickCollect(item) {
    if (item.collect) {
      this.uncollect(item.id);
    } else {
      this.collect(item.id);
    }
  },
  uncollect: function uncollect(id) {
    var _this3 = this;

    (0, _collect.uncollectArticle)(id).then(function (data) {
      _this3.refresh({ refreshing: true });
      _this3.$app.$def.prompt.showToast({ message: '已取消收藏' });
    }).catch(function (err) {
      _this3.$app.$def.prompt.showToast({ message: '取消收藏失败' });
    });
  },
  collect: function collect(id) {
    var _this4 = this;

    (0, _collect.collectArticle)(id).then(function (data) {
      _this4.refresh({ refreshing: true });
      _this4.$app.$def.prompt.showToast({ message: '收藏成功~' });
    }).catch(function (err) {
      _this4.$app.$def.prompt.showToast({ message: '收藏失败，登录之后才可收藏~' });
    });
  },
  shareLink: function shareLink(url) {
    this.$app.$def.share.share({
      type: "text/plain",
      data: url
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

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["getBanner"] = getBanner;
/* harmony export (immutable) */ __webpack_exports__["getArticle"] = getArticle;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__(0);


function getBanner() {
  return __WEBPACK_IMPORTED_MODULE_0__index__["a" /* default */].getBanner().then(response => {
    return Promise.resolve(JSON.parse(response.data).data);
  }).catch(err => {
    return Promise.reject(err);
  });
}

function getArticle(page = 0) {
  return __WEBPACK_IMPORTED_MODULE_0__index__["a" /* default */].getArticle(page).then(response => {
    return Promise.resolve(JSON.parse(response.data).data);
  }).catch(err => {
    return Promise.reject(err);
  });
}

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var $app_template$ = __webpack_require__(36)
var $app_style$ = __webpack_require__(37)
var $app_script$ = __webpack_require__(38)

$app_define$('@app-component/classify', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})


/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = {
  "type": "div",
  "attr": {},
  "classList": [
    "classify-page"
  ],
  "children": [
    {
      "type": "div",
      "attr": {},
      "classList": [
        "classify"
      ],
      "children": [
        {
          "type": "text",
          "attr": {
            "value": "一级分类"
          },
          "classList": [
            "title"
          ]
        },
        {
          "type": "list",
          "attr": {},
          "classList": [
            "classify-list"
          ],
          "children": [
            {
              "type": "block",
              "attr": {},
              "repeat": {
                "exp": function () {return this.classifyList},
                "key": "index",
                "value": "item"
              },
              "children": [
                {
                  "type": "list-item",
                  "attr": {
                    "type": "parent"
                  },
                  "classList": [
                    "classify-item"
                  ],
                  "events": {
                    "click": function (evt) {this.clickParent(this.index,evt)}
                  },
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": function () {return this.item.name}
                      },
                      "classList": function () {return [this.parentIndex===this.index?'active':'classify-text']}
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "div",
      "attr": {},
      "shown": function () {return this.classifyList.length>0},
      "classList": [
        "classify"
      ],
      "children": [
        {
          "type": "text",
          "attr": {
            "value": "二级分类"
          },
          "classList": [
            "title"
          ]
        },
        {
          "type": "list",
          "attr": {},
          "classList": [
            "classify-list"
          ],
          "children": [
            {
              "type": "block",
              "attr": {},
              "repeat": {
                "exp": function () {return this.classifyList[this.parentIndex].children},
                "key": "index",
                "value": "item"
              },
              "children": [
                {
                  "type": "list-item",
                  "attr": {
                    "type": "children"
                  },
                  "classList": [
                    "classify-item"
                  ],
                  "events": {
                    "click": function (evt) {this.clickChildren(this.index,evt)}
                  },
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": function () {return this.item.name}
                      },
                      "classList": function () {return [this.childrenIndex===this.index?'active':'classify-text']}
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "refresh",
      "attr": {
        "refreshing": function () {return this.isRefreshing}
      },
      "events": {
        "refresh": "refresh"
      },
      "children": [
        {
          "type": "list",
          "attr": {},
          "classList": [
            "article-list"
          ],
          "events": {
            "scrollbottom": "loadMoreData"
          },
          "children": [
            {
              "type": "block",
              "attr": {},
              "repeat": function () {return this.articleList},
              "children": [
                {
                  "type": "list-item",
                  "attr": {
                    "type": "article"
                  },
                  "classList": [
                    "article-item"
                  ],
                  "events": {
                    "click": function (evt) {this.openArticle(this.$item.link,this.$item.projectLink,this.$item.title,evt)},
                    "longpress": function (evt) {this.shareLink(this.$item.link,evt)}
                  },
                  "children": [
                    {
                      "type": "div",
                      "attr": {},
                      "style": {
                        "display": "flex"
                      },
                      "children": [
                        {
                          "type": "text",
                          "attr": {
                            "show": function () {return this.$item.fresh},
                            "value": "新"
                          },
                          "classList": [
                            "tag"
                          ]
                        },
                        {
                          "type": "text",
                          "attr": {
                            "value": function () {return this.$item.title}
                          },
                          "classList": [
                            "text-title"
                          ],
                          "style": {
                            "flex": 1
                          }
                        },
                        {
                          "type": "image",
                          "attr": {
                            "src": function () {return this.collectIcon[this.$item.collect?1:0]}
                          },
                          "style": {
                            "width": "52px",
                            "height": "52px"
                          },
                          "events": {
                            "click": function (evt) {this.clickCollect(this.$item,evt)}
                          }
                        }
                      ]
                    },
                    {
                      "type": "div",
                      "attr": {},
                      "classList": [
                        "article-tip"
                      ],
                      "children": [
                        {
                          "type": "text",
                          "attr": {
                            "value": function () {return '分类: ' + (this.$item.superChapterName) + '/' + (this.$item.chapterName)}
                          },
                          "classList": [
                            "tip"
                          ]
                        }
                      ]
                    },
                    {
                      "type": "div",
                      "attr": {},
                      "classList": [
                        "article-tip"
                      ],
                      "children": [
                        {
                          "type": "text",
                          "attr": {
                            "value": function () {return '作者: ' + (this.$item.author)}
                          },
                          "classList": [
                            "tip"
                          ]
                        },
                        {
                          "type": "text",
                          "attr": {
                            "value": function () {return this.$item.niceDate}
                          },
                          "classList": [
                            "time"
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "type": "list-item",
              "attr": {
                "type": "loadMore"
              },
              "classList": [
                "load-more"
              ],
              "children": [
                {
                  "type": "progress",
                  "attr": {
                    "type": "circular",
                    "show": function () {return this.hasMoreData}
                  }
                },
                {
                  "type": "text",
                  "attr": {
                    "show": function () {return this.hasMoreData},
                    "value": "加载更多"
                  }
                },
                {
                  "type": "text",
                  "attr": {
                    "show": function () {return !this.hasMoreData},
                    "value": "没有更多了~"
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
/* 37 */
/***/ (function(module, exports) {

module.exports = {
  ".classify-page": {
    "display": "flex",
    "flexDirection": "column"
  },
  ".classify": {
    "paddingTop": "10px",
    "paddingRight": "10px",
    "paddingBottom": "10px",
    "paddingLeft": "10px"
  },
  ".classify .title": {
    "width": "160px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "classify"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "title"
        }
      ]
    }
  },
  ".classify .classify-list": {
    "display": "flex",
    "flexDirection": "row",
    "height": "60px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "classify"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "classify-list"
        }
      ]
    }
  },
  ".classify-item .classify-text": {
    "paddingTop": "10px",
    "paddingRight": "10px",
    "paddingBottom": "10px",
    "paddingLeft": "10px",
    "color": "#2e3135",
    "backgroundColor": "#ffffff",
    "borderRadius": "5px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "classify-item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "classify-text"
        }
      ]
    }
  },
  ".classify-item .active": {
    "paddingTop": "10px",
    "paddingRight": "10px",
    "paddingBottom": "10px",
    "paddingLeft": "10px",
    "color": "#ffffff",
    "backgroundColor": "#24b9ff",
    "borderRadius": "5px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "classify-item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "active"
        }
      ]
    }
  },
  ".article-list": {
    "flex": 1
  },
  ".article-item": {
    "paddingTop": "20px",
    "paddingRight": "20px",
    "paddingBottom": "20px",
    "paddingLeft": "20px",
    "display": "flex",
    "flexDirection": "column",
    "borderBottomWidth": "1px",
    "borderBottomColor": "#eeeeee"
  },
  ".text-tip": {
    "width": "100%",
    "paddingTop": "20px",
    "paddingRight": "10px",
    "paddingBottom": "20px",
    "paddingLeft": "10px",
    "borderBottomWidth": "1px",
    "borderBottomColor": "#eeeeee"
  },
  ".article-item .text-title": {
    "fontSize": "30px",
    "color": "#2e3135",
    "textOverflow": "ellipsis",
    "lines": 1,
    "marginBottom": "5px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "article-item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "text-title"
        }
      ]
    }
  },
  ".article-item .article-tip": {
    "display": "flex",
    "flexDirection": "row",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "article-item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "article-tip"
        }
      ]
    }
  },
  ".article-tip .tip": {
    "fontSize": "26px",
    "color": "#999999",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "article-tip"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "tip"
        }
      ]
    }
  },
  ".article-tip .time": {
    "fontSize": "26px",
    "color": "#999999",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "article-tip"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "time"
        }
      ]
    }
  },
  ".time": {
    "flex": 1,
    "textAlign": "right"
  },
  ".tag": {
    "fontSize": "22px",
    "color": "#FF0000",
    "borderTopWidth": "1px",
    "borderRightWidth": "1px",
    "borderBottomWidth": "1px",
    "borderLeftWidth": "1px",
    "borderTopColor": "#FF0000",
    "borderRightColor": "#FF0000",
    "borderBottomColor": "#FF0000",
    "borderLeftColor": "#FF0000",
    "marginRight": "10px",
    "paddingTop": "2px",
    "paddingRight": "2px",
    "paddingBottom": "2px",
    "paddingLeft": "2px",
    "height": "32px"
  },
  ".load-more": {
    "paddingTop": "20px",
    "paddingRight": "20px",
    "paddingBottom": "20px",
    "paddingLeft": "20px",
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "center"
  }
}

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(module, exports, $app_require$){'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classify = __webpack_require__(39);

var _collect = __webpack_require__(1);

exports.default = {
  data: {
    classifyList: [],
    parentIndex: 0,
    childrenIndex: 0,
    articleList: [],
    page: 0,
    cid: '',
    hasMoreData: true,
    isRefreshing: false,
    collectIcon: ['../Common/Image/icon_uncollect.png', '../Common/Image/icon_collect.png']
  },
  onInit: function onInit() {
    this.getClassifyList();
  },
  getClassifyList: function getClassifyList() {
    var _this = this;

    (0, _classify.getClassifyList)().then(function (data) {
      _this.classifyList = data;
      _this.clickParent(0);
    });
  },
  clickParent: function clickParent(index) {
    this.parentIndex = index;
    this.clickChildren(0);
  },
  clickChildren: function clickChildren(index) {
    this.childrenIndex = index;
    this.cid = this.classifyList[this.parentIndex].children[this.childrenIndex].id;
    this.page = 0;
    this.isRefreshing = true;
    this.getArticle();
  },
  getArticle: function getArticle() {
    var _this2 = this;

    (0, _classify.getArticleByClassify)(this.page, this.cid).then(function (data) {
      _this2.hasMoreData = !data.over;
      if (_this2.page > 0) {
        _this2.articleList = _this2.articleList.concat(data.datas);
      } else {
        _this2.isRefreshing = false;
        _this2.articleList = data.datas;
      }
    }).catch(function (err) {
      _this2.isRefreshing = false;
    });
  },
  loadMoreData: function loadMoreData() {
    if (this.hasMoreData) {
      this.page++;
      this.getArticle();
    }
  },
  openArticle: function openArticle(link, projectLink, title) {
    var url = projectLink === '' ? link : projectLink;
    if (url !== '') {
      this.$app.$def.router.push({
        uri: 'Webview',
        params: {
          title: title,
          url: url
        }
      });
    }
  },
  refresh: function refresh(evt) {
    this.isRefreshing = evt.refreshing;
    this.page = 0;
    this.getArticle();
  },
  clickCollect: function clickCollect(item) {
    if (item.collect) {
      this.uncollect(item.id);
    } else {
      this.collect(item.id);
    }
  },
  uncollect: function uncollect(id) {
    var _this3 = this;

    (0, _collect.uncollectArticle)(id).then(function (data) {
      _this3.refresh({ refreshing: true });
      _this3.$app.$def.prompt.showToast({ message: '已取消收藏' });
    }).catch(function (err) {
      _this3.$app.$def.prompt.showToast({ message: '取消收藏失败' });
    });
  },
  collect: function collect(id) {
    var _this4 = this;

    (0, _collect.collectArticle)(id).then(function (data) {
      _this4.refresh({ refreshing: true });
      _this4.$app.$def.prompt.showToast({ message: '收藏成功~' });
    }).catch(function (err) {
      _this4.$app.$def.prompt.showToast({ message: '收藏失败，登录之后才可收藏~' });
    });
  },
  shareLink: function shareLink(url) {
    this.$app.$def.share.share({
      type: "text/plain",
      data: url
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

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["getClassifyList"] = getClassifyList;
/* harmony export (immutable) */ __webpack_exports__["getArticleByClassify"] = getArticleByClassify;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__(0);


function getClassifyList() {
  return __WEBPACK_IMPORTED_MODULE_0__index__["a" /* default */].getClassifyList().then(response => {
    return Promise.resolve(JSON.parse(response.data).data);
  }).catch(err => {
    return Promise.reject(err);
  });
}

function getArticleByClassify(page = 0, cid) {
  return __WEBPACK_IMPORTED_MODULE_0__index__["a" /* default */].getArticleByClassify(page, cid).then(response => {
    return Promise.resolve(JSON.parse(response.data).data);
  }).catch(err => {
    return Promise.reject(err);
  });
}

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(41)
__webpack_require__(45)
__webpack_require__(49)
var $app_template$ = __webpack_require__(53)
var $app_style$ = __webpack_require__(54)
var $app_script$ = __webpack_require__(55)

$app_define$('@app-component/me', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2)
var $app_template$ = __webpack_require__(42)
var $app_style$ = __webpack_require__(43)
var $app_script$ = __webpack_require__(44)

$app_define$('@app-component/login', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})


/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = {
  "type": "div",
  "attr": {},
  "classList": [
    "login-page"
  ],
  "children": [
    {
      "type": "text",
      "attr": {
        "value": "请先登录"
      },
      "classList": [
        "login-tip"
      ]
    },
    {
      "type": "c-input",
      "attr": {
        "label": "用户名",
        "clearable": "true",
        "placeholder": "请输入用户名"
      },
      "classList": [
        "input-border"
      ],
      "events": {
        "input": "onInputUsername"
      }
    },
    {
      "type": "c-input",
      "attr": {
        "label": "密码",
        "clearable": "true",
        "placeholder": "请输入密码",
        "type": "password"
      },
      "classList": [
        "input-border"
      ],
      "events": {
        "input": "onInputPassword"
      }
    },
    {
      "type": "text",
      "attr": {
        "value": "登录"
      },
      "classList": [
        "login-btn"
      ],
      "events": {
        "click": "login"
      }
    },
    {
      "type": "text",
      "attr": {
        "value": "没有账号？去注册一个"
      },
      "classList": [
        "register-text"
      ],
      "events": {
        "click": "toRegister"
      }
    }
  ]
}

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = {
  ".login-page": {
    "display": "flex",
    "flexDirection": "column"
  },
  ".login-tip": {
    "width": "100%",
    "height": "100px",
    "textAlign": "center",
    "borderBottomWidth": "1px",
    "borderBottomColor": "#eeeeee"
  },
  ".input-border": {
    "borderBottomWidth": "1px",
    "borderBottomColor": "#eeeeee"
  },
  ".login-btn": {
    "height": "80px",
    "width": "100%",
    "textAlign": "center",
    "marginTop": "50px",
    "backgroundColor": "#24b9ff",
    "color": "#ffffff"
  },
  ".register-text": {
    "width": "100%",
    "height": "50px",
    "marginTop": "20px",
    "fontSize": "22px",
    "textAlign": "right",
    "paddingTop": "10px",
    "paddingRight": "10px",
    "paddingBottom": "10px",
    "paddingLeft": "10px"
  }
}

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(module, exports, $app_require$){'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = __webpack_require__(10);

exports.default = {
  data: function data() {
    return {
      username: '',
      password: ''
    };
  },
  toRegister: function toRegister() {
    this.$dispatch('toview', { view: 'register' });
  },
  onInputUsername: function onInputUsername(_ref) {
    var value = _ref.detail.value;

    this.username = value;
  },
  onInputPassword: function onInputPassword(_ref2) {
    var value = _ref2.detail.value;

    this.password = value;
  },
  login: function login() {
    var _this = this;

    if (this.username === null || this.username.length < 6) {
      this.$app.$def.prompt.showToast({ message: '用户名长度不能小于6' });
    } else if (this.password === null || this.password.length < 6) {
      this.$app.$def.prompt.showToast({ message: '密码长度不能小于6' });
    } else {
      (0, _user.login)(this.username, this.password).then(function (data) {
        _this.$dispatch('success', { data: data });
      }).catch(function (err) {
        _this.$app.$def.prompt.showToast({ message: data });
      });
    }
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

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2)
var $app_template$ = __webpack_require__(46)
var $app_style$ = __webpack_require__(47)
var $app_script$ = __webpack_require__(48)

$app_define$('@app-component/register', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})


/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = {
  "type": "div",
  "attr": {},
  "classList": [
    "register-page"
  ],
  "children": [
    {
      "type": "text",
      "attr": {
        "value": "注册"
      },
      "classList": [
        "register-tip"
      ]
    },
    {
      "type": "c-input",
      "attr": {
        "label": "用户名",
        "clearable": "true",
        "placeholder": "请输入用户名"
      },
      "classList": [
        "input-border"
      ],
      "events": {
        "input": "onInputUsername"
      }
    },
    {
      "type": "c-input",
      "attr": {
        "label": "密码",
        "clearable": "true",
        "placeholder": "请输入密码",
        "type": "password"
      },
      "classList": [
        "input-border"
      ],
      "events": {
        "input": "onInputPassword"
      }
    },
    {
      "type": "c-input",
      "attr": {
        "label": "密码",
        "clearable": "true",
        "placeholder": "请再次输入密码",
        "type": "password"
      },
      "classList": [
        "input-border"
      ],
      "events": {
        "input": "onInputRePassword"
      }
    },
    {
      "type": "text",
      "attr": {
        "value": "注册"
      },
      "classList": [
        "register-btn"
      ],
      "events": {
        "click": "register"
      }
    },
    {
      "type": "text",
      "attr": {
        "value": "已有账号！去登录~"
      },
      "classList": [
        "login-text"
      ],
      "events": {
        "click": "toLogin"
      }
    }
  ]
}

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = {
  ".register-page": {
    "display": "flex",
    "flexDirection": "column"
  },
  ".register-tip": {
    "width": "100%",
    "height": "100px",
    "textAlign": "center",
    "borderBottomWidth": "1px",
    "borderBottomColor": "#eeeeee"
  },
  ".input-border": {
    "borderBottomWidth": "1px",
    "borderBottomColor": "#eeeeee"
  },
  ".register-btn": {
    "height": "80px",
    "width": "100%",
    "textAlign": "center",
    "marginTop": "50px",
    "backgroundColor": "#24b9ff",
    "color": "#ffffff"
  },
  ".login-text": {
    "width": "100%",
    "height": "50px",
    "marginTop": "20px",
    "fontSize": "22px",
    "textAlign": "right",
    "paddingTop": "10px",
    "paddingRight": "10px",
    "paddingBottom": "10px",
    "paddingLeft": "10px"
  }
}

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(module, exports, $app_require$){'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = __webpack_require__(10);

exports.default = {
  data: function data() {
    return {
      username: '',
      password: '',
      repassword: ''
    };
  },
  toLogin: function toLogin() {
    this.$dispatch('toview', { view: 'login' });
  },
  onInputUsername: function onInputUsername(_ref) {
    var value = _ref.detail.value;

    this.username = value;
  },
  onInputPassword: function onInputPassword(_ref2) {
    var value = _ref2.detail.value;

    this.password = value;
  },
  onInputRePassword: function onInputRePassword(_ref3) {
    var value = _ref3.detail.value;

    this.repassword = value;
  },
  register: function register() {
    var _this = this;

    if (this.username === null || this.username.length < 6) {
      this.$app.$def.prompt.showToast({ message: '用户名长度不能小于6' });
    } else if (this.password === null || this.password.length < 6) {
      this.$app.$def.prompt.showToast({ message: '密码长度不能小于6' });
    } else if (this.password !== this.repassword) {
      this.$app.$def.prompt.showToast({ message: '两次密码不一样' });
    } else {
      (0, _user.register)(this.username, this.password, this.repassword).then(function (data) {
        _this.$dispatch('success', { data: data });
      }).catch(function (err) {
        _this.$app.$def.prompt.showToast({ message: data });
      });
    }
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

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var $app_template$ = __webpack_require__(50)
var $app_style$ = __webpack_require__(51)
var $app_script$ = __webpack_require__(52)

$app_define$('@app-component/c-dialog', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})


/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = {
  "type": "div",
  "attr": {},
  "children": [
    {
      "type": "stack",
      "attr": {},
      "shown": function () {return this.visible},
      "classList": [
        "dialog"
      ],
      "children": [
        {
          "type": "div",
          "attr": {},
          "classList": [
            "backdrop"
          ],
          "style": {
            "opacity": function () {return this.opacity}
          }
        },
        {
          "type": "div",
          "attr": {},
          "classList": function () {return ['dialog-container', this.dialogVisible?'fly-in':'fly-out']},
          "children": [
            {
              "type": "div",
              "attr": {},
              "classList": [
                "dialog-title"
              ],
              "children": [
                {
                  "type": "text",
                  "attr": {
                    "value": function () {return this.title}
                  }
                }
              ]
            },
            {
              "type": "div",
              "attr": {},
              "classList": [
                "dialog-body"
              ],
              "children": [
                {
                  "type": "text",
                  "attr": {
                    "value": function () {return this.message}
                  }
                }
              ]
            },
            {
              "type": "div",
              "attr": {},
              "classList": [
                "dialog-btn"
              ],
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "btn-item"
                  ],
                  "repeat": {
                    "exp": function () {return this.btnList},
                    "key": "idx",
                    "value": "btn"
                  },
                  "events": {
                    "click": function (evt) {this.onClick(this.idx,evt)}
                  },
                  "style": {
                    "borderLeftWidth": function () {return (this.idx===0?0:1) + 'px'}
                  },
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": function () {return this.btn.label}
                      },
                      "style": {
                        "color": function () {return this.btn.color?this.btn.color:'#909399'}
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
  ]
}

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = {
  ".dialog": {
    "position": "fixed",
    "height": "100%",
    "width": "100%",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center"
  },
  ".dialog-container": {
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "flex-start",
    "flexDirection": "column",
    "width": "450px",
    "backgroundColor": "#ffffff",
    "borderRadius": "10px",
    "borderTopWidth": "1px",
    "borderRightWidth": "1px",
    "borderBottomWidth": "1px",
    "borderLeftWidth": "1px",
    "borderStyle": "solid",
    "borderTopColor": "#dcdfe6",
    "borderRightColor": "#dcdfe6",
    "borderBottomColor": "#dcdfe6",
    "borderLeftColor": "#dcdfe6"
  },
  ".dialog-title": {
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "color": "#303133",
    "paddingTop": "10px",
    "paddingRight": "0px",
    "paddingBottom": "10px",
    "paddingLeft": "0px",
    "width": "100%"
  },
  ".dialog-title > text": {
    "fontSize": "35px",
    "fontWeight": "bold",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "dialog-title"
        },
        {
          "t": "child"
        },
        {
          "t": "t",
          "n": "text"
        }
      ]
    }
  },
  ".dialog-body": {
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "color": "#888888",
    "fontSize": "30px",
    "paddingTop": "20px",
    "paddingRight": "15px",
    "paddingBottom": "30px",
    "paddingLeft": "15px",
    "width": "100%"
  },
  ".dialog-btn": {
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "width": "100%",
    "height": "80px",
    "borderStyle": "solid",
    "borderTopColor": "#dcdfe6",
    "borderRightColor": "#dcdfe6",
    "borderBottomColor": "#dcdfe6",
    "borderLeftColor": "#dcdfe6",
    "borderTopWidth": "1px"
  },
  ".btn-item": {
    "flex": 1,
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "height": "100%",
    "borderStyle": "solid",
    "borderTopColor": "#dddddd",
    "borderRightColor": "#dddddd",
    "borderBottomColor": "#dddddd",
    "borderLeftColor": "#dddddd"
  },
  ".backdrop": {
    "height": "100%",
    "width": "100%",
    "backgroundColor": "rgba(0,0,0,0.3)"
  },
  ".fly-in": {
    "animationName": "flyIn",
    "animationDuration": "500ms",
    "animationTimingFunction": "ease-out"
  },
  ".fly-out": {
    "animationName": "flyOut",
    "animationDuration": "500ms",
    "animationTimingFunction": "ease-in"
  },
  "@KEYFRAMES": {
    "flyIn": [
      {
        "opacity": 0,
        "transform": "{\"translateY\":\"-3000px\"}",
        "time": 0
      },
      {
        "opacity": 1,
        "transform": "{\"translateY\":\"1px\"}",
        "time": 100
      }
    ],
    "flyOut": [
      {
        "opacity": 1,
        "transform": "{\"translateY\":\"1px\"}",
        "time": 0
      },
      {
        "opacity": 0,
        "transform": "{\"translateY\":\"-3000px\"}",
        "time": 100
      }
    ]
  }
}

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = function(module, exports, $app_require$){'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _props$props$data$onI;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = (_props$props$data$onI = {
  props: ['visible', 'title', 'message', 'btnList']
}, _defineProperty(_props$props$data$onI, 'props', {
  visible: false,
  title: '提示',
  btnList: [{
    label: 'OK',
    color: '#909399'
  }]
}), _defineProperty(_props$props$data$onI, 'data', function data() {
  return {
    opacity: 0,
    dialogVisible: false
  };
}), _defineProperty(_props$props$data$onI, 'onInit', function onInit() {
  this.$watch('visible', 'showdialog');
}), _defineProperty(_props$props$data$onI, 'showdialog', function showdialog() {
  var _this = this;

  if (this.visible) {
    this.dialogVisible = true;
    var id = setInterval(function () {
      _this.opacity += 0.05;
      if (_this.opacity > 1) {
        _this.opacity = 1;
        clearInterval(id);
      }
    }, 16);
  } else {
    this.onClose();
  }
}), _defineProperty(_props$props$data$onI, 'onClick', function onClick(idx) {
  this.onClose();
  this.$dispatch('click', { idx: idx });
}), _defineProperty(_props$props$data$onI, 'onClose', function onClose() {
  var _this2 = this;

  var id = setInterval(function () {
    _this2.dialogVisible = false;
    _this2.opacity -= 0.05;
    if (_this2.opacity <= 0) {
      clearInterval(id);
      _this2.opacity = 0;
      _this2.$dispatch('close');
    }
  }, 16);
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
/* 53 */
/***/ (function(module, exports) {

module.exports = {
  "type": "div",
  "attr": {},
  "classList": [
    "me-page"
  ],
  "children": [
    {
      "type": "div",
      "attr": {},
      "classList": [
        "me"
      ],
      "shown": function () {return this.isLogin},
      "children": [
        {
          "type": "stack",
          "attr": {},
          "classList": [
            "header"
          ],
          "children": [
            {
              "type": "image",
              "attr": {
                "src": "../Common/Image/android.jpg"
              },
              "classList": [
                "avtar"
              ]
            },
            {
              "type": "text",
              "attr": {
                "value": function () {return this.loginData.username}
              },
              "classList": [
                "username"
              ]
            }
          ]
        },
        {
          "type": "div",
          "attr": {},
          "classList": [
            "item-title"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "收藏的文章"
          },
          "classList": [
            "item",
            "border-bottom"
          ],
          "events": {
            "click": function (evt) {this.openView('ArticleCollectList',evt)}
          }
        },
        {
          "type": "text",
          "attr": {
            "value": "收藏的网站"
          },
          "classList": [
            "item"
          ],
          "events": {
            "click": function (evt) {this.openView('WebCollectList',evt)}
          }
        },
        {
          "type": "div",
          "attr": {},
          "classList": [
            "item-title"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "创建桌面图标"
          },
          "classList": [
            "item",
            "border-bottom"
          ],
          "events": {
            "click": "createShortcut"
          }
        },
        {
          "type": "div",
          "attr": {},
          "classList": [
            "item-title"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "退出登录"
          },
          "classList": [
            "item",
            "border-bottom"
          ],
          "events": {
            "click": "openDialog"
          }
        }
      ]
    },
    {
      "type": "login",
      "attr": {},
      "shown": function () {return (this.view==='login')&&!(this.isLogin)},
      "events": {
        "toview": "toView",
        "success": "loginSuccess"
      }
    },
    {
      "type": "register",
      "attr": {},
      "shown": function () {return (this.view==='register')&&!(this.isLogin)&&!(this.view==='login')},
      "events": {
        "toview": "toView",
        "success": "registerSuccess"
      }
    },
    {
      "type": "c-dialog",
      "attr": {
        "title": "提示",
        "visible": function () {return this.showDialog},
        "message": "确认退出登录？",
        "btnList": function () {return this.dialogBtn}
      },
      "events": {
        "close": "onClose",
        "click": "onClick"
      }
    }
  ]
}

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = {
  ".me": {
    "display": "flex",
    "flexDirection": "column"
  },
  ".header": {
    "width": "100%",
    "height": "400px"
  },
  ".avtar": {
    "width": "100%",
    "height": "100%"
  },
  ".username": {
    "width": "100%",
    "height": "100%",
    "textAlign": "center",
    "fontSize": "56px",
    "color": "#ffffff",
    "backgroundColor": "rgba(0,0,0,0.7)"
  },
  ".header-email": {
    "height": "60px",
    "color": "#999999"
  },
  ".item-title": {
    "width": "100%",
    "height": "30px",
    "backgroundColor": "#dddddd",
    "color": "#ffffff"
  },
  ".item": {
    "width": "100%",
    "paddingTop": "30px",
    "paddingRight": "20px",
    "paddingBottom": "30px",
    "paddingLeft": "20px"
  },
  ".border-bottom": {
    "borderBottomWidth": "1px",
    "borderBottomColor": "#eeeeee"
  }
}

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = function(module, exports, $app_require$){'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  data: function data() {
    return {
      isLogin: false,
      view: 'login',
      loginData: {},
      showDialog: false,
      dialogBtn: [{
        label: '退出'
      }, {
        label: '取消'
      }]
    };
  },
  onInit: function onInit() {
    this.$app.$def.storage.get({
      key: 'user',
      success: function (data) {
        this.loginData = {};
        if (data != '') {
          this.loginData = JSON.parse(data);
        }
      }.bind(this),
      fail: function (data, code) {
        this.loginData = {};
      }.bind(this)
    });
    this.$app.$def.storage.get({
      key: 'isLogin',
      success: function (data) {
        this.isLogin = data === 'true' ? true : false;
      }.bind(this),
      fail: function (data, code) {
        this.isLogin = false;
      }.bind(this)
    });
  },
  toView: function toView(_ref) {
    var view = _ref.detail.view;

    this.view = view;
  },
  loginSuccess: function loginSuccess(_ref2) {
    var data = _ref2.detail.data;

    this.isLogin = true;
    this.loginData = data;
  },
  registerSuccess: function registerSuccess(_ref3) {
    var data = _ref3.detail.data;

    this.isLogin = true;
    this.loginData = data;
  },
  signout: function signout() {
    this.isLogin = false;
    this.view = 'login';
    this.$app.$def.storage.delete({
      key: 'auth'
    });
    this.$app.$def.storage.delete({
      key: 'user'
    });
    this.$app.$def.storage.set({
      key: 'isLogin',
      value: 'false'
    });
  },
  openDialog: function openDialog() {
    this.showDialog = true;
  },
  onClose: function onClose() {
    this.showDialog = false;
  },
  onClick: function onClick(_ref4) {
    var idx = _ref4.detail.idx;

    if (idx === 0) {
      this.signout();
    }
  },
  openView: function openView(uri) {
    if (uri === 'about') {
      return;
    }
    this.$app.$def.router.push({ uri: uri });
  },
  createShortcut: function createShortcut() {
    this.$app.$def.createShortcut();
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

/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = {
  "type": "div",
  "attr": {},
  "classList": [
    "wanandroid-page"
  ],
  "children": [
    {
      "type": "div",
      "attr": {},
      "classList": [
        "flexible-tabs"
      ],
      "children": [
        {
          "type": "tabs",
          "attr": {
            "index": function () {return this.currentIndex}
          },
          "events": {
            "change": "changeTabactive"
          },
          "children": [
            {
              "type": "tab-content",
              "attr": {},
              "classList": [
                "flexible-tab-content"
              ],
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "tab-content-section"
                  ],
                  "children": [
                    {
                      "type": "home",
                      "attr": {},
                      "shown": function () {return this.tabItems[0].show}
                    }
                  ]
                },
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "tab-content-section"
                  ],
                  "children": [
                    {
                      "type": "classify",
                      "attr": {},
                      "shown": function () {return this.tabItems[1].show}
                    }
                  ]
                },
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "tab-content-section"
                  ],
                  "children": [
                    {
                      "type": "me",
                      "attr": {},
                      "shown": function () {return this.tabItems[2].show}
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "div",
          "attr": {},
          "classList": [
            "flexible-tabbar"
          ],
          "children": [
            {
              "type": "div",
              "attr": {},
              "repeat": {
                "exp": function () {return this.tabItems},
                "key": "index",
                "value": "item"
              },
              "classList": [
                "tab-item"
              ],
              "events": {
                "click": function (evt) {this.clickTabBar(this.index,evt)}
              },
              "children": [
                {
                  "type": "image",
                  "attr": {
                    "src": function () {return this.item.icon[this.currentIndex===this.index?1:0]}
                  },
                  "classList": [
                    "tab-icon"
                  ]
                },
                {
                  "type": "text",
                  "attr": {
                    "value": function () {return this.item.text}
                  },
                  "classList": function () {return [this.currentIndex===this.index?'active':'tab-text']}
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
/* 57 */
/***/ (function(module, exports) {

module.exports = {
  ".wanandroid-page .flexible-tabs": {
    "display": "flex",
    "flexDirection": "column",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "wanandroid-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "flexible-tabs"
        }
      ]
    }
  },
  ".flexible-tabs .flexible-tabbar": {
    "display": "flex",
    "borderTopWidth": "1px",
    "borderTopColor": "#eeeeee",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "flexible-tabs"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "flexible-tabbar"
        }
      ]
    }
  },
  ".flexible-tabbar .tab-item": {
    "flex": 1,
    "paddingTop": "10px",
    "paddingRight": "10px",
    "paddingBottom": "10px",
    "paddingLeft": "10px",
    "display": "flex",
    "alignItems": "center",
    "flexDirection": "column",
    "fontSize": "12px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "flexible-tabbar"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "tab-item"
        }
      ]
    }
  },
  ".tab-item .tab-icon": {
    "width": "56px",
    "height": "56px",
    "paddingTop": "5px",
    "paddingRight": "5px",
    "paddingBottom": "5px",
    "paddingLeft": "5px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "tab-item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "tab-icon"
        }
      ]
    }
  },
  ".tab-item .tab-text": {
    "fontSize": "20px",
    "color": "#aaaaaa",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "tab-item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "tab-text"
        }
      ]
    }
  },
  ".tab-item .active": {
    "fontSize": "20px",
    "color": "#24b9ff",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "tab-item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "active"
        }
      ]
    }
  }
}

/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = function(module, exports, $app_require$){'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  data: function data() {
    return {
      currentIndex: 0,
      tabItems: [{
        text: '首页',
        icon: ['../Common/Image/icon_home.png', '../Common/Image/icon_home_select.png'],
        show: true
      }, {
        text: '体系',
        icon: ['../Common/Image/icon_classify.png', '../Common/Image/icon_classify_select.png'],
        show: false
      }, {
        text: '我',
        icon: ['../Common/Image/icon_me.png', '../Common/Image/icon_me_select.png'],
        show: false
      }]
    };
  },
  changeTabactive: function changeTabactive(evt) {
    this.changeCurrent(evt.index);
  },
  clickTabBar: function clickTabBar(index) {
    this.changeCurrent(index);
  },
  changeCurrent: function changeCurrent(index) {
    this.$page.setTitleBar({ text: this.tabItems[index].text });
    this.tabItems[index].show = true;
    this.currentIndex = index;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRcXE1haW5cXG1haW4uanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDMxYTExOWRkMGM4MWU3YjFkNWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbW1vbi9BcGkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbW1vbi9BcGkvY29sbGVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ29tbW9uL0NvbXBvbmVudC9DSW5wdXQvaW5kZXgudXgiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbW1vbi9Db21wb25lbnQvQ0lucHV0L2luZGV4LnV4PzY1MTUiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbW1vbi9Db21wb25lbnQvQ0lucHV0L2luZGV4LnV4PzczNTUiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbW1vbi9Db21wb25lbnQvQ0lucHV0L2luZGV4LnV4P2IxMTkiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbW1vbi9BcGkvdXNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvTWFpbi9tYWluLnV4Iiwid2VicGFjazovLy8uL3NyYy9Ib21lL2hvbWUudXgiLCJ3ZWJwYWNrOi8vLy4vc3JjL0hvbWUvaG9tZS51eD80NTY0Iiwid2VicGFjazovLy8uL3NyYy9Ib21lL2hvbWUudXg/MGRhNCIsIndlYnBhY2s6Ly8vLi9zcmMvSG9tZS9ob21lLnV4P2VjODQiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbW1vbi9BcGkvaG9tZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ2F0ZWdvcnkvY2F0ZWdvcnkudXgiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NhdGVnb3J5L2NhdGVnb3J5LnV4P2FiNjgiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NhdGVnb3J5L2NhdGVnb3J5LnV4PzYzYTUiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NhdGVnb3J5L2NhdGVnb3J5LnV4PzhhYzYiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbW1vbi9BcGkvY2xhc3NpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Byb2ZpbGUvcHJvZmlsZS51eCIsIndlYnBhY2s6Ly8vLi9zcmMvQXV0aC9sb2dpbi51eCIsIndlYnBhY2s6Ly8vLi9zcmMvQXV0aC9sb2dpbi51eD85M2Q5Iiwid2VicGFjazovLy8uL3NyYy9BdXRoL2xvZ2luLnV4P2UyZTAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0F1dGgvbG9naW4udXg/MDk2MCIsIndlYnBhY2s6Ly8vLi9zcmMvQXV0aC9yZWdpc3Rlci51eCIsIndlYnBhY2s6Ly8vLi9zcmMvQXV0aC9yZWdpc3Rlci51eD82OGI2Iiwid2VicGFjazovLy8uL3NyYy9BdXRoL3JlZ2lzdGVyLnV4PzljNTIiLCJ3ZWJwYWNrOi8vLy4vc3JjL0F1dGgvcmVnaXN0ZXIudXg/MzNiMyIsIndlYnBhY2s6Ly8vLi9zcmMvQ29tbW9uL0NvbXBvbmVudC9DRGlhbG9nL2RpYWxvZy51eCIsIndlYnBhY2s6Ly8vLi9zcmMvQ29tbW9uL0NvbXBvbmVudC9DRGlhbG9nL2RpYWxvZy51eD82N2RjIiwid2VicGFjazovLy8uL3NyYy9Db21tb24vQ29tcG9uZW50L0NEaWFsb2cvZGlhbG9nLnV4P2VkZTMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbW1vbi9Db21wb25lbnQvQ0RpYWxvZy9kaWFsb2cudXg/MDdmOSIsIndlYnBhY2s6Ly8vLi9zcmMvUHJvZmlsZS9wcm9maWxlLnV4PzIyZmQiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Byb2ZpbGUvcHJvZmlsZS51eD8xYjQwIiwid2VicGFjazovLy8uL3NyYy9Qcm9maWxlL3Byb2ZpbGUudXg/YWRkZiIsIndlYnBhY2s6Ly8vLi9zcmMvTWFpbi9tYWluLnV4PzhjZjkiLCJ3ZWJwYWNrOi8vLy4vc3JjL01haW4vbWFpbi51eD9iMmFiIiwid2VicGFjazovLy8uL3NyYy9NYWluL21haW4udXg/NGJjYSJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyOSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNDMxYTExOWRkMGM4MWU3YjFkNWUiLCJ2YXIgZmV0Y2ggPSAkYXBwX3JlcXVpcmUkKCdAYXBwLW1vZHVsZS9zeXN0ZW0uZmV0Y2gnKTtcbnZhciBzdG9yYWdlID0gJGFwcF9yZXF1aXJlJCgnQGFwcC1tb2R1bGUvc3lzdGVtLnN0b3JhZ2UnKTtcblxudmFyIEFQSV9ST09UID0gJ2h0dHA6Ly93d3cud2FuYW5kcm9pZC5jb20vJztcblxudmFyIGhlYWRlcnMgPSB7fTtcblxuLy8gZnVuY3Rpb24gZ2V0QXV0aChuZXh0KSB7XG4vLyAgIHN0b3JhZ2UuZ2V0KHtcbi8vICAgICBrZXk6ICdhdXRoJyxcbi8vICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4vLyAgICAgICBoZWFkZXJzLkNvb2tpZSA9IGRhdGFcbi8vICAgICAgIG5leHQodHJ1ZSlcbi8vICAgICB9LFxuLy8gICAgIGZhaWw6IGZ1bmN0aW9uKGRhdGEsIGNvZGUpIHtcbi8vICAgICAgIG5leHQoZmFsc2UpXG4vLyAgICAgfVxuLy8gICB9KVxuLy8gfVxuXG5mdW5jdGlvbiBnZXRBdXRoKCkge1xuICAvLyDlj6TkurrkupHvvJrigJzlkJvlrZDkuIDor7rljYPph5HigJ3vvIzov5nnp43igJzmib/or7rlsIbmnaXkvJrmiafooYzigJ3nmoTlr7nosaHlnKhKYXZhU2NyaXB05Lit56ew5Li6UHJvbWlzZeWvueixoSB4ayAyMDE4LTEwLTI0IDIxOjU0OjEzXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgc3RvcmFnZS5nZXQoe1xuICAgICAga2V5OiAnYXV0aCcsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBoZWFkZXJzLkNvb2tpZSA9IGRhdGE7XG4gICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICB9LFxuICAgICAgZmFpbDogZnVuY3Rpb24gKGRhdGEsIGNvZGUpIHtcbiAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZWFsRmV0Y2godXJsLCBkYXRhID0gbnVsbCwgbWV0aG9kID0gJ2dldCcpIHtcbiAgY29uc29sZS5sb2coJ+KUj+KUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgScpO1xuICBjb25zb2xlLmxvZygn4pSDIHVybDogJywgQVBJX1JPT1QgKyB1cmwpO1xuICBjb25zb2xlLmxvZygn4pSDIG1ldGhvZDogJywgbWV0aG9kKTtcbiAgY29uc29sZS5sb2coJ+KUgyBkYXRhOiAnLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gIGNvbnNvbGUubG9nKCfilJfilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIEnKTtcblxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGZldGNoLmZldGNoKHtcbiAgICAgIHVybDogQVBJX1JPT1QgKyB1cmwsXG4gICAgICBkYXRhOiBkYXRhLFxuICAgICAgaGVhZGVyOiBoZWFkZXJzLFxuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICByZXNvbHZlKGRhdGEpO1xuICAgICAgfSxcbiAgICAgIGZhaWw6IGZ1bmN0aW9uIChkYXRhLCBjb2RlKSB7XG4gICAgICAgIHJlamVjdChkYXRhKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHdpdGhBdXRoKHVybCwgZGF0YSA9IG51bGwsIG1ldGhvZCA9ICdnZXQnLCBjYW5Ta2lwID0gZmFsc2UpIHtcbiAgcmV0dXJuIGdldEF1dGgoKS50aGVuKGF1dGggPT4ge1xuICAgIGlmIChhdXRoIHx8IGNhblNraXApIHtcbiAgICAgIHJldHVybiByZWFsRmV0Y2godXJsLCBkYXRhLCBtZXRob2QpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICByZWplY3QoJ+ivt+WFiOeZu+W9le+8gScpO1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gcG9zdCh1cmwsIGRhdGEgPSBudWxsLCBjb25maWcgPSB7fSkge1xuICBpZiAoY29uZmlnLndpdGhBdXRoKSB7XG4gICAgcmV0dXJuIHdpdGhBdXRoKHVybCwgZGF0YSwgJ3Bvc3QnLCBjb25maWcuY2FuU2tpcCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHJlYWxGZXRjaCh1cmwsIGRhdGEsICdwb3N0Jyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0KHVybCwgZGF0YSA9IG51bGwsIGNvbmZpZyA9IHt9KSB7XG4gIGlmIChjb25maWcud2l0aEF1dGgpIHtcbiAgICByZXR1cm4gd2l0aEF1dGgodXJsLCBkYXRhLCAnZ2V0JywgY29uZmlnLmNhblNraXApO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiByZWFsRmV0Y2godXJsLCBkYXRhLCAnZ2V0Jyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAvKipcbiAgICog6I635Y+W6aaW6aG1YmFubmVy5YiX6KGoXG4gICAqL1xuICBnZXRCYW5uZXIoc3VjY2VzcywgZmFpbCkge1xuICAgIHJldHVybiBnZXQoJ2Jhbm5lci9qc29uJywgbnVsbCk7XG4gIH0sXG4gIC8qKlxuICAgKiDojrflj5bpppbpobXmlofnq6DliJfooahcbiAgICovXG4gIGdldEFydGljbGUocGFnZSkge1xuICAgIHJldHVybiBnZXQoJ2FydGljbGUvbGlzdC8nICsgcGFnZSArICcvanNvbicsIG51bGwsIHtcbiAgICAgIHdpdGhBdXRoOiB0cnVlLFxuICAgICAgY2FuU2tpcDogdHJ1ZVxuICAgIH0pO1xuICB9LFxuICAvKipcbiAgICog6I635Y+W5L2T57O75YiG57G7XG4gICAqL1xuICBnZXRDbGFzc2lmeUxpc3QoKSB7XG4gICAgcmV0dXJuIGdldCgndHJlZS9qc29uJywgbnVsbCk7XG4gIH0sXG4gIC8qKlxuICAgKiDmoLnmja7liIbnsbvojrflj5bmlofnq6DliJfooahcbiAgICovXG4gIGdldEFydGljbGVCeUNsYXNzaWZ5KHBhZ2UsIGNpZCkge1xuICAgIHJldHVybiBnZXQoJ2FydGljbGUvbGlzdC8nICsgcGFnZSArICcvanNvbj9jaWQ9JyArIGNpZCwgbnVsbCwge1xuICAgICAgd2l0aEF1dGg6IHRydWUsXG4gICAgICBjYW5Ta2lwOiB0cnVlXG4gICAgfSk7XG4gIH0sXG4gIC8qKlxuICAgKiDnmbvlvZVcbiAgICovXG4gIGxvZ2luKHBhcmFtcykge1xuICAgIHJldHVybiBwb3N0KCd1c2VyL2xvZ2luJywgcGFyYW1zKTtcbiAgfSxcbiAgLyoqXG4gICAqIOazqOWGjFxuICAgKi9cbiAgcmVnaXN0ZXIocGFyYW1zKSB7XG4gICAgcmV0dXJuIHBvc3QoJ3VzZXIvcmVnaXN0ZXInLCBwYXJhbXMpO1xuICB9LFxuICAvKipcbiAgICog6I635Y+W5pS26JeP5paH56ug5YiX6KGoXG4gICAqL1xuICBnZXRDb2xsZWN0QXJ0aWNsZShwYWdlKSB7XG4gICAgcmV0dXJuIGdldCgnbGcvY29sbGVjdC9saXN0LycgKyBwYWdlICsgJy9qc29uJywgbnVsbCwgeyB3aXRoQXV0aDogdHJ1ZSB9KTtcbiAgfSxcbiAgLyoqXG4gICAqIOaUtuiXj+ermeWGheaWh+eroFxuICAgKi9cbiAgY29sbGVjdEFydGljbGUoaWQpIHtcbiAgICByZXR1cm4gcG9zdCgnbGcvY29sbGVjdC8nICsgaWQgKyAnL2pzb24nLCBudWxsLCB7IHdpdGhBdXRoOiB0cnVlIH0pO1xuICB9LFxuICAvKipcbiAgICog5pS26JeP56uZ5aSW5paH56ugXG4gICAqL1xuICBjb2xsZWN0QXJ0aWNsZUFkZChwYXJhbXMpIHtcbiAgICByZXR1cm4gcG9zdCgnbGcvY29sbGVjdC9hZGQvanNvbicsIHBhcmFtcywgeyB3aXRoQXV0aDogdHJ1ZSB9KTtcbiAgfSxcbiAgLyoqXG4gICAqIOS7juaWh+eroOWIl+ihqOWPlua2iOaUtuiXj1xuICAgKi9cbiAgdW5jb2xsZWN0QXJ0aWNsZShpZCkge1xuICAgIHJldHVybiBwb3N0KCdsZy91bmNvbGxlY3Rfb3JpZ2luSWQvJyArIGlkICsgJy9qc29uJywgbnVsbCwgeyB3aXRoQXV0aDogdHJ1ZSB9KTtcbiAgfSxcbiAgLyoqXG4gICAqIOS7juaUtuiXj+WIl+ihqOWPlua2iOaUtuiXj1xuICAgKi9cbiAgdW5jb2xsZWN0KGlkLCBvcmlnaW5JZCkge1xuICAgIHJldHVybiBwb3N0KCdsZy91bmNvbGxlY3QvJyArIGlkICsgJy9qc29uJywgeyBvcmlnaW5JZDogb3JpZ2luSWQgfSwgeyB3aXRoQXV0aDogdHJ1ZSB9KTtcbiAgfSxcbiAgLyoqXG4gICAqIOiOt+WPluaUtuiXj+e9keermeWIl+ihqFxuICAgKi9cbiAgZ2V0Q29sbGVjdFdlYigpIHtcbiAgICByZXR1cm4gZ2V0KCdsZy9jb2xsZWN0L3VzZXJ0b29scy9qc29uJywgbnVsbCwgeyB3aXRoQXV0aDogdHJ1ZSB9KTtcbiAgfSxcbiAgLyoqXG4gICAqIOaUtuiXj+e9keermVxuICAgKi9cbiAgY29sbGVjdFdlYihwYXJhbXMpIHtcbiAgICByZXR1cm4gcG9zdCgnbGcvY29sbGVjdC9hZGR0b29sL2pzb24nLCBwYXJhbXMsIHsgd2l0aEF1dGg6IHRydWUgfSk7XG4gIH0sXG4gIC8qKlxuICAgKiDnvJbovpHmlLbol4/nmoTnvZHlnYBcbiAgICovXG4gIGVkaXRDb2xsZWN0V2ViKHBhcmFtcykge1xuICAgIHJldHVybiBwb3N0KCdsZy9jb2xsZWN0L3VwZGF0ZXRvb2wvanNvbicsIHBhcmFtcywgeyB3aXRoQXV0aDogdHJ1ZSB9KTtcbiAgfSxcbiAgLyoqXG4gICAqIOWIoOmZpOaUtuiXj+eahOe9keWdgFxuICAgKi9cbiAgZGVsZXRlQ29sbGVjdFdlYihpZCkge1xuICAgIHJldHVybiBwb3N0KCdsZy9jb2xsZWN0L2RlbGV0ZXRvb2wvanNvbicsIHsgaWQ6IGlkIH0sIHsgd2l0aEF1dGg6IHRydWUgfSk7XG4gIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvQ29tbW9uL0FwaS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCIsImltcG9ydCBhcGkgZnJvbSAnLi9pbmRleCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb2xsZWN0QXJ0aWNsZShwYWdlKSB7XG4gIHJldHVybiBhcGkuZ2V0Q29sbGVjdEFydGljbGUocGFnZSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShKU09OLnBhcnNlKHJlc3BvbnNlLmRhdGEpLmRhdGEpO1xuICB9KS5jYXRjaChlcnIgPT4ge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbGxlY3RBcnRpY2xlKGlkKSB7XG4gIHJldHVybiBhcGkuY29sbGVjdEFydGljbGUoaWQpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgIHZhciB2YWx1ZSA9IEpTT04ucGFyc2UocmVzcG9uc2UuZGF0YSk7XG4gICAgaWYgKHZhbHVlLmVycm9yQ29kZSA9PT0gLTEpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgn6K+35YWI55m75b2VJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUuZGF0YSk7XG4gICAgfVxuICB9KS5jYXRjaChlcnIgPT4ge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbGxlY3RBcnRpY2xlQWRkKHRpdGxlLCBhdXRob3IsIGxpbmspIHtcbiAgcmV0dXJuIGFwaS5jb2xsZWN0QXJ0aWNsZUFkZCh7XG4gICAgdGl0bGU6IHRpdGxlLFxuICAgIGF1dGhvcjogYXV0aG9yLFxuICAgIGxpbms6IGxpbmtcbiAgfSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShKU09OLnBhcnNlKHJlc3BvbnNlLmRhdGEpLmRhdGEpO1xuICB9KS5jYXRjaChlcnIgPT4ge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuY29sbGVjdEFydGljbGUoaWQpIHtcbiAgcmV0dXJuIGFwaS51bmNvbGxlY3RBcnRpY2xlKGlkKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKEpTT04ucGFyc2UocmVzcG9uc2UuZGF0YSkuZGF0YSk7XG4gIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5jb2xsZWN0KGlkLCBvcmlnaW5JZCkge1xuICByZXR1cm4gYXBpLnVuY29sbGVjdChpZCwgb3JpZ2luSWQpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoSlNPTi5wYXJzZShyZXNwb25zZS5kYXRhKS5kYXRhKTtcbiAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb2xsZWN0V2ViKCkge1xuICByZXR1cm4gYXBpLmdldENvbGxlY3RXZWIoKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKEpTT04ucGFyc2UocmVzcG9uc2UuZGF0YSkuZGF0YSk7XG4gIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29sbGVjdFdlYihuYW1lLCBsaW5rKSB7XG4gIHJldHVybiBhcGkuY29sbGVjdFdlYih7XG4gICAgbmFtZTogbmFtZSxcbiAgICBsaW5rOiBsaW5rXG4gIH0pLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoSlNPTi5wYXJzZShyZXNwb25zZS5kYXRhKS5kYXRhKTtcbiAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlZGl0Q29sbGVjdFdlYihpZCwgbmFtZSwgbGluaykge1xuICByZXR1cm4gYXBpLmVkaXRDb2xsZWN0V2ViKHtcbiAgICBpZDogaWQsXG4gICAgbmFtZTogbmFtZSxcbiAgICBsaW5rOiBsaW5rXG4gIH0pLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoSlNPTi5wYXJzZShyZXNwb25zZS5kYXRhKS5kYXRhKTtcbiAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVDb2xsZWN0V2ViKGlkKSB7XG4gIHJldHVybiBhcGkuZGVsZXRlQ29sbGVjdFdlYihpZCkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShKU09OLnBhcnNlKHJlc3BvbnNlLmRhdGEpLmRhdGEpO1xuICB9KS5jYXRjaChlcnIgPT4ge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9Db21tb24vQXBpL2NvbGxlY3QuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQiLCJ2YXIgJGFwcF90ZW1wbGF0ZSQgPSByZXF1aXJlKFwiISFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1qc29uLWxvYWRlci5qcyFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS10ZW1wbGF0ZS1sb2FkZXIuanMhYzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT10ZW1wbGF0ZXMhLi9pbmRleC51eFwiKVxudmFyICRhcHBfc3R5bGUkID0gcmVxdWlyZShcIiEhYzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtanNvbi1sb2FkZXIuanMhYzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtc3R5bGUtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWU6XFxcXFhrV29ya1xcXFxGYXN0QXBwV29ya1NwYWNlXFxcXGZhc3RhcHBcXFxcY29tLnhrLmZhc3RhcHBcXFxcc3JjXFxcXENvbW1vblxcXFxDb21wb25lbnRcXFxcQ0lucHV0XFxcXGluZGV4LnV4IWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1lOlxcXFxYa1dvcmtcXFxcRmFzdEFwcFdvcmtTcGFjZVxcXFxmYXN0YXBwXFxcXGNvbS54ay5mYXN0YXBwXFxcXHNyY1xcXFxDb21tb25cXFxcQ29tcG9uZW50XFxcXENJbnB1dFxcXFxpbmRleC51eCEuL2luZGV4LnV4XCIpXG52YXIgJGFwcF9zY3JpcHQkID0gcmVxdWlyZShcIiEhYzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtc2NyaXB0LWxvYWRlci5qcyFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1hY2Nlc3MtbG9hZGVyLmpzIWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGJhYmVsLWxvYWRlcj9wcmVzZXRzW109YzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcYmFiZWwtcHJlc2V0LWVudiZwcmVzZXRzPWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGJhYmVsLXByZXNldC1lbnYmcGx1Z2luc1tdPWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGpzeC1sb2FkZXIuanMmcGx1Z2lucz1jOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxqc3gtbG9hZGVyLmpzJmNvbW1lbnRzPWZhbHNlIWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyEuL2luZGV4LnV4XCIpXG5cbiRhcHBfZGVmaW5lJCgnQGFwcC1jb21wb25lbnQvYy1pbnB1dCcsIFtdLCBmdW5jdGlvbigkYXBwX3JlcXVpcmUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX21vZHVsZSQpe1xuICAgICAkYXBwX3NjcmlwdCQoJGFwcF9tb2R1bGUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX3JlcXVpcmUkKVxuICAgICBpZiAoJGFwcF9leHBvcnRzJC5fX2VzTW9kdWxlICYmICRhcHBfZXhwb3J0cyQuZGVmYXVsdCkge1xuICAgICAgICAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMgPSAkYXBwX2V4cG9ydHMkLmRlZmF1bHRcbiAgICAgICAgfVxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy50ZW1wbGF0ZSA9ICRhcHBfdGVtcGxhdGUkXG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnN0eWxlID0gJGFwcF9zdHlsZSRcbn0pXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9sb2FkZXIuanM/dHlwZT1jb21wb25lbnQhLi9zcmMvQ29tbW9uL0NvbXBvbmVudC9DSW5wdXQvaW5kZXgudXg/bmFtZT1jLWlucHV0XG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAzIDQiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gIFwiYXR0clwiOiB7fSxcbiAgXCJjbGFzc0xpc3RcIjogW1xuICAgIFwiYy1pbnB1dFwiXG4gIF0sXG4gIFwiY2hpbGRyZW5cIjogW1xuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcImMtaW5wdXQtY29udGVudFwiXG4gICAgICBdLFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiB0aGlzLmxhYmVsfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJpbnB1dC1sYWJlbFwiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gdGhpcy5sYWJlbH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImlucHV0XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwidHlwZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuIHRoaXMudHlwZX0sXG4gICAgICAgICAgICBcInBsYWNlaG9sZGVyXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gdGhpcy5wbGFjZWhvbGRlcn0sXG4gICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gdGhpcy5pbnB1dFZhbHVlfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJpbnB1dC1uYXRpdmVcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgXCJjaGFuZ2VcIjogXCJvbklucHV0XCJcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJjbGVhci1ib3hcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuIHRoaXMuY2xlYXJhYmxlfSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwiaW5wdXQtY2xlYXJcIlxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gdGhpcy5jbGVhcn0sXG4gICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwib25DbGVhclwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLDl1wiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICBdXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gYzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtanNvbi1sb2FkZXIuanMhYzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtdGVtcGxhdGUtbG9hZGVyLmpzIWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9dGVtcGxhdGVzIS4vc3JjL0NvbW1vbi9Db21wb25lbnQvQ0lucHV0L2luZGV4LnV4XG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAzIDQiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgXCIuYy1pbnB1dC1jb250ZW50XCI6IHtcbiAgICBcImRpc3BsYXlcIjogXCJmbGV4XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiNDBweFwiLFxuICAgIFwiZm9udFNpemVcIjogXCIzMHB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIyMHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCI4MHB4XCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCIuaW5wdXQtbGFiZWxcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMjBweFwiXG4gIH0sXG4gIFwiLmlucHV0LW5hdGl2ZVwiOiB7XG4gICAgXCJmbGV4XCI6IDEsXG4gICAgXCJmb250U2l6ZVwiOiBcIjMwcHhcIlxuICB9LFxuICBcIi5jbGVhci1ib3hcIjoge1xuICAgIFwiaGVpZ2h0XCI6IFwiNDBweFwiLFxuICAgIFwid2lkdGhcIjogXCI0MHB4XCJcbiAgfSxcbiAgXCIuaW5wdXQtY2xlYXJcIjoge1xuICAgIFwiZGlzcGxheVwiOiBcImZsZXhcIixcbiAgICBcImhlaWdodFwiOiBcIjQwcHhcIixcbiAgICBcIndpZHRoXCI6IFwiNDBweFwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiMjVweFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2RkZGRkZFwiXG4gIH0sXG4gIFwiLmlucHV0LWNsZWFyIHRleHRcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJ0ZXh0QWxpZ25cIjogXCJjZW50ZXJcIixcbiAgICBcImZvbnRTaXplXCI6IFwiMzVweFwiLFxuICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgXCJtYXJnaW5Ub3BcIjogXCItNXB4XCIsXG4gICAgXCJfbWV0YVwiOiB7XG4gICAgICBcInJ1bGVEZWZcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0XCI6IFwiYVwiLFxuICAgICAgICAgIFwiblwiOiBcImNsYXNzXCIsXG4gICAgICAgICAgXCJpXCI6IGZhbHNlLFxuICAgICAgICAgIFwiYVwiOiBcImVsZW1lbnRcIixcbiAgICAgICAgICBcInZcIjogXCJpbnB1dC1jbGVhclwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInRcIjogXCJkXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidFwiOiBcInRcIixcbiAgICAgICAgICBcIm5cIjogXCJ0ZXh0XCJcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWpzb24tbG9hZGVyLmpzIWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLXN0eWxlLWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1lOi9Ya1dvcmsvRmFzdEFwcFdvcmtTcGFjZS9mYXN0YXBwL2NvbS54ay5mYXN0YXBwL3NyYy9Db21tb24vQ29tcG9uZW50L0NJbnB1dC9pbmRleC51eCFjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZTovWGtXb3JrL0Zhc3RBcHBXb3JrU3BhY2UvZmFzdGFwcC9jb20ueGsuZmFzdGFwcC9zcmMvQ29tbW9uL0NvbXBvbmVudC9DSW5wdXQvaW5kZXgudXghLi9zcmMvQ29tbW9uL0NvbXBvbmVudC9DSW5wdXQvaW5kZXgudXhcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDMgNCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCAkYXBwX3JlcXVpcmUkKXsndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfcHJvcHMkcHJvcHMkZGF0YSRvbkk7XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHsgaWYgKGtleSBpbiBvYmopIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTsgfSBlbHNlIHsgb2JqW2tleV0gPSB2YWx1ZTsgfSByZXR1cm4gb2JqOyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IChfcHJvcHMkcHJvcHMkZGF0YSRvbkkgPSB7XG4gIHByb3BzOiBbJ2xhYmVsJywgJ3BsYWNlaG9sZGVyJywgJ3R5cGUnLCAndmFsdWUnLCAnY2xlYXJhYmxlJ11cbn0sIF9kZWZpbmVQcm9wZXJ0eShfcHJvcHMkcHJvcHMkZGF0YSRvbkksICdwcm9wcycsIHtcbiAgcGxhY2Vob2xkZXI6ICfor7fovpPlhaUuLi4nLFxuICB0eXBlOiAndGV4dCcsXG4gIHZhbHVlOiAnJyxcbiAgY2xlYXJhYmxlOiBmYWxzZVxufSksIF9kZWZpbmVQcm9wZXJ0eShfcHJvcHMkcHJvcHMkZGF0YSRvbkksICdkYXRhJywgZnVuY3Rpb24gZGF0YSgpIHtcbiAgcmV0dXJuIHtcbiAgICBjbGVhcjogZmFsc2UsXG4gICAgaW5wdXRWYWx1ZTogJydcbiAgfTtcbn0pLCBfZGVmaW5lUHJvcGVydHkoX3Byb3BzJHByb3BzJGRhdGEkb25JLCAnb25Jbml0JywgZnVuY3Rpb24gb25Jbml0KCkge1xuICB0aGlzLmlucHV0VmFsdWUgPSB0aGlzLnZhbHVlO1xufSksIF9kZWZpbmVQcm9wZXJ0eShfcHJvcHMkcHJvcHMkZGF0YSRvbkksICdvbklucHV0JywgZnVuY3Rpb24gb25JbnB1dChfcmVmKSB7XG4gIHZhciB2YWx1ZSA9IF9yZWYudmFsdWU7XG5cbiAgdGhpcy5jbGVhciA9IHZhbHVlICE9PSAnJztcbiAgdGhpcy5pbnB1dFZhbHVlID0gdmFsdWU7XG4gIHRoaXMuJGRpc3BhdGNoKCdpbnB1dCcsIHsgdmFsdWU6IHZhbHVlIH0pO1xufSksIF9kZWZpbmVQcm9wZXJ0eShfcHJvcHMkcHJvcHMkZGF0YSRvbkksICdvbkNsZWFyJywgZnVuY3Rpb24gb25DbGVhcigpIHtcbiAgdGhpcy5jbGVhciA9IGZhbHNlO1xuICB0aGlzLmlucHV0VmFsdWUgPSAnJztcbiAgdGhpcy4kZGlzcGF0Y2goJ2NsZWFyJywgeyB2YWx1ZTogdGhpcy52YWx1ZSB9KTtcbn0pLCBfcHJvcHMkcHJvcHMkZGF0YSRvbkkpO1xudmFyIG1vZHVsZU93biA9IGV4cG9ydHMuZGVmYXVsdCB8fCBtb2R1bGUuZXhwb3J0cztcbnZhciBhY2Nlc3NvcnMgPSBbJ3B1YmxpYycsICdwcm90ZWN0ZWQnLCAncHJpdmF0ZSddO1xuaWYgKG1vZHVsZU93bi5kYXRhICYmIGFjY2Vzc29ycy5zb21lKGZ1bmN0aW9uIChhY2MpIHtcbiAgICByZXR1cm4gbW9kdWxlT3duW2FjY107XG4gIH0pKSB7XG4gIHRocm93IG5ldyBFcnJvcign6aG16Z2iVk3lr7nosaHkuK3lsZ7mgKdkYXRh5LiN5Y+v5LiOcHVibGljLCBwcm90ZWN0ZWQsIHByaXZhdGXlkIzml7blrZjlnKjvvIzor7fkvb/nlKhwdWJsaWPmm7/ku6NkYXRh77yBJyk7XG59IGVsc2UgaWYgKCFtb2R1bGVPd24uZGF0YSkge1xuICBtb2R1bGVPd24uZGF0YSA9IHt9O1xuICBtb2R1bGVPd24uX2Rlc2NyaXB0b3IgPSB7fTtcbiAgYWNjZXNzb3JzLmZvckVhY2goZnVuY3Rpb24oYWNjKSB7XG4gICAgdmFyIGFjY1R5cGUgPSB0eXBlb2YgbW9kdWxlT3duW2FjY107XG4gICAgaWYgKGFjY1R5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBtb2R1bGVPd24uZGF0YSA9IE9iamVjdC5hc3NpZ24obW9kdWxlT3duLmRhdGEsIG1vZHVsZU93blthY2NdKTtcbiAgICAgIGZvciAodmFyIG5hbWUgaW4gbW9kdWxlT3duW2FjY10pIHtcbiAgICAgICAgbW9kdWxlT3duLl9kZXNjcmlwdG9yW25hbWVdID0ge2FjY2VzcyA6IGFjY307XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChhY2NUeXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ+mhtemdolZN5a+56LGh5Lit55qE5bGe5oCnJyArIGFjYyArICfnmoTlgLzkuI3og73kvb/lh73mlbDvvIzor7fkvb/nlKjlr7nosaEnKTtcbiAgICB9XG4gIH0pO1xufX1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1zY3JpcHQtbG9hZGVyLmpzIWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWFjY2Vzcy1sb2FkZXIuanMhYzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYj9wcmVzZXRzW109YzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvYmFiZWwtcHJlc2V0LWVudiZwcmVzZXRzPWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2JhYmVsLXByZXNldC1lbnYmcGx1Z2luc1tdPWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2pzeC1sb2FkZXIuanMmcGx1Z2lucz1jOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9qc3gtbG9hZGVyLmpzJmNvbW1lbnRzPWZhbHNlIWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyEuL3NyYy9Db21tb24vQ29tcG9uZW50L0NJbnB1dC9pbmRleC51eFxuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMyA0IiwiaW1wb3J0IGFwaSBmcm9tICcuL2luZGV4JztcbnZhciBzdG9yYWdlID0gJGFwcF9yZXF1aXJlJCgnQGFwcC1tb2R1bGUvc3lzdGVtLnN0b3JhZ2UnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGxvZ2luKHVzZXJuYW1lLCBwYXNzd29yZCkge1xuICByZXR1cm4gYXBpLmxvZ2luKHtcbiAgICB1c2VybmFtZTogdXNlcm5hbWUsXG4gICAgcGFzc3dvcmQ6IHBhc3N3b3JkXG4gIH0pLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgIHZhciB2YWx1ZSA9IEpTT04ucGFyc2UocmVzcG9uc2UuZGF0YSk7XG4gICAgaWYgKHZhbHVlLmVycm9yQ29kZSA9PT0gLTEpIHtcbiAgICAgIFByb21pc2UucmVqZWN0KHZhbHVlLmVycm9yTXNnKTtcbiAgICB9XG4gICAgc3RvcmFnZS5zZXQoe1xuICAgICAga2V5OiAnYXV0aCcsXG4gICAgICB2YWx1ZTogcmVzcG9uc2UuaGVhZGVyc1snU2V0LUNvb2tpZSddLFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2Nvb2tpZXPkv53lrZjmiJDlip8nKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBzdG9yYWdlLnNldCh7XG4gICAgICBrZXk6ICd1c2VyJyxcbiAgICAgIHZhbHVlOiB2YWx1ZS5kYXRhXG4gICAgfSk7XG4gICAgc3RvcmFnZS5zZXQoe1xuICAgICAga2V5OiAnaXNMb2dpbicsXG4gICAgICB2YWx1ZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUuZGF0YSk7XG4gIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCfnmbvlvZXlpLHotKUnKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3Rlcih1c2VybmFtZSwgcGFzc3dvcmQsIHJlcGFzc3dvcmQpIHtcbiAgcmV0dXJuIGFwaS5yZWdpc3Rlcih7XG4gICAgdXNlcm5hbWU6IHVzZXJuYW1lLFxuICAgIHBhc3N3b3JkOiBwYXNzd29yZCxcbiAgICByZXBhc3N3b3JkOiByZXBhc3N3b3JkXG4gIH0pLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgIHZhciB2YWx1ZSA9IEpTT04ucGFyc2UocmVzcG9uc2UuZGF0YSk7XG4gICAgaWYgKHZhbHVlLmVycm9yQ29kZSA9PT0gLTEpIHtcbiAgICAgIFByb21pc2UucmVqZWN0KHZhbHVlLmVycm9yTXNnKTtcbiAgICB9XG4gICAgc3RvcmFnZS5zZXQoe1xuICAgICAga2V5OiAnYXV0aCcsXG4gICAgICB2YWx1ZTogcmVzcG9uc2UuaGVhZGVyc1snU2V0LUNvb2tpZSddLFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2Nvb2tpZXPkv53lrZjmiJDlip8nKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBzdG9yYWdlLnNldCh7XG4gICAgICBrZXk6ICd1c2VyJyxcbiAgICAgIHZhbHVlOiB2YWx1ZS5kYXRhXG4gICAgfSk7XG4gICAgc3RvcmFnZS5zZXQoe1xuICAgICAga2V5OiAnaXNMb2dpbicsXG4gICAgICB2YWx1ZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUuZGF0YSk7XG4gIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCfms6jlhozlpLHotKUnKTtcbiAgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvQ29tbW9uL0FwaS91c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKFwiISFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxsb2FkZXIuanM/dHlwZT1jb21wb25lbnQhLi4vSG9tZS9ob21lLnV4P25hbWU9aG9tZVwiKVxucmVxdWlyZShcIiEhYzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50IS4uL0NhdGVnb3J5L2NhdGVnb3J5LnV4P25hbWU9Y2xhc3NpZnlcIilcbnJlcXVpcmUoXCIhIWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGxvYWRlci5qcz90eXBlPWNvbXBvbmVudCEuLi9Qcm9maWxlL3Byb2ZpbGUudXg/bmFtZT1tZVwiKVxudmFyICRhcHBfdGVtcGxhdGUkID0gcmVxdWlyZShcIiEhYzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtanNvbi1sb2FkZXIuanMhYzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtdGVtcGxhdGUtbG9hZGVyLmpzIWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9dGVtcGxhdGVzIS4vbWFpbi51eFwiKVxudmFyICRhcHBfc3R5bGUkID0gcmVxdWlyZShcIiEhYzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtanNvbi1sb2FkZXIuanMhYzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtc3R5bGUtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWU6XFxcXFhrV29ya1xcXFxGYXN0QXBwV29ya1NwYWNlXFxcXGZhc3RhcHBcXFxcY29tLnhrLmZhc3RhcHBcXFxcc3JjXFxcXE1haW5cXFxcbWFpbi51eCFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZTpcXFxcWGtXb3JrXFxcXEZhc3RBcHBXb3JrU3BhY2VcXFxcZmFzdGFwcFxcXFxjb20ueGsuZmFzdGFwcFxcXFxzcmNcXFxcTWFpblxcXFxtYWluLnV4IS4vbWFpbi51eFwiKVxudmFyICRhcHBfc2NyaXB0JCA9IHJlcXVpcmUoXCIhIWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLXNjcmlwdC1sb2FkZXIuanMhYzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtYWNjZXNzLWxvYWRlci5qcyFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxiYWJlbC1sb2FkZXI/cHJlc2V0c1tdPWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGJhYmVsLXByZXNldC1lbnYmcHJlc2V0cz1jOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxiYWJlbC1wcmVzZXQtZW52JnBsdWdpbnNbXT1jOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxqc3gtbG9hZGVyLmpzJnBsdWdpbnM9YzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcanN4LWxvYWRlci5qcyZjb21tZW50cz1mYWxzZSFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXNjcmlwdHMhLi9tYWluLnV4XCIpXG5cbiRhcHBfZGVmaW5lJCgnQGFwcC1jb21wb25lbnQvbWFpbicsIFtdLCBmdW5jdGlvbigkYXBwX3JlcXVpcmUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX21vZHVsZSQpe1xuICAgICAkYXBwX3NjcmlwdCQoJGFwcF9tb2R1bGUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX3JlcXVpcmUkKVxuICAgICBpZiAoJGFwcF9leHBvcnRzJC5fX2VzTW9kdWxlICYmICRhcHBfZXhwb3J0cyQuZGVmYXVsdCkge1xuICAgICAgICAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMgPSAkYXBwX2V4cG9ydHMkLmRlZmF1bHRcbiAgICAgICAgfVxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy50ZW1wbGF0ZSA9ICRhcHBfdGVtcGxhdGUkXG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnN0eWxlID0gJGFwcF9zdHlsZSRcbn0pXG5cbiRhcHBfYm9vdHN0cmFwJCgnQGFwcC1jb21wb25lbnQvbWFpbicseyBwYWNrYWdlck5hbWU6J2ZhLXRvb2xraXQnLCBwYWNrYWdlclZlcnNpb246ICcxLjAuNi1TdGFibGUuMzAwJ30pXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvTWFpbi9tYWluLnV4XG4vLyBtb2R1bGUgaWQgPSAyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgJGFwcF90ZW1wbGF0ZSQgPSByZXF1aXJlKFwiISFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1qc29uLWxvYWRlci5qcyFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS10ZW1wbGF0ZS1sb2FkZXIuanMhYzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT10ZW1wbGF0ZXMhLi9ob21lLnV4XCIpXG52YXIgJGFwcF9zdHlsZSQgPSByZXF1aXJlKFwiISFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1qc29uLWxvYWRlci5qcyFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1zdHlsZS1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZTpcXFxcWGtXb3JrXFxcXEZhc3RBcHBXb3JrU3BhY2VcXFxcZmFzdGFwcFxcXFxjb20ueGsuZmFzdGFwcFxcXFxzcmNcXFxcSG9tZVxcXFxob21lLnV4IWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1lOlxcXFxYa1dvcmtcXFxcRmFzdEFwcFdvcmtTcGFjZVxcXFxmYXN0YXBwXFxcXGNvbS54ay5mYXN0YXBwXFxcXHNyY1xcXFxIb21lXFxcXGhvbWUudXghLi9ob21lLnV4XCIpXG52YXIgJGFwcF9zY3JpcHQkID0gcmVxdWlyZShcIiEhYzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtc2NyaXB0LWxvYWRlci5qcyFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1hY2Nlc3MtbG9hZGVyLmpzIWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGJhYmVsLWxvYWRlcj9wcmVzZXRzW109YzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcYmFiZWwtcHJlc2V0LWVudiZwcmVzZXRzPWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGJhYmVsLXByZXNldC1lbnYmcGx1Z2luc1tdPWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGpzeC1sb2FkZXIuanMmcGx1Z2lucz1jOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxqc3gtbG9hZGVyLmpzJmNvbW1lbnRzPWZhbHNlIWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyEuL2hvbWUudXhcIilcblxuJGFwcF9kZWZpbmUkKCdAYXBwLWNvbXBvbmVudC9ob21lJywgW10sIGZ1bmN0aW9uKCRhcHBfcmVxdWlyZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfbW9kdWxlJCl7XG4gICAgICRhcHBfc2NyaXB0JCgkYXBwX21vZHVsZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfcmVxdWlyZSQpXG4gICAgIGlmICgkYXBwX2V4cG9ydHMkLl9fZXNNb2R1bGUgJiYgJGFwcF9leHBvcnRzJC5kZWZhdWx0KSB7XG4gICAgICAgICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cyA9ICRhcHBfZXhwb3J0cyQuZGVmYXVsdFxuICAgICAgICB9XG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnRlbXBsYXRlID0gJGFwcF90ZW1wbGF0ZSRcbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMuc3R5bGUgPSAkYXBwX3N0eWxlJFxufSlcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2xvYWRlci5qcz90eXBlPWNvbXBvbmVudCEuL3NyYy9Ib21lL2hvbWUudXg/bmFtZT1ob21lXG4vLyBtb2R1bGUgaWQgPSAzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgXCJ0eXBlXCI6IFwicmVmcmVzaFwiLFxuICBcImF0dHJcIjoge1xuICAgIFwicmVmcmVzaGluZ1wiOiBmdW5jdGlvbiAoKSB7cmV0dXJuIHRoaXMuaXNSZWZyZXNoaW5nfVxuICB9LFxuICBcImV2ZW50c1wiOiB7XG4gICAgXCJyZWZyZXNoXCI6IFwicmVmcmVzaFwiXG4gIH0sXG4gIFwiY2hpbGRyZW5cIjogW1xuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImxpc3RcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJob21lLXBhZ2VcIlxuICAgICAgXSxcbiAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgXCJzY3JvbGxib3R0b21cIjogXCJsb2FkTW9yZURhdGFcIlxuICAgICAgfSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwibGlzdC1pdGVtXCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwidHlwZVwiOiBcImJhbm5lclwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3dpcGVyXCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgXCJhdXRvcGxheVwiOiBcInRydWVcIixcbiAgICAgICAgICAgICAgICBcImludGVydmFsXCI6IFwiNDAwMFwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcImJhbm5lclwiXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInN0YWNrXCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiYmFubmVyXCJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInJlcGVhdFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuIHRoaXMuYmFubmVybGlzdH0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3JjXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gdGhpcy4kaXRlbS5pbWFnZVBhdGh9XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJhbm5lci1pbWFnZVwiXG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IGZ1bmN0aW9uIChldnQpIHt0aGlzLm9wZW5BcnRpY2xlKHRoaXMuJGl0ZW0udXJsLCcnLHRoaXMuJGl0ZW0udGl0bGUsZXZ0KX1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiB0aGlzLiRpdGVtLnRpdGxlfVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJiYW5uZXItdGl0bGVcIlxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImxpc3QtaXRlbVwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInR5cGVcIjogXCJ0aXBcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5pyA5paw5Y2a5paHLS3plb/mjInlj6/liIbkuqvmlofnq6B+XCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwidGV4dC10aXBcIlxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiYmxvY2tcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJyZXBlYXRcIjogZnVuY3Rpb24gKCkge3JldHVybiB0aGlzLmFydGljbGVMaXN0fSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwibGlzdC1pdGVtXCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYXJ0aWNsZVwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcImFydGljbGUtaXRlbVwiXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICBcImNsaWNrXCI6IGZ1bmN0aW9uIChldnQpIHt0aGlzLm9wZW5BcnRpY2xlKHRoaXMuJGl0ZW0ubGluayx0aGlzLiRpdGVtLnByb2plY3RMaW5rLHRoaXMuJGl0ZW0udGl0bGUsZXZ0KX0sXG4gICAgICAgICAgICAgICAgXCJsb25ncHJlc3NcIjogZnVuY3Rpb24gKGV2dCkge3RoaXMuc2hhcmVMaW5rKHRoaXMuJGl0ZW0ubGluayxldnQpfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImRpc3BsYXlcIjogXCJmbGV4XCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJzaG93XCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gdGhpcy4kaXRlbS5mcmVzaH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5pawXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGFnXCJcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiB0aGlzLiRpdGVtLnRpdGxlfVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0LXRpdGxlXCJcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJmbGV4XCI6IDFcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInNyY1wiOiBmdW5jdGlvbiAoKSB7cmV0dXJuIHRoaXMuY29sbGVjdEljb25bdGhpcy4kaXRlbS5jb2xsZWN0PzE6MF19XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIjogXCI1MnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBcIjUycHhcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBmdW5jdGlvbiAoZXZ0KSB7dGhpcy5jbGlja0NvbGxlY3QodGhpcy4kaXRlbSxldnQpfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiYXJ0aWNsZS10aXBcIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gJ+WIhuexuzogJyArICh0aGlzLiRpdGVtLnN1cGVyQ2hhcHRlck5hbWUpICsgJy8nICsgKHRoaXMuJGl0ZW0uY2hhcHRlck5hbWUpfVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aXBcIlxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiYXJ0aWNsZS10aXBcIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gJ+S9nOiAhTogJyArICh0aGlzLiRpdGVtLmF1dGhvcil9XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRpcFwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gdGhpcy4kaXRlbS5uaWNlRGF0ZX1cbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGltZVwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwibGlzdC1pdGVtXCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwidHlwZVwiOiBcImxvYWRNb3JlXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwibG9hZC1tb3JlXCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiB0aGlzLmFydGljbGVMaXN0Lmxlbmd0aD4wfSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwicHJvZ3Jlc3NcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJjaXJjdWxhclwiLFxuICAgICAgICAgICAgICAgIFwic2hvd1wiOiBmdW5jdGlvbiAoKSB7cmV0dXJuIHRoaXMuaGFzTW9yZURhdGF9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICBcInNob3dcIjogZnVuY3Rpb24gKCkge3JldHVybiB0aGlzLmhhc01vcmVEYXRhfSxcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5Yqg6L295pu05aSaXCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgIFwic2hvd1wiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICF0aGlzLmhhc01vcmVEYXRhfSxcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5rKh5pyJ5pu05aSa5LqGflwiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIF1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1qc29uLWxvYWRlci5qcyFjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS10ZW1wbGF0ZS1sb2FkZXIuanMhYzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT10ZW1wbGF0ZXMhLi9zcmMvSG9tZS9ob21lLnV4XG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgXCIuYmFubmVyXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiNDIwcHhcIlxuICB9LFxuICBcIi5iYW5uZXItaW1hZ2VcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJoZWlnaHRcIjogXCI0MjBweFwiXG4gIH0sXG4gIFwiLmJhbm5lci10aXRsZVwiOiB7XG4gICAgXCJ0ZXh0T3ZlcmZsb3dcIjogXCJlbGxpcHNpc1wiLFxuICAgIFwibGluZXNcIjogMSxcbiAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiOTBweFwiLFxuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiMwMDAwMDBcIixcbiAgICBcIm9wYWNpdHlcIjogMC41XG4gIH0sXG4gIFwiLmFydGljbGUtaXRlbVwiOiB7XG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiMjBweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMjBweFwiLFxuICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjIwcHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMjBweFwiLFxuICAgIFwiZGlzcGxheVwiOiBcImZsZXhcIixcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcImJvcmRlckJvdHRvbVdpZHRoXCI6IFwiMXB4XCIsXG4gICAgXCJib3JkZXJCb3R0b21Db2xvclwiOiBcIiNlZWVlZWVcIlxuICB9LFxuICBcIi50ZXh0LXRpcFwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcInBhZGRpbmdUb3BcIjogXCIyMHB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIxMHB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMjBweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCIxMHB4XCIsXG4gICAgXCJib3JkZXJCb3R0b21XaWR0aFwiOiBcIjFweFwiLFxuICAgIFwiYm9yZGVyQm90dG9tQ29sb3JcIjogXCIjZWVlZWVlXCJcbiAgfSxcbiAgXCIuYXJ0aWNsZS1pdGVtIC50ZXh0LXRpdGxlXCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiMzBweFwiLFxuICAgIFwiY29sb3JcIjogXCIjMmUzMTM1XCIsXG4gICAgXCJ0ZXh0T3ZlcmZsb3dcIjogXCJlbGxpcHNpc1wiLFxuICAgIFwibGluZXNcIjogMSxcbiAgICBcIm1hcmdpbkJvdHRvbVwiOiBcIjVweFwiLFxuICAgIFwiX21ldGFcIjoge1xuICAgICAgXCJydWxlRGVmXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidFwiOiBcImFcIixcbiAgICAgICAgICBcIm5cIjogXCJjbGFzc1wiLFxuICAgICAgICAgIFwiaVwiOiBmYWxzZSxcbiAgICAgICAgICBcImFcIjogXCJlbGVtZW50XCIsXG4gICAgICAgICAgXCJ2XCI6IFwiYXJ0aWNsZS1pdGVtXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidFwiOiBcImRcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0XCI6IFwiYVwiLFxuICAgICAgICAgIFwiblwiOiBcImNsYXNzXCIsXG4gICAgICAgICAgXCJpXCI6IGZhbHNlLFxuICAgICAgICAgIFwiYVwiOiBcImVsZW1lbnRcIixcbiAgICAgICAgICBcInZcIjogXCJ0ZXh0LXRpdGxlXCJcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgfSxcbiAgXCIuYXJ0aWNsZS1pdGVtIC5hcnRpY2xlLXRpcFwiOiB7XG4gICAgXCJkaXNwbGF5XCI6IFwiZmxleFwiLFxuICAgIFwiZmxleERpcmVjdGlvblwiOiBcInJvd1wiLFxuICAgIFwiX21ldGFcIjoge1xuICAgICAgXCJydWxlRGVmXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidFwiOiBcImFcIixcbiAgICAgICAgICBcIm5cIjogXCJjbGFzc1wiLFxuICAgICAgICAgIFwiaVwiOiBmYWxzZSxcbiAgICAgICAgICBcImFcIjogXCJlbGVtZW50XCIsXG4gICAgICAgICAgXCJ2XCI6IFwiYXJ0aWNsZS1pdGVtXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidFwiOiBcImRcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0XCI6IFwiYVwiLFxuICAgICAgICAgIFwiblwiOiBcImNsYXNzXCIsXG4gICAgICAgICAgXCJpXCI6IGZhbHNlLFxuICAgICAgICAgIFwiYVwiOiBcImVsZW1lbnRcIixcbiAgICAgICAgICBcInZcIjogXCJhcnRpY2xlLXRpcFwiXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIH0sXG4gIFwiLmFydGljbGUtdGlwIC50aXBcIjoge1xuICAgIFwiZm9udFNpemVcIjogXCIyNnB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiM5OTk5OTlcIixcbiAgICBcIl9tZXRhXCI6IHtcbiAgICAgIFwicnVsZURlZlwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInRcIjogXCJhXCIsXG4gICAgICAgICAgXCJuXCI6IFwiY2xhc3NcIixcbiAgICAgICAgICBcImlcIjogZmFsc2UsXG4gICAgICAgICAgXCJhXCI6IFwiZWxlbWVudFwiLFxuICAgICAgICAgIFwidlwiOiBcImFydGljbGUtdGlwXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidFwiOiBcImRcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0XCI6IFwiYVwiLFxuICAgICAgICAgIFwiblwiOiBcImNsYXNzXCIsXG4gICAgICAgICAgXCJpXCI6IGZhbHNlLFxuICAgICAgICAgIFwiYVwiOiBcImVsZW1lbnRcIixcbiAgICAgICAgICBcInZcIjogXCJ0aXBcIlxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICB9LFxuICBcIi5hcnRpY2xlLXRpcCAudGltZVwiOiB7XG4gICAgXCJmb250U2l6ZVwiOiBcIjI2cHhcIixcbiAgICBcImNvbG9yXCI6IFwiIzk5OTk5OVwiLFxuICAgIFwiX21ldGFcIjoge1xuICAgICAgXCJydWxlRGVmXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidFwiOiBcImFcIixcbiAgICAgICAgICBcIm5cIjogXCJjbGFzc1wiLFxuICAgICAgICAgIFwiaVwiOiBmYWxzZSxcbiAgICAgICAgICBcImFcIjogXCJlbGVtZW50XCIsXG4gICAgICAgICAgXCJ2XCI6IFwiYXJ0aWNsZS10aXBcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0XCI6IFwiZFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInRcIjogXCJhXCIsXG4gICAgICAgICAgXCJuXCI6IFwiY2xhc3NcIixcbiAgICAgICAgICBcImlcIjogZmFsc2UsXG4gICAgICAgICAgXCJhXCI6IFwiZWxlbWVudFwiLFxuICAgICAgICAgIFwidlwiOiBcInRpbWVcIlxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICB9LFxuICBcIi50aW1lXCI6IHtcbiAgICBcImZsZXhcIjogMSxcbiAgICBcInRleHRBbGlnblwiOiBcInJpZ2h0XCJcbiAgfSxcbiAgXCIudGFnXCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiMjJweFwiLFxuICAgIFwiY29sb3JcIjogXCIjRkYwMDAwXCIsXG4gICAgXCJib3JkZXJUb3BXaWR0aFwiOiBcIjFweFwiLFxuICAgIFwiYm9yZGVyUmlnaHRXaWR0aFwiOiBcIjFweFwiLFxuICAgIFwiYm9yZGVyQm90dG9tV2lkdGhcIjogXCIxcHhcIixcbiAgICBcImJvcmRlckxlZnRXaWR0aFwiOiBcIjFweFwiLFxuICAgIFwiYm9yZGVyVG9wQ29sb3JcIjogXCIjRkYwMDAwXCIsXG4gICAgXCJib3JkZXJSaWdodENvbG9yXCI6IFwiI0ZGMDAwMFwiLFxuICAgIFwiYm9yZGVyQm90dG9tQ29sb3JcIjogXCIjRkYwMDAwXCIsXG4gICAgXCJib3JkZXJMZWZ0Q29sb3JcIjogXCIjRkYwMDAwXCIsXG4gICAgXCJtYXJnaW5SaWdodFwiOiBcIjEwcHhcIixcbiAgICBcInBhZGRpbmdUb3BcIjogXCIycHhcIixcbiAgICBcInBhZGRpbmdSaWdodFwiOiBcIjJweFwiLFxuICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjJweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCIycHhcIixcbiAgICBcImhlaWdodFwiOiBcIjMycHhcIlxuICB9LFxuICBcIi5sb2FkLW1vcmVcIjoge1xuICAgIFwicGFkZGluZ1RvcFwiOiBcIjIwcHhcIixcbiAgICBcInBhZGRpbmdSaWdodFwiOiBcIjIwcHhcIixcbiAgICBcInBhZGRpbmdCb3R0b21cIjogXCIyMHB4XCIsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjIwcHhcIixcbiAgICBcImRpc3BsYXlcIjogXCJmbGV4XCIsXG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwicm93XCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImNlbnRlclwiXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1qc29uLWxvYWRlci5qcyFjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1zdHlsZS1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZTovWGtXb3JrL0Zhc3RBcHBXb3JrU3BhY2UvZmFzdGFwcC9jb20ueGsuZmFzdGFwcC9zcmMvSG9tZS9ob21lLnV4IWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1lOi9Ya1dvcmsvRmFzdEFwcFdvcmtTcGFjZS9mYXN0YXBwL2NvbS54ay5mYXN0YXBwL3NyYy9Ib21lL2hvbWUudXghLi9zcmMvSG9tZS9ob21lLnV4XG4vLyBtb2R1bGUgaWQgPSAzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgJGFwcF9yZXF1aXJlJCl7J3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2hvbWUgPSByZXF1aXJlKCcuLi9Db21tb24vQXBpL2hvbWUnKTtcblxudmFyIF9jb2xsZWN0ID0gcmVxdWlyZSgnLi4vQ29tbW9uL0FwaS9jb2xsZWN0Jyk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgZGF0YToge1xuICAgIGJhbm5lcmxpc3Q6IFtdLFxuICAgIGFydGljbGVMaXN0OiBbXSxcbiAgICBwYWdlOiAwLFxuICAgIGhhc01vcmVEYXRhOiB0cnVlLFxuICAgIGlzUmVmcmVzaGluZzogZmFsc2UsXG4gICAgY29sbGVjdEljb246IFsnLi4vQ29tbW9uL0ltYWdlL2ljb25fdW5jb2xsZWN0LnBuZycsICcuLi9Db21tb24vSW1hZ2UvaWNvbl9jb2xsZWN0LnBuZyddXG4gIH0sXG4gIG9uSW5pdDogZnVuY3Rpb24gb25Jbml0KCkge1xuICAgIHRoaXMucmVmcmVzaCh7IHJlZnJlc2hpbmc6IHRydWUgfSk7XG4gIH0sXG4gIGdldEJhbm5lcjogZnVuY3Rpb24gZ2V0QmFubmVyKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAoMCwgX2hvbWUuZ2V0QmFubmVyKSgpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIF90aGlzLmJhbm5lcmxpc3QgPSBkYXRhO1xuICAgIH0pO1xuICB9LFxuICBnZXRBcnRpY2xlOiBmdW5jdGlvbiBnZXRBcnRpY2xlKCkge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgKDAsIF9ob21lLmdldEFydGljbGUpKHRoaXMucGFnZSkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgX3RoaXMyLmhhc01vcmVEYXRhID0gIWRhdGEub3ZlcjtcbiAgICAgIGlmIChfdGhpczIucGFnZSA+IDApIHtcbiAgICAgICAgX3RoaXMyLmFydGljbGVMaXN0ID0gX3RoaXMyLmFydGljbGVMaXN0LmNvbmNhdChkYXRhLmRhdGFzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF90aGlzMi5pc1JlZnJlc2hpbmcgPSBmYWxzZTtcbiAgICAgICAgX3RoaXMyLmFydGljbGVMaXN0ID0gZGF0YS5kYXRhcztcbiAgICAgIH1cbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICBfdGhpczIuaXNSZWZyZXNoaW5nID0gZmFsc2U7XG4gICAgfSk7XG4gIH0sXG4gIGxvYWRNb3JlRGF0YTogZnVuY3Rpb24gbG9hZE1vcmVEYXRhKCkge1xuICAgIGlmICh0aGlzLmhhc01vcmVEYXRhKSB7XG4gICAgICB0aGlzLnBhZ2UrKztcbiAgICAgIHRoaXMuZ2V0QXJ0aWNsZSgpO1xuICAgIH1cbiAgfSxcbiAgb3BlbkFydGljbGU6IGZ1bmN0aW9uIG9wZW5BcnRpY2xlKGxpbmssIHByb2plY3RMaW5rLCB0aXRsZSkge1xuICAgIHZhciB1cmwgPSBwcm9qZWN0TGluayA9PT0gJycgPyBsaW5rIDogcHJvamVjdExpbms7XG4gICAgaWYgKHVybCAhPT0gJycpIHtcbiAgICAgIHRoaXMuJGFwcC4kZGVmLnJvdXRlci5wdXNoKHtcbiAgICAgICAgdXJpOiAnQXJ0aWNsZURldGFpbCcsXG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgICB1cmw6IHVybFxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIHJlZnJlc2g6IGZ1bmN0aW9uIHJlZnJlc2goZXZ0KSB7XG4gICAgdGhpcy5pc1JlZnJlc2hpbmcgPSBldnQucmVmcmVzaGluZztcbiAgICB0aGlzLnBhZ2UgPSAwO1xuICAgIHRoaXMuZ2V0QmFubmVyKCk7XG4gICAgdGhpcy5nZXRBcnRpY2xlKCk7XG4gIH0sXG4gIGNsaWNrQ29sbGVjdDogZnVuY3Rpb24gY2xpY2tDb2xsZWN0KGl0ZW0pIHtcbiAgICBpZiAoaXRlbS5jb2xsZWN0KSB7XG4gICAgICB0aGlzLnVuY29sbGVjdChpdGVtLmlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb2xsZWN0KGl0ZW0uaWQpO1xuICAgIH1cbiAgfSxcbiAgdW5jb2xsZWN0OiBmdW5jdGlvbiB1bmNvbGxlY3QoaWQpIHtcbiAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICgwLCBfY29sbGVjdC51bmNvbGxlY3RBcnRpY2xlKShpZCkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgX3RoaXMzLnJlZnJlc2goeyByZWZyZXNoaW5nOiB0cnVlIH0pO1xuICAgICAgX3RoaXMzLiRhcHAuJGRlZi5wcm9tcHQuc2hvd1RvYXN0KHsgbWVzc2FnZTogJ+W3suWPlua2iOaUtuiXjycgfSk7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgX3RoaXMzLiRhcHAuJGRlZi5wcm9tcHQuc2hvd1RvYXN0KHsgbWVzc2FnZTogJ+WPlua2iOaUtuiXj+Wksei0pScgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGNvbGxlY3Q6IGZ1bmN0aW9uIGNvbGxlY3QoaWQpIHtcbiAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgICgwLCBfY29sbGVjdC5jb2xsZWN0QXJ0aWNsZSkoaWQpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIF90aGlzNC5yZWZyZXNoKHsgcmVmcmVzaGluZzogdHJ1ZSB9KTtcbiAgICAgIF90aGlzNC4kYXBwLiRkZWYucHJvbXB0LnNob3dUb2FzdCh7IG1lc3NhZ2U6ICfmlLbol4/miJDlip9+JyB9KTtcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICBfdGhpczQuJGFwcC4kZGVmLnByb21wdC5zaG93VG9hc3QoeyBtZXNzYWdlOiAn5pS26JeP5aSx6LSl77yM55m75b2V5LmL5ZCO5omN5Y+v5pS26JePficgfSk7XG4gICAgfSk7XG4gIH0sXG4gIHNoYXJlTGluazogZnVuY3Rpb24gc2hhcmVMaW5rKHVybCkge1xuICAgIHRoaXMuJGFwcC4kZGVmLnNoYXJlLnNoYXJlKHtcbiAgICAgIHR5cGU6IFwidGV4dC9wbGFpblwiLFxuICAgICAgZGF0YTogdXJsXG4gICAgfSk7XG4gIH1cbn07XG52YXIgbW9kdWxlT3duID0gZXhwb3J0cy5kZWZhdWx0IHx8IG1vZHVsZS5leHBvcnRzO1xudmFyIGFjY2Vzc29ycyA9IFsncHVibGljJywgJ3Byb3RlY3RlZCcsICdwcml2YXRlJ107XG5pZiAobW9kdWxlT3duLmRhdGEgJiYgYWNjZXNzb3JzLnNvbWUoZnVuY3Rpb24gKGFjYykge1xuICAgIHJldHVybiBtb2R1bGVPd25bYWNjXTtcbiAgfSkpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCfpobXpnaJWTeWvueixoeS4reWxnuaAp2RhdGHkuI3lj6/kuI5wdWJsaWMsIHByb3RlY3RlZCwgcHJpdmF0ZeWQjOaXtuWtmOWcqO+8jOivt+S9v+eUqHB1YmxpY+abv+S7o2RhdGHvvIEnKTtcbn0gZWxzZSBpZiAoIW1vZHVsZU93bi5kYXRhKSB7XG4gIG1vZHVsZU93bi5kYXRhID0ge307XG4gIG1vZHVsZU93bi5fZGVzY3JpcHRvciA9IHt9O1xuICBhY2Nlc3NvcnMuZm9yRWFjaChmdW5jdGlvbihhY2MpIHtcbiAgICB2YXIgYWNjVHlwZSA9IHR5cGVvZiBtb2R1bGVPd25bYWNjXTtcbiAgICBpZiAoYWNjVHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIG1vZHVsZU93bi5kYXRhID0gT2JqZWN0LmFzc2lnbihtb2R1bGVPd24uZGF0YSwgbW9kdWxlT3duW2FjY10pO1xuICAgICAgZm9yICh2YXIgbmFtZSBpbiBtb2R1bGVPd25bYWNjXSkge1xuICAgICAgICBtb2R1bGVPd24uX2Rlc2NyaXB0b3JbbmFtZV0gPSB7YWNjZXNzIDogYWNjfTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGFjY1R5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUud2Fybign6aG16Z2iVk3lr7nosaHkuK3nmoTlsZ7mgKcnICsgYWNjICsgJ+eahOWAvOS4jeiDveS9v+WHveaVsO+8jOivt+S9v+eUqOWvueixoScpO1xuICAgIH1cbiAgfSk7XG59fVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLXNjcmlwdC1sb2FkZXIuanMhYzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtYWNjZXNzLWxvYWRlci5qcyFjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliP3ByZXNldHNbXT1jOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9iYWJlbC1wcmVzZXQtZW52JnByZXNldHM9YzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvYmFiZWwtcHJlc2V0LWVudiZwbHVnaW5zW109YzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvanN4LWxvYWRlci5qcyZwbHVnaW5zPWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2pzeC1sb2FkZXIuanMmY29tbWVudHM9ZmFsc2UhYzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vc3JjL0hvbWUvaG9tZS51eFxuLy8gbW9kdWxlIGlkID0gMzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IGFwaSBmcm9tICcuL2luZGV4JztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEJhbm5lcigpIHtcbiAgcmV0dXJuIGFwaS5nZXRCYW5uZXIoKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKEpTT04ucGFyc2UocmVzcG9uc2UuZGF0YSkuZGF0YSk7XG4gIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QXJ0aWNsZShwYWdlID0gMCkge1xuICByZXR1cm4gYXBpLmdldEFydGljbGUocGFnZSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShKU09OLnBhcnNlKHJlc3BvbnNlLmRhdGEpLmRhdGEpO1xuICB9KS5jYXRjaChlcnIgPT4ge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9Db21tb24vQXBpL2hvbWUuanNcbi8vIG1vZHVsZSBpZCA9IDM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciAkYXBwX3RlbXBsYXRlJCA9IHJlcXVpcmUoXCIhIWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWpzb24tbG9hZGVyLmpzIWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLXRlbXBsYXRlLWxvYWRlci5qcyFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL2NhdGVnb3J5LnV4XCIpXG52YXIgJGFwcF9zdHlsZSQgPSByZXF1aXJlKFwiISFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1qc29uLWxvYWRlci5qcyFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1zdHlsZS1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZTpcXFxcWGtXb3JrXFxcXEZhc3RBcHBXb3JrU3BhY2VcXFxcZmFzdGFwcFxcXFxjb20ueGsuZmFzdGFwcFxcXFxzcmNcXFxcQ2F0ZWdvcnlcXFxcY2F0ZWdvcnkudXghYzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWU6XFxcXFhrV29ya1xcXFxGYXN0QXBwV29ya1NwYWNlXFxcXGZhc3RhcHBcXFxcY29tLnhrLmZhc3RhcHBcXFxcc3JjXFxcXENhdGVnb3J5XFxcXGNhdGVnb3J5LnV4IS4vY2F0ZWdvcnkudXhcIilcbnZhciAkYXBwX3NjcmlwdCQgPSByZXF1aXJlKFwiISFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1zY3JpcHQtbG9hZGVyLmpzIWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWFjY2Vzcy1sb2FkZXIuanMhYzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcYmFiZWwtbG9hZGVyP3ByZXNldHNbXT1jOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxiYWJlbC1wcmVzZXQtZW52JnByZXNldHM9YzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcYmFiZWwtcHJlc2V0LWVudiZwbHVnaW5zW109YzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcanN4LWxvYWRlci5qcyZwbHVnaW5zPWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGpzeC1sb2FkZXIuanMmY29tbWVudHM9ZmFsc2UhYzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vY2F0ZWdvcnkudXhcIilcblxuJGFwcF9kZWZpbmUkKCdAYXBwLWNvbXBvbmVudC9jbGFzc2lmeScsIFtdLCBmdW5jdGlvbigkYXBwX3JlcXVpcmUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX21vZHVsZSQpe1xuICAgICAkYXBwX3NjcmlwdCQoJGFwcF9tb2R1bGUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX3JlcXVpcmUkKVxuICAgICBpZiAoJGFwcF9leHBvcnRzJC5fX2VzTW9kdWxlICYmICRhcHBfZXhwb3J0cyQuZGVmYXVsdCkge1xuICAgICAgICAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMgPSAkYXBwX2V4cG9ydHMkLmRlZmF1bHRcbiAgICAgICAgfVxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy50ZW1wbGF0ZSA9ICRhcHBfdGVtcGxhdGUkXG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnN0eWxlID0gJGFwcF9zdHlsZSRcbn0pXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9sb2FkZXIuanM/dHlwZT1jb21wb25lbnQhLi9zcmMvQ2F0ZWdvcnkvY2F0ZWdvcnkudXg/bmFtZT1jbGFzc2lmeVxuLy8gbW9kdWxlIGlkID0gMzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIFwidHlwZVwiOiBcImRpdlwiLFxuICBcImF0dHJcIjoge30sXG4gIFwiY2xhc3NMaXN0XCI6IFtcbiAgICBcImNsYXNzaWZ5LXBhZ2VcIlxuICBdLFxuICBcImNoaWxkcmVuXCI6IFtcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJjbGFzc2lmeVwiXG4gICAgICBdLFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwidmFsdWVcIjogXCLkuIDnuqfliIbnsbtcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJ0aXRsZVwiXG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwibGlzdFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcImNsYXNzaWZ5LWxpc3RcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImJsb2NrXCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJyZXBlYXRcIjoge1xuICAgICAgICAgICAgICAgIFwiZXhwXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gdGhpcy5jbGFzc2lmeUxpc3R9LFxuICAgICAgICAgICAgICAgIFwia2V5XCI6IFwiaW5kZXhcIixcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwiaXRlbVwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImxpc3QtaXRlbVwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwicGFyZW50XCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiY2xhc3NpZnktaXRlbVwiXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IGZ1bmN0aW9uIChldnQpIHt0aGlzLmNsaWNrUGFyZW50KHRoaXMuaW5kZXgsZXZ0KX1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuIHRoaXMuaXRlbS5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogZnVuY3Rpb24gKCkge3JldHVybiBbdGhpcy5wYXJlbnRJbmRleD09PXRoaXMuaW5kZXg/J2FjdGl2ZSc6J2NsYXNzaWZ5LXRleHQnXX1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gdGhpcy5jbGFzc2lmeUxpc3QubGVuZ3RoPjB9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcImNsYXNzaWZ5XCJcbiAgICAgIF0sXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuS6jOe6p+WIhuexu1wiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcInRpdGxlXCJcbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJsaXN0XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwiY2xhc3NpZnktbGlzdFwiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYmxvY2tcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcInJlcGVhdFwiOiB7XG4gICAgICAgICAgICAgICAgXCJleHBcIjogZnVuY3Rpb24gKCkge3JldHVybiB0aGlzLmNsYXNzaWZ5TGlzdFt0aGlzLnBhcmVudEluZGV4XS5jaGlsZHJlbn0sXG4gICAgICAgICAgICAgICAgXCJrZXlcIjogXCJpbmRleFwiLFxuICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCJpdGVtXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwibGlzdC1pdGVtXCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJjaGlsZHJlblwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcImNsYXNzaWZ5LWl0ZW1cIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBmdW5jdGlvbiAoZXZ0KSB7dGhpcy5jbGlja0NoaWxkcmVuKHRoaXMuaW5kZXgsZXZ0KX1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuIHRoaXMuaXRlbS5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogZnVuY3Rpb24gKCkge3JldHVybiBbdGhpcy5jaGlsZHJlbkluZGV4PT09dGhpcy5pbmRleD8nYWN0aXZlJzonY2xhc3NpZnktdGV4dCddfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJyZWZyZXNoXCIsXG4gICAgICBcImF0dHJcIjoge1xuICAgICAgICBcInJlZnJlc2hpbmdcIjogZnVuY3Rpb24gKCkge3JldHVybiB0aGlzLmlzUmVmcmVzaGluZ31cbiAgICAgIH0sXG4gICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgIFwicmVmcmVzaFwiOiBcInJlZnJlc2hcIlxuICAgICAgfSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwibGlzdFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcImFydGljbGUtbGlzdFwiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICBcInNjcm9sbGJvdHRvbVwiOiBcImxvYWRNb3JlRGF0YVwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYmxvY2tcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcInJlcGVhdFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuIHRoaXMuYXJ0aWNsZUxpc3R9LFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJsaXN0LWl0ZW1cIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImFydGljbGVcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJhcnRpY2xlLWl0ZW1cIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBmdW5jdGlvbiAoZXZ0KSB7dGhpcy5vcGVuQXJ0aWNsZSh0aGlzLiRpdGVtLmxpbmssdGhpcy4kaXRlbS5wcm9qZWN0TGluayx0aGlzLiRpdGVtLnRpdGxlLGV2dCl9LFxuICAgICAgICAgICAgICAgICAgICBcImxvbmdwcmVzc1wiOiBmdW5jdGlvbiAoZXZ0KSB7dGhpcy5zaGFyZUxpbmsodGhpcy4kaXRlbS5saW5rLGV2dCl9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImRpc3BsYXlcIjogXCJmbGV4XCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzaG93XCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gdGhpcy4kaXRlbS5mcmVzaH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuaWsFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRhZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gdGhpcy4kaXRlbS50aXRsZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dC10aXRsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZmxleFwiOiAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzcmNcIjogZnVuY3Rpb24gKCkge3JldHVybiB0aGlzLmNvbGxlY3RJY29uW3RoaXMuJGl0ZW0uY29sbGVjdD8xOjBdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiNTJweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiNTJweFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IGZ1bmN0aW9uIChldnQpIHt0aGlzLmNsaWNrQ29sbGVjdCh0aGlzLiRpdGVtLGV2dCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJhcnRpY2xlLXRpcFwiXG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAn5YiG57G7OiAnICsgKHRoaXMuJGl0ZW0uc3VwZXJDaGFwdGVyTmFtZSkgKyAnLycgKyAodGhpcy4kaXRlbS5jaGFwdGVyTmFtZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRpcFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJhcnRpY2xlLXRpcFwiXG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAn5L2c6ICFOiAnICsgKHRoaXMuJGl0ZW0uYXV0aG9yKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGlwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiB0aGlzLiRpdGVtLm5pY2VEYXRlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aW1lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwibGlzdC1pdGVtXCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwibG9hZE1vcmVcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgXCJsb2FkLW1vcmVcIlxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJwcm9ncmVzc1wiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiY2lyY3VsYXJcIixcbiAgICAgICAgICAgICAgICAgICAgXCJzaG93XCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gdGhpcy5oYXNNb3JlRGF0YX1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwic2hvd1wiOiBmdW5jdGlvbiAoKSB7cmV0dXJuIHRoaXMuaGFzTW9yZURhdGF9LFxuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5Yqg6L295pu05aSaXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwic2hvd1wiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICF0aGlzLmhhc01vcmVEYXRhfSxcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuayoeacieabtOWkmuS6hn5cIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgXVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWpzb24tbG9hZGVyLmpzIWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLXRlbXBsYXRlLWxvYWRlci5qcyFjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL3NyYy9DYXRlZ29yeS9jYXRlZ29yeS51eFxuLy8gbW9kdWxlIGlkID0gMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIFwiLmNsYXNzaWZ5LXBhZ2VcIjoge1xuICAgIFwiZGlzcGxheVwiOiBcImZsZXhcIixcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIlxuICB9LFxuICBcIi5jbGFzc2lmeVwiOiB7XG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiMTBweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMTBweFwiLFxuICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjEwcHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMTBweFwiXG4gIH0sXG4gIFwiLmNsYXNzaWZ5IC50aXRsZVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjE2MHB4XCIsXG4gICAgXCJfbWV0YVwiOiB7XG4gICAgICBcInJ1bGVEZWZcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0XCI6IFwiYVwiLFxuICAgICAgICAgIFwiblwiOiBcImNsYXNzXCIsXG4gICAgICAgICAgXCJpXCI6IGZhbHNlLFxuICAgICAgICAgIFwiYVwiOiBcImVsZW1lbnRcIixcbiAgICAgICAgICBcInZcIjogXCJjbGFzc2lmeVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInRcIjogXCJkXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidFwiOiBcImFcIixcbiAgICAgICAgICBcIm5cIjogXCJjbGFzc1wiLFxuICAgICAgICAgIFwiaVwiOiBmYWxzZSxcbiAgICAgICAgICBcImFcIjogXCJlbGVtZW50XCIsXG4gICAgICAgICAgXCJ2XCI6IFwidGl0bGVcIlxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICB9LFxuICBcIi5jbGFzc2lmeSAuY2xhc3NpZnktbGlzdFwiOiB7XG4gICAgXCJkaXNwbGF5XCI6IFwiZmxleFwiLFxuICAgIFwiZmxleERpcmVjdGlvblwiOiBcInJvd1wiLFxuICAgIFwiaGVpZ2h0XCI6IFwiNjBweFwiLFxuICAgIFwiX21ldGFcIjoge1xuICAgICAgXCJydWxlRGVmXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidFwiOiBcImFcIixcbiAgICAgICAgICBcIm5cIjogXCJjbGFzc1wiLFxuICAgICAgICAgIFwiaVwiOiBmYWxzZSxcbiAgICAgICAgICBcImFcIjogXCJlbGVtZW50XCIsXG4gICAgICAgICAgXCJ2XCI6IFwiY2xhc3NpZnlcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0XCI6IFwiZFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInRcIjogXCJhXCIsXG4gICAgICAgICAgXCJuXCI6IFwiY2xhc3NcIixcbiAgICAgICAgICBcImlcIjogZmFsc2UsXG4gICAgICAgICAgXCJhXCI6IFwiZWxlbWVudFwiLFxuICAgICAgICAgIFwidlwiOiBcImNsYXNzaWZ5LWxpc3RcIlxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICB9LFxuICBcIi5jbGFzc2lmeS1pdGVtIC5jbGFzc2lmeS10ZXh0XCI6IHtcbiAgICBcInBhZGRpbmdUb3BcIjogXCIxMHB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIxMHB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMTBweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCIxMHB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiMyZTMxMzVcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjVweFwiLFxuICAgIFwiX21ldGFcIjoge1xuICAgICAgXCJydWxlRGVmXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidFwiOiBcImFcIixcbiAgICAgICAgICBcIm5cIjogXCJjbGFzc1wiLFxuICAgICAgICAgIFwiaVwiOiBmYWxzZSxcbiAgICAgICAgICBcImFcIjogXCJlbGVtZW50XCIsXG4gICAgICAgICAgXCJ2XCI6IFwiY2xhc3NpZnktaXRlbVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInRcIjogXCJkXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidFwiOiBcImFcIixcbiAgICAgICAgICBcIm5cIjogXCJjbGFzc1wiLFxuICAgICAgICAgIFwiaVwiOiBmYWxzZSxcbiAgICAgICAgICBcImFcIjogXCJlbGVtZW50XCIsXG4gICAgICAgICAgXCJ2XCI6IFwiY2xhc3NpZnktdGV4dFwiXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIH0sXG4gIFwiLmNsYXNzaWZ5LWl0ZW0gLmFjdGl2ZVwiOiB7XG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiMTBweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMTBweFwiLFxuICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjEwcHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMTBweFwiLFxuICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjMjRiOWZmXCIsXG4gICAgXCJib3JkZXJSYWRpdXNcIjogXCI1cHhcIixcbiAgICBcIl9tZXRhXCI6IHtcbiAgICAgIFwicnVsZURlZlwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInRcIjogXCJhXCIsXG4gICAgICAgICAgXCJuXCI6IFwiY2xhc3NcIixcbiAgICAgICAgICBcImlcIjogZmFsc2UsXG4gICAgICAgICAgXCJhXCI6IFwiZWxlbWVudFwiLFxuICAgICAgICAgIFwidlwiOiBcImNsYXNzaWZ5LWl0ZW1cIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0XCI6IFwiZFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInRcIjogXCJhXCIsXG4gICAgICAgICAgXCJuXCI6IFwiY2xhc3NcIixcbiAgICAgICAgICBcImlcIjogZmFsc2UsXG4gICAgICAgICAgXCJhXCI6IFwiZWxlbWVudFwiLFxuICAgICAgICAgIFwidlwiOiBcImFjdGl2ZVwiXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIH0sXG4gIFwiLmFydGljbGUtbGlzdFwiOiB7XG4gICAgXCJmbGV4XCI6IDFcbiAgfSxcbiAgXCIuYXJ0aWNsZS1pdGVtXCI6IHtcbiAgICBcInBhZGRpbmdUb3BcIjogXCIyMHB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIyMHB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMjBweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCIyMHB4XCIsXG4gICAgXCJkaXNwbGF5XCI6IFwiZmxleFwiLFxuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwiYm9yZGVyQm90dG9tV2lkdGhcIjogXCIxcHhcIixcbiAgICBcImJvcmRlckJvdHRvbUNvbG9yXCI6IFwiI2VlZWVlZVwiXG4gIH0sXG4gIFwiLnRleHQtdGlwXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwicGFkZGluZ1RvcFwiOiBcIjIwcHhcIixcbiAgICBcInBhZGRpbmdSaWdodFwiOiBcIjEwcHhcIixcbiAgICBcInBhZGRpbmdCb3R0b21cIjogXCIyMHB4XCIsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjEwcHhcIixcbiAgICBcImJvcmRlckJvdHRvbVdpZHRoXCI6IFwiMXB4XCIsXG4gICAgXCJib3JkZXJCb3R0b21Db2xvclwiOiBcIiNlZWVlZWVcIlxuICB9LFxuICBcIi5hcnRpY2xlLWl0ZW0gLnRleHQtdGl0bGVcIjoge1xuICAgIFwiZm9udFNpemVcIjogXCIzMHB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiMyZTMxMzVcIixcbiAgICBcInRleHRPdmVyZmxvd1wiOiBcImVsbGlwc2lzXCIsXG4gICAgXCJsaW5lc1wiOiAxLFxuICAgIFwibWFyZ2luQm90dG9tXCI6IFwiNXB4XCIsXG4gICAgXCJfbWV0YVwiOiB7XG4gICAgICBcInJ1bGVEZWZcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0XCI6IFwiYVwiLFxuICAgICAgICAgIFwiblwiOiBcImNsYXNzXCIsXG4gICAgICAgICAgXCJpXCI6IGZhbHNlLFxuICAgICAgICAgIFwiYVwiOiBcImVsZW1lbnRcIixcbiAgICAgICAgICBcInZcIjogXCJhcnRpY2xlLWl0ZW1cIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0XCI6IFwiZFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInRcIjogXCJhXCIsXG4gICAgICAgICAgXCJuXCI6IFwiY2xhc3NcIixcbiAgICAgICAgICBcImlcIjogZmFsc2UsXG4gICAgICAgICAgXCJhXCI6IFwiZWxlbWVudFwiLFxuICAgICAgICAgIFwidlwiOiBcInRleHQtdGl0bGVcIlxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICB9LFxuICBcIi5hcnRpY2xlLWl0ZW0gLmFydGljbGUtdGlwXCI6IHtcbiAgICBcImRpc3BsYXlcIjogXCJmbGV4XCIsXG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwicm93XCIsXG4gICAgXCJfbWV0YVwiOiB7XG4gICAgICBcInJ1bGVEZWZcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0XCI6IFwiYVwiLFxuICAgICAgICAgIFwiblwiOiBcImNsYXNzXCIsXG4gICAgICAgICAgXCJpXCI6IGZhbHNlLFxuICAgICAgICAgIFwiYVwiOiBcImVsZW1lbnRcIixcbiAgICAgICAgICBcInZcIjogXCJhcnRpY2xlLWl0ZW1cIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0XCI6IFwiZFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInRcIjogXCJhXCIsXG4gICAgICAgICAgXCJuXCI6IFwiY2xhc3NcIixcbiAgICAgICAgICBcImlcIjogZmFsc2UsXG4gICAgICAgICAgXCJhXCI6IFwiZWxlbWVudFwiLFxuICAgICAgICAgIFwidlwiOiBcImFydGljbGUtdGlwXCJcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgfSxcbiAgXCIuYXJ0aWNsZS10aXAgLnRpcFwiOiB7XG4gICAgXCJmb250U2l6ZVwiOiBcIjI2cHhcIixcbiAgICBcImNvbG9yXCI6IFwiIzk5OTk5OVwiLFxuICAgIFwiX21ldGFcIjoge1xuICAgICAgXCJydWxlRGVmXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidFwiOiBcImFcIixcbiAgICAgICAgICBcIm5cIjogXCJjbGFzc1wiLFxuICAgICAgICAgIFwiaVwiOiBmYWxzZSxcbiAgICAgICAgICBcImFcIjogXCJlbGVtZW50XCIsXG4gICAgICAgICAgXCJ2XCI6IFwiYXJ0aWNsZS10aXBcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0XCI6IFwiZFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInRcIjogXCJhXCIsXG4gICAgICAgICAgXCJuXCI6IFwiY2xhc3NcIixcbiAgICAgICAgICBcImlcIjogZmFsc2UsXG4gICAgICAgICAgXCJhXCI6IFwiZWxlbWVudFwiLFxuICAgICAgICAgIFwidlwiOiBcInRpcFwiXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIH0sXG4gIFwiLmFydGljbGUtdGlwIC50aW1lXCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiMjZweFwiLFxuICAgIFwiY29sb3JcIjogXCIjOTk5OTk5XCIsXG4gICAgXCJfbWV0YVwiOiB7XG4gICAgICBcInJ1bGVEZWZcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0XCI6IFwiYVwiLFxuICAgICAgICAgIFwiblwiOiBcImNsYXNzXCIsXG4gICAgICAgICAgXCJpXCI6IGZhbHNlLFxuICAgICAgICAgIFwiYVwiOiBcImVsZW1lbnRcIixcbiAgICAgICAgICBcInZcIjogXCJhcnRpY2xlLXRpcFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInRcIjogXCJkXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidFwiOiBcImFcIixcbiAgICAgICAgICBcIm5cIjogXCJjbGFzc1wiLFxuICAgICAgICAgIFwiaVwiOiBmYWxzZSxcbiAgICAgICAgICBcImFcIjogXCJlbGVtZW50XCIsXG4gICAgICAgICAgXCJ2XCI6IFwidGltZVwiXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIH0sXG4gIFwiLnRpbWVcIjoge1xuICAgIFwiZmxleFwiOiAxLFxuICAgIFwidGV4dEFsaWduXCI6IFwicmlnaHRcIlxuICB9LFxuICBcIi50YWdcIjoge1xuICAgIFwiZm9udFNpemVcIjogXCIyMnB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiNGRjAwMDBcIixcbiAgICBcImJvcmRlclRvcFdpZHRoXCI6IFwiMXB4XCIsXG4gICAgXCJib3JkZXJSaWdodFdpZHRoXCI6IFwiMXB4XCIsXG4gICAgXCJib3JkZXJCb3R0b21XaWR0aFwiOiBcIjFweFwiLFxuICAgIFwiYm9yZGVyTGVmdFdpZHRoXCI6IFwiMXB4XCIsXG4gICAgXCJib3JkZXJUb3BDb2xvclwiOiBcIiNGRjAwMDBcIixcbiAgICBcImJvcmRlclJpZ2h0Q29sb3JcIjogXCIjRkYwMDAwXCIsXG4gICAgXCJib3JkZXJCb3R0b21Db2xvclwiOiBcIiNGRjAwMDBcIixcbiAgICBcImJvcmRlckxlZnRDb2xvclwiOiBcIiNGRjAwMDBcIixcbiAgICBcIm1hcmdpblJpZ2h0XCI6IFwiMTBweFwiLFxuICAgIFwicGFkZGluZ1RvcFwiOiBcIjJweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMnB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMnB4XCIsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjJweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMzJweFwiXG4gIH0sXG4gIFwiLmxvYWQtbW9yZVwiOiB7XG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiMjBweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMjBweFwiLFxuICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjIwcHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMjBweFwiLFxuICAgIFwiZGlzcGxheVwiOiBcImZsZXhcIixcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJyb3dcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCJcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWpzb24tbG9hZGVyLmpzIWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLXN0eWxlLWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1lOi9Ya1dvcmsvRmFzdEFwcFdvcmtTcGFjZS9mYXN0YXBwL2NvbS54ay5mYXN0YXBwL3NyYy9DYXRlZ29yeS9jYXRlZ29yeS51eCFjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZTovWGtXb3JrL0Zhc3RBcHBXb3JrU3BhY2UvZmFzdGFwcC9jb20ueGsuZmFzdGFwcC9zcmMvQ2F0ZWdvcnkvY2F0ZWdvcnkudXghLi9zcmMvQ2F0ZWdvcnkvY2F0ZWdvcnkudXhcbi8vIG1vZHVsZSBpZCA9IDM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCAkYXBwX3JlcXVpcmUkKXsndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY2xhc3NpZnkgPSByZXF1aXJlKCcuLi9Db21tb24vQXBpL2NsYXNzaWZ5Jyk7XG5cbnZhciBfY29sbGVjdCA9IHJlcXVpcmUoJy4uL0NvbW1vbi9BcGkvY29sbGVjdCcpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSB7XG4gIGRhdGE6IHtcbiAgICBjbGFzc2lmeUxpc3Q6IFtdLFxuICAgIHBhcmVudEluZGV4OiAwLFxuICAgIGNoaWxkcmVuSW5kZXg6IDAsXG4gICAgYXJ0aWNsZUxpc3Q6IFtdLFxuICAgIHBhZ2U6IDAsXG4gICAgY2lkOiAnJyxcbiAgICBoYXNNb3JlRGF0YTogdHJ1ZSxcbiAgICBpc1JlZnJlc2hpbmc6IGZhbHNlLFxuICAgIGNvbGxlY3RJY29uOiBbJy4uL0NvbW1vbi9JbWFnZS9pY29uX3VuY29sbGVjdC5wbmcnLCAnLi4vQ29tbW9uL0ltYWdlL2ljb25fY29sbGVjdC5wbmcnXVxuICB9LFxuICBvbkluaXQ6IGZ1bmN0aW9uIG9uSW5pdCgpIHtcbiAgICB0aGlzLmdldENsYXNzaWZ5TGlzdCgpO1xuICB9LFxuICBnZXRDbGFzc2lmeUxpc3Q6IGZ1bmN0aW9uIGdldENsYXNzaWZ5TGlzdCgpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgKDAsIF9jbGFzc2lmeS5nZXRDbGFzc2lmeUxpc3QpKCkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgX3RoaXMuY2xhc3NpZnlMaXN0ID0gZGF0YTtcbiAgICAgIF90aGlzLmNsaWNrUGFyZW50KDApO1xuICAgIH0pO1xuICB9LFxuICBjbGlja1BhcmVudDogZnVuY3Rpb24gY2xpY2tQYXJlbnQoaW5kZXgpIHtcbiAgICB0aGlzLnBhcmVudEluZGV4ID0gaW5kZXg7XG4gICAgdGhpcy5jbGlja0NoaWxkcmVuKDApO1xuICB9LFxuICBjbGlja0NoaWxkcmVuOiBmdW5jdGlvbiBjbGlja0NoaWxkcmVuKGluZGV4KSB7XG4gICAgdGhpcy5jaGlsZHJlbkluZGV4ID0gaW5kZXg7XG4gICAgdGhpcy5jaWQgPSB0aGlzLmNsYXNzaWZ5TGlzdFt0aGlzLnBhcmVudEluZGV4XS5jaGlsZHJlblt0aGlzLmNoaWxkcmVuSW5kZXhdLmlkO1xuICAgIHRoaXMucGFnZSA9IDA7XG4gICAgdGhpcy5pc1JlZnJlc2hpbmcgPSB0cnVlO1xuICAgIHRoaXMuZ2V0QXJ0aWNsZSgpO1xuICB9LFxuICBnZXRBcnRpY2xlOiBmdW5jdGlvbiBnZXRBcnRpY2xlKCkge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgKDAsIF9jbGFzc2lmeS5nZXRBcnRpY2xlQnlDbGFzc2lmeSkodGhpcy5wYWdlLCB0aGlzLmNpZCkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgX3RoaXMyLmhhc01vcmVEYXRhID0gIWRhdGEub3ZlcjtcbiAgICAgIGlmIChfdGhpczIucGFnZSA+IDApIHtcbiAgICAgICAgX3RoaXMyLmFydGljbGVMaXN0ID0gX3RoaXMyLmFydGljbGVMaXN0LmNvbmNhdChkYXRhLmRhdGFzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF90aGlzMi5pc1JlZnJlc2hpbmcgPSBmYWxzZTtcbiAgICAgICAgX3RoaXMyLmFydGljbGVMaXN0ID0gZGF0YS5kYXRhcztcbiAgICAgIH1cbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICBfdGhpczIuaXNSZWZyZXNoaW5nID0gZmFsc2U7XG4gICAgfSk7XG4gIH0sXG4gIGxvYWRNb3JlRGF0YTogZnVuY3Rpb24gbG9hZE1vcmVEYXRhKCkge1xuICAgIGlmICh0aGlzLmhhc01vcmVEYXRhKSB7XG4gICAgICB0aGlzLnBhZ2UrKztcbiAgICAgIHRoaXMuZ2V0QXJ0aWNsZSgpO1xuICAgIH1cbiAgfSxcbiAgb3BlbkFydGljbGU6IGZ1bmN0aW9uIG9wZW5BcnRpY2xlKGxpbmssIHByb2plY3RMaW5rLCB0aXRsZSkge1xuICAgIHZhciB1cmwgPSBwcm9qZWN0TGluayA9PT0gJycgPyBsaW5rIDogcHJvamVjdExpbms7XG4gICAgaWYgKHVybCAhPT0gJycpIHtcbiAgICAgIHRoaXMuJGFwcC4kZGVmLnJvdXRlci5wdXNoKHtcbiAgICAgICAgdXJpOiAnV2VidmlldycsXG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgICB1cmw6IHVybFxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIHJlZnJlc2g6IGZ1bmN0aW9uIHJlZnJlc2goZXZ0KSB7XG4gICAgdGhpcy5pc1JlZnJlc2hpbmcgPSBldnQucmVmcmVzaGluZztcbiAgICB0aGlzLnBhZ2UgPSAwO1xuICAgIHRoaXMuZ2V0QXJ0aWNsZSgpO1xuICB9LFxuICBjbGlja0NvbGxlY3Q6IGZ1bmN0aW9uIGNsaWNrQ29sbGVjdChpdGVtKSB7XG4gICAgaWYgKGl0ZW0uY29sbGVjdCkge1xuICAgICAgdGhpcy51bmNvbGxlY3QoaXRlbS5pZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29sbGVjdChpdGVtLmlkKTtcbiAgICB9XG4gIH0sXG4gIHVuY29sbGVjdDogZnVuY3Rpb24gdW5jb2xsZWN0KGlkKSB7XG4gICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAoMCwgX2NvbGxlY3QudW5jb2xsZWN0QXJ0aWNsZSkoaWQpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIF90aGlzMy5yZWZyZXNoKHsgcmVmcmVzaGluZzogdHJ1ZSB9KTtcbiAgICAgIF90aGlzMy4kYXBwLiRkZWYucHJvbXB0LnNob3dUb2FzdCh7IG1lc3NhZ2U6ICflt7Llj5bmtojmlLbol48nIH0pO1xuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgIF90aGlzMy4kYXBwLiRkZWYucHJvbXB0LnNob3dUb2FzdCh7IG1lc3NhZ2U6ICflj5bmtojmlLbol4/lpLHotKUnIH0pO1xuICAgIH0pO1xuICB9LFxuICBjb2xsZWN0OiBmdW5jdGlvbiBjb2xsZWN0KGlkKSB7XG4gICAgdmFyIF90aGlzNCA9IHRoaXM7XG5cbiAgICAoMCwgX2NvbGxlY3QuY29sbGVjdEFydGljbGUpKGlkKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICBfdGhpczQucmVmcmVzaCh7IHJlZnJlc2hpbmc6IHRydWUgfSk7XG4gICAgICBfdGhpczQuJGFwcC4kZGVmLnByb21wdC5zaG93VG9hc3QoeyBtZXNzYWdlOiAn5pS26JeP5oiQ5YqfficgfSk7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgX3RoaXM0LiRhcHAuJGRlZi5wcm9tcHQuc2hvd1RvYXN0KHsgbWVzc2FnZTogJ+aUtuiXj+Wksei0pe+8jOeZu+W9leS5i+WQjuaJjeWPr+aUtuiXj34nIH0pO1xuICAgIH0pO1xuICB9LFxuICBzaGFyZUxpbms6IGZ1bmN0aW9uIHNoYXJlTGluayh1cmwpIHtcbiAgICB0aGlzLiRhcHAuJGRlZi5zaGFyZS5zaGFyZSh7XG4gICAgICB0eXBlOiBcInRleHQvcGxhaW5cIixcbiAgICAgIGRhdGE6IHVybFxuICAgIH0pO1xuICB9XG59O1xudmFyIG1vZHVsZU93biA9IGV4cG9ydHMuZGVmYXVsdCB8fCBtb2R1bGUuZXhwb3J0cztcbnZhciBhY2Nlc3NvcnMgPSBbJ3B1YmxpYycsICdwcm90ZWN0ZWQnLCAncHJpdmF0ZSddO1xuaWYgKG1vZHVsZU93bi5kYXRhICYmIGFjY2Vzc29ycy5zb21lKGZ1bmN0aW9uIChhY2MpIHtcbiAgICByZXR1cm4gbW9kdWxlT3duW2FjY107XG4gIH0pKSB7XG4gIHRocm93IG5ldyBFcnJvcign6aG16Z2iVk3lr7nosaHkuK3lsZ7mgKdkYXRh5LiN5Y+v5LiOcHVibGljLCBwcm90ZWN0ZWQsIHByaXZhdGXlkIzml7blrZjlnKjvvIzor7fkvb/nlKhwdWJsaWPmm7/ku6NkYXRh77yBJyk7XG59IGVsc2UgaWYgKCFtb2R1bGVPd24uZGF0YSkge1xuICBtb2R1bGVPd24uZGF0YSA9IHt9O1xuICBtb2R1bGVPd24uX2Rlc2NyaXB0b3IgPSB7fTtcbiAgYWNjZXNzb3JzLmZvckVhY2goZnVuY3Rpb24oYWNjKSB7XG4gICAgdmFyIGFjY1R5cGUgPSB0eXBlb2YgbW9kdWxlT3duW2FjY107XG4gICAgaWYgKGFjY1R5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBtb2R1bGVPd24uZGF0YSA9IE9iamVjdC5hc3NpZ24obW9kdWxlT3duLmRhdGEsIG1vZHVsZU93blthY2NdKTtcbiAgICAgIGZvciAodmFyIG5hbWUgaW4gbW9kdWxlT3duW2FjY10pIHtcbiAgICAgICAgbW9kdWxlT3duLl9kZXNjcmlwdG9yW25hbWVdID0ge2FjY2VzcyA6IGFjY307XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChhY2NUeXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ+mhtemdolZN5a+56LGh5Lit55qE5bGe5oCnJyArIGFjYyArICfnmoTlgLzkuI3og73kvb/lh73mlbDvvIzor7fkvb/nlKjlr7nosaEnKTtcbiAgICB9XG4gIH0pO1xufX1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1zY3JpcHQtbG9hZGVyLmpzIWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWFjY2Vzcy1sb2FkZXIuanMhYzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYj9wcmVzZXRzW109YzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvYmFiZWwtcHJlc2V0LWVudiZwcmVzZXRzPWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2JhYmVsLXByZXNldC1lbnYmcGx1Z2luc1tdPWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2pzeC1sb2FkZXIuanMmcGx1Z2lucz1jOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9qc3gtbG9hZGVyLmpzJmNvbW1lbnRzPWZhbHNlIWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyEuL3NyYy9DYXRlZ29yeS9jYXRlZ29yeS51eFxuLy8gbW9kdWxlIGlkID0gMzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IGFwaSBmcm9tICcuL2luZGV4JztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldENsYXNzaWZ5TGlzdCgpIHtcbiAgcmV0dXJuIGFwaS5nZXRDbGFzc2lmeUxpc3QoKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKEpTT04ucGFyc2UocmVzcG9uc2UuZGF0YSkuZGF0YSk7XG4gIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QXJ0aWNsZUJ5Q2xhc3NpZnkocGFnZSA9IDAsIGNpZCkge1xuICByZXR1cm4gYXBpLmdldEFydGljbGVCeUNsYXNzaWZ5KHBhZ2UsIGNpZCkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShKU09OLnBhcnNlKHJlc3BvbnNlLmRhdGEpLmRhdGEpO1xuICB9KS5jYXRjaChlcnIgPT4ge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9Db21tb24vQXBpL2NsYXNzaWZ5LmpzXG4vLyBtb2R1bGUgaWQgPSAzOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKFwiISFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxsb2FkZXIuanM/dHlwZT1jb21wb25lbnQhLi4vQXV0aC9sb2dpbi51eD9uYW1lPWxvZ2luXCIpXG5yZXF1aXJlKFwiISFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxsb2FkZXIuanM/dHlwZT1jb21wb25lbnQhLi4vQXV0aC9yZWdpc3Rlci51eD9uYW1lPXJlZ2lzdGVyXCIpXG5yZXF1aXJlKFwiISFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxsb2FkZXIuanM/dHlwZT1jb21wb25lbnQhLi4vQ29tbW9uL0NvbXBvbmVudC9DRGlhbG9nL2RpYWxvZy51eD9uYW1lPWMtZGlhbG9nXCIpXG52YXIgJGFwcF90ZW1wbGF0ZSQgPSByZXF1aXJlKFwiISFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1qc29uLWxvYWRlci5qcyFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS10ZW1wbGF0ZS1sb2FkZXIuanMhYzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT10ZW1wbGF0ZXMhLi9wcm9maWxlLnV4XCIpXG52YXIgJGFwcF9zdHlsZSQgPSByZXF1aXJlKFwiISFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1qc29uLWxvYWRlci5qcyFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1zdHlsZS1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZTpcXFxcWGtXb3JrXFxcXEZhc3RBcHBXb3JrU3BhY2VcXFxcZmFzdGFwcFxcXFxjb20ueGsuZmFzdGFwcFxcXFxzcmNcXFxcUHJvZmlsZVxcXFxwcm9maWxlLnV4IWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1lOlxcXFxYa1dvcmtcXFxcRmFzdEFwcFdvcmtTcGFjZVxcXFxmYXN0YXBwXFxcXGNvbS54ay5mYXN0YXBwXFxcXHNyY1xcXFxQcm9maWxlXFxcXHByb2ZpbGUudXghLi9wcm9maWxlLnV4XCIpXG52YXIgJGFwcF9zY3JpcHQkID0gcmVxdWlyZShcIiEhYzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtc2NyaXB0LWxvYWRlci5qcyFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1hY2Nlc3MtbG9hZGVyLmpzIWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGJhYmVsLWxvYWRlcj9wcmVzZXRzW109YzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcYmFiZWwtcHJlc2V0LWVudiZwcmVzZXRzPWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGJhYmVsLXByZXNldC1lbnYmcGx1Z2luc1tdPWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGpzeC1sb2FkZXIuanMmcGx1Z2lucz1jOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxqc3gtbG9hZGVyLmpzJmNvbW1lbnRzPWZhbHNlIWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyEuL3Byb2ZpbGUudXhcIilcblxuJGFwcF9kZWZpbmUkKCdAYXBwLWNvbXBvbmVudC9tZScsIFtdLCBmdW5jdGlvbigkYXBwX3JlcXVpcmUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX21vZHVsZSQpe1xuICAgICAkYXBwX3NjcmlwdCQoJGFwcF9tb2R1bGUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX3JlcXVpcmUkKVxuICAgICBpZiAoJGFwcF9leHBvcnRzJC5fX2VzTW9kdWxlICYmICRhcHBfZXhwb3J0cyQuZGVmYXVsdCkge1xuICAgICAgICAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMgPSAkYXBwX2V4cG9ydHMkLmRlZmF1bHRcbiAgICAgICAgfVxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy50ZW1wbGF0ZSA9ICRhcHBfdGVtcGxhdGUkXG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnN0eWxlID0gJGFwcF9zdHlsZSRcbn0pXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9sb2FkZXIuanM/dHlwZT1jb21wb25lbnQhLi9zcmMvUHJvZmlsZS9wcm9maWxlLnV4P25hbWU9bWVcbi8vIG1vZHVsZSBpZCA9IDQwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoXCIhIWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGxvYWRlci5qcz90eXBlPWNvbXBvbmVudCEuLi9Db21tb24vQ29tcG9uZW50L0NJbnB1dC9pbmRleC51eD9uYW1lPWMtaW5wdXRcIilcbnZhciAkYXBwX3RlbXBsYXRlJCA9IHJlcXVpcmUoXCIhIWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWpzb24tbG9hZGVyLmpzIWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLXRlbXBsYXRlLWxvYWRlci5qcyFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL2xvZ2luLnV4XCIpXG52YXIgJGFwcF9zdHlsZSQgPSByZXF1aXJlKFwiISFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1qc29uLWxvYWRlci5qcyFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1zdHlsZS1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZTpcXFxcWGtXb3JrXFxcXEZhc3RBcHBXb3JrU3BhY2VcXFxcZmFzdGFwcFxcXFxjb20ueGsuZmFzdGFwcFxcXFxzcmNcXFxcQXV0aFxcXFxsb2dpbi51eCFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZTpcXFxcWGtXb3JrXFxcXEZhc3RBcHBXb3JrU3BhY2VcXFxcZmFzdGFwcFxcXFxjb20ueGsuZmFzdGFwcFxcXFxzcmNcXFxcQXV0aFxcXFxsb2dpbi51eCEuL2xvZ2luLnV4XCIpXG52YXIgJGFwcF9zY3JpcHQkID0gcmVxdWlyZShcIiEhYzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtc2NyaXB0LWxvYWRlci5qcyFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1hY2Nlc3MtbG9hZGVyLmpzIWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGJhYmVsLWxvYWRlcj9wcmVzZXRzW109YzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcYmFiZWwtcHJlc2V0LWVudiZwcmVzZXRzPWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGJhYmVsLXByZXNldC1lbnYmcGx1Z2luc1tdPWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGpzeC1sb2FkZXIuanMmcGx1Z2lucz1jOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxqc3gtbG9hZGVyLmpzJmNvbW1lbnRzPWZhbHNlIWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyEuL2xvZ2luLnV4XCIpXG5cbiRhcHBfZGVmaW5lJCgnQGFwcC1jb21wb25lbnQvbG9naW4nLCBbXSwgZnVuY3Rpb24oJGFwcF9yZXF1aXJlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9tb2R1bGUkKXtcbiAgICAgJGFwcF9zY3JpcHQkKCRhcHBfbW9kdWxlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9yZXF1aXJlJClcbiAgICAgaWYgKCRhcHBfZXhwb3J0cyQuX19lc01vZHVsZSAmJiAkYXBwX2V4cG9ydHMkLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICRhcHBfbW9kdWxlJC5leHBvcnRzID0gJGFwcF9leHBvcnRzJC5kZWZhdWx0XG4gICAgICAgIH1cbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMudGVtcGxhdGUgPSAkYXBwX3RlbXBsYXRlJFxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy5zdHlsZSA9ICRhcHBfc3R5bGUkXG59KVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gYzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50IS4vc3JjL0F1dGgvbG9naW4udXg/bmFtZT1sb2dpblxuLy8gbW9kdWxlIGlkID0gNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIFwidHlwZVwiOiBcImRpdlwiLFxuICBcImF0dHJcIjoge30sXG4gIFwiY2xhc3NMaXN0XCI6IFtcbiAgICBcImxvZ2luLXBhZ2VcIlxuICBdLFxuICBcImNoaWxkcmVuXCI6IFtcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICBcImF0dHJcIjoge1xuICAgICAgICBcInZhbHVlXCI6IFwi6K+35YWI55m75b2VXCJcbiAgICAgIH0sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwibG9naW4tdGlwXCJcbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImMtaW5wdXRcIixcbiAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgIFwibGFiZWxcIjogXCLnlKjmiLflkI1cIixcbiAgICAgICAgXCJjbGVhcmFibGVcIjogXCJ0cnVlXCIsXG4gICAgICAgIFwicGxhY2Vob2xkZXJcIjogXCLor7fovpPlhaXnlKjmiLflkI1cIlxuICAgICAgfSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJpbnB1dC1ib3JkZXJcIlxuICAgICAgXSxcbiAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgXCJpbnB1dFwiOiBcIm9uSW5wdXRVc2VybmFtZVwiXG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJjLWlucHV0XCIsXG4gICAgICBcImF0dHJcIjoge1xuICAgICAgICBcImxhYmVsXCI6IFwi5a+G56CBXCIsXG4gICAgICAgIFwiY2xlYXJhYmxlXCI6IFwidHJ1ZVwiLFxuICAgICAgICBcInBsYWNlaG9sZGVyXCI6IFwi6K+36L6T5YWl5a+G56CBXCIsXG4gICAgICAgIFwidHlwZVwiOiBcInBhc3N3b3JkXCJcbiAgICAgIH0sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwiaW5wdXQtYm9yZGVyXCJcbiAgICAgIF0sXG4gICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgIFwiaW5wdXRcIjogXCJvbklucHV0UGFzc3dvcmRcIlxuICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgXCJ2YWx1ZVwiOiBcIueZu+W9lVwiXG4gICAgICB9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcImxvZ2luLWJ0blwiXG4gICAgICBdLFxuICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICBcImNsaWNrXCI6IFwibG9naW5cIlxuICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgXCJ2YWx1ZVwiOiBcIuayoeaciei0puWPt++8n+WOu+azqOWGjOS4gOS4qlwiXG4gICAgICB9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcInJlZ2lzdGVyLXRleHRcIlxuICAgICAgXSxcbiAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgXCJjbGlja1wiOiBcInRvUmVnaXN0ZXJcIlxuICAgICAgfVxuICAgIH1cbiAgXVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWpzb24tbG9hZGVyLmpzIWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLXRlbXBsYXRlLWxvYWRlci5qcyFjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL3NyYy9BdXRoL2xvZ2luLnV4XG4vLyBtb2R1bGUgaWQgPSA0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgXCIubG9naW4tcGFnZVwiOiB7XG4gICAgXCJkaXNwbGF5XCI6IFwiZmxleFwiLFxuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiXG4gIH0sXG4gIFwiLmxvZ2luLXRpcFwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImhlaWdodFwiOiBcIjEwMHB4XCIsXG4gICAgXCJ0ZXh0QWxpZ25cIjogXCJjZW50ZXJcIixcbiAgICBcImJvcmRlckJvdHRvbVdpZHRoXCI6IFwiMXB4XCIsXG4gICAgXCJib3JkZXJCb3R0b21Db2xvclwiOiBcIiNlZWVlZWVcIlxuICB9LFxuICBcIi5pbnB1dC1ib3JkZXJcIjoge1xuICAgIFwiYm9yZGVyQm90dG9tV2lkdGhcIjogXCIxcHhcIixcbiAgICBcImJvcmRlckJvdHRvbUNvbG9yXCI6IFwiI2VlZWVlZVwiXG4gIH0sXG4gIFwiLmxvZ2luLWJ0blwiOiB7XG4gICAgXCJoZWlnaHRcIjogXCI4MHB4XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiLFxuICAgIFwibWFyZ2luVG9wXCI6IFwiNTBweFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiIzI0YjlmZlwiLFxuICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCJcbiAgfSxcbiAgXCIucmVnaXN0ZXItdGV4dFwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImhlaWdodFwiOiBcIjUwcHhcIixcbiAgICBcIm1hcmdpblRvcFwiOiBcIjIwcHhcIixcbiAgICBcImZvbnRTaXplXCI6IFwiMjJweFwiLFxuICAgIFwidGV4dEFsaWduXCI6IFwicmlnaHRcIixcbiAgICBcInBhZGRpbmdUb3BcIjogXCIxMHB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIxMHB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMTBweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCIxMHB4XCJcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWpzb24tbG9hZGVyLmpzIWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLXN0eWxlLWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1lOi9Ya1dvcmsvRmFzdEFwcFdvcmtTcGFjZS9mYXN0YXBwL2NvbS54ay5mYXN0YXBwL3NyYy9BdXRoL2xvZ2luLnV4IWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1lOi9Ya1dvcmsvRmFzdEFwcFdvcmtTcGFjZS9mYXN0YXBwL2NvbS54ay5mYXN0YXBwL3NyYy9BdXRoL2xvZ2luLnV4IS4vc3JjL0F1dGgvbG9naW4udXhcbi8vIG1vZHVsZSBpZCA9IDQzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCAkYXBwX3JlcXVpcmUkKXsndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfdXNlciA9IHJlcXVpcmUoJy4uL0NvbW1vbi9BcGkvdXNlcicpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSB7XG4gIGRhdGE6IGZ1bmN0aW9uIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVzZXJuYW1lOiAnJyxcbiAgICAgIHBhc3N3b3JkOiAnJ1xuICAgIH07XG4gIH0sXG4gIHRvUmVnaXN0ZXI6IGZ1bmN0aW9uIHRvUmVnaXN0ZXIoKSB7XG4gICAgdGhpcy4kZGlzcGF0Y2goJ3RvdmlldycsIHsgdmlldzogJ3JlZ2lzdGVyJyB9KTtcbiAgfSxcbiAgb25JbnB1dFVzZXJuYW1lOiBmdW5jdGlvbiBvbklucHV0VXNlcm5hbWUoX3JlZikge1xuICAgIHZhciB2YWx1ZSA9IF9yZWYuZGV0YWlsLnZhbHVlO1xuXG4gICAgdGhpcy51c2VybmFtZSA9IHZhbHVlO1xuICB9LFxuICBvbklucHV0UGFzc3dvcmQ6IGZ1bmN0aW9uIG9uSW5wdXRQYXNzd29yZChfcmVmMikge1xuICAgIHZhciB2YWx1ZSA9IF9yZWYyLmRldGFpbC52YWx1ZTtcblxuICAgIHRoaXMucGFzc3dvcmQgPSB2YWx1ZTtcbiAgfSxcbiAgbG9naW46IGZ1bmN0aW9uIGxvZ2luKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICBpZiAodGhpcy51c2VybmFtZSA9PT0gbnVsbCB8fCB0aGlzLnVzZXJuYW1lLmxlbmd0aCA8IDYpIHtcbiAgICAgIHRoaXMuJGFwcC4kZGVmLnByb21wdC5zaG93VG9hc3QoeyBtZXNzYWdlOiAn55So5oi35ZCN6ZW/5bqm5LiN6IO95bCP5LqONicgfSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnBhc3N3b3JkID09PSBudWxsIHx8IHRoaXMucGFzc3dvcmQubGVuZ3RoIDwgNikge1xuICAgICAgdGhpcy4kYXBwLiRkZWYucHJvbXB0LnNob3dUb2FzdCh7IG1lc3NhZ2U6ICflr4bnoIHplb/luqbkuI3og73lsI/kuo42JyB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgKDAsIF91c2VyLmxvZ2luKSh0aGlzLnVzZXJuYW1lLCB0aGlzLnBhc3N3b3JkKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIF90aGlzLiRkaXNwYXRjaCgnc3VjY2VzcycsIHsgZGF0YTogZGF0YSB9KTtcbiAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgX3RoaXMuJGFwcC4kZGVmLnByb21wdC5zaG93VG9hc3QoeyBtZXNzYWdlOiBkYXRhIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59O1xudmFyIG1vZHVsZU93biA9IGV4cG9ydHMuZGVmYXVsdCB8fCBtb2R1bGUuZXhwb3J0cztcbnZhciBhY2Nlc3NvcnMgPSBbJ3B1YmxpYycsICdwcm90ZWN0ZWQnLCAncHJpdmF0ZSddO1xuaWYgKG1vZHVsZU93bi5kYXRhICYmIGFjY2Vzc29ycy5zb21lKGZ1bmN0aW9uIChhY2MpIHtcbiAgICByZXR1cm4gbW9kdWxlT3duW2FjY107XG4gIH0pKSB7XG4gIHRocm93IG5ldyBFcnJvcign6aG16Z2iVk3lr7nosaHkuK3lsZ7mgKdkYXRh5LiN5Y+v5LiOcHVibGljLCBwcm90ZWN0ZWQsIHByaXZhdGXlkIzml7blrZjlnKjvvIzor7fkvb/nlKhwdWJsaWPmm7/ku6NkYXRh77yBJyk7XG59IGVsc2UgaWYgKCFtb2R1bGVPd24uZGF0YSkge1xuICBtb2R1bGVPd24uZGF0YSA9IHt9O1xuICBtb2R1bGVPd24uX2Rlc2NyaXB0b3IgPSB7fTtcbiAgYWNjZXNzb3JzLmZvckVhY2goZnVuY3Rpb24oYWNjKSB7XG4gICAgdmFyIGFjY1R5cGUgPSB0eXBlb2YgbW9kdWxlT3duW2FjY107XG4gICAgaWYgKGFjY1R5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBtb2R1bGVPd24uZGF0YSA9IE9iamVjdC5hc3NpZ24obW9kdWxlT3duLmRhdGEsIG1vZHVsZU93blthY2NdKTtcbiAgICAgIGZvciAodmFyIG5hbWUgaW4gbW9kdWxlT3duW2FjY10pIHtcbiAgICAgICAgbW9kdWxlT3duLl9kZXNjcmlwdG9yW25hbWVdID0ge2FjY2VzcyA6IGFjY307XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChhY2NUeXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ+mhtemdolZN5a+56LGh5Lit55qE5bGe5oCnJyArIGFjYyArICfnmoTlgLzkuI3og73kvb/lh73mlbDvvIzor7fkvb/nlKjlr7nosaEnKTtcbiAgICB9XG4gIH0pO1xufX1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1zY3JpcHQtbG9hZGVyLmpzIWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWFjY2Vzcy1sb2FkZXIuanMhYzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYj9wcmVzZXRzW109YzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvYmFiZWwtcHJlc2V0LWVudiZwcmVzZXRzPWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2JhYmVsLXByZXNldC1lbnYmcGx1Z2luc1tdPWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2pzeC1sb2FkZXIuanMmcGx1Z2lucz1jOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9qc3gtbG9hZGVyLmpzJmNvbW1lbnRzPWZhbHNlIWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyEuL3NyYy9BdXRoL2xvZ2luLnV4XG4vLyBtb2R1bGUgaWQgPSA0NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKFwiISFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxsb2FkZXIuanM/dHlwZT1jb21wb25lbnQhLi4vQ29tbW9uL0NvbXBvbmVudC9DSW5wdXQvaW5kZXgudXg/bmFtZT1jLWlucHV0XCIpXG52YXIgJGFwcF90ZW1wbGF0ZSQgPSByZXF1aXJlKFwiISFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1qc29uLWxvYWRlci5qcyFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS10ZW1wbGF0ZS1sb2FkZXIuanMhYzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT10ZW1wbGF0ZXMhLi9yZWdpc3Rlci51eFwiKVxudmFyICRhcHBfc3R5bGUkID0gcmVxdWlyZShcIiEhYzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtanNvbi1sb2FkZXIuanMhYzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtc3R5bGUtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWU6XFxcXFhrV29ya1xcXFxGYXN0QXBwV29ya1NwYWNlXFxcXGZhc3RhcHBcXFxcY29tLnhrLmZhc3RhcHBcXFxcc3JjXFxcXEF1dGhcXFxccmVnaXN0ZXIudXghYzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWU6XFxcXFhrV29ya1xcXFxGYXN0QXBwV29ya1NwYWNlXFxcXGZhc3RhcHBcXFxcY29tLnhrLmZhc3RhcHBcXFxcc3JjXFxcXEF1dGhcXFxccmVnaXN0ZXIudXghLi9yZWdpc3Rlci51eFwiKVxudmFyICRhcHBfc2NyaXB0JCA9IHJlcXVpcmUoXCIhIWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLXNjcmlwdC1sb2FkZXIuanMhYzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtYWNjZXNzLWxvYWRlci5qcyFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxiYWJlbC1sb2FkZXI/cHJlc2V0c1tdPWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGJhYmVsLXByZXNldC1lbnYmcHJlc2V0cz1jOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxiYWJlbC1wcmVzZXQtZW52JnBsdWdpbnNbXT1jOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxqc3gtbG9hZGVyLmpzJnBsdWdpbnM9YzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcanN4LWxvYWRlci5qcyZjb21tZW50cz1mYWxzZSFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXNjcmlwdHMhLi9yZWdpc3Rlci51eFwiKVxuXG4kYXBwX2RlZmluZSQoJ0BhcHAtY29tcG9uZW50L3JlZ2lzdGVyJywgW10sIGZ1bmN0aW9uKCRhcHBfcmVxdWlyZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfbW9kdWxlJCl7XG4gICAgICRhcHBfc2NyaXB0JCgkYXBwX21vZHVsZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfcmVxdWlyZSQpXG4gICAgIGlmICgkYXBwX2V4cG9ydHMkLl9fZXNNb2R1bGUgJiYgJGFwcF9leHBvcnRzJC5kZWZhdWx0KSB7XG4gICAgICAgICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cyA9ICRhcHBfZXhwb3J0cyQuZGVmYXVsdFxuICAgICAgICB9XG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnRlbXBsYXRlID0gJGFwcF90ZW1wbGF0ZSRcbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMuc3R5bGUgPSAkYXBwX3N0eWxlJFxufSlcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2xvYWRlci5qcz90eXBlPWNvbXBvbmVudCEuL3NyYy9BdXRoL3JlZ2lzdGVyLnV4P25hbWU9cmVnaXN0ZXJcbi8vIG1vZHVsZSBpZCA9IDQ1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBcInR5cGVcIjogXCJkaXZcIixcbiAgXCJhdHRyXCI6IHt9LFxuICBcImNsYXNzTGlzdFwiOiBbXG4gICAgXCJyZWdpc3Rlci1wYWdlXCJcbiAgXSxcbiAgXCJjaGlsZHJlblwiOiBbXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgXCJ2YWx1ZVwiOiBcIuazqOWGjFwiXG4gICAgICB9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcInJlZ2lzdGVyLXRpcFwiXG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJjLWlucHV0XCIsXG4gICAgICBcImF0dHJcIjoge1xuICAgICAgICBcImxhYmVsXCI6IFwi55So5oi35ZCNXCIsXG4gICAgICAgIFwiY2xlYXJhYmxlXCI6IFwidHJ1ZVwiLFxuICAgICAgICBcInBsYWNlaG9sZGVyXCI6IFwi6K+36L6T5YWl55So5oi35ZCNXCJcbiAgICAgIH0sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwiaW5wdXQtYm9yZGVyXCJcbiAgICAgIF0sXG4gICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgIFwiaW5wdXRcIjogXCJvbklucHV0VXNlcm5hbWVcIlxuICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiYy1pbnB1dFwiLFxuICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgXCJsYWJlbFwiOiBcIuWvhueggVwiLFxuICAgICAgICBcImNsZWFyYWJsZVwiOiBcInRydWVcIixcbiAgICAgICAgXCJwbGFjZWhvbGRlclwiOiBcIuivt+i+k+WFpeWvhueggVwiLFxuICAgICAgICBcInR5cGVcIjogXCJwYXNzd29yZFwiXG4gICAgICB9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcImlucHV0LWJvcmRlclwiXG4gICAgICBdLFxuICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICBcImlucHV0XCI6IFwib25JbnB1dFBhc3N3b3JkXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImMtaW5wdXRcIixcbiAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgIFwibGFiZWxcIjogXCLlr4bnoIFcIixcbiAgICAgICAgXCJjbGVhcmFibGVcIjogXCJ0cnVlXCIsXG4gICAgICAgIFwicGxhY2Vob2xkZXJcIjogXCLor7flho3mrKHovpPlhaXlr4bnoIFcIixcbiAgICAgICAgXCJ0eXBlXCI6IFwicGFzc3dvcmRcIlxuICAgICAgfSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJpbnB1dC1ib3JkZXJcIlxuICAgICAgXSxcbiAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgXCJpbnB1dFwiOiBcIm9uSW5wdXRSZVBhc3N3b3JkXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgIFwidmFsdWVcIjogXCLms6jlhoxcIlxuICAgICAgfSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJyZWdpc3Rlci1idG5cIlxuICAgICAgXSxcbiAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgXCJjbGlja1wiOiBcInJlZ2lzdGVyXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgIFwidmFsdWVcIjogXCLlt7LmnInotKblj7fvvIHljrvnmbvlvZV+XCJcbiAgICAgIH0sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwibG9naW4tdGV4dFwiXG4gICAgICBdLFxuICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICBcImNsaWNrXCI6IFwidG9Mb2dpblwiXG4gICAgICB9XG4gICAgfVxuICBdXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gYzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtanNvbi1sb2FkZXIuanMhYzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtdGVtcGxhdGUtbG9hZGVyLmpzIWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9dGVtcGxhdGVzIS4vc3JjL0F1dGgvcmVnaXN0ZXIudXhcbi8vIG1vZHVsZSBpZCA9IDQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBcIi5yZWdpc3Rlci1wYWdlXCI6IHtcbiAgICBcImRpc3BsYXlcIjogXCJmbGV4XCIsXG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCJcbiAgfSxcbiAgXCIucmVnaXN0ZXItdGlwXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMTAwcHhcIixcbiAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiLFxuICAgIFwiYm9yZGVyQm90dG9tV2lkdGhcIjogXCIxcHhcIixcbiAgICBcImJvcmRlckJvdHRvbUNvbG9yXCI6IFwiI2VlZWVlZVwiXG4gIH0sXG4gIFwiLmlucHV0LWJvcmRlclwiOiB7XG4gICAgXCJib3JkZXJCb3R0b21XaWR0aFwiOiBcIjFweFwiLFxuICAgIFwiYm9yZGVyQm90dG9tQ29sb3JcIjogXCIjZWVlZWVlXCJcbiAgfSxcbiAgXCIucmVnaXN0ZXItYnRuXCI6IHtcbiAgICBcImhlaWdodFwiOiBcIjgwcHhcIixcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgXCJtYXJnaW5Ub3BcIjogXCI1MHB4XCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjMjRiOWZmXCIsXG4gICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIlxuICB9LFxuICBcIi5sb2dpbi10ZXh0XCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiNTBweFwiLFxuICAgIFwibWFyZ2luVG9wXCI6IFwiMjBweFwiLFxuICAgIFwiZm9udFNpemVcIjogXCIyMnB4XCIsXG4gICAgXCJ0ZXh0QWxpZ25cIjogXCJyaWdodFwiLFxuICAgIFwicGFkZGluZ1RvcFwiOiBcIjEwcHhcIixcbiAgICBcInBhZGRpbmdSaWdodFwiOiBcIjEwcHhcIixcbiAgICBcInBhZGRpbmdCb3R0b21cIjogXCIxMHB4XCIsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjEwcHhcIlxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gYzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtanNvbi1sb2FkZXIuanMhYzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtc3R5bGUtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWU6L1hrV29yay9GYXN0QXBwV29ya1NwYWNlL2Zhc3RhcHAvY29tLnhrLmZhc3RhcHAvc3JjL0F1dGgvcmVnaXN0ZXIudXghYzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWU6L1hrV29yay9GYXN0QXBwV29ya1NwYWNlL2Zhc3RhcHAvY29tLnhrLmZhc3RhcHAvc3JjL0F1dGgvcmVnaXN0ZXIudXghLi9zcmMvQXV0aC9yZWdpc3Rlci51eFxuLy8gbW9kdWxlIGlkID0gNDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsICRhcHBfcmVxdWlyZSQpeyd1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF91c2VyID0gcmVxdWlyZSgnLi4vQ29tbW9uL0FwaS91c2VyJyk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgZGF0YTogZnVuY3Rpb24gZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXNlcm5hbWU6ICcnLFxuICAgICAgcGFzc3dvcmQ6ICcnLFxuICAgICAgcmVwYXNzd29yZDogJydcbiAgICB9O1xuICB9LFxuICB0b0xvZ2luOiBmdW5jdGlvbiB0b0xvZ2luKCkge1xuICAgIHRoaXMuJGRpc3BhdGNoKCd0b3ZpZXcnLCB7IHZpZXc6ICdsb2dpbicgfSk7XG4gIH0sXG4gIG9uSW5wdXRVc2VybmFtZTogZnVuY3Rpb24gb25JbnB1dFVzZXJuYW1lKF9yZWYpIHtcbiAgICB2YXIgdmFsdWUgPSBfcmVmLmRldGFpbC52YWx1ZTtcblxuICAgIHRoaXMudXNlcm5hbWUgPSB2YWx1ZTtcbiAgfSxcbiAgb25JbnB1dFBhc3N3b3JkOiBmdW5jdGlvbiBvbklucHV0UGFzc3dvcmQoX3JlZjIpIHtcbiAgICB2YXIgdmFsdWUgPSBfcmVmMi5kZXRhaWwudmFsdWU7XG5cbiAgICB0aGlzLnBhc3N3b3JkID0gdmFsdWU7XG4gIH0sXG4gIG9uSW5wdXRSZVBhc3N3b3JkOiBmdW5jdGlvbiBvbklucHV0UmVQYXNzd29yZChfcmVmMykge1xuICAgIHZhciB2YWx1ZSA9IF9yZWYzLmRldGFpbC52YWx1ZTtcblxuICAgIHRoaXMucmVwYXNzd29yZCA9IHZhbHVlO1xuICB9LFxuICByZWdpc3RlcjogZnVuY3Rpb24gcmVnaXN0ZXIoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIGlmICh0aGlzLnVzZXJuYW1lID09PSBudWxsIHx8IHRoaXMudXNlcm5hbWUubGVuZ3RoIDwgNikge1xuICAgICAgdGhpcy4kYXBwLiRkZWYucHJvbXB0LnNob3dUb2FzdCh7IG1lc3NhZ2U6ICfnlKjmiLflkI3plb/luqbkuI3og73lsI/kuo42JyB9KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMucGFzc3dvcmQgPT09IG51bGwgfHwgdGhpcy5wYXNzd29yZC5sZW5ndGggPCA2KSB7XG4gICAgICB0aGlzLiRhcHAuJGRlZi5wcm9tcHQuc2hvd1RvYXN0KHsgbWVzc2FnZTogJ+WvhueggemVv+W6puS4jeiDveWwj+S6jjYnIH0pO1xuICAgIH0gZWxzZSBpZiAodGhpcy5wYXNzd29yZCAhPT0gdGhpcy5yZXBhc3N3b3JkKSB7XG4gICAgICB0aGlzLiRhcHAuJGRlZi5wcm9tcHQuc2hvd1RvYXN0KHsgbWVzc2FnZTogJ+S4pOasoeWvhueggeS4jeS4gOagtycgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICgwLCBfdXNlci5yZWdpc3RlcikodGhpcy51c2VybmFtZSwgdGhpcy5wYXNzd29yZCwgdGhpcy5yZXBhc3N3b3JkKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIF90aGlzLiRkaXNwYXRjaCgnc3VjY2VzcycsIHsgZGF0YTogZGF0YSB9KTtcbiAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgX3RoaXMuJGFwcC4kZGVmLnByb21wdC5zaG93VG9hc3QoeyBtZXNzYWdlOiBkYXRhIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59O1xudmFyIG1vZHVsZU93biA9IGV4cG9ydHMuZGVmYXVsdCB8fCBtb2R1bGUuZXhwb3J0cztcbnZhciBhY2Nlc3NvcnMgPSBbJ3B1YmxpYycsICdwcm90ZWN0ZWQnLCAncHJpdmF0ZSddO1xuaWYgKG1vZHVsZU93bi5kYXRhICYmIGFjY2Vzc29ycy5zb21lKGZ1bmN0aW9uIChhY2MpIHtcbiAgICByZXR1cm4gbW9kdWxlT3duW2FjY107XG4gIH0pKSB7XG4gIHRocm93IG5ldyBFcnJvcign6aG16Z2iVk3lr7nosaHkuK3lsZ7mgKdkYXRh5LiN5Y+v5LiOcHVibGljLCBwcm90ZWN0ZWQsIHByaXZhdGXlkIzml7blrZjlnKjvvIzor7fkvb/nlKhwdWJsaWPmm7/ku6NkYXRh77yBJyk7XG59IGVsc2UgaWYgKCFtb2R1bGVPd24uZGF0YSkge1xuICBtb2R1bGVPd24uZGF0YSA9IHt9O1xuICBtb2R1bGVPd24uX2Rlc2NyaXB0b3IgPSB7fTtcbiAgYWNjZXNzb3JzLmZvckVhY2goZnVuY3Rpb24oYWNjKSB7XG4gICAgdmFyIGFjY1R5cGUgPSB0eXBlb2YgbW9kdWxlT3duW2FjY107XG4gICAgaWYgKGFjY1R5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBtb2R1bGVPd24uZGF0YSA9IE9iamVjdC5hc3NpZ24obW9kdWxlT3duLmRhdGEsIG1vZHVsZU93blthY2NdKTtcbiAgICAgIGZvciAodmFyIG5hbWUgaW4gbW9kdWxlT3duW2FjY10pIHtcbiAgICAgICAgbW9kdWxlT3duLl9kZXNjcmlwdG9yW25hbWVdID0ge2FjY2VzcyA6IGFjY307XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChhY2NUeXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ+mhtemdolZN5a+56LGh5Lit55qE5bGe5oCnJyArIGFjYyArICfnmoTlgLzkuI3og73kvb/lh73mlbDvvIzor7fkvb/nlKjlr7nosaEnKTtcbiAgICB9XG4gIH0pO1xufX1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1zY3JpcHQtbG9hZGVyLmpzIWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWFjY2Vzcy1sb2FkZXIuanMhYzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYj9wcmVzZXRzW109YzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvYmFiZWwtcHJlc2V0LWVudiZwcmVzZXRzPWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2JhYmVsLXByZXNldC1lbnYmcGx1Z2luc1tdPWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2pzeC1sb2FkZXIuanMmcGx1Z2lucz1jOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9qc3gtbG9hZGVyLmpzJmNvbW1lbnRzPWZhbHNlIWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyEuL3NyYy9BdXRoL3JlZ2lzdGVyLnV4XG4vLyBtb2R1bGUgaWQgPSA0OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgJGFwcF90ZW1wbGF0ZSQgPSByZXF1aXJlKFwiISFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1qc29uLWxvYWRlci5qcyFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS10ZW1wbGF0ZS1sb2FkZXIuanMhYzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT10ZW1wbGF0ZXMhLi9kaWFsb2cudXhcIilcbnZhciAkYXBwX3N0eWxlJCA9IHJlcXVpcmUoXCIhIWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWpzb24tbG9hZGVyLmpzIWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLXN0eWxlLWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1lOlxcXFxYa1dvcmtcXFxcRmFzdEFwcFdvcmtTcGFjZVxcXFxmYXN0YXBwXFxcXGNvbS54ay5mYXN0YXBwXFxcXHNyY1xcXFxDb21tb25cXFxcQ29tcG9uZW50XFxcXENEaWFsb2dcXFxcZGlhbG9nLnV4IWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1lOlxcXFxYa1dvcmtcXFxcRmFzdEFwcFdvcmtTcGFjZVxcXFxmYXN0YXBwXFxcXGNvbS54ay5mYXN0YXBwXFxcXHNyY1xcXFxDb21tb25cXFxcQ29tcG9uZW50XFxcXENEaWFsb2dcXFxcZGlhbG9nLnV4IS4vZGlhbG9nLnV4XCIpXG52YXIgJGFwcF9zY3JpcHQkID0gcmVxdWlyZShcIiEhYzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtc2NyaXB0LWxvYWRlci5qcyFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1hY2Nlc3MtbG9hZGVyLmpzIWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGJhYmVsLWxvYWRlcj9wcmVzZXRzW109YzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcYmFiZWwtcHJlc2V0LWVudiZwcmVzZXRzPWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGJhYmVsLXByZXNldC1lbnYmcGx1Z2luc1tdPWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGpzeC1sb2FkZXIuanMmcGx1Z2lucz1jOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxqc3gtbG9hZGVyLmpzJmNvbW1lbnRzPWZhbHNlIWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyEuL2RpYWxvZy51eFwiKVxuXG4kYXBwX2RlZmluZSQoJ0BhcHAtY29tcG9uZW50L2MtZGlhbG9nJywgW10sIGZ1bmN0aW9uKCRhcHBfcmVxdWlyZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfbW9kdWxlJCl7XG4gICAgICRhcHBfc2NyaXB0JCgkYXBwX21vZHVsZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfcmVxdWlyZSQpXG4gICAgIGlmICgkYXBwX2V4cG9ydHMkLl9fZXNNb2R1bGUgJiYgJGFwcF9leHBvcnRzJC5kZWZhdWx0KSB7XG4gICAgICAgICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cyA9ICRhcHBfZXhwb3J0cyQuZGVmYXVsdFxuICAgICAgICB9XG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnRlbXBsYXRlID0gJGFwcF90ZW1wbGF0ZSRcbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMuc3R5bGUgPSAkYXBwX3N0eWxlJFxufSlcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2xvYWRlci5qcz90eXBlPWNvbXBvbmVudCEuL3NyYy9Db21tb24vQ29tcG9uZW50L0NEaWFsb2cvZGlhbG9nLnV4P25hbWU9Yy1kaWFsb2dcbi8vIG1vZHVsZSBpZCA9IDQ5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBcInR5cGVcIjogXCJkaXZcIixcbiAgXCJhdHRyXCI6IHt9LFxuICBcImNoaWxkcmVuXCI6IFtcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJzdGFja1wiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuIHRoaXMudmlzaWJsZX0sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwiZGlhbG9nXCJcbiAgICAgIF0sXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcImJhY2tkcm9wXCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgXCJvcGFjaXR5XCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gdGhpcy5vcGFjaXR5fVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuIFsnZGlhbG9nLWNvbnRhaW5lcicsIHRoaXMuZGlhbG9nVmlzaWJsZT8nZmx5LWluJzonZmx5LW91dCddfSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwiZGlhbG9nLXRpdGxlXCJcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuIHRoaXMudGl0bGV9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgXCJkaWFsb2ctYm9keVwiXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiB0aGlzLm1lc3NhZ2V9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgXCJkaWFsb2ctYnRuXCJcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiYnRuLWl0ZW1cIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwicmVwZWF0XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJleHBcIjogZnVuY3Rpb24gKCkge3JldHVybiB0aGlzLmJ0bkxpc3R9LFxuICAgICAgICAgICAgICAgICAgICBcImtleVwiOiBcImlkeFwiLFxuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwiYnRuXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogZnVuY3Rpb24gKGV2dCkge3RoaXMub25DbGljayh0aGlzLmlkeCxldnQpfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImJvcmRlckxlZnRXaWR0aFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmlkeD09PTA/MDoxKSArICdweCd9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiB0aGlzLmJ0bi5sYWJlbH1cbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuIHRoaXMuYnRuLmNvbG9yP3RoaXMuYnRuLmNvbG9yOicjOTA5Mzk5J31cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIF1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1qc29uLWxvYWRlci5qcyFjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS10ZW1wbGF0ZS1sb2FkZXIuanMhYzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT10ZW1wbGF0ZXMhLi9zcmMvQ29tbW9uL0NvbXBvbmVudC9DRGlhbG9nL2RpYWxvZy51eFxuLy8gbW9kdWxlIGlkID0gNTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIFwiLmRpYWxvZ1wiOiB7XG4gICAgXCJwb3NpdGlvblwiOiBcImZpeGVkXCIsXG4gICAgXCJoZWlnaHRcIjogXCIxMDAlXCIsXG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImRpc3BsYXlcIjogXCJmbGV4XCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImNlbnRlclwiXG4gIH0sXG4gIFwiLmRpYWxvZy1jb250YWluZXJcIjoge1xuICAgIFwiZGlzcGxheVwiOiBcImZsZXhcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiZmxleC1zdGFydFwiLFxuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwid2lkdGhcIjogXCI0NTBweFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiMTBweFwiLFxuICAgIFwiYm9yZGVyVG9wV2lkdGhcIjogXCIxcHhcIixcbiAgICBcImJvcmRlclJpZ2h0V2lkdGhcIjogXCIxcHhcIixcbiAgICBcImJvcmRlckJvdHRvbVdpZHRoXCI6IFwiMXB4XCIsXG4gICAgXCJib3JkZXJMZWZ0V2lkdGhcIjogXCIxcHhcIixcbiAgICBcImJvcmRlclN0eWxlXCI6IFwic29saWRcIixcbiAgICBcImJvcmRlclRvcENvbG9yXCI6IFwiI2RjZGZlNlwiLFxuICAgIFwiYm9yZGVyUmlnaHRDb2xvclwiOiBcIiNkY2RmZTZcIixcbiAgICBcImJvcmRlckJvdHRvbUNvbG9yXCI6IFwiI2RjZGZlNlwiLFxuICAgIFwiYm9yZGVyTGVmdENvbG9yXCI6IFwiI2RjZGZlNlwiXG4gIH0sXG4gIFwiLmRpYWxvZy10aXRsZVwiOiB7XG4gICAgXCJkaXNwbGF5XCI6IFwiZmxleFwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICBcImNvbG9yXCI6IFwiIzMwMzEzM1wiLFxuICAgIFwicGFkZGluZ1RvcFwiOiBcIjEwcHhcIixcbiAgICBcInBhZGRpbmdSaWdodFwiOiBcIjBweFwiLFxuICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjEwcHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMHB4XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIlxuICB9LFxuICBcIi5kaWFsb2ctdGl0bGUgPiB0ZXh0XCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiMzVweFwiLFxuICAgIFwiZm9udFdlaWdodFwiOiBcImJvbGRcIixcbiAgICBcIl9tZXRhXCI6IHtcbiAgICAgIFwicnVsZURlZlwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInRcIjogXCJhXCIsXG4gICAgICAgICAgXCJuXCI6IFwiY2xhc3NcIixcbiAgICAgICAgICBcImlcIjogZmFsc2UsXG4gICAgICAgICAgXCJhXCI6IFwiZWxlbWVudFwiLFxuICAgICAgICAgIFwidlwiOiBcImRpYWxvZy10aXRsZVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInRcIjogXCJjaGlsZFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInRcIjogXCJ0XCIsXG4gICAgICAgICAgXCJuXCI6IFwidGV4dFwiXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIH0sXG4gIFwiLmRpYWxvZy1ib2R5XCI6IHtcbiAgICBcImRpc3BsYXlcIjogXCJmbGV4XCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImNlbnRlclwiLFxuICAgIFwiY29sb3JcIjogXCIjODg4ODg4XCIsXG4gICAgXCJmb250U2l6ZVwiOiBcIjMwcHhcIixcbiAgICBcInBhZGRpbmdUb3BcIjogXCIyMHB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIxNXB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMzBweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCIxNXB4XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIlxuICB9LFxuICBcIi5kaWFsb2ctYnRuXCI6IHtcbiAgICBcImRpc3BsYXlcIjogXCJmbGV4XCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImNlbnRlclwiLFxuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJoZWlnaHRcIjogXCI4MHB4XCIsXG4gICAgXCJib3JkZXJTdHlsZVwiOiBcInNvbGlkXCIsXG4gICAgXCJib3JkZXJUb3BDb2xvclwiOiBcIiNkY2RmZTZcIixcbiAgICBcImJvcmRlclJpZ2h0Q29sb3JcIjogXCIjZGNkZmU2XCIsXG4gICAgXCJib3JkZXJCb3R0b21Db2xvclwiOiBcIiNkY2RmZTZcIixcbiAgICBcImJvcmRlckxlZnRDb2xvclwiOiBcIiNkY2RmZTZcIixcbiAgICBcImJvcmRlclRvcFdpZHRoXCI6IFwiMXB4XCJcbiAgfSxcbiAgXCIuYnRuLWl0ZW1cIjoge1xuICAgIFwiZmxleFwiOiAxLFxuICAgIFwiZGlzcGxheVwiOiBcImZsZXhcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJoZWlnaHRcIjogXCIxMDAlXCIsXG4gICAgXCJib3JkZXJTdHlsZVwiOiBcInNvbGlkXCIsXG4gICAgXCJib3JkZXJUb3BDb2xvclwiOiBcIiNkZGRkZGRcIixcbiAgICBcImJvcmRlclJpZ2h0Q29sb3JcIjogXCIjZGRkZGRkXCIsXG4gICAgXCJib3JkZXJCb3R0b21Db2xvclwiOiBcIiNkZGRkZGRcIixcbiAgICBcImJvcmRlckxlZnRDb2xvclwiOiBcIiNkZGRkZGRcIlxuICB9LFxuICBcIi5iYWNrZHJvcFwiOiB7XG4gICAgXCJoZWlnaHRcIjogXCIxMDAlXCIsXG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcInJnYmEoMCwwLDAsMC4zKVwiXG4gIH0sXG4gIFwiLmZseS1pblwiOiB7XG4gICAgXCJhbmltYXRpb25OYW1lXCI6IFwiZmx5SW5cIixcbiAgICBcImFuaW1hdGlvbkR1cmF0aW9uXCI6IFwiNTAwbXNcIixcbiAgICBcImFuaW1hdGlvblRpbWluZ0Z1bmN0aW9uXCI6IFwiZWFzZS1vdXRcIlxuICB9LFxuICBcIi5mbHktb3V0XCI6IHtcbiAgICBcImFuaW1hdGlvbk5hbWVcIjogXCJmbHlPdXRcIixcbiAgICBcImFuaW1hdGlvbkR1cmF0aW9uXCI6IFwiNTAwbXNcIixcbiAgICBcImFuaW1hdGlvblRpbWluZ0Z1bmN0aW9uXCI6IFwiZWFzZS1pblwiXG4gIH0sXG4gIFwiQEtFWUZSQU1FU1wiOiB7XG4gICAgXCJmbHlJblwiOiBbXG4gICAgICB7XG4gICAgICAgIFwib3BhY2l0eVwiOiAwLFxuICAgICAgICBcInRyYW5zZm9ybVwiOiBcIntcXFwidHJhbnNsYXRlWVxcXCI6XFxcIi0zMDAwcHhcXFwifVwiLFxuICAgICAgICBcInRpbWVcIjogMFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJvcGFjaXR5XCI6IDEsXG4gICAgICAgIFwidHJhbnNmb3JtXCI6IFwie1xcXCJ0cmFuc2xhdGVZXFxcIjpcXFwiMXB4XFxcIn1cIixcbiAgICAgICAgXCJ0aW1lXCI6IDEwMFxuICAgICAgfVxuICAgIF0sXG4gICAgXCJmbHlPdXRcIjogW1xuICAgICAge1xuICAgICAgICBcIm9wYWNpdHlcIjogMSxcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIjogXCJ7XFxcInRyYW5zbGF0ZVlcXFwiOlxcXCIxcHhcXFwifVwiLFxuICAgICAgICBcInRpbWVcIjogMFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJvcGFjaXR5XCI6IDAsXG4gICAgICAgIFwidHJhbnNmb3JtXCI6IFwie1xcXCJ0cmFuc2xhdGVZXFxcIjpcXFwiLTMwMDBweFxcXCJ9XCIsXG4gICAgICAgIFwidGltZVwiOiAxMDBcbiAgICAgIH1cbiAgICBdXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1qc29uLWxvYWRlci5qcyFjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1zdHlsZS1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZTovWGtXb3JrL0Zhc3RBcHBXb3JrU3BhY2UvZmFzdGFwcC9jb20ueGsuZmFzdGFwcC9zcmMvQ29tbW9uL0NvbXBvbmVudC9DRGlhbG9nL2RpYWxvZy51eCFjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZTovWGtXb3JrL0Zhc3RBcHBXb3JrU3BhY2UvZmFzdGFwcC9jb20ueGsuZmFzdGFwcC9zcmMvQ29tbW9uL0NvbXBvbmVudC9DRGlhbG9nL2RpYWxvZy51eCEuL3NyYy9Db21tb24vQ29tcG9uZW50L0NEaWFsb2cvZGlhbG9nLnV4XG4vLyBtb2R1bGUgaWQgPSA1MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgJGFwcF9yZXF1aXJlJCl7J3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3Byb3BzJHByb3BzJGRhdGEkb25JO1xuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7IGlmIChrZXkgaW4gb2JqKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7IH0gZWxzZSB7IG9ialtrZXldID0gdmFsdWU7IH0gcmV0dXJuIG9iajsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSAoX3Byb3BzJHByb3BzJGRhdGEkb25JID0ge1xuICBwcm9wczogWyd2aXNpYmxlJywgJ3RpdGxlJywgJ21lc3NhZ2UnLCAnYnRuTGlzdCddXG59LCBfZGVmaW5lUHJvcGVydHkoX3Byb3BzJHByb3BzJGRhdGEkb25JLCAncHJvcHMnLCB7XG4gIHZpc2libGU6IGZhbHNlLFxuICB0aXRsZTogJ+aPkOekuicsXG4gIGJ0bkxpc3Q6IFt7XG4gICAgbGFiZWw6ICdPSycsXG4gICAgY29sb3I6ICcjOTA5Mzk5J1xuICB9XVxufSksIF9kZWZpbmVQcm9wZXJ0eShfcHJvcHMkcHJvcHMkZGF0YSRvbkksICdkYXRhJywgZnVuY3Rpb24gZGF0YSgpIHtcbiAgcmV0dXJuIHtcbiAgICBvcGFjaXR5OiAwLFxuICAgIGRpYWxvZ1Zpc2libGU6IGZhbHNlXG4gIH07XG59KSwgX2RlZmluZVByb3BlcnR5KF9wcm9wcyRwcm9wcyRkYXRhJG9uSSwgJ29uSW5pdCcsIGZ1bmN0aW9uIG9uSW5pdCgpIHtcbiAgdGhpcy4kd2F0Y2goJ3Zpc2libGUnLCAnc2hvd2RpYWxvZycpO1xufSksIF9kZWZpbmVQcm9wZXJ0eShfcHJvcHMkcHJvcHMkZGF0YSRvbkksICdzaG93ZGlhbG9nJywgZnVuY3Rpb24gc2hvd2RpYWxvZygpIHtcbiAgdmFyIF90aGlzID0gdGhpcztcblxuICBpZiAodGhpcy52aXNpYmxlKSB7XG4gICAgdGhpcy5kaWFsb2dWaXNpYmxlID0gdHJ1ZTtcbiAgICB2YXIgaWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5vcGFjaXR5ICs9IDAuMDU7XG4gICAgICBpZiAoX3RoaXMub3BhY2l0eSA+IDEpIHtcbiAgICAgICAgX3RoaXMub3BhY2l0eSA9IDE7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaWQpO1xuICAgICAgfVxuICAgIH0sIDE2KTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLm9uQ2xvc2UoKTtcbiAgfVxufSksIF9kZWZpbmVQcm9wZXJ0eShfcHJvcHMkcHJvcHMkZGF0YSRvbkksICdvbkNsaWNrJywgZnVuY3Rpb24gb25DbGljayhpZHgpIHtcbiAgdGhpcy5vbkNsb3NlKCk7XG4gIHRoaXMuJGRpc3BhdGNoKCdjbGljaycsIHsgaWR4OiBpZHggfSk7XG59KSwgX2RlZmluZVByb3BlcnR5KF9wcm9wcyRwcm9wcyRkYXRhJG9uSSwgJ29uQ2xvc2UnLCBmdW5jdGlvbiBvbkNsb3NlKCkge1xuICB2YXIgX3RoaXMyID0gdGhpcztcblxuICB2YXIgaWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgX3RoaXMyLmRpYWxvZ1Zpc2libGUgPSBmYWxzZTtcbiAgICBfdGhpczIub3BhY2l0eSAtPSAwLjA1O1xuICAgIGlmIChfdGhpczIub3BhY2l0eSA8PSAwKSB7XG4gICAgICBjbGVhckludGVydmFsKGlkKTtcbiAgICAgIF90aGlzMi5vcGFjaXR5ID0gMDtcbiAgICAgIF90aGlzMi4kZGlzcGF0Y2goJ2Nsb3NlJyk7XG4gICAgfVxuICB9LCAxNik7XG59KSwgX3Byb3BzJHByb3BzJGRhdGEkb25JKTtcbnZhciBtb2R1bGVPd24gPSBleHBvcnRzLmRlZmF1bHQgfHwgbW9kdWxlLmV4cG9ydHM7XG52YXIgYWNjZXNzb3JzID0gWydwdWJsaWMnLCAncHJvdGVjdGVkJywgJ3ByaXZhdGUnXTtcbmlmIChtb2R1bGVPd24uZGF0YSAmJiBhY2Nlc3NvcnMuc29tZShmdW5jdGlvbiAoYWNjKSB7XG4gICAgcmV0dXJuIG1vZHVsZU93blthY2NdO1xuICB9KSkge1xuICB0aHJvdyBuZXcgRXJyb3IoJ+mhtemdolZN5a+56LGh5Lit5bGe5oCnZGF0YeS4jeWPr+S4jnB1YmxpYywgcHJvdGVjdGVkLCBwcml2YXRl5ZCM5pe25a2Y5Zyo77yM6K+35L2/55SocHVibGlj5pu/5LujZGF0Ye+8gScpO1xufSBlbHNlIGlmICghbW9kdWxlT3duLmRhdGEpIHtcbiAgbW9kdWxlT3duLmRhdGEgPSB7fTtcbiAgbW9kdWxlT3duLl9kZXNjcmlwdG9yID0ge307XG4gIGFjY2Vzc29ycy5mb3JFYWNoKGZ1bmN0aW9uKGFjYykge1xuICAgIHZhciBhY2NUeXBlID0gdHlwZW9mIG1vZHVsZU93blthY2NdO1xuICAgIGlmIChhY2NUeXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgbW9kdWxlT3duLmRhdGEgPSBPYmplY3QuYXNzaWduKG1vZHVsZU93bi5kYXRhLCBtb2R1bGVPd25bYWNjXSk7XG4gICAgICBmb3IgKHZhciBuYW1lIGluIG1vZHVsZU93blthY2NdKSB7XG4gICAgICAgIG1vZHVsZU93bi5fZGVzY3JpcHRvcltuYW1lXSA9IHthY2Nlc3MgOiBhY2N9O1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoYWNjVHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS53YXJuKCfpobXpnaJWTeWvueixoeS4reeahOWxnuaApycgKyBhY2MgKyAn55qE5YC85LiN6IO95L2/5Ye95pWw77yM6K+35L2/55So5a+56LGhJyk7XG4gICAgfVxuICB9KTtcbn19XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gYzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtc2NyaXB0LWxvYWRlci5qcyFjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1hY2Nlc3MtbG9hZGVyLmpzIWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWI/cHJlc2V0c1tdPWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2JhYmVsLXByZXNldC1lbnYmcHJlc2V0cz1jOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9iYWJlbC1wcmVzZXQtZW52JnBsdWdpbnNbXT1jOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9qc3gtbG9hZGVyLmpzJnBsdWdpbnM9YzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvanN4LWxvYWRlci5qcyZjb21tZW50cz1mYWxzZSFjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXNjcmlwdHMhLi9zcmMvQ29tbW9uL0NvbXBvbmVudC9DRGlhbG9nL2RpYWxvZy51eFxuLy8gbW9kdWxlIGlkID0gNTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIFwidHlwZVwiOiBcImRpdlwiLFxuICBcImF0dHJcIjoge30sXG4gIFwiY2xhc3NMaXN0XCI6IFtcbiAgICBcIm1lLXBhZ2VcIlxuICBdLFxuICBcImNoaWxkcmVuXCI6IFtcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJtZVwiXG4gICAgICBdLFxuICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuIHRoaXMuaXNMb2dpbn0sXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcInN0YWNrXCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwiaGVhZGVyXCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgIFwic3JjXCI6IFwiLi4vQ29tbW9uL0ltYWdlL2FuZHJvaWQuanBnXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwiYXZ0YXJcIlxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuIHRoaXMubG9naW5EYXRhLnVzZXJuYW1lfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgXCJ1c2VybmFtZVwiXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJpdGVtLXRpdGxlXCJcbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwidmFsdWVcIjogXCLmlLbol4/nmoTmlofnq6BcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJpdGVtXCIsXG4gICAgICAgICAgICBcImJvcmRlci1ib3R0b21cIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgXCJjbGlja1wiOiBmdW5jdGlvbiAoZXZ0KSB7dGhpcy5vcGVuVmlldygnQXJ0aWNsZUNvbGxlY3RMaXN0JyxldnQpfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuaUtuiXj+eahOe9keermVwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcIml0ZW1cIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgXCJjbGlja1wiOiBmdW5jdGlvbiAoZXZ0KSB7dGhpcy5vcGVuVmlldygnV2ViQ29sbGVjdExpc3QnLGV2dCl9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwiaXRlbS10aXRsZVwiXG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInZhbHVlXCI6IFwi5Yib5bu65qGM6Z2i5Zu+5qCHXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwiaXRlbVwiLFxuICAgICAgICAgICAgXCJib3JkZXItYm90dG9tXCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgIFwiY2xpY2tcIjogXCJjcmVhdGVTaG9ydGN1dFwiXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwiaXRlbS10aXRsZVwiXG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInZhbHVlXCI6IFwi6YCA5Ye655m75b2VXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwiaXRlbVwiLFxuICAgICAgICAgICAgXCJib3JkZXItYm90dG9tXCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgIFwiY2xpY2tcIjogXCJvcGVuRGlhbG9nXCJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImxvZ2luXCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMudmlldz09PSdsb2dpbicpJiYhKHRoaXMuaXNMb2dpbil9LFxuICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICBcInRvdmlld1wiOiBcInRvVmlld1wiLFxuICAgICAgICBcInN1Y2Nlc3NcIjogXCJsb2dpblN1Y2Nlc3NcIlxuICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwicmVnaXN0ZXJcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy52aWV3PT09J3JlZ2lzdGVyJykmJiEodGhpcy5pc0xvZ2luKSYmISh0aGlzLnZpZXc9PT0nbG9naW4nKX0sXG4gICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgIFwidG92aWV3XCI6IFwidG9WaWV3XCIsXG4gICAgICAgIFwic3VjY2Vzc1wiOiBcInJlZ2lzdGVyU3VjY2Vzc1wiXG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJjLWRpYWxvZ1wiLFxuICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgXCJ0aXRsZVwiOiBcIuaPkOekulwiLFxuICAgICAgICBcInZpc2libGVcIjogZnVuY3Rpb24gKCkge3JldHVybiB0aGlzLnNob3dEaWFsb2d9LFxuICAgICAgICBcIm1lc3NhZ2VcIjogXCLnoa7orqTpgIDlh7rnmbvlvZXvvJ9cIixcbiAgICAgICAgXCJidG5MaXN0XCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gdGhpcy5kaWFsb2dCdG59XG4gICAgICB9LFxuICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICBcImNsb3NlXCI6IFwib25DbG9zZVwiLFxuICAgICAgICBcImNsaWNrXCI6IFwib25DbGlja1wiXG4gICAgICB9XG4gICAgfVxuICBdXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gYzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtanNvbi1sb2FkZXIuanMhYzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtdGVtcGxhdGUtbG9hZGVyLmpzIWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9dGVtcGxhdGVzIS4vc3JjL1Byb2ZpbGUvcHJvZmlsZS51eFxuLy8gbW9kdWxlIGlkID0gNTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIFwiLm1lXCI6IHtcbiAgICBcImRpc3BsYXlcIjogXCJmbGV4XCIsXG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCJcbiAgfSxcbiAgXCIuaGVhZGVyXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiNDAwcHhcIlxuICB9LFxuICBcIi5hdnRhclwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImhlaWdodFwiOiBcIjEwMCVcIlxuICB9LFxuICBcIi51c2VybmFtZVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImhlaWdodFwiOiBcIjEwMCVcIixcbiAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiLFxuICAgIFwiZm9udFNpemVcIjogXCI1NnB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcInJnYmEoMCwwLDAsMC43KVwiXG4gIH0sXG4gIFwiLmhlYWRlci1lbWFpbFwiOiB7XG4gICAgXCJoZWlnaHRcIjogXCI2MHB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiM5OTk5OTlcIlxuICB9LFxuICBcIi5pdGVtLXRpdGxlXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMzBweFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2RkZGRkZFwiLFxuICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCJcbiAgfSxcbiAgXCIuaXRlbVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcInBhZGRpbmdUb3BcIjogXCIzMHB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIyMHB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMzBweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCIyMHB4XCJcbiAgfSxcbiAgXCIuYm9yZGVyLWJvdHRvbVwiOiB7XG4gICAgXCJib3JkZXJCb3R0b21XaWR0aFwiOiBcIjFweFwiLFxuICAgIFwiYm9yZGVyQm90dG9tQ29sb3JcIjogXCIjZWVlZWVlXCJcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWpzb24tbG9hZGVyLmpzIWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLXN0eWxlLWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1lOi9Ya1dvcmsvRmFzdEFwcFdvcmtTcGFjZS9mYXN0YXBwL2NvbS54ay5mYXN0YXBwL3NyYy9Qcm9maWxlL3Byb2ZpbGUudXghYzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWU6L1hrV29yay9GYXN0QXBwV29ya1NwYWNlL2Zhc3RhcHAvY29tLnhrLmZhc3RhcHAvc3JjL1Byb2ZpbGUvcHJvZmlsZS51eCEuL3NyYy9Qcm9maWxlL3Byb2ZpbGUudXhcbi8vIG1vZHVsZSBpZCA9IDU0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCAkYXBwX3JlcXVpcmUkKXsndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB7XG4gIGRhdGE6IGZ1bmN0aW9uIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzTG9naW46IGZhbHNlLFxuICAgICAgdmlldzogJ2xvZ2luJyxcbiAgICAgIGxvZ2luRGF0YToge30sXG4gICAgICBzaG93RGlhbG9nOiBmYWxzZSxcbiAgICAgIGRpYWxvZ0J0bjogW3tcbiAgICAgICAgbGFiZWw6ICfpgIDlh7onXG4gICAgICB9LCB7XG4gICAgICAgIGxhYmVsOiAn5Y+W5raIJ1xuICAgICAgfV1cbiAgICB9O1xuICB9LFxuICBvbkluaXQ6IGZ1bmN0aW9uIG9uSW5pdCgpIHtcbiAgICB0aGlzLiRhcHAuJGRlZi5zdG9yYWdlLmdldCh7XG4gICAgICBrZXk6ICd1c2VyJyxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHRoaXMubG9naW5EYXRhID0ge307XG4gICAgICAgIGlmIChkYXRhICE9ICcnKSB7XG4gICAgICAgICAgdGhpcy5sb2dpbkRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcyksXG4gICAgICBmYWlsOiBmdW5jdGlvbiAoZGF0YSwgY29kZSkge1xuICAgICAgICB0aGlzLmxvZ2luRGF0YSA9IHt9O1xuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgfSk7XG4gICAgdGhpcy4kYXBwLiRkZWYuc3RvcmFnZS5nZXQoe1xuICAgICAga2V5OiAnaXNMb2dpbicsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB0aGlzLmlzTG9naW4gPSBkYXRhID09PSAndHJ1ZScgPyB0cnVlIDogZmFsc2U7XG4gICAgICB9LmJpbmQodGhpcyksXG4gICAgICBmYWlsOiBmdW5jdGlvbiAoZGF0YSwgY29kZSkge1xuICAgICAgICB0aGlzLmlzTG9naW4gPSBmYWxzZTtcbiAgICAgIH0uYmluZCh0aGlzKVxuICAgIH0pO1xuICB9LFxuICB0b1ZpZXc6IGZ1bmN0aW9uIHRvVmlldyhfcmVmKSB7XG4gICAgdmFyIHZpZXcgPSBfcmVmLmRldGFpbC52aWV3O1xuXG4gICAgdGhpcy52aWV3ID0gdmlldztcbiAgfSxcbiAgbG9naW5TdWNjZXNzOiBmdW5jdGlvbiBsb2dpblN1Y2Nlc3MoX3JlZjIpIHtcbiAgICB2YXIgZGF0YSA9IF9yZWYyLmRldGFpbC5kYXRhO1xuXG4gICAgdGhpcy5pc0xvZ2luID0gdHJ1ZTtcbiAgICB0aGlzLmxvZ2luRGF0YSA9IGRhdGE7XG4gIH0sXG4gIHJlZ2lzdGVyU3VjY2VzczogZnVuY3Rpb24gcmVnaXN0ZXJTdWNjZXNzKF9yZWYzKSB7XG4gICAgdmFyIGRhdGEgPSBfcmVmMy5kZXRhaWwuZGF0YTtcblxuICAgIHRoaXMuaXNMb2dpbiA9IHRydWU7XG4gICAgdGhpcy5sb2dpbkRhdGEgPSBkYXRhO1xuICB9LFxuICBzaWdub3V0OiBmdW5jdGlvbiBzaWdub3V0KCkge1xuICAgIHRoaXMuaXNMb2dpbiA9IGZhbHNlO1xuICAgIHRoaXMudmlldyA9ICdsb2dpbic7XG4gICAgdGhpcy4kYXBwLiRkZWYuc3RvcmFnZS5kZWxldGUoe1xuICAgICAga2V5OiAnYXV0aCdcbiAgICB9KTtcbiAgICB0aGlzLiRhcHAuJGRlZi5zdG9yYWdlLmRlbGV0ZSh7XG4gICAgICBrZXk6ICd1c2VyJ1xuICAgIH0pO1xuICAgIHRoaXMuJGFwcC4kZGVmLnN0b3JhZ2Uuc2V0KHtcbiAgICAgIGtleTogJ2lzTG9naW4nLFxuICAgICAgdmFsdWU6ICdmYWxzZSdcbiAgICB9KTtcbiAgfSxcbiAgb3BlbkRpYWxvZzogZnVuY3Rpb24gb3BlbkRpYWxvZygpIHtcbiAgICB0aGlzLnNob3dEaWFsb2cgPSB0cnVlO1xuICB9LFxuICBvbkNsb3NlOiBmdW5jdGlvbiBvbkNsb3NlKCkge1xuICAgIHRoaXMuc2hvd0RpYWxvZyA9IGZhbHNlO1xuICB9LFxuICBvbkNsaWNrOiBmdW5jdGlvbiBvbkNsaWNrKF9yZWY0KSB7XG4gICAgdmFyIGlkeCA9IF9yZWY0LmRldGFpbC5pZHg7XG5cbiAgICBpZiAoaWR4ID09PSAwKSB7XG4gICAgICB0aGlzLnNpZ25vdXQoKTtcbiAgICB9XG4gIH0sXG4gIG9wZW5WaWV3OiBmdW5jdGlvbiBvcGVuVmlldyh1cmkpIHtcbiAgICBpZiAodXJpID09PSAnYWJvdXQnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuJGFwcC4kZGVmLnJvdXRlci5wdXNoKHsgdXJpOiB1cmkgfSk7XG4gIH0sXG4gIGNyZWF0ZVNob3J0Y3V0OiBmdW5jdGlvbiBjcmVhdGVTaG9ydGN1dCgpIHtcbiAgICB0aGlzLiRhcHAuJGRlZi5jcmVhdGVTaG9ydGN1dCgpO1xuICB9XG59O1xudmFyIG1vZHVsZU93biA9IGV4cG9ydHMuZGVmYXVsdCB8fCBtb2R1bGUuZXhwb3J0cztcbnZhciBhY2Nlc3NvcnMgPSBbJ3B1YmxpYycsICdwcm90ZWN0ZWQnLCAncHJpdmF0ZSddO1xuaWYgKG1vZHVsZU93bi5kYXRhICYmIGFjY2Vzc29ycy5zb21lKGZ1bmN0aW9uIChhY2MpIHtcbiAgICByZXR1cm4gbW9kdWxlT3duW2FjY107XG4gIH0pKSB7XG4gIHRocm93IG5ldyBFcnJvcign6aG16Z2iVk3lr7nosaHkuK3lsZ7mgKdkYXRh5LiN5Y+v5LiOcHVibGljLCBwcm90ZWN0ZWQsIHByaXZhdGXlkIzml7blrZjlnKjvvIzor7fkvb/nlKhwdWJsaWPmm7/ku6NkYXRh77yBJyk7XG59IGVsc2UgaWYgKCFtb2R1bGVPd24uZGF0YSkge1xuICBtb2R1bGVPd24uZGF0YSA9IHt9O1xuICBtb2R1bGVPd24uX2Rlc2NyaXB0b3IgPSB7fTtcbiAgYWNjZXNzb3JzLmZvckVhY2goZnVuY3Rpb24oYWNjKSB7XG4gICAgdmFyIGFjY1R5cGUgPSB0eXBlb2YgbW9kdWxlT3duW2FjY107XG4gICAgaWYgKGFjY1R5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBtb2R1bGVPd24uZGF0YSA9IE9iamVjdC5hc3NpZ24obW9kdWxlT3duLmRhdGEsIG1vZHVsZU93blthY2NdKTtcbiAgICAgIGZvciAodmFyIG5hbWUgaW4gbW9kdWxlT3duW2FjY10pIHtcbiAgICAgICAgbW9kdWxlT3duLl9kZXNjcmlwdG9yW25hbWVdID0ge2FjY2VzcyA6IGFjY307XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChhY2NUeXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ+mhtemdolZN5a+56LGh5Lit55qE5bGe5oCnJyArIGFjYyArICfnmoTlgLzkuI3og73kvb/lh73mlbDvvIzor7fkvb/nlKjlr7nosaEnKTtcbiAgICB9XG4gIH0pO1xufX1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1zY3JpcHQtbG9hZGVyLmpzIWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWFjY2Vzcy1sb2FkZXIuanMhYzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYj9wcmVzZXRzW109YzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvYmFiZWwtcHJlc2V0LWVudiZwcmVzZXRzPWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2JhYmVsLXByZXNldC1lbnYmcGx1Z2luc1tdPWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2pzeC1sb2FkZXIuanMmcGx1Z2lucz1jOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9qc3gtbG9hZGVyLmpzJmNvbW1lbnRzPWZhbHNlIWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyEuL3NyYy9Qcm9maWxlL3Byb2ZpbGUudXhcbi8vIG1vZHVsZSBpZCA9IDU1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBcInR5cGVcIjogXCJkaXZcIixcbiAgXCJhdHRyXCI6IHt9LFxuICBcImNsYXNzTGlzdFwiOiBbXG4gICAgXCJ3YW5hbmRyb2lkLXBhZ2VcIlxuICBdLFxuICBcImNoaWxkcmVuXCI6IFtcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJmbGV4aWJsZS10YWJzXCJcbiAgICAgIF0sXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcInRhYnNcIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJpbmRleFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuIHRoaXMuY3VycmVudEluZGV4fVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgXCJjaGFuZ2VcIjogXCJjaGFuZ2VUYWJhY3RpdmVcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcInRhYi1jb250ZW50XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwiZmxleGlibGUtdGFiLWNvbnRlbnRcIlxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJ0YWItY29udGVudC1zZWN0aW9uXCJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImhvbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuIHRoaXMudGFiSXRlbXNbMF0uc2hvd31cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwidGFiLWNvbnRlbnQtc2VjdGlvblwiXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJjbGFzc2lmeVwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gdGhpcy50YWJJdGVtc1sxXS5zaG93fVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJ0YWItY29udGVudC1zZWN0aW9uXCJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIm1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiB0aGlzLnRhYkl0ZW1zWzJdLnNob3d9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJmbGV4aWJsZS10YWJiYXJcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwicmVwZWF0XCI6IHtcbiAgICAgICAgICAgICAgICBcImV4cFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuIHRoaXMudGFiSXRlbXN9LFxuICAgICAgICAgICAgICAgIFwia2V5XCI6IFwiaW5kZXhcIixcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwiaXRlbVwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcInRhYi1pdGVtXCJcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogZnVuY3Rpb24gKGV2dCkge3RoaXMuY2xpY2tUYWJCYXIodGhpcy5pbmRleCxldnQpfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJzcmNcIjogZnVuY3Rpb24gKCkge3JldHVybiB0aGlzLml0ZW0uaWNvblt0aGlzLmN1cnJlbnRJbmRleD09PXRoaXMuaW5kZXg/MTowXX1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwidGFiLWljb25cIlxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuIHRoaXMuaXRlbS50ZXh0fVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gW3RoaXMuY3VycmVudEluZGV4PT09dGhpcy5pbmRleD8nYWN0aXZlJzondGFiLXRleHQnXX1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIF1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1qc29uLWxvYWRlci5qcyFjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS10ZW1wbGF0ZS1sb2FkZXIuanMhYzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT10ZW1wbGF0ZXMhLi9zcmMvTWFpbi9tYWluLnV4XG4vLyBtb2R1bGUgaWQgPSA1NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgXCIud2FuYW5kcm9pZC1wYWdlIC5mbGV4aWJsZS10YWJzXCI6IHtcbiAgICBcImRpc3BsYXlcIjogXCJmbGV4XCIsXG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJfbWV0YVwiOiB7XG4gICAgICBcInJ1bGVEZWZcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0XCI6IFwiYVwiLFxuICAgICAgICAgIFwiblwiOiBcImNsYXNzXCIsXG4gICAgICAgICAgXCJpXCI6IGZhbHNlLFxuICAgICAgICAgIFwiYVwiOiBcImVsZW1lbnRcIixcbiAgICAgICAgICBcInZcIjogXCJ3YW5hbmRyb2lkLXBhZ2VcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0XCI6IFwiZFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInRcIjogXCJhXCIsXG4gICAgICAgICAgXCJuXCI6IFwiY2xhc3NcIixcbiAgICAgICAgICBcImlcIjogZmFsc2UsXG4gICAgICAgICAgXCJhXCI6IFwiZWxlbWVudFwiLFxuICAgICAgICAgIFwidlwiOiBcImZsZXhpYmxlLXRhYnNcIlxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICB9LFxuICBcIi5mbGV4aWJsZS10YWJzIC5mbGV4aWJsZS10YWJiYXJcIjoge1xuICAgIFwiZGlzcGxheVwiOiBcImZsZXhcIixcbiAgICBcImJvcmRlclRvcFdpZHRoXCI6IFwiMXB4XCIsXG4gICAgXCJib3JkZXJUb3BDb2xvclwiOiBcIiNlZWVlZWVcIixcbiAgICBcIl9tZXRhXCI6IHtcbiAgICAgIFwicnVsZURlZlwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInRcIjogXCJhXCIsXG4gICAgICAgICAgXCJuXCI6IFwiY2xhc3NcIixcbiAgICAgICAgICBcImlcIjogZmFsc2UsXG4gICAgICAgICAgXCJhXCI6IFwiZWxlbWVudFwiLFxuICAgICAgICAgIFwidlwiOiBcImZsZXhpYmxlLXRhYnNcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0XCI6IFwiZFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInRcIjogXCJhXCIsXG4gICAgICAgICAgXCJuXCI6IFwiY2xhc3NcIixcbiAgICAgICAgICBcImlcIjogZmFsc2UsXG4gICAgICAgICAgXCJhXCI6IFwiZWxlbWVudFwiLFxuICAgICAgICAgIFwidlwiOiBcImZsZXhpYmxlLXRhYmJhclwiXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIH0sXG4gIFwiLmZsZXhpYmxlLXRhYmJhciAudGFiLWl0ZW1cIjoge1xuICAgIFwiZmxleFwiOiAxLFxuICAgIFwicGFkZGluZ1RvcFwiOiBcIjEwcHhcIixcbiAgICBcInBhZGRpbmdSaWdodFwiOiBcIjEwcHhcIixcbiAgICBcInBhZGRpbmdCb3R0b21cIjogXCIxMHB4XCIsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjEwcHhcIixcbiAgICBcImRpc3BsYXlcIjogXCJmbGV4XCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJmb250U2l6ZVwiOiBcIjEycHhcIixcbiAgICBcIl9tZXRhXCI6IHtcbiAgICAgIFwicnVsZURlZlwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInRcIjogXCJhXCIsXG4gICAgICAgICAgXCJuXCI6IFwiY2xhc3NcIixcbiAgICAgICAgICBcImlcIjogZmFsc2UsXG4gICAgICAgICAgXCJhXCI6IFwiZWxlbWVudFwiLFxuICAgICAgICAgIFwidlwiOiBcImZsZXhpYmxlLXRhYmJhclwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInRcIjogXCJkXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidFwiOiBcImFcIixcbiAgICAgICAgICBcIm5cIjogXCJjbGFzc1wiLFxuICAgICAgICAgIFwiaVwiOiBmYWxzZSxcbiAgICAgICAgICBcImFcIjogXCJlbGVtZW50XCIsXG4gICAgICAgICAgXCJ2XCI6IFwidGFiLWl0ZW1cIlxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICB9LFxuICBcIi50YWItaXRlbSAudGFiLWljb25cIjoge1xuICAgIFwid2lkdGhcIjogXCI1NnB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCI1NnB4XCIsXG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiNXB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCI1cHhcIixcbiAgICBcInBhZGRpbmdCb3R0b21cIjogXCI1cHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiNXB4XCIsXG4gICAgXCJfbWV0YVwiOiB7XG4gICAgICBcInJ1bGVEZWZcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0XCI6IFwiYVwiLFxuICAgICAgICAgIFwiblwiOiBcImNsYXNzXCIsXG4gICAgICAgICAgXCJpXCI6IGZhbHNlLFxuICAgICAgICAgIFwiYVwiOiBcImVsZW1lbnRcIixcbiAgICAgICAgICBcInZcIjogXCJ0YWItaXRlbVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInRcIjogXCJkXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidFwiOiBcImFcIixcbiAgICAgICAgICBcIm5cIjogXCJjbGFzc1wiLFxuICAgICAgICAgIFwiaVwiOiBmYWxzZSxcbiAgICAgICAgICBcImFcIjogXCJlbGVtZW50XCIsXG4gICAgICAgICAgXCJ2XCI6IFwidGFiLWljb25cIlxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICB9LFxuICBcIi50YWItaXRlbSAudGFiLXRleHRcIjoge1xuICAgIFwiZm9udFNpemVcIjogXCIyMHB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiNhYWFhYWFcIixcbiAgICBcIl9tZXRhXCI6IHtcbiAgICAgIFwicnVsZURlZlwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInRcIjogXCJhXCIsXG4gICAgICAgICAgXCJuXCI6IFwiY2xhc3NcIixcbiAgICAgICAgICBcImlcIjogZmFsc2UsXG4gICAgICAgICAgXCJhXCI6IFwiZWxlbWVudFwiLFxuICAgICAgICAgIFwidlwiOiBcInRhYi1pdGVtXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidFwiOiBcImRcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0XCI6IFwiYVwiLFxuICAgICAgICAgIFwiblwiOiBcImNsYXNzXCIsXG4gICAgICAgICAgXCJpXCI6IGZhbHNlLFxuICAgICAgICAgIFwiYVwiOiBcImVsZW1lbnRcIixcbiAgICAgICAgICBcInZcIjogXCJ0YWItdGV4dFwiXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIH0sXG4gIFwiLnRhYi1pdGVtIC5hY3RpdmVcIjoge1xuICAgIFwiZm9udFNpemVcIjogXCIyMHB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiMyNGI5ZmZcIixcbiAgICBcIl9tZXRhXCI6IHtcbiAgICAgIFwicnVsZURlZlwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInRcIjogXCJhXCIsXG4gICAgICAgICAgXCJuXCI6IFwiY2xhc3NcIixcbiAgICAgICAgICBcImlcIjogZmFsc2UsXG4gICAgICAgICAgXCJhXCI6IFwiZWxlbWVudFwiLFxuICAgICAgICAgIFwidlwiOiBcInRhYi1pdGVtXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidFwiOiBcImRcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0XCI6IFwiYVwiLFxuICAgICAgICAgIFwiblwiOiBcImNsYXNzXCIsXG4gICAgICAgICAgXCJpXCI6IGZhbHNlLFxuICAgICAgICAgIFwiYVwiOiBcImVsZW1lbnRcIixcbiAgICAgICAgICBcInZcIjogXCJhY3RpdmVcIlxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gYzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtanNvbi1sb2FkZXIuanMhYzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtc3R5bGUtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWU6L1hrV29yay9GYXN0QXBwV29ya1NwYWNlL2Zhc3RhcHAvY29tLnhrLmZhc3RhcHAvc3JjL01haW4vbWFpbi51eCFjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZTovWGtXb3JrL0Zhc3RBcHBXb3JrU3BhY2UvZmFzdGFwcC9jb20ueGsuZmFzdGFwcC9zcmMvTWFpbi9tYWluLnV4IS4vc3JjL01haW4vbWFpbi51eFxuLy8gbW9kdWxlIGlkID0gNTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsICRhcHBfcmVxdWlyZSQpeyd1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgZGF0YTogZnVuY3Rpb24gZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY3VycmVudEluZGV4OiAwLFxuICAgICAgdGFiSXRlbXM6IFt7XG4gICAgICAgIHRleHQ6ICfpppbpobUnLFxuICAgICAgICBpY29uOiBbJy4uL0NvbW1vbi9JbWFnZS9pY29uX2hvbWUucG5nJywgJy4uL0NvbW1vbi9JbWFnZS9pY29uX2hvbWVfc2VsZWN0LnBuZyddLFxuICAgICAgICBzaG93OiB0cnVlXG4gICAgICB9LCB7XG4gICAgICAgIHRleHQ6ICfkvZPns7snLFxuICAgICAgICBpY29uOiBbJy4uL0NvbW1vbi9JbWFnZS9pY29uX2NsYXNzaWZ5LnBuZycsICcuLi9Db21tb24vSW1hZ2UvaWNvbl9jbGFzc2lmeV9zZWxlY3QucG5nJ10sXG4gICAgICAgIHNob3c6IGZhbHNlXG4gICAgICB9LCB7XG4gICAgICAgIHRleHQ6ICfmiJEnLFxuICAgICAgICBpY29uOiBbJy4uL0NvbW1vbi9JbWFnZS9pY29uX21lLnBuZycsICcuLi9Db21tb24vSW1hZ2UvaWNvbl9tZV9zZWxlY3QucG5nJ10sXG4gICAgICAgIHNob3c6IGZhbHNlXG4gICAgICB9XVxuICAgIH07XG4gIH0sXG4gIGNoYW5nZVRhYmFjdGl2ZTogZnVuY3Rpb24gY2hhbmdlVGFiYWN0aXZlKGV2dCkge1xuICAgIHRoaXMuY2hhbmdlQ3VycmVudChldnQuaW5kZXgpO1xuICB9LFxuICBjbGlja1RhYkJhcjogZnVuY3Rpb24gY2xpY2tUYWJCYXIoaW5kZXgpIHtcbiAgICB0aGlzLmNoYW5nZUN1cnJlbnQoaW5kZXgpO1xuICB9LFxuICBjaGFuZ2VDdXJyZW50OiBmdW5jdGlvbiBjaGFuZ2VDdXJyZW50KGluZGV4KSB7XG4gICAgdGhpcy4kcGFnZS5zZXRUaXRsZUJhcih7IHRleHQ6IHRoaXMudGFiSXRlbXNbaW5kZXhdLnRleHQgfSk7XG4gICAgdGhpcy50YWJJdGVtc1tpbmRleF0uc2hvdyA9IHRydWU7XG4gICAgdGhpcy5jdXJyZW50SW5kZXggPSBpbmRleDtcbiAgfVxufTtcbnZhciBtb2R1bGVPd24gPSBleHBvcnRzLmRlZmF1bHQgfHwgbW9kdWxlLmV4cG9ydHM7XG52YXIgYWNjZXNzb3JzID0gWydwdWJsaWMnLCAncHJvdGVjdGVkJywgJ3ByaXZhdGUnXTtcbmlmIChtb2R1bGVPd24uZGF0YSAmJiBhY2Nlc3NvcnMuc29tZShmdW5jdGlvbiAoYWNjKSB7XG4gICAgcmV0dXJuIG1vZHVsZU93blthY2NdO1xuICB9KSkge1xuICB0aHJvdyBuZXcgRXJyb3IoJ+mhtemdolZN5a+56LGh5Lit5bGe5oCnZGF0YeS4jeWPr+S4jnB1YmxpYywgcHJvdGVjdGVkLCBwcml2YXRl5ZCM5pe25a2Y5Zyo77yM6K+35L2/55SocHVibGlj5pu/5LujZGF0Ye+8gScpO1xufSBlbHNlIGlmICghbW9kdWxlT3duLmRhdGEpIHtcbiAgbW9kdWxlT3duLmRhdGEgPSB7fTtcbiAgbW9kdWxlT3duLl9kZXNjcmlwdG9yID0ge307XG4gIGFjY2Vzc29ycy5mb3JFYWNoKGZ1bmN0aW9uKGFjYykge1xuICAgIHZhciBhY2NUeXBlID0gdHlwZW9mIG1vZHVsZU93blthY2NdO1xuICAgIGlmIChhY2NUeXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgbW9kdWxlT3duLmRhdGEgPSBPYmplY3QuYXNzaWduKG1vZHVsZU93bi5kYXRhLCBtb2R1bGVPd25bYWNjXSk7XG4gICAgICBmb3IgKHZhciBuYW1lIGluIG1vZHVsZU93blthY2NdKSB7XG4gICAgICAgIG1vZHVsZU93bi5fZGVzY3JpcHRvcltuYW1lXSA9IHthY2Nlc3MgOiBhY2N9O1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoYWNjVHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS53YXJuKCfpobXpnaJWTeWvueixoeS4reeahOWxnuaApycgKyBhY2MgKyAn55qE5YC85LiN6IO95L2/5Ye95pWw77yM6K+35L2/55So5a+56LGhJyk7XG4gICAgfVxuICB9KTtcbn19XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gYzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtc2NyaXB0LWxvYWRlci5qcyFjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1hY2Nlc3MtbG9hZGVyLmpzIWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWI/cHJlc2V0c1tdPWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2JhYmVsLXByZXNldC1lbnYmcHJlc2V0cz1jOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9iYWJlbC1wcmVzZXQtZW52JnBsdWdpbnNbXT1jOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9qc3gtbG9hZGVyLmpzJnBsdWdpbnM9YzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvanN4LWxvYWRlci5qcyZjb21tZW50cz1mYWxzZSFjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXNjcmlwdHMhLi9zcmMvTWFpbi9tYWluLnV4XG4vLyBtb2R1bGUgaWQgPSA1OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDeExBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN4RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDdEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDdkRBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUMxT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDNUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzFIQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3JTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNyUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3hJQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3RFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNwR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNwSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3BIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN6SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDbktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0EiLCJzb3VyY2VSb290IjoiIn0=