import { IonicPage, NavController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

@IonicPage()
@Component({
    selector: 'sg-menu',
    templateUrl: 'menu.component.html'
})
export class MenuComponent implements OnInit {
    translateTexts: any;
    constructor(
        private navCtrl: NavController
    ) { }

    async ngOnInit() {
    }

    goToReportPage() {
        this.navCtrl.push('IpqaComponent');
    }
}