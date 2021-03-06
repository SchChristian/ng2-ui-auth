/**
 * Created by Ron on 17/12/2015.
 */
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { StorageService } from './storage.service';
import { StorageType } from './storage-type.enum';
/**
 * Created by Ron on 17/12/2015.
 */
export declare class SharedService {
    private storage;
    private config;
    tokenName: string;
    constructor(storage: StorageService, config: ConfigService);
    getToken(): string;
    getPayload(token?: string): any;
    setToken(response: string | object): void;
    removeToken(): void;
    isAuthenticated(token?: string): boolean;
    getExpirationDate(token?: string): Date;
    logout(): Observable<any>;
    setStorageType(type: StorageType): boolean;
    private b64DecodeUnicode;
}
