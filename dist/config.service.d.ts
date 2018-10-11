import { InjectionToken } from '@angular/core';
import { StorageType } from './storage-type.enum';
import { IPartialConfigOptions } from './ng2-ui-auth.module';
/**
 * Created by Ron on 17/12/2015.
 */
export declare type ConfigOptions = IPartialConfigOptions | Function;
export declare const CONFIG_OPTIONS: InjectionToken<any>;
export interface IPopupOptions {
    width?: number;
    height?: number;
    left?: number;
    top?: number;
    visibleToolbar?: boolean;
}
export interface IOauth1Options {
    url?: string;
    name?: string;
    redirectUri?: string;
    popupOptions?: IPopupOptions;
    authorizationEndpoint?: string;
    oauthType?: '1.0';
    method?: string;
}
export interface IOauth2Options {
    url?: string;
    name?: string;
    redirectUri?: string;
    popupOptions?: IPopupOptions;
    authorizationEndpoint?: string;
    oauthType?: '2.0';
    method?: string;
    responseType?: string;
    clientId?: string;
    additionalUrlParams?: {
        [paramName: string]: string | (() => string) | null | undefined;
    };
    scopeDelimiter?: string;
    scope?: string[];
    state?: string | (() => string);
}
export interface IProviders {
    [provider: string]: IOauth2Options | IOauth1Options;
}
export interface IConfigOptions {
    tokenRoot: string | null;
    cordova: boolean | null;
    baseUrl: string;
    loginUrl: string;
    signupUrl: string;
    unlinkUrl: string;
    tokenName: string;
    tokenSeparator: string;
    tokenPrefix: string;
    authToken: string;
    authHeader: string;
    storageType: StorageType;
    providers: IProviders;
    withCredentials: boolean;
    resolveToken: (response: any, config: IConfigOptions) => string;
}
export interface IPartialConfigOptions {
    tokenRoot?: string | null;
    cordova?: boolean | null;
    baseUrl?: string;
    loginUrl?: string;
    signupUrl?: string;
    unlinkUrl?: string;
    tokenName?: string;
    tokenSeparator?: string;
    tokenPrefix?: string;
    authToken?: string;
    authHeader?: string;
    storageType?: StorageType;
    providers?: IProviders;
    withCredentials?: boolean;
    resolveToken?: (response: any, config: IConfigOptions) => string;
}
export declare const defaultOptions: IConfigOptions;
export declare class ConfigService {
    options: IConfigOptions;
    constructor(options: IPartialConfigOptions | Function);
}
