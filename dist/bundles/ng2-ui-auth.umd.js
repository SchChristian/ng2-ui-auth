(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@angular/common/http')) :
    typeof define === 'function' && define.amd ? define('ng2-ui-auth', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', '@angular/common/http'], factory) :
    (factory((global['ng2-ui-auth'] = {}),global.ng.core,global.rxjs,global.rxjs.operators,global.ng.common.http));
}(this, (function (exports,core,rxjs,operators,http) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var NONE = 'none';
    /** @type {?} */
    var MEMORY = 'memory';
    /** @type {?} */
    var LOCAL_STORAGE = 'localStorage';
    /** @type {?} */
    var SESSION_STORAGE = 'sessionStorage';
    /** @type {?} */
    var COOKIE = 'cookie';
    /** @type {?} */
    var SESSION_COOKIE = 'sessionCookie';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var CONFIG_OPTIONS = new core.InjectionToken('config.options');
    /** @type {?} */
    var defaultOptions = {
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
        resolveToken: function (response, config) {
            /** @type {?} */
            var accessToken = response &&
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
            var tokenRootData = config.tokenRoot && config.tokenRoot
                .split('.')
                .reduce(function (o, x) {
                return o[x];
            }, accessToken);
            /** @type {?} */
            var token = tokenRootData ? tokenRootData[config.tokenName] : accessToken[config.tokenName];
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
                state: function () { return encodeURIComponent(Math.random().toString(36).substr(2)); },
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
                state: function () { return encodeURIComponent(Math.random().toString(36).substr(2)); },
            },
        },
    };
    var ConfigService = /** @class */ (function () {
        function ConfigService(options) {
            /** @type {?} */
            var optionObj;
            if (typeof options === 'function') {
                optionObj = options();
            }
            else {
                optionObj = options;
            }
            this.options = /** @type {?} */ (__assign({}, defaultOptions, options, { providers: __assign({}, optionObj.providers, Object
                    .keys(defaultOptions.providers)
                    .concat(Object.keys(optionObj.providers || {}))
                    .map(function (key) {
                    var _a, _b;
                    return optionObj.providers && optionObj.providers[key]
                        ? (_a = {}, _a[key] = __assign({}, defaultOptions.providers[key], optionObj.providers[key]), _a) : (_b = {}, _b[key] = defaultOptions.providers[key], _b);
                })
                    .reduce(function (acc, next) { return (__assign({}, acc, next)); }, {})) }));
        }
        ConfigService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        ConfigService.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: core.Inject, args: [CONFIG_OPTIONS,] }] }
            ];
        };
        return ConfigService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * @abstract
     */
    var /**
     * @abstract
     */ StorageService = /** @class */ (function () {
        function StorageService() {
        }
        return StorageService;
    }());
    /**
     * Created by Ron on 17/12/2015.
     */
    var BrowserStorageService = /** @class */ (function (_super) {
        __extends(BrowserStorageService, _super);
        function BrowserStorageService(config) {
            var _this = _super.call(this) || this;
            _this.config = config;
            _this.store = {};
            _this.storageType = MEMORY;
            if (!_this.updateStorageType(config.options.storageType)) {
                console.warn(config.options.storageType + ' is not available.');
            }
            return _this;
        }
        /**
         * @param {?} storageType
         * @return {?}
         */
        BrowserStorageService.prototype.updateStorageType = /**
         * @param {?} storageType
         * @return {?}
         */
            function (storageType) {
                /** @type {?} */
                var isStorageAvailable = this.checkIsStorageAvailable(storageType);
                if (!isStorageAvailable) {
                    return false;
                }
                this.storageType = storageType;
                return true;
            };
        /**
         * @param {?} key
         * @return {?}
         */
        BrowserStorageService.prototype.get = /**
         * @param {?} key
         * @return {?}
         */
            function (key) {
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
            };
        /**
         * @param {?} key
         * @param {?} value
         * @param {?} date
         * @return {?}
         */
        BrowserStorageService.prototype.set = /**
         * @param {?} key
         * @param {?} value
         * @param {?} date
         * @return {?}
         */
            function (key, value, date) {
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
            };
        /**
         * @param {?} key
         * @return {?}
         */
        BrowserStorageService.prototype.remove = /**
         * @param {?} key
         * @return {?}
         */
            function (key) {
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
            };
        /**
         * @param {?} storageType
         * @return {?}
         */
        BrowserStorageService.prototype.checkIsStorageAvailable = /**
         * @param {?} storageType
         * @return {?}
         */
            function (storageType) {
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
            };
        /**
         * @param {?} storageType
         * @return {?}
         */
        BrowserStorageService.prototype.isWindowStorageAvailable = /**
         * @param {?} storageType
         * @return {?}
         */
            function (storageType) {
                try {
                    /** @type {?} */
                    var supported = window && storageType in window && window[storageType] !== null;
                    if (supported) {
                        /** @type {?} */
                        var key = Math.random().toString(36).substring(7);
                        window[storageType].setItem(key, '');
                        window[storageType].removeItem(key);
                    }
                    return supported;
                }
                catch (e) {
                    return false;
                }
            };
        /**
         * @return {?}
         */
        BrowserStorageService.prototype.isCookieStorageAvailable = /**
         * @return {?}
         */
            function () {
                try {
                    /** @type {?} */
                    var supported = document && 'cookie' in document;
                    if (supported) {
                        /** @type {?} */
                        var key = Math.random().toString(36).substring(7);
                        this.setCookie(key, 'test', new Date(Date.now() + 60 * 1000).toUTCString());
                        /** @type {?} */
                        var value = this.getCookie(key);
                        this.removeCookie(key);
                        return value === 'test';
                    }
                    return false;
                }
                catch (e) {
                    return false;
                }
            };
        /**
         * @param {?} key
         * @param {?} value
         * @param {?=} expires
         * @param {?=} path
         * @return {?}
         */
        BrowserStorageService.prototype.setCookie = /**
         * @param {?} key
         * @param {?} value
         * @param {?=} expires
         * @param {?=} path
         * @return {?}
         */
            function (key, value, expires, path) {
                if (expires === void 0) {
                    expires = '';
                }
                if (path === void 0) {
                    path = '/';
                }
                document.cookie = key + "=" + value + (expires ? "; expires=" + expires : '') + "; path=" + path;
            };
        /**
         * @param {?} key
         * @param {?=} path
         * @return {?}
         */
        BrowserStorageService.prototype.removeCookie = /**
         * @param {?} key
         * @param {?=} path
         * @return {?}
         */
            function (key, path) {
                if (path === void 0) {
                    path = '/';
                }
                this.setCookie(key, '', new Date(0).toUTCString(), path);
            };
        /**
         * @param {?} key
         * @return {?}
         */
        BrowserStorageService.prototype.getCookie = /**
         * @param {?} key
         * @return {?}
         */
            function (key) {
                return document.cookie.replace(new RegExp("(?:(?:^|.*;\\s*)" + key + "\\s*\\=\\s*([^;]*).*$)|^.*$"), '$1');
            };
        BrowserStorageService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        BrowserStorageService.ctorParameters = function () {
            return [
                { type: ConfigService }
            ];
        };
        return BrowserStorageService;
    }(StorageService));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Created by Ron on 17/12/2015.
     */
    var SharedService = /** @class */ (function () {
        function SharedService(storage, config) {
            this.storage = storage;
            this.config = config;
            this.tokenName = this.config.options.tokenPrefix
                ? [this.config.options.tokenPrefix, this.config.options.tokenName].join(this.config.options.tokenSeparator)
                : this.config.options.tokenName;
        }
        /**
         * @return {?}
         */
        SharedService.prototype.getToken = /**
         * @return {?}
         */
            function () {
                return this.storage.get(this.tokenName);
            };
        /**
         * @param {?=} token
         * @return {?}
         */
        SharedService.prototype.getPayload = /**
         * @param {?=} token
         * @return {?}
         */
            function (token) {
                if (token === void 0) {
                    token = this.getToken();
                }
                if (token && token.split('.').length === 3) {
                    try {
                        /** @type {?} */
                        var base64Url = token.split('.')[1];
                        /** @type {?} */
                        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                        return JSON.parse(this.b64DecodeUnicode(base64));
                    }
                    catch (e) {
                        return undefined;
                    }
                }
            };
        /**
         * @param {?} response
         * @return {?}
         */
        SharedService.prototype.setToken = /**
         * @param {?} response
         * @return {?}
         */
            function (response) {
                if (!response) {
                    // console.warn('Can\'t set token without passing a value');
                    return;
                }
                /** @type {?} */
                var token;
                if (typeof response === 'string') {
                    token = response;
                }
                else {
                    token = this.config.options.resolveToken(response, this.config.options);
                }
                if (token) {
                    /** @type {?} */
                    var expDate = this.getExpirationDate(token);
                    this.storage.set(this.tokenName, token, expDate ? expDate.toUTCString() : '');
                }
            };
        /**
         * @return {?}
         */
        SharedService.prototype.removeToken = /**
         * @return {?}
         */
            function () {
                this.storage.remove(this.tokenName);
            };
        /**
         * @param {?=} token
         * @return {?}
         */
        SharedService.prototype.isAuthenticated = /**
         * @param {?=} token
         * @return {?}
         */
            function (token) {
                if (token === void 0) {
                    token = this.getToken();
                }
                // a token is present
                if (token) {
                    // token with a valid JWT format XXX.YYY.ZZZ
                    if (token.split('.').length === 3) {
                        // could be a valid JWT or an access token with the same format
                        try {
                            /** @type {?} */
                            var base64Url = token.split('.')[1];
                            /** @type {?} */
                            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                            /** @type {?} */
                            var exp = JSON.parse(this.b64DecodeUnicode(base64)).exp;
                            // jwt with an optional expiration claims
                            if (exp) {
                                /** @type {?} */
                                var isExpired = Math.round(new Date().getTime() / 1000) >= exp;
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
            };
        /**
         * @param {?=} token
         * @return {?}
         */
        SharedService.prototype.getExpirationDate = /**
         * @param {?=} token
         * @return {?}
         */
            function (token) {
                if (token === void 0) {
                    token = this.getToken();
                }
                /** @type {?} */
                var payload = this.getPayload(token);
                if (payload && payload.exp && Math.round(new Date().getTime() / 1000) < payload.exp) {
                    /** @type {?} */
                    var date = new Date(0);
                    date.setUTCSeconds(payload.exp);
                    return date;
                }
                return null;
            };
        /**
         * @return {?}
         */
        SharedService.prototype.logout = /**
         * @return {?}
         */
            function () {
                var _this = this;
                return rxjs.Observable.create(function (observer) {
                    _this.storage.remove(_this.tokenName);
                    observer.next();
                    observer.complete();
                });
            };
        /**
         * @param {?} type
         * @return {?}
         */
        SharedService.prototype.setStorageType = /**
         * @param {?} type
         * @return {?}
         */
            function (type) {
                return this.storage.updateStorageType(type);
            };
        /**
         * @param {?} str
         * @return {?}
         */
        SharedService.prototype.b64DecodeUnicode = /**
         * @param {?} str
         * @return {?}
         */
            function (str) {
                return decodeURIComponent(Array.prototype.map.call(atob(str), function (c) { return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2); }).join(''));
            };
        SharedService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        SharedService.ctorParameters = function () {
            return [
                { type: StorageService },
                { type: ConfigService }
            ];
        };
        return SharedService;
    }());

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
        var joined = [baseUrl, url].join('/');
        /** @type {?} */
        var normalize = function (str) {
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
            .map(function (key) { return !!obj[key] ? encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]) : key; })
            .join('&');
    }
    /**
     * @param {?=} w
     * @return {?}
     */
    function getWindowOrigin(w) {
        if (w === void 0) {
            w = window;
        }
        try {
            if (!w || !w.location) {
                return null;
            }
            if (!w.location.origin) {
                return w.location.protocol + "//" + w.location.hostname + (w.location.port ? ':' + w.location.port : '');
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
            var temp = document.createElement('a');
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
                return rxjs.merge(rxjs.fromEvent(popupWindow, 'exit').pipe(operators.delay(100), operators.map(function () { throw new Error('Authentication Canceled'); })), rxjs.fromEvent(popupWindow, 'loadstart')).pipe(operators.switchMap(function (event) {
                    if (!popupWindow || popupWindow.closed) {
                        return rxjs.Observable.throw(new Error('Authentication Canceled'));
                    }
                    if (event.url.indexOf(redirectUri) !== 0) {
                        return rxjs.EMPTY;
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
                        var allParams = __assign({}, qs, hash);
                        popupWindow.close();
                        if (allParams.error) {
                            throw allParams.error;
                        }
                        else {
                            return rxjs.of(allParams);
                        }
                    }
                    return rxjs.EMPTY;
                }), operators.take(1));
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
                return rxjs.interval(50)
                    .pipe(operators.switchMap(function () {
                    if (!popupWindow || popupWindow.closed) {
                        return rxjs.throwError(new Error('Authentication Canceled'));
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
                            var allParams = __assign({}, qs, hash);
                            if (allParams.error) {
                                throw allParams.error;
                            }
                            else {
                                return rxjs.of(allParams);
                            }
                        }
                        else {
                            return rxjs.throwError(new Error('No token found after redirect'));
                        }
                    }
                    return rxjs.EMPTY;
                }), operators.take(1));
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
                return __assign({ width: width,
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
                    .map(function (key) {
                    return options[key] === null || options[key] === undefined
                        ? key
                        : key + '=' + options[key];
                }).join(',');
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
                return !!(window && (( /** @type {?} */(window)).cordova ||
                    window.navigator && window.navigator.userAgent && window.navigator.userAgent.indexOf('CriOS') > -1));
            };
        PopupService.decorators = [
            { type: core.Injectable }
        ];
        return PopupService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Created by Ron on 17/12/2015.
     */
    var Oauth1Service = /** @class */ (function () {
        function Oauth1Service(http$$1, popup, config) {
            this.http = http$$1;
            this.popup = popup;
            this.config = config;
        }
        /**
         * @template T
         * @param {?} oauthOptions
         * @param {?} userData
         * @return {?}
         */
        Oauth1Service.prototype.open = /**
         * @template T
         * @param {?} oauthOptions
         * @param {?} userData
         * @return {?}
         */
            function (oauthOptions, userData) {
                var _this = this;
                /** @type {?} */
                var serverUrl = this.config.options.baseUrl
                    ? joinUrl(this.config.options.baseUrl, oauthOptions.url)
                    : oauthOptions.url;
                return this.http.post(serverUrl, oauthOptions).pipe(operators.switchMap(function (authorizationData) { return _this.popup.open([oauthOptions.authorizationEndpoint, buildQueryString(authorizationData)].join('?'), oauthOptions, _this.config.options.cordova); }, function (authorizationData, oauthData) { return ({ authorizationData: authorizationData, oauthData: oauthData }); }), operators.switchMap(function (_a) {
                    var authorizationData = _a.authorizationData, oauthData = _a.oauthData;
                    return _this.exchangeForToken(oauthOptions, authorizationData, oauthData, userData);
                }));
            };
        /**
         * @template T
         * @param {?} oauthOptions
         * @param {?} authorizationData
         * @param {?} oauthData
         * @param {?} userData
         * @return {?}
         */
        Oauth1Service.prototype.exchangeForToken = /**
         * @template T
         * @param {?} oauthOptions
         * @param {?} authorizationData
         * @param {?} oauthData
         * @param {?} userData
         * @return {?}
         */
            function (oauthOptions, authorizationData, oauthData, userData) {
                /** @type {?} */
                var body = { authorizationData: authorizationData, oauthData: oauthData, userData: userData };
                var _a = this.config.options, withCredentials = _a.withCredentials, baseUrl = _a.baseUrl;
                var _b = oauthOptions.method, method = _b === void 0 ? 'POST' : _b, url = oauthOptions.url;
                /** @type {?} */
                var exchangeForTokenUrl = baseUrl ? joinUrl(baseUrl, url) : url;
                return this.http.request(method, exchangeForTokenUrl, { body: body, withCredentials: withCredentials });
            };
        Oauth1Service.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        Oauth1Service.ctorParameters = function () {
            return [
                { type: http.HttpClient },
                { type: PopupService },
                { type: ConfigService }
            ];
        };
        return Oauth1Service;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Created by Ron on 17/12/2015.
     */
    var Oauth2Service = /** @class */ (function () {
        function Oauth2Service(http$$1, popup, config) {
            this.http = http$$1;
            this.popup = popup;
            this.config = config;
        }
        /**
         * @template T
         * @param {?} oauthOptions
         * @param {?} userData
         * @return {?}
         */
        Oauth2Service.prototype.open = /**
         * @template T
         * @param {?} oauthOptions
         * @param {?} userData
         * @return {?}
         */
            function (oauthOptions, userData) {
                var _this = this;
                /** @type {?} */
                var authorizationData = this.getAuthorizationData(oauthOptions);
                /** @type {?} */
                var url = [oauthOptions.authorizationEndpoint, buildQueryString(authorizationData)].join('?');
                return this.popup.open(url, oauthOptions, this.config.options.cordova).pipe(operators.switchMap(function (oauthData) {
                    // when no server URL provided, return popup params as-is.
                    // this is for a scenario when someone wishes to opt out from
                    // satellizer's magic by doing authorization code exchange and
                    // saving a token manually.
                    if (oauthOptions.responseType === 'token' || !oauthOptions.url) {
                        return rxjs.of(oauthData);
                    }
                    if (oauthData.state && oauthData.state !== authorizationData["state"]) {
                        throw new Error('OAuth "state" mismatch');
                    }
                    return _this.exchangeForToken(oauthOptions, authorizationData, oauthData, userData);
                }));
            };
        /**
         * @template T
         * @param {?} options
         * @param {?} authorizationData
         * @param {?} oauthData
         * @param {?} userData
         * @return {?}
         */
        Oauth2Service.prototype.exchangeForToken = /**
         * @template T
         * @param {?} options
         * @param {?} authorizationData
         * @param {?} oauthData
         * @param {?} userData
         * @return {?}
         */
            function (options, authorizationData, oauthData, userData) {
                /** @type {?} */
                var body = { authorizationData: authorizationData, oauthData: oauthData, userData: userData };
                var _a = this.config.options, baseUrl = _a.baseUrl, withCredentials = _a.withCredentials;
                var url = options.url, _b = options.method, method = _b === void 0 ? 'POST' : _b;
                /** @type {?} */
                var exchangeForTokenUrl = baseUrl ? joinUrl(baseUrl, url) : url;
                return this.http.request(method, exchangeForTokenUrl, { body: body, withCredentials: withCredentials });
            };
        /**
         * @param {?} options
         * @return {?}
         */
        Oauth2Service.prototype.getAuthorizationData = /**
         * @param {?} options
         * @return {?}
         */
            function (options) {
                var _a = options.responseType, responseType = _a === void 0 ? 'code' : _a, clientId = options.clientId, _b = options.redirectUri, redirectUri = _b === void 0 ? getWindowOrigin() || '' : _b, _c = options.scopeDelimiter, scopeDelimiter = _c === void 0 ? ',' : _c, scope = options.scope, state = options.state, additionalUrlParams = options.additionalUrlParams;
                /** @type {?} */
                var resolvedState = typeof state === 'function' ? state() : state;
                return __spread([
                    ['response_type', responseType],
                    ['client_id', clientId],
                    ['redirect_uri', redirectUri]
                ], state ? [['state', resolvedState]] : [], scope ? [['scope', scope.join(scopeDelimiter)]] : [], additionalUrlParams
                    ? Object
                        .keys(additionalUrlParams)
                        .map(function (key) {
                        /** @type {?} */
                        var value = ( /** @type {?} */(additionalUrlParams))[key];
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
                    : []).filter(function (_) { return !!_[0]; }).reduce(function (acc, next) {
                    var _a;
                    return (__assign({}, acc, (_a = {}, _a[next[0]] = next[1], _a)));
                }, /** @type {?} */ ({}));
            };
        Oauth2Service.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        Oauth2Service.ctorParameters = function () {
            return [
                { type: http.HttpClient },
                { type: PopupService },
                { type: ConfigService }
            ];
        };
        return Oauth2Service;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Created by Ron on 17/12/2015.
     */
    var OauthService = /** @class */ (function () {
        function OauthService(http$$1, shared, config, popup) {
            this.http = http$$1;
            this.shared = shared;
            this.config = config;
            this.popup = popup;
            this.depProviders = [
                { provide: http.HttpClient, useValue: this.http },
                { provide: PopupService, useValue: this.popup },
                { provide: ConfigService, useValue: this.config },
            ];
            this.deps = [http.HttpClient, PopupService, ConfigService];
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
                    ? core.Injector.create(__spread(this.depProviders, [
                        { provide: Oauth1Service, deps: this.deps },
                    ])).get(Oauth1Service)
                    : core.Injector.create(__spread(this.depProviders, [
                        { provide: Oauth2Service, deps: this.deps },
                    ])).get(Oauth2Service);
                return provider.open(this.config.options.providers[name], userData || {})
                    .pipe(operators.tap(function (response) {
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
                if (url === void 0) {
                    url = joinUrl(this.config.options.baseUrl, this.config.options.unlinkUrl);
                }
                if (method === void 0) {
                    method = 'POST';
                }
                return this.http.request(method, url, { body: { provider: provider } });
            };
        OauthService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        OauthService.ctorParameters = function () {
            return [
                { type: http.HttpClient },
                { type: SharedService },
                { type: ConfigService },
                { type: PopupService }
            ];
        };
        return OauthService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Created by Ron on 17/12/2015.
     */
    var LocalService = /** @class */ (function () {
        function LocalService(http$$1, shared, config) {
            this.http = http$$1;
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
                    .pipe(operators.tap(function (data) { return _this.shared.setToken(data); }));
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
            { type: core.Injectable }
        ];
        /** @nocollapse */
        LocalService.ctorParameters = function () {
            return [
                { type: http.HttpClient },
                { type: SharedService },
                { type: ConfigService }
            ];
        };
        return LocalService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Created by Ron on 17/12/2015.
     */
    var AuthService = /** @class */ (function () {
        function AuthService(shared, local, oauth) {
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
        AuthService.prototype.login = /**
         * @template T
         * @param {?} user
         * @param {?=} url
         * @return {?}
         */
            function (user, url) {
                return this.local.login(user, url);
            };
        /**
         * @template T
         * @param {?} user
         * @param {?=} url
         * @return {?}
         */
        AuthService.prototype.signup = /**
         * @template T
         * @param {?} user
         * @param {?=} url
         * @return {?}
         */
            function (user, url) {
                return this.local.signup(user, url);
            };
        /**
         * @return {?}
         */
        AuthService.prototype.logout = /**
         * @return {?}
         */
            function () {
                return this.shared.logout();
            };
        /**
         * @template T
         * @param {?} name
         * @param {?=} userData
         * @return {?}
         */
        AuthService.prototype.authenticate = /**
         * @template T
         * @param {?} name
         * @param {?=} userData
         * @return {?}
         */
            function (name, userData) {
                return this.oauth.authenticate(name, userData);
            };
        /**
         * @template T
         * @param {?} name
         * @param {?=} userData
         * @return {?}
         */
        AuthService.prototype.link = /**
         * @template T
         * @param {?} name
         * @param {?=} userData
         * @return {?}
         */
            function (name, userData) {
                return this.oauth.authenticate(name, userData);
            };
        /**
         * @template T
         * @param {?} provider
         * @param {?=} url
         * @return {?}
         */
        AuthService.prototype.unlink = /**
         * @template T
         * @param {?} provider
         * @param {?=} url
         * @return {?}
         */
            function (provider, url) {
                return this.oauth.unlink(provider, url);
            };
        /**
         * @return {?}
         */
        AuthService.prototype.isAuthenticated = /**
         * @return {?}
         */
            function () {
                return this.shared.isAuthenticated();
            };
        /**
         * @return {?}
         */
        AuthService.prototype.getToken = /**
         * @return {?}
         */
            function () {
                return this.shared.getToken();
            };
        /**
         * @param {?} token
         * @return {?}
         */
        AuthService.prototype.setToken = /**
         * @param {?} token
         * @return {?}
         */
            function (token) {
                this.shared.setToken(token);
            };
        /**
         * @return {?}
         */
        AuthService.prototype.removeToken = /**
         * @return {?}
         */
            function () {
                this.shared.removeToken();
            };
        /**
         * @return {?}
         */
        AuthService.prototype.getPayload = /**
         * @return {?}
         */
            function () {
                return this.shared.getPayload();
            };
        /**
         * @param {?} type
         * @return {?}
         */
        AuthService.prototype.setStorageType = /**
         * @param {?} type
         * @return {?}
         */
            function (type) {
                return this.shared.setStorageType(type);
            };
        /**
         * @return {?}
         */
        AuthService.prototype.getExpirationDate = /**
         * @return {?}
         */
            function () {
                return this.shared.getExpirationDate();
            };
        AuthService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        AuthService.ctorParameters = function () {
            return [
                { type: SharedService },
                { type: LocalService },
                { type: OauthService }
            ];
        };
        return AuthService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var JwtInterceptor = /** @class */ (function () {
        function JwtInterceptor(shared, config) {
            this.shared = shared;
            this.config = config;
        }
        /**
         * @param {?} req
         * @param {?} next
         * @return {?}
         */
        JwtInterceptor.prototype.intercept = /**
         * @param {?} req
         * @param {?} next
         * @return {?}
         */
            function (req, next) {
                var _a;
                var _b = this.config.options, authHeader = _b.authHeader, authToken = _b.authToken;
                /** @type {?} */
                var token = this.shared.getToken();
                /** @type {?} */
                var isAuthenticated = this.shared.isAuthenticated;
                /** @type {?} */
                var newReq = isAuthenticated && !req.headers.has(authHeader)
                    ? req.clone({ setHeaders: (_a = {}, _a[authHeader] = authToken + " " + token, _a) })
                    : req;
                return next.handle(newReq);
            };
        JwtInterceptor.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        JwtInterceptor.ctorParameters = function () {
            return [
                { type: SharedService },
                { type: ConfigService }
            ];
        };
        return JwtInterceptor;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var Ng2UiAuthModule = /** @class */ (function () {
        function Ng2UiAuthModule() {
        }
        /**
         * @param {?=} configOptions
         * @param {?=} defaultJwtInterceptor
         * @return {?}
         */
        Ng2UiAuthModule.forRoot = /**
         * @param {?=} configOptions
         * @param {?=} defaultJwtInterceptor
         * @return {?}
         */
            function (configOptions, defaultJwtInterceptor) {
                if (defaultJwtInterceptor === void 0) {
                    defaultJwtInterceptor = true;
                }
                return {
                    ngModule: Ng2UiAuthModule,
                    providers: __spread(configOptions ? [{ provide: CONFIG_OPTIONS, useValue: configOptions }] : [], [
                        { provide: ConfigService, useClass: ConfigService, deps: [CONFIG_OPTIONS] },
                        { provide: StorageService, useClass: BrowserStorageService, deps: [ConfigService] },
                        { provide: SharedService, useClass: SharedService, deps: [StorageService, ConfigService] }
                    ], defaultJwtInterceptor ? [{ provide: http.HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true, deps: [SharedService, ConfigService] }] : [], [
                        { provide: OauthService, useClass: OauthService, deps: [http.HttpClient, SharedService, ConfigService, PopupService] },
                        { provide: PopupService, useClass: PopupService, deps: [ConfigService] },
                        { provide: LocalService, useClass: LocalService, deps: [http.HttpClient, SharedService, ConfigService] },
                        { provide: AuthService, useClass: AuthService, deps: [SharedService, LocalService, OauthService] },
                    ]),
                };
            };
        Ng2UiAuthModule.decorators = [
            { type: core.NgModule, args: [{ imports: [http.HttpClientModule] },] }
        ];
        return Ng2UiAuthModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.Ng2UiAuthModule = Ng2UiAuthModule;
    exports.LocalService = LocalService;
    exports.Oauth2Service = Oauth2Service;
    exports.Oauth1Service = Oauth1Service;
    exports.PopupService = PopupService;
    exports.OauthService = OauthService;
    exports.SharedService = SharedService;
    exports.StorageService = StorageService;
    exports.BrowserStorageService = BrowserStorageService;
    exports.AuthService = AuthService;
    exports.ConfigService = ConfigService;
    exports.JwtInterceptor = JwtInterceptor;
    exports.CONFIG_OPTIONS = CONFIG_OPTIONS;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLXVpLWF1dGgudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIm5nOi8vbmcyLXVpLWF1dGgvc3RvcmFnZS10eXBlLmVudW0udHMiLCJuZzovL25nMi11aS1hdXRoL2NvbmZpZy5zZXJ2aWNlLnRzIiwibmc6Ly9uZzItdWktYXV0aC9zdG9yYWdlLnNlcnZpY2UudHMiLCJuZzovL25nMi11aS1hdXRoL3NoYXJlZC5zZXJ2aWNlLnRzIiwibmc6Ly9uZzItdWktYXV0aC91dGlscy50cyIsIm5nOi8vbmcyLXVpLWF1dGgvcG9wdXAuc2VydmljZS50cyIsIm5nOi8vbmcyLXVpLWF1dGgvb2F1dGgxLnNlcnZpY2UudHMiLCJuZzovL25nMi11aS1hdXRoL29hdXRoMi5zZXJ2aWNlLnRzIiwibmc6Ly9uZzItdWktYXV0aC9vYXV0aC5zZXJ2aWNlLnRzIiwibmc6Ly9uZzItdWktYXV0aC9sb2NhbC5zZXJ2aWNlLnRzIiwibmc6Ly9uZzItdWktYXV0aC9hdXRoLnNlcnZpY2UudHMiLCJuZzovL25nMi11aS1hdXRoL2ludGVyY2VwdG9yLnNlcnZpY2UudHMiLCJuZzovL25nMi11aS1hdXRoL25nMi11aS1hdXRoLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsIi8vIG5nYyAoVHNpY2tsZSkgZG9lc24ndCBzdXBwb3J0IHR5cGVzY3JpcHQgMi40IHN0cmluZyBlbnVtcyBpbiBsaWJyYXJpZXMgeWV0LCB1c2luZyBjb25zdHMgYXMgYSB3b3JrYXJvdW50XHJcbmV4cG9ydCBjb25zdCBOT05FID0gJ25vbmUnO1xyXG5leHBvcnQgY29uc3QgTUVNT1JZID0gJ21lbW9yeSc7XHJcbmV4cG9ydCBjb25zdCBMT0NBTF9TVE9SQUdFID0gJ2xvY2FsU3RvcmFnZSc7XHJcbmV4cG9ydCBjb25zdCBTRVNTSU9OX1NUT1JBR0UgPSAnc2Vzc2lvblN0b3JhZ2UnO1xyXG5leHBvcnQgY29uc3QgQ09PS0lFID0gJ2Nvb2tpZSc7XHJcbmV4cG9ydCBjb25zdCBTRVNTSU9OX0NPT0tJRSA9ICdzZXNzaW9uQ29va2llJztcclxuXHJcbmV4cG9ydCB0eXBlIFN0b3JhZ2VUeXBlID0gdHlwZW9mIE5PTkUgfCB0eXBlb2YgTUVNT1JZXHJcbiAgICB8IHR5cGVvZiBMT0NBTF9TVE9SQUdFIHwgdHlwZW9mIFNFU1NJT05fU1RPUkFHRVxyXG4gICAgfCB0eXBlb2YgQ09PS0lFIHwgdHlwZW9mIFNFU1NJT05fQ09PS0lFO1xyXG4iLCJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN0b3JhZ2VUeXBlLCBMT0NBTF9TVE9SQUdFIH0gZnJvbSAnLi9zdG9yYWdlLXR5cGUuZW51bSc7XHJcbmltcG9ydCB7IElQYXJ0aWFsQ29uZmlnT3B0aW9ucyB9IGZyb20gJy4vbmcyLXVpLWF1dGgubW9kdWxlJztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFJvbiBvbiAxNy8xMi8yMDE1LlxyXG4gKi9cclxuZXhwb3J0IHR5cGUgQ29uZmlnT3B0aW9ucyA9IElQYXJ0aWFsQ29uZmlnT3B0aW9ucyB8IEZ1bmN0aW9uO1xyXG5cclxuZXhwb3J0IGNvbnN0IENPTkZJR19PUFRJT05TID0gbmV3IEluamVjdGlvblRva2VuPGFueT4oJ2NvbmZpZy5vcHRpb25zJyk7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElQb3B1cE9wdGlvbnMge1xyXG4gICAgd2lkdGg/OiBudW1iZXI7XHJcbiAgICBoZWlnaHQ/OiBudW1iZXI7XHJcbiAgICBsZWZ0PzogbnVtYmVyO1xyXG4gICAgdG9wPzogbnVtYmVyO1xyXG4gICAgdmlzaWJsZVRvb2xiYXI/OiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElPYXV0aDFPcHRpb25zIHtcclxuICAgIHVybD86IHN0cmluZztcclxuICAgIG5hbWU/OiBzdHJpbmc7XHJcbiAgICByZWRpcmVjdFVyaT86IHN0cmluZztcclxuICAgIHBvcHVwT3B0aW9ucz86IElQb3B1cE9wdGlvbnM7XHJcbiAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ/OiBzdHJpbmc7XHJcbiAgICBvYXV0aFR5cGU/OiAnMS4wJztcclxuICAgIG1ldGhvZD86IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJT2F1dGgyT3B0aW9ucyB7XHJcbiAgICB1cmw/OiBzdHJpbmc7XHJcbiAgICBuYW1lPzogc3RyaW5nO1xyXG4gICAgcmVkaXJlY3RVcmk/OiBzdHJpbmc7XHJcbiAgICBwb3B1cE9wdGlvbnM/OiBJUG9wdXBPcHRpb25zO1xyXG4gICAgYXV0aG9yaXphdGlvbkVuZHBvaW50Pzogc3RyaW5nO1xyXG4gICAgb2F1dGhUeXBlPzogJzIuMCc7XHJcbiAgICBtZXRob2Q/OiBzdHJpbmc7XHJcbiAgICByZXNwb25zZVR5cGU/OiBzdHJpbmc7XHJcbiAgICBjbGllbnRJZD86IHN0cmluZztcclxuICAgIGFkZGl0aW9uYWxVcmxQYXJhbXM/OiB7XHJcbiAgICAgICAgW3BhcmFtTmFtZTogc3RyaW5nXTogc3RyaW5nIHwgKCgpID0+IHN0cmluZykgfCBudWxsIHwgdW5kZWZpbmVkO1xyXG4gICAgfTtcclxuICAgIHNjb3BlRGVsaW1pdGVyPzogc3RyaW5nO1xyXG4gICAgc2NvcGU/OiBzdHJpbmdbXTtcclxuICAgIHN0YXRlPzogc3RyaW5nIHwgKCgpID0+IHN0cmluZyk7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVByb3ZpZGVycyB7XHJcbiAgICBbcHJvdmlkZXI6IHN0cmluZ106IElPYXV0aDJPcHRpb25zIHwgSU9hdXRoMU9wdGlvbnM7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUNvbmZpZ09wdGlvbnMge1xyXG4gICAgdG9rZW5Sb290OiBzdHJpbmcgfCBudWxsO1xyXG4gICAgY29yZG92YTogYm9vbGVhbiB8IG51bGw7XHJcbiAgICBiYXNlVXJsOiBzdHJpbmc7XHJcbiAgICBsb2dpblVybDogc3RyaW5nO1xyXG4gICAgc2lnbnVwVXJsOiBzdHJpbmc7XHJcbiAgICB1bmxpbmtVcmw6IHN0cmluZztcclxuICAgIHRva2VuTmFtZTogc3RyaW5nO1xyXG4gICAgdG9rZW5TZXBhcmF0b3I6IHN0cmluZztcclxuICAgIHRva2VuUHJlZml4OiBzdHJpbmc7XHJcbiAgICBhdXRoVG9rZW46IHN0cmluZztcclxuICAgIGF1dGhIZWFkZXI6IHN0cmluZztcclxuICAgIHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZTtcclxuICAgIHByb3ZpZGVyczogSVByb3ZpZGVycztcclxuICAgIHdpdGhDcmVkZW50aWFsczogYm9vbGVhbjtcclxuICAgIHJlc29sdmVUb2tlbjogKHJlc3BvbnNlOiBhbnksIGNvbmZpZzogSUNvbmZpZ09wdGlvbnMpID0+IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUGFydGlhbENvbmZpZ09wdGlvbnMgeyAvLyA9IFBhcnRpYWw8SUNvbmZpZ09wdGlvbnNcclxuICAgIHRva2VuUm9vdD86IHN0cmluZyB8IG51bGw7XHJcbiAgICBjb3Jkb3ZhPzogYm9vbGVhbiB8IG51bGw7XHJcbiAgICBiYXNlVXJsPzogc3RyaW5nO1xyXG4gICAgbG9naW5Vcmw/OiBzdHJpbmc7XHJcbiAgICBzaWdudXBVcmw/OiBzdHJpbmc7XHJcbiAgICB1bmxpbmtVcmw/OiBzdHJpbmc7XHJcbiAgICB0b2tlbk5hbWU/OiBzdHJpbmc7XHJcbiAgICB0b2tlblNlcGFyYXRvcj86IHN0cmluZztcclxuICAgIHRva2VuUHJlZml4Pzogc3RyaW5nO1xyXG4gICAgYXV0aFRva2VuPzogc3RyaW5nO1xyXG4gICAgYXV0aEhlYWRlcj86IHN0cmluZztcclxuICAgIHN0b3JhZ2VUeXBlPzogU3RvcmFnZVR5cGU7XHJcbiAgICBwcm92aWRlcnM/OiBJUHJvdmlkZXJzO1xyXG4gICAgd2l0aENyZWRlbnRpYWxzPzogYm9vbGVhbjtcclxuICAgIHJlc29sdmVUb2tlbj86IChyZXNwb25zZTogYW55LCBjb25maWc6IElDb25maWdPcHRpb25zKSA9PiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBkZWZhdWx0T3B0aW9uczogSUNvbmZpZ09wdGlvbnMgPSB7XHJcbiAgICB3aXRoQ3JlZGVudGlhbHM6IGZhbHNlLFxyXG4gICAgdG9rZW5Sb290OiBudWxsLFxyXG4gICAgYmFzZVVybDogJy8nLFxyXG4gICAgbG9naW5Vcmw6ICcvYXV0aC9sb2dpbicsXHJcbiAgICBzaWdudXBVcmw6ICcvYXV0aC9zaWdudXAnLFxyXG4gICAgdW5saW5rVXJsOiAnL2F1dGgvdW5saW5rLycsXHJcbiAgICB0b2tlbk5hbWU6ICd0b2tlbicsXHJcbiAgICB0b2tlblNlcGFyYXRvcjogJ18nLFxyXG4gICAgdG9rZW5QcmVmaXg6ICduZzItdWktYXV0aCcsXHJcbiAgICBhdXRoSGVhZGVyOiAnQXV0aG9yaXphdGlvbicsXHJcbiAgICBhdXRoVG9rZW46ICdCZWFyZXInLFxyXG4gICAgc3RvcmFnZVR5cGU6IExPQ0FMX1NUT1JBR0UsXHJcbiAgICBjb3Jkb3ZhOiBudWxsLFxyXG4gICAgcmVzb2x2ZVRva2VuOiAocmVzcG9uc2U6IGFueSwgY29uZmlnOiBJQ29uZmlnT3B0aW9ucykgPT4ge1xyXG4gICAgICAgIGNvbnN0IGFjY2Vzc1Rva2VuOiBzdHJpbmcgfCB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9IHwgbnVsbCB8IHVuZGVmaW5lZCA9IHJlc3BvbnNlICYmXHJcbiAgICAgICAgICAgIChyZXNwb25zZS5hY2Nlc3NfdG9rZW4gfHwgcmVzcG9uc2UudG9rZW4gfHwgcmVzcG9uc2UuZGF0YSk7XHJcbiAgICAgICAgaWYgKCFhY2Nlc3NUb2tlbikge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLndhcm4oJ05vIHRva2VuIGZvdW5kJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGFjY2Vzc1Rva2VuID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjZXNzVG9rZW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgYWNjZXNzVG9rZW4gIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUud2FybignTm8gdG9rZW4gZm91bmQnKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHRva2VuUm9vdERhdGEgPSBjb25maWcudG9rZW5Sb290ICYmIGNvbmZpZy50b2tlblJvb3RcclxuICAgICAgICAgICAgLnNwbGl0KCcuJylcclxuICAgICAgICAgICAgLnJlZHVjZShcclxuICAgICAgICAgICAgKG86IGFueSwgeDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb1t4XTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYWNjZXNzVG9rZW4pO1xyXG4gICAgICAgIGNvbnN0IHRva2VuID0gdG9rZW5Sb290RGF0YSA/IHRva2VuUm9vdERhdGFbY29uZmlnLnRva2VuTmFtZV0gOiBhY2Nlc3NUb2tlbltjb25maWcudG9rZW5OYW1lXTtcclxuICAgICAgICBpZiAodG9rZW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zdCB0b2tlblBhdGggPSB0aGlzLnRva2VuUm9vdCA/IHRoaXMudG9rZW5Sb290ICsgJy4nICsgdGhpcy50b2tlbk5hbWUgOiB0aGlzLnRva2VuTmFtZTtcclxuICAgICAgICAvLyBjb25zb2xlLndhcm4oJ0V4cGVjdGluZyBhIHRva2VuIG5hbWVkIFwiJyArIHRva2VuUGF0aCk7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG4gICAgcHJvdmlkZXJzOiB7XHJcbiAgICAgICAgZmFjZWJvb2s6IHtcclxuICAgICAgICAgICAgbmFtZTogJ2ZhY2Vib29rJyxcclxuICAgICAgICAgICAgdXJsOiAnL2F1dGgvZmFjZWJvb2snLFxyXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL3d3dy5mYWNlYm9vay5jb20vdjIuNS9kaWFsb2cvb2F1dGgnLFxyXG4gICAgICAgICAgICBhZGRpdGlvbmFsVXJsUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAncG9wdXAnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzY29wZTogWydlbWFpbCddLFxyXG4gICAgICAgICAgICBzY29wZURlbGltaXRlcjogJywnLFxyXG4gICAgICAgICAgICBvYXV0aFR5cGU6ICcyLjAnLFxyXG4gICAgICAgICAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDU4MCwgaGVpZ2h0OiA0MDAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdvb2dsZToge1xyXG4gICAgICAgICAgICBuYW1lOiAnZ29vZ2xlJyxcclxuICAgICAgICAgICAgdXJsOiAnL2F1dGgvZ29vZ2xlJyxcclxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tL28vb2F1dGgyL2F1dGgnLFxyXG4gICAgICAgICAgICBhZGRpdGlvbmFsVXJsUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAnZGlzcGxheSc6ICdwb3B1cCcsXHJcbiAgICAgICAgICAgICAgICAncHJvbXB0JzogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgJ2xvZ2luX2hpbnQnOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAnYWNjZXNzX3R5cGUnOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAnaW5jbHVkZV9ncmFudGVkX3Njb3Blcyc6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICdvcGVuaWQucmVhbG0nOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAnaGQnOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNjb3BlOiBbJ29wZW5pZCcsICdwcm9maWxlJywgJ2VtYWlsJ10sXHJcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyOiAnICcsXHJcbiAgICAgICAgICAgIG9hdXRoVHlwZTogJzIuMCcsXHJcbiAgICAgICAgICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNDUyLCBoZWlnaHQ6IDYzMyB9LFxyXG4gICAgICAgICAgICBzdGF0ZTogKCkgPT4gZW5jb2RlVVJJQ29tcG9uZW50KE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyKSksXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnaXRodWI6IHtcclxuICAgICAgICAgICAgbmFtZTogJ2dpdGh1YicsXHJcbiAgICAgICAgICAgIHVybDogJy9hdXRoL2dpdGh1YicsXHJcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vZ2l0aHViLmNvbS9sb2dpbi9vYXV0aC9hdXRob3JpemUnLFxyXG4gICAgICAgICAgICBzY29wZTogWyd1c2VyOmVtYWlsJ10sXHJcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyOiAnICcsXHJcbiAgICAgICAgICAgIG9hdXRoVHlwZTogJzIuMCcsXHJcbiAgICAgICAgICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogMTAyMCwgaGVpZ2h0OiA2MTggfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGluc3RhZ3JhbToge1xyXG4gICAgICAgICAgICBuYW1lOiAnaW5zdGFncmFtJyxcclxuICAgICAgICAgICAgdXJsOiAnL2F1dGgvaW5zdGFncmFtJyxcclxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9hcGkuaW5zdGFncmFtLmNvbS9vYXV0aC9hdXRob3JpemUnLFxyXG4gICAgICAgICAgICBzY29wZTogWydiYXNpYyddLFxyXG4gICAgICAgICAgICBzY29wZURlbGltaXRlcjogJysnLFxyXG4gICAgICAgICAgICBvYXV0aFR5cGU6ICcyLjAnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGlua2VkaW46IHtcclxuICAgICAgICAgICAgbmFtZTogJ2xpbmtlZGluJyxcclxuICAgICAgICAgICAgdXJsOiAnL2F1dGgvbGlua2VkaW4nLFxyXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL3d3dy5saW5rZWRpbi5jb20vdWFzL29hdXRoMi9hdXRob3JpemF0aW9uJyxcclxuICAgICAgICAgICAgc2NvcGU6IFsncl9lbWFpbGFkZHJlc3MnXSxcclxuICAgICAgICAgICAgc2NvcGVEZWxpbWl0ZXI6ICcgJyxcclxuICAgICAgICAgICAgb2F1dGhUeXBlOiAnMi4wJyxcclxuICAgICAgICAgICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA1MjcsIGhlaWdodDogNTgyIH0sXHJcbiAgICAgICAgICAgIHN0YXRlOiAnU1RBVEUnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdHdpdHRlcjoge1xyXG4gICAgICAgICAgICBuYW1lOiAndHdpdHRlcicsXHJcbiAgICAgICAgICAgIHVybDogJy9hdXRoL3R3aXR0ZXInLFxyXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2FwaS50d2l0dGVyLmNvbS9vYXV0aC9hdXRoZW50aWNhdGUnLFxyXG4gICAgICAgICAgICBvYXV0aFR5cGU6ICcxLjAnLFxyXG4gICAgICAgICAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDQ5NSwgaGVpZ2h0OiA2NDUgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHR3aXRjaDoge1xyXG4gICAgICAgICAgICBuYW1lOiAndHdpdGNoJyxcclxuICAgICAgICAgICAgdXJsOiAnL2F1dGgvdHdpdGNoJyxcclxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9hcGkudHdpdGNoLnR2L2tyYWtlbi9vYXV0aDIvYXV0aG9yaXplJyxcclxuICAgICAgICAgICAgc2NvcGU6IFsndXNlcl9yZWFkJ10sXHJcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyOiAnICcsXHJcbiAgICAgICAgICAgIGFkZGl0aW9uYWxVcmxQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdwb3B1cCcsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9hdXRoVHlwZTogJzIuMCcsXHJcbiAgICAgICAgICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNTAwLCBoZWlnaHQ6IDU2MCB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGl2ZToge1xyXG4gICAgICAgICAgICBuYW1lOiAnbGl2ZScsXHJcbiAgICAgICAgICAgIHVybDogJy9hdXRoL2xpdmUnLFxyXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2xvZ2luLmxpdmUuY29tL29hdXRoMjBfYXV0aG9yaXplLnNyZicsXHJcbiAgICAgICAgICAgIGFkZGl0aW9uYWxVcmxQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdwb3B1cCcsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNjb3BlOiBbJ3dsLmVtYWlscyddLFxyXG4gICAgICAgICAgICBzY29wZURlbGltaXRlcjogJyAnLFxyXG4gICAgICAgICAgICBvYXV0aFR5cGU6ICcyLjAnLFxyXG4gICAgICAgICAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDUwMCwgaGVpZ2h0OiA1NjAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHlhaG9vOiB7XHJcbiAgICAgICAgICAgIG5hbWU6ICd5YWhvbycsXHJcbiAgICAgICAgICAgIHVybDogJy9hdXRoL3lhaG9vJyxcclxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9hcGkubG9naW4ueWFob28uY29tL29hdXRoMi9yZXF1ZXN0X2F1dGgnLFxyXG4gICAgICAgICAgICBzY29wZTogW10sXHJcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyOiAnLCcsXHJcbiAgICAgICAgICAgIG9hdXRoVHlwZTogJzIuMCcsXHJcbiAgICAgICAgICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNTU5LCBoZWlnaHQ6IDUxOSB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYml0YnVja2V0OiB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdiaXRidWNrZXQnLFxyXG4gICAgICAgICAgICB1cmw6ICcvYXV0aC9iaXRidWNrZXQnLFxyXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2JpdGJ1Y2tldC5vcmcvc2l0ZS9vYXV0aDIvYXV0aG9yaXplJyxcclxuICAgICAgICAgICAgc2NvcGU6IFsnZW1haWwnXSxcclxuICAgICAgICAgICAgc2NvcGVEZWxpbWl0ZXI6ICcsJyxcclxuICAgICAgICAgICAgb2F1dGhUeXBlOiAnMi4wJyxcclxuICAgICAgICAgICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiAxMDI4LCBoZWlnaHQ6IDUyOSB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3BvdGlmeToge1xyXG4gICAgICAgICAgICBuYW1lOiAnc3BvdGlmeScsXHJcbiAgICAgICAgICAgIHVybDogJy9hdXRoL3Nwb3RpZnknLFxyXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2FjY291bnRzLnNwb3RpZnkuY29tL2F1dGhvcml6ZScsXHJcbiAgICAgICAgICAgIHNjb3BlOiBbJycsICd1c2VyLXJlYWQtZW1haWwnXSxcclxuICAgICAgICAgICAgc2NvcGVEZWxpbWl0ZXI6ICcsJyxcclxuICAgICAgICAgICAgb2F1dGhUeXBlOiAnMi4wJyxcclxuICAgICAgICAgICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA1MDAsIGhlaWdodDogNTMwIH0sXHJcbiAgICAgICAgICAgIHN0YXRlOiAoKSA9PiBlbmNvZGVVUklDb21wb25lbnQoTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIpKSxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxufTtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENvbmZpZ1NlcnZpY2Uge1xyXG4gICAgcHVibGljIG9wdGlvbnM6IElDb25maWdPcHRpb25zO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoQ09ORklHX09QVElPTlMpIG9wdGlvbnM6IElQYXJ0aWFsQ29uZmlnT3B0aW9ucyB8IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgbGV0IG9wdGlvbk9iajogSVBhcnRpYWxDb25maWdPcHRpb25zO1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICBvcHRpb25PYmogPSBvcHRpb25zKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb3B0aW9uT2JqID0gb3B0aW9ucztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0ge1xyXG4gICAgICAgICAgICAuLi5kZWZhdWx0T3B0aW9ucyxcclxuICAgICAgICAgICAgLi4ub3B0aW9ucyxcclxuICAgICAgICAgICAgcHJvdmlkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAuLi5vcHRpb25PYmoucHJvdmlkZXJzLFxyXG4gICAgICAgICAgICAgICAgLi4uT2JqZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgLmtleXMoZGVmYXVsdE9wdGlvbnMucHJvdmlkZXJzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jb25jYXQoT2JqZWN0LmtleXMob3B0aW9uT2JqLnByb3ZpZGVycyB8fCB7fSkpXHJcbiAgICAgICAgICAgICAgICAgICAgLm1hcCgoa2V5KSA9PiBvcHRpb25PYmoucHJvdmlkZXJzICYmIG9wdGlvbk9iai5wcm92aWRlcnNba2V5XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHsgW2tleV06IHsgLi4uZGVmYXVsdE9wdGlvbnMucHJvdmlkZXJzW2tleV0sIC4uLm9wdGlvbk9iai5wcm92aWRlcnNba2V5XSB9IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgOiB7IFtrZXldOiBkZWZhdWx0T3B0aW9ucy5wcm92aWRlcnNba2V5XSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZWR1Y2UoKGFjYywgbmV4dCkgPT4gKHsgLi4uYWNjLCAuLi5uZXh0IH0pLCB7fSksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSBhcyBJQ29uZmlnT3B0aW9ucztcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2NvbmZpZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3RvcmFnZVR5cGUsIE1FTU9SWSwgQ09PS0lFLCBTRVNTSU9OX0NPT0tJRSwgTE9DQUxfU1RPUkFHRSwgU0VTU0lPTl9TVE9SQUdFLCBOT05FIH0gZnJvbSAnLi9zdG9yYWdlLXR5cGUuZW51bSc7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgU3RvcmFnZVNlcnZpY2Uge1xyXG4gICAgYWJzdHJhY3QgdXBkYXRlU3RvcmFnZVR5cGUoc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlKTogYm9vbGVhbjtcclxuXHJcbiAgICBhYnN0cmFjdCBnZXQoa2V5OiBzdHJpbmcpOiBzdHJpbmc7XHJcblxyXG4gICAgYWJzdHJhY3Qgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBkYXRlOiBzdHJpbmcpOiB2b2lkO1xyXG5cclxuICAgIGFic3RyYWN0IHJlbW92ZShrZXk6IHN0cmluZyk6IHZvaWQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFJvbiBvbiAxNy8xMi8yMDE1LlxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQnJvd3NlclN0b3JhZ2VTZXJ2aWNlIGV4dGVuZHMgU3RvcmFnZVNlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBzdG9yZTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9O1xyXG4gICAgcHJpdmF0ZSBzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGUgPSBNRU1PUlk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIGlmICghdGhpcy51cGRhdGVTdG9yYWdlVHlwZShjb25maWcub3B0aW9ucy5zdG9yYWdlVHlwZSkpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKGNvbmZpZy5vcHRpb25zLnN0b3JhZ2VUeXBlICsgJyBpcyBub3QgYXZhaWxhYmxlLicpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlU3RvcmFnZVR5cGUoc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlKSB7XHJcbiAgICAgICAgY29uc3QgaXNTdG9yYWdlQXZhaWxhYmxlID0gdGhpcy5jaGVja0lzU3RvcmFnZUF2YWlsYWJsZShzdG9yYWdlVHlwZSk7XHJcbiAgICAgICAgaWYgKCFpc1N0b3JhZ2VBdmFpbGFibGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0b3JhZ2VUeXBlID0gc3RvcmFnZVR5cGU7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldChrZXk6IHN0cmluZykge1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5zdG9yYWdlVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIENPT0tJRTpcclxuICAgICAgICAgICAgY2FzZSBTRVNTSU9OX0NPT0tJRTpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldENvb2tpZShrZXkpO1xyXG4gICAgICAgICAgICBjYXNlIExPQ0FMX1NUT1JBR0U6XHJcbiAgICAgICAgICAgIGNhc2UgU0VTU0lPTl9TVE9SQUdFOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvd1t0aGlzLnN0b3JhZ2VUeXBlXS5nZXRJdGVtKGtleSk7XHJcbiAgICAgICAgICAgIGNhc2UgTUVNT1JZOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmVba2V5XTtcclxuICAgICAgICAgICAgY2FzZSBOT05FOlxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIGRhdGU6IHN0cmluZykge1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5zdG9yYWdlVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIENPT0tJRTpcclxuICAgICAgICAgICAgY2FzZSBTRVNTSU9OX0NPT0tJRTpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0Q29va2llKGtleSwgdmFsdWUsIHRoaXMuc3RvcmFnZVR5cGUgPT09IENPT0tJRSA/IGRhdGUgOiAnJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBMT0NBTF9TVE9SQUdFOlxyXG4gICAgICAgICAgICBjYXNlIFNFU1NJT05fU1RPUkFHRTpcclxuICAgICAgICAgICAgICAgIHdpbmRvd1t0aGlzLnN0b3JhZ2VUeXBlXS5zZXRJdGVtKGtleSwgdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTUVNT1JZOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yZVtrZXldID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBOT05FOlxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmUoa2V5OiBzdHJpbmcpIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RvcmFnZVR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBDT09LSUU6XHJcbiAgICAgICAgICAgIGNhc2UgU0VTU0lPTl9DT09LSUU6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUNvb2tpZShrZXkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTE9DQUxfU1RPUkFHRTpcclxuICAgICAgICAgICAgY2FzZSBTRVNTSU9OX1NUT1JBR0U6XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dbdGhpcy5zdG9yYWdlVHlwZV0ucmVtb3ZlSXRlbShrZXkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTUVNT1JZOlxyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuc3RvcmVba2V5XTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIE5PTkU6XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja0lzU3RvcmFnZUF2YWlsYWJsZShzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGUpIHtcclxuICAgICAgICBzd2l0Y2ggKHN0b3JhZ2VUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgQ09PS0lFOlxyXG4gICAgICAgICAgICBjYXNlIFNFU1NJT05fQ09PS0lFOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNDb29raWVTdG9yYWdlQXZhaWxhYmxlKCk7XHJcbiAgICAgICAgICAgIGNhc2UgTE9DQUxfU1RPUkFHRTpcclxuICAgICAgICAgICAgY2FzZSBTRVNTSU9OX1NUT1JBR0U6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc1dpbmRvd1N0b3JhZ2VBdmFpbGFibGUoc3RvcmFnZVR5cGUpO1xyXG4gICAgICAgICAgICBjYXNlIE5PTkU6XHJcbiAgICAgICAgICAgIGNhc2UgTUVNT1JZOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNXaW5kb3dTdG9yYWdlQXZhaWxhYmxlKHN0b3JhZ2VUeXBlOiB0eXBlb2YgU0VTU0lPTl9TVE9SQUdFIHwgdHlwZW9mIExPQ0FMX1NUT1JBR0UpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBzdXBwb3J0ZWQgPSB3aW5kb3cgJiYgc3RvcmFnZVR5cGUgaW4gd2luZG93ICYmIHdpbmRvd1tzdG9yYWdlVHlwZV0gIT09IG51bGw7XHJcblxyXG4gICAgICAgICAgICBpZiAoc3VwcG9ydGVkKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoNyk7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dbc3RvcmFnZVR5cGVdLnNldEl0ZW0oa2V5LCAnJyk7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dbc3RvcmFnZVR5cGVdLnJlbW92ZUl0ZW0oa2V5KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHN1cHBvcnRlZDtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc0Nvb2tpZVN0b3JhZ2VBdmFpbGFibGUoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3Qgc3VwcG9ydGVkID0gZG9jdW1lbnQgJiYgJ2Nvb2tpZScgaW4gZG9jdW1lbnQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoc3VwcG9ydGVkKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoNyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldENvb2tpZShrZXksICd0ZXN0JywgbmV3IERhdGUoRGF0ZS5ub3coKSArIDYwICogMTAwMCkudG9VVENTdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0Q29va2llKGtleSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUNvb2tpZShrZXkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlID09PSAndGVzdCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldENvb2tpZShrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZywgZXhwaXJlcyA9ICcnLCBwYXRoID0gJy8nKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gYCR7a2V5fT0ke3ZhbHVlfSR7ZXhwaXJlcyA/IGA7IGV4cGlyZXM9JHtleHBpcmVzfWAgOiAnJ307IHBhdGg9JHtwYXRofWA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZW1vdmVDb29raWUoa2V5OiBzdHJpbmcsIHBhdGggPSAnLycpIHtcclxuICAgICAgICB0aGlzLnNldENvb2tpZShrZXksICcnLCBuZXcgRGF0ZSgwKS50b1VUQ1N0cmluZygpLCBwYXRoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldENvb2tpZShrZXk6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5jb29raWUucmVwbGFjZShuZXcgUmVnRXhwKGAoPzooPzpefC4qO1xcXFxzKikke2tleX1cXFxccypcXFxcPVxcXFxzKihbXjtdKikuKiQpfF4uKiRgKSwgJyQxJyk7XHJcbiAgICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgUm9uIG9uIDE3LzEyLzIwMTUuXHJcbiAqL1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpYmVyIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4vY29uZmlnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdG9yYWdlU2VydmljZSB9IGZyb20gJy4vc3RvcmFnZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3RvcmFnZVR5cGUgfSBmcm9tICcuL3N0b3JhZ2UtdHlwZS5lbnVtJztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFJvbiBvbiAxNy8xMi8yMDE1LlxyXG4gKi9cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFNoYXJlZFNlcnZpY2Uge1xyXG4gICAgcHVibGljIHRva2VuTmFtZSA9IHRoaXMuY29uZmlnLm9wdGlvbnMudG9rZW5QcmVmaXhcclxuICAgICAgICA/IFt0aGlzLmNvbmZpZy5vcHRpb25zLnRva2VuUHJlZml4LCB0aGlzLmNvbmZpZy5vcHRpb25zLnRva2VuTmFtZV0uam9pbih0aGlzLmNvbmZpZy5vcHRpb25zLnRva2VuU2VwYXJhdG9yKVxyXG4gICAgICAgIDogdGhpcy5jb25maWcub3B0aW9ucy50b2tlbk5hbWU7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBzdG9yYWdlOiBTdG9yYWdlU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSkgeyB9XHJcblxyXG4gICAgcHVibGljIGdldFRva2VuKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZ2V0KHRoaXMudG9rZW5OYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0UGF5bG9hZCh0b2tlbiA9IHRoaXMuZ2V0VG9rZW4oKSkge1xyXG5cclxuICAgICAgICBpZiAodG9rZW4gJiYgdG9rZW4uc3BsaXQoJy4nKS5sZW5ndGggPT09IDMpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJhc2U2NFVybCA9IHRva2VuLnNwbGl0KCcuJylbMV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBiYXNlNjQgPSBiYXNlNjRVcmwucmVwbGFjZSgvLS9nLCAnKycpLnJlcGxhY2UoL18vZywgJy8nKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHRoaXMuYjY0RGVjb2RlVW5pY29kZShiYXNlNjQpKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0VG9rZW4ocmVzcG9uc2U6IHN0cmluZyB8IG9iamVjdCkge1xyXG4gICAgICAgIGlmICghcmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS53YXJuKCdDYW5cXCd0IHNldCB0b2tlbiB3aXRob3V0IHBhc3NpbmcgYSB2YWx1ZScpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdG9rZW46IHN0cmluZztcclxuICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB0b2tlbiA9IHJlc3BvbnNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRva2VuID0gdGhpcy5jb25maWcub3B0aW9ucy5yZXNvbHZlVG9rZW4ocmVzcG9uc2UsIHRoaXMuY29uZmlnLm9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRva2VuKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGV4cERhdGUgPSB0aGlzLmdldEV4cGlyYXRpb25EYXRlKHRva2VuKTtcclxuICAgICAgICAgICAgdGhpcy5zdG9yYWdlLnNldCh0aGlzLnRva2VuTmFtZSwgdG9rZW4sIGV4cERhdGUgPyBleHBEYXRlLnRvVVRDU3RyaW5nKCkgOiAnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVUb2tlbigpIHtcclxuICAgICAgICB0aGlzLnN0b3JhZ2UucmVtb3ZlKHRoaXMudG9rZW5OYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNBdXRoZW50aWNhdGVkKHRva2VuID0gdGhpcy5nZXRUb2tlbigpKSB7XHJcblxyXG4gICAgICAgIC8vIGEgdG9rZW4gaXMgcHJlc2VudFxyXG4gICAgICAgIGlmICh0b2tlbikge1xyXG4gICAgICAgICAgICAvLyB0b2tlbiB3aXRoIGEgdmFsaWQgSldUIGZvcm1hdCBYWFguWVlZLlpaWlxyXG4gICAgICAgICAgICBpZiAodG9rZW4uc3BsaXQoJy4nKS5sZW5ndGggPT09IDMpIHtcclxuICAgICAgICAgICAgICAgIC8vIGNvdWxkIGJlIGEgdmFsaWQgSldUIG9yIGFuIGFjY2VzcyB0b2tlbiB3aXRoIHRoZSBzYW1lIGZvcm1hdFxyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBiYXNlNjRVcmwgPSB0b2tlbi5zcGxpdCgnLicpWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhc2U2NCA9IGJhc2U2NFVybC5yZXBsYWNlKC8tL2csICcrJykucmVwbGFjZSgvXy9nLCAnLycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGV4cCA9IEpTT04ucGFyc2UodGhpcy5iNjREZWNvZGVVbmljb2RlKGJhc2U2NCkpLmV4cDtcclxuICAgICAgICAgICAgICAgICAgICAvLyBqd3Qgd2l0aCBhbiBvcHRpb25hbCBleHBpcmF0aW9uIGNsYWltc1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChleHApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNFeHBpcmVkID0gTWF0aC5yb3VuZChuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDApID49IGV4cDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzRXhwaXJlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZmFpbDogRXhwaXJlZCB0b2tlblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlLnJlbW92ZSh0aGlzLnRva2VuTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwYXNzOiBOb24tZXhwaXJlZCB0b2tlblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcGFzczogTm9uLUpXVCB0b2tlbiB0aGF0IGxvb2tzIGxpa2UgSldUXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gcGFzczogQWxsIG90aGVyIHRva2Vuc1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gbGFpbDogTm8gdG9rZW4gYXQgYWxsXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRFeHBpcmF0aW9uRGF0ZSh0b2tlbiA9IHRoaXMuZ2V0VG9rZW4oKSkge1xyXG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSB0aGlzLmdldFBheWxvYWQodG9rZW4pO1xyXG4gICAgICAgIGlmIChwYXlsb2FkICYmIHBheWxvYWQuZXhwICYmIE1hdGgucm91bmQobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwKSA8IHBheWxvYWQuZXhwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgwKTtcclxuICAgICAgICAgICAgZGF0ZS5zZXRVVENTZWNvbmRzKHBheWxvYWQuZXhwKTtcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2dvdXQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoKG9ic2VydmVyOiBTdWJzY3JpYmVyPGFueT4pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zdG9yYWdlLnJlbW92ZSh0aGlzLnRva2VuTmFtZSk7XHJcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQoKTtcclxuICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0U3RvcmFnZVR5cGUodHlwZTogU3RvcmFnZVR5cGUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdG9yYWdlLnVwZGF0ZVN0b3JhZ2VUeXBlKHR5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYjY0RGVjb2RlVW5pY29kZShzdHIpIHtcclxuICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KFxyXG4gICAgICAgICAgICBBcnJheS5wcm90b3R5cGUubWFwLmNhbGwoYXRvYihzdHIpLFxyXG4gICAgICAgICAgICBjID0+ICclJyArICgnMDAnICsgYy5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTIpLFxyXG4gICAgICAgICkuam9pbignJykpO1xyXG4gICAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFJvbiBvbiAxNy8xMi8yMDE1LlxyXG4gKi9cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBqb2luVXJsKGJhc2VVcmw6IHN0cmluZywgdXJsOiBzdHJpbmcpIHtcclxuICAgIGlmICgvXig/OlthLXpdKzopP1xcL1xcLy9pLnRlc3QodXJsKSkge1xyXG4gICAgICAgIHJldHVybiB1cmw7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGpvaW5lZCA9IFtiYXNlVXJsLCB1cmxdLmpvaW4oJy8nKTtcclxuXHJcbiAgICBsZXQgbm9ybWFsaXplID0gZnVuY3Rpb24gKHN0cikge1xyXG4gICAgICAgIHJldHVybiBzdHJcclxuICAgICAgICAgICAgLnJlcGxhY2UoL1tcXC9dKy9nLCAnLycpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXC9cXD8vZywgJz8nKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvXFwvXFwjL2csICcjJylcclxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcOlxcLy9nLCAnOi8vJyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBub3JtYWxpemUoam9pbmVkKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRlZXBNZXJnZShvYmoxOiBvYmplY3QsIG9iajI6IG9iamVjdCk6IGFueSB7XHJcbiAgICBsZXQgcmVzdWx0ID0ge307XHJcbiAgICBmb3IgKGxldCBpIGluIG9iajEpIHtcclxuICAgICAgICBpZiAob2JqMS5oYXNPd25Qcm9wZXJ0eShpKSkge1xyXG4gICAgICAgICAgICBpZiAoKGkgaW4gb2JqMikgJiYgKHR5cGVvZiBvYmoxW2ldID09PSAnb2JqZWN0JykgJiYgKGkgIT09IG51bGwpKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRbaV0gPSBkZWVwTWVyZ2Uob2JqMVtpXSwgb2JqMltpXSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRbaV0gPSBvYmoxW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgaSBpbiBvYmoyKSB7XHJcbiAgICAgICAgaWYgKG9iajIuaGFzT3duUHJvcGVydHkoaSkpIHtcclxuICAgICAgICAgICAgaWYgKGkgaW4gcmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXN1bHRbaV0gPSBvYmoyW2ldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2FtZWxDYXNlKG5hbWUpIHtcclxuICAgIHJldHVybiBuYW1lLnJlcGxhY2UoLyhbXFw6XFwtXFxfXSsoLikpL2csIGZ1bmN0aW9uKF8sIHNlcGFyYXRvciwgbGV0dGVyLCBvZmZzZXQpIHtcclxuICAgICAgICByZXR1cm4gb2Zmc2V0ID8gbGV0dGVyLnRvVXBwZXJDYXNlKCkgOiBsZXR0ZXI7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkUXVlcnlTdHJpbmcob2JqOiBvYmplY3QpIHtcclxuICAgIHJldHVybiBPYmplY3RcclxuICAgICAgICAua2V5cyhvYmopXHJcbiAgICAgICAgLm1hcCgoa2V5KSA9PiAhIW9ialtrZXldID8gYCR7ZW5jb2RlVVJJQ29tcG9uZW50KGtleSl9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KG9ialtrZXldKX1gIDoga2V5KVxyXG4gICAgICAgIC5qb2luKCcmJyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRXaW5kb3dPcmlnaW4odyA9IHdpbmRvdykge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBpZiAoIXcgfHwgIXcubG9jYXRpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdy5sb2NhdGlvbi5vcmlnaW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGAke3cubG9jYXRpb24ucHJvdG9jb2x9Ly8ke3cubG9jYXRpb24uaG9zdG5hbWV9JHt3LmxvY2F0aW9uLnBvcnQgPyAnOicgKyB3LmxvY2F0aW9uLnBvcnQgOiAnJ31gO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdy5sb2NhdGlvbi5vcmlnaW47XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIC8vIGlnbm9yZSBET01FeGNlcHRpb246IEJsb2NrZWQgYSBmcmFtZSB3aXRoIG9yaWdpbiBmcm9tIGFjY2Vzc2luZyBhIGNyb3NzLW9yaWdpbiBmcmFtZS5cclxuICAgICAgICAvLyBlcnJvciBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJiBlcnJvci5uYW1lID09PSAnU2VjdXJpdHlFcnJvcidcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEZ1bGxVcmxQYXRoKGxvY2F0aW9uOiBIVE1MQW5jaG9yRWxlbWVudHxMb2NhdGlvbik6IHN0cmluZyB7XHJcbiAgICBpZiAoIWxvY2F0aW9uLnByb3RvY29sKSB7XHJcbiAgICAgICAgbGV0IHRlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblxyXG4gICAgICAgIHRlbXAuaHJlZiA9IGxvY2F0aW9uLmhyZWY7XHJcblxyXG4gICAgICAgIGxvY2F0aW9uID0gdGVtcDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbG9jYXRpb24ucHJvdG9jb2wgKyAnLy8nICsgbG9jYXRpb24uaG9zdG5hbWVcclxuICAgICAgICArIChsb2NhdGlvbi5wb3J0ICYmIGxvY2F0aW9uLnBvcnQgIT09ICc4MCcgJiYgbG9jYXRpb24ucG9ydCAhPT0gJzQ0MycgPyBsb2NhdGlvbi5wb3J0IDogJycpIC8vIEFwcGVuZCB0aGUgcG9ydCBvbmx5IHdoZW4gaXQncyBub3QgdGhlIGRlZmF1bHQgUG9ydFxyXG4gICAgICAgICsgKC9eXFwvLy50ZXN0KGxvY2F0aW9uLnBhdGhuYW1lKSA/IGxvY2F0aW9uLnBhdGhuYW1lIDogJy8nICsgbG9jYXRpb24ucGF0aG5hbWUpO1xyXG59IiwiaW1wb3J0IHsgZ2V0V2luZG93T3JpZ2luLCBnZXRGdWxsVXJsUGF0aCB9IGZyb20gJy4vdXRpbHMnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEVNUFRZLCBmcm9tRXZlbnQsIGludGVydmFsLCBtZXJnZSwgT2JzZXJ2YWJsZSwgb2YsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgSVBvcHVwT3B0aW9ucywgSU9hdXRoMk9wdGlvbnMsIElPYXV0aDFPcHRpb25zIH0gZnJvbSAnLi9jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IHN3aXRjaE1hcCwgdGFrZSwgbWFwLCBkZWxheSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFJvbiBvbiAxNy8xMi8yMDE1LlxyXG4gKi9cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFBvcHVwU2VydmljZSB7XHJcbiAgICBwdWJsaWMgb3Blbih1cmw6IHN0cmluZywgb3B0aW9uczogSU9hdXRoMk9wdGlvbnMgfCBJT2F1dGgxT3B0aW9ucywgY29yZG92YTogYm9vbGVhbiB8IG51bGwpIHtcclxuICAgICAgICBjb25zdCBzdHJpbmdpZmllZE9wdGlvbnMgPSB0aGlzLnN0cmluZ2lmeU9wdGlvbnModGhpcy5wcmVwYXJlT3B0aW9ucyhvcHRpb25zLnBvcHVwT3B0aW9ucykpO1xyXG4gICAgICAgIGNvbnN0IFVBID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7XHJcbiAgICAgICAgY29yZG92YSA9IGNvcmRvdmEgPT09IG51bGwgPyB0aGlzLmlzQ29yZG92YUFwcCgpIDogY29yZG92YTtcclxuICAgICAgICBjb25zdCB3aW5kb3dOYW1lID0gY29yZG92YSA/ICdfYmxhbmsnIDogb3B0aW9ucy5uYW1lO1xyXG5cclxuICAgICAgICBjb25zdCBwb3B1cFdpbmRvdyA9IHdpbmRvdy5vcGVuKHVybCwgd2luZG93TmFtZSwgc3RyaW5naWZpZWRPcHRpb25zKTtcclxuXHJcbiAgICAgICAgaWYgKHBvcHVwV2luZG93ICYmIHBvcHVwV2luZG93LmZvY3VzKSB7XHJcbiAgICAgICAgICAgIHBvcHVwV2luZG93LmZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY29yZG92YVxyXG4gICAgICAgICAgICA/IHRoaXMuZXZlbnRMaXN0ZW5lcihwb3B1cFdpbmRvdywgb3B0aW9ucy5yZWRpcmVjdFVyaSB8fCBnZXRXaW5kb3dPcmlnaW4oKSlcclxuICAgICAgICAgICAgOiB0aGlzLnBvbGxQb3B1cChwb3B1cFdpbmRvdywgb3B0aW9ucy5yZWRpcmVjdFVyaSB8fCBnZXRXaW5kb3dPcmlnaW4oKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGV2ZW50TGlzdGVuZXIocG9wdXBXaW5kb3c6IFdpbmRvdywgcmVkaXJlY3RVcmk6IHN0cmluZykge1xyXG4gICAgICAgIGlmICghcG9wdXBXaW5kb3cpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQb3B1cCB3YXMgbm90IGNyZWF0ZWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1lcmdlKFxyXG4gICAgICAgICAgICBmcm9tRXZlbnQ8RXZlbnQ+KHBvcHVwV2luZG93LCAnZXhpdCcpLnBpcGUoXHJcbiAgICAgICAgICAgICAgICBkZWxheSgxMDApLFxyXG4gICAgICAgICAgICAgICAgbWFwKCgpID0+IHsgdGhyb3cgbmV3IEVycm9yKCdBdXRoZW50aWNhdGlvbiBDYW5jZWxlZCcpOyB9KSxcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgZnJvbUV2ZW50KHBvcHVwV2luZG93LCAnbG9hZHN0YXJ0JyksXHJcbiAgICAgICAgKS5waXBlKFxyXG4gICAgICAgICAgICBzd2l0Y2hNYXAoKGV2ZW50OiBFdmVudCAmIHsgdXJsOiBzdHJpbmcgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFwb3B1cFdpbmRvdyB8fCBwb3B1cFdpbmRvdy5jbG9zZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhuZXcgRXJyb3IoJ0F1dGhlbnRpY2F0aW9uIENhbmNlbGVkJykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnVybC5pbmRleE9mKHJlZGlyZWN0VXJpKSAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBFTVBUWTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJzZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICAgICAgICAgICAgICBwYXJzZXIuaHJlZiA9IGV2ZW50LnVybDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VyLnNlYXJjaCB8fCBwYXJzZXIuaGFzaCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zID0gcGFyc2VyLnNlYXJjaC5zdWJzdHJpbmcoMSkucmVwbGFjZSgvXFwvJC8sICcnKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBoYXNoUGFyYW1zID0gcGFyc2VyLmhhc2guc3Vic3RyaW5nKDEpLnJlcGxhY2UoL1xcLyQvLCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFzaCA9IHRoaXMucGFyc2VRdWVyeVN0cmluZyhoYXNoUGFyYW1zKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBxcyA9IHRoaXMucGFyc2VRdWVyeVN0cmluZyhxdWVyeVBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWxsUGFyYW1zID0geyAuLi5xcywgLi4uaGFzaCB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBwb3B1cFdpbmRvdy5jbG9zZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoYWxsUGFyYW1zLmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGFsbFBhcmFtcy5lcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2YoYWxsUGFyYW1zKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gRU1QVFk7XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICB0YWtlKDEpLFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcG9sbFBvcHVwKHBvcHVwV2luZG93OiBXaW5kb3csIHJlZGlyZWN0VXJpOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgcmVkaXJlY3RVcmlQYXJzZXI6IEhUTUxBbmNob3JFbGVtZW50ID0gPEhUTUxBbmNob3JFbGVtZW50PmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgICAgICByZWRpcmVjdFVyaVBhcnNlci5ocmVmID0gcmVkaXJlY3RVcmk7XHJcblxyXG4gICAgICAgIGxldCByZWRpcmVjdFVyaVBhdGggPSBnZXRGdWxsVXJsUGF0aChyZWRpcmVjdFVyaVBhcnNlcik7XHJcblxyXG4gICAgICAgIHJldHVybiBpbnRlcnZhbCg1MClcclxuICAgICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXBvcHVwV2luZG93IHx8IHBvcHVwV2luZG93LmNsb3NlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKG5ldyBFcnJvcignQXV0aGVudGljYXRpb24gQ2FuY2VsZWQnKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHBvcHVwV2luZG93UGF0aCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBwb3B1cFdpbmRvd1BhdGggID0gZ2V0RnVsbFVybFBhdGgocG9wdXBXaW5kb3cubG9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBpZ25vcmUgRE9NRXhjZXB0aW9uOiBCbG9ja2VkIGEgZnJhbWUgd2l0aCBvcmlnaW4gZnJvbSBhY2Nlc3NpbmcgYSBjcm9zcy1vcmlnaW4gZnJhbWUuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZXJyb3IgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiYgZXJyb3IubmFtZSA9PT0gJ1NlY3VyaXR5RXJyb3InXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAocmVkaXJlY3RVcmlQYXRoID09PSBwb3B1cFdpbmRvd1BhdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocG9wdXBXaW5kb3cubG9jYXRpb24uc2VhcmNoIHx8IHBvcHVwV2luZG93LmxvY2F0aW9uLmhhc2gpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcXVlcnlQYXJhbXMgPSBwb3B1cFdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyaW5nKDEpLnJlcGxhY2UoL1xcLyQvLCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhc2hQYXJhbXMgPSBwb3B1cFdpbmRvdy5sb2NhdGlvbi5oYXNoLnN1YnN0cmluZygxKS5yZXBsYWNlKC9bXFwvJF0vLCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhc2ggPSB0aGlzLnBhcnNlUXVlcnlTdHJpbmcoaGFzaFBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHFzID0gdGhpcy5wYXJzZVF1ZXJ5U3RyaW5nKHF1ZXJ5UGFyYW1zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9wdXBXaW5kb3cuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYWxsUGFyYW1zID0geyAuLi5xcywgLi4uaGFzaCB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWxsUGFyYW1zLmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBhbGxQYXJhbXMuZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2YoYWxsUGFyYW1zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKG5ldyBFcnJvcignTm8gdG9rZW4gZm91bmQgYWZ0ZXIgcmVkaXJlY3QnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEVNUFRZO1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgdGFrZSgxKSxcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcHJlcGFyZU9wdGlvbnMob3B0aW9ucz86IElQb3B1cE9wdGlvbnMpIHtcclxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuICAgICAgICBjb25zdCB3aWR0aCA9IG9wdGlvbnMud2lkdGggfHwgNTAwO1xyXG4gICAgICAgIGNvbnN0IGhlaWdodCA9IG9wdGlvbnMuaGVpZ2h0IHx8IDUwMDtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB3aWR0aCxcclxuICAgICAgICAgICAgaGVpZ2h0LFxyXG4gICAgICAgICAgICBsZWZ0OiB3aW5kb3cuc2NyZWVuWCArICgod2luZG93Lm91dGVyV2lkdGggLSB3aWR0aCkgLyAyKSxcclxuICAgICAgICAgICAgdG9wOiB3aW5kb3cuc2NyZWVuWSArICgod2luZG93Lm91dGVySGVpZ2h0IC0gaGVpZ2h0KSAvIDIuNSksXHJcbiAgICAgICAgICAgIHRvb2xiYXI6IG9wdGlvbnMudmlzaWJsZVRvb2xiYXIgPyAneWVzJyA6ICdubycsXHJcbiAgICAgICAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0cmluZ2lmeU9wdGlvbnMob3B0aW9uczogeyBbaW5kZXg6IHN0cmluZ106IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfCBudWxsIHwgdW5kZWZpbmVkIH0pIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMob3B0aW9ucylcclxuICAgICAgICAgICAgLm1hcCgoa2V5KSA9PiBvcHRpb25zW2tleV0gPT09IG51bGwgfHwgb3B0aW9uc1trZXldID09PSB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgID8ga2V5XHJcbiAgICAgICAgICAgICAgICA6IGtleSArICc9JyArIG9wdGlvbnNba2V5XSxcclxuICAgICAgICApLmpvaW4oJywnKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHBhcnNlUXVlcnlTdHJpbmcoam9pbmVkS2V5VmFsdWU6IHN0cmluZyk6IGFueSB7XHJcbiAgICAgICAgbGV0IGtleTtcclxuICAgICAgICBsZXQgdmFsdWU7XHJcbiAgICAgICAgcmV0dXJuIGpvaW5lZEtleVZhbHVlLnNwbGl0KCcmJykucmVkdWNlKFxyXG4gICAgICAgICAgICAob2JqLCBrZXlWYWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGtleVZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBrZXlWYWx1ZS5zcGxpdCgnPScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGtleSA9IGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZVswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqW2tleV0gPSB0eXBlb2YgdmFsdWVbMV0gIT09ICd1bmRlZmluZWQnID8gZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlWzFdKSA6IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7fSBhcyB7IFtrOiBzdHJpbmddOiBzdHJpbmcgfCB0cnVlIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNDb3Jkb3ZhQXBwKCkge1xyXG4gICAgICAgIHJldHVybiAhISh3aW5kb3cgJiYgKFxyXG4gICAgICAgICAgICAod2luZG93IGFzIGFueSkuY29yZG92YSB8fFxyXG4gICAgICAgICAgICB3aW5kb3cubmF2aWdhdG9yICYmIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50ICYmIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0NyaU9TJykgPiAtMVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IElPYXV0aFNlcnZpY2UgfSBmcm9tICcuL29hdXRoLXNlcnZpY2UuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBQb3B1cFNlcnZpY2UgfSBmcm9tICcuL3BvcHVwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBqb2luVXJsLCBidWlsZFF1ZXJ5U3RyaW5nIH0gZnJvbSAnLi91dGlscyc7XHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UsIElPYXV0aDFPcHRpb25zIH0gZnJvbSAnLi9jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgUm9uIG9uIDE3LzEyLzIwMTUuXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBPYXV0aDFTZXJ2aWNlIGltcGxlbWVudHMgSU9hdXRoU2VydmljZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgICAgIHByaXZhdGUgcG9wdXA6IFBvcHVwU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSxcclxuICAgICkgeyB9XHJcblxyXG4gICAgb3BlbjxUIGV4dGVuZHMgb2JqZWN0IHwgc3RyaW5nID0gYW55PihvYXV0aE9wdGlvbnM6IElPYXV0aDFPcHRpb25zLCB1c2VyRGF0YTogb2JqZWN0KTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICAgICAgY29uc3Qgc2VydmVyVXJsID0gdGhpcy5jb25maWcub3B0aW9ucy5iYXNlVXJsXHJcbiAgICAgICAgICAgID8gam9pblVybCh0aGlzLmNvbmZpZy5vcHRpb25zLmJhc2VVcmwsIG9hdXRoT3B0aW9ucy51cmwpXHJcbiAgICAgICAgICAgIDogb2F1dGhPcHRpb25zLnVybDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PG9iamVjdD4oc2VydmVyVXJsLCBvYXV0aE9wdGlvbnMpLnBpcGUoXHJcbiAgICAgICAgICAgIHN3aXRjaE1hcCgoYXV0aG9yaXphdGlvbkRhdGEpID0+IHRoaXMucG9wdXAub3BlbihcclxuICAgICAgICAgICAgICAgIFtvYXV0aE9wdGlvbnMuYXV0aG9yaXphdGlvbkVuZHBvaW50LCBidWlsZFF1ZXJ5U3RyaW5nKGF1dGhvcml6YXRpb25EYXRhKV0uam9pbignPycpLFxyXG4gICAgICAgICAgICAgICAgb2F1dGhPcHRpb25zLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcub3B0aW9ucy5jb3Jkb3ZhLFxyXG4gICAgICAgICAgICApLCAoYXV0aG9yaXphdGlvbkRhdGEsIG9hdXRoRGF0YSkgPT4gKHsgYXV0aG9yaXphdGlvbkRhdGEsIG9hdXRoRGF0YSB9KSksXHJcbiAgICAgICAgICAgIHN3aXRjaE1hcCgoeyBhdXRob3JpemF0aW9uRGF0YSwgb2F1dGhEYXRhIH0pID0+IHRoaXMuZXhjaGFuZ2VGb3JUb2tlbjxUPihvYXV0aE9wdGlvbnMsIGF1dGhvcml6YXRpb25EYXRhLCBvYXV0aERhdGEsIHVzZXJEYXRhKSksXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGV4Y2hhbmdlRm9yVG9rZW48VD4ob2F1dGhPcHRpb25zOiBJT2F1dGgxT3B0aW9ucywgYXV0aG9yaXphdGlvbkRhdGE6IG9iamVjdCwgb2F1dGhEYXRhOiBvYmplY3QsIHVzZXJEYXRhOiBvYmplY3QpIHtcclxuICAgICAgICBjb25zdCBib2R5ID0geyBhdXRob3JpemF0aW9uRGF0YSwgb2F1dGhEYXRhLCB1c2VyRGF0YSB9O1xyXG4gICAgICAgIGNvbnN0IHsgd2l0aENyZWRlbnRpYWxzLCBiYXNlVXJsIH0gPSB0aGlzLmNvbmZpZy5vcHRpb25zO1xyXG4gICAgICAgIGNvbnN0IHsgbWV0aG9kID0gJ1BPU1QnLCB1cmwgfSA9IG9hdXRoT3B0aW9ucztcclxuICAgICAgICBjb25zdCBleGNoYW5nZUZvclRva2VuVXJsID0gYmFzZVVybCA/IGpvaW5VcmwoYmFzZVVybCwgdXJsKSA6IHVybDtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnJlcXVlc3Q8VD4obWV0aG9kLCBleGNoYW5nZUZvclRva2VuVXJsLCB7IGJvZHksIHdpdGhDcmVkZW50aWFscyB9KVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IElPYXV0aFNlcnZpY2UgfSBmcm9tICcuL29hdXRoLXNlcnZpY2UuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBqb2luVXJsLCBidWlsZFF1ZXJ5U3RyaW5nLCBnZXRXaW5kb3dPcmlnaW4gfSBmcm9tICcuL3V0aWxzJztcclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSwgSU9hdXRoMk9wdGlvbnMgfSBmcm9tICcuL2NvbmZpZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUG9wdXBTZXJ2aWNlIH0gZnJvbSAnLi9wb3B1cC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgUm9uIG9uIDE3LzEyLzIwMTUuXHJcbiAqL1xyXG5cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE9hdXRoMlNlcnZpY2UgaW1wbGVtZW50cyBJT2F1dGhTZXJ2aWNlIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgICAgICAgcHJpdmF0ZSBwb3B1cDogUG9wdXBTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgY29uZmlnOiBDb25maWdTZXJ2aWNlKSB7XHJcbiAgICB9XHJcblxyXG4gICAgb3BlbjxUIGV4dGVuZHMgb2JqZWN0IHwgc3RyaW5nID0gYW55PihvYXV0aE9wdGlvbnM6IElPYXV0aDJPcHRpb25zLCB1c2VyRGF0YTogb2JqZWN0KTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICAgICAgY29uc3QgYXV0aG9yaXphdGlvbkRhdGEgPSB0aGlzLmdldEF1dGhvcml6YXRpb25EYXRhKG9hdXRoT3B0aW9ucyk7XHJcbiAgICAgICAgY29uc3QgdXJsID0gW29hdXRoT3B0aW9ucy5hdXRob3JpemF0aW9uRW5kcG9pbnQsIGJ1aWxkUXVlcnlTdHJpbmcoYXV0aG9yaXphdGlvbkRhdGEpXS5qb2luKCc/Jyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucG9wdXAub3Blbih1cmwsIG9hdXRoT3B0aW9ucywgdGhpcy5jb25maWcub3B0aW9ucy5jb3Jkb3ZhKS5waXBlKFxyXG4gICAgICAgICAgICBzd2l0Y2hNYXAoKG9hdXRoRGF0YTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyB3aGVuIG5vIHNlcnZlciBVUkwgcHJvdmlkZWQsIHJldHVybiBwb3B1cCBwYXJhbXMgYXMtaXMuXHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIGZvciBhIHNjZW5hcmlvIHdoZW4gc29tZW9uZSB3aXNoZXMgdG8gb3B0IG91dCBmcm9tXHJcbiAgICAgICAgICAgICAgICAvLyBzYXRlbGxpemVyJ3MgbWFnaWMgYnkgZG9pbmcgYXV0aG9yaXphdGlvbiBjb2RlIGV4Y2hhbmdlIGFuZFxyXG4gICAgICAgICAgICAgICAgLy8gc2F2aW5nIGEgdG9rZW4gbWFudWFsbHkuXHJcbiAgICAgICAgICAgICAgICBpZiAob2F1dGhPcHRpb25zLnJlc3BvbnNlVHlwZSA9PT0gJ3Rva2VuJyB8fCAhb2F1dGhPcHRpb25zLnVybCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvZihvYXV0aERhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChvYXV0aERhdGEuc3RhdGUgJiYgb2F1dGhEYXRhLnN0YXRlICE9PSBhdXRob3JpemF0aW9uRGF0YS5zdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignT0F1dGggXCJzdGF0ZVwiIG1pc21hdGNoJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5leGNoYW5nZUZvclRva2VuPFQ+KG9hdXRoT3B0aW9ucywgYXV0aG9yaXphdGlvbkRhdGEsIG9hdXRoRGF0YSwgdXNlckRhdGEpO1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZXhjaGFuZ2VGb3JUb2tlbjxUPihvcHRpb25zOiBJT2F1dGgyT3B0aW9ucywgYXV0aG9yaXphdGlvbkRhdGE6IG9iamVjdCwgb2F1dGhEYXRhOiBvYmplY3QsIHVzZXJEYXRhOiBvYmplY3QpIHtcclxuICAgICAgICBjb25zdCBib2R5ID0geyBhdXRob3JpemF0aW9uRGF0YSwgb2F1dGhEYXRhLCB1c2VyRGF0YSB9O1xyXG4gICAgICAgIGNvbnN0IHsgYmFzZVVybCwgd2l0aENyZWRlbnRpYWxzIH0gPSB0aGlzLmNvbmZpZy5vcHRpb25zO1xyXG4gICAgICAgIGNvbnN0IHsgdXJsLCBtZXRob2QgPSAnUE9TVCcgfSA9IG9wdGlvbnM7XHJcbiAgICAgICAgY29uc3QgZXhjaGFuZ2VGb3JUb2tlblVybCA9IGJhc2VVcmwgPyBqb2luVXJsKGJhc2VVcmwsIHVybCkgOiB1cmw7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5yZXF1ZXN0PFQ+KG1ldGhvZCwgZXhjaGFuZ2VGb3JUb2tlblVybCwgeyBib2R5LCB3aXRoQ3JlZGVudGlhbHMgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRBdXRob3JpemF0aW9uRGF0YShvcHRpb25zOiBJT2F1dGgyT3B0aW9ucykge1xyXG4gICAgICAgIGNvbnN0IHtcclxuICAgICAgICAgICAgcmVzcG9uc2VUeXBlID0gJ2NvZGUnLFxyXG4gICAgICAgICAgICBjbGllbnRJZCxcclxuICAgICAgICAgICAgcmVkaXJlY3RVcmkgPSBnZXRXaW5kb3dPcmlnaW4oKSB8fCAnJyxcclxuICAgICAgICAgICAgc2NvcGVEZWxpbWl0ZXIgPSAnLCcsXHJcbiAgICAgICAgICAgIHNjb3BlLFxyXG4gICAgICAgICAgICBzdGF0ZSxcclxuICAgICAgICAgICAgYWRkaXRpb25hbFVybFBhcmFtcyxcclxuICAgICAgICB9ID0gb3B0aW9ucztcclxuICAgICAgICBjb25zdCByZXNvbHZlZFN0YXRlID0gdHlwZW9mIHN0YXRlID09PSAnZnVuY3Rpb24nID8gc3RhdGUoKSA6IHN0YXRlO1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIFsncmVzcG9uc2VfdHlwZScsIHJlc3BvbnNlVHlwZV0sXHJcbiAgICAgICAgICAgIFsnY2xpZW50X2lkJywgY2xpZW50SWRdLFxyXG4gICAgICAgICAgICBbJ3JlZGlyZWN0X3VyaScsIHJlZGlyZWN0VXJpXSxcclxuICAgICAgICAgICAgLi4uc3RhdGUgPyBbWydzdGF0ZScsIHJlc29sdmVkU3RhdGVdXSA6IFtdLFxyXG4gICAgICAgICAgICAuLi5zY29wZSA/IFtbJ3Njb3BlJywgc2NvcGUuam9pbihzY29wZURlbGltaXRlcildXSA6IFtdLFxyXG4gICAgICAgICAgICAuLi5hZGRpdGlvbmFsVXJsUGFyYW1zXHJcbiAgICAgICAgICAgICAgICA/IE9iamVjdFxyXG4gICAgICAgICAgICAgICAgICAgIC5rZXlzKGFkZGl0aW9uYWxVcmxQYXJhbXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLm1hcCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlOiBzdHJpbmcgfCAoKCkgPT4gc3RyaW5nKSB8IG51bGwgfCB1bmRlZmluZWQgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGFkZGl0aW9uYWxVcmxQYXJhbXMgYXMgYW55KVtrZXldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtrZXksIHZhbHVlXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBba2V5LCB2YWx1ZSgpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtrZXksICcnXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWycnLCAnJ107XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIDogW10sXHJcbiAgICAgICAgXS5maWx0ZXIoKF8pID0+ICEhX1swXSkucmVkdWNlKChhY2MsIG5leHQpID0+ICh7IC4uLmFjYywgW25leHRbMF1dOiBuZXh0WzFdIH0pLCB7fSBhcyB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9KTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJT2F1dGhTZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aC1zZXJ2aWNlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFBvcHVwU2VydmljZSB9IGZyb20gJy4vcG9wdXAuc2VydmljZSc7XHJcbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9hdXRoMVNlcnZpY2UgfSBmcm9tICcuL29hdXRoMS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgT2F1dGgyU2VydmljZSB9IGZyb20gJy4vb2F1dGgyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTaGFyZWRTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQuc2VydmljZSc7XHJcbmltcG9ydCB7IGpvaW5VcmwgfSBmcm9tICcuL3V0aWxzJztcclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4vY29uZmlnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFJvbiBvbiAxNy8xMi8yMDE1LlxyXG4gKi9cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE9hdXRoU2VydmljZSB7XHJcbiAgICByZWFkb25seSBkZXBQcm92aWRlcnMgPSBbXHJcbiAgICAgICAgeyBwcm92aWRlOiBIdHRwQ2xpZW50LCB1c2VWYWx1ZTogdGhpcy5odHRwIH0sXHJcbiAgICAgICAgeyBwcm92aWRlOiBQb3B1cFNlcnZpY2UsIHVzZVZhbHVlOiB0aGlzLnBvcHVwIH0sXHJcbiAgICAgICAgeyBwcm92aWRlOiBDb25maWdTZXJ2aWNlLCB1c2VWYWx1ZTogdGhpcy5jb25maWcgfSxcclxuICAgIF07XHJcbiAgICByZWFkb25seSBkZXBzID0gW0h0dHBDbGllbnQsIFBvcHVwU2VydmljZSwgQ29uZmlnU2VydmljZV07XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgICAgIHByaXZhdGUgc2hhcmVkOiBTaGFyZWRTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgY29uZmlnOiBDb25maWdTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgcG9wdXA6IFBvcHVwU2VydmljZSkgeyB9XHJcblxyXG4gICAgcHVibGljIGF1dGhlbnRpY2F0ZTxUIGV4dGVuZHMgb2JqZWN0IHwgc3RyaW5nPihuYW1lOiBzdHJpbmcsIHVzZXJEYXRhPzogYW55KTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICAgICAgY29uc3QgcHJvdmlkZXI6IElPYXV0aFNlcnZpY2UgPSB0aGlzLmNvbmZpZy5vcHRpb25zLnByb3ZpZGVyc1tuYW1lXS5vYXV0aFR5cGUgPT09ICcxLjAnXHJcbiAgICAgICAgICAgID8gSW5qZWN0b3IuY3JlYXRlKFtcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMuZGVwUHJvdmlkZXJzLFxyXG4gICAgICAgICAgICAgICAgeyBwcm92aWRlOiBPYXV0aDFTZXJ2aWNlLCBkZXBzOiB0aGlzLmRlcHMgfSxcclxuICAgICAgICAgICAgXSkuZ2V0KE9hdXRoMVNlcnZpY2UpXHJcbiAgICAgICAgICAgIDogSW5qZWN0b3IuY3JlYXRlKFtcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMuZGVwUHJvdmlkZXJzLFxyXG4gICAgICAgICAgICAgICAgeyBwcm92aWRlOiBPYXV0aDJTZXJ2aWNlLCBkZXBzOiB0aGlzLmRlcHMgfSxcclxuICAgICAgICAgICAgXSkuZ2V0KE9hdXRoMlNlcnZpY2UpO1xyXG5cclxuICAgICAgICByZXR1cm4gcHJvdmlkZXIub3BlbjxUPih0aGlzLmNvbmZpZy5vcHRpb25zLnByb3ZpZGVyc1tuYW1lXSwgdXNlckRhdGEgfHwge30pXHJcbiAgICAgICAgICAgIC5waXBlKHRhcCgocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMgaXMgZm9yIGEgc2NlbmFyaW8gd2hlbiBzb21lb25lIHdpc2hlcyB0byBvcHQgb3V0IGZyb21cclxuICAgICAgICAgICAgICAgIC8vIHNhdGVsbGl6ZXIncyBtYWdpYyBieSBkb2luZyBhdXRob3JpemF0aW9uIGNvZGUgZXhjaGFuZ2UgYW5kXHJcbiAgICAgICAgICAgICAgICAvLyBzYXZpbmcgYSB0b2tlbiBtYW51YWxseS5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5vcHRpb25zLnByb3ZpZGVyc1tuYW1lXS51cmwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNoYXJlZC5zZXRUb2tlbihyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdW5saW5rPFQ+KFxyXG4gICAgICAgIHByb3ZpZGVyOiBzdHJpbmcsXHJcbiAgICAgICAgdXJsID0gam9pblVybCh0aGlzLmNvbmZpZy5vcHRpb25zLmJhc2VVcmwsIHRoaXMuY29uZmlnLm9wdGlvbnMudW5saW5rVXJsKSxcclxuICAgICAgICBtZXRob2QgPSAnUE9TVCcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnJlcXVlc3Q8VD4obWV0aG9kLCB1cmwsIHsgYm9keTogeyBwcm92aWRlciB9IH0pO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU2hhcmVkU2VydmljZSB9IGZyb20gJy4vc2hhcmVkLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IGpvaW5VcmwgfSBmcm9tICcuL3V0aWxzJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcblxyXG4vKipcclxuICogQ3JlYXRlZCBieSBSb24gb24gMTcvMTIvMjAxNS5cclxuICovXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBMb2NhbFNlcnZpY2Uge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgICAgIHByaXZhdGUgc2hhcmVkOiBTaGFyZWRTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgY29uZmlnOiBDb25maWdTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgbG9naW48VCBleHRlbmRzIHN0cmluZyB8IG9iamVjdD4odXNlcjogc3RyaW5nIHwgb2JqZWN0LCB1cmw/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8VD4odXJsIHx8IGpvaW5VcmwodGhpcy5jb25maWcub3B0aW9ucy5iYXNlVXJsLCB0aGlzLmNvbmZpZy5vcHRpb25zLmxvZ2luVXJsKSwgdXNlcilcclxuICAgICAgICAgICAgLnBpcGUodGFwKChkYXRhKSA9PiB0aGlzLnNoYXJlZC5zZXRUb2tlbihkYXRhKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaWdudXA8VCA9IGFueT4odXNlcjogc3RyaW5nIHwgb2JqZWN0LCB1cmw/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8VD4odXJsIHx8IGpvaW5VcmwodGhpcy5jb25maWcub3B0aW9ucy5iYXNlVXJsLCB0aGlzLmNvbmZpZy5vcHRpb25zLnNpZ251cFVybCksIHVzZXIpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU2hhcmVkU2VydmljZSB9IGZyb20gJy4vc2hhcmVkLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMb2NhbFNlcnZpY2UgfSBmcm9tICcuL2xvY2FsLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBPYXV0aFNlcnZpY2UgfSBmcm9tICcuL29hdXRoLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IFN0b3JhZ2VUeXBlIH0gZnJvbSAnLi9zdG9yYWdlLXR5cGUuZW51bSc7XHJcblxyXG4vKipcclxuICogQ3JlYXRlZCBieSBSb24gb24gMTcvMTIvMjAxNS5cclxuICovXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBBdXRoU2VydmljZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNoYXJlZDogU2hhcmVkU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGxvY2FsOiBMb2NhbFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBvYXV0aDogT2F1dGhTZXJ2aWNlKSB7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvZ2luPFQgZXh0ZW5kcyBzdHJpbmcgfCBvYmplY3QgPSBhbnk+KHVzZXI6IHN0cmluZyB8IG9iamVjdCwgdXJsPzogc3RyaW5nKTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWwubG9naW48VD4odXNlciwgdXJsKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2lnbnVwPFQgPSBhbnk+KHVzZXI6IHN0cmluZyB8IG9iamVjdCwgdXJsPzogc3RyaW5nKTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWwuc2lnbnVwPFQ+KHVzZXIsIHVybCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvZ291dCgpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zaGFyZWQubG9nb3V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGF1dGhlbnRpY2F0ZTxUIGV4dGVuZHMgb2JqZWN0IHwgc3RyaW5nPihuYW1lOiBzdHJpbmcsIHVzZXJEYXRhPzogYW55KTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub2F1dGguYXV0aGVudGljYXRlPFQ+KG5hbWUsIHVzZXJEYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbGluazxUIGV4dGVuZHMgb2JqZWN0IHwgc3RyaW5nPihuYW1lOiBzdHJpbmcsIHVzZXJEYXRhPzogYW55KTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub2F1dGguYXV0aGVudGljYXRlPFQ+KG5hbWUsIHVzZXJEYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdW5saW5rPFQgPSBhbnk+KHByb3ZpZGVyOiBzdHJpbmcsIHVybD86IHN0cmluZyk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm9hdXRoLnVubGluazxUPihwcm92aWRlciwgdXJsKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNBdXRoZW50aWNhdGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNoYXJlZC5pc0F1dGhlbnRpY2F0ZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0VG9rZW4oKTogc3RyaW5nIHwgbnVsbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hhcmVkLmdldFRva2VuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFRva2VuKHRva2VuOiBzdHJpbmcgfCBvYmplY3QpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNoYXJlZC5zZXRUb2tlbih0b2tlbik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZVRva2VuKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2hhcmVkLnJlbW92ZVRva2VuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFBheWxvYWQoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zaGFyZWQuZ2V0UGF5bG9hZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRTdG9yYWdlVHlwZSh0eXBlOiBTdG9yYWdlVHlwZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNoYXJlZC5zZXRTdG9yYWdlVHlwZSh0eXBlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0RXhwaXJhdGlvbkRhdGUoKTogRGF0ZSB8IG51bGwge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNoYXJlZC5nZXRFeHBpcmF0aW9uRGF0ZSgpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2NvbmZpZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU2hhcmVkU2VydmljZSB9IGZyb20gJy4vc2hhcmVkLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBFdmVudCwgSHR0cEludGVyY2VwdG9yLCBIdHRwSGFuZGxlciwgSHR0cFJlcXVlc3QgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEp3dEludGVyY2VwdG9yIGltcGxlbWVudHMgSHR0cEludGVyY2VwdG9yIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgc2hhcmVkOiBTaGFyZWRTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgY29uZmlnOiBDb25maWdTZXJ2aWNlLFxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBpbnRlcmNlcHQocmVxOiBIdHRwUmVxdWVzdDxhbnk+LCBuZXh0OiBIdHRwSGFuZGxlcik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcclxuICAgICAgICBjb25zdCB7IGF1dGhIZWFkZXIsIGF1dGhUb2tlbiB9ID0gdGhpcy5jb25maWcub3B0aW9ucztcclxuICAgICAgICBjb25zdCB0b2tlbiA9IHRoaXMuc2hhcmVkLmdldFRva2VuKCk7XHJcbiAgICAgICAgY29uc3QgaXNBdXRoZW50aWNhdGVkID0gdGhpcy5zaGFyZWQuaXNBdXRoZW50aWNhdGVkO1xyXG4gICAgICAgIGNvbnN0IG5ld1JlcSA9IGlzQXV0aGVudGljYXRlZCAmJiAhcmVxLmhlYWRlcnMuaGFzKGF1dGhIZWFkZXIpXHJcbiAgICAgICAgICAgID8gcmVxLmNsb25lKHsgc2V0SGVhZGVyczogeyBbYXV0aEhlYWRlcl06IGAke2F1dGhUb2tlbn0gJHt0b2tlbn1gIH0gfSlcclxuICAgICAgICAgICAgOiByZXE7XHJcbiAgICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKG5ld1JlcSk7XHJcbiAgICB9XHJcblxyXG59IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgUm9uIG9uIDI1LzEyLzIwMTUuXHJcbiAqL1xyXG5pbXBvcnQge1xyXG4gICAgQ29uZmlnU2VydmljZSxcclxuICAgIElQYXJ0aWFsQ29uZmlnT3B0aW9ucyxcclxuICAgIENPTkZJR19PUFRJT05TLFxyXG4gICAgSVByb3ZpZGVycyxcclxuICAgIElPYXV0aDJPcHRpb25zLFxyXG4gICAgSU9hdXRoMU9wdGlvbnMsXHJcbiAgICBDb25maWdPcHRpb25zXHJcbn0gZnJvbSAnLi9jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgT2F1dGhTZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUG9wdXBTZXJ2aWNlIH0gZnJvbSAnLi9wb3B1cC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgT2F1dGgxU2VydmljZSB9IGZyb20gJy4vb2F1dGgxLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBPYXV0aDJTZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aDIuc2VydmljZSc7XHJcbmltcG9ydCB7IExvY2FsU2VydmljZSB9IGZyb20gJy4vbG9jYWwuc2VydmljZSc7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi9hdXRoLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBKd3RJbnRlcmNlcHRvciB9IGZyb20gJy4vaW50ZXJjZXB0b3Iuc2VydmljZSc7XHJcbmltcG9ydCB7IFN0b3JhZ2VTZXJ2aWNlLCBCcm93c2VyU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuL3N0b3JhZ2Uuc2VydmljZSc7XHJcbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEhUVFBfSU5URVJDRVBUT1JTLCBIdHRwQ2xpZW50TW9kdWxlLCBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBTdG9yYWdlVHlwZSB9IGZyb20gJy4vc3RvcmFnZS10eXBlLmVudW0nO1xyXG5cclxuQE5nTW9kdWxlKHsgaW1wb3J0czogW0h0dHBDbGllbnRNb2R1bGVdIH0pXHJcbmV4cG9ydCBjbGFzcyBOZzJVaUF1dGhNb2R1bGUge1xyXG4gICAgc3RhdGljIGZvclJvb3QoY29uZmlnT3B0aW9ucz86IENvbmZpZ09wdGlvbnMsIGRlZmF1bHRKd3RJbnRlcmNlcHRvciA9IHRydWUpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuZ01vZHVsZTogTmcyVWlBdXRoTW9kdWxlLFxyXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICAgICAgICAgIC4uLmNvbmZpZ09wdGlvbnMgPyBbeyBwcm92aWRlOiBDT05GSUdfT1BUSU9OUywgdXNlVmFsdWU6IGNvbmZpZ09wdGlvbnMgfV0gOiBbXSxcclxuICAgICAgICAgICAgICAgIHsgcHJvdmlkZTogQ29uZmlnU2VydmljZSwgdXNlQ2xhc3M6IENvbmZpZ1NlcnZpY2UsIGRlcHM6IFtDT05GSUdfT1BUSU9OU10gfSxcclxuICAgICAgICAgICAgICAgIHsgcHJvdmlkZTogU3RvcmFnZVNlcnZpY2UsIHVzZUNsYXNzOiBCcm93c2VyU3RvcmFnZVNlcnZpY2UsIGRlcHM6IFtDb25maWdTZXJ2aWNlXSB9LFxyXG4gICAgICAgICAgICAgICAgeyBwcm92aWRlOiBTaGFyZWRTZXJ2aWNlLCB1c2VDbGFzczogU2hhcmVkU2VydmljZSwgZGVwczogW1N0b3JhZ2VTZXJ2aWNlLCBDb25maWdTZXJ2aWNlXSB9LFxyXG4gICAgICAgICAgICAgICAgLi4uZGVmYXVsdEp3dEludGVyY2VwdG9yID8gW3sgcHJvdmlkZTogSFRUUF9JTlRFUkNFUFRPUlMsIHVzZUNsYXNzOiBKd3RJbnRlcmNlcHRvciwgbXVsdGk6IHRydWUsIGRlcHM6IFtTaGFyZWRTZXJ2aWNlLCBDb25maWdTZXJ2aWNlXSB9XSA6IFtdLFxyXG4gICAgICAgICAgICAgICAgeyBwcm92aWRlOiBPYXV0aFNlcnZpY2UsIHVzZUNsYXNzOiBPYXV0aFNlcnZpY2UsIGRlcHM6IFtIdHRwQ2xpZW50LCBTaGFyZWRTZXJ2aWNlLCBDb25maWdTZXJ2aWNlLCBQb3B1cFNlcnZpY2VdIH0sXHJcbiAgICAgICAgICAgICAgICB7IHByb3ZpZGU6IFBvcHVwU2VydmljZSwgdXNlQ2xhc3M6IFBvcHVwU2VydmljZSwgZGVwczogW0NvbmZpZ1NlcnZpY2VdIH0sXHJcbiAgICAgICAgICAgICAgICB7IHByb3ZpZGU6IExvY2FsU2VydmljZSwgdXNlQ2xhc3M6IExvY2FsU2VydmljZSwgZGVwczogW0h0dHBDbGllbnQsIFNoYXJlZFNlcnZpY2UsIENvbmZpZ1NlcnZpY2VdIH0sXHJcbiAgICAgICAgICAgICAgICB7IHByb3ZpZGU6IEF1dGhTZXJ2aWNlLCB1c2VDbGFzczogQXV0aFNlcnZpY2UsIGRlcHM6IFtTaGFyZWRTZXJ2aWNlLCBMb2NhbFNlcnZpY2UsIE9hdXRoU2VydmljZV0gfSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge1xyXG4gICAgTG9jYWxTZXJ2aWNlLFxyXG4gICAgT2F1dGgyU2VydmljZSxcclxuICAgIE9hdXRoMVNlcnZpY2UsXHJcbiAgICBQb3B1cFNlcnZpY2UsXHJcbiAgICBPYXV0aFNlcnZpY2UsXHJcbiAgICBTaGFyZWRTZXJ2aWNlLFxyXG4gICAgU3RvcmFnZVNlcnZpY2UsIEJyb3dzZXJTdG9yYWdlU2VydmljZSxcclxuICAgIEF1dGhTZXJ2aWNlLFxyXG4gICAgQ29uZmlnU2VydmljZSwgSVBhcnRpYWxDb25maWdPcHRpb25zLFxyXG4gICAgSnd0SW50ZXJjZXB0b3IsXHJcbiAgICBDT05GSUdfT1BUSU9OUyxcclxuICAgIElQcm92aWRlcnMsXHJcbiAgICBJT2F1dGgyT3B0aW9ucyxcclxuICAgIElPYXV0aDFPcHRpb25zLFxyXG4gICAgU3RvcmFnZVR5cGUsXHJcbn07Il0sIm5hbWVzIjpbIkluamVjdGlvblRva2VuIiwidHNsaWJfMS5fX2Fzc2lnbiIsIkluamVjdGFibGUiLCJJbmplY3QiLCJ0c2xpYl8xLl9fZXh0ZW5kcyIsIk9ic2VydmFibGUiLCJtZXJnZSIsImZyb21FdmVudCIsImRlbGF5IiwibWFwIiwic3dpdGNoTWFwIiwiRU1QVFkiLCJvZiIsInRha2UiLCJpbnRlcnZhbCIsInRocm93RXJyb3IiLCJodHRwIiwiSHR0cENsaWVudCIsInRzbGliXzEuX19zcHJlYWQiLCJJbmplY3RvciIsInRhcCIsIkhUVFBfSU5URVJDRVBUT1JTIiwiTmdNb2R1bGUiLCJIdHRwQ2xpZW50TW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7SUFBQTs7Ozs7Ozs7Ozs7Ozs7SUFjQTtJQUVBLElBQUksYUFBYSxHQUFHLFVBQVMsQ0FBQyxFQUFFLENB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