import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavParams, Events, NavController } from 'ionic-angular';
import { MessageService } from '../shared/service/message.service';
import { JMessageService } from '../../core/services/jmessage.service';

import { LanguageConfig } from '../shared/config/language.config';

@Component({
  selector: 'sg-notice',
  templateUrl: 'notice.component.html'
})

export class NoticeComponent implements OnInit {

  languageType: string = localStorage.getItem('languageType');
  languageContent = LanguageConfig.NoticeComponent[this.languageType];

  fromUserNickName: string;
  fromUserName: string;
  list: any;
  userInfo: any; // 登录人信息
  alertType: string;
  showChartFlag: boolean = false;

  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    public messageService: MessageService,
    public jmessageService: JMessageService,
    private ref: ChangeDetectorRef,
    private events: Events) {

    this.fromUserName = params.get('fromUserName');
    this.fromUserNickName = params.get('fromUserNickName');

    if (this.fromUserName === 'alert') {
      this.alertType = params.data.childType;
    }
  }

  ionViewWillEnter() {
    this.scroll_down();
  }

  ionViewDidEnter() {
    this.events.subscribe('msg.onReceiveMessage', async () => {
      await this.loadMessage();
      this.ref.detectChanges();
      this.scroll_down();
    });
    this.jmessageService.enterSingleConversation(this.fromUserName);
  }

  async ionViewWillLeave() {
    await this.messageService.setUnreadToZeroByUserName(this.userInfo.username, this.fromUserName, this.alertType);
    this.jmessageService.setSingleConversationUnreadMessageCount(this.fromUserName, null, 0);
    this.jmessageService.exitConversation();
    this.events.publish('msg.onChangeTabBadge');
  }

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem('currentUser'));
    this.loadMessage();

  }

  toggleChart(item: any) {
    this.showChartFlag = !this.showChartFlag;
    item.extra.showChart = this.showChartFlag;
    // setTimeout(() => {
    //   this.scroll_down();
    // }, 100);
  }

  goToDetail(page: string) {
    console.log(page);
    this.navCtrl.push(page);
  }

  async loadMessage() {

    this.list = await this.messageService.getMessagesByUsername(this.userInfo.username, this.fromUserName, this.userInfo.username);
    if (this.fromUserName === 'alert') {
      this.list = this.list.filter((v: any) => (v.childType === this.alertType));
    }
  };

  scroll_down() {
    setTimeout(() => {
      var div = document.getElementsByClassName('msg-content');
      div[0].scrollTop = div[0].scrollHeight;
    }, 100);

  }

}

