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
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
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
/* 7 */
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(module, exports, $app_require$){'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _home = __webpack_require__(9);

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
/* 9 */
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
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var $app_template$ = __webpack_require__(6)
var $app_style$ = __webpack_require__(7)
var $app_script$ = __webpack_require__(8)

$app_define$('@app-component/home', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})

$app_bootstrap$('@app-component/home',{ packagerName:'fa-toolkit', packagerVersion: '1.0.6-Stable.300'})

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRcXEhvbWVcXGhvbWUuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTIwMzA4ODM1ZTQzNmU5MDYxNDkiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbW1vbi9BcGkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbW1vbi9BcGkvY29sbGVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvSG9tZS9ob21lLnV4PzQ1NjQiLCJ3ZWJwYWNrOi8vLy4vc3JjL0hvbWUvaG9tZS51eD8wZGE0Iiwid2VicGFjazovLy8uL3NyYy9Ib21lL2hvbWUudXg/ZWM4NCIsIndlYnBhY2s6Ly8vLi9zcmMvQ29tbW9uL0FwaS9ob21lLmpzIiwid2VicGFjazovLy8uL3NyYy9Ib21lL2hvbWUudXgiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDEyMDMwODgzNWU0MzZlOTA2MTQ5IiwidmFyIGZldGNoID0gJGFwcF9yZXF1aXJlJCgnQGFwcC1tb2R1bGUvc3lzdGVtLmZldGNoJyk7XG52YXIgc3RvcmFnZSA9ICRhcHBfcmVxdWlyZSQoJ0BhcHAtbW9kdWxlL3N5c3RlbS5zdG9yYWdlJyk7XG5cbnZhciBBUElfUk9PVCA9ICdodHRwOi8vd3d3LndhbmFuZHJvaWQuY29tLyc7XG5cbnZhciBoZWFkZXJzID0ge307XG5cbi8vIGZ1bmN0aW9uIGdldEF1dGgobmV4dCkge1xuLy8gICBzdG9yYWdlLmdldCh7XG4vLyAgICAga2V5OiAnYXV0aCcsXG4vLyAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuLy8gICAgICAgaGVhZGVycy5Db29raWUgPSBkYXRhXG4vLyAgICAgICBuZXh0KHRydWUpXG4vLyAgICAgfSxcbi8vICAgICBmYWlsOiBmdW5jdGlvbihkYXRhLCBjb2RlKSB7XG4vLyAgICAgICBuZXh0KGZhbHNlKVxuLy8gICAgIH1cbi8vICAgfSlcbi8vIH1cblxuZnVuY3Rpb24gZ2V0QXV0aCgpIHtcbiAgLy8g5Y+k5Lq65LqR77ya4oCc5ZCb5a2Q5LiA6K+65Y2D6YeR4oCd77yM6L+Z56eN4oCc5om/6K+65bCG5p2l5Lya5omn6KGM4oCd55qE5a+56LGh5ZyoSmF2YVNjcmlwdOS4reensOS4ulByb21pc2Xlr7nosaEgeGsgMjAxOC0xMC0yNCAyMTo1NDoxM1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHN0b3JhZ2UuZ2V0KHtcbiAgICAgIGtleTogJ2F1dGgnLFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgaGVhZGVycy5Db29raWUgPSBkYXRhO1xuICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgfSxcbiAgICAgIGZhaWw6IGZ1bmN0aW9uIChkYXRhLCBjb2RlKSB7XG4gICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVhbEZldGNoKHVybCwgZGF0YSA9IG51bGwsIG1ldGhvZCA9ICdnZXQnKSB7XG4gIGNvbnNvbGUubG9nKCfilI/ilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIHilIEnKTtcbiAgY29uc29sZS5sb2coJ+KUgyB1cmw6ICcsIEFQSV9ST09UICsgdXJsKTtcbiAgY29uc29sZS5sb2coJ+KUgyBtZXRob2Q6ICcsIG1ldGhvZCk7XG4gIGNvbnNvbGUubG9nKCfilIMgZGF0YTogJywgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICBjb25zb2xlLmxvZygn4pSX4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSB4pSBJyk7XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBmZXRjaC5mZXRjaCh7XG4gICAgICB1cmw6IEFQSV9ST09UICsgdXJsLFxuICAgICAgZGF0YTogZGF0YSxcbiAgICAgIGhlYWRlcjogaGVhZGVycyxcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICAgIH0sXG4gICAgICBmYWlsOiBmdW5jdGlvbiAoZGF0YSwgY29kZSkge1xuICAgICAgICByZWplY3QoZGF0YSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiB3aXRoQXV0aCh1cmwsIGRhdGEgPSBudWxsLCBtZXRob2QgPSAnZ2V0JywgY2FuU2tpcCA9IGZhbHNlKSB7XG4gIHJldHVybiBnZXRBdXRoKCkudGhlbihhdXRoID0+IHtcbiAgICBpZiAoYXV0aCB8fCBjYW5Ta2lwKSB7XG4gICAgICByZXR1cm4gcmVhbEZldGNoKHVybCwgZGF0YSwgbWV0aG9kKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgcmVqZWN0KCfor7flhYjnmbvlvZXvvIEnKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHBvc3QodXJsLCBkYXRhID0gbnVsbCwgY29uZmlnID0ge30pIHtcbiAgaWYgKGNvbmZpZy53aXRoQXV0aCkge1xuICAgIHJldHVybiB3aXRoQXV0aCh1cmwsIGRhdGEsICdwb3N0JywgY29uZmlnLmNhblNraXApO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiByZWFsRmV0Y2godXJsLCBkYXRhLCAncG9zdCcpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldCh1cmwsIGRhdGEgPSBudWxsLCBjb25maWcgPSB7fSkge1xuICBpZiAoY29uZmlnLndpdGhBdXRoKSB7XG4gICAgcmV0dXJuIHdpdGhBdXRoKHVybCwgZGF0YSwgJ2dldCcsIGNvbmZpZy5jYW5Ta2lwKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcmVhbEZldGNoKHVybCwgZGF0YSwgJ2dldCcpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIOiOt+WPlummlumhtWJhbm5lcuWIl+ihqFxuICAgKi9cbiAgZ2V0QmFubmVyKHN1Y2Nlc3MsIGZhaWwpIHtcbiAgICByZXR1cm4gZ2V0KCdiYW5uZXIvanNvbicsIG51bGwpO1xuICB9LFxuICAvKipcbiAgICog6I635Y+W6aaW6aG15paH56ug5YiX6KGoXG4gICAqL1xuICBnZXRBcnRpY2xlKHBhZ2UpIHtcbiAgICByZXR1cm4gZ2V0KCdhcnRpY2xlL2xpc3QvJyArIHBhZ2UgKyAnL2pzb24nLCBudWxsLCB7XG4gICAgICB3aXRoQXV0aDogdHJ1ZSxcbiAgICAgIGNhblNraXA6IHRydWVcbiAgICB9KTtcbiAgfSxcbiAgLyoqXG4gICAqIOiOt+WPluS9k+ezu+WIhuexu1xuICAgKi9cbiAgZ2V0Q2xhc3NpZnlMaXN0KCkge1xuICAgIHJldHVybiBnZXQoJ3RyZWUvanNvbicsIG51bGwpO1xuICB9LFxuICAvKipcbiAgICog5qC55o2u5YiG57G76I635Y+W5paH56ug5YiX6KGoXG4gICAqL1xuICBnZXRBcnRpY2xlQnlDbGFzc2lmeShwYWdlLCBjaWQpIHtcbiAgICByZXR1cm4gZ2V0KCdhcnRpY2xlL2xpc3QvJyArIHBhZ2UgKyAnL2pzb24/Y2lkPScgKyBjaWQsIG51bGwsIHtcbiAgICAgIHdpdGhBdXRoOiB0cnVlLFxuICAgICAgY2FuU2tpcDogdHJ1ZVxuICAgIH0pO1xuICB9LFxuICAvKipcbiAgICog55m75b2VXG4gICAqL1xuICBsb2dpbihwYXJhbXMpIHtcbiAgICByZXR1cm4gcG9zdCgndXNlci9sb2dpbicsIHBhcmFtcyk7XG4gIH0sXG4gIC8qKlxuICAgKiDms6jlhoxcbiAgICovXG4gIHJlZ2lzdGVyKHBhcmFtcykge1xuICAgIHJldHVybiBwb3N0KCd1c2VyL3JlZ2lzdGVyJywgcGFyYW1zKTtcbiAgfSxcbiAgLyoqXG4gICAqIOiOt+WPluaUtuiXj+aWh+eroOWIl+ihqFxuICAgKi9cbiAgZ2V0Q29sbGVjdEFydGljbGUocGFnZSkge1xuICAgIHJldHVybiBnZXQoJ2xnL2NvbGxlY3QvbGlzdC8nICsgcGFnZSArICcvanNvbicsIG51bGwsIHsgd2l0aEF1dGg6IHRydWUgfSk7XG4gIH0sXG4gIC8qKlxuICAgKiDmlLbol4/nq5nlhoXmlofnq6BcbiAgICovXG4gIGNvbGxlY3RBcnRpY2xlKGlkKSB7XG4gICAgcmV0dXJuIHBvc3QoJ2xnL2NvbGxlY3QvJyArIGlkICsgJy9qc29uJywgbnVsbCwgeyB3aXRoQXV0aDogdHJ1ZSB9KTtcbiAgfSxcbiAgLyoqXG4gICAqIOaUtuiXj+ermeWkluaWh+eroFxuICAgKi9cbiAgY29sbGVjdEFydGljbGVBZGQocGFyYW1zKSB7XG4gICAgcmV0dXJuIHBvc3QoJ2xnL2NvbGxlY3QvYWRkL2pzb24nLCBwYXJhbXMsIHsgd2l0aEF1dGg6IHRydWUgfSk7XG4gIH0sXG4gIC8qKlxuICAgKiDku47mlofnq6DliJfooajlj5bmtojmlLbol49cbiAgICovXG4gIHVuY29sbGVjdEFydGljbGUoaWQpIHtcbiAgICByZXR1cm4gcG9zdCgnbGcvdW5jb2xsZWN0X29yaWdpbklkLycgKyBpZCArICcvanNvbicsIG51bGwsIHsgd2l0aEF1dGg6IHRydWUgfSk7XG4gIH0sXG4gIC8qKlxuICAgKiDku47mlLbol4/liJfooajlj5bmtojmlLbol49cbiAgICovXG4gIHVuY29sbGVjdChpZCwgb3JpZ2luSWQpIHtcbiAgICByZXR1cm4gcG9zdCgnbGcvdW5jb2xsZWN0LycgKyBpZCArICcvanNvbicsIHsgb3JpZ2luSWQ6IG9yaWdpbklkIH0sIHsgd2l0aEF1dGg6IHRydWUgfSk7XG4gIH0sXG4gIC8qKlxuICAgKiDojrflj5bmlLbol4/nvZHnq5nliJfooahcbiAgICovXG4gIGdldENvbGxlY3RXZWIoKSB7XG4gICAgcmV0dXJuIGdldCgnbGcvY29sbGVjdC91c2VydG9vbHMvanNvbicsIG51bGwsIHsgd2l0aEF1dGg6IHRydWUgfSk7XG4gIH0sXG4gIC8qKlxuICAgKiDmlLbol4/nvZHnq5lcbiAgICovXG4gIGNvbGxlY3RXZWIocGFyYW1zKSB7XG4gICAgcmV0dXJuIHBvc3QoJ2xnL2NvbGxlY3QvYWRkdG9vbC9qc29uJywgcGFyYW1zLCB7IHdpdGhBdXRoOiB0cnVlIH0pO1xuICB9LFxuICAvKipcbiAgICog57yW6L6R5pS26JeP55qE572R5Z2AXG4gICAqL1xuICBlZGl0Q29sbGVjdFdlYihwYXJhbXMpIHtcbiAgICByZXR1cm4gcG9zdCgnbGcvY29sbGVjdC91cGRhdGV0b29sL2pzb24nLCBwYXJhbXMsIHsgd2l0aEF1dGg6IHRydWUgfSk7XG4gIH0sXG4gIC8qKlxuICAgKiDliKDpmaTmlLbol4/nmoTnvZHlnYBcbiAgICovXG4gIGRlbGV0ZUNvbGxlY3RXZWIoaWQpIHtcbiAgICByZXR1cm4gcG9zdCgnbGcvY29sbGVjdC9kZWxldGV0b29sL2pzb24nLCB7IGlkOiBpZCB9LCB7IHdpdGhBdXRoOiB0cnVlIH0pO1xuICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL0NvbW1vbi9BcGkvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsImltcG9ydCBhcGkgZnJvbSAnLi9pbmRleCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb2xsZWN0QXJ0aWNsZShwYWdlKSB7XG4gIHJldHVybiBhcGkuZ2V0Q29sbGVjdEFydGljbGUocGFnZSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShKU09OLnBhcnNlKHJlc3BvbnNlLmRhdGEpLmRhdGEpO1xuICB9KS5jYXRjaChlcnIgPT4ge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbGxlY3RBcnRpY2xlKGlkKSB7XG4gIHJldHVybiBhcGkuY29sbGVjdEFydGljbGUoaWQpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgIHZhciB2YWx1ZSA9IEpTT04ucGFyc2UocmVzcG9uc2UuZGF0YSk7XG4gICAgaWYgKHZhbHVlLmVycm9yQ29kZSA9PT0gLTEpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgn6K+35YWI55m75b2VJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUuZGF0YSk7XG4gICAgfVxuICB9KS5jYXRjaChlcnIgPT4ge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbGxlY3RBcnRpY2xlQWRkKHRpdGxlLCBhdXRob3IsIGxpbmspIHtcbiAgcmV0dXJuIGFwaS5jb2xsZWN0QXJ0aWNsZUFkZCh7XG4gICAgdGl0bGU6IHRpdGxlLFxuICAgIGF1dGhvcjogYXV0aG9yLFxuICAgIGxpbms6IGxpbmtcbiAgfSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShKU09OLnBhcnNlKHJlc3BvbnNlLmRhdGEpLmRhdGEpO1xuICB9KS5jYXRjaChlcnIgPT4ge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuY29sbGVjdEFydGljbGUoaWQpIHtcbiAgcmV0dXJuIGFwaS51bmNvbGxlY3RBcnRpY2xlKGlkKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKEpTT04ucGFyc2UocmVzcG9uc2UuZGF0YSkuZGF0YSk7XG4gIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5jb2xsZWN0KGlkLCBvcmlnaW5JZCkge1xuICByZXR1cm4gYXBpLnVuY29sbGVjdChpZCwgb3JpZ2luSWQpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoSlNPTi5wYXJzZShyZXNwb25zZS5kYXRhKS5kYXRhKTtcbiAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb2xsZWN0V2ViKCkge1xuICByZXR1cm4gYXBpLmdldENvbGxlY3RXZWIoKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKEpTT04ucGFyc2UocmVzcG9uc2UuZGF0YSkuZGF0YSk7XG4gIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29sbGVjdFdlYihuYW1lLCBsaW5rKSB7XG4gIHJldHVybiBhcGkuY29sbGVjdFdlYih7XG4gICAgbmFtZTogbmFtZSxcbiAgICBsaW5rOiBsaW5rXG4gIH0pLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoSlNPTi5wYXJzZShyZXNwb25zZS5kYXRhKS5kYXRhKTtcbiAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlZGl0Q29sbGVjdFdlYihpZCwgbmFtZSwgbGluaykge1xuICByZXR1cm4gYXBpLmVkaXRDb2xsZWN0V2ViKHtcbiAgICBpZDogaWQsXG4gICAgbmFtZTogbmFtZSxcbiAgICBsaW5rOiBsaW5rXG4gIH0pLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoSlNPTi5wYXJzZShyZXNwb25zZS5kYXRhKS5kYXRhKTtcbiAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVDb2xsZWN0V2ViKGlkKSB7XG4gIHJldHVybiBhcGkuZGVsZXRlQ29sbGVjdFdlYihpZCkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShKU09OLnBhcnNlKHJlc3BvbnNlLmRhdGEpLmRhdGEpO1xuICB9KS5jYXRjaChlcnIgPT4ge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9Db21tb24vQXBpL2NvbGxlY3QuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBcInR5cGVcIjogXCJyZWZyZXNoXCIsXG4gIFwiYXR0clwiOiB7XG4gICAgXCJyZWZyZXNoaW5nXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gdGhpcy5pc1JlZnJlc2hpbmd9XG4gIH0sXG4gIFwiZXZlbnRzXCI6IHtcbiAgICBcInJlZnJlc2hcIjogXCJyZWZyZXNoXCJcbiAgfSxcbiAgXCJjaGlsZHJlblwiOiBbXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwibGlzdFwiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcImhvbWUtcGFnZVwiXG4gICAgICBdLFxuICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICBcInNjcm9sbGJvdHRvbVwiOiBcImxvYWRNb3JlRGF0YVwiXG4gICAgICB9LFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJsaXN0LWl0ZW1cIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYmFubmVyXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJzd2lwZXJcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICBcImF1dG9wbGF5XCI6IFwidHJ1ZVwiLFxuICAgICAgICAgICAgICAgIFwiaW50ZXJ2YWxcIjogXCI0MDAwXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwiYmFubmVyXCJcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3RhY2tcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJiYW5uZXJcIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwicmVwZWF0XCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gdGhpcy5iYW5uZXJsaXN0fSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJzcmNcIjogZnVuY3Rpb24gKCkge3JldHVybiB0aGlzLiRpdGVtLmltYWdlUGF0aH1cbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYmFubmVyLWltYWdlXCJcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogZnVuY3Rpb24gKGV2dCkge3RoaXMub3BlbkFydGljbGUodGhpcy4kaXRlbS51cmwsJycsdGhpcy4kaXRlbS50aXRsZSxldnQpfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuIHRoaXMuJGl0ZW0udGl0bGV9XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJhbm5lci10aXRsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwibGlzdC1pdGVtXCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwidHlwZVwiOiBcInRpcFwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLmnIDmlrDljZrmloctLemVv+aMieWPr+WIhuS6q+aWh+eroH5cIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgXCJ0ZXh0LXRpcFwiXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJibG9ja1wiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcInJlcGVhdFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuIHRoaXMuYXJ0aWNsZUxpc3R9LFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJsaXN0LWl0ZW1cIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJhcnRpY2xlXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwiYXJ0aWNsZS1pdGVtXCJcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogZnVuY3Rpb24gKGV2dCkge3RoaXMub3BlbkFydGljbGUodGhpcy4kaXRlbS5saW5rLHRoaXMuJGl0ZW0ucHJvamVjdExpbmssdGhpcy4kaXRlbS50aXRsZSxldnQpfSxcbiAgICAgICAgICAgICAgICBcImxvbmdwcmVzc1wiOiBmdW5jdGlvbiAoZXZ0KSB7dGhpcy5zaGFyZUxpbmsodGhpcy4kaXRlbS5saW5rLGV2dCl9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiZGlzcGxheVwiOiBcImZsZXhcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInNob3dcIjogZnVuY3Rpb24gKCkge3JldHVybiB0aGlzLiRpdGVtLmZyZXNofSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLmlrBcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YWdcIlxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuIHRoaXMuJGl0ZW0udGl0bGV9XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRleHQtdGl0bGVcIlxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImZsZXhcIjogMVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3JjXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gdGhpcy5jb2xsZWN0SWNvblt0aGlzLiRpdGVtLmNvbGxlY3Q/MTowXX1cbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjUycHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiNTJweFwiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IGZ1bmN0aW9uIChldnQpIHt0aGlzLmNsaWNrQ29sbGVjdCh0aGlzLiRpdGVtLGV2dCl9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJhcnRpY2xlLXRpcFwiXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAn5YiG57G7OiAnICsgKHRoaXMuJGl0ZW0uc3VwZXJDaGFwdGVyTmFtZSkgKyAnLycgKyAodGhpcy4kaXRlbS5jaGFwdGVyTmFtZSl9XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRpcFwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJhcnRpY2xlLXRpcFwiXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAn5L2c6ICFOiAnICsgKHRoaXMuJGl0ZW0uYXV0aG9yKX1cbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGlwXCJcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiB0aGlzLiRpdGVtLm5pY2VEYXRlfVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aW1lXCJcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJsaXN0LWl0ZW1cIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJ0eXBlXCI6IFwibG9hZE1vcmVcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJsb2FkLW1vcmVcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuIHRoaXMuYXJ0aWNsZUxpc3QubGVuZ3RoPjB9LFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJwcm9ncmVzc1wiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImNpcmN1bGFyXCIsXG4gICAgICAgICAgICAgICAgXCJzaG93XCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gdGhpcy5oYXNNb3JlRGF0YX1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgIFwic2hvd1wiOiBmdW5jdGlvbiAoKSB7cmV0dXJuIHRoaXMuaGFzTW9yZURhdGF9LFxuICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLliqDovb3mm7TlpJpcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgXCJzaG93XCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gIXRoaXMuaGFzTW9yZURhdGF9LFxuICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLmsqHmnInmm7TlpJrkuoZ+XCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgXVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWpzb24tbG9hZGVyLmpzIWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLXRlbXBsYXRlLWxvYWRlci5qcyFjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL3NyYy9Ib21lL2hvbWUudXhcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgXCIuYmFubmVyXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiNDIwcHhcIlxuICB9LFxuICBcIi5iYW5uZXItaW1hZ2VcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJoZWlnaHRcIjogXCI0MjBweFwiXG4gIH0sXG4gIFwiLmJhbm5lci10aXRsZVwiOiB7XG4gICAgXCJ0ZXh0T3ZlcmZsb3dcIjogXCJlbGxpcHNpc1wiLFxuICAgIFwibGluZXNcIjogMSxcbiAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiOTBweFwiLFxuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiMwMDAwMDBcIixcbiAgICBcIm9wYWNpdHlcIjogMC41XG4gIH0sXG4gIFwiLmFydGljbGUtaXRlbVwiOiB7XG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiMjBweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMjBweFwiLFxuICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjIwcHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMjBweFwiLFxuICAgIFwiZGlzcGxheVwiOiBcImZsZXhcIixcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcImJvcmRlckJvdHRvbVdpZHRoXCI6IFwiMXB4XCIsXG4gICAgXCJib3JkZXJCb3R0b21Db2xvclwiOiBcIiNlZWVlZWVcIlxuICB9LFxuICBcIi50ZXh0LXRpcFwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcInBhZGRpbmdUb3BcIjogXCIyMHB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIxMHB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMjBweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCIxMHB4XCIsXG4gICAgXCJib3JkZXJCb3R0b21XaWR0aFwiOiBcIjFweFwiLFxuICAgIFwiYm9yZGVyQm90dG9tQ29sb3JcIjogXCIjZWVlZWVlXCJcbiAgfSxcbiAgXCIuYXJ0aWNsZS1pdGVtIC50ZXh0LXRpdGxlXCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiMzBweFwiLFxuICAgIFwiY29sb3JcIjogXCIjMmUzMTM1XCIsXG4gICAgXCJ0ZXh0T3ZlcmZsb3dcIjogXCJlbGxpcHNpc1wiLFxuICAgIFwibGluZXNcIjogMSxcbiAgICBcIm1hcmdpbkJvdHRvbVwiOiBcIjVweFwiLFxuICAgIFwiX21ldGFcIjoge1xuICAgICAgXCJydWxlRGVmXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidFwiOiBcImFcIixcbiAgICAgICAgICBcIm5cIjogXCJjbGFzc1wiLFxuICAgICAgICAgIFwiaVwiOiBmYWxzZSxcbiAgICAgICAgICBcImFcIjogXCJlbGVtZW50XCIsXG4gICAgICAgICAgXCJ2XCI6IFwiYXJ0aWNsZS1pdGVtXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidFwiOiBcImRcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0XCI6IFwiYVwiLFxuICAgICAgICAgIFwiblwiOiBcImNsYXNzXCIsXG4gICAgICAgICAgXCJpXCI6IGZhbHNlLFxuICAgICAgICAgIFwiYVwiOiBcImVsZW1lbnRcIixcbiAgICAgICAgICBcInZcIjogXCJ0ZXh0LXRpdGxlXCJcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgfSxcbiAgXCIuYXJ0aWNsZS1pdGVtIC5hcnRpY2xlLXRpcFwiOiB7XG4gICAgXCJkaXNwbGF5XCI6IFwiZmxleFwiLFxuICAgIFwiZmxleERpcmVjdGlvblwiOiBcInJvd1wiLFxuICAgIFwiX21ldGFcIjoge1xuICAgICAgXCJydWxlRGVmXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidFwiOiBcImFcIixcbiAgICAgICAgICBcIm5cIjogXCJjbGFzc1wiLFxuICAgICAgICAgIFwiaVwiOiBmYWxzZSxcbiAgICAgICAgICBcImFcIjogXCJlbGVtZW50XCIsXG4gICAgICAgICAgXCJ2XCI6IFwiYXJ0aWNsZS1pdGVtXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidFwiOiBcImRcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0XCI6IFwiYVwiLFxuICAgICAgICAgIFwiblwiOiBcImNsYXNzXCIsXG4gICAgICAgICAgXCJpXCI6IGZhbHNlLFxuICAgICAgICAgIFwiYVwiOiBcImVsZW1lbnRcIixcbiAgICAgICAgICBcInZcIjogXCJhcnRpY2xlLXRpcFwiXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIH0sXG4gIFwiLmFydGljbGUtdGlwIC50aXBcIjoge1xuICAgIFwiZm9udFNpemVcIjogXCIyNnB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiM5OTk5OTlcIixcbiAgICBcIl9tZXRhXCI6IHtcbiAgICAgIFwicnVsZURlZlwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInRcIjogXCJhXCIsXG4gICAgICAgICAgXCJuXCI6IFwiY2xhc3NcIixcbiAgICAgICAgICBcImlcIjogZmFsc2UsXG4gICAgICAgICAgXCJhXCI6IFwiZWxlbWVudFwiLFxuICAgICAgICAgIFwidlwiOiBcImFydGljbGUtdGlwXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidFwiOiBcImRcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0XCI6IFwiYVwiLFxuICAgICAgICAgIFwiblwiOiBcImNsYXNzXCIsXG4gICAgICAgICAgXCJpXCI6IGZhbHNlLFxuICAgICAgICAgIFwiYVwiOiBcImVsZW1lbnRcIixcbiAgICAgICAgICBcInZcIjogXCJ0aXBcIlxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICB9LFxuICBcIi5hcnRpY2xlLXRpcCAudGltZVwiOiB7XG4gICAgXCJmb250U2l6ZVwiOiBcIjI2cHhcIixcbiAgICBcImNvbG9yXCI6IFwiIzk5OTk5OVwiLFxuICAgIFwiX21ldGFcIjoge1xuICAgICAgXCJydWxlRGVmXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidFwiOiBcImFcIixcbiAgICAgICAgICBcIm5cIjogXCJjbGFzc1wiLFxuICAgICAgICAgIFwiaVwiOiBmYWxzZSxcbiAgICAgICAgICBcImFcIjogXCJlbGVtZW50XCIsXG4gICAgICAgICAgXCJ2XCI6IFwiYXJ0aWNsZS10aXBcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0XCI6IFwiZFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInRcIjogXCJhXCIsXG4gICAgICAgICAgXCJuXCI6IFwiY2xhc3NcIixcbiAgICAgICAgICBcImlcIjogZmFsc2UsXG4gICAgICAgICAgXCJhXCI6IFwiZWxlbWVudFwiLFxuICAgICAgICAgIFwidlwiOiBcInRpbWVcIlxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICB9LFxuICBcIi50aW1lXCI6IHtcbiAgICBcImZsZXhcIjogMSxcbiAgICBcInRleHRBbGlnblwiOiBcInJpZ2h0XCJcbiAgfSxcbiAgXCIudGFnXCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiMjJweFwiLFxuICAgIFwiY29sb3JcIjogXCIjRkYwMDAwXCIsXG4gICAgXCJib3JkZXJUb3BXaWR0aFwiOiBcIjFweFwiLFxuICAgIFwiYm9yZGVyUmlnaHRXaWR0aFwiOiBcIjFweFwiLFxuICAgIFwiYm9yZGVyQm90dG9tV2lkdGhcIjogXCIxcHhcIixcbiAgICBcImJvcmRlckxlZnRXaWR0aFwiOiBcIjFweFwiLFxuICAgIFwiYm9yZGVyVG9wQ29sb3JcIjogXCIjRkYwMDAwXCIsXG4gICAgXCJib3JkZXJSaWdodENvbG9yXCI6IFwiI0ZGMDAwMFwiLFxuICAgIFwiYm9yZGVyQm90dG9tQ29sb3JcIjogXCIjRkYwMDAwXCIsXG4gICAgXCJib3JkZXJMZWZ0Q29sb3JcIjogXCIjRkYwMDAwXCIsXG4gICAgXCJtYXJnaW5SaWdodFwiOiBcIjEwcHhcIixcbiAgICBcInBhZGRpbmdUb3BcIjogXCIycHhcIixcbiAgICBcInBhZGRpbmdSaWdodFwiOiBcIjJweFwiLFxuICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjJweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCIycHhcIixcbiAgICBcImhlaWdodFwiOiBcIjMycHhcIlxuICB9LFxuICBcIi5sb2FkLW1vcmVcIjoge1xuICAgIFwicGFkZGluZ1RvcFwiOiBcIjIwcHhcIixcbiAgICBcInBhZGRpbmdSaWdodFwiOiBcIjIwcHhcIixcbiAgICBcInBhZGRpbmdCb3R0b21cIjogXCIyMHB4XCIsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjIwcHhcIixcbiAgICBcImRpc3BsYXlcIjogXCJmbGV4XCIsXG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwicm93XCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImNlbnRlclwiXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1qc29uLWxvYWRlci5qcyFjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1zdHlsZS1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZTovWGtXb3JrL0Zhc3RBcHBXb3JrU3BhY2UvZmFzdGFwcC9jb20ueGsuZmFzdGFwcC9zcmMvSG9tZS9ob21lLnV4IWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1lOi9Ya1dvcmsvRmFzdEFwcFdvcmtTcGFjZS9mYXN0YXBwL2NvbS54ay5mYXN0YXBwL3NyYy9Ib21lL2hvbWUudXghLi9zcmMvSG9tZS9ob21lLnV4XG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsICRhcHBfcmVxdWlyZSQpeyd1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9ob21lID0gcmVxdWlyZSgnLi4vQ29tbW9uL0FwaS9ob21lJyk7XG5cbnZhciBfY29sbGVjdCA9IHJlcXVpcmUoJy4uL0NvbW1vbi9BcGkvY29sbGVjdCcpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSB7XG4gIGRhdGE6IHtcbiAgICBiYW5uZXJsaXN0OiBbXSxcbiAgICBhcnRpY2xlTGlzdDogW10sXG4gICAgcGFnZTogMCxcbiAgICBoYXNNb3JlRGF0YTogdHJ1ZSxcbiAgICBpc1JlZnJlc2hpbmc6IGZhbHNlLFxuICAgIGNvbGxlY3RJY29uOiBbJy4uL0NvbW1vbi9JbWFnZS9pY29uX3VuY29sbGVjdC5wbmcnLCAnLi4vQ29tbW9uL0ltYWdlL2ljb25fY29sbGVjdC5wbmcnXVxuICB9LFxuICBvbkluaXQ6IGZ1bmN0aW9uIG9uSW5pdCgpIHtcbiAgICB0aGlzLnJlZnJlc2goeyByZWZyZXNoaW5nOiB0cnVlIH0pO1xuICB9LFxuICBnZXRCYW5uZXI6IGZ1bmN0aW9uIGdldEJhbm5lcigpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgKDAsIF9ob21lLmdldEJhbm5lcikoKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICBfdGhpcy5iYW5uZXJsaXN0ID0gZGF0YTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0QXJ0aWNsZTogZnVuY3Rpb24gZ2V0QXJ0aWNsZSgpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICgwLCBfaG9tZS5nZXRBcnRpY2xlKSh0aGlzLnBhZ2UpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIF90aGlzMi5oYXNNb3JlRGF0YSA9ICFkYXRhLm92ZXI7XG4gICAgICBpZiAoX3RoaXMyLnBhZ2UgPiAwKSB7XG4gICAgICAgIF90aGlzMi5hcnRpY2xlTGlzdCA9IF90aGlzMi5hcnRpY2xlTGlzdC5jb25jYXQoZGF0YS5kYXRhcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfdGhpczIuaXNSZWZyZXNoaW5nID0gZmFsc2U7XG4gICAgICAgIF90aGlzMi5hcnRpY2xlTGlzdCA9IGRhdGEuZGF0YXM7XG4gICAgICB9XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgX3RoaXMyLmlzUmVmcmVzaGluZyA9IGZhbHNlO1xuICAgIH0pO1xuICB9LFxuICBsb2FkTW9yZURhdGE6IGZ1bmN0aW9uIGxvYWRNb3JlRGF0YSgpIHtcbiAgICBpZiAodGhpcy5oYXNNb3JlRGF0YSkge1xuICAgICAgdGhpcy5wYWdlKys7XG4gICAgICB0aGlzLmdldEFydGljbGUoKTtcbiAgICB9XG4gIH0sXG4gIG9wZW5BcnRpY2xlOiBmdW5jdGlvbiBvcGVuQXJ0aWNsZShsaW5rLCBwcm9qZWN0TGluaywgdGl0bGUpIHtcbiAgICB2YXIgdXJsID0gcHJvamVjdExpbmsgPT09ICcnID8gbGluayA6IHByb2plY3RMaW5rO1xuICAgIGlmICh1cmwgIT09ICcnKSB7XG4gICAgICB0aGlzLiRhcHAuJGRlZi5yb3V0ZXIucHVzaCh7XG4gICAgICAgIHVyaTogJ1dlYnZpZXcnLFxuICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICB0aXRsZTogdGl0bGUsXG4gICAgICAgICAgdXJsOiB1cmxcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9LFxuICByZWZyZXNoOiBmdW5jdGlvbiByZWZyZXNoKGV2dCkge1xuICAgIHRoaXMuaXNSZWZyZXNoaW5nID0gZXZ0LnJlZnJlc2hpbmc7XG4gICAgdGhpcy5wYWdlID0gMDtcbiAgICB0aGlzLmdldEJhbm5lcigpO1xuICAgIHRoaXMuZ2V0QXJ0aWNsZSgpO1xuICB9LFxuICBjbGlja0NvbGxlY3Q6IGZ1bmN0aW9uIGNsaWNrQ29sbGVjdChpdGVtKSB7XG4gICAgaWYgKGl0ZW0uY29sbGVjdCkge1xuICAgICAgdGhpcy51bmNvbGxlY3QoaXRlbS5pZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29sbGVjdChpdGVtLmlkKTtcbiAgICB9XG4gIH0sXG4gIHVuY29sbGVjdDogZnVuY3Rpb24gdW5jb2xsZWN0KGlkKSB7XG4gICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAoMCwgX2NvbGxlY3QudW5jb2xsZWN0QXJ0aWNsZSkoaWQpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIF90aGlzMy5yZWZyZXNoKHsgcmVmcmVzaGluZzogdHJ1ZSB9KTtcbiAgICAgIF90aGlzMy4kYXBwLiRkZWYucHJvbXB0LnNob3dUb2FzdCh7IG1lc3NhZ2U6ICflt7Llj5bmtojmlLbol48nIH0pO1xuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgIF90aGlzMy4kYXBwLiRkZWYucHJvbXB0LnNob3dUb2FzdCh7IG1lc3NhZ2U6ICflj5bmtojmlLbol4/lpLHotKUnIH0pO1xuICAgIH0pO1xuICB9LFxuICBjb2xsZWN0OiBmdW5jdGlvbiBjb2xsZWN0KGlkKSB7XG4gICAgdmFyIF90aGlzNCA9IHRoaXM7XG5cbiAgICAoMCwgX2NvbGxlY3QuY29sbGVjdEFydGljbGUpKGlkKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICBfdGhpczQucmVmcmVzaCh7IHJlZnJlc2hpbmc6IHRydWUgfSk7XG4gICAgICBfdGhpczQuJGFwcC4kZGVmLnByb21wdC5zaG93VG9hc3QoeyBtZXNzYWdlOiAn5pS26JeP5oiQ5YqfficgfSk7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgX3RoaXM0LiRhcHAuJGRlZi5wcm9tcHQuc2hvd1RvYXN0KHsgbWVzc2FnZTogJ+aUtuiXj+Wksei0pe+8jOeZu+W9leS5i+WQjuaJjeWPr+aUtuiXj34nIH0pO1xuICAgIH0pO1xuICB9LFxuICBzaGFyZUxpbms6IGZ1bmN0aW9uIHNoYXJlTGluayh1cmwpIHtcbiAgICB0aGlzLiRhcHAuJGRlZi5zaGFyZS5zaGFyZSh7XG4gICAgICB0eXBlOiBcInRleHQvcGxhaW5cIixcbiAgICAgIGRhdGE6IHVybFxuICAgIH0pO1xuICB9XG59O1xudmFyIG1vZHVsZU93biA9IGV4cG9ydHMuZGVmYXVsdCB8fCBtb2R1bGUuZXhwb3J0cztcbnZhciBhY2Nlc3NvcnMgPSBbJ3B1YmxpYycsICdwcm90ZWN0ZWQnLCAncHJpdmF0ZSddO1xuaWYgKG1vZHVsZU93bi5kYXRhICYmIGFjY2Vzc29ycy5zb21lKGZ1bmN0aW9uIChhY2MpIHtcbiAgICByZXR1cm4gbW9kdWxlT3duW2FjY107XG4gIH0pKSB7XG4gIHRocm93IG5ldyBFcnJvcign6aG16Z2iVk3lr7nosaHkuK3lsZ7mgKdkYXRh5LiN5Y+v5LiOcHVibGljLCBwcm90ZWN0ZWQsIHByaXZhdGXlkIzml7blrZjlnKjvvIzor7fkvb/nlKhwdWJsaWPmm7/ku6NkYXRh77yBJyk7XG59IGVsc2UgaWYgKCFtb2R1bGVPd24uZGF0YSkge1xuICBtb2R1bGVPd24uZGF0YSA9IHt9O1xuICBtb2R1bGVPd24uX2Rlc2NyaXB0b3IgPSB7fTtcbiAgYWNjZXNzb3JzLmZvckVhY2goZnVuY3Rpb24oYWNjKSB7XG4gICAgdmFyIGFjY1R5cGUgPSB0eXBlb2YgbW9kdWxlT3duW2FjY107XG4gICAgaWYgKGFjY1R5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBtb2R1bGVPd24uZGF0YSA9IE9iamVjdC5hc3NpZ24obW9kdWxlT3duLmRhdGEsIG1vZHVsZU93blthY2NdKTtcbiAgICAgIGZvciAodmFyIG5hbWUgaW4gbW9kdWxlT3duW2FjY10pIHtcbiAgICAgICAgbW9kdWxlT3duLl9kZXNjcmlwdG9yW25hbWVdID0ge2FjY2VzcyA6IGFjY307XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChhY2NUeXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ+mhtemdolZN5a+56LGh5Lit55qE5bGe5oCnJyArIGFjYyArICfnmoTlgLzkuI3og73kvb/lh73mlbDvvIzor7fkvb/nlKjlr7nosaEnKTtcbiAgICB9XG4gIH0pO1xufX1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1zY3JpcHQtbG9hZGVyLmpzIWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWFjY2Vzcy1sb2FkZXIuanMhYzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYj9wcmVzZXRzW109YzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvYmFiZWwtcHJlc2V0LWVudiZwcmVzZXRzPWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2JhYmVsLXByZXNldC1lbnYmcGx1Z2luc1tdPWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2pzeC1sb2FkZXIuanMmcGx1Z2lucz1jOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9qc3gtbG9hZGVyLmpzJmNvbW1lbnRzPWZhbHNlIWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyEuL3NyYy9Ib21lL2hvbWUudXhcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJpbXBvcnQgYXBpIGZyb20gJy4vaW5kZXgnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QmFubmVyKCkge1xuICByZXR1cm4gYXBpLmdldEJhbm5lcigpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoSlNPTi5wYXJzZShyZXNwb25zZS5kYXRhKS5kYXRhKTtcbiAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBcnRpY2xlKHBhZ2UgPSAwKSB7XG4gIHJldHVybiBhcGkuZ2V0QXJ0aWNsZShwYWdlKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKEpTT04ucGFyc2UocmVzcG9uc2UuZGF0YSkuZGF0YSk7XG4gIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gIH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL0NvbW1vbi9BcGkvaG9tZS5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciAkYXBwX3RlbXBsYXRlJCA9IHJlcXVpcmUoXCIhIWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWpzb24tbG9hZGVyLmpzIWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLXRlbXBsYXRlLWxvYWRlci5qcyFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL2hvbWUudXhcIilcbnZhciAkYXBwX3N0eWxlJCA9IHJlcXVpcmUoXCIhIWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWpzb24tbG9hZGVyLmpzIWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLXN0eWxlLWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1lOlxcXFxYa1dvcmtcXFxcRmFzdEFwcFdvcmtTcGFjZVxcXFxmYXN0YXBwXFxcXGNvbS54ay5mYXN0YXBwXFxcXHNyY1xcXFxIb21lXFxcXGhvbWUudXghYzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWU6XFxcXFhrV29ya1xcXFxGYXN0QXBwV29ya1NwYWNlXFxcXGZhc3RhcHBcXFxcY29tLnhrLmZhc3RhcHBcXFxcc3JjXFxcXEhvbWVcXFxcaG9tZS51eCEuL2hvbWUudXhcIilcbnZhciAkYXBwX3NjcmlwdCQgPSByZXF1aXJlKFwiISFjOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1zY3JpcHQtbG9hZGVyLmpzIWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWFjY2Vzcy1sb2FkZXIuanMhYzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcYmFiZWwtbG9hZGVyP3ByZXNldHNbXT1jOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxiYWJlbC1wcmVzZXQtZW52JnByZXNldHM9YzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcYmFiZWwtcHJlc2V0LWVudiZwbHVnaW5zW109YzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcanN4LWxvYWRlci5qcyZwbHVnaW5zPWM6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIEZhc3RBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGpzeC1sb2FkZXIuanMmY29tbWVudHM9ZmFsc2UhYzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vaG9tZS51eFwiKVxuXG4kYXBwX2RlZmluZSQoJ0BhcHAtY29tcG9uZW50L2hvbWUnLCBbXSwgZnVuY3Rpb24oJGFwcF9yZXF1aXJlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9tb2R1bGUkKXtcbiAgICAgJGFwcF9zY3JpcHQkKCRhcHBfbW9kdWxlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9yZXF1aXJlJClcbiAgICAgaWYgKCRhcHBfZXhwb3J0cyQuX19lc01vZHVsZSAmJiAkYXBwX2V4cG9ydHMkLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICRhcHBfbW9kdWxlJC5leHBvcnRzID0gJGFwcF9leHBvcnRzJC5kZWZhdWx0XG4gICAgICAgIH1cbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMudGVtcGxhdGUgPSAkYXBwX3RlbXBsYXRlJFxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy5zdHlsZSA9ICRhcHBfc3R5bGUkXG59KVxuXG4kYXBwX2Jvb3RzdHJhcCQoJ0BhcHAtY29tcG9uZW50L2hvbWUnLHsgcGFja2FnZXJOYW1lOidmYS10b29sa2l0JywgcGFja2FnZXJWZXJzaW9uOiAnMS4wLjYtU3RhYmxlLjMwMCd9KVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL0hvbWUvaG9tZS51eFxuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAxIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3hMQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ3hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDMU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzVLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMxSEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QSIsInNvdXJjZVJvb3QiOiIifQ==