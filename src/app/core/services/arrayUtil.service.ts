import { Injectable } from '@angular/core';

@Injectable()
export class ArrayUtilService {

    constructor() { }

    // 去掉数组重复的元素
    unique(arr: any[]) {
        let result = [], hash = {};
        for (let i = 0, elem; (elem = arr[i]) != null; i++) {
            if (!hash[elem]) {
                result.push(elem);
                hash[elem] = true;
            }
        }
        return result;
    }
}