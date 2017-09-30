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

    // 获取权限
    getPrivilege(moduleId: number) {
        return this.myHttp.get(CommonConfig.getPrivilegeUrl + `?moduleID=${moduleId}`);
    }

    insertReportData(report: ReportModel) {
        return this.myHttp.post(CommonConfig.insertReportData, report);
    }

    getReportData(headerId: number) {
        return this.myHttp.get(CommonConfig.getReportDate + `?header_id=${headerId}`);
    }

    // 上传问题照片
    async uploadPicture(picture: { PICTURE: string }): Promise<string> {
        // return this.myHttp.post(CommonConfig.uploadPicture, picture);
        let res = await this.myHttp.post(CommonConfig.uploadPicture, picture);
        if (res.json() && res.json().PICTURE_URL) {
            return res.json().PICTURE_URL;
        }
        return '';
    }

    // 上传处理后图片
    uploadActionPicture(picture: { LINE_ID: number, PICTURE: string }) {
        return this.myHttp.post(CommonConfig.uploadActionPicture, picture);
    }


    getMriName(type: string) {
        return this.myHttp.get(CommonConfig.getMriNameUrl + '?type=' + type + '&company_name=' + EnvConfig.companyID);
    }


    getMriLookup(type: string) {
        return this.myHttp.get(CommonConfig.getMriLookupUrl + '?lookup_type=' + type);
    }

}

