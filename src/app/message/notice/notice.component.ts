
import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { MessageService } from '../shared/service/message.service';
import { JMessageService } from '../../core/services/jmessage.service';



@Component({
  selector: 'sg-notice',
  templateUrl: 'notice.component.html'
})

export class NoticeComponent implements OnInit {

  userNickName: string;
  userName: string;
  list: any;
  userinfo: any;
  alertType: string;

  constructor(public params: NavParams, public messageService: MessageService, public jmessageService: JMessageService) {
    this.userName = params.get('username');
    this.userNickName = params.get('userNickName');
    if (this.userName === "" || typeof this.userName === 'undefined') {

      this.userName = params.get('fromUserName');
    }
    if (this.userNickName === "" || typeof this.userNickName === 'undefined') {
      this.userNickName = params.get('fromUserNickName');
    }

    if (this.userName === 'alert') {
      this.alertType = params.data.content.type;
    }
  }

  ionViewWillLeave() {
    this.messageService.setUnreadToZeroByUserName(this.userName,this.alertType);
  }

  ngOnInit() {
    this.loadMessage();
  }

  async loadMessage() {
    this.userinfo = await this.messageService.getUserInfo();
    this.list = await this.messageService.getNoticeHistoryByID(this.userName);
    if (this.userName === 'alert') {
      this.list = this.list.filter((v: any) => (v.content.type === this.alertType));
    }
  };

}

