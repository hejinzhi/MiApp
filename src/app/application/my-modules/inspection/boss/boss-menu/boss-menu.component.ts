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

    goToSchedulePage() {
        this.navCtrl.push('BossScheduleComponent');
    }
    goToDutyPage() {
        this.navCtrl.push('BossDutyComponent');
    }
    goToCommentPage() {
        this.navCtrl.push('CommentComponent');
    }
}