import { Observable } from 'rxjs';
import { BossReportLineState } from "./../shared/store";
import { MyStore } from './../../../../../shared/store';
import { Store } from '@ngrx/store';
import { PluginService } from './../../../../../core/services/plugin.service';
import { IonicPage, NavController, Loading } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { BossService } from './../shared/service/boss.service';

@IonicPage()
@Component({
    selector: 'sg-boss-menu',
    templateUrl: 'boss-menu.component.html'
})
export class BossMenuComponent implements OnInit {
    translateTexts: any;
    tips:{
        ownImprove: Observable<number>,
        adminCheck: Observable<number>,
        comment: Observable<number>
    }
    constructor(
        private navCtrl: NavController,
        private bossService: BossService,
        private plugin: PluginService,
        private $store: Store<MyStore>
    ) { }

    async ngOnInit() {
        this.tips = {
            ownImprove:Observable.of(0),
            adminCheck:Observable.of(0),
            comment:Observable.of(0)
        }
        this.tips.ownImprove = this.bossService.ObserveOwnLinesCount();
        this.tips.adminCheck = this.bossService.ObserveAdminLinesDealCount();
    }

    async goToReportPage() {
        let loading = this.plugin.createLoading();
        loading.present();
        let res:any = await this.bossService.getEmployeeSchedule().catch((err:any) => {this.plugin.errorDeal(err);return ''});
        loading.dismiss()
        if(!res) return;
        res = res.json();
        if(res.length>0) {
            this.navCtrl.push('BossReportComponent',{
                schedule:res
            });
        } else {
            this.plugin.showToast('没找到巡检安排');
        }
        
    }

    goToCheckListPage() {
        this.navCtrl.push('CheckListComponent');
    }


    goToPageImprove() {
        this.bossService.getOwnUndoneReport(true,() => this.navCtrl.push('IssueListComponent',{type:1}));
    }

    goToPageAdminCheck() {
        this.bossService.getALLReport('','','',true,() => this.navCtrl.push('AdminCheckComponent',{type:1}));
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