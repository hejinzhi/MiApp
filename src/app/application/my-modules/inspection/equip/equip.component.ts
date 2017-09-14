import { NavController, IonicPage } from 'ionic-angular';
import { Observable, Observer } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
    selector: 'sg-equip',
    templateUrl: 'equip.component.html'
})
export class EquipComponent implements OnInit {

    translateTexts: any = {
        'inspection.ipqa.stationTitle': '',
        'inspection.ipqa.module': ''
    }; // 记录转换后的文本(简繁体)

    constructor(
        private navCtrl: NavController,
        private translate: TranslateService
    ) {

    }

    async ngOnInit() {
    }

    goToPage(page: string) {
        this.navCtrl.push(page);

    }

    goToPageReport() {
        this.navCtrl.push('EquipReportComponent')
    }

    goToPageImprove() {
        this.navCtrl.push('IssueListComponent',{type:2})
    }

    goToPageAdminCheck() {
        this.navCtrl.push('AdminCheckComponent',{type:2})
    }
}