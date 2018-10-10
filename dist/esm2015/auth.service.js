/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { LocalService } from './local.service';
import { OauthService } from './oauth.service';
/**
 * Created by Ron on 17/12/2015.
 */
export class AuthService {
    /**
     * @param {?} shared
     * @param {?} local
     * @param {?} oauth
     */
    constructor(shared, local, oauth) {
        this.shared = shared;
        this.local = local;
        this.oauth = oauth;
    }
    /**
     * @template T
     * @param {?} user
     * @param {?=} url
     * @return {?}
     */
    login(user, url) {
        return this.local.login(user, url);
    }
    /**
     * @template T
     * @param {?} user
     * @param {?=} url
     * @return {?}
     */
    signup(user, url) {
        return this.local.signup(user, url);
    }
    /**
     * @return {?}
     */
    logout() {
        return this.shared.logout();
    }
    /**
     * @template T
     * @param {?} name
     * @param {?=} userData
     * @return {?}
     */
    authenticate(name, userData) {
        return this.oauth.authenticate(name, userData);
    }
    /**
     * @template T
     * @param {?} name
     * @param {?=} userData
     * @return {?}
     */
    link(name, userData) {
        return this.oauth.authenticate(name, userData);
    }
    /**
     * @template T
     * @param {?} provider
     * @param {?=} url
     * @return {?}
     */
    unlink(provider, url) {
        return this.oauth.unlink(provider, url);
    }
    /**
     * @return {?}
     */
    isAuthenticated() {
        return this.shared.isAuthenticated();
    }
    /**
     * @return {?}
     */
    getToken() {
        return this.shared.getToken();
    }
    /**
     * @param {?} token
     * @return {?}
     */
    setToken(token) {
        this.shared.setToken(token);
    }
    /**
     * @return {?}
     */
    removeToken() {
        this.shared.removeToken();
    }
    /**
     * @return {?}
     */
    getPayload() {
        return this.shared.getPayload();
    }
    /**
     * @param {?} type
     * @return {?}
     */
    setStorageType(type) {
        return this.shared.setStorageType(type);
    }
    /**
     * @return {?}
     */
    getExpirationDate() {
        return this.shared.getExpirationDate();
    }
}
AuthService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
AuthService.ctorParameters = () => [
    { type: SharedService },
    { type: LocalService },
    { type: OauthService }
];
if (false) {
    /** @type {?} */
    AuthService.prototype.shared;
    /** @type {?} */
    AuthService.prototype.local;
    /** @type {?} */
    AuthService.prototype.oauth;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXVpLWF1dGgvIiwic291cmNlcyI6WyJhdXRoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFTL0MsTUFBTTs7Ozs7O0lBQ0YsWUFBb0IsTUFBcUIsRUFDN0IsT0FDQTtRQUZRLFdBQU0sR0FBTixNQUFNLENBQWU7UUFDN0IsVUFBSyxHQUFMLEtBQUs7UUFDTCxVQUFLLEdBQUwsS0FBSztLQUNoQjs7Ozs7OztJQUVNLEtBQUssQ0FBa0MsSUFBcUIsRUFBRSxHQUFZO1FBQzdFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUksSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7OztJQUduQyxNQUFNLENBQVUsSUFBcUIsRUFBRSxHQUFZO1FBQ3RELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUksSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDOzs7OztJQUdwQyxNQUFNO1FBQ1QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7OztJQUd6QixZQUFZLENBQTRCLElBQVksRUFBRSxRQUFjO1FBQ3ZFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUksSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDOzs7Ozs7OztJQUcvQyxJQUFJLENBQTRCLElBQVksRUFBRSxRQUFjO1FBQy9ELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUksSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDOzs7Ozs7OztJQUcvQyxNQUFNLENBQVUsUUFBZ0IsRUFBRSxHQUFZO1FBQ2pELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUksUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDOzs7OztJQUd4QyxlQUFlO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQzs7Ozs7SUFHbEMsUUFBUTtRQUNYLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7Ozs7O0lBRzNCLFFBQVEsQ0FBQyxLQUFzQjtRQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7SUFHekIsV0FBVztRQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7Ozs7O0lBR3ZCLFVBQVU7UUFDYixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7Ozs7OztJQUc3QixjQUFjLENBQUMsSUFBaUI7UUFDbkMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7SUFHckMsaUJBQWlCO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDOzs7O1lBeEQ5QyxVQUFVOzs7O1lBVkYsYUFBYTtZQUNiLFlBQVk7WUFDWixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTaGFyZWRTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQuc2VydmljZSc7XHJcbmltcG9ydCB7IExvY2FsU2VydmljZSB9IGZyb20gJy4vbG9jYWwuc2VydmljZSc7XHJcbmltcG9ydCB7IE9hdXRoU2VydmljZSB9IGZyb20gJy4vb2F1dGguc2VydmljZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgU3RvcmFnZVR5cGUgfSBmcm9tICcuL3N0b3JhZ2UtdHlwZS5lbnVtJztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFJvbiBvbiAxNy8xMi8yMDE1LlxyXG4gKi9cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEF1dGhTZXJ2aWNlIHtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc2hhcmVkOiBTaGFyZWRTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgbG9jYWw6IExvY2FsU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIG9hdXRoOiBPYXV0aFNlcnZpY2UpIHtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9naW48VCBleHRlbmRzIHN0cmluZyB8IG9iamVjdCA9IGFueT4odXNlcjogc3RyaW5nIHwgb2JqZWN0LCB1cmw/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbC5sb2dpbjxUPih1c2VyLCB1cmwpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaWdudXA8VCA9IGFueT4odXNlcjogc3RyaW5nIHwgb2JqZWN0LCB1cmw/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbC5zaWdudXA8VD4odXNlciwgdXJsKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9nb3V0KCk6IE9ic2VydmFibGU8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNoYXJlZC5sb2dvdXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXV0aGVudGljYXRlPFQgZXh0ZW5kcyBvYmplY3QgfCBzdHJpbmc+KG5hbWU6IHN0cmluZywgdXNlckRhdGE/OiBhbnkpOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5vYXV0aC5hdXRoZW50aWNhdGU8VD4obmFtZSwgdXNlckRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsaW5rPFQgZXh0ZW5kcyBvYmplY3QgfCBzdHJpbmc+KG5hbWU6IHN0cmluZywgdXNlckRhdGE/OiBhbnkpOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5vYXV0aC5hdXRoZW50aWNhdGU8VD4obmFtZSwgdXNlckRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1bmxpbms8VCA9IGFueT4ocHJvdmlkZXI6IHN0cmluZywgdXJsPzogc3RyaW5nKTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub2F1dGgudW5saW5rPFQ+KHByb3ZpZGVyLCB1cmwpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc0F1dGhlbnRpY2F0ZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hhcmVkLmlzQXV0aGVudGljYXRlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRUb2tlbigpOiBzdHJpbmcgfCBudWxsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zaGFyZWQuZ2V0VG9rZW4oKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0VG9rZW4odG9rZW46IHN0cmluZyB8IG9iamVjdCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2hhcmVkLnNldFRva2VuKHRva2VuKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlVG9rZW4oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zaGFyZWQucmVtb3ZlVG9rZW4oKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0UGF5bG9hZCgpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNoYXJlZC5nZXRQYXlsb2FkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFN0b3JhZ2VUeXBlKHR5cGU6IFN0b3JhZ2VUeXBlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hhcmVkLnNldFN0b3JhZ2VUeXBlKHR5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRFeHBpcmF0aW9uRGF0ZSgpOiBEYXRlIHwgbnVsbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hhcmVkLmdldEV4cGlyYXRpb25EYXRlKCk7XHJcbiAgICB9XHJcbn1cclxuIl19