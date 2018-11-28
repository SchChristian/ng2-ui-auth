/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
export class Oauth1Service {
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
        const serverUrl = this.config.options.baseUrl
            ? joinUrl(this.config.options.baseUrl, oauthOptions.url)
            : oauthOptions.url;
        return this.http.post(serverUrl, oauthOptions).pipe(switchMap((authorizationData) => this.popup.open([oauthOptions.authorizationEndpoint, buildQueryString(authorizationData)].join('?'), oauthOptions, this.config.options.cordova), (authorizationData, oauthData) => ({ authorizationData, oauthData })), switchMap(({ authorizationData, oauthData }) => this.exchangeForToken(oauthOptions, authorizationData, oauthData, userData)));
    }
    /**
     * @private
     * @template T
     * @param {?} oauthOptions
     * @param {?} authorizationData
     * @param {?} oauthData
     * @param {?} userData
     * @return {?}
     */
    exchangeForToken(oauthOptions, authorizationData, oauthData, userData) {
        /** @type {?} */
        const body = { authorizationData, oauthData, userData };
        const { withCredentials, baseUrl } = this.config.options;
        const { method = 'POST', url } = oauthOptions;
        /** @type {?} */
        const exchangeForTokenUrl = baseUrl ? joinUrl(baseUrl, url) : url;
        return this.http.request(method, exchangeForTokenUrl, { body, withCredentials });
    }
}
Oauth1Service.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Oauth1Service.ctorParameters = () => [
    { type: HttpClient },
    { type: PopupService },
    { type: ConfigService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    Oauth1Service.prototype.http;
    /**
     * @type {?}
     * @private
     */
    Oauth1Service.prototype.popup;
    /**
     * @type {?}
     * @private
     */
    Oauth1Service.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2F1dGgxLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItdWktYXV0aC8iLCJzb3VyY2VzIjpbIm9hdXRoMS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ3BELE9BQU8sRUFBRSxhQUFhLEVBQWtCLE1BQU0sa0JBQWtCLENBQUM7QUFFakUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7OztBQU1sRCxNQUFNLE9BQU8sYUFBYTs7Ozs7O0lBRXRCLFlBQ1ksSUFBZ0IsRUFDaEIsS0FBbUIsRUFDbkIsTUFBcUI7UUFGckIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixVQUFLLEdBQUwsS0FBSyxDQUFjO1FBQ25CLFdBQU0sR0FBTixNQUFNLENBQWU7SUFDN0IsQ0FBQzs7Ozs7OztJQUVMLElBQUksQ0FBa0MsWUFBNEIsRUFBRSxRQUFnQjs7Y0FDMUUsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU87WUFDekMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLEdBQUcsQ0FBQztZQUN4RCxDQUFDLENBQUMsWUFBWSxDQUFDLEdBQUc7UUFFdEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBUyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUN2RCxTQUFTLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQzVDLENBQUMsWUFBWSxDQUFDLHFCQUFxQixFQUFFLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQ25GLFlBQVksRUFDWixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQzlCLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQ3hFLFNBQVMsQ0FBQyxDQUFDLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBSSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQ2xJLENBQUM7SUFDTixDQUFDOzs7Ozs7Ozs7O0lBRU8sZ0JBQWdCLENBQUksWUFBNEIsRUFBRSxpQkFBeUIsRUFBRSxTQUFpQixFQUFFLFFBQWdCOztjQUM5RyxJQUFJLEdBQUcsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFO2NBQ2pELEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTztjQUNsRCxFQUFFLE1BQU0sR0FBRyxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsWUFBWTs7Y0FDdkMsbUJBQW1CLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHO1FBQ2pFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUksTUFBTSxFQUFFLG1CQUFtQixFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUE7SUFDdkYsQ0FBQzs7O1lBOUJKLFVBQVU7Ozs7WUFMRixVQUFVO1lBTFYsWUFBWTtZQUVaLGFBQWE7Ozs7Ozs7SUFZZCw2QkFBd0I7Ozs7O0lBQ3hCLDhCQUEyQjs7Ozs7SUFDM0IsK0JBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSU9hdXRoU2VydmljZSB9IGZyb20gJy4vb2F1dGgtc2VydmljZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFBvcHVwU2VydmljZSB9IGZyb20gJy4vcG9wdXAuc2VydmljZSc7XHJcbmltcG9ydCB7IGpvaW5VcmwsIGJ1aWxkUXVlcnlTdHJpbmcgfSBmcm9tICcuL3V0aWxzJztcclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSwgSU9hdXRoMU9wdGlvbnMgfSBmcm9tICcuL2NvbmZpZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcblxyXG4vKipcclxuICogQ3JlYXRlZCBieSBSb24gb24gMTcvMTIvMjAxNS5cclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE9hdXRoMVNlcnZpY2UgaW1wbGVtZW50cyBJT2F1dGhTZXJ2aWNlIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgICAgICAgcHJpdmF0ZSBwb3B1cDogUG9wdXBTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgY29uZmlnOiBDb25maWdTZXJ2aWNlLFxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBvcGVuPFQgZXh0ZW5kcyBvYmplY3QgfCBzdHJpbmcgPSBhbnk+KG9hdXRoT3B0aW9uczogSU9hdXRoMU9wdGlvbnMsIHVzZXJEYXRhOiBvYmplY3QpOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgICAgICBjb25zdCBzZXJ2ZXJVcmwgPSB0aGlzLmNvbmZpZy5vcHRpb25zLmJhc2VVcmxcclxuICAgICAgICAgICAgPyBqb2luVXJsKHRoaXMuY29uZmlnLm9wdGlvbnMuYmFzZVVybCwgb2F1dGhPcHRpb25zLnVybClcclxuICAgICAgICAgICAgOiBvYXV0aE9wdGlvbnMudXJsO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8b2JqZWN0PihzZXJ2ZXJVcmwsIG9hdXRoT3B0aW9ucykucGlwZShcclxuICAgICAgICAgICAgc3dpdGNoTWFwKChhdXRob3JpemF0aW9uRGF0YSkgPT4gdGhpcy5wb3B1cC5vcGVuKFxyXG4gICAgICAgICAgICAgICAgW29hdXRoT3B0aW9ucy5hdXRob3JpemF0aW9uRW5kcG9pbnQsIGJ1aWxkUXVlcnlTdHJpbmcoYXV0aG9yaXphdGlvbkRhdGEpXS5qb2luKCc/JyksXHJcbiAgICAgICAgICAgICAgICBvYXV0aE9wdGlvbnMsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5vcHRpb25zLmNvcmRvdmEsXHJcbiAgICAgICAgICAgICksIChhdXRob3JpemF0aW9uRGF0YSwgb2F1dGhEYXRhKSA9PiAoeyBhdXRob3JpemF0aW9uRGF0YSwgb2F1dGhEYXRhIH0pKSxcclxuICAgICAgICAgICAgc3dpdGNoTWFwKCh7IGF1dGhvcml6YXRpb25EYXRhLCBvYXV0aERhdGEgfSkgPT4gdGhpcy5leGNoYW5nZUZvclRva2VuPFQ+KG9hdXRoT3B0aW9ucywgYXV0aG9yaXphdGlvbkRhdGEsIG9hdXRoRGF0YSwgdXNlckRhdGEpKSxcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZXhjaGFuZ2VGb3JUb2tlbjxUPihvYXV0aE9wdGlvbnM6IElPYXV0aDFPcHRpb25zLCBhdXRob3JpemF0aW9uRGF0YTogb2JqZWN0LCBvYXV0aERhdGE6IG9iamVjdCwgdXNlckRhdGE6IG9iamVjdCkge1xyXG4gICAgICAgIGNvbnN0IGJvZHkgPSB7IGF1dGhvcml6YXRpb25EYXRhLCBvYXV0aERhdGEsIHVzZXJEYXRhIH07XHJcbiAgICAgICAgY29uc3QgeyB3aXRoQ3JlZGVudGlhbHMsIGJhc2VVcmwgfSA9IHRoaXMuY29uZmlnLm9wdGlvbnM7XHJcbiAgICAgICAgY29uc3QgeyBtZXRob2QgPSAnUE9TVCcsIHVybCB9ID0gb2F1dGhPcHRpb25zO1xyXG4gICAgICAgIGNvbnN0IGV4Y2hhbmdlRm9yVG9rZW5VcmwgPSBiYXNlVXJsID8gam9pblVybChiYXNlVXJsLCB1cmwpIDogdXJsO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdDxUPihtZXRob2QsIGV4Y2hhbmdlRm9yVG9rZW5VcmwsIHsgYm9keSwgd2l0aENyZWRlbnRpYWxzIH0pXHJcbiAgICB9XHJcbn1cclxuIl19