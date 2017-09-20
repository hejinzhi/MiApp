import { Report } from './../model/ReportModel';
import { CommonConfig } from './../config/common.config';
import { MyHttpService } from './../../../../../core/services/myHttp.service';
import { Injectable } from '@angular/core';


@Injectable()
export class CommonService {
    constructor(
        private myHttp: MyHttpService,
    ) { }



    insertReportData(report: Report) {
        return this.myHttp.post(CommonConfig.insertReportData, report);
    }



}

