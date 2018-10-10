/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ConfigService } from './config.service';
import { SharedService } from './shared.service';
import { Injectable } from '@angular/core';
var JwtInterceptor = /** @class */ (function () {
    function JwtInterceptor(shared, config) {
        this.shared = shared;
        this.config = config;
    }
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    JwtInterceptor.prototype.intercept = /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    function (req, next) {
        var _a;
        var _b = this.config.options, authHeader = _b.authHeader, authToken = _b.authToken;
        /** @type {?} */
        var token = this.shared.getToken();
        /** @type {?} */
        var isAuthenticated = this.shared.isAuthenticated;
        /** @type {?} */
        var newReq = isAuthenticated && !req.headers.has(authHeader)
            ? req.clone({ setHeaders: (_a = {}, _a[authHeader] = authToken + " " + token, _a) })
            : req;
        return next.handle(newReq);
    };
    JwtInterceptor.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    JwtInterceptor.ctorParameters = function () { return [
        { type: SharedService },
        { type: ConfigService }
    ]; };
    return JwtInterceptor;
}());
export { JwtInterceptor };
if (false) {
    /** @type {?} */
    JwtInterceptor.prototype.shared;
    /** @type {?} */
    JwtInterceptor.prototype.config;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJjZXB0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi11aS1hdXRoLyIsInNvdXJjZXMiOlsiaW50ZXJjZXB0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztJQU12Qyx3QkFDWSxRQUNBO1FBREEsV0FBTSxHQUFOLE1BQU07UUFDTixXQUFNLEdBQU4sTUFBTTtLQUNiOzs7Ozs7SUFFTCxrQ0FBUzs7Ozs7SUFBVCxVQUFVLEdBQXFCLEVBQUUsSUFBaUI7O1FBQzlDLDhCQUFRLDBCQUFVLEVBQUUsd0JBQVMsQ0FBeUI7O1FBQ3RELElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7O1FBQ3JDLElBQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDOztRQUNwRCxJQUFNLE1BQU0sR0FBRyxlQUFlLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUM7WUFDMUQsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxVQUFVLFlBQUksR0FBQyxVQUFVLElBQU0sU0FBUyxTQUFJLEtBQU8sS0FBRSxFQUFFLENBQUM7WUFDdEUsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUNWLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUM5Qjs7Z0JBZkosVUFBVTs7OztnQkFMRixhQUFhO2dCQURiLGFBQWE7O3lCQUF0Qjs7U0FPYSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4vY29uZmlnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTaGFyZWRTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQuc2VydmljZSc7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cEV2ZW50LCBIdHRwSW50ZXJjZXB0b3IsIEh0dHBIYW5kbGVyLCBIdHRwUmVxdWVzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSnd0SW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBzaGFyZWQ6IFNoYXJlZFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UsXHJcbiAgICApIHsgfVxyXG5cclxuICAgIGludGVyY2VwdChyZXE6IEh0dHBSZXF1ZXN0PGFueT4sIG5leHQ6IEh0dHBIYW5kbGVyKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xyXG4gICAgICAgIGNvbnN0IHsgYXV0aEhlYWRlciwgYXV0aFRva2VuIH0gPSB0aGlzLmNvbmZpZy5vcHRpb25zO1xyXG4gICAgICAgIGNvbnN0IHRva2VuID0gdGhpcy5zaGFyZWQuZ2V0VG9rZW4oKTtcclxuICAgICAgICBjb25zdCBpc0F1dGhlbnRpY2F0ZWQgPSB0aGlzLnNoYXJlZC5pc0F1dGhlbnRpY2F0ZWQ7XHJcbiAgICAgICAgY29uc3QgbmV3UmVxID0gaXNBdXRoZW50aWNhdGVkICYmICFyZXEuaGVhZGVycy5oYXMoYXV0aEhlYWRlcilcclxuICAgICAgICAgICAgPyByZXEuY2xvbmUoeyBzZXRIZWFkZXJzOiB7IFthdXRoSGVhZGVyXTogYCR7YXV0aFRva2VufSAke3Rva2VufWAgfSB9KVxyXG4gICAgICAgICAgICA6IHJlcTtcclxuICAgICAgICByZXR1cm4gbmV4dC5oYW5kbGUobmV3UmVxKTtcclxuICAgIH1cclxuXHJcbn0iXX0=