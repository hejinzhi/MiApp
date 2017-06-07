import { Injectable } from '@angular/core';

import { MyHttpService } from '../../../core/services/myHttp.service';
import { ContactConfig } from '../../config/contact.config';


@Injectable()
export class ContactService {

    constructor(private myHttp: MyHttpService) { }

    // public moveAppToMorePage(moduleID) {
    //     return this.myHttp.post(ApplicationConfig.updateModuleDisplayUrl + `?moduleID=${moduleID}&display=N`, {});
    // }

    // public moveItemToAppPage(moduleID) {
    //     return this.myHttp.post(ApplicationConfig.updateModuleDisplayUrl + `?moduleID=${moduleID}&display=Y`, {});
    // }
    public getSameDeptPerson() {
        return this.myHttp.get(ContactConfig.getSameDeptPersonUrl);
    }

    public getDeptInfo(site: string) {
        return this.myHttp.get(ContactConfig.getDeptInfoUrl + `?site=${site}`);
    }

    public getPersonByDept(deptno: string) {
        return this.myHttp.get(ContactConfig.getPersonByDeptUrl + `deptno=${deptno}`);
    }

    public getSubordinate() {
        return this.myHttp.get(ContactConfig.getSubordinateUrl);
    }

    public setLocalStorage(type: string, value: any) {
        localStorage.setItem('contact_' + type, JSON.stringify(value));
    }

    public getLocalStorage(type: string) {
        return JSON.parse(localStorage.getItem('contact_' + type));
    }
}