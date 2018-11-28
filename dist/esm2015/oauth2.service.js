/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            if (oauthData.state && oauthData.state !== authorizationData.state) {
                throw new Error('OAuth "state" mismatch');
            }
            return this.exchangeForToken(oauthOptions, authorizationData, oauthData, userData);
        }));
    }
    /**
     * @private
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
     * @private
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
                    const value = ((/** @type {?} */ (additionalUrlParams)))[key];
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
        ].filter((_) => !!_[0]).reduce((acc, next) => (Object.assign({}, acc, { [next[0]]: next[1] })), (/** @type {?} */ ({})));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2F1dGgyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItdWktYXV0aC8iLCJzb3VyY2VzIjpbIm9hdXRoMi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDckUsT0FBTyxFQUFFLGFBQWEsRUFBa0IsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQVEzQyxNQUFNLE9BQU8sYUFBYTs7Ozs7O0lBRXRCLFlBQ1ksSUFBZ0IsRUFDaEIsS0FBbUIsRUFDbkIsTUFBcUI7UUFGckIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixVQUFLLEdBQUwsS0FBSyxDQUFjO1FBQ25CLFdBQU0sR0FBTixNQUFNLENBQWU7SUFDakMsQ0FBQzs7Ozs7OztJQUVELElBQUksQ0FBa0MsWUFBNEIsRUFBRSxRQUFnQjs7Y0FDMUUsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFlBQVksQ0FBQzs7Y0FDM0QsR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLHFCQUFxQixFQUFFLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQy9GLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQ3ZFLFNBQVMsQ0FBQyxDQUFDLFNBQWMsRUFBRSxFQUFFO1lBQ3pCLDBEQUEwRDtZQUMxRCw2REFBNkQ7WUFDN0QsOERBQThEO1lBQzlELDJCQUEyQjtZQUMzQixJQUFJLFlBQVksQ0FBQyxZQUFZLEtBQUssT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRTtnQkFDNUQsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDeEI7WUFFRCxJQUFJLFNBQVMsQ0FBQyxLQUFLLElBQUksU0FBUyxDQUFDLEtBQUssS0FBSyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUU7Z0JBQ2hFLE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQzthQUM3QztZQUNELE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFJLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDMUYsQ0FBQyxDQUFDLENBQ0wsQ0FBQztJQUNOLENBQUM7Ozs7Ozs7Ozs7SUFFTyxnQkFBZ0IsQ0FBSSxPQUF1QixFQUFFLGlCQUF5QixFQUFFLFNBQWlCLEVBQUUsUUFBZ0I7O2NBQ3pHLElBQUksR0FBRyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUU7Y0FDakQsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPO2NBQ2xELEVBQUUsR0FBRyxFQUFFLE1BQU0sR0FBRyxNQUFNLEVBQUUsR0FBRyxPQUFPOztjQUNsQyxtQkFBbUIsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUc7UUFDakUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBSSxNQUFNLEVBQUUsbUJBQW1CLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQztJQUN4RixDQUFDOzs7Ozs7SUFFTyxvQkFBb0IsQ0FBQyxPQUF1QjtjQUMxQyxFQUNGLFlBQVksR0FBRyxNQUFNLEVBQ3JCLFFBQVEsRUFDUixXQUFXLEdBQUcsZUFBZSxFQUFFLElBQUksRUFBRSxFQUNyQyxjQUFjLEdBQUcsR0FBRyxFQUNwQixLQUFLLEVBQ0wsS0FBSyxFQUNMLG1CQUFtQixHQUN0QixHQUFHLE9BQU87O2NBQ0wsYUFBYSxHQUFHLE9BQU8sS0FBSyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUs7UUFDbkUsT0FBTztZQUNILENBQUMsZUFBZSxFQUFFLFlBQVksQ0FBQztZQUMvQixDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUM7WUFDdkIsQ0FBQyxjQUFjLEVBQUUsV0FBVyxDQUFDO1lBQzdCLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDMUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDdkQsR0FBRyxtQkFBbUI7Z0JBQ2xCLENBQUMsQ0FBQyxNQUFNO3FCQUNILElBQUksQ0FBQyxtQkFBbUIsQ0FBQztxQkFDekIsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7OzBCQUNILEtBQUssR0FDUCxDQUFDLG1CQUFBLG1CQUFtQixFQUFPLENBQUMsQ0FBQyxHQUFHLENBQUM7b0JBQ3JDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO3dCQUMzQixPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO3FCQUN2Qjt5QkFBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLFVBQVUsRUFBRTt3QkFDcEMsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO3FCQUN6Qjt5QkFBTSxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7d0JBQ3ZCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7cUJBQ3BCO29CQUNELE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ3BCLENBQUMsQ0FBQztnQkFDTixDQUFDLENBQUMsRUFBRTtTQUNYLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsbUJBQU0sR0FBRyxJQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFHLEVBQUUsbUJBQUEsRUFBRSxFQUE2QixDQUFDLENBQUM7SUFDckgsQ0FBQzs7O1lBeEVKLFVBQVU7Ozs7WUFSRixVQUFVO1lBRFYsWUFBWTtZQURaLGFBQWE7Ozs7Ozs7SUFjZCw2QkFBd0I7Ozs7O0lBQ3hCLDhCQUEyQjs7Ozs7SUFDM0IsK0JBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSU9hdXRoU2VydmljZSB9IGZyb20gJy4vb2F1dGgtc2VydmljZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGpvaW5VcmwsIGJ1aWxkUXVlcnlTdHJpbmcsIGdldFdpbmRvd09yaWdpbiB9IGZyb20gJy4vdXRpbHMnO1xyXG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlLCBJT2F1dGgyT3B0aW9ucyB9IGZyb20gJy4vY29uZmlnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBQb3B1cFNlcnZpY2UgfSBmcm9tICcuL3BvcHVwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG4vKipcclxuICogQ3JlYXRlZCBieSBSb24gb24gMTcvMTIvMjAxNS5cclxuICovXHJcblxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgT2F1dGgyU2VydmljZSBpbXBsZW1lbnRzIElPYXV0aFNlcnZpY2Uge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgICAgICBwcml2YXRlIHBvcHVwOiBQb3B1cFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UpIHtcclxuICAgIH1cclxuXHJcbiAgICBvcGVuPFQgZXh0ZW5kcyBvYmplY3QgfCBzdHJpbmcgPSBhbnk+KG9hdXRoT3B0aW9uczogSU9hdXRoMk9wdGlvbnMsIHVzZXJEYXRhOiBvYmplY3QpOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgICAgICBjb25zdCBhdXRob3JpemF0aW9uRGF0YSA9IHRoaXMuZ2V0QXV0aG9yaXphdGlvbkRhdGEob2F1dGhPcHRpb25zKTtcclxuICAgICAgICBjb25zdCB1cmwgPSBbb2F1dGhPcHRpb25zLmF1dGhvcml6YXRpb25FbmRwb2ludCwgYnVpbGRRdWVyeVN0cmluZyhhdXRob3JpemF0aW9uRGF0YSldLmpvaW4oJz8nKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5wb3B1cC5vcGVuKHVybCwgb2F1dGhPcHRpb25zLCB0aGlzLmNvbmZpZy5vcHRpb25zLmNvcmRvdmEpLnBpcGUoXHJcbiAgICAgICAgICAgIHN3aXRjaE1hcCgob2F1dGhEYXRhOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIHdoZW4gbm8gc2VydmVyIFVSTCBwcm92aWRlZCwgcmV0dXJuIHBvcHVwIHBhcmFtcyBhcy1pcy5cclxuICAgICAgICAgICAgICAgIC8vIHRoaXMgaXMgZm9yIGEgc2NlbmFyaW8gd2hlbiBzb21lb25lIHdpc2hlcyB0byBvcHQgb3V0IGZyb21cclxuICAgICAgICAgICAgICAgIC8vIHNhdGVsbGl6ZXIncyBtYWdpYyBieSBkb2luZyBhdXRob3JpemF0aW9uIGNvZGUgZXhjaGFuZ2UgYW5kXHJcbiAgICAgICAgICAgICAgICAvLyBzYXZpbmcgYSB0b2tlbiBtYW51YWxseS5cclxuICAgICAgICAgICAgICAgIGlmIChvYXV0aE9wdGlvbnMucmVzcG9uc2VUeXBlID09PSAndG9rZW4nIHx8ICFvYXV0aE9wdGlvbnMudXJsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKG9hdXRoRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG9hdXRoRGF0YS5zdGF0ZSAmJiBvYXV0aERhdGEuc3RhdGUgIT09IGF1dGhvcml6YXRpb25EYXRhLnN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdPQXV0aCBcInN0YXRlXCIgbWlzbWF0Y2gnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmV4Y2hhbmdlRm9yVG9rZW48VD4ob2F1dGhPcHRpb25zLCBhdXRob3JpemF0aW9uRGF0YSwgb2F1dGhEYXRhLCB1c2VyRGF0YSk7XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBleGNoYW5nZUZvclRva2VuPFQ+KG9wdGlvbnM6IElPYXV0aDJPcHRpb25zLCBhdXRob3JpemF0aW9uRGF0YTogb2JqZWN0LCBvYXV0aERhdGE6IG9iamVjdCwgdXNlckRhdGE6IG9iamVjdCkge1xyXG4gICAgICAgIGNvbnN0IGJvZHkgPSB7IGF1dGhvcml6YXRpb25EYXRhLCBvYXV0aERhdGEsIHVzZXJEYXRhIH07XHJcbiAgICAgICAgY29uc3QgeyBiYXNlVXJsLCB3aXRoQ3JlZGVudGlhbHMgfSA9IHRoaXMuY29uZmlnLm9wdGlvbnM7XHJcbiAgICAgICAgY29uc3QgeyB1cmwsIG1ldGhvZCA9ICdQT1NUJyB9ID0gb3B0aW9ucztcclxuICAgICAgICBjb25zdCBleGNoYW5nZUZvclRva2VuVXJsID0gYmFzZVVybCA/IGpvaW5VcmwoYmFzZVVybCwgdXJsKSA6IHVybDtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnJlcXVlc3Q8VD4obWV0aG9kLCBleGNoYW5nZUZvclRva2VuVXJsLCB7IGJvZHksIHdpdGhDcmVkZW50aWFscyB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEF1dGhvcml6YXRpb25EYXRhKG9wdGlvbnM6IElPYXV0aDJPcHRpb25zKSB7XHJcbiAgICAgICAgY29uc3Qge1xyXG4gICAgICAgICAgICByZXNwb25zZVR5cGUgPSAnY29kZScsXHJcbiAgICAgICAgICAgIGNsaWVudElkLFxyXG4gICAgICAgICAgICByZWRpcmVjdFVyaSA9IGdldFdpbmRvd09yaWdpbigpIHx8ICcnLFxyXG4gICAgICAgICAgICBzY29wZURlbGltaXRlciA9ICcsJyxcclxuICAgICAgICAgICAgc2NvcGUsXHJcbiAgICAgICAgICAgIHN0YXRlLFxyXG4gICAgICAgICAgICBhZGRpdGlvbmFsVXJsUGFyYW1zLFxyXG4gICAgICAgIH0gPSBvcHRpb25zO1xyXG4gICAgICAgIGNvbnN0IHJlc29sdmVkU3RhdGUgPSB0eXBlb2Ygc3RhdGUgPT09ICdmdW5jdGlvbicgPyBzdGF0ZSgpIDogc3RhdGU7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgWydyZXNwb25zZV90eXBlJywgcmVzcG9uc2VUeXBlXSxcclxuICAgICAgICAgICAgWydjbGllbnRfaWQnLCBjbGllbnRJZF0sXHJcbiAgICAgICAgICAgIFsncmVkaXJlY3RfdXJpJywgcmVkaXJlY3RVcmldLFxyXG4gICAgICAgICAgICAuLi5zdGF0ZSA/IFtbJ3N0YXRlJywgcmVzb2x2ZWRTdGF0ZV1dIDogW10sXHJcbiAgICAgICAgICAgIC4uLnNjb3BlID8gW1snc2NvcGUnLCBzY29wZS5qb2luKHNjb3BlRGVsaW1pdGVyKV1dIDogW10sXHJcbiAgICAgICAgICAgIC4uLmFkZGl0aW9uYWxVcmxQYXJhbXNcclxuICAgICAgICAgICAgICAgID8gT2JqZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgLmtleXMoYWRkaXRpb25hbFVybFBhcmFtcylcclxuICAgICAgICAgICAgICAgICAgICAubWFwKChrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWU6IHN0cmluZyB8ICgoKSA9PiBzdHJpbmcpIHwgbnVsbCB8IHVuZGVmaW5lZCA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoYWRkaXRpb25hbFVybFBhcmFtcyBhcyBhbnkpW2tleV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW2tleSwgdmFsdWVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtrZXksIHZhbHVlKCldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW2tleSwgJyddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbJycsICcnXTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgOiBbXSxcclxuICAgICAgICBdLmZpbHRlcigoXykgPT4gISFfWzBdKS5yZWR1Y2UoKGFjYywgbmV4dCkgPT4gKHsgLi4uYWNjLCBbbmV4dFswXV06IG5leHRbMV0gfSksIHt9IGFzIHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==