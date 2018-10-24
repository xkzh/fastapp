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
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ({

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

var $app_script$ = __webpack_require__(20)

$app_define$('@app-application/app', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
})

$app_bootstrap$('@app-application/app',{ packagerName:'fa-toolkit', packagerVersion: '1.0.6-Stable.300'})

/***/ }),

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(module, exports, $app_require$){'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(21);

var _util2 = _interopRequireDefault(_util);

var _system = $app_require$('@app-module/system.clipboard');

var _system2 = _interopRequireDefault(_system);

var _system3 = $app_require$('@app-module/system.prompt');

var _system4 = _interopRequireDefault(_system3);

var _system5 = $app_require$('@app-module/system.router');

var _system6 = _interopRequireDefault(_system5);

var _system7 = $app_require$('@app-module/system.storage');

var _system8 = _interopRequireDefault(_system7);

var _system9 = $app_require$('@app-module/system.share');

var _system10 = _interopRequireDefault(_system9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  clipboard: _system2.default,
  prompt: _system4.default,
  router: _system6.default,
  storage: _system8.default,
  share: _system10.default,
  createShortcut: _util2.default.createShortcut
};
(exports.default || module.exports).manifest = {"package":"com.xk.fastapp","name":"fastapp","versionName":"1.0.0","versionCode":1,"icon":"/Common/logo.png","minPlatformVersion":1000,"features":[{"name":"system.prompt"},{"name":"system.router"},{"name":"system.shortcut"},{"name":"system.fetch"},{"name":"system.webview"},{"name":"system.storage"},{"name":"system.clipboard"},{"name":"system.share"}],"permissions":[{"origin":"*"}],"config":{"logLevel":"log"},"router":{"entry":"Main","pages":{"Main":{"component":"main"},"ArticleDetail":{"component":"articledetail"},"ArticleCollectList":{"component":"articlecollectlist"},"WebCollectList":{"component":"webcollectlist"},"AddCollectArticle":{"component":"addcollectarticle"},"AddCollectWeb":{"component":"addcollectweb"}}},"display":{"backgroundColor":"#fbf9fe","titleBar":true,"titleBarBackgroundColor":"#0faeff","titleBarTextColor":"#ffffff","menu":false,"pages":{"ArticleCollectList":{"titleBar":false},"AddCollectArticle":{"titleBarText":"收藏站外文章"},"WebCollectList":{"titleBar":false},"AddCollectWeb":{"titleBarText":"收藏网站"}}}};
}

/***/ }),

/***/ 21:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/**
 * 创建桌面图标
 * 注意：使用加载器测试`创建桌面快捷方式`功能时，请先在`系统设置`中打开`应用加载器`的`桌面快捷方式`权限
 */
function createShortcut() {
  var prompt = $app_require$('@app-module/system.prompt');
  var shortcut = $app_require$('@app-module/system.shortcut');
  shortcut.hasInstalled({
    success: function (ret) {
      if (ret) {
        prompt.showToast({ message: '已创建桌面图标' });
      } else {
        shortcut.install({
          success: function () {
            prompt.showToast({ message: '成功创建桌面图标' });
          },
          fail: function (errmsg, errcode) {
            prompt.showToast({ message: 'error: ' + errcode + '---' + errmsg });
          }
        });
      }
    }
  });
}

/* harmony default export */ __webpack_exports__["default"] = ({
  createShortcut
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRcXGFwcC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA0MzFhMTE5ZGQwYzgxZTdiMWQ1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwLnV4Iiwid2VicGFjazovLy8uL3NyYy9hcHAudXg/ZWI5YiIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxOSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNDMxYTExOWRkMGM4MWU3YjFkNWUiLCJ2YXIgJGFwcF9zY3JpcHQkID0gcmVxdWlyZShcIiEhYzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtc2NyaXB0LWxvYWRlci5qcyFjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1tYW5pZmVzdC1sb2FkZXIuanM/cGF0aD1lOlxcXFxYa1dvcmtcXFxcRmFzdEFwcFdvcmtTcGFjZVxcXFxmYXN0YXBwXFxcXGNvbS54ay5mYXN0YXBwXFxcXHNyY1xcXFxhcHAudXghYzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyP3ByZXNldHNbXT1jOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBGYXN0QXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxiYWJlbC1wcmVzZXQtZW52JnByZXNldHM9YzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcYmFiZWwtcHJlc2V0LWVudiZwbHVnaW5zW109YzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcYmFiZWwtcGx1Z2luLXRyYW5zZm9ybS1ydW50aW1lJnBsdWdpbnM9YzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgRmFzdEFwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcYmFiZWwtcGx1Z2luLXRyYW5zZm9ybS1ydW50aW1lJmNvbW1lbnRzPWZhbHNlIWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyFlOi9Ya1dvcmsvRmFzdEFwcFdvcmtTcGFjZS9mYXN0YXBwL2NvbS54ay5mYXN0YXBwL3NyYy9hcHAudXhcIilcblxuJGFwcF9kZWZpbmUkKCdAYXBwLWFwcGxpY2F0aW9uL2FwcCcsIFtdLCBmdW5jdGlvbigkYXBwX3JlcXVpcmUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX21vZHVsZSQpe1xuICAgICAkYXBwX3NjcmlwdCQoJGFwcF9tb2R1bGUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX3JlcXVpcmUkKVxuICAgICBpZiAoJGFwcF9leHBvcnRzJC5fX2VzTW9kdWxlICYmICRhcHBfZXhwb3J0cyQuZGVmYXVsdCkge1xuICAgICAgICAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMgPSAkYXBwX2V4cG9ydHMkLmRlZmF1bHRcbiAgICAgICAgfVxufSlcblxuJGFwcF9ib290c3RyYXAkKCdAYXBwLWFwcGxpY2F0aW9uL2FwcCcseyBwYWNrYWdlck5hbWU6J2ZhLXRvb2xraXQnLCBwYWNrYWdlclZlcnNpb246ICcxLjAuNi1TdGFibGUuMzAwJ30pXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYXBwLnV4XG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDUiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgJGFwcF9yZXF1aXJlJCl7J3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3V0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcblxudmFyIF91dGlsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3V0aWwpO1xuXG52YXIgX3N5c3RlbSA9ICRhcHBfcmVxdWlyZSQoJ0BhcHAtbW9kdWxlL3N5c3RlbS5jbGlwYm9hcmQnKTtcblxudmFyIF9zeXN0ZW0yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3lzdGVtKTtcblxudmFyIF9zeXN0ZW0zID0gJGFwcF9yZXF1aXJlJCgnQGFwcC1tb2R1bGUvc3lzdGVtLnByb21wdCcpO1xuXG52YXIgX3N5c3RlbTQgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zeXN0ZW0zKTtcblxudmFyIF9zeXN0ZW01ID0gJGFwcF9yZXF1aXJlJCgnQGFwcC1tb2R1bGUvc3lzdGVtLnJvdXRlcicpO1xuXG52YXIgX3N5c3RlbTYgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zeXN0ZW01KTtcblxudmFyIF9zeXN0ZW03ID0gJGFwcF9yZXF1aXJlJCgnQGFwcC1tb2R1bGUvc3lzdGVtLnN0b3JhZ2UnKTtcblxudmFyIF9zeXN0ZW04ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3lzdGVtNyk7XG5cbnZhciBfc3lzdGVtOSA9ICRhcHBfcmVxdWlyZSQoJ0BhcHAtbW9kdWxlL3N5c3RlbS5zaGFyZScpO1xuXG52YXIgX3N5c3RlbTEwID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3lzdGVtOSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgY2xpcGJvYXJkOiBfc3lzdGVtMi5kZWZhdWx0LFxuICBwcm9tcHQ6IF9zeXN0ZW00LmRlZmF1bHQsXG4gIHJvdXRlcjogX3N5c3RlbTYuZGVmYXVsdCxcbiAgc3RvcmFnZTogX3N5c3RlbTguZGVmYXVsdCxcbiAgc2hhcmU6IF9zeXN0ZW0xMC5kZWZhdWx0LFxuICBjcmVhdGVTaG9ydGN1dDogX3V0aWwyLmRlZmF1bHQuY3JlYXRlU2hvcnRjdXRcbn07XG4oZXhwb3J0cy5kZWZhdWx0IHx8IG1vZHVsZS5leHBvcnRzKS5tYW5pZmVzdCA9IHtcInBhY2thZ2VcIjpcImNvbS54ay5mYXN0YXBwXCIsXCJuYW1lXCI6XCJmYXN0YXBwXCIsXCJ2ZXJzaW9uTmFtZVwiOlwiMS4wLjBcIixcInZlcnNpb25Db2RlXCI6MSxcImljb25cIjpcIi9Db21tb24vbG9nby5wbmdcIixcIm1pblBsYXRmb3JtVmVyc2lvblwiOjEwMDAsXCJmZWF0dXJlc1wiOlt7XCJuYW1lXCI6XCJzeXN0ZW0ucHJvbXB0XCJ9LHtcIm5hbWVcIjpcInN5c3RlbS5yb3V0ZXJcIn0se1wibmFtZVwiOlwic3lzdGVtLnNob3J0Y3V0XCJ9LHtcIm5hbWVcIjpcInN5c3RlbS5mZXRjaFwifSx7XCJuYW1lXCI6XCJzeXN0ZW0ud2Vidmlld1wifSx7XCJuYW1lXCI6XCJzeXN0ZW0uc3RvcmFnZVwifSx7XCJuYW1lXCI6XCJzeXN0ZW0uY2xpcGJvYXJkXCJ9LHtcIm5hbWVcIjpcInN5c3RlbS5zaGFyZVwifV0sXCJwZXJtaXNzaW9uc1wiOlt7XCJvcmlnaW5cIjpcIipcIn1dLFwiY29uZmlnXCI6e1wibG9nTGV2ZWxcIjpcImxvZ1wifSxcInJvdXRlclwiOntcImVudHJ5XCI6XCJNYWluXCIsXCJwYWdlc1wiOntcIk1haW5cIjp7XCJjb21wb25lbnRcIjpcIm1haW5cIn0sXCJBcnRpY2xlRGV0YWlsXCI6e1wiY29tcG9uZW50XCI6XCJhcnRpY2xlZGV0YWlsXCJ9LFwiQXJ0aWNsZUNvbGxlY3RMaXN0XCI6e1wiY29tcG9uZW50XCI6XCJhcnRpY2xlY29sbGVjdGxpc3RcIn0sXCJXZWJDb2xsZWN0TGlzdFwiOntcImNvbXBvbmVudFwiOlwid2ViY29sbGVjdGxpc3RcIn0sXCJBZGRDb2xsZWN0QXJ0aWNsZVwiOntcImNvbXBvbmVudFwiOlwiYWRkY29sbGVjdGFydGljbGVcIn0sXCJBZGRDb2xsZWN0V2ViXCI6e1wiY29tcG9uZW50XCI6XCJhZGRjb2xsZWN0d2ViXCJ9fX0sXCJkaXNwbGF5XCI6e1wiYmFja2dyb3VuZENvbG9yXCI6XCIjZmJmOWZlXCIsXCJ0aXRsZUJhclwiOnRydWUsXCJ0aXRsZUJhckJhY2tncm91bmRDb2xvclwiOlwiIzBmYWVmZlwiLFwidGl0bGVCYXJUZXh0Q29sb3JcIjpcIiNmZmZmZmZcIixcIm1lbnVcIjpmYWxzZSxcInBhZ2VzXCI6e1wiQXJ0aWNsZUNvbGxlY3RMaXN0XCI6e1widGl0bGVCYXJcIjpmYWxzZX0sXCJBZGRDb2xsZWN0QXJ0aWNsZVwiOntcInRpdGxlQmFyVGV4dFwiOlwi5pS26JeP56uZ5aSW5paH56ugXCJ9LFwiV2ViQ29sbGVjdExpc3RcIjp7XCJ0aXRsZUJhclwiOmZhbHNlfSxcIkFkZENvbGxlY3RXZWJcIjp7XCJ0aXRsZUJhclRleHRcIjpcIuaUtuiXj+e9keermVwifX19fTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1zY3JpcHQtbG9hZGVyLmpzIWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLW1hbmlmZXN0LWxvYWRlci5qcz9wYXRoPWU6L1hrV29yay9GYXN0QXBwV29ya1NwYWNlL2Zhc3RhcHAvY29tLnhrLmZhc3RhcHAvc3JjL2FwcC51eCFjOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliP3ByZXNldHNbXT1jOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBGYXN0QXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9iYWJlbC1wcmVzZXQtZW52JnByZXNldHM9YzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvYmFiZWwtcHJlc2V0LWVudiZwbHVnaW5zW109YzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvYmFiZWwtcGx1Z2luLXRyYW5zZm9ybS1ydW50aW1lJnBsdWdpbnM9YzovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgRmFzdEFwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvYmFiZWwtcGx1Z2luLXRyYW5zZm9ybS1ydW50aW1lJmNvbW1lbnRzPWZhbHNlIWM6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIEZhc3RBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyEuL3NyYy9hcHAudXhcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gNSIsIi8qKlxuICog5Yib5bu65qGM6Z2i5Zu+5qCHXG4gKiDms6jmhI/vvJrkvb/nlKjliqDovb3lmajmtYvor5Vg5Yib5bu65qGM6Z2i5b+r5o235pa55byPYOWKn+iDveaXtu+8jOivt+WFiOWcqGDns7vnu5/orr7nva5g5Lit5omT5byAYOW6lOeUqOWKoOi9veWZqGDnmoRg5qGM6Z2i5b+r5o235pa55byPYOadg+mZkFxuICovXG5mdW5jdGlvbiBjcmVhdGVTaG9ydGN1dCgpIHtcbiAgdmFyIHByb21wdCA9ICRhcHBfcmVxdWlyZSQoJ0BhcHAtbW9kdWxlL3N5c3RlbS5wcm9tcHQnKTtcbiAgdmFyIHNob3J0Y3V0ID0gJGFwcF9yZXF1aXJlJCgnQGFwcC1tb2R1bGUvc3lzdGVtLnNob3J0Y3V0Jyk7XG4gIHNob3J0Y3V0Lmhhc0luc3RhbGxlZCh7XG4gICAgc3VjY2VzczogZnVuY3Rpb24gKHJldCkge1xuICAgICAgaWYgKHJldCkge1xuICAgICAgICBwcm9tcHQuc2hvd1RvYXN0KHsgbWVzc2FnZTogJ+W3suWIm+W7uuahjOmdouWbvuaghycgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzaG9ydGN1dC5pbnN0YWxsKHtcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBwcm9tcHQuc2hvd1RvYXN0KHsgbWVzc2FnZTogJ+aIkOWKn+WIm+W7uuahjOmdouWbvuaghycgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbiAoZXJybXNnLCBlcnJjb2RlKSB7XG4gICAgICAgICAgICBwcm9tcHQuc2hvd1RvYXN0KHsgbWVzc2FnZTogJ2Vycm9yOiAnICsgZXJyY29kZSArICctLS0nICsgZXJybXNnIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBjcmVhdGVTaG9ydGN1dFxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy91dGlsLmpzXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN6Q0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBIiwic291cmNlUm9vdCI6IiJ9