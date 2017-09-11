import { IonicPage, NavController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

@IonicPage()
@Component({
    selector: 'sg-menu',
    templateUrl: 'menu.component.html'
})
export class MenuComponent implements OnInit {
    constructor(
        private navCtrl:NavController
    ) { }

    ngOnInit() { }

    goToReportPage(){
        this.navCtrl.push('IpqaComponent');
    }
}