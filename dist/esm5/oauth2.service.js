/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { joinUrl, buildQueryString, getWindowOrigin } from './utils';
import { ConfigService } from './config.service';
import { PopupService } from './popup.service';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
/**
 * Created by Ron on 17/12/2015.
 */
var Oauth2Service = /** @class */ (function () {
    function Oauth2Service(http, popup, config) {
        this.http = http;
        this.popup = popup;
        this.config = config;
    }
    /**
     * @template T
     * @param {?} oauthOptions
     * @param {?} userData
     * @return {?}
     */
    Oauth2Service.prototype.open = /**
     * @template T
     * @param {?} oauthOptions
     * @param {?} userData
     * @return {?}
     */
    function (oauthOptions, userData) {
        var _this = this;
        /** @type {?} */
        var authorizationData = this.getAuthorizationData(oauthOptions);
        /** @type {?} */
        var url = [oauthOptions.authorizationEndpoint, buildQueryString(authorizationData)].join('?');
        return this.popup.open(url, oauthOptions, this.config.options.cordova).pipe(switchMap(function (oauthData) {
            // when no server URL provided, return popup params as-is.
            // this is for a scenario when someone wishes to opt out from
            // satellizer's magic by doing authorization code exchange and
            // saving a token manually.
            if (oauthOptions.responseType === 'token' || !oauthOptions.url) {
                return of(oauthData);
            }
            if (oauthData.state && oauthData.state !== authorizationData.state) {
                throw new Error('OAuth "state" mismatch');
            }
            return _this.exchangeForToken(oauthOptions, authorizationData, oauthData, userData);
        }));
    };
    /**
     * @private
     * @template T
     * @param {?} options
     * @param {?} authorizationData
     * @param {?} oauthData
     * @param {?} userData
     * @return {?}
     */
    Oauth2Service.prototype.exchangeForToken = /**
     * @private
     * @template T
     * @param {?} options
     * @param {?} authorizationData
     * @param {?} oauthData
     * @param {?} userData
     * @return {?}
     */
    function (options, authorizationData, oauthData, userData) {
        /** @type {?} */
        var body = { authorizationData: authorizationData, oauthData: oauthData, userData: userData };
        var _a = this.config.options, baseUrl = _a.baseUrl, withCredentials = _a.withCredentials;
        var url = options.url, _b = options.method, method = _b === void 0 ? 'POST' : _b;
        /** @type {?} */
        var exchangeForTokenUrl = baseUrl ? joinUrl(baseUrl, url) : url;
        return this.http.request(method, exchangeForTokenUrl, { body: body, withCredentials: withCredentials });
    };
    /**
     * @private
     * @param {?} options
     * @return {?}
     */
    Oauth2Service.prototype.getAuthorizationData = /**
     * @private
     * @param {?} options
     * @return {?}
     */
    function (options) {
        var _a = options.responseType, responseType = _a === void 0 ? 'code' : _a, clientId = options.clientId, _b = options.redirectUri, redirectUri = _b === void 0 ? getWindowOrigin() || '' : _b, _c = options.scopeDelimiter, scopeDelimiter = _c === void 0 ? ',' : _c, scope = options.scope, state = options.state, additionalUrlParams = options.additionalUrlParams;
        /** @type {?} */
        var resolvedState = typeof state === 'function' ? state() : state;
        return tslib_1.__spread([
            ['response_type', responseType],
            ['client_id', clientId],
            ['redirect_uri', redirectUri]
        ], state ? [['state', resolvedState]] : [], scope ? [['scope', scope.join(scopeDelimiter)]] : [], additionalUrlParams
            ? Object
                .keys(additionalUrlParams)
                .map(function (key) {
                /** @type {?} */
                var value = ((/** @type {?} */ (additionalUrlParams)))[key];
                if (typeof value === 'string') {
                    return [key, value];
                }
                else if (typeof value === 'function') {
                    return [key, value()];
                }
                else if (value === null) {
                    return [key, ''];
                }
                return ['', ''];
            })
            : []).filter(function (_) { return !!_[0]; }).reduce(function (acc, next) {
            var _a;
            return (tslib_1.__assign({}, acc, (_a = {}, _a[next[0]] = next[1], _a)));
        }, (/** @type {?} */ ({})));
    };
    Oauth2Service.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Oauth2Service.ctorParameters = function () { return [
        { type: HttpClient },
        { type: PopupService },
        { type: ConfigService }
    ]; };
    return Oauth2Service;
}());
export { Oauth2Service };
if (false) {
    /**
     * @type {?}
     * @private
     */
    Oauth2Service.prototype.http;
    /**
     * @type {?}
     * @private
     */
    Oauth2Service.prototype.popup;
    /**
     * @type {?}
     * @private
     */
    Oauth2Service.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2F1dGgyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItdWktYXV0aC8iLCJzb3VyY2VzIjpbIm9hdXRoMi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxhQUFhLEVBQWtCLE1BQU0sa0JBQWtCLENBQUM7QUFDakUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFPM0M7SUFHSSx1QkFDWSxJQUFnQixFQUNoQixLQUFtQixFQUNuQixNQUFxQjtRQUZyQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLFVBQUssR0FBTCxLQUFLLENBQWM7UUFDbkIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtJQUNqQyxDQUFDOzs7Ozs7O0lBRUQsNEJBQUk7Ozs7OztJQUFKLFVBQXNDLFlBQTRCLEVBQUUsUUFBZ0I7UUFBcEYsaUJBbUJDOztZQWxCUyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsWUFBWSxDQUFDOztZQUMzRCxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUMscUJBQXFCLEVBQUUsZ0JBQWdCLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDL0YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FB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RUFBRSxDQUFDLENBQUM7aUJBQ3BCO2dCQUNELE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDcEIsQ0FBQyxDQUFDO1lBQ04sQ0FBQyxDQUFDLEVBQUUsRUFDVixNQUFNLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFOLENBQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFDLEdBQUcsRUFBRSxJQUFJOztZQUFLLE9BQUEsc0JBQU0sR0FBRyxlQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQUc7UUFBaEMsQ0FBZ0MsRUFBRSxtQkFBQSxFQUFFLEVBQTZCLENBQUMsQ0FBQztJQUNySCxDQUFDOztnQkF4RUosVUFBVTs7OztnQkFSRixVQUFVO2dCQURWLFlBQVk7Z0JBRFosYUFBYTs7SUFtRnRCLG9CQUFDO0NBQUEsQUF6RUQsSUF5RUM7U0F4RVksYUFBYTs7Ozs7O0lBR2xCLDZCQUF3Qjs7Ozs7SUFDeEIsOEJBQTJCOzs7OztJQUMzQiwrQkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJT2F1dGhTZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aC1zZXJ2aWNlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgam9pblVybCwgYnVpbGRRdWVyeVN0cmluZywgZ2V0V2luZG93T3JpZ2luIH0gZnJvbSAnLi91dGlscyc7XHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UsIElPYXV0aDJPcHRpb25zIH0gZnJvbSAnLi9jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IFBvcHVwU2VydmljZSB9IGZyb20gJy4vcG9wdXAuc2VydmljZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFJvbiBvbiAxNy8xMi8yMDE1LlxyXG4gKi9cclxuXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBPYXV0aDJTZXJ2aWNlIGltcGxlbWVudHMgSU9hdXRoU2VydmljZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgICAgIHByaXZhdGUgcG9wdXA6IFBvcHVwU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSkge1xyXG4gICAgfVxyXG5cclxuICAgIG9wZW48VCBleHRlbmRzIG9iamVjdCB8IHN0cmluZyA9IGFueT4ob2F1dGhPcHRpb25zOiBJT2F1dGgyT3B0aW9ucywgdXNlckRhdGE6IG9iamVjdCk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgICAgIGNvbnN0IGF1dGhvcml6YXRpb25EYXRhID0gdGhpcy5nZXRBdXRob3JpemF0aW9uRGF0YShvYXV0aE9wdGlvbnMpO1xyXG4gICAgICAgIGNvbnN0IHVybCA9IFtvYXV0aE9wdGlvbnMuYXV0aG9yaXphdGlvbkVuZHBvaW50LCBidWlsZFF1ZXJ5U3RyaW5nKGF1dGhvcml6YXRpb25EYXRhKV0uam9pbignPycpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBvcHVwLm9wZW4odXJsLCBvYXV0aE9wdGlvbnMsIHRoaXMuY29uZmlnLm9wdGlvbnMuY29yZG92YSkucGlwZShcclxuICAgICAgICAgICAgc3dpdGNoTWFwKChvYXV0aERhdGE6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gd2hlbiBubyBzZXJ2ZXIgVVJMIHByb3ZpZGVkLCByZXR1cm4gcG9wdXAgcGFyYW1zIGFzLWlzLlxyXG4gICAgICAgICAgICAgICAgLy8gdGhpcyBpcyBmb3IgYSBzY2VuYXJpbyB3aGVuIHNvbWVvbmUgd2lzaGVzIHRvIG9wdCBvdXQgZnJvbVxyXG4gICAgICAgICAgICAgICAgLy8gc2F0ZWxsaXplcidzIG1hZ2ljIGJ5IGRvaW5nIGF1dGhvcml6YXRpb24gY29kZSBleGNoYW5nZSBhbmRcclxuICAgICAgICAgICAgICAgIC8vIHNhdmluZyBhIHRva2VuIG1hbnVhbGx5LlxyXG4gICAgICAgICAgICAgICAgaWYgKG9hdXRoT3B0aW9ucy5yZXNwb25zZVR5cGUgPT09ICd0b2tlbicgfHwgIW9hdXRoT3B0aW9ucy51cmwpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2Yob2F1dGhEYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAob2F1dGhEYXRhLnN0YXRlICYmIG9hdXRoRGF0YS5zdGF0ZSAhPT0gYXV0aG9yaXphdGlvbkRhdGEuc3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ09BdXRoIFwic3RhdGVcIiBtaXNtYXRjaCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhjaGFuZ2VGb3JUb2tlbjxUPihvYXV0aE9wdGlvbnMsIGF1dGhvcml6YXRpb25EYXRhLCBvYXV0aERhdGEsIHVzZXJEYXRhKTtcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGV4Y2hhbmdlRm9yVG9rZW48VD4ob3B0aW9uczogSU9hdXRoMk9wdGlvbnMsIGF1dGhvcml6YXRpb25EYXRhOiBvYmplY3QsIG9hdXRoRGF0YTogb2JqZWN0LCB1c2VyRGF0YTogb2JqZWN0KSB7XHJcbiAgICAgICAgY29uc3QgYm9keSA9IHsgYXV0aG9yaXphdGlvbkRhdGEsIG9hdXRoRGF0YSwgdXNlckRhdGEgfTtcclxuICAgICAgICBjb25zdCB7IGJhc2VVcmwsIHdpdGhDcmVkZW50aWFscyB9ID0gdGhpcy5jb25maWcub3B0aW9ucztcclxuICAgICAgICBjb25zdCB7IHVybCwgbWV0aG9kID0gJ1BPU1QnIH0gPSBvcHRpb25zO1xyXG4gICAgICAgIGNvbnN0IGV4Y2hhbmdlRm9yVG9rZW5VcmwgPSBiYXNlVXJsID8gam9pblVybChiYXNlVXJsLCB1cmwpIDogdXJsO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdDxUPihtZXRob2QsIGV4Y2hhbmdlRm9yVG9rZW5VcmwsIHsgYm9keSwgd2l0aENyZWRlbnRpYWxzIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0QXV0aG9yaXphdGlvbkRhdGEob3B0aW9uczogSU9hdXRoMk9wdGlvbnMpIHtcclxuICAgICAgICBjb25zdCB7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlVHlwZSA9ICdjb2RlJyxcclxuICAgICAgICAgICAgY2xpZW50SWQsXHJcbiAgICAgICAgICAgIHJlZGlyZWN0VXJpID0gZ2V0V2luZG93T3JpZ2luKCkgfHwgJycsXHJcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyID0gJywnLFxyXG4gICAgICAgICAgICBzY29wZSxcclxuICAgICAgICAgICAgc3RhdGUsXHJcbiAgICAgICAgICAgIGFkZGl0aW9uYWxVcmxQYXJhbXMsXHJcbiAgICAgICAgfSA9IG9wdGlvbnM7XHJcbiAgICAgICAgY29uc3QgcmVzb2x2ZWRTdGF0ZSA9IHR5cGVvZiBzdGF0ZSA9PT0gJ2Z1bmN0aW9uJyA/IHN0YXRlKCkgOiBzdGF0ZTtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBbJ3Jlc3BvbnNlX3R5cGUnLCByZXNwb25zZVR5cGVdLFxyXG4gICAgICAgICAgICBbJ2NsaWVudF9pZCcsIGNsaWVudElkXSxcclxuICAgICAgICAgICAgWydyZWRpcmVjdF91cmknLCByZWRpcmVjdFVyaV0sXHJcbiAgICAgICAgICAgIC4uLnN0YXRlID8gW1snc3RhdGUnLCByZXNvbHZlZFN0YXRlXV0gOiBbXSxcclxuICAgICAgICAgICAgLi4uc2NvcGUgPyBbWydzY29wZScsIHNjb3BlLmpvaW4oc2NvcGVEZWxpbWl0ZXIpXV0gOiBbXSxcclxuICAgICAgICAgICAgLi4uYWRkaXRpb25hbFVybFBhcmFtc1xyXG4gICAgICAgICAgICAgICAgPyBPYmplY3RcclxuICAgICAgICAgICAgICAgICAgICAua2V5cyhhZGRpdGlvbmFsVXJsUGFyYW1zKVxyXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZTogc3RyaW5nIHwgKCgpID0+IHN0cmluZykgfCBudWxsIHwgdW5kZWZpbmVkID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChhZGRpdGlvbmFsVXJsUGFyYW1zIGFzIGFueSlba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBba2V5LCB2YWx1ZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW2tleSwgdmFsdWUoKV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBba2V5LCAnJ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsnJywgJyddO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICA6IFtdLFxyXG4gICAgICAgIF0uZmlsdGVyKChfKSA9PiAhIV9bMF0pLnJlZHVjZSgoYWNjLCBuZXh0KSA9PiAoeyAuLi5hY2MsIFtuZXh0WzBdXTogbmV4dFsxXSB9KSwge30gYXMgeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19