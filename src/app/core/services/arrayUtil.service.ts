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

    // 判断obj是否存在于数组中
    contains(arr: string[], obj: string) {
        var i = arr.length;
        while (i--) {
            if (arr[i] === obj) {
                return true;
            }
        }
        return false;
    }
}