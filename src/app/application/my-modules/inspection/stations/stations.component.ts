import { NavController, NavParams } from 'ionic-angular';
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
    stations: string[] = [];

    ngOnInit() {
        this.stations = this.navParams.get('stations');
        console.log(this.stations);
    }

    chooseStation(event: any) {
        console.log(event);
    }
}

