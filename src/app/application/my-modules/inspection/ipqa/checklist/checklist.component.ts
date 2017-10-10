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

        // 设置本地存储的名字，规则是STATION+STATION_ID+当前日期+STEP3  (STEP3是异常页面,STEP2是checklist页面，STEP1是站点页面)
        this.localStorageCheckListName = this.inspectionService.getLocalStorageCheckListName(this.stationId);
        this.localStorageStationName = this.inspectionService.getLocalStorageStationName(this.lineId);


        let res = await this.inspectionService.initCheckList(this.lineId, this.stationId, this.localStorageCheckListName);
        this.checkList = res.checkList;
        this.reset = res.reset;

        this.banbie = await this.inspectionService.getBanBie();


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
            let headerId: number = 0;
            if (!this.inspectionService.hasNoNetwork()) {
                this.commonService.showLoading();
                headerId = await this.inspectionService.postDataToServer(this.stationId, this.localStorageStationName, this.banbie, this.checkList, this.lineName, this.station.title);
                this.commonService.hideLoading();
                this.station.showCheckbox = true;
                this.station.status = 'posted';
                this.setStationItem(this.localStorageStationName,
                    { title: this.station.title, showCheckbox: this.station.showCheckbox, stationID: this.stationId, headerId: headerId, status: 'posted' });
                // test
                this.setLocalCheckResult();
                this.navCtrl.pop();
            } else {
                this.commonService.showConfirm('提示', '当前无可用网络，数据暂存在本地，请连接网络后再提交。', () => {
                    this.station.showCheckbox = true;
                    this.station.status = 'unpost';
                    this.setStationItem(this.localStorageStationName,
                        { title: this.station.title, showCheckbox: this.station.showCheckbox, stationID: this.stationId, headerId: headerId, status: 'unpost' });

                    this.setLocalCheckResult();

                    this.navCtrl.pop();
                });
            }

            // this.station.showCheckbox = true;
            // this.setStationItem(this.localStorageStationName,
            //     { title: this.station.title, showCheckbox: this.station.showCheckbox, stationID: this.stationId, headerId: headerId });
            // this.navCtrl.pop();
        }
    }

    setLocalCheckResult() {
        let name = this.inspectionService.getLocalCheckResultName();
        let obj = {
            stationId: this.stationId,
            localName: this.localStorageStationName,
            banbie: this.banbie,
            checkList: this.checkList,
            lineName: this.lineName,
            title: this.station.title
        };
        let data: any[] = JSON.parse(localStorage.getItem(name));
        if (data && data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].stationId === obj.stationId) {
                    data.splice(i);
                    break;
                }
            }
            data.push(obj);
            localStorage.setItem(name, JSON.stringify(data));

        } else {
            localStorage.setItem(name, JSON.stringify([obj]));
        }

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