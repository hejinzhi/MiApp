import { PluginService } from './../../../../../../core/services/plugin.service';
import { InspectionCommonService } from './../../../shared/service/inspectionCommon.service';
import { Checklist } from './../../checklist/checklist.component';
import { EnvConfig } from './../../../../../../shared/config/env.config';
import { ReportLine } from './../../../shared/model/ReportLine';
import { ReportHeader } from './../../../shared/model/ReportHeader';
import { ReportModel } from './../../../shared/model/ReportModel';
import { StationModel } from './../../grid/grid.component';
import { LocalStorageService } from './../../../../../../core/services/localStorage.service';
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
        private commonService: CommonService,
        private localService: LocalStorageService,
        private inspectionCommonService: InspectionCommonService,
        private pluginService: PluginService
    ) { }

    hasNoNetwork() {
        return this.pluginService.hasNoNetwork();
    }


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

    async getBanBie() {
        let name = this.getLocalStorageDutyKindName();
        let duty = this.localService.getItem(name);
        if (duty) {
            return duty;
        } else {
            let res: any = await this.getDutyKind();
            let temp: any = res.json();
            let dutyKind: string = temp.DUTY_KIND;
            this.localService.setItem(name, dutyKind);
            return dutyKind;
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

    // 
    getLocalStorageDutyKindName() {
        return 'IPQA' + this.getToday() + 'DutyKind';
    }

    getLocalStorageStationName(lineID: number) {
        return 'IPQA' + this.getToday() + 'LINE' + lineID;
    }

    getExceptionDetail(stationID: number, checklistID: number) {
        let localExceptions: ExceptionModel[] = JSON.parse(localStorage.getItem(this.getLocalStorageExceptionName(stationID)));
        if (localExceptions && localExceptions.length > 0) {
            for (let i = 0; i < localExceptions.length; i++) {
                if (localExceptions[i].checkID === checklistID) {
                    return {
                        PROBLEM_FLAG: 'Y',
                        PROBLEM_DESC: localExceptions[i].exceptionDesc,
                        PROBLEM_PICTURES: localExceptions[i].pictures
                    };
                }
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

    getLocalStationById(stationId: number, name: string): StationModel {
        let localStation = this.localService.getItem(name);
        if (localStation) {
            for (let i = 0; i < localStation.length; i++) {
                if (localStation[i].stationID === stationId) {
                    return localStation[i];
                }
            }
        }
    }

    combineIpqaReportObj(banbie: string, checkList: Checklist[], lineName: string, stationName: string): ReportModel {

        let localUser = JSON.parse(localStorage.getItem('currentUser'));
        let header: ReportHeader = {
            HEADER_ID: 0,
            COMPANY_NAME: EnvConfig.companyID,
            TYPE: 'IPQA',
            INSPECTOR: localUser.empno,
            INSPECT_DATE: this.getToday(),
            DUTY_KIND: banbie
        };
        let lines: ReportLine[] = [];
        checkList.forEach((checklist, index) => {
            let exceptionDetail = this.getExceptionDetail(checklist.STATION_ID, checklist.CHECK_ID);
            lines.push({
                HEADER_ID: 0,
                COMPANY_NAME: EnvConfig.companyID,
                LINE_ID: 0,
                LINE_NUM: checklist.LINE_NUM,
                INSPECT_DATE: this.getToday(),
                LOCATION: this.getLocationName(lineName, stationName),
                CHECK_ID: checklist.CHECK_ID,
                CHECK_LIST_CN: checklist.CHECK_LIST_CN,
                CHECK_RESULT: checklist.VALUE,
                PROBLEM_FLAG: exceptionDetail.PROBLEM_FLAG,
                PROBLEM_DESC: exceptionDetail.PROBLEM_DESC,
                PROBLEM_STATUS: 'New'
            })
        });
        return {
            Header: header,
            Lines: lines
        };
    }

    async updateAndPostDate(report: ReportModel, banbie: string, checkList: Checklist[], lineName: string, stationName: string) {
        let localData = this.combineIpqaReportObj(banbie, checkList, lineName, stationName);
        localData.Header.HEADER_ID = report.Header.HEADER_ID;
        localData.Lines.forEach((line, index) => {
            for (let i = 0; i < report.Lines.length; i++) {
                if (line.CHECK_ID === report.Lines[i].CHECK_ID) {
                    line.HEADER_ID = report.Header.HEADER_ID;
                    line.LINE_ID = report.Lines[i].LINE_ID;
                    if ((line.CHECK_RESULT === 'NORMAL') || (line.CHECK_RESULT === 'N/A')) {
                        line.PROBLEM_DESC = '';
                        line.PROBLEM_FLAG = 'N';
                        line.PROBLEM_PICTURES = [''];
                    }
                    break;
                }
            }
        });
        try {
            let res = await this.inspectionCommonService.insertReportData(localData);
            return res.json();
        } catch (e) {
            console.log(e);
            return 0;
        }

    }

    findAndUploadPicture(stationId: number, reportData: ReportModel) {
        reportData.Lines.forEach(async (line, index) => {
            if (line.PROBLEM_FLAG === 'Y') {
                let res = this.getExceptionDetail(stationId, line.CHECK_ID);
                if (res.PROBLEM_PICTURES && res.PROBLEM_PICTURES.length > 0) {
                    for (let i = 0; i < res.PROBLEM_PICTURES.length; i++) {
                        let img = res.PROBLEM_PICTURES[i].replace('data:image/jpeg;base64,', '');
                        try {
                            await this.inspectionCommonService.uploadPicture({ LINE_ID: line.LINE_ID, PICTURE: img });
                        } catch (e) {
                            console.log('Upload images fail!', e);
                        }
                    }
                }
            }
        });
    }

    async uploadPictures(stationId: number, headerId: number, reportData?: ReportModel) {
        if (reportData) {
            this.findAndUploadPicture(stationId, reportData);
        } else {
            let res = await this.inspectionCommonService.getReportData(headerId);
            let reportData: ReportModel = res.json();
            this.findAndUploadPicture(stationId, reportData);
        }

    }

    async postDataFromLocal(banbie: string, checkList: Checklist[], lineName: string, stationName: string) {
        let obj: ReportModel = this.combineIpqaReportObj(banbie, checkList, lineName, stationName);
        try {
            let res = await this.inspectionCommonService.insertReportData(obj);
            return res.json();
        } catch (e) {
            console.log(e);
            return 0;
        }
    }

    async postDataToServer(stationId: number, localName: string, banbie: string, checkList: Checklist[], lineName: string, stationName: string) {
        let headerId: number = 0; // 记录post数据后服务器返回的header id，用于判断数据是否已经成功post
        let localStation = this.getLocalStationById(stationId, localName);
        if (localStation && localStation.headerId > 0) {
            try {
                let res = await this.inspectionCommonService.getReportData(localStation.headerId);
                let dataFromServer: ReportModel = res.json();
                if (dataFromServer) {
                    headerId = await this.updateAndPostDate(dataFromServer, banbie, checkList, lineName, stationName);
                    await this.uploadPictures(stationId, headerId, dataFromServer);
                } else {
                    headerId = await this.postDataFromLocal(banbie, checkList, lineName, stationName);
                    await this.uploadPictures(stationId, headerId);
                }
            } catch (e) {
                headerId = await this.postDataFromLocal(banbie, checkList, lineName, stationName);
                await this.uploadPictures(stationId, headerId);
            }

        } else {
            headerId = await this.postDataFromLocal(banbie, checkList, lineName, stationName);
            await this.uploadPictures(stationId, headerId);
        }
        return headerId;
    }

    async initCheckList(lineId: number, stationId: number, checkListName: string) {
        let reset: { no: string, reset: boolean }[] = [];
        let res = await this.getCheckListByLineStation(EnvConfig.companyID, lineId, stationId);
        let checkList = res.json();
        checkList.forEach((l: any) => {
            reset.push({ no: l.LINE_NUM, reset: false });
        });
        // 读取本地数据，如果有就按本地数据赋值
        let localData: Checklist[] = this.localService.getItem(checkListName);
        if (localData) {
            for (let i = 0; i < localData.length; i++) {
                for (let j = 0; j < checkList.length; j++) {
                    if (localData[i].CHECK_ID === checkList[j].CHECK_ID) {
                        checkList[j].VALUE = localData[i].VALUE;
                        break;
                    }
                }
            }
        }
        return {
            checkList: checkList,
            reset: reset
        }
    }


}

