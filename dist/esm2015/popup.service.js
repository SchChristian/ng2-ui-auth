/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { getWindowOrigin, getFullUrlPath } from './utils';
import { Injectable } from '@angular/core';
import { EMPTY, fromEvent, interval, merge, Observable, of, throwError } from 'rxjs';
import { switchMap, take, map, delay } from 'rxjs/operators';
/**
 * Created by Ron on 17/12/2015.
 */
export class PopupService {
    /**
     * @param {?} url
     * @param {?} options
     * @param {?} cordova
     * @return {?}
     */
    open(url, options, cordova) {
        /** @type {?} */
        const stringifiedOptions = this.stringifyOptions(this.prepareOptions(options.popupOptions));
        /** @type {?} */
        const UA = window.navigator.userAgent;
        cordova = cordova === null ? this.isCordovaApp() : cordova;
        /** @type {?} */
        const windowName = cordova ? '_blank' : options.name;
        /** @type {?} */
        const popupWindow = window.open(url, windowName, stringifiedOptions);
        if (popupWindow && popupWindow.focus) {
            popupWindow.focus();
        }
        return cordova
            ? this.eventListener(popupWindow, options.redirectUri || getWindowOrigin())
            : this.pollPopup(popupWindow, options.redirectUri || getWindowOrigin());
    }
    /**
     * @param {?} popupWindow
     * @param {?} redirectUri
     * @return {?}
     */
    eventListener(popupWindow, redirectUri) {
        if (!popupWindow) {
            throw new Error('Popup was not created');
        }
        return merge(fromEvent(popupWindow, 'exit').pipe(delay(100), map(() => { throw new Error('Authentication Canceled'); })), fromEvent(popupWindow, 'loadstart')).pipe(switchMap((event) => {
            if (!popupWindow || popupWindow.closed) {
                return Observable.throw(new Error('Authentication Canceled'));
            }
            if (event.url.indexOf(redirectUri) !== 0) {
                return EMPTY;
            }
            /** @type {?} */
            const parser = document.createElement('a');
            parser.href = event.url;
            if (parser.search || parser.hash) {
                /** @type {?} */
                const queryParams = parser.search.substring(1).replace(/\/$/, '');
                /** @type {?} */
                const hashParams = parser.hash.substring(1).replace(/\/$/, '');
                /** @type {?} */
                const hash = this.parseQueryString(hashParams);
                /** @type {?} */
                const qs = this.parseQueryString(queryParams);
                /** @type {?} */
                const allParams = Object.assign({}, qs, hash);
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
    }
    /**
     * @param {?} popupWindow
     * @param {?} redirectUri
     * @return {?}
     */
    pollPopup(popupWindow, redirectUri) {
        /** @type {?} */
        let redirectUriParser = /** @type {?} */ (document.createElement('a'));
        redirectUriParser.href = redirectUri;
        /** @type {?} */
        let redirectUriPath = getFullUrlPath(redirectUriParser);
        return interval(50)
            .pipe(switchMap(() => {
            if (!popupWindow || popupWindow.closed) {
                return throwError(new Error('Authentication Canceled'));
            }
            /** @type {?} */
            let popupWindowPath = '';
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
                    const queryParams = popupWindow.location.search.substring(1).replace(/\/$/, '');
                    /** @type {?} */
                    const hashParams = popupWindow.location.hash.substring(1).replace(/[\/$]/, '');
                    /** @type {?} */
                    const hash = this.parseQueryString(hashParams);
                    /** @type {?} */
                    const qs = this.parseQueryString(queryParams);
                    popupWindow.close();
                    /** @type {?} */
                    const allParams = Object.assign({}, qs, hash);
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
    }
    /**
     * @param {?=} options
     * @return {?}
     */
    prepareOptions(options) {
        options = options || {};
        /** @type {?} */
        const width = options.width || 500;
        /** @type {?} */
        const height = options.height || 500;
        return Object.assign({ width,
            height, left: window.screenX + ((window.outerWidth - width) / 2), top: window.screenY + ((window.outerHeight - height) / 2.5), toolbar: options.visibleToolbar ? 'yes' : 'no' }, options);
    }
    /**
     * @param {?} options
     * @return {?}
     */
    stringifyOptions(options) {
        return Object.keys(options)
            .map((key) => options[key] === null || options[key] === undefined
            ? key
            : key + '=' + options[key]).join(',');
    }
    /**
     * @param {?} joinedKeyValue
     * @return {?}
     */
    parseQueryString(joinedKeyValue) {
        /** @type {?} */
        let key;
        /** @type {?} */
        let value;
        return joinedKeyValue.split('&').reduce((obj, keyValue) => {
            if (keyValue) {
                value = keyValue.split('=');
                key = decodeURIComponent(value[0]);
                obj[key] = typeof value[1] !== 'undefined' ? decodeURIComponent(value[1]) : true;
            }
            return obj;
        }, /** @type {?} */ ({}));
    }
    /**
     * @return {?}
     */
    isCordovaApp() {
        return !!(window && ((/** @type {?} */ (window)).cordova ||
            window.navigator && window.navigator.userAgent && window.navigator.userAgent.indexOf('CriOS') > -1));
    }
}
PopupService.decorators = [
    { type: Injectable }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi11aS1hdXRoLyIsInNvdXJjZXMiOlsicG9wdXAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDMUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXJGLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQU83RCxNQUFNOzs7Ozs7O0lBQ0ssSUFBSSxDQUFDLEdBQVcsRUFBRSxPQUF3QyxFQUFFLE9BQXVCOztRQUN0RixNQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDOztRQUM1RixNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztRQUN0QyxPQUFPLEdBQUcsT0FBTyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7O1FBQzNELE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDOztRQUVyRCxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUVyRSxJQUFJLFdBQVcsSUFBSSxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQ2xDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN2QjtRQUVELE9BQU8sT0FBTztZQUNWLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsV0FBVyxJQUFJLGVBQWUsRUFBRSxDQUFDO1lBQzNFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsV0FBVyxJQUFJLGVBQWUsRUFBRSxDQUFDLENBQUM7Ozs7Ozs7SUFHekUsYUFBYSxDQUFDLFdBQW1CLEVBQUUsV0FBbUI7UUFDekQsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNkLE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQztTQUM1QztRQUNELE9BQU8sS0FBSyxDQUNSLFNBQVMsQ0FBUSxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUN0QyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQ1YsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FDN0QsRUFDRCxTQUFTLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUN0QyxDQUFDLElBQUksQ0FDRixTQUFTLENBQUMsQ0FBQyxLQUE4QixFQUFFLEVBQUU7WUFDekMsSUFBSSxDQUFDLFdBQVcsSUFBSSxXQUFXLENBQUMsTUFBTSxFQUFFO2dCQUNwQyxPQUFPLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDO2FBQ2pFO1lBQ0QsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3RDLE9BQU8sS0FBSyxDQUFDO2FBQ2hCOztZQUVELE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0MsTUFBTSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO1lBRXhCLElBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFOztnQkFDOUIsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQzs7Z0JBQ2xFLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7O2dCQUMvRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUM7O2dCQUMvQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLENBQUM7O2dCQUM5QyxNQUFNLFNBQVMscUJBQVEsRUFBRSxFQUFLLElBQUksRUFBRztnQkFFckMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUVwQixJQUFJLFNBQVMsQ0FBQyxLQUFLLEVBQUU7b0JBQ2pCLE1BQU0sU0FBUyxDQUFDLEtBQUssQ0FBQztpQkFDekI7cUJBQU07b0JBQ0gsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQ3hCO2FBQ0o7WUFDRCxPQUFPLEtBQUssQ0FBQztTQUNoQixDQUFDLEVBQ0YsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUNWLENBQUM7Ozs7Ozs7SUFHTixTQUFTLENBQUMsV0FBbUIsRUFBRSxXQUFtQjs7UUFDOUMsSUFBSSxpQkFBaUIscUJBQXlDLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQUM7UUFDMUYsaUJBQWlCLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQzs7UUFFckMsSUFBSSxlQUFlLEdBQUcsY0FBYyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFeEQsT0FBTyxRQUFRLENBQUMsRUFBRSxDQUFDO2FBQ2QsSUFBSSxDQUNMLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDWCxJQUFJLENBQUMsV0FBVyxJQUFJLFdBQVcsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3BDLE9BQU8sVUFBVSxDQUFDLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQzthQUMzRDs7WUFFRCxJQUFJLGVBQWUsR0FBRyxFQUFFLENBQUM7WUFDekIsSUFBSTtnQkFDQSxlQUFlLEdBQUksY0FBYyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUMzRDtZQUFDLE9BQU8sS0FBSyxFQUFFOzs7YUFHZjtZQUNELElBQUksZUFBZSxLQUFLLGVBQWUsRUFBRTtnQkFDckMsSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRTs7b0JBQzFELE1BQU0sV0FBVyxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDOztvQkFDaEYsTUFBTSxVQUFVLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7O29CQUMvRSxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUM7O29CQUMvQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQzlDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7b0JBQ3BCLE1BQU0sU0FBUyxxQkFBUSxFQUFFLEVBQUssSUFBSSxFQUFHO29CQUNyQyxJQUFJLFNBQVMsQ0FBQyxLQUFLLEVBQUU7d0JBQ2pCLE1BQU0sU0FBUyxDQUFDLEtBQUssQ0FBQztxQkFDekI7eUJBQU07d0JBQ0gsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7cUJBQ3hCO2lCQUNKO3FCQUFNO29CQUNILE9BQU8sVUFBVSxDQUFDLElBQUksS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUMsQ0FBQztpQkFDakU7YUFDSjtZQUNELE9BQU8sS0FBSyxDQUFDO1NBQ2hCLENBQUMsRUFDRixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQ1YsQ0FBQztLQUNMOzs7OztJQUVPLGNBQWMsQ0FBQyxPQUF1QjtRQUMxQyxPQUFPLEdBQUcsT0FBTyxJQUFJLEVBQUUsQ0FBQzs7UUFDeEIsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxHQUFHLENBQUM7O1FBQ25DLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDO1FBQ3JDLHVCQUNJLEtBQUs7WUFDTCxNQUFNLEVBQ04sSUFBSSxFQUFFLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQ3hELEdBQUcsRUFBRSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUMzRCxPQUFPLEVBQUUsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQzNDLE9BQU8sRUFDWjs7Ozs7O0lBR0UsZ0JBQWdCLENBQUMsT0FBMEU7UUFDL0YsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzthQUN0QixHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVM7WUFDN0QsQ0FBQyxDQUFDLEdBQUc7WUFDTCxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQ2pDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7SUFHUixnQkFBZ0IsQ0FBQyxjQUFzQjs7UUFDM0MsSUFBSSxHQUFHLENBQUM7O1FBQ1IsSUFBSSxLQUFLLENBQUM7UUFDVixPQUFPLGNBQWMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUNuQyxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsRUFBRTtZQUNkLElBQUksUUFBUSxFQUFFO2dCQUNWLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM1QixHQUFHLEdBQUcsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7YUFDcEY7WUFDRCxPQUFPLEdBQUcsQ0FBQztTQUNkLG9CQUNELEVBQW9DLEVBQUMsQ0FBQzs7Ozs7SUFHdEMsWUFBWTtRQUNoQixPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUNoQixtQkFBQyxNQUFhLEVBQUMsQ0FBQyxPQUFPO1lBQ3ZCLE1BQU0sQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUNyRyxDQUFDLENBQUM7Ozs7WUFsSlYsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldFdpbmRvd09yaWdpbiwgZ2V0RnVsbFVybFBhdGggfSBmcm9tICcuL3V0aWxzJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBFTVBUWSwgZnJvbUV2ZW50LCBpbnRlcnZhbCwgbWVyZ2UsIE9ic2VydmFibGUsIG9mLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IElQb3B1cE9wdGlvbnMsIElPYXV0aDJPcHRpb25zLCBJT2F1dGgxT3B0aW9ucyB9IGZyb20gJy4vY29uZmlnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBzd2l0Y2hNYXAsIHRha2UsIG1hcCwgZGVsYXkgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG4vKipcclxuICogQ3JlYXRlZCBieSBSb24gb24gMTcvMTIvMjAxNS5cclxuICovXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBQb3B1cFNlcnZpY2Uge1xyXG4gICAgcHVibGljIG9wZW4odXJsOiBzdHJpbmcsIG9wdGlvbnM6IElPYXV0aDJPcHRpb25zIHwgSU9hdXRoMU9wdGlvbnMsIGNvcmRvdmE6IGJvb2xlYW4gfCBudWxsKSB7XHJcbiAgICAgICAgY29uc3Qgc3RyaW5naWZpZWRPcHRpb25zID0gdGhpcy5zdHJpbmdpZnlPcHRpb25zKHRoaXMucHJlcGFyZU9wdGlvbnMob3B0aW9ucy5wb3B1cE9wdGlvbnMpKTtcclxuICAgICAgICBjb25zdCBVQSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xyXG4gICAgICAgIGNvcmRvdmEgPSBjb3Jkb3ZhID09PSBudWxsID8gdGhpcy5pc0NvcmRvdmFBcHAoKSA6IGNvcmRvdmE7XHJcbiAgICAgICAgY29uc3Qgd2luZG93TmFtZSA9IGNvcmRvdmEgPyAnX2JsYW5rJyA6IG9wdGlvbnMubmFtZTtcclxuXHJcbiAgICAgICAgY29uc3QgcG9wdXBXaW5kb3cgPSB3aW5kb3cub3Blbih1cmwsIHdpbmRvd05hbWUsIHN0cmluZ2lmaWVkT3B0aW9ucyk7XHJcblxyXG4gICAgICAgIGlmIChwb3B1cFdpbmRvdyAmJiBwb3B1cFdpbmRvdy5mb2N1cykge1xyXG4gICAgICAgICAgICBwb3B1cFdpbmRvdy5mb2N1cygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvcmRvdmFcclxuICAgICAgICAgICAgPyB0aGlzLmV2ZW50TGlzdGVuZXIocG9wdXBXaW5kb3csIG9wdGlvbnMucmVkaXJlY3RVcmkgfHwgZ2V0V2luZG93T3JpZ2luKCkpXHJcbiAgICAgICAgICAgIDogdGhpcy5wb2xsUG9wdXAocG9wdXBXaW5kb3csIG9wdGlvbnMucmVkaXJlY3RVcmkgfHwgZ2V0V2luZG93T3JpZ2luKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBldmVudExpc3RlbmVyKHBvcHVwV2luZG93OiBXaW5kb3csIHJlZGlyZWN0VXJpOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIXBvcHVwV2luZG93KSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUG9wdXAgd2FzIG5vdCBjcmVhdGVkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtZXJnZShcclxuICAgICAgICAgICAgZnJvbUV2ZW50PEV2ZW50Pihwb3B1cFdpbmRvdywgJ2V4aXQnKS5waXBlKFxyXG4gICAgICAgICAgICAgICAgZGVsYXkoMTAwKSxcclxuICAgICAgICAgICAgICAgIG1hcCgoKSA9PiB7IHRocm93IG5ldyBFcnJvcignQXV0aGVudGljYXRpb24gQ2FuY2VsZWQnKTsgfSksXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGZyb21FdmVudChwb3B1cFdpbmRvdywgJ2xvYWRzdGFydCcpLFxyXG4gICAgICAgICkucGlwZShcclxuICAgICAgICAgICAgc3dpdGNoTWFwKChldmVudDogRXZlbnQgJiB7IHVybDogc3RyaW5nIH0pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghcG9wdXBXaW5kb3cgfHwgcG9wdXBXaW5kb3cuY2xvc2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUudGhyb3cobmV3IEVycm9yKCdBdXRoZW50aWNhdGlvbiBDYW5jZWxlZCcpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChldmVudC51cmwuaW5kZXhPZihyZWRpcmVjdFVyaSkgIT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gRU1QVFk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgcGFyc2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgICAgICAgICAgICAgcGFyc2VyLmhyZWYgPSBldmVudC51cmw7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlci5zZWFyY2ggfHwgcGFyc2VyLmhhc2gpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBxdWVyeVBhcmFtcyA9IHBhcnNlci5zZWFyY2guc3Vic3RyaW5nKDEpLnJlcGxhY2UoL1xcLyQvLCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFzaFBhcmFtcyA9IHBhcnNlci5oYXNoLnN1YnN0cmluZygxKS5yZXBsYWNlKC9cXC8kLywgJycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhc2ggPSB0aGlzLnBhcnNlUXVlcnlTdHJpbmcoaGFzaFBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcXMgPSB0aGlzLnBhcnNlUXVlcnlTdHJpbmcocXVlcnlQYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFsbFBhcmFtcyA9IHsgLi4ucXMsIC4uLmhhc2ggfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcG9wdXBXaW5kb3cuY2xvc2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFsbFBhcmFtcy5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBhbGxQYXJhbXMuZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKGFsbFBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEVNUFRZO1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgdGFrZSgxKSxcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHBvbGxQb3B1cChwb3B1cFdpbmRvdzogV2luZG93LCByZWRpcmVjdFVyaTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHJlZGlyZWN0VXJpUGFyc2VyOiBIVE1MQW5jaG9yRWxlbWVudCA9IDxIVE1MQW5jaG9yRWxlbWVudD5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICAgICAgcmVkaXJlY3RVcmlQYXJzZXIuaHJlZiA9IHJlZGlyZWN0VXJpO1xyXG5cclxuICAgICAgICBsZXQgcmVkaXJlY3RVcmlQYXRoID0gZ2V0RnVsbFVybFBhdGgocmVkaXJlY3RVcmlQYXJzZXIpO1xyXG5cclxuICAgICAgICByZXR1cm4gaW50ZXJ2YWwoNTApXHJcbiAgICAgICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFwb3B1cFdpbmRvdyB8fCBwb3B1cFdpbmRvdy5jbG9zZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihuZXcgRXJyb3IoJ0F1dGhlbnRpY2F0aW9uIENhbmNlbGVkJykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBwb3B1cFdpbmRvd1BhdGggPSAnJztcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9wdXBXaW5kb3dQYXRoICA9IGdldEZ1bGxVcmxQYXRoKHBvcHVwV2luZG93LmxvY2F0aW9uKTtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWdub3JlIERPTUV4Y2VwdGlvbjogQmxvY2tlZCBhIGZyYW1lIHdpdGggb3JpZ2luIGZyb20gYWNjZXNzaW5nIGEgY3Jvc3Mtb3JpZ2luIGZyYW1lLlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGVycm9yIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uICYmIGVycm9yLm5hbWUgPT09ICdTZWN1cml0eUVycm9yJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHJlZGlyZWN0VXJpUGF0aCA9PT0gcG9wdXBXaW5kb3dQYXRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvcHVwV2luZG93LmxvY2F0aW9uLnNlYXJjaCB8fCBwb3B1cFdpbmRvdy5sb2NhdGlvbi5oYXNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zID0gcG9wdXBXaW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cmluZygxKS5yZXBsYWNlKC9cXC8kLywgJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoYXNoUGFyYW1zID0gcG9wdXBXaW5kb3cubG9jYXRpb24uaGFzaC5zdWJzdHJpbmcoMSkucmVwbGFjZSgvW1xcLyRdLywgJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoYXNoID0gdGhpcy5wYXJzZVF1ZXJ5U3RyaW5nKGhhc2hQYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBxcyA9IHRoaXMucGFyc2VRdWVyeVN0cmluZyhxdWVyeVBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcHVwV2luZG93LmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFsbFBhcmFtcyA9IHsgLi4ucXMsIC4uLmhhc2ggfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFsbFBhcmFtcy5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgYWxsUGFyYW1zLmVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKGFsbFBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihuZXcgRXJyb3IoJ05vIHRva2VuIGZvdW5kIGFmdGVyIHJlZGlyZWN0JykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBFTVBUWTtcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIHRha2UoMSksXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHByZXBhcmVPcHRpb25zKG9wdGlvbnM/OiBJUG9wdXBPcHRpb25zKSB7XHJcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgICAgICAgY29uc3Qgd2lkdGggPSBvcHRpb25zLndpZHRoIHx8IDUwMDtcclxuICAgICAgICBjb25zdCBoZWlnaHQgPSBvcHRpb25zLmhlaWdodCB8fCA1MDA7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgd2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodCxcclxuICAgICAgICAgICAgbGVmdDogd2luZG93LnNjcmVlblggKyAoKHdpbmRvdy5vdXRlcldpZHRoIC0gd2lkdGgpIC8gMiksXHJcbiAgICAgICAgICAgIHRvcDogd2luZG93LnNjcmVlblkgKyAoKHdpbmRvdy5vdXRlckhlaWdodCAtIGhlaWdodCkgLyAyLjUpLFxyXG4gICAgICAgICAgICB0b29sYmFyOiBvcHRpb25zLnZpc2libGVUb29sYmFyID8gJ3llcycgOiAnbm8nLFxyXG4gICAgICAgICAgICAuLi5vcHRpb25zLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdHJpbmdpZnlPcHRpb25zKG9wdGlvbnM6IHsgW2luZGV4OiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuIHwgbnVsbCB8IHVuZGVmaW5lZCB9KSB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC5tYXAoKGtleSkgPT4gb3B0aW9uc1trZXldID09PSBudWxsIHx8IG9wdGlvbnNba2V5XSA9PT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICA/IGtleVxyXG4gICAgICAgICAgICAgICAgOiBrZXkgKyAnPScgKyBvcHRpb25zW2tleV0sXHJcbiAgICAgICAgKS5qb2luKCcsJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwYXJzZVF1ZXJ5U3RyaW5nKGpvaW5lZEtleVZhbHVlOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgICAgIGxldCBrZXk7XHJcbiAgICAgICAgbGV0IHZhbHVlO1xyXG4gICAgICAgIHJldHVybiBqb2luZWRLZXlWYWx1ZS5zcGxpdCgnJicpLnJlZHVjZShcclxuICAgICAgICAgICAgKG9iaiwga2V5VmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChrZXlWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0ga2V5VmFsdWUuc3BsaXQoJz0nKTtcclxuICAgICAgICAgICAgICAgICAgICBrZXkgPSBkZWNvZGVVUklDb21wb25lbnQodmFsdWVbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIG9ialtrZXldID0gdHlwZW9mIHZhbHVlWzFdICE9PSAndW5kZWZpbmVkJyA/IGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZVsxXSkgOiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge30gYXMgeyBbazogc3RyaW5nXTogc3RyaW5nIHwgdHJ1ZSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzQ29yZG92YUFwcCgpIHtcclxuICAgICAgICByZXR1cm4gISEod2luZG93ICYmIChcclxuICAgICAgICAgICAgKHdpbmRvdyBhcyBhbnkpLmNvcmRvdmEgfHxcclxuICAgICAgICAgICAgd2luZG93Lm5hdmlnYXRvciAmJiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCAmJiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdDcmlPUycpID4gLTFcclxuICAgICAgICApKTtcclxuICAgIH1cclxufVxyXG4iXX0=