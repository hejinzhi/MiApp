import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavParams, NavController, Events } from 'ionic-angular';

import { MessageService } from '../shared/service/message.service';
import { JMessageService } from '../../core/services/jmessage.service';
import { NoticeComponent } from '../notice/notice.component';

import { LanguageConfig } from '../shared/config/language.config';

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
  att_length: number;
  pro_length: number;
  sal_length: number;
  pur_length: number;
  inv_length: number;
  fin_length: number;
  sfcs_length: number;
  ims_length: number;

  constructor(public navCtrl: NavController,
    public params: NavParams,
    public messageService: MessageService,
    public jmessageService: JMessageService,
    private ref: ChangeDetectorRef,
    private events: Events) {
    this.userName = params.get('fromUserName');
    this.userNickName = params.get('fromUserNickName');
  }

  ngOnInit() {
    this.userinfo = JSON.parse(localStorage.getItem('currentUser'));
  }

  ionViewWillEnter() {
    this.loadMessage();
  }

  ionViewDidEnter() {
    this.events.subscribe('msg.onReceiveMessage', async () => {
      await this.loadMessage();
      this.ref.detectChanges();
    });
  }

  async ionViewWillLeave() {
    this.events.unsubscribe('msg.onReceiveMessage');
    this.events.publish('msg.onChangeTabBadge');
  }

  async loadMessage() {
    this.list = await this.messageService.getMessagesByUsername(this.userinfo.username, this.userName, this.userinfo.username);
    this.att_unread = this.getUnreadCount('att');
    this.pro_unread = this.getUnreadCount('pro');
    this.sal_unread = this.getUnreadCount('sal');
    this.pur_unread = this.getUnreadCount('pur');
    this.inv_unread = this.getUnreadCount('inv');
    this.fin_unread = this.getUnreadCount('fin');
    this.sfcs_unread = this.getUnreadCount('sfcs');
    this.ims_unread = this.getUnreadCount('ims');
    this.att_length = this.getAlertTypeCount('att');
    this.pro_length = this.getAlertTypeCount('pro');
    this.sal_length = this.getAlertTypeCount('sal');
    this.pur_length = this.getAlertTypeCount('pur');
    this.inv_length = this.getAlertTypeCount('inv');
    this.fin_length = this.getAlertTypeCount('fin');
    this.sfcs_length = this.getAlertTypeCount('sfcs');
    this.ims_length = this.getAlertTypeCount('ims');
  };

  getUnreadCount(type: string) {
    return this.list.filter((v: any) => (v.childType === type && v.unread === 'Y')).length;
  }

  getAlertTypeCount(type: string) {
    return this.list.filter((v: any) => (v.childType === type)).length;
  }

  goToNoticePage(type: string) {
    let item: any = this.list.filter((v: any) => (v.childType === type));

    if ((Array.isArray(item) && item.length === 0) || (Object.prototype.isPrototypeOf(item) && Object.keys(item).length === 0)) {
      console.log('no message');
    }
    else {
      this.navCtrl.push(NoticeComponent, item[0]);
    }
  }

}

