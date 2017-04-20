import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, AlertController, Platform, App } from 'ionic-angular';
import { MessageModel } from '../shared/models/message.model';

import { JMessageService } from '../core/services/jmessage.service';
import { MessageService } from './shared/service/message.service';
import { Message } from './shared/classes/Message';
import { DialogueComponent } from './dialogue/dialogue.component';

@Component({
  selector: 'sg-message',
  templateUrl: 'message.component.html'
})

export class MessageComponent implements OnInit {

  msgListItem: MessageModel[] = [];
  historyMsg: any[] = []; // 在app.component.ts被赋值
  messageListItem;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private jmessageservice: JMessageService,
    private alertCtrl: AlertController,
    private ref: ChangeDetectorRef,
    private messageservice: MessageService,
    private platform: Platform,
    public appCtrl: App) {
  }



  ngOnInit() {

    this.jmessageservice.jmessageHandler = this.jmessageservice.onReceiveMessage().subscribe(res => {

      let _content: string;
      if (res.contentType === 'text') {
        _content = res.content.text;
      } else if (res.contentType === 'image') {
        _content = res.content.localThumbnailPath;
      }

      let msg: Message = {
        toUserName: res.targetInfo.userName,
        fromUserName: res.fromName,
        content: _content,
        contentType: res.contentType,
        time: res.createTimeInMillis,
        type: 'dialogue',
        unread: true
      };

      this.messageservice.history.push(msg);

      this.messageservice.setLocalMessageHistory(this.messageservice.history);
      this.jmessageservice.setSingleConversationUnreadMessageCount(res.fromName, '', 0);

      this.messageListItem = this.messageservice.getMessageHistory();
      this.ref.detectChanges();

    });
    this.loadUnreadMessage();
  }

  // 当用户点击登录后，先去检查它是否有未收到的信息，如果有，往本地写入这些信息，这样message才能显示完成
  loadUnreadMessage() {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    let _content: string;
    this.jmessageservice.getConversationList().then(res => {
      let conversationList: any[] = JSON.parse(res);
      conversationList = conversationList.filter((v) => v.unReadMsgCnt > 0);
      for (let i = 0; i < conversationList.length; i++) {
        this.jmessageservice.getHistoryMessages('single', conversationList[i].targetId, '', 0, conversationList[i].unReadMsgCnt).then(res => {
          let resObj = JSON.parse(res);

          for (let j = 0; j < resObj.length; j++) {

            if (resObj[j].contentType === 'text') {
              _content = resObj[j].content.text;
            } else if (resObj[j].contentType === 'image') {
              _content = resObj[j].content.localThumbnailPath;
            }

            let msg: Message = {
              toUserName: user.username,  // this.dataService.userinfo.username
              fromUserName: resObj[j].fromID,
              content: _content,
              contentType: resObj[j].contentType,
              time: resObj[j].createTimeInMillis,
              type: 'dialogue',
              unread: true
            };

            this.messageservice.history.push(msg);

          }
          this.jmessageservice.setSingleConversationUnreadMessageCount(conversationList[i].targetId, '', 0);
          this.messageservice.setLocalMessageHistory(this.messageservice.history);
        })

      }
      this.refreshData();
    });
  }

  ionViewWillEnter() {
    this.refreshData();
  }

  refreshData() {
    this.messageListItem = this.messageservice.getMessageHistory();
  };



  goToMessageDetailPage(item) {
    if (item.type === 'dialogue') {
      this.navCtrl.push(DialogueComponent, item);
    } else {
      // this.navCtrl.push('notice');
    }
  }
}
