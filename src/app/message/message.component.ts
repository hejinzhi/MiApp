import { Component, OnInit, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { NavController, NavParams, AlertController, Platform, App, Loading, Events } from 'ionic-angular';
import { Observable, Subscription, Subject } from 'rxjs/Rx';
import { MessageModel } from '../shared/models/message.model';

import { JMessageService } from '../core/services/jmessage.service';
import { MessageService } from './shared/service/message.service';
import { Message } from './shared/classes/Message';
import { DialogueComponent } from './dialogue/dialogue.component';
import { NoticeComponent } from './notice/notice.component';
import { AlertComponent } from './alert/alert.component';

import { MyHttpService } from '../core/services/myHttp.service';
import { LanguageConfig } from './shared/config/language.config';

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

  onSyncOfflineMessageHandler: Subscription;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private jmessageService: JMessageService,
    private alertCtrl: AlertController,
    private ref: ChangeDetectorRef,
    private messageService: MessageService,
    private platform: Platform,
    public appCtrl: App,
    private myHttp: MyHttpService,
    private events: Events
  ) {
  }


  loading: Loading;

  ngOnInit() {

    // this.jmessageService.jmessageOffline = this.jmessageService.onSyncOfflineMessage().subscribe(res => {

    //   for (let i = 0; i < res.messageList.length; i++) {
    //     let _content: string;

    //     if (res.messageList[i].contentType === 'text') {
    //       _content = res.messageList[i].content.text;
    //     } else if (res.messageList[i].contentType === 'image') {
    //       _content = res.messageList[i].content.localThumbnailPath;
    //     }

    //     if (res.messageList[i].fromName === 'signlist' || res.messageList[i].fromName === 'news' || res.messageList[i].fromName === 'alert' || res.messageList[i].fromName === 'report') {
    //       this._type = 'notice';
    //       _content = JSON.parse(res.messageList[i].content.text);
    //     } else {
    //       this._type = 'dialogue';
    //     }

    //     let msg: Message = {
    //       toUserName: res.messageList[i].targetInfo.userName,
    //       fromUserName: res.messageList[i].fromName,
    //       content: _content,
    //       contentType: res.messageList[i].contentType,
    //       time: res.messageList[i].createTimeInMillis,
    //       type: this._type,
    //       unread: true
    //     };

    //     this.messageService.history.push(msg);
    //     this.messageService.setLocalMessageHistory(this.messageService.history);

    //     this.refreshData();
    //     this.ref.detectChanges();
    //   }
    // });

    // this.jmessageService.jmessageHandler = this.jmessageService.onReceiveMessage().subscribe(res => {
    //   let _content: string;
    //   if (res.contentType === 'text') {
    //     _content = res.content.text;
    //   } else if (res.contentType === 'image') {
    //     _content = res.content.localThumbnailPath;
    //   }

    //   if (res.fromName === 'signlist' || res.fromName === 'news' || res.fromName === 'alert' || res.fromName === 'report') {
    //     this._type = 'notice';
    //     _content = JSON.parse(res.content.text);
    //   } else {
    //     this._type = 'dialogue';
    //   }

    //   let msg: Message = {
    //     toUserName: res.targetInfo.userName,
    //     fromUserName: res.fromName,
    //     content: _content,
    //     contentType: res.contentType,
    //     time: res.createTimeInMillis,
    //     type: this._type,
    //     unread: true
    //   };

    //   this.messageService.history.push(msg);
    //   this.messageService.setLocalMessageHistory(this.messageService.history);
    //   this.jmessageService.setSingleConversationUnreadMessageCount(res.fromName, '', 0);
    //   this.refreshData();
    //   this.ref.detectChanges();
    //   this.events.publish('msg.onReceiveMessage');
    // });

  }

  // 当用户点击登录后，先去检查它是否有未收到的信息，如果有，往本地写入这些信息，这样message才能显示完成
  async loadUnreadMessage() {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    let _content: string;
    let res;
    try {
      res = await this.jmessageService.getConversationList();
      let conversationList: any[] = JSON.parse(res);
      conversationList = conversationList.filter((v) => v.unReadMsgCnt > 0);
      for (let i = 0; i < conversationList.length; i++) {
        let hisRes;
        hisRes = await this.jmessageService.getHistoryMessages('single', conversationList[i].targetId, '', 0, conversationList[i].unReadMsgCnt);
        let resObj = JSON.parse(hisRes);


        for (let j = 0; j < resObj.length; j++) {

          if (resObj[j].contentType === 'text') {
            _content = resObj[j].content.text;
          } else if (resObj[j].contentType === 'image') {
            _content = resObj[j].content.localThumbnailPath;
          }

          let msg: Message = {
            toUserName: user.username,  // this.dataService.userinfo.username
            fromUserName: resObj[j].fromName,
            content: _content,
            contentType: resObj[j].contentType,
            time: resObj[j].createTimeInMillis,
            type: 'dialogue',
            unread: true
          };
          this.messageService.history.push(msg);
        }
        this.jmessageService.setSingleConversationUnreadMessageCount(conversationList[i].targetId, '', 0);
        this.messageService.setLocalMessageHistory(this.messageService.history);
        this.refreshData();
      }
    }
    catch (err) {
      this.showError(err._body);
    }
  }

  ionViewWillEnter() {
    this.refreshData();
  }

  refreshData() {
    this.messageListItem = this.messageService.getMessageHistory().filter((v: any) => (v.type === "dialogue"));
    this.noticeListItem = this.messageService.getMessageHistory().filter((v: any) => (v.type === "notice"));
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


}
