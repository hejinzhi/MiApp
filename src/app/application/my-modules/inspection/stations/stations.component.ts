import { GridModel } from './../grid/grid.component';
import { ChecklistComponent } from './../checklist/checklist.component';
import { NavController, NavParams, Events } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { Mode } from "../grid/grid.component";

@Component({
    selector: 'sg-stations',
    templateUrl: 'stations.component.html'
})
export class StationsComponent implements OnInit {
    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private events: Events
    ) { }

    mode: number = Mode.STATION;
    stations: string[] = [];

    ngOnInit() {
        this.stations = this.navParams.get('stations');
        this.events.subscribe('station.finish', (station: GridModel) => {
            console.log(station);
            let result = this.stations.find((value: string, index: number) => {
                if (value === station.title) {
                    return true;
                }
                return false;
            });
            if (result) {

            }
        });
    }

    chooseStation(event: any) {
        this.navCtrl.push(ChecklistComponent, { data: event[0] })
    }
}

