/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { PopupService } from './popup.service';
import { Injectable, Injector } from '@angular/core';
import { Oauth1Service } from './oauth1.service';
import { Oauth2Service } from './oauth2.service';
import { SharedService } from './shared.service';
import { joinUrl } from './utils';
import { ConfigService } from './config.service';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
/**
 * Created by Ron on 17/12/2015.
 */
var OauthService = /** @class */ (function () {
    function OauthService(http, shared, config, popup) {
        this.http = http;
        this.shared = shared;
        this.config = config;
        this.popup = popup;
        this.depProviders = [
            { provide: HttpClient, useValue: this.http },
            { provide: PopupService, useValue: this.popup },
            { provide: ConfigService, useValue: this.config },
        ];
        this.deps = [HttpClient, PopupService, ConfigService];
    }
    /**
     * @template T
     * @param {?} name
     * @param {?=} userData
     * @return {?}
     */
    OauthService.prototype.authenticate = /**
     * @template T
     * @param {?} name
     * @param {?=} userData
     * @return {?}
     */
    function (name, userData) {
        var _this = this;
        /** @type {?} */
        var provider = this.config.options.providers[name].oauthType === '1.0'
            ? Injector.create(tslib_1.__spread(this.depProviders, [
                { provide: Oauth1Service, deps: this.deps },
            ])).get(Oauth1Service)
            : Injector.create(tslib_1.__spread(this.depProviders, [
                { provide: Oauth2Service, deps: this.deps },
            ])).get(Oauth2Service);
        return provider.open(this.config.options.providers[name], userData || {})
            .pipe(tap(function (response) {
            // this is for a scenario when someone wishes to opt out from
            // satellizer's magic by doing authorization code exchange and
            // saving a token manually.
            if (_this.config.options.providers[name].url) {
                _this.shared.setToken(response);
            }
        }));
    };
    /**
     * @template T
     * @param {?} provider
     * @param {?=} url
     * @param {?=} method
     * @return {?}
     */
    OauthService.prototype.unlink = /**
     * @template T
     * @param {?} provider
     * @param {?=} url
     * @param {?=} method
     * @return {?}
     */
    function (provider, url, method) {
        if (url === void 0) { url = joinUrl(this.config.options.baseUrl, this.config.options.unlinkUrl); }
        if (method === void 0) { method = 'POST'; }
        return this.http.request(method, url, { body: { provider: provider } });
    };
    OauthService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    OauthService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: SharedService },
        { type: ConfigService },
        { type: PopupService }
    ]; };
    return OauthService;
}());
export { OauthService };
if (false) {
    /** @type {?} */
    OauthService.prototype.depProviders;
    /** @type {?} */
    OauthService.prototype.deps;
    /**
     * @type {?}
     * @private
     */
    OauthService.prototype.http;
    /**
     * @type {?}
     * @private
     */
    OauthService.prototype.shared;
    /**
     * @type {?}
     * @private
     */
    OauthService.prototype.config;
    /**
     * @type {?}
     * @private
     */
    OauthService.prototype.popup;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2F1dGguc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi11aS1hdXRoLyIsInNvdXJjZXMiOlsib2F1dGguc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVqRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7O0FBTWxEO0lBU0ksc0JBQ1ksSUFBZ0IsRUFDaEIsTUFBcUIsRUFDckIsTUFBcUIsRUFDckIsS0FBbUI7UUFIbkIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQ3JCLFdBQU0sR0FBTixNQUFNLENBQWU7UUFDckIsVUFBSyxHQUFMLEtBQUssQ0FBYztRQVh0QixpQkFBWSxHQUFHO1lBQ3BCLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRTtZQUM1QyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDL0MsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFO1NBQ3BELENBQUM7UUFDTyxTQUFJLEdBQUcsQ0FBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBTXZCLENBQUM7Ozs7Ozs7SUFFN0IsbUNBQVk7Ozs7OztJQUFuQixVQUErQyxJQUFZLEVBQUUsUUFBYztRQUEzRSxpQkFvQkM7O1lBbkJTLFFBQVEsR0FBa0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsS0FBSyxLQUFLO1lBQ25GLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxrQkFDVixJQUFJLENBQUMsWUFBWTtnQkFDcEIsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFO2VBQzdDLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQztZQUNyQixDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sa0JBQ1YsSUFBSSxDQUFDLFlBQVk7Z0JBQ3BCLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRTtlQUM3QyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUM7UUFFekIsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLElBQUksRUFBRSxDQUFDO2FBQ3ZFLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQyxRQUFRO1lBQ2YsNkRBQTZEO1lBQzdELDhEQUE4RDtZQUM5RCwyQkFBMkI7WUFDM0IsSUFBSSxLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFO2dCQUN6QyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNsQztRQUNMLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDWixDQUFDOzs7Ozs7OztJQUVNLDZCQUFNOzs7Ozs7O0lBQWIsVUFDSSxRQUFnQixFQUNoQixHQUF5RSxFQUN6RSxNQUFlO1FBRGYsb0JBQUEsRUFBQSxNQUFNLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBQ3pFLHVCQUFBLEVBQUEsZUFBZTtRQUNmLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUksTUFBTSxFQUFFLEdBQUcsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLFFBQVEsVUFBQSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7O2dCQTFDSixVQUFVOzs7O2dCQU5GLFVBQVU7Z0JBTFYsYUFBYTtnQkFFYixhQUFhO2dCQU5iLFlBQVk7O0lBMERyQixtQkFBQztDQUFBLEFBM0NELElBMkNDO1NBMUNZLFlBQVk7OztJQUNyQixvQ0FJRTs7SUFDRiw0QkFBMEQ7Ozs7O0lBR3RELDRCQUF3Qjs7Ozs7SUFDeEIsOEJBQTZCOzs7OztJQUM3Qiw4QkFBNkI7Ozs7O0lBQzdCLDZCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElPYXV0aFNlcnZpY2UgfSBmcm9tICcuL29hdXRoLXNlcnZpY2UuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgUG9wdXBTZXJ2aWNlIH0gZnJvbSAnLi9wb3B1cC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2F1dGgxU2VydmljZSB9IGZyb20gJy4vb2F1dGgxLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBPYXV0aDJTZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aDIuc2VydmljZSc7XHJcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgam9pblVybCB9IGZyb20gJy4vdXRpbHMnO1xyXG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgUm9uIG9uIDE3LzEyLzIwMTUuXHJcbiAqL1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgT2F1dGhTZXJ2aWNlIHtcclxuICAgIHJlYWRvbmx5IGRlcFByb3ZpZGVycyA9IFtcclxuICAgICAgICB7IHByb3ZpZGU6IEh0dHBDbGllbnQsIHVzZVZhbHVlOiB0aGlzLmh0dHAgfSxcclxuICAgICAgICB7IHByb3ZpZGU6IFBvcHVwU2VydmljZSwgdXNlVmFsdWU6IHRoaXMucG9wdXAgfSxcclxuICAgICAgICB7IHByb3ZpZGU6IENvbmZpZ1NlcnZpY2UsIHVzZVZhbHVlOiB0aGlzLmNvbmZpZyB9LFxyXG4gICAgXTtcclxuICAgIHJlYWRvbmx5IGRlcHMgPSBbSHR0cENsaWVudCwgUG9wdXBTZXJ2aWNlLCBDb25maWdTZXJ2aWNlXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgICAgICAgcHJpdmF0ZSBzaGFyZWQ6IFNoYXJlZFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBwb3B1cDogUG9wdXBTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgYXV0aGVudGljYXRlPFQgZXh0ZW5kcyBvYmplY3QgfCBzdHJpbmc+KG5hbWU6IHN0cmluZywgdXNlckRhdGE/OiBhbnkpOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgICAgICBjb25zdCBwcm92aWRlcjogSU9hdXRoU2VydmljZSA9IHRoaXMuY29uZmlnLm9wdGlvbnMucHJvdmlkZXJzW25hbWVdLm9hdXRoVHlwZSA9PT0gJzEuMCdcclxuICAgICAgICAgICAgPyBJbmplY3Rvci5jcmVhdGUoW1xyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5kZXBQcm92aWRlcnMsXHJcbiAgICAgICAgICAgICAgICB7IHByb3ZpZGU6IE9hdXRoMVNlcnZpY2UsIGRlcHM6IHRoaXMuZGVwcyB9LFxyXG4gICAgICAgICAgICBdKS5nZXQoT2F1dGgxU2VydmljZSlcclxuICAgICAgICAgICAgOiBJbmplY3Rvci5jcmVhdGUoW1xyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5kZXBQcm92aWRlcnMsXHJcbiAgICAgICAgICAgICAgICB7IHByb3ZpZGU6IE9hdXRoMlNlcnZpY2UsIGRlcHM6IHRoaXMuZGVwcyB9LFxyXG4gICAgICAgICAgICBdKS5nZXQoT2F1dGgyU2VydmljZSk7XHJcblxyXG4gICAgICAgIHJldHVybiBwcm92aWRlci5vcGVuPFQ+KHRoaXMuY29uZmlnLm9wdGlvbnMucHJvdmlkZXJzW25hbWVdLCB1c2VyRGF0YSB8fCB7fSlcclxuICAgICAgICAgICAgLnBpcGUodGFwKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcyBpcyBmb3IgYSBzY2VuYXJpbyB3aGVuIHNvbWVvbmUgd2lzaGVzIHRvIG9wdCBvdXQgZnJvbVxyXG4gICAgICAgICAgICAgICAgLy8gc2F0ZWxsaXplcidzIG1hZ2ljIGJ5IGRvaW5nIGF1dGhvcml6YXRpb24gY29kZSBleGNoYW5nZSBhbmRcclxuICAgICAgICAgICAgICAgIC8vIHNhdmluZyBhIHRva2VuIG1hbnVhbGx5LlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnLm9wdGlvbnMucHJvdmlkZXJzW25hbWVdLnVybCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hhcmVkLnNldFRva2VuKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1bmxpbms8VD4oXHJcbiAgICAgICAgcHJvdmlkZXI6IHN0cmluZyxcclxuICAgICAgICB1cmwgPSBqb2luVXJsKHRoaXMuY29uZmlnLm9wdGlvbnMuYmFzZVVybCwgdGhpcy5jb25maWcub3B0aW9ucy51bmxpbmtVcmwpLFxyXG4gICAgICAgIG1ldGhvZCA9ICdQT1NUJykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdDxUPihtZXRob2QsIHVybCwgeyBib2R5OiB7IHByb3ZpZGVyIH0gfSk7XHJcbiAgICB9XHJcbn1cclxuIl19