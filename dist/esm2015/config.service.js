/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { LOCAL_STORAGE } from './storage-type.enum';
/** @type {?} */
export const CONFIG_OPTIONS = new InjectionToken('config.options');
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
export const defaultOptions = {
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
export class ConfigService {
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
if (false) {
    /** @type {?} */
    ConfigService.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItdWktYXV0aC8iLCJzb3VyY2VzIjpbImNvbmZpZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkUsT0FBTyxFQUFlLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDOztBQVFqRSxNQUFNLE9BQU8sY0FBYyxHQUFHLElBQUksY0FBYyxDQUFNLGdCQUFnQixDQUFDOzs7O0FBRXZFLG1DQU1DOzs7SUFMRyw4QkFBZTs7SUFDZiwrQkFBZ0I7O0lBQ2hCLDZCQUFjOztJQUNkLDRCQUFhOztJQUNiLHVDQUF5Qjs7Ozs7QUFHN0Isb0NBUUM7OztJQVBHLDZCQUFhOztJQUNiLDhCQUFjOztJQUNkLHFDQUFxQjs7SUFDckIsc0NBQTZCOztJQUM3QiwrQ0FBK0I7O0lBQy9CLG1DQUFrQjs7SUFDbEIsZ0NBQWdCOzs7OztBQUdwQixvQ0FnQkM7OztJQWZHLDZCQUFhOztJQUNiLDhCQUFjOztJQUNkLHFDQUFxQjs7SUFDckIsc0NBQTZCOztJQUM3QiwrQ0FBK0I7O0lBQy9CLG1DQUFrQjs7SUFDbEIsZ0NBQWdCOztJQUNoQixzQ0FBc0I7O0lBQ3RCLGtDQUFrQjs7SUFDbEIsNkNBRUU7O0lBQ0Ysd0NBQXdCOztJQUN4QiwrQkFBaUI7O0lBQ2pCLCtCQUFnQzs7Ozs7QUFHcEMsZ0NBRUM7Ozs7QUFFRCxvQ0FnQkM7OztJQWZHLG1DQUF5Qjs7SUFDekIsaUNBQXdCOztJQUN4QixpQ0FBZ0I7O0lBQ2hCLGtDQUFpQjs7SUFDakIsbUNBQWtCOztJQUNsQixtQ0FBa0I7O0lBQ2xCLG1DQUFrQjs7SUFDbEIsd0NBQXVCOztJQUN2QixxQ0FBb0I7O0lBQ3BCLG1DQUFrQjs7SUFDbEIsb0NBQW1COztJQUNuQixxQ0FBeUI7O0lBQ3pCLG1DQUFzQjs7SUFDdEIseUNBQXlCOztJ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QztpQkFDOUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUMsQ0FBQztpQkFDOUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDO2dCQUN6RCxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxvQkFBTyxjQUFjLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFLLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUUsRUFBRTtnQkFDOUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxjQUFjLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7aUJBQzlDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLG1CQUFNLEdBQUcsRUFBSyxJQUFJLEVBQUcsRUFBRSxFQUFFLENBQUMsTUFFMUMsQ0FBQztJQUN4QixDQUFDOzs7WUF6QkosVUFBVTs7Ozs0Q0FJTSxNQUFNLFNBQUMsY0FBYzs7OztJQUZsQyxnQ0FBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN0b3JhZ2VUeXBlLCBMT0NBTF9TVE9SQUdFIH0gZnJvbSAnLi9zdG9yYWdlLXR5cGUuZW51bSc7XHJcbmltcG9ydCB7IElQYXJ0aWFsQ29uZmlnT3B0aW9ucyB9IGZyb20gJy4vbmcyLXVpLWF1dGgubW9kdWxlJztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFJvbiBvbiAxNy8xMi8yMDE1LlxyXG4gKi9cclxuZXhwb3J0IHR5cGUgQ29uZmlnT3B0aW9ucyA9IElQYXJ0aWFsQ29uZmlnT3B0aW9ucyB8IEZ1bmN0aW9uO1xyXG5cclxuZXhwb3J0IGNvbnN0IENPTkZJR19PUFRJT05TID0gbmV3IEluamVjdGlvblRva2VuPGFueT4oJ2NvbmZpZy5vcHRpb25zJyk7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElQb3B1cE9wdGlvbnMge1xyXG4gICAgd2lkdGg/OiBudW1iZXI7XHJcbiAgICBoZWlnaHQ/OiBudW1iZXI7XHJcbiAgICBsZWZ0PzogbnVtYmVyO1xyXG4gICAgdG9wPzogbnVtYmVyO1xyXG4gICAgdmlzaWJsZVRvb2xiYXI/OiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElPYXV0aDFPcHRpb25zIHtcclxuICAgIHVybD86IHN0cmluZztcclxuICAgIG5hbWU/OiBzdHJpbmc7XHJcbiAgICByZWRpcmVjdFVyaT86IHN0cmluZztcclxuICAgIHBvcHVwT3B0aW9ucz86IElQb3B1cE9wdGlvbnM7XHJcbiAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ/OiBzdHJpbmc7XHJcbiAgICBvYXV0aFR5cGU/OiAnMS4wJztcclxuICAgIG1ldGhvZD86IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJT2F1dGgyT3B0aW9ucyB7XHJcbiAgICB1cmw/OiBzdHJpbmc7XHJcbiAgICBuYW1lPzogc3RyaW5nO1xyXG4gICAgcmVkaXJlY3RVcmk/OiBzdHJpbmc7XHJcbiAgICBwb3B1cE9wdGlvbnM/OiBJUG9wdXBPcHRpb25zO1xyXG4gICAgYXV0aG9yaXphdGlvbkVuZHBvaW50Pzogc3RyaW5nO1xyXG4gICAgb2F1dGhUeXBlPzogJzIuMCc7XHJcbiAgICBtZXRob2Q/OiBzdHJpbmc7XHJcbiAgICByZXNwb25zZVR5cGU/OiBzdHJpbmc7XHJcbiAgICBjbGllbnRJZD86IHN0cmluZztcclxuICAgIGFkZGl0aW9uYWxVcmxQYXJhbXM/OiB7XHJcbiAgICAgICAgW3BhcmFtTmFtZTogc3RyaW5nXTogc3RyaW5nIHwgKCgpID0+IHN0cmluZykgfCBudWxsIHwgdW5kZWZpbmVkO1xyXG4gICAgfTtcclxuICAgIHNjb3BlRGVsaW1pdGVyPzogc3RyaW5nO1xyXG4gICAgc2NvcGU/OiBzdHJpbmdbXTtcclxuICAgIHN0YXRlPzogc3RyaW5nIHwgKCgpID0+IHN0cmluZyk7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVByb3ZpZGVycyB7XHJcbiAgICBbcHJvdmlkZXI6IHN0cmluZ106IElPYXV0aDJPcHRpb25zIHwgSU9hdXRoMU9wdGlvbnM7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUNvbmZpZ09wdGlvbnMge1xyXG4gICAgdG9rZW5Sb290OiBzdHJpbmcgfCBudWxsO1xyXG4gICAgY29yZG92YTogYm9vbGVhbiB8IG51bGw7XHJcbiAgICBiYXNlVXJsOiBzdHJpbmc7XHJcbiAgICBsb2dpblVybDogc3RyaW5nO1xyXG4gICAgc2lnbnVwVXJsOiBzdHJpbmc7XHJcbiAgICB1bmxpbmtVcmw6IHN0cmluZztcclxuICAgIHRva2VuTmFtZTogc3RyaW5nO1xyXG4gICAgdG9rZW5TZXBhcmF0b3I6IHN0cmluZztcclxuICAgIHRva2VuUHJlZml4OiBzdHJpbmc7XHJcbiAgICBhdXRoVG9rZW46IHN0cmluZztcclxuICAgIGF1dGhIZWFkZXI6IHN0cmluZztcclxuICAgIHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZTtcclxuICAgIHByb3ZpZGVyczogSVByb3ZpZGVycztcclxuICAgIHdpdGhDcmVkZW50aWFsczogYm9vbGVhbjtcclxuICAgIHJlc29sdmVUb2tlbjogKHJlc3BvbnNlOiBhbnksIGNvbmZpZzogSUNvbmZpZ09wdGlvbnMpID0+IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUGFydGlhbENvbmZpZ09wdGlvbnMgeyAvLyA9IFBhcnRpYWw8SUNvbmZpZ09wdGlvbnNcclxuICAgIHRva2VuUm9vdD86IHN0cmluZyB8IG51bGw7XHJcbiAgICBjb3Jkb3ZhPzogYm9vbGVhbiB8IG51bGw7XHJcbiAgICBiYXNlVXJsPzogc3RyaW5nO1xyXG4gICAgbG9naW5Vcmw/OiBzdHJpbmc7XHJcbiAgICBzaWdudXBVcmw/OiBzdHJpbmc7XHJcbiAgICB1bmxpbmtVcmw/OiBzdHJpbmc7XHJcbiAgICB0b2tlbk5hbWU/OiBzdHJpbmc7XHJcbiAgICB0b2tlblNlcGFyYXRvcj86IHN0cmluZztcclxuICAgIHRva2VuUHJlZml4Pzogc3RyaW5nO1xyXG4gICAgYXV0aFRva2VuPzogc3RyaW5nO1xyXG4gICAgYXV0aEhlYWRlcj86IHN0cmluZztcclxuICAgIHN0b3JhZ2VUeXBlPzogU3RvcmFnZVR5cGU7XHJcbiAgICBwcm92aWRlcnM/OiBJUHJvdmlkZXJzO1xyXG4gICAgd2l0aENyZWRlbnRpYWxzPzogYm9vbGVhbjtcclxuICAgIHJlc29sdmVUb2tlbj86IChyZXNwb25zZTogYW55LCBjb25maWc6IElDb25maWdPcHRpb25zKSA9PiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBkZWZhdWx0T3B0aW9uczogSUNvbmZpZ09wdGlvbnMgPSB7XHJcbiAgICB3aXRoQ3JlZGVudGlhbHM6IGZhbHNlLFxyXG4gICAgdG9rZW5Sb290OiBudWxsLFxyXG4gICAgYmFzZVVybDogJy8nLFxyXG4gICAgbG9naW5Vcmw6ICcvYXV0aC9sb2dpbicsXHJcbiAgICBzaWdudXBVcmw6ICcvYXV0aC9zaWdudXAnLFxyXG4gICAgdW5saW5rVXJsOiAnL2F1dGgvdW5saW5rLycsXHJcbiAgICB0b2tlbk5hbWU6ICd0b2tlbicsXHJcbiAgICB0b2tlblNlcGFyYXRvcjogJ18nLFxyXG4gICAgdG9rZW5QcmVmaXg6ICduZzItdWktYXV0aCcsXHJcbiAgICBhdXRoSGVhZGVyOiAnQXV0aG9yaXphdGlvbicsXHJcbiAgICBhdXRoVG9rZW46ICdCZWFyZXInLFxyXG4gICAgc3RvcmFnZVR5cGU6IExPQ0FMX1NUT1JBR0UsXHJcbiAgICBjb3Jkb3ZhOiBudWxsLFxyXG4gICAgcmVzb2x2ZVRva2VuOiAocmVzcG9uc2U6IGFueSwgY29uZmlnOiBJQ29uZmlnT3B0aW9ucykgPT4ge1xyXG4gICAgICAgIGNvbnN0IGFjY2Vzc1Rva2VuOiBzdHJpbmcgfCB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9IHwgbnVsbCB8IHVuZGVmaW5lZCA9IHJlc3BvbnNlICYmXHJcbiAgICAgICAgICAgIChyZXNwb25zZS5hY2Nlc3NfdG9rZW4gfHwgcmVzcG9uc2UudG9rZW4gfHwgcmVzcG9uc2UuZGF0YSk7XHJcbiAgICAgICAgaWYgKCFhY2Nlc3NUb2tlbikge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLndhcm4oJ05vIHRva2VuIGZvdW5kJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGFjY2Vzc1Rva2VuID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjZXNzVG9rZW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgYWNjZXNzVG9rZW4gIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUud2FybignTm8gdG9rZW4gZm91bmQnKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHRva2VuUm9vdERhdGEgPSBjb25maWcudG9rZW5Sb290ICYmIGNvbmZpZy50b2tlblJvb3RcclxuICAgICAgICAgICAgLnNwbGl0KCcuJylcclxuICAgICAgICAgICAgLnJlZHVjZShcclxuICAgICAgICAgICAgKG86IGFueSwgeDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb1t4XTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYWNjZXNzVG9rZW4pO1xyXG4gICAgICAgIGNvbnN0IHRva2VuID0gdG9rZW5Sb290RGF0YSA/IHRva2VuUm9vdERhdGFbY29uZmlnLnRva2VuTmFtZV0gOiBhY2Nlc3NUb2tlbltjb25maWcudG9rZW5OYW1lXTtcclxuICAgICAgICBpZiAodG9rZW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zdCB0b2tlblBhdGggPSB0aGlzLnRva2VuUm9vdCA/IHRoaXMudG9rZW5Sb290ICsgJy4nICsgdGhpcy50b2tlbk5hbWUgOiB0aGlzLnRva2VuTmFtZTtcclxuICAgICAgICAvLyBjb25zb2xlLndhcm4oJ0V4cGVjdGluZyBhIHRva2VuIG5hbWVkIFwiJyArIHRva2VuUGF0aCk7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG4gICAgcHJvdmlkZXJzOiB7XHJcbiAgICAgICAgZmFjZWJvb2s6IHtcclxuICAgICAgICAgICAgbmFtZTogJ2ZhY2Vib29rJyxcclxuICAgICAgICAgICAgdXJsOiAnL2F1dGgvZmFjZWJvb2snLFxyXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL3d3dy5mYWNlYm9vay5jb20vdjIuNS9kaWFsb2cvb2F1dGgnLFxyXG4gICAgICAgICAgICBhZGRpdGlvbmFsVXJsUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAncG9wdXAnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzY29wZTogWydlbWFpbCddLFxyXG4gICAgICAgICAgICBzY29wZURlbGltaXRlcjogJywnLFxyXG4gICAgICAgICAgICBvYXV0aFR5cGU6ICcyLjAnLFxyXG4gICAgICAgICAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDU4MCwgaGVpZ2h0OiA0MDAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdvb2dsZToge1xyXG4gICAgICAgICAgICBuYW1lOiAnZ29vZ2xlJyxcclxuICAgICAgICAgICAgdXJsOiAnL2F1dGgvZ29vZ2xlJyxcclxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tL28vb2F1dGgyL2F1dGgnLFxyXG4gICAgICAgICAgICBhZGRpdGlvbmFsVXJsUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAnZGlzcGxheSc6ICdwb3B1cCcsXHJcbiAgICAgICAgICAgICAgICAncHJvbXB0JzogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgJ2xvZ2luX2hpbnQnOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAnYWNjZXNzX3R5cGUnOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAnaW5jbHVkZV9ncmFudGVkX3Njb3Blcyc6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICdvcGVuaWQucmVhbG0nOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAnaGQnOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNjb3BlOiBbJ29wZW5pZCcsICdwcm9maWxlJywgJ2VtYWlsJ10sXHJcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyOiAnICcsXHJcbiAgICAgICAgICAgIG9hdXRoVHlwZTogJzIuMCcsXHJcbiAgICAgICAgICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNDUyLCBoZWlnaHQ6IDYzMyB9LFxyXG4gICAgICAgICAgICBzdGF0ZTogKCkgPT4gZW5jb2RlVVJJQ29tcG9uZW50KE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyKSksXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnaXRodWI6IHtcclxuICAgICAgICAgICAgbmFtZTogJ2dpdGh1YicsXHJcbiAgICAgICAgICAgIHVybDogJy9hdXRoL2dpdGh1YicsXHJcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vZ2l0aHViLmNvbS9sb2dpbi9vYXV0aC9hdXRob3JpemUnLFxyXG4gICAgICAgICAgICBzY29wZTogWyd1c2VyOmVtYWlsJ10sXHJcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyOiAnICcsXHJcbiAgICAgICAgICAgIG9hdXRoVHlwZTogJzIuMCcsXHJcbiAgICAgICAgICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogMTAyMCwgaGVpZ2h0OiA2MTggfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGluc3RhZ3JhbToge1xyXG4gICAgICAgICAgICBuYW1lOiAnaW5zdGFncmFtJyxcclxuICAgICAgICAgICAgdXJsOiAnL2F1dGgvaW5zdGFncmFtJyxcclxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9hcGkuaW5zdGFncmFtLmNvbS9vYXV0aC9hdXRob3JpemUnLFxyXG4gICAgICAgICAgICBzY29wZTogWydiYXNpYyddLFxyXG4gICAgICAgICAgICBzY29wZURlbGltaXRlcjogJysnLFxyXG4gICAgICAgICAgICBvYXV0aFR5cGU6ICcyLjAnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGlua2VkaW46IHtcclxuICAgICAgICAgICAgbmFtZTogJ2xpbmtlZGluJyxcclxuICAgICAgICAgICAgdXJsOiAnL2F1dGgvbGlua2VkaW4nLFxyXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL3d3dy5saW5rZWRpbi5jb20vdWFzL29hdXRoMi9hdXRob3JpemF0aW9uJyxcclxuICAgICAgICAgICAgc2NvcGU6IFsncl9lbWFpbGFkZHJlc3MnXSxcclxuICAgICAgICAgICAgc2NvcGVEZWxpbWl0ZXI6ICcgJyxcclxuICAgICAgICAgICAgb2F1dGhUeXBlOiAnMi4wJyxcclxuICAgICAgICAgICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA1MjcsIGhlaWdodDogNTgyIH0sXHJcbiAgICAgICAgICAgIHN0YXRlOiAnU1RBVEUnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdHdpdHRlcjoge1xyXG4gICAgICAgICAgICBuYW1lOiAndHdpdHRlcicsXHJcbiAgICAgICAgICAgIHVybDogJy9hdXRoL3R3aXR0ZXInLFxyXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2FwaS50d2l0dGVyLmNvbS9vYXV0aC9hdXRoZW50aWNhdGUnLFxyXG4gICAgICAgICAgICBvYXV0aFR5cGU6ICcxLjAnLFxyXG4gICAgICAgICAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDQ5NSwgaGVpZ2h0OiA2NDUgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHR3aXRjaDoge1xyXG4gICAgICAgICAgICBuYW1lOiAndHdpdGNoJyxcclxuICAgICAgICAgICAgdXJsOiAnL2F1dGgvdHdpdGNoJyxcclxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9hcGkudHdpdGNoLnR2L2tyYWtlbi9vYXV0aDIvYXV0aG9yaXplJyxcclxuICAgICAgICAgICAgc2NvcGU6IFsndXNlcl9yZWFkJ10sXHJcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyOiAnICcsXHJcbiAgICAgICAgICAgIGFkZGl0aW9uYWxVcmxQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdwb3B1cCcsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9hdXRoVHlwZTogJzIuMCcsXHJcbiAgICAgICAgICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNTAwLCBoZWlnaHQ6IDU2MCB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGl2ZToge1xyXG4gICAgICAgICAgICBuYW1lOiAnbGl2ZScsXHJcbiAgICAgICAgICAgIHVybDogJy9hdXRoL2xpdmUnLFxyXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2xvZ2luLmxpdmUuY29tL29hdXRoMjBfYXV0aG9yaXplLnNyZicsXHJcbiAgICAgICAgICAgIGFkZGl0aW9uYWxVcmxQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdwb3B1cCcsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNjb3BlOiBbJ3dsLmVtYWlscyddLFxyXG4gICAgICAgICAgICBzY29wZURlbGltaXRlcjogJyAnLFxyXG4gICAgICAgICAgICBvYXV0aFR5cGU6ICcyLjAnLFxyXG4gICAgICAgICAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDUwMCwgaGVpZ2h0OiA1NjAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHlhaG9vOiB7XHJcbiAgICAgICAgICAgIG5hbWU6ICd5YWhvbycsXHJcbiAgICAgICAgICAgIHVybDogJy9hdXRoL3lhaG9vJyxcclxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9hcGkubG9naW4ueWFob28uY29tL29hdXRoMi9yZXF1ZXN0X2F1dGgnLFxyXG4gICAgICAgICAgICBzY29wZTogW10sXHJcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyOiAnLCcsXHJcbiAgICAgICAgICAgIG9hdXRoVHlwZTogJzIuMCcsXHJcbiAgICAgICAgICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNTU5LCBoZWlnaHQ6IDUxOSB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYml0YnVja2V0OiB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdiaXRidWNrZXQnLFxyXG4gICAgICAgICAgICB1cmw6ICcvYXV0aC9iaXRidWNrZXQnLFxyXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2JpdGJ1Y2tldC5vcmcvc2l0ZS9vYXV0aDIvYXV0aG9yaXplJyxcclxuICAgICAgICAgICAgc2NvcGU6IFsnZW1haWwnXSxcclxuICAgICAgICAgICAgc2NvcGVEZWxpbWl0ZXI6ICcsJyxcclxuICAgICAgICAgICAgb2F1dGhUeXBlOiAnMi4wJyxcclxuICAgICAgICAgICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiAxMDI4LCBoZWlnaHQ6IDUyOSB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3BvdGlmeToge1xyXG4gICAgICAgICAgICBuYW1lOiAnc3BvdGlmeScsXHJcbiAgICAgICAgICAgIHVybDogJy9hdXRoL3Nwb3RpZnknLFxyXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2FjY291bnRzLnNwb3RpZnkuY29tL2F1dGhvcml6ZScsXHJcbiAgICAgICAgICAgIHNjb3BlOiBbJycsICd1c2VyLXJlYWQtZW1haWwnXSxcclxuICAgICAgICAgICAgc2NvcGVEZWxpbWl0ZXI6ICcsJyxcclxuICAgICAgICAgICAgb2F1dGhUeXBlOiAnMi4wJyxcclxuICAgICAgICAgICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA1MDAsIGhlaWdodDogNTMwIH0sXHJcbiAgICAgICAgICAgIHN0YXRlOiAoKSA9PiBlbmNvZGVVUklDb21wb25lbnQoTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIpKSxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxufTtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENvbmZpZ1NlcnZpY2Uge1xyXG4gICAgcHVibGljIG9wdGlvbnM6IElDb25maWdPcHRpb25zO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoQ09ORklHX09QVElPTlMpIG9wdGlvbnM6IElQYXJ0aWFsQ29uZmlnT3B0aW9ucyB8IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgbGV0IG9wdGlvbk9iajogSVBhcnRpYWxDb25maWdPcHRpb25zO1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICBvcHRpb25PYmogPSBvcHRpb25zKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb3B0aW9uT2JqID0gb3B0aW9ucztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0ge1xyXG4gICAgICAgICAgICAuLi5kZWZhdWx0T3B0aW9ucyxcclxuICAgICAgICAgICAgLi4ub3B0aW9uT2JqLFxyXG4gICAgICAgICAgICBwcm92aWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIC4uLm9wdGlvbk9iai5wcm92aWRlcnMsXHJcbiAgICAgICAgICAgICAgICAuLi5PYmplY3RcclxuICAgICAgICAgICAgICAgICAgICAua2V5cyhkZWZhdWx0T3B0aW9ucy5wcm92aWRlcnMpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNvbmNhdChPYmplY3Qua2V5cyhvcHRpb25PYmoucHJvdmlkZXJzIHx8IHt9KSlcclxuICAgICAgICAgICAgICAgICAgICAubWFwKChrZXkpID0+IG9wdGlvbk9iai5wcm92aWRlcnMgJiYgb3B0aW9uT2JqLnByb3ZpZGVyc1trZXldXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8geyBba2V5XTogeyAuLi5kZWZhdWx0T3B0aW9ucy5wcm92aWRlcnNba2V5XSwgLi4ub3B0aW9uT2JqLnByb3ZpZGVyc1trZXldIH0gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHsgW2tleV06IGRlZmF1bHRPcHRpb25zLnByb3ZpZGVyc1trZXldIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlZHVjZSgoYWNjLCBuZXh0KSA9PiAoeyAuLi5hY2MsIC4uLm5leHQgfSksIHt9KSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9IGFzIElDb25maWdPcHRpb25zO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==