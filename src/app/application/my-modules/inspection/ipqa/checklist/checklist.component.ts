import { EnvConfig } from './../../../../../shared/config/env.config';
import { CommonService } from './../../../../../core/services/common.service';
import { InspectionService, Checklist } from './../shared/service/inspection.service';
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
        private translate: TranslateService
    ) { }

    async ngOnInit() {
        // 因为传递过来的是一个object，传递的是内存地址，所以修改station属性，stations页面也会跟着变化
        this.reset = [];
        this.station = this.navParams.get('data');
        this.stationId = this.navParams.get('stationId');
        this.lineName = this.navParams.get('lineName');
        this.lineId = this.navParams.get('lineId');
        console.log(this.lineName);
        console.log(this.lineId);
        console.log(this.stationId);
        let res = await this.inspectionService.getCheckListByLineStation(EnvConfig.companyID, this.lineId, this.stationId);
        console.log(res.json());
        this.checkList = res.json();
        // this.checkList = await this.inspectionService.getChecklistByStation(this.station.title);
        this.checkList.forEach((l) => {
            this.reset.push({ no: l.LINE_NUM, reset: false });
        });

        this.translate.get(['error', 'inspection.ipqa.exception', 'inspection.ipqa.the', 'inspection.ipqa.error1']).subscribe((res) => {
            this.translateText.error = res['error'];
            this.translateText.exception = res['inspection.ipqa.exception'];
            this.translateText.the = res['inspection.ipqa.the'];
            this.translateText.error1 = res['inspection.ipqa.error1'];
        });
    }

    gou() {
        this.station.showCheckbox = true;
    }

    selectedValue(list: Checklist, event: any) {
        list.VALUE = event;
        if (event === this.translateText.exception) {
            let exceptionDetailModel = this.modalCtrl.create('ExceptionDetailComponent', { line: this.lineName, checklist: list.CHECK_LIST, station: this.station.title });
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
    }

    finishCheckedStation() {
        let allCheck: boolean = true;
        for (let i = 0; i < this.checkList.length; i++) {
            if (this.checkList[i].VALUE) { }
            else {
                // this.showAlert('錯誤', `第${i + 1}項尚未填寫檢查結果，請填寫后再提交。`);
                this.commonService.showAlert(this.translateText.error, `${this.translateText.the}${i + 1}${this.translateText.error1}`);
                allCheck = false;
                break;
            }
        }
        if (allCheck) {
            console.log(this.checkList)
            this.station.showCheckbox = true;
            this.navCtrl.pop();
        }
    }

}