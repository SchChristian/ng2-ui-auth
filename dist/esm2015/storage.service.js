/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @private
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
     * @private
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
     * @private
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
     * @private
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
     * @private
     * @param {?} key
     * @param {?=} path
     * @return {?}
     */
    removeCookie(key, path = '/') {
        this.setCookie(key, '', new Date(0).toUTCString(), path);
    }
    /**
     * @private
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXVpLWF1dGgvIiwic291cmNlcyI6WyJzdG9yYWdlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBZSxNQUFNLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7O0FBRXhILE1BQU0sT0FBZ0IsY0FBYztDQVFuQzs7Ozs7OztJQVBHLHdFQUE4RDs7Ozs7O0lBRTlELGtEQUFrQzs7Ozs7Ozs7SUFFbEMsK0RBQTZEOzs7Ozs7SUFFN0QscURBQW1DOzs7OztBQU92QyxNQUFNLE9BQU8scUJBQXNCLFNBQVEsY0FBYzs7OztJQUlyRCxZQUFvQixNQUFxQjtRQUNyQyxLQUFLLEVBQUUsQ0FBQztRQURRLFdBQU0sR0FBTixNQUFNLENBQWU7UUFIakMsVUFBSyxHQUE4QixFQUFFLENBQUM7UUFDdEMsZ0JBQVcsR0FBZ0IsTUFBTSxDQUFDO1FBSXRDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUNyRCxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLG9CQUFvQixDQUFDLENBQUM7U0FDbkU7SUFDTCxDQUFDOzs7OztJQUVNLGlCQUFpQixDQUFDLFdBQXdCOztjQUN2QyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsV0FBVyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUNyQixPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxD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QUMsYUFBYSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFVLElBQUksRUFBRSxDQUFDO0lBQzlGLENBQUM7Ozs7Ozs7SUFFTyxZQUFZLENBQUMsR0FBVyxFQUFFLElBQUksR0FBRyxHQUFHO1FBQ3hDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM3RCxDQUFDOzs7Ozs7SUFFTyxTQUFTLENBQUMsR0FBVztRQUN6QixPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLG1CQUFtQixHQUFHLDZCQUE2QixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDMUcsQ0FBQzs7O1lBdElKLFVBQVU7Ozs7WUFoQkYsYUFBYTs7Ozs7OztJQWtCbEIsc0NBQThDOzs7OztJQUM5Qyw0Q0FBMEM7Ozs7O0lBRTlCLHVDQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4vY29uZmlnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdG9yYWdlVHlwZSwgTUVNT1JZLCBDT09LSUUsIFNFU1NJT05fQ09PS0lFLCBMT0NBTF9TVE9SQUdFLCBTRVNTSU9OX1NUT1JBR0UsIE5PTkUgfSBmcm9tICcuL3N0b3JhZ2UtdHlwZS5lbnVtJztcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTdG9yYWdlU2VydmljZSB7XHJcbiAgICBhYnN0cmFjdCB1cGRhdGVTdG9yYWdlVHlwZShzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGUpOiBib29sZWFuO1xyXG5cclxuICAgIGFic3RyYWN0IGdldChrZXk6IHN0cmluZyk6IHN0cmluZztcclxuXHJcbiAgICBhYnN0cmFjdCBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIGRhdGU6IHN0cmluZyk6IHZvaWQ7XHJcblxyXG4gICAgYWJzdHJhY3QgcmVtb3ZlKGtleTogc3RyaW5nKTogdm9pZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgUm9uIG9uIDE3LzEyLzIwMTUuXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBCcm93c2VyU3RvcmFnZVNlcnZpY2UgZXh0ZW5kcyBTdG9yYWdlU2VydmljZSB7XHJcbiAgICBwcml2YXRlIHN0b3JlOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge307XHJcbiAgICBwcml2YXRlIHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZSA9IE1FTU9SWTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgaWYgKCF0aGlzLnVwZGF0ZVN0b3JhZ2VUeXBlKGNvbmZpZy5vcHRpb25zLnN0b3JhZ2VUeXBlKSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oY29uZmlnLm9wdGlvbnMuc3RvcmFnZVR5cGUgKyAnIGlzIG5vdCBhdmFpbGFibGUuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVTdG9yYWdlVHlwZShzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGUpIHtcclxuICAgICAgICBjb25zdCBpc1N0b3JhZ2VBdmFpbGFibGUgPSB0aGlzLmNoZWNrSXNTdG9yYWdlQXZhaWxhYmxlKHN0b3JhZ2VUeXBlKTtcclxuICAgICAgICBpZiAoIWlzU3RvcmFnZUF2YWlsYWJsZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3RvcmFnZVR5cGUgPSBzdG9yYWdlVHlwZTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0KGtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLnN0b3JhZ2VUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgQ09PS0lFOlxyXG4gICAgICAgICAgICBjYXNlIFNFU1NJT05fQ09PS0lFOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29va2llKGtleSk7XHJcbiAgICAgICAgICAgIGNhc2UgTE9DQUxfU1RPUkFHRTpcclxuICAgICAgICAgICAgY2FzZSBTRVNTSU9OX1NUT1JBR0U6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93W3RoaXMuc3RvcmFnZVR5cGVdLmdldEl0ZW0oa2V5KTtcclxuICAgICAgICAgICAgY2FzZSBNRU1PUlk6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zdG9yZVtrZXldO1xyXG4gICAgICAgICAgICBjYXNlIE5PTkU6XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldChrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZywgZGF0ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLnN0b3JhZ2VUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgQ09PS0lFOlxyXG4gICAgICAgICAgICBjYXNlIFNFU1NJT05fQ09PS0lFOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRDb29raWUoa2V5LCB2YWx1ZSwgdGhpcy5zdG9yYWdlVHlwZSA9PT0gQ09PS0lFID8gZGF0ZSA6ICcnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIExPQ0FMX1NUT1JBR0U6XHJcbiAgICAgICAgICAgIGNhc2UgU0VTU0lPTl9TVE9SQUdFOlxyXG4gICAgICAgICAgICAgICAgd2luZG93W3RoaXMuc3RvcmFnZVR5cGVdLnNldEl0ZW0oa2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBNRU1PUlk6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JlW2tleV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIE5PTkU6XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZShrZXk6IHN0cmluZykge1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5zdG9yYWdlVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIENPT0tJRTpcclxuICAgICAgICAgICAgY2FzZSBTRVNTSU9OX0NPT0tJRTpcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQ29va2llKGtleSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBMT0NBTF9TVE9SQUdFOlxyXG4gICAgICAgICAgICBjYXNlIFNFU1NJT05fU1RPUkFHRTpcclxuICAgICAgICAgICAgICAgIHdpbmRvd1t0aGlzLnN0b3JhZ2VUeXBlXS5yZW1vdmVJdGVtKGtleSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBNRU1PUlk6XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5zdG9yZVtrZXldO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTk9ORTpcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoZWNrSXNTdG9yYWdlQXZhaWxhYmxlKHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZSkge1xyXG4gICAgICAgIHN3aXRjaCAoc3RvcmFnZVR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBDT09LSUU6XHJcbiAgICAgICAgICAgIGNhc2UgU0VTU0lPTl9DT09LSUU6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc0Nvb2tpZVN0b3JhZ2VBdmFpbGFibGUoKTtcclxuICAgICAgICAgICAgY2FzZSBMT0NBTF9TVE9SQUdFOlxyXG4gICAgICAgICAgICBjYXNlIFNFU1NJT05fU1RPUkFHRTpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzV2luZG93U3RvcmFnZUF2YWlsYWJsZShzdG9yYWdlVHlwZSk7XHJcbiAgICAgICAgICAgIGNhc2UgTk9ORTpcclxuICAgICAgICAgICAgY2FzZSBNRU1PUlk6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc1dpbmRvd1N0b3JhZ2VBdmFpbGFibGUoc3RvcmFnZVR5cGU6IHR5cGVvZiBTRVNTSU9OX1NUT1JBR0UgfCB0eXBlb2YgTE9DQUxfU1RPUkFHRSkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN1cHBvcnRlZCA9IHdpbmRvdyAmJiBzdG9yYWdlVHlwZSBpbiB3aW5kb3cgJiYgd2luZG93W3N0b3JhZ2VUeXBlXSAhPT0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIGlmIChzdXBwb3J0ZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZyg3KTtcclxuICAgICAgICAgICAgICAgIHdpbmRvd1tzdG9yYWdlVHlwZV0uc2V0SXRlbShrZXksICcnKTtcclxuICAgICAgICAgICAgICAgIHdpbmRvd1tzdG9yYWdlVHlwZV0ucmVtb3ZlSXRlbShrZXkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc3VwcG9ydGVkO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzQ29va2llU3RvcmFnZUF2YWlsYWJsZSgpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBzdXBwb3J0ZWQgPSBkb2N1bWVudCAmJiAnY29va2llJyBpbiBkb2N1bWVudDtcclxuXHJcbiAgICAgICAgICAgIGlmIChzdXBwb3J0ZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZyg3KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0Q29va2llKGtleSwgJ3Rlc3QnLCBuZXcgRGF0ZShEYXRlLm5vdygpICsgNjAgKiAxMDAwKS50b1VUQ1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXRDb29raWUoa2V5KTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQ29va2llKGtleSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUgPT09ICd0ZXN0JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0Q29va2llKGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBleHBpcmVzID0gJycsIHBhdGggPSAnLycpIHtcclxuICAgICAgICBkb2N1bWVudC5jb29raWUgPSBgJHtrZXl9PSR7dmFsdWV9JHtleHBpcmVzID8gYDsgZXhwaXJlcz0ke2V4cGlyZXN9YCA6ICcnfTsgcGF0aD0ke3BhdGh9YDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbW92ZUNvb2tpZShrZXk6IHN0cmluZywgcGF0aCA9ICcvJykge1xyXG4gICAgICAgIHRoaXMuc2V0Q29va2llKGtleSwgJycsIG5ldyBEYXRlKDApLnRvVVRDU3RyaW5nKCksIHBhdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Q29va2llKGtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNvb2tpZS5yZXBsYWNlKG5ldyBSZWdFeHAoYCg/Oig/Ol58Lio7XFxcXHMqKSR7a2V5fVxcXFxzKlxcXFw9XFxcXHMqKFteO10qKS4qJCl8Xi4qJGApLCAnJDEnKTtcclxuICAgIH1cclxufVxyXG4iXX0=