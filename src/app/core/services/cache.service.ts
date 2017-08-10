import { Injectable } from '@angular/core';

@Injectable()
export class CacheService {
  cache:Object ={};
  constructor() {  }

  get(comName:string, key:string) {
    return this.cache[comName]? this.cache[comName][key]: null;
  }

  update(comName:string, key:string,newVal:any) {
    this.cache[comName] = this.cache[comName] || {};
    this.cache[comName][key]= newVal;
  }

  clear(comName:string) {
    delete this.cache[comName];
  }
}
