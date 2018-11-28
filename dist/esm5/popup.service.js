/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        var redirectUriParser = (/** @type {?} */ (document.createElement('a')));
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
     * @private
     * @param {?=} options
     * @return {?}
     */
    PopupService.prototype.prepareOptions = /**
     * @private
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
     * @private
     * @param {?} options
     * @return {?}
     */
    PopupService.prototype.stringifyOptions = /**
     * @private
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
     * @private
     * @param {?} joinedKeyValue
     * @return {?}
     */
    PopupService.prototype.parseQueryString = /**
     * @private
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
        }, (/** @type {?} */ ({})));
    };
    /**
     * @private
     * @return {?}
     */
    PopupService.prototype.isCordovaApp = /**
     * @private
     * @return {?}
     */
    function () {
        return !!(window && (((/** @type {?} */ (window))).cordova ||
            window.navigator && window.navigator.userAgent && window.navigator.userAgent.indexOf('CriOS') > -1));
    };
    PopupService.decorators = [
        { type: Injectable }
    ];
    return PopupService;
}());
export { PopupService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi11aS1hdXRoLyIsInNvdXJjZXMiOlsicG9wdXAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQzFELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUVyRixPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFNN0Q7SUFBQTtJQW9KQSxDQUFDOzs7Ozs7O0lBbEpVLDJCQUFJOzs7Ozs7SUFBWCxVQUFZLEdBQVcsRUFBRSxPQUF3QyxFQUFFLE9BQXVCOztZQUNoRixrQkFBa0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7O1lBQ3JGLEVBQUUsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVM7UUFDckMsT0FBTyxHQUFHLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDOztZQUNyRCxVQUFVLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJOztZQUU5QyxXQUFXLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBVSxFQUFFLGtCQUFrQixDQUFDO1FBRXBFLElBQUksV0FBVyxJQUFJLFdBQVcsQ0FBQyxLQUFLLEVBQUU7WUFDbEMsV0FBVyxDQUFDLEtB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Y0FBc0I7O1lBQ3ZDLEdBQUc7O1lBQ0gsS0FBSztRQUNULE9BQU8sY0FBYyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQ25DLFVBQUMsR0FBRyxFQUFFLFFBQVE7WUFDVixJQUFJLFFBQVEsRUFBRTtnQkFDVixLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDNUIsR0FBRyxHQUFHLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2FBQ3BGO1lBQ0QsT0FBTyxHQUFHLENBQUM7UUFDZixDQUFDLEVBQ0QsbUJBQUEsRUFBRSxFQUFrQyxDQUFDLENBQUM7SUFDOUMsQ0FBQzs7Ozs7SUFFTyxtQ0FBWTs7OztJQUFwQjtRQUNJLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQ2hCLENBQUMsbUJBQUEsTUFBTSxFQUFPLENBQUMsQ0FBQyxPQUFPO1lBQ3ZCLE1BQU0sQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUNyRyxDQUFDLENBQUM7SUFDUCxDQUFDOztnQkFuSkosVUFBVTs7SUFvSlgsbUJBQUM7Q0FBQSxBQXBKRCxJQW9KQztTQW5KWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0V2luZG93T3JpZ2luLCBnZXRGdWxsVXJsUGF0aCB9IGZyb20gJy4vdXRpbHMnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEVNUFRZLCBmcm9tRXZlbnQsIGludGVydmFsLCBtZXJnZSwgT2JzZXJ2YWJsZSwgb2YsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgSVBvcHVwT3B0aW9ucywgSU9hdXRoMk9wdGlvbnMsIElPYXV0aDFPcHRpb25zIH0gZnJvbSAnLi9jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IHN3aXRjaE1hcCwgdGFrZSwgbWFwLCBkZWxheSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFJvbiBvbiAxNy8xMi8yMDE1LlxyXG4gKi9cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFBvcHVwU2VydmljZSB7XHJcbiAgICBwdWJsaWMgb3Blbih1cmw6IHN0cmluZywgb3B0aW9uczogSU9hdXRoMk9wdGlvbnMgfCBJT2F1dGgxT3B0aW9ucywgY29yZG92YTogYm9vbGVhbiB8IG51bGwpIHtcclxuICAgICAgICBjb25zdCBzdHJpbmdpZmllZE9wdGlvbnMgPSB0aGlzLnN0cmluZ2lmeU9wdGlvbnModGhpcy5wcmVwYXJlT3B0aW9ucyhvcHRpb25zLnBvcHVwT3B0aW9ucykpO1xyXG4gICAgICAgIGNvbnN0IFVBID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7XHJcbiAgICAgICAgY29yZG92YSA9IGNvcmRvdmEgPT09IG51bGwgPyB0aGlzLmlzQ29yZG92YUFwcCgpIDogY29yZG92YTtcclxuICAgICAgICBjb25zdCB3aW5kb3dOYW1lID0gY29yZG92YSA/ICdfYmxhbmsnIDogb3B0aW9ucy5uYW1lO1xyXG5cclxuICAgICAgICBjb25zdCBwb3B1cFdpbmRvdyA9IHdpbmRvdy5vcGVuKHVybCwgd2luZG93TmFtZSwgc3RyaW5naWZpZWRPcHRpb25zKTtcclxuXHJcbiAgICAgICAgaWYgKHBvcHVwV2luZG93ICYmIHBvcHVwV2luZG93LmZvY3VzKSB7XHJcbiAgICAgICAgICAgIHBvcHVwV2luZG93LmZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY29yZG92YVxyXG4gICAgICAgICAgICA/IHRoaXMuZXZlbnRMaXN0ZW5lcihwb3B1cFdpbmRvdywgb3B0aW9ucy5yZWRpcmVjdFVyaSB8fCBnZXRXaW5kb3dPcmlnaW4oKSlcclxuICAgICAgICAgICAgOiB0aGlzLnBvbGxQb3B1cChwb3B1cFdpbmRvdywgb3B0aW9ucy5yZWRpcmVjdFVyaSB8fCBnZXRXaW5kb3dPcmlnaW4oKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGV2ZW50TGlzdGVuZXIocG9wdXBXaW5kb3c6IFdpbmRvdywgcmVkaXJlY3RVcmk6IHN0cmluZykge1xyXG4gICAgICAgIGlmICghcG9wdXBXaW5kb3cpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQb3B1cCB3YXMgbm90IGNyZWF0ZWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1lcmdlKFxyXG4gICAgICAgICAgICBmcm9tRXZlbnQ8RXZlbnQ+KHBvcHVwV2luZG93LCAnZXhpdCcpLnBpcGUoXHJcbiAgICAgICAgICAgICAgICBkZWxheSgxMDApLFxyXG4gICAgICAgICAgICAgICAgbWFwKCgpID0+IHsgdGhyb3cgbmV3IEVycm9yKCdBdXRoZW50aWNhdGlvbiBDYW5jZWxlZCcpOyB9KSxcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgZnJvbUV2ZW50KHBvcHVwV2luZG93LCAnbG9hZHN0YXJ0JyksXHJcbiAgICAgICAgKS5waXBlKFxyXG4gICAgICAgICAgICBzd2l0Y2hNYXAoKGV2ZW50OiBFdmVudCAmIHsgdXJsOiBzdHJpbmcgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFwb3B1cFdpbmRvdyB8fCBwb3B1cFdpbmRvdy5jbG9zZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhuZXcgRXJyb3IoJ0F1dGhlbnRpY2F0aW9uIENhbmNlbGVkJykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnVybC5pbmRleE9mKHJlZGlyZWN0VXJpKSAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBFTVBUWTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJzZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICAgICAgICAgICAgICBwYXJzZXIuaHJlZiA9IGV2ZW50LnVybDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VyLnNlYXJjaCB8fCBwYXJzZXIuaGFzaCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zID0gcGFyc2VyLnNlYXJjaC5zdWJzdHJpbmcoMSkucmVwbGFjZSgvXFwvJC8sICcnKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBoYXNoUGFyYW1zID0gcGFyc2VyLmhhc2guc3Vic3RyaW5nKDEpLnJlcGxhY2UoL1xcLyQvLCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFzaCA9IHRoaXMucGFyc2VRdWVyeVN0cmluZyhoYXNoUGFyYW1zKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBxcyA9IHRoaXMucGFyc2VRdWVyeVN0cmluZyhxdWVyeVBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWxsUGFyYW1zID0geyAuLi5xcywgLi4uaGFzaCB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBwb3B1cFdpbmRvdy5jbG9zZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoYWxsUGFyYW1zLmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGFsbFBhcmFtcy5lcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2YoYWxsUGFyYW1zKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gRU1QVFk7XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICB0YWtlKDEpLFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcG9sbFBvcHVwKHBvcHVwV2luZG93OiBXaW5kb3csIHJlZGlyZWN0VXJpOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgcmVkaXJlY3RVcmlQYXJzZXI6IEhUTUxBbmNob3JFbGVtZW50ID0gPEhUTUxBbmNob3JFbGVtZW50PmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgICAgICByZWRpcmVjdFVyaVBhcnNlci5ocmVmID0gcmVkaXJlY3RVcmk7XHJcblxyXG4gICAgICAgIGxldCByZWRpcmVjdFVyaVBhdGggPSBnZXRGdWxsVXJsUGF0aChyZWRpcmVjdFVyaVBhcnNlcik7XHJcblxyXG4gICAgICAgIHJldHVybiBpbnRlcnZhbCg1MClcclxuICAgICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXBvcHVwV2luZG93IHx8IHBvcHVwV2luZG93LmNsb3NlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKG5ldyBFcnJvcignQXV0aGVudGljYXRpb24gQ2FuY2VsZWQnKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHBvcHVwV2luZG93UGF0aCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBwb3B1cFdpbmRvd1BhdGggID0gZ2V0RnVsbFVybFBhdGgocG9wdXBXaW5kb3cubG9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBpZ25vcmUgRE9NRXhjZXB0aW9uOiBCbG9ja2VkIGEgZnJhbWUgd2l0aCBvcmlnaW4gZnJvbSBhY2Nlc3NpbmcgYSBjcm9zcy1vcmlnaW4gZnJhbWUuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZXJyb3IgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiYgZXJyb3IubmFtZSA9PT0gJ1NlY3VyaXR5RXJyb3InXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAocmVkaXJlY3RVcmlQYXRoID09PSBwb3B1cFdpbmRvd1BhdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocG9wdXBXaW5kb3cubG9jYXRpb24uc2VhcmNoIHx8IHBvcHVwV2luZG93LmxvY2F0aW9uLmhhc2gpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcXVlcnlQYXJhbXMgPSBwb3B1cFdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyaW5nKDEpLnJlcGxhY2UoL1xcLyQvLCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhc2hQYXJhbXMgPSBwb3B1cFdpbmRvdy5sb2NhdGlvbi5oYXNoLnN1YnN0cmluZygxKS5yZXBsYWNlKC9bXFwvJF0vLCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhc2ggPSB0aGlzLnBhcnNlUXVlcnlTdHJpbmcoaGFzaFBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHFzID0gdGhpcy5wYXJzZVF1ZXJ5U3RyaW5nKHF1ZXJ5UGFyYW1zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9wdXBXaW5kb3cuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYWxsUGFyYW1zID0geyAuLi5xcywgLi4uaGFzaCB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWxsUGFyYW1zLmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBhbGxQYXJhbXMuZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2YoYWxsUGFyYW1zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKG5ldyBFcnJvcignTm8gdG9rZW4gZm91bmQgYWZ0ZXIgcmVkaXJlY3QnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEVNUFRZO1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgdGFrZSgxKSxcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcHJlcGFyZU9wdGlvbnMob3B0aW9ucz86IElQb3B1cE9wdGlvbnMpIHtcclxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuICAgICAgICBjb25zdCB3aWR0aCA9IG9wdGlvbnMud2lkdGggfHwgNTAwO1xyXG4gICAgICAgIGNvbnN0IGhlaWdodCA9IG9wdGlvbnMuaGVpZ2h0IHx8IDUwMDtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB3aWR0aCxcclxuICAgICAgICAgICAgaGVpZ2h0LFxyXG4gICAgICAgICAgICBsZWZ0OiB3aW5kb3cuc2NyZWVuWCArICgod2luZG93Lm91dGVyV2lkdGggLSB3aWR0aCkgLyAyKSxcclxuICAgICAgICAgICAgdG9wOiB3aW5kb3cuc2NyZWVuWSArICgod2luZG93Lm91dGVySGVpZ2h0IC0gaGVpZ2h0KSAvIDIuNSksXHJcbiAgICAgICAgICAgIHRvb2xiYXI6IG9wdGlvbnMudmlzaWJsZVRvb2xiYXIgPyAneWVzJyA6ICdubycsXHJcbiAgICAgICAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0cmluZ2lmeU9wdGlvbnMob3B0aW9uczogeyBbaW5kZXg6IHN0cmluZ106IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfCBudWxsIHwgdW5kZWZpbmVkIH0pIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMob3B0aW9ucylcclxuICAgICAgICAgICAgLm1hcCgoa2V5KSA9PiBvcHRpb25zW2tleV0gPT09IG51bGwgfHwgb3B0aW9uc1trZXldID09PSB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgID8ga2V5XHJcbiAgICAgICAgICAgICAgICA6IGtleSArICc9JyArIG9wdGlvbnNba2V5XSxcclxuICAgICAgICApLmpvaW4oJywnKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHBhcnNlUXVlcnlTdHJpbmcoam9pbmVkS2V5VmFsdWU6IHN0cmluZyk6IGFueSB7XHJcbiAgICAgICAgbGV0IGtleTtcclxuICAgICAgICBsZXQgdmFsdWU7XHJcbiAgICAgICAgcmV0dXJuIGpvaW5lZEtleVZhbHVlLnNwbGl0KCcmJykucmVkdWNlKFxyXG4gICAgICAgICAgICAob2JqLCBrZXlWYWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGtleVZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBrZXlWYWx1ZS5zcGxpdCgnPScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGtleSA9IGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZVswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqW2tleV0gPSB0eXBlb2YgdmFsdWVbMV0gIT09ICd1bmRlZmluZWQnID8gZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlWzFdKSA6IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7fSBhcyB7IFtrOiBzdHJpbmddOiBzdHJpbmcgfCB0cnVlIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNDb3Jkb3ZhQXBwKCkge1xyXG4gICAgICAgIHJldHVybiAhISh3aW5kb3cgJiYgKFxyXG4gICAgICAgICAgICAod2luZG93IGFzIGFueSkuY29yZG92YSB8fFxyXG4gICAgICAgICAgICB3aW5kb3cubmF2aWdhdG9yICYmIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50ICYmIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0NyaU9TJykgPiAtMVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==