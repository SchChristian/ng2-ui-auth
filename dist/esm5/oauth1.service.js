/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { PopupService } from './popup.service';
import { joinUrl, buildQueryString } from './utils';
import { ConfigService } from './config.service';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
/**
 * Created by Ron on 17/12/2015.
 */
var Oauth1Service = /** @class */ (function () {
    function Oauth1Service(http, popup, config) {
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
    Oauth1Service.prototype.open = /**
     * @template T
     * @param {?} oauthOptions
     * @param {?} userData
     * @return {?}
     */
    function (oauthOptions, userData) {
        var _this = this;
        /** @type {?} */
        var serverUrl = this.config.options.baseUrl
            ? joinUrl(this.config.options.baseUrl, oauthOptions.url)
            : oauthOptions.url;
        return this.http.post(serverUrl, oauthOptions).pipe(switchMap(function (authorizationData) { return _this.popup.open([oauthOptions.authorizationEndpoint, buildQueryString(authorizationData)].join('?'), oauthOptions, _this.config.options.cordova); }, function (authorizationData, oauthData) { return ({ authorizationData: authorizationData, oauthData: oauthData }); }), switchMap(function (_a) {
            var authorizationData = _a.authorizationData, oauthData = _a.oauthData;
            return _this.exchangeForToken(oauthOptions, authorizationData, oauthData, userData);
        }));
    };
    /**
     * @template T
     * @param {?} oauthOptions
     * @param {?} authorizationData
     * @param {?} oauthData
     * @param {?} userData
     * @return {?}
     */
    Oauth1Service.prototype.exchangeForToken = /**
     * @template T
     * @param {?} oauthOptions
     * @param {?} authorizationData
     * @param {?} oauthData
     * @param {?} userData
     * @return {?}
     */
    function (oauthOptions, authorizationData, oauthData, userData) {
        /** @type {?} */
        var body = { authorizationData: authorizationData, oauthData: oauthData, userData: userData };
        var _a = this.config.options, withCredentials = _a.withCredentials, baseUrl = _a.baseUrl;
        var _b = oauthOptions.method, method = _b === void 0 ? 'POST' : _b, url = oauthOptions.url;
        /** @type {?} */
        var exchangeForTokenUrl = baseUrl ? joinUrl(baseUrl, url) : url;
        return this.http.request(method, exchangeForTokenUrl, { body: body, withCredentials: withCredentials });
    };
    Oauth1Service.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Oauth1Service.ctorParameters = function () { return [
        { type: HttpClient },
        { type: PopupService },
        { type: ConfigService }
    ]; };
    return Oauth1Service;
}());
export { Oauth1Service };
if (false) {
    /** @type {?} */
    Oauth1Service.prototype.http;
    /** @type {?} */
    Oauth1Service.prototype.popup;
    /** @type {?} */
    Oauth1Service.prototype.config;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2F1dGgxLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItdWktYXV0aC8iLCJzb3VyY2VzIjpbIm9hdXRoMS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ3BELE9BQU8sRUFBRSxhQUFhLEVBQWtCLE1BQU0sa0JBQWtCLENBQUM7QUFFakUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7SUFROUMsdUJBQ1ksTUFDQSxPQUNBO1FBRkEsU0FBSSxHQUFKLElBQUk7UUFDSixVQUFLLEdBQUwsS0FBSztRQUNMLFdBQU0sR0FBTixNQUFNO0tBQ2I7Ozs7Ozs7SUFFTCw0QkFBSTs7Ozs7O0lBQUosVUFBc0MsWUFBNEIsRUFBRSxRQUFnQjtRQUFwRixpQkFhQzs7UUFaRyxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPO1lBQ3pDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxHQUFHLENBQUM7WUFDeEQsQ0FBQyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUM7UUFFdkIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBUyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUN2RCxTQUFTLENBQUMsVUFBQyxpQkFBaUIsSUFBSyxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUM1QyxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsRUFBRSxnQkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUNuRixZQUFZLEVBQ1osS0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUM5QixFQUpnQyxDQUloQyxFQUFFLFVBQUMsaUJBQWlCLEVBQUUsU0FBUyxJQUFLLE9BQUEsQ0FBQyxFQUFFLGlCQUFpQixtQkFBQSxFQUFFLFNBQVMsV0FBQSxFQUFFLENBQUMsRUFBbEMsQ0FBa0MsQ0FBQyxFQUN4RSxTQUFTLENBQUMsVUFBQyxFQUFnQztnQkFBOUIsd0NBQWlCLEVBQUUsd0JBQVM7WUFBTyxPQUFBLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBSSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQztRQUE5RSxDQUE4RSxDQUFDLENBQ2xJLENBQUM7S0FDTDs7Ozs7Ozs7O0lBRU8sd0NBQWdCOzs7Ozs7OztjQUFJLFlBQTRCLEVBQUUsaUJBQXlCLEVBQUUsU0FBaUIsRUFBRSxRQUFnQjs7UUFDcEgsSUFBTSxJQUFJLEdBQUcsRUFBRSxpQkFBaUIsbUJBQUEsRUFBRSxTQUFTLFdBQUEsRUFBRSxRQUFRLFVBQUEsRUFBRSxDQUFDO1FBQ3hELDhCQUFRLG9DQUFlLEVBQUUsb0JBQU8sQ0FBeUI7UUFDakQsSUFBQSx3QkFBZSxFQUFmLG9DQUFlLEVBQUUsc0JBQUcsQ0FBa0I7O1FBQzlDLElBQU0sbUJBQW1CLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDbEUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBSSxNQUFNLEVBQUUsbUJBQW1CLEVBQUUsRUFBRSxJQUFJLE1BQUEsRUFBRSxlQUFlLGlCQUFBLEVBQUUsQ0FBQyxDQUFBOzs7Z0JBN0IxRixVQUFVOzs7O2dCQUxGLFVBQVU7Z0JBTFYsWUFBWTtnQkFFWixhQUFhOzt3QkFKdEI7O1NBYWEsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElPYXV0aFNlcnZpY2UgfSBmcm9tICcuL29hdXRoLXNlcnZpY2UuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBQb3B1cFNlcnZpY2UgfSBmcm9tICcuL3BvcHVwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBqb2luVXJsLCBidWlsZFF1ZXJ5U3RyaW5nIH0gZnJvbSAnLi91dGlscyc7XHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UsIElPYXV0aDFPcHRpb25zIH0gZnJvbSAnLi9jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgUm9uIG9uIDE3LzEyLzIwMTUuXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBPYXV0aDFTZXJ2aWNlIGltcGxlbWVudHMgSU9hdXRoU2VydmljZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgICAgIHByaXZhdGUgcG9wdXA6IFBvcHVwU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSxcclxuICAgICkgeyB9XHJcblxyXG4gICAgb3BlbjxUIGV4dGVuZHMgb2JqZWN0IHwgc3RyaW5nID0gYW55PihvYXV0aE9wdGlvbnM6IElPYXV0aDFPcHRpb25zLCB1c2VyRGF0YTogb2JqZWN0KTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICAgICAgY29uc3Qgc2VydmVyVXJsID0gdGhpcy5jb25maWcub3B0aW9ucy5iYXNlVXJsXHJcbiAgICAgICAgICAgID8gam9pblVybCh0aGlzLmNvbmZpZy5vcHRpb25zLmJhc2VVcmwsIG9hdXRoT3B0aW9ucy51cmwpXHJcbiAgICAgICAgICAgIDogb2F1dGhPcHRpb25zLnVybDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PG9iamVjdD4oc2VydmVyVXJsLCBvYXV0aE9wdGlvbnMpLnBpcGUoXHJcbiAgICAgICAgICAgIHN3aXRjaE1hcCgoYXV0aG9yaXphdGlvbkRhdGEpID0+IHRoaXMucG9wdXAub3BlbihcclxuICAgICAgICAgICAgICAgIFtvYXV0aE9wdGlvbnMuYXV0aG9yaXphdGlvbkVuZHBvaW50LCBidWlsZFF1ZXJ5U3RyaW5nKGF1dGhvcml6YXRpb25EYXRhKV0uam9pbignPycpLFxyXG4gICAgICAgICAgICAgICAgb2F1dGhPcHRpb25zLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcub3B0aW9ucy5jb3Jkb3ZhLFxyXG4gICAgICAgICAgICApLCAoYXV0aG9yaXphdGlvbkRhdGEsIG9hdXRoRGF0YSkgPT4gKHsgYXV0aG9yaXphdGlvbkRhdGEsIG9hdXRoRGF0YSB9KSksXHJcbiAgICAgICAgICAgIHN3aXRjaE1hcCgoeyBhdXRob3JpemF0aW9uRGF0YSwgb2F1dGhEYXRhIH0pID0+IHRoaXMuZXhjaGFuZ2VGb3JUb2tlbjxUPihvYXV0aE9wdGlvbnMsIGF1dGhvcml6YXRpb25EYXRhLCBvYXV0aERhdGEsIHVzZXJEYXRhKSksXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGV4Y2hhbmdlRm9yVG9rZW48VD4ob2F1dGhPcHRpb25zOiBJT2F1dGgxT3B0aW9ucywgYXV0aG9yaXphdGlvbkRhdGE6IG9iamVjdCwgb2F1dGhEYXRhOiBvYmplY3QsIHVzZXJEYXRhOiBvYmplY3QpIHtcclxuICAgICAgICBjb25zdCBib2R5ID0geyBhdXRob3JpemF0aW9uRGF0YSwgb2F1dGhEYXRhLCB1c2VyRGF0YSB9O1xyXG4gICAgICAgIGNvbnN0IHsgd2l0aENyZWRlbnRpYWxzLCBiYXNlVXJsIH0gPSB0aGlzLmNvbmZpZy5vcHRpb25zO1xyXG4gICAgICAgIGNvbnN0IHsgbWV0aG9kID0gJ1BPU1QnLCB1cmwgfSA9IG9hdXRoT3B0aW9ucztcclxuICAgICAgICBjb25zdCBleGNoYW5nZUZvclRva2VuVXJsID0gYmFzZVVybCA/IGpvaW5VcmwoYmFzZVVybCwgdXJsKSA6IHVybDtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnJlcXVlc3Q8VD4obWV0aG9kLCBleGNoYW5nZUZvclRva2VuVXJsLCB7IGJvZHksIHdpdGhDcmVkZW50aWFscyB9KVxyXG4gICAgfVxyXG59XHJcbiJdfQ==