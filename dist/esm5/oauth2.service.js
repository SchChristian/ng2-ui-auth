/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
            if (oauthData.state && oauthData.state !== authorizationData["state"]) {
                throw new Error('OAuth "state" mismatch');
            }
            return _this.exchangeForToken(oauthOptions, authorizationData, oauthData, userData);
        }));
    };
    /**
     * @template T
     * @param {?} options
     * @param {?} authorizationData
     * @param {?} oauthData
     * @param {?} userData
     * @return {?}
     */
    Oauth2Service.prototype.exchangeForToken = /**
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
     * @param {?} options
     * @return {?}
     */
    Oauth2Service.prototype.getAuthorizationData = /**
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
                var value = (/** @type {?} */ (additionalUrlParams))[key];
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
        }, /** @type {?} */ ({}));
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
    /** @type {?} */
    Oauth2Service.prototype.http;
    /** @type {?} */
    Oauth2Service.prototype.popup;
    /** @type {?} */
    Oauth2Service.prototype.config;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2F1dGgyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItdWktYXV0aC8iLCJzb3VyY2VzIjpbIm9hdXRoMi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxhQUFhLEVBQWtCLE1BQU0sa0JBQWtCLENBQUM7QUFDakUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7O0lBVXZDLHVCQUNZLE1BQ0EsT0FDQTtRQUZBLFNBQUksR0FBSixJQUFJO1FBQ0osVUFBSyxHQUFMLEtBQUs7UUFDTCxXQUFNLEdBQU4sTUFBTTtLQUNqQjs7Ozs7OztJQUVELDRCQUFJOzs7Ozs7SUFBSixVQUFzQyxZQUE0QixFQUFFLFFBQWdCO1FBQXBGLGlCQW1CQzs7UUFsQkcsSUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsWUFBWSxDQUFDLENBQUM7O1FBQ2xFLElBQU0sR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLHFCQUFxQixFQUFFLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEcsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FDdkUsU0FBUyxDQUFD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QUFDLEVBQUUsRUFDVixNQUFNLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFOLENBQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFDLEdBQUcsRUFBRSxJQUFJOztZQUFLLE9BQUEsc0JBQU0sR0FBRyxlQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQUc7UUFBaEMsQ0FBZ0Msb0JBQUUsRUFBK0IsRUFBQyxDQUFDOzs7Z0JBdkV4SCxVQUFVOzs7O2dCQVJGLFVBQVU7Z0JBRFYsWUFBWTtnQkFEWixhQUFhOzt3QkFKdEI7O1NBZWEsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElPYXV0aFNlcnZpY2UgfSBmcm9tICcuL29hdXRoLXNlcnZpY2UuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBqb2luVXJsLCBidWlsZFF1ZXJ5U3RyaW5nLCBnZXRXaW5kb3dPcmlnaW4gfSBmcm9tICcuL3V0aWxzJztcclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSwgSU9hdXRoMk9wdGlvbnMgfSBmcm9tICcuL2NvbmZpZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUG9wdXBTZXJ2aWNlIH0gZnJvbSAnLi9wb3B1cC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgUm9uIG9uIDE3LzEyLzIwMTUuXHJcbiAqL1xyXG5cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE9hdXRoMlNlcnZpY2UgaW1wbGVtZW50cyBJT2F1dGhTZXJ2aWNlIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgICAgICAgcHJpdmF0ZSBwb3B1cDogUG9wdXBTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgY29uZmlnOiBDb25maWdTZXJ2aWNlKSB7XHJcbiAgICB9XHJcblxyXG4gICAgb3BlbjxUIGV4dGVuZHMgb2JqZWN0IHwgc3RyaW5nID0gYW55PihvYXV0aE9wdGlvbnM6IElPYXV0aDJPcHRpb25zLCB1c2VyRGF0YTogb2JqZWN0KTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICAgICAgY29uc3QgYXV0aG9yaXphdGlvbkRhdGEgPSB0aGlzLmdldEF1dGhvcml6YXRpb25EYXRhKG9hdXRoT3B0aW9ucyk7XHJcbiAgICAgICAgY29uc3QgdXJsID0gW29hdXRoT3B0aW9ucy5hdXRob3JpemF0aW9uRW5kcG9pbnQsIGJ1aWxkUXVlcnlTdHJpbmcoYXV0aG9yaXphdGlvbkRhdGEpXS5qb2luKCc/Jyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucG9wdXAub3Blbih1cmwsIG9hdXRoT3B0aW9ucywgdGhpcy5jb25maWcub3B0aW9ucy5jb3Jkb3ZhKS5waXBlKFxyXG4gICAgICAgICAgICBzd2l0Y2hNYXAoKG9hdXRoRGF0YTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyB3aGVuIG5vIHNlcnZlciBVUkwgcHJvdmlkZWQsIHJldHVybiBwb3B1cCBwYXJhbXMgYXMtaXMuXHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIGZvciBhIHNjZW5hcmlvIHdoZW4gc29tZW9uZSB3aXNoZXMgdG8gb3B0IG91dCBmcm9tXHJcbiAgICAgICAgICAgICAgICAvLyBzYXRlbGxpemVyJ3MgbWFnaWMgYnkgZG9pbmcgYXV0aG9yaXphdGlvbiBjb2RlIGV4Y2hhbmdlIGFuZFxyXG4gICAgICAgICAgICAgICAgLy8gc2F2aW5nIGEgdG9rZW4gbWFudWFsbHkuXHJcbiAgICAgICAgICAgICAgICBpZiAob2F1dGhPcHRpb25zLnJlc3BvbnNlVHlwZSA9PT0gJ3Rva2VuJyB8fCAhb2F1dGhPcHRpb25zLnVybCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvZihvYXV0aERhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChvYXV0aERhdGEuc3RhdGUgJiYgb2F1dGhEYXRhLnN0YXRlICE9PSBhdXRob3JpemF0aW9uRGF0YS5zdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignT0F1dGggXCJzdGF0ZVwiIG1pc21hdGNoJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5leGNoYW5nZUZvclRva2VuPFQ+KG9hdXRoT3B0aW9ucywgYXV0aG9yaXphdGlvbkRhdGEsIG9hdXRoRGF0YSwgdXNlckRhdGEpO1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZXhjaGFuZ2VGb3JUb2tlbjxUPihvcHRpb25zOiBJT2F1dGgyT3B0aW9ucywgYXV0aG9yaXphdGlvbkRhdGE6IG9iamVjdCwgb2F1dGhEYXRhOiBvYmplY3QsIHVzZXJEYXRhOiBvYmplY3QpIHtcclxuICAgICAgICBjb25zdCBib2R5ID0geyBhdXRob3JpemF0aW9uRGF0YSwgb2F1dGhEYXRhLCB1c2VyRGF0YSB9O1xyXG4gICAgICAgIGNvbnN0IHsgYmFzZVVybCwgd2l0aENyZWRlbnRpYWxzIH0gPSB0aGlzLmNvbmZpZy5vcHRpb25zO1xyXG4gICAgICAgIGNvbnN0IHsgdXJsLCBtZXRob2QgPSAnUE9TVCcgfSA9IG9wdGlvbnM7XHJcbiAgICAgICAgY29uc3QgZXhjaGFuZ2VGb3JUb2tlblVybCA9IGJhc2VVcmwgPyBqb2luVXJsKGJhc2VVcmwsIHVybCkgOiB1cmw7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5yZXF1ZXN0PFQ+KG1ldGhvZCwgZXhjaGFuZ2VGb3JUb2tlblVybCwgeyBib2R5LCB3aXRoQ3JlZGVudGlhbHMgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRBdXRob3JpemF0aW9uRGF0YShvcHRpb25zOiBJT2F1dGgyT3B0aW9ucykge1xyXG4gICAgICAgIGNvbnN0IHtcclxuICAgICAgICAgICAgcmVzcG9uc2VUeXBlID0gJ2NvZGUnLFxyXG4gICAgICAgICAgICBjbGllbnRJZCxcclxuICAgICAgICAgICAgcmVkaXJlY3RVcmkgPSBnZXRXaW5kb3dPcmlnaW4oKSB8fCAnJyxcclxuICAgICAgICAgICAgc2NvcGVEZWxpbWl0ZXIgPSAnLCcsXHJcbiAgICAgICAgICAgIHNjb3BlLFxyXG4gICAgICAgICAgICBzdGF0ZSxcclxuICAgICAgICAgICAgYWRkaXRpb25hbFVybFBhcmFtcyxcclxuICAgICAgICB9ID0gb3B0aW9ucztcclxuICAgICAgICBjb25zdCByZXNvbHZlZFN0YXRlID0gdHlwZW9mIHN0YXRlID09PSAnZnVuY3Rpb24nID8gc3RhdGUoKSA6IHN0YXRlO1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIFsncmVzcG9uc2VfdHlwZScsIHJlc3BvbnNlVHlwZV0sXHJcbiAgICAgICAgICAgIFsnY2xpZW50X2lkJywgY2xpZW50SWRdLFxyXG4gICAgICAgICAgICBbJ3JlZGlyZWN0X3VyaScsIHJlZGlyZWN0VXJpXSxcclxuICAgICAgICAgICAgLi4uc3RhdGUgPyBbWydzdGF0ZScsIHJlc29sdmVkU3RhdGVdXSA6IFtdLFxyXG4gICAgICAgICAgICAuLi5zY29wZSA/IFtbJ3Njb3BlJywgc2NvcGUuam9pbihzY29wZURlbGltaXRlcildXSA6IFtdLFxyXG4gICAgICAgICAgICAuLi5hZGRpdGlvbmFsVXJsUGFyYW1zXHJcbiAgICAgICAgICAgICAgICA/IE9iamVjdFxyXG4gICAgICAgICAgICAgICAgICAgIC5rZXlzKGFkZGl0aW9uYWxVcmxQYXJhbXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLm1hcCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlOiBzdHJpbmcgfCAoKCkgPT4gc3RyaW5nKSB8IG51bGwgfCB1bmRlZmluZWQgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGFkZGl0aW9uYWxVcmxQYXJhbXMgYXMgYW55KVtrZXldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtrZXksIHZhbHVlXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBba2V5LCB2YWx1ZSgpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtrZXksICcnXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWycnLCAnJ107XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIDogW10sXHJcbiAgICAgICAgXS5maWx0ZXIoKF8pID0+ICEhX1swXSkucmVkdWNlKChhY2MsIG5leHQpID0+ICh7IC4uLmFjYywgW25leHRbMF1dOiBuZXh0WzFdIH0pLCB7fSBhcyB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=