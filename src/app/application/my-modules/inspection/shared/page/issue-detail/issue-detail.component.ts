import { IonicPage, NavParams, AlertController, NavController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

@IonicPage()
@Component({
    selector: 'sg-issue-detail',
    templateUrl: 'issue-detail.component.html'
})

export class IssueDetailComponent implements OnInit {
    type:number=0;
    issue:any;
    constructor(
        private navParams: NavParams,
        private navCtrl: NavController,
        private alertCtrl: AlertController,
    ) { }

    ngOnInit() {
        this.type = this.navParams.get('type') || 0;
        // this.type =1;
        this.issue = this.navParams.get('issue') || {};
    }

    pushBack() {
        let confirm = this.alertCtrl.create({
            title: `提示`,
            message: `确定此事项不是本人负责的吗?`,
            buttons: [
              {
                text: '取消',
                handler: () => {

                }
              },
              {
                text: '确定',
                handler: () => {
                    console.log(4);
                    this.navCtrl.pop();
                }
              }
            ]
          });
          confirm.present();
    }
}