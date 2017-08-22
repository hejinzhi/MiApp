import { InspectionService, Checklist } from './../shared/service/inspection.service';
import { GridModel } from './../grid/grid.component';
import { NavController, NavParams } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'sg-checklist',
    templateUrl: 'checklist.component.html'
})
export class ChecklistComponent implements OnInit {

    // 保存传递过来的站点
    station: GridModel;

    // 保存站点对应的check list
    checkList: Checklist[];

    selectOptions: string[] = ['正常', '異常'];

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private inspectionService: InspectionService
    ) { }

    async ngOnInit() {
        // 因为传递过来的是一个object，传递的是内存地址，所以修改station属性，stations页面也会跟着变化
        this.station = this.navParams.get('data');
        // this.checkList = await this.inspectionService.getChecklistByStation(this.station.title);
        this.checkList = await this.inspectionService.getChecklistByStation('');
    }
    // [(ngModel)]="list.value"
    gou() {
        this.station.showCheckbox = true;
    }

    selectedValue(list: any, event: any) {
        list.value = event;
    }


}