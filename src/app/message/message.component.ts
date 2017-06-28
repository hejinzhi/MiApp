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
import { PluginService } from '../core/services/plugin.service';

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
  plf: string; // 记录是什么平台


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
    private databaseService: DatabaseService,
    private pluginService: PluginService
  ) {
  }


  ionViewWillEnter() {
    if (this.pluginService.isCordova()) {
      this.refreshData();
    }

  }

  ionViewDidLeave() {
    if (this.pluginService.isCordova()) {
      this.jmessageService.jmessageOffline.unsubscribe();
    }
  }

  ngOnInit() {
    if (this.pluginService.isCordova()) {
      this.userinfo = JSON.parse(localStorage.getItem('currentUser'));
      if (this.platform.is('ios')) {
        this.plf = 'ios';
      } else if (this.platform.is('android')) {
        this.plf = 'android';
      }

      // 读取离线消息
      this.jmessageService.jmessageOffline = this.jmessageService.onSyncOfflineMessage().subscribe(async (res) => {
        for (let i = 0; i < res.messageList.length; i++) {
          if (this.plf === 'ios') {
            await this.handleReceiveMessageIos(res.messageList[i]);
          } else if (this.plf === 'android') {
            await this.handleReceiveMessageAndroid(res.messageList[i]);
          }

        }
        this.messageListItem = await this.messageService.getMessageHistory(this.userinfo.username, 'dialogue');
        this.ref.detectChanges();
        this.events.publish('msg.onReceiveMessage');
        this.events.publish('msg.onChangeTabBadge');
      });

      // 监听是否有消息推送过来
      this.jmessageService.jmessageHandler = this.jmessageService.onReceiveMessage().subscribe(async (res) => {
        console.log(res);
        if (this.plf === 'ios') {
          await this.handleReceiveMessageIos(res);
        } else if (this.plf === 'android') {
          await this.handleReceiveMessageAndroid(res);
        }
        this.messageListItem = await this.messageService.getMessageHistory(this.userinfo.username, 'dialogue');
        this.noticeListItem = await this.messageService.getMessageHistory(this.userinfo.username, 'notice');
        this.ref.detectChanges();
        this.events.publish('msg.onReceiveMessage');
        this.events.publish('msg.onChangeTabBadge');
      });

    }
  }

  async handleReceiveMessageAndroid(res: any) {
    let _content: string;
    let child_type: string;
    if (res.contentType === 'text') {
      _content = res.content.text;
    } else if (res.contentType === 'image') {
      _content = res.content.localThumbnailPath;
    }

    if (res.fromName === 'signlist' || res.fromName === 'news' || res.fromName === 'alert' || res.fromName === 'report') {
      this._type = 'notice';
      _content = res.content.text;
      if (res.fromName === 'alert') {
        child_type = res.content.extras.members.type.value;
      }
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

    await this.databaseService.addMessage(res.targetInfo.userName, res.fromName, _content, res.contentType, res.createTimeInMillis, this._type, 'Y', JSON.stringify(res.content.extras), child_type)
  }

  async handleReceiveMessageIos(res: any) {
    let _content: string;
    let child_type: string;
    if (res.content.msg_type === 'text') {
      _content = res.content.msg_body.text;
    } else if (res.content.msg_type === 'image') {
      _content = res.content.localThumbnailPath;
    }

    if (res.content.from_id === 'signlist' || res.content.from_id === 'news' || res.content.from_id === 'alert' || res.content.from_id === 'report') {
      this._type = 'notice';
      _content = res.content.msg_body.text;
      if (res.fromName === 'alert') {
        child_type = res.content.msg_body.extras.type;
      }
    } else {
      this._type = 'dialogue';
    }

    let msg: Message = {
      toUserName: res.content.target_id,
      fromUserName: res.content.from_id,
      content: _content,
      contentType: res.content.msg_type,
      time: res.content.create_time,
      type: this._type,
      unread: true
    };

    await this.databaseService.addMessage(res.content.target_id, res.content.from_id, _content, res.content.msg_type, res.content.create_time, this._type, 'Y', JSON.stringify(res.content.msg_body.extras), child_type)

  }



  async refreshData() {
    this.noticeListItem = await this.messageService.getMessageHistory(this.userinfo.username, 'notice');
    this.messageListItem = await this.messageService.getMessageHistory(this.userinfo.username, 'dialogue');
  };


  goToMessageDetailPage(item: any) {
    if (item.type === 'dialogue') {
      this.navCtrl.push(DialogueComponent, item);
    } else if (item.type === 'notice') {
      if (item.fromUserName === 'alert') {
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
    // this.databaseService.deleteAllMessages();

    // this.databaseService.getMessageList(this.userinfo.username, 'notice').then((data) => {
    //   console.log(data);
    //   console.log(JSON.parse(data[0].extra));
    // });

    this.databaseService.getAllMessages().then(data => {
      console.log(data);
    });

  }

  public deleteAllMsgs() {
    this.databaseService.deleteAllMessages();
  }
}

