/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { LOCAL_STORAGE } from './storage-type.enum';
/** *
 * Created by Ron on 17/12/2015.
  @type {?} */
export var CONFIG_OPTIONS = new InjectionToken('config.options');
/**
 * @record
 */
export function IPopupOptions() { }
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
/**
 * @record
 */
export function IOauth1Options() { }
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
/**
 * @record
 */
export function IOauth2Options() { }
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
/**
 * @record
 */
export function IProviders() { }
/**
 * @record
 */
export function IConfigOptions() { }
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
/**
 * @record
 */
export function IPartialConfigOptions() { }
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
        this.options = /** @type {?} */ (tslib_1.__assign({}, defaultOptions, options, { providers: tslib_1.__assign({}, options.providers, Object
                .keys(defaultOptions.providers)
                .concat(Object.keys(options.providers || {}))
                .map(function (key) {
                var _a, _b;
                return options.providers && options.providers[key]
                    ? (_a = {}, _a[key] = tslib_1.__assign({}, defaultOptions.providers[key], options.providers[key]), _a) : (_b = {}, _b[key] = defaultOptions.providers[key], _b);
            })
                .reduce(function (acc, next) { return (tslib_1.__assign({}, acc, next)); }, {})) }));
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItdWktYXV0aC8iLCJzb3VyY2VzIjpbImNvbmZpZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25FLE9BQU8sRUFBZSxhQUFhLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7OztBQU1qRSxXQUFhLGNBQWMsR0FBRyxJQUFJLGNBQWMsQ0FBTSxnQkFBZ0IsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBOEV4RSxXQUFhLGNBQWMsR0FBbUI7SUFDMUMsZUFBZSxFQUFFLEtBQUs7SUFDdEIsU0FBUyxFQUFFLElBQUk7SUFDZixPQUFPLEVBQUUsR0FBRztJQUNaLFFBQVEsRUFBRSxhQUFhO0lBQ3ZCLFNBQVMsRUFBRSxjQUFjO0lBQ3pCLFNBQVMsRUFBRSxlQUFlO0lBQzFCLFNBQVMsRUFBRSxPQUFPO0lBQ2xCLGNBQWMsRUFBRSxHQUFHO0lBQ25CLFdBQVcsRUFBRSxhQUFhO0lBQzFCLFVBQVUsRUFBRSxlQUFlO0lBQzNCLFNBQVMsRUFBRSxRQUFRO0lBQ25CLFdBQVcsRUFBRSxhQUFhO0lBQzFCLE9BQU8sRUFBRSxJQUFJO0lBQ2IsWUFBWSxFQUFFLFVBQUMsUUFBYSxFQUFFLE1BQXNCOztRQUNoRCxJQUFNLFdBQVcsR0FBMEQsUUFBUTtZQUMvRSxDQUFDLFFBQVEsQ0FBQyxZQUFZLElBQUksUUFBUSxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLFdBQVcsRUFBRTs7WUFFZCxPQUFPLElB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QyxTQUFTLENBQUM7aUJBQzlCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDLENBQUM7aUJBQzVDLEdBQUcsQ0FBQyxVQUFDLEdBQUc7O2dCQUFLLE9BQUEsT0FBTyxDQUFDLFNBQVMsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQztvQkFDckQsQ0FBQyxXQUFHLEdBQUMsR0FBRyx5QkFBUSxjQUFjLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFLLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUUsTUFDMUUsQ0FBQyxXQUFHLEdBQUMsR0FBRyxJQUFHLGNBQWMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUU7WUFGaEMsQ0FFZ0MsQ0FBQztpQkFDOUMsTUFBTSxDQUFDLFVBQUMsR0FBRyxFQUFFLElBQUksSUFBSyxPQUFBLHNCQUFNLEdBQUcsRUFBSyxJQUFJLEVBQUcsRUFBckIsQ0FBcUIsRUFBRSxFQUFFLENBQUMsSUFFMUMsQ0FBQSxDQUFDO0tBQ3ZCOztnQkFuQkosVUFBVTs7OztnREFJTSxNQUFNLFNBQUMsY0FBYzs7d0JBN1B0Qzs7U0EwUGEsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3RvcmFnZVR5cGUsIExPQ0FMX1NUT1JBR0UgfSBmcm9tICcuL3N0b3JhZ2UtdHlwZS5lbnVtJztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFJvbiBvbiAxNy8xMi8yMDE1LlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjb25zdCBDT05GSUdfT1BUSU9OUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxhbnk+KCdjb25maWcub3B0aW9ucycpO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUG9wdXBPcHRpb25zIHtcclxuICAgIHdpZHRoPzogbnVtYmVyO1xyXG4gICAgaGVpZ2h0PzogbnVtYmVyO1xyXG4gICAgbGVmdD86IG51bWJlcjtcclxuICAgIHRvcD86IG51bWJlcjtcclxuICAgIHZpc2libGVUb29sYmFyPzogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJT2F1dGgxT3B0aW9ucyB7XHJcbiAgICB1cmw/OiBzdHJpbmc7XHJcbiAgICBuYW1lPzogc3RyaW5nO1xyXG4gICAgcmVkaXJlY3RVcmk/OiBzdHJpbmc7XHJcbiAgICBwb3B1cE9wdGlvbnM/OiBJUG9wdXBPcHRpb25zO1xyXG4gICAgYXV0aG9yaXphdGlvbkVuZHBvaW50Pzogc3RyaW5nO1xyXG4gICAgb2F1dGhUeXBlPzogJzEuMCc7XHJcbiAgICBtZXRob2Q/OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU9hdXRoMk9wdGlvbnMge1xyXG4gICAgdXJsPzogc3RyaW5nO1xyXG4gICAgbmFtZT86IHN0cmluZztcclxuICAgIHJlZGlyZWN0VXJpPzogc3RyaW5nO1xyXG4gICAgcG9wdXBPcHRpb25zPzogSVBvcHVwT3B0aW9ucztcclxuICAgIGF1dGhvcml6YXRpb25FbmRwb2ludD86IHN0cmluZztcclxuICAgIG9hdXRoVHlwZT86ICcyLjAnO1xyXG4gICAgbWV0aG9kPzogc3RyaW5nO1xyXG4gICAgcmVzcG9uc2VUeXBlPzogc3RyaW5nO1xyXG4gICAgY2xpZW50SWQ/OiBzdHJpbmc7XHJcbiAgICBhZGRpdGlvbmFsVXJsUGFyYW1zPzoge1xyXG4gICAgICAgIFtwYXJhbU5hbWU6IHN0cmluZ106IHN0cmluZyB8ICgoKSA9PiBzdHJpbmcpIHwgbnVsbCB8IHVuZGVmaW5lZDtcclxuICAgIH07XHJcbiAgICBzY29wZURlbGltaXRlcj86IHN0cmluZztcclxuICAgIHNjb3BlPzogc3RyaW5nW107XHJcbiAgICBzdGF0ZT86IHN0cmluZyB8ICgoKSA9PiBzdHJpbmcpO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElQcm92aWRlcnMge1xyXG4gICAgW3Byb3ZpZGVyOiBzdHJpbmddOiBJT2F1dGgyT3B0aW9ucyB8IElPYXV0aDFPcHRpb25zO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElDb25maWdPcHRpb25zIHtcclxuICAgIHRva2VuUm9vdDogc3RyaW5nIHwgbnVsbDtcclxuICAgIGNvcmRvdmE6IGJvb2xlYW4gfCBudWxsO1xyXG4gICAgYmFzZVVybDogc3RyaW5nO1xyXG4gICAgbG9naW5Vcmw6IHN0cmluZztcclxuICAgIHNpZ251cFVybDogc3RyaW5nO1xyXG4gICAgdW5saW5rVXJsOiBzdHJpbmc7XHJcbiAgICB0b2tlbk5hbWU6IHN0cmluZztcclxuICAgIHRva2VuU2VwYXJhdG9yOiBzdHJpbmc7XHJcbiAgICB0b2tlblByZWZpeDogc3RyaW5nO1xyXG4gICAgYXV0aFRva2VuOiBzdHJpbmc7XHJcbiAgICBhdXRoSGVhZGVyOiBzdHJpbmc7XHJcbiAgICBzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGU7XHJcbiAgICBwcm92aWRlcnM6IElQcm92aWRlcnM7XHJcbiAgICB3aXRoQ3JlZGVudGlhbHM6IGJvb2xlYW47XHJcbiAgICByZXNvbHZlVG9rZW46IChyZXNwb25zZTogYW55LCBjb25maWc6IElDb25maWdPcHRpb25zKSA9PiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVBhcnRpYWxDb25maWdPcHRpb25zIHsgLy8gPSBQYXJ0aWFsPElDb25maWdPcHRpb25zXHJcbiAgICB0b2tlblJvb3Q/OiBzdHJpbmcgfCBudWxsO1xyXG4gICAgY29yZG92YT86IGJvb2xlYW4gfCBudWxsO1xyXG4gICAgYmFzZVVybD86IHN0cmluZztcclxuICAgIGxvZ2luVXJsPzogc3RyaW5nO1xyXG4gICAgc2lnbnVwVXJsPzogc3RyaW5nO1xyXG4gICAgdW5saW5rVXJsPzogc3RyaW5nO1xyXG4gICAgdG9rZW5OYW1lPzogc3RyaW5nO1xyXG4gICAgdG9rZW5TZXBhcmF0b3I/OiBzdHJpbmc7XHJcbiAgICB0b2tlblByZWZpeD86IHN0cmluZztcclxuICAgIGF1dGhUb2tlbj86IHN0cmluZztcclxuICAgIGF1dGhIZWFkZXI/OiBzdHJpbmc7XHJcbiAgICBzdG9yYWdlVHlwZT86IFN0b3JhZ2VUeXBlO1xyXG4gICAgcHJvdmlkZXJzPzogSVByb3ZpZGVycztcclxuICAgIHdpdGhDcmVkZW50aWFscz86IGJvb2xlYW47XHJcbiAgICByZXNvbHZlVG9rZW4/OiAocmVzcG9uc2U6IGFueSwgY29uZmlnOiBJQ29uZmlnT3B0aW9ucykgPT4gc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZGVmYXVsdE9wdGlvbnM6IElDb25maWdPcHRpb25zID0ge1xyXG4gICAgd2l0aENyZWRlbnRpYWxzOiBmYWxzZSxcclxuICAgIHRva2VuUm9vdDogbnVsbCxcclxuICAgIGJhc2VVcmw6ICcvJyxcclxuICAgIGxvZ2luVXJsOiAnL2F1dGgvbG9naW4nLFxyXG4gICAgc2lnbnVwVXJsOiAnL2F1dGgvc2lnbnVwJyxcclxuICAgIHVubGlua1VybDogJy9hdXRoL3VubGluay8nLFxyXG4gICAgdG9rZW5OYW1lOiAndG9rZW4nLFxyXG4gICAgdG9rZW5TZXBhcmF0b3I6ICdfJyxcclxuICAgIHRva2VuUHJlZml4OiAnbmcyLXVpLWF1dGgnLFxyXG4gICAgYXV0aEhlYWRlcjogJ0F1dGhvcml6YXRpb24nLFxyXG4gICAgYXV0aFRva2VuOiAnQmVhcmVyJyxcclxuICAgIHN0b3JhZ2VUeXBlOiBMT0NBTF9TVE9SQUdFLFxyXG4gICAgY29yZG92YTogbnVsbCxcclxuICAgIHJlc29sdmVUb2tlbjogKHJlc3BvbnNlOiBhbnksIGNvbmZpZzogSUNvbmZpZ09wdGlvbnMpID0+IHtcclxuICAgICAgICBjb25zdCBhY2Nlc3NUb2tlbjogc3RyaW5nIHwgeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSB8IG51bGwgfCB1bmRlZmluZWQgPSByZXNwb25zZSAmJlxyXG4gICAgICAgICAgICAocmVzcG9uc2UuYWNjZXNzX3Rva2VuIHx8IHJlc3BvbnNlLnRva2VuIHx8IHJlc3BvbnNlLmRhdGEpO1xyXG4gICAgICAgIGlmICghYWNjZXNzVG9rZW4pIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS53YXJuKCdObyB0b2tlbiBmb3VuZCcpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBhY2Nlc3NUb2tlbiA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFjY2Vzc1Rva2VuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGFjY2Vzc1Rva2VuICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLndhcm4oJ05vIHRva2VuIGZvdW5kJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB0b2tlblJvb3REYXRhID0gY29uZmlnLnRva2VuUm9vdCAmJiBjb25maWcudG9rZW5Sb290XHJcbiAgICAgICAgICAgIC5zcGxpdCgnLicpXHJcbiAgICAgICAgICAgIC5yZWR1Y2UoXHJcbiAgICAgICAgICAgIChvOiBhbnksIHg6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9beF07XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGFjY2Vzc1Rva2VuKTtcclxuICAgICAgICBjb25zdCB0b2tlbiA9IHRva2VuUm9vdERhdGEgPyB0b2tlblJvb3REYXRhW2NvbmZpZy50b2tlbk5hbWVdIDogYWNjZXNzVG9rZW5bY29uZmlnLnRva2VuTmFtZV07XHJcbiAgICAgICAgaWYgKHRva2VuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0b2tlbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc3QgdG9rZW5QYXRoID0gdGhpcy50b2tlblJvb3QgPyB0aGlzLnRva2VuUm9vdCArICcuJyArIHRoaXMudG9rZW5OYW1lIDogdGhpcy50b2tlbk5hbWU7XHJcbiAgICAgICAgLy8gY29uc29sZS53YXJuKCdFeHBlY3RpbmcgYSB0b2tlbiBuYW1lZCBcIicgKyB0b2tlblBhdGgpO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfSxcclxuICAgIHByb3ZpZGVyczoge1xyXG4gICAgICAgIGZhY2Vib29rOiB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdmYWNlYm9vaycsXHJcbiAgICAgICAgICAgIHVybDogJy9hdXRoL2ZhY2Vib29rJyxcclxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL3YyLjUvZGlhbG9nL29hdXRoJyxcclxuICAgICAgICAgICAgYWRkaXRpb25hbFVybFBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ3BvcHVwJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2NvcGU6IFsnZW1haWwnXSxcclxuICAgICAgICAgICAgc2NvcGVEZWxpbWl0ZXI6ICcsJyxcclxuICAgICAgICAgICAgb2F1dGhUeXBlOiAnMi4wJyxcclxuICAgICAgICAgICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA1ODAsIGhlaWdodDogNDAwIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnb29nbGU6IHtcclxuICAgICAgICAgICAgbmFtZTogJ2dvb2dsZScsXHJcbiAgICAgICAgICAgIHVybDogJy9hdXRoL2dvb2dsZScsXHJcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9vL29hdXRoMi9hdXRoJyxcclxuICAgICAgICAgICAgYWRkaXRpb25hbFVybFBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgJ2Rpc3BsYXknOiAncG9wdXAnLFxyXG4gICAgICAgICAgICAgICAgJ3Byb21wdCc6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICdsb2dpbl9oaW50JzogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgJ2FjY2Vzc190eXBlJzogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgJ2luY2x1ZGVfZ3JhbnRlZF9zY29wZXMnOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAnb3BlbmlkLnJlYWxtJzogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgJ2hkJzogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzY29wZTogWydvcGVuaWQnLCAncHJvZmlsZScsICdlbWFpbCddLFxyXG4gICAgICAgICAgICBzY29wZURlbGltaXRlcjogJyAnLFxyXG4gICAgICAgICAgICBvYXV0aFR5cGU6ICcyLjAnLFxyXG4gICAgICAgICAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDQ1MiwgaGVpZ2h0OiA2MzMgfSxcclxuICAgICAgICAgICAgc3RhdGU6ICgpID0+IGVuY29kZVVSSUNvbXBvbmVudChNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMikpLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2l0aHViOiB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdnaXRodWInLFxyXG4gICAgICAgICAgICB1cmw6ICcvYXV0aC9naXRodWInLFxyXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2dpdGh1Yi5jb20vbG9naW4vb2F1dGgvYXV0aG9yaXplJyxcclxuICAgICAgICAgICAgc2NvcGU6IFsndXNlcjplbWFpbCddLFxyXG4gICAgICAgICAgICBzY29wZURlbGltaXRlcjogJyAnLFxyXG4gICAgICAgICAgICBvYXV0aFR5cGU6ICcyLjAnLFxyXG4gICAgICAgICAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDEwMjAsIGhlaWdodDogNjE4IH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbnN0YWdyYW06IHtcclxuICAgICAgICAgICAgbmFtZTogJ2luc3RhZ3JhbScsXHJcbiAgICAgICAgICAgIHVybDogJy9hdXRoL2luc3RhZ3JhbScsXHJcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vYXBpLmluc3RhZ3JhbS5jb20vb2F1dGgvYXV0aG9yaXplJyxcclxuICAgICAgICAgICAgc2NvcGU6IFsnYmFzaWMnXSxcclxuICAgICAgICAgICAgc2NvcGVEZWxpbWl0ZXI6ICcrJyxcclxuICAgICAgICAgICAgb2F1dGhUeXBlOiAnMi4wJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxpbmtlZGluOiB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdsaW5rZWRpbicsXHJcbiAgICAgICAgICAgIHVybDogJy9hdXRoL2xpbmtlZGluJyxcclxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Vhcy9vYXV0aDIvYXV0aG9yaXphdGlvbicsXHJcbiAgICAgICAgICAgIHNjb3BlOiBbJ3JfZW1haWxhZGRyZXNzJ10sXHJcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyOiAnICcsXHJcbiAgICAgICAgICAgIG9hdXRoVHlwZTogJzIuMCcsXHJcbiAgICAgICAgICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNTI3LCBoZWlnaHQ6IDU4MiB9LFxyXG4gICAgICAgICAgICBzdGF0ZTogJ1NUQVRFJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHR3aXR0ZXI6IHtcclxuICAgICAgICAgICAgbmFtZTogJ3R3aXR0ZXInLFxyXG4gICAgICAgICAgICB1cmw6ICcvYXV0aC90d2l0dGVyJyxcclxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9hcGkudHdpdHRlci5jb20vb2F1dGgvYXV0aGVudGljYXRlJyxcclxuICAgICAgICAgICAgb2F1dGhUeXBlOiAnMS4wJyxcclxuICAgICAgICAgICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA0OTUsIGhlaWdodDogNjQ1IH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0d2l0Y2g6IHtcclxuICAgICAgICAgICAgbmFtZTogJ3R3aXRjaCcsXHJcbiAgICAgICAgICAgIHVybDogJy9hdXRoL3R3aXRjaCcsXHJcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vYXBpLnR3aXRjaC50di9rcmFrZW4vb2F1dGgyL2F1dGhvcml6ZScsXHJcbiAgICAgICAgICAgIHNjb3BlOiBbJ3VzZXJfcmVhZCddLFxyXG4gICAgICAgICAgICBzY29wZURlbGltaXRlcjogJyAnLFxyXG4gICAgICAgICAgICBhZGRpdGlvbmFsVXJsUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAncG9wdXAnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvYXV0aFR5cGU6ICcyLjAnLFxyXG4gICAgICAgICAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDUwMCwgaGVpZ2h0OiA1NjAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxpdmU6IHtcclxuICAgICAgICAgICAgbmFtZTogJ2xpdmUnLFxyXG4gICAgICAgICAgICB1cmw6ICcvYXV0aC9saXZlJyxcclxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9sb2dpbi5saXZlLmNvbS9vYXV0aDIwX2F1dGhvcml6ZS5zcmYnLFxyXG4gICAgICAgICAgICBhZGRpdGlvbmFsVXJsUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAncG9wdXAnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzY29wZTogWyd3bC5lbWFpbHMnXSxcclxuICAgICAgICAgICAgc2NvcGVEZWxpbWl0ZXI6ICcgJyxcclxuICAgICAgICAgICAgb2F1dGhUeXBlOiAnMi4wJyxcclxuICAgICAgICAgICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA1MDAsIGhlaWdodDogNTYwIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICB5YWhvbzoge1xyXG4gICAgICAgICAgICBuYW1lOiAneWFob28nLFxyXG4gICAgICAgICAgICB1cmw6ICcvYXV0aC95YWhvbycsXHJcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vYXBpLmxvZ2luLnlhaG9vLmNvbS9vYXV0aDIvcmVxdWVzdF9hdXRoJyxcclxuICAgICAgICAgICAgc2NvcGU6IFtdLFxyXG4gICAgICAgICAgICBzY29wZURlbGltaXRlcjogJywnLFxyXG4gICAgICAgICAgICBvYXV0aFR5cGU6ICcyLjAnLFxyXG4gICAgICAgICAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDU1OSwgaGVpZ2h0OiA1MTkgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpdGJ1Y2tldDoge1xyXG4gICAgICAgICAgICBuYW1lOiAnYml0YnVja2V0JyxcclxuICAgICAgICAgICAgdXJsOiAnL2F1dGgvYml0YnVja2V0JyxcclxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9iaXRidWNrZXQub3JnL3NpdGUvb2F1dGgyL2F1dGhvcml6ZScsXHJcbiAgICAgICAgICAgIHNjb3BlOiBbJ2VtYWlsJ10sXHJcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyOiAnLCcsXHJcbiAgICAgICAgICAgIG9hdXRoVHlwZTogJzIuMCcsXHJcbiAgICAgICAgICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogMTAyOCwgaGVpZ2h0OiA1MjkgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNwb3RpZnk6IHtcclxuICAgICAgICAgICAgbmFtZTogJ3Nwb3RpZnknLFxyXG4gICAgICAgICAgICB1cmw6ICcvYXV0aC9zcG90aWZ5JyxcclxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9hY2NvdW50cy5zcG90aWZ5LmNvbS9hdXRob3JpemUnLFxyXG4gICAgICAgICAgICBzY29wZTogWycnLCAndXNlci1yZWFkLWVtYWlsJ10sXHJcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyOiAnLCcsXHJcbiAgICAgICAgICAgIG9hdXRoVHlwZTogJzIuMCcsXHJcbiAgICAgICAgICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNTAwLCBoZWlnaHQ6IDUzMCB9LFxyXG4gICAgICAgICAgICBzdGF0ZTogKCkgPT4gZW5jb2RlVVJJQ29tcG9uZW50KE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyKSksXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbn07XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDb25maWdTZXJ2aWNlIHtcclxuICAgIHB1YmxpYyBvcHRpb25zOiBJQ29uZmlnT3B0aW9ucztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KENPTkZJR19PUFRJT05TKSBvcHRpb25zOiBJUGFydGlhbENvbmZpZ09wdGlvbnMpIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIC4uLmRlZmF1bHRPcHRpb25zLFxyXG4gICAgICAgICAgICAuLi5vcHRpb25zLFxyXG4gICAgICAgICAgICBwcm92aWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIC4uLm9wdGlvbnMucHJvdmlkZXJzLFxyXG4gICAgICAgICAgICAgICAgLi4uT2JqZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgLmtleXMoZGVmYXVsdE9wdGlvbnMucHJvdmlkZXJzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jb25jYXQoT2JqZWN0LmtleXMob3B0aW9ucy5wcm92aWRlcnMgfHwge30pKVxyXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKGtleSkgPT4gb3B0aW9ucy5wcm92aWRlcnMgJiYgb3B0aW9ucy5wcm92aWRlcnNba2V5XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHsgW2tleV06IHsgLi4uZGVmYXVsdE9wdGlvbnMucHJvdmlkZXJzW2tleV0sIC4uLm9wdGlvbnMucHJvdmlkZXJzW2tleV0gfSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogeyBba2V5XTogZGVmYXVsdE9wdGlvbnMucHJvdmlkZXJzW2tleV0gfSlcclxuICAgICAgICAgICAgICAgICAgICAucmVkdWNlKChhY2MsIG5leHQpID0+ICh7IC4uLmFjYywgLi4ubmV4dCB9KSwge30pLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0gYXMgSUNvbmZpZ09wdGlvbnM7XHJcbiAgICB9XHJcbn1cclxuIl19