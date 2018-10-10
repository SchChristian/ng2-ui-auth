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
export class SharedService {
    /**
     * @param {?} storage
     * @param {?} config
     */
    constructor(storage, config) {
        this.storage = storage;
        this.config = config;
        this.tokenName = this.config.options.tokenPrefix
            ? [this.config.options.tokenPrefix, this.config.options.tokenName].join(this.config.options.tokenSeparator)
            : this.config.options.tokenName;
    }
    /**
     * @return {?}
     */
    getToken() {
        return this.storage.get(this.tokenName);
    }
    /**
     * @param {?=} token
     * @return {?}
     */
    getPayload(token = this.getToken()) {
        if (token && token.split('.').length === 3) {
            try {
                /** @type {?} */
                const base64Url = token.split('.')[1];
                /** @type {?} */
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                return JSON.parse(this.b64DecodeUnicode(base64));
            }
            catch (e) {
                return undefined;
            }
        }
    }
    /**
     * @param {?} response
     * @return {?}
     */
    setToken(response) {
        if (!response) {
            // console.warn('Can\'t set token without passing a value');
            return;
        }
        /** @type {?} */
        let token;
        if (typeof response === 'string') {
            token = response;
        }
        else {
            token = this.config.options.resolveToken(response, this.config.options);
        }
        if (token) {
            /** @type {?} */
            const expDate = this.getExpirationDate(token);
            this.storage.set(this.tokenName, token, expDate ? expDate.toUTCString() : '');
        }
    }
    /**
     * @return {?}
     */
    removeToken() {
        this.storage.remove(this.tokenName);
    }
    /**
     * @param {?=} token
     * @return {?}
     */
    isAuthenticated(token = this.getToken()) {
        // a token is present
        if (token) {
            // token with a valid JWT format XXX.YYY.ZZZ
            if (token.split('.').length === 3) {
                // could be a valid JWT or an access token with the same format
                try {
                    /** @type {?} */
                    const base64Url = token.split('.')[1];
                    /** @type {?} */
                    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    /** @type {?} */
                    const exp = JSON.parse(this.b64DecodeUnicode(base64)).exp;
                    // jwt with an optional expiration claims
                    if (exp) {
                        /** @type {?} */
                        const isExpired = Math.round(new Date().getTime() / 1000) >= exp;
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
    }
    /**
     * @param {?=} token
     * @return {?}
     */
    getExpirationDate(token = this.getToken()) {
        /** @type {?} */
        const payload = this.getPayload(token);
        if (payload && payload.exp && Math.round(new Date().getTime() / 1000) < payload.exp) {
            /** @type {?} */
            const date = new Date(0);
            date.setUTCSeconds(payload.exp);
            return date;
        }
        return null;
    }
    /**
     * @return {?}
     */
    logout() {
        return Observable.create((observer) => {
            this.storage.remove(this.tokenName);
            observer.next();
            observer.complete();
        });
    }
    /**
     * @param {?} type
     * @return {?}
     */
    setStorageType(type) {
        return this.storage.updateStorageType(type);
    }
    /**
     * @param {?} str
     * @return {?}
     */
    b64DecodeUnicode(str) {
        return decodeURIComponent(Array.prototype.map.call(atob(str), c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    }
}
SharedService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
SharedService.ctorParameters = () => [
    { type: StorageService },
    { type: ConfigService }
];
if (false) {
    /** @type {?} */
    SharedService.prototype.tokenName;
    /** @type {?} */
    SharedService.prototype.storage;
    /** @type {?} */
    SharedService.prototype.config;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItdWktYXV0aC8iLCJzb3VyY2VzIjpbInNoYXJlZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFHQSxPQUFPLEVBQUUsVUFBVSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7OztBQVFuRCxNQUFNOzs7OztJQUtGLFlBQ1ksU0FDQTtRQURBLFlBQU8sR0FBUCxPQUFPO1FBQ1AsV0FBTSxHQUFOLE1BQU07eUJBTkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUM5QyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQztZQUMzRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUztLQUlHOzs7O0lBRS9CLFFBQVE7UUFDWCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzs7Ozs7O0lBR3JDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRTtRQUVyQyxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDeEMsSUFBSTs7Z0JBQ0EsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Z0JBQ3RDLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQy9ELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzthQUNwRDtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNSLE9BQU8sU0FBUyxDQUFDO2FBQ3BCO1NBQ0o7Ozs7OztJQUdFLFFBQVEsQ0FBQyxRQUF5QjtRQUNyQyxJQUFJLENBQUMsUUFBUSxFQUFFOztZQUVYLE9BQU87U0FDVjs7UUFFRCxJQUFJLEtBQUssQ0FBUztRQUNsQixJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRTtZQUM5QixLQUFLLEdBQUcsUUFBUSxDQUFDO1NBQ3BCO2FBQU07WUFDSCxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzNFO1FBRUQsSUFBSSxLQUFLLEVBQUU7O1lBQ1AsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNqRjs7Ozs7SUFHRSxXQUFXO1FBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDOzs7Ozs7SUFHakMsZUFBZSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFOztRQUcxQyxJQUFJLEtBQUssRUFBRTs7WUFFUCxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTs7Z0JBRS9CLElBQUk7O29CQUNBLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O29CQUN0QyxNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDOztvQkFDL0QsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7O29CQUUxRCxJQUFJLEdBQUcsRUFBRTs7d0JBQ0wsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQzt3QkFDakUsSUFBSSxTQUFTLEVBQUU7OzRCQUVYLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzs0QkFDcEMsT0FBTyxLQUFLLENBQUM7eUJBQ2hCOzZCQUFNOzs0QkFFSCxPQUFPLElBQUksQ0FBQzt5QkFDZjtxQkFDSjtpQkFDSjtnQkFBQyxPQUFPLENBQUMsRUFBRTs7b0JBRVIsT0FBTyxJQUFJLENBQUM7aUJBQ2Y7YUFDSjs7WUFFRCxPQUFPLElBQUksQ0FBQztTQUNmOztRQUVELE9BQU8sS0FBSyxDQUFDOzs7Ozs7SUFHVixpQkFBaUIsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRTs7UUFDNUMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QyxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFOztZQUNqRixNQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQyxPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsT0FBTyxJQUFJLENBQUM7Ozs7O0lBR1QsTUFBTTtRQUNULE9BQU8sVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQXlCLEVBQUUsRUFBRTtZQUNuRCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDcEMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2hCLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUN2QixDQUFDLENBQUM7Ozs7OztJQUdBLGNBQWMsQ0FBQyxJQUFpQjtRQUNuQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7OztJQUd4QyxnQkFBZ0IsQ0FBQyxHQUFHO1FBQ3hCLE9BQU8sa0JBQWtCLENBQ3JCLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQ2xDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQzdELENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Ozs7WUEvR25CLFVBQVU7Ozs7WUFQRixjQUFjO1lBRGQsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFJvbiBvbiAxNy8xMi8yMDE1LlxyXG4gKi9cclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaWJlciB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2NvbmZpZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuL3N0b3JhZ2Uuc2VydmljZSc7XHJcbmltcG9ydCB7IFN0b3JhZ2VUeXBlIH0gZnJvbSAnLi9zdG9yYWdlLXR5cGUuZW51bSc7XHJcblxyXG4vKipcclxuICogQ3JlYXRlZCBieSBSb24gb24gMTcvMTIvMjAxNS5cclxuICovXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBTaGFyZWRTZXJ2aWNlIHtcclxuICAgIHB1YmxpYyB0b2tlbk5hbWUgPSB0aGlzLmNvbmZpZy5vcHRpb25zLnRva2VuUHJlZml4XHJcbiAgICAgICAgPyBbdGhpcy5jb25maWcub3B0aW9ucy50b2tlblByZWZpeCwgdGhpcy5jb25maWcub3B0aW9ucy50b2tlbk5hbWVdLmpvaW4odGhpcy5jb25maWcub3B0aW9ucy50b2tlblNlcGFyYXRvcilcclxuICAgICAgICA6IHRoaXMuY29uZmlnLm9wdGlvbnMudG9rZW5OYW1lO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgc3RvcmFnZTogU3RvcmFnZVNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UpIHsgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRUb2tlbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdG9yYWdlLmdldCh0aGlzLnRva2VuTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFBheWxvYWQodG9rZW4gPSB0aGlzLmdldFRva2VuKCkpIHtcclxuXHJcbiAgICAgICAgaWYgKHRva2VuICYmIHRva2VuLnNwbGl0KCcuJykubGVuZ3RoID09PSAzKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBiYXNlNjRVcmwgPSB0b2tlbi5zcGxpdCgnLicpWzFdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYmFzZTY0ID0gYmFzZTY0VXJsLnJlcGxhY2UoLy0vZywgJysnKS5yZXBsYWNlKC9fL2csICcvJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh0aGlzLmI2NERlY29kZVVuaWNvZGUoYmFzZTY0KSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFRva2VuKHJlc3BvbnNlOiBzdHJpbmcgfCBvYmplY3QpIHtcclxuICAgICAgICBpZiAoIXJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUud2FybignQ2FuXFwndCBzZXQgdG9rZW4gd2l0aG91dCBwYXNzaW5nIGEgdmFsdWUnKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHRva2VuOiBzdHJpbmc7XHJcbiAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgdG9rZW4gPSByZXNwb25zZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0b2tlbiA9IHRoaXMuY29uZmlnLm9wdGlvbnMucmVzb2x2ZVRva2VuKHJlc3BvbnNlLCB0aGlzLmNvbmZpZy5vcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0b2tlbikge1xyXG4gICAgICAgICAgICBjb25zdCBleHBEYXRlID0gdGhpcy5nZXRFeHBpcmF0aW9uRGF0ZSh0b2tlbik7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5zZXQodGhpcy50b2tlbk5hbWUsIHRva2VuLCBleHBEYXRlID8gZXhwRGF0ZS50b1VUQ1N0cmluZygpIDogJycpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlVG9rZW4oKSB7XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlLnJlbW92ZSh0aGlzLnRva2VuTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzQXV0aGVudGljYXRlZCh0b2tlbiA9IHRoaXMuZ2V0VG9rZW4oKSkge1xyXG5cclxuICAgICAgICAvLyBhIHRva2VuIGlzIHByZXNlbnRcclxuICAgICAgICBpZiAodG9rZW4pIHtcclxuICAgICAgICAgICAgLy8gdG9rZW4gd2l0aCBhIHZhbGlkIEpXVCBmb3JtYXQgWFhYLllZWS5aWlpcclxuICAgICAgICAgICAgaWYgKHRva2VuLnNwbGl0KCcuJykubGVuZ3RoID09PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb3VsZCBiZSBhIHZhbGlkIEpXVCBvciBhbiBhY2Nlc3MgdG9rZW4gd2l0aCB0aGUgc2FtZSBmb3JtYXRcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFzZTY0VXJsID0gdG9rZW4uc3BsaXQoJy4nKVsxXTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBiYXNlNjQgPSBiYXNlNjRVcmwucmVwbGFjZSgvLS9nLCAnKycpLnJlcGxhY2UoL18vZywgJy8nKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBleHAgPSBKU09OLnBhcnNlKHRoaXMuYjY0RGVjb2RlVW5pY29kZShiYXNlNjQpKS5leHA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gand0IHdpdGggYW4gb3B0aW9uYWwgZXhwaXJhdGlvbiBjbGFpbXNcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXhwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzRXhwaXJlZCA9IE1hdGgucm91bmQobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwKSA+PSBleHA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0V4cGlyZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZhaWw6IEV4cGlyZWQgdG9rZW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5yZW1vdmUodGhpcy50b2tlbk5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcGFzczogTm9uLWV4cGlyZWQgdG9rZW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHBhc3M6IE5vbi1KV1QgdG9rZW4gdGhhdCBsb29rcyBsaWtlIEpXVFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHBhc3M6IEFsbCBvdGhlciB0b2tlbnNcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGxhaWw6IE5vIHRva2VuIGF0IGFsbFxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0RXhwaXJhdGlvbkRhdGUodG9rZW4gPSB0aGlzLmdldFRva2VuKCkpIHtcclxuICAgICAgICBjb25zdCBwYXlsb2FkID0gdGhpcy5nZXRQYXlsb2FkKHRva2VuKTtcclxuICAgICAgICBpZiAocGF5bG9hZCAmJiBwYXlsb2FkLmV4cCAmJiBNYXRoLnJvdW5kKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMCkgPCBwYXlsb2FkLmV4cCkge1xyXG4gICAgICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoMCk7XHJcbiAgICAgICAgICAgIGRhdGUuc2V0VVRDU2Vjb25kcyhwYXlsb2FkLmV4cCk7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9nb3V0KCk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKChvYnNlcnZlcjogU3Vic2NyaWJlcjxhbnk+KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5yZW1vdmUodGhpcy50b2tlbk5hbWUpO1xyXG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KCk7XHJcbiAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFN0b3JhZ2VUeXBlKHR5cGU6IFN0b3JhZ2VUeXBlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmFnZS51cGRhdGVTdG9yYWdlVHlwZSh0eXBlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGI2NERlY29kZVVuaWNvZGUoc3RyKSB7XHJcbiAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChcclxuICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLm1hcC5jYWxsKGF0b2Ioc3RyKSxcclxuICAgICAgICAgICAgYyA9PiAnJScgKyAoJzAwJyArIGMuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikpLnNsaWNlKC0yKSxcclxuICAgICAgICApLmpvaW4oJycpKTtcclxuICAgIH1cclxufVxyXG4iXX0=