/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { LOCAL_STORAGE } from './storage-type.enum';
/** *
 * Created by Ron on 17/12/2015.
  @type {?} */
export const CONFIG_OPTIONS = new InjectionToken('config.options');
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
if (false) {
    /** @type {?} */
    ConfigService.prototype.options;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItdWktYXV0aC8iLCJzb3VyY2VzIjpbImNvbmZpZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkUsT0FBTyxFQUFlLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7O0FBTWpFLGFBQWEsY0FBYyxHQUFHLElBQUksY0FBYyxDQUFNLGdCQUFnQixDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE4RXhFLGFBQWEsY0FBYyxHQUFtQjtJQUMxQyxlQUFlLEVBQUUsS0FBSztJQUN0QixTQUFTLEVBQUUsSUFBSTtJQUNmLE9BQU8sRUFBRSxHQUFHO0lBQ1osUUFBUSxFQUFFLGFBQWE7SUFDdkIsU0FBUyxFQUFFLGNBQWM7SUFDekIsU0FBUyxFQUFFLGVBQWU7SUFDMUIsU0FBUyxFQUFFLE9BQU87SUFDbEIsY0FBYyxFQUFFLEdBQUc7SUFDbkIsV0FBVyxFQUFFLGFBQWE7SUFDMUIsVUFBVSxFQUFFLGVBQWU7SUFDM0IsU0FBUyxFQUFFLFFBQVE7SUFDbkIsV0FBVyxFQUFFLGFBQWE7SUFDMUIsT0FBTyxFQUFFLElBQUk7SUFDYixZQUFZLEVBQUUsQ0FBQyxRQUFhLEVBQUUsTUFBc0IsRUFBRSxFQUFFOztRQUNwRCxNQUFNLFdBQVcsR0FBMEQsUUFBUTtZQUMvRSxDQUFDLFFBQVEsQ0FBQyxZQUFZLElBQUksUUFBUSxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLFdBQVcsRUFBRTs7WUFF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QUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDO2lCQUM5QixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2lCQUM1QyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUM7Z0JBQ3JELENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLG9CQUFPLGNBQWMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUssT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBRSxFQUFFO2dCQUM1RSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztpQkFDOUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsbUJBQU0sR0FBRyxFQUFLLElBQUksRUFBRyxFQUFFLEVBQUUsQ0FBQyxJQUUxQyxDQUFBLENBQUM7S0FDdkI7OztZQW5CSixVQUFVOzs7OzRDQUlNLE1BQU0sU0FBQyxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdG9yYWdlVHlwZSwgTE9DQUxfU1RPUkFHRSB9IGZyb20gJy4vc3RvcmFnZS10eXBlLmVudW0nO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgUm9uIG9uIDE3LzEyLzIwMTUuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNvbnN0IENPTkZJR19PUFRJT05TID0gbmV3IEluamVjdGlvblRva2VuPGFueT4oJ2NvbmZpZy5vcHRpb25zJyk7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElQb3B1cE9wdGlvbnMge1xyXG4gICAgd2lkdGg/OiBudW1iZXI7XHJcbiAgICBoZWlnaHQ/OiBudW1iZXI7XHJcbiAgICBsZWZ0PzogbnVtYmVyO1xyXG4gICAgdG9wPzogbnVtYmVyO1xyXG4gICAgdmlzaWJsZVRvb2xiYXI/OiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElPYXV0aDFPcHRpb25zIHtcclxuICAgIHVybD86IHN0cmluZztcclxuICAgIG5hbWU/OiBzdHJpbmc7XHJcbiAgICByZWRpcmVjdFVyaT86IHN0cmluZztcclxuICAgIHBvcHVwT3B0aW9ucz86IElQb3B1cE9wdGlvbnM7XHJcbiAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ/OiBzdHJpbmc7XHJcbiAgICBvYXV0aFR5cGU/OiAnMS4wJztcclxuICAgIG1ldGhvZD86IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJT2F1dGgyT3B0aW9ucyB7XHJcbiAgICB1cmw/OiBzdHJpbmc7XHJcbiAgICBuYW1lPzogc3RyaW5nO1xyXG4gICAgcmVkaXJlY3RVcmk/OiBzdHJpbmc7XHJcbiAgICBwb3B1cE9wdGlvbnM/OiBJUG9wdXBPcHRpb25zO1xyXG4gICAgYXV0aG9yaXphdGlvbkVuZHBvaW50Pzogc3RyaW5nO1xyXG4gICAgb2F1dGhUeXBlPzogJzIuMCc7XHJcbiAgICBtZXRob2Q/OiBzdHJpbmc7XHJcbiAgICByZXNwb25zZVR5cGU/OiBzdHJpbmc7XHJcbiAgICBjbGllbnRJZD86IHN0cmluZztcclxuICAgIGFkZGl0aW9uYWxVcmxQYXJhbXM/OiB7XHJcbiAgICAgICAgW3BhcmFtTmFtZTogc3RyaW5nXTogc3RyaW5nIHwgKCgpID0+IHN0cmluZykgfCBudWxsIHwgdW5kZWZpbmVkO1xyXG4gICAgfTtcclxuICAgIHNjb3BlRGVsaW1pdGVyPzogc3RyaW5nO1xyXG4gICAgc2NvcGU/OiBzdHJpbmdbXTtcclxuICAgIHN0YXRlPzogc3RyaW5nIHwgKCgpID0+IHN0cmluZyk7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVByb3ZpZGVycyB7XHJcbiAgICBbcHJvdmlkZXI6IHN0cmluZ106IElPYXV0aDJPcHRpb25zIHwgSU9hdXRoMU9wdGlvbnM7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUNvbmZpZ09wdGlvbnMge1xyXG4gICAgdG9rZW5Sb290OiBzdHJpbmcgfCBudWxsO1xyXG4gICAgY29yZG92YTogYm9vbGVhbiB8IG51bGw7XHJcbiAgICBiYXNlVXJsOiBzdHJpbmc7XHJcbiAgICBsb2dpblVybDogc3RyaW5nO1xyXG4gICAgc2lnbnVwVXJsOiBzdHJpbmc7XHJcbiAgICB1bmxpbmtVcmw6IHN0cmluZztcclxuICAgIHRva2VuTmFtZTogc3RyaW5nO1xyXG4gICAgdG9rZW5TZXBhcmF0b3I6IHN0cmluZztcclxuICAgIHRva2VuUHJlZml4OiBzdHJpbmc7XHJcbiAgICBhdXRoVG9rZW46IHN0cmluZztcclxuICAgIGF1dGhIZWFkZXI6IHN0cmluZztcclxuICAgIHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZTtcclxuICAgIHByb3ZpZGVyczogSVByb3ZpZGVycztcclxuICAgIHdpdGhDcmVkZW50aWFsczogYm9vbGVhbjtcclxuICAgIHJlc29sdmVUb2tlbjogKHJlc3BvbnNlOiBhbnksIGNvbmZpZzogSUNvbmZpZ09wdGlvbnMpID0+IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUGFydGlhbENvbmZpZ09wdGlvbnMgeyAvLyA9IFBhcnRpYWw8SUNvbmZpZ09wdGlvbnNcclxuICAgIHRva2VuUm9vdD86IHN0cmluZyB8IG51bGw7XHJcbiAgICBjb3Jkb3ZhPzogYm9vbGVhbiB8IG51bGw7XHJcbiAgICBiYXNlVXJsPzogc3RyaW5nO1xyXG4gICAgbG9naW5Vcmw/OiBzdHJpbmc7XHJcbiAgICBzaWdudXBVcmw/OiBzdHJpbmc7XHJcbiAgICB1bmxpbmtVcmw/OiBzdHJpbmc7XHJcbiAgICB0b2tlbk5hbWU/OiBzdHJpbmc7XHJcbiAgICB0b2tlblNlcGFyYXRvcj86IHN0cmluZztcclxuICAgIHRva2VuUHJlZml4Pzogc3RyaW5nO1xyXG4gICAgYXV0aFRva2VuPzogc3RyaW5nO1xyXG4gICAgYXV0aEhlYWRlcj86IHN0cmluZztcclxuICAgIHN0b3JhZ2VUeXBlPzogU3RvcmFnZVR5cGU7XHJcbiAgICBwcm92aWRlcnM/OiBJUHJvdmlkZXJzO1xyXG4gICAgd2l0aENyZWRlbnRpYWxzPzogYm9vbGVhbjtcclxuICAgIHJlc29sdmVUb2tlbj86IChyZXNwb25zZTogYW55LCBjb25maWc6IElDb25maWdPcHRpb25zKSA9PiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBkZWZhdWx0T3B0aW9uczogSUNvbmZpZ09wdGlvbnMgPSB7XHJcbiAgICB3aXRoQ3JlZGVudGlhbHM6IGZhbHNlLFxyXG4gICAgdG9rZW5Sb290OiBudWxsLFxyXG4gICAgYmFzZVVybDogJy8nLFxyXG4gICAgbG9naW5Vcmw6ICcvYXV0aC9sb2dpbicsXHJcbiAgICBzaWdudXBVcmw6ICcvYXV0aC9zaWdudXAnLFxyXG4gICAgdW5saW5rVXJsOiAnL2F1dGgvdW5saW5rLycsXHJcbiAgICB0b2tlbk5hbWU6ICd0b2tlbicsXHJcbiAgICB0b2tlblNlcGFyYXRvcjogJ18nLFxyXG4gICAgdG9rZW5QcmVmaXg6ICduZzItdWktYXV0aCcsXHJcbiAgICBhdXRoSGVhZGVyOiAnQXV0aG9yaXphdGlvbicsXHJcbiAgICBhdXRoVG9rZW46ICdCZWFyZXInLFxyXG4gICAgc3RvcmFnZVR5cGU6IExPQ0FMX1NUT1JBR0UsXHJcbiAgICBjb3Jkb3ZhOiBudWxsLFxyXG4gICAgcmVzb2x2ZVRva2VuOiAocmVzcG9uc2U6IGFueSwgY29uZmlnOiBJQ29uZmlnT3B0aW9ucykgPT4ge1xyXG4gICAgICAgIGNvbnN0IGFjY2Vzc1Rva2VuOiBzdHJpbmcgfCB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9IHwgbnVsbCB8IHVuZGVmaW5lZCA9IHJlc3BvbnNlICYmXHJcbiAgICAgICAgICAgIChyZXNwb25zZS5hY2Nlc3NfdG9rZW4gfHwgcmVzcG9uc2UudG9rZW4gfHwgcmVzcG9uc2UuZGF0YSk7XHJcbiAgICAgICAgaWYgKCFhY2Nlc3NUb2tlbikge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLndhcm4oJ05vIHRva2VuIGZvdW5kJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGFjY2Vzc1Rva2VuID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjZXNzVG9rZW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgYWNjZXNzVG9rZW4gIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUud2FybignTm8gdG9rZW4gZm91bmQnKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHRva2VuUm9vdERhdGEgPSBjb25maWcudG9rZW5Sb290ICYmIGNvbmZpZy50b2tlblJvb3RcclxuICAgICAgICAgICAgLnNwbGl0KCcuJylcclxuICAgICAgICAgICAgLnJlZHVjZShcclxuICAgICAgICAgICAgKG86IGFueSwgeDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb1t4XTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYWNjZXNzVG9rZW4pO1xyXG4gICAgICAgIGNvbnN0IHRva2VuID0gdG9rZW5Sb290RGF0YSA/IHRva2VuUm9vdERhdGFbY29uZmlnLnRva2VuTmFtZV0gOiBhY2Nlc3NUb2tlbltjb25maWcudG9rZW5OYW1lXTtcclxuICAgICAgICBpZiAodG9rZW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zdCB0b2tlblBhdGggPSB0aGlzLnRva2VuUm9vdCA/IHRoaXMudG9rZW5Sb290ICsgJy4nICsgdGhpcy50b2tlbk5hbWUgOiB0aGlzLnRva2VuTmFtZTtcclxuICAgICAgICAvLyBjb25zb2xlLndhcm4oJ0V4cGVjdGluZyBhIHRva2VuIG5hbWVkIFwiJyArIHRva2VuUGF0aCk7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG4gICAgcHJvdmlkZXJzOiB7XHJcbiAgICAgICAgZmFjZWJvb2s6IHtcclxuICAgICAgICAgICAgbmFtZTogJ2ZhY2Vib29rJyxcclxuICAgICAgICAgICAgdXJsOiAnL2F1dGgvZmFjZWJvb2snLFxyXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL3d3dy5mYWNlYm9vay5jb20vdjIuNS9kaWFsb2cvb2F1dGgnLFxyXG4gICAgICAgICAgICBhZGRpdGlvbmFsVXJsUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAncG9wdXAnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzY29wZTogWydlbWFpbCddLFxyXG4gICAgICAgICAgICBzY29wZURlbGltaXRlcjogJywnLFxyXG4gICAgICAgICAgICBvYXV0aFR5cGU6ICcyLjAnLFxyXG4gICAgICAgICAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDU4MCwgaGVpZ2h0OiA0MDAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdvb2dsZToge1xyXG4gICAgICAgICAgICBuYW1lOiAnZ29vZ2xlJyxcclxuICAgICAgICAgICAgdXJsOiAnL2F1dGgvZ29vZ2xlJyxcclxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tL28vb2F1dGgyL2F1dGgnLFxyXG4gICAgICAgICAgICBhZGRpdGlvbmFsVXJsUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAnZGlzcGxheSc6ICdwb3B1cCcsXHJcbiAgICAgICAgICAgICAgICAncHJvbXB0JzogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgJ2xvZ2luX2hpbnQnOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAnYWNjZXNzX3R5cGUnOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAnaW5jbHVkZV9ncmFudGVkX3Njb3Blcyc6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICdvcGVuaWQucmVhbG0nOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAnaGQnOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNjb3BlOiBbJ29wZW5pZCcsICdwcm9maWxlJywgJ2VtYWlsJ10sXHJcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyOiAnICcsXHJcbiAgICAgICAgICAgIG9hdXRoVHlwZTogJzIuMCcsXHJcbiAgICAgICAgICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNDUyLCBoZWlnaHQ6IDYzMyB9LFxyXG4gICAgICAgICAgICBzdGF0ZTogKCkgPT4gZW5jb2RlVVJJQ29tcG9uZW50KE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyKSksXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnaXRodWI6IHtcclxuICAgICAgICAgICAgbmFtZTogJ2dpdGh1YicsXHJcbiAgICAgICAgICAgIHVybDogJy9hdXRoL2dpdGh1YicsXHJcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vZ2l0aHViLmNvbS9sb2dpbi9vYXV0aC9hdXRob3JpemUnLFxyXG4gICAgICAgICAgICBzY29wZTogWyd1c2VyOmVtYWlsJ10sXHJcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyOiAnICcsXHJcbiAgICAgICAgICAgIG9hdXRoVHlwZTogJzIuMCcsXHJcbiAgICAgICAgICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogMTAyMCwgaGVpZ2h0OiA2MTggfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGluc3RhZ3JhbToge1xyXG4gICAgICAgICAgICBuYW1lOiAnaW5zdGFncmFtJyxcclxuICAgICAgICAgICAgdXJsOiAnL2F1dGgvaW5zdGFncmFtJyxcclxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9hcGkuaW5zdGFncmFtLmNvbS9vYXV0aC9hdXRob3JpemUnLFxyXG4gICAgICAgICAgICBzY29wZTogWydiYXNpYyddLFxyXG4gICAgICAgICAgICBzY29wZURlbGltaXRlcjogJysnLFxyXG4gICAgICAgICAgICBvYXV0aFR5cGU6ICcyLjAnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGlua2VkaW46IHtcclxuICAgICAgICAgICAgbmFtZTogJ2xpbmtlZGluJyxcclxuICAgICAgICAgICAgdXJsOiAnL2F1dGgvbGlua2VkaW4nLFxyXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL3d3dy5saW5rZWRpbi5jb20vdWFzL29hdXRoMi9hdXRob3JpemF0aW9uJyxcclxuICAgICAgICAgICAgc2NvcGU6IFsncl9lbWFpbGFkZHJlc3MnXSxcclxuICAgICAgICAgICAgc2NvcGVEZWxpbWl0ZXI6ICcgJyxcclxuICAgICAgICAgICAgb2F1dGhUeXBlOiAnMi4wJyxcclxuICAgICAgICAgICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA1MjcsIGhlaWdodDogNTgyIH0sXHJcbiAgICAgICAgICAgIHN0YXRlOiAnU1RBVEUnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdHdpdHRlcjoge1xyXG4gICAgICAgICAgICBuYW1lOiAndHdpdHRlcicsXHJcbiAgICAgICAgICAgIHVybDogJy9hdXRoL3R3aXR0ZXInLFxyXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2FwaS50d2l0dGVyLmNvbS9vYXV0aC9hdXRoZW50aWNhdGUnLFxyXG4gICAgICAgICAgICBvYXV0aFR5cGU6ICcxLjAnLFxyXG4gICAgICAgICAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDQ5NSwgaGVpZ2h0OiA2NDUgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHR3aXRjaDoge1xyXG4gICAgICAgICAgICBuYW1lOiAndHdpdGNoJyxcclxuICAgICAgICAgICAgdXJsOiAnL2F1dGgvdHdpdGNoJyxcclxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9hcGkudHdpdGNoLnR2L2tyYWtlbi9vYXV0aDIvYXV0aG9yaXplJyxcclxuICAgICAgICAgICAgc2NvcGU6IFsndXNlcl9yZWFkJ10sXHJcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyOiAnICcsXHJcbiAgICAgICAgICAgIGFkZGl0aW9uYWxVcmxQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdwb3B1cCcsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9hdXRoVHlwZTogJzIuMCcsXHJcbiAgICAgICAgICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNTAwLCBoZWlnaHQ6IDU2MCB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGl2ZToge1xyXG4gICAgICAgICAgICBuYW1lOiAnbGl2ZScsXHJcbiAgICAgICAgICAgIHVybDogJy9hdXRoL2xpdmUnLFxyXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2xvZ2luLmxpdmUuY29tL29hdXRoMjBfYXV0aG9yaXplLnNyZicsXHJcbiAgICAgICAgICAgIGFkZGl0aW9uYWxVcmxQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdwb3B1cCcsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNjb3BlOiBbJ3dsLmVtYWlscyddLFxyXG4gICAgICAgICAgICBzY29wZURlbGltaXRlcjogJyAnLFxyXG4gICAgICAgICAgICBvYXV0aFR5cGU6ICcyLjAnLFxyXG4gICAgICAgICAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDUwMCwgaGVpZ2h0OiA1NjAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHlhaG9vOiB7XHJcbiAgICAgICAgICAgIG5hbWU6ICd5YWhvbycsXHJcbiAgICAgICAgICAgIHVybDogJy9hdXRoL3lhaG9vJyxcclxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9hcGkubG9naW4ueWFob28uY29tL29hdXRoMi9yZXF1ZXN0X2F1dGgnLFxyXG4gICAgICAgICAgICBzY29wZTogW10sXHJcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyOiAnLCcsXHJcbiAgICAgICAgICAgIG9hdXRoVHlwZTogJzIuMCcsXHJcbiAgICAgICAgICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNTU5LCBoZWlnaHQ6IDUxOSB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYml0YnVja2V0OiB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdiaXRidWNrZXQnLFxyXG4gICAgICAgICAgICB1cmw6ICcvYXV0aC9iaXRidWNrZXQnLFxyXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2JpdGJ1Y2tldC5vcmcvc2l0ZS9vYXV0aDIvYXV0aG9yaXplJyxcclxuICAgICAgICAgICAgc2NvcGU6IFsnZW1haWwnXSxcclxuICAgICAgICAgICAgc2NvcGVEZWxpbWl0ZXI6ICcsJyxcclxuICAgICAgICAgICAgb2F1dGhUeXBlOiAnMi4wJyxcclxuICAgICAgICAgICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiAxMDI4LCBoZWlnaHQ6IDUyOSB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3BvdGlmeToge1xyXG4gICAgICAgICAgICBuYW1lOiAnc3BvdGlmeScsXHJcbiAgICAgICAgICAgIHVybDogJy9hdXRoL3Nwb3RpZnknLFxyXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2FjY291bnRzLnNwb3RpZnkuY29tL2F1dGhvcml6ZScsXHJcbiAgICAgICAgICAgIHNjb3BlOiBbJycsICd1c2VyLXJlYWQtZW1haWwnXSxcclxuICAgICAgICAgICAgc2NvcGVEZWxpbWl0ZXI6ICcsJyxcclxuICAgICAgICAgICAgb2F1dGhUeXBlOiAnMi4wJyxcclxuICAgICAgICAgICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA1MDAsIGhlaWdodDogNTMwIH0sXHJcbiAgICAgICAgICAgIHN0YXRlOiAoKSA9PiBlbmNvZGVVUklDb21wb25lbnQoTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIpKSxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxufTtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENvbmZpZ1NlcnZpY2Uge1xyXG4gICAgcHVibGljIG9wdGlvbnM6IElDb25maWdPcHRpb25zO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoQ09ORklHX09QVElPTlMpIG9wdGlvbnM6IElQYXJ0aWFsQ29uZmlnT3B0aW9ucykge1xyXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgLi4uZGVmYXVsdE9wdGlvbnMsXHJcbiAgICAgICAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICAgICAgICAgIHByb3ZpZGVyczoge1xyXG4gICAgICAgICAgICAgICAgLi4ub3B0aW9ucy5wcm92aWRlcnMsXHJcbiAgICAgICAgICAgICAgICAuLi5PYmplY3RcclxuICAgICAgICAgICAgICAgICAgICAua2V5cyhkZWZhdWx0T3B0aW9ucy5wcm92aWRlcnMpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNvbmNhdChPYmplY3Qua2V5cyhvcHRpb25zLnByb3ZpZGVycyB8fCB7fSkpXHJcbiAgICAgICAgICAgICAgICAgICAgLm1hcCgoa2V5KSA9PiBvcHRpb25zLnByb3ZpZGVycyAmJiBvcHRpb25zLnByb3ZpZGVyc1trZXldXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8geyBba2V5XTogeyAuLi5kZWZhdWx0T3B0aW9ucy5wcm92aWRlcnNba2V5XSwgLi4ub3B0aW9ucy5wcm92aWRlcnNba2V5XSB9IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgOiB7IFtrZXldOiBkZWZhdWx0T3B0aW9ucy5wcm92aWRlcnNba2V5XSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZWR1Y2UoKGFjYywgbmV4dCkgPT4gKHsgLi4uYWNjLCAuLi5uZXh0IH0pLCB7fSksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSBhcyBJQ29uZmlnT3B0aW9ucztcclxuICAgIH1cclxufVxyXG4iXX0=