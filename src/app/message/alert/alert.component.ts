
import { Component, OnInit } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';

import { MessageService } from '../shared/service/message.service';
import { JMessageService } from '../../core/services/jmessage.service';
import { NoticeComponent } from '../notice/notice.component';

@Component({
  selector: 'sg-alert',
  templateUrl: 'alert.component.html'
})

export class AlertComponent implements OnInit {

  userNickName: string;
  userName: string;
  list: any;
  userinfo: any;
  att_unread: number;
  pro_unread: number;
  sal_unread: number;
  pur_unread: number;
  inv_unread: number;
  fin_unread: number;
  sfcs_unread: number;
  ims_unread: number;

  constructor(public navCtrl: NavController, public params: NavParams, public messageService: MessageService, public jmessageService: JMessageService) {
    this.userName = params.get('username');
    this.userNickName = params.get('userNickName');
  }

  ngOnInit() {
    this.userinfo = this.messageService.getUserInfo();
    this.loadMessage();
  }

  ionViewWillEnter() {
    this.loadMessage();
  }

  async loadMessage() {

    this.list = await this.messageService.getNoticeHistoryByID(this.userName);
    this.att_unread = this.getUnreadCount('att');
    this.pro_unread = this.getUnreadCount('pro');
    this.sal_unread = this.getUnreadCount('sal');
    this.pur_unread = this.getUnreadCount('pur');
    this.inv_unread = this.getUnreadCount('inv');
    this.fin_unread = this.getUnreadCount('fin');
    this.sfcs_unread = this.getUnreadCount('sfcs');
    this.sal_unread = this.getUnreadCount('sal');
  };

  getUnreadCount(type: string) {
    return this.list.filter((v: any) => (v.content.type === type && v.unread === true)).length;
  }

  goToNoticePage(type: string) {
    let item: any = this.list.filter((v: any) => (v.content.type === type));

    if ((Array.isArray(item) && item.length === 0) || (Object.prototype.isPrototypeOf(item) && Object.keys(item).length === 0)) {
      console.log('no message');
    }
    else {
      this.navCtrl.push(NoticeComponent, item[0]);
    }
  }

}

