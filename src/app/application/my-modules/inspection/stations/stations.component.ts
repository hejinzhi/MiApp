import { GridModel } from './../grid/grid.component';
import { ChecklistComponent } from './../checklist/checklist.component';
import { NavController, NavParams, DomController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { Mode } from "../grid/grid.component";

@Component({
    selector: 'sg-stations',
    templateUrl: 'stations.component.html'
})
export class StationsComponent implements OnInit {
    constructor(
        private navCtrl: NavController,
        private navParams: NavParams
    ) { }

    mode: number = Mode.STATION;
    stations: GridModel[] = [];

    // 用户选择的线别
    line: string;

    ngOnInit() {
        this.stations = [];
        let params: GridModel[] = this.navParams.get('stations');
        this.line = this.navParams.get('line');
        let temp: GridModel[] = params.filter((v) => {
            return v.showCheckbox === true;
        });
        temp.forEach((v) => {
            this.stations.push({
                title: v.title,
                showCheckbox: false
            })
        });

        // to do
        // 遍历站点，检查是否已经有当天的check list数据，如果有，则默认勾上，否则不勾。防止user点后退后，这个勾就不见了
        // ...
    }

    chooseStation(event: GridModel) {
        //     this.navCtrl.push(ChecklistComponent, {
        //         data: {
        //             title: event.title,
        //             showCheckbox: event.showCheckbox
        //         }
        //     });
        this.navCtrl.push(ChecklistComponent, { data: event, line: this.line });
    }
}

