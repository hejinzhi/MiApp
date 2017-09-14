import { IonicPage, NavController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

@IonicPage()
@Component({
    selector: 'sg-boss-menu',
    templateUrl: 'boss-menu.component.html'
})
export class BossMenuComponent implements OnInit {
    translateTexts: any;
    constructor(
        private navCtrl: NavController
    ) { }

    async ngOnInit() {
    }

    goToReportPage() {
        this.navCtrl.push('BossReportComponent');
    }

    goToCheckListPage() {
        this.navCtrl.push('CheckListComponent');
    }

    goToPageImprove() {
        this.navCtrl.push('IssueListComponent',{type:1})
    }

    goToPageAdminCheck() {
        this.navCtrl.push('AdminCheckComponent',{type:1})
    }
}