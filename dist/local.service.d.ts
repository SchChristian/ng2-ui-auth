import { SharedService } from './shared.service';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
/**
 * Created by Ron on 17/12/2015.
 */
export declare class LocalService {
    private http;
    private shared;
    private config;
    constructor(http: HttpClient, shared: SharedService, config: ConfigService);
    login<T extends string | object>(user: string | object, url?: string): Observable<T>;
    signup<T = any>(user: string | object, url?: string): Observable<T>;
}
