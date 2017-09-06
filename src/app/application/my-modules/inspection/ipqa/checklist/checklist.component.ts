import { CommonService } from './../../../../../core/services/common.service';
import { InspectionService, Checklist } from './../shared/service/inspection.service';
import { GridModel } from './../grid/grid.component';
import { NavController, NavParams, ModalController, IonicPage } from 'ionic-angular';
import { Component, OnInit, ViewChild } from '@angular/core';

@IonicPage()
@Component({
    selector: 'sg-checklist',
    templateUrl: 'checklist.component.html'
})
export class ChecklistComponent implements OnInit {

    // 保存传递过来的站点
    station: GridModel;

    // 保存站点对应的check list
    checkList: Checklist[];
    // 当勾选‘异常’后点返回，需要取消勾选异常
    reset: { no: string, reset: boolean }[];
    // 用户选择的线别
    line: string;

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private modalCtrl: ModalController,
        private inspectionService: InspectionService,
        private commonService: CommonService
    ) { }

    async ngOnInit() {
        // 因为传递过来的是一个object，传递的是内存地址，所以修改station属性，stations页面也会跟着变化
        this.reset = [];
        this.station = this.navParams.get('data');
        this.line = this.navParams.get('line');
        this.checkList = await this.inspectionService.getChecklistByStation(this.station.title);
        this.checkList.forEach((l) => {
            this.reset.push({ no: l.no, reset: false });
        });
    }

    gou() {
        this.station.showCheckbox = true;
    }

    // selectedValue(list: Checklist, event: any) {
    //     list.value = event.checked;
    //     if (event.title === '異常') {
    //         let exceptionDetailModel = this.modalCtrl.create(ExceptionDetailComponent, { line: this.line, checklist: list.desc });
    //         exceptionDetailModel.onWillDismiss((data: any) => {
    //             if (data && (data.selected === false)) {
    //                 event.checked = false;
    //             }
    //         });
    //         exceptionDetailModel.present();
    //     }
    // }
    selectedValue(list: Checklist, event: any) {
        list.value = event;
        if (event === '異常') {
            let exceptionDetailModel = this.modalCtrl.create('ExceptionDetailComponent', { line: this.line, checklist: list.desc });
            exceptionDetailModel.onWillDismiss((data: any) => {
                if (data && (data.selected === false)) {
                    list.value = '';
                    this.reset.forEach((r) => {
                        if (r.no === list.no) {
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
            if (this.checkList[i].value) { }
            else {
                // this.showAlert('錯誤', `第${i + 1}項尚未填寫檢查結果，請填寫后再提交。`);
                this.commonService.showAlert('錯誤', `第${i + 1}項尚未填寫檢查結果，請填寫后再提交。`);
                allCheck = false;
                break;
            }
        }
        if (allCheck) {
            this.station.showCheckbox = true;
            this.navCtrl.pop();
        }
    }

}