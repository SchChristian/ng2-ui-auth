/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
export class Oauth2Service {
    /**
     * @param {?} http
     * @param {?} popup
     * @param {?} config
     */
    constructor(http, popup, config) {
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
    open(oauthOptions, userData) {
        /** @type {?} */
        const authorizationData = this.getAuthorizationData(oauthOptions);
        /** @type {?} */
        const url = [oauthOptions.authorizationEndpoint, buildQueryString(authorizationData)].join('?');
        return this.popup.open(url, oauthOptions, this.config.options.cordova).pipe(switchMap((oauthData) => {
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
            return this.exchangeForToken(oauthOptions, authorizationData, oauthData, userData);
        }));
    }
    /**
     * @template T
     * @param {?} options
     * @param {?} authorizationData
     * @param {?} oauthData
     * @param {?} userData
     * @return {?}
     */
    exchangeForToken(options, authorizationData, oauthData, userData) {
        /** @type {?} */
        const body = { authorizationData, oauthData, userData };
        const { baseUrl, withCredentials } = this.config.options;
        const { url, method = 'POST' } = options;
        /** @type {?} */
        const exchangeForTokenUrl = baseUrl ? joinUrl(baseUrl, url) : url;
        return this.http.request(method, exchangeForTokenUrl, { body, withCredentials });
    }
    /**
     * @param {?} options
     * @return {?}
     */
    getAuthorizationData(options) {
        const { responseType = 'code', clientId, redirectUri = getWindowOrigin() || '', scopeDelimiter = ',', scope, state, additionalUrlParams, } = options;
        /** @type {?} */
        const resolvedState = typeof state === 'function' ? state() : state;
        return [
            ['response_type', responseType],
            ['client_id', clientId],
            ['redirect_uri', redirectUri],
            ...state ? [['state', resolvedState]] : [],
            ...scope ? [['scope', scope.join(scopeDelimiter)]] : [],
            ...additionalUrlParams
                ? Object
                    .keys(additionalUrlParams)
                    .map((key) => {
                    /** @type {?} */
                    const value = (/** @type {?} */ (additionalUrlParams))[key];
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
                : [],
        ].filter((_) => !!_[0]).reduce((acc, next) => (Object.assign({}, acc, { [next[0]]: next[1] })), /** @type {?} */ ({}));
    }
}
Oauth2Service.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Oauth2Service.ctorParameters = () => [
    { type: HttpClient },
    { type: PopupService },
    { type: ConfigService }
];
if (false) {
    /** @type {?} */
    Oauth2Service.prototype.http;
    /** @type {?} */
    Oauth2Service.prototype.popup;
    /** @type {?} */
    Oauth2Service.prototype.config;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2F1dGgyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItdWktYXV0aC8iLCJzb3VyY2VzIjpbIm9hdXRoMi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDckUsT0FBTyxFQUFFLGFBQWEsRUFBa0IsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQVEzQyxNQUFNOzs7Ozs7SUFFRixZQUNZLE1BQ0EsT0FDQTtRQUZBLFNBQUksR0FBSixJQUFJO1FBQ0osVUFBSyxHQUFMLEtBQUs7UUFDTCxXQUFNLEdBQU4sTUFBTTtLQUNqQjs7Ozs7OztJQUVELElBQUksQ0FBa0MsWUFBNEIsRUFBRSxRQUFnQjs7UUFDaEYsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsWUFBWSxDQUFDLENBQUM7O1FBQ2xFLE1BQU0sR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLHFCQUFxQixFQUFFLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEcsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FDdkUsU0FBUyxDQUFDLENBQUMsU0FBYyxF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LE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7aUJBQ25CLENBQUM7Z0JBQ04sQ0FBQyxDQUFDLEVBQUU7U0FDWCxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLG1CQUFNLEdBQUcsSUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBRyxvQkFBRSxFQUErQixFQUFDLENBQUM7Ozs7WUF2RXhILFVBQVU7Ozs7WUFSRixVQUFVO1lBRFYsWUFBWTtZQURaLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJT2F1dGhTZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aC1zZXJ2aWNlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgam9pblVybCwgYnVpbGRRdWVyeVN0cmluZywgZ2V0V2luZG93T3JpZ2luIH0gZnJvbSAnLi91dGlscyc7XHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UsIElPYXV0aDJPcHRpb25zIH0gZnJvbSAnLi9jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IFBvcHVwU2VydmljZSB9IGZyb20gJy4vcG9wdXAuc2VydmljZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFJvbiBvbiAxNy8xMi8yMDE1LlxyXG4gKi9cclxuXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBPYXV0aDJTZXJ2aWNlIGltcGxlbWVudHMgSU9hdXRoU2VydmljZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgICAgIHByaXZhdGUgcG9wdXA6IFBvcHVwU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSkge1xyXG4gICAgfVxyXG5cclxuICAgIG9wZW48VCBleHRlbmRzIG9iamVjdCB8IHN0cmluZyA9IGFueT4ob2F1dGhPcHRpb25zOiBJT2F1dGgyT3B0aW9ucywgdXNlckRhdGE6IG9iamVjdCk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgICAgIGNvbnN0IGF1dGhvcml6YXRpb25EYXRhID0gdGhpcy5nZXRBdXRob3JpemF0aW9uRGF0YShvYXV0aE9wdGlvbnMpO1xyXG4gICAgICAgIGNvbnN0IHVybCA9IFtvYXV0aE9wdGlvbnMuYXV0aG9yaXphdGlvbkVuZHBvaW50LCBidWlsZFF1ZXJ5U3RyaW5nKGF1dGhvcml6YXRpb25EYXRhKV0uam9pbignPycpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBvcHVwLm9wZW4odXJsLCBvYXV0aE9wdGlvbnMsIHRoaXMuY29uZmlnLm9wdGlvbnMuY29yZG92YSkucGlwZShcclxuICAgICAgICAgICAgc3dpdGNoTWFwKChvYXV0aERhdGE6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gd2hlbiBubyBzZXJ2ZXIgVVJMIHByb3ZpZGVkLCByZXR1cm4gcG9wdXAgcGFyYW1zIGFzLWlzLlxyXG4gICAgICAgICAgICAgICAgLy8gdGhpcyBpcyBmb3IgYSBzY2VuYXJpbyB3aGVuIHNvbWVvbmUgd2lzaGVzIHRvIG9wdCBvdXQgZnJvbVxyXG4gICAgICAgICAgICAgICAgLy8gc2F0ZWxsaXplcidzIG1hZ2ljIGJ5IGRvaW5nIGF1dGhvcml6YXRpb24gY29kZSBleGNoYW5nZSBhbmRcclxuICAgICAgICAgICAgICAgIC8vIHNhdmluZyBhIHRva2VuIG1hbnVhbGx5LlxyXG4gICAgICAgICAgICAgICAgaWYgKG9hdXRoT3B0aW9ucy5yZXNwb25zZVR5cGUgPT09ICd0b2tlbicgfHwgIW9hdXRoT3B0aW9ucy51cmwpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2Yob2F1dGhEYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAob2F1dGhEYXRhLnN0YXRlICYmIG9hdXRoRGF0YS5zdGF0ZSAhPT0gYXV0aG9yaXphdGlvbkRhdGEuc3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ09BdXRoIFwic3RhdGVcIiBtaXNtYXRjaCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhjaGFuZ2VGb3JUb2tlbjxUPihvYXV0aE9wdGlvbnMsIGF1dGhvcml6YXRpb25EYXRhLCBvYXV0aERhdGEsIHVzZXJEYXRhKTtcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGV4Y2hhbmdlRm9yVG9rZW48VD4ob3B0aW9uczogSU9hdXRoMk9wdGlvbnMsIGF1dGhvcml6YXRpb25EYXRhOiBvYmplY3QsIG9hdXRoRGF0YTogb2JqZWN0LCB1c2VyRGF0YTogb2JqZWN0KSB7XHJcbiAgICAgICAgY29uc3QgYm9keSA9IHsgYXV0aG9yaXphdGlvbkRhdGEsIG9hdXRoRGF0YSwgdXNlckRhdGEgfTtcclxuICAgICAgICBjb25zdCB7IGJhc2VVcmwsIHdpdGhDcmVkZW50aWFscyB9ID0gdGhpcy5jb25maWcub3B0aW9ucztcclxuICAgICAgICBjb25zdCB7IHVybCwgbWV0aG9kID0gJ1BPU1QnIH0gPSBvcHRpb25zO1xyXG4gICAgICAgIGNvbnN0IGV4Y2hhbmdlRm9yVG9rZW5VcmwgPSBiYXNlVXJsID8gam9pblVybChiYXNlVXJsLCB1cmwpIDogdXJsO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdDxUPihtZXRob2QsIGV4Y2hhbmdlRm9yVG9rZW5VcmwsIHsgYm9keSwgd2l0aENyZWRlbnRpYWxzIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0QXV0aG9yaXphdGlvbkRhdGEob3B0aW9uczogSU9hdXRoMk9wdGlvbnMpIHtcclxuICAgICAgICBjb25zdCB7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlVHlwZSA9ICdjb2RlJyxcclxuICAgICAgICAgICAgY2xpZW50SWQsXHJcbiAgICAgICAgICAgIHJlZGlyZWN0VXJpID0gZ2V0V2luZG93T3JpZ2luKCkgfHwgJycsXHJcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyID0gJywnLFxyXG4gICAgICAgICAgICBzY29wZSxcclxuICAgICAgICAgICAgc3RhdGUsXHJcbiAgICAgICAgICAgIGFkZGl0aW9uYWxVcmxQYXJhbXMsXHJcbiAgICAgICAgfSA9IG9wdGlvbnM7XHJcbiAgICAgICAgY29uc3QgcmVzb2x2ZWRTdGF0ZSA9IHR5cGVvZiBzdGF0ZSA9PT0gJ2Z1bmN0aW9uJyA/IHN0YXRlKCkgOiBzdGF0ZTtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBbJ3Jlc3BvbnNlX3R5cGUnLCByZXNwb25zZVR5cGVdLFxyXG4gICAgICAgICAgICBbJ2NsaWVudF9pZCcsIGNsaWVudElkXSxcclxuICAgICAgICAgICAgWydyZWRpcmVjdF91cmknLCByZWRpcmVjdFVyaV0sXHJcbiAgICAgICAgICAgIC4uLnN0YXRlID8gW1snc3RhdGUnLCByZXNvbHZlZFN0YXRlXV0gOiBbXSxcclxuICAgICAgICAgICAgLi4uc2NvcGUgPyBbWydzY29wZScsIHNjb3BlLmpvaW4oc2NvcGVEZWxpbWl0ZXIpXV0gOiBbXSxcclxuICAgICAgICAgICAgLi4uYWRkaXRpb25hbFVybFBhcmFtc1xyXG4gICAgICAgICAgICAgICAgPyBPYmplY3RcclxuICAgICAgICAgICAgICAgICAgICAua2V5cyhhZGRpdGlvbmFsVXJsUGFyYW1zKVxyXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZTogc3RyaW5nIHwgKCgpID0+IHN0cmluZykgfCBudWxsIHwgdW5kZWZpbmVkID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChhZGRpdGlvbmFsVXJsUGFyYW1zIGFzIGFueSlba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBba2V5LCB2YWx1ZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW2tleSwgdmFsdWUoKV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBba2V5LCAnJ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsnJywgJyddO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICA6IFtdLFxyXG4gICAgICAgIF0uZmlsdGVyKChfKSA9PiAhIV9bMF0pLnJlZHVjZSgoYWNjLCBuZXh0KSA9PiAoeyAuLi5hY2MsIFtuZXh0WzBdXTogbmV4dFsxXSB9KSwge30gYXMgeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19