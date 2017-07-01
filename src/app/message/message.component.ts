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
  messageListItem: any[];
  noticeListItem: any[];
  _type: string;
  loading: Loading;
  onSyncOfflineMessageHandler: Subscription;
  userinfo: any; //登录人信息
  plf: string; // 记录是什么平台
  firstTimeRefresh: boolean = true; // 是否第一次进入这个画面


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
        // this.messageListItem = await this.messageService.getMessageHistory(this.userinfo.username, 'dialogue');
        // this.noticeListItem = await this.messageService.getMessageHistory(this.userinfo.username, 'notice');
        await this.refreshData();
        this.ref.detectChanges();
        this.events.publish('msg.onReceiveMessage');
        this.events.publish('msg.onChangeTabBadge');
      });

      // 监听是否有消息推送过来
      this.jmessageService.jmessageHandler = this.jmessageService.onReceiveMessage().subscribe(async (res) => {
        let msg: any;
        if (this.plf === 'ios') {
          msg = await this.handleReceiveMessageIos(res);
        } else if (this.plf === 'android') {
          msg = await this.handleReceiveMessageAndroid(res);
        }
        await this.refreshData();
        this.ref.detectChanges();
        this.events.publish('msg.onReceiveMessage', msg);
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

    await this.databaseService.addMessage(res.targetInfo.userName, res.fromName, _content, res.contentType, res.createTimeInMillis, this._type, 'Y',
      JSON.stringify(res.content.extras), child_type);

    return msg;
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

    await this.databaseService.addMessage(res.content.target_id, res.content.from_id, _content, res.content.msg_type, res.content.create_time, this._type, 'Y',
      JSON.stringify(res.content.msg_body.extras), child_type);

    return msg;

  }



  async refreshData() {
    if (this.firstTimeRefresh) {
      this.noticeListItem = await this.messageService.getMessageHistory(this.userinfo.username, 'notice');
      this.messageListItem = await this.messageService.getMessageHistory(this.userinfo.username, 'dialogue');
      this.firstTimeRefresh = false;
    } else {
      let newMessageData: any[] = await this.messageService.getMessageHistory(this.userinfo.username, 'dialogue');
      // 当后台返回的数据条数大于目前的数据条数，则证明有新的联系人发消息过来
      //要把新联系人加进来，而且要检查旧联系人是否也有发信息过来
      if (newMessageData.length > this.messageListItem.length) {

        for (let i = 0; i < newMessageData.length; i++) {
          let flag = true;
          for (let j = 0; j < this.messageListItem.length; j++) {
            if (newMessageData[i] == this.messageListItem[j])
              flag = false;
          }
          if (flag) {
            this.messageListItem.push(newMessageData[i]);
          }
        }

        // 检查旧联系人是否有发信息过来
        for (let i = 0; i < this.messageListItem.length; i++) {
          for (let j = 0; j < newMessageData.length; j++) {
            if (this.messageListItem[i].fromUserName === newMessageData[j].fromUserName) {
              this.messageListItem[i].content = newMessageData[j].content;
              this.messageListItem[i].timedesc = newMessageData[j].timedesc;
              break;
            }
          }
        }
      }
      // 记录条数一致
      else if (newMessageData.length == this.messageListItem.length) {
        // 检查旧联系人是否有发信息过来
        for (let i = 0; i < this.messageListItem.length; i++) {
          for (let j = 0; j < newMessageData.length; j++) {
            if (this.messageListItem[i].fromUserName === newMessageData[j].fromUserName) {
              this.messageListItem[i].content = newMessageData[j].content;
              this.messageListItem[i].timedesc = newMessageData[j].timedesc;
              this.messageListItem[i].unreadCount = newMessageData[j].unreadCount;
              break;
            }
          }
        }
      }
      // 本地记录大于数据库记录，不应该出现这种情况，按新数据为准
      else {
        this.messageListItem = newMessageData;
      }
    }

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

    this.messageListItem[0].unreadCount = 10;
    // this.ref.detectChanges();

  }

  public deleteAllMsgs() {
    this.databaseService.deleteAllMessages();
  }
}

