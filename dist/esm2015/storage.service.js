/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { MEMORY, COOKIE, SESSION_COOKIE, LOCAL_STORAGE, SESSION_STORAGE, NONE } from './storage-type.enum';
/**
 * @abstract
 */
export class StorageService {
}
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
export class BrowserStorageService extends StorageService {
    /**
     * @param {?} config
     */
    constructor(config) {
        super();
        this.config = config;
        this.store = {};
        this.storageType = MEMORY;
        if (!this.updateStorageType(config.options.storageType)) {
            console.warn(config.options.storageType + ' is not available.');
        }
    }
    /**
     * @param {?} storageType
     * @return {?}
     */
    updateStorageType(storageType) {
        /** @type {?} */
        const isStorageAvailable = this.checkIsStorageAvailable(storageType);
        if (!isStorageAvailable) {
            return false;
        }
        this.storageType = storageType;
        return true;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    get(key) {
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
    }
    /**
     * @param {?} key
     * @param {?} value
     * @param {?} date
     * @return {?}
     */
    set(key, value, date) {
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
    }
    /**
     * @param {?} key
     * @return {?}
     */
    remove(key) {
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
    }
    /**
     * @param {?} storageType
     * @return {?}
     */
    checkIsStorageAvailable(storageType) {
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
    }
    /**
     * @param {?} storageType
     * @return {?}
     */
    isWindowStorageAvailable(storageType) {
        try {
            /** @type {?} */
            const supported = window && storageType in window && window[storageType] !== null;
            if (supported) {
                /** @type {?} */
                const key = Math.random().toString(36).substring(7);
                window[storageType].setItem(key, '');
                window[storageType].removeItem(key);
            }
            return supported;
        }
        catch (e) {
            return false;
        }
    }
    /**
     * @return {?}
     */
    isCookieStorageAvailable() {
        try {
            /** @type {?} */
            const supported = document && 'cookie' in document;
            if (supported) {
                /** @type {?} */
                const key = Math.random().toString(36).substring(7);
                this.setCookie(key, 'test', new Date(Date.now() + 60 * 1000).toUTCString());
                /** @type {?} */
                const value = this.getCookie(key);
                this.removeCookie(key);
                return value === 'test';
            }
            return false;
        }
        catch (e) {
            return false;
        }
    }
    /**
     * @param {?} key
     * @param {?} value
     * @param {?=} expires
     * @param {?=} path
     * @return {?}
     */
    setCookie(key, value, expires = '', path = '/') {
        document.cookie = `${key}=${value}${expires ? `; expires=${expires}` : ''}; path=${path}`;
    }
    /**
     * @param {?} key
     * @param {?=} path
     * @return {?}
     */
    removeCookie(key, path = '/') {
        this.setCookie(key, '', new Date(0).toUTCString(), path);
    }
    /**
     * @param {?} key
     * @return {?}
     */
    getCookie(key) {
        return document.cookie.replace(new RegExp(`(?:(?:^|.*;\\s*)${key}\\s*\\=\\s*([^;]*).*$)|^.*$`), '$1');
    }
}
BrowserStorageService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
BrowserStorageService.ctorParameters = () => [
    { type: ConfigService }
];
if (false) {
    /** @type {?} */
    BrowserStorageService.prototype.store;
    /** @type {?} */
    BrowserStorageService.prototype.storageType;
    /** @type {?} */
    BrowserStorageService.prototype.config;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXVpLWF1dGgvIiwic291cmNlcyI6WyJzdG9yYWdlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBZSxNQUFNLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7O0FBRXhILE1BQU07Q0FRTDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNRCxNQUFNLDRCQUE2QixTQUFRLGNBQWM7Ozs7SUFJckQsWUFBb0IsTUFBcUI7UUFDckMsS0FBSyxFQUFFLENBQUM7UUFEUSxXQUFNLEdBQU4sTUFBTSxDQUFlO3FCQUhFLEVBQUU7MkJBQ1YsTUFBTTtRQUlyQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDckQsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxvQkFBb0IsQ0FBQyxDQUFDO1NBQ25FO0tBQ0o7Ozs7O0lBRU0saUJBQWlCLENBQUMsV0FBd0I7O1FBQzdDLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUNyQixPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLE9BQU8sSUFBSSxDQUFDOzs7Ozs7SUFHVCxHQUFHLENBQUMsR0FBVztRQUNsQixRQUFRLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDdEIsS0FBSyxN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QUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQzs7Ozs7O0lBR3JELFNBQVMsQ0FBQyxHQUFXO1FBQ3pCLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsbUJBQW1CLEdBQUcsNkJBQTZCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQzs7OztZQXJJN0csVUFBVTs7OztZQWhCRixhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IFN0b3JhZ2VUeXBlLCBNRU1PUlksIENPT0tJRSwgU0VTU0lPTl9DT09LSUUsIExPQ0FMX1NUT1JBR0UsIFNFU1NJT05fU1RPUkFHRSwgTk9ORSB9IGZyb20gJy4vc3RvcmFnZS10eXBlLmVudW0nO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFN0b3JhZ2VTZXJ2aWNlIHtcclxuICAgIGFic3RyYWN0IHVwZGF0ZVN0b3JhZ2VUeXBlKHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZSk6IGJvb2xlYW47XHJcblxyXG4gICAgYWJzdHJhY3QgZ2V0KGtleTogc3RyaW5nKTogc3RyaW5nO1xyXG5cclxuICAgIGFic3RyYWN0IHNldChrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZywgZGF0ZTogc3RyaW5nKTogdm9pZDtcclxuXHJcbiAgICBhYnN0cmFjdCByZW1vdmUoa2V5OiBzdHJpbmcpOiB2b2lkO1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlZCBieSBSb24gb24gMTcvMTIvMjAxNS5cclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEJyb3dzZXJTdG9yYWdlU2VydmljZSBleHRlbmRzIFN0b3JhZ2VTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgc3RvcmU6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcclxuICAgIHByaXZhdGUgc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlID0gTUVNT1JZO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlnOiBDb25maWdTZXJ2aWNlKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBpZiAoIXRoaXMudXBkYXRlU3RvcmFnZVR5cGUoY29uZmlnLm9wdGlvbnMuc3RvcmFnZVR5cGUpKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2Fybihjb25maWcub3B0aW9ucy5zdG9yYWdlVHlwZSArICcgaXMgbm90IGF2YWlsYWJsZS4nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZVN0b3JhZ2VUeXBlKHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZSkge1xyXG4gICAgICAgIGNvbnN0IGlzU3RvcmFnZUF2YWlsYWJsZSA9IHRoaXMuY2hlY2tJc1N0b3JhZ2VBdmFpbGFibGUoc3RvcmFnZVR5cGUpO1xyXG4gICAgICAgIGlmICghaXNTdG9yYWdlQXZhaWxhYmxlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlVHlwZSA9IHN0b3JhZ2VUeXBlO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQoa2V5OiBzdHJpbmcpIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RvcmFnZVR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBDT09LSUU6XHJcbiAgICAgICAgICAgIGNhc2UgU0VTU0lPTl9DT09LSUU6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRDb29raWUoa2V5KTtcclxuICAgICAgICAgICAgY2FzZSBMT0NBTF9TVE9SQUdFOlxyXG4gICAgICAgICAgICBjYXNlIFNFU1NJT05fU1RPUkFHRTpcclxuICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3dbdGhpcy5zdG9yYWdlVHlwZV0uZ2V0SXRlbShrZXkpO1xyXG4gICAgICAgICAgICBjYXNlIE1FTU9SWTpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnN0b3JlW2tleV07XHJcbiAgICAgICAgICAgIGNhc2UgTk9ORTpcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBkYXRlOiBzdHJpbmcpIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RvcmFnZVR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBDT09LSUU6XHJcbiAgICAgICAgICAgIGNhc2UgU0VTU0lPTl9DT09LSUU6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldENvb2tpZShrZXksIHZhbHVlLCB0aGlzLnN0b3JhZ2VUeXBlID09PSBDT09LSUUgPyBkYXRlIDogJycpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTE9DQUxfU1RPUkFHRTpcclxuICAgICAgICAgICAgY2FzZSBTRVNTSU9OX1NUT1JBR0U6XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dbdGhpcy5zdG9yYWdlVHlwZV0uc2V0SXRlbShrZXksIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIE1FTU9SWTpcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmVba2V5XSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTk9ORTpcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlKGtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLnN0b3JhZ2VUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgQ09PS0lFOlxyXG4gICAgICAgICAgICBjYXNlIFNFU1NJT05fQ09PS0lFOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVDb29raWUoa2V5KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIExPQ0FMX1NUT1JBR0U6XHJcbiAgICAgICAgICAgIGNhc2UgU0VTU0lPTl9TVE9SQUdFOlxyXG4gICAgICAgICAgICAgICAgd2luZG93W3RoaXMuc3RvcmFnZVR5cGVdLnJlbW92ZUl0ZW0oa2V5KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIE1FTU9SWTpcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnN0b3JlW2tleV07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBOT05FOlxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hlY2tJc1N0b3JhZ2VBdmFpbGFibGUoc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlKSB7XHJcbiAgICAgICAgc3dpdGNoIChzdG9yYWdlVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIENPT0tJRTpcclxuICAgICAgICAgICAgY2FzZSBTRVNTSU9OX0NPT0tJRTpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzQ29va2llU3RvcmFnZUF2YWlsYWJsZSgpO1xyXG4gICAgICAgICAgICBjYXNlIExPQ0FMX1NUT1JBR0U6XHJcbiAgICAgICAgICAgIGNhc2UgU0VTU0lPTl9TVE9SQUdFOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNXaW5kb3dTdG9yYWdlQXZhaWxhYmxlKHN0b3JhZ2VUeXBlKTtcclxuICAgICAgICAgICAgY2FzZSBOT05FOlxyXG4gICAgICAgICAgICBjYXNlIE1FTU9SWTpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzV2luZG93U3RvcmFnZUF2YWlsYWJsZShzdG9yYWdlVHlwZTogdHlwZW9mIFNFU1NJT05fU1RPUkFHRSB8IHR5cGVvZiBMT0NBTF9TVE9SQUdFKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3Qgc3VwcG9ydGVkID0gd2luZG93ICYmIHN0b3JhZ2VUeXBlIGluIHdpbmRvdyAmJiB3aW5kb3dbc3RvcmFnZVR5cGVdICE9PSBudWxsO1xyXG5cclxuICAgICAgICAgICAgaWYgKHN1cHBvcnRlZCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDcpO1xyXG4gICAgICAgICAgICAgICAgd2luZG93W3N0b3JhZ2VUeXBlXS5zZXRJdGVtKGtleSwgJycpO1xyXG4gICAgICAgICAgICAgICAgd2luZG93W3N0b3JhZ2VUeXBlXS5yZW1vdmVJdGVtKGtleSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBzdXBwb3J0ZWQ7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNDb29raWVTdG9yYWdlQXZhaWxhYmxlKCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN1cHBvcnRlZCA9IGRvY3VtZW50ICYmICdjb29raWUnIGluIGRvY3VtZW50O1xyXG5cclxuICAgICAgICAgICAgaWYgKHN1cHBvcnRlZCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRDb29raWUoa2V5LCAndGVzdCcsIG5ldyBEYXRlKERhdGUubm93KCkgKyA2MCAqIDEwMDApLnRvVVRDU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldENvb2tpZShrZXkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVDb29raWUoa2V5KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PT0gJ3Rlc3QnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRDb29raWUoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIGV4cGlyZXMgPSAnJywgcGF0aCA9ICcvJykge1xyXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGAke2tleX09JHt2YWx1ZX0ke2V4cGlyZXMgPyBgOyBleHBpcmVzPSR7ZXhwaXJlc31gIDogJyd9OyBwYXRoPSR7cGF0aH1gO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVtb3ZlQ29va2llKGtleTogc3RyaW5nLCBwYXRoID0gJy8nKSB7XHJcbiAgICAgICAgdGhpcy5zZXRDb29raWUoa2V5LCAnJywgbmV3IERhdGUoMCkudG9VVENTdHJpbmcoKSwgcGF0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRDb29raWUoa2V5OiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnQuY29va2llLnJlcGxhY2UobmV3IFJlZ0V4cChgKD86KD86XnwuKjtcXFxccyopJHtrZXl9XFxcXHMqXFxcXD1cXFxccyooW147XSopLiokKXxeLiokYCksICckMScpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==