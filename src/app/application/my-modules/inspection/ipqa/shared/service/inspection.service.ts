import { ExceptionModel } from './../../exception-detail/exception-detail.component';
import { Observable } from 'rxjs';
import { CommonService } from './../../../../../../core/services/common.service';
import { MyHttpService } from './../../../../../../core/services/myHttp.service';
import { InspectionConfig } from './../config/inspection.config';
import { Injectable } from '@angular/core';


@Injectable()
export class InspectionService {
    constructor(
        private myHttp: MyHttpService,
        private commonService: CommonService
    ) { }


    removeOldLocalStorageData() {
        let ipqaStorage: string[] = [];

        for (var i = 0, len = localStorage.length; i < len; ++i) {
            if (localStorage.key(i).substr(0, 4) === 'IPQA') {
                ipqaStorage.push(localStorage.key(i));
            }
        }
        for (var i = 0; i < ipqaStorage.length; i++) {
            if (ipqaStorage[i].substr(0, 14) != 'IPQA' + this.getToday()) {
                localStorage.removeItem(ipqaStorage[i]);
            }
        }
    }

    getLocationName(lineName: string, stationName: string) {
        return lineName + ' -- ' + stationName;
    }

    // 设置本地存储的名字，规则是STATION+STATION_ID+当前日期+STEP3  (STEP3是异常页面,STEP2是checklist页面)
    getLocalStorageExceptionName(stationID: number) {
        return 'IPQA' + this.getToday() + 'STATION' + stationID + 'STEP3';
    }

    // 设置本地存储的名字，规则是STATION+STATION_ID+当前日期+STEP3  (STEP3是异常页面,STEP2是checklist页面)
    getLocalStorageCheckListName(stationID: number) {
        return 'IPQA' + this.getToday() + 'STATION' + stationID + 'STEP2';
    }

    getLocalStorageStationName(lineID: number) {
        return 'IPQA' + this.getToday() + 'LINE' + lineID;
    }

    getExceptionDetail(stationID: number, checklistID: number) {
        let localExceptions: ExceptionModel[] = JSON.parse(localStorage.getItem(this.getLocalStorageExceptionName(stationID)));
        for (let i = 0; i < localExceptions.length; i++) {
            if (localExceptions[i].checkID === checklistID) {
                return {
                    PROBLEM_FLAG: 'Y',
                    PROBLEM_DESC: localExceptions[i].exceptionDesc,
                    PROBLEM_PICTURES: localExceptions[i].pictures
                };
            }
        }
        return {
            PROBLEM_FLAG: 'N',
            PROBLEM_DESC: '',
            PROBLEM_PICTURES: ['']
        };
    }

    getEmp(emp: string) {
        return this.myHttp.get(InspectionConfig.getEmp + `?emp_name=${emp}`);
    }


    getLines(companyName: string): Promise<any> {
        return this.myHttp.get(InspectionConfig.getLinesUrl + `?company_name=${companyName}`);
    }

    getCategoryByLine(companyName: string, lineId: number) {
        return this.myHttp.get(InspectionConfig.getCategoryByLineUrl + `?company_name=${companyName}&line_id=${lineId}`);
    }

    getStationByLine(companyName: string, lineId: number) {
        return this.myHttp.get(InspectionConfig.getStationByLineUrl + `?company_name=${companyName}&line_id=${lineId}`);
    }

    getStationByCategory(companyName: string, lineId: number, categoryIds: number[]) {
        return this.myHttp.get(InspectionConfig.getStationByCategoryUrl + `?company_name=${companyName}&line_id=${lineId}&category_ids=${categoryIds}`);
    }

    getCheckListByLineStation(companyName: string, lineId: number, stationId: number) {
        return this.myHttp.get(InspectionConfig.getCheckListByLineStationUrl + `?company_name=${companyName}&line_id=${lineId}&station_id=${stationId}`);
    }

    getDutyKind() {
        return this.myHttp.post(InspectionConfig.getDutyKind, {
            IDATE: this.commonService.getToday(), START_TIME: '', END_TIME: ''
        });
    }

    getToday() {
        let rightDate: Date;
        let now: any = new Date();
        let yesterday = new Date((now / 1000 - 86400) * 1000);
        let hour = now.getHours();
        if (hour >= 8) {
            rightDate = now;
        } else {
            rightDate = yesterday;
        }
        let month = (rightDate.getMonth() + 1) > 9 ? (rightDate.getMonth() + 1) : '0' + (rightDate.getMonth() + 1);
        let day = rightDate.getDate() > 9 ? rightDate.getDate() : '0' + rightDate.getDate();
        return rightDate.getFullYear() + '-' + month + '-' + day;

    }


}

