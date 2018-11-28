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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // ngc (Tsickle) doesn't support typescript 2.4 string enums in libraries yet, using consts as a workarount
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            this.options = ( /** @type {?} */(__assign({}, defaultOptions, optionObj, { providers: __assign({}, optionObj.providers, Object
                    .keys(defaultOptions.providers)
                    .concat(Object.keys(optionObj.providers || {}))
                    .map(function (key) {
                    var _a, _b;
                    return optionObj.providers && optionObj.providers[key]
                        ? (_a = {}, _a[key] = __assign({}, defaultOptions.providers[key], optionObj.providers[key]), _a) : (_b = {}, _b[key] = defaultOptions.providers[key], _b);
                })
                    .reduce(function (acc, next) { return (__assign({}, acc, next)); }, {})) })));
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
         * @private
         * @param {?} storageType
         * @return {?}
         */
        BrowserStorageService.prototype.checkIsStorageAvailable = /**
         * @private
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
         * @private
         * @param {?} storageType
         * @return {?}
         */
        BrowserStorageService.prototype.isWindowStorageAvailable = /**
         * @private
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
         * @private
         * @return {?}
         */
        BrowserStorageService.prototype.isCookieStorageAvailable = /**
         * @private
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
         * @private
         * @param {?} key
         * @param {?} value
         * @param {?=} expires
         * @param {?=} path
         * @return {?}
         */
        BrowserStorageService.prototype.setCookie = /**
         * @private
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
         * @private
         * @param {?} key
         * @param {?=} path
         * @return {?}
         */
        BrowserStorageService.prototype.removeCookie = /**
         * @private
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
         * @private
         * @param {?} key
         * @return {?}
         */
        BrowserStorageService.prototype.getCookie = /**
         * @private
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
         * @private
         * @param {?} str
         * @return {?}
         */
        SharedService.prototype.b64DecodeUnicode = /**
         * @private
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                var redirectUriParser = ( /** @type {?} */(document.createElement('a')));
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
                return __assign({ width: width,
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
                    .map(function (key) {
                    return options[key] === null || options[key] === undefined
                        ? key
                        : key + '=' + options[key];
                }).join(',');
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
                }, ( /** @type {?} */({})));
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
                return !!(window && ((( /** @type {?} */(window))).cordova ||
                    window.navigator && window.navigator.userAgent && window.navigator.userAgent.indexOf('CriOS') > -1));
            };
        PopupService.decorators = [
            { type: core.Injectable }
        ];
        return PopupService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
         * @private
         * @template T
         * @param {?} oauthOptions
         * @param {?} authorizationData
         * @param {?} oauthData
         * @param {?} userData
         * @return {?}
         */
        Oauth1Service.prototype.exchangeForToken = /**
         * @private
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                    if (oauthData.state && oauthData.state !== authorizationData.state) {
                        throw new Error('OAuth "state" mismatch');
                    }
                    return _this.exchangeForToken(oauthOptions, authorizationData, oauthData, userData);
                }));
            };
        /**
         * @private
         * @template T
         * @param {?} options
         * @param {?} authorizationData
         * @param {?} oauthData
         * @param {?} userData
         * @return {?}
         */
        Oauth2Service.prototype.exchangeForToken = /**
         * @private
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
         * @private
         * @param {?} options
         * @return {?}
         */
        Oauth2Service.prototype.getAuthorizationData = /**
         * @private
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
                        var value = (( /** @type {?} */(additionalUrlParams)))[key];
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
                }, ( /** @type {?} */({})));
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLXVpLWF1dGgudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIm5nOi8vbmcyLXVpLWF1dGgvc3RvcmFnZS10eXBlLmVudW0udHMiLCJuZzovL25nMi11aS1hdXRoL2NvbmZpZy5zZXJ2aWNlLnRzIiwibmc6Ly9uZzItdWktYXV0aC9zdG9yYWdlLnNlcnZpY2UudHMiLCJuZzovL25nMi11aS1hdXRoL3NoYXJlZC5zZXJ2aWNlLnRzIiwibmc6Ly9uZzItdWktYXV0aC91dGlscy50cyIsIm5nOi8vbmcyLXVpLWF1dGgvcG9wdXAuc2VydmljZS50cyIsIm5nOi8vbmcyLXVpLWF1dGgvb2F1dGgxLnNlcnZpY2UudHMiLCJuZzovL25nMi11aS1hdXRoL29hdXRoMi5zZXJ2aWNlLnRzIiwibmc6Ly9uZzItdWktYXV0aC9vYXV0aC5zZXJ2aWNlLnRzIiwibmc6Ly9uZzItdWktYXV0aC9sb2NhbC5zZXJ2aWNlLnRzIiwibmc6Ly9uZzItdWktYXV0aC9hdXRoLnNlcnZpY2UudHMiLCJuZzovL25nMi11aS1hdXRoL2ludGVyY2VwdG9yLnNlcnZpY2UudHMiLCJuZzovL25nMi11aS1hdXRoL25nMi11aS1hdXRoLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsIi8vIG5nYyAoVHNpY2tsZSkgZG9lc24ndCBzdXBwb3J0IHR5cGVzY3JpcHQgMi40IHN0cmluZyBlbnVtcyBpbiBsaWJyYXJpZXMgeWV0LCB1c2luZyBjb25zdHMgYXMgYSB3b3JrYXJvdW50XHJcbmV4cG9ydCBjb25zdCBOT05FID0gJ25vbmUnO1xyXG5leHBvcnQgY29uc3QgTUVNT1JZID0gJ21lbW9yeSc7XHJcbmV4cG9ydCBjb25zdCBMT0NBTF9TVE9SQUdFID0gJ2xvY2FsU3RvcmFnZSc7XHJcbmV4cG9ydCBjb25zdCBTRVNTSU9OX1NUT1JBR0UgPSAnc2Vzc2lvblN0b3JhZ2UnO1xyXG5leHBvcnQgY29uc3QgQ09PS0lFID0gJ2Nvb2tpZSc7XHJcbmV4cG9ydCBjb25zdCBTRVNTSU9OX0NPT0tJRSA9ICdzZXNzaW9uQ29va2llJztcclxuXHJcbmV4cG9ydCB0eXBlIFN0b3JhZ2VUeXBlID0gdHlwZW9mIE5PTkUgfCB0eXBlb2YgTUVNT1JZXHJcbiAgICB8IHR5cGVvZiBMT0NBTF9TVE9SQUdFIHwgdHlwZW9mIFNFU1NJT05fU1RPUkFHRVxyXG4gICAgfCB0eXBlb2YgQ09PS0lFIHwgdHlwZW9mIFNFU1NJT05fQ09PS0lFO1xyXG4iLCJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN0b3JhZ2VUeXBlLCBMT0NBTF9TVE9SQUdFIH0gZnJvbSAnLi9zdG9yYWdlLXR5cGUuZW51bSc7XHJcbmltcG9ydCB7IElQYXJ0aWFsQ29uZmlnT3B0aW9ucyB9IGZyb20gJy4vbmcyLXVpLWF1dGgubW9kdWxlJztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFJvbiBvbiAxNy8xMi8yMDE1LlxyXG4gKi9cclxuZXhwb3J0IHR5cGUgQ29uZmlnT3B0aW9ucyA9IElQYXJ0aWFsQ29uZmlnT3B0aW9ucyB8IEZ1bmN0aW9uO1xyXG5cclxuZXhwb3J0IGNvbnN0IENPTkZJR19PUFRJT05TID0gbmV3IEluamVjdGlvblRva2VuPGFueT4oJ2NvbmZpZy5vcHRpb25zJyk7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElQb3B1cE9wdGlvbnMge1xyXG4gICAgd2lkdGg/OiBudW1iZXI7XHJcbiAgICBoZWlnaHQ/OiBudW1iZXI7XHJcbiAgICBsZWZ0PzogbnVtYmVyO1xyXG4gICAgdG9wPzogbnVtYmVyO1xyXG4gICAgdmlzaWJsZVRvb2xiYXI/OiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElPYXV0aDFPcHRpb25zIHtcclxuICAgIHVybD86IHN0cmluZztcclxuICAgIG5hbWU/OiBzdHJpbmc7XHJcbiAgICByZWRpcmVjdFVyaT86IHN0cmluZztcclxuICAgIHBvcHVwT3B0aW9ucz86IElQb3B1cE9wdGlvbnM7XHJcbiAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ/OiBzdHJpbmc7XHJcbiAgICBvYXV0aFR5cGU/OiAnMS4wJztcclxuICAgIG1ldGhvZD86IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJT2F1dGgyT3B0aW9ucyB7XHJcbiAgICB1cmw/OiBzdHJpbmc7XHJcbiAgICBuYW1lPzogc3RyaW5nO1xyXG4gICAgcmVkaXJlY3RVcmk/OiBzdHJpbmc7XHJcbiAgICBwb3B1cE9wdGlvbnM/OiBJUG9wdXBPcHRpb25zO1xyXG4gICAgYXV0aG9yaXphdGlvbkVuZHBvaW50Pzogc3RyaW5nO1xyXG4gICAgb2F1dGhUeXBlPzogJzIuMCc7XHJcbiAgICBtZXRob2Q/OiBzdHJpbmc7XHJcbiAgICByZXNwb25zZVR5cGU/OiBzdHJpbmc7XHJcbiAgICBjbGllbnRJZD86IHN0cmluZztcclxuICAgIGFkZGl0aW9uYWxVcmxQYXJhbXM/OiB7XHJcbiAgICAgICAgW3BhcmFtTmFtZTogc3RyaW5nXTogc3RyaW5nIHwgKCgpID0+IHN0cmluZykgfCBudWxsIHwgdW5kZWZpbmVkO1xyXG4gICAgfTtcclxuICAgIHNjb3BlRGVsaW1pdGVyPzogc3RyaW5nO1xyXG4gICAgc2NvcGU/OiBzdHJpbmdbXTtcclxuICAgIHN0YXRlPzogc3RyaW5nIHwgKCgpID0+IHN0cmluZyk7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVByb3ZpZGVycyB7XHJcbiAgICBbcHJvdmlkZXI6IHN0cmluZ106IElPYXV0aDJPcHRpb25zIHwgSU9hdXRoMU9wdGlvbnM7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUNvbmZpZ09wdGlvbnMge1xyXG4gICAgdG9rZW5Sb290OiBzdHJpbmcgfCBudWxsO1xyXG4gICAgY29yZG92YTogYm9vbGVhbiB8IG51bGw7XHJcbiAgICBiYXNlVXJsOiBzdHJpbmc7XHJcbiAgICBsb2dpblVybDogc3RyaW5nO1xyXG4gICAgc2lnbnVwVXJsOiBzdHJpbmc7XHJcbiAgICB1bmxpbmtVcmw6IHN0cmluZztcclxuICAgIHRva2VuTmFtZTogc3RyaW5nO1xyXG4gICAgdG9rZW5TZXBhcmF0b3I6IHN0cmluZztcclxuICAgIHRva2VuUHJlZml4OiBzdHJpbmc7XHJcbiAgICBhdXRoVG9rZW46IHN0cmluZztcclxuICAgIGF1dGhIZWFkZXI6IHN0cmluZztcclxuICAgIHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZTtcclxuICAgIHByb3ZpZGVyczogSVByb3ZpZGVycztcclxuICAgIHdpdGhDcmVkZW50aWFsczogYm9vbGVhbjtcclxuICAgIHJlc29sdmVUb2tlbjogKHJlc3BvbnNlOiBhbnksIGNvbmZpZzogSUNvbmZpZ09wdGlvbnMpID0+IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUGFydGlhbENvbmZpZ09wdGlvbnMgeyAvLyA9IFBhcnRpYWw8SUNvbmZpZ09wdGlvbnNcclxuICAgIHRva2VuUm9vdD86IHN0cmluZyB8IG51bGw7XHJcbiAgICBjb3Jkb3ZhPzogYm9vbGVhbiB8IG51bGw7XHJcbiAgICBiYXNlVXJsPzogc3RyaW5nO1xyXG4gICAgbG9naW5Vcmw/OiBzdHJpbmc7XHJcbiAgICBzaWdudXBVcmw/OiBzdHJpbmc7XHJcbiAgICB1bmxpbmtVcmw/OiBzdHJpbmc7XHJcbiAgICB0b2tlbk5hbWU/OiBzdHJpbmc7XHJcbiAgICB0b2tlblNlcGFyYXRvcj86IHN0cmluZztcclxuICAgIHRva2VuUHJlZml4Pzogc3RyaW5nO1xyXG4gICAgYXV0aFRva2VuPzogc3RyaW5nO1xyXG4gICAgYXV0aEhlYWRlcj86IHN0cmluZztcclxuICAgIHN0b3JhZ2VUeXBlPzogU3RvcmFnZVR5cGU7XHJcbiAgICBwcm92aWRlcnM/OiBJUHJvdmlkZXJzO1xyXG4gICAgd2l0aENyZWRlbnRpYWxzPzogYm9vbGVhbjtcclxuICAgIHJlc29sdmVUb2tlbj86IChyZXNwb25zZTogYW55LCBjb25maWc6IElDb25maWdPcHRpb25zKSA9PiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBkZWZhdWx0T3B0aW9uczogSUNvbmZpZ09wdGlvbnMgPSB7XHJcbiAgICB3aXRoQ3JlZGVudGlhbHM6IGZhbHNlLFxyXG4gICAgdG9rZW5Sb290OiBudWxsLFxyXG4gICAgYmFzZVVybDogJy8nLFxyXG4gICAgbG9naW5Vcmw6ICcvYXV0aC9sb2dpbicsXHJcbiAgICBzaWdudXBVcmw6ICcvYXV0aC9zaWdudXAnLFxyXG4gICAgdW5saW5rVXJsOiAnL2F1dGgvdW5saW5rLycsXHJcbiAgICB0b2tlbk5hbWU6ICd0b2tlbicsXHJcbiAgICB0b2tlblNlcGFyYXRvcjogJ18nLFxyXG4gICAgdG9rZW5QcmVmaXg6ICduZzItdWktYXV0aCcsXHJcbiAgICBhdXRoSGVhZGVyOiAnQXV0aG9yaXphdGlvbicsXHJcbiAgICBhdXRoVG9rZW46ICdCZWFyZXInLFxyXG4gICAgc3RvcmFnZVR5cGU6IExPQ0FMX1NUT1JBR0UsXHJcbiAgICBjb3Jkb3ZhOiBudWxsLFxyXG4gICAgcmVzb2x2ZVRva2VuOiAocmVzcG9uc2U6IGFueSwgY29uZmlnOiBJQ29uZmlnT3B0aW9ucykgPT4ge1xyXG4gICAgICAgIGNvbnN0IGFjY2Vzc1Rva2VuOiBzdHJpbmcgfCB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9IHwgbnVsbCB8IHVuZGVmaW5lZCA9IHJlc3BvbnNlICYmXHJcbiAgICAgICAgICAgIChyZXNwb25zZS5hY2Nlc3NfdG9rZW4gfHwgcmVzcG9uc2UudG9rZW4gfHwgcmVzcG9uc2UuZGF0YSk7XHJcbiAgICAgICAgaWYgKCFhY2Nlc3NUb2tlbikge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLndhcm4oJ05vIHRva2VuIGZvdW5kJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGFjY2Vzc1Rva2VuID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjZXNzVG9rZW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgYWNjZXNzVG9rZW4gIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUud2FybignTm8gdG9rZW4gZm91bmQnKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHRva2VuUm9vdERhdGEgPSBjb25maWcudG9rZW5Sb290ICYmIGNvbmZpZy50b2tlblJvb3RcclxuICAgICAgICAgICAgLnNwbGl0KCcuJylcclxuICAgICAgICAgICAgLnJlZHVjZShcclxuICAgICAgICAgICAgKG86IGFueSwgeDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb1t4XTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYWNjZXNzVG9rZW4pO1xyXG4gICAgICAgIGNvbnN0IHRva2VuID0gdG9rZW5Sb290RGF0YSA/IHRva2VuUm9vdERhdGFbY29uZmlnLnRva2VuTmFtZV0gOiBhY2Nlc3NUb2tlbltjb25maWcudG9rZW5OYW1lXTtcclxuICAgICAgICBpZiAodG9rZW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zdCB0b2tlblBhdGggPSB0aGlzLnRva2VuUm9vdCA/IHRoaXMudG9rZW5Sb290ICsgJy4nICsgdGhpcy50b2tlbk5hbWUgOiB0aGlzLnRva2VuTmFtZTtcclxuICAgICAgICAvLyBjb25zb2xlLndhcm4oJ0V4cGVjdGluZyBhIHRva2VuIG5hbWVkIFwiJyArIHRva2VuUGF0aCk7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG4gICAgcHJvdmlkZXJzOiB7XHJcbiAgICAgICAgZmFjZWJvb2s6IHtcclxuICAgICAgICAgICAgbmFtZTogJ2ZhY2Vib29rJyxcclxuICAgICAgICAgICAgdXJsOiAnL2F1dGgvZmFjZWJvb2snLFxyXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL3d3dy5mYWNlYm9vay5jb20vdjIuNS9kaWFsb2cvb2F1dGgnLFxyXG4gICAgICAgICAgICBhZGRpdGlvbmFsVXJsUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAncG9wdXAnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzY29wZTogWydlbWFpbCddLFxyXG4gICAgICAgICAgICBzY29wZURlbGltaXRlcjogJywnLFxyXG4gICAgICAgICAgICBvYXV0aFR5cGU6ICcyLjAnLFxyXG4gICAgICAgICAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDU4MCwgaGVpZ2h0OiA0MDAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdvb2dsZToge1xyXG4gICAgICAgICAgICBuYW1lOiAnZ29vZ2xlJyxcclxuICAgICAgICAgICAgdXJsOiAnL2F1dGgvZ29vZ2xlJyxcclxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tL28vb2F1dGgyL2F1dGgnLFxyXG4gICAgICAgICAgICBhZGRpdGlvbmFsVXJsUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAnZGlzcGxheSc6ICdwb3B1cCcsXHJcbiAgICAgICAgICAgICAgICAncHJvbXB0JzogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgJ2xvZ2luX2hpbnQnOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAnYWNjZXNzX3R5cGUnOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAnaW5jbHVkZV9ncmFudGVkX3Njb3Blcyc6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICdvcGVuaWQucmVhbG0nOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAnaGQnOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNjb3BlOiBbJ29wZW5pZCcsICdwcm9maWxlJywgJ2VtYWlsJ10sXHJcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyOiAnICcsXHJcbiAgICAgICAgICAgIG9hdXRoVHlwZTogJzIuMCcsXHJcbiAgICAgICAgICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNDUyLCBoZWlnaHQ6IDYzMyB9LFxyXG4gICAgICAgICAgICBzdGF0ZTogKCkgPT4gZW5jb2RlVVJJQ29tcG9uZW50KE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyKSksXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnaXRodWI6IHtcclxuICAgICAgICAgICAgbmFtZTogJ2dpdGh1YicsXHJcbiAgICAgICAgICAgIHVybDogJy9hdXRoL2dpdGh1YicsXHJcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vZ2l0aHViLmNvbS9sb2dpbi9vYXV0aC9hdXRob3JpemUnLFxyXG4gICAgICAgICAgICBzY29wZTogWyd1c2VyOmVtYWlsJ10sXHJcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyOiAnICcsXHJcbiAgICAgICAgICAgIG9hdXRoVHlwZTogJzIuMCcsXHJcbiAgICAgICAgICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogMTAyMCwgaGVpZ2h0OiA2MTggfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGluc3RhZ3JhbToge1xyXG4gICAgICAgICAgICBuYW1lOiAnaW5zdGFncmFtJyxcclxuICAgICAgICAgICAgdXJsOiAnL2F1dGgvaW5zdGFncmFtJyxcclxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9hcGkuaW5zdGFncmFtLmNvbS9vYXV0aC9hdXRob3JpemUnLFxyXG4gICAgICAgICAgICBzY29wZTogWydiYXNpYyddLFxyXG4gICAgICAgICAgICBzY29wZURlbGltaXRlcjogJysnLFxyXG4gICAgICAgICAgICBvYXV0aFR5cGU6ICcyLjAnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGlua2VkaW46IHtcclxuICAgICAgICAgICAgbmFtZTogJ2xpbmtlZGluJyxcclxuICAgICAgICAgICAgdXJsOiAnL2F1dGgvbGlua2VkaW4nLFxyXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL3d3dy5saW5rZWRpbi5jb20vdWFzL29hdXRoMi9hdXRob3JpemF0aW9uJyxcclxuICAgICAgICAgICAgc2NvcGU6IFsncl9lbWFpbGFkZHJlc3MnXSxcclxuICAgICAgICAgICAgc2NvcGVEZWxpbWl0ZXI6ICcgJyxcclxuICAgICAgICAgICAgb2F1dGhUeXBlOiAnMi4wJyxcclxuICAgICAgICAgICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA1MjcsIGhlaWdodDogNTgyIH0sXHJcbiAgICAgICAgICAgIHN0YXRlOiAnU1RBVEUnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdHdpdHRlcjoge1xyXG4gICAgICAgICAgICBuYW1lOiAndHdpdHRlcicsXHJcbiAgICAgICAgICAgIHVybDogJy9hdXRoL3R3aXR0ZXInLFxyXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2FwaS50d2l0dGVyLmNvbS9vYXV0aC9hdXRoZW50aWNhdGUnLFxyXG4gICAgICAgICAgICBvYXV0aFR5cGU6ICcxLjAnLFxyXG4gICAgICAgICAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDQ5NSwgaGVpZ2h0OiA2NDUgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHR3aXRjaDoge1xyXG4gICAgICAgICAgICBuYW1lOiAndHdpdGNoJyxcclxuICAgICAgICAgICAgdXJsOiAnL2F1dGgvdHdpdGNoJyxcclxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9hcGkudHdpdGNoLnR2L2tyYWtlbi9vYXV0aDIvYXV0aG9yaXplJyxcclxuICAgICAgICAgICAgc2NvcGU6IFsndXNlcl9yZWFkJ10sXHJcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyOiAnICcsXHJcbiAgICAgICAgICAgIGFkZGl0aW9uYWxVcmxQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdwb3B1cCcsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9hdXRoVHlwZTogJzIuMCcsXHJcbiAgICAgICAgICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNTAwLCBoZWlnaHQ6IDU2MCB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGl2ZToge1xyXG4gICAgICAgICAgICBuYW1lOiAnbGl2ZScsXHJcbiAgICAgICAgICAgIHVybDogJy9hdXRoL2xpdmUnLFxyXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2xvZ2luLmxpdmUuY29tL29hdXRoMjBfYXV0aG9yaXplLnNyZicsXHJcbiAgICAgICAgICAgIGFkZGl0aW9uYWxVcmxQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdwb3B1cCcsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNjb3BlOiBbJ3dsLmVtYWlscyddLFxyXG4gICAgICAgICAgICBzY29wZURlbGltaXRlcjogJyAnLFxyXG4gICAgICAgICAgICBvYXV0aFR5cGU6ICcyLjAnLFxyXG4gICAgICAgICAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDUwMCwgaGVpZ2h0OiA1NjAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHlhaG9vOiB7XHJcbiAgICAgICAgICAgIG5hbWU6ICd5YWhvbycsXHJcbiAgICAgICAgICAgIHVybDogJy9hdXRoL3lhaG9vJyxcclxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9hcGkubG9naW4ueWFob28uY29tL29hdXRoMi9yZXF1ZXN0X2F1dGgnLFxyXG4gICAgICAgICAgICBzY29wZTogW10sXHJcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyOiAnLCcsXHJcbiAgICAgICAgICAgIG9hdXRoVHlwZTogJzIuMCcsXHJcbiAgICAgICAgICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNTU5LCBoZWlnaHQ6IDUxOSB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYml0YnVja2V0OiB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdiaXRidWNrZXQnLFxyXG4gICAgICAgICAgICB1cmw6ICcvYXV0aC9iaXRidWNrZXQnLFxyXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2JpdGJ1Y2tldC5vcmcvc2l0ZS9vYXV0aDIvYXV0aG9yaXplJyxcclxuICAgICAgICAgICAgc2NvcGU6IFsnZW1haWwnXSxcclxuICAgICAgICAgICAgc2NvcGVEZWxpbWl0ZXI6ICcsJyxcclxuICAgICAgICAgICAgb2F1dGhUeXBlOiAnMi4wJyxcclxuICAgICAgICAgICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiAxMDI4LCBoZWlnaHQ6IDUyOSB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3BvdGlmeToge1xyXG4gICAgICAgICAgICBuYW1lOiAnc3BvdGlmeScsXHJcbiAgICAgICAgICAgIHVybDogJy9hdXRoL3Nwb3RpZnknLFxyXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2FjY291bnRzLnNwb3RpZnkuY29tL2F1dGhvcml6ZScsXHJcbiAgICAgICAgICAgIHNjb3BlOiBbJycsICd1c2VyLXJlYWQtZW1haWwnXSxcclxuICAgICAgICAgICAgc2NvcGVEZWxpbWl0ZXI6ICcsJyxcclxuICAgICAgICAgICAgb2F1dGhUeXBlOiAnMi4wJyxcclxuICAgICAgICAgICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA1MDAsIGhlaWdodDogNTMwIH0sXHJcbiAgICAgICAgICAgIHN0YXRlOiAoKSA9PiBlbmNvZGVVUklDb21wb25lbnQoTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIpKSxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxufTtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENvbmZpZ1NlcnZpY2Uge1xyXG4gICAgcHVibGljIG9wdGlvbnM6IElDb25maWdPcHRpb25zO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoQ09ORklHX09QVElPTlMpIG9wdGlvbnM6IElQYXJ0aWFsQ29uZmlnT3B0aW9ucyB8IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgbGV0IG9wdGlvbk9iajogSVBhcnRpYWxDb25maWdPcHRpb25zO1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICBvcHRpb25PYmogPSBvcHRpb25zKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb3B0aW9uT2JqID0gb3B0aW9ucztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0ge1xyXG4gICAgICAgICAgICAuLi5kZWZhdWx0T3B0aW9ucyxcclxuICAgICAgICAgICAgLi4ub3B0aW9uT2JqLFxyXG4gICAgICAgICAgICBwcm92aWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIC4uLm9wdGlvbk9iai5wcm92aWRlcnMsXHJcbiAgICAgICAgICAgICAgICAuLi5PYmplY3RcclxuICAgICAgICAgICAgICAgICAgICAua2V5cyhkZWZhdWx0T3B0aW9ucy5wcm92aWRlcnMpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNvbmNhdChPYmplY3Qua2V5cyhvcHRpb25PYmoucHJvdmlkZXJzIHx8IHt9KSlcclxuICAgICAgICAgICAgICAgICAgICAubWFwKChrZXkpID0+IG9wdGlvbk9iai5wcm92aWRlcnMgJiYgb3B0aW9uT2JqLnByb3ZpZGVyc1trZXldXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8geyBba2V5XTogeyAuLi5kZWZhdWx0T3B0aW9ucy5wcm92aWRlcnNba2V5XSwgLi4ub3B0aW9uT2JqLnByb3ZpZGVyc1trZXldIH0gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHsgW2tleV06IGRlZmF1bHRPcHRpb25zLnByb3ZpZGVyc1trZXldIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlZHVjZSgoYWNjLCBuZXh0KSA9PiAoeyAuLi5hY2MsIC4uLm5leHQgfSksIHt9KSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9IGFzIElDb25maWdPcHRpb25zO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4vY29uZmlnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdG9yYWdlVHlwZSwgTUVNT1JZLCBDT09LSUUsIFNFU1NJT05fQ09PS0lFLCBMT0NBTF9TVE9SQUdFLCBTRVNTSU9OX1NUT1JBR0UsIE5PTkUgfSBmcm9tICcuL3N0b3JhZ2UtdHlwZS5lbnVtJztcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTdG9yYWdlU2VydmljZSB7XHJcbiAgICBhYnN0cmFjdCB1cGRhdGVTdG9yYWdlVHlwZShzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGUpOiBib29sZWFuO1xyXG5cclxuICAgIGFic3RyYWN0IGdldChrZXk6IHN0cmluZyk6IHN0cmluZztcclxuXHJcbiAgICBhYnN0cmFjdCBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIGRhdGU6IHN0cmluZyk6IHZvaWQ7XHJcblxyXG4gICAgYWJzdHJhY3QgcmVtb3ZlKGtleTogc3RyaW5nKTogdm9pZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgUm9uIG9uIDE3LzEyLzIwMTUuXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBCcm93c2VyU3RvcmFnZVNlcnZpY2UgZXh0ZW5kcyBTdG9yYWdlU2VydmljZSB7XHJcbiAgICBwcml2YXRlIHN0b3JlOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge307XHJcbiAgICBwcml2YXRlIHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZSA9IE1FTU9SWTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgaWYgKCF0aGlzLnVwZGF0ZVN0b3JhZ2VUeXBlKGNvbmZpZy5vcHRpb25zLnN0b3JhZ2VUeXBlKSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oY29uZmlnLm9wdGlvbnMuc3RvcmFnZVR5cGUgKyAnIGlzIG5vdCBhdmFpbGFibGUuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVTdG9yYWdlVHlwZShzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGUpIHtcclxuICAgICAgICBjb25zdCBpc1N0b3JhZ2VBdmFpbGFibGUgPSB0aGlzLmNoZWNrSXNTdG9yYWdlQXZhaWxhYmxlKHN0b3JhZ2VUeXBlKTtcclxuICAgICAgICBpZiAoIWlzU3RvcmFnZUF2YWlsYWJsZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3RvcmFnZVR5cGUgPSBzdG9yYWdlVHlwZTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0KGtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLnN0b3JhZ2VUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgQ09PS0lFOlxyXG4gICAgICAgICAgICBjYXNlIFNFU1NJT05fQ09PS0lFOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29va2llKGtleSk7XHJcbiAgICAgICAgICAgIGNhc2UgTE9DQUxfU1RPUkFHRTpcclxuICAgICAgICAgICAgY2FzZSBTRVNTSU9OX1NUT1JBR0U6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93W3RoaXMuc3RvcmFnZVR5cGVdLmdldEl0ZW0oa2V5KTtcclxuICAgICAgICAgICAgY2FzZSBNRU1PUlk6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zdG9yZVtrZXldO1xyXG4gICAgICAgICAgICBjYXNlIE5PTkU6XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldChrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZywgZGF0ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLnN0b3JhZ2VUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgQ09PS0lFOlxyXG4gICAgICAgICAgICBjYXNlIFNFU1NJT05fQ09PS0lFOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRDb29raWUoa2V5LCB2YWx1ZSwgdGhpcy5zdG9yYWdlVHlwZSA9PT0gQ09PS0lFID8gZGF0ZSA6ICcnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIExPQ0FMX1NUT1JBR0U6XHJcbiAgICAgICAgICAgIGNhc2UgU0VTU0lPTl9TVE9SQUdFOlxyXG4gICAgICAgICAgICAgICAgd2luZG93W3RoaXMuc3RvcmFnZVR5cGVdLnNldEl0ZW0oa2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBNRU1PUlk6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JlW2tleV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIE5PTkU6XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZShrZXk6IHN0cmluZykge1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5zdG9yYWdlVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIENPT0tJRTpcclxuICAgICAgICAgICAgY2FzZSBTRVNTSU9OX0NPT0tJRTpcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQ29va2llKGtleSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBMT0NBTF9TVE9SQUdFOlxyXG4gICAgICAgICAgICBjYXNlIFNFU1NJT05fU1RPUkFHRTpcclxuICAgICAgICAgICAgICAgIHdpbmRvd1t0aGlzLnN0b3JhZ2VUeXBlXS5yZW1vdmVJdGVtKGtleSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBNRU1PUlk6XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5zdG9yZVtrZXldO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTk9ORTpcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoZWNrSXNTdG9yYWdlQXZhaWxhYmxlKHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZSkge1xyXG4gICAgICAgIHN3aXRjaCAoc3RvcmFnZVR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBDT09LSUU6XHJcbiAgICAgICAgICAgIGNhc2UgU0VTU0lPTl9DT09LSUU6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc0Nvb2tpZVN0b3JhZ2VBdmFpbGFibGUoKTtcclxuICAgICAgICAgICAgY2FzZSBMT0NBTF9TVE9SQUdFOlxyXG4gICAgICAgICAgICBjYXNlIFNFU1NJT05fU1RPUkFHRTpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzV2luZG93U3RvcmFnZUF2YWlsYWJsZShzdG9yYWdlVHlwZSk7XHJcbiAgICAgICAgICAgIGNhc2UgTk9ORTpcclxuICAgICAgICAgICAgY2FzZSBNRU1PUlk6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc1dpbmRvd1N0b3JhZ2VBdmFpbGFibGUoc3RvcmFnZVR5cGU6IHR5cGVvZiBTRVNTSU9OX1NUT1JBR0UgfCB0eXBlb2YgTE9DQUxfU1RPUkFHRSkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN1cHBvcnRlZCA9IHdpbmRvdyAmJiBzdG9yYWdlVHlwZSBpbiB3aW5kb3cgJiYgd2luZG93W3N0b3JhZ2VUeXBlXSAhPT0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIGlmIChzdXBwb3J0ZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZyg3KTtcclxuICAgICAgICAgICAgICAgIHdpbmRvd1tzdG9yYWdlVHlwZV0uc2V0SXRlbShrZXksICcnKTtcclxuICAgICAgICAgICAgICAgIHdpbmRvd1tzdG9yYWdlVHlwZV0ucmVtb3ZlSXRlbShrZXkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc3VwcG9ydGVkO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzQ29va2llU3RvcmFnZUF2YWlsYWJsZSgpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBzdXBwb3J0ZWQgPSBkb2N1bWVudCAmJiAnY29va2llJyBpbiBkb2N1bWVudDtcclxuXHJcbiAgICAgICAgICAgIGlmIChzdXBwb3J0ZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZyg3KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0Q29va2llKGtleSwgJ3Rlc3QnLCBuZXcgRGF0ZShEYXRlLm5vdygpICsgNjAgKiAxMDAwKS50b1VUQ1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXRDb29raWUoa2V5KTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQ29va2llKGtleSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUgPT09ICd0ZXN0JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0Q29va2llKGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBleHBpcmVzID0gJycsIHBhdGggPSAnLycpIHtcclxuICAgICAgICBkb2N1bWVudC5jb29raWUgPSBgJHtrZXl9PSR7dmFsdWV9JHtleHBpcmVzID8gYDsgZXhwaXJlcz0ke2V4cGlyZXN9YCA6ICcnfTsgcGF0aD0ke3BhdGh9YDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbW92ZUNvb2tpZShrZXk6IHN0cmluZywgcGF0aCA9ICcvJykge1xyXG4gICAgICAgIHRoaXMuc2V0Q29va2llKGtleSwgJycsIG5ldyBEYXRlKDApLnRvVVRDU3RyaW5nKCksIHBhdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Q29va2llKGtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNvb2tpZS5yZXBsYWNlKG5ldyBSZWdFeHAoYCg/Oig/Ol58Lio7XFxcXHMqKSR7a2V5fVxcXFxzKlxcXFw9XFxcXHMqKFteO10qKS4qJCl8Xi4qJGApLCAnJDEnKTtcclxuICAgIH1cclxufVxyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBSb24gb24gMTcvMTIvMjAxNS5cclxuICovXHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmliZXIgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9zdG9yYWdlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdG9yYWdlVHlwZSB9IGZyb20gJy4vc3RvcmFnZS10eXBlLmVudW0nO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgUm9uIG9uIDE3LzEyLzIwMTUuXHJcbiAqL1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgU2hhcmVkU2VydmljZSB7XHJcbiAgICBwdWJsaWMgdG9rZW5OYW1lID0gdGhpcy5jb25maWcub3B0aW9ucy50b2tlblByZWZpeFxyXG4gICAgICAgID8gW3RoaXMuY29uZmlnLm9wdGlvbnMudG9rZW5QcmVmaXgsIHRoaXMuY29uZmlnLm9wdGlvbnMudG9rZW5OYW1lXS5qb2luKHRoaXMuY29uZmlnLm9wdGlvbnMudG9rZW5TZXBhcmF0b3IpXHJcbiAgICAgICAgOiB0aGlzLmNvbmZpZy5vcHRpb25zLnRva2VuTmFtZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHN0b3JhZ2U6IFN0b3JhZ2VTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgY29uZmlnOiBDb25maWdTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0VG9rZW4oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5nZXQodGhpcy50b2tlbk5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRQYXlsb2FkKHRva2VuID0gdGhpcy5nZXRUb2tlbigpKSB7XHJcblxyXG4gICAgICAgIGlmICh0b2tlbiAmJiB0b2tlbi5zcGxpdCgnLicpLmxlbmd0aCA9PT0gMykge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYmFzZTY0VXJsID0gdG9rZW4uc3BsaXQoJy4nKVsxXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJhc2U2NCA9IGJhc2U2NFVybC5yZXBsYWNlKC8tL2csICcrJykucmVwbGFjZSgvXy9nLCAnLycpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodGhpcy5iNjREZWNvZGVVbmljb2RlKGJhc2U2NCkpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRUb2tlbihyZXNwb25zZTogc3RyaW5nIHwgb2JqZWN0KSB7XHJcbiAgICAgICAgaWYgKCFyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLndhcm4oJ0NhblxcJ3Qgc2V0IHRva2VuIHdpdGhvdXQgcGFzc2luZyBhIHZhbHVlJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0b2tlbjogc3RyaW5nO1xyXG4gICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHRva2VuID0gcmVzcG9uc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdG9rZW4gPSB0aGlzLmNvbmZpZy5vcHRpb25zLnJlc29sdmVUb2tlbihyZXNwb25zZSwgdGhpcy5jb25maWcub3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodG9rZW4pIHtcclxuICAgICAgICAgICAgY29uc3QgZXhwRGF0ZSA9IHRoaXMuZ2V0RXhwaXJhdGlvbkRhdGUodG9rZW4pO1xyXG4gICAgICAgICAgICB0aGlzLnN0b3JhZ2Uuc2V0KHRoaXMudG9rZW5OYW1lLCB0b2tlbiwgZXhwRGF0ZSA/IGV4cERhdGUudG9VVENTdHJpbmcoKSA6ICcnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZVRva2VuKCkge1xyXG4gICAgICAgIHRoaXMuc3RvcmFnZS5yZW1vdmUodGhpcy50b2tlbk5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc0F1dGhlbnRpY2F0ZWQodG9rZW4gPSB0aGlzLmdldFRva2VuKCkpIHtcclxuXHJcbiAgICAgICAgLy8gYSB0b2tlbiBpcyBwcmVzZW50XHJcbiAgICAgICAgaWYgKHRva2VuKSB7XHJcbiAgICAgICAgICAgIC8vIHRva2VuIHdpdGggYSB2YWxpZCBKV1QgZm9ybWF0IFhYWC5ZWVkuWlpaXHJcbiAgICAgICAgICAgIGlmICh0b2tlbi5zcGxpdCgnLicpLmxlbmd0aCA9PT0gMykge1xyXG4gICAgICAgICAgICAgICAgLy8gY291bGQgYmUgYSB2YWxpZCBKV1Qgb3IgYW4gYWNjZXNzIHRva2VuIHdpdGggdGhlIHNhbWUgZm9ybWF0XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhc2U2NFVybCA9IHRva2VuLnNwbGl0KCcuJylbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFzZTY0ID0gYmFzZTY0VXJsLnJlcGxhY2UoLy0vZywgJysnKS5yZXBsYWNlKC9fL2csICcvJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXhwID0gSlNPTi5wYXJzZSh0aGlzLmI2NERlY29kZVVuaWNvZGUoYmFzZTY0KSkuZXhwO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGp3dCB3aXRoIGFuIG9wdGlvbmFsIGV4cGlyYXRpb24gY2xhaW1zXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV4cCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpc0V4cGlyZWQgPSBNYXRoLnJvdW5kKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMCkgPj0gZXhwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNFeHBpcmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmYWlsOiBFeHBpcmVkIHRva2VuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2UucmVtb3ZlKHRoaXMudG9rZW5OYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBhc3M6IE5vbi1leHBpcmVkIHRva2VuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBwYXNzOiBOb24tSldUIHRva2VuIHRoYXQgbG9va3MgbGlrZSBKV1RcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBwYXNzOiBBbGwgb3RoZXIgdG9rZW5zXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBsYWlsOiBObyB0b2tlbiBhdCBhbGxcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEV4cGlyYXRpb25EYXRlKHRva2VuID0gdGhpcy5nZXRUb2tlbigpKSB7XHJcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IHRoaXMuZ2V0UGF5bG9hZCh0b2tlbik7XHJcbiAgICAgICAgaWYgKHBheWxvYWQgJiYgcGF5bG9hZC5leHAgJiYgTWF0aC5yb3VuZChuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDApIDwgcGF5bG9hZC5leHApIHtcclxuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKDApO1xyXG4gICAgICAgICAgICBkYXRlLnNldFVUQ1NlY29uZHMocGF5bG9hZC5leHApO1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvZ291dCgpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IFN1YnNjcmliZXI8YW55PikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnN0b3JhZ2UucmVtb3ZlKHRoaXMudG9rZW5OYW1lKTtcclxuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCgpO1xyXG4gICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRTdG9yYWdlVHlwZSh0eXBlOiBTdG9yYWdlVHlwZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2UudXBkYXRlU3RvcmFnZVR5cGUodHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBiNjREZWNvZGVVbmljb2RlKHN0cikge1xyXG4gICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoXHJcbiAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5tYXAuY2FsbChhdG9iKHN0ciksXHJcbiAgICAgICAgICAgIGMgPT4gJyUnICsgKCcwMCcgKyBjLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpKS5zbGljZSgtMiksXHJcbiAgICAgICAgKS5qb2luKCcnKSk7XHJcbiAgICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgUm9uIG9uIDE3LzEyLzIwMTUuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGpvaW5VcmwoYmFzZVVybDogc3RyaW5nLCB1cmw6IHN0cmluZykge1xyXG4gICAgaWYgKC9eKD86W2Etel0rOik/XFwvXFwvL2kudGVzdCh1cmwpKSB7XHJcbiAgICAgICAgcmV0dXJuIHVybDtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgam9pbmVkID0gW2Jhc2VVcmwsIHVybF0uam9pbignLycpO1xyXG5cclxuICAgIGxldCBub3JtYWxpemUgPSBmdW5jdGlvbiAoc3RyKSB7XHJcbiAgICAgICAgcmV0dXJuIHN0clxyXG4gICAgICAgICAgICAucmVwbGFjZSgvW1xcL10rL2csICcvJylcclxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcL1xcPy9nLCAnPycpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXC9cXCMvZywgJyMnKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvXFw6XFwvL2csICc6Ly8nKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIG5vcm1hbGl6ZShqb2luZWQpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGVlcE1lcmdlKG9iajE6IG9iamVjdCwgb2JqMjogb2JqZWN0KTogYW55IHtcclxuICAgIGxldCByZXN1bHQgPSB7fTtcclxuICAgIGZvciAobGV0IGkgaW4gb2JqMSkge1xyXG4gICAgICAgIGlmIChvYmoxLmhhc093blByb3BlcnR5KGkpKSB7XHJcbiAgICAgICAgICAgIGlmICgoaSBpbiBvYmoyKSAmJiAodHlwZW9mIG9iajFbaV0gPT09ICdvYmplY3QnKSAmJiAoaSAhPT0gbnVsbCkpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdFtpXSA9IGRlZXBNZXJnZShvYmoxW2ldLCBvYmoyW2ldKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdFtpXSA9IG9iajFbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBpIGluIG9iajIpIHtcclxuICAgICAgICBpZiAob2JqMi5oYXNPd25Qcm9wZXJ0eShpKSkge1xyXG4gICAgICAgICAgICBpZiAoaSBpbiByZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlc3VsdFtpXSA9IG9iajJbaV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjYW1lbENhc2UobmFtZSkge1xyXG4gICAgcmV0dXJuIG5hbWUucmVwbGFjZSgvKFtcXDpcXC1cXF9dKyguKSkvZywgZnVuY3Rpb24oXywgc2VwYXJhdG9yLCBsZXR0ZXIsIG9mZnNldCkge1xyXG4gICAgICAgIHJldHVybiBvZmZzZXQgPyBsZXR0ZXIudG9VcHBlckNhc2UoKSA6IGxldHRlcjtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRRdWVyeVN0cmluZyhvYmo6IG9iamVjdCkge1xyXG4gICAgcmV0dXJuIE9iamVjdFxyXG4gICAgICAgIC5rZXlzKG9iailcclxuICAgICAgICAubWFwKChrZXkpID0+ICEhb2JqW2tleV0gPyBgJHtlbmNvZGVVUklDb21wb25lbnQoa2V5KX09JHtlbmNvZGVVUklDb21wb25lbnQob2JqW2tleV0pfWAgOiBrZXkpXHJcbiAgICAgICAgLmpvaW4oJyYnKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFdpbmRvd09yaWdpbih3ID0gd2luZG93KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGlmICghdyB8fCAhdy5sb2NhdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF3LmxvY2F0aW9uLm9yaWdpbikge1xyXG4gICAgICAgICAgICByZXR1cm4gYCR7dy5sb2NhdGlvbi5wcm90b2NvbH0vLyR7dy5sb2NhdGlvbi5ob3N0bmFtZX0ke3cubG9jYXRpb24ucG9ydCA/ICc6JyArIHcubG9jYXRpb24ucG9ydCA6ICcnfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB3LmxvY2F0aW9uLm9yaWdpbjtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgLy8gaWdub3JlIERPTUV4Y2VwdGlvbjogQmxvY2tlZCBhIGZyYW1lIHdpdGggb3JpZ2luIGZyb20gYWNjZXNzaW5nIGEgY3Jvc3Mtb3JpZ2luIGZyYW1lLlxyXG4gICAgICAgIC8vIGVycm9yIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uICYmIGVycm9yLm5hbWUgPT09ICdTZWN1cml0eUVycm9yJ1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RnVsbFVybFBhdGgobG9jYXRpb246IEhUTUxBbmNob3JFbGVtZW50fExvY2F0aW9uKTogc3RyaW5nIHtcclxuICAgIGlmICghbG9jYXRpb24ucHJvdG9jb2wpIHtcclxuICAgICAgICBsZXQgdGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHJcbiAgICAgICAgdGVtcC5ocmVmID0gbG9jYXRpb24uaHJlZjtcclxuXHJcbiAgICAgICAgbG9jYXRpb24gPSB0ZW1wO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBsb2NhdGlvbi5wcm90b2NvbCArICcvLycgKyBsb2NhdGlvbi5ob3N0bmFtZVxyXG4gICAgICAgICsgKGxvY2F0aW9uLnBvcnQgJiYgbG9jYXRpb24ucG9ydCAhPT0gJzgwJyAmJiBsb2NhdGlvbi5wb3J0ICE9PSAnNDQzJyA/IGxvY2F0aW9uLnBvcnQgOiAnJykgLy8gQXBwZW5kIHRoZSBwb3J0IG9ubHkgd2hlbiBpdCdzIG5vdCB0aGUgZGVmYXVsdCBQb3J0XHJcbiAgICAgICAgKyAoL15cXC8vLnRlc3QobG9jYXRpb24ucGF0aG5hbWUpID8gbG9jYXRpb24ucGF0aG5hbWUgOiAnLycgKyBsb2NhdGlvbi5wYXRobmFtZSk7XHJcbn0iLCJpbXBvcnQgeyBnZXRXaW5kb3dPcmlnaW4sIGdldEZ1bGxVcmxQYXRoIH0gZnJvbSAnLi91dGlscyc7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRU1QVFksIGZyb21FdmVudCwgaW50ZXJ2YWwsIG1lcmdlLCBPYnNlcnZhYmxlLCBvZiwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBJUG9wdXBPcHRpb25zLCBJT2F1dGgyT3B0aW9ucywgSU9hdXRoMU9wdGlvbnMgfSBmcm9tICcuL2NvbmZpZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgc3dpdGNoTWFwLCB0YWtlLCBtYXAsIGRlbGF5IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgUm9uIG9uIDE3LzEyLzIwMTUuXHJcbiAqL1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgUG9wdXBTZXJ2aWNlIHtcclxuICAgIHB1YmxpYyBvcGVuKHVybDogc3RyaW5nLCBvcHRpb25zOiBJT2F1dGgyT3B0aW9ucyB8IElPYXV0aDFPcHRpb25zLCBjb3Jkb3ZhOiBib29sZWFuIHwgbnVsbCkge1xyXG4gICAgICAgIGNvbnN0IHN0cmluZ2lmaWVkT3B0aW9ucyA9IHRoaXMuc3RyaW5naWZ5T3B0aW9ucyh0aGlzLnByZXBhcmVPcHRpb25zKG9wdGlvbnMucG9wdXBPcHRpb25zKSk7XHJcbiAgICAgICAgY29uc3QgVUEgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudDtcclxuICAgICAgICBjb3Jkb3ZhID0gY29yZG92YSA9PT0gbnVsbCA/IHRoaXMuaXNDb3Jkb3ZhQXBwKCkgOiBjb3Jkb3ZhO1xyXG4gICAgICAgIGNvbnN0IHdpbmRvd05hbWUgPSBjb3Jkb3ZhID8gJ19ibGFuaycgOiBvcHRpb25zLm5hbWU7XHJcblxyXG4gICAgICAgIGNvbnN0IHBvcHVwV2luZG93ID0gd2luZG93Lm9wZW4odXJsLCB3aW5kb3dOYW1lLCBzdHJpbmdpZmllZE9wdGlvbnMpO1xyXG5cclxuICAgICAgICBpZiAocG9wdXBXaW5kb3cgJiYgcG9wdXBXaW5kb3cuZm9jdXMpIHtcclxuICAgICAgICAgICAgcG9wdXBXaW5kb3cuZm9jdXMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb3Jkb3ZhXHJcbiAgICAgICAgICAgID8gdGhpcy5ldmVudExpc3RlbmVyKHBvcHVwV2luZG93LCBvcHRpb25zLnJlZGlyZWN0VXJpIHx8IGdldFdpbmRvd09yaWdpbigpKVxyXG4gICAgICAgICAgICA6IHRoaXMucG9sbFBvcHVwKHBvcHVwV2luZG93LCBvcHRpb25zLnJlZGlyZWN0VXJpIHx8IGdldFdpbmRvd09yaWdpbigpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZXZlbnRMaXN0ZW5lcihwb3B1cFdpbmRvdzogV2luZG93LCByZWRpcmVjdFVyaTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKCFwb3B1cFdpbmRvdykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BvcHVwIHdhcyBub3QgY3JlYXRlZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWVyZ2UoXHJcbiAgICAgICAgICAgIGZyb21FdmVudDxFdmVudD4ocG9wdXBXaW5kb3csICdleGl0JykucGlwZShcclxuICAgICAgICAgICAgICAgIGRlbGF5KDEwMCksXHJcbiAgICAgICAgICAgICAgICBtYXAoKCkgPT4geyB0aHJvdyBuZXcgRXJyb3IoJ0F1dGhlbnRpY2F0aW9uIENhbmNlbGVkJyk7IH0pLFxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBmcm9tRXZlbnQocG9wdXBXaW5kb3csICdsb2Fkc3RhcnQnKSxcclxuICAgICAgICApLnBpcGUoXHJcbiAgICAgICAgICAgIHN3aXRjaE1hcCgoZXZlbnQ6IEV2ZW50ICYgeyB1cmw6IHN0cmluZyB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXBvcHVwV2luZG93IHx8IHBvcHVwV2luZG93LmNsb3NlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLnRocm93KG5ldyBFcnJvcignQXV0aGVudGljYXRpb24gQ2FuY2VsZWQnKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQudXJsLmluZGV4T2YocmVkaXJlY3RVcmkpICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEVNUFRZO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHBhcnNlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgICAgICAgICAgICAgIHBhcnNlci5ocmVmID0gZXZlbnQudXJsO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChwYXJzZXIuc2VhcmNoIHx8IHBhcnNlci5oYXNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcXVlcnlQYXJhbXMgPSBwYXJzZXIuc2VhcmNoLnN1YnN0cmluZygxKS5yZXBsYWNlKC9cXC8kLywgJycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhc2hQYXJhbXMgPSBwYXJzZXIuaGFzaC5zdWJzdHJpbmcoMSkucmVwbGFjZSgvXFwvJC8sICcnKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBoYXNoID0gdGhpcy5wYXJzZVF1ZXJ5U3RyaW5nKGhhc2hQYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHFzID0gdGhpcy5wYXJzZVF1ZXJ5U3RyaW5nKHF1ZXJ5UGFyYW1zKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhbGxQYXJhbXMgPSB7IC4uLnFzLCAuLi5oYXNoIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHBvcHVwV2luZG93LmNsb3NlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhbGxQYXJhbXMuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgYWxsUGFyYW1zLmVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvZihhbGxQYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBFTVBUWTtcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIHRha2UoMSksXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwb2xsUG9wdXAocG9wdXBXaW5kb3c6IFdpbmRvdywgcmVkaXJlY3RVcmk6IHN0cmluZykge1xyXG4gICAgICAgIGxldCByZWRpcmVjdFVyaVBhcnNlcjogSFRNTEFuY2hvckVsZW1lbnQgPSA8SFRNTEFuY2hvckVsZW1lbnQ+ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgICAgIHJlZGlyZWN0VXJpUGFyc2VyLmhyZWYgPSByZWRpcmVjdFVyaTtcclxuXHJcbiAgICAgICAgbGV0IHJlZGlyZWN0VXJpUGF0aCA9IGdldEZ1bGxVcmxQYXRoKHJlZGlyZWN0VXJpUGFyc2VyKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGludGVydmFsKDUwKVxyXG4gICAgICAgICAgICAucGlwZShcclxuICAgICAgICAgICAgc3dpdGNoTWFwKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghcG9wdXBXaW5kb3cgfHwgcG9wdXBXaW5kb3cuY2xvc2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IobmV3IEVycm9yKCdBdXRoZW50aWNhdGlvbiBDYW5jZWxlZCcpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgcG9wdXBXaW5kb3dQYXRoID0gJyc7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvcHVwV2luZG93UGF0aCAgPSBnZXRGdWxsVXJsUGF0aChwb3B1cFdpbmRvdy5sb2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlnbm9yZSBET01FeGNlcHRpb246IEJsb2NrZWQgYSBmcmFtZSB3aXRoIG9yaWdpbiBmcm9tIGFjY2Vzc2luZyBhIGNyb3NzLW9yaWdpbiBmcmFtZS5cclxuICAgICAgICAgICAgICAgICAgICAvLyBlcnJvciBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJiBlcnJvci5uYW1lID09PSAnU2VjdXJpdHlFcnJvcidcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChyZWRpcmVjdFVyaVBhdGggPT09IHBvcHVwV2luZG93UGF0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3B1cFdpbmRvdy5sb2NhdGlvbi5zZWFyY2ggfHwgcG9wdXBXaW5kb3cubG9jYXRpb24uaGFzaCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBxdWVyeVBhcmFtcyA9IHBvcHVwV2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHJpbmcoMSkucmVwbGFjZSgvXFwvJC8sICcnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFzaFBhcmFtcyA9IHBvcHVwV2luZG93LmxvY2F0aW9uLmhhc2guc3Vic3RyaW5nKDEpLnJlcGxhY2UoL1tcXC8kXS8sICcnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFzaCA9IHRoaXMucGFyc2VRdWVyeVN0cmluZyhoYXNoUGFyYW1zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcXMgPSB0aGlzLnBhcnNlUXVlcnlTdHJpbmcocXVlcnlQYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3B1cFdpbmRvdy5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhbGxQYXJhbXMgPSB7IC4uLnFzLCAuLi5oYXNoIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhbGxQYXJhbXMuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGFsbFBhcmFtcy5lcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvZihhbGxQYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IobmV3IEVycm9yKCdObyB0b2tlbiBmb3VuZCBhZnRlciByZWRpcmVjdCcpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gRU1QVFk7XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICB0YWtlKDEpLFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwcmVwYXJlT3B0aW9ucyhvcHRpb25zPzogSVBvcHVwT3B0aW9ucykge1xyXG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgICAgIGNvbnN0IHdpZHRoID0gb3B0aW9ucy53aWR0aCB8fCA1MDA7XHJcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQgfHwgNTAwO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHdpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHQsXHJcbiAgICAgICAgICAgIGxlZnQ6IHdpbmRvdy5zY3JlZW5YICsgKCh3aW5kb3cub3V0ZXJXaWR0aCAtIHdpZHRoKSAvIDIpLFxyXG4gICAgICAgICAgICB0b3A6IHdpbmRvdy5zY3JlZW5ZICsgKCh3aW5kb3cub3V0ZXJIZWlnaHQgLSBoZWlnaHQpIC8gMi41KSxcclxuICAgICAgICAgICAgdG9vbGJhcjogb3B0aW9ucy52aXNpYmxlVG9vbGJhciA/ICd5ZXMnIDogJ25vJyxcclxuICAgICAgICAgICAgLi4ub3B0aW9ucyxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RyaW5naWZ5T3B0aW9ucyhvcHRpb25zOiB7IFtpbmRleDogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbiB8IG51bGwgfCB1bmRlZmluZWQgfSkge1xyXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhvcHRpb25zKVxyXG4gICAgICAgICAgICAubWFwKChrZXkpID0+IG9wdGlvbnNba2V5XSA9PT0gbnVsbCB8fCBvcHRpb25zW2tleV0gPT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgPyBrZXlcclxuICAgICAgICAgICAgICAgIDoga2V5ICsgJz0nICsgb3B0aW9uc1trZXldLFxyXG4gICAgICAgICkuam9pbignLCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcGFyc2VRdWVyeVN0cmluZyhqb2luZWRLZXlWYWx1ZTogc3RyaW5nKTogYW55IHtcclxuICAgICAgICBsZXQga2V5O1xyXG4gICAgICAgIGxldCB2YWx1ZTtcclxuICAgICAgICByZXR1cm4gam9pbmVkS2V5VmFsdWUuc3BsaXQoJyYnKS5yZWR1Y2UoXHJcbiAgICAgICAgICAgIChvYmosIGtleVZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGtleVZhbHVlLnNwbGl0KCc9Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5ID0gZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICBvYmpba2V5XSA9IHR5cGVvZiB2YWx1ZVsxXSAhPT0gJ3VuZGVmaW5lZCcgPyBkZWNvZGVVUklDb21wb25lbnQodmFsdWVbMV0pIDogdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHt9IGFzIHsgW2s6IHN0cmluZ106IHN0cmluZyB8IHRydWUgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc0NvcmRvdmFBcHAoKSB7XHJcbiAgICAgICAgcmV0dXJuICEhKHdpbmRvdyAmJiAoXHJcbiAgICAgICAgICAgICh3aW5kb3cgYXMgYW55KS5jb3Jkb3ZhIHx8XHJcbiAgICAgICAgICAgIHdpbmRvdy5uYXZpZ2F0b3IgJiYgd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQgJiYgd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignQ3JpT1MnKSA+IC0xXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSU9hdXRoU2VydmljZSB9IGZyb20gJy4vb2F1dGgtc2VydmljZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFBvcHVwU2VydmljZSB9IGZyb20gJy4vcG9wdXAuc2VydmljZSc7XHJcbmltcG9ydCB7IGpvaW5VcmwsIGJ1aWxkUXVlcnlTdHJpbmcgfSBmcm9tICcuL3V0aWxzJztcclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSwgSU9hdXRoMU9wdGlvbnMgfSBmcm9tICcuL2NvbmZpZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcblxyXG4vKipcclxuICogQ3JlYXRlZCBieSBSb24gb24gMTcvMTIvMjAxNS5cclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE9hdXRoMVNlcnZpY2UgaW1wbGVtZW50cyBJT2F1dGhTZXJ2aWNlIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgICAgICAgcHJpdmF0ZSBwb3B1cDogUG9wdXBTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgY29uZmlnOiBDb25maWdTZXJ2aWNlLFxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBvcGVuPFQgZXh0ZW5kcyBvYmplY3QgfCBzdHJpbmcgPSBhbnk+KG9hdXRoT3B0aW9uczogSU9hdXRoMU9wdGlvbnMsIHVzZXJEYXRhOiBvYmplY3QpOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgICAgICBjb25zdCBzZXJ2ZXJVcmwgPSB0aGlzLmNvbmZpZy5vcHRpb25zLmJhc2VVcmxcclxuICAgICAgICAgICAgPyBqb2luVXJsKHRoaXMuY29uZmlnLm9wdGlvbnMuYmFzZVVybCwgb2F1dGhPcHRpb25zLnVybClcclxuICAgICAgICAgICAgOiBvYXV0aE9wdGlvbnMudXJsO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8b2JqZWN0PihzZXJ2ZXJVcmwsIG9hdXRoT3B0aW9ucykucGlwZShcclxuICAgICAgICAgICAgc3dpdGNoTWFwKChhdXRob3JpemF0aW9uRGF0YSkgPT4gdGhpcy5wb3B1cC5vcGVuKFxyXG4gICAgICAgICAgICAgICAgW29hdXRoT3B0aW9ucy5hdXRob3JpemF0aW9uRW5kcG9pbnQsIGJ1aWxkUXVlcnlTdHJpbmcoYXV0aG9yaXphdGlvbkRhdGEpXS5qb2luKCc/JyksXHJcbiAgICAgICAgICAgICAgICBvYXV0aE9wdGlvbnMsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5vcHRpb25zLmNvcmRvdmEsXHJcbiAgICAgICAgICAgICksIChhdXRob3JpemF0aW9uRGF0YSwgb2F1dGhEYXRhKSA9PiAoeyBhdXRob3JpemF0aW9uRGF0YSwgb2F1dGhEYXRhIH0pKSxcclxuICAgICAgICAgICAgc3dpdGNoTWFwKCh7IGF1dGhvcml6YXRpb25EYXRhLCBvYXV0aERhdGEgfSkgPT4gdGhpcy5leGNoYW5nZUZvclRva2VuPFQ+KG9hdXRoT3B0aW9ucywgYXV0aG9yaXphdGlvbkRhdGEsIG9hdXRoRGF0YSwgdXNlckRhdGEpKSxcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZXhjaGFuZ2VGb3JUb2tlbjxUPihvYXV0aE9wdGlvbnM6IElPYXV0aDFPcHRpb25zLCBhdXRob3JpemF0aW9uRGF0YTogb2JqZWN0LCBvYXV0aERhdGE6IG9iamVjdCwgdXNlckRhdGE6IG9iamVjdCkge1xyXG4gICAgICAgIGNvbnN0IGJvZHkgPSB7IGF1dGhvcml6YXRpb25EYXRhLCBvYXV0aERhdGEsIHVzZXJEYXRhIH07XHJcbiAgICAgICAgY29uc3QgeyB3aXRoQ3JlZGVudGlhbHMsIGJhc2VVcmwgfSA9IHRoaXMuY29uZmlnLm9wdGlvbnM7XHJcbiAgICAgICAgY29uc3QgeyBtZXRob2QgPSAnUE9TVCcsIHVybCB9ID0gb2F1dGhPcHRpb25zO1xyXG4gICAgICAgIGNvbnN0IGV4Y2hhbmdlRm9yVG9rZW5VcmwgPSBiYXNlVXJsID8gam9pblVybChiYXNlVXJsLCB1cmwpIDogdXJsO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdDxUPihtZXRob2QsIGV4Y2hhbmdlRm9yVG9rZW5VcmwsIHsgYm9keSwgd2l0aENyZWRlbnRpYWxzIH0pXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSU9hdXRoU2VydmljZSB9IGZyb20gJy4vb2F1dGgtc2VydmljZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGpvaW5VcmwsIGJ1aWxkUXVlcnlTdHJpbmcsIGdldFdpbmRvd09yaWdpbiB9IGZyb20gJy4vdXRpbHMnO1xyXG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlLCBJT2F1dGgyT3B0aW9ucyB9IGZyb20gJy4vY29uZmlnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBQb3B1cFNlcnZpY2UgfSBmcm9tICcuL3BvcHVwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG4vKipcclxuICogQ3JlYXRlZCBieSBSb24gb24gMTcvMTIvMjAxNS5cclxuICovXHJcblxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgT2F1dGgyU2VydmljZSBpbXBsZW1lbnRzIElPYXV0aFNlcnZpY2Uge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgICAgICBwcml2YXRlIHBvcHVwOiBQb3B1cFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UpIHtcclxuICAgIH1cclxuXHJcbiAgICBvcGVuPFQgZXh0ZW5kcyBvYmplY3QgfCBzdHJpbmcgPSBhbnk+KG9hdXRoT3B0aW9uczogSU9hdXRoMk9wdGlvbnMsIHVzZXJEYXRhOiBvYmplY3QpOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgICAgICBjb25zdCBhdXRob3JpemF0aW9uRGF0YSA9IHRoaXMuZ2V0QXV0aG9yaXphdGlvbkRhdGEob2F1dGhPcHRpb25zKTtcclxuICAgICAgICBjb25zdCB1cmwgPSBbb2F1dGhPcHRpb25zLmF1dGhvcml6YXRpb25FbmRwb2ludCwgYnVpbGRRdWVyeVN0cmluZyhhdXRob3JpemF0aW9uRGF0YSldLmpvaW4oJz8nKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5wb3B1cC5vcGVuKHVybCwgb2F1dGhPcHRpb25zLCB0aGlzLmNvbmZpZy5vcHRpb25zLmNvcmRvdmEpLnBpcGUoXHJcbiAgICAgICAgICAgIHN3aXRjaE1hcCgob2F1dGhEYXRhOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIHdoZW4gbm8gc2VydmVyIFVSTCBwcm92aWRlZCwgcmV0dXJuIHBvcHVwIHBhcmFtcyBhcy1pcy5cclxuICAgICAgICAgICAgICAgIC8vIHRoaXMgaXMgZm9yIGEgc2NlbmFyaW8gd2hlbiBzb21lb25lIHdpc2hlcyB0byBvcHQgb3V0IGZyb21cclxuICAgICAgICAgICAgICAgIC8vIHNhdGVsbGl6ZXIncyBtYWdpYyBieSBkb2luZyBhdXRob3JpemF0aW9uIGNvZGUgZXhjaGFuZ2UgYW5kXHJcbiAgICAgICAgICAgICAgICAvLyBzYXZpbmcgYSB0b2tlbiBtYW51YWxseS5cclxuICAgICAgICAgICAgICAgIGlmIChvYXV0aE9wdGlvbnMucmVzcG9uc2VUeXBlID09PSAndG9rZW4nIHx8ICFvYXV0aE9wdGlvbnMudXJsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKG9hdXRoRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG9hdXRoRGF0YS5zdGF0ZSAmJiBvYXV0aERhdGEuc3RhdGUgIT09IGF1dGhvcml6YXRpb25EYXRhLnN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdPQXV0aCBcInN0YXRlXCIgbWlzbWF0Y2gnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmV4Y2hhbmdlRm9yVG9rZW48VD4ob2F1dGhPcHRpb25zLCBhdXRob3JpemF0aW9uRGF0YSwgb2F1dGhEYXRhLCB1c2VyRGF0YSk7XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBleGNoYW5nZUZvclRva2VuPFQ+KG9wdGlvbnM6IElPYXV0aDJPcHRpb25zLCBhdXRob3JpemF0aW9uRGF0YTogb2JqZWN0LCBvYXV0aERhdGE6IG9iamVjdCwgdXNlckRhdGE6IG9iamVjdCkge1xyXG4gICAgICAgIGNvbnN0IGJvZHkgPSB7IGF1dGhvcml6YXRpb25EYXRhLCBvYXV0aERhdGEsIHVzZXJEYXRhIH07XHJcbiAgICAgICAgY29uc3QgeyBiYXNlVXJsLCB3aXRoQ3JlZGVudGlhbHMgfSA9IHRoaXMuY29uZmlnLm9wdGlvbnM7XHJcbiAgICAgICAgY29uc3QgeyB1cmwsIG1ldGhvZCA9ICdQT1NUJyB9ID0gb3B0aW9ucztcclxuICAgICAgICBjb25zdCBleGNoYW5nZUZvclRva2VuVXJsID0gYmFzZVVybCA/IGpvaW5VcmwoYmFzZVVybCwgdXJsKSA6IHVybDtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnJlcXVlc3Q8VD4obWV0aG9kLCBleGNoYW5nZUZvclRva2VuVXJsLCB7IGJvZHksIHdpdGhDcmVkZW50aWFscyB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEF1dGhvcml6YXRpb25EYXRhKG9wdGlvbnM6IElPYXV0aDJPcHRpb25zKSB7XHJcbiAgICAgICAgY29uc3Qge1xyXG4gICAgICAgICAgICByZXNwb25zZVR5cGUgPSAnY29kZScsXHJcbiAgICAgICAgICAgIGNsaWVudElkLFxyXG4gICAgICAgICAgICByZWRpcmVjdFVyaSA9IGdldFdpbmRvd09yaWdpbigpIHx8ICcnLFxyXG4gICAgICAgICAgICBzY29wZURlbGltaXRlciA9ICcsJyxcclxuICAgICAgICAgICAgc2NvcGUsXHJcbiAgICAgICAgICAgIHN0YXRlLFxyXG4gICAgICAgICAgICBhZGRpdGlvbmFsVXJsUGFyYW1zLFxyXG4gICAgICAgIH0gPSBvcHRpb25zO1xyXG4gICAgICAgIGNvbnN0IHJlc29sdmVkU3RhdGUgPSB0eXBlb2Ygc3RhdGUgPT09ICdmdW5jdGlvbicgPyBzdGF0ZSgpIDogc3RhdGU7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgWydyZXNwb25zZV90eXBlJywgcmVzcG9uc2VUeXBlXSxcclxuICAgICAgICAgICAgWydjbGllbnRfaWQnLCBjbGllbnRJZF0sXHJcbiAgICAgICAgICAgIFsncmVkaXJlY3RfdXJpJywgcmVkaXJlY3RVcmldLFxyXG4gICAgICAgICAgICAuLi5zdGF0ZSA/IFtbJ3N0YXRlJywgcmVzb2x2ZWRTdGF0ZV1dIDogW10sXHJcbiAgICAgICAgICAgIC4uLnNjb3BlID8gW1snc2NvcGUnLCBzY29wZS5qb2luKHNjb3BlRGVsaW1pdGVyKV1dIDogW10sXHJcbiAgICAgICAgICAgIC4uLmFkZGl0aW9uYWxVcmxQYXJhbXNcclxuICAgICAgICAgICAgICAgID8gT2JqZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgLmtleXMoYWRkaXRpb25hbFVybFBhcmFtcylcclxuICAgICAgICAgICAgICAgICAgICAubWFwKChrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWU6IHN0cmluZyB8ICgoKSA9PiBzdHJpbmcpIHwgbnVsbCB8IHVuZGVmaW5lZCA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoYWRkaXRpb25hbFVybFBhcmFtcyBhcyBhbnkpW2tleV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW2tleSwgdmFsdWVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtrZXksIHZhbHVlKCldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW2tleSwgJyddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbJycsICcnXTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgOiBbXSxcclxuICAgICAgICBdLmZpbHRlcigoXykgPT4gISFfWzBdKS5yZWR1Y2UoKGFjYywgbmV4dCkgPT4gKHsgLi4uYWNjLCBbbmV4dFswXV06IG5leHRbMV0gfSksIHt9IGFzIHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0pO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IElPYXV0aFNlcnZpY2UgfSBmcm9tICcuL29hdXRoLXNlcnZpY2UuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgUG9wdXBTZXJ2aWNlIH0gZnJvbSAnLi9wb3B1cC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2F1dGgxU2VydmljZSB9IGZyb20gJy4vb2F1dGgxLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBPYXV0aDJTZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aDIuc2VydmljZSc7XHJcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgam9pblVybCB9IGZyb20gJy4vdXRpbHMnO1xyXG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgUm9uIG9uIDE3LzEyLzIwMTUuXHJcbiAqL1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgT2F1dGhTZXJ2aWNlIHtcclxuICAgIHJlYWRvbmx5IGRlcFByb3ZpZGVycyA9IFtcclxuICAgICAgICB7IHByb3ZpZGU6IEh0dHBDbGllbnQsIHVzZVZhbHVlOiB0aGlzLmh0dHAgfSxcclxuICAgICAgICB7IHByb3ZpZGU6IFBvcHVwU2VydmljZSwgdXNlVmFsdWU6IHRoaXMucG9wdXAgfSxcclxuICAgICAgICB7IHByb3ZpZGU6IENvbmZpZ1NlcnZpY2UsIHVzZVZhbHVlOiB0aGlzLmNvbmZpZyB9LFxyXG4gICAgXTtcclxuICAgIHJlYWRvbmx5IGRlcHMgPSBbSHR0cENsaWVudCwgUG9wdXBTZXJ2aWNlLCBDb25maWdTZXJ2aWNlXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgICAgICAgcHJpdmF0ZSBzaGFyZWQ6IFNoYXJlZFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBwb3B1cDogUG9wdXBTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgYXV0aGVudGljYXRlPFQgZXh0ZW5kcyBvYmplY3QgfCBzdHJpbmc+KG5hbWU6IHN0cmluZywgdXNlckRhdGE/OiBhbnkpOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgICAgICBjb25zdCBwcm92aWRlcjogSU9hdXRoU2VydmljZSA9IHRoaXMuY29uZmlnLm9wdGlvbnMucHJvdmlkZXJzW25hbWVdLm9hdXRoVHlwZSA9PT0gJzEuMCdcclxuICAgICAgICAgICAgPyBJbmplY3Rvci5jcmVhdGUoW1xyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5kZXBQcm92aWRlcnMsXHJcbiAgICAgICAgICAgICAgICB7IHByb3ZpZGU6IE9hdXRoMVNlcnZpY2UsIGRlcHM6IHRoaXMuZGVwcyB9LFxyXG4gICAgICAgICAgICBdKS5nZXQoT2F1dGgxU2VydmljZSlcclxuICAgICAgICAgICAgOiBJbmplY3Rvci5jcmVhdGUoW1xyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5kZXBQcm92aWRlcnMsXHJcbiAgICAgICAgICAgICAgICB7IHByb3ZpZGU6IE9hdXRoMlNlcnZpY2UsIGRlcHM6IHRoaXMuZGVwcyB9LFxyXG4gICAgICAgICAgICBdKS5nZXQoT2F1dGgyU2VydmljZSk7XHJcblxyXG4gICAgICAgIHJldHVybiBwcm92aWRlci5vcGVuPFQ+KHRoaXMuY29uZmlnLm9wdGlvbnMucHJvdmlkZXJzW25hbWVdLCB1c2VyRGF0YSB8fCB7fSlcclxuICAgICAgICAgICAgLnBpcGUodGFwKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcyBpcyBmb3IgYSBzY2VuYXJpbyB3aGVuIHNvbWVvbmUgd2lzaGVzIHRvIG9wdCBvdXQgZnJvbVxyXG4gICAgICAgICAgICAgICAgLy8gc2F0ZWxsaXplcidzIG1hZ2ljIGJ5IGRvaW5nIGF1dGhvcml6YXRpb24gY29kZSBleGNoYW5nZSBhbmRcclxuICAgICAgICAgICAgICAgIC8vIHNhdmluZyBhIHRva2VuIG1hbnVhbGx5LlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnLm9wdGlvbnMucHJvdmlkZXJzW25hbWVdLnVybCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hhcmVkLnNldFRva2VuKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1bmxpbms8VD4oXHJcbiAgICAgICAgcHJvdmlkZXI6IHN0cmluZyxcclxuICAgICAgICB1cmwgPSBqb2luVXJsKHRoaXMuY29uZmlnLm9wdGlvbnMuYmFzZVVybCwgdGhpcy5jb25maWcub3B0aW9ucy51bmxpbmtVcmwpLFxyXG4gICAgICAgIG1ldGhvZCA9ICdQT1NUJykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdDxUPihtZXRob2QsIHVybCwgeyBib2R5OiB7IHByb3ZpZGVyIH0gfSk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTaGFyZWRTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQuc2VydmljZSc7XHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2NvbmZpZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgam9pblVybCB9IGZyb20gJy4vdXRpbHMnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFJvbiBvbiAxNy8xMi8yMDE1LlxyXG4gKi9cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIExvY2FsU2VydmljZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgICAgICAgcHJpdmF0ZSBzaGFyZWQ6IFNoYXJlZFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UpIHsgfVxyXG5cclxuICAgIHB1YmxpYyBsb2dpbjxUIGV4dGVuZHMgc3RyaW5nIHwgb2JqZWN0Pih1c2VyOiBzdHJpbmcgfCBvYmplY3QsIHVybD86IHN0cmluZyk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxUPih1cmwgfHwgam9pblVybCh0aGlzLmNvbmZpZy5vcHRpb25zLmJhc2VVcmwsIHRoaXMuY29uZmlnLm9wdGlvbnMubG9naW5VcmwpLCB1c2VyKVxyXG4gICAgICAgICAgICAucGlwZSh0YXAoKGRhdGEpID0+IHRoaXMuc2hhcmVkLnNldFRva2VuKGRhdGEpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNpZ251cDxUID0gYW55Pih1c2VyOiBzdHJpbmcgfCBvYmplY3QsIHVybD86IHN0cmluZyk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxUPih1cmwgfHwgam9pblVybCh0aGlzLmNvbmZpZy5vcHRpb25zLmJhc2VVcmwsIHRoaXMuY29uZmlnLm9wdGlvbnMuc2lnbnVwVXJsKSwgdXNlcik7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTaGFyZWRTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQuc2VydmljZSc7XHJcbmltcG9ydCB7IExvY2FsU2VydmljZSB9IGZyb20gJy4vbG9jYWwuc2VydmljZSc7XHJcbmltcG9ydCB7IE9hdXRoU2VydmljZSB9IGZyb20gJy4vb2F1dGguc2VydmljZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgU3RvcmFnZVR5cGUgfSBmcm9tICcuL3N0b3JhZ2UtdHlwZS5lbnVtJztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFJvbiBvbiAxNy8xMi8yMDE1LlxyXG4gKi9cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEF1dGhTZXJ2aWNlIHtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc2hhcmVkOiBTaGFyZWRTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgbG9jYWw6IExvY2FsU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIG9hdXRoOiBPYXV0aFNlcnZpY2UpIHtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9naW48VCBleHRlbmRzIHN0cmluZyB8IG9iamVjdCA9IGFueT4odXNlcjogc3RyaW5nIHwgb2JqZWN0LCB1cmw/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbC5sb2dpbjxUPih1c2VyLCB1cmwpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaWdudXA8VCA9IGFueT4odXNlcjogc3RyaW5nIHwgb2JqZWN0LCB1cmw/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbC5zaWdudXA8VD4odXNlciwgdXJsKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9nb3V0KCk6IE9ic2VydmFibGU8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNoYXJlZC5sb2dvdXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXV0aGVudGljYXRlPFQgZXh0ZW5kcyBvYmplY3QgfCBzdHJpbmc+KG5hbWU6IHN0cmluZywgdXNlckRhdGE/OiBhbnkpOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5vYXV0aC5hdXRoZW50aWNhdGU8VD4obmFtZSwgdXNlckRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsaW5rPFQgZXh0ZW5kcyBvYmplY3QgfCBzdHJpbmc+KG5hbWU6IHN0cmluZywgdXNlckRhdGE/OiBhbnkpOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5vYXV0aC5hdXRoZW50aWNhdGU8VD4obmFtZSwgdXNlckRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1bmxpbms8VCA9IGFueT4ocHJvdmlkZXI6IHN0cmluZywgdXJsPzogc3RyaW5nKTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub2F1dGgudW5saW5rPFQ+KHByb3ZpZGVyLCB1cmwpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc0F1dGhlbnRpY2F0ZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hhcmVkLmlzQXV0aGVudGljYXRlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRUb2tlbigpOiBzdHJpbmcgfCBudWxsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zaGFyZWQuZ2V0VG9rZW4oKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0VG9rZW4odG9rZW46IHN0cmluZyB8IG9iamVjdCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2hhcmVkLnNldFRva2VuKHRva2VuKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlVG9rZW4oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zaGFyZWQucmVtb3ZlVG9rZW4oKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0UGF5bG9hZCgpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNoYXJlZC5nZXRQYXlsb2FkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFN0b3JhZ2VUeXBlKHR5cGU6IFN0b3JhZ2VUeXBlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hhcmVkLnNldFN0b3JhZ2VUeXBlKHR5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRFeHBpcmF0aW9uRGF0ZSgpOiBEYXRlIHwgbnVsbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hhcmVkLmdldEV4cGlyYXRpb25EYXRlKCk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4vY29uZmlnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTaGFyZWRTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQuc2VydmljZSc7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cEV2ZW50LCBIdHRwSW50ZXJjZXB0b3IsIEh0dHBIYW5kbGVyLCBIdHRwUmVxdWVzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSnd0SW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBzaGFyZWQ6IFNoYXJlZFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UsXHJcbiAgICApIHsgfVxyXG5cclxuICAgIGludGVyY2VwdChyZXE6IEh0dHBSZXF1ZXN0PGFueT4sIG5leHQ6IEh0dHBIYW5kbGVyKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xyXG4gICAgICAgIGNvbnN0IHsgYXV0aEhlYWRlciwgYXV0aFRva2VuIH0gPSB0aGlzLmNvbmZpZy5vcHRpb25zO1xyXG4gICAgICAgIGNvbnN0IHRva2VuID0gdGhpcy5zaGFyZWQuZ2V0VG9rZW4oKTtcclxuICAgICAgICBjb25zdCBpc0F1dGhlbnRpY2F0ZWQgPSB0aGlzLnNoYXJlZC5pc0F1dGhlbnRpY2F0ZWQ7XHJcbiAgICAgICAgY29uc3QgbmV3UmVxID0gaXNBdXRoZW50aWNhdGVkICYmICFyZXEuaGVhZGVycy5oYXMoYXV0aEhlYWRlcilcclxuICAgICAgICAgICAgPyByZXEuY2xvbmUoeyBzZXRIZWFkZXJzOiB7IFthdXRoSGVhZGVyXTogYCR7YXV0aFRva2VufSAke3Rva2VufWAgfSB9KVxyXG4gICAgICAgICAgICA6IHJlcTtcclxuICAgICAgICByZXR1cm4gbmV4dC5oYW5kbGUobmV3UmVxKTtcclxuICAgIH1cclxuXHJcbn0iLCIvKipcclxuICogQ3JlYXRlZCBieSBSb24gb24gMjUvMTIvMjAxNS5cclxuICovXHJcbmltcG9ydCB7XHJcbiAgICBDb25maWdTZXJ2aWNlLFxyXG4gICAgSVBhcnRpYWxDb25maWdPcHRpb25zLFxyXG4gICAgQ09ORklHX09QVElPTlMsXHJcbiAgICBJUHJvdmlkZXJzLFxyXG4gICAgSU9hdXRoMk9wdGlvbnMsXHJcbiAgICBJT2F1dGgxT3B0aW9ucyxcclxuICAgIENvbmZpZ09wdGlvbnNcclxufSBmcm9tICcuL2NvbmZpZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU2hhcmVkU2VydmljZSB9IGZyb20gJy4vc2hhcmVkLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBPYXV0aFNlcnZpY2UgfSBmcm9tICcuL29hdXRoLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBQb3B1cFNlcnZpY2UgfSBmcm9tICcuL3BvcHVwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBPYXV0aDFTZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aDEuc2VydmljZSc7XHJcbmltcG9ydCB7IE9hdXRoMlNlcnZpY2UgfSBmcm9tICcuL29hdXRoMi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTG9jYWxTZXJ2aWNlIH0gZnJvbSAnLi9sb2NhbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuL2F1dGguc2VydmljZSc7XHJcbmltcG9ydCB7IEp3dEludGVyY2VwdG9yIH0gZnJvbSAnLi9pbnRlcmNlcHRvci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3RvcmFnZVNlcnZpY2UsIEJyb3dzZXJTdG9yYWdlU2VydmljZSB9IGZyb20gJy4vc3RvcmFnZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSFRUUF9JTlRFUkNFUFRPUlMsIEh0dHBDbGllbnRNb2R1bGUsIEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IFN0b3JhZ2VUeXBlIH0gZnJvbSAnLi9zdG9yYWdlLXR5cGUuZW51bSc7XHJcblxyXG5ATmdNb2R1bGUoeyBpbXBvcnRzOiBbSHR0cENsaWVudE1vZHVsZV0gfSlcclxuZXhwb3J0IGNsYXNzIE5nMlVpQXV0aE1vZHVsZSB7XHJcbiAgICBzdGF0aWMgZm9yUm9vdChjb25maWdPcHRpb25zPzogQ29uZmlnT3B0aW9ucywgZGVmYXVsdEp3dEludGVyY2VwdG9yID0gdHJ1ZSk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5nTW9kdWxlOiBOZzJVaUF1dGhNb2R1bGUsXHJcbiAgICAgICAgICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgICAgICAgICAgLi4uY29uZmlnT3B0aW9ucyA/IFt7IHByb3ZpZGU6IENPTkZJR19PUFRJT05TLCB1c2VWYWx1ZTogY29uZmlnT3B0aW9ucyB9XSA6IFtdLFxyXG4gICAgICAgICAgICAgICAgeyBwcm92aWRlOiBDb25maWdTZXJ2aWNlLCB1c2VDbGFzczogQ29uZmlnU2VydmljZSwgZGVwczogW0NPTkZJR19PUFRJT05TXSB9LFxyXG4gICAgICAgICAgICAgICAgeyBwcm92aWRlOiBTdG9yYWdlU2VydmljZSwgdXNlQ2xhc3M6IEJyb3dzZXJTdG9yYWdlU2VydmljZSwgZGVwczogW0NvbmZpZ1NlcnZpY2VdIH0sXHJcbiAgICAgICAgICAgICAgICB7IHByb3ZpZGU6IFNoYXJlZFNlcnZpY2UsIHVzZUNsYXNzOiBTaGFyZWRTZXJ2aWNlLCBkZXBzOiBbU3RvcmFnZVNlcnZpY2UsIENvbmZpZ1NlcnZpY2VdIH0sXHJcbiAgICAgICAgICAgICAgICAuLi5kZWZhdWx0Snd0SW50ZXJjZXB0b3IgPyBbeyBwcm92aWRlOiBIVFRQX0lOVEVSQ0VQVE9SUywgdXNlQ2xhc3M6IEp3dEludGVyY2VwdG9yLCBtdWx0aTogdHJ1ZSwgZGVwczogW1NoYXJlZFNlcnZpY2UsIENvbmZpZ1NlcnZpY2VdIH1dIDogW10sXHJcbiAgICAgICAgICAgICAgICB7IHByb3ZpZGU6IE9hdXRoU2VydmljZSwgdXNlQ2xhc3M6IE9hdXRoU2VydmljZSwgZGVwczogW0h0dHBDbGllbnQsIFNoYXJlZFNlcnZpY2UsIENvbmZpZ1NlcnZpY2UsIFBvcHVwU2VydmljZV0gfSxcclxuICAgICAgICAgICAgICAgIHsgcHJvdmlkZTogUG9wdXBTZXJ2aWNlLCB1c2VDbGFzczogUG9wdXBTZXJ2aWNlLCBkZXBzOiBbQ29uZmlnU2VydmljZV0gfSxcclxuICAgICAgICAgICAgICAgIHsgcHJvdmlkZTogTG9jYWxTZXJ2aWNlLCB1c2VDbGFzczogTG9jYWxTZXJ2aWNlLCBkZXBzOiBbSHR0cENsaWVudCwgU2hhcmVkU2VydmljZSwgQ29uZmlnU2VydmljZV0gfSxcclxuICAgICAgICAgICAgICAgIHsgcHJvdmlkZTogQXV0aFNlcnZpY2UsIHVzZUNsYXNzOiBBdXRoU2VydmljZSwgZGVwczogW1NoYXJlZFNlcnZpY2UsIExvY2FsU2VydmljZSwgT2F1dGhTZXJ2aWNlXSB9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBMb2NhbFNlcnZpY2UsXHJcbiAgICBPYXV0aDJTZXJ2aWNlLFxyXG4gICAgT2F1dGgxU2VydmljZSxcclxuICAgIFBvcHVwU2VydmljZSxcclxuICAgIE9hdXRoU2VydmljZSxcclxuICAgIFNoYXJlZFNlcnZpY2UsXHJcbiAgICBTdG9yYWdlU2VydmljZSwgQnJvd3NlclN0b3JhZ2VTZXJ2aWNlLFxyXG4gICAgQXV0aFNlcnZpY2UsXHJcbiAgICBDb25maWdTZXJ2aWNlLCBJUGFydGlhbENvbmZpZ09wdGlvbnMsXHJcbiAgICBKd3RJbnRlcmNlcHRvcixcclxuICAgIENPTkZJR19PUFRJT05TLFxyXG4gICAgSVByb3ZpZGVycyxcclxuICAgIElPYXV0aDJPcHRpb25zLFxyXG4gICAgSU9hdXRoMU9wdGlvbnMsXHJcbiAgICBTdG9yYWdlVHlwZSxcclxufTsiXSwibmFtZXMiOlsiSW5qZWN0aW9uVG9rZW4iLCJJbmplY3RhYmxlIiwiSW5qZWN0IiwidHNsaWJfMS5fX2V4dGVuZHMiLCJPYnNlcnZhYmxlIiwibWVyZ2UiLCJmcm9tRXZlbnQiLCJkZWxheSIsIm1hcCIsInN3aXRjaE1hcCIsIkVNUFRZIiwib2YiLCJ0YWtlIiwiaW50ZXJ2YWwiLCJ0aHJvd0Vycm9yIiwiaHR0cCIsIkh0dHBDbGllbnQiLCJ0c2xpYl8xLl9fc3ByZWFkIiwiSW5qZWN0b3IiLCJ0YXAiLCJIVFRQX0lOVEVSQ0VQVE9SUyIsIk5nTW9kdWxlIiwiSHR0cENsaWVudE1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBQUE7Ozs7Ozs7Ozs7Ozs7O0lBY0E7SUFFQSxJQUFJLGFBQWEsR0FBRyxVQUFTLENBQUMsRUFBRSxDQUFDO1FBQzdCLGFBQWEsR0FB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