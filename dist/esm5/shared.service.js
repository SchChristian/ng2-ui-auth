/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { StorageService } from './storage.service';
/**
 * Created by Ron on 17/12/2015.
 */
var SharedService = /** @class */ (function () {
    function SharedService(storage, config) {
        this.storage = storage;
        this.config = config;
        this.tokenName = this.config.options.tokenPrefix
            ? [this.config.options.tokenPrefix, this.config.options.tokenName].join(this.config.options.tokenSeparator)
            : this.config.options.tokenName;
    }
    /**
     * @return {?}
     */
    SharedService.prototype.getToken = /**
     * @return {?}
     */
    function () {
        return this.storage.get(this.tokenName);
    };
    /**
     * @param {?=} token
     * @return {?}
     */
    SharedService.prototype.getPayload = /**
     * @param {?=} token
     * @return {?}
     */
    function (token) {
        if (token === void 0) { token = this.getToken(); }
        if (token && token.split('.').length === 3) {
            try {
                /** @type {?} */
                var base64Url = token.split('.')[1];
                /** @type {?} */
                var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                return JSON.parse(this.b64DecodeUnicode(base64));
            }
            catch (e) {
                return undefined;
            }
        }
    };
    /**
     * @param {?} response
     * @return {?}
     */
    SharedService.prototype.setToken = /**
     * @param {?} response
     * @return {?}
     */
    function (response) {
        if (!response) {
            // console.warn('Can\'t set token without passing a value');
            return;
        }
        /** @type {?} */
        var token;
        if (typeof response === 'string') {
            token = response;
        }
        else {
            token = this.config.options.resolveToken(response, this.config.options);
        }
        if (token) {
            /** @type {?} */
            var expDate = this.getExpirationDate(token);
            this.storage.set(this.tokenName, token, expDate ? expDate.toUTCString() : '');
        }
    };
    /**
     * @return {?}
     */
    SharedService.prototype.removeToken = /**
     * @return {?}
     */
    function () {
        this.storage.remove(this.tokenName);
    };
    /**
     * @param {?=} token
     * @return {?}
     */
    SharedService.prototype.isAuthenticated = /**
     * @param {?=} token
     * @return {?}
     */
    function (token) {
        if (token === void 0) { token = this.getToken(); }
        // a token is present
        if (token) {
            // token with a valid JWT format XXX.YYY.ZZZ
            if (token.split('.').length === 3) {
                // could be a valid JWT or an access token with the same format
                try {
                    /** @type {?} */
                    var base64Url = token.split('.')[1];
                    /** @type {?} */
                    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    /** @type {?} */
                    var exp = JSON.parse(this.b64DecodeUnicode(base64)).exp;
                    // jwt with an optional expiration claims
                    if (exp) {
                        /** @type {?} */
                        var isExpired = Math.round(new Date().getTime() / 1000) >= exp;
                        if (isExpired) {
                            // fail: Expired token
                            this.storage.remove(this.tokenName);
                            return false;
                        }
                        else {
                            // pass: Non-expired token
                            return true;
                        }
                    }
                }
                catch (e) {
                    // pass: Non-JWT token that looks like JWT
                    return true;
                }
            }
            // pass: All other tokens
            return true;
        }
        // lail: No token at all
        return false;
    };
    /**
     * @param {?=} token
     * @return {?}
     */
    SharedService.prototype.getExpirationDate = /**
     * @param {?=} token
     * @return {?}
     */
    function (token) {
        if (token === void 0) { token = this.getToken(); }
        /** @type {?} */
        var payload = this.getPayload(token);
        if (payload && payload.exp && Math.round(new Date().getTime() / 1000) < payload.exp) {
            /** @type {?} */
            var date = new Date(0);
            date.setUTCSeconds(payload.exp);
            return date;
        }
        return null;
    };
    /**
     * @return {?}
     */
    SharedService.prototype.logout = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return Observable.create(function (observer) {
            _this.storage.remove(_this.tokenName);
            observer.next();
            observer.complete();
        });
    };
    /**
     * @param {?} type
     * @return {?}
     */
    SharedService.prototype.setStorageType = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        return this.storage.updateStorageType(type);
    };
    /**
     * @param {?} str
     * @return {?}
     */
    SharedService.prototype.b64DecodeUnicode = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return decodeURIComponent(Array.prototype.map.call(atob(str), function (c) { return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2); }).join(''));
    };
    SharedService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    SharedService.ctorParameters = function () { return [
        { type: StorageService },
        { type: ConfigService }
    ]; };
    return SharedService;
}());
export { SharedService };
if (false) {
    /** @type {?} */
    SharedService.prototype.tokenName;
    /** @type {?} */
    SharedService.prototype.storage;
    /** @type {?} */
    SharedService.prototype.config;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItdWktYXV0aC8iLCJzb3VyY2VzIjpbInNoYXJlZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFHQSxPQUFPLEVBQUUsVUFBVSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7Ozs7SUFhL0MsdUJBQ1ksU0FDQTtRQURBLFlBQU8sR0FBUCxPQUFPO1FBQ1AsV0FBTSxHQUFOLE1BQU07eUJBTkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUM5QyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQztZQUMzRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUztLQUlHOzs7O0lBRS9CLGdDQUFROzs7O1FBQ1gsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Ozs7OztJQUdyQyxrQ0FBVTs7OztjQUFDLEtBQXVCO1FBQXZCLHNCQUFBLEVBQUEsUUFBUSxJQUFJLENBQUMsUUFBUSxFQUFFO1FBRXJDLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUN4QyxJQUFJOztnQkFDQSxJQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdB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RGQsYUFBYTs7d0JBTHRCOztTQWNhLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBSb24gb24gMTcvMTIvMjAxNS5cclxuICovXHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmliZXIgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9zdG9yYWdlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdG9yYWdlVHlwZSB9IGZyb20gJy4vc3RvcmFnZS10eXBlLmVudW0nO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgUm9uIG9uIDE3LzEyLzIwMTUuXHJcbiAqL1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgU2hhcmVkU2VydmljZSB7XHJcbiAgICBwdWJsaWMgdG9rZW5OYW1lID0gdGhpcy5jb25maWcub3B0aW9ucy50b2tlblByZWZpeFxyXG4gICAgICAgID8gW3RoaXMuY29uZmlnLm9wdGlvbnMudG9rZW5QcmVmaXgsIHRoaXMuY29uZmlnLm9wdGlvbnMudG9rZW5OYW1lXS5qb2luKHRoaXMuY29uZmlnLm9wdGlvbnMudG9rZW5TZXBhcmF0b3IpXHJcbiAgICAgICAgOiB0aGlzLmNvbmZpZy5vcHRpb25zLnRva2VuTmFtZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHN0b3JhZ2U6IFN0b3JhZ2VTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgY29uZmlnOiBDb25maWdTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0VG9rZW4oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5nZXQodGhpcy50b2tlbk5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRQYXlsb2FkKHRva2VuID0gdGhpcy5nZXRUb2tlbigpKSB7XHJcblxyXG4gICAgICAgIGlmICh0b2tlbiAmJiB0b2tlbi5zcGxpdCgnLicpLmxlbmd0aCA9PT0gMykge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYmFzZTY0VXJsID0gdG9rZW4uc3BsaXQoJy4nKVsxXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJhc2U2NCA9IGJhc2U2NFVybC5yZXBsYWNlKC8tL2csICcrJykucmVwbGFjZSgvXy9nLCAnLycpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodGhpcy5iNjREZWNvZGVVbmljb2RlKGJhc2U2NCkpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRUb2tlbihyZXNwb25zZTogc3RyaW5nIHwgb2JqZWN0KSB7XHJcbiAgICAgICAgaWYgKCFyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLndhcm4oJ0NhblxcJ3Qgc2V0IHRva2VuIHdpdGhvdXQgcGFzc2luZyBhIHZhbHVlJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0b2tlbjogc3RyaW5nO1xyXG4gICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHRva2VuID0gcmVzcG9uc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdG9rZW4gPSB0aGlzLmNvbmZpZy5vcHRpb25zLnJlc29sdmVUb2tlbihyZXNwb25zZSwgdGhpcy5jb25maWcub3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodG9rZW4pIHtcclxuICAgICAgICAgICAgY29uc3QgZXhwRGF0ZSA9IHRoaXMuZ2V0RXhwaXJhdGlvbkRhdGUodG9rZW4pO1xyXG4gICAgICAgICAgICB0aGlzLnN0b3JhZ2Uuc2V0KHRoaXMudG9rZW5OYW1lLCB0b2tlbiwgZXhwRGF0ZSA/IGV4cERhdGUudG9VVENTdHJpbmcoKSA6ICcnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZVRva2VuKCkge1xyXG4gICAgICAgIHRoaXMuc3RvcmFnZS5yZW1vdmUodGhpcy50b2tlbk5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc0F1dGhlbnRpY2F0ZWQodG9rZW4gPSB0aGlzLmdldFRva2VuKCkpIHtcclxuXHJcbiAgICAgICAgLy8gYSB0b2tlbiBpcyBwcmVzZW50XHJcbiAgICAgICAgaWYgKHRva2VuKSB7XHJcbiAgICAgICAgICAgIC8vIHRva2VuIHdpdGggYSB2YWxpZCBKV1QgZm9ybWF0IFhYWC5ZWVkuWlpaXHJcbiAgICAgICAgICAgIGlmICh0b2tlbi5zcGxpdCgnLicpLmxlbmd0aCA9PT0gMykge1xyXG4gICAgICAgICAgICAgICAgLy8gY291bGQgYmUgYSB2YWxpZCBKV1Qgb3IgYW4gYWNjZXNzIHRva2VuIHdpdGggdGhlIHNhbWUgZm9ybWF0XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhc2U2NFVybCA9IHRva2VuLnNwbGl0KCcuJylbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFzZTY0ID0gYmFzZTY0VXJsLnJlcGxhY2UoLy0vZywgJysnKS5yZXBsYWNlKC9fL2csICcvJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXhwID0gSlNPTi5wYXJzZSh0aGlzLmI2NERlY29kZVVuaWNvZGUoYmFzZTY0KSkuZXhwO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGp3dCB3aXRoIGFuIG9wdGlvbmFsIGV4cGlyYXRpb24gY2xhaW1zXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV4cCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpc0V4cGlyZWQgPSBNYXRoLnJvdW5kKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMCkgPj0gZXhwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNFeHBpcmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmYWlsOiBFeHBpcmVkIHRva2VuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2UucmVtb3ZlKHRoaXMudG9rZW5OYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBhc3M6IE5vbi1leHBpcmVkIHRva2VuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBwYXNzOiBOb24tSldUIHRva2VuIHRoYXQgbG9va3MgbGlrZSBKV1RcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBwYXNzOiBBbGwgb3RoZXIgdG9rZW5zXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBsYWlsOiBObyB0b2tlbiBhdCBhbGxcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEV4cGlyYXRpb25EYXRlKHRva2VuID0gdGhpcy5nZXRUb2tlbigpKSB7XHJcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IHRoaXMuZ2V0UGF5bG9hZCh0b2tlbik7XHJcbiAgICAgICAgaWYgKHBheWxvYWQgJiYgcGF5bG9hZC5leHAgJiYgTWF0aC5yb3VuZChuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDApIDwgcGF5bG9hZC5leHApIHtcclxuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKDApO1xyXG4gICAgICAgICAgICBkYXRlLnNldFVUQ1NlY29uZHMocGF5bG9hZC5leHApO1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvZ291dCgpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IFN1YnNjcmliZXI8YW55PikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnN0b3JhZ2UucmVtb3ZlKHRoaXMudG9rZW5OYW1lKTtcclxuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCgpO1xyXG4gICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRTdG9yYWdlVHlwZSh0eXBlOiBTdG9yYWdlVHlwZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2UudXBkYXRlU3RvcmFnZVR5cGUodHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBiNjREZWNvZGVVbmljb2RlKHN0cikge1xyXG4gICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoXHJcbiAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5tYXAuY2FsbChhdG9iKHN0ciksXHJcbiAgICAgICAgICAgIGMgPT4gJyUnICsgKCcwMCcgKyBjLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpKS5zbGljZSgtMiksXHJcbiAgICAgICAgKS5qb2luKCcnKSk7XHJcbiAgICB9XHJcbn1cclxuIl19