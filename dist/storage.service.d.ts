import { ConfigService } from './config.service';
import { StorageType } from './storage-type.enum';
export declare abstract class StorageService {
    abstract updateStorageType(storageType: StorageType): boolean;
    abstract get(key: string): string;
    abstract set(key: string, value: string, date: string): void;
    abstract remove(key: string): void;
}
/**
 * Created by Ron on 17/12/2015.
 */
export declare class BrowserStorageService extends StorageService {
    private config;
    private store;
    private storageType;
    constructor(config: ConfigService);
    updateStorageType(storageType: StorageType): boolean;
    get(key: string): string;
    set(key: string, value: string, date: string): void;
    remove(key: string): void;
    private checkIsStorageAvailable;
    private isWindowStorageAvailable;
    private isCookieStorageAvailable;
    private setCookie;
    private removeCookie;
    private getCookie;
}
