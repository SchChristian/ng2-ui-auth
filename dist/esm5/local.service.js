/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { ConfigService } from './config.service';
import { joinUrl } from './utils';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
/**
 * Created by Ron on 17/12/2015.
 */
var LocalService = /** @class */ (function () {
    function LocalService(http, shared, config) {
        this.http = http;
        this.shared = shared;
        this.config = config;
    }
    /**
     * @template T
     * @param {?} user
     * @param {?=} url
     * @return {?}
     */
    LocalService.prototype.login = /**
     * @template T
     * @param {?} user
     * @param {?=} url
     * @return {?}
     */
    function (user, url) {
        var _this = this;
        return this.http.post(url || joinUrl(this.config.options.baseUrl, this.config.options.loginUrl), user)
            .pipe(tap(function (data) { return _this.shared.setToken(data); }));
    };
    /**
     * @template T
     * @param {?} user
     * @param {?=} url
     * @return {?}
     */
    LocalService.prototype.signup = /**
     * @template T
     * @param {?} user
     * @param {?=} url
     * @return {?}
     */
    function (user, url) {
        return this.http.post(url || joinUrl(this.config.options.baseUrl, this.config.options.signupUrl), user);
    };
    LocalService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    LocalService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: SharedService },
        { type: ConfigService }
    ]; };
    return LocalService;
}());
export { LocalService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    LocalService.prototype.http;
    /**
     * @type {?}
     * @private
     */
    LocalService.prototype.shared;
    /**
     * @type {?}
     * @private
     */
    LocalService.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi11aS1hdXRoLyIsInNvdXJjZXMiOlsibG9jYWwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFFbEMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7OztBQU1sRDtJQUVJLHNCQUNZLElBQWdCLEVBQ2hCLE1BQXFCLEVBQ3JCLE1BQXFCO1FBRnJCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUNyQixXQUFNLEdBQU4sTUFBTSxDQUFlO0lBQUksQ0FBQzs7Ozs7OztJQUUvQiw0QkFBSzs7Ozs7O0lBQVosVUFBd0MsSUFBcUIsRUFBRSxHQUFZO1FBQTNFLGlCQUdDO1FBRkcsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBSSxHQUFHLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLENBQUM7YUFDcEcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUExQixDQUEwQixDQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDOzs7Ozs7O0lBRU0sNkJBQU07Ozs7OztJQUFiLFVBQXVCLElBQXFCLEVBQUUsR0FBWTtRQUN0RCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFJLEdBQUcsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9HLENBQUM7O2dCQWRKLFVBQVU7Ozs7Z0JBTkYsVUFBVTtnQkFMVixhQUFhO2dCQUNiLGFBQWE7O0lBeUJ0QixtQkFBQztDQUFBLEFBZkQsSUFlQztTQWRZLFlBQVk7Ozs7OztJQUVqQiw0QkFBd0I7Ozs7O0lBQ3hCLDhCQUE2Qjs7Ozs7SUFDN0IsOEJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTaGFyZWRTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQuc2VydmljZSc7XHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2NvbmZpZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgam9pblVybCB9IGZyb20gJy4vdXRpbHMnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFJvbiBvbiAxNy8xMi8yMDE1LlxyXG4gKi9cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIExvY2FsU2VydmljZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgICAgICAgcHJpdmF0ZSBzaGFyZWQ6IFNoYXJlZFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UpIHsgfVxyXG5cclxuICAgIHB1YmxpYyBsb2dpbjxUIGV4dGVuZHMgc3RyaW5nIHwgb2JqZWN0Pih1c2VyOiBzdHJpbmcgfCBvYmplY3QsIHVybD86IHN0cmluZyk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxUPih1cmwgfHwgam9pblVybCh0aGlzLmNvbmZpZy5vcHRpb25zLmJhc2VVcmwsIHRoaXMuY29uZmlnLm9wdGlvbnMubG9naW5VcmwpLCB1c2VyKVxyXG4gICAgICAgICAgICAucGlwZSh0YXAoKGRhdGEpID0+IHRoaXMuc2hhcmVkLnNldFRva2VuKGRhdGEpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNpZ251cDxUID0gYW55Pih1c2VyOiBzdHJpbmcgfCBvYmplY3QsIHVybD86IHN0cmluZyk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxUPih1cmwgfHwgam9pblVybCh0aGlzLmNvbmZpZy5vcHRpb25zLmJhc2VVcmwsIHRoaXMuY29uZmlnLm9wdGlvbnMuc2lnbnVwVXJsKSwgdXNlcik7XHJcbiAgICB9XHJcbn1cclxuIl19