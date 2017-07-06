
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavParams, Events } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';

import { MessageService } from '../shared/service/message.service';
import { JMessageService } from '../../core/services/jmessage.service';

import { LanguageConfig } from '../shared/config/language.config';

@Component({
  selector: 'sg-notice',
  templateUrl: 'notice.component.html'
})

export class NoticeComponent implements OnInit {

  languageType: string = localStorage.getItem('languageType');
  languageContent = LanguageConfig.AlertComponent[this.languageType];

  fromUserNickName: string;
  fromUserName: string;
  list: any;
  userInfo: any; // 登录人信息
  alertType: string;


  constructor(
    public params: NavParams,
    public messageService: MessageService,
    public jmessageService: JMessageService,
    private ref: ChangeDetectorRef,
    private events: Events,
    private photoViewer: PhotoViewer) {

    this.fromUserName = params.get('fromUserName');
    this.fromUserNickName = params.get('fromUserNickName');


    if (this.fromUserName === 'alert') {
      this.alertType = params.data.childType;
    }
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.scroll_down();
    }, 0);
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
    await this.messageService.setUnreadToZeroByUserName(this.fromUserName, this.alertType);
    this.jmessageService.setSingleConversationUnreadMessageCount(this.fromUserName, null, 0);
    this.jmessageService.exitConversation();
    this.events.publish('msg.onChangeTabBadge');
  }

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem('currentUser'));
    this.loadMessage();

  }

  async loadMessage() {

    this.list = await this.messageService.getMessagesByUsername(this.fromUserName, this.userInfo.username);

    // this.list = await this.messageService.getNoticeHistoryByID(this.fromUserName);
    if (this.fromUserName === 'alert') {
      this.list = this.list.filter((v: any) => (v.childType === this.alertType));
    }
  };

  openPhoto(url: string) {
    this.photoViewer.show(url);
  }

  scroll_down() {
    var div = document.getElementsByClassName('msg-content');
    div[0].scrollTop = div[0].scrollHeight;
  }


}

