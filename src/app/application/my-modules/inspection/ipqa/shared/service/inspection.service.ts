import { Observable } from 'rxjs';
import { CommonService } from './../../../../../../core/services/common.service';
import { MyHttpService } from './../../../../../../core/services/myHttp.service';
import { InspectionConfig } from './../config/inspection.config';
import { Injectable } from '@angular/core';


@Injectable()
export class InspectionService {
    labelAttribute = "name";
    constructor(
        private myHttp: MyHttpService,
        private commonService: CommonService
    ) { }

    getResults(keyword: string) {
        // return Observable.of(keyword)
        //     .debounceTime(500)
        //     .distinctUntilChanged()
        //     .switchMap((res) => {
        //         return this.getEmp(res);
        //     })
        //     .subscribe((emp) => {
        //         let temp: any[] = emp.json();
        //         let emps: string[] = [];
        //         temp.forEach((value, index) => {
        //             emps.push(value.AGENT_NAME);
        //         });
        //         return temp;
        //     });
        return ['FE717', 'FE716'];
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


}

export class Checklist {
    CATEGORY_ID: number;
    CHECK_ID: number;
    CHECK_LIST_CN: string;
    CHECK_LIST_EN: string;
    CHECK_TYPE: string;
    COMPANY_NAME: string;
    ENABLED: string;
    LINE_ID: number;
    LINE_NUM: string;
    NAME_ID: number;
    PRIORITY: string;
    STATION_ID: number;
    VALUE: any;
}