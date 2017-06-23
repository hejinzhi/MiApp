import { Component, OnInit, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { NavController, NavParams, AlertController, Platform, App, Loading, Events } from 'ionic-angular';
import { Observable, Subscription, Subject } from 'rxjs/Rx';
import { MessageModel } from '../shared/models/message.model';

import { JMessageService } from '../core/services/jmessage.service';
import { MessageService } from './shared/service/message.service';
import { Message, NoticeContent } from './shared/classes/Message';
import { DialogueComponent } from './dialogue/dialogue.component';
import { NoticeComponent } from './notice/notice.component';
import { AlertComponent } from './alert/alert.component';

import { MyHttpService } from '../core/services/myHttp.service';
import { LanguageConfig } from './shared/config/language.config';
import { DatabaseService } from './shared/service/database.service';

@Component({
  selector: 'sg-message',
  templateUrl: 'message.component.html'
})

export class MessageComponent implements OnInit {

  languageType: string = localStorage.getItem('languageType');
  languageContent = LanguageConfig.MessageComponent[this.languageType];
  msgListItem: MessageModel[] = [];
  historyMsg: any[] = []; // 在app.component.ts被赋值
  messageListItem: any;
  noticeListItem: any;
  _type: string;
  loading: Loading;
  onSyncOfflineMessageHandler: Subscription;
  userinfo: any; //登录人信息


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private jmessageService: JMessageService,
    private alertCtrl: AlertController,
    private ref: ChangeDetectorRef,
    private messageService: MessageService,
    private platform: Platform,
    public appCtrl: App,
    private myHttp: MyHttpService,
    private events: Events,
    private databaseService: DatabaseService
  ) {
  }


  ionViewWillEnter() {
    this.refreshData();
  }

  ngOnInit() {
    this.userinfo = JSON.parse(localStorage.getItem('currentUser'));

    // 读取离线消息
    this.jmessageService.jmessageOffline = this.jmessageService.onSyncOfflineMessage().subscribe(res => {

      for (let i = 0; i < res.messageList.length; i++) {
        let _content: string;

        if (res.messageList[i].contentType === 'text') {
          _content = res.messageList[i].content.text;
        } else if (res.messageList[i].contentType === 'image') {
          _content = res.messageList[i].content.localThumbnailPath;
        }

        if (res.messageList[i].fromName === 'signlist' || res.messageList[i].fromName === 'news' || res.messageList[i].fromName === 'alert' || res.messageList[i].fromName === 'report') {
          this._type = 'notice';
          _content = JSON.parse(res.messageList[i].content.text);
        } else {
          this._type = 'dialogue';
        }

        let msg: Message = {
          toUserName: res.messageList[i].targetInfo.userName,
          fromUserName: res.messageList[i].fromName,
          content: _content,
          contentType: res.messageList[i].contentType,
          time: res.messageList[i].createTimeInMillis,
          type: this._type,
          unread: true
        };

        this.messageService.history.push(msg);
        this.messageService.setLocalMessageHistory(this.messageService.history);

        this.refreshData();
        this.ref.detectChanges();
      }
    });

    // 监听是否有消息推送过来
    this.jmessageService.jmessageHandler = this.jmessageService.onReceiveMessage().subscribe(async (res) => {
      await this.handleReceiveMessage(res);
    });

  }

  async handleReceiveMessage(res: any) {
    let _content: string;
    if (res.contentType === 'text') {
      _content = res.content.text;
    } else if (res.contentType === 'image') {
      _content = res.content.localThumbnailPath;
    }

    if (res.fromName === 'signlist' || res.fromName === 'news' || res.fromName === 'alert' || res.fromName === 'report') {
      this._type = 'notice';
      _content = JSON.parse(res.content.text);
    } else {
      this._type = 'dialogue';
    }

    let msg: Message = {
      toUserName: res.targetInfo.userName,
      fromUserName: res.fromName,
      content: _content,
      contentType: res.contentType,
      time: res.createTimeInMillis,
      type: this._type,
      unread: true
    };

    await this.databaseService.addMessage(res.targetInfo.userName, res.fromName, _content, res.contentType, res.createTimeInMillis, this._type, 'Y', JSON.stringify(res.content.extras))
    this.messageListItem = await this.messageService.getMessageHistory(this.userinfo.username, 'dialogue');
    this.ref.detectChanges();
    this.events.publish('msg.onReceiveMessage');
  }



  async refreshData() {
    this.messageListItem = await this.messageService.getMessageHistory(this.userinfo.username, 'dialogue');
  };


  goToMessageDetailPage(item: any) {
    if (item.type === 'dialogue') {
      this.navCtrl.push(DialogueComponent, item);
    } else if (item.type === 'notice') {
      if (item.username === 'alert') {
        this.navCtrl.push(AlertComponent, item);
      } else {
        this.navCtrl.push(NoticeComponent, item);
      }
    }
  }

  getItems(ev: any) {

  }

  showError(text: string) {
    setTimeout(() => {
      this.loading.dismiss();
    });

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  // ionViewWillLeave() {
  //   this.jmessageService.jmessageHandler.unsubscribe();
  //   this.onSyncOfflineMessageHandler.unsubscribe();
  // }

  public sendSingleMsg() {
    // this.jmessageService.sendSingleTextMessageWithExtras('hugh.liang', 'test', { name: 'hejinzhi' });
    this.databaseService.deleteAllMessages();
  }
}
