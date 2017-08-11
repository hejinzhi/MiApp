import { Component, OnInit, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { NavController, NavParams, AlertController, Platform, App, Loading, Events } from 'ionic-angular';
import { Observable, Subscription, Subject } from 'rxjs/Rx';
import { MessageModel } from '../shared/models/message.model';
import { Geolocation } from '@ionic-native/geolocation';

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

declare var window: any;

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
  pos: number[] = [113.200585, 22.889573];


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
    private pluginService: PluginService,
    private geolocation: Geolocation
  ) {
  }


  async ionViewWillEnter() {
    if (this.pluginService.isCordova()) {
      await this.refreshData();
    }

  }

  ionViewDidLeave() {
    // if (this.pluginService.isCordova()) {
    //   this.jmessageService.jmessageOffline.unsubscribe();
    // }
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
      // this.jmessageService.jmessageOffline = this.jmessageService.onSyncOfflineMessage().subscribe(async (res) => {
      //   console.log(res, 444)
      //   for (let i = 0; i < res.messageList.length; i++) {
      //     if (this.plf === 'ios') {
      //       await this.handleReceiveMessageIos(res.messageList[i]);
      //     } else if (this.plf === 'android') {
      //       await this.handleReceiveMessageAndroid(res.messageList[i]);
      //     }

      //   }
      //   // this.messageListItem = await this.messageService.getMessageHistory(this.userinfo.username, 'dialogue');
      //   // this.noticeListItem = await this.messageService.getMessageHistory(this.userinfo.username, 'notice');
      //   await this.refreshData();
      //   this.ref.detectChanges();
      //   this.events.publish('msg.onReceiveMessage');
      //   this.events.publish('msg.onChangeTabBadge');
      // });

      // 监听是否有消息推送过来
      // this.jmessageService.jmessageHandler = this.jmessageService.onReceiveMessage().subscribe(async (res) => {
      //   console.log(555);
      //   let msg: any;
      //   if (this.plf === 'ios') {
      //     msg = await this.handleReceiveMessageIos(res);
      //   } else if (this.plf === 'android') {
      //     msg = await this.handleReceiveMessageAndroid(res);
      //   }
      //   await this.refreshData();
      //   this.ref.detectChanges();
      //   this.events.publish('msg.onReceiveMessage', msg);
      //   this.events.publish('msg.onChangeTabBadge');
      // });
      this.jmessageService.addReceiveMessageListener(async (res: any) => {
        console.log(res);
        let msg: any;
        if (res.type === 'text') {
          msg = await this.handleTextMessage(res);
        }
        else if (res.type === 'image') {
          msg = await this.handleImageMessage(res);
        }
        else if (res.type === 'voice') {
          msg = await this.handleVoiceMessage(res);
        }
        await this.refreshData();
        this.ref.detectChanges();
        this.events.publish('msg.onReceiveMessage', msg);
        this.events.publish('msg.onChangeTabBadge');
      });

    }
  }

  async handleTextMessage(res: TextMessage) {
    let _content: string = res.text;
    let child_type: string;
    let vounread: string = 'N';

    if (res.target.username === 'signlist' || res.target.username === 'news' || res.target.username === 'alert' || res.target.username === 'report') {
      this._type = 'notice';
    } else {
      this._type = 'dialogue';
    }

    let msg: Message = {
      toUserName: res.target.username,
      fromUserName: res.from.username,
      content: _content,
      contentType: res.type,
      time: res.createTime,
      type: this._type,
      unread: true,
      imageHeight: 0,
      imageWidth: 0,
      duration: '0',
      vounread: vounread,
      msgID: res.id
    };
    console.log(msg);

    await this.databaseService.addMessage(msg.toUserName, msg.fromUserName, this.userinfo.username, _content, 'text', msg.time, this._type, 'Y',
      JSON.stringify(res.extras), child_type, 0, 0, 0, vounread, res.id);

    return msg;
  }

  async handleImageMessage(res: ImageMessage) {
    let _content: string = res.thumbPath;
    let child_type: string;
    let vounread: string = 'N';
    this._type = 'dialogue';

    let msg: Message = {
      toUserName: res.target.username,
      fromUserName: res.from.username,
      content: _content,
      contentType: res.type,
      time: res.createTime,
      type: this._type,
      unread: true,
      imageHeight: res.extras.height,
      imageWidth: res.extras.width,
      duration: '0',
      vounread: vounread,
      msgID: res.id
    };
    console.log(msg);

    await this.databaseService.addMessage(msg.toUserName, msg.fromUserName, this.userinfo.username, _content, 'image', msg.time, this._type, 'Y',
      JSON.stringify(res.extras), child_type, 0, 0, 0, vounread, res.id);

    return msg;
  }

  async handleVoiceMessage(res: VoiceMessage) {
    let _content: string = res.path;
    let child_type: string;
    let vounread: string = 'N';
    this._type = 'dialogue';

    let msg: Message = {
      toUserName: res.target.username,
      fromUserName: res.from.username,
      content: _content,
      contentType: res.type,
      time: res.createTime,
      type: this._type,
      unread: true,
      imageHeight: 0,
      imageWidth: 0,
      duration: '0',
      vounread: vounread,
      msgID: res.id
    };
    console.log(msg);

    await this.databaseService.addMessage(msg.toUserName, msg.fromUserName, this.userinfo.username, _content, 'voice', msg.time, this._type, 'Y',
      JSON.stringify(res.extras), child_type, 0, 0, 0, vounread, res.id);

    return msg;
  }

  async handleReceiveMessageAndroid(res: any) {
    let _content: string;
    let child_type: string;
    let vounread: string = 'N';

    if (res.contentType === 'text') {
      _content = res.content.text;
    } else if (res.contentType === 'image') {
      _content = res.content.localThumbnailPath;
    } else if (res.contentType === 'voice') {
      _content = res.content.local_path;
      vounread = 'Y';
    }

    if (res.fromName === 'signlist' || res.fromName === 'news' || res.fromName === 'alert' || res.fromName === 'report') {
      this._type = 'notice';
      _content = res.content.text;

      //  if (res.fromName === 'alert') {
      //    child_type = res.content.extras.members.type.value;
      //  }
    } else {
      this._type = 'dialogue';
    }

    if (typeof res.content.extras.members.type === "object" && !(res.content.extras.members.type instanceof Array)) {
      child_type = res.content.extras.members.type.value;
    }

    let msg: Message = {
      toUserName: res.targetInfo.userName,
      fromUserName: res.fromName,
      content: _content,
      contentType: res.contentType,
      time: res.createTimeInMillis,
      type: this._type,
      unread: true,
      imageHeight: res.content.height,
      imageWidth: res.content.width,
      duration: res.content.duration,
      vounread: vounread,
      msgID: 0
    };

    await this.databaseService.addMessage(res.targetInfo.userName, res.fromName, this.userinfo.username, _content, res.contentType, res.createTimeInMillis, this._type, 'Y',
      JSON.stringify(res.content.extras), child_type, res.content.height, res.content.width, res.content.duration, vounread, 0);

    return msg;
  }

  async handleReceiveMessageIos(res: any) {
    let _content: string;
    let child_type: string;
    let vounread: string = 'N';
    if (res.content.msg_type === 'text') {
      _content = res.content.msg_body.text;
    } else if (res.content.msg_type === 'image') {
      let tempStr: string = res.resourcePath;
      tempStr = tempStr.replace('large', 'thumb');
      _content = tempStr;
    } else if (res.content.msg_type === 'voice') {
      //要添加IOS聲音地址
      // _content = res.content.msg_body.local_path;
      vounread = 'Y';
    }

    if (res.content.from_id === 'signlist' || res.content.from_id === 'news' || res.content.from_id === 'alert' || res.content.from_id === 'report') {
      this._type = 'notice';
      _content = res.content.msg_body.text;
      // if (res.content.from_id === 'alert') {
      //   child_type = res.content.msg_body.extras.type;
      // }
    } else {
      this._type = 'dialogue';
    }

    if (res.content.msg_body.extras && typeof res.content.msg_body.extras.type === "object" && !(res.content.msg_body.extras.type instanceof Array)) {
      child_type = res.content.msg_body.extras.type;
    }

    let msg: Message = {
      toUserName: res.content.target_id,
      fromUserName: res.content.from_id,
      content: _content,
      contentType: res.content.msg_type,
      time: res.content.create_time,
      type: this._type,
      unread: true,
      imageHeight: res.content.msg_body.height,
      imageWidth: res.content.msg_body.width,
      duration: res.content.msg_body.duration,
      vounread: vounread,
      msgID: 0
    };

    await this.databaseService.addMessage(res.content.target_id, res.content.from_id, this.userinfo.username, _content, res.content.msg_type, res.content.create_time, this._type, 'Y',
      JSON.stringify(res.content.msg_body.extras), child_type, res.content.msg_body.height, res.content.msg_body.width, res.content.msg_body.duration, vounread, 0);

    return msg;

  }


  async refreshData() {
    // if (this.firstTimeRefresh) {
    //   this.noticeListItem = await this.messageService.getMessageHistory(this.userinfo.username, 'notice');
    //   this.messageListItem = await this.messageService.getMessageHistory(this.userinfo.username, 'dialogue');
    //   this.firstTimeRefresh = false;
    // } else {
    //   let newNoticeData: any[] = await this.messageService.getMessageHistory(this.userinfo.username, 'notice');
    //   let newMessageData: any[] = await this.messageService.getMessageHistory(this.userinfo.username, 'dialogue');
    //   this.noticeListItem = this.changeLastMessage(newNoticeData, this.noticeListItem);
    //   this.messageListItem = this.changeLastMessage(newMessageData, this.messageListItem);
    // }
    this.noticeListItem = await this.messageService.getMessageHistory(this.userinfo.username, 'notice');
    this.messageListItem = await this.messageService.getMessageHistory(this.userinfo.username, 'dialogue');
  };

  changeLastMessage(newData: any[], oldData: any[]) {
    // 当后台返回的数据条数大于目前的数据条数，则证明有新的联系人发消息过来
    //要把新联系人加进来，而且要检查旧联系人是否也有发信息过来
    if (newData.length > oldData.length) {

      for (let i = 0; i < newData.length; i++) {
        let flag = true;
        for (let j = 0; j < oldData.length; j++) {
          if (newData[i].fromUserName === oldData[j].fromUserName)
            flag = false;
        }
        if (flag) {
          oldData.push(newData[i]);
        }
      }

      // 检查旧联系人是否有发信息过来
      for (let i = 0; i < oldData.length; i++) {
        for (let j = 0; j < newData.length; j++) {
          if (oldData[i].fromUserName === newData[j].fromUserName) {
            oldData[i].content = newData[j].content;
            oldData[i].timedesc = newData[j].timedesc;
            break;
          }
        }
      }
    }
    // 记录条数一致
    else if (newData.length == oldData.length) {
      // 检查旧联系人是否有发信息过来
      for (let i = 0; i < oldData.length; i++) {
        for (let j = 0; j < newData.length; j++) {
          if (oldData[i].fromUserName === newData[j].fromUserName) {
            oldData[i].content = newData[j].content;
            oldData[i].timedesc = newData[j].timedesc;
            oldData[i].unreadCount = newData[j].unreadCount;
            break;
          }
        }
      }
    }
    // 本地记录大于数据库记录，不应该出现这种情况，按新数据为准
    else {
      oldData = newData;
    }
    let sortData = oldData.sort((a, b) => {
      return b.time - a.time;
    });
    return sortData;
  }


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
    // this.databaseService.deleteAllAvatar();

    // this.databaseService.getMessageList(this.userinfo.username, 'notice').then((data) => {
    //   console.log(data);
    //   console.log(JSON.parse(data[0].extra));
    // });
    this.databaseService.getAllMessages().then(data => {
      console.log(data);
    });


    // window.JMessage.logout();
    // this.messageListItem[0].unreadCount = 10;

  }

  public async deleteMessage(item: any) {
    let that = this;
    let alert = this.alertCtrl.create();
    alert.setTitle(this.languageContent.deleteMessageAlertTitle);
    alert.addButton(this.languageContent.cancel);
    alert.addButton({
      text: this.languageContent.confirm,
      handler: (data: string) => {
        // that.databaseService.deleteMessagesByUser(that.userinfo.username, item.fromUserName, item.toUserName).then((res) => {
        that.databaseService.deleteMessagesByUser(that.userinfo.username, item.owner, item.toUserName).then((res) => {
          that.refreshData();
          that.ref.detectChanges();
          that.events.publish('msg.onChangeTabBadge');
        });
      }
    });
    alert.present();
    // await this.refreshData();
  }

  public deleteAllMsgs() {
    this.databaseService.deleteAllMessages();
  }

  showMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.pos = [resp.coords.latitude, resp.coords.longitude];
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
}

export class TextMessage {
  createTime: number;
  extras: object;
  from: UserInfo;
  id: number;
  target: UserInfo;
  text: string;
  type: string;
}

export class ImageMessage {
  createTime: number;
  extras: {
    height: number,
    width: number
  };
  from: UserInfo;
  id: number;
  target: UserInfo;
  thumbPath: string;
  type: string;
}

export class VoiceMessage {
  createTime: number;
  extras: object;
  from: UserInfo;
  id: number;
  target: UserInfo;
  path: string;
  type: string;
}

export class UserInfo {
  address: string;
  appKey: string;
  avatarThumbPath: string;
  birthday: number;
  gender: string;
  isFriend: boolean;
  isInBlackList: boolean;
  isNoDisturb: boolean;
  nickname: string;
  noteName: string;
  noteText: string;
  region: string;
  signature: string;
  type: string;
  username: string;

}

export class LocationMessage {
  id: string;
  type: string;
  from: UserInfo;
  target: UserInfo;
  extras: object;
  address: string;              // 详细地址。
  longitude: number;             // 经度。
  latitude: number;              // 纬度。
  scale: number;                // 地图缩放比例。
}

export class FileMessage {
  id: string;
  type: string; // file
  from: UserInfo;
  target: UserInfo;
  extras: object;
  fileName: string;            // 文件名。要下载完整文件需要调用 `downloadFile` 方法。
}

export class CustomMessage {
  id: string;
  type: string;
  from: UserInfo;
  target: UserInfo;
  extras: object;
  customObject: object;        // 自定义键值对对象。
}