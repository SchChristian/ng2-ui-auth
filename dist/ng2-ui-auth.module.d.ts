/**
 * Created by Ron on 25/12/2015.
 */
import { ConfigService, IPartialConfigOptions, CONFIG_OPTIONS, IProviders, IOauth2Options, IOauth1Options, ConfigOptions } from './config.service';
import { SharedService } from './shared.service';
import { OauthService } from './oauth.service';
import { PopupService } from './popup.service';
import { Oauth1Service } from './oauth1.service';
import { Oauth2Service } from './oauth2.service';
import { LocalService } from './local.service';
import { AuthService } from './auth.service';
import { JwtInterceptor } from './interceptor.service';
import { StorageService, BrowserStorageService } from './storage.service';
import { ModuleWithProviders } from '@angular/core';
import { StorageType } from './storage-type.enum';
export declare class Ng2UiAuthModule {
    static forRoot(configOptions?: ConfigOptions, defaultJwtInterceptor?: boolean): ModuleWithProviders;
}
export { LocalService, Oauth2Service, Oauth1Service, PopupService, OauthService, SharedService, StorageService, BrowserStorageService, AuthService, ConfigService, IPartialConfigOptions, JwtInterceptor, CONFIG_OPTIONS, IProviders, IOauth2Options, IOauth1Options, StorageType, };
