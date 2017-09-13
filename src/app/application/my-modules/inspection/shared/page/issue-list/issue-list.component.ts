import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

@IonicPage()
@Component({
    selector: 'sg-issue-list',
    templateUrl: 'issue-list.component.html'
})

export class IssueListComponent implements OnInit {

    type:number =1;

    testData1=[{
        time:'2017-05-09 17:20',name:'小东',site:'楼递间',detail:'有垃圾',status:'open',inCharge:'小天'
    }]
    testData2=[{
        time:'2017-05-09 17:20',name:'小东',site:'楼递间',detail:'过期',equip_num:'123456',issue:'是否过期',status:'open',inCharge:'小天'
    }]
    constructor(
        private navParams: NavParams,
        private navCtrl: NavController,
    ) { }
    ngOnInit() { 
        this.type = this.navParams.get('type') || 1;
    }

    toDetail(item:any) {
        console.log(item);
        this.navCtrl.push('IssueDetailComponent',{
            issue:item,
            type:this.type
        })
    }
}