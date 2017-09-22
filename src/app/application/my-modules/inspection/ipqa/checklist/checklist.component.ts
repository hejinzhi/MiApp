import { LocalStorageService } from './../../../../../core/services/localStorage.service';
import { EnvConfig } from './../../../../../shared/config/env.config';
import { CommonService } from './../../../../../core/services/common.service';
import { InspectionService } from './../shared/service/inspection.service';
import { GridModel } from './../grid/grid.component';
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
    localStorageCheckList: string; // 记录checklist本地存储的名字是什么
    localStorageStation: string;// 记录站点的本地存储名称
    translateText = {
        error: '',
        exception: '',
        the: '',
        error1: ''
    };
    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private modalCtrl: ModalController,
        private inspectionService: InspectionService,
        private commonService: CommonService,
        private translate: TranslateService,
        private localStorage: LocalStorageService
    ) { }

    async ngOnInit() {
        // 因为传递过来的是一个object，传递的是内存地址，所以修改station属性，stations页面也会跟着变化
        this.reset = [];
        this.station = this.navParams.get('data');
        this.stationId = this.navParams.get('stationId');
        this.lineName = this.navParams.get('lineName');
        this.lineId = this.navParams.get('lineId');
        this.translate.get(['error', 'inspection.ipqa.exception', 'inspection.ipqa.the', 'inspection.ipqa.error1']).subscribe((res) => {
            this.translateText.error = res['error'];
            this.translateText.exception = res['inspection.ipqa.exception'];
            this.translateText.the = res['inspection.ipqa.the'];
            this.translateText.error1 = res['inspection.ipqa.error1'];
        });

        let res = await this.inspectionService.getCheckListByLineStation(EnvConfig.companyID, this.lineId, this.stationId);
        this.checkList = res.json();
        this.checkList.forEach((l) => {
            this.reset.push({ no: l.LINE_NUM, reset: false });
        });

        // 设置本地存储的名字，规则是STATION+STATION_ID+当前日期+STEP3  (STEP3是异常页面,STEP2是checklist页面，STEP1是站点页面)
        this.localStorageCheckList = 'STATION' + this.stationId + this.inspectionService.getToday() + 'STEP2';
        this.localStorageStation = 'STATION' + this.stationId + this.inspectionService.getToday() + 'STEP1';
        // 读取本地数据，如果有就按本地数据赋值
        let localData: Checklist[] = this.getItem(this.localStorageCheckList);
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


    }

    // 设置本地数据的值
    setItem(key: string, data: Checklist) {
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

    // 获取本地数据
    getItem(key: string) {
        return this.localStorage.getItem(key);
    }

    gou() {
        this.station.showCheckbox = true;
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
        this.setItem(this.localStorageCheckList, list);
    }

    // 提交按钮
    finishCheckedStation() {
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
            console.log(this.checkList)
            // this.station.showCheckbox = true;
            // this.navCtrl.pop();
        }
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