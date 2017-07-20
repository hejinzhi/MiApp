import { Component, OnInit, Input } from '@angular/core';
import { NavParams } from 'ionic-angular';
// import { ChartService } from '../shared/service/chart.service';

@Component({
    selector: 'sg-mapcomponent',
    templateUrl: 'map.component.html'
})

export class MapComponent implements OnInit {
    content: string;
    addCtrl: string = 'Y';

    constructor(public params: NavParams) {
        this.content = params.data;
    }

    ngOnInit() {
    }
}

