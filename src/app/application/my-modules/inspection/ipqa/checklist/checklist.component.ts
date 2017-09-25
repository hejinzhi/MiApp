import { ReportModel } from './../../shared/model/ReportModel';
import { InspectionCommonService } from './../../shared/service/inspectionCommon.service';
import { ReportLine } from './../../shared/model/ReportLine';
import { ReportHeader } from './../../shared/model/ReportHeader';
import { LocalStorageService } from './../../../../../core/services/localStorage.service';
import { EnvConfig } from './../../../../../shared/config/env.config';
import { CommonService } from './../../../../../core/services/common.service';
import { InspectionService } from './../shared/service/inspection.service';
import { GridModel, StationModel } from './../grid/grid.component';
import { NavController, NavParams, ModalController, IonicPage } from 'ionic-angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
    selector: 'sg-checklist',
    templateUrl: 'checklist.component.html'
})
export class ChecklistComponent implements OnInit {

    // 保存传递过来的站点
    station: GridModel;
    stationId: number;

    // 保存站点对应的check list
    checkList: Checklist[];
    // 当勾选‘异常’后点返回，需要取消勾选异常
    reset: { no: string, reset: boolean }[];
    // 用户选择的线别
    lineName: string;
    lineId: number;
    localStorageCheckListName: string; // 记录checklist本地存储的名字是什么
    localStorageStationName: string;// 记录站点的本地存储名称
    translateText = {
        error: '',
        exception: '',
        the: '',
        error1: '',
        day: '',
        night: ''
    };
    banbie: string;
    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private modalCtrl: ModalController,
        private inspectionService: InspectionService,
        private commonService: CommonService,
        private translate: TranslateService,
        private localStorage: LocalStorageService,
        private inspectionCommonService: InspectionCommonService
    ) { }

    async ngOnInit() {
        // 因为传递过来的是一个object，传递的是内存地址，所以修改station属性，stations页面也会跟着变化
        this.reset = [];
        this.station = this.navParams.get('data');
        this.stationId = this.navParams.get('stationId');
        this.lineName = this.navParams.get('lineName');
        this.lineId = this.navParams.get('lineId');
        this.translate.get(['error', 'inspection.ipqa.exception', 'inspection.ipqa.the', 'inspection.ipqa.error1', 'inspection.ipqa.day', 'inspection.ipqa.night']).subscribe((res) => {
            this.translateText.error = res['error'];
            this.translateText.exception = res['inspection.ipqa.exception'];
            this.translateText.the = res['inspection.ipqa.the'];
            this.translateText.error1 = res['inspection.ipqa.error1'];
            this.translateText.day = res['inspection.ipqa.day'];
            this.translateText.night = res['inspection.ipqa.night'];
        });

        let res = await this.inspectionService.getCheckListByLineStation(EnvConfig.companyID, this.lineId, this.stationId);
        this.checkList = res.json();
        this.checkList.forEach((l) => {
            this.reset.push({ no: l.LINE_NUM, reset: false });
        });

        // 设置本地存储的名字，规则是STATION+STATION_ID+当前日期+STEP3  (STEP3是异常页面,STEP2是checklist页面，STEP1是站点页面)
        this.localStorageCheckListName = this.inspectionService.getLocalStorageCheckListName(this.stationId);
        // this.localStorageStationName = 'LINE' + this.lineId + this.inspectionService.getToday();
        this.localStorageStationName = this.inspectionService.getLocalStorageStationName(this.lineId);
        // 读取本地数据，如果有就按本地数据赋值
        let localData: Checklist[] = this.getItem(this.localStorageCheckListName);
        if (localData) {
            for (let i = 0; i < localData.length; i++) {
                for (let j = 0; j < this.checkList.length; j++) {
                    if (localData[i].CHECK_ID === this.checkList[j].CHECK_ID) {
                        this.checkList[j].VALUE = localData[i].VALUE;
                        break;
                    }
                }
            }
        }

        this.banbie = await this.getBanBie();


    }

    // 设置checklist页面的本地数据的值
    setCheckListItem(key: string, data: Checklist) {
        let alreadyInsert: boolean = false;
        let oldData: Checklist[] = this.localStorage.getItem(key);
        if (oldData) {
            for (let i = 0; i < oldData.length; i++) {
                if (oldData[i].CHECK_ID === data.CHECK_ID) {
                    oldData[i] = data;
                    alreadyInsert = true;
                }
            }
            if (!alreadyInsert) {
                oldData.push(data);
            }
            this.localStorage.setItem(key, oldData);
        } else {
            this.localStorage.setItem(key, [data]);
        }
    }

    setStationItem(key: string, data: StationModel) {
        let alreadyInsert: boolean = false;
        let oldData: StationModel[] = this.localStorage.getItem(key);
        if (oldData) {
            for (let i = 0; i < oldData.length; i++) {
                if (oldData[i].stationID === data.stationID) {
                    oldData[i] = data;
                    alreadyInsert = true;
                }
            }
            if (!alreadyInsert) {
                oldData.push(data);
            }
            this.localStorage.setItem(key, oldData);
        } else {
            this.localStorage.setItem(key, [data]);
        }
    }

    // 获取本地数据
    getItem(key: string) {
        return this.localStorage.getItem(key);
    }


    // 把用户的选择保存到本地
    selectedValue(list: Checklist, event: any) {
        list.VALUE = event;
        if ((event === 'EXCEPTION') || (event === this.translateText.exception)) {
            let exceptionDetailModel = this.modalCtrl.create('ExceptionDetailComponent',
                {
                    line: this.lineName, checklist: {
                        CHECK_LIST_CN: list.CHECK_LIST_CN,
                        // CHECK_LIST_EN: list.CHECK_LIST_EN,
                        CHECK_ID: list.CHECK_ID
                    },
                    station: {
                        STATION_ID: this.stationId,
                        STATION_NAME: this.station.title
                    },
                    fromPage: "checklist"
                    // fromPage: "handler"
                });
            exceptionDetailModel.onWillDismiss((data: any) => {
                if (data && (data.selected === false)) {
                    list.VALUE = '';
                    this.reset.forEach((r) => {
                        if (r.no === list.LINE_NUM) {
                            r.reset = !r.reset;
                        }
                    })
                }
            });
            exceptionDetailModel.present();
        }
        this.setCheckListItem(this.localStorageCheckListName, list);
    }

    // 提交按钮.设置station页面的本地存储
    async finishCheckedStation() {
        let allCheck: boolean = true;
        for (let i = 0; i < this.checkList.length; i++) {
            if (this.checkList[i].VALUE) { }
            else {
                this.commonService.showAlert(this.translateText.error, `${this.translateText.the}${i + 1}${this.translateText.error1}`);
                allCheck = false;
                break;
            }
        }
        if (allCheck) {
            let headerId: number = 0; // 记录post数据后服务器返回的header id，用于判断数据是否已经成功post
            // let localStation = this.localStorage.getItem(this.localStorageStationName);
            let localStation = this.getLocalStationById(this.stationId);
            if (localStation && localStation.headerId > 0) {
                try {
                    let res = await this.inspectionCommonService.getReportData(localStation.headerId);
                    let dataFromServer: ReportModel = res.json();
                    if (dataFromServer) {
                        headerId = await this.updateAndPostDate(dataFromServer);
                        await this.uploadPictures(this.stationId, headerId, dataFromServer);
                    } else {
                        headerId = await this.postDataFromLocal();
                        await this.uploadPictures(this.stationId, headerId);
                    }
                } catch (e) {
                    headerId = await this.postDataFromLocal();
                    await this.uploadPictures(this.stationId, headerId);
                }

            } else {
                headerId = await this.postDataFromLocal();
                await this.uploadPictures(this.stationId, headerId);
            }


            this.station.showCheckbox = true;
            this.setStationItem(this.localStorageStationName,
                { title: this.station.title, showCheckbox: this.station.showCheckbox, stationID: this.stationId, headerId: headerId });
            this.navCtrl.pop();
        }
        // console.log(this.checkList);
        // console.log(await this.combineIpqaReportObj());
    }

    async uploadPictures(stationId: number, headerId: number, reportData?: ReportModel) {
        if (reportData) {
            this.findAndUploadPicture(stationId, reportData);
        } else {
            let res = await this.inspectionCommonService.getReportData(headerId);
            let reportData: ReportModel = res.json();
            this.findAndUploadPicture(stationId, reportData);
            // reportData.Lines.forEach((line,index)=>{
            //     if(line.PROBLEM_FLAG === 'Y'){
            //        let res = this.inspectionService.getExceptionDetail(stationId,line.CHECK_ID);
            //        if(res.PROBLEM_PICTURES.length > 0){
            //            res.PROBLEM_PICTURES.forEach((img)=>{
            //             try{
            //                 this.inspectionCommonService.uploadPicture({LINE_ID:line.LINE_ID,PICTURE:img});
            //             }catch(e){
            //                 console.log('Upload images fail!',e);
            //             }
            //            });
            //        }
            //     }
            // });
        }

    }

    findAndUploadPicture(stationId: number, reportData: ReportModel) {
        reportData.Lines.forEach(async (line, index) => {
            if (line.PROBLEM_FLAG === 'Y') {
                let res = this.inspectionService.getExceptionDetail(stationId, line.CHECK_ID);
                if (res.PROBLEM_PICTURES.length > 0) {
                    // res.PROBLEM_PICTURES.forEach(async (img) => {
                    //     img = img.replace('data:image/jpeg;base64,', '');
                    //     try {
                    //         await this.inspectionCommonService.uploadPicture({ LINE_ID: line.LINE_ID, PICTURE: img });
                    //     } catch (e) {
                    //         console.log('Upload images fail!', e);
                    //     }
                    // });
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

    async postDataFromLocal() {
        let obj: ReportModel = this.combineIpqaReportObj();
        try {
            let res = await this.inspectionCommonService.insertReportData(obj);
            return res.json();
        } catch (e) {
            console.log(e);
            return 0;
        }
    }

    getLocalStationById(stationId: number): StationModel {
        let localStation = this.localStorage.getItem(this.localStorageStationName);
        if (localStation) {
            for (let i = 0; i < localStation.length; i++) {
                if (localStation[i].stationID === stationId) {
                    return localStation[i];
                }
            }
        }
    }

    async getBanBie() {
        let res: any = await this.inspectionService.getDutyKind();
        let temp: any = res.json();
        let duty: string = temp.DUTY_KIND;
        return duty;
    }

    async updateAndPostDate(report: ReportModel) {

        let localData = this.combineIpqaReportObj();
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

    combineIpqaReportObj(): ReportModel {
        let localUser = JSON.parse(localStorage.getItem('currentUser'));
        let header: ReportHeader = {
            HEADER_ID: 0,
            COMPANY_NAME: EnvConfig.companyID,
            TYPE: 'IPQA',
            INSPECTOR: localUser.empno,
            INSPECT_DATE: this.inspectionService.getToday(),
            DUTY_KIND: this.banbie
        };
        let lines: ReportLine[] = [];
        this.checkList.forEach((checklist, index) => {
            let exceptionDetail = this.inspectionService.getExceptionDetail(checklist.STATION_ID, checklist.CHECK_ID);
            lines.push({
                HEADER_ID: 0,
                COMPANY_NAME: EnvConfig.companyID,
                LINE_ID: 0,
                LINE_NUM: checklist.LINE_NUM,
                INSPECT_DATE: this.inspectionService.getToday(),
                LOCATION: this.inspectionService.getLocationName(this.lineName, this.station.title),//this.lineName+ ' -- ' +this.station.title,
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

}

class Checklist {
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