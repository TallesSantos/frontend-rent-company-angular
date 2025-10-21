import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    saveInLocalStorage<T>(key: string, value: T) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    getFromLocalStorage(key: string) {
        const objStr = sessionStorage.getItem(key);
        if (objStr) {
            return (objStr);
        }
        throw new Error('Parsing Error');
    }

    removeOfLocalStorage(key: string) {
        if (sessionStorage.getItem(key)) {
            sessionStorage.removeItem(key);
        }
    }
}
