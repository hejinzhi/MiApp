import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

    constructor() { }

    setItem(key: string, data: any) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    getItem(key: string) {
        return JSON.parse(localStorage.getItem(key));
    }
}