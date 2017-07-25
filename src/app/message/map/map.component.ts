import { Component, OnInit, Input } from '@angular/core';
import { NavParams } from 'ionic-angular';
// import { ChartService } from '../shared/service/chart.service';

import { LanguageConfig } from '../shared/config/language.config';

@Component({
    selector: 'sg-mapcomponent',
    templateUrl: 'map.component.html'
})

export class MapComponent implements OnInit {
    languageType: string = localStorage.getItem('languageType');
    languageContent = LanguageConfig.MapComponent[this.languageType];

    content: string;
    addCtrl: string = 'Y';

    constructor(public params: NavParams) {
        this.content = params.data;
    }

    ngOnInit() {
    }
}

