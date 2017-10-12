import { UserState } from './../../../../../../shared/models/user.model';
import { Observable } from 'rxjs/Rx';
import { BossReportLineState } from './../../../boss/shared/store';
import { MyStore } from './../../../../../../shared/store';
import { Store } from '@ngrx/store';
import { PluginService } from './../../../../../../core/services/plugin.service';
import { BossService } from './../../../boss/shared/service/boss.service';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

@IonicPage()
@Component({
    selector: 'sg-issue-list',
    templateUrl: 'issue-list.component.html'
})

export class IssueListComponent implements OnInit {

    type: number = 1;

    testData1 = [{
        time: '2017-05-09 17:20', name: '小东', site: '楼递间', detail: '有垃圾', status: '待处理', inCharge: '小天'
    },
    {
        time: '2017-05-09 17:20', name: '小东', site: '楼递间', detail: '有垃圾', status: '待处理', inCharge: '小天'
    }
    ]
    testData2 = [{
        time: '2017-05-09 17:20', name: '小东', site: '楼递间', detail: '过期', equip_num: '123456', issue: '是否过期', status: '待处理', inCharge: '小天'
    },
    {
        time: '2017-05-09 17:20', name: '小东', site: '楼递间', detail: '过期', equip_num: '123456', issue: '是否过期', status: '待处理', inCharge: '小天'
    }]

    list:Observable<BossReportLineState[]>;
    user_name:Observable<string>;
    list_length:Observable<number>;
    constructor(
        private navParams: NavParams,
        private navCtrl: NavController,
        private bossService: BossService,
        private plugin: PluginService,
        private $store: Store<MyStore>
    ) { }
    ngOnInit() {
        this.type = this.navParams.get('type') || 1;
        this.list = this.$store.select('lineReducer');
        this.user_name = this.$store.select('userReducer').map((user:UserState) => user.nickname);
        this.list_length = this.list.map((ls) => ls.length);
    }


    toDetail(item: any) {
        console.log(item);
        if(typeof item.PROBLEM_PICTURES === 'string') {
            item.PROBLEM_PICTURES =this.plugin.getPictureUrlArray(item.PROBLEM_PICTURES)
        }
        this.navCtrl.push('IssueDetailComponent', {
            issue: item,
            type: this.type
        })
    }
}