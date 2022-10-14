(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./src/main/preload.ts ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);

// https://www.electronjs.org/docs/latest/tutorial/process-model
// https://www.electronjs.org/docs/latest/tutorial/sandbox
// while sandboxing, we only have access to limited apis,
// and no general-purpose require()
// require("./test")
const additions = {
    fetchUpdates: () => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('cmd:fetchUpdates'),
    updatePackage: (packageName) => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('cmd:updatePackage', packageName),
    retrieveHypervisorState: () => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('cmd:retrieveHypervisorState'),
    executeHypervisorCommand: (state) => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('cmd:executeHypervisorCommand', state),
    currentRefreshRate: () => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('display:currentRefreshRate'),
    listRefreshRates: () => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('display:listRefreshRates'),
    setRefreshRate: (refresh) => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('display:setRefreshRate', refresh),
    calculateFolderSize: (path) => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke("fs:calculateFolderSize", path),
    getEnvironmentVariable: (variable) => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke("fs:getEnvironmentVariable", variable),
    appGetPath: (name) => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke("fs:appGetPath", name),
    deleteFolder: (path) => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke("fs:deleteFolder", path),
    openFolder: (path) => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.send("fs:openFolder", path),
    getSettingValue: (setting) => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke("settings:getSettingValue", setting),
    setSettingValue: (setting, value) => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke("settings:setSettingValue", setting, value),
    readyToShow: () => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.send('render:readyToShow'),
    appGetVersion: () => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke("app:getVersion"),
    retrieveConnectionDetails: () => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('wifi:retrieveConnectionDetails'),
    handleClipboardChange: (callback) => {
        electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.removeAllListeners("clipboard:change");
        electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.on('clipboard:change', callback);
    },
    clipboardPaste: (text) => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.send("clipboard:paste", text),
    fetchClips: (filter) => electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('clipboard:fetchClips', filter),
};
electron__WEBPACK_IMPORTED_MODULE_0__.contextBridge.exposeInMainWorld('electronAPI', additions);

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUM7SUFDaEQsQ0FBQztJQUNELGNBQWMsRUFBRSxDQUFDLElBQVksRUFBRSxFQUFFLENBQUMsc0RBQWdCLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDO0lBQzNFLFVBQVUsRUFBRSxDQUFDLE1BQWMsRUFBRSxFQUFFLENBQUMsd0RBQWtCLENBQUMsc0JBQXNCLEVBQUUsTUFBTSxDQUFDO0NBQ3JGO0FBU0QscUVBQStCLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJlbGVjdHJvblwiIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi9wcmVsb2FkLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KShnbG9iYWwsICgpID0+IHtcbnJldHVybiAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJlbGVjdHJvblwiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgU2V0dGluZ3MgfSBmcm9tICdjb21tb24vU2V0dGluZ3NJdGVtcydcclxuaW1wb3J0IHsgY29udGV4dEJyaWRnZSwgaXBjUmVuZGVyZXIgfSBmcm9tICdlbGVjdHJvbidcclxuXHJcbi8vIGh0dHBzOi8vd3d3LmVsZWN0cm9uanMub3JnL2RvY3MvbGF0ZXN0L3R1dG9yaWFsL3Byb2Nlc3MtbW9kZWxcclxuLy8gaHR0cHM6Ly93d3cuZWxlY3Ryb25qcy5vcmcvZG9jcy9sYXRlc3QvdHV0b3JpYWwvc2FuZGJveFxyXG4vLyB3aGlsZSBzYW5kYm94aW5nLCB3ZSBvbmx5IGhhdmUgYWNjZXNzIHRvIGxpbWl0ZWQgYXBpcyxcclxuLy8gYW5kIG5vIGdlbmVyYWwtcHVycG9zZSByZXF1aXJlKClcclxuXHJcbi8vIHJlcXVpcmUoXCIuL3Rlc3RcIilcclxuXHJcbmNvbnN0IGFkZGl0aW9ucyA9IHtcclxuICAgIGZldGNoVXBkYXRlczogKCkgPT4gaXBjUmVuZGVyZXIuaW52b2tlKCdjbWQ6ZmV0Y2hVcGRhdGVzJyksXHJcbiAgICB1cGRhdGVQYWNrYWdlOiAocGFja2FnZU5hbWU6IHN0cmluZykgPT4gaXBjUmVuZGVyZXIuaW52b2tlKCdjbWQ6dXBkYXRlUGFja2FnZScsIHBhY2thZ2VOYW1lKSxcclxuICAgIHJldHJpZXZlSHlwZXJ2aXNvclN0YXRlOiAoKSA9PiBpcGNSZW5kZXJlci5pbnZva2UoJ2NtZDpyZXRyaWV2ZUh5cGVydmlzb3JTdGF0ZScpLFxyXG4gICAgZXhlY3V0ZUh5cGVydmlzb3JDb21tYW5kOiAoc3RhdGU6IGJvb2xlYW4pID0+IGlwY1JlbmRlcmVyLmludm9rZSgnY21kOmV4ZWN1dGVIeXBlcnZpc29yQ29tbWFuZCcsIHN0YXRlKSxcclxuXHJcbiAgICBjdXJyZW50UmVmcmVzaFJhdGU6ICgpID0+IGlwY1JlbmRlcmVyLmludm9rZSgnZGlzcGxheTpjdXJyZW50UmVmcmVzaFJhdGUnKSxcclxuICAgIGxpc3RSZWZyZXNoUmF0ZXM6ICgpID0+IGlwY1JlbmRlcmVyLmludm9rZSgnZGlzcGxheTpsaXN0UmVmcmVzaFJhdGVzJyksXHJcbiAgICBzZXRSZWZyZXNoUmF0ZTogKHJlZnJlc2g6IHN0cmluZykgPT4gaXBjUmVuZGVyZXIuaW52b2tlKCdkaXNwbGF5OnNldFJlZnJlc2hSYXRlJywgcmVmcmVzaCksXHJcblxyXG4gICAgY2FsY3VsYXRlRm9sZGVyU2l6ZTogKHBhdGg6IHN0cmluZykgPT4gaXBjUmVuZGVyZXIuaW52b2tlKFwiZnM6Y2FsY3VsYXRlRm9sZGVyU2l6ZVwiLCBwYXRoKSxcclxuICAgIGdldEVudmlyb25tZW50VmFyaWFibGU6ICh2YXJpYWJsZTogc3RyaW5nKSA9PiBpcGNSZW5kZXJlci5pbnZva2UoXCJmczpnZXRFbnZpcm9ubWVudFZhcmlhYmxlXCIsIHZhcmlhYmxlKSxcclxuICAgIGFwcEdldFBhdGg6IChuYW1lOiBzdHJpbmcpID0+IGlwY1JlbmRlcmVyLmludm9rZShcImZzOmFwcEdldFBhdGhcIiwgbmFtZSksXHJcbiAgICBkZWxldGVGb2xkZXI6IChwYXRoOiBzdHJpbmcpID0+IGlwY1JlbmRlcmVyLmludm9rZShcImZzOmRlbGV0ZUZvbGRlclwiLCBwYXRoKSxcclxuICAgIG9wZW5Gb2xkZXI6IChwYXRoOiBzdHJpbmcpID0+IGlwY1JlbmRlcmVyLnNlbmQoXCJmczpvcGVuRm9sZGVyXCIsIHBhdGgpLFxyXG5cclxuICAgIGdldFNldHRpbmdWYWx1ZTogKHNldHRpbmc6IGtleW9mIFNldHRpbmdzKSA9PiBpcGNSZW5kZXJlci5pbnZva2UoXCJzZXR0aW5nczpnZXRTZXR0aW5nVmFsdWVcIiwgc2V0dGluZyksXHJcbiAgICBzZXRTZXR0aW5nVmFsdWU6IDxUIGV4dGVuZHMga2V5b2YgU2V0dGluZ3M+KHNldHRpbmc6IFQsIHZhbHVlOiBTZXR0aW5nc1tUXSkgPT4gaXBjUmVuZGVyZXIuaW52b2tlKFwic2V0dGluZ3M6c2V0U2V0dGluZ1ZhbHVlXCIsIHNldHRpbmcsIHZhbHVlKSxcclxuXHJcbiAgICByZWFkeVRvU2hvdzogKCkgPT4gaXBjUmVuZGVyZXIuc2VuZCgncmVuZGVyOnJlYWR5VG9TaG93JyksXHJcbiAgICBhcHBHZXRWZXJzaW9uOiAoKSA9PiBpcGNSZW5kZXJlci5pbnZva2UoXCJhcHA6Z2V0VmVyc2lvblwiKSxcclxuXHJcbiAgICByZXRyaWV2ZUNvbm5lY3Rpb25EZXRhaWxzOiAoKSA9PiBpcGNSZW5kZXJlci5pbnZva2UoJ3dpZmk6cmV0cmlldmVDb25uZWN0aW9uRGV0YWlscycpLFxyXG5cclxuICAgIGhhbmRsZUNsaXBib2FyZENoYW5nZTogKGNhbGxiYWNrOiAoKSA9PiB2b2lkKSA9PiB7XHJcbiAgICAgICAgaXBjUmVuZGVyZXIucmVtb3ZlQWxsTGlzdGVuZXJzKFwiY2xpcGJvYXJkOmNoYW5nZVwiKVxyXG4gICAgICAgIGlwY1JlbmRlcmVyLm9uKCdjbGlwYm9hcmQ6Y2hhbmdlJywgY2FsbGJhY2spXHJcbiAgICB9LFxyXG4gICAgY2xpcGJvYXJkUGFzdGU6ICh0ZXh0OiBzdHJpbmcpID0+IGlwY1JlbmRlcmVyLnNlbmQoXCJjbGlwYm9hcmQ6cGFzdGVcIiwgdGV4dCksXHJcbiAgICBmZXRjaENsaXBzOiAoZmlsdGVyOiBzdHJpbmcpID0+IGlwY1JlbmRlcmVyLmludm9rZSgnY2xpcGJvYXJkOmZldGNoQ2xpcHMnLCBmaWx0ZXIpLFxyXG59XHJcblxyXG5kZWNsYXJlIGdsb2JhbCB7XHJcbiAgICBpbnRlcmZhY2UgV2luZG93IHtcclxuICAgICAgICBlbGVjdHJvbkFQSTogdHlwZW9mIGFkZGl0aW9uc1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuY29udGV4dEJyaWRnZS5leHBvc2VJbk1haW5Xb3JsZCgnZWxlY3Ryb25BUEknLCBhZGRpdGlvbnMpIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9