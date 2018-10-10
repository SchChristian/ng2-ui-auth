import { Inject, Injectable, InjectionToken, Injector, NgModule } from '@angular/core';
import { Observable, EMPTY, fromEvent, interval, merge, of, throwError } from 'rxjs';
import { switchMap, take, map, delay, tap } from 'rxjs/operators';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * Created by Ron on 17/12/2015.
  @type {?} */
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
        this.options = /** @type {?} */ (Object.assign({}, defaultOptions, options, { providers: Object.assign({}, options.providers, Object
                .keys(defaultOptions.providers)
                .concat(Object.keys(options.providers || {}))
                .map((key) => options.providers && options.providers[key]
                ? { [key]: Object.assign({}, defaultOptions.providers[key], options.providers[key]) }
                : { [key]: defaultOptions.providers[key] })
                .reduce((acc, next) => (Object.assign({}, acc, next)), {})) }));
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
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
     * @param {?} key
     * @param {?=} path
     * @return {?}
     */
    removeCookie(key, path = '/') {
        this.setCookie(key, '', new Date(0).toUTCString(), path);
    }
    /**
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
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Created by Ron on 17/12/2015.
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
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
            if (redirectUri === popupWindowPath) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { Ng2UiAuthModule, LocalService, Oauth2Service, Oauth1Service, PopupService, OauthService, SharedService, StorageService, BrowserStorageService, AuthService, ConfigService, JwtInterceptor, CONFIG_OPTIONS };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLXVpLWF1dGguanMubWFwIiwic291cmNlcyI6WyJuZzovL25nMi11aS1hdXRoL3N0b3JhZ2UtdHlwZS5lbnVtLnRzIiwibmc6Ly9uZzItdWktYXV0aC9jb25maWcuc2VydmljZS50cyIsIm5nOi8vbmcyLXVpLWF1dGgvc3RvcmFnZS5zZXJ2aWNlLnRzIiwibmc6Ly9uZzItdWktYXV0aC9zaGFyZWQuc2VydmljZS50cyIsIm5nOi8vbmcyLXVpLWF1dGgvdXRpbHMudHMiLCJuZzovL25nMi11aS1hdXRoL3BvcHVwLnNlcnZpY2UudHMiLCJuZzovL25nMi11aS1hdXRoL29hdXRoMS5zZXJ2aWNlLnRzIiwibmc6Ly9uZzItdWktYXV0aC9vYXV0aDIuc2VydmljZS50cyIsIm5nOi8vbmcyLXVpLWF1dGgvb2F1dGguc2VydmljZS50cyIsIm5nOi8vbmcyLXVpLWF1dGgvbG9jYWwuc2VydmljZS50cyIsIm5nOi8vbmcyLXVpLWF1dGgvYXV0aC5zZXJ2aWNlLnRzIiwibmc6Ly9uZzItdWktYXV0aC9pbnRlcmNlcHRvci5zZXJ2aWNlLnRzIiwibmc6Ly9uZzItdWktYXV0aC9uZzItdWktYXV0aC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gbmdjIChUc2lja2xlKSBkb2Vzbid0IHN1cHBvcnQgdHlwZXNjcmlwdCAyLjQgc3RyaW5nIGVudW1zIGluIGxpYnJhcmllcyB5ZXQsIHVzaW5nIGNvbnN0cyBhcyBhIHdvcmthcm91bnRcclxuZXhwb3J0IGNvbnN0IE5PTkUgPSAnbm9uZSc7XHJcbmV4cG9ydCBjb25zdCBNRU1PUlkgPSAnbWVtb3J5JztcclxuZXhwb3J0IGNvbnN0IExPQ0FMX1NUT1JBR0UgPSAnbG9jYWxTdG9yYWdlJztcclxuZXhwb3J0IGNvbnN0IFNFU1NJT05fU1RPUkFHRSA9ICdzZXNzaW9uU3RvcmFnZSc7XHJcbmV4cG9ydCBjb25zdCBDT09LSUUgPSAnY29va2llJztcclxuZXhwb3J0IGNvbnN0IFNFU1NJT05fQ09PS0lFID0gJ3Nlc3Npb25Db29raWUnO1xyXG5cclxuZXhwb3J0IHR5cGUgU3RvcmFnZVR5cGUgPSB0eXBlb2YgTk9ORSB8IHR5cGVvZiBNRU1PUllcclxuICAgIHwgdHlwZW9mIExPQ0FMX1NUT1JBR0UgfCB0eXBlb2YgU0VTU0lPTl9TVE9SQUdFXHJcbiAgICB8IHR5cGVvZiBDT09LSUUgfCB0eXBlb2YgU0VTU0lPTl9DT09LSUU7XHJcbiIsImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3RvcmFnZVR5cGUsIExPQ0FMX1NUT1JBR0UgfSBmcm9tICcuL3N0b3JhZ2UtdHlwZS5lbnVtJztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFJvbiBvbiAxNy8xMi8yMDE1LlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjb25zdCBDT05GSUdfT1BUSU9OUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxhbnk+KCdjb25maWcub3B0aW9ucycpO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUG9wdXBPcHRpb25zIHtcclxuICAgIHdpZHRoPzogbnVtYmVyO1xyXG4gICAgaGVpZ2h0PzogbnVtYmVyO1xyXG4gICAgbGVmdD86IG51bWJlcjtcclxuICAgIHRvcD86IG51bWJlcjtcclxuICAgIHZpc2libGVUb29sYmFyPzogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJT2F1dGgxT3B0aW9ucyB7XHJcbiAgICB1cmw/OiBzdHJpbmc7XHJcbiAgICBuYW1lPzogc3RyaW5nO1xyXG4gICAgcmVkaXJlY3RVcmk/OiBzdHJpbmc7XHJcbiAgICBwb3B1cE9wdGlvbnM/OiBJUG9wdXBPcHRpb25zO1xyXG4gICAgYXV0aG9yaXphdGlvbkVuZHBvaW50Pzogc3RyaW5nO1xyXG4gICAgb2F1dGhUeXBlPzogJzEuMCc7XHJcbiAgICBtZXRob2Q/OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU9hdXRoMk9wdGlvbnMge1xyXG4gICAgdXJsPzogc3RyaW5nO1xyXG4gICAgbmFtZT86IHN0cmluZztcclxuICAgIHJlZGlyZWN0VXJpPzogc3RyaW5nO1xyXG4gICAgcG9wdXBPcHRpb25zPzogSVBvcHVwT3B0aW9ucztcclxuICAgIGF1dGhvcml6YXRpb25FbmRwb2ludD86IHN0cmluZztcclxuICAgIG9hdXRoVHlwZT86ICcyLjAnO1xyXG4gICAgbWV0aG9kPzogc3RyaW5nO1xyXG4gICAgcmVzcG9uc2VUeXBlPzogc3RyaW5nO1xyXG4gICAgY2xpZW50SWQ/OiBzdHJpbmc7XHJcbiAgICBhZGRpdGlvbmFsVXJsUGFyYW1zPzoge1xyXG4gICAgICAgIFtwYXJhbU5hbWU6IHN0cmluZ106IHN0cmluZyB8ICgoKSA9PiBzdHJpbmcpIHwgbnVsbCB8IHVuZGVmaW5lZDtcclxuICAgIH07XHJcbiAgICBzY29wZURlbGltaXRlcj86IHN0cmluZztcclxuICAgIHNjb3BlPzogc3RyaW5nW107XHJcbiAgICBzdGF0ZT86IHN0cmluZyB8ICgoKSA9PiBzdHJpbmcpO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElQcm92aWRlcnMge1xyXG4gICAgW3Byb3ZpZGVyOiBzdHJpbmddOiBJT2F1dGgyT3B0aW9ucyB8IElPYXV0aDFPcHRpb25zO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElDb25maWdPcHRpb25zIHtcclxuICAgIHRva2VuUm9vdDogc3RyaW5nIHwgbnVsbDtcclxuICAgIGNvcmRvdmE6IGJvb2xlYW4gfCBudWxsO1xyXG4gICAgYmFzZVVybDogc3RyaW5nO1xyXG4gICAgbG9naW5Vcmw6IHN0cmluZztcclxuICAgIHNpZ251cFVybDogc3RyaW5nO1xyXG4gICAgdW5saW5rVXJsOiBzdHJpbmc7XHJcbiAgICB0b2tlbk5hbWU6IHN0cmluZztcclxuICAgIHRva2VuU2VwYXJhdG9yOiBzdHJpbmc7XHJcbiAgICB0b2tlblByZWZpeDogc3RyaW5nO1xyXG4gICAgYXV0aFRva2VuOiBzdHJpbmc7XHJcbiAgICBhdXRoSGVhZGVyOiBzdHJpbmc7XHJcbiAgICBzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGU7XHJcbiAgICBwcm92aWRlcnM6IElQcm92aWRlcnM7XHJcbiAgICB3aXRoQ3JlZGVudGlhbHM6IGJvb2xlYW47XHJcbiAgICByZXNvbHZlVG9rZW46IChyZXNwb25zZTogYW55LCBjb25maWc6IElDb25maWdPcHRpb25zKSA9PiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVBhcnRpYWxDb25maWdPcHRpb25zIHsgLy8gPSBQYXJ0aWFsPElDb25maWdPcHRpb25zXHJcbiAgICB0b2tlblJvb3Q/OiBzdHJpbmcgfCBudWxsO1xyXG4gICAgY29yZG92YT86IGJvb2xlYW4gfCBudWxsO1xyXG4gICAgYmFzZVVybD86IHN0cmluZztcclxuICAgIGxvZ2luVXJsPzogc3RyaW5nO1xyXG4gICAgc2lnbnVwVXJsPzogc3RyaW5nO1xyXG4gICAgdW5saW5rVXJsPzogc3RyaW5nO1xyXG4gICAgdG9rZW5OYW1lPzogc3RyaW5nO1xyXG4gICAgdG9rZW5TZXBhcmF0b3I/OiBzdHJpbmc7XHJcbiAgICB0b2tlblByZWZpeD86IHN0cmluZztcclxuICAgIGF1dGhUb2tlbj86IHN0cmluZztcclxuICAgIGF1dGhIZWFkZXI/OiBzdHJpbmc7XHJcbiAgICBzdG9yYWdlVHlwZT86IFN0b3JhZ2VUeXBlO1xyXG4gICAgcHJvdmlkZXJzPzogSVByb3ZpZGVycztcclxuICAgIHdpdGhDcmVkZW50aWFscz86IGJvb2xlYW47XHJcbiAgICByZXNvbHZlVG9rZW4/OiAocmVzcG9uc2U6IGFueSwgY29uZmlnOiBJQ29uZmlnT3B0aW9ucykgPT4gc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZGVmYXVsdE9wdGlvbnM6IElDb25maWdPcHRpb25zID0ge1xyXG4gICAgd2l0aENyZWRlbnRpYWxzOiBmYWxzZSxcclxuICAgIHRva2VuUm9vdDogbnVsbCxcclxuICAgIGJhc2VVcmw6ICcvJyxcclxuICAgIGxvZ2luVXJsOiAnL2F1dGgvbG9naW4nLFxyXG4gICAgc2lnbnVwVXJsOiAnL2F1dGgvc2lnbnVwJyxcclxuICAgIHVubGlua1VybDogJy9hdXRoL3VubGluay8nLFxyXG4gICAgdG9rZW5OYW1lOiAndG9rZW4nLFxyXG4gICAgdG9rZW5TZXBhcmF0b3I6ICdfJyxcclxuICAgIHRva2VuUHJlZml4OiAnbmcyLXVpLWF1dGgnLFxyXG4gICAgYXV0aEhlYWRlcjogJ0F1dGhvcml6YXRpb24nLFxyXG4gICAgYXV0aFRva2VuOiAnQmVhcmVyJyxcclxuICAgIHN0b3JhZ2VUeXBlOiBMT0NBTF9TVE9SQUdFLFxyXG4gICAgY29yZG92YTogbnVsbCxcclxuICAgIHJlc29sdmVUb2tlbjogKHJlc3BvbnNlOiBhbnksIGNvbmZpZzogSUNvbmZpZ09wdGlvbnMpID0+IHtcclxuICAgICAgICBjb25zdCBhY2Nlc3NUb2tlbjogc3RyaW5nIHwgeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSB8IG51bGwgfCB1bmRlZmluZWQgPSByZXNwb25zZSAmJlxyXG4gICAgICAgICAgICAocmVzcG9uc2UuYWNjZXNzX3Rva2VuIHx8IHJlc3BvbnNlLnRva2VuIHx8IHJlc3BvbnNlLmRhdGEpO1xyXG4gICAgICAgIGlmICghYWNjZXNzVG9rZW4pIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS53YXJuKCdObyB0b2tlbiBmb3VuZCcpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBhY2Nlc3NUb2tlbiA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFjY2Vzc1Rva2VuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGFjY2Vzc1Rva2VuICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLndhcm4oJ05vIHRva2VuIGZvdW5kJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB0b2tlblJvb3REYXRhID0gY29uZmlnLnRva2VuUm9vdCAmJiBjb25maWcudG9rZW5Sb290XHJcbiAgICAgICAgICAgIC5zcGxpdCgnLicpXHJcbiAgICAgICAgICAgIC5yZWR1Y2UoXHJcbiAgICAgICAgICAgIChvOiBhbnksIHg6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9beF07XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGFjY2Vzc1Rva2VuKTtcclxuICAgICAgICBjb25zdCB0b2tlbiA9IHRva2VuUm9vdERhdGEgPyB0b2tlblJvb3REYXRhW2NvbmZpZy50b2tlbk5hbWVdIDogYWNjZXNzVG9rZW5bY29uZmlnLnRva2VuTmFtZV07XHJcbiAgICAgICAgaWYgKHRva2VuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0b2tlbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc3QgdG9rZW5QYXRoID0gdGhpcy50b2tlblJvb3QgPyB0aGlzLnRva2VuUm9vdCArICcuJyArIHRoaXMudG9rZW5OYW1lIDogdGhpcy50b2tlbk5hbWU7XHJcbiAgICAgICAgLy8gY29uc29sZS53YXJuKCdFeHBlY3RpbmcgYSB0b2tlbiBuYW1lZCBcIicgKyB0b2tlblBhdGgpO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfSxcclxuICAgIHByb3ZpZGVyczoge1xyXG4gICAgICAgIGZhY2Vib29rOiB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdmYWNlYm9vaycsXHJcbiAgICAgICAgICAgIHVybDogJy9hdXRoL2ZhY2Vib29rJyxcclxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL3YyLjUvZGlhbG9nL29hdXRoJyxcclxuICAgICAgICAgICAgYWRkaXRpb25hbFVybFBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ3BvcHVwJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2NvcGU6IFsnZW1haWwnXSxcclxuICAgICAgICAgICAgc2NvcGVEZWxpbWl0ZXI6ICcsJyxcclxuICAgICAgICAgICAgb2F1dGhUeXBlOiAnMi4wJyxcclxuICAgICAgICAgICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA1ODAsIGhlaWdodDogNDAwIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnb29nbGU6IHtcclxuICAgICAgICAgICAgbmFtZTogJ2dvb2dsZScsXHJcbiAgICAgICAgICAgIHVybDogJy9hdXRoL2dvb2dsZScsXHJcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9vL29hdXRoMi9hdXRoJyxcclxuICAgICAgICAgICAgYWRkaXRpb25hbFVybFBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgJ2Rpc3BsYXknOiAncG9wdXAnLFxyXG4gICAgICAgICAgICAgICAgJ3Byb21wdCc6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICdsb2dpbl9oaW50JzogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgJ2FjY2Vzc190eXBlJzogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgJ2luY2x1ZGVfZ3JhbnRlZF9zY29wZXMnOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAnb3BlbmlkLnJlYWxtJzogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgJ2hkJzogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzY29wZTogWydvcGVuaWQnLCAncHJvZmlsZScsICdlbWFpbCddLFxyXG4gICAgICAgICAgICBzY29wZURlbGltaXRlcjogJyAnLFxyXG4gICAgICAgICAgICBvYXV0aFR5cGU6ICcyLjAnLFxyXG4gICAgICAgICAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDQ1MiwgaGVpZ2h0OiA2MzMgfSxcclxuICAgICAgICAgICAgc3RhdGU6ICgpID0+IGVuY29kZVVSSUNvbXBvbmVudChNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMikpLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2l0aHViOiB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdnaXRodWInLFxyXG4gICAgICAgICAgICB1cmw6ICcvYXV0aC9naXRodWInLFxyXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2dpdGh1Yi5jb20vbG9naW4vb2F1dGgvYXV0aG9yaXplJyxcclxuICAgICAgICAgICAgc2NvcGU6IFsndXNlcjplbWFpbCddLFxyXG4gICAgICAgICAgICBzY29wZURlbGltaXRlcjogJyAnLFxyXG4gICAgICAgICAgICBvYXV0aFR5cGU6ICcyLjAnLFxyXG4gICAgICAgICAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDEwMjAsIGhlaWdodDogNjE4IH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbnN0YWdyYW06IHtcclxuICAgICAgICAgICAgbmFtZTogJ2luc3RhZ3JhbScsXHJcbiAgICAgICAgICAgIHVybDogJy9hdXRoL2luc3RhZ3JhbScsXHJcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vYXBpLmluc3RhZ3JhbS5jb20vb2F1dGgvYXV0aG9yaXplJyxcclxuICAgICAgICAgICAgc2NvcGU6IFsnYmFzaWMnXSxcclxuICAgICAgICAgICAgc2NvcGVEZWxpbWl0ZXI6ICcrJyxcclxuICAgICAgICAgICAgb2F1dGhUeXBlOiAnMi4wJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxpbmtlZGluOiB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdsaW5rZWRpbicsXHJcbiAgICAgICAgICAgIHVybDogJy9hdXRoL2xpbmtlZGluJyxcclxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Vhcy9vYXV0aDIvYXV0aG9yaXphdGlvbicsXHJcbiAgICAgICAgICAgIHNjb3BlOiBbJ3JfZW1haWxhZGRyZXNzJ10sXHJcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyOiAnICcsXHJcbiAgICAgICAgICAgIG9hdXRoVHlwZTogJzIuMCcsXHJcbiAgICAgICAgICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNTI3LCBoZWlnaHQ6IDU4MiB9LFxyXG4gICAgICAgICAgICBzdGF0ZTogJ1NUQVRFJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHR3aXR0ZXI6IHtcclxuICAgICAgICAgICAgbmFtZTogJ3R3aXR0ZXInLFxyXG4gICAgICAgICAgICB1cmw6ICcvYXV0aC90d2l0dGVyJyxcclxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9hcGkudHdpdHRlci5jb20vb2F1dGgvYXV0aGVudGljYXRlJyxcclxuICAgICAgICAgICAgb2F1dGhUeXBlOiAnMS4wJyxcclxuICAgICAgICAgICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA0OTUsIGhlaWdodDogNjQ1IH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0d2l0Y2g6IHtcclxuICAgICAgICAgICAgbmFtZTogJ3R3aXRjaCcsXHJcbiAgICAgICAgICAgIHVybDogJy9hdXRoL3R3aXRjaCcsXHJcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vYXBpLnR3aXRjaC50di9rcmFrZW4vb2F1dGgyL2F1dGhvcml6ZScsXHJcbiAgICAgICAgICAgIHNjb3BlOiBbJ3VzZXJfcmVhZCddLFxyXG4gICAgICAgICAgICBzY29wZURlbGltaXRlcjogJyAnLFxyXG4gICAgICAgICAgICBhZGRpdGlvbmFsVXJsUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAncG9wdXAnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvYXV0aFR5cGU6ICcyLjAnLFxyXG4gICAgICAgICAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDUwMCwgaGVpZ2h0OiA1NjAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxpdmU6IHtcclxuICAgICAgICAgICAgbmFtZTogJ2xpdmUnLFxyXG4gICAgICAgICAgICB1cmw6ICcvYXV0aC9saXZlJyxcclxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9sb2dpbi5saXZlLmNvbS9vYXV0aDIwX2F1dGhvcml6ZS5zcmYnLFxyXG4gICAgICAgICAgICBhZGRpdGlvbmFsVXJsUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAncG9wdXAnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzY29wZTogWyd3bC5lbWFpbHMnXSxcclxuICAgICAgICAgICAgc2NvcGVEZWxpbWl0ZXI6ICcgJyxcclxuICAgICAgICAgICAgb2F1dGhUeXBlOiAnMi4wJyxcclxuICAgICAgICAgICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA1MDAsIGhlaWdodDogNTYwIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICB5YWhvbzoge1xyXG4gICAgICAgICAgICBuYW1lOiAneWFob28nLFxyXG4gICAgICAgICAgICB1cmw6ICcvYXV0aC95YWhvbycsXHJcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vYXBpLmxvZ2luLnlhaG9vLmNvbS9vYXV0aDIvcmVxdWVzdF9hdXRoJyxcclxuICAgICAgICAgICAgc2NvcGU6IFtdLFxyXG4gICAgICAgICAgICBzY29wZURlbGltaXRlcjogJywnLFxyXG4gICAgICAgICAgICBvYXV0aFR5cGU6ICcyLjAnLFxyXG4gICAgICAgICAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDU1OSwgaGVpZ2h0OiA1MTkgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpdGJ1Y2tldDoge1xyXG4gICAgICAgICAgICBuYW1lOiAnYml0YnVja2V0JyxcclxuICAgICAgICAgICAgdXJsOiAnL2F1dGgvYml0YnVja2V0JyxcclxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9iaXRidWNrZXQub3JnL3NpdGUvb2F1dGgyL2F1dGhvcml6ZScsXHJcbiAgICAgICAgICAgIHNjb3BlOiBbJ2VtYWlsJ10sXHJcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyOiAnLCcsXHJcbiAgICAgICAgICAgIG9hdXRoVHlwZTogJzIuMCcsXHJcbiAgICAgICAgICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogMTAyOCwgaGVpZ2h0OiA1MjkgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNwb3RpZnk6IHtcclxuICAgICAgICAgICAgbmFtZTogJ3Nwb3RpZnknLFxyXG4gICAgICAgICAgICB1cmw6ICcvYXV0aC9zcG90aWZ5JyxcclxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9hY2NvdW50cy5zcG90aWZ5LmNvbS9hdXRob3JpemUnLFxyXG4gICAgICAgICAgICBzY29wZTogWycnLCAndXNlci1yZWFkLWVtYWlsJ10sXHJcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyOiAnLCcsXHJcbiAgICAgICAgICAgIG9hdXRoVHlwZTogJzIuMCcsXHJcbiAgICAgICAgICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNTAwLCBoZWlnaHQ6IDUzMCB9LFxyXG4gICAgICAgICAgICBzdGF0ZTogKCkgPT4gZW5jb2RlVVJJQ29tcG9uZW50KE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyKSksXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbn07XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDb25maWdTZXJ2aWNlIHtcclxuICAgIHB1YmxpYyBvcHRpb25zOiBJQ29uZmlnT3B0aW9ucztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KENPTkZJR19PUFRJT05TKSBvcHRpb25zOiBJUGFydGlhbENvbmZpZ09wdGlvbnMpIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIC4uLmRlZmF1bHRPcHRpb25zLFxyXG4gICAgICAgICAgICAuLi5vcHRpb25zLFxyXG4gICAgICAgICAgICBwcm92aWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIC4uLm9wdGlvbnMucHJvdmlkZXJzLFxyXG4gICAgICAgICAgICAgICAgLi4uT2JqZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgLmtleXMoZGVmYXVsdE9wdGlvbnMucHJvdmlkZXJzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jb25jYXQoT2JqZWN0LmtleXMob3B0aW9ucy5wcm92aWRlcnMgfHwge30pKVxyXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKGtleSkgPT4gb3B0aW9ucy5wcm92aWRlcnMgJiYgb3B0aW9ucy5wcm92aWRlcnNba2V5XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHsgW2tleV06IHsgLi4uZGVmYXVsdE9wdGlvbnMucHJvdmlkZXJzW2tleV0sIC4uLm9wdGlvbnMucHJvdmlkZXJzW2tleV0gfSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogeyBba2V5XTogZGVmYXVsdE9wdGlvbnMucHJvdmlkZXJzW2tleV0gfSlcclxuICAgICAgICAgICAgICAgICAgICAucmVkdWNlKChhY2MsIG5leHQpID0+ICh7IC4uLmFjYywgLi4ubmV4dCB9KSwge30pLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0gYXMgSUNvbmZpZ09wdGlvbnM7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IFN0b3JhZ2VUeXBlLCBNRU1PUlksIENPT0tJRSwgU0VTU0lPTl9DT09LSUUsIExPQ0FMX1NUT1JBR0UsIFNFU1NJT05fU1RPUkFHRSwgTk9ORSB9IGZyb20gJy4vc3RvcmFnZS10eXBlLmVudW0nO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFN0b3JhZ2VTZXJ2aWNlIHtcclxuICAgIGFic3RyYWN0IHVwZGF0ZVN0b3JhZ2VUeXBlKHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZSk6IGJvb2xlYW47XHJcblxyXG4gICAgYWJzdHJhY3QgZ2V0KGtleTogc3RyaW5nKTogc3RyaW5nO1xyXG5cclxuICAgIGFic3RyYWN0IHNldChrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZywgZGF0ZTogc3RyaW5nKTogdm9pZDtcclxuXHJcbiAgICBhYnN0cmFjdCByZW1vdmUoa2V5OiBzdHJpbmcpOiB2b2lkO1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlZCBieSBSb24gb24gMTcvMTIvMjAxNS5cclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEJyb3dzZXJTdG9yYWdlU2VydmljZSBleHRlbmRzIFN0b3JhZ2VTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgc3RvcmU6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcclxuICAgIHByaXZhdGUgc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlID0gTUVNT1JZO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlnOiBDb25maWdTZXJ2aWNlKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBpZiAoIXRoaXMudXBkYXRlU3RvcmFnZVR5cGUoY29uZmlnLm9wdGlvbnMuc3RvcmFnZVR5cGUpKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2Fybihjb25maWcub3B0aW9ucy5zdG9yYWdlVHlwZSArICcgaXMgbm90IGF2YWlsYWJsZS4nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZVN0b3JhZ2VUeXBlKHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZSkge1xyXG4gICAgICAgIGNvbnN0IGlzU3RvcmFnZUF2YWlsYWJsZSA9IHRoaXMuY2hlY2tJc1N0b3JhZ2VBdmFpbGFibGUoc3RvcmFnZVR5cGUpO1xyXG4gICAgICAgIGlmICghaXNTdG9yYWdlQXZhaWxhYmxlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlVHlwZSA9IHN0b3JhZ2VUeXBlO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQoa2V5OiBzdHJpbmcpIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RvcmFnZVR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBDT09LSUU6XHJcbiAgICAgICAgICAgIGNhc2UgU0VTU0lPTl9DT09LSUU6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRDb29raWUoa2V5KTtcclxuICAgICAgICAgICAgY2FzZSBMT0NBTF9TVE9SQUdFOlxyXG4gICAgICAgICAgICBjYXNlIFNFU1NJT05fU1RPUkFHRTpcclxuICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3dbdGhpcy5zdG9yYWdlVHlwZV0uZ2V0SXRlbShrZXkpO1xyXG4gICAgICAgICAgICBjYXNlIE1FTU9SWTpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnN0b3JlW2tleV07XHJcbiAgICAgICAgICAgIGNhc2UgTk9ORTpcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBkYXRlOiBzdHJpbmcpIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RvcmFnZVR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBDT09LSUU6XHJcbiAgICAgICAgICAgIGNhc2UgU0VTU0lPTl9DT09LSUU6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldENvb2tpZShrZXksIHZhbHVlLCB0aGlzLnN0b3JhZ2VUeXBlID09PSBDT09LSUUgPyBkYXRlIDogJycpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTE9DQUxfU1RPUkFHRTpcclxuICAgICAgICAgICAgY2FzZSBTRVNTSU9OX1NUT1JBR0U6XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dbdGhpcy5zdG9yYWdlVHlwZV0uc2V0SXRlbShrZXksIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIE1FTU9SWTpcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmVba2V5XSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTk9ORTpcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlKGtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLnN0b3JhZ2VUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgQ09PS0lFOlxyXG4gICAgICAgICAgICBjYXNlIFNFU1NJT05fQ09PS0lFOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVDb29raWUoa2V5KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIExPQ0FMX1NUT1JBR0U6XHJcbiAgICAgICAgICAgIGNhc2UgU0VTU0lPTl9TVE9SQUdFOlxyXG4gICAgICAgICAgICAgICAgd2luZG93W3RoaXMuc3RvcmFnZVR5cGVdLnJlbW92ZUl0ZW0oa2V5KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIE1FTU9SWTpcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnN0b3JlW2tleV07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBOT05FOlxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hlY2tJc1N0b3JhZ2VBdmFpbGFibGUoc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlKSB7XHJcbiAgICAgICAgc3dpdGNoIChzdG9yYWdlVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIENPT0tJRTpcclxuICAgICAgICAgICAgY2FzZSBTRVNTSU9OX0NPT0tJRTpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzQ29va2llU3RvcmFnZUF2YWlsYWJsZSgpO1xyXG4gICAgICAgICAgICBjYXNlIExPQ0FMX1NUT1JBR0U6XHJcbiAgICAgICAgICAgIGNhc2UgU0VTU0lPTl9TVE9SQUdFOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNXaW5kb3dTdG9yYWdlQXZhaWxhYmxlKHN0b3JhZ2VUeXBlKTtcclxuICAgICAgICAgICAgY2FzZSBOT05FOlxyXG4gICAgICAgICAgICBjYXNlIE1FTU9SWTpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzV2luZG93U3RvcmFnZUF2YWlsYWJsZShzdG9yYWdlVHlwZTogdHlwZW9mIFNFU1NJT05fU1RPUkFHRSB8IHR5cGVvZiBMT0NBTF9TVE9SQUdFKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3Qgc3VwcG9ydGVkID0gd2luZG93ICYmIHN0b3JhZ2VUeXBlIGluIHdpbmRvdyAmJiB3aW5kb3dbc3RvcmFnZVR5cGVdICE9PSBudWxsO1xyXG5cclxuICAgICAgICAgICAgaWYgKHN1cHBvcnRlZCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDcpO1xyXG4gICAgICAgICAgICAgICAgd2luZG93W3N0b3JhZ2VUeXBlXS5zZXRJdGVtKGtleSwgJycpO1xyXG4gICAgICAgICAgICAgICAgd2luZG93W3N0b3JhZ2VUeXBlXS5yZW1vdmVJdGVtKGtleSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBzdXBwb3J0ZWQ7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNDb29raWVTdG9yYWdlQXZhaWxhYmxlKCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN1cHBvcnRlZCA9IGRvY3VtZW50ICYmICdjb29raWUnIGluIGRvY3VtZW50O1xyXG5cclxuICAgICAgICAgICAgaWYgKHN1cHBvcnRlZCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRDb29raWUoa2V5LCAndGVzdCcsIG5ldyBEYXRlKERhdGUubm93KCkgKyA2MCAqIDEwMDApLnRvVVRDU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldENvb2tpZShrZXkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVDb29raWUoa2V5KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PT0gJ3Rlc3QnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRDb29raWUoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIGV4cGlyZXMgPSAnJywgcGF0aCA9ICcvJykge1xyXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGAke2tleX09JHt2YWx1ZX0ke2V4cGlyZXMgPyBgOyBleHBpcmVzPSR7ZXhwaXJlc31gIDogJyd9OyBwYXRoPSR7cGF0aH1gO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVtb3ZlQ29va2llKGtleTogc3RyaW5nLCBwYXRoID0gJy8nKSB7XHJcbiAgICAgICAgdGhpcy5zZXRDb29raWUoa2V5LCAnJywgbmV3IERhdGUoMCkudG9VVENTdHJpbmcoKSwgcGF0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRDb29raWUoa2V5OiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnQuY29va2llLnJlcGxhY2UobmV3IFJlZ0V4cChgKD86KD86XnwuKjtcXFxccyopJHtrZXl9XFxcXHMqXFxcXD1cXFxccyooW147XSopLiokKXxeLiokYCksICckMScpO1xyXG4gICAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFJvbiBvbiAxNy8xMi8yMDE1LlxyXG4gKi9cclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaWJlciB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2NvbmZpZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuL3N0b3JhZ2Uuc2VydmljZSc7XHJcbmltcG9ydCB7IFN0b3JhZ2VUeXBlIH0gZnJvbSAnLi9zdG9yYWdlLXR5cGUuZW51bSc7XHJcblxyXG4vKipcclxuICogQ3JlYXRlZCBieSBSb24gb24gMTcvMTIvMjAxNS5cclxuICovXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBTaGFyZWRTZXJ2aWNlIHtcclxuICAgIHB1YmxpYyB0b2tlbk5hbWUgPSB0aGlzLmNvbmZpZy5vcHRpb25zLnRva2VuUHJlZml4XHJcbiAgICAgICAgPyBbdGhpcy5jb25maWcub3B0aW9ucy50b2tlblByZWZpeCwgdGhpcy5jb25maWcub3B0aW9ucy50b2tlbk5hbWVdLmpvaW4odGhpcy5jb25maWcub3B0aW9ucy50b2tlblNlcGFyYXRvcilcclxuICAgICAgICA6IHRoaXMuY29uZmlnLm9wdGlvbnMudG9rZW5OYW1lO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgc3RvcmFnZTogU3RvcmFnZVNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UpIHsgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRUb2tlbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdG9yYWdlLmdldCh0aGlzLnRva2VuTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFBheWxvYWQodG9rZW4gPSB0aGlzLmdldFRva2VuKCkpIHtcclxuXHJcbiAgICAgICAgaWYgKHRva2VuICYmIHRva2VuLnNwbGl0KCcuJykubGVuZ3RoID09PSAzKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBiYXNlNjRVcmwgPSB0b2tlbi5zcGxpdCgnLicpWzFdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYmFzZTY0ID0gYmFzZTY0VXJsLnJlcGxhY2UoLy0vZywgJysnKS5yZXBsYWNlKC9fL2csICcvJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh0aGlzLmI2NERlY29kZVVuaWNvZGUoYmFzZTY0KSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFRva2VuKHJlc3BvbnNlOiBzdHJpbmcgfCBvYmplY3QpIHtcclxuICAgICAgICBpZiAoIXJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUud2FybignQ2FuXFwndCBzZXQgdG9rZW4gd2l0aG91dCBwYXNzaW5nIGEgdmFsdWUnKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHRva2VuOiBzdHJpbmc7XHJcbiAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgdG9rZW4gPSByZXNwb25zZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0b2tlbiA9IHRoaXMuY29uZmlnLm9wdGlvbnMucmVzb2x2ZVRva2VuKHJlc3BvbnNlLCB0aGlzLmNvbmZpZy5vcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0b2tlbikge1xyXG4gICAgICAgICAgICBjb25zdCBleHBEYXRlID0gdGhpcy5nZXRFeHBpcmF0aW9uRGF0ZSh0b2tlbik7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5zZXQodGhpcy50b2tlbk5hbWUsIHRva2VuLCBleHBEYXRlID8gZXhwRGF0ZS50b1VUQ1N0cmluZygpIDogJycpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlVG9rZW4oKSB7XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlLnJlbW92ZSh0aGlzLnRva2VuTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzQXV0aGVudGljYXRlZCh0b2tlbiA9IHRoaXMuZ2V0VG9rZW4oKSkge1xyXG5cclxuICAgICAgICAvLyBhIHRva2VuIGlzIHByZXNlbnRcclxuICAgICAgICBpZiAodG9rZW4pIHtcclxuICAgICAgICAgICAgLy8gdG9rZW4gd2l0aCBhIHZhbGlkIEpXVCBmb3JtYXQgWFhYLllZWS5aWlpcclxuICAgICAgICAgICAgaWYgKHRva2VuLnNwbGl0KCcuJykubGVuZ3RoID09PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb3VsZCBiZSBhIHZhbGlkIEpXVCBvciBhbiBhY2Nlc3MgdG9rZW4gd2l0aCB0aGUgc2FtZSBmb3JtYXRcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFzZTY0VXJsID0gdG9rZW4uc3BsaXQoJy4nKVsxXTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBiYXNlNjQgPSBiYXNlNjRVcmwucmVwbGFjZSgvLS9nLCAnKycpLnJlcGxhY2UoL18vZywgJy8nKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBleHAgPSBKU09OLnBhcnNlKHRoaXMuYjY0RGVjb2RlVW5pY29kZShiYXNlNjQpKS5leHA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gand0IHdpdGggYW4gb3B0aW9uYWwgZXhwaXJhdGlvbiBjbGFpbXNcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXhwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzRXhwaXJlZCA9IE1hdGgucm91bmQobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwKSA+PSBleHA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0V4cGlyZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZhaWw6IEV4cGlyZWQgdG9rZW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5yZW1vdmUodGhpcy50b2tlbk5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcGFzczogTm9uLWV4cGlyZWQgdG9rZW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHBhc3M6IE5vbi1KV1QgdG9rZW4gdGhhdCBsb29rcyBsaWtlIEpXVFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHBhc3M6IEFsbCBvdGhlciB0b2tlbnNcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGxhaWw6IE5vIHRva2VuIGF0IGFsbFxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0RXhwaXJhdGlvbkRhdGUodG9rZW4gPSB0aGlzLmdldFRva2VuKCkpIHtcclxuICAgICAgICBjb25zdCBwYXlsb2FkID0gdGhpcy5nZXRQYXlsb2FkKHRva2VuKTtcclxuICAgICAgICBpZiAocGF5bG9hZCAmJiBwYXlsb2FkLmV4cCAmJiBNYXRoLnJvdW5kKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMCkgPCBwYXlsb2FkLmV4cCkge1xyXG4gICAgICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoMCk7XHJcbiAgICAgICAgICAgIGRhdGUuc2V0VVRDU2Vjb25kcyhwYXlsb2FkLmV4cCk7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9nb3V0KCk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKChvYnNlcnZlcjogU3Vic2NyaWJlcjxhbnk+KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5yZW1vdmUodGhpcy50b2tlbk5hbWUpO1xyXG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KCk7XHJcbiAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFN0b3JhZ2VUeXBlKHR5cGU6IFN0b3JhZ2VUeXBlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmFnZS51cGRhdGVTdG9yYWdlVHlwZSh0eXBlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGI2NERlY29kZVVuaWNvZGUoc3RyKSB7XHJcbiAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChcclxuICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLm1hcC5jYWxsKGF0b2Ioc3RyKSxcclxuICAgICAgICAgICAgYyA9PiAnJScgKyAoJzAwJyArIGMuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikpLnNsaWNlKC0yKSxcclxuICAgICAgICApLmpvaW4oJycpKTtcclxuICAgIH1cclxufVxyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBSb24gb24gMTcvMTIvMjAxNS5cclxuICovXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gam9pblVybChiYXNlVXJsOiBzdHJpbmcsIHVybDogc3RyaW5nKSB7XHJcbiAgICBpZiAoL14oPzpbYS16XSs6KT9cXC9cXC8vaS50ZXN0KHVybCkpIHtcclxuICAgICAgICByZXR1cm4gdXJsO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBqb2luZWQgPSBbYmFzZVVybCwgdXJsXS5qb2luKCcvJyk7XHJcblxyXG4gICAgbGV0IG5vcm1hbGl6ZSA9IGZ1bmN0aW9uIChzdHIpIHtcclxuICAgICAgICByZXR1cm4gc3RyXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9bXFwvXSsvZywgJy8nKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvXFwvXFw/L2csICc/JylcclxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcL1xcIy9nLCAnIycpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXDpcXC8vZywgJzovLycpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gbm9ybWFsaXplKGpvaW5lZCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWVwTWVyZ2Uob2JqMTogb2JqZWN0LCBvYmoyOiBvYmplY3QpOiBhbnkge1xyXG4gICAgbGV0IHJlc3VsdCA9IHt9O1xyXG4gICAgZm9yIChsZXQgaSBpbiBvYmoxKSB7XHJcbiAgICAgICAgaWYgKG9iajEuaGFzT3duUHJvcGVydHkoaSkpIHtcclxuICAgICAgICAgICAgaWYgKChpIGluIG9iajIpICYmICh0eXBlb2Ygb2JqMVtpXSA9PT0gJ29iamVjdCcpICYmIChpICE9PSBudWxsKSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0W2ldID0gZGVlcE1lcmdlKG9iajFbaV0sIG9iajJbaV0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0W2ldID0gb2JqMVtpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZvciAobGV0IGkgaW4gb2JqMikge1xyXG4gICAgICAgIGlmIChvYmoyLmhhc093blByb3BlcnR5KGkpKSB7XHJcbiAgICAgICAgICAgIGlmIChpIGluIHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVzdWx0W2ldID0gb2JqMltpXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNhbWVsQ2FzZShuYW1lKSB7XHJcbiAgICByZXR1cm4gbmFtZS5yZXBsYWNlKC8oW1xcOlxcLVxcX10rKC4pKS9nLCBmdW5jdGlvbihfLCBzZXBhcmF0b3IsIGxldHRlciwgb2Zmc2V0KSB7XHJcbiAgICAgICAgcmV0dXJuIG9mZnNldCA/IGxldHRlci50b1VwcGVyQ2FzZSgpIDogbGV0dGVyO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBidWlsZFF1ZXJ5U3RyaW5nKG9iajogb2JqZWN0KSB7XHJcbiAgICByZXR1cm4gT2JqZWN0XHJcbiAgICAgICAgLmtleXMob2JqKVxyXG4gICAgICAgIC5tYXAoKGtleSkgPT4gISFvYmpba2V5XSA/IGAke2VuY29kZVVSSUNvbXBvbmVudChrZXkpfT0ke2VuY29kZVVSSUNvbXBvbmVudChvYmpba2V5XSl9YCA6IGtleSlcclxuICAgICAgICAuam9pbignJicpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2luZG93T3JpZ2luKHcgPSB3aW5kb3cpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgaWYgKCF3IHx8ICF3LmxvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXcubG9jYXRpb24ub3JpZ2luKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBgJHt3LmxvY2F0aW9uLnByb3RvY29sfS8vJHt3LmxvY2F0aW9uLmhvc3RuYW1lfSR7dy5sb2NhdGlvbi5wb3J0ID8gJzonICsgdy5sb2NhdGlvbi5wb3J0IDogJyd9YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHcubG9jYXRpb24ub3JpZ2luO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAvLyBpZ25vcmUgRE9NRXhjZXB0aW9uOiBCbG9ja2VkIGEgZnJhbWUgd2l0aCBvcmlnaW4gZnJvbSBhY2Nlc3NpbmcgYSBjcm9zcy1vcmlnaW4gZnJhbWUuXHJcbiAgICAgICAgLy8gZXJyb3IgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiYgZXJyb3IubmFtZSA9PT0gJ1NlY3VyaXR5RXJyb3InXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRGdWxsVXJsUGF0aChsb2NhdGlvbjogSFRNTEFuY2hvckVsZW1lbnR8TG9jYXRpb24pOiBzdHJpbmcge1xyXG4gICAgaWYgKCFsb2NhdGlvbi5wcm90b2NvbCkge1xyXG4gICAgICAgIGxldCB0ZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cclxuICAgICAgICB0ZW1wLmhyZWYgPSBsb2NhdGlvbi5ocmVmO1xyXG5cclxuICAgICAgICBsb2NhdGlvbiA9IHRlbXA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIGxvY2F0aW9uLmhvc3RuYW1lXHJcbiAgICAgICAgKyAobG9jYXRpb24ucG9ydCAmJiBsb2NhdGlvbi5wb3J0ICE9PSAnODAnICYmIGxvY2F0aW9uLnBvcnQgIT09ICc0NDMnID8gbG9jYXRpb24ucG9ydCA6ICcnKSAvLyBBcHBlbmQgdGhlIHBvcnQgb25seSB3aGVuIGl0J3Mgbm90IHRoZSBkZWZhdWx0IFBvcnRcclxuICAgICAgICArICgvXlxcLy8udGVzdChsb2NhdGlvbi5wYXRobmFtZSkgPyBsb2NhdGlvbi5wYXRobmFtZSA6ICcvJyArIGxvY2F0aW9uLnBhdGhuYW1lKTtcclxufSIsImltcG9ydCB7IGdldFdpbmRvd09yaWdpbiwgZ2V0RnVsbFVybFBhdGggfSBmcm9tICcuL3V0aWxzJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBFTVBUWSwgZnJvbUV2ZW50LCBpbnRlcnZhbCwgbWVyZ2UsIE9ic2VydmFibGUsIG9mLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IElQb3B1cE9wdGlvbnMsIElPYXV0aDJPcHRpb25zLCBJT2F1dGgxT3B0aW9ucyB9IGZyb20gJy4vY29uZmlnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBzd2l0Y2hNYXAsIHRha2UsIG1hcCwgZGVsYXkgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG4vKipcclxuICogQ3JlYXRlZCBieSBSb24gb24gMTcvMTIvMjAxNS5cclxuICovXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBQb3B1cFNlcnZpY2Uge1xyXG4gICAgcHVibGljIG9wZW4odXJsOiBzdHJpbmcsIG9wdGlvbnM6IElPYXV0aDJPcHRpb25zIHwgSU9hdXRoMU9wdGlvbnMsIGNvcmRvdmE6IGJvb2xlYW4gfCBudWxsKSB7XHJcbiAgICAgICAgY29uc3Qgc3RyaW5naWZpZWRPcHRpb25zID0gdGhpcy5zdHJpbmdpZnlPcHRpb25zKHRoaXMucHJlcGFyZU9wdGlvbnMob3B0aW9ucy5wb3B1cE9wdGlvbnMpKTtcclxuICAgICAgICBjb25zdCBVQSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xyXG4gICAgICAgIGNvcmRvdmEgPSBjb3Jkb3ZhID09PSBudWxsID8gdGhpcy5pc0NvcmRvdmFBcHAoKSA6IGNvcmRvdmE7XHJcbiAgICAgICAgY29uc3Qgd2luZG93TmFtZSA9IGNvcmRvdmEgPyAnX2JsYW5rJyA6IG9wdGlvbnMubmFtZTtcclxuXHJcbiAgICAgICAgY29uc3QgcG9wdXBXaW5kb3cgPSB3aW5kb3cub3Blbih1cmwsIHdpbmRvd05hbWUsIHN0cmluZ2lmaWVkT3B0aW9ucyk7XHJcblxyXG4gICAgICAgIGlmIChwb3B1cFdpbmRvdyAmJiBwb3B1cFdpbmRvdy5mb2N1cykge1xyXG4gICAgICAgICAgICBwb3B1cFdpbmRvdy5mb2N1cygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvcmRvdmFcclxuICAgICAgICAgICAgPyB0aGlzLmV2ZW50TGlzdGVuZXIocG9wdXBXaW5kb3csIG9wdGlvbnMucmVkaXJlY3RVcmkgfHwgZ2V0V2luZG93T3JpZ2luKCkpXHJcbiAgICAgICAgICAgIDogdGhpcy5wb2xsUG9wdXAocG9wdXBXaW5kb3csIG9wdGlvbnMucmVkaXJlY3RVcmkgfHwgZ2V0V2luZG93T3JpZ2luKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBldmVudExpc3RlbmVyKHBvcHVwV2luZG93OiBXaW5kb3csIHJlZGlyZWN0VXJpOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIXBvcHVwV2luZG93KSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUG9wdXAgd2FzIG5vdCBjcmVhdGVkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtZXJnZShcclxuICAgICAgICAgICAgZnJvbUV2ZW50PEV2ZW50Pihwb3B1cFdpbmRvdywgJ2V4aXQnKS5waXBlKFxyXG4gICAgICAgICAgICAgICAgZGVsYXkoMTAwKSxcclxuICAgICAgICAgICAgICAgIG1hcCgoKSA9PiB7IHRocm93IG5ldyBFcnJvcignQXV0aGVudGljYXRpb24gQ2FuY2VsZWQnKTsgfSksXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGZyb21FdmVudChwb3B1cFdpbmRvdywgJ2xvYWRzdGFydCcpLFxyXG4gICAgICAgICkucGlwZShcclxuICAgICAgICAgICAgc3dpdGNoTWFwKChldmVudDogRXZlbnQgJiB7IHVybDogc3RyaW5nIH0pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghcG9wdXBXaW5kb3cgfHwgcG9wdXBXaW5kb3cuY2xvc2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUudGhyb3cobmV3IEVycm9yKCdBdXRoZW50aWNhdGlvbiBDYW5jZWxlZCcpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChldmVudC51cmwuaW5kZXhPZihyZWRpcmVjdFVyaSkgIT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gRU1QVFk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgcGFyc2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgICAgICAgICAgICAgcGFyc2VyLmhyZWYgPSBldmVudC51cmw7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlci5zZWFyY2ggfHwgcGFyc2VyLmhhc2gpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBxdWVyeVBhcmFtcyA9IHBhcnNlci5zZWFyY2guc3Vic3RyaW5nKDEpLnJlcGxhY2UoL1xcLyQvLCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFzaFBhcmFtcyA9IHBhcnNlci5oYXNoLnN1YnN0cmluZygxKS5yZXBsYWNlKC9cXC8kLywgJycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhc2ggPSB0aGlzLnBhcnNlUXVlcnlTdHJpbmcoaGFzaFBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcXMgPSB0aGlzLnBhcnNlUXVlcnlTdHJpbmcocXVlcnlQYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFsbFBhcmFtcyA9IHsgLi4ucXMsIC4uLmhhc2ggfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcG9wdXBXaW5kb3cuY2xvc2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFsbFBhcmFtcy5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBhbGxQYXJhbXMuZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKGFsbFBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEVNUFRZO1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgdGFrZSgxKSxcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHBvbGxQb3B1cChwb3B1cFdpbmRvdzogV2luZG93LCByZWRpcmVjdFVyaTogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIGludGVydmFsKDUwKVxyXG4gICAgICAgICAgICAucGlwZShcclxuICAgICAgICAgICAgc3dpdGNoTWFwKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghcG9wdXBXaW5kb3cgfHwgcG9wdXBXaW5kb3cuY2xvc2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IobmV3IEVycm9yKCdBdXRoZW50aWNhdGlvbiBDYW5jZWxlZCcpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgcG9wdXBXaW5kb3dQYXRoID0gJyc7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvcHVwV2luZG93UGF0aCAgPSBnZXRGdWxsVXJsUGF0aChwb3B1cFdpbmRvdy5sb2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlnbm9yZSBET01FeGNlcHRpb246IEJsb2NrZWQgYSBmcmFtZSB3aXRoIG9yaWdpbiBmcm9tIGFjY2Vzc2luZyBhIGNyb3NzLW9yaWdpbiBmcmFtZS5cclxuICAgICAgICAgICAgICAgICAgICAvLyBlcnJvciBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJiBlcnJvci5uYW1lID09PSAnU2VjdXJpdHlFcnJvcidcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChyZWRpcmVjdFVyaSA9PT0gcG9wdXBXaW5kb3dQYXRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvcHVwV2luZG93LmxvY2F0aW9uLnNlYXJjaCB8fCBwb3B1cFdpbmRvdy5sb2NhdGlvbi5oYXNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zID0gcG9wdXBXaW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cmluZygxKS5yZXBsYWNlKC9cXC8kLywgJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoYXNoUGFyYW1zID0gcG9wdXBXaW5kb3cubG9jYXRpb24uaGFzaC5zdWJzdHJpbmcoMSkucmVwbGFjZSgvW1xcLyRdLywgJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoYXNoID0gdGhpcy5wYXJzZVF1ZXJ5U3RyaW5nKGhhc2hQYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBxcyA9IHRoaXMucGFyc2VRdWVyeVN0cmluZyhxdWVyeVBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcHVwV2luZG93LmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFsbFBhcmFtcyA9IHsgLi4ucXMsIC4uLmhhc2ggfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFsbFBhcmFtcy5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgYWxsUGFyYW1zLmVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKGFsbFBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihuZXcgRXJyb3IoJ05vIHRva2VuIGZvdW5kIGFmdGVyIHJlZGlyZWN0JykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBFTVBUWTtcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIHRha2UoMSksXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHByZXBhcmVPcHRpb25zKG9wdGlvbnM/OiBJUG9wdXBPcHRpb25zKSB7XHJcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgICAgICAgY29uc3Qgd2lkdGggPSBvcHRpb25zLndpZHRoIHx8IDUwMDtcclxuICAgICAgICBjb25zdCBoZWlnaHQgPSBvcHRpb25zLmhlaWdodCB8fCA1MDA7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgd2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodCxcclxuICAgICAgICAgICAgbGVmdDogd2luZG93LnNjcmVlblggKyAoKHdpbmRvdy5vdXRlcldpZHRoIC0gd2lkdGgpIC8gMiksXHJcbiAgICAgICAgICAgIHRvcDogd2luZG93LnNjcmVlblkgKyAoKHdpbmRvdy5vdXRlckhlaWdodCAtIGhlaWdodCkgLyAyLjUpLFxyXG4gICAgICAgICAgICB0b29sYmFyOiBvcHRpb25zLnZpc2libGVUb29sYmFyID8gJ3llcycgOiAnbm8nLFxyXG4gICAgICAgICAgICAuLi5vcHRpb25zLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdHJpbmdpZnlPcHRpb25zKG9wdGlvbnM6IHsgW2luZGV4OiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuIHwgbnVsbCB8IHVuZGVmaW5lZCB9KSB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC5tYXAoKGtleSkgPT4gb3B0aW9uc1trZXldID09PSBudWxsIHx8IG9wdGlvbnNba2V5XSA9PT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICA/IGtleVxyXG4gICAgICAgICAgICAgICAgOiBrZXkgKyAnPScgKyBvcHRpb25zW2tleV0sXHJcbiAgICAgICAgKS5qb2luKCcsJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwYXJzZVF1ZXJ5U3RyaW5nKGpvaW5lZEtleVZhbHVlOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgICAgIGxldCBrZXk7XHJcbiAgICAgICAgbGV0IHZhbHVlO1xyXG4gICAgICAgIHJldHVybiBqb2luZWRLZXlWYWx1ZS5zcGxpdCgnJicpLnJlZHVjZShcclxuICAgICAgICAgICAgKG9iaiwga2V5VmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChrZXlWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0ga2V5VmFsdWUuc3BsaXQoJz0nKTtcclxuICAgICAgICAgICAgICAgICAgICBrZXkgPSBkZWNvZGVVUklDb21wb25lbnQodmFsdWVbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIG9ialtrZXldID0gdHlwZW9mIHZhbHVlWzFdICE9PSAndW5kZWZpbmVkJyA/IGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZVsxXSkgOiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge30gYXMgeyBbazogc3RyaW5nXTogc3RyaW5nIHwgdHJ1ZSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzQ29yZG92YUFwcCgpIHtcclxuICAgICAgICByZXR1cm4gISEod2luZG93ICYmIChcclxuICAgICAgICAgICAgKHdpbmRvdyBhcyBhbnkpLmNvcmRvdmEgfHxcclxuICAgICAgICAgICAgd2luZG93Lm5hdmlnYXRvciAmJiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCAmJiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdDcmlPUycpID4gLTFcclxuICAgICAgICApKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJT2F1dGhTZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aC1zZXJ2aWNlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUG9wdXBTZXJ2aWNlIH0gZnJvbSAnLi9wb3B1cC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgam9pblVybCwgYnVpbGRRdWVyeVN0cmluZyB9IGZyb20gJy4vdXRpbHMnO1xyXG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlLCBJT2F1dGgxT3B0aW9ucyB9IGZyb20gJy4vY29uZmlnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFJvbiBvbiAxNy8xMi8yMDE1LlxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgT2F1dGgxU2VydmljZSBpbXBsZW1lbnRzIElPYXV0aFNlcnZpY2Uge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgICAgICBwcml2YXRlIHBvcHVwOiBQb3B1cFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UsXHJcbiAgICApIHsgfVxyXG5cclxuICAgIG9wZW48VCBleHRlbmRzIG9iamVjdCB8IHN0cmluZyA9IGFueT4ob2F1dGhPcHRpb25zOiBJT2F1dGgxT3B0aW9ucywgdXNlckRhdGE6IG9iamVjdCk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgICAgIGNvbnN0IHNlcnZlclVybCA9IHRoaXMuY29uZmlnLm9wdGlvbnMuYmFzZVVybFxyXG4gICAgICAgICAgICA/IGpvaW5VcmwodGhpcy5jb25maWcub3B0aW9ucy5iYXNlVXJsLCBvYXV0aE9wdGlvbnMudXJsKVxyXG4gICAgICAgICAgICA6IG9hdXRoT3B0aW9ucy51cmw7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxvYmplY3Q+KHNlcnZlclVybCwgb2F1dGhPcHRpb25zKS5waXBlKFxyXG4gICAgICAgICAgICBzd2l0Y2hNYXAoKGF1dGhvcml6YXRpb25EYXRhKSA9PiB0aGlzLnBvcHVwLm9wZW4oXHJcbiAgICAgICAgICAgICAgICBbb2F1dGhPcHRpb25zLmF1dGhvcml6YXRpb25FbmRwb2ludCwgYnVpbGRRdWVyeVN0cmluZyhhdXRob3JpemF0aW9uRGF0YSldLmpvaW4oJz8nKSxcclxuICAgICAgICAgICAgICAgIG9hdXRoT3B0aW9ucyxcclxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLm9wdGlvbnMuY29yZG92YSxcclxuICAgICAgICAgICAgKSwgKGF1dGhvcml6YXRpb25EYXRhLCBvYXV0aERhdGEpID0+ICh7IGF1dGhvcml6YXRpb25EYXRhLCBvYXV0aERhdGEgfSkpLFxyXG4gICAgICAgICAgICBzd2l0Y2hNYXAoKHsgYXV0aG9yaXphdGlvbkRhdGEsIG9hdXRoRGF0YSB9KSA9PiB0aGlzLmV4Y2hhbmdlRm9yVG9rZW48VD4ob2F1dGhPcHRpb25zLCBhdXRob3JpemF0aW9uRGF0YSwgb2F1dGhEYXRhLCB1c2VyRGF0YSkpLFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBleGNoYW5nZUZvclRva2VuPFQ+KG9hdXRoT3B0aW9uczogSU9hdXRoMU9wdGlvbnMsIGF1dGhvcml6YXRpb25EYXRhOiBvYmplY3QsIG9hdXRoRGF0YTogb2JqZWN0LCB1c2VyRGF0YTogb2JqZWN0KSB7XHJcbiAgICAgICAgY29uc3QgYm9keSA9IHsgYXV0aG9yaXphdGlvbkRhdGEsIG9hdXRoRGF0YSwgdXNlckRhdGEgfTtcclxuICAgICAgICBjb25zdCB7IHdpdGhDcmVkZW50aWFscywgYmFzZVVybCB9ID0gdGhpcy5jb25maWcub3B0aW9ucztcclxuICAgICAgICBjb25zdCB7IG1ldGhvZCA9ICdQT1NUJywgdXJsIH0gPSBvYXV0aE9wdGlvbnM7XHJcbiAgICAgICAgY29uc3QgZXhjaGFuZ2VGb3JUb2tlblVybCA9IGJhc2VVcmwgPyBqb2luVXJsKGJhc2VVcmwsIHVybCkgOiB1cmw7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5yZXF1ZXN0PFQ+KG1ldGhvZCwgZXhjaGFuZ2VGb3JUb2tlblVybCwgeyBib2R5LCB3aXRoQ3JlZGVudGlhbHMgfSlcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJT2F1dGhTZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aC1zZXJ2aWNlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgam9pblVybCwgYnVpbGRRdWVyeVN0cmluZywgZ2V0V2luZG93T3JpZ2luIH0gZnJvbSAnLi91dGlscyc7XHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UsIElPYXV0aDJPcHRpb25zIH0gZnJvbSAnLi9jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IFBvcHVwU2VydmljZSB9IGZyb20gJy4vcG9wdXAuc2VydmljZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFJvbiBvbiAxNy8xMi8yMDE1LlxyXG4gKi9cclxuXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBPYXV0aDJTZXJ2aWNlIGltcGxlbWVudHMgSU9hdXRoU2VydmljZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgICAgIHByaXZhdGUgcG9wdXA6IFBvcHVwU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSkge1xyXG4gICAgfVxyXG5cclxuICAgIG9wZW48VCBleHRlbmRzIG9iamVjdCB8IHN0cmluZyA9IGFueT4ob2F1dGhPcHRpb25zOiBJT2F1dGgyT3B0aW9ucywgdXNlckRhdGE6IG9iamVjdCk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgICAgIGNvbnN0IGF1dGhvcml6YXRpb25EYXRhID0gdGhpcy5nZXRBdXRob3JpemF0aW9uRGF0YShvYXV0aE9wdGlvbnMpO1xyXG4gICAgICAgIGNvbnN0IHVybCA9IFtvYXV0aE9wdGlvbnMuYXV0aG9yaXphdGlvbkVuZHBvaW50LCBidWlsZFF1ZXJ5U3RyaW5nKGF1dGhvcml6YXRpb25EYXRhKV0uam9pbignPycpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBvcHVwLm9wZW4odXJsLCBvYXV0aE9wdGlvbnMsIHRoaXMuY29uZmlnLm9wdGlvbnMuY29yZG92YSkucGlwZShcclxuICAgICAgICAgICAgc3dpdGNoTWFwKChvYXV0aERhdGE6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gd2hlbiBubyBzZXJ2ZXIgVVJMIHByb3ZpZGVkLCByZXR1cm4gcG9wdXAgcGFyYW1zIGFzLWlzLlxyXG4gICAgICAgICAgICAgICAgLy8gdGhpcyBpcyBmb3IgYSBzY2VuYXJpbyB3aGVuIHNvbWVvbmUgd2lzaGVzIHRvIG9wdCBvdXQgZnJvbVxyXG4gICAgICAgICAgICAgICAgLy8gc2F0ZWxsaXplcidzIG1hZ2ljIGJ5IGRvaW5nIGF1dGhvcml6YXRpb24gY29kZSBleGNoYW5nZSBhbmRcclxuICAgICAgICAgICAgICAgIC8vIHNhdmluZyBhIHRva2VuIG1hbnVhbGx5LlxyXG4gICAgICAgICAgICAgICAgaWYgKG9hdXRoT3B0aW9ucy5yZXNwb25zZVR5cGUgPT09ICd0b2tlbicgfHwgIW9hdXRoT3B0aW9ucy51cmwpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2Yob2F1dGhEYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAob2F1dGhEYXRhLnN0YXRlICYmIG9hdXRoRGF0YS5zdGF0ZSAhPT0gYXV0aG9yaXphdGlvbkRhdGEuc3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ09BdXRoIFwic3RhdGVcIiBtaXNtYXRjaCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhjaGFuZ2VGb3JUb2tlbjxUPihvYXV0aE9wdGlvbnMsIGF1dGhvcml6YXRpb25EYXRhLCBvYXV0aERhdGEsIHVzZXJEYXRhKTtcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGV4Y2hhbmdlRm9yVG9rZW48VD4ob3B0aW9uczogSU9hdXRoMk9wdGlvbnMsIGF1dGhvcml6YXRpb25EYXRhOiBvYmplY3QsIG9hdXRoRGF0YTogb2JqZWN0LCB1c2VyRGF0YTogb2JqZWN0KSB7XHJcbiAgICAgICAgY29uc3QgYm9keSA9IHsgYXV0aG9yaXphdGlvbkRhdGEsIG9hdXRoRGF0YSwgdXNlckRhdGEgfTtcclxuICAgICAgICBjb25zdCB7IGJhc2VVcmwsIHdpdGhDcmVkZW50aWFscyB9ID0gdGhpcy5jb25maWcub3B0aW9ucztcclxuICAgICAgICBjb25zdCB7IHVybCwgbWV0aG9kID0gJ1BPU1QnIH0gPSBvcHRpb25zO1xyXG4gICAgICAgIGNvbnN0IGV4Y2hhbmdlRm9yVG9rZW5VcmwgPSBiYXNlVXJsID8gam9pblVybChiYXNlVXJsLCB1cmwpIDogdXJsO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdDxUPihtZXRob2QsIGV4Y2hhbmdlRm9yVG9rZW5VcmwsIHsgYm9keSwgd2l0aENyZWRlbnRpYWxzIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0QXV0aG9yaXphdGlvbkRhdGEob3B0aW9uczogSU9hdXRoMk9wdGlvbnMpIHtcclxuICAgICAgICBjb25zdCB7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlVHlwZSA9ICdjb2RlJyxcclxuICAgICAgICAgICAgY2xpZW50SWQsXHJcbiAgICAgICAgICAgIHJlZGlyZWN0VXJpID0gZ2V0V2luZG93T3JpZ2luKCkgfHwgJycsXHJcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyID0gJywnLFxyXG4gICAgICAgICAgICBzY29wZSxcclxuICAgICAgICAgICAgc3RhdGUsXHJcbiAgICAgICAgICAgIGFkZGl0aW9uYWxVcmxQYXJhbXMsXHJcbiAgICAgICAgfSA9IG9wdGlvbnM7XHJcbiAgICAgICAgY29uc3QgcmVzb2x2ZWRTdGF0ZSA9IHR5cGVvZiBzdGF0ZSA9PT0gJ2Z1bmN0aW9uJyA/IHN0YXRlKCkgOiBzdGF0ZTtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBbJ3Jlc3BvbnNlX3R5cGUnLCByZXNwb25zZVR5cGVdLFxyXG4gICAgICAgICAgICBbJ2NsaWVudF9pZCcsIGNsaWVudElkXSxcclxuICAgICAgICAgICAgWydyZWRpcmVjdF91cmknLCByZWRpcmVjdFVyaV0sXHJcbiAgICAgICAgICAgIC4uLnN0YXRlID8gW1snc3RhdGUnLCByZXNvbHZlZFN0YXRlXV0gOiBbXSxcclxuICAgICAgICAgICAgLi4uc2NvcGUgPyBbWydzY29wZScsIHNjb3BlLmpvaW4oc2NvcGVEZWxpbWl0ZXIpXV0gOiBbXSxcclxuICAgICAgICAgICAgLi4uYWRkaXRpb25hbFVybFBhcmFtc1xyXG4gICAgICAgICAgICAgICAgPyBPYmplY3RcclxuICAgICAgICAgICAgICAgICAgICAua2V5cyhhZGRpdGlvbmFsVXJsUGFyYW1zKVxyXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZTogc3RyaW5nIHwgKCgpID0+IHN0cmluZykgfCBudWxsIHwgdW5kZWZpbmVkID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChhZGRpdGlvbmFsVXJsUGFyYW1zIGFzIGFueSlba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBba2V5LCB2YWx1ZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW2tleSwgdmFsdWUoKV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBba2V5LCAnJ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsnJywgJyddO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICA6IFtdLFxyXG4gICAgICAgIF0uZmlsdGVyKChfKSA9PiAhIV9bMF0pLnJlZHVjZSgoYWNjLCBuZXh0KSA9PiAoeyAuLi5hY2MsIFtuZXh0WzBdXTogbmV4dFsxXSB9KSwge30gYXMgeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSU9hdXRoU2VydmljZSB9IGZyb20gJy4vb2F1dGgtc2VydmljZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBQb3B1cFNlcnZpY2UgfSBmcm9tICcuL3BvcHVwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYXV0aDFTZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aDEuc2VydmljZSc7XHJcbmltcG9ydCB7IE9hdXRoMlNlcnZpY2UgfSBmcm9tICcuL29hdXRoMi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU2hhcmVkU2VydmljZSB9IGZyb20gJy4vc2hhcmVkLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBqb2luVXJsIH0gZnJvbSAnLi91dGlscyc7XHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2NvbmZpZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcblxyXG4vKipcclxuICogQ3JlYXRlZCBieSBSb24gb24gMTcvMTIvMjAxNS5cclxuICovXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBPYXV0aFNlcnZpY2Uge1xyXG4gICAgcmVhZG9ubHkgZGVwUHJvdmlkZXJzID0gW1xyXG4gICAgICAgIHsgcHJvdmlkZTogSHR0cENsaWVudCwgdXNlVmFsdWU6IHRoaXMuaHR0cCB9LFxyXG4gICAgICAgIHsgcHJvdmlkZTogUG9wdXBTZXJ2aWNlLCB1c2VWYWx1ZTogdGhpcy5wb3B1cCB9LFxyXG4gICAgICAgIHsgcHJvdmlkZTogQ29uZmlnU2VydmljZSwgdXNlVmFsdWU6IHRoaXMuY29uZmlnIH0sXHJcbiAgICBdO1xyXG4gICAgcmVhZG9ubHkgZGVwcyA9IFtIdHRwQ2xpZW50LCBQb3B1cFNlcnZpY2UsIENvbmZpZ1NlcnZpY2VdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgICAgICBwcml2YXRlIHNoYXJlZDogU2hhcmVkU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHBvcHVwOiBQb3B1cFNlcnZpY2UpIHsgfVxyXG5cclxuICAgIHB1YmxpYyBhdXRoZW50aWNhdGU8VCBleHRlbmRzIG9iamVjdCB8IHN0cmluZz4obmFtZTogc3RyaW5nLCB1c2VyRGF0YT86IGFueSk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgICAgIGNvbnN0IHByb3ZpZGVyOiBJT2F1dGhTZXJ2aWNlID0gdGhpcy5jb25maWcub3B0aW9ucy5wcm92aWRlcnNbbmFtZV0ub2F1dGhUeXBlID09PSAnMS4wJ1xyXG4gICAgICAgICAgICA/IEluamVjdG9yLmNyZWF0ZShbXHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLmRlcFByb3ZpZGVycyxcclxuICAgICAgICAgICAgICAgIHsgcHJvdmlkZTogT2F1dGgxU2VydmljZSwgZGVwczogdGhpcy5kZXBzIH0sXHJcbiAgICAgICAgICAgIF0pLmdldChPYXV0aDFTZXJ2aWNlKVxyXG4gICAgICAgICAgICA6IEluamVjdG9yLmNyZWF0ZShbXHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLmRlcFByb3ZpZGVycyxcclxuICAgICAgICAgICAgICAgIHsgcHJvdmlkZTogT2F1dGgyU2VydmljZSwgZGVwczogdGhpcy5kZXBzIH0sXHJcbiAgICAgICAgICAgIF0pLmdldChPYXV0aDJTZXJ2aWNlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHByb3ZpZGVyLm9wZW48VD4odGhpcy5jb25maWcub3B0aW9ucy5wcm92aWRlcnNbbmFtZV0sIHVzZXJEYXRhIHx8IHt9KVxyXG4gICAgICAgICAgICAucGlwZSh0YXAoKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIGZvciBhIHNjZW5hcmlvIHdoZW4gc29tZW9uZSB3aXNoZXMgdG8gb3B0IG91dCBmcm9tXHJcbiAgICAgICAgICAgICAgICAvLyBzYXRlbGxpemVyJ3MgbWFnaWMgYnkgZG9pbmcgYXV0aG9yaXphdGlvbiBjb2RlIGV4Y2hhbmdlIGFuZFxyXG4gICAgICAgICAgICAgICAgLy8gc2F2aW5nIGEgdG9rZW4gbWFudWFsbHkuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25maWcub3B0aW9ucy5wcm92aWRlcnNbbmFtZV0udXJsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGFyZWQuc2V0VG9rZW4ocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVubGluazxUPihcclxuICAgICAgICBwcm92aWRlcjogc3RyaW5nLFxyXG4gICAgICAgIHVybCA9IGpvaW5VcmwodGhpcy5jb25maWcub3B0aW9ucy5iYXNlVXJsLCB0aGlzLmNvbmZpZy5vcHRpb25zLnVubGlua1VybCksXHJcbiAgICAgICAgbWV0aG9kID0gJ1BPU1QnKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5yZXF1ZXN0PFQ+KG1ldGhvZCwgdXJsLCB7IGJvZHk6IHsgcHJvdmlkZXIgfSB9KTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4vY29uZmlnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBqb2luVXJsIH0gZnJvbSAnLi91dGlscyc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgUm9uIG9uIDE3LzEyLzIwMTUuXHJcbiAqL1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTG9jYWxTZXJ2aWNlIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgICAgICBwcml2YXRlIHNoYXJlZDogU2hhcmVkU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSkgeyB9XHJcblxyXG4gICAgcHVibGljIGxvZ2luPFQgZXh0ZW5kcyBzdHJpbmcgfCBvYmplY3Q+KHVzZXI6IHN0cmluZyB8IG9iamVjdCwgdXJsPzogc3RyaW5nKTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PFQ+KHVybCB8fCBqb2luVXJsKHRoaXMuY29uZmlnLm9wdGlvbnMuYmFzZVVybCwgdGhpcy5jb25maWcub3B0aW9ucy5sb2dpblVybCksIHVzZXIpXHJcbiAgICAgICAgICAgIC5waXBlKHRhcCgoZGF0YSkgPT4gdGhpcy5zaGFyZWQuc2V0VG9rZW4oZGF0YSkpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2lnbnVwPFQgPSBhbnk+KHVzZXI6IHN0cmluZyB8IG9iamVjdCwgdXJsPzogc3RyaW5nKTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PFQ+KHVybCB8fCBqb2luVXJsKHRoaXMuY29uZmlnLm9wdGlvbnMuYmFzZVVybCwgdGhpcy5jb25maWcub3B0aW9ucy5zaWdudXBVcmwpLCB1c2VyKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTG9jYWxTZXJ2aWNlIH0gZnJvbSAnLi9sb2NhbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgT2F1dGhTZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBTdG9yYWdlVHlwZSB9IGZyb20gJy4vc3RvcmFnZS10eXBlLmVudW0nO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgUm9uIG9uIDE3LzEyLzIwMTUuXHJcbiAqL1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQXV0aFNlcnZpY2Uge1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzaGFyZWQ6IFNoYXJlZFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBsb2NhbDogTG9jYWxTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgb2F1dGg6IE9hdXRoU2VydmljZSkge1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2dpbjxUIGV4dGVuZHMgc3RyaW5nIHwgb2JqZWN0ID0gYW55Pih1c2VyOiBzdHJpbmcgfCBvYmplY3QsIHVybD86IHN0cmluZyk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsLmxvZ2luPFQ+KHVzZXIsIHVybCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNpZ251cDxUID0gYW55Pih1c2VyOiBzdHJpbmcgfCBvYmplY3QsIHVybD86IHN0cmluZyk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsLnNpZ251cDxUPih1c2VyLCB1cmwpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2dvdXQoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hhcmVkLmxvZ291dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhdXRoZW50aWNhdGU8VCBleHRlbmRzIG9iamVjdCB8IHN0cmluZz4obmFtZTogc3RyaW5nLCB1c2VyRGF0YT86IGFueSk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm9hdXRoLmF1dGhlbnRpY2F0ZTxUPihuYW1lLCB1c2VyRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxpbms8VCBleHRlbmRzIG9iamVjdCB8IHN0cmluZz4obmFtZTogc3RyaW5nLCB1c2VyRGF0YT86IGFueSk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm9hdXRoLmF1dGhlbnRpY2F0ZTxUPihuYW1lLCB1c2VyRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVubGluazxUID0gYW55Pihwcm92aWRlcjogc3RyaW5nLCB1cmw/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5vYXV0aC51bmxpbms8VD4ocHJvdmlkZXIsIHVybCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzQXV0aGVudGljYXRlZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zaGFyZWQuaXNBdXRoZW50aWNhdGVkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFRva2VuKCk6IHN0cmluZyB8IG51bGwge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNoYXJlZC5nZXRUb2tlbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRUb2tlbih0b2tlbjogc3RyaW5nIHwgb2JqZWN0KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zaGFyZWQuc2V0VG9rZW4odG9rZW4pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVUb2tlbigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNoYXJlZC5yZW1vdmVUb2tlbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRQYXlsb2FkKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hhcmVkLmdldFBheWxvYWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0U3RvcmFnZVR5cGUodHlwZTogU3RvcmFnZVR5cGUpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zaGFyZWQuc2V0U3RvcmFnZVR5cGUodHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEV4cGlyYXRpb25EYXRlKCk6IERhdGUgfCBudWxsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zaGFyZWQuZ2V0RXhwaXJhdGlvbkRhdGUoKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwRXZlbnQsIEh0dHBJbnRlcmNlcHRvciwgSHR0cEhhbmRsZXIsIEh0dHBSZXF1ZXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBKd3RJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHNoYXJlZDogU2hhcmVkU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSxcclxuICAgICkgeyB9XHJcblxyXG4gICAgaW50ZXJjZXB0KHJlcTogSHR0cFJlcXVlc3Q8YW55PiwgbmV4dDogSHR0cEhhbmRsZXIpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XHJcbiAgICAgICAgY29uc3QgeyBhdXRoSGVhZGVyLCBhdXRoVG9rZW4gfSA9IHRoaXMuY29uZmlnLm9wdGlvbnM7XHJcbiAgICAgICAgY29uc3QgdG9rZW4gPSB0aGlzLnNoYXJlZC5nZXRUb2tlbigpO1xyXG4gICAgICAgIGNvbnN0IGlzQXV0aGVudGljYXRlZCA9IHRoaXMuc2hhcmVkLmlzQXV0aGVudGljYXRlZDtcclxuICAgICAgICBjb25zdCBuZXdSZXEgPSBpc0F1dGhlbnRpY2F0ZWQgJiYgIXJlcS5oZWFkZXJzLmhhcyhhdXRoSGVhZGVyKVxyXG4gICAgICAgICAgICA/IHJlcS5jbG9uZSh7IHNldEhlYWRlcnM6IHsgW2F1dGhIZWFkZXJdOiBgJHthdXRoVG9rZW59ICR7dG9rZW59YCB9IH0pXHJcbiAgICAgICAgICAgIDogcmVxO1xyXG4gICAgICAgIHJldHVybiBuZXh0LmhhbmRsZShuZXdSZXEpO1xyXG4gICAgfVxyXG5cclxufSIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFJvbiBvbiAyNS8xMi8yMDE1LlxyXG4gKi9cclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSwgSVBhcnRpYWxDb25maWdPcHRpb25zLCBDT05GSUdfT1BUSU9OUywgSVByb3ZpZGVycyB9IGZyb20gJy4vY29uZmlnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTaGFyZWRTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQuc2VydmljZSc7XHJcbmltcG9ydCB7IE9hdXRoU2VydmljZSB9IGZyb20gJy4vb2F1dGguc2VydmljZSc7XHJcbmltcG9ydCB7IFBvcHVwU2VydmljZSB9IGZyb20gJy4vcG9wdXAuc2VydmljZSc7XHJcbmltcG9ydCB7IE9hdXRoMVNlcnZpY2UgfSBmcm9tICcuL29hdXRoMS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgT2F1dGgyU2VydmljZSB9IGZyb20gJy4vb2F1dGgyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMb2NhbFNlcnZpY2UgfSBmcm9tICcuL2xvY2FsLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4vYXV0aC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSnd0SW50ZXJjZXB0b3IgfSBmcm9tICcuL2ludGVyY2VwdG9yLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdG9yYWdlU2VydmljZSwgQnJvd3NlclN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9zdG9yYWdlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIVFRQX0lOVEVSQ0VQVE9SUywgSHR0cENsaWVudE1vZHVsZSwgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgU3RvcmFnZVR5cGUgfSBmcm9tICcuL3N0b3JhZ2UtdHlwZS5lbnVtJztcclxuXHJcbkBOZ01vZHVsZSh7IGltcG9ydHM6IFtIdHRwQ2xpZW50TW9kdWxlXSB9KVxyXG5leHBvcnQgY2xhc3MgTmcyVWlBdXRoTW9kdWxlIHtcclxuICAgIHN0YXRpYyBmb3JSb290KGNvbmZpZ09wdGlvbnM/OiBJUGFydGlhbENvbmZpZ09wdGlvbnMsIGRlZmF1bHRKd3RJbnRlcmNlcHRvciA9IHRydWUpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuZ01vZHVsZTogTmcyVWlBdXRoTW9kdWxlLFxyXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICAgICAgICAgIC4uLmNvbmZpZ09wdGlvbnMgPyBbeyBwcm92aWRlOiBDT05GSUdfT1BUSU9OUywgdXNlVmFsdWU6IGNvbmZpZ09wdGlvbnMgfV0gOiBbXSxcclxuICAgICAgICAgICAgICAgIHsgcHJvdmlkZTogQ29uZmlnU2VydmljZSwgdXNlQ2xhc3M6IENvbmZpZ1NlcnZpY2UsIGRlcHM6IFtDT05GSUdfT1BUSU9OU10gfSxcclxuICAgICAgICAgICAgICAgIHsgcHJvdmlkZTogU3RvcmFnZVNlcnZpY2UsIHVzZUNsYXNzOiBCcm93c2VyU3RvcmFnZVNlcnZpY2UsIGRlcHM6IFtDb25maWdTZXJ2aWNlXSB9LFxyXG4gICAgICAgICAgICAgICAgeyBwcm92aWRlOiBTaGFyZWRTZXJ2aWNlLCB1c2VDbGFzczogU2hhcmVkU2VydmljZSwgZGVwczogW1N0b3JhZ2VTZXJ2aWNlLCBDb25maWdTZXJ2aWNlXSB9LFxyXG4gICAgICAgICAgICAgICAgLi4uZGVmYXVsdEp3dEludGVyY2VwdG9yID8gW3sgcHJvdmlkZTogSFRUUF9JTlRFUkNFUFRPUlMsIHVzZUNsYXNzOiBKd3RJbnRlcmNlcHRvciwgbXVsdGk6IHRydWUsIGRlcHM6IFtTaGFyZWRTZXJ2aWNlLCBDb25maWdTZXJ2aWNlXSB9XSA6IFtdLFxyXG4gICAgICAgICAgICAgICAgeyBwcm92aWRlOiBPYXV0aFNlcnZpY2UsIHVzZUNsYXNzOiBPYXV0aFNlcnZpY2UsIGRlcHM6IFtIdHRwQ2xpZW50LCBTaGFyZWRTZXJ2aWNlLCBDb25maWdTZXJ2aWNlLCBQb3B1cFNlcnZpY2VdIH0sXHJcbiAgICAgICAgICAgICAgICB7IHByb3ZpZGU6IFBvcHVwU2VydmljZSwgdXNlQ2xhc3M6IFBvcHVwU2VydmljZSwgZGVwczogW0NvbmZpZ1NlcnZpY2VdIH0sXHJcbiAgICAgICAgICAgICAgICB7IHByb3ZpZGU6IExvY2FsU2VydmljZSwgdXNlQ2xhc3M6IExvY2FsU2VydmljZSwgZGVwczogW0h0dHBDbGllbnQsIFNoYXJlZFNlcnZpY2UsIENvbmZpZ1NlcnZpY2VdIH0sXHJcbiAgICAgICAgICAgICAgICB7IHByb3ZpZGU6IEF1dGhTZXJ2aWNlLCB1c2VDbGFzczogQXV0aFNlcnZpY2UsIGRlcHM6IFtTaGFyZWRTZXJ2aWNlLCBMb2NhbFNlcnZpY2UsIE9hdXRoU2VydmljZV0gfSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge1xyXG4gICAgTG9jYWxTZXJ2aWNlLFxyXG4gICAgT2F1dGgyU2VydmljZSxcclxuICAgIE9hdXRoMVNlcnZpY2UsXHJcbiAgICBQb3B1cFNlcnZpY2UsXHJcbiAgICBPYXV0aFNlcnZpY2UsXHJcbiAgICBTaGFyZWRTZXJ2aWNlLFxyXG4gICAgU3RvcmFnZVNlcnZpY2UsIEJyb3dzZXJTdG9yYWdlU2VydmljZSxcclxuICAgIEF1dGhTZXJ2aWNlLFxyXG4gICAgQ29uZmlnU2VydmljZSwgSVBhcnRpYWxDb25maWdPcHRpb25zLFxyXG4gICAgSnd0SW50ZXJjZXB0b3IsXHJcbiAgICBDT05GSUdfT1BUSU9OUyxcclxuICAgIElQcm92aWRlcnMsXHJcbiAgICBTdG9yYWdlVHlwZSxcclxufTsiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLE1BQWEsSUFBSSxHQUFHLE1BQU0sQ0FBQzs7QUFDM0IsTUFBYSxNQUFNLEdBQUcsUUFBUSxDQUFDOztBQUMvQixNQUFhLGFBQWEsR0FBRyxjQUFjLENBQUM7O0FBQzVDLE1BQWEsZUFBZSxHQUFHLGdCQUFnQixDQUFDOztBQUNoRCxNQUFhLE1BQU0sR0FBRyxRQUFRLENBQUM7O0FBQy9CLE1BQWEsY0FBYyxHQUFHLGVBQWUsQ0FBQzs7Ozs7O0FDTjlDOzs7QUFPQSxNQUFhLGNBQWMsR0FBRyxJQUFJLGNBQWMsQ0FBTSxnQkFBZ0IsQ0FBQyxDQUFDOztBQThFeEUsTUFBYSxjQUFjLEdBQW1CO0lBQzFDLGVBQWUsRUFBRSxLQUFLO0lBQ3RCLFNBQVMsRUFBRSxJQUFJO0lBQ2YsT0FBTyxFQUFFLEdBQUc7SUFDWixRQUFRLEVBQUUsYUFBYTtJQUN2QixTQUFTLEVBQUUsY0FBYztJQUN6QixTQUFTLEVBQUUsZUFBZTtJQUMxQixTQUFTLEVBQUUsT0FBTztJQUNsQixjQUFjLEVBQUUsR0FBRztJQUNuQixXQUFXLEVBQUUsYUFBYTtJQUMxQixVQUFVLEVBQUUsZUFBZTtJQUMzQixTQUFTLEVBQUUsUUFBUTtJQUNuQixXQUFXLEVBQUUsYUFBYTtJQUMxQixPQUFPLEVBQUUsSUFBSTtJQUNiLFlBQVksRUFBRSxDQUFDLFFBQWEsRUFBRSxNQUFzQjs7UUFDaEQsTUFBTSxXQUFXLEdBQTBELFFBQVE7YUFDOUUsUUFBUSxDQUFDLFlBQVksSUFBSSxRQUFRLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMv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