import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { NavParams, Events, Content, Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Keyboard } from '@ionic-native/keyboard';

import { MessageService } from '../shared/service/message.service';
import { JMessageService } from '../../core/services/jmessage.service';
import { LanguageConfig } from '../shared/config/language.config';
import { DatabaseService } from '../shared/service/database.service';
import { KeyboardAttachDirective } from '../shared/directive/KeyboardAttachDirective';

@Component({
  selector: 'sg-dialogue',
  templateUrl: 'dialogue.component.html'
})


export class DialogueComponent implements OnInit {
  @ViewChild(Content) content: Content;
  languageType: string = localStorage.getItem('languageType');
  languageContent = LanguageConfig.DialogueComponent[this.languageType];
  list: any;
  input_text: string;
  userinfo: any;
  onPlus: boolean = false;
  selectable: number;

  userName: string;
  userNickName: string;
  unreadCount: number; //未读消息数，如果大于0，退出dialogue页面时把未读消息更新为已读。否则不更新

  jmessageHandler: Subscription; //接收句柄，再view被关闭的时候取消订阅，否则对已关闭的view进行数据脏检查会报错
  keyboardOpen: boolean;
  msgContent: string;
  plf: string;


  constructor(private messageservice: MessageService,
    public params: NavParams,
    private jmessageservice: JMessageService,
    private ref: ChangeDetectorRef,
    public keyboard: Keyboard,
    public camera: Camera,
    private events: Events,
    private platform: Platform,
    private databaseService: DatabaseService) {

    this.userName = params.get('fromUserName');
    this.userNickName = params.get('fromUserNickName');
    this.unreadCount = params.get('unreadCount');


  }

  async ngOnInit() {
    if (this.platform.is('ios')) {
      this.plf = 'ios';
    } else if (this.platform.is('android')) {
      this.plf = 'android';
    }
    this.keyboard.hideKeyboardAccessoryBar(true);
    this.keyboard.disableScroll(true);
    this.userinfo = JSON.parse(localStorage.getItem('currentUser'));
    await this.loadMessage();
  }


  ionViewDidEnter() {
    this.events.subscribe('msg.onReceiveMessage', () => {
      this.messageservice.getMessagesByUsername(this.userName, this.userinfo.username).then((data) => {
        this.list = data;
        this.ref.detectChanges();
        this.content.scrollToBottom();
      });
    });

    this.jmessageservice.enterSingleConversation(this.userName);

  }

  async ionViewWillLeave() {
    this.events.unsubscribe('msg.onReceiveMessage');
    await this.messageservice.setUnreadToZeroByUserName(this.userName);
    this.jmessageservice.setSingleConversationUnreadMessageCount(this.userName, null, 0);
    this.events.publish('msg.onChangeTabBadge');
    this.jmessageservice.exitConversation();
  }

  ionViewWillEnter() {
    setTimeout(() => {
      // this.content.scrollToBottom();
      this.scroll_down();
    }, 10);
  }

  clickPlus() {
    this.onPlus = !this.onPlus;
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 0);
  }

  isPlus() {
    this.onPlus = false;
    if (/Android [4-7]/.test(navigator.appVersion)) {
      window.addEventListener("resize", function () {
        if (document.activeElement.tagName == "INPUT" || document.activeElement.tagName == "TEXTAREA") {
          window.setTimeout(function () {
            document.activeElement.scrollIntoView();
          }, 0);
        }
      })

      this.keyboard.onKeyboardShow().subscribe(() => {
        setTimeout(() => {
          this.scroll_down();
        }, 10);
      })
    }

  }

  async loadMessage() {
    this.list = await this.messageservice.getMessagesByUsername(this.userName, this.userinfo.username);
  };

  scroll_down() {
    let that = this;
    if (this.plf === 'android') {
      var div = document.getElementsByClassName('msg-content');
      div[0].scrollTop = div[0].scrollHeight;
    } else {
      setTimeout(function () {
        that.content.scrollToBottom();
      }, 0);
    }

  }

  //type: 1是文字，2是圖片
  async sendMessage(type: number, content: string) {
    let contentType: string;
    let that = this;

    if (type === 1) {
      contentType = "text";
    } else if (type === 2) {
      contentType = "image";
    }

    // let history = this.messageservice.history;
    let msg = [{
      "toUserName": this.userName,
      "fromUserName": this.userinfo.username,
      "content": content,
      "contentType": contentType,
      "time": +new Date(),
      "type": "dialogue",
      "unread": 'N'
    }];
    await this.databaseService.addMessage(msg[0].toUserName, msg[0].fromUserName, msg[0].content, msg[0].contentType, msg[0].time, msg[0].type, msg[0].unread, null, null);

    if (type === 1) {
      this.jmessageservice.sendSingleTextMessage(this.userName, content);
    }
    else if (type === 2) {
      this.jmessageservice.sendSingleImageMessage(this.userName, content);
    }
    msg = this.messageservice.leftJoin(msg, this.messageservice.allUserInfo);
    this.list.push(msg[0])
    this.input_text = '';
    setTimeout(function () {
      // that.content.scrollToBottom();
      that.scroll_down();
    }, 0);

  }

  getPhoto(type: number) {
    //  this.sendMessage(2,"'assets/avatar/thumbnail-puppy-1.jpg'");
    let options: CameraOptions = {
      //这些参数可能要配合着使用，比如选择了sourcetype是0，destinationtype要相应的设置
      quality: 100,                                            //相片质量0-100
      allowEdit: false,                                        //在选择之前允许修改截图
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: type,                                         //从哪里选择图片：PHOTOLIBRARY=0，相机拍照=1，SAVEDPHOTOALBUM=2。0和1其实都是本地图库
      encodingType: this.camera.EncodingType.JPEG,                   //保存的图片格式： JPEG = 0, PNG = 1
      targetWidth: 200,                                        //照片宽度
      targetHeight: 200,                                       //照片高度
      mediaType: 0,                                             //可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
      cameraDirection: 0,                                       //枪后摄像头类型：Back= 0,Front-facing = 1
      saveToPhotoAlbum: true                                   //保存进手机相册
    };
    this.camera.getPicture(options).then((imageData) => {
      // imageData is a base64 encoded string
      this.sendMessage(2, imageData);
    }, (err) => {
      console.log(err);
    });
  }

  getLocation() {
  };

  onBlur(event: any) {
    if (this.keyboardOpen) {
      event.target.focus()
    }
  }

  keyup(event: any) {
    this.msgContent = event.target.innerText
  }

  onFocus(event: any) {
    this.keyboardOpen = true
  }

  closeKeyboard() {
    this.keyboardOpen = false
    this.keyboard.close()
  }
}

