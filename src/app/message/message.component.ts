import { Component, OnInit, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { NavController, NavParams, AlertController, Platform, App, Loading, Events } from 'ionic-angular';
import { Observable, Subscription, Subject } from 'rxjs/Rx';
import { MessageModel } from '../shared/models/message.model';

import { JMessageService } from '../core/services/jmessage.service';
import { MessageService } from './shared/service/message.service';
import { Message } from './shared/classes/Message';
import { DialogueComponent } from './dialogue/dialogue.component';

import { MyHttpService } from '../core/services/myHttp.service';

@Component({
  selector: 'sg-message',
  templateUrl: 'message.component.html'
})

export class MessageComponent implements OnInit {

  msgListItem: MessageModel[] = [];
  historyMsg: any[] = []; // 在app.component.ts被赋值
  messageListItem: any;
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

    // this.onSyncOfflineMessageHandler = this.jmessageService.onSyncOfflineMessage().subscribe(res => {
    //   for (let i = 0; i < res.messageList.length; i++) {
    //     let _content: string;
    //     if (res.messageList[i].contentType === 'text') {
    //       _content = res.messageList[i].content.text;
    //     } else if (res.contentType === 'image') {
    //       _content = res.messageList[i].content.localThumbnailPath;
    //     }
    //     let msg: Message = {
    //       toUserName: res.messageList[i].targetInfo.userName,
    //       fromUserName: res.messageList[i].fromName,
    //       content: _content,
    //       contentType: res.messageList[i].contentType,
    //       time: res.messageList[i].createTimeInMillis,
    //       type: 'dialogue',
    //       unread: true
    //     };

    //     this.messageService.history.push(msg);
    //   }

    //   this.messageService.setLocalMessageHistory(this.messageService.history);
    //   this.jmessageService.setSingleConversationUnreadMessageCount(res.fromName, '', 0);

    //   this.messageListItem = this.messageService.getMessageHistory();
    //   this.ref.detectChanges();
    // });
    // this.jmessageService.jmessageHandler = this.jmessageService.onReceiveMessage().subscribe(res => {
    //   console.log('message');
    //   let _content: string;
    //   if (res.contentType === 'text') {
    //     _content = res.content.text;
    //   } else if (res.contentType === 'image') {
    //     _content = res.content.localThumbnailPath;
    //   }

    //   let msg: Message = {
    //     toUserName: res.targetInfo.userName,
    //     fromUserName: res.fromName,
    //     content: _content,
    //     contentType: res.contentType,
    //     time: res.createTimeInMillis,
    //     type: 'dialogue',
    //     unread: true
    //   };


    //   this.messageService.history.push(msg);

    //   this.messageService.setLocalMessageHistory(this.messageService.history);
    //   this.jmessageService.setSingleConversationUnreadMessageCount(res.fromName, '', 0);

    //   this.messageListItem = this.messageService.getMessageHistory();
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
      console.log(res);
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
    this.messageListItem = this.messageService.getMessageHistory();
  };


  goToMessageDetailPage(item: any) {
    if (item.type === 'dialogue') {
      this.navCtrl.push(DialogueComponent, item);
    } else {
      // this.navCtrl.push('notice');
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
