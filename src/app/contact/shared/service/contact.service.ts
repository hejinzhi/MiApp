import { Injectable } from '@angular/core';

import { MyHttpService } from '../../../core/services/myHttp.service';
import { ContactConfig } from '../../config/contact.config';


@Injectable()
export class ContactService {
    username: string;
    constructor(private myHttp: MyHttpService) {
        this.username = JSON.parse(localStorage.getItem('currentUser')).username;
    }

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
        localStorage.setItem(this.username + '_' + 'contact_' + type, JSON.stringify(value));
    }

    public getLocalStorage(type: string) {
        return JSON.parse(localStorage.getItem(this.username + '_' + 'contact_' + type));
    }

    public getPersonByName(filter: string, site: string) {
        return this.myHttp.get(ContactConfig.getPersonByNameUrl + `?emp_name=${filter}&site=${site}`);
    }

    public getAllPersonByPage(site: string, pageIndex: number, pageSize: number) {
        return this.myHttp.get(ContactConfig.getAllPersonByPageUrl + `?site=${site}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
    }

    public writeViewHistory(personData: any) {
        let historyData: any[] = this.getLocalStorage('viewHistory') ? this.getLocalStorage('viewHistory') : [];
        let length = historyData.length;
        if (length <= 9) {
            historyData.forEach((value, index) => {
                if (value.USER_NAME === personData.USER_NAME) {
                    historyData.splice(index, 1);
                }
            });
            historyData.splice(0, 0, personData);
            this.setLocalStorage('viewHistory', historyData);
        }
        else {

            historyData.forEach((value, index) => {
                if (value.USER_NAME === personData.USER_NAME) {
                    historyData.splice(index, 1);
                }
            });
            historyData.splice(0, 0, personData);
            if (historyData.length > 10) {
                historyData.pop();
            }
            this.setLocalStorage('viewHistory', historyData);
        }
    }
}