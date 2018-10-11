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
        /** @type {?} */
        var redirectUriParser = /** @type {?} */ (document.createElement('a'));
        redirectUriParser.href = redirectUri;
        /** @type {?} */
        var redirectUriPath = getFullUrlPath(redirectUriParser);
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
            if (redirectUriPath === popupWindowPath) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi11aS1hdXRoLyIsInNvdXJjZXMiOlsicG9wdXAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQzFELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUVyRixPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7Ozs7Ozs7SUFRbEQsMkJBQUk7Ozs7OztjQUFDLEdBQVcsRUFBRSxPQUF3QyxFQUFFLE9BQXVCOztRQUN0RixJQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDOztRQUM1RixJQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztRQUN0QyxPQUFPLEdBQUcsT0FBTyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7O1FBQzNELElBQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDOztRQUVyRCxJQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUVyRSxJQUFJLFdBQVcsSUFBSSxXQUFXLENBQUMsS0FBSyxFQUFFO1lB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Ozs7OztJQUdSLHVDQUFnQjs7OztjQUFDLGNBQXNCOztRQUMzQyxJQUFJLEdBQUcsQ0FBQzs7UUFDUixJQUFJLEtBQUssQ0FBQztRQUNWLE9BQU8sY0FBYyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQ25DLFVBQUMsR0FBRyxFQUFFLFFBQVE7WUFDVixJQUFJLFFBQVEsRUFBRTtnQkFDVixLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDNUIsR0FBRyxHQUFHLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2FBQ3BGO1lBQ0QsT0FBTyxHQUFHLENBQUM7U0FDZCxvQkFDRCxFQUFvQyxFQUFDLENBQUM7Ozs7O0lBR3RDLG1DQUFZOzs7O1FBQ2hCLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQ2hCLG1CQUFDLE1BQWEsRUFBQyxDQUFDLE9BQU87WUFDdkIsTUFBTSxDQUFDLFNBQVMsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQ3JHLENBQUMsQ0FBQzs7O2dCQWxKVixVQUFVOzt1QkFWWDs7U0FXYSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0V2luZG93T3JpZ2luLCBnZXRGdWxsVXJsUGF0aCB9IGZyb20gJy4vdXRpbHMnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEVNUFRZLCBmcm9tRXZlbnQsIGludGVydmFsLCBtZXJnZSwgT2JzZXJ2YWJsZSwgb2YsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgSVBvcHVwT3B0aW9ucywgSU9hdXRoMk9wdGlvbnMsIElPYXV0aDFPcHRpb25zIH0gZnJvbSAnLi9jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IHN3aXRjaE1hcCwgdGFrZSwgbWFwLCBkZWxheSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFJvbiBvbiAxNy8xMi8yMDE1LlxyXG4gKi9cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFBvcHVwU2VydmljZSB7XHJcbiAgICBwdWJsaWMgb3Blbih1cmw6IHN0cmluZywgb3B0aW9uczogSU9hdXRoMk9wdGlvbnMgfCBJT2F1dGgxT3B0aW9ucywgY29yZG92YTogYm9vbGVhbiB8IG51bGwpIHtcclxuICAgICAgICBjb25zdCBzdHJpbmdpZmllZE9wdGlvbnMgPSB0aGlzLnN0cmluZ2lmeU9wdGlvbnModGhpcy5wcmVwYXJlT3B0aW9ucyhvcHRpb25zLnBvcHVwT3B0aW9ucykpO1xyXG4gICAgICAgIGNvbnN0IFVBID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7XHJcbiAgICAgICAgY29yZG92YSA9IGNvcmRvdmEgPT09IG51bGwgPyB0aGlzLmlzQ29yZG92YUFwcCgpIDogY29yZG92YTtcclxuICAgICAgICBjb25zdCB3aW5kb3dOYW1lID0gY29yZG92YSA/ICdfYmxhbmsnIDogb3B0aW9ucy5uYW1lO1xyXG5cclxuICAgICAgICBjb25zdCBwb3B1cFdpbmRvdyA9IHdpbmRvdy5vcGVuKHVybCwgd2luZG93TmFtZSwgc3RyaW5naWZpZWRPcHRpb25zKTtcclxuXHJcbiAgICAgICAgaWYgKHBvcHVwV2luZG93ICYmIHBvcHVwV2luZG93LmZvY3VzKSB7XHJcbiAgICAgICAgICAgIHBvcHVwV2luZG93LmZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY29yZG92YVxyXG4gICAgICAgICAgICA/IHRoaXMuZXZlbnRMaXN0ZW5lcihwb3B1cFdpbmRvdywgb3B0aW9ucy5yZWRpcmVjdFVyaSB8fCBnZXRXaW5kb3dPcmlnaW4oKSlcclxuICAgICAgICAgICAgOiB0aGlzLnBvbGxQb3B1cChwb3B1cFdpbmRvdywgb3B0aW9ucy5yZWRpcmVjdFVyaSB8fCBnZXRXaW5kb3dPcmlnaW4oKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGV2ZW50TGlzdGVuZXIocG9wdXBXaW5kb3c6IFdpbmRvdywgcmVkaXJlY3RVcmk6IHN0cmluZykge1xyXG4gICAgICAgIGlmICghcG9wdXBXaW5kb3cpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQb3B1cCB3YXMgbm90IGNyZWF0ZWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1lcmdlKFxyXG4gICAgICAgICAgICBmcm9tRXZlbnQ8RXZlbnQ+KHBvcHVwV2luZG93LCAnZXhpdCcpLnBpcGUoXHJcbiAgICAgICAgICAgICAgICBkZWxheSgxMDApLFxyXG4gICAgICAgICAgICAgICAgbWFwKCgpID0+IHsgdGhyb3cgbmV3IEVycm9yKCdBdXRoZW50aWNhdGlvbiBDYW5jZWxlZCcpOyB9KSxcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgZnJvbUV2ZW50KHBvcHVwV2luZG93LCAnbG9hZHN0YXJ0JyksXHJcbiAgICAgICAgKS5waXBlKFxyXG4gICAgICAgICAgICBzd2l0Y2hNYXAoKGV2ZW50OiBFdmVudCAmIHsgdXJsOiBzdHJpbmcgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFwb3B1cFdpbmRvdyB8fCBwb3B1cFdpbmRvdy5jbG9zZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhuZXcgRXJyb3IoJ0F1dGhlbnRpY2F0aW9uIENhbmNlbGVkJykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnVybC5pbmRleE9mKHJlZGlyZWN0VXJpKSAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBFTVBUWTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJzZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICAgICAgICAgICAgICBwYXJzZXIuaHJlZiA9IGV2ZW50LnVybDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VyLnNlYXJjaCB8fCBwYXJzZXIuaGFzaCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zID0gcGFyc2VyLnNlYXJjaC5zdWJzdHJpbmcoMSkucmVwbGFjZSgvXFwvJC8sICcnKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBoYXNoUGFyYW1zID0gcGFyc2VyLmhhc2guc3Vic3RyaW5nKDEpLnJlcGxhY2UoL1xcLyQvLCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFzaCA9IHRoaXMucGFyc2VRdWVyeVN0cmluZyhoYXNoUGFyYW1zKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBxcyA9IHRoaXMucGFyc2VRdWVyeVN0cmluZyhxdWVyeVBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWxsUGFyYW1zID0geyAuLi5xcywgLi4uaGFzaCB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBwb3B1cFdpbmRvdy5jbG9zZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoYWxsUGFyYW1zLmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGFsbFBhcmFtcy5lcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2YoYWxsUGFyYW1zKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gRU1QVFk7XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICB0YWtlKDEpLFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcG9sbFBvcHVwKHBvcHVwV2luZG93OiBXaW5kb3csIHJlZGlyZWN0VXJpOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgcmVkaXJlY3RVcmlQYXJzZXI6IEhUTUxBbmNob3JFbGVtZW50ID0gPEhUTUxBbmNob3JFbGVtZW50PmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgICAgICByZWRpcmVjdFVyaVBhcnNlci5ocmVmID0gcmVkaXJlY3RVcmk7XHJcblxyXG4gICAgICAgIGxldCByZWRpcmVjdFVyaVBhdGggPSBnZXRGdWxsVXJsUGF0aChyZWRpcmVjdFVyaVBhcnNlcik7XHJcblxyXG4gICAgICAgIHJldHVybiBpbnRlcnZhbCg1MClcclxuICAgICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXBvcHVwV2luZG93IHx8IHBvcHVwV2luZG93LmNsb3NlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKG5ldyBFcnJvcignQXV0aGVudGljYXRpb24gQ2FuY2VsZWQnKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHBvcHVwV2luZG93UGF0aCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBwb3B1cFdpbmRvd1BhdGggID0gZ2V0RnVsbFVybFBhdGgocG9wdXBXaW5kb3cubG9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBpZ25vcmUgRE9NRXhjZXB0aW9uOiBCbG9ja2VkIGEgZnJhbWUgd2l0aCBvcmlnaW4gZnJvbSBhY2Nlc3NpbmcgYSBjcm9zcy1vcmlnaW4gZnJhbWUuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZXJyb3IgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiYgZXJyb3IubmFtZSA9PT0gJ1NlY3VyaXR5RXJyb3InXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAocmVkaXJlY3RVcmlQYXRoID09PSBwb3B1cFdpbmRvd1BhdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocG9wdXBXaW5kb3cubG9jYXRpb24uc2VhcmNoIHx8IHBvcHVwV2luZG93LmxvY2F0aW9uLmhhc2gpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcXVlcnlQYXJhbXMgPSBwb3B1cFdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyaW5nKDEpLnJlcGxhY2UoL1xcLyQvLCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhc2hQYXJhbXMgPSBwb3B1cFdpbmRvdy5sb2NhdGlvbi5oYXNoLnN1YnN0cmluZygxKS5yZXBsYWNlKC9bXFwvJF0vLCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhc2ggPSB0aGlzLnBhcnNlUXVlcnlTdHJpbmcoaGFzaFBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHFzID0gdGhpcy5wYXJzZVF1ZXJ5U3RyaW5nKHF1ZXJ5UGFyYW1zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9wdXBXaW5kb3cuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYWxsUGFyYW1zID0geyAuLi5xcywgLi4uaGFzaCB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWxsUGFyYW1zLmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBhbGxQYXJhbXMuZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2YoYWxsUGFyYW1zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKG5ldyBFcnJvcignTm8gdG9rZW4gZm91bmQgYWZ0ZXIgcmVkaXJlY3QnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEVNUFRZO1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgdGFrZSgxKSxcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcHJlcGFyZU9wdGlvbnMob3B0aW9ucz86IElQb3B1cE9wdGlvbnMpIHtcclxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuICAgICAgICBjb25zdCB3aWR0aCA9IG9wdGlvbnMud2lkdGggfHwgNTAwO1xyXG4gICAgICAgIGNvbnN0IGhlaWdodCA9IG9wdGlvbnMuaGVpZ2h0IHx8IDUwMDtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB3aWR0aCxcclxuICAgICAgICAgICAgaGVpZ2h0LFxyXG4gICAgICAgICAgICBsZWZ0OiB3aW5kb3cuc2NyZWVuWCArICgod2luZG93Lm91dGVyV2lkdGggLSB3aWR0aCkgLyAyKSxcclxuICAgICAgICAgICAgdG9wOiB3aW5kb3cuc2NyZWVuWSArICgod2luZG93Lm91dGVySGVpZ2h0IC0gaGVpZ2h0KSAvIDIuNSksXHJcbiAgICAgICAgICAgIHRvb2xiYXI6IG9wdGlvbnMudmlzaWJsZVRvb2xiYXIgPyAneWVzJyA6ICdubycsXHJcbiAgICAgICAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0cmluZ2lmeU9wdGlvbnMob3B0aW9uczogeyBbaW5kZXg6IHN0cmluZ106IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfCBudWxsIHwgdW5kZWZpbmVkIH0pIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMob3B0aW9ucylcclxuICAgICAgICAgICAgLm1hcCgoa2V5KSA9PiBvcHRpb25zW2tleV0gPT09IG51bGwgfHwgb3B0aW9uc1trZXldID09PSB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgID8ga2V5XHJcbiAgICAgICAgICAgICAgICA6IGtleSArICc9JyArIG9wdGlvbnNba2V5XSxcclxuICAgICAgICApLmpvaW4oJywnKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHBhcnNlUXVlcnlTdHJpbmcoam9pbmVkS2V5VmFsdWU6IHN0cmluZyk6IGFueSB7XHJcbiAgICAgICAgbGV0IGtleTtcclxuICAgICAgICBsZXQgdmFsdWU7XHJcbiAgICAgICAgcmV0dXJuIGpvaW5lZEtleVZhbHVlLnNwbGl0KCcmJykucmVkdWNlKFxyXG4gICAgICAgICAgICAob2JqLCBrZXlWYWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGtleVZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBrZXlWYWx1ZS5zcGxpdCgnPScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGtleSA9IGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZVswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqW2tleV0gPSB0eXBlb2YgdmFsdWVbMV0gIT09ICd1bmRlZmluZWQnID8gZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlWzFdKSA6IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7fSBhcyB7IFtrOiBzdHJpbmddOiBzdHJpbmcgfCB0cnVlIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNDb3Jkb3ZhQXBwKCkge1xyXG4gICAgICAgIHJldHVybiAhISh3aW5kb3cgJiYgKFxyXG4gICAgICAgICAgICAod2luZG93IGFzIGFueSkuY29yZG92YSB8fFxyXG4gICAgICAgICAgICB3aW5kb3cubmF2aWdhdG9yICYmIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50ICYmIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0NyaU9TJykgPiAtMVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==