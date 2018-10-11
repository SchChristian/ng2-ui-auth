/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { LOCAL_STORAGE } from './storage-type.enum';
/** @typedef {?} */
var ConfigOptions;
export { ConfigOptions };
/** @type {?} */
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
        /** @type {?} */
        let optionObj;
        if (typeof options === 'function') {
            optionObj = options();
        }
        else {
            optionObj = options;
        }
        this.options = /** @type {?} */ (Object.assign({}, defaultOptions, optionObj, { providers: Object.assign({}, optionObj.providers, Object
                .keys(defaultOptions.providers)
                .concat(Object.keys(optionObj.providers || {}))
                .map((key) => optionObj.providers && optionObj.providers[key]
                ? { [key]: Object.assign({}, defaultOptions.providers[key], optionObj.providers[key]) }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItdWktYXV0aC8iLCJzb3VyY2VzIjpbImNvbmZpZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkUsT0FBTyxFQUFlLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7OztBQVFqRSxhQUFhLGNBQWMsR0FBRyxJQUFJLGNBQWMsQ0FBTSxnQkFBZ0IsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBOEV4RSxhQUFhLGNBQWMsR0FBbUI7SUFDMUMsZUFBZSxFQUFFLEtBQUs7SUFDdEIsU0FBUyxFQUFFLElBQUk7SUFDZixPQUFPLEVBQUUsR0FBRztJQUNaLFFBQVEsRUFBRSxhQUFhO0lBQ3ZCLFNBQVMsRUFBRSxjQUFjO0lBQ3pCLFNBQVMsRUFBRSxlQUFlO0lBQzFCLFNBQVMsRUFBRSxPQUFPO0lBQ2xCLGNBQWMsRUFBRSxHQUFHO0lBQ25CLFdBQVcsRUFBRSxhQUFhO0lBQzFCLFVBQVUsRUFBRSxlQUFlO0lBQzNCLFNBQVMsRUFBRSxRQUFRO0lBQ25CLFdBQVcsRUFBRSxhQUFhO0lBQzFCLE9BQU8sRUFBRSxJQUFJO0lBQ2IsWUFBWSxFQUFFLENBQUMsUUFBYSxFQUFFLE1BQXNCLEVBQUUsRUFBRTs7UUFDcEQsTUFBTSxXQUFXLEdBQTBELFFBQVE7WUFDL0UsQ0FBQyxRQUFRLENBQUMsWUFBWSxJQUFJLFFBQVEsQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxXQUFXLEVBQUU7O1lB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QUFNO1lBQ0gsU0FBUyxHQUFHLE9BQU8sQ0FBQztTQUN2QjtRQUNELElBQUksQ0FBQyxPQUFPLHFCQUFHLGtCQUNSLGNBQWMsRUFDZCxTQUFTLElBQ1osU0FBUyxvQkFDRixTQUFTLENBQUMsU0FBUyxFQUNuQixNQUFNO2lCQUNKLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDO2lCQUM5QixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2lCQUM5QyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUM7Z0JBQ3pELENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLG9CQUFPLGNBQWMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUssU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBRSxFQUFFO2dCQUM5RSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztpQkFDOUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsbUJBQU0sR0FBRyxFQUFLLElBQUksRUFBRyxFQUFFLEVBQUUsQ0FBQyxJQUUxQyxDQUFBLENBQUM7S0FDdkI7OztZQXpCSixVQUFVOzs7OzRDQUlNLE1BQU0sU0FBQyxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdG9yYWdlVHlwZSwgTE9DQUxfU1RPUkFHRSB9IGZyb20gJy4vc3RvcmFnZS10eXBlLmVudW0nO1xyXG5pbXBvcnQgeyBJUGFydGlhbENvbmZpZ09wdGlvbnMgfSBmcm9tICcuL25nMi11aS1hdXRoLm1vZHVsZSc7XHJcblxyXG4vKipcclxuICogQ3JlYXRlZCBieSBSb24gb24gMTcvMTIvMjAxNS5cclxuICovXHJcbmV4cG9ydCB0eXBlIENvbmZpZ09wdGlvbnMgPSBJUGFydGlhbENvbmZpZ09wdGlvbnMgfCBGdW5jdGlvbjtcclxuXHJcbmV4cG9ydCBjb25zdCBDT05GSUdfT1BUSU9OUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxhbnk+KCdjb25maWcub3B0aW9ucycpO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUG9wdXBPcHRpb25zIHtcclxuICAgIHdpZHRoPzogbnVtYmVyO1xyXG4gICAgaGVpZ2h0PzogbnVtYmVyO1xyXG4gICAgbGVmdD86IG51bWJlcjtcclxuICAgIHRvcD86IG51bWJlcjtcclxuICAgIHZpc2libGVUb29sYmFyPzogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJT2F1dGgxT3B0aW9ucyB7XHJcbiAgICB1cmw/OiBzdHJpbmc7XHJcbiAgICBuYW1lPzogc3RyaW5nO1xyXG4gICAgcmVkaXJlY3RVcmk/OiBzdHJpbmc7XHJcbiAgICBwb3B1cE9wdGlvbnM/OiBJUG9wdXBPcHRpb25zO1xyXG4gICAgYXV0aG9yaXphdGlvbkVuZHBvaW50Pzogc3RyaW5nO1xyXG4gICAgb2F1dGhUeXBlPzogJzEuMCc7XHJcbiAgICBtZXRob2Q/OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU9hdXRoMk9wdGlvbnMge1xyXG4gICAgdXJsPzogc3RyaW5nO1xyXG4gICAgbmFtZT86IHN0cmluZztcclxuICAgIHJlZGlyZWN0VXJpPzogc3RyaW5nO1xyXG4gICAgcG9wdXBPcHRpb25zPzogSVBvcHVwT3B0aW9ucztcclxuICAgIGF1dGhvcml6YXRpb25FbmRwb2ludD86IHN0cmluZztcclxuICAgIG9hdXRoVHlwZT86ICcyLjAnO1xyXG4gICAgbWV0aG9kPzogc3RyaW5nO1xyXG4gICAgcmVzcG9uc2VUeXBlPzogc3RyaW5nO1xyXG4gICAgY2xpZW50SWQ/OiBzdHJpbmc7XHJcbiAgICBhZGRpdGlvbmFsVXJsUGFyYW1zPzoge1xyXG4gICAgICAgIFtwYXJhbU5hbWU6IHN0cmluZ106IHN0cmluZyB8ICgoKSA9PiBzdHJpbmcpIHwgbnVsbCB8IHVuZGVmaW5lZDtcclxuICAgIH07XHJcbiAgICBzY29wZURlbGltaXRlcj86IHN0cmluZztcclxuICAgIHNjb3BlPzogc3RyaW5nW107XHJcbiAgICBzdGF0ZT86IHN0cmluZyB8ICgoKSA9PiBzdHJpbmcpO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElQcm92aWRlcnMge1xyXG4gICAgW3Byb3ZpZGVyOiBzdHJpbmddOiBJT2F1dGgyT3B0aW9ucyB8IElPYXV0aDFPcHRpb25zO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElDb25maWdPcHRpb25zIHtcclxuICAgIHRva2VuUm9vdDogc3RyaW5nIHwgbnVsbDtcclxuICAgIGNvcmRvdmE6IGJvb2xlYW4gfCBudWxsO1xyXG4gICAgYmFzZVVybDogc3RyaW5nO1xyXG4gICAgbG9naW5Vcmw6IHN0cmluZztcclxuICAgIHNpZ251cFVybDogc3RyaW5nO1xyXG4gICAgdW5saW5rVXJsOiBzdHJpbmc7XHJcbiAgICB0b2tlbk5hbWU6IHN0cmluZztcclxuICAgIHRva2VuU2VwYXJhdG9yOiBzdHJpbmc7XHJcbiAgICB0b2tlblByZWZpeDogc3RyaW5nO1xyXG4gICAgYXV0aFRva2VuOiBzdHJpbmc7XHJcbiAgICBhdXRoSGVhZGVyOiBzdHJpbmc7XHJcbiAgICBzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGU7XHJcbiAgICBwcm92aWRlcnM6IElQcm92aWRlcnM7XHJcbiAgICB3aXRoQ3JlZGVudGlhbHM6IGJvb2xlYW47XHJcbiAgICByZXNvbHZlVG9rZW46IChyZXNwb25zZTogYW55LCBjb25maWc6IElDb25maWdPcHRpb25zKSA9PiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVBhcnRpYWxDb25maWdPcHRpb25zIHsgLy8gPSBQYXJ0aWFsPElDb25maWdPcHRpb25zXHJcbiAgICB0b2tlblJvb3Q/OiBzdHJpbmcgfCBudWxsO1xyXG4gICAgY29yZG92YT86IGJvb2xlYW4gfCBudWxsO1xyXG4gICAgYmFzZVVybD86IHN0cmluZztcclxuICAgIGxvZ2luVXJsPzogc3RyaW5nO1xyXG4gICAgc2lnbnVwVXJsPzogc3RyaW5nO1xyXG4gICAgdW5saW5rVXJsPzogc3RyaW5nO1xyXG4gICAgdG9rZW5OYW1lPzogc3RyaW5nO1xyXG4gICAgdG9rZW5TZXBhcmF0b3I/OiBzdHJpbmc7XHJcbiAgICB0b2tlblByZWZpeD86IHN0cmluZztcclxuICAgIGF1dGhUb2tlbj86IHN0cmluZztcclxuICAgIGF1dGhIZWFkZXI/OiBzdHJpbmc7XHJcbiAgICBzdG9yYWdlVHlwZT86IFN0b3JhZ2VUeXBlO1xyXG4gICAgcHJvdmlkZXJzPzogSVByb3ZpZGVycztcclxuICAgIHdpdGhDcmVkZW50aWFscz86IGJvb2xlYW47XHJcbiAgICByZXNvbHZlVG9rZW4/OiAocmVzcG9uc2U6IGFueSwgY29uZmlnOiBJQ29uZmlnT3B0aW9ucykgPT4gc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZGVmYXVsdE9wdGlvbnM6IElDb25maWdPcHRpb25zID0ge1xyXG4gICAgd2l0aENyZWRlbnRpYWxzOiBmYWxzZSxcclxuICAgIHRva2VuUm9vdDogbnVsbCxcclxuICAgIGJhc2VVcmw6ICcvJyxcclxuICAgIGxvZ2luVXJsOiAnL2F1dGgvbG9naW4nLFxyXG4gICAgc2lnbnVwVXJsOiAnL2F1dGgvc2lnbnVwJyxcclxuICAgIHVubGlua1VybDogJy9hdXRoL3VubGluay8nLFxyXG4gICAgdG9rZW5OYW1lOiAndG9rZW4nLFxyXG4gICAgdG9rZW5TZXBhcmF0b3I6ICdfJyxcclxuICAgIHRva2VuUHJlZml4OiAnbmcyLXVpLWF1dGgnLFxyXG4gICAgYXV0aEhlYWRlcjogJ0F1dGhvcml6YXRpb24nLFxyXG4gICAgYXV0aFRva2VuOiAnQmVhcmVyJyxcclxuICAgIHN0b3JhZ2VUeXBlOiBMT0NBTF9TVE9SQUdFLFxyXG4gICAgY29yZG92YTogbnVsbCxcclxuICAgIHJlc29sdmVUb2tlbjogKHJlc3BvbnNlOiBhbnksIGNvbmZpZzogSUNvbmZpZ09wdGlvbnMpID0+IHtcclxuICAgICAgICBjb25zdCBhY2Nlc3NUb2tlbjogc3RyaW5nIHwgeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSB8IG51bGwgfCB1bmRlZmluZWQgPSByZXNwb25zZSAmJlxyXG4gICAgICAgICAgICAocmVzcG9uc2UuYWNjZXNzX3Rva2VuIHx8IHJlc3BvbnNlLnRva2VuIHx8IHJlc3BvbnNlLmRhdGEpO1xyXG4gICAgICAgIGlmICghYWNjZXNzVG9rZW4pIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS53YXJuKCdObyB0b2tlbiBmb3VuZCcpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBhY2Nlc3NUb2tlbiA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFjY2Vzc1Rva2VuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGFjY2Vzc1Rva2VuICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLndhcm4oJ05vIHRva2VuIGZvdW5kJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB0b2tlblJvb3REYXRhID0gY29uZmlnLnRva2VuUm9vdCAmJiBjb25maWcudG9rZW5Sb290XHJcbiAgICAgICAgICAgIC5zcGxpdCgnLicpXHJcbiAgICAgICAgICAgIC5yZWR1Y2UoXHJcbiAgICAgICAgICAgIChvOiBhbnksIHg6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9beF07XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGFjY2Vzc1Rva2VuKTtcclxuICAgICAgICBjb25zdCB0b2tlbiA9IHRva2VuUm9vdERhdGEgPyB0b2tlblJvb3REYXRhW2NvbmZpZy50b2tlbk5hbWVdIDogYWNjZXNzVG9rZW5bY29uZmlnLnRva2VuTmFtZV07XHJcbiAgICAgICAgaWYgKHRva2VuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0b2tlbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc3QgdG9rZW5QYXRoID0gdGhpcy50b2tlblJvb3QgPyB0aGlzLnRva2VuUm9vdCArICcuJyArIHRoaXMudG9rZW5OYW1lIDogdGhpcy50b2tlbk5hbWU7XHJcbiAgICAgICAgLy8gY29uc29sZS53YXJuKCdFeHBlY3RpbmcgYSB0b2tlbiBuYW1lZCBcIicgKyB0b2tlblBhdGgpO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfSxcclxuICAgIHByb3ZpZGVyczoge1xyXG4gICAgICAgIGZhY2Vib29rOiB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdmYWNlYm9vaycsXHJcbiAgICAgICAgICAgIHVybDogJy9hdXRoL2ZhY2Vib29rJyxcclxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL3YyLjUvZGlhbG9nL29hdXRoJyxcclxuICAgICAgICAgICAgYWRkaXRpb25hbFVybFBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ3BvcHVwJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2NvcGU6IFsnZW1haWwnXSxcclxuICAgICAgICAgICAgc2NvcGVEZWxpbWl0ZXI6ICcsJyxcclxuICAgICAgICAgICAgb2F1dGhUeXBlOiAnMi4wJyxcclxuICAgICAgICAgICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA1ODAsIGhlaWdodDogNDAwIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnb29nbGU6IHtcclxuICAgICAgICAgICAgbmFtZTogJ2dvb2dsZScsXHJcbiAgICAgICAgICAgIHVybDogJy9hdXRoL2dvb2dsZScsXHJcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9vL29hdXRoMi9hdXRoJyxcclxuICAgICAgICAgICAgYWRkaXRpb25hbFVybFBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgJ2Rpc3BsYXknOiAncG9wdXAnLFxyXG4gICAgICAgICAgICAgICAgJ3Byb21wdCc6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICdsb2dpbl9oaW50JzogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgJ2FjY2Vzc190eXBlJzogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgJ2luY2x1ZGVfZ3JhbnRlZF9zY29wZXMnOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAnb3BlbmlkLnJlYWxtJzogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgJ2hkJzogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzY29wZTogWydvcGVuaWQnLCAncHJvZmlsZScsICdlbWFpbCddLFxyXG4gICAgICAgICAgICBzY29wZURlbGltaXRlcjogJyAnLFxyXG4gICAgICAgICAgICBvYXV0aFR5cGU6ICcyLjAnLFxyXG4gICAgICAgICAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDQ1MiwgaGVpZ2h0OiA2MzMgfSxcclxuICAgICAgICAgICAgc3RhdGU6ICgpID0+IGVuY29kZVVSSUNvbXBvbmVudChNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMikpLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2l0aHViOiB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdnaXRodWInLFxyXG4gICAgICAgICAgICB1cmw6ICcvYXV0aC9naXRodWInLFxyXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2dpdGh1Yi5jb20vbG9naW4vb2F1dGgvYXV0aG9yaXplJyxcclxuICAgICAgICAgICAgc2NvcGU6IFsndXNlcjplbWFpbCddLFxyXG4gICAgICAgICAgICBzY29wZURlbGltaXRlcjogJyAnLFxyXG4gICAgICAgICAgICBvYXV0aFR5cGU6ICcyLjAnLFxyXG4gICAgICAgICAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDEwMjAsIGhlaWdodDogNjE4IH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbnN0YWdyYW06IHtcclxuICAgICAgICAgICAgbmFtZTogJ2luc3RhZ3JhbScsXHJcbiAgICAgICAgICAgIHVybDogJy9hdXRoL2luc3RhZ3JhbScsXHJcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vYXBpLmluc3RhZ3JhbS5jb20vb2F1dGgvYXV0aG9yaXplJyxcclxuICAgICAgICAgICAgc2NvcGU6IFsnYmFzaWMnXSxcclxuICAgICAgICAgICAgc2NvcGVEZWxpbWl0ZXI6ICcrJyxcclxuICAgICAgICAgICAgb2F1dGhUeXBlOiAnMi4wJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxpbmtlZGluOiB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdsaW5rZWRpbicsXHJcbiAgICAgICAgICAgIHVybDogJy9hdXRoL2xpbmtlZGluJyxcclxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Vhcy9vYXV0aDIvYXV0aG9yaXphdGlvbicsXHJcbiAgICAgICAgICAgIHNjb3BlOiBbJ3JfZW1haWxhZGRyZXNzJ10sXHJcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyOiAnICcsXHJcbiAgICAgICAgICAgIG9hdXRoVHlwZTogJzIuMCcsXHJcbiAgICAgICAgICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNTI3LCBoZWlnaHQ6IDU4MiB9LFxyXG4gICAgICAgICAgICBzdGF0ZTogJ1NUQVRFJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHR3aXR0ZXI6IHtcclxuICAgICAgICAgICAgbmFtZTogJ3R3aXR0ZXInLFxyXG4gICAgICAgICAgICB1cmw6ICcvYXV0aC90d2l0dGVyJyxcclxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9hcGkudHdpdHRlci5jb20vb2F1dGgvYXV0aGVudGljYXRlJyxcclxuICAgICAgICAgICAgb2F1dGhUeXBlOiAnMS4wJyxcclxuICAgICAgICAgICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA0OTUsIGhlaWdodDogNjQ1IH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0d2l0Y2g6IHtcclxuICAgICAgICAgICAgbmFtZTogJ3R3aXRjaCcsXHJcbiAgICAgICAgICAgIHVybDogJy9hdXRoL3R3aXRjaCcsXHJcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vYXBpLnR3aXRjaC50di9rcmFrZW4vb2F1dGgyL2F1dGhvcml6ZScsXHJcbiAgICAgICAgICAgIHNjb3BlOiBbJ3VzZXJfcmVhZCddLFxyXG4gICAgICAgICAgICBzY29wZURlbGltaXRlcjogJyAnLFxyXG4gICAgICAgICAgICBhZGRpdGlvbmFsVXJsUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAncG9wdXAnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvYXV0aFR5cGU6ICcyLjAnLFxyXG4gICAgICAgICAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDUwMCwgaGVpZ2h0OiA1NjAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxpdmU6IHtcclxuICAgICAgICAgICAgbmFtZTogJ2xpdmUnLFxyXG4gICAgICAgICAgICB1cmw6ICcvYXV0aC9saXZlJyxcclxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9sb2dpbi5saXZlLmNvbS9vYXV0aDIwX2F1dGhvcml6ZS5zcmYnLFxyXG4gICAgICAgICAgICBhZGRpdGlvbmFsVXJsUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAncG9wdXAnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzY29wZTogWyd3bC5lbWFpbHMnXSxcclxuICAgICAgICAgICAgc2NvcGVEZWxpbWl0ZXI6ICcgJyxcclxuICAgICAgICAgICAgb2F1dGhUeXBlOiAnMi4wJyxcclxuICAgICAgICAgICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA1MDAsIGhlaWdodDogNTYwIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICB5YWhvbzoge1xyXG4gICAgICAgICAgICBuYW1lOiAneWFob28nLFxyXG4gICAgICAgICAgICB1cmw6ICcvYXV0aC95YWhvbycsXHJcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vYXBpLmxvZ2luLnlhaG9vLmNvbS9vYXV0aDIvcmVxdWVzdF9hdXRoJyxcclxuICAgICAgICAgICAgc2NvcGU6IFtdLFxyXG4gICAgICAgICAgICBzY29wZURlbGltaXRlcjogJywnLFxyXG4gICAgICAgICAgICBvYXV0aFR5cGU6ICcyLjAnLFxyXG4gICAgICAgICAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDU1OSwgaGVpZ2h0OiA1MTkgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpdGJ1Y2tldDoge1xyXG4gICAgICAgICAgICBuYW1lOiAnYml0YnVja2V0JyxcclxuICAgICAgICAgICAgdXJsOiAnL2F1dGgvYml0YnVja2V0JyxcclxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9iaXRidWNrZXQub3JnL3NpdGUvb2F1dGgyL2F1dGhvcml6ZScsXHJcbiAgICAgICAgICAgIHNjb3BlOiBbJ2VtYWlsJ10sXHJcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyOiAnLCcsXHJcbiAgICAgICAgICAgIG9hdXRoVHlwZTogJzIuMCcsXHJcbiAgICAgICAgICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogMTAyOCwgaGVpZ2h0OiA1MjkgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNwb3RpZnk6IHtcclxuICAgICAgICAgICAgbmFtZTogJ3Nwb3RpZnknLFxyXG4gICAgICAgICAgICB1cmw6ICcvYXV0aC9zcG90aWZ5JyxcclxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9hY2NvdW50cy5zcG90aWZ5LmNvbS9hdXRob3JpemUnLFxyXG4gICAgICAgICAgICBzY29wZTogWycnLCAndXNlci1yZWFkLWVtYWlsJ10sXHJcbiAgICAgICAgICAgIHNjb3BlRGVsaW1pdGVyOiAnLCcsXHJcbiAgICAgICAgICAgIG9hdXRoVHlwZTogJzIuMCcsXHJcbiAgICAgICAgICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNTAwLCBoZWlnaHQ6IDUzMCB9LFxyXG4gICAgICAgICAgICBzdGF0ZTogKCkgPT4gZW5jb2RlVVJJQ29tcG9uZW50KE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyKSksXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbn07XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDb25maWdTZXJ2aWNlIHtcclxuICAgIHB1YmxpYyBvcHRpb25zOiBJQ29uZmlnT3B0aW9ucztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KENPTkZJR19PUFRJT05TKSBvcHRpb25zOiBJUGFydGlhbENvbmZpZ09wdGlvbnMgfCBGdW5jdGlvbikge1xyXG4gICAgICAgIGxldCBvcHRpb25PYmo6IElQYXJ0aWFsQ29uZmlnT3B0aW9ucztcclxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgb3B0aW9uT2JqID0gb3B0aW9ucygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG9wdGlvbk9iaiA9IG9wdGlvbnM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgLi4uZGVmYXVsdE9wdGlvbnMsXHJcbiAgICAgICAgICAgIC4uLm9wdGlvbk9iaixcclxuICAgICAgICAgICAgcHJvdmlkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAuLi5vcHRpb25PYmoucHJvdmlkZXJzLFxyXG4gICAgICAgICAgICAgICAgLi4uT2JqZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgLmtleXMoZGVmYXVsdE9wdGlvbnMucHJvdmlkZXJzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jb25jYXQoT2JqZWN0LmtleXMob3B0aW9uT2JqLnByb3ZpZGVycyB8fCB7fSkpXHJcbiAgICAgICAgICAgICAgICAgICAgLm1hcCgoa2V5KSA9PiBvcHRpb25PYmoucHJvdmlkZXJzICYmIG9wdGlvbk9iai5wcm92aWRlcnNba2V5XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHsgW2tleV06IHsgLi4uZGVmYXVsdE9wdGlvbnMucHJvdmlkZXJzW2tleV0sIC4uLm9wdGlvbk9iai5wcm92aWRlcnNba2V5XSB9IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgOiB7IFtrZXldOiBkZWZhdWx0T3B0aW9ucy5wcm92aWRlcnNba2V5XSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZWR1Y2UoKGFjYywgbmV4dCkgPT4gKHsgLi4uYWNjLCAuLi5uZXh0IH0pLCB7fSksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSBhcyBJQ29uZmlnT3B0aW9ucztcclxuICAgIH1cclxufVxyXG4iXX0=