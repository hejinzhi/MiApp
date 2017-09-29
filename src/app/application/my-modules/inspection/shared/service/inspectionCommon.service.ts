import { EnvConfig } from './../../../../../shared/config/env.config';
import { ReportModel } from './../model/ReportModel';
import { CommonConfig } from './../config/common.config';
import { MyHttpService } from './../../../../../core/services/myHttp.service';
import { Injectable } from '@angular/core';


@Injectable()
export class InspectionCommonService {
    constructor(
        private myHttp: MyHttpService,
    ) { }



    insertReportData(report: ReportModel) {
        return this.myHttp.post(CommonConfig.insertReportData, report);
    }

    getReportData(headerId: number) {
        return this.myHttp.get(CommonConfig.getReportDate + `?header_id=${headerId}`);
    }

    uploadPicture(picture: { LINE_ID: number, PICTURE: string }) {
        return this.myHttp.post(CommonConfig.uploadPicture, picture);
    }


    getMriName(type: string) {
        return this.myHttp.get(CommonConfig.getMriNameUrl + '?type=' + type + '&company_name=' + EnvConfig.companyID);
    }


    getMriLookup(type: string) {
        return this.myHttp.get(CommonConfig.getMriLookupUrl + '?lookup_type=' + type);
    }

}

