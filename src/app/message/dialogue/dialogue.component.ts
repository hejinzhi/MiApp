
import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Keyboard } from '@ionic-native/keyboard';

import { MessageService } from '../shared/service/message.service';
import { JMessageService } from '../../core/services/jmessage.service';


@Component({
  selector: 'sg-dialogue',
  templateUrl: 'dialogue.component.html'
})

export class DialogueComponent implements OnInit, AfterViewChecked {
  list: any;
  input_text: string;
  userinfo: any;
  onPlus: boolean = false;

  userName: string;
  userNickName: string;

  jmessageHandler: Subscription; //接收句柄，再view被关闭的时候取消订阅，否则对已关闭的view进行数据脏检查会报错

  constructor(private messageService: MessageService, public params: NavParams, private jmessageService: JMessageService, private ref: ChangeDetectorRef, public keyboard: Keyboard, public camera: Camera) {

    this.userName = params.get('username');
    this.userNickName = params.get('userNickName');
  }

  ngOnInit() {
    this.loadMessage();
  }


  ionViewDidEnter() {
    this.jmessageHandler = this.jmessageService.onReceiveMessage().subscribe(res => {

      this.messageService.getMessageHistoryByID(this.userName).then((res => {
        this.list = res;
        this.ref.detectChanges();
      }));
    });

    // this.jmessageService.enterSingleConversation(this.userName);
  }

  ionViewWillLeave() {
    // this.jmessageHandler.unsubscribe();
    this.messageService.setUnreadToZeroByUserName(this.userName,'');
    // this.jmessageService.setSingleConversationUnreadMessageCount(this.userName, null, 0);
    // this.jmessageService.exitConversation();
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.scroll_down();
    }, 10);
  }

  ngAfterViewChecked() {
    // var div = document.getElementsByClassName('msg-content');
    // div[0].scrollTop = div[0].scrollHeight;
  }

  clickPlus() {
    this.onPlus = !this.onPlus;
    setTimeout(() => {
      this.scroll_down();
    }, 10);
  }

  isPlus() {
    this.onPlus = false;

    if (/Android [4-6]/.test(navigator.appVersion)) {
      window.addEventListener("resize", function () {
        if (document.activeElement.tagName == "INPUT" || document.activeElement.tagName == "TEXTAREA") {
          window.setTimeout(function () {
            document.activeElement.scrollIntoView();
          }, 0);
        }
      })
    }
    this.keyboard.onKeyboardShow().subscribe(() => {
      setTimeout(() => {
        this.scroll_down();
      }, 10);
    })
  }

  async loadMessage() {
    this.userinfo = await this.messageService.getUserInfo();
    this.list = await this.messageService.getMessageHistoryByID(this.userName);
  };

  scroll_down() {
    var div = document.getElementsByClassName('msg-content');
    div[0].scrollTop = div[0].scrollHeight;
  }

  //type: 1是文字，2是圖片
  sendMessage(type: number, content: string) {
    let contentType: string;

    if (type === 1) {
      contentType = "text";
    } else if (type === 2) {
      contentType = "image";
    }

    let history = this.messageService.history;
    let msg = [{
      "toUserName": this.userName,
      "fromUserName": this.userinfo.username,
      "content": content,
      "contentType": contentType,
      "time": +new Date(),
      "type": "dialogue",
      "unread": true
    }];
    history.push(msg[0]);
    this.messageService.setLocalMessageHistory(history);
    if (type === 1) {
      this.jmessageService.sendSingleTextMessage(this.userName, content);
    }
    else if (type === 2) {
      this.jmessageService.sendSingleImageMessage(this.userName, content);
    }
    msg = this.messageService.leftJoin(msg, this.messageService.allUserInfo);
    this.list.push(msg[0])
    this.input_text = '';
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
}

