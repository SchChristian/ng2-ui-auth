/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { LOCAL_STORAGE } from './storage-type.enum';
/** @type {?} */
export var CONFIG_OPTIONS = new InjectionToken('config.options');
/**
 * @record
 */
export function IPopupOptions() { }
if (false) {
    /** @type {?|undefined} */
    IPopupOptions.prototype.width;
    /** @type {?|undefined} */
    IPopupOptions.prototype.height;
    /** @type {?|undefined} */
    IPopupOptions.prototype.left;
    /** @type {?|undefined} */
    IPopupOptions.prototype.top;
    /** @type {?|undefined} */
    IPopupOptions.prototype.visibleToolbar;
}
/**
 * @record
 */
export function IOauth1Options() { }
if (false) {
    /** @type {?|undefined} */
    IOauth1Options.prototype.url;
    /** @type {?|undefined} */
    IOauth1Options.prototype.name;
    /** @type {?|undefined} */
    IOauth1Options.prototype.redirectUri;
    /** @type {?|undefined} */
    IOauth1Options.prototype.popupOptions;
    /** @type {?|undefined} */
    IOauth1Options.prototype.authorizationEndpoint;
    /** @type {?|undefined} */
    IOauth1Options.prototype.oauthType;
    /** @type {?|undefined} */
    IOauth1Options.prototype.method;
}
/**
 * @record
 */
export function IOauth2Options() { }
if (false) {
    /** @type {?|undefined} */
    IOauth2Options.prototype.url;
    /** @type {?|undefined} */
    IOauth2Options.prototype.name;
    /** @type {?|undefined} */
    IOauth2Options.prototype.redirectUri;
    /** @type {?|undefined} */
    IOauth2Options.prototype.popupOptions;
    /** @type {?|undefined} */
    IOauth2Options.prototype.authorizationEndpoint;
    /** @type {?|undefined} */
    IOauth2Options.prototype.oauthType;
    /** @type {?|undefined} */
    IOauth2Options.prototype.method;
    /** @type {?|undefined} */
    IOauth2Options.prototype.responseType;
    /** @type {?|undefined} */
    IOauth2Options.prototype.clientId;
    /** @type {?|undefined} */
    IOauth2Options.prototype.additionalUrlParams;
    /** @type {?|undefined} */
    IOauth2Options.prototype.scopeDelimiter;
    /** @type {?|undefined} */
    IOauth2Options.prototype.scope;
    /** @type {?|undefined} */
    IOauth2Options.prototype.state;
}
/**
 * @record
 */
export function IProviders() { }
/**
 * @record
 */
export function IConfigOptions() { }
if (false) {
    /** @type {?} */
    IConfigOptions.prototype.tokenRoot;
    /** @type {?} */
    IConfigOptions.prototype.cordova;
    /** @type {?} */
    IConfigOptions.prototype.baseUrl;
    /** @type {?} */
    IConfigOptions.prototype.loginUrl;
    /** @type {?} */
    IConfigOptions.prototype.signupUrl;
    /** @type {?} */
    IConfigOptions.prototype.unlinkUrl;
    /** @type {?} */
    IConfigOptions.prototype.tokenName;
    /** @type {?} */
    IConfigOptions.prototype.tokenSeparator;
    /** @type {?} */
    IConfigOptions.prototype.tokenPrefix;
    /** @type {?} */
    IConfigOptions.prototype.authToken;
    /** @type {?} */
    IConfigOptions.prototype.authHeader;
    /** @type {?} */
    IConfigOptions.prototype.storageType;
    /** @type {?} */
    IConfigOptions.prototype.providers;
    /** @type {?} */
    IConfigOptions.prototype.withCredentials;
    /** @type {?} */
    IConfigOptions.prototype.resolveToken;
}
/**
 * @record
 */
export function IPartialConfigOptions() { }
if (false) {
    /** @type {?|undefined} */
    IPartialConfigOptions.prototype.tokenRoot;
    /** @type {?|undefined} */
    IPartialConfigOptions.prototype.cordova;
    /** @type {?|undefined} */
    IPartialConfigOptions.prototype.baseUrl;
    /** @type {?|undefined} */
    IPartialConfigOptions.prototype.loginUrl;
    /** @type {?|undefined} */
    IPartialConfigOptions.prototype.signupUrl;
    /** @type {?|undefined} */
    IPartialConfigOptions.prototype.unlinkUrl;
    /** @type {?|undefined} */
    IPartialConfigOptions.prototype.tokenName;
    /** @type {?|undefined} */
    IPartialConfigOptions.prototype.tokenSeparator;
    /** @type {?|undefined} */
    IPartialConfigOptions.prototype.tokenPrefix;
    /** @type {?|undefined} */
    IPartialConfigOptions.prototype.authToken;
    /** @type {?|undefined} */
    IPartialConfigOptions.prototype.authHeader;
    /** @type {?|undefined} */
    IPartialConfigOptions.prototype.storageType;
    /** @type {?|undefined} */
    IPartialConfigOptions.prototype.providers;
    /** @type {?|undefined} */
    IPartialConfigOptions.prototype.withCredentials;
    /** @type {?|undefined} */
    IPartialConfigOptions.prototype.resolveToken;
}
/** @type {?} */
export var defaultOptions = {
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
        this.options = (/** @type {?} */ (tslib_1.__assign({}, defaultOptions, optionObj, { providers: tslib_1.__assign({}, optionObj.providers, Object
                .keys(defaultOptions.providers)
                .concat(Object.keys(optionObj.providers || {}))
                .map(function (key) {
                var _a, _b;
                return optionObj.providers && optionObj.providers[key]
                    ? (_a = {}, _a[key] = tslib_1.__assign({}, defaultOptions.providers[key], optionObj.providers[key]), _a) : (_b = {}, _b[key] = defaultOptions.providers[key], _b);
            })
                .reduce(function (acc, next) { return (tslib_1.__assign({}, acc, next)); }, {})) })));
    }
    ConfigService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ConfigService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [CONFIG_OPTIONS,] }] }
    ]; };
    return ConfigService;
}());
export { ConfigService };
if (false) {
    /** @type {?} */
    ConfigService.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItdWktYXV0aC8iLCJzb3VyY2VzIjpbImNvbmZpZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25FLE9BQU8sRUFBZSxhQUFhLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7QUFRakUsTUFBTSxLQUFPLGNBQWMsR0FBRyxJQUFJLGNBQWMsQ0FBTSxnQkFBZ0IsQ0FBQzs7OztBQUV2RSxtQ0FNQzs7O0lBTEcsOEJBQWU7O0lBQ2YsK0JBQWdCOztJQUNoQiw2QkFBYzs7SUFDZCw0QkFBYTs7SUFDYix1Q0FBeUI7Ozs7O0FBRzdCLG9DQVFDOzs7SUFQRyw2QkFBYTs7SUFDYiw4QkFBYzs7SUFDZCxxQ0FBcUI7O0lBQ3JCLHNDQUE2Qjs7SUFDN0IsK0NBQStCOztJQUMvQixtQ0FBa0I7O0lBQ2xCLGdDQUFnQjs7Ozs7QUFHcEIsb0NBZ0JDOzs7SUFmRyw2QkFBYTs7SUFDYiw4QkFBYzs7SUFDZCxxQ0FBcUI7O0lBQ3JCLHNDQUE2Qjs7SUFDN0IsK0NBQStCOztJQUMvQixtQ0FBa0I7O0lBQ2xCLGdDQUFnQjs7SUFDaEIsc0NBQXNCOztJQUN0QixrQ0FBa0I7O0lBQ2xCLDZDQUVFOztJQUNGLHdDQUF3Qjs7SUFDeEIsK0JBQWlCOztJQUNqQiwrQkFBZ0M7Ozs7O0FBR3BDLGdDQUVDOzs7O0FBRUQsb0NBZ0JDOzs7SUFmRyxtQ0FBeUI7O0lBQ3pCLGlDQUF3Qjs7SUFDeEIsaUNBQWdCOztJQUNoQixrQ0FBaUI7O0lBQ2pCLG1DQUFrQjs7SUFDbEIsbUNBQWtCOztJQUNsQixtQ0FBa0I7O0lBQ2xCLHdDQUF1Qjs7SUFDdkIscUNBQW9COztJQUNwQixtQ0FBa0I7O0lBQ2xCLG9DQUFtQjs7SUFDbkIscUNBQXlCOztJQUN6QixtQ0FBc0I7O0lBQ3RCLHlDQUF5Qjs7SUFDekIsc0NBQWdFOzs7OztBQUdwRSwyQ0FnQkM7OztJQWZHLDBDQUEwQjs7SUFDMUIsd0NBQXlCOztJQUN6Qix3Q0FBaUI7O0lBQ2pCLHlDQUFrQjs7SUFDbEIsMENBQW1COztJQUNuQiwwQ0FBbUI7O0lBQ25CLDBDQUFtQjs7SUFDbkIsK0NBQXdCOztJQUN4Qiw0Q0FBcUI7O0lBQ3JCLDBDQUFtQjs7SUFDbkIsMkNBQW9COztJQUNwQiw0Q0FBMEI7O0lBQzFCLDBDQUF1Qjs7SUFDdkIsZ0RBQTBCOztJQUMxQiw2Q0FBaUU7OztBQUdyRSxNQUFNLEtBQU8sY0FBYyxHQUFtQjtJQUMxQyxlQUFlLEVBQUUsS0FBSztJQUN0QixTQUFTLEVBQUUsSUFBSTtJQUNmLE9BQU8sRUFBRSxHQUFHO0lBQ1osUUFBUSxFQUFFLGFBQWE7SUFDdkIsU0FBUyxFQUFFLGNBQWM7SUFDekIsU0FBUyxFQUFFLGVBQWU7SUFDMUIsU0FBUyxFQUFFLE9BQU87SUFDbEIsY0FBYyxFQUFFLEdBQUc7SUFDbkIsV0FBVyxFQUFFLGFBQWE7SUFDMUIsVUFBVSxFQUFFLGVBQWU7SUFDM0IsU0FBUyxFQUFFLFFBQVE7SUFDbkIsV0FBVyxFQUFFLGFBQWE7SUFDMUIsT0FBTyxFQUFFLElBQUk7SUFDYixZQUFZLEVBQUUsVUFBQyxRQUFhLEVBQUUsTUFBc0I7O1lBQzFDLFdBQVcsR0FBMEQsUUFBUTtZQUMvRSxDQUFDLFFBQVEsQ0FBQyxZQUFZLElBQUksUUFBUSxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQzlELElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDZCxrQ0FBa0M7WUFDbEMsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELElBQUksT0FBTyxXQUFXLEtBQUssUUFBUSxFQUFFO1lBQ2pDLE9BQU8sV0FBVyxDQUFDO1NBQ3RCO1FBQ0QsSUFBSSxPQUFPLFdBQVcsS0FBSyxRQUFRLEVBQUU7WUFDakMsa0NBQWtDO1lBQ2xDLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7O1lBQ0ssYUFBYSxHQUFHLE1BQU0sQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDLFNBQVM7YUFDckQsS0FBSyxDQUFDLEdBQUcsQ0FBQzthQUNWLE1BQU0sQ0FDUCxVQUFDLENBQU0sRUFBRSxDQUFNO1lBQ1gsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEIsQ0FBQyxFQUNELFdBQVcsQ0FBQzs7WUFDVixLQUFLLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUM3RixJQUFJLEtBQUssRUFBRTtZQUNQLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBQ0QsNkZBQTZGO1FBQzdGLHlEQUF5RDtRQUN6RCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0QsU0FBUyxFQUFFO1FBQ1AsUUFBUSxFQUFFO1lBQ04sSUFBSSxFQUFFLFVBQVU7WUFDaEIsR0FBRyxFQUFFLGdCQUFnQjtZQUNyQixxQkFBcUIsRUFBRSw0Q0FBNEM7WUFDbkUsbUJBQW1CLEVBQUU7Z0JBQ2pCLE9BQU8sRUFBRSxPQUFPO2FBQ25CO1lBQ0QsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDO1lBQ2hCLGNBQWMsRUFBRSxHQUFHO1lBQ25CLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFlBQVksRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtTQUM1QztRQUNELE1BQU0sRUFBRTtZQUNKLElBQUksRUFBRSxRQUFRO1lBQ2QsR0FBRyxFQUFFLGNBQWM7WUFDbkIscUJBQXFCLEVBQUUsMkNBQTJDO1lBQ2xFLG1CQUFtQixFQUFFO2dCQUNqQixTQUFTLEVBQUUsT0FBTztnQkFDbEIsUUFBUSxFQUFFLFNBQVM7Z0JBQ25CLFlBQVksRUFBRSxTQUFTO2dCQUN2QixhQUFhLEVBQUUsU0FBUztnQkFDeEIsd0JBQXdCLEVBQUUsU0FBUztnQkFDbkMsY0FBYyxFQUFFLFNBQVM7Z0JBQ3pCLElBQUksRUFBRSxTQUFTO2FBQ2xCO1lBQ0QsS0FBSyxFQUFFLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUM7WUFDckMsY0FBYyxFQUFFLEdBQUc7WUFDbkIsU0FBUyxFQUFFLEtBQUs7WUFDaEIsWUFBWSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFO1lBQ3pDLEtBQUssRUFBRSxjQUFNLE9BQUEsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBeEQsQ0FBd0Q7U0FDeEU7UUFDRCxNQUFNLEVBQUU7WUFDSixJQUFJLEVBQUUsUUFBUTtZQUNkLEdBQUcsRUFBRSxjQUFjO1lBQ25CLHFCQUFxQixFQUFFLDBDQUEwQztZQUNqRSxLQUFLLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDckIsY0FBYyxFQUFFLEdBQUc7WUFDbkIsU0FBUyxFQUFFLEtBQUs7WUFDaEIsWUFBWSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFO1NBQzdDO1FBQ0QsU0FBUyxFQUFFO1lBQ1AsSUFBSSxFQUFFLFdBQVc7WUFDakIsR0FBRyxFQUFFLGlCQUFpQjtZQUN0QixxQkFBcUIsRUFBRSwyQ0FBMkM7WUFDbEUsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDO1lBQ2hCLGNBQWMsRUFBRSxHQUFHO1lBQ25CLFNBQVMsRUFBRSxLQUFLO1NBQ25CO1FBQ0QsUUFBUSxFQUFFO1lBQ04sSUFBSSxFQUFFLFVBQVU7WUFDaEIsR0FBRyxFQUFFLGdCQUFnQjtZQUNyQixxQkFBcUIsRUFBRSxtREFBbUQ7WUFDMUUsS0FBSyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7WUFDekIsY0FBYyxFQUFFLEdBQUc7WUFDbkIsU0FBUyxFQUFFLEtBQUs7WUFDaEIsWUFBWSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFO1lBQ3pDLEtBQUssRUFBRSxPQUFPO1NBQ2pCO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsSUFBSSxFQUFFLFNBQVM7WUFDZixHQUFHLEVBQUUsZUFBZTtZQUNwQixxQkFBcUIsRUFBRSw0Q0FBNEM7WUFDbkUsU0FBUyxFQUFFLEtBQUs7WUFDaEIsWUFBWSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFO1NBQzVDO1FBQ0QsTUFBTSxFQUFFO1lBQ0osSUFBSSxFQUFFLFFBQVE7WUFDZCxHQUFHLEVBQUUsY0FBYztZQUNuQixxQkFBcUIsRUFBRSwrQ0FBK0M7WUFDdEUsS0FBSyxFQUFFLENBQUMsV0FBVyxDQUFDO1lBQ3BCLGNBQWMsRUFBRSxHQUFHO1lBQ25CLG1CQUFtQixFQUFFO2dCQUNqQixPQUFPLEVBQUUsT0FBTzthQUNuQjtZQUNELFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFlBQVksRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtTQUM1QztRQUNELElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxNQUFNO1lBQ1osR0FBRyxFQUFFLFlBQVk7WUFDakIscUJBQXFCLEVBQUUsOENBQThDO1lBQ3JFLG1CQUFtQixFQUFFO2dCQUNqQixPQUFPLEVBQUUsT0FBTzthQUNuQjtZQUNELEtBQUssRUFBRSxDQUFDLFdBQVcsQ0FBQztZQUNwQixjQUFjLEVBQUUsR0FBRztZQUNuQixTQUFTLEVBQUUsS0FBSztZQUNoQixZQUFZLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUU7U0FDNUM7UUFDRCxLQUFLLEVBQUU7WUFDSCxJQUFJLEVBQUUsT0FBTztZQUNiLEdBQUcsRUFBRSxhQUFhO1lBQ2xCLHFCQUFxQixFQUFFLGlEQUFpRDtZQUN4RSxLQUFLLEVBQUUsRUFBRTtZQUNULGNBQWMsRUFBRSxHQUFHO1lBQ25CLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFlBQVksRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtTQUM1QztRQUNELFNBQVMsRUFBRTtZQUNQLElBQUksRUFBRSxXQUFXO1lBQ2pCLEdBQUcsRUFBRSxpQkFBaUI7WUFDdEIscUJBQXFCLEVBQUUsNkNBQTZDO1lBQ3BFLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQztZQUNoQixjQUFjLEVBQUUsR0FBRztZQUNuQixTQUFTLEVBQUUsS0FBSztZQUNoQixZQUFZLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUU7U0FDN0M7UUFDRCxPQUFPLEVBQUU7WUFDTCxJQUFJLEVBQUUsU0FBUztZQUNmLEdBQUcsRUFBRSxlQUFlO1lBQ3BCLHFCQUFxQixFQUFFLHdDQUF3QztZQUMvRCxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsaUJBQWlCLENBQUM7WUFDOUIsY0FBYyxFQUFFLEdBQUc7WUFDbkIsU0FBUyxFQUFFLEtBQUs7WUFDaEIsWUFBWSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFO1lBQ3pDLEtBQUssRUFBRSxjQUFNLE9BQUEsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBeEQsQ0FBd0Q7U0FDeEU7S0FDSjtDQUNKO0FBRUQ7SUFJSSx1QkFBb0MsT0FBeUM7O1lBQ3JFLFNBQWdDO1FBQ3BDLElBQUksT0FBTyxPQUFPLEtBQUssVUFBVSxFQUFFO1lBQy9CLFNBQVMsR0FBRyxPQUFPLEVBQUUsQ0FBQztTQUN6QjthQUFNO1lBQ0gsU0FBUyxHQUFHLE9BQU8sQ0FBQztTQUN2QjtRQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsd0NBQ1IsY0FBYyxFQUNkLFNBQVMsSUFDWixTQUFTLHVCQUNGLFNBQVMsQ0FBQyxTQUFTLEVBQ25CLE1BQU07aUJBQ0osSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUM7aUJBQzlCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDLENBQUM7aUJBQzlDLEdBQUcsQ0FBQyxVQUFDLEdBQUc7O2dCQUFLLE9BQUEsU0FBUyxDQUFDLFNBQVMsSUFBSSxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQztvQkFDekQsQ0FBQyxXQUFHLEdBQUMsR0FBRyx5QkFBUSxjQUFjLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFLLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUUsTUFDNUUsQ0FBQyxXQUFHLEdBQUMsR0FBRyxJQUFHLGNBQWMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUU7WUFGaEMsQ0FFZ0MsQ0FBQztpQkFDOUMsTUFBTSxDQUFDLFVBQUMsR0FBRyxFQUFFLElBQUksSUFBSyxPQUFBLHNCQUFNLEdBQUcsRUFBSyxJQUFJLEVBQUcsRUFBckIsQ0FBcUIsRUFBRSxFQUFFLENBQUMsTUFFMUMsQ0FBQztJQUN4QixDQUFDOztnQkF6QkosVUFBVTs7OztnREFJTSxNQUFNLFNBQUMsY0FBYzs7SUFzQnRDLG9CQUFDO0NBQUEsQUExQkQsSUEwQkM7U0F6QlksYUFBYTs7O0lBQ3RCLGdDQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3RvcmFnZVR5cGUsIExPQ0FMX1NUT1JBR0UgfSBmcm9tICcuL3N0b3JhZ2UtdHlwZS5lbnVtJztcclxuaW1wb3J0IHsgSVBhcnRpYWxDb25maWdPcHRpb25zIH0gZnJvbSAnLi9uZzItdWktYXV0aC5tb2R1bGUnO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgUm9uIG9uIDE3LzEyLzIwMTUuXHJcbiAqL1xyXG5leHBvcnQgdHlwZSBDb25maWdPcHRpb25zID0gSVBhcnRpYWxDb25maWdPcHRpb25zIHwgRnVuY3Rpb247XHJcblxyXG5leHBvcnQgY29uc3QgQ09ORklHX09QVElPTlMgPSBuZXcgSW5qZWN0aW9uVG9rZW48YW55PignY29uZmlnLm9wdGlvbnMnKTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVBvcHVwT3B0aW9ucyB7XHJcbiAgICB3aWR0aD86IG51bWJlcjtcclxuICAgIGhlaWdodD86IG51bWJlcjtcclxuICAgIGxlZnQ/OiBudW1iZXI7XHJcbiAgICB0b3A/OiBudW1iZXI7XHJcbiAgICB2aXNpYmxlVG9vbGJhcj86IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU9hdXRoMU9wdGlvbnMge1xyXG4gICAgdXJsPzogc3RyaW5nO1xyXG4gICAgbmFtZT86IHN0cmluZztcclxuICAgIHJlZGlyZWN0VXJpPzogc3RyaW5nO1xyXG4gICAgcG9wdXBPcHRpb25zPzogSVBvcHVwT3B0aW9ucztcclxuICAgIGF1dGhvcml6YXRpb25FbmRwb2ludD86IHN0cmluZztcclxuICAgIG9hdXRoVHlwZT86ICcxLjAnO1xyXG4gICAgbWV0aG9kPzogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElPYXV0aDJPcHRpb25zIHtcclxuICAgIHVybD86IHN0cmluZztcclxuICAgIG5hbWU/OiBzdHJpbmc7XHJcbiAgICByZWRpcmVjdFVyaT86IHN0cmluZztcclxuICAgIHBvcHVwT3B0aW9ucz86IElQb3B1cE9wdGlvbnM7XHJcbiAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ/OiBzdHJpbmc7XHJcbiAgICBvYXV0aFR5cGU/OiAnMi4wJztcclxuICAgIG1ldGhvZD86IHN0cmluZztcclxuICAgIHJlc3BvbnNlVHlwZT86IHN0cmluZztcclxuICAgIGNsaWVudElkPzogc3RyaW5nO1xyXG4gICAgYWRkaXRpb25hbFVybFBhcmFtcz86IHtcclxuICAgICAgICBbcGFyYW1OYW1lOiBzdHJpbmddOiBzdHJpbmcgfCAoKCkgPT4gc3RyaW5nKSB8IG51bGwgfCB1bmRlZmluZWQ7XHJcbiAgICB9O1xyXG4gICAgc2NvcGVEZWxpbWl0ZXI/OiBzdHJpbmc7XHJcbiAgICBzY29wZT86IHN0cmluZ1tdO1xyXG4gICAgc3RhdGU/OiBzdHJpbmcgfCAoKCkgPT4gc3RyaW5nKTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUHJvdmlkZXJzIHtcclxuICAgIFtwcm92aWRlcjogc3RyaW5nXTogSU9hdXRoMk9wdGlvbnMgfCBJT2F1dGgxT3B0aW9ucztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQ29uZmlnT3B0aW9ucyB7XHJcbiAgICB0b2tlblJvb3Q6IHN0cmluZyB8IG51bGw7XHJcbiAgICBjb3Jkb3ZhOiBib29sZWFuIHwgbnVsbDtcclxuICAgIGJhc2VVcmw6IHN0cmluZztcclxuICAgIGxvZ2luVXJsOiBzdHJpbmc7XHJcbiAgICBzaWdudXBVcmw6IHN0cmluZztcclxuICAgIHVubGlua1VybDogc3RyaW5nO1xyXG4gICAgdG9rZW5OYW1lOiBzdHJpbmc7XHJcbiAgICB0b2tlblNlcGFyYXRvcjogc3RyaW5nO1xyXG4gICAgdG9rZW5QcmVmaXg6IHN0cmluZztcclxuICAgIGF1dGhUb2tlbjogc3RyaW5nO1xyXG4gICAgYXV0aEhlYWRlcjogc3RyaW5nO1xyXG4gICAgc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlO1xyXG4gICAgcHJvdmlkZXJzOiBJUHJvdmlkZXJzO1xyXG4gICAgd2l0aENyZWRlbnRpYWxzOiBib29sZWFuO1xyXG4gICAgcmVzb2x2ZVRva2VuOiAocmVzcG9uc2U6IGFueSwgY29uZmlnOiBJQ29uZmlnT3B0aW9ucykgPT4gc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElQYXJ0aWFsQ29uZmlnT3B0aW9ucyB7IC8vID0gUGFydGlhbDxJQ29uZmlnT3B0aW9uc1xyXG4gICAgdG9rZW5Sb290Pzogc3RyaW5nIHwgbnVsbDtcclxuICAgIGNvcmRvdmE/OiBib29sZWFuIHwgbnVsbDtcclxuICAgIGJhc2VVcmw/OiBzdHJpbmc7XHJcbiAgICBsb2dpblVybD86IHN0cmluZztcclxuICAgIHNpZ251cFVybD86IHN0cmluZztcclxuICAgIHVubGlua1VybD86IHN0cmluZztcclxuICAgIHRva2VuTmFtZT86IHN0cmluZztcclxuICAgIHRva2VuU2VwYXJhdG9yPzogc3RyaW5nO1xyXG4gICAgdG9rZW5QcmVmaXg/OiBzdHJpbmc7XHJcbiAgICBhdXRoVG9rZW4/OiBzdHJpbmc7XHJcbiAgICBhdXRoSGVhZGVyPzogc3RyaW5nO1xyXG4gICAgc3RvcmFnZVR5cGU/OiBTdG9yYWdlVHlwZTtcclxuICAgIHByb3ZpZGVycz86IElQcm92aWRlcnM7XHJcbiAgICB3aXRoQ3JlZGVudGlhbHM/OiBib29sZWFuO1xyXG4gICAgcmVzb2x2ZVRva2VuPzogKHJlc3BvbnNlOiBhbnksIGNvbmZpZzogSUNvbmZpZ09wdGlvbnMpID0+IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGRlZmF1bHRPcHRpb25zOiBJQ29uZmlnT3B0aW9ucyA9IHtcclxuICAgIHdpdGhDcmVkZW50aWFsczogZmFsc2UsXHJcbiAgICB0b2tlblJvb3Q6IG51bGwsXHJcbiAgICBiYXNlVXJsOiAnLycsXHJcbiAgICBsb2dpblVybDogJy9hdXRoL2xvZ2luJyxcclxuICAgIHNpZ251cFVybDogJy9hdXRoL3NpZ251cCcsXHJcbiAgICB1bmxpbmtVcmw6ICcvYXV0aC91bmxpbmsvJyxcclxuICAgIHRva2VuTmFtZTogJ3Rva2VuJyxcclxuICAgIHRva2VuU2VwYXJhdG9yOiAnXycsXHJcbiAgICB0b2tlblByZWZpeDogJ25nMi11aS1hdXRoJyxcclxuICAgIGF1dGhIZWFkZXI6ICdBdXRob3JpemF0aW9uJyxcclxuICAgIGF1dGhUb2tlbjogJ0JlYXJlcicsXHJcbiAgICBzdG9yYWdlVHlwZTogTE9DQUxfU1RPUkFHRSxcclxuICAgIGNvcmRvdmE6IG51bGwsXHJcbiAgICByZXNvbHZlVG9rZW46IChyZXNwb25zZTogYW55LCBjb25maWc6IElDb25maWdPcHRpb25zKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYWNjZXNzVG9rZW46IHN0cmluZyB8IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gfCBudWxsIHwgdW5kZWZpbmVkID0gcmVzcG9uc2UgJiZcclxuICAgICAgICAgICAgKHJlc3BvbnNlLmFjY2Vzc190b2tlbiB8fCByZXNwb25zZS50b2tlbiB8fCByZXNwb25zZS5kYXRhKTtcclxuICAgICAgICBpZiAoIWFjY2Vzc1Rva2VuKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUud2FybignTm8gdG9rZW4gZm91bmQnKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgYWNjZXNzVG9rZW4gPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2Nlc3NUb2tlbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBhY2Nlc3NUb2tlbiAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS53YXJuKCdObyB0b2tlbiBmb3VuZCcpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgdG9rZW5Sb290RGF0YSA9IGNvbmZpZy50b2tlblJvb3QgJiYgY29uZmlnLnRva2VuUm9vdFxyXG4gICAgICAgICAgICAuc3BsaXQoJy4nKVxyXG4gICAgICAgICAgICAucmVkdWNlKFxyXG4gICAgICAgICAgICAobzogYW55LCB4OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvW3hdO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhY2Nlc3NUb2tlbik7XHJcbiAgICAgICAgY29uc3QgdG9rZW4gPSB0b2tlblJvb3REYXRhID8gdG9rZW5Sb290RGF0YVtjb25maWcudG9rZW5OYW1lXSA6IGFjY2Vzc1Rva2VuW2NvbmZpZy50b2tlbk5hbWVdO1xyXG4gICAgICAgIGlmICh0b2tlbikge1xyXG4gICAgICAgICAgICByZXR1cm4gdG9rZW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnN0IHRva2VuUGF0aCA9IHRoaXMudG9rZW5Sb290ID8gdGhpcy50b2tlblJvb3QgKyAnLicgKyB0aGlzLnRva2VuTmFtZSA6IHRoaXMudG9rZW5OYW1lO1xyXG4gICAgICAgIC8vIGNvbnNvbGUud2FybignRXhwZWN0aW5nIGEgdG9rZW4gbmFtZWQgXCInICsgdG9rZW5QYXRoKTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcbiAgICBwcm92aWRlcnM6IHtcclxuICAgICAgICBmYWNlYm9vazoge1xyXG4gICAgICAgICAgICBuYW1lOiAnZmFjZWJvb2snLFxyXG4gICAgICAgICAgICB1cmw6ICcvYXV0aC9mYWNlYm9vaycsXHJcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS92Mi41L2RpYWxvZy9vYXV0aCcsXHJcbiAgICAgICAgICAgIGFkZGl0aW9uYWxVcmxQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdwb3B1cCcsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNjb3BlOiBbJ2VtYWlsJ10sXHJcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyOiAnLCcsXHJcbiAgICAgICAgICAgIG9hdXRoVHlwZTogJzIuMCcsXHJcbiAgICAgICAgICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNTgwLCBoZWlnaHQ6IDQwMCB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ29vZ2xlOiB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdnb29nbGUnLFxyXG4gICAgICAgICAgICB1cmw6ICcvYXV0aC9nb29nbGUnLFxyXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vby9vYXV0aDIvYXV0aCcsXHJcbiAgICAgICAgICAgIGFkZGl0aW9uYWxVcmxQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICdkaXNwbGF5JzogJ3BvcHVwJyxcclxuICAgICAgICAgICAgICAgICdwcm9tcHQnOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAnbG9naW5faGludCc6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICdhY2Nlc3NfdHlwZSc6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICdpbmNsdWRlX2dyYW50ZWRfc2NvcGVzJzogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgJ29wZW5pZC5yZWFsbSc6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICdoZCc6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2NvcGU6IFsnb3BlbmlkJywgJ3Byb2ZpbGUnLCAnZW1haWwnXSxcclxuICAgICAgICAgICAgc2NvcGVEZWxpbWl0ZXI6ICcgJyxcclxuICAgICAgICAgICAgb2F1dGhUeXBlOiAnMi4wJyxcclxuICAgICAgICAgICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA0NTIsIGhlaWdodDogNjMzIH0sXHJcbiAgICAgICAgICAgIHN0YXRlOiAoKSA9PiBlbmNvZGVVUklDb21wb25lbnQoTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIpKSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdpdGh1Yjoge1xyXG4gICAgICAgICAgICBuYW1lOiAnZ2l0aHViJyxcclxuICAgICAgICAgICAgdXJsOiAnL2F1dGgvZ2l0aHViJyxcclxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9naXRodWIuY29tL2xvZ2luL29hdXRoL2F1dGhvcml6ZScsXHJcbiAgICAgICAgICAgIHNjb3BlOiBbJ3VzZXI6ZW1haWwnXSxcclxuICAgICAgICAgICAgc2NvcGVEZWxpbWl0ZXI6ICcgJyxcclxuICAgICAgICAgICAgb2F1dGhUeXBlOiAnMi4wJyxcclxuICAgICAgICAgICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiAxMDIwLCBoZWlnaHQ6IDYxOCB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5zdGFncmFtOiB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdpbnN0YWdyYW0nLFxyXG4gICAgICAgICAgICB1cmw6ICcvYXV0aC9pbnN0YWdyYW0nLFxyXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2FwaS5pbnN0YWdyYW0uY29tL29hdXRoL2F1dGhvcml6ZScsXHJcbiAgICAgICAgICAgIHNjb3BlOiBbJ2Jhc2ljJ10sXHJcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyOiAnKycsXHJcbiAgICAgICAgICAgIG9hdXRoVHlwZTogJzIuMCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsaW5rZWRpbjoge1xyXG4gICAgICAgICAgICBuYW1lOiAnbGlua2VkaW4nLFxyXG4gICAgICAgICAgICB1cmw6ICcvYXV0aC9saW5rZWRpbicsXHJcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS91YXMvb2F1dGgyL2F1dGhvcml6YXRpb24nLFxyXG4gICAgICAgICAgICBzY29wZTogWydyX2VtYWlsYWRkcmVzcyddLFxyXG4gICAgICAgICAgICBzY29wZURlbGltaXRlcjogJyAnLFxyXG4gICAgICAgICAgICBvYXV0aFR5cGU6ICcyLjAnLFxyXG4gICAgICAgICAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDUyNywgaGVpZ2h0OiA1ODIgfSxcclxuICAgICAgICAgICAgc3RhdGU6ICdTVEFURScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0d2l0dGVyOiB7XHJcbiAgICAgICAgICAgIG5hbWU6ICd0d2l0dGVyJyxcclxuICAgICAgICAgICAgdXJsOiAnL2F1dGgvdHdpdHRlcicsXHJcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vYXBpLnR3aXR0ZXIuY29tL29hdXRoL2F1dGhlbnRpY2F0ZScsXHJcbiAgICAgICAgICAgIG9hdXRoVHlwZTogJzEuMCcsXHJcbiAgICAgICAgICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNDk1LCBoZWlnaHQ6IDY0NSB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdHdpdGNoOiB7XHJcbiAgICAgICAgICAgIG5hbWU6ICd0d2l0Y2gnLFxyXG4gICAgICAgICAgICB1cmw6ICcvYXV0aC90d2l0Y2gnLFxyXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2FwaS50d2l0Y2gudHYva3Jha2VuL29hdXRoMi9hdXRob3JpemUnLFxyXG4gICAgICAgICAgICBzY29wZTogWyd1c2VyX3JlYWQnXSxcclxuICAgICAgICAgICAgc2NvcGVEZWxpbWl0ZXI6ICcgJyxcclxuICAgICAgICAgICAgYWRkaXRpb25hbFVybFBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ3BvcHVwJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb2F1dGhUeXBlOiAnMi4wJyxcclxuICAgICAgICAgICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA1MDAsIGhlaWdodDogNTYwIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsaXZlOiB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdsaXZlJyxcclxuICAgICAgICAgICAgdXJsOiAnL2F1dGgvbGl2ZScsXHJcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vbG9naW4ubGl2ZS5jb20vb2F1dGgyMF9hdXRob3JpemUuc3JmJyxcclxuICAgICAgICAgICAgYWRkaXRpb25hbFVybFBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ3BvcHVwJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2NvcGU6IFsnd2wuZW1haWxzJ10sXHJcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyOiAnICcsXHJcbiAgICAgICAgICAgIG9hdXRoVHlwZTogJzIuMCcsXHJcbiAgICAgICAgICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNTAwLCBoZWlnaHQ6IDU2MCB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeWFob286IHtcclxuICAgICAgICAgICAgbmFtZTogJ3lhaG9vJyxcclxuICAgICAgICAgICAgdXJsOiAnL2F1dGgveWFob28nLFxyXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2FwaS5sb2dpbi55YWhvby5jb20vb2F1dGgyL3JlcXVlc3RfYXV0aCcsXHJcbiAgICAgICAgICAgIHNjb3BlOiBbXSxcclxuICAgICAgICAgICAgc2NvcGVEZWxpbWl0ZXI6ICcsJyxcclxuICAgICAgICAgICAgb2F1dGhUeXBlOiAnMi4wJyxcclxuICAgICAgICAgICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA1NTksIGhlaWdodDogNTE5IH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaXRidWNrZXQ6IHtcclxuICAgICAgICAgICAgbmFtZTogJ2JpdGJ1Y2tldCcsXHJcbiAgICAgICAgICAgIHVybDogJy9hdXRoL2JpdGJ1Y2tldCcsXHJcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vYml0YnVja2V0Lm9yZy9zaXRlL29hdXRoMi9hdXRob3JpemUnLFxyXG4gICAgICAgICAgICBzY29wZTogWydlbWFpbCddLFxyXG4gICAgICAgICAgICBzY29wZURlbGltaXRlcjogJywnLFxyXG4gICAgICAgICAgICBvYXV0aFR5cGU6ICcyLjAnLFxyXG4gICAgICAgICAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDEwMjgsIGhlaWdodDogNTI5IH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzcG90aWZ5OiB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdzcG90aWZ5JyxcclxuICAgICAgICAgICAgdXJsOiAnL2F1dGgvc3BvdGlmeScsXHJcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vYWNjb3VudHMuc3BvdGlmeS5jb20vYXV0aG9yaXplJyxcclxuICAgICAgICAgICAgc2NvcGU6IFsnJywgJ3VzZXItcmVhZC1lbWFpbCddLFxyXG4gICAgICAgICAgICBzY29wZURlbGltaXRlcjogJywnLFxyXG4gICAgICAgICAgICBvYXV0aFR5cGU6ICcyLjAnLFxyXG4gICAgICAgICAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDUwMCwgaGVpZ2h0OiA1MzAgfSxcclxuICAgICAgICAgICAgc3RhdGU6ICgpID0+IGVuY29kZVVSSUNvbXBvbmVudChNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMikpLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG59O1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQ29uZmlnU2VydmljZSB7XHJcbiAgICBwdWJsaWMgb3B0aW9uczogSUNvbmZpZ09wdGlvbnM7XHJcblxyXG4gICAgY29uc3RydWN0b3IoQEluamVjdChDT05GSUdfT1BUSU9OUykgb3B0aW9uczogSVBhcnRpYWxDb25maWdPcHRpb25zIHwgRnVuY3Rpb24pIHtcclxuICAgICAgICBsZXQgb3B0aW9uT2JqOiBJUGFydGlhbENvbmZpZ09wdGlvbnM7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbk9iaiA9IG9wdGlvbnMoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBvcHRpb25PYmogPSBvcHRpb25zO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIC4uLmRlZmF1bHRPcHRpb25zLFxyXG4gICAgICAgICAgICAuLi5vcHRpb25PYmosXHJcbiAgICAgICAgICAgIHByb3ZpZGVyczoge1xyXG4gICAgICAgICAgICAgICAgLi4ub3B0aW9uT2JqLnByb3ZpZGVycyxcclxuICAgICAgICAgICAgICAgIC4uLk9iamVjdFxyXG4gICAgICAgICAgICAgICAgICAgIC5rZXlzKGRlZmF1bHRPcHRpb25zLnByb3ZpZGVycylcclxuICAgICAgICAgICAgICAgICAgICAuY29uY2F0KE9iamVjdC5rZXlzKG9wdGlvbk9iai5wcm92aWRlcnMgfHwge30pKVxyXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKGtleSkgPT4gb3B0aW9uT2JqLnByb3ZpZGVycyAmJiBvcHRpb25PYmoucHJvdmlkZXJzW2tleV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPyB7IFtrZXldOiB7IC4uLmRlZmF1bHRPcHRpb25zLnByb3ZpZGVyc1trZXldLCAuLi5vcHRpb25PYmoucHJvdmlkZXJzW2tleV0gfSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogeyBba2V5XTogZGVmYXVsdE9wdGlvbnMucHJvdmlkZXJzW2tleV0gfSlcclxuICAgICAgICAgICAgICAgICAgICAucmVkdWNlKChhY2MsIG5leHQpID0+ICh7IC4uLmFjYywgLi4ubmV4dCB9KSwge30pLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0gYXMgSUNvbmZpZ09wdGlvbnM7XHJcbiAgICB9XHJcbn1cclxuIl19