import { ConfigService } from './config.service';
import { SharedService } from './shared.service';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
export declare class JwtInterceptor implements HttpInterceptor {
    private shared;
    private config;
    constructor(shared: SharedService, config: ConfigService);
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
}
