import { IOauthService } from './oauth-service.interface';
import { Observable } from 'rxjs';
import { ConfigService, IOauth2Options } from './config.service';
import { PopupService } from './popup.service';
import { HttpClient } from '@angular/common/http';
/**
 * Created by Ron on 17/12/2015.
 */
export declare class Oauth2Service implements IOauthService {
    private http;
    private popup;
    private config;
    constructor(http: HttpClient, popup: PopupService, config: ConfigService);
    open<T extends object | string = any>(oauthOptions: IOauth2Options, userData: object): Observable<T>;
    private exchangeForToken;
    private getAuthorizationData;
}
