/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { LocalService } from './local.service';
import { OauthService } from './oauth.service';
/**
 * Created by Ron on 17/12/2015.
 */
var AuthService = /** @class */ (function () {
    function AuthService(shared, local, oauth) {
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
    AuthService.prototype.login = /**
     * @template T
     * @param {?} user
     * @param {?=} url
     * @return {?}
     */
    function (user, url) {
        return this.local.login(user, url);
    };
    /**
     * @template T
     * @param {?} user
     * @param {?=} url
     * @return {?}
     */
    AuthService.prototype.signup = /**
     * @template T
     * @param {?} user
     * @param {?=} url
     * @return {?}
     */
    function (user, url) {
        return this.local.signup(user, url);
    };
    /**
     * @return {?}
     */
    AuthService.prototype.logout = /**
     * @return {?}
     */
    function () {
        return this.shared.logout();
    };
    /**
     * @template T
     * @param {?} name
     * @param {?=} userData
     * @return {?}
     */
    AuthService.prototype.authenticate = /**
     * @template T
     * @param {?} name
     * @param {?=} userData
     * @return {?}
     */
    function (name, userData) {
        return this.oauth.authenticate(name, userData);
    };
    /**
     * @template T
     * @param {?} name
     * @param {?=} userData
     * @return {?}
     */
    AuthService.prototype.link = /**
     * @template T
     * @param {?} name
     * @param {?=} userData
     * @return {?}
     */
    function (name, userData) {
        return this.oauth.authenticate(name, userData);
    };
    /**
     * @template T
     * @param {?} provider
     * @param {?=} url
     * @return {?}
     */
    AuthService.prototype.unlink = /**
     * @template T
     * @param {?} provider
     * @param {?=} url
     * @return {?}
     */
    function (provider, url) {
        return this.oauth.unlink(provider, url);
    };
    /**
     * @return {?}
     */
    AuthService.prototype.isAuthenticated = /**
     * @return {?}
     */
    function () {
        return this.shared.isAuthenticated();
    };
    /**
     * @return {?}
     */
    AuthService.prototype.getToken = /**
     * @return {?}
     */
    function () {
        return this.shared.getToken();
    };
    /**
     * @param {?} token
     * @return {?}
     */
    AuthService.prototype.setToken = /**
     * @param {?} token
     * @return {?}
     */
    function (token) {
        this.shared.setToken(token);
    };
    /**
     * @return {?}
     */
    AuthService.prototype.removeToken = /**
     * @return {?}
     */
    function () {
        this.shared.removeToken();
    };
    /**
     * @return {?}
     */
    AuthService.prototype.getPayload = /**
     * @return {?}
     */
    function () {
        return this.shared.getPayload();
    };
    /**
     * @param {?} type
     * @return {?}
     */
    AuthService.prototype.setStorageType = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        return this.shared.setStorageType(type);
    };
    /**
     * @return {?}
     */
    AuthService.prototype.getExpirationDate = /**
     * @return {?}
     */
    function () {
        return this.shared.getExpirationDate();
    };
    AuthService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    AuthService.ctorParameters = function () { return [
        { type: SharedService },
        { type: LocalService },
        { type: OauthService }
    ]; };
    return AuthService;
}());
export { AuthService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    AuthService.prototype.shared;
    /**
     * @type {?}
     * @private
     */
    AuthService.prototype.local;
    /**
     * @type {?}
     * @private
     */
    AuthService.prototype.oauth;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXVpLWF1dGgvIiwic291cmNlcyI6WyJhdXRoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFRL0M7SUFFSSxxQkFBb0IsTUFBcUIsRUFDN0IsS0FBbUIsRUFDbkIsS0FBbUI7UUFGWCxXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQzdCLFVBQUssR0FBTCxLQUFLLENBQWM7UUFDbkIsVUFBSyxHQUFMLEtBQUssQ0FBYztJQUMvQixDQUFDOzs7Ozs7O0lBRU0sMkJBQUs7Ozs7OztJQUFaLFVBQThDLElBQXFCLEVBQUUsR0FBWTtRQUM3RSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFJLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMxQyxDQUFDOzs7Ozs7O0lBRU0sNEJBQU07Ozs7OztJQUFiLFVBQXVCLElBQXFCLEVBQUUsR0FBWTtRQUN0RCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFJLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMzQyxDQUFDOzs7O0lBRU0sNEJBQU07OztJQUFiO1FBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hDLENBQUM7Ozs7Ozs7SUFFTSxrQ0FBWTs7Ozs7O0lBQW5CLFVBQStDLElBQVksRUFBRSxRQUFjO1FBQ3ZFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUksSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3RELENBQUM7Ozs7Ozs7SUFFTSwwQkFBSTs7Ozs7O0lBQVgsVUFBdUMsSUFBWSxFQUFFLFFBQWM7UUFDL0QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBSSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDdEQsQ0FBQzs7Ozs7OztJQUVNLDRCQUFNOzs7Ozs7SUFBYixVQUF1QixRQUFnQixFQUFFLEdBQVk7UUFDakQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBSSxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDL0MsQ0FBQzs7OztJQUVNLHFDQUFlOzs7SUFBdEI7UUFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDekMsQ0FBQzs7OztJQUVNLDhCQUFROzs7SUFBZjtRQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQyxDQUFDOzs7OztJQUVNLDhCQUFROzs7O0lBQWYsVUFBZ0IsS0FBc0I7UUFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQzs7OztJQUVNLGlDQUFXOzs7SUFBbEI7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzlCLENBQUM7Ozs7SUFFTSxnQ0FBVTs7O0lBQWpCO1FBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BDLENBQUM7Ozs7O0lBRU0sb0NBQWM7Ozs7SUFBckIsVUFBc0IsSUFBaUI7UUFDbkMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxDQUFDOzs7O0lBRU0sdUNBQWlCOzs7SUFBeEI7UUFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUMzQyxDQUFDOztnQkF6REosVUFBVTs7OztnQkFWRixhQUFhO2dCQUNiLFlBQVk7Z0JBQ1osWUFBWTs7SUFrRXJCLGtCQUFDO0NBQUEsQUExREQsSUEwREM7U0F6RFksV0FBVzs7Ozs7O0lBQ1IsNkJBQTZCOzs7OztJQUNyQyw0QkFBMkI7Ozs7O0lBQzNCLDRCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU2hhcmVkU2VydmljZSB9IGZyb20gJy4vc2hhcmVkLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMb2NhbFNlcnZpY2UgfSBmcm9tICcuL2xvY2FsLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBPYXV0aFNlcnZpY2UgfSBmcm9tICcuL29hdXRoLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IFN0b3JhZ2VUeXBlIH0gZnJvbSAnLi9zdG9yYWdlLXR5cGUuZW51bSc7XHJcblxyXG4vKipcclxuICogQ3JlYXRlZCBieSBSb24gb24gMTcvMTIvMjAxNS5cclxuICovXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBBdXRoU2VydmljZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNoYXJlZDogU2hhcmVkU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGxvY2FsOiBMb2NhbFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBvYXV0aDogT2F1dGhTZXJ2aWNlKSB7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvZ2luPFQgZXh0ZW5kcyBzdHJpbmcgfCBvYmplY3QgPSBhbnk+KHVzZXI6IHN0cmluZyB8IG9iamVjdCwgdXJsPzogc3RyaW5nKTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWwubG9naW48VD4odXNlciwgdXJsKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2lnbnVwPFQgPSBhbnk+KHVzZXI6IHN0cmluZyB8IG9iamVjdCwgdXJsPzogc3RyaW5nKTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWwuc2lnbnVwPFQ+KHVzZXIsIHVybCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvZ291dCgpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zaGFyZWQubG9nb3V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGF1dGhlbnRpY2F0ZTxUIGV4dGVuZHMgb2JqZWN0IHwgc3RyaW5nPihuYW1lOiBzdHJpbmcsIHVzZXJEYXRhPzogYW55KTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub2F1dGguYXV0aGVudGljYXRlPFQ+KG5hbWUsIHVzZXJEYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbGluazxUIGV4dGVuZHMgb2JqZWN0IHwgc3RyaW5nPihuYW1lOiBzdHJpbmcsIHVzZXJEYXRhPzogYW55KTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub2F1dGguYXV0aGVudGljYXRlPFQ+KG5hbWUsIHVzZXJEYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdW5saW5rPFQgPSBhbnk+KHByb3ZpZGVyOiBzdHJpbmcsIHVybD86IHN0cmluZyk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm9hdXRoLnVubGluazxUPihwcm92aWRlciwgdXJsKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNBdXRoZW50aWNhdGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNoYXJlZC5pc0F1dGhlbnRpY2F0ZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0VG9rZW4oKTogc3RyaW5nIHwgbnVsbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hhcmVkLmdldFRva2VuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFRva2VuKHRva2VuOiBzdHJpbmcgfCBvYmplY3QpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNoYXJlZC5zZXRUb2tlbih0b2tlbik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZVRva2VuKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2hhcmVkLnJlbW92ZVRva2VuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFBheWxvYWQoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zaGFyZWQuZ2V0UGF5bG9hZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRTdG9yYWdlVHlwZSh0eXBlOiBTdG9yYWdlVHlwZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNoYXJlZC5zZXRTdG9yYWdlVHlwZSh0eXBlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0RXhwaXJhdGlvbkRhdGUoKTogRGF0ZSB8IG51bGwge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNoYXJlZC5nZXRFeHBpcmF0aW9uRGF0ZSgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==