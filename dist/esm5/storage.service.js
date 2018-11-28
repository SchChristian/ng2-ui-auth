/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { MEMORY, COOKIE, SESSION_COOKIE, LOCAL_STORAGE, SESSION_STORAGE, NONE } from './storage-type.enum';
/**
 * @abstract
 */
var /**
 * @abstract
 */
StorageService = /** @class */ (function () {
    function StorageService() {
    }
    return StorageService;
}());
/**
 * @abstract
 */
export { StorageService };
if (false) {
    /**
     * @abstract
     * @param {?} storageType
     * @return {?}
     */
    StorageService.prototype.updateStorageType = function (storageType) { };
    /**
     * @abstract
     * @param {?} key
     * @return {?}
     */
    StorageService.prototype.get = function (key) { };
    /**
     * @abstract
     * @param {?} key
     * @param {?} value
     * @param {?} date
     * @return {?}
     */
    StorageService.prototype.set = function (key, value, date) { };
    /**
     * @abstract
     * @param {?} key
     * @return {?}
     */
    StorageService.prototype.remove = function (key) { };
}
/**
 * Created by Ron on 17/12/2015.
 */
var BrowserStorageService = /** @class */ (function (_super) {
    tslib_1.__extends(BrowserStorageService, _super);
    function BrowserStorageService(config) {
        var _this = _super.call(this) || this;
        _this.config = config;
        _this.store = {};
        _this.storageType = MEMORY;
        if (!_this.updateStorageType(config.options.storageType)) {
            console.warn(config.options.storageType + ' is not available.');
        }
        return _this;
    }
    /**
     * @param {?} storageType
     * @return {?}
     */
    BrowserStorageService.prototype.updateStorageType = /**
     * @param {?} storageType
     * @return {?}
     */
    function (storageType) {
        /** @type {?} */
        var isStorageAvailable = this.checkIsStorageAvailable(storageType);
        if (!isStorageAvailable) {
            return false;
        }
        this.storageType = storageType;
        return true;
    };
    /**
     * @param {?} key
     * @return {?}
     */
    BrowserStorageService.prototype.get = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        switch (this.storageType) {
            case COOKIE:
            case SESSION_COOKIE:
                return this.getCookie(key);
            case LOCAL_STORAGE:
            case SESSION_STORAGE:
                return window[this.storageType].getItem(key);
            case MEMORY:
                return this.store[key];
            case NONE:
            default:
                return null;
        }
    };
    /**
     * @param {?} key
     * @param {?} value
     * @param {?} date
     * @return {?}
     */
    BrowserStorageService.prototype.set = /**
     * @param {?} key
     * @param {?} value
     * @param {?} date
     * @return {?}
     */
    function (key, value, date) {
        switch (this.storageType) {
            case COOKIE:
            case SESSION_COOKIE:
                this.setCookie(key, value, this.storageType === COOKIE ? date : '');
                break;
            case LOCAL_STORAGE:
            case SESSION_STORAGE:
                window[this.storageType].setItem(key, value);
                break;
            case MEMORY:
                this.store[key] = value;
                break;
            case NONE:
            default:
                break;
        }
    };
    /**
     * @param {?} key
     * @return {?}
     */
    BrowserStorageService.prototype.remove = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        switch (this.storageType) {
            case COOKIE:
            case SESSION_COOKIE:
                this.removeCookie(key);
                break;
            case LOCAL_STORAGE:
            case SESSION_STORAGE:
                window[this.storageType].removeItem(key);
                break;
            case MEMORY:
                delete this.store[key];
                break;
            case NONE:
            default:
                break;
        }
    };
    /**
     * @private
     * @param {?} storageType
     * @return {?}
     */
    BrowserStorageService.prototype.checkIsStorageAvailable = /**
     * @private
     * @param {?} storageType
     * @return {?}
     */
    function (storageType) {
        switch (storageType) {
            case COOKIE:
            case SESSION_COOKIE:
                return this.isCookieStorageAvailable();
            case LOCAL_STORAGE:
            case SESSION_STORAGE:
                return this.isWindowStorageAvailable(storageType);
            case NONE:
            case MEMORY:
                return true;
            default:
                return false;
        }
    };
    /**
     * @private
     * @param {?} storageType
     * @return {?}
     */
    BrowserStorageService.prototype.isWindowStorageAvailable = /**
     * @private
     * @param {?} storageType
     * @return {?}
     */
    function (storageType) {
        try {
            /** @type {?} */
            var supported = window && storageType in window && window[storageType] !== null;
            if (supported) {
                /** @type {?} */
                var key = Math.random().toString(36).substring(7);
                window[storageType].setItem(key, '');
                window[storageType].removeItem(key);
            }
            return supported;
        }
        catch (e) {
            return false;
        }
    };
    /**
     * @private
     * @return {?}
     */
    BrowserStorageService.prototype.isCookieStorageAvailable = /**
     * @private
     * @return {?}
     */
    function () {
        try {
            /** @type {?} */
            var supported = document && 'cookie' in document;
            if (supported) {
                /** @type {?} */
                var key = Math.random().toString(36).substring(7);
                this.setCookie(key, 'test', new Date(Date.now() + 60 * 1000).toUTCString());
                /** @type {?} */
                var value = this.getCookie(key);
                this.removeCookie(key);
                return value === 'test';
            }
            return false;
        }
        catch (e) {
            return false;
        }
    };
    /**
     * @private
     * @param {?} key
     * @param {?} value
     * @param {?=} expires
     * @param {?=} path
     * @return {?}
     */
    BrowserStorageService.prototype.setCookie = /**
     * @private
     * @param {?} key
     * @param {?} value
     * @param {?=} expires
     * @param {?=} path
     * @return {?}
     */
    function (key, value, expires, path) {
        if (expires === void 0) { expires = ''; }
        if (path === void 0) { path = '/'; }
        document.cookie = key + "=" + value + (expires ? "; expires=" + expires : '') + "; path=" + path;
    };
    /**
     * @private
     * @param {?} key
     * @param {?=} path
     * @return {?}
     */
    BrowserStorageService.prototype.removeCookie = /**
     * @private
     * @param {?} key
     * @param {?=} path
     * @return {?}
     */
    function (key, path) {
        if (path === void 0) { path = '/'; }
        this.setCookie(key, '', new Date(0).toUTCString(), path);
    };
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    BrowserStorageService.prototype.getCookie = /**
     * @private
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return document.cookie.replace(new RegExp("(?:(?:^|.*;\\s*)" + key + "\\s*\\=\\s*([^;]*).*$)|^.*$"), '$1');
    };
    BrowserStorageService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    BrowserStorageService.ctorParameters = function () { return [
        { type: ConfigService }
    ]; };
    return BrowserStorageService;
}(StorageService));
export { BrowserStorageService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    BrowserStorageService.prototype.store;
    /**
     * @type {?}
     * @private
     */
    BrowserStorageService.prototype.storageType;
    /**
     * @type {?}
     * @private
     */
    BrowserStorageService.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXVpLWF1dGgvIiwic291cmNlcyI6WyJzdG9yYWdlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQWUsTUFBTSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7OztBQUV4SDs7OztJQUFBO0lBUUEsQ0FBQztJQUFELHFCQUFDO0FBQUQsQ0FBQyxBQVJELElBUUM7Ozs7Ozs7Ozs7O0lBUEcsd0VBQThEOzs7Ozs7SUFFOUQsa0RBQWtDOzs7Ozs7OztJQUVsQywrREFBNkQ7Ozs7OztJQUU3RCxxREFBbUM7Ozs7O0FBTXZDO0lBQzJDLGlEQUFjO0lBSXJELCtCQUFvQixNQUFxQjtRQUF6QyxZQUNJLGlCQUFPLFNBSVY7UUFMbUIsWUFBTSxHQUFOLE1BQU0sQ0FBZTtRQUhqQyxXQUFLLEdBQThCLEVBQUUsQ0FBQztRQUN0QyxpQkFBVyxHQUFnQixNQUFNLENBQUM7UUFJdEMsSUFBSSxDQUFDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3JELE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsb0JBQW9CLENBQUMsQ0FBQztTQUNuRTs7SUFDTCxDQUFDOzs7OztJQUVNLGlEQUFpQjs7OztJQUF4QixVQUF5QixXQUF3Qjs7WUFDdkMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFdBQVcsQ0FBQztRQUNwRSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDckIsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFD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QUFZLEVBQUUsSUFBVTtRQUF4Qix3QkFBQSxFQUFBLFlBQVk7UUFBRSxxQkFBQSxFQUFBLFVBQVU7UUFDbEUsUUFBUSxDQUFDLE1BQU0sR0FBTSxHQUFHLFNBQUksS0FBSyxJQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsZUFBYSxPQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsZ0JBQVUsSUFBTSxDQUFDO0lBQzlGLENBQUM7Ozs7Ozs7SUFFTyw0Q0FBWTs7Ozs7O0lBQXBCLFVBQXFCLEdBQVcsRUFBRSxJQUFVO1FBQVYscUJBQUEsRUFBQSxVQUFVO1FBQ3hDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM3RCxDQUFDOzs7Ozs7SUFFTyx5Q0FBUzs7Ozs7SUFBakIsVUFBa0IsR0FBVztRQUN6QixPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLHFCQUFtQixHQUFHLGdDQUE2QixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDMUcsQ0FBQzs7Z0JBdElKLFVBQVU7Ozs7Z0JBaEJGLGFBQWE7O0lBdUp0Qiw0QkFBQztDQUFBLEFBdklELENBQzJDLGNBQWMsR0FzSXhEO1NBdElZLHFCQUFxQjs7Ozs7O0lBQzlCLHNDQUE4Qzs7Ozs7SUFDOUMsNENBQTBDOzs7OztJQUU5Qix1Q0FBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2NvbmZpZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3RvcmFnZVR5cGUsIE1FTU9SWSwgQ09PS0lFLCBTRVNTSU9OX0NPT0tJRSwgTE9DQUxfU1RPUkFHRSwgU0VTU0lPTl9TVE9SQUdFLCBOT05FIH0gZnJvbSAnLi9zdG9yYWdlLXR5cGUuZW51bSc7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgU3RvcmFnZVNlcnZpY2Uge1xyXG4gICAgYWJzdHJhY3QgdXBkYXRlU3RvcmFnZVR5cGUoc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlKTogYm9vbGVhbjtcclxuXHJcbiAgICBhYnN0cmFjdCBnZXQoa2V5OiBzdHJpbmcpOiBzdHJpbmc7XHJcblxyXG4gICAgYWJzdHJhY3Qgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBkYXRlOiBzdHJpbmcpOiB2b2lkO1xyXG5cclxuICAgIGFic3RyYWN0IHJlbW92ZShrZXk6IHN0cmluZyk6IHZvaWQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFJvbiBvbiAxNy8xMi8yMDE1LlxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQnJvd3NlclN0b3JhZ2VTZXJ2aWNlIGV4dGVuZHMgU3RvcmFnZVNlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBzdG9yZTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9O1xyXG4gICAgcHJpdmF0ZSBzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGUgPSBNRU1PUlk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIGlmICghdGhpcy51cGRhdGVTdG9yYWdlVHlwZShjb25maWcub3B0aW9ucy5zdG9yYWdlVHlwZSkpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKGNvbmZpZy5vcHRpb25zLnN0b3JhZ2VUeXBlICsgJyBpcyBub3QgYXZhaWxhYmxlLicpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlU3RvcmFnZVR5cGUoc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlKSB7XHJcbiAgICAgICAgY29uc3QgaXNTdG9yYWdlQXZhaWxhYmxlID0gdGhpcy5jaGVja0lzU3RvcmFnZUF2YWlsYWJsZShzdG9yYWdlVHlwZSk7XHJcbiAgICAgICAgaWYgKCFpc1N0b3JhZ2VBdmFpbGFibGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0b3JhZ2VUeXBlID0gc3RvcmFnZVR5cGU7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldChrZXk6IHN0cmluZykge1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5zdG9yYWdlVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIENPT0tJRTpcclxuICAgICAgICAgICAgY2FzZSBTRVNTSU9OX0NPT0tJRTpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldENvb2tpZShrZXkpO1xyXG4gICAgICAgICAgICBjYXNlIExPQ0FMX1NUT1JBR0U6XHJcbiAgICAgICAgICAgIGNhc2UgU0VTU0lPTl9TVE9SQUdFOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvd1t0aGlzLnN0b3JhZ2VUeXBlXS5nZXRJdGVtKGtleSk7XHJcbiAgICAgICAgICAgIGNhc2UgTUVNT1JZOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmVba2V5XTtcclxuICAgICAgICAgICAgY2FzZSBOT05FOlxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIGRhdGU6IHN0cmluZykge1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5zdG9yYWdlVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIENPT0tJRTpcclxuICAgICAgICAgICAgY2FzZSBTRVNTSU9OX0NPT0tJRTpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0Q29va2llKGtleSwgdmFsdWUsIHRoaXMuc3RvcmFnZVR5cGUgPT09IENPT0tJRSA/IGRhdGUgOiAnJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBMT0NBTF9TVE9SQUdFOlxyXG4gICAgICAgICAgICBjYXNlIFNFU1NJT05fU1RPUkFHRTpcclxuICAgICAgICAgICAgICAgIHdpbmRvd1t0aGlzLnN0b3JhZ2VUeXBlXS5zZXRJdGVtKGtleSwgdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTUVNT1JZOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yZVtrZXldID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBOT05FOlxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmUoa2V5OiBzdHJpbmcpIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RvcmFnZVR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBDT09LSUU6XHJcbiAgICAgICAgICAgIGNhc2UgU0VTU0lPTl9DT09LSUU6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUNvb2tpZShrZXkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTE9DQUxfU1RPUkFHRTpcclxuICAgICAgICAgICAgY2FzZSBTRVNTSU9OX1NUT1JBR0U6XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dbdGhpcy5zdG9yYWdlVHlwZV0ucmVtb3ZlSXRlbShrZXkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTUVNT1JZOlxyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuc3RvcmVba2V5XTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIE5PTkU6XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja0lzU3RvcmFnZUF2YWlsYWJsZShzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGUpIHtcclxuICAgICAgICBzd2l0Y2ggKHN0b3JhZ2VUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgQ09PS0lFOlxyXG4gICAgICAgICAgICBjYXNlIFNFU1NJT05fQ09PS0lFOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNDb29raWVTdG9yYWdlQXZhaWxhYmxlKCk7XHJcbiAgICAgICAgICAgIGNhc2UgTE9DQUxfU1RPUkFHRTpcclxuICAgICAgICAgICAgY2FzZSBTRVNTSU9OX1NUT1JBR0U6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc1dpbmRvd1N0b3JhZ2VBdmFpbGFibGUoc3RvcmFnZVR5cGUpO1xyXG4gICAgICAgICAgICBjYXNlIE5PTkU6XHJcbiAgICAgICAgICAgIGNhc2UgTUVNT1JZOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNXaW5kb3dTdG9yYWdlQXZhaWxhYmxlKHN0b3JhZ2VUeXBlOiB0eXBlb2YgU0VTU0lPTl9TVE9SQUdFIHwgdHlwZW9mIExPQ0FMX1NUT1JBR0UpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBzdXBwb3J0ZWQgPSB3aW5kb3cgJiYgc3RvcmFnZVR5cGUgaW4gd2luZG93ICYmIHdpbmRvd1tzdG9yYWdlVHlwZV0gIT09IG51bGw7XHJcblxyXG4gICAgICAgICAgICBpZiAoc3VwcG9ydGVkKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoNyk7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dbc3RvcmFnZVR5cGVdLnNldEl0ZW0oa2V5LCAnJyk7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dbc3RvcmFnZVR5cGVdLnJlbW92ZUl0ZW0oa2V5KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHN1cHBvcnRlZDtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc0Nvb2tpZVN0b3JhZ2VBdmFpbGFibGUoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3Qgc3VwcG9ydGVkID0gZG9jdW1lbnQgJiYgJ2Nvb2tpZScgaW4gZG9jdW1lbnQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoc3VwcG9ydGVkKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoNyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldENvb2tpZShrZXksICd0ZXN0JywgbmV3IERhdGUoRGF0ZS5ub3coKSArIDYwICogMTAwMCkudG9VVENTdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0Q29va2llKGtleSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUNvb2tpZShrZXkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlID09PSAndGVzdCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldENvb2tpZShrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZywgZXhwaXJlcyA9ICcnLCBwYXRoID0gJy8nKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gYCR7a2V5fT0ke3ZhbHVlfSR7ZXhwaXJlcyA/IGA7IGV4cGlyZXM9JHtleHBpcmVzfWAgOiAnJ307IHBhdGg9JHtwYXRofWA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZW1vdmVDb29raWUoa2V5OiBzdHJpbmcsIHBhdGggPSAnLycpIHtcclxuICAgICAgICB0aGlzLnNldENvb2tpZShrZXksICcnLCBuZXcgRGF0ZSgwKS50b1VUQ1N0cmluZygpLCBwYXRoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldENvb2tpZShrZXk6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5jb29raWUucmVwbGFjZShuZXcgUmVnRXhwKGAoPzooPzpefC4qO1xcXFxzKikke2tleX1cXFxccypcXFxcPVxcXFxzKihbXjtdKikuKiQpfF4uKiRgKSwgJyQxJyk7XHJcbiAgICB9XHJcbn1cclxuIl19