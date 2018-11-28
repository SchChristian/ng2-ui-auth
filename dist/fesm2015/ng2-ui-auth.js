import { Inject, Injectable, InjectionToken, Injector, NgModule } from '@angular/core';
import { Observable, EMPTY, fromEvent, interval, merge, of, throwError } from 'rxjs';
import { switchMap, take, map, delay, tap } from 'rxjs/operators';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// ngc (Tsickle) doesn't support typescript 2.4 string enums in libraries yet, using consts as a workarount
/** @type {?} */
const NONE = 'none';
/** @type {?} */
const MEMORY = 'memory';
/** @type {?} */
const LOCAL_STORAGE = 'localStorage';
/** @type {?} */
const SESSION_STORAGE = 'sessionStorage';
/** @type {?} */
const COOKIE = 'cookie';
/** @type {?} */
const SESSION_COOKIE = 'sessionCookie';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const CONFIG_OPTIONS = new InjectionToken('config.options');
/** @type {?} */
const defaultOptions = {
    withCredentials: false,
    tokenRoot: null,
    baseUrl: '/',
    loginUrl: '/auth/login',
    signupUrl: '/auth/signup',
    unlinkUrl: '/auth/unlink/',
    tokenName: 'token',
    tokenSeparator: '_',
    tokenPrefix: 'ng2-ui-auth',
    authHeader: 'Authorization',
    authToken: 'Bearer',
    storageType: LOCAL_STORAGE,
    cordova: null,
    resolveToken: (response, config) => {
        /** @type {?} */
        const accessToken = response &&
            (response.access_token || response.token || response.data);
        if (!accessToken) {
            // console.warn('No token found');
            return null;
        }
        if (typeof accessToken === 'string') {
            return accessToken;
        }
        if (typeof accessToken !== 'object') {
            // console.warn('No token found');
            return null;
        }
        /** @type {?} */
        const tokenRootData = config.tokenRoot && config.tokenRoot
            .split('.')
            .reduce((o, x) => {
            return o[x];
        }, accessToken);
        /** @type {?} */
        const token = tokenRootData ? tokenRootData[config.tokenName] : accessToken[config.tokenName];
        if (token) {
            return token;
        }
        // const tokenPath = this.tokenRoot ? this.tokenRoot + '.' + this.tokenName : this.tokenName;
        // console.warn('Expecting a token named "' + tokenPath);
        return null;
    },
    providers: {
        facebook: {
            name: 'facebook',
            url: '/auth/facebook',
            authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
            additionalUrlParams: {
                display: 'popup',
            },
            scope: ['email'],
            scopeDelimiter: ',',
            oauthType: '2.0',
            popupOptions: { width: 580, height: 400 },
        },
        google: {
            name: 'google',
            url: '/auth/google',
            authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
            additionalUrlParams: {
                'display': 'popup',
                'prompt': undefined,
                'login_hint': undefined,
                'access_type': undefined,
                'include_granted_scopes': undefined,
                'openid.realm': undefined,
                'hd': undefined,
            },
            scope: ['openid', 'profile', 'email'],
            scopeDelimiter: ' ',
            oauthType: '2.0',
            popupOptions: { width: 452, height: 633 },
            state: () => encodeURIComponent(Math.random().toString(36).substr(2)),
        },
        github: {
            name: 'github',
            url: '/auth/github',
            authorizationEndpoint: 'https://github.com/login/oauth/authorize',
            scope: ['user:email'],
            scopeDelimiter: ' ',
            oauthType: '2.0',
            popupOptions: { width: 1020, height: 618 },
        },
        instagram: {
            name: 'instagram',
            url: '/auth/instagram',
            authorizationEndpoint: 'https://api.instagram.com/oauth/authorize',
            scope: ['basic'],
            scopeDelimiter: '+',
            oauthType: '2.0',
        },
        linkedin: {
            name: 'linkedin',
            url: '/auth/linkedin',
            authorizationEndpoint: 'https://www.linkedin.com/uas/oauth2/authorization',
            scope: ['r_emailaddress'],
            scopeDelimiter: ' ',
            oauthType: '2.0',
            popupOptions: { width: 527, height: 582 },
            state: 'STATE',
        },
        twitter: {
            name: 'twitter',
            url: '/auth/twitter',
            authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
            oauthType: '1.0',
            popupOptions: { width: 495, height: 645 },
        },
        twitch: {
            name: 'twitch',
            url: '/auth/twitch',
            authorizationEndpoint: 'https://api.twitch.tv/kraken/oauth2/authorize',
            scope: ['user_read'],
            scopeDelimiter: ' ',
            additionalUrlParams: {
                display: 'popup',
            },
            oauthType: '2.0',
            popupOptions: { width: 500, height: 560 },
        },
        live: {
            name: 'live',
            url: '/auth/live',
            authorizationEndpoint: 'https://login.live.com/oauth20_authorize.srf',
            additionalUrlParams: {
                display: 'popup',
            },
            scope: ['wl.emails'],
            scopeDelimiter: ' ',
            oauthType: '2.0',
            popupOptions: { width: 500, height: 560 },
        },
        yahoo: {
            name: 'yahoo',
            url: '/auth/yahoo',
            authorizationEndpoint: 'https://api.login.yahoo.com/oauth2/request_auth',
            scope: [],
            scopeDelimiter: ',',
            oauthType: '2.0',
            popupOptions: { width: 559, height: 519 },
        },
        bitbucket: {
            name: 'bitbucket',
            url: '/auth/bitbucket',
            authorizationEndpoint: 'https://bitbucket.org/site/oauth2/authorize',
            scope: ['email'],
            scopeDelimiter: ',',
            oauthType: '2.0',
            popupOptions: { width: 1028, height: 529 },
        },
        spotify: {
            name: 'spotify',
            url: '/auth/spotify',
            authorizationEndpoint: 'https://accounts.spotify.com/authorize',
            scope: ['', 'user-read-email'],
            scopeDelimiter: ',',
            oauthType: '2.0',
            popupOptions: { width: 500, height: 530 },
            state: () => encodeURIComponent(Math.random().toString(36).substr(2)),
        },
    },
};
class ConfigService {
    /**
     * @param {?} options
     */
    constructor(options) {
        /** @type {?} */
        let optionObj;
        if (typeof options === 'function') {
            optionObj = options();
        }
        else {
            optionObj = options;
        }
        this.options = (/** @type {?} */ (Object.assign({}, defaultOptions, optionObj, { providers: Object.assign({}, optionObj.providers, Object
                .keys(defaultOptions.providers)
                .concat(Object.keys(optionObj.providers || {}))
                .map((key) => optionObj.providers && optionObj.providers[key]
                ? { [key]: Object.assign({}, defaultOptions.providers[key], optionObj.providers[key]) }
                : { [key]: defaultOptions.providers[key] })
                .reduce((acc, next) => (Object.assign({}, acc, next)), {})) })));
    }
}
ConfigService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ConfigService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [CONFIG_OPTIONS,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
class StorageService {
}
/**
 * Created by Ron on 17/12/2015.
 */
class BrowserStorageService extends StorageService {
    /**
     * @param {?} config
     */
    constructor(config) {
        super();
        this.config = config;
        this.store = {};
        this.storageType = MEMORY;
        if (!this.updateStorageType(config.options.storageType)) {
            console.warn(config.options.storageType + ' is not available.');
        }
    }
    /**
     * @param {?} storageType
     * @return {?}
     */
    updateStorageType(storageType) {
        /** @type {?} */
        const isStorageAvailable = this.checkIsStorageAvailable(storageType);
        if (!isStorageAvailable) {
            return false;
        }
        this.storageType = storageType;
        return true;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    get(key) {
        switch (this.storageType) {
            case COOKIE:
            case SESSION_COOKIE:
                return this.getCookie(key);
            case LOCAL_STORAGE:
            case SESSION_STORAGE:
                return window[this.storageType].getItem(key);
            case MEMORY:
                return this.store[key];
            case NONE:
            default:
                return null;
        }
    }
    /**
     * @param {?} key
     * @param {?} value
     * @param {?} date
     * @return {?}
     */
    set(key, value, date) {
        switch (this.storageType) {
            case COOKIE:
            case SESSION_COOKIE:
                this.setCookie(key, value, this.storageType === COOKIE ? date : '');
                break;
            case LOCAL_STORAGE:
            case SESSION_STORAGE:
                window[this.storageType].setItem(key, value);
                break;
            case MEMORY:
                this.store[key] = value;
                break;
            case NONE:
            default:
                break;
        }
    }
    /**
     * @param {?} key
     * @return {?}
     */
    remove(key) {
        switch (this.storageType) {
            case COOKIE:
            case SESSION_COOKIE:
                this.removeCookie(key);
                break;
            case LOCAL_STORAGE:
            case SESSION_STORAGE:
                window[this.storageType].removeItem(key);
                break;
            case MEMORY:
                delete this.store[key];
                break;
            case NONE:
            default:
                break;
        }
    }
    /**
     * @private
     * @param {?} storageType
     * @return {?}
     */
    checkIsStorageAvailable(storageType) {
        switch (storageType) {
            case COOKIE:
            case SESSION_COOKIE:
                return this.isCookieStorageAvailable();
            case LOCAL_STORAGE:
            case SESSION_STORAGE:
                return this.isWindowStorageAvailable(storageType);
            case NONE:
            case MEMORY:
                return true;
            default:
                return false;
        }
    }
    /**
     * @private
     * @param {?} storageType
     * @return {?}
     */
    isWindowStorageAvailable(storageType) {
        try {
            /** @type {?} */
            const supported = window && storageType in window && window[storageType] !== null;
            if (supported) {
                /** @type {?} */
                const key = Math.random().toString(36).substring(7);
                window[storageType].setItem(key, '');
                window[storageType].removeItem(key);
            }
            return supported;
        }
        catch (e) {
            return false;
        }
    }
    /**
     * @private
     * @return {?}
     */
    isCookieStorageAvailable() {
        try {
            /** @type {?} */
            const supported = document && 'cookie' in document;
            if (supported) {
                /** @type {?} */
                const key = Math.random().toString(36).substring(7);
                this.setCookie(key, 'test', new Date(Date.now() + 60 * 1000).toUTCString());
                /** @type {?} */
                const value = this.getCookie(key);
                this.removeCookie(key);
                return value === 'test';
            }
            return false;
        }
        catch (e) {
            return false;
        }
    }
    /**
     * @private
     * @param {?} key
     * @param {?} value
     * @param {?=} expires
     * @param {?=} path
     * @return {?}
     */
    setCookie(key, value, expires = '', path = '/') {
        document.cookie = `${key}=${value}${expires ? `; expires=${expires}` : ''}; path=${path}`;
    }
    /**
     * @private
     * @param {?} key
     * @param {?=} path
     * @return {?}
     */
    removeCookie(key, path = '/') {
        this.setCookie(key, '', new Date(0).toUTCString(), path);
    }
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    getCookie(key) {
        return document.cookie.replace(new RegExp(`(?:(?:^|.*;\\s*)${key}\\s*\\=\\s*([^;]*).*$)|^.*$`), '$1');
    }
}
BrowserStorageService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
BrowserStorageService.ctorParameters = () => [
    { type: ConfigService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Created by Ron on 17/12/2015.
 */
class SharedService {
    /**
     * @param {?} storage
     * @param {?} config
     */
    constructor(storage, config) {
        this.storage = storage;
        this.config = config;
        this.tokenName = this.config.options.tokenPrefix
            ? [this.config.options.tokenPrefix, this.config.options.tokenName].join(this.config.options.tokenSeparator)
            : this.config.options.tokenName;
    }
    /**
     * @return {?}
     */
    getToken() {
        return this.storage.get(this.tokenName);
    }
    /**
     * @param {?=} token
     * @return {?}
     */
    getPayload(token = this.getToken()) {
        if (token && token.split('.').length === 3) {
            try {
                /** @type {?} */
                const base64Url = token.split('.')[1];
                /** @type {?} */
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                return JSON.parse(this.b64DecodeUnicode(base64));
            }
            catch (e) {
                return undefined;
            }
        }
    }
    /**
     * @param {?} response
     * @return {?}
     */
    setToken(response) {
        if (!response) {
            // console.warn('Can\'t set token without passing a value');
            return;
        }
        /** @type {?} */
        let token;
        if (typeof response === 'string') {
            token = response;
        }
        else {
            token = this.config.options.resolveToken(response, this.config.options);
        }
        if (token) {
            /** @type {?} */
            const expDate = this.getExpirationDate(token);
            this.storage.set(this.tokenName, token, expDate ? expDate.toUTCString() : '');
        }
    }
    /**
     * @return {?}
     */
    removeToken() {
        this.storage.remove(this.tokenName);
    }
    /**
     * @param {?=} token
     * @return {?}
     */
    isAuthenticated(token = this.getToken()) {
        // a token is present
        if (token) {
            // token with a valid JWT format XXX.YYY.ZZZ
            if (token.split('.').length === 3) {
                // could be a valid JWT or an access token with the same format
                try {
                    /** @type {?} */
                    const base64Url = token.split('.')[1];
                    /** @type {?} */
                    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    /** @type {?} */
                    const exp = JSON.parse(this.b64DecodeUnicode(base64)).exp;
                    // jwt with an optional expiration claims
                    if (exp) {
                        /** @type {?} */
                        const isExpired = Math.round(new Date().getTime() / 1000) >= exp;
                        if (isExpired) {
                            // fail: Expired token
                            this.storage.remove(this.tokenName);
                            return false;
                        }
                        else {
                            // pass: Non-expired token
                            return true;
                        }
                    }
                }
                catch (e) {
                    // pass: Non-JWT token that looks like JWT
                    return true;
                }
            }
            // pass: All other tokens
            return true;
        }
        // lail: No token at all
        return false;
    }
    /**
     * @param {?=} token
     * @return {?}
     */
    getExpirationDate(token = this.getToken()) {
        /** @type {?} */
        const payload = this.getPayload(token);
        if (payload && payload.exp && Math.round(new Date().getTime() / 1000) < payload.exp) {
            /** @type {?} */
            const date = new Date(0);
            date.setUTCSeconds(payload.exp);
            return date;
        }
        return null;
    }
    /**
     * @return {?}
     */
    logout() {
        return Observable.create((observer) => {
            this.storage.remove(this.tokenName);
            observer.next();
            observer.complete();
        });
    }
    /**
     * @param {?} type
     * @return {?}
     */
    setStorageType(type) {
        return this.storage.updateStorageType(type);
    }
    /**
     * @private
     * @param {?} str
     * @return {?}
     */
    b64DecodeUnicode(str) {
        return decodeURIComponent(Array.prototype.map.call(atob(str), c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    }
}
SharedService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
SharedService.ctorParameters = () => [
    { type: StorageService },
    { type: ConfigService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Created by Ron on 17/12/2015.
 */
/**
 * @param {?} baseUrl
 * @param {?} url
 * @return {?}
 */
function joinUrl(baseUrl, url) {
    if (/^(?:[a-z]+:)?\/\//i.test(url)) {
        return url;
    }
    /** @type {?} */
    let joined = [baseUrl, url].join('/');
    /** @type {?} */
    let normalize = function (str) {
        return str
            .replace(/[\/]+/g, '/')
            .replace(/\/\?/g, '?')
            .replace(/\/\#/g, '#')
            .replace(/\:\//g, '://');
    };
    return normalize(joined);
}
/**
 * @param {?} obj
 * @return {?}
 */
function buildQueryString(obj) {
    return Object
        .keys(obj)
        .map((key) => !!obj[key] ? `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}` : key)
        .join('&');
}
/**
 * @param {?=} w
 * @return {?}
 */
function getWindowOrigin(w = window) {
    try {
        if (!w || !w.location) {
            return null;
        }
        if (!w.location.origin) {
            return `${w.location.protocol}//${w.location.hostname}${w.location.port ? ':' + w.location.port : ''}`;
        }
        return w.location.origin;
    }
    catch (error) {
        return null;
        // ignore DOMException: Blocked a frame with origin from accessing a cross-origin frame.
        // error instanceof DOMException && error.name === 'SecurityError'
    }
}
/**
 * @param {?} location
 * @return {?}
 */
function getFullUrlPath(location) {
    if (!location.protocol) {
        /** @type {?} */
        let temp = document.createElement('a');
        temp.href = location.href;
        location = temp;
    }
    return location.protocol + '//' + location.hostname
        + (location.port && location.port !== '80' && location.port !== '443' ? location.port : '') // Append the port only when it's not the default Port
        + (/^\//.test(location.pathname) ? location.pathname : '/' + location.pathname);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Created by Ron on 17/12/2015.
 */
class PopupService {
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
        let redirectUriParser = (/** @type {?} */ (document.createElement('a')));
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
     * @private
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
     * @private
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
     * @private
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
        }, (/** @type {?} */ ({})));
    }
    /**
     * @private
     * @return {?}
     */
    isCordovaApp() {
        return !!(window && (((/** @type {?} */ (window))).cordova ||
            window.navigator && window.navigator.userAgent && window.navigator.userAgent.indexOf('CriOS') > -1));
    }
}
PopupService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Created by Ron on 17/12/2015.
 */
class Oauth1Service {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Created by Ron on 17/12/2015.
 */
class Oauth2Service {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Created by Ron on 17/12/2015.
 */
class OauthService {
    /**
     * @param {?} http
     * @param {?} shared
     * @param {?} config
     * @param {?} popup
     */
    constructor(http, shared, config, popup) {
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
    authenticate(name, userData) {
        /** @type {?} */
        const provider = this.config.options.providers[name].oauthType === '1.0'
            ? Injector.create([
                ...this.depProviders,
                { provide: Oauth1Service, deps: this.deps },
            ]).get(Oauth1Service)
            : Injector.create([
                ...this.depProviders,
                { provide: Oauth2Service, deps: this.deps },
            ]).get(Oauth2Service);
        return provider.open(this.config.options.providers[name], userData || {})
            .pipe(tap((response) => {
            // this is for a scenario when someone wishes to opt out from
            // satellizer's magic by doing authorization code exchange and
            // saving a token manually.
            if (this.config.options.providers[name].url) {
                this.shared.setToken(response);
            }
        }));
    }
    /**
     * @template T
     * @param {?} provider
     * @param {?=} url
     * @param {?=} method
     * @return {?}
     */
    unlink(provider, url = joinUrl(this.config.options.baseUrl, this.config.options.unlinkUrl), method = 'POST') {
        return this.http.request(method, url, { body: { provider } });
    }
}
OauthService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
OauthService.ctorParameters = () => [
    { type: HttpClient },
    { type: SharedService },
    { type: ConfigService },
    { type: PopupService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Created by Ron on 17/12/2015.
 */
class LocalService {
    /**
     * @param {?} http
     * @param {?} shared
     * @param {?} config
     */
    constructor(http, shared, config) {
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
    login(user, url) {
        return this.http.post(url || joinUrl(this.config.options.baseUrl, this.config.options.loginUrl), user)
            .pipe(tap((data) => this.shared.setToken(data)));
    }
    /**
     * @template T
     * @param {?} user
     * @param {?=} url
     * @return {?}
     */
    signup(user, url) {
        return this.http.post(url || joinUrl(this.config.options.baseUrl, this.config.options.signupUrl), user);
    }
}
LocalService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
LocalService.ctorParameters = () => [
    { type: HttpClient },
    { type: SharedService },
    { type: ConfigService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Created by Ron on 17/12/2015.
 */
class AuthService {
    /**
     * @param {?} shared
     * @param {?} local
     * @param {?} oauth
     */
    constructor(shared, local, oauth) {
        this.shared = shared;
        this.local = local;
        this.oauth = oauth;
    }
    /**
     * @template T
     * @param {?} user
     * @param {?=} url
     * @return {?}
     */
    login(user, url) {
        return this.local.login(user, url);
    }
    /**
     * @template T
     * @param {?} user
     * @param {?=} url
     * @return {?}
     */
    signup(user, url) {
        return this.local.signup(user, url);
    }
    /**
     * @return {?}
     */
    logout() {
        return this.shared.logout();
    }
    /**
     * @template T
     * @param {?} name
     * @param {?=} userData
     * @return {?}
     */
    authenticate(name, userData) {
        return this.oauth.authenticate(name, userData);
    }
    /**
     * @template T
     * @param {?} name
     * @param {?=} userData
     * @return {?}
     */
    link(name, userData) {
        return this.oauth.authenticate(name, userData);
    }
    /**
     * @template T
     * @param {?} provider
     * @param {?=} url
     * @return {?}
     */
    unlink(provider, url) {
        return this.oauth.unlink(provider, url);
    }
    /**
     * @return {?}
     */
    isAuthenticated() {
        return this.shared.isAuthenticated();
    }
    /**
     * @return {?}
     */
    getToken() {
        return this.shared.getToken();
    }
    /**
     * @param {?} token
     * @return {?}
     */
    setToken(token) {
        this.shared.setToken(token);
    }
    /**
     * @return {?}
     */
    removeToken() {
        this.shared.removeToken();
    }
    /**
     * @return {?}
     */
    getPayload() {
        return this.shared.getPayload();
    }
    /**
     * @param {?} type
     * @return {?}
     */
    setStorageType(type) {
        return this.shared.setStorageType(type);
    }
    /**
     * @return {?}
     */
    getExpirationDate() {
        return this.shared.getExpirationDate();
    }
}
AuthService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
AuthService.ctorParameters = () => [
    { type: SharedService },
    { type: LocalService },
    { type: OauthService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class JwtInterceptor {
    /**
     * @param {?} shared
     * @param {?} config
     */
    constructor(shared, config) {
        this.shared = shared;
        this.config = config;
    }
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    intercept(req, next) {
        const { authHeader, authToken } = this.config.options;
        /** @type {?} */
        const token = this.shared.getToken();
        /** @type {?} */
        const isAuthenticated = this.shared.isAuthenticated;
        /** @type {?} */
        const newReq = isAuthenticated && !req.headers.has(authHeader)
            ? req.clone({ setHeaders: { [authHeader]: `${authToken} ${token}` } })
            : req;
        return next.handle(newReq);
    }
}
JwtInterceptor.decorators = [
    { type: Injectable }
];
/** @nocollapse */
JwtInterceptor.ctorParameters = () => [
    { type: SharedService },
    { type: ConfigService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Ng2UiAuthModule {
    /**
     * @param {?=} configOptions
     * @param {?=} defaultJwtInterceptor
     * @return {?}
     */
    static forRoot(configOptions, defaultJwtInterceptor = true) {
        return {
            ngModule: Ng2UiAuthModule,
            providers: [
                ...configOptions ? [{ provide: CONFIG_OPTIONS, useValue: configOptions }] : [],
                { provide: ConfigService, useClass: ConfigService, deps: [CONFIG_OPTIONS] },
                { provide: StorageService, useClass: BrowserStorageService, deps: [ConfigService] },
                { provide: SharedService, useClass: SharedService, deps: [StorageService, ConfigService] },
                ...defaultJwtInterceptor ? [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true, deps: [SharedService, ConfigService] }] : [],
                { provide: OauthService, useClass: OauthService, deps: [HttpClient, SharedService, ConfigService, PopupService] },
                { provide: PopupService, useClass: PopupService, deps: [ConfigService] },
                { provide: LocalService, useClass: LocalService, deps: [HttpClient, SharedService, ConfigService] },
                { provide: AuthService, useClass: AuthService, deps: [SharedService, LocalService, OauthService] },
            ],
        };
    }
}
Ng2UiAuthModule.decorators = [
    { type: NgModule, args: [{ imports: [HttpClientModule] },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { Ng2UiAuthModule, LocalService, Oauth2Service, Oauth1Service, PopupService, OauthService, SharedService, StorageService, BrowserStorageService, AuthService, ConfigService, JwtInterceptor, CONFIG_OPTIONS };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLXVpLWF1dGguanMubWFwIiwic291cmNlcyI6WyJuZzovL25nMi11aS1hdXRoL3N0b3JhZ2UtdHlwZS5lbnVtLnRzIiwibmc6Ly9uZzItdWktYXV0aC9jb25maWcuc2VydmljZS50cyIsIm5nOi8vbmcyLXVpLWF1dGgvc3RvcmFnZS5zZXJ2aWNlLnRzIiwibmc6Ly9uZzItdWktYXV0aC9zaGFyZWQuc2VydmljZS50cyIsIm5nOi8vbmcyLXVpLWF1dGgvdXRpbHMudHMiLCJuZzovL25nMi11aS1hdXRoL3BvcHVwLnNlcnZpY2UudHMiLCJuZzovL25nMi11aS1hdXRoL29hdXRoMS5zZXJ2aWNlLnRzIiwibmc6Ly9uZzItdWktYXV0aC9vYXV0aDIuc2VydmljZS50cyIsIm5nOi8vbmcyLXVpLWF1dGgvb2F1dGguc2VydmljZS50cyIsIm5nOi8vbmcyLXVpLWF1dGgvbG9jYWwuc2VydmljZS50cyIsIm5nOi8vbmcyLXVpLWF1dGgvYXV0aC5zZXJ2aWNlLnRzIiwibmc6Ly9uZzItdWktYXV0aC9pbnRlcmNlcHRvci5zZXJ2aWNlLnRzIiwibmc6Ly9uZzItdWktYXV0aC9uZzItdWktYXV0aC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gbmdjIChUc2lja2xlKSBkb2Vzbid0IHN1cHBvcnQgdHlwZXNjcmlwdCAyLjQgc3RyaW5nIGVudW1zIGluIGxpYnJhcmllcyB5ZXQsIHVzaW5nIGNvbnN0cyBhcyBhIHdvcmthcm91bnRcclxuZXhwb3J0IGNvbnN0IE5PTkUgPSAnbm9uZSc7XHJcbmV4cG9ydCBjb25zdCBNRU1PUlkgPSAnbWVtb3J5JztcclxuZXhwb3J0IGNvbnN0IExPQ0FMX1NUT1JBR0UgPSAnbG9jYWxTdG9yYWdlJztcclxuZXhwb3J0IGNvbnN0IFNFU1NJT05fU1RPUkFHRSA9ICdzZXNzaW9uU3RvcmFnZSc7XHJcbmV4cG9ydCBjb25zdCBDT09LSUUgPSAnY29va2llJztcclxuZXhwb3J0IGNvbnN0IFNFU1NJT05fQ09PS0lFID0gJ3Nlc3Npb25Db29raWUnO1xyXG5cclxuZXhwb3J0IHR5cGUgU3RvcmFnZVR5cGUgPSB0eXBlb2YgTk9ORSB8IHR5cGVvZiBNRU1PUllcclxuICAgIHwgdHlwZW9mIExPQ0FMX1NUT1JBR0UgfCB0eXBlb2YgU0VTU0lPTl9TVE9SQUdFXHJcbiAgICB8IHR5cGVvZiBDT09LSUUgfCB0eXBlb2YgU0VTU0lPTl9DT09LSUU7XHJcbiIsImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3RvcmFnZVR5cGUsIExPQ0FMX1NUT1JBR0UgfSBmcm9tICcuL3N0b3JhZ2UtdHlwZS5lbnVtJztcclxuaW1wb3J0IHsgSVBhcnRpYWxDb25maWdPcHRpb25zIH0gZnJvbSAnLi9uZzItdWktYXV0aC5tb2R1bGUnO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgUm9uIG9uIDE3LzEyLzIwMTUuXHJcbiAqL1xyXG5leHBvcnQgdHlwZSBDb25maWdPcHRpb25zID0gSVBhcnRpYWxDb25maWdPcHRpb25zIHwgRnVuY3Rpb247XHJcblxyXG5leHBvcnQgY29uc3QgQ09ORklHX09QVElPTlMgPSBuZXcgSW5qZWN0aW9uVG9rZW48YW55PignY29uZmlnLm9wdGlvbnMnKTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVBvcHVwT3B0aW9ucyB7XHJcbiAgICB3aWR0aD86IG51bWJlcjtcclxuICAgIGhlaWdodD86IG51bWJlcjtcclxuICAgIGxlZnQ/OiBudW1iZXI7XHJcbiAgICB0b3A/OiBudW1iZXI7XHJcbiAgICB2aXNpYmxlVG9vbGJhcj86IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU9hdXRoMU9wdGlvbnMge1xyXG4gICAgdXJsPzogc3RyaW5nO1xyXG4gICAgbmFtZT86IHN0cmluZztcclxuICAgIHJlZGlyZWN0VXJpPzogc3RyaW5nO1xyXG4gICAgcG9wdXBPcHRpb25zPzogSVBvcHVwT3B0aW9ucztcclxuICAgIGF1dGhvcml6YXRpb25FbmRwb2ludD86IHN0cmluZztcclxuICAgIG9hdXRoVHlwZT86ICcxLjAnO1xyXG4gICAgbWV0aG9kPzogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElPYXV0aDJPcHRpb25zIHtcclxuICAgIHVybD86IHN0cmluZztcclxuICAgIG5hbWU/OiBzdHJpbmc7XHJcbiAgICByZWRpcmVjdFVyaT86IHN0cmluZztcclxuICAgIHBvcHVwT3B0aW9ucz86IElQb3B1cE9wdGlvbnM7XHJcbiAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ/OiBzdHJpbmc7XHJcbiAgICBvYXV0aFR5cGU/OiAnMi4wJztcclxuICAgIG1ldGhvZD86IHN0cmluZztcclxuICAgIHJlc3BvbnNlVHlwZT86IHN0cmluZztcclxuICAgIGNsaWVudElkPzogc3RyaW5nO1xyXG4gICAgYWRkaXRpb25hbFVybFBhcmFtcz86IHtcclxuICAgICAgICBbcGFyYW1OYW1lOiBzdHJpbmddOiBzdHJpbmcgfCAoKCkgPT4gc3RyaW5nKSB8IG51bGwgfCB1bmRlZmluZWQ7XHJcbiAgICB9O1xyXG4gICAgc2NvcGVEZWxpbWl0ZXI/OiBzdHJpbmc7XHJcbiAgICBzY29wZT86IHN0cmluZ1tdO1xyXG4gICAgc3RhdGU/OiBzdHJpbmcgfCAoKCkgPT4gc3RyaW5nKTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUHJvdmlkZXJzIHtcclxuICAgIFtwcm92aWRlcjogc3RyaW5nXTogSU9hdXRoMk9wdGlvbnMgfCBJT2F1dGgxT3B0aW9ucztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQ29uZmlnT3B0aW9ucyB7XHJcbiAgICB0b2tlblJvb3Q6IHN0cmluZyB8IG51bGw7XHJcbiAgICBjb3Jkb3ZhOiBib29sZWFuIHwgbnVsbDtcclxuICAgIGJhc2VVcmw6IHN0cmluZztcclxuICAgIGxvZ2luVXJsOiBzdHJpbmc7XHJcbiAgICBzaWdudXBVcmw6IHN0cmluZztcclxuICAgIHVubGlua1VybDogc3RyaW5nO1xyXG4gICAgdG9rZW5OYW1lOiBzdHJpbmc7XHJcbiAgICB0b2tlblNlcGFyYXRvcjogc3RyaW5nO1xyXG4gICAgdG9rZW5QcmVmaXg6IHN0cmluZztcclxuICAgIGF1dGhUb2tlbjogc3RyaW5nO1xyXG4gICAgYXV0aEhlYWRlcjogc3RyaW5nO1xyXG4gICAgc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlO1xyXG4gICAgcHJvdmlkZXJzOiBJUHJvdmlkZXJzO1xyXG4gICAgd2l0aENyZWRlbnRpYWxzOiBib29sZWFuO1xyXG4gICAgcmVzb2x2ZVRva2VuOiAocmVzcG9uc2U6IGFueSwgY29uZmlnOiBJQ29uZmlnT3B0aW9ucykgPT4gc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElQYXJ0aWFsQ29uZmlnT3B0aW9ucyB7IC8vID0gUGFydGlhbDxJQ29uZmlnT3B0aW9uc1xyXG4gICAgdG9rZW5Sb290Pzogc3RyaW5nIHwgbnVsbDtcclxuICAgIGNvcmRvdmE/OiBib29sZWFuIHwgbnVsbDtcclxuICAgIGJhc2VVcmw/OiBzdHJpbmc7XHJcbiAgICBsb2dpblVybD86IHN0cmluZztcclxuICAgIHNpZ251cFVybD86IHN0cmluZztcclxuICAgIHVubGlua1VybD86IHN0cmluZztcclxuICAgIHRva2VuTmFtZT86IHN0cmluZztcclxuICAgIHRva2VuU2VwYXJhdG9yPzogc3RyaW5nO1xyXG4gICAgdG9rZW5QcmVmaXg/OiBzdHJpbmc7XHJcbiAgICBhdXRoVG9rZW4/OiBzdHJpbmc7XHJcbiAgICBhdXRoSGVhZGVyPzogc3RyaW5nO1xyXG4gICAgc3RvcmFnZVR5cGU/OiBTdG9yYWdlVHlwZTtcclxuICAgIHByb3ZpZGVycz86IElQcm92aWRlcnM7XHJcbiAgICB3aXRoQ3JlZGVudGlhbHM/OiBib29sZWFuO1xyXG4gICAgcmVzb2x2ZVRva2VuPzogKHJlc3BvbnNlOiBhbnksIGNvbmZpZzogSUNvbmZpZ09wdGlvbnMpID0+IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGRlZmF1bHRPcHRpb25zOiBJQ29uZmlnT3B0aW9ucyA9IHtcclxuICAgIHdpdGhDcmVkZW50aWFsczogZmFsc2UsXHJcbiAgICB0b2tlblJvb3Q6IG51bGwsXHJcbiAgICBiYXNlVXJsOiAnLycsXHJcbiAgICBsb2dpblVybDogJy9hdXRoL2xvZ2luJyxcclxuICAgIHNpZ251cFVybDogJy9hdXRoL3NpZ251cCcsXHJcbiAgICB1bmxpbmtVcmw6ICcvYXV0aC91bmxpbmsvJyxcclxuICAgIHRva2VuTmFtZTogJ3Rva2VuJyxcclxuICAgIHRva2VuU2VwYXJhdG9yOiAnXycsXHJcbiAgICB0b2tlblByZWZpeDogJ25nMi11aS1hdXRoJyxcclxuICAgIGF1dGhIZWFkZXI6ICdBdXRob3JpemF0aW9uJyxcclxuICAgIGF1dGhUb2tlbjogJ0JlYXJlcicsXHJcbiAgICBzdG9yYWdlVHlwZTogTE9DQUxfU1RPUkFHRSxcclxuICAgIGNvcmRvdmE6IG51bGwsXHJcbiAgICByZXNvbHZlVG9rZW46IChyZXNwb25zZTogYW55LCBjb25maWc6IElDb25maWdPcHRpb25zKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYWNjZXNzVG9rZW46IHN0cmluZyB8IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gfCBudWxsIHwgdW5kZWZpbmVkID0gcmVzcG9uc2UgJiZcclxuICAgICAgICAgICAgKHJlc3BvbnNlLmFjY2Vzc190b2tlbiB8fCByZXNwb25zZS50b2tlbiB8fCByZXNwb25zZS5kYXRhKTtcclxuICAgICAgICBpZiAoIWFjY2Vzc1Rva2VuKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUud2FybignTm8gdG9rZW4gZm91bmQnKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgYWNjZXNzVG9rZW4gPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2Nlc3NUb2tlbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBhY2Nlc3NUb2tlbiAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS53YXJuKCdObyB0b2tlbiBmb3VuZCcpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgdG9rZW5Sb290RGF0YSA9IGNvbmZpZy50b2tlblJvb3QgJiYgY29uZmlnLnRva2VuUm9vdFxyXG4gICAgICAgICAgICAuc3BsaXQoJy4nKVxyXG4gICAgICAgICAgICAucmVkdWNlKFxyXG4gICAgICAgICAgICAobzogYW55LCB4OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvW3hdO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhY2Nlc3NUb2tlbik7XHJcbiAgICAgICAgY29uc3QgdG9rZW4gPSB0b2tlblJvb3REYXRhID8gdG9rZW5Sb290RGF0YVtjb25maWcudG9rZW5OYW1lXSA6IGFjY2Vzc1Rva2VuW2NvbmZpZy50b2tlbk5hbWVdO1xyXG4gICAgICAgIGlmICh0b2tlbikge1xyXG4gICAgICAgICAgICByZXR1cm4gdG9rZW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnN0IHRva2VuUGF0aCA9IHRoaXMudG9rZW5Sb290ID8gdGhpcy50b2tlblJvb3QgKyAnLicgKyB0aGlzLnRva2VuTmFtZSA6IHRoaXMudG9rZW5OYW1lO1xyXG4gICAgICAgIC8vIGNvbnNvbGUud2FybignRXhwZWN0aW5nIGEgdG9rZW4gbmFtZWQgXCInICsgdG9rZW5QYXRoKTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcbiAgICBwcm92aWRlcnM6IHtcclxuICAgICAgICBmYWNlYm9vazoge1xyXG4gICAgICAgICAgICBuYW1lOiAnZmFjZWJvb2snLFxyXG4gICAgICAgICAgICB1cmw6ICcvYXV0aC9mYWNlYm9vaycsXHJcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS92Mi41L2RpYWxvZy9vYXV0aCcsXHJcbiAgICAgICAgICAgIGFkZGl0aW9uYWxVcmxQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdwb3B1cCcsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNjb3BlOiBbJ2VtYWlsJ10sXHJcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyOiAnLCcsXHJcbiAgICAgICAgICAgIG9hdXRoVHlwZTogJzIuMCcsXHJcbiAgICAgICAgICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNTgwLCBoZWlnaHQ6IDQwMCB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ29vZ2xlOiB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdnb29nbGUnLFxyXG4gICAgICAgICAgICB1cmw6ICcvYXV0aC9nb29nbGUnLFxyXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vby9vYXV0aDIvYXV0aCcsXHJcbiAgICAgICAgICAgIGFkZGl0aW9uYWxVcmxQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICdkaXNwbGF5JzogJ3BvcHVwJyxcclxuICAgICAgICAgICAgICAgICdwcm9tcHQnOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAnbG9naW5faGludCc6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICdhY2Nlc3NfdHlwZSc6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICdpbmNsdWRlX2dyYW50ZWRfc2NvcGVzJzogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgJ29wZW5pZC5yZWFsbSc6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICdoZCc6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2NvcGU6IFsnb3BlbmlkJywgJ3Byb2ZpbGUnLCAnZW1haWwnXSxcclxuICAgICAgICAgICAgc2NvcGVEZWxpbWl0ZXI6ICcgJyxcclxuICAgICAgICAgICAgb2F1dGhUeXBlOiAnMi4wJyxcclxuICAgICAgICAgICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA0NTIsIGhlaWdodDogNjMzIH0sXHJcbiAgICAgICAgICAgIHN0YXRlOiAoKSA9PiBlbmNvZGVVUklDb21wb25lbnQoTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIpKSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdpdGh1Yjoge1xyXG4gICAgICAgICAgICBuYW1lOiAnZ2l0aHViJyxcclxuICAgICAgICAgICAgdXJsOiAnL2F1dGgvZ2l0aHViJyxcclxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9naXRodWIuY29tL2xvZ2luL29hdXRoL2F1dGhvcml6ZScsXHJcbiAgICAgICAgICAgIHNjb3BlOiBbJ3VzZXI6ZW1haWwnXSxcclxuICAgICAgICAgICAgc2NvcGVEZWxpbWl0ZXI6ICcgJyxcclxuICAgICAgICAgICAgb2F1dGhUeXBlOiAnMi4wJyxcclxuICAgICAgICAgICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiAxMDIwLCBoZWlnaHQ6IDYxOCB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5zdGFncmFtOiB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdpbnN0YWdyYW0nLFxyXG4gICAgICAgICAgICB1cmw6ICcvYXV0aC9pbnN0YWdyYW0nLFxyXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2FwaS5pbnN0YWdyYW0uY29tL29hdXRoL2F1dGhvcml6ZScsXHJcbiAgICAgICAgICAgIHNjb3BlOiBbJ2Jhc2ljJ10sXHJcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyOiAnKycsXHJcbiAgICAgICAgICAgIG9hdXRoVHlwZTogJzIuMCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsaW5rZWRpbjoge1xyXG4gICAgICAgICAgICBuYW1lOiAnbGlua2VkaW4nLFxyXG4gICAgICAgICAgICB1cmw6ICcvYXV0aC9saW5rZWRpbicsXHJcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS91YXMvb2F1dGgyL2F1dGhvcml6YXRpb24nLFxyXG4gICAgICAgICAgICBzY29wZTogWydyX2VtYWlsYWRkcmVzcyddLFxyXG4gICAgICAgICAgICBzY29wZURlbGltaXRlcjogJyAnLFxyXG4gICAgICAgICAgICBvYXV0aFR5cGU6ICcyLjAnLFxyXG4gICAgICAgICAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDUyNywgaGVpZ2h0OiA1ODIgfSxcclxuICAgICAgICAgICAgc3RhdGU6ICdTVEFURScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0d2l0dGVyOiB7XHJcbiAgICAgICAgICAgIG5hbWU6ICd0d2l0dGVyJyxcclxuICAgICAgICAgICAgdXJsOiAnL2F1dGgvdHdpdHRlcicsXHJcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vYXBpLnR3aXR0ZXIuY29tL29hdXRoL2F1dGhlbnRpY2F0ZScsXHJcbiAgICAgICAgICAgIG9hdXRoVHlwZTogJzEuMCcsXHJcbiAgICAgICAgICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNDk1LCBoZWlnaHQ6IDY0NSB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdHdpdGNoOiB7XHJcbiAgICAgICAgICAgIG5hbWU6ICd0d2l0Y2gnLFxyXG4gICAgICAgICAgICB1cmw6ICcvYXV0aC90d2l0Y2gnLFxyXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2FwaS50d2l0Y2gudHYva3Jha2VuL29hdXRoMi9hdXRob3JpemUnLFxyXG4gICAgICAgICAgICBzY29wZTogWyd1c2VyX3JlYWQnXSxcclxuICAgICAgICAgICAgc2NvcGVEZWxpbWl0ZXI6ICcgJyxcclxuICAgICAgICAgICAgYWRkaXRpb25hbFVybFBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ3BvcHVwJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb2F1dGhUeXBlOiAnMi4wJyxcclxuICAgICAgICAgICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA1MDAsIGhlaWdodDogNTYwIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsaXZlOiB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdsaXZlJyxcclxuICAgICAgICAgICAgdXJsOiAnL2F1dGgvbGl2ZScsXHJcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vbG9naW4ubGl2ZS5jb20vb2F1dGgyMF9hdXRob3JpemUuc3JmJyxcclxuICAgICAgICAgICAgYWRkaXRpb25hbFVybFBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ3BvcHVwJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2NvcGU6IFsnd2wuZW1haWxzJ10sXHJcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyOiAnICcsXHJcbiAgICAgICAgICAgIG9hdXRoVHlwZTogJzIuMCcsXHJcbiAgICAgICAgICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNTAwLCBoZWlnaHQ6IDU2MCB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeWFob286IHtcclxuICAgICAgICAgICAgbmFtZTogJ3lhaG9vJyxcclxuICAgICAgICAgICAgdXJsOiAnL2F1dGgveWFob28nLFxyXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2FwaS5sb2dpbi55YWhvby5jb20vb2F1dGgyL3JlcXVlc3RfYXV0aCcsXHJcbiAgICAgICAgICAgIHNjb3BlOiBbXSxcclxuICAgICAgICAgICAgc2NvcGVEZWxpbWl0ZXI6ICcsJyxcclxuICAgICAgICAgICAgb2F1dGhUeXBlOiAnMi4wJyxcclxuICAgICAgICAgICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA1NTksIGhlaWdodDogNTE5IH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaXRidWNrZXQ6IHtcclxuICAgICAgICAgICAgbmFtZTogJ2JpdGJ1Y2tldCcsXHJcbiAgICAgICAgICAgIHVybDogJy9hdXRoL2JpdGJ1Y2tldCcsXHJcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vYml0YnVja2V0Lm9yZy9zaXRlL29hdXRoMi9hdXRob3JpemUnLFxyXG4gICAgICAgICAgICBzY29wZTogWydlbWFpbCddLFxyXG4gICAgICAgICAgICBzY29wZURlbGltaXRlcjogJywnLFxyXG4gICAgICAgICAgICBvYXV0aFR5cGU6ICcyLjAnLFxyXG4gICAgICAgICAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDEwMjgsIGhlaWdodDogNTI5IH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzcG90aWZ5OiB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdzcG90aWZ5JyxcclxuICAgICAgICAgICAgdXJsOiAnL2F1dGgvc3BvdGlmeScsXHJcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vYWNjb3VudHMuc3BvdGlmeS5jb20vYXV0aG9yaXplJyxcclxuICAgICAgICAgICAgc2NvcGU6IFsnJywgJ3VzZXItcmVhZC1lbWFpbCddLFxyXG4gICAgICAgICAgICBzY29wZURlbGltaXRlcjogJywnLFxyXG4gICAgICAgICAgICBvYXV0aFR5cGU6ICcyLjAnLFxyXG4gICAgICAgICAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDUwMCwgaGVpZ2h0OiA1MzAgfSxcclxuICAgICAgICAgICAgc3RhdGU6ICgpID0+IGVuY29kZVVSSUNvbXBvbmVudChNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMikpLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG59O1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQ29uZmlnU2VydmljZSB7XHJcbiAgICBwdWJsaWMgb3B0aW9uczogSUNvbmZpZ09wdGlvbnM7XHJcblxyXG4gICAgY29uc3RydWN0b3IoQEluamVjdChDT05GSUdfT1BUSU9OUykgb3B0aW9uczogSVBhcnRpYWxDb25maWdPcHRpb25zIHwgRnVuY3Rpb24pIHtcclxuICAgICAgICBsZXQgb3B0aW9uT2JqOiBJUGFydGlhbENvbmZpZ09wdGlvbnM7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbk9iaiA9IG9wdGlvbnMoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBvcHRpb25PYmogPSBvcHRpb25zO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIC4uLmRlZmF1bHRPcHRpb25zLFxyXG4gICAgICAgICAgICAuLi5vcHRpb25PYmosXHJcbiAgICAgICAgICAgIHByb3ZpZGVyczoge1xyXG4gICAgICAgICAgICAgICAgLi4ub3B0aW9uT2JqLnByb3ZpZGVycyxcclxuICAgICAgICAgICAgICAgIC4uLk9iamVjdFxyXG4gICAgICAgICAgICAgICAgICAgIC5rZXlzKGRlZmF1bHRPcHRpb25zLnByb3ZpZGVycylcclxuICAgICAgICAgICAgICAgICAgICAuY29uY2F0KE9iamVjdC5rZXlzKG9wdGlvbk9iai5wcm92aWRlcnMgfHwge30pKVxyXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKGtleSkgPT4gb3B0aW9uT2JqLnByb3ZpZGVycyAmJiBvcHRpb25PYmoucHJvdmlkZXJzW2tleV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPyB7IFtrZXldOiB7IC4uLmRlZmF1bHRPcHRpb25zLnByb3ZpZGVyc1trZXldLCAuLi5vcHRpb25PYmoucHJvdmlkZXJzW2tleV0gfSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogeyBba2V5XTogZGVmYXVsdE9wdGlvbnMucHJvdmlkZXJzW2tleV0gfSlcclxuICAgICAgICAgICAgICAgICAgICAucmVkdWNlKChhY2MsIG5leHQpID0+ICh7IC4uLmFjYywgLi4ubmV4dCB9KSwge30pLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0gYXMgSUNvbmZpZ09wdGlvbnM7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IFN0b3JhZ2VUeXBlLCBNRU1PUlksIENPT0tJRSwgU0VTU0lPTl9DT09LSUUsIExPQ0FMX1NUT1JBR0UsIFNFU1NJT05fU1RPUkFHRSwgTk9ORSB9IGZyb20gJy4vc3RvcmFnZS10eXBlLmVudW0nO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFN0b3JhZ2VTZXJ2aWNlIHtcclxuICAgIGFic3RyYWN0IHVwZGF0ZVN0b3JhZ2VUeXBlKHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZSk6IGJvb2xlYW47XHJcblxyXG4gICAgYWJzdHJhY3QgZ2V0KGtleTogc3RyaW5nKTogc3RyaW5nO1xyXG5cclxuICAgIGFic3RyYWN0IHNldChrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZywgZGF0ZTogc3RyaW5nKTogdm9pZDtcclxuXHJcbiAgICBhYnN0cmFjdCByZW1vdmUoa2V5OiBzdHJpbmcpOiB2b2lkO1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlZCBieSBSb24gb24gMTcvMTIvMjAxNS5cclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEJyb3dzZXJTdG9yYWdlU2VydmljZSBleHRlbmRzIFN0b3JhZ2VTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgc3RvcmU6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcclxuICAgIHByaXZhdGUgc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlID0gTUVNT1JZO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlnOiBDb25maWdTZXJ2aWNlKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBpZiAoIXRoaXMudXBkYXRlU3RvcmFnZVR5cGUoY29uZmlnLm9wdGlvbnMuc3RvcmFnZVR5cGUpKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2Fybihjb25maWcub3B0aW9ucy5zdG9yYWdlVHlwZSArICcgaXMgbm90IGF2YWlsYWJsZS4nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZVN0b3JhZ2VUeXBlKHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZSkge1xyXG4gICAgICAgIGNvbnN0IGlzU3RvcmFnZUF2YWlsYWJsZSA9IHRoaXMuY2hlY2tJc1N0b3JhZ2VBdmFpbGFibGUoc3RvcmFnZVR5cGUpO1xyXG4gICAgICAgIGlmICghaXNTdG9yYWdlQXZhaWxhYmxlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlVHlwZSA9IHN0b3JhZ2VUeXBlO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQoa2V5OiBzdHJpbmcpIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RvcmFnZVR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBDT09LSUU6XHJcbiAgICAgICAgICAgIGNhc2UgU0VTU0lPTl9DT09LSUU6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRDb29raWUoa2V5KTtcclxuICAgICAgICAgICAgY2FzZSBMT0NBTF9TVE9SQUdFOlxyXG4gICAgICAgICAgICBjYXNlIFNFU1NJT05fU1RPUkFHRTpcclxuICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3dbdGhpcy5zdG9yYWdlVHlwZV0uZ2V0SXRlbShrZXkpO1xyXG4gICAgICAgICAgICBjYXNlIE1FTU9SWTpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnN0b3JlW2tleV07XHJcbiAgICAgICAgICAgIGNhc2UgTk9ORTpcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBkYXRlOiBzdHJpbmcpIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RvcmFnZVR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBDT09LSUU6XHJcbiAgICAgICAgICAgIGNhc2UgU0VTU0lPTl9DT09LSUU6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldENvb2tpZShrZXksIHZhbHVlLCB0aGlzLnN0b3JhZ2VUeXBlID09PSBDT09LSUUgPyBkYXRlIDogJycpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTE9DQUxfU1RPUkFHRTpcclxuICAgICAgICAgICAgY2FzZSBTRVNTSU9OX1NUT1JBR0U6XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dbdGhpcy5zdG9yYWdlVHlwZV0uc2V0SXRlbShrZXksIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIE1FTU9SWTpcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmVba2V5XSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTk9ORTpcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlKGtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLnN0b3JhZ2VUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgQ09PS0lFOlxyXG4gICAgICAgICAgICBjYXNlIFNFU1NJT05fQ09PS0lFOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVDb29raWUoa2V5KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIExPQ0FMX1NUT1JBR0U6XHJcbiAgICAgICAgICAgIGNhc2UgU0VTU0lPTl9TVE9SQUdFOlxyXG4gICAgICAgICAgICAgICAgd2luZG93W3RoaXMuc3RvcmFnZVR5cGVdLnJlbW92ZUl0ZW0oa2V5KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIE1FTU9SWTpcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnN0b3JlW2tleV07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBOT05FOlxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hlY2tJc1N0b3JhZ2VBdmFpbGFibGUoc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlKSB7XHJcbiAgICAgICAgc3dpdGNoIChzdG9yYWdlVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIENPT0tJRTpcclxuICAgICAgICAgICAgY2FzZSBTRVNTSU9OX0NPT0tJRTpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzQ29va2llU3RvcmFnZUF2YWlsYWJsZSgpO1xyXG4gICAgICAgICAgICBjYXNlIExPQ0FMX1NUT1JBR0U6XHJcbiAgICAgICAgICAgIGNhc2UgU0VTU0lPTl9TVE9SQUdFOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNXaW5kb3dTdG9yYWdlQXZhaWxhYmxlKHN0b3JhZ2VUeXBlKTtcclxuICAgICAgICAgICAgY2FzZSBOT05FOlxyXG4gICAgICAgICAgICBjYXNlIE1FTU9SWTpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzV2luZG93U3RvcmFnZUF2YWlsYWJsZShzdG9yYWdlVHlwZTogdHlwZW9mIFNFU1NJT05fU1RPUkFHRSB8IHR5cGVvZiBMT0NBTF9TVE9SQUdFKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3Qgc3VwcG9ydGVkID0gd2luZG93ICYmIHN0b3JhZ2VUeXBlIGluIHdpbmRvdyAmJiB3aW5kb3dbc3RvcmFnZVR5cGVdICE9PSBudWxsO1xyXG5cclxuICAgICAgICAgICAgaWYgKHN1cHBvcnRlZCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDcpO1xyXG4gICAgICAgICAgICAgICAgd2luZG93W3N0b3JhZ2VUeXBlXS5zZXRJdGVtKGtleSwgJycpO1xyXG4gICAgICAgICAgICAgICAgd2luZG93W3N0b3JhZ2VUeXBlXS5yZW1vdmVJdGVtKGtleSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBzdXBwb3J0ZWQ7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNDb29raWVTdG9yYWdlQXZhaWxhYmxlKCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN1cHBvcnRlZCA9IGRvY3VtZW50ICYmICdjb29raWUnIGluIGRvY3VtZW50O1xyXG5cclxuICAgICAgICAgICAgaWYgKHN1cHBvcnRlZCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRDb29raWUoa2V5LCAndGVzdCcsIG5ldyBEYXRlKERhdGUubm93KCkgKyA2MCAqIDEwMDApLnRvVVRDU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldENvb2tpZShrZXkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVDb29raWUoa2V5KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PT0gJ3Rlc3QnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRDb29raWUoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIGV4cGlyZXMgPSAnJywgcGF0aCA9ICcvJykge1xyXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGAke2tleX09JHt2YWx1ZX0ke2V4cGlyZXMgPyBgOyBleHBpcmVzPSR7ZXhwaXJlc31gIDogJyd9OyBwYXRoPSR7cGF0aH1gO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVtb3ZlQ29va2llKGtleTogc3RyaW5nLCBwYXRoID0gJy8nKSB7XHJcbiAgICAgICAgdGhpcy5zZXRDb29raWUoa2V5LCAnJywgbmV3IERhdGUoMCkudG9VVENTdHJpbmcoKSwgcGF0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRDb29raWUoa2V5OiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnQuY29va2llLnJlcGxhY2UobmV3IFJlZ0V4cChgKD86KD86XnwuKjtcXFxccyopJHtrZXl9XFxcXHMqXFxcXD1cXFxccyooW147XSopLiokKXxeLiokYCksICckMScpO1xyXG4gICAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFJvbiBvbiAxNy8xMi8yMDE1LlxyXG4gKi9cclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaWJlciB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2NvbmZpZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuL3N0b3JhZ2Uuc2VydmljZSc7XHJcbmltcG9ydCB7IFN0b3JhZ2VUeXBlIH0gZnJvbSAnLi9zdG9yYWdlLXR5cGUuZW51bSc7XHJcblxyXG4vKipcclxuICogQ3JlYXRlZCBieSBSb24gb24gMTcvMTIvMjAxNS5cclxuICovXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBTaGFyZWRTZXJ2aWNlIHtcclxuICAgIHB1YmxpYyB0b2tlbk5hbWUgPSB0aGlzLmNvbmZpZy5vcHRpb25zLnRva2VuUHJlZml4XHJcbiAgICAgICAgPyBbdGhpcy5jb25maWcub3B0aW9ucy50b2tlblByZWZpeCwgdGhpcy5jb25maWcub3B0aW9ucy50b2tlbk5hbWVdLmpvaW4odGhpcy5jb25maWcub3B0aW9ucy50b2tlblNlcGFyYXRvcilcclxuICAgICAgICA6IHRoaXMuY29uZmlnLm9wdGlvbnMudG9rZW5OYW1lO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgc3RvcmFnZTogU3RvcmFnZVNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UpIHsgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRUb2tlbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdG9yYWdlLmdldCh0aGlzLnRva2VuTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFBheWxvYWQodG9rZW4gPSB0aGlzLmdldFRva2VuKCkpIHtcclxuXHJcbiAgICAgICAgaWYgKHRva2VuICYmIHRva2VuLnNwbGl0KCcuJykubGVuZ3RoID09PSAzKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBiYXNlNjRVcmwgPSB0b2tlbi5zcGxpdCgnLicpWzFdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYmFzZTY0ID0gYmFzZTY0VXJsLnJlcGxhY2UoLy0vZywgJysnKS5yZXBsYWNlKC9fL2csICcvJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh0aGlzLmI2NERlY29kZVVuaWNvZGUoYmFzZTY0KSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFRva2VuKHJlc3BvbnNlOiBzdHJpbmcgfCBvYmplY3QpIHtcclxuICAgICAgICBpZiAoIXJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUud2FybignQ2FuXFwndCBzZXQgdG9rZW4gd2l0aG91dCBwYXNzaW5nIGEgdmFsdWUnKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHRva2VuOiBzdHJpbmc7XHJcbiAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgdG9rZW4gPSByZXNwb25zZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0b2tlbiA9IHRoaXMuY29uZmlnLm9wdGlvbnMucmVzb2x2ZVRva2VuKHJlc3BvbnNlLCB0aGlzLmNvbmZpZy5vcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0b2tlbikge1xyXG4gICAgICAgICAgICBjb25zdCBleHBEYXRlID0gdGhpcy5nZXRFeHBpcmF0aW9uRGF0ZSh0b2tlbik7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5zZXQodGhpcy50b2tlbk5hbWUsIHRva2VuLCBleHBEYXRlID8gZXhwRGF0ZS50b1VUQ1N0cmluZygpIDogJycpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlVG9rZW4oKSB7XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlLnJlbW92ZSh0aGlzLnRva2VuTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzQXV0aGVudGljYXRlZCh0b2tlbiA9IHRoaXMuZ2V0VG9rZW4oKSkge1xyXG5cclxuICAgICAgICAvLyBhIHRva2VuIGlzIHByZXNlbnRcclxuICAgICAgICBpZiAodG9rZW4pIHtcclxuICAgICAgICAgICAgLy8gdG9rZW4gd2l0aCBhIHZhbGlkIEpXVCBmb3JtYXQgWFhYLllZWS5aWlpcclxuICAgICAgICAgICAgaWYgKHRva2VuLnNwbGl0KCcuJykubGVuZ3RoID09PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb3VsZCBiZSBhIHZhbGlkIEpXVCBvciBhbiBhY2Nlc3MgdG9rZW4gd2l0aCB0aGUgc2FtZSBmb3JtYXRcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFzZTY0VXJsID0gdG9rZW4uc3BsaXQoJy4nKVsxXTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBiYXNlNjQgPSBiYXNlNjRVcmwucmVwbGFjZSgvLS9nLCAnKycpLnJlcGxhY2UoL18vZywgJy8nKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBleHAgPSBKU09OLnBhcnNlKHRoaXMuYjY0RGVjb2RlVW5pY29kZShiYXNlNjQpKS5leHA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gand0IHdpdGggYW4gb3B0aW9uYWwgZXhwaXJhdGlvbiBjbGFpbXNcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXhwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzRXhwaXJlZCA9IE1hdGgucm91bmQobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwKSA+PSBleHA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0V4cGlyZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZhaWw6IEV4cGlyZWQgdG9rZW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5yZW1vdmUodGhpcy50b2tlbk5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcGFzczogTm9uLWV4cGlyZWQgdG9rZW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHBhc3M6IE5vbi1KV1QgdG9rZW4gdGhhdCBsb29rcyBsaWtlIEpXVFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHBhc3M6IEFsbCBvdGhlciB0b2tlbnNcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGxhaWw6IE5vIHRva2VuIGF0IGFsbFxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0RXhwaXJhdGlvbkRhdGUodG9rZW4gPSB0aGlzLmdldFRva2VuKCkpIHtcclxuICAgICAgICBjb25zdCBwYXlsb2FkID0gdGhpcy5nZXRQYXlsb2FkKHRva2VuKTtcclxuICAgICAgICBpZiAocGF5bG9hZCAmJiBwYXlsb2FkLmV4cCAmJiBNYXRoLnJvdW5kKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMCkgPCBwYXlsb2FkLmV4cCkge1xyXG4gICAgICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoMCk7XHJcbiAgICAgICAgICAgIGRhdGUuc2V0VVRDU2Vjb25kcyhwYXlsb2FkLmV4cCk7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9nb3V0KCk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKChvYnNlcnZlcjogU3Vic2NyaWJlcjxhbnk+KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5yZW1vdmUodGhpcy50b2tlbk5hbWUpO1xyXG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KCk7XHJcbiAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFN0b3JhZ2VUeXBlKHR5cGU6IFN0b3JhZ2VUeXBlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmFnZS51cGRhdGVTdG9yYWdlVHlwZSh0eXBlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGI2NERlY29kZVVuaWNvZGUoc3RyKSB7XHJcbiAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChcclxuICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLm1hcC5jYWxsKGF0b2Ioc3RyKSxcclxuICAgICAgICAgICAgYyA9PiAnJScgKyAoJzAwJyArIGMuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikpLnNsaWNlKC0yKSxcclxuICAgICAgICApLmpvaW4oJycpKTtcclxuICAgIH1cclxufVxyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBSb24gb24gMTcvMTIvMjAxNS5cclxuICovXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gam9pblVybChiYXNlVXJsOiBzdHJpbmcsIHVybDogc3RyaW5nKSB7XHJcbiAgICBpZiAoL14oPzpbYS16XSs6KT9cXC9cXC8vaS50ZXN0KHVybCkpIHtcclxuICAgICAgICByZXR1cm4gdXJsO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBqb2luZWQgPSBbYmFzZVVybCwgdXJsXS5qb2luKCcvJyk7XHJcblxyXG4gICAgbGV0IG5vcm1hbGl6ZSA9IGZ1bmN0aW9uIChzdHIpIHtcclxuICAgICAgICByZXR1cm4gc3RyXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9bXFwvXSsvZywgJy8nKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvXFwvXFw/L2csICc/JylcclxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcL1xcIy9nLCAnIycpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXDpcXC8vZywgJzovLycpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gbm9ybWFsaXplKGpvaW5lZCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWVwTWVyZ2Uob2JqMTogb2JqZWN0LCBvYmoyOiBvYmplY3QpOiBhbnkge1xyXG4gICAgbGV0IHJlc3VsdCA9IHt9O1xyXG4gICAgZm9yIChsZXQgaSBpbiBvYmoxKSB7XHJcbiAgICAgICAgaWYgKG9iajEuaGFzT3duUHJvcGVydHkoaSkpIHtcclxuICAgICAgICAgICAgaWYgKChpIGluIG9iajIpICYmICh0eXBlb2Ygb2JqMVtpXSA9PT0gJ29iamVjdCcpICYmIChpICE9PSBudWxsKSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0W2ldID0gZGVlcE1lcmdlKG9iajFbaV0sIG9iajJbaV0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0W2ldID0gb2JqMVtpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZvciAobGV0IGkgaW4gb2JqMikge1xyXG4gICAgICAgIGlmIChvYmoyLmhhc093blByb3BlcnR5KGkpKSB7XHJcbiAgICAgICAgICAgIGlmIChpIGluIHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVzdWx0W2ldID0gb2JqMltpXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNhbWVsQ2FzZShuYW1lKSB7XHJcbiAgICByZXR1cm4gbmFtZS5yZXBsYWNlKC8oW1xcOlxcLVxcX10rKC4pKS9nLCBmdW5jdGlvbihfLCBzZXBhcmF0b3IsIGxldHRlciwgb2Zmc2V0KSB7XHJcbiAgICAgICAgcmV0dXJuIG9mZnNldCA/IGxldHRlci50b1VwcGVyQ2FzZSgpIDogbGV0dGVyO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBidWlsZFF1ZXJ5U3RyaW5nKG9iajogb2JqZWN0KSB7XHJcbiAgICByZXR1cm4gT2JqZWN0XHJcbiAgICAgICAgLmtleXMob2JqKVxyXG4gICAgICAgIC5tYXAoKGtleSkgPT4gISFvYmpba2V5XSA/IGAke2VuY29kZVVSSUNvbXBvbmVudChrZXkpfT0ke2VuY29kZVVSSUNvbXBvbmVudChvYmpba2V5XSl9YCA6IGtleSlcclxuICAgICAgICAuam9pbignJicpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2luZG93T3JpZ2luKHcgPSB3aW5kb3cpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgaWYgKCF3IHx8ICF3LmxvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXcubG9jYXRpb24ub3JpZ2luKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBgJHt3LmxvY2F0aW9uLnByb3RvY29sfS8vJHt3LmxvY2F0aW9uLmhvc3RuYW1lfSR7dy5sb2NhdGlvbi5wb3J0ID8gJzonICsgdy5sb2NhdGlvbi5wb3J0IDogJyd9YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHcubG9jYXRpb24ub3JpZ2luO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAvLyBpZ25vcmUgRE9NRXhjZXB0aW9uOiBCbG9ja2VkIGEgZnJhbWUgd2l0aCBvcmlnaW4gZnJvbSBhY2Nlc3NpbmcgYSBjcm9zcy1vcmlnaW4gZnJhbWUuXHJcbiAgICAgICAgLy8gZXJyb3IgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiYgZXJyb3IubmFtZSA9PT0gJ1NlY3VyaXR5RXJyb3InXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRGdWxsVXJsUGF0aChsb2NhdGlvbjogSFRNTEFuY2hvckVsZW1lbnR8TG9jYXRpb24pOiBzdHJpbmcge1xyXG4gICAgaWYgKCFsb2NhdGlvbi5wcm90b2NvbCkge1xyXG4gICAgICAgIGxldCB0ZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cclxuICAgICAgICB0ZW1wLmhyZWYgPSBsb2NhdGlvbi5ocmVmO1xyXG5cclxuICAgICAgICBsb2NhdGlvbiA9IHRlbXA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIGxvY2F0aW9uLmhvc3RuYW1lXHJcbiAgICAgICAgKyAobG9jYXRpb24ucG9ydCAmJiBsb2NhdGlvbi5wb3J0ICE9PSAnODAnICYmIGxvY2F0aW9uLnBvcnQgIT09ICc0NDMnID8gbG9jYXRpb24ucG9ydCA6ICcnKSAvLyBBcHBlbmQgdGhlIHBvcnQgb25seSB3aGVuIGl0J3Mgbm90IHRoZSBkZWZhdWx0IFBvcnRcclxuICAgICAgICArICgvXlxcLy8udGVzdChsb2NhdGlvbi5wYXRobmFtZSkgPyBsb2NhdGlvbi5wYXRobmFtZSA6ICcvJyArIGxvY2F0aW9uLnBhdGhuYW1lKTtcclxufSIsImltcG9ydCB7IGdldFdpbmRvd09yaWdpbiwgZ2V0RnVsbFVybFBhdGggfSBmcm9tICcuL3V0aWxzJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBFTVBUWSwgZnJvbUV2ZW50LCBpbnRlcnZhbCwgbWVyZ2UsIE9ic2VydmFibGUsIG9mLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IElQb3B1cE9wdGlvbnMsIElPYXV0aDJPcHRpb25zLCBJT2F1dGgxT3B0aW9ucyB9IGZyb20gJy4vY29uZmlnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBzd2l0Y2hNYXAsIHRha2UsIG1hcCwgZGVsYXkgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG4vKipcclxuICogQ3JlYXRlZCBieSBSb24gb24gMTcvMTIvMjAxNS5cclxuICovXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBQb3B1cFNlcnZpY2Uge1xyXG4gICAgcHVibGljIG9wZW4odXJsOiBzdHJpbmcsIG9wdGlvbnM6IElPYXV0aDJPcHRpb25zIHwgSU9hdXRoMU9wdGlvbnMsIGNvcmRvdmE6IGJvb2xlYW4gfCBudWxsKSB7XHJcbiAgICAgICAgY29uc3Qgc3RyaW5naWZpZWRPcHRpb25zID0gdGhpcy5zdHJpbmdpZnlPcHRpb25zKHRoaXMucHJlcGFyZU9wdGlvbnMob3B0aW9ucy5wb3B1cE9wdGlvbnMpKTtcclxuICAgICAgICBjb25zdCBVQSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xyXG4gICAgICAgIGNvcmRvdmEgPSBjb3Jkb3ZhID09PSBudWxsID8gdGhpcy5pc0NvcmRvdmFBcHAoKSA6IGNvcmRvdmE7XHJcbiAgICAgICAgY29uc3Qgd2luZG93TmFtZSA9IGNvcmRvdmEgPyAnX2JsYW5rJyA6IG9wdGlvbnMubmFtZTtcclxuXHJcbiAgICAgICAgY29uc3QgcG9wdXBXaW5kb3cgPSB3aW5kb3cub3Blbih1cmwsIHdpbmRvd05hbWUsIHN0cmluZ2lmaWVkT3B0aW9ucyk7XHJcblxyXG4gICAgICAgIGlmIChwb3B1cFdpbmRvdyAmJiBwb3B1cFdpbmRvdy5mb2N1cykge1xyXG4gICAgICAgICAgICBwb3B1cFdpbmRvdy5mb2N1cygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvcmRvdmFcclxuICAgICAgICAgICAgPyB0aGlzLmV2ZW50TGlzdGVuZXIocG9wdXBXaW5kb3csIG9wdGlvbnMucmVkaXJlY3RVcmkgfHwgZ2V0V2luZG93T3JpZ2luKCkpXHJcbiAgICAgICAgICAgIDogdGhpcy5wb2xsUG9wdXAocG9wdXBXaW5kb3csIG9wdGlvbnMucmVkaXJlY3RVcmkgfHwgZ2V0V2luZG93T3JpZ2luKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBldmVudExpc3RlbmVyKHBvcHVwV2luZG93OiBXaW5kb3csIHJlZGlyZWN0VXJpOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIXBvcHVwV2luZG93KSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUG9wdXAgd2FzIG5vdCBjcmVhdGVkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtZXJnZShcclxuICAgICAgICAgICAgZnJvbUV2ZW50PEV2ZW50Pihwb3B1cFdpbmRvdywgJ2V4aXQnKS5waXBlKFxyXG4gICAgICAgICAgICAgICAgZGVsYXkoMTAwKSxcclxuICAgICAgICAgICAgICAgIG1hcCgoKSA9PiB7IHRocm93IG5ldyBFcnJvcignQXV0aGVudGljYXRpb24gQ2FuY2VsZWQnKTsgfSksXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGZyb21FdmVudChwb3B1cFdpbmRvdywgJ2xvYWRzdGFydCcpLFxyXG4gICAgICAgICkucGlwZShcclxuICAgICAgICAgICAgc3dpdGNoTWFwKChldmVudDogRXZlbnQgJiB7IHVybDogc3RyaW5nIH0pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghcG9wdXBXaW5kb3cgfHwgcG9wdXBXaW5kb3cuY2xvc2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUudGhyb3cobmV3IEVycm9yKCdBdXRoZW50aWNhdGlvbiBDYW5jZWxlZCcpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChldmVudC51cmwuaW5kZXhPZihyZWRpcmVjdFVyaSkgIT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gRU1QVFk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgcGFyc2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgICAgICAgICAgICAgcGFyc2VyLmhyZWYgPSBldmVudC51cmw7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlci5zZWFyY2ggfHwgcGFyc2VyLmhhc2gpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBxdWVyeVBhcmFtcyA9IHBhcnNlci5zZWFyY2guc3Vic3RyaW5nKDEpLnJlcGxhY2UoL1xcLyQvLCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFzaFBhcmFtcyA9IHBhcnNlci5oYXNoLnN1YnN0cmluZygxKS5yZXBsYWNlKC9cXC8kLywgJycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhc2ggPSB0aGlzLnBhcnNlUXVlcnlTdHJpbmcoaGFzaFBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcXMgPSB0aGlzLnBhcnNlUXVlcnlTdHJpbmcocXVlcnlQYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFsbFBhcmFtcyA9IHsgLi4ucXMsIC4uLmhhc2ggfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcG9wdXBXaW5kb3cuY2xvc2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFsbFBhcmFtcy5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBhbGxQYXJhbXMuZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKGFsbFBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEVNUFRZO1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgdGFrZSgxKSxcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHBvbGxQb3B1cChwb3B1cFdpbmRvdzogV2luZG93LCByZWRpcmVjdFVyaTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHJlZGlyZWN0VXJpUGFyc2VyOiBIVE1MQW5jaG9yRWxlbWVudCA9IDxIVE1MQW5jaG9yRWxlbWVudD5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICAgICAgcmVkaXJlY3RVcmlQYXJzZXIuaHJlZiA9IHJlZGlyZWN0VXJpO1xyXG5cclxuICAgICAgICBsZXQgcmVkaXJlY3RVcmlQYXRoID0gZ2V0RnVsbFVybFBhdGgocmVkaXJlY3RVcmlQYXJzZXIpO1xyXG5cclxuICAgICAgICByZXR1cm4gaW50ZXJ2YWwoNTApXHJcbiAgICAgICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFwb3B1cFdpbmRvdyB8fCBwb3B1cFdpbmRvdy5jbG9zZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihuZXcgRXJyb3IoJ0F1dGhlbnRpY2F0aW9uIENhbmNlbGVkJykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBwb3B1cFdpbmRvd1BhdGggPSAnJztcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9wdXBXaW5kb3dQYXRoICA9IGdldEZ1bGxVcmxQYXRoKHBvcHVwV2luZG93LmxvY2F0aW9uKTtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWdub3JlIERPTUV4Y2VwdGlvbjogQmxvY2tlZCBhIGZyYW1lIHdpdGggb3JpZ2luIGZyb20gYWNjZXNzaW5nIGEgY3Jvc3Mtb3JpZ2luIGZyYW1lLlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGVycm9yIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uICYmIGVycm9yLm5hbWUgPT09ICdTZWN1cml0eUVycm9yJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHJlZGlyZWN0VXJpUGF0aCA9PT0gcG9wdXBXaW5kb3dQYXRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvcHVwV2luZG93LmxvY2F0aW9uLnNlYXJjaCB8fCBwb3B1cFdpbmRvdy5sb2NhdGlvbi5oYXNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zID0gcG9wdXBXaW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cmluZygxKS5yZXBsYWNlKC9cXC8kLywgJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoYXNoUGFyYW1zID0gcG9wdXBXaW5kb3cubG9jYXRpb24uaGFzaC5zdWJzdHJpbmcoMSkucmVwbGFjZSgvW1xcLyRdLywgJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoYXNoID0gdGhpcy5wYXJzZVF1ZXJ5U3RyaW5nKGhhc2hQYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBxcyA9IHRoaXMucGFyc2VRdWVyeVN0cmluZyhxdWVyeVBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcHVwV2luZG93LmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFsbFBhcmFtcyA9IHsgLi4ucXMsIC4uLmhhc2ggfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFsbFBhcmFtcy5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgYWxsUGFyYW1zLmVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKGFsbFBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihuZXcgRXJyb3IoJ05vIHRva2VuIGZvdW5kIGFmdGVyIHJlZGlyZWN0JykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBFTVBUWTtcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIHRha2UoMSksXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHByZXBhcmVPcHRpb25zKG9wdGlvbnM/OiBJUG9wdXBPcHRpb25zKSB7XHJcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgICAgICAgY29uc3Qgd2lkdGggPSBvcHRpb25zLndpZHRoIHx8IDUwMDtcclxuICAgICAgICBjb25zdCBoZWlnaHQgPSBvcHRpb25zLmhlaWdodCB8fCA1MDA7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgd2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodCxcclxuICAgICAgICAgICAgbGVmdDogd2luZG93LnNjcmVlblggKyAoKHdpbmRvdy5vdXRlcldpZHRoIC0gd2lkdGgpIC8gMiksXHJcbiAgICAgICAgICAgIHRvcDogd2luZG93LnNjcmVlblkgKyAoKHdpbmRvdy5vdXRlckhlaWdodCAtIGhlaWdodCkgLyAyLjUpLFxyXG4gICAgICAgICAgICB0b29sYmFyOiBvcHRpb25zLnZpc2libGVUb29sYmFyID8gJ3llcycgOiAnbm8nLFxyXG4gICAgICAgICAgICAuLi5vcHRpb25zLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdHJpbmdpZnlPcHRpb25zKG9wdGlvbnM6IHsgW2luZGV4OiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuIHwgbnVsbCB8IHVuZGVmaW5lZCB9KSB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC5tYXAoKGtleSkgPT4gb3B0aW9uc1trZXldID09PSBudWxsIHx8IG9wdGlvbnNba2V5XSA9PT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICA/IGtleVxyXG4gICAgICAgICAgICAgICAgOiBrZXkgKyAnPScgKyBvcHRpb25zW2tleV0sXHJcbiAgICAgICAgKS5qb2luKCcsJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwYXJzZVF1ZXJ5U3RyaW5nKGpvaW5lZEtleVZhbHVlOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgICAgIGxldCBrZXk7XHJcbiAgICAgICAgbGV0IHZhbHVlO1xyXG4gICAgICAgIHJldHVybiBqb2luZWRLZXlWYWx1ZS5zcGxpdCgnJicpLnJlZHVjZShcclxuICAgICAgICAgICAgKG9iaiwga2V5VmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChrZXlWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0ga2V5VmFsdWUuc3BsaXQoJz0nKTtcclxuICAgICAgICAgICAgICAgICAgICBrZXkgPSBkZWNvZGVVUklDb21wb25lbnQodmFsdWVbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIG9ialtrZXldID0gdHlwZW9mIHZhbHVlWzFdICE9PSAndW5kZWZpbmVkJyA/IGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZVsxXSkgOiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge30gYXMgeyBbazogc3RyaW5nXTogc3RyaW5nIHwgdHJ1ZSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzQ29yZG92YUFwcCgpIHtcclxuICAgICAgICByZXR1cm4gISEod2luZG93ICYmIChcclxuICAgICAgICAgICAgKHdpbmRvdyBhcyBhbnkpLmNvcmRvdmEgfHxcclxuICAgICAgICAgICAgd2luZG93Lm5hdmlnYXRvciAmJiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCAmJiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdDcmlPUycpID4gLTFcclxuICAgICAgICApKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJT2F1dGhTZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aC1zZXJ2aWNlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUG9wdXBTZXJ2aWNlIH0gZnJvbSAnLi9wb3B1cC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgam9pblVybCwgYnVpbGRRdWVyeVN0cmluZyB9IGZyb20gJy4vdXRpbHMnO1xyXG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlLCBJT2F1dGgxT3B0aW9ucyB9IGZyb20gJy4vY29uZmlnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFJvbiBvbiAxNy8xMi8yMDE1LlxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgT2F1dGgxU2VydmljZSBpbXBsZW1lbnRzIElPYXV0aFNlcnZpY2Uge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgICAgICBwcml2YXRlIHBvcHVwOiBQb3B1cFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UsXHJcbiAgICApIHsgfVxyXG5cclxuICAgIG9wZW48VCBleHRlbmRzIG9iamVjdCB8IHN0cmluZyA9IGFueT4ob2F1dGhPcHRpb25zOiBJT2F1dGgxT3B0aW9ucywgdXNlckRhdGE6IG9iamVjdCk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgICAgIGNvbnN0IHNlcnZlclVybCA9IHRoaXMuY29uZmlnLm9wdGlvbnMuYmFzZVVybFxyXG4gICAgICAgICAgICA/IGpvaW5VcmwodGhpcy5jb25maWcub3B0aW9ucy5iYXNlVXJsLCBvYXV0aE9wdGlvbnMudXJsKVxyXG4gICAgICAgICAgICA6IG9hdXRoT3B0aW9ucy51cmw7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxvYmplY3Q+KHNlcnZlclVybCwgb2F1dGhPcHRpb25zKS5waXBlKFxyXG4gICAgICAgICAgICBzd2l0Y2hNYXAoKGF1dGhvcml6YXRpb25EYXRhKSA9PiB0aGlzLnBvcHVwLm9wZW4oXHJcbiAgICAgICAgICAgICAgICBbb2F1dGhPcHRpb25zLmF1dGhvcml6YXRpb25FbmRwb2ludCwgYnVpbGRRdWVyeVN0cmluZyhhdXRob3JpemF0aW9uRGF0YSldLmpvaW4oJz8nKSxcclxuICAgICAgICAgICAgICAgIG9hdXRoT3B0aW9ucyxcclxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLm9wdGlvbnMuY29yZG92YSxcclxuICAgICAgICAgICAgKSwgKGF1dGhvcml6YXRpb25EYXRhLCBvYXV0aERhdGEpID0+ICh7IGF1dGhvcml6YXRpb25EYXRhLCBvYXV0aERhdGEgfSkpLFxyXG4gICAgICAgICAgICBzd2l0Y2hNYXAoKHsgYXV0aG9yaXphdGlvbkRhdGEsIG9hdXRoRGF0YSB9KSA9PiB0aGlzLmV4Y2hhbmdlRm9yVG9rZW48VD4ob2F1dGhPcHRpb25zLCBhdXRob3JpemF0aW9uRGF0YSwgb2F1dGhEYXRhLCB1c2VyRGF0YSkpLFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBleGNoYW5nZUZvclRva2VuPFQ+KG9hdXRoT3B0aW9uczogSU9hdXRoMU9wdGlvbnMsIGF1dGhvcml6YXRpb25EYXRhOiBvYmplY3QsIG9hdXRoRGF0YTogb2JqZWN0LCB1c2VyRGF0YTogb2JqZWN0KSB7XHJcbiAgICAgICAgY29uc3QgYm9keSA9IHsgYXV0aG9yaXphdGlvbkRhdGEsIG9hdXRoRGF0YSwgdXNlckRhdGEgfTtcclxuICAgICAgICBjb25zdCB7IHdpdGhDcmVkZW50aWFscywgYmFzZVVybCB9ID0gdGhpcy5jb25maWcub3B0aW9ucztcclxuICAgICAgICBjb25zdCB7IG1ldGhvZCA9ICdQT1NUJywgdXJsIH0gPSBvYXV0aE9wdGlvbnM7XHJcbiAgICAgICAgY29uc3QgZXhjaGFuZ2VGb3JUb2tlblVybCA9IGJhc2VVcmwgPyBqb2luVXJsKGJhc2VVcmwsIHVybCkgOiB1cmw7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5yZXF1ZXN0PFQ+KG1ldGhvZCwgZXhjaGFuZ2VGb3JUb2tlblVybCwgeyBib2R5LCB3aXRoQ3JlZGVudGlhbHMgfSlcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJT2F1dGhTZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aC1zZXJ2aWNlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgam9pblVybCwgYnVpbGRRdWVyeVN0cmluZywgZ2V0V2luZG93T3JpZ2luIH0gZnJvbSAnLi91dGlscyc7XHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UsIElPYXV0aDJPcHRpb25zIH0gZnJvbSAnLi9jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IFBvcHVwU2VydmljZSB9IGZyb20gJy4vcG9wdXAuc2VydmljZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFJvbiBvbiAxNy8xMi8yMDE1LlxyXG4gKi9cclxuXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBPYXV0aDJTZXJ2aWNlIGltcGxlbWVudHMgSU9hdXRoU2VydmljZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgICAgIHByaXZhdGUgcG9wdXA6IFBvcHVwU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSkge1xyXG4gICAgfVxyXG5cclxuICAgIG9wZW48VCBleHRlbmRzIG9iamVjdCB8IHN0cmluZyA9IGFueT4ob2F1dGhPcHRpb25zOiBJT2F1dGgyT3B0aW9ucywgdXNlckRhdGE6IG9iamVjdCk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgICAgIGNvbnN0IGF1dGhvcml6YXRpb25EYXRhID0gdGhpcy5nZXRBdXRob3JpemF0aW9uRGF0YShvYXV0aE9wdGlvbnMpO1xyXG4gICAgICAgIGNvbnN0IHVybCA9IFtvYXV0aE9wdGlvbnMuYXV0aG9yaXphdGlvbkVuZHBvaW50LCBidWlsZFF1ZXJ5U3RyaW5nKGF1dGhvcml6YXRpb25EYXRhKV0uam9pbignPycpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBvcHVwLm9wZW4odXJsLCBvYXV0aE9wdGlvbnMsIHRoaXMuY29uZmlnLm9wdGlvbnMuY29yZG92YSkucGlwZShcclxuICAgICAgICAgICAgc3dpdGNoTWFwKChvYXV0aERhdGE6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gd2hlbiBubyBzZXJ2ZXIgVVJMIHByb3ZpZGVkLCByZXR1cm4gcG9wdXAgcGFyYW1zIGFzLWlzLlxyXG4gICAgICAgICAgICAgICAgLy8gdGhpcyBpcyBmb3IgYSBzY2VuYXJpbyB3aGVuIHNvbWVvbmUgd2lzaGVzIHRvIG9wdCBvdXQgZnJvbVxyXG4gICAgICAgICAgICAgICAgLy8gc2F0ZWxsaXplcidzIG1hZ2ljIGJ5IGRvaW5nIGF1dGhvcml6YXRpb24gY29kZSBleGNoYW5nZSBhbmRcclxuICAgICAgICAgICAgICAgIC8vIHNhdmluZyBhIHRva2VuIG1hbnVhbGx5LlxyXG4gICAgICAgICAgICAgICAgaWYgKG9hdXRoT3B0aW9ucy5yZXNwb25zZVR5cGUgPT09ICd0b2tlbicgfHwgIW9hdXRoT3B0aW9ucy51cmwpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2Yob2F1dGhEYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAob2F1dGhEYXRhLnN0YXRlICYmIG9hdXRoRGF0YS5zdGF0ZSAhPT0gYXV0aG9yaXphdGlvbkRhdGEuc3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ09BdXRoIFwic3RhdGVcIiBtaXNtYXRjaCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhjaGFuZ2VGb3JUb2tlbjxUPihvYXV0aE9wdGlvbnMsIGF1dGhvcml6YXRpb25EYXRhLCBvYXV0aERhdGEsIHVzZXJEYXRhKTtcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGV4Y2hhbmdlRm9yVG9rZW48VD4ob3B0aW9uczogSU9hdXRoMk9wdGlvbnMsIGF1dGhvcml6YXRpb25EYXRhOiBvYmplY3QsIG9hdXRoRGF0YTogb2JqZWN0LCB1c2VyRGF0YTogb2JqZWN0KSB7XHJcbiAgICAgICAgY29uc3QgYm9keSA9IHsgYXV0aG9yaXphdGlvbkRhdGEsIG9hdXRoRGF0YSwgdXNlckRhdGEgfTtcclxuICAgICAgICBjb25zdCB7IGJhc2VVcmwsIHdpdGhDcmVkZW50aWFscyB9ID0gdGhpcy5jb25maWcub3B0aW9ucztcclxuICAgICAgICBjb25zdCB7IHVybCwgbWV0aG9kID0gJ1BPU1QnIH0gPSBvcHRpb25zO1xyXG4gICAgICAgIGNvbnN0IGV4Y2hhbmdlRm9yVG9rZW5VcmwgPSBiYXNlVXJsID8gam9pblVybChiYXNlVXJsLCB1cmwpIDogdXJsO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdDxUPihtZXRob2QsIGV4Y2hhbmdlRm9yVG9rZW5VcmwsIHsgYm9keSwgd2l0aENyZWRlbnRpYWxzIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0QXV0aG9yaXphdGlvbkRhdGEob3B0aW9uczogSU9hdXRoMk9wdGlvbnMpIHtcclxuICAgICAgICBjb25zdCB7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlVHlwZSA9ICdjb2RlJyxcclxuICAgICAgICAgICAgY2xpZW50SWQsXHJcbiAgICAgICAgICAgIHJlZGlyZWN0VXJpID0gZ2V0V2luZG93T3JpZ2luKCkgfHwgJycsXHJcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyID0gJywnLFxyXG4gICAgICAgICAgICBzY29wZSxcclxuICAgICAgICAgICAgc3RhdGUsXHJcbiAgICAgICAgICAgIGFkZGl0aW9uYWxVcmxQYXJhbXMsXHJcbiAgICAgICAgfSA9IG9wdGlvbnM7XHJcbiAgICAgICAgY29uc3QgcmVzb2x2ZWRTdGF0ZSA9IHR5cGVvZiBzdGF0ZSA9PT0gJ2Z1bmN0aW9uJyA/IHN0YXRlKCkgOiBzdGF0ZTtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBbJ3Jlc3BvbnNlX3R5cGUnLCByZXNwb25zZVR5cGVdLFxyXG4gICAgICAgICAgICBbJ2NsaWVudF9pZCcsIGNsaWVudElkXSxcclxuICAgICAgICAgICAgWydyZWRpcmVjdF91cmknLCByZWRpcmVjdFVyaV0sXHJcbiAgICAgICAgICAgIC4uLnN0YXRlID8gW1snc3RhdGUnLCByZXNvbHZlZFN0YXRlXV0gOiBbXSxcclxuICAgICAgICAgICAgLi4uc2NvcGUgPyBbWydzY29wZScsIHNjb3BlLmpvaW4oc2NvcGVEZWxpbWl0ZXIpXV0gOiBbXSxcclxuICAgICAgICAgICAgLi4uYWRkaXRpb25hbFVybFBhcmFtc1xyXG4gICAgICAgICAgICAgICAgPyBPYmplY3RcclxuICAgICAgICAgICAgICAgICAgICAua2V5cyhhZGRpdGlvbmFsVXJsUGFyYW1zKVxyXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZTogc3RyaW5nIHwgKCgpID0+IHN0cmluZykgfCBudWxsIHwgdW5kZWZpbmVkID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChhZGRpdGlvbmFsVXJsUGFyYW1zIGFzIGFueSlba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBba2V5LCB2YWx1ZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW2tleSwgdmFsdWUoKV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBba2V5LCAnJ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsnJywgJyddO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICA6IFtdLFxyXG4gICAgICAgIF0uZmlsdGVyKChfKSA9PiAhIV9bMF0pLnJlZHVjZSgoYWNjLCBuZXh0KSA9PiAoeyAuLi5hY2MsIFtuZXh0WzBdXTogbmV4dFsxXSB9KSwge30gYXMgeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSU9hdXRoU2VydmljZSB9IGZyb20gJy4vb2F1dGgtc2VydmljZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBQb3B1cFNlcnZpY2UgfSBmcm9tICcuL3BvcHVwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYXV0aDFTZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aDEuc2VydmljZSc7XHJcbmltcG9ydCB7IE9hdXRoMlNlcnZpY2UgfSBmcm9tICcuL29hdXRoMi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU2hhcmVkU2VydmljZSB9IGZyb20gJy4vc2hhcmVkLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBqb2luVXJsIH0gZnJvbSAnLi91dGlscyc7XHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2NvbmZpZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcblxyXG4vKipcclxuICogQ3JlYXRlZCBieSBSb24gb24gMTcvMTIvMjAxNS5cclxuICovXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBPYXV0aFNlcnZpY2Uge1xyXG4gICAgcmVhZG9ubHkgZGVwUHJvdmlkZXJzID0gW1xyXG4gICAgICAgIHsgcHJvdmlkZTogSHR0cENsaWVudCwgdXNlVmFsdWU6IHRoaXMuaHR0cCB9LFxyXG4gICAgICAgIHsgcHJvdmlkZTogUG9wdXBTZXJ2aWNlLCB1c2VWYWx1ZTogdGhpcy5wb3B1cCB9LFxyXG4gICAgICAgIHsgcHJvdmlkZTogQ29uZmlnU2VydmljZSwgdXNlVmFsdWU6IHRoaXMuY29uZmlnIH0sXHJcbiAgICBdO1xyXG4gICAgcmVhZG9ubHkgZGVwcyA9IFtIdHRwQ2xpZW50LCBQb3B1cFNlcnZpY2UsIENvbmZpZ1NlcnZpY2VdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgICAgICBwcml2YXRlIHNoYXJlZDogU2hhcmVkU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHBvcHVwOiBQb3B1cFNlcnZpY2UpIHsgfVxyXG5cclxuICAgIHB1YmxpYyBhdXRoZW50aWNhdGU8VCBleHRlbmRzIG9iamVjdCB8IHN0cmluZz4obmFtZTogc3RyaW5nLCB1c2VyRGF0YT86IGFueSk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgICAgIGNvbnN0IHByb3ZpZGVyOiBJT2F1dGhTZXJ2aWNlID0gdGhpcy5jb25maWcub3B0aW9ucy5wcm92aWRlcnNbbmFtZV0ub2F1dGhUeXBlID09PSAnMS4wJ1xyXG4gICAgICAgICAgICA/IEluamVjdG9yLmNyZWF0ZShbXHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLmRlcFByb3ZpZGVycyxcclxuICAgICAgICAgICAgICAgIHsgcHJvdmlkZTogT2F1dGgxU2VydmljZSwgZGVwczogdGhpcy5kZXBzIH0sXHJcbiAgICAgICAgICAgIF0pLmdldChPYXV0aDFTZXJ2aWNlKVxyXG4gICAgICAgICAgICA6IEluamVjdG9yLmNyZWF0ZShbXHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLmRlcFByb3ZpZGVycyxcclxuICAgICAgICAgICAgICAgIHsgcHJvdmlkZTogT2F1dGgyU2VydmljZSwgZGVwczogdGhpcy5kZXBzIH0sXHJcbiAgICAgICAgICAgIF0pLmdldChPYXV0aDJTZXJ2aWNlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHByb3ZpZGVyLm9wZW48VD4odGhpcy5jb25maWcub3B0aW9ucy5wcm92aWRlcnNbbmFtZV0sIHVzZXJEYXRhIHx8IHt9KVxyXG4gICAgICAgICAgICAucGlwZSh0YXAoKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIGZvciBhIHNjZW5hcmlvIHdoZW4gc29tZW9uZSB3aXNoZXMgdG8gb3B0IG91dCBmcm9tXHJcbiAgICAgICAgICAgICAgICAvLyBzYXRlbGxpemVyJ3MgbWFnaWMgYnkgZG9pbmcgYXV0aG9yaXphdGlvbiBjb2RlIGV4Y2hhbmdlIGFuZFxyXG4gICAgICAgICAgICAgICAgLy8gc2F2aW5nIGEgdG9rZW4gbWFudWFsbHkuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25maWcub3B0aW9ucy5wcm92aWRlcnNbbmFtZV0udXJsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGFyZWQuc2V0VG9rZW4ocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVubGluazxUPihcclxuICAgICAgICBwcm92aWRlcjogc3RyaW5nLFxyXG4gICAgICAgIHVybCA9IGpvaW5VcmwodGhpcy5jb25maWcub3B0aW9ucy5iYXNlVXJsLCB0aGlzLmNvbmZpZy5vcHRpb25zLnVubGlua1VybCksXHJcbiAgICAgICAgbWV0aG9kID0gJ1BPU1QnKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5yZXF1ZXN0PFQ+KG1ldGhvZCwgdXJsLCB7IGJvZHk6IHsgcHJvdmlkZXIgfSB9KTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4vY29uZmlnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBqb2luVXJsIH0gZnJvbSAnLi91dGlscyc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgUm9uIG9uIDE3LzEyLzIwMTUuXHJcbiAqL1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTG9jYWxTZXJ2aWNlIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgICAgICBwcml2YXRlIHNoYXJlZDogU2hhcmVkU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSkgeyB9XHJcblxyXG4gICAgcHVibGljIGxvZ2luPFQgZXh0ZW5kcyBzdHJpbmcgfCBvYmplY3Q+KHVzZXI6IHN0cmluZyB8IG9iamVjdCwgdXJsPzogc3RyaW5nKTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PFQ+KHVybCB8fCBqb2luVXJsKHRoaXMuY29uZmlnLm9wdGlvbnMuYmFzZVVybCwgdGhpcy5jb25maWcub3B0aW9ucy5sb2dpblVybCksIHVzZXIpXHJcbiAgICAgICAgICAgIC5waXBlKHRhcCgoZGF0YSkgPT4gdGhpcy5zaGFyZWQuc2V0VG9rZW4oZGF0YSkpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2lnbnVwPFQgPSBhbnk+KHVzZXI6IHN0cmluZyB8IG9iamVjdCwgdXJsPzogc3RyaW5nKTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PFQ+KHVybCB8fCBqb2luVXJsKHRoaXMuY29uZmlnLm9wdGlvbnMuYmFzZVVybCwgdGhpcy5jb25maWcub3B0aW9ucy5zaWdudXBVcmwpLCB1c2VyKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTG9jYWxTZXJ2aWNlIH0gZnJvbSAnLi9sb2NhbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgT2F1dGhTZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBTdG9yYWdlVHlwZSB9IGZyb20gJy4vc3RvcmFnZS10eXBlLmVudW0nO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgUm9uIG9uIDE3LzEyLzIwMTUuXHJcbiAqL1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQXV0aFNlcnZpY2Uge1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzaGFyZWQ6IFNoYXJlZFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBsb2NhbDogTG9jYWxTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgb2F1dGg6IE9hdXRoU2VydmljZSkge1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2dpbjxUIGV4dGVuZHMgc3RyaW5nIHwgb2JqZWN0ID0gYW55Pih1c2VyOiBzdHJpbmcgfCBvYmplY3QsIHVybD86IHN0cmluZyk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsLmxvZ2luPFQ+KHVzZXIsIHVybCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNpZ251cDxUID0gYW55Pih1c2VyOiBzdHJpbmcgfCBvYmplY3QsIHVybD86IHN0cmluZyk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsLnNpZ251cDxUPih1c2VyLCB1cmwpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2dvdXQoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hhcmVkLmxvZ291dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhdXRoZW50aWNhdGU8VCBleHRlbmRzIG9iamVjdCB8IHN0cmluZz4obmFtZTogc3RyaW5nLCB1c2VyRGF0YT86IGFueSk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm9hdXRoLmF1dGhlbnRpY2F0ZTxUPihuYW1lLCB1c2VyRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxpbms8VCBleHRlbmRzIG9iamVjdCB8IHN0cmluZz4obmFtZTogc3RyaW5nLCB1c2VyRGF0YT86IGFueSk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm9hdXRoLmF1dGhlbnRpY2F0ZTxUPihuYW1lLCB1c2VyRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVubGluazxUID0gYW55Pihwcm92aWRlcjogc3RyaW5nLCB1cmw/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5vYXV0aC51bmxpbms8VD4ocHJvdmlkZXIsIHVybCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzQXV0aGVudGljYXRlZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zaGFyZWQuaXNBdXRoZW50aWNhdGVkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFRva2VuKCk6IHN0cmluZyB8IG51bGwge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNoYXJlZC5nZXRUb2tlbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRUb2tlbih0b2tlbjogc3RyaW5nIHwgb2JqZWN0KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zaGFyZWQuc2V0VG9rZW4odG9rZW4pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVUb2tlbigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNoYXJlZC5yZW1vdmVUb2tlbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRQYXlsb2FkKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hhcmVkLmdldFBheWxvYWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0U3RvcmFnZVR5cGUodHlwZTogU3RvcmFnZVR5cGUpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zaGFyZWQuc2V0U3RvcmFnZVR5cGUodHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEV4cGlyYXRpb25EYXRlKCk6IERhdGUgfCBudWxsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zaGFyZWQuZ2V0RXhwaXJhdGlvbkRhdGUoKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwRXZlbnQsIEh0dHBJbnRlcmNlcHRvciwgSHR0cEhhbmRsZXIsIEh0dHBSZXF1ZXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBKd3RJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHNoYXJlZDogU2hhcmVkU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSxcclxuICAgICkgeyB9XHJcblxyXG4gICAgaW50ZXJjZXB0KHJlcTogSHR0cFJlcXVlc3Q8YW55PiwgbmV4dDogSHR0cEhhbmRsZXIpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XHJcbiAgICAgICAgY29uc3QgeyBhdXRoSGVhZGVyLCBhdXRoVG9rZW4gfSA9IHRoaXMuY29uZmlnLm9wdGlvbnM7XHJcbiAgICAgICAgY29uc3QgdG9rZW4gPSB0aGlzLnNoYXJlZC5nZXRUb2tlbigpO1xyXG4gICAgICAgIGNvbnN0IGlzQXV0aGVudGljYXRlZCA9IHRoaXMuc2hhcmVkLmlzQXV0aGVudGljYXRlZDtcclxuICAgICAgICBjb25zdCBuZXdSZXEgPSBpc0F1dGhlbnRpY2F0ZWQgJiYgIXJlcS5oZWFkZXJzLmhhcyhhdXRoSGVhZGVyKVxyXG4gICAgICAgICAgICA/IHJlcS5jbG9uZSh7IHNldEhlYWRlcnM6IHsgW2F1dGhIZWFkZXJdOiBgJHthdXRoVG9rZW59ICR7dG9rZW59YCB9IH0pXHJcbiAgICAgICAgICAgIDogcmVxO1xyXG4gICAgICAgIHJldHVybiBuZXh0LmhhbmRsZShuZXdSZXEpO1xyXG4gICAgfVxyXG5cclxufSIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFJvbiBvbiAyNS8xMi8yMDE1LlxyXG4gKi9cclxuaW1wb3J0IHtcclxuICAgIENvbmZpZ1NlcnZpY2UsXHJcbiAgICBJUGFydGlhbENvbmZpZ09wdGlvbnMsXHJcbiAgICBDT05GSUdfT1BUSU9OUyxcclxuICAgIElQcm92aWRlcnMsXHJcbiAgICBJT2F1dGgyT3B0aW9ucyxcclxuICAgIElPYXV0aDFPcHRpb25zLFxyXG4gICAgQ29uZmlnT3B0aW9uc1xyXG59IGZyb20gJy4vY29uZmlnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTaGFyZWRTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQuc2VydmljZSc7XHJcbmltcG9ydCB7IE9hdXRoU2VydmljZSB9IGZyb20gJy4vb2F1dGguc2VydmljZSc7XHJcbmltcG9ydCB7IFBvcHVwU2VydmljZSB9IGZyb20gJy4vcG9wdXAuc2VydmljZSc7XHJcbmltcG9ydCB7IE9hdXRoMVNlcnZpY2UgfSBmcm9tICcuL29hdXRoMS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgT2F1dGgyU2VydmljZSB9IGZyb20gJy4vb2F1dGgyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMb2NhbFNlcnZpY2UgfSBmcm9tICcuL2xvY2FsLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4vYXV0aC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSnd0SW50ZXJjZXB0b3IgfSBmcm9tICcuL2ludGVyY2VwdG9yLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdG9yYWdlU2VydmljZSwgQnJvd3NlclN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9zdG9yYWdlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIVFRQX0lOVEVSQ0VQVE9SUywgSHR0cENsaWVudE1vZHVsZSwgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgU3RvcmFnZVR5cGUgfSBmcm9tICcuL3N0b3JhZ2UtdHlwZS5lbnVtJztcclxuXHJcbkBOZ01vZHVsZSh7IGltcG9ydHM6IFtIdHRwQ2xpZW50TW9kdWxlXSB9KVxyXG5leHBvcnQgY2xhc3MgTmcyVWlBdXRoTW9kdWxlIHtcclxuICAgIHN0YXRpYyBmb3JSb290KGNvbmZpZ09wdGlvbnM/OiBDb25maWdPcHRpb25zLCBkZWZhdWx0Snd0SW50ZXJjZXB0b3IgPSB0cnVlKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmdNb2R1bGU6IE5nMlVpQXV0aE1vZHVsZSxcclxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgICAgICAgICAuLi5jb25maWdPcHRpb25zID8gW3sgcHJvdmlkZTogQ09ORklHX09QVElPTlMsIHVzZVZhbHVlOiBjb25maWdPcHRpb25zIH1dIDogW10sXHJcbiAgICAgICAgICAgICAgICB7IHByb3ZpZGU6IENvbmZpZ1NlcnZpY2UsIHVzZUNsYXNzOiBDb25maWdTZXJ2aWNlLCBkZXBzOiBbQ09ORklHX09QVElPTlNdIH0sXHJcbiAgICAgICAgICAgICAgICB7IHByb3ZpZGU6IFN0b3JhZ2VTZXJ2aWNlLCB1c2VDbGFzczogQnJvd3NlclN0b3JhZ2VTZXJ2aWNlLCBkZXBzOiBbQ29uZmlnU2VydmljZV0gfSxcclxuICAgICAgICAgICAgICAgIHsgcHJvdmlkZTogU2hhcmVkU2VydmljZSwgdXNlQ2xhc3M6IFNoYXJlZFNlcnZpY2UsIGRlcHM6IFtTdG9yYWdlU2VydmljZSwgQ29uZmlnU2VydmljZV0gfSxcclxuICAgICAgICAgICAgICAgIC4uLmRlZmF1bHRKd3RJbnRlcmNlcHRvciA/IFt7IHByb3ZpZGU6IEhUVFBfSU5URVJDRVBUT1JTLCB1c2VDbGFzczogSnd0SW50ZXJjZXB0b3IsIG11bHRpOiB0cnVlLCBkZXBzOiBbU2hhcmVkU2VydmljZSwgQ29uZmlnU2VydmljZV0gfV0gOiBbXSxcclxuICAgICAgICAgICAgICAgIHsgcHJvdmlkZTogT2F1dGhTZXJ2aWNlLCB1c2VDbGFzczogT2F1dGhTZXJ2aWNlLCBkZXBzOiBbSHR0cENsaWVudCwgU2hhcmVkU2VydmljZSwgQ29uZmlnU2VydmljZSwgUG9wdXBTZXJ2aWNlXSB9LFxyXG4gICAgICAgICAgICAgICAgeyBwcm92aWRlOiBQb3B1cFNlcnZpY2UsIHVzZUNsYXNzOiBQb3B1cFNlcnZpY2UsIGRlcHM6IFtDb25maWdTZXJ2aWNlXSB9LFxyXG4gICAgICAgICAgICAgICAgeyBwcm92aWRlOiBMb2NhbFNlcnZpY2UsIHVzZUNsYXNzOiBMb2NhbFNlcnZpY2UsIGRlcHM6IFtIdHRwQ2xpZW50LCBTaGFyZWRTZXJ2aWNlLCBDb25maWdTZXJ2aWNlXSB9LFxyXG4gICAgICAgICAgICAgICAgeyBwcm92aWRlOiBBdXRoU2VydmljZSwgdXNlQ2xhc3M6IEF1dGhTZXJ2aWNlLCBkZXBzOiBbU2hhcmVkU2VydmljZSwgTG9jYWxTZXJ2aWNlLCBPYXV0aFNlcnZpY2VdIH0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtcclxuICAgIExvY2FsU2VydmljZSxcclxuICAgIE9hdXRoMlNlcnZpY2UsXHJcbiAgICBPYXV0aDFTZXJ2aWNlLFxyXG4gICAgUG9wdXBTZXJ2aWNlLFxyXG4gICAgT2F1dGhTZXJ2aWNlLFxyXG4gICAgU2hhcmVkU2VydmljZSxcclxuICAgIFN0b3JhZ2VTZXJ2aWNlLCBCcm93c2VyU3RvcmFnZVNlcnZpY2UsXHJcbiAgICBBdXRoU2VydmljZSxcclxuICAgIENvbmZpZ1NlcnZpY2UsIElQYXJ0aWFsQ29uZmlnT3B0aW9ucyxcclxuICAgIEp3dEludGVyY2VwdG9yLFxyXG4gICAgQ09ORklHX09QVElPTlMsXHJcbiAgICBJUHJvdmlkZXJzLFxyXG4gICAgSU9hdXRoMk9wdGlvbnMsXHJcbiAgICBJT2F1dGgxT3B0aW9ucyxcclxuICAgIFN0b3JhZ2VUeXBlLFxyXG59OyJd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