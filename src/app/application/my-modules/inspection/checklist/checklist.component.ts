import { GridModel } from './../grid/grid.component';
import { NavController, NavParams, Events } from 'ionic-angular';
import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
    selector: 'sg-checklist',
    templateUrl: 'checklist.component.html'
})
export class ChecklistComponent implements OnInit {

    // 保存传递过来的站点
    station: GridModel;
    // 通知stations页面打上勾
    stationEmitter: EventEmitter<GridModel> = new EventEmitter();

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private events: Events,
    ) { }

    ngOnInit() {
        this.station = this.navParams.get('data');
        console.log(this.station);
    }

    gou() {
        this.station.showCheckbox = true;
        this.events.publish('station.finish', this.station);
    }
}