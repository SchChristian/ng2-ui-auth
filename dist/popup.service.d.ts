import { Observable } from 'rxjs';
import { IOauth2Options, IOauth1Options } from './config.service';
/**
 * Created by Ron on 17/12/2015.
 */
export declare class PopupService {
    open(url: string, options: IOauth2Options | IOauth1Options, cordova: boolean | null): Observable<any>;
    eventListener(popupWindow: Window, redirectUri: string): Observable<any>;
    pollPopup(popupWindow: Window, redirectUri: string): Observable<any>;
    private prepareOptions;
    private stringifyOptions;
    private parseQueryString;
    private isCordovaApp;
}
