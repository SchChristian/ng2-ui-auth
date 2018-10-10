/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { getWindowOrigin, getFullUrlPath } from './utils';
import { Injectable } from '@angular/core';
import { EMPTY, fromEvent, interval, merge, Observable, of, throwError } from 'rxjs';
import { switchMap, take, map, delay } from 'rxjs/operators';
/**
 * Created by Ron on 17/12/2015.
 */
var PopupService = /** @class */ (function () {
    function PopupService() {
    }
    /**
     * @param {?} url
     * @param {?} options
     * @param {?} cordova
     * @return {?}
     */
    PopupService.prototype.open = /**
     * @param {?} url
     * @param {?} options
     * @param {?} cordova
     * @return {?}
     */
    function (url, options, cordova) {
        /** @type {?} */
        var stringifiedOptions = this.stringifyOptions(this.prepareOptions(options.popupOptions));
        /** @type {?} */
        var UA = window.navigator.userAgent;
        cordova = cordova === null ? this.isCordovaApp() : cordova;
        /** @type {?} */
        var windowName = cordova ? '_blank' : options.name;
        /** @type {?} */
        var popupWindow = window.open(url, windowName, stringifiedOptions);
        if (popupWindow && popupWindow.focus) {
            popupWindow.focus();
        }
        return cordova
            ? this.eventListener(popupWindow, options.redirectUri || getWindowOrigin())
            : this.pollPopup(popupWindow, options.redirectUri || getWindowOrigin());
    };
    /**
     * @param {?} popupWindow
     * @param {?} redirectUri
     * @return {?}
     */
    PopupService.prototype.eventListener = /**
     * @param {?} popupWindow
     * @param {?} redirectUri
     * @return {?}
     */
    function (popupWindow, redirectUri) {
        var _this = this;
        if (!popupWindow) {
            throw new Error('Popup was not created');
        }
        return merge(fromEvent(popupWindow, 'exit').pipe(delay(100), map(function () { throw new Error('Authentication Canceled'); })), fromEvent(popupWindow, 'loadstart')).pipe(switchMap(function (event) {
            if (!popupWindow || popupWindow.closed) {
                return Observable.throw(new Error('Authentication Canceled'));
            }
            if (event.url.indexOf(redirectUri) !== 0) {
                return EMPTY;
            }
            /** @type {?} */
            var parser = document.createElement('a');
            parser.href = event.url;
            if (parser.search || parser.hash) {
                /** @type {?} */
                var queryParams = parser.search.substring(1).replace(/\/$/, '');
                /** @type {?} */
                var hashParams = parser.hash.substring(1).replace(/\/$/, '');
                /** @type {?} */
                var hash = _this.parseQueryString(hashParams);
                /** @type {?} */
                var qs = _this.parseQueryString(queryParams);
                /** @type {?} */
                var allParams = tslib_1.__assign({}, qs, hash);
                popupWindow.close();
                if (allParams.error) {
                    throw allParams.error;
                }
                else {
                    return of(allParams);
                }
            }
            return EMPTY;
        }), take(1));
    };
    /**
     * @param {?} popupWindow
     * @param {?} redirectUri
     * @return {?}
     */
    PopupService.prototype.pollPopup = /**
     * @param {?} popupWindow
     * @param {?} redirectUri
     * @return {?}
     */
    function (popupWindow, redirectUri) {
        var _this = this;
        return interval(50)
            .pipe(switchMap(function () {
            if (!popupWindow || popupWindow.closed) {
                return throwError(new Error('Authentication Canceled'));
            }
            /** @type {?} */
            var popupWindowPath = '';
            try {
                popupWindowPath = getFullUrlPath(popupWindow.location);
            }
            catch (error) {
                // ignore DOMException: Blocked a frame with origin from accessing a cross-origin frame.
                // error instanceof DOMException && error.name === 'SecurityError'
            }
            if (redirectUri === popupWindowPath) {
                if (popupWindow.location.search || popupWindow.location.hash) {
                    /** @type {?} */
                    var queryParams = popupWindow.location.search.substring(1).replace(/\/$/, '');
                    /** @type {?} */
                    var hashParams = popupWindow.location.hash.substring(1).replace(/[\/$]/, '');
                    /** @type {?} */
                    var hash = _this.parseQueryString(hashParams);
                    /** @type {?} */
                    var qs = _this.parseQueryString(queryParams);
                    popupWindow.close();
                    /** @type {?} */
                    var allParams = tslib_1.__assign({}, qs, hash);
                    if (allParams.error) {
                        throw allParams.error;
                    }
                    else {
                        return of(allParams);
                    }
                }
                else {
                    return throwError(new Error('No token found after redirect'));
                }
            }
            return EMPTY;
        }), take(1));
    };
    /**
     * @param {?=} options
     * @return {?}
     */
    PopupService.prototype.prepareOptions = /**
     * @param {?=} options
     * @return {?}
     */
    function (options) {
        options = options || {};
        /** @type {?} */
        var width = options.width || 500;
        /** @type {?} */
        var height = options.height || 500;
        return tslib_1.__assign({ width: width,
            height: height, left: window.screenX + ((window.outerWidth - width) / 2), top: window.screenY + ((window.outerHeight - height) / 2.5), toolbar: options.visibleToolbar ? 'yes' : 'no' }, options);
    };
    /**
     * @param {?} options
     * @return {?}
     */
    PopupService.prototype.stringifyOptions = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        return Object.keys(options)
            .map(function (key) { return options[key] === null || options[key] === undefined
            ? key
            : key + '=' + options[key]; }).join(',');
    };
    /**
     * @param {?} joinedKeyValue
     * @return {?}
     */
    PopupService.prototype.parseQueryString = /**
     * @param {?} joinedKeyValue
     * @return {?}
     */
    function (joinedKeyValue) {
        /** @type {?} */
        var key;
        /** @type {?} */
        var value;
        return joinedKeyValue.split('&').reduce(function (obj, keyValue) {
            if (keyValue) {
                value = keyValue.split('=');
                key = decodeURIComponent(value[0]);
                obj[key] = typeof value[1] !== 'undefined' ? decodeURIComponent(value[1]) : true;
            }
            return obj;
        }, /** @type {?} */ ({}));
    };
    /**
     * @return {?}
     */
    PopupService.prototype.isCordovaApp = /**
     * @return {?}
     */
    function () {
        return !!(window && ((/** @type {?} */ (window)).cordova ||
            window.navigator && window.navigator.userAgent && window.navigator.userAgent.indexOf('CriOS') > -1));
    };
    PopupService.decorators = [
        { type: Injectable }
    ];
    return PopupService;
}());
export { PopupService };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi11aS1hdXRoLyIsInNvdXJjZXMiOlsicG9wdXAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQzFELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUVyRixPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7Ozs7Ozs7SUFRbEQsMkJBQUk7Ozs7OztjQUFDLEdBQVcsRUFBRSxPQUF3QyxFQUFFLE9BQXVCOztRQUN0RixJQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDOztRQUM1RixJQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztRQUN0QyxPQUFPLEdBQUcsT0FBTyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7O1FBQzNELElBQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDOztRQUVyRCxJQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUVyRSxJQUFJLFdBQVcsSUFBSSxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQ2xDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN2QjtRQUVELE9BQU8sT0FBTztZQUNWLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsV0FBVyxJQUFJLGVBQWUsRUFBRSxDQUFDO1lBQzNFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsV0FBVyxJQUFJLGVBQWUsRUFBRSxDQUFDLENBQUM7Ozs7Ozs7SUFHekUsb0NBQWE7Ozs7O2NBQUMsV0FBbUIsRUFBRSxXQUFtQjs7UUFDekQsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNkLE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQztTQUM1QztRQUNELE9BQU8sS0FBSyxDQUNSLFNBQVMsQ0FBUSxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUN0QyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQ1YsR0FBRyxDQUFDLGNBQVEsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUM3RCxFQUNELFNBQVMsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQ3RDLENBQUMsSUFBSSxDQUNGLFNBQVMsQ0FBQyxVQUFDLEtBQThCO1lBQ3JDLElBQUksQ0FBQyxXQUFXLElBQUksV0FBVyxDQUFDLE1BQU0sRUFBRTtnQkFDcEMsT0FBTyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQzthQUNqRTtZQUNELElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUN0QyxPQUFPLEtBQUssQ0FBQzthQUNoQjs7WUFFRCxJQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztZQUV4QixJQUFJLE1BQU0sQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksRUFBRTs7Z0JBQzlCLElBQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7O2dCQUNsRSxJQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDOztnQkFDL0QsSUFBTSxJQUFJLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDOztnQkFDL0MsSUFBTSxFQUFFLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDOztnQkFDOUMsSUFBTSxTQUFTLHdCQUFRLEVBQUUsRUFBSyxJQUFJLEVBQUc7Z0JBRXJDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFFcEIsSUFBSSxTQUFTLENBQUMsS0FBSyxFQUFFO29CQUNqQixNQUFNLFNBQVMsQ0FBQyxLQUFLLENBQUM7aUJBQ3pCO3FCQUFNO29CQUNILE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUN4QjthQUNKO1lBQ0QsT0FBTyxLQUFLLENBQUM7U0FDaEIsQ0FBQyxFQUNGLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDVixDQUFDOzs7Ozs7O0lBR04sZ0NBQVM7Ozs7O0lBQVQsVUFBVSxXQUFtQixFQUFFLFdBQW1CO1FBQWxELGlCQW9DQztRQW5DRyxPQUFPLFFBQVEsQ0FBQyxFQUFFLENBQUM7YUFDZCxJQUFJLENBQ0wsU0FBUyxDQUFDO1lBQ04sSUFBSSxDQUFDLFdBQVcsSUFBSSxXQUFXLENBQUMsTUFBTSxFQUFFO2dCQUNwQyxPQUFPLFVBQVUsQ0FBQyxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUM7YUFDM0Q7O1lBRUQsSUFBSSxlQUFlLEdBQUcsRUFBRSxDQUFDO1lBQ3pCLElBQUk7Z0JBQ0EsZUFBZSxHQUFJLGNBQWMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDM0Q7WUFBQyxPQUFPLEtBQUssRUFBRTs7O2FBR2Y7WUFDRCxJQUFJLFdBQVcsS0FBSyxlQUFlLEVBQUU7Z0JBQ2pDLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7O29CQUMxRCxJQUFNLFdBQVcsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQzs7b0JBQ2hGLElBQU0sVUFBVSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDOztvQkFDL0UsSUFBTSxJQUFJLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDOztvQkFDL0MsSUFBTSxFQUFFLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUM5QyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7O29CQUNwQixJQUFNLFNBQVMsd0JBQVEsRUFBRSxFQUFLLElBQUksRUFBRztvQkFDckMsSUFBSSxTQUFTLENBQUMsS0FBSyxFQUFFO3dCQUNqQixNQUFNLFNBQVMsQ0FBQyxLQUFLLENBQUM7cUJBQ3pCO3lCQUFNO3dCQUNILE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3FCQUN4QjtpQkFDSjtxQkFBTTtvQkFDSCxPQUFPLFVBQVUsQ0FBQyxJQUFJLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLENBQUM7aUJBQ2pFO2FBQ0o7WUFDRCxPQUFPLEtBQUssQ0FBQztTQUNoQixDQUFDLEVBQ0YsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUNWLENBQUM7S0FDTDs7Ozs7SUFFTyxxQ0FBYzs7OztjQUFDLE9BQXVCO1FBQzFDLE9BQU8sR0FBRyxPQUFPLElBQUksRUFBRSxDQUFDOztRQUN4QixJQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxJQUFJLEdBQUcsQ0FBQzs7UUFDbkMsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUM7UUFDckMsMEJBQ0ksS0FBSyxPQUFBO1lBQ0wsTUFBTSxRQUFBLEVBQ04sSUFBSSxFQUFFLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQ3hELEdBQUcsRUFBRSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUMzRCxPQUFPLEVBQUUsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQzNDLE9BQU8sRUFDWjs7Ozs7O0lBR0UsdUNBQWdCOzs7O2NBQUMsT0FBMEU7UUFDL0YsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzthQUN0QixHQUFHLENBQUMsVUFBQyxHQUFHLElBQUssT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTO1lBQzdELENBQUMsQ0FBQyxHQUFHO1lBQ0wsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUZoQixDQUVnQixDQUNqQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzs7Ozs7O0lBR1IsdUNBQWdCOzs7O2NBQUMsY0FBc0I7O1FBQzNDLElBQUksR0FBRyxDQUFDOztRQUNSLElBQUksS0FBSyxDQUFDO1FBQ1YsT0FBTyxjQUFjLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FDbkMsVUFBQyxHQUFHLEVBQUUsUUFBUTtZQUNWLElBQUksUUFBUSxFQUFFO2dCQUNWLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM1QixHQUFHLEdBQUcsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7YUFDcEY7WUFDRCxPQUFPLEdBQUcsQ0FBQztTQUNkLG9CQUNELEVBQW9DLEVBQUMsQ0FBQzs7Ozs7SUFHdEMsbUNBQVk7Ozs7UUFDaEIsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FDaEIsbUJBQUMsTUFBYSxFQUFDLENBQUMsT0FBTztZQUN2QixNQUFNLENBQUMsU0FBUyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FDckcsQ0FBQyxDQUFDOzs7Z0JBN0lWLFVBQVU7O3VCQVZYOztTQVdhLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRXaW5kb3dPcmlnaW4sIGdldEZ1bGxVcmxQYXRoIH0gZnJvbSAnLi91dGlscyc7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRU1QVFksIGZyb21FdmVudCwgaW50ZXJ2YWwsIG1lcmdlLCBPYnNlcnZhYmxlLCBvZiwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBJUG9wdXBPcHRpb25zLCBJT2F1dGgyT3B0aW9ucywgSU9hdXRoMU9wdGlvbnMgfSBmcm9tICcuL2NvbmZpZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgc3dpdGNoTWFwLCB0YWtlLCBtYXAsIGRlbGF5IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgUm9uIG9uIDE3LzEyLzIwMTUuXHJcbiAqL1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgUG9wdXBTZXJ2aWNlIHtcclxuICAgIHB1YmxpYyBvcGVuKHVybDogc3RyaW5nLCBvcHRpb25zOiBJT2F1dGgyT3B0aW9ucyB8IElPYXV0aDFPcHRpb25zLCBjb3Jkb3ZhOiBib29sZWFuIHwgbnVsbCkge1xyXG4gICAgICAgIGNvbnN0IHN0cmluZ2lmaWVkT3B0aW9ucyA9IHRoaXMuc3RyaW5naWZ5T3B0aW9ucyh0aGlzLnByZXBhcmVPcHRpb25zKG9wdGlvbnMucG9wdXBPcHRpb25zKSk7XHJcbiAgICAgICAgY29uc3QgVUEgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudDtcclxuICAgICAgICBjb3Jkb3ZhID0gY29yZG92YSA9PT0gbnVsbCA/IHRoaXMuaXNDb3Jkb3ZhQXBwKCkgOiBjb3Jkb3ZhO1xyXG4gICAgICAgIGNvbnN0IHdpbmRvd05hbWUgPSBjb3Jkb3ZhID8gJ19ibGFuaycgOiBvcHRpb25zLm5hbWU7XHJcblxyXG4gICAgICAgIGNvbnN0IHBvcHVwV2luZG93ID0gd2luZG93Lm9wZW4odXJsLCB3aW5kb3dOYW1lLCBzdHJpbmdpZmllZE9wdGlvbnMpO1xyXG5cclxuICAgICAgICBpZiAocG9wdXBXaW5kb3cgJiYgcG9wdXBXaW5kb3cuZm9jdXMpIHtcclxuICAgICAgICAgICAgcG9wdXBXaW5kb3cuZm9jdXMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb3Jkb3ZhXHJcbiAgICAgICAgICAgID8gdGhpcy5ldmVudExpc3RlbmVyKHBvcHVwV2luZG93LCBvcHRpb25zLnJlZGlyZWN0VXJpIHx8IGdldFdpbmRvd09yaWdpbigpKVxyXG4gICAgICAgICAgICA6IHRoaXMucG9sbFBvcHVwKHBvcHVwV2luZG93LCBvcHRpb25zLnJlZGlyZWN0VXJpIHx8IGdldFdpbmRvd09yaWdpbigpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZXZlbnRMaXN0ZW5lcihwb3B1cFdpbmRvdzogV2luZG93LCByZWRpcmVjdFVyaTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKCFwb3B1cFdpbmRvdykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BvcHVwIHdhcyBub3QgY3JlYXRlZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWVyZ2UoXHJcbiAgICAgICAgICAgIGZyb21FdmVudDxFdmVudD4ocG9wdXBXaW5kb3csICdleGl0JykucGlwZShcclxuICAgICAgICAgICAgICAgIGRlbGF5KDEwMCksXHJcbiAgICAgICAgICAgICAgICBtYXAoKCkgPT4geyB0aHJvdyBuZXcgRXJyb3IoJ0F1dGhlbnRpY2F0aW9uIENhbmNlbGVkJyk7IH0pLFxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBmcm9tRXZlbnQocG9wdXBXaW5kb3csICdsb2Fkc3RhcnQnKSxcclxuICAgICAgICApLnBpcGUoXHJcbiAgICAgICAgICAgIHN3aXRjaE1hcCgoZXZlbnQ6IEV2ZW50ICYgeyB1cmw6IHN0cmluZyB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXBvcHVwV2luZG93IHx8IHBvcHVwV2luZG93LmNsb3NlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLnRocm93KG5ldyBFcnJvcignQXV0aGVudGljYXRpb24gQ2FuY2VsZWQnKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQudXJsLmluZGV4T2YocmVkaXJlY3RVcmkpICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEVNUFRZO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHBhcnNlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgICAgICAgICAgICAgIHBhcnNlci5ocmVmID0gZXZlbnQudXJsO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChwYXJzZXIuc2VhcmNoIHx8IHBhcnNlci5oYXNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcXVlcnlQYXJhbXMgPSBwYXJzZXIuc2VhcmNoLnN1YnN0cmluZygxKS5yZXBsYWNlKC9cXC8kLywgJycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhc2hQYXJhbXMgPSBwYXJzZXIuaGFzaC5zdWJzdHJpbmcoMSkucmVwbGFjZSgvXFwvJC8sICcnKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBoYXNoID0gdGhpcy5wYXJzZVF1ZXJ5U3RyaW5nKGhhc2hQYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHFzID0gdGhpcy5wYXJzZVF1ZXJ5U3RyaW5nKHF1ZXJ5UGFyYW1zKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhbGxQYXJhbXMgPSB7IC4uLnFzLCAuLi5oYXNoIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHBvcHVwV2luZG93LmNsb3NlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhbGxQYXJhbXMuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgYWxsUGFyYW1zLmVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvZihhbGxQYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBFTVBUWTtcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIHRha2UoMSksXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwb2xsUG9wdXAocG9wdXBXaW5kb3c6IFdpbmRvdywgcmVkaXJlY3RVcmk6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBpbnRlcnZhbCg1MClcclxuICAgICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXBvcHVwV2luZG93IHx8IHBvcHVwV2luZG93LmNsb3NlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKG5ldyBFcnJvcignQXV0aGVudGljYXRpb24gQ2FuY2VsZWQnKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHBvcHVwV2luZG93UGF0aCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBwb3B1cFdpbmRvd1BhdGggID0gZ2V0RnVsbFVybFBhdGgocG9wdXBXaW5kb3cubG9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBpZ25vcmUgRE9NRXhjZXB0aW9uOiBCbG9ja2VkIGEgZnJhbWUgd2l0aCBvcmlnaW4gZnJvbSBhY2Nlc3NpbmcgYSBjcm9zcy1vcmlnaW4gZnJhbWUuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZXJyb3IgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiYgZXJyb3IubmFtZSA9PT0gJ1NlY3VyaXR5RXJyb3InXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAocmVkaXJlY3RVcmkgPT09IHBvcHVwV2luZG93UGF0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3B1cFdpbmRvdy5sb2NhdGlvbi5zZWFyY2ggfHwgcG9wdXBXaW5kb3cubG9jYXRpb24uaGFzaCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBxdWVyeVBhcmFtcyA9IHBvcHVwV2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHJpbmcoMSkucmVwbGFjZSgvXFwvJC8sICcnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFzaFBhcmFtcyA9IHBvcHVwV2luZG93LmxvY2F0aW9uLmhhc2guc3Vic3RyaW5nKDEpLnJlcGxhY2UoL1tcXC8kXS8sICcnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFzaCA9IHRoaXMucGFyc2VRdWVyeVN0cmluZyhoYXNoUGFyYW1zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcXMgPSB0aGlzLnBhcnNlUXVlcnlTdHJpbmcocXVlcnlQYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3B1cFdpbmRvdy5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhbGxQYXJhbXMgPSB7IC4uLnFzLCAuLi5oYXNoIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhbGxQYXJhbXMuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGFsbFBhcmFtcy5lcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvZihhbGxQYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IobmV3IEVycm9yKCdObyB0b2tlbiBmb3VuZCBhZnRlciByZWRpcmVjdCcpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gRU1QVFk7XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICB0YWtlKDEpLFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwcmVwYXJlT3B0aW9ucyhvcHRpb25zPzogSVBvcHVwT3B0aW9ucykge1xyXG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgICAgIGNvbnN0IHdpZHRoID0gb3B0aW9ucy53aWR0aCB8fCA1MDA7XHJcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQgfHwgNTAwO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHdpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHQsXHJcbiAgICAgICAgICAgIGxlZnQ6IHdpbmRvdy5zY3JlZW5YICsgKCh3aW5kb3cub3V0ZXJXaWR0aCAtIHdpZHRoKSAvIDIpLFxyXG4gICAgICAgICAgICB0b3A6IHdpbmRvdy5zY3JlZW5ZICsgKCh3aW5kb3cub3V0ZXJIZWlnaHQgLSBoZWlnaHQpIC8gMi41KSxcclxuICAgICAgICAgICAgdG9vbGJhcjogb3B0aW9ucy52aXNpYmxlVG9vbGJhciA/ICd5ZXMnIDogJ25vJyxcclxuICAgICAgICAgICAgLi4ub3B0aW9ucyxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RyaW5naWZ5T3B0aW9ucyhvcHRpb25zOiB7IFtpbmRleDogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbiB8IG51bGwgfCB1bmRlZmluZWQgfSkge1xyXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhvcHRpb25zKVxyXG4gICAgICAgICAgICAubWFwKChrZXkpID0+IG9wdGlvbnNba2V5XSA9PT0gbnVsbCB8fCBvcHRpb25zW2tleV0gPT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgPyBrZXlcclxuICAgICAgICAgICAgICAgIDoga2V5ICsgJz0nICsgb3B0aW9uc1trZXldLFxyXG4gICAgICAgICkuam9pbignLCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcGFyc2VRdWVyeVN0cmluZyhqb2luZWRLZXlWYWx1ZTogc3RyaW5nKTogYW55IHtcclxuICAgICAgICBsZXQga2V5O1xyXG4gICAgICAgIGxldCB2YWx1ZTtcclxuICAgICAgICByZXR1cm4gam9pbmVkS2V5VmFsdWUuc3BsaXQoJyYnKS5yZWR1Y2UoXHJcbiAgICAgICAgICAgIChvYmosIGtleVZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGtleVZhbHVlLnNwbGl0KCc9Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5ID0gZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICBvYmpba2V5XSA9IHR5cGVvZiB2YWx1ZVsxXSAhPT0gJ3VuZGVmaW5lZCcgPyBkZWNvZGVVUklDb21wb25lbnQodmFsdWVbMV0pIDogdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHt9IGFzIHsgW2s6IHN0cmluZ106IHN0cmluZyB8IHRydWUgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc0NvcmRvdmFBcHAoKSB7XHJcbiAgICAgICAgcmV0dXJuICEhKHdpbmRvdyAmJiAoXHJcbiAgICAgICAgICAgICh3aW5kb3cgYXMgYW55KS5jb3Jkb3ZhIHx8XHJcbiAgICAgICAgICAgIHdpbmRvdy5uYXZpZ2F0b3IgJiYgd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQgJiYgd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignQ3JpT1MnKSA+IC0xXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcbn1cclxuIl19