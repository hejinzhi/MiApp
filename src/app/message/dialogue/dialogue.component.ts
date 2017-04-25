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
    list;
    input_text;
    userinfo;
    onPlus: boolean = false;

    userName;
    userNickName;

    jmessageHandler: Subscription; //接收句柄，再view被关闭的时候取消订阅，否则对已关闭的view进行数据脏检查会报错

    constructor(private messageservice: MessageService, public params: NavParams, private jmessageservice: JMessageService, private ref: ChangeDetectorRef, public keyboard: Keyboard, public camera: Camera) {

        this.userName = params.get('username');
        this.userNickName = params.get('userNickName');
        this.loadMessage();
    }

    ngOnInit() {
    }

    ionViewDidEnter() {
        this.jmessageHandler = this.jmessageservice.onReceiveMessage().subscribe(res => {
            this.messageservice.getMessageHistoryByID(this.userName).then((res => {
                this.list = res;
                this.ref.detectChanges();
            }));
        });

        this.jmessageservice.enterSingleConversation(this.userName);
    }

    ionViewWillLeave() {
        this.jmessageHandler.unsubscribe();
        this.messageservice.setUnreadToZeroByUserName(this.userName);
        this.jmessageservice.setSingleConversationUnreadMessageCount(this.userName, null, 0);
        this.jmessageservice.exitConversation();

    }



    ngAfterViewChecked() {
        var div = document.getElementsByClassName('scroll-content');
        div[2].scrollTop = div[2].scrollHeight;
    }

    isEmpty() {
        if (this.input_text && this.input_text.trim() != '') {
            return false;
        } else {
            return true;
        }
    };

    isPlus() {
        this.onPlus = false;
        this.keyboard.onKeyboardShow().subscribe(() => {
            var div = document.getElementsByClassName('scroll-content');
            div[2].scrollTop = div[2].scrollHeight;
        })
    }

    async loadMessage() {
        this.userinfo = await this.messageservice.getUserInfo();
        this.list = await this.messageservice.getMessageHistoryByID(this.userName);
    };

    //type: 1是文字，2是圖片
    sendMessage(type: number, content: string) {
        // let history = this.dataService.history;
        // let msg = [{
        //   "toUserName": this.userName,
        //   "fromUserName": this.userinfo.username,
        //   "content": this.input_text,
        //   "time": +new Date(),
        //   "type": "dialogue",
        //   "unread": true
        // }];
        // this.jmessage.sendSingleTextMessage(this.userName, this.input_text);
        // msg = this.dataService.leftJoin(msg, this.dataService.usersInfo);

        // history.push(msg[0]);
        // this.dataService.setLocalMessageHistory(history);
        // this.list.push(msg[0])
        // this.input_text = '';
        let contentType: string;

        if (type === 1) {
            contentType = "text";
        } else if (type === 2) {
            contentType = "image";
        }

        let history = this.messageservice.history;
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
        this.messageservice.setLocalMessageHistory(history);
        if (type === 1) {
            this.jmessageservice.sendSingleTextMessage(this.userName, content);
        }
        else if (type === 2) {
            this.jmessageservice.sendSingleImageMessage(this.userName, content);
        }
        msg = this.messageservice.leftJoin(msg, this.messageservice.allUserInfo);
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

