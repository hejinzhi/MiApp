import { Injectable } from '@angular/core';

@Injectable()
export class CacheService {
  cache:Object ={};
  constructor() {  }

  get(comName:string, key:string) {
    if(this.cache[comName] && this.cache[comName][key]) {
      let data = JSON.parse(JSON.stringify(this.cache[comName][key]));
      return data;
    } else {
      return null
    }
  }

  update(comName:string, key:string,newVal:any) {
    this.cache[comName] = this.cache[comName] || {};
    this.cache[comName][key]= JSON.parse(JSON.stringify(newVal));
  }

  clear(comName:string) {
    delete this.cache[comName];
  }
}
