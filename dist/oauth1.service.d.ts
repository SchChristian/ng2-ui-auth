import { IOauthService } from './oauth-service.interface';
import { PopupService } from './popup.service';
import { ConfigService, IOauth1Options } from './config.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
/**
 * Created by Ron on 17/12/2015.
 */
export declare class Oauth1Service implements IOauthService {
    private http;
    private popup;
    private config;
    constructor(http: HttpClient, popup: PopupService, config: ConfigService);
    open<T extends object | string = any>(oauthOptions: IOauth1Options, userData: object): Observable<T>;
    private exchangeForToken;
}
