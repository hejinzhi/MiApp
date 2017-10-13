import { EquipService } from './shared/service/equip.service';
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

    tips:{
        ownImprove: Observable<number>,
        adminCheck: Observable<number>,
    }
    translateTexts: any = {
        'inspection.ipqa.stationTitle': '',
        'inspection.ipqa.module': ''
    }; // 记录转换后的文本(简繁体)

    constructor(
        private navCtrl: NavController,
        private translate: TranslateService,
        private equipService: EquipService
    ) {

    }

    async ngOnInit() {
        this.tips = {
            ownImprove:Observable.of(0),
            adminCheck:Observable.of(0),
        }
        this.tips.ownImprove = this.equipService.ObserveOwnLinesCount();
        this.tips.adminCheck = this.equipService.ObserveAdminLinesDealCount();
    }

    goToPage(page: string) {
        this.navCtrl.push(page);

    }

    goToPageReport() {
        this.navCtrl.push('EquipReportComponent');
    }

    goToPageImprove() {
        this.equipService.getOwnUndoneReport(true,() => this.navCtrl.push('IssueListComponent',{type:2}));
    }

    goToPageAdminCheck() {
        this.navCtrl.push('AdminCheckComponent',{type:2})
    }

    goToCheckListPage() {
        this.navCtrl.push('CheckListComponent',{
            type:3
        });
    }

    goToPageCheckNotes(){
        this.navCtrl.push('CheckNotesComponent');
    }
}