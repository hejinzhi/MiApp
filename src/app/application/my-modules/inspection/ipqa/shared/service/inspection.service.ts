import { MyHttpService } from './../../../../../../core/services/myHttp.service';
// import { MyHttpService } from './../../../../../core/services/myHttp.service';
import { InspectionConfig } from './../config/inspection.config';
import { Injectable } from '@angular/core';


@Injectable()
export class InspectionService {

    constructor(
        private myHttp: MyHttpService
    ) { }



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





    getChecklistByStation(station: string): Promise<Checklist[]> {
        return new Promise((resolve, reject) => {
            resolve(this.mockChecklist);
        });
    }


    mockChecklist: Checklist[] = [

    ]



}

export class Checklist {
    // no: string;
    // desc: string;
    // priority: string;
    // type: string;
    // value: any;
    CATEGORY_ID: number;
    CHECK_ID: number;
    CHECK_LIST: string;
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