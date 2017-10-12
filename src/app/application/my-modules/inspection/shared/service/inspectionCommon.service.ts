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
    async uploadPicture(picture: { PICTURE: string }, changeToBase64: boolean = false): Promise<string> {
        // return this.myHttp.post(CommonConfig.uploadPicture, picture);
        if (changeToBase64) {
            let base64 = await this.getImageToBase64(picture.PICTURE);
            picture.PICTURE = base64;
        }
        let res = await this.myHttp.post(CommonConfig.uploadPicture, picture);
        if (res.json() && res.json().PICTURE_URL) {
            return res.json().PICTURE_URL;
        }
        return '';
    }

    getImageToBase64(imgUrl: string): Promise<string> {
        return new Promise((resolve, reject) => {
            var canvas: HTMLCanvasElement = document.createElement("canvas");
            var ctx = canvas.getContext('2d');
            var img = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = imgUrl;
            img.onload = function () {
                canvas.height = img.height;
                canvas.width = img.width;
                // img.src = imgUrl;

                ctx.drawImage(img, 0, 0);
                var dataURL = canvas.toDataURL('image/png');
                // Clean up   
                var baseVal = dataURL.replace('data:image/png;base64,', '');
                resolve(baseVal);
            };
        });

    };

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

