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
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
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
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var $app_template$ = __webpack_require__(7)
var $app_style$ = __webpack_require__(8)
var $app_script$ = __webpack_require__(9)

$app_define$('@app-component/c-title', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = {
  "type": "div",
  "attr": {},
  "classList": [
    "c-title"
  ],
  "children": [
    {
      "type": "image",
      "attr": {
        "src": "/Common/Image/icon_back.png"
      },
      "classList": [
        "icon"
      ],
      "shown": function () {return this.showBack},
      "events": {
        "click": "onBackClick"
      }
    },
    {
      "type": "text",
      "attr": {
        "value": function () {return this.title}
      },
      "classList": [
        "title"
      ]
    },
    {
      "type": "image",
      "attr": {
        "src": function () {return this.rightIcon}
      },
      "classList": [
        "icon"
      ],
      "shown": function () {return this.rightIcon!==''},
      "events": {
        "click": "onRightIconClick"
      }
    }
  ]
}

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = {
  ".c-title": {
    "display": "flex",
    "height": "100px",
    "alignItems": "center",
    "backgroundColor": "#24b9ff"
  },
  ".title": {
    "textOverflow": "ellipsis",
    "lines": 1,
    "flex": 1,
    "fontSize": "36px",
    "color": "#ffffff",
    "marginLeft": "20px"
  },
  ".icon": {
    "width": "100px",
    "height": "100px",
    "paddingTop": "26px",
    "paddingRight": "26px",
    "paddingBottom": "26px",
    "paddingLeft": "26px"
  }
}

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = function(module, exports, $app_require$){'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _props$props$onBackCl;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = (_props$props$onBackCl = {
  props: ['showBack', 'title', 'rightIcon']
}, _defineProperty(_props$props$onBackCl, 'props', {
  showBack: true,
  title: '',
  rightIcon: ''
}), _defineProperty(_props$props$onBackCl, 'onBackClick', function onBackClick() {
  this.$dispatch('iconclick', { icon: 'back' });
  this.$app.$def.router.back();
}), _defineProperty(_props$props$onBackCl, 'onRightIconClick', function onRightIconClick() {
  this.$dispatch('iconclick', { icon: 'right' });
}), _props$props$onBackCl);
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
/* 10 */,
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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(6)
var $app_template$ = __webpack_require__(23)
var $app_style$ = __webpack_require__(24)
var $app_script$ = __webpack_require__(25)

$app_define$('@app-component/articlecollectlist', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})

$app_bootstrap$('@app-component/articlecollectlist',{ packagerName:'fa-toolkit', packagerVersion: '1.0.6-Stable.300'})

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = {
  "type": "div",
  "attr": {},
  "style": {
    "display": "flex",
    "flexDirection": "column"
  },
  "children": [
    {
      "type": "c-title",
      "attr": {
        "showBack": "true",
        ",": "",
        "title": "收藏的文章",
        "rightIcon": "/Common/Image/icon_add.png"
      },
      "events": {
        "iconclick": "onTitleIconClick"
      }
    },
    {
      "type": "text",
      "attr": {
        "value": "长按可分享文章~"
      },
      "classList": [
        "click-tip"
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
            "home-page"
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
                    "click": function (evt) {this.openArticle(this.$item.link,this.$item.title,evt)},
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
                            "src": "../Common/Image/icon_collect.png"
                          },
                          "style": {
                            "width": "52px",
                            "height": "52px"
                          },
                          "events": {
                            "click": function (evt) {this.uncollect(this.$item.id,this.$item.originId,evt)}
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
                      "shown": function () {return this.$item.chapterName!==''},
                      "children": [
                        {
                          "type": "text",
                          "attr": {
                            "value": function () {return '分类: ' + (this.$item.chapterName)}
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
  ]
}

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = {
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
  ".load-more": {
    "paddingTop": "20px",
    "paddingRight": "20px",
    "paddingBottom": "20px",
    "paddingLeft": "20px",
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "center"
  },
  ".click-tip": {
    "width": "100%",
    "textAlign": "center",
    "backgroundColor": "#eeeeee",
    "paddingTop": "10px",
    "paddingRight": "10px",
    "paddingBottom": "10px",
    "paddingLeft": "10px"
  }
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(module, exports, $app_require$){'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _collect = __webpack_require__(1);

exports.default = {
  data: {
    articleList: [],
    page: 0,
    hasMoreData: true,
    isRefreshing: false
  },
  onInit: function onInit() {
    this.refresh({ refreshing: true });
  },
  onShow: function onShow() {
    if (this.$app.$data.dataAddArticle && this.$app.$data.dataAddArticle.gotoPage === 'collectArticleList') {
      var data = this.$app.$data.dataAddArticle.params;
      if (data.success) {
        this.refresh({ refreshing: true });
      }
    }
  },
  getCollectArticle: function getCollectArticle() {
    var _this = this;

    (0, _collect.getCollectArticle)(this.page).then(function (data) {
      _this.hasMoreData = !data.over;
      if (_this.page > 0) {
        _this.articleList = _this.articleList.concat(data.datas);
      } else {
        _this.isRefreshing = false;
        _this.articleList = data.datas;
      }
    }).catch(function (err) {
      _this.isRefreshing = false;
    });
  },
  loadMoreData: function loadMoreData() {
    if (this.hasMoreData) {
      this.page++;
      this.getCollectArticle();
    }
  },
  openArticle: function openArticle(link, title) {
    if (link !== '') {
      this.$app.$def.router.push({
        uri: 'Webview',
        params: {
          title: title,
          url: link
        }
      });
    }
  },
  refresh: function refresh(evt) {
    this.isRefreshing = evt.refreshing;
    this.page = 0;
    this.getCollectArticle();
  },
  uncollect: function uncollect(id, originId) {
    var _this2 = this;

    (0, _collect.uncollect)(id, originId).then(function (data) {
      _this2.refresh({ refreshing: true });
      _this2.$app.$def.prompt.showToast({ message: '已取消收藏' });
    }).catch(function (err) {
      _this2.$app.$def.prompt.showToast({ message: '取消收藏失败' });
    });
  },
  onTitleIconClick: function onTitleIconClick(_ref) {
    var icon = _ref.detail.icon;

    if (icon === 'right') {
      this.$app.$def.router.push({
        uri: 'AddCollectArticle'
      });
    }
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

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRcXEFydGljbGVDb2xsZWN0TGlzdFxcYXJ0aWNsZWNvbGxlY3RsaXN0LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDQzMWExMTlkZDBjODFlN2IxZDVlIiwid2VicGFjazovLy8uL3NyYy9Db21tb24vQXBpL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9Db21tb24vQXBpL2NvbGxlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbW1vbi9Db21wb25lbnQvQ1RpdGxlL2luZGV4LnV4Iiwid2VicGFjazovLy8uL3NyYy9Db21tb24vQ29tcG9uZW50L0NUaXRsZS9pbmRleC51eD8wNDA3Iiwid2VicGFjazovLy8uL3NyYy9Db21tb24vQ29tcG9uZW50L0NUaXRsZS9pbmRleC51eD9hZDFhIiwid2VicGFjazovLy8uL3NyYy9Db21tb24vQ29tcG9uZW50L0NUaXRsZS9pbmRleC51eD80M2NiIiwid2VicGFjazovLy8uL3NyYy9BcnRpY2xlQ29sbGVjdExpc3QvYXJ0aWNsZWNvbGxlY3RsaXN0LnV4Iiwid2VicGFjazovLy8uL3NyYy9BcnRpY2xlQ29sbGVjdExpc3QvYXJ0aWNsZWNvbGxlY3RsaXN0LnV4PzI2YWMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FydGljbGVDb2xsZWN0TGlzdC9hcnRpY2xlY29sbGVjdGxpc3QudXg/ODI2YSIsIndlYnBhY2s6Ly8vLi9zcmMvQXJ0aWNsZUNvbGxlY3RMaXN0L2FydGljbGVjb2xsZWN0bGlzdC51eD9mM2I5Il0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0MzFhMTE5ZGQwYzgxZTdiMWQ1ZSIsInZhciBmZXRjaCA9ICRhcHBfcmVxdWlyZSQoJ0BhcHAtbW9kdWxlL3N5c3RlbS5mZXRjaCcpO1xudmFyIHN0b3JhZ2UgPSAkYXBwX3JlcXVpcmUkKCdAYXBwLW1vZHVsZS9zeXN0ZW0uc3RvcmFnZScpO1xuXG52YXIgQVBJX1JPT1QgPSAnaHR0cDovL3d3dy53YW5hbmRyb2lkLmNvbS8nO1xuXG52YXIgaGVhZGVycyA9IHt9O1xuXG4vLyBmdW5jdGlvbiBnZXRBdXRoKG5leHQpIHtcbi8vICAgc3RvcmFnZS5nZXQoe1xuLy8gICAgIGtleTogJ2F1dGgnLFxuLy8gICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbi8vICAgICAgIGhlYWRlcnMuQ29va2llID0gZGF0YVxuLy8gICAgICAgbmV4dCh0cnVlKVxuLy8gICAgIH0sXG4vLyAgICAgZmFpbDogZnVuY3Rpb24oZGF0YSwgY29kZSkge1xuLy8gICAgICAgbmV4dChmYWxzZSlcbi8vICAgICB9XG4vLyAgIH0pXG4vLyB9XG5cbmZ1bmN0aW9uIGdldEF1dGgoKSB7XG4gIC8vIOWPpOS6uuS6ke+8muKAnOWQm+WtkOS4gOivuuWNg+mHkeKAne+8jOi/meenjeKAnOaJv+ivuuWwhuadpeS8muaJp+ihjOKAneeahOWvueixoeWcqEphdmFTY3JpcHTkuK3np7DkuLpQcm9taXNl5a+56LGhIHhrIDIwMTgtMTAtMjQgMjE6NTQ6MTNcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBzdG9yYWdlLmdldCh7XG4gICAgICBrZXk6ICdhdXRoJyxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIGhlYWRlcnMuQ29va2llID0gZGF0YTtcbiAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgIH0sXG4gICAgICBmYWlsOiBmdW5jdGlvbiAoZGF0YSwgY29kZSkge1xuICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlYWxGZXRjaCh1cmwsIGRhdGEgPSBudWxsLCBtZXRob2QgPSAnZ2V0Jykge1xuICBjb25zb2xlLmxvZygn4pSP4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSBJyk7XG4gIGNvbnNvbGUubG9nKCfilIMgdXJsOiAnLCBBUElfUk9PVCArIHVybCk7XG4gIGNvbnNvbGUubG9nKCfilIMgbWV0aG9kOiAnLCBtZXRob2QpO1xuICBjb25zb2xlLmxvZygn4pSDIGRhdGE6ICcsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgY29uc29sZS5sb2coJ+KUl+KUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgeKUgScpO1xuXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgZmV0Y2guZmV0Y2goe1xuICAgICAgdXJsOiBBUElfUk9PVCArIHVybCxcbiAgICAgIGRhdGE6IGRhdGEsXG4gICAgICBoZWFkZXI6IGhlYWRlcnMsXG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICB9LFxuICAgICAgZmFpbDogZnVuY3Rpb24gKGRhdGEsIGNvZGUpIHtcbiAgICAgICAgcmVqZWN0KGRhdGEpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gd2l0aEF1dGgodXJsLCBkYXRhID0gbnVsbCwgbWV0aG9kID0gJ2dldCcsIGNhblNraXAgPSBmYWxzZSkge1xuICByZXR1cm4gZ2V0QXV0aCgpLnRoZW4oYXV0aCA9PiB7XG4gICAgaWYgKGF1dGggfHwgY2FuU2tpcCkge1xuICAgICAgcmV0dXJuIHJlYWxGZXRjaCh1cmwsIGRhdGEsIG1ldGhvZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHJlamVjdCgn6K+35YWI55m75b2V77yBJyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBwb3N0KHVybCwgZGF0YSA9IG51bGwsIGNvbmZpZyA9IHt9KSB7XG4gIGlmIChjb25maWcud2l0aEF1dGgpIHtcbiAgICByZXR1cm4gd2l0aEF1dGgodXJsLCBkYXRhLCAncG9zdCcsIGNvbmZpZy5jYW5Ta2lwKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcmVhbEZldGNoKHVybCwgZGF0YSwgJ3Bvc3QnKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXQodXJsLCBkYXRhID0gbnVsbCwgY29uZmlnID0ge30pIHtcbiAgaWYgKGNvbmZpZy53aXRoQXV0aCkge1xuICAgIHJldHVybiB3aXRoQXV0aCh1cmwsIGRhdGEsICdnZXQnLCBjb25maWcuY2FuU2tpcCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHJlYWxGZXRjaCh1cmwsIGRhdGEsICdnZXQnKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIC8qKlxuICAgKiDojrflj5bpppbpobViYW5uZXLliJfooahcbiAgICovXG4gIGdldEJhbm5lcihzdWNjZXNzLCBmYWlsKSB7XG4gICAgcmV0dXJuIGdldCgnYmFubmVyL2pzb24nLCBudWxsKTtcbiAgfSxcbiAgLyoqXG4gICAqIOiOt+WPlummlumhteaWh+eroOWIl+ihqFxuICAgKi9cbiAgZ2V0QXJ0aWNsZShwYWdlKSB7XG4gICAgcmV0dXJuIGdldCgnYXJ0aWNsZS9saXN0LycgKyBwYWdlICsgJy9qc29uJywgbnVsbCwge1xuICAgICAgd2l0aEF1dGg6IHRydWUsXG4gICAgICBjYW5Ta2lwOiB0cnVlXG4gICAgfSk7XG4gIH0sXG4gIC8qKlxuICAgKiDojrflj5bkvZPns7vliIbnsbtcbiAgICovXG4gIGdldENsYXNzaWZ5TGlzdCgpIHtcbiAgICByZXR1cm4gZ2V0KCd0cmVlL2pzb24nLCBudWxsKTtcbiAgfSxcbiAgLyoqXG4gICAqIOagueaNruWIhuexu+iOt+WPluaWh+eroOWIl+ihqFxuICAgKi9cbiAgZ2V0QXJ0aWNsZUJ5Q2xhc3NpZnkocGFnZSwgY2lkKSB7XG4gICAgcmV0dXJuIGdldCgnYXJ0aWNsZS9saXN0LycgKyBwYWdlICsgJy9qc29uP2NpZD0nICsgY2lkLCBudWxsLCB7XG4gICAgICB3aXRoQXV0aDogdHJ1ZSxcbiAgICAgIGNhblNraXA6IHRydWVcbiAgICB9KTtcbiAgfSxcbiAgLyoqXG4gICAqIOeZu+W9lVxuICAgKi9cbiAgbG9naW4ocGFyYW1zKSB7XG4gICAgcmV0dXJuIHBvc3QoJ3VzZXIvbG9naW4nLCBwYXJhbXMpO1xuICB9LFxuICAvKipcbiAgICog5rOo5YaMXG4gICAqL1xuICByZWdpc3RlcihwYXJhbXMpIHtcbiAgICByZXR1cm4gcG9zdCgndXNlci9yZWdpc3RlcicsIHBhcmFtcyk7XG4gIH0sXG4gIC8qKlxuICAgKiDojrflj5bmlLbol4/mlofnq6DliJfooahcbiAgICovXG4gIGdldENvbGxlY3RBcnRpY2xlKHBhZ2UpIHtcbiAgICByZXR1cm4gZ2V0KCdsZy9jb2xsZWN0L2xpc3QvJyArIHBhZ2UgKyAnL2pzb24nLCBudWxsLCB7IHdpdGhBdXRoOiB0cnVlIH0pO1xuICB9LFxuICAvKipcbiAgICog5pS26JeP56uZ5YaF5paH56ugXG4gICAqL1xuICBjb2xsZWN0QXJ0aWNsZShpZCkge1xuICAgIHJldHVybiBwb3N0KCdsZy9jb2xsZWN0LycgKyBpZCArICcvanNvbicsIG51bGwsIHsgd2l0aEF1dGg6IHRydWUgfSk7XG4gIH0sXG4gIC8qKlxuICAgKiDmlLbol4/nq5nlpJbmlofnq6BcbiAgICovXG4gIGNvbGxlY3RBcnRpY2xlQWRkKHBhcmFtcykge1xuICAgIHJldHVybiBwb3N0KCdsZy9jb2xsZWN0L2FkZC9qc29uJywgcGFyYW1zLCB7IHdpdGhBdXRoOiB0cnVlIH0pO1xuICB9LFxuICAvKipcbiAgICog5LuO5paH56ug5YiX6KGo5Y+W5raI5pS26JePXG4gICAqL1xuICB1bmNvbGxlY3RBcnRpY2xlKGlkKSB7XG4gICAgcmV0dXJuIHBvc3QoJ2xnL3VuY29sbGVjdF9vcmlnaW5JZC8nICsgaWQgKyAnL2pzb24nLCBudWxsLCB7IHdpdGhBdXRoOiB0cnVlIH0pO1xuICB9LFxuICAvKipcbiAgICog5LuO5pS26JeP5YiX6KGo5Y+W5raI5pS26JePXG4gICAqL1xuICB1bmNvbGxlY3QoaWQsIG9yaWdpbklkKSB7XG4gICAgcmV0dXJuIHBvc3QoJ2xnL3VuY29sbGVjdC8nICsgaWQgKyAnL2pzb24nLCB7IG9yaWdpbklkOiBvcmlnaW5JZCB9LCB7IHdpdGhBdXRoOiB0cnVlIH0pO1xuICB9LFxuICAvKipcbiAgICog6I635Y+W5pS26JeP572R56uZ5YiX6KGoXG4gICAqL1xuICBnZXRDb2xsZWN0V2ViKCkge1xuICAgIHJldHVybiBnZXQoJ2xnL2NvbGxlY3QvdXNlcnRvb2xzL2pzb24nLCBudWxsLCB7IHdpdGhBdXRoOiB0cnVlIH0pO1xuICB9LFxuICAvKipcbiAgICog5pS26JeP572R56uZXG4gICAqL1xuICBjb2xsZWN0V2ViKHBhcmFtcykge1xuICAgIHJldHVybiBwb3N0KCdsZy9jb2xsZWN0L2FkZHRvb2wvanNvbicsIHBhcmFtcywgeyB3aXRoQXV0aDogdHJ1ZSB9KTtcbiAgfSxcbiAgLyoqXG4gICAqIOe8lui+keaUtuiXj+eahOe9keWdgFxuICAgKi9cbiAgZWRpdENvbGxlY3RXZWIocGFyYW1zKSB7XG4gICAgcmV0dXJuIHBvc3QoJ2xnL2NvbGxlY3QvdXBkYXRldG9vbC9qc29uJywgcGFyYW1zLCB7IHdpdGhBdXRoOiB0cnVlIH0pO1xuICB9LFxuICAvKipcbiAgICog5Yig6Zmk5pS26JeP55qE572R5Z2AXG4gICAqL1xuICBkZWxldGVDb2xsZWN0V2ViKGlkKSB7XG4gICAgcmV0dXJuIHBvc3QoJ2xnL2NvbGxlY3QvZGVsZXRldG9vbC9qc29uJywgeyBpZDogaWQgfSwgeyB3aXRoQXV0aDogdHJ1ZSB9KTtcbiAgfVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9Db21tb24vQXBpL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IiwiaW1wb3J0IGFwaSBmcm9tICcuL2luZGV4JztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbGxlY3RBcnRpY2xlKHBhZ2UpIHtcbiAgcmV0dXJuIGFwaS5nZXRDb2xsZWN0QXJ0aWNsZShwYWdlKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKEpTT04ucGFyc2UocmVzcG9uc2UuZGF0YSkuZGF0YSk7XG4gIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29sbGVjdEFydGljbGUoaWQpIHtcbiAgcmV0dXJuIGFwaS5jb2xsZWN0QXJ0aWNsZShpZCkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgdmFyIHZhbHVlID0gSlNPTi5wYXJzZShyZXNwb25zZS5kYXRhKTtcbiAgICBpZiAodmFsdWUuZXJyb3JDb2RlID09PSAtMSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCfor7flhYjnmbvlvZUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWx1ZS5kYXRhKTtcbiAgICB9XG4gIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29sbGVjdEFydGljbGVBZGQodGl0bGUsIGF1dGhvciwgbGluaykge1xuICByZXR1cm4gYXBpLmNvbGxlY3RBcnRpY2xlQWRkKHtcbiAgICB0aXRsZTogdGl0bGUsXG4gICAgYXV0aG9yOiBhdXRob3IsXG4gICAgbGluazogbGlua1xuICB9KS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKEpTT04ucGFyc2UocmVzcG9uc2UuZGF0YSkuZGF0YSk7XG4gIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5jb2xsZWN0QXJ0aWNsZShpZCkge1xuICByZXR1cm4gYXBpLnVuY29sbGVjdEFydGljbGUoaWQpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoSlNPTi5wYXJzZShyZXNwb25zZS5kYXRhKS5kYXRhKTtcbiAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bmNvbGxlY3QoaWQsIG9yaWdpbklkKSB7XG4gIHJldHVybiBhcGkudW5jb2xsZWN0KGlkLCBvcmlnaW5JZCkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShKU09OLnBhcnNlKHJlc3BvbnNlLmRhdGEpLmRhdGEpO1xuICB9KS5jYXRjaChlcnIgPT4ge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbGxlY3RXZWIoKSB7XG4gIHJldHVybiBhcGkuZ2V0Q29sbGVjdFdlYigpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoSlNPTi5wYXJzZShyZXNwb25zZS5kYXRhKS5kYXRhKTtcbiAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb2xsZWN0V2ViKG5hbWUsIGxpbmspIHtcbiAgcmV0dXJuIGFwaS5jb2xsZWN0V2ViKHtcbiAgICBuYW1lOiBuYW1lLFxuICAgIGxpbms6IGxpbmtcbiAgfSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShKU09OLnBhcnNlKHJlc3BvbnNlLmRhdGEpLmRhdGEpO1xuICB9KS5jYXRjaChlcnIgPT4ge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVkaXRDb2xsZWN0V2ViKGlkLCBuYW1lLCBsaW5rKSB7XG4gIHJldHVybiBhcGkuZWRpdENvbGxlY3RXZWIoe1xuICAgIGlkOiBpZCxcbiAgICBuYW1lOiBuYW1lLFxuICAgIGxpbms6IGxpbmtcbiAgfSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShKU09OLnBhcnNlKHJlc3BvbnNlLmRhdGEpLmRhdGEpO1xuICB9KS5jYXRjaChlcnIgPT4ge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZUNvbGxlY3RXZWIoaWQpIHtcbiAgcmV0dXJuIGFwaS5kZWxldGVDb2xsZWN0V2ViKGlkKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKEpTT04ucGFyc2UocmVzcG9uc2UuZGF0YSkuZGF0YSk7XG4gIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gIH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL0NvbW1vbi9BcGkvY29sbGVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCIsInZhciAkYXBwX3RlbXBsYXRlJCA9IHJlcXVpcmUoXCIhIWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWpzb24tbG9hZGVyLmpzIWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLXRlbXBsYXRlLWxvYWRlci5qcyFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL2luZGV4LnV4XCIpXG52YXIgJGFwcF9zdHlsZSQgPSByZXF1aXJlKFwiISFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1qc29uLWxvYWRlci5qcyFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1zdHlsZS1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZTpcXFxcWGtXb3JrXFxcXEZhc3RBcHBXb3JrU3BhY2VcXFxcZmFzdGFwcFxcXFxjb20ueGsuZmFzdGFwcFxcXFxzcmNcXFxcQ29tbW9uXFxcXENvbXBvbmVudFxcXFxDVGl0bGVcXFxcaW5kZXgudXghYzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWU6XFxcXFhrV29ya1xcXFxGYXN0QXBwV29ya1NwYWNlXFxcXGZhc3RhcHBcXFxcY29tLnhrLmZhc3RhcHBcXFxcc3JjXFxcXENvbW1vblxcXFxDb21wb25lbnRcXFxcQ1RpdGxlXFxcXGluZGV4LnV4IS4vaW5kZXgudXhcIilcbnZhciAkYXBwX3NjcmlwdCQgPSByZXF1aXJlKFwiISFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1zY3JpcHQtbG9hZGVyLmpzIWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWFjY2Vzcy1sb2FkZXIuanMhYzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcYmFiZWwtbG9hZGVyP3ByZXNldHNbXT1jOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxiYWJlbC1wcmVzZXQtZW52JnByZXNldHM9YzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcYmFiZWwtcHJlc2V0LWVudiZwbHVnaW5zW109YzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcanN4LWxvYWRlci5qcyZwbHVnaW5zPWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGpzeC1sb2FkZXIuanMmY29tbWVudHM9ZmFsc2UhYzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vaW5kZXgudXhcIilcblxuJGFwcF9kZWZpbmUkKCdAYXBwLWNvbXBvbmVudC9jLXRpdGxlJywgW10sIGZ1bmN0aW9uKCRhcHBfcmVxdWlyZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfbW9kdWxlJCl7XG4gICAgICRhcHBfc2NyaXB0JCgkYXBwX21vZHVsZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfcmVxdWlyZSQpXG4gICAgIGlmICgkYXBwX2V4cG9ydHMkLl9fZXNNb2R1bGUgJiYgJGFwcF9leHBvcnRzJC5kZWZhdWx0KSB7XG4gICAgICAgICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cyA9ICRhcHBfZXhwb3J0cyQuZGVmYXVsdFxuICAgICAgICB9XG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnRlbXBsYXRlID0gJGFwcF90ZW1wbGF0ZSRcbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMuc3R5bGUgPSAkYXBwX3N0eWxlJFxufSlcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2xvYWRlci5qcz90eXBlPWNvbXBvbmVudCEuL3NyYy9Db21tb24vQ29tcG9uZW50L0NUaXRsZS9pbmRleC51eD9uYW1lPWMtdGl0bGVcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gIFwiYXR0clwiOiB7fSxcbiAgXCJjbGFzc0xpc3RcIjogW1xuICAgIFwiYy10aXRsZVwiXG4gIF0sXG4gIFwiY2hpbGRyZW5cIjogW1xuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICBcImF0dHJcIjoge1xuICAgICAgICBcInNyY1wiOiBcIi9Db21tb24vSW1hZ2UvaWNvbl9iYWNrLnBuZ1wiXG4gICAgICB9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcImljb25cIlxuICAgICAgXSxcbiAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiB0aGlzLnNob3dCYWNrfSxcbiAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgXCJjbGlja1wiOiBcIm9uQmFja0NsaWNrXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiB0aGlzLnRpdGxlfVxuICAgICAgfSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJ0aXRsZVwiXG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgXCJzcmNcIjogZnVuY3Rpb24gKCkge3JldHVybiB0aGlzLnJpZ2h0SWNvbn1cbiAgICAgIH0sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwiaWNvblwiXG4gICAgICBdLFxuICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuIHRoaXMucmlnaHRJY29uIT09Jyd9LFxuICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICBcImNsaWNrXCI6IFwib25SaWdodEljb25DbGlja1wiXG4gICAgICB9XG4gICAgfVxuICBdXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gYzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtanNvbi1sb2FkZXIuanMhYzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtdGVtcGxhdGUtbG9hZGVyLmpzIWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9dGVtcGxhdGVzIS4vc3JjL0NvbW1vbi9Db21wb25lbnQvQ1RpdGxlL2luZGV4LnV4XG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIFwiLmMtdGl0bGVcIjoge1xuICAgIFwiZGlzcGxheVwiOiBcImZsZXhcIixcbiAgICBcImhlaWdodFwiOiBcIjEwMHB4XCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjMjRiOWZmXCJcbiAgfSxcbiAgXCIudGl0bGVcIjoge1xuICAgIFwidGV4dE92ZXJmbG93XCI6IFwiZWxsaXBzaXNcIixcbiAgICBcImxpbmVzXCI6IDEsXG4gICAgXCJmbGV4XCI6IDEsXG4gICAgXCJmb250U2l6ZVwiOiBcIjM2cHhcIixcbiAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgIFwibWFyZ2luTGVmdFwiOiBcIjIwcHhcIlxuICB9LFxuICBcIi5pY29uXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjEwMHB4XCIsXG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiMjZweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMjZweFwiLFxuICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjI2cHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMjZweFwiXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1qc29uLWxvYWRlci5qcyFjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1zdHlsZS1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZTovWGtXb3JrL0Zhc3RBcHBXb3JrU3BhY2UvZmFzdGFwcC9jb20ueGsuZmFzdGFwcC9zcmMvQ29tbW9uL0NvbXBvbmVudC9DVGl0bGUvaW5kZXgudXghYzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWU6L1hrV29yay9GYXN0QXBwV29ya1NwYWNlL2Zhc3RhcHAvY29tLnhrLmZhc3RhcHAvc3JjL0NvbW1vbi9Db21wb25lbnQvQ1RpdGxlL2luZGV4LnV4IS4vc3JjL0NvbW1vbi9Db21wb25lbnQvQ1RpdGxlL2luZGV4LnV4XG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsICRhcHBfcmVxdWlyZSQpeyd1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9wcm9wcyRwcm9wcyRvbkJhY2tDbDtcblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gKF9wcm9wcyRwcm9wcyRvbkJhY2tDbCA9IHtcbiAgcHJvcHM6IFsnc2hvd0JhY2snLCAndGl0bGUnLCAncmlnaHRJY29uJ11cbn0sIF9kZWZpbmVQcm9wZXJ0eShfcHJvcHMkcHJvcHMkb25CYWNrQ2wsICdwcm9wcycsIHtcbiAgc2hvd0JhY2s6IHRydWUsXG4gIHRpdGxlOiAnJyxcbiAgcmlnaHRJY29uOiAnJ1xufSksIF9kZWZpbmVQcm9wZXJ0eShfcHJvcHMkcHJvcHMkb25CYWNrQ2wsICdvbkJhY2tDbGljaycsIGZ1bmN0aW9uIG9uQmFja0NsaWNrKCkge1xuICB0aGlzLiRkaXNwYXRjaCgnaWNvbmNsaWNrJywgeyBpY29uOiAnYmFjaycgfSk7XG4gIHRoaXMuJGFwcC4kZGVmLnJvdXRlci5iYWNrKCk7XG59KSwgX2RlZmluZVByb3BlcnR5KF9wcm9wcyRwcm9wcyRvbkJhY2tDbCwgJ29uUmlnaHRJY29uQ2xpY2snLCBmdW5jdGlvbiBvblJpZ2h0SWNvbkNsaWNrKCkge1xuICB0aGlzLiRkaXNwYXRjaCgnaWNvbmNsaWNrJywgeyBpY29uOiAncmlnaHQnIH0pO1xufSksIF9wcm9wcyRwcm9wcyRvbkJhY2tDbCk7XG52YXIgbW9kdWxlT3duID0gZXhwb3J0cy5kZWZhdWx0IHx8IG1vZHVsZS5leHBvcnRzO1xudmFyIGFjY2Vzc29ycyA9IFsncHVibGljJywgJ3Byb3RlY3RlZCcsICdwcml2YXRlJ107XG5pZiAobW9kdWxlT3duLmRhdGEgJiYgYWNjZXNzb3JzLnNvbWUoZnVuY3Rpb24gKGFjYykge1xuICAgIHJldHVybiBtb2R1bGVPd25bYWNjXTtcbiAgfSkpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCfpobXpnaJWTeWvueixoeS4reWxnuaAp2RhdGHkuI3lj6/kuI5wdWJsaWMsIHByb3RlY3RlZCwgcHJpdmF0ZeWQjOaXtuWtmOWcqO+8jOivt+S9v+eUqHB1YmxpY+abv+S7o2RhdGHvvIEnKTtcbn0gZWxzZSBpZiAoIW1vZHVsZU93bi5kYXRhKSB7XG4gIG1vZHVsZU93bi5kYXRhID0ge307XG4gIG1vZHVsZU93bi5fZGVzY3JpcHRvciA9IHt9O1xuICBhY2Nlc3NvcnMuZm9yRWFjaChmdW5jdGlvbihhY2MpIHtcbiAgICB2YXIgYWNjVHlwZSA9IHR5cGVvZiBtb2R1bGVPd25bYWNjXTtcbiAgICBpZiAoYWNjVHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIG1vZHVsZU93bi5kYXRhID0gT2JqZWN0LmFzc2lnbihtb2R1bGVPd24uZGF0YSwgbW9kdWxlT3duW2FjY10pO1xuICAgICAgZm9yICh2YXIgbmFtZSBpbiBtb2R1bGVPd25bYWNjXSkge1xuICAgICAgICBtb2R1bGVPd24uX2Rlc2NyaXB0b3JbbmFtZV0gPSB7YWNjZXNzIDogYWNjfTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGFjY1R5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUud2Fybign6aG16Z2iVk3lr7nosaHkuK3nmoTlsZ7mgKcnICsgYWNjICsgJ+eahOWAvOS4jeiDveS9v+WHveaVsO+8jOivt+S9v+eUqOWvueixoScpO1xuICAgIH1cbiAgfSk7XG59fVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLXNjcmlwdC1sb2FkZXIuanMhYzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtYWNjZXNzLWxvYWRlci5qcyFjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliP3ByZXNldHNbXT1jOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9iYWJlbC1wcmVzZXQtZW52JnByZXNldHM9YzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvYmFiZWwtcHJlc2V0LWVudiZwbHVnaW5zW109YzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvanN4LWxvYWRlci5qcyZwbHVnaW5zPWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2pzeC1sb2FkZXIuanMmY29tbWVudHM9ZmFsc2UhYzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vc3JjL0NvbW1vbi9Db21wb25lbnQvQ1RpdGxlL2luZGV4LnV4XG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwicmVxdWlyZShcIiEhYzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50IS4uL0NvbW1vbi9Db21wb25lbnQvQ1RpdGxlL2luZGV4LnV4P25hbWU9Yy10aXRsZVwiKVxudmFyICRhcHBfdGVtcGxhdGUkID0gcmVxdWlyZShcIiEhYzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtanNvbi1sb2FkZXIuanMhYzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtdGVtcGxhdGUtbG9hZGVyLmpzIWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9dGVtcGxhdGVzIS4vYXJ0aWNsZWNvbGxlY3RsaXN0LnV4XCIpXG52YXIgJGFwcF9zdHlsZSQgPSByZXF1aXJlKFwiISFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1qc29uLWxvYWRlci5qcyFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1zdHlsZS1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZTpcXFxcWGtXb3JrXFxcXEZhc3RBcHBXb3JrU3BhY2VcXFxcZmFzdGFwcFxcXFxjb20ueGsuZmFzdGFwcFxcXFxzcmNcXFxcQXJ0aWNsZUNvbGxlY3RMaXN0XFxcXGFydGljbGVjb2xsZWN0bGlzdC51eCFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZTpcXFxcWGtXb3JrXFxcXEZhc3RBcHBXb3JrU3BhY2VcXFxcZmFzdGFwcFxcXFxjb20ueGsuZmFzdGFwcFxcXFxzcmNcXFxcQXJ0aWNsZUNvbGxlY3RMaXN0XFxcXGFydGljbGVjb2xsZWN0bGlzdC51eCEuL2FydGljbGVjb2xsZWN0bGlzdC51eFwiKVxudmFyICRhcHBfc2NyaXB0JCA9IHJlcXVpcmUoXCIhIWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLXNjcmlwdC1sb2FkZXIuanMhYzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtYWNjZXNzLWxvYWRlci5qcyFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxiYWJlbC1sb2FkZXI/cHJlc2V0c1tdPWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGJhYmVsLXByZXNldC1lbnYmcHJlc2V0cz1jOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxiYWJlbC1wcmVzZXQtZW52JnBsdWdpbnNbXT1jOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxqc3gtbG9hZGVyLmpzJnBsdWdpbnM9YzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcanN4LWxvYWRlci5qcyZjb21tZW50cz1mYWxzZSFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXNjcmlwdHMhLi9hcnRpY2xlY29sbGVjdGxpc3QudXhcIilcblxuJGFwcF9kZWZpbmUkKCdAYXBwLWNvbXBvbmVudC9hcnRpY2xlY29sbGVjdGxpc3QnLCBbXSwgZnVuY3Rpb24oJGFwcF9yZXF1aXJlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9tb2R1bGUkKXtcbiAgICAgJGFwcF9zY3JpcHQkKCRhcHBfbW9kdWxlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9yZXF1aXJlJClcbiAgICAgaWYgKCRhcHBfZXhwb3J0cyQuX19lc01vZHVsZSAmJiAkYXBwX2V4cG9ydHMkLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICRhcHBfbW9kdWxlJC5leHBvcnRzID0gJGFwcF9leHBvcnRzJC5kZWZhdWx0XG4gICAgICAgIH1cbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMudGVtcGxhdGUgPSAkYXBwX3RlbXBsYXRlJFxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy5zdHlsZSA9ICRhcHBfc3R5bGUkXG59KVxuXG4kYXBwX2Jvb3RzdHJhcCQoJ0BhcHAtY29tcG9uZW50L2FydGljbGVjb2xsZWN0bGlzdCcseyBwYWNrYWdlck5hbWU6J2ZhLXRvb2xraXQnLCBwYWNrYWdlclZlcnNpb246ICcxLjAuNi1TdGFibGUuMzAwJ30pXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvQXJ0aWNsZUNvbGxlY3RMaXN0L2FydGljbGVjb2xsZWN0bGlzdC51eFxuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIFwidHlwZVwiOiBcImRpdlwiLFxuICBcImF0dHJcIjoge30sXG4gIFwic3R5bGVcIjoge1xuICAgIFwiZGlzcGxheVwiOiBcImZsZXhcIixcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIlxuICB9LFxuICBcImNoaWxkcmVuXCI6IFtcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJjLXRpdGxlXCIsXG4gICAgICBcImF0dHJcIjoge1xuICAgICAgICBcInNob3dCYWNrXCI6IFwidHJ1ZVwiLFxuICAgICAgICBcIixcIjogXCJcIixcbiAgICAgICAgXCJ0aXRsZVwiOiBcIuaUtuiXj+eahOaWh+eroFwiLFxuICAgICAgICBcInJpZ2h0SWNvblwiOiBcIi9Db21tb24vSW1hZ2UvaWNvbl9hZGQucG5nXCJcbiAgICAgIH0sXG4gICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgIFwiaWNvbmNsaWNrXCI6IFwib25UaXRsZUljb25DbGlja1wiXG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICBcImF0dHJcIjoge1xuICAgICAgICBcInZhbHVlXCI6IFwi6ZW/5oyJ5Y+v5YiG5Lqr5paH56ugflwiXG4gICAgICB9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcImNsaWNrLXRpcFwiXG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJyZWZyZXNoXCIsXG4gICAgICBcImF0dHJcIjoge1xuICAgICAgICBcInJlZnJlc2hpbmdcIjogZnVuY3Rpb24gKCkge3JldHVybiB0aGlzLmlzUmVmcmVzaGluZ31cbiAgICAgIH0sXG4gICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgIFwicmVmcmVzaFwiOiBcInJlZnJlc2hcIlxuICAgICAgfSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwibGlzdFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcImhvbWUtcGFnZVwiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICBcInNjcm9sbGJvdHRvbVwiOiBcImxvYWRNb3JlRGF0YVwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYmxvY2tcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcInJlcGVhdFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuIHRoaXMuYXJ0aWNsZUxpc3R9LFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJsaXN0LWl0ZW1cIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImFydGljbGVcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJhcnRpY2xlLWl0ZW1cIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBmdW5jdGlvbiAoZXZ0KSB7dGhpcy5vcGVuQXJ0aWNsZSh0aGlzLiRpdGVtLmxpbmssdGhpcy4kaXRlbS50aXRsZSxldnQpfSxcbiAgICAgICAgICAgICAgICAgICAgXCJsb25ncHJlc3NcIjogZnVuY3Rpb24gKGV2dCkge3RoaXMuc2hhcmVMaW5rKHRoaXMuJGl0ZW0ubGluayxldnQpfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXNwbGF5XCI6IFwiZmxleFwiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiB0aGlzLiRpdGVtLnRpdGxlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0LXRpdGxlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmbGV4XCI6IDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNyY1wiOiBcIi4uL0NvbW1vbi9JbWFnZS9pY29uX2NvbGxlY3QucG5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjUycHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBcIjUycHhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBmdW5jdGlvbiAoZXZ0KSB7dGhpcy51bmNvbGxlY3QodGhpcy4kaXRlbS5pZCx0aGlzLiRpdGVtLm9yaWdpbklkLGV2dCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJhcnRpY2xlLXRpcFwiXG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gdGhpcy4kaXRlbS5jaGFwdGVyTmFtZSE9PScnfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAn5YiG57G7OiAnICsgKHRoaXMuJGl0ZW0uY2hhcHRlck5hbWUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aXBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYXJ0aWNsZS10aXBcIlxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gJ+S9nOiAhTogJyArICh0aGlzLiRpdGVtLmF1dGhvcil9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRpcFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gdGhpcy4kaXRlbS5uaWNlRGF0ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGltZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImxpc3QtaXRlbVwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImxvYWRNb3JlXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwibG9hZC1tb3JlXCJcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuIHRoaXMuYXJ0aWNsZUxpc3QubGVuZ3RoPjB9LFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJwcm9ncmVzc1wiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiY2lyY3VsYXJcIixcbiAgICAgICAgICAgICAgICAgICAgXCJzaG93XCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gdGhpcy5oYXNNb3JlRGF0YX1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwic2hvd1wiOiBmdW5jdGlvbiAoKSB7cmV0dXJuIHRoaXMuaGFzTW9yZURhdGF9LFxuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5Yqg6L295pu05aSaXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwic2hvd1wiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICF0aGlzLmhhc01vcmVEYXRhfSxcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuayoeacieabtOWkmuS6hn5cIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgXVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWpzb24tbG9hZGVyLmpzIWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLXRlbXBsYXRlLWxvYWRlci5qcyFjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL3NyYy9BcnRpY2xlQ29sbGVjdExpc3QvYXJ0aWNsZWNvbGxlY3RsaXN0LnV4XG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgXCIuYXJ0aWNsZS1pdGVtXCI6IHtcbiAgICBcInBhZGRpbmdUb3BcIjogXCIyMHB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIyMHB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMjBweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCIyMHB4XCIsXG4gICAgXCJkaXNwbGF5XCI6IFwiZmxleFwiLFxuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwiYm9yZGVyQm90dG9tV2lkdGhcIjogXCIxcHhcIixcbiAgICBcImJvcmRlckJvdHRvbUNvbG9yXCI6IFwiI2VlZWVlZVwiXG4gIH0sXG4gIFwiLmFydGljbGUtaXRlbSAudGV4dC10aXRsZVwiOiB7XG4gICAgXCJmb250U2l6ZVwiOiBcIjMwcHhcIixcbiAgICBcImNvbG9yXCI6IFwiIzJlMzEzNVwiLFxuICAgIFwidGV4dE92ZXJmbG93XCI6IFwiZWxsaXBzaXNcIixcbiAgICBcImxpbmVzXCI6IDEsXG4gICAgXCJtYXJnaW5Cb3R0b21cIjogXCI1cHhcIixcbiAgICBcIl9tZXRhXCI6IHtcbiAgICAgIFwicnVsZURlZlwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInRcIjogXCJhXCIsXG4gICAgICAgICAgXCJuXCI6IFwiY2xhc3NcIixcbiAgICAgICAgICBcImlcIjogZmFsc2UsXG4gICAgICAgICAgXCJhXCI6IFwiZWxlbWVudFwiLFxuICAgICAgICAgIFwidlwiOiBcImFydGljbGUtaXRlbVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInRcIjogXCJkXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidFwiOiBcImFcIixcbiAgICAgICAgICBcIm5cIjogXCJjbGFzc1wiLFxuICAgICAgICAgIFwiaVwiOiBmYWxzZSxcbiAgICAgICAgICBcImFcIjogXCJlbGVtZW50XCIsXG4gICAgICAgICAgXCJ2XCI6IFwidGV4dC10aXRsZVwiXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIH0sXG4gIFwiLmFydGljbGUtaXRlbSAuYXJ0aWNsZS10aXBcIjoge1xuICAgIFwiZGlzcGxheVwiOiBcImZsZXhcIixcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJyb3dcIixcbiAgICBcIl9tZXRhXCI6IHtcbiAgICAgIFwicnVsZURlZlwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInRcIjogXCJhXCIsXG4gICAgICAgICAgXCJuXCI6IFwiY2xhc3NcIixcbiAgICAgICAgICBcImlcIjogZmFsc2UsXG4gICAgICAgICAgXCJhXCI6IFwiZWxlbWVudFwiLFxuICAgICAgICAgIFwidlwiOiBcImFydGljbGUtaXRlbVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInRcIjogXCJkXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidFwiOiBcImFcIixcbiAgICAgICAgICBcIm5cIjogXCJjbGFzc1wiLFxuICAgICAgICAgIFwiaVwiOiBmYWxzZSxcbiAgICAgICAgICBcImFcIjogXCJlbGVtZW50XCIsXG4gICAgICAgICAgXCJ2XCI6IFwiYXJ0aWNsZS10aXBcIlxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICB9LFxuICBcIi5hcnRpY2xlLXRpcCAudGlwXCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiMjZweFwiLFxuICAgIFwiY29sb3JcIjogXCIjOTk5OTk5XCIsXG4gICAgXCJfbWV0YVwiOiB7XG4gICAgICBcInJ1bGVEZWZcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0XCI6IFwiYVwiLFxuICAgICAgICAgIFwiblwiOiBcImNsYXNzXCIsXG4gICAgICAgICAgXCJpXCI6IGZhbHNlLFxuICAgICAgICAgIFwiYVwiOiBcImVsZW1lbnRcIixcbiAgICAgICAgICBcInZcIjogXCJhcnRpY2xlLXRpcFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInRcIjogXCJkXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidFwiOiBcImFcIixcbiAgICAgICAgICBcIm5cIjogXCJjbGFzc1wiLFxuICAgICAgICAgIFwiaVwiOiBmYWxzZSxcbiAgICAgICAgICBcImFcIjogXCJlbGVtZW50XCIsXG4gICAgICAgICAgXCJ2XCI6IFwidGlwXCJcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgfSxcbiAgXCIuYXJ0aWNsZS10aXAgLnRpbWVcIjoge1xuICAgIFwiZm9udFNpemVcIjogXCIyNnB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiM5OTk5OTlcIixcbiAgICBcIl9tZXRhXCI6IHtcbiAgICAgIFwicnVsZURlZlwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInRcIjogXCJhXCIsXG4gICAgICAgICAgXCJuXCI6IFwiY2xhc3NcIixcbiAgICAgICAgICBcImlcIjogZmFsc2UsXG4gICAgICAgICAgXCJhXCI6IFwiZWxlbWVudFwiLFxuICAgICAgICAgIFwidlwiOiBcImFydGljbGUtdGlwXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidFwiOiBcImRcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0XCI6IFwiYVwiLFxuICAgICAgICAgIFwiblwiOiBcImNsYXNzXCIsXG4gICAgICAgICAgXCJpXCI6IGZhbHNlLFxuICAgICAgICAgIFwiYVwiOiBcImVsZW1lbnRcIixcbiAgICAgICAgICBcInZcIjogXCJ0aW1lXCJcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgfSxcbiAgXCIudGltZVwiOiB7XG4gICAgXCJmbGV4XCI6IDEsXG4gICAgXCJ0ZXh0QWxpZ25cIjogXCJyaWdodFwiXG4gIH0sXG4gIFwiLmxvYWQtbW9yZVwiOiB7XG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiMjBweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMjBweFwiLFxuICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjIwcHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMjBweFwiLFxuICAgIFwiZGlzcGxheVwiOiBcImZsZXhcIixcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJyb3dcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCIuY2xpY2stdGlwXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZWVlZWVlXCIsXG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiMTBweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMTBweFwiLFxuICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjEwcHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMTBweFwiXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1qc29uLWxvYWRlci5qcyFjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1zdHlsZS1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZTovWGtXb3JrL0Zhc3RBcHBXb3JrU3BhY2UvZmFzdGFwcC9jb20ueGsuZmFzdGFwcC9zcmMvQXJ0aWNsZUNvbGxlY3RMaXN0L2FydGljbGVjb2xsZWN0bGlzdC51eCFjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZTovWGtXb3JrL0Zhc3RBcHBXb3JrU3BhY2UvZmFzdGFwcC9jb20ueGsuZmFzdGFwcC9zcmMvQXJ0aWNsZUNvbGxlY3RMaXN0L2FydGljbGVjb2xsZWN0bGlzdC51eCEuL3NyYy9BcnRpY2xlQ29sbGVjdExpc3QvYXJ0aWNsZWNvbGxlY3RsaXN0LnV4XG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgJGFwcF9yZXF1aXJlJCl7J3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NvbGxlY3QgPSByZXF1aXJlKCcuLi9Db21tb24vQXBpL2NvbGxlY3QnKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0ge1xuICBkYXRhOiB7XG4gICAgYXJ0aWNsZUxpc3Q6IFtdLFxuICAgIHBhZ2U6IDAsXG4gICAgaGFzTW9yZURhdGE6IHRydWUsXG4gICAgaXNSZWZyZXNoaW5nOiBmYWxzZVxuICB9LFxuICBvbkluaXQ6IGZ1bmN0aW9uIG9uSW5pdCgpIHtcbiAgICB0aGlzLnJlZnJlc2goeyByZWZyZXNoaW5nOiB0cnVlIH0pO1xuICB9LFxuICBvblNob3c6IGZ1bmN0aW9uIG9uU2hvdygpIHtcbiAgICBpZiAodGhpcy4kYXBwLiRkYXRhLmRhdGFBZGRBcnRpY2xlICYmIHRoaXMuJGFwcC4kZGF0YS5kYXRhQWRkQXJ0aWNsZS5nb3RvUGFnZSA9PT0gJ2NvbGxlY3RBcnRpY2xlTGlzdCcpIHtcbiAgICAgIHZhciBkYXRhID0gdGhpcy4kYXBwLiRkYXRhLmRhdGFBZGRBcnRpY2xlLnBhcmFtcztcbiAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgdGhpcy5yZWZyZXNoKHsgcmVmcmVzaGluZzogdHJ1ZSB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGdldENvbGxlY3RBcnRpY2xlOiBmdW5jdGlvbiBnZXRDb2xsZWN0QXJ0aWNsZSgpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgKDAsIF9jb2xsZWN0LmdldENvbGxlY3RBcnRpY2xlKSh0aGlzLnBhZ2UpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIF90aGlzLmhhc01vcmVEYXRhID0gIWRhdGEub3ZlcjtcbiAgICAgIGlmIChfdGhpcy5wYWdlID4gMCkge1xuICAgICAgICBfdGhpcy5hcnRpY2xlTGlzdCA9IF90aGlzLmFydGljbGVMaXN0LmNvbmNhdChkYXRhLmRhdGFzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF90aGlzLmlzUmVmcmVzaGluZyA9IGZhbHNlO1xuICAgICAgICBfdGhpcy5hcnRpY2xlTGlzdCA9IGRhdGEuZGF0YXM7XG4gICAgICB9XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgX3RoaXMuaXNSZWZyZXNoaW5nID0gZmFsc2U7XG4gICAgfSk7XG4gIH0sXG4gIGxvYWRNb3JlRGF0YTogZnVuY3Rpb24gbG9hZE1vcmVEYXRhKCkge1xuICAgIGlmICh0aGlzLmhhc01vcmVEYXRhKSB7XG4gICAgICB0aGlzLnBhZ2UrKztcbiAgICAgIHRoaXMuZ2V0Q29sbGVjdEFydGljbGUoKTtcbiAgICB9XG4gIH0sXG4gIG9wZW5BcnRpY2xlOiBmdW5jdGlvbiBvcGVuQXJ0aWNsZShsaW5rLCB0aXRsZSkge1xuICAgIGlmIChsaW5rICE9PSAnJykge1xuICAgICAgdGhpcy4kYXBwLiRkZWYucm91dGVyLnB1c2goe1xuICAgICAgICB1cmk6ICdXZWJ2aWV3JyxcbiAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgICAgIHVybDogbGlua1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIHJlZnJlc2g6IGZ1bmN0aW9uIHJlZnJlc2goZXZ0KSB7XG4gICAgdGhpcy5pc1JlZnJlc2hpbmcgPSBldnQucmVmcmVzaGluZztcbiAgICB0aGlzLnBhZ2UgPSAwO1xuICAgIHRoaXMuZ2V0Q29sbGVjdEFydGljbGUoKTtcbiAgfSxcbiAgdW5jb2xsZWN0OiBmdW5jdGlvbiB1bmNvbGxlY3QoaWQsIG9yaWdpbklkKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAoMCwgX2NvbGxlY3QudW5jb2xsZWN0KShpZCwgb3JpZ2luSWQpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIF90aGlzMi5yZWZyZXNoKHsgcmVmcmVzaGluZzogdHJ1ZSB9KTtcbiAgICAgIF90aGlzMi4kYXBwLiRkZWYucHJvbXB0LnNob3dUb2FzdCh7IG1lc3NhZ2U6ICflt7Llj5bmtojmlLbol48nIH0pO1xuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgIF90aGlzMi4kYXBwLiRkZWYucHJvbXB0LnNob3dUb2FzdCh7IG1lc3NhZ2U6ICflj5bmtojmlLbol4/lpLHotKUnIH0pO1xuICAgIH0pO1xuICB9LFxuICBvblRpdGxlSWNvbkNsaWNrOiBmdW5jdGlvbiBvblRpdGxlSWNvbkNsaWNrKF9yZWYpIHtcbiAgICB2YXIgaWNvbiA9IF9yZWYuZGV0YWlsLmljb247XG5cbiAgICBpZiAoaWNvbiA9PT0gJ3JpZ2h0Jykge1xuICAgICAgdGhpcy4kYXBwLiRkZWYucm91dGVyLnB1c2goe1xuICAgICAgICB1cmk6ICdBZGRDb2xsZWN0QXJ0aWNsZSdcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgc2hhcmVMaW5rOiBmdW5jdGlvbiBzaGFyZUxpbmsodXJsKSB7XG4gICAgdGhpcy4kYXBwLiRkZWYuc2hhcmUuc2hhcmUoe1xuICAgICAgdHlwZTogXCJ0ZXh0L3BsYWluXCIsXG4gICAgICBkYXRhOiB1cmxcbiAgICB9KTtcbiAgfVxufTtcbnZhciBtb2R1bGVPd24gPSBleHBvcnRzLmRlZmF1bHQgfHwgbW9kdWxlLmV4cG9ydHM7XG52YXIgYWNjZXNzb3JzID0gWydwdWJsaWMnLCAncHJvdGVjdGVkJywgJ3ByaXZhdGUnXTtcbmlmIChtb2R1bGVPd24uZGF0YSAmJiBhY2Nlc3NvcnMuc29tZShmdW5jdGlvbiAoYWNjKSB7XG4gICAgcmV0dXJuIG1vZHVsZU93blthY2NdO1xuICB9KSkge1xuICB0aHJvdyBuZXcgRXJyb3IoJ+mhtemdolZN5a+56LGh5Lit5bGe5oCnZGF0YeS4jeWPr+S4jnB1YmxpYywgcHJvdGVjdGVkLCBwcml2YXRl5ZCM5pe25a2Y5Zyo77yM6K+35L2/55SocHVibGlj5pu/5LujZGF0Ye+8gScpO1xufSBlbHNlIGlmICghbW9kdWxlT3duLmRhdGEpIHtcbiAgbW9kdWxlT3duLmRhdGEgPSB7fTtcbiAgbW9kdWxlT3duLl9kZXNjcmlwdG9yID0ge307XG4gIGFjY2Vzc29ycy5mb3JFYWNoKGZ1bmN0aW9uKGFjYykge1xuICAgIHZhciBhY2NUeXBlID0gdHlwZW9mIG1vZHVsZU93blthY2NdO1xuICAgIGlmIChhY2NUeXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgbW9kdWxlT3duLmRhdGEgPSBPYmplY3QuYXNzaWduKG1vZHVsZU93bi5kYXRhLCBtb2R1bGVPd25bYWNjXSk7XG4gICAgICBmb3IgKHZhciBuYW1lIGluIG1vZHVsZU93blthY2NdKSB7XG4gICAgICAgIG1vZHVsZU93bi5fZGVzY3JpcHRvcltuYW1lXSA9IHthY2Nlc3MgOiBhY2N9O1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoYWNjVHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS53YXJuKCfpobXpnaJWTeWvueixoeS4reeahOWxnuaApycgKyBhY2MgKyAn55qE5YC85LiN6IO95L2/5Ye95pWw77yM6K+35L2/55So5a+56LGhJyk7XG4gICAgfVxuICB9KTtcbn19XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gYzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtc2NyaXB0LWxvYWRlci5qcyFjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1hY2Nlc3MtbG9hZGVyLmpzIWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWI/cHJlc2V0c1tdPWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2JhYmVsLXByZXNldC1lbnYmcHJlc2V0cz1jOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9iYWJlbC1wcmVzZXQtZW52JnBsdWdpbnNbXT1jOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9qc3gtbG9hZGVyLmpzJnBsdWdpbnM9YzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvanN4LWxvYWRlci5qcyZjb21tZW50cz1mYWxzZSFjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXNjcmlwdHMhLi9zcmMvQXJ0aWNsZUNvbGxlY3RMaXN0L2FydGljbGVjb2xsZWN0bGlzdC51eFxuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAyIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3hMQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ3hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDNUxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QSIsInNvdXJjZVJvb3QiOiIifQ==