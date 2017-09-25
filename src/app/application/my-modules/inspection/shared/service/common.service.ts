import { Report } from './../model/ReportModel';
import { CommonConfig } from './../config/common.config';
import { MyHttpService } from './../../../../../core/services/myHttp.service';
import { Injectable } from '@angular/core';
import { EnvConfig } from './../../../../../shared/config/env.config';

@Injectable()
export class CommonService {
    constructor(
        private myHttp: MyHttpService,
    ) { }



    insertReportData(report: Report) {
        return this.myHttp.post(CommonConfig.insertReportData, report);
    }

    getMriName(type: string) {
        return this.myHttp.get(CommonConfig.getMriNameUrl + '?type=' + type + '&company_name=' + EnvConfig.companyID);
    }


}

