import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

@IonicPage()
@Component({
    selector: 'sg-menu',
    templateUrl: 'menu.component.html'
})
export class MenuComponent implements OnInit {
    translateTexts: any = {
        'inspection.ipqa.assignOwner': '',
        'inspection.ipqa.handleProblem': ''
    }; // 记录转换后的文本(简繁体)
    constructor(
        private navCtrl: NavController,
        private translate: TranslateService
    ) { }

    async ngOnInit() {


        this.translateTexts = await this.translate.get(['inspection.ipqa.assignOwner', 'inspection.ipqa.handleProblem']).toPromise();
    }

    goToReportPage() {
        this.navCtrl.push('IpqaComponent');
    }

    goToTeamLeader() {
        this.navCtrl.push('ListComponent', { fromPage: 'teamLeader', title: this.translateTexts['inspection.ipqa.assignOwner'] })
    }

    goToTeamHandler() {
        this.navCtrl.push('ListComponent', { fromPage: 'handler', title: this.translateTexts['inspection.ipqa.handleProblem'] })
    }


}