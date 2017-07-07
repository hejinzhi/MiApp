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
    fromUserAvatarSrc: string;
    unreadCount: number; //未读消息数，如果大于0，退出dialogue页面时把未读消息更新为已读。否则不更新

    toUserName: string;
    toUserNickName: string;
    toUserAvatarSrc: string;


    jmessageHandler: Subscription; //接收句柄，再view被关闭的时候取消订阅，否则对已关闭的view进行数据脏检查会报错
    keyboardOpen: boolean;
    msgContent: string;
    plf: string;
    onShowSubscription: Subscription;


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
        this.fromUserAvatarSrc = params.get('fromUserAvatarSrc');
        this.unreadCount = params.get('unreadCount');

        // 这里的toUserName一般是指当前登陆人
        this.toUserName = params.get('toUserName');
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

        // 获取当前登录人的昵称和头像
        let res = await this.messageservice.getUserAvatar(this.toUserName)
        let toUserObj = res.json();
        this.toUserNickName = toUserObj.NICK_NAME;
        this.toUserAvatarSrc = toUserObj.AVATAR_URL;
        await this.loadMessage();
    }


    async ionViewDidEnter() {
        this.events.subscribe('msg.onReceiveMessage', async (msg: any) => {
            if (msg) {
                this.getNickNameAndAvatar(msg);
                this.list.push(msg);
            } else {
                let data: any[] = await this.messageservice.getMessagesByUsername(this.userName, this.userinfo.username);
                data.forEach((value, index) => {
                    this.getNickNameAndAvatar(value);
                });
                this.list = data;
            }
            this.ref.detectChanges();
            this.scroll_down();
        });

        await this.messageservice.setUnreadToZeroByUserName(this.userName);
        this.jmessageservice.enterSingleConversation(this.userName);

        // this.scroll_down();
        if (this.plf === 'ios') {
            this.scroll_down();
        }

    }

    async ionViewWillLeave() {
        if (this.onShowSubscription) {
            this.onShowSubscription.unsubscribe();
        }
        this.events.unsubscribe('msg.onReceiveMessage');
        await this.messageservice.setUnreadToZeroByUserName(this.userName);
        this.jmessageservice.setSingleConversationUnreadMessageCount(this.userName, null, 0);
        this.events.publish('msg.onChangeTabBadge');
        this.jmessageservice.exitConversation();
    }

    ionViewWillEnter() {
        if (this.plf === 'android') {
            setTimeout(() => {
                this.scroll_down();
            }, 100);
        }

    }

    clickPlus() {
        if (localStorage.getItem('keyboardShow') === 'true') {
            this.keyboard.close();
        } else {
            this.onPlus = !this.onPlus;
            setTimeout(() => {
                if (this.plf === 'ios') {
                    this.content.getScrollElement().style.marginBottom = (200 + 44) + 'px';
                    this.content.resize();
                }
                this.scroll_down();
            }, 100);
        }

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
            this.scroll_down();

            this.onShowSubscription = this.keyboard.onKeyboardShow().subscribe(() => {
                setTimeout(() => {
                    this.scroll_down();
                }, 10);
            })
        }

    }

    async loadMessage() {
        let data: any[] = await this.messageservice.getMessagesByUsername(this.userName, this.userinfo.username);
        data.forEach((value, index) => {
            this.getNickNameAndAvatar(value);
        });
        this.list = data;
    };

    getNickNameAndAvatar(targetUser: any) {
        if (targetUser.fromUserName === this.userName) {
            targetUser.fromUserNickName = this.userNickName;
            targetUser.fromUserAvatarSrc = this.fromUserAvatarSrc;
        }
        // 这里代表是当前登陆人发出去的信息
        else {
            targetUser.fromUserNickName = this.toUserNickName;
            targetUser.fromUserAvatarSrc = this.toUserAvatarSrc;
        }

    }

    scroll_down() {
        let that = this;
        if (this.plf === 'android') {
            setTimeout(() => {
                var div = document.getElementsByClassName('msg-content');
                div[0].scrollTop = div[0].scrollHeight;
            }, 100);
        } else {
            // setTimeout(function() {
            that.content.scrollToBottom();
            // }, 100);
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
        let msg = {
            toUserName: this.userName,
            fromUserName: this.userinfo.username,
            content: content,
            contentType: contentType,
            time: +new Date(),
            type: "dialogue",
            unread: 'N',
        };
        this.getNickNameAndAvatar(msg);
        await this.databaseService.addMessage(msg.toUserName, msg.fromUserName, msg.content, msg.contentType, msg.time, msg.type, msg.unread, null, null);

        if (type === 1) {
            this.jmessageservice.sendSingleTextMessage(this.userName, content);
        }
        else if (type === 2) {
            this.jmessageservice.sendSingleImageMessage(this.userName, content);
        }
        this.list.push(msg)
        this.input_text = '';
        setTimeout(function () {
            that.scroll_down();
        }, 0);

    }

    getPhoto(type: number) {
        //  this.sendMessage(2,"'assets/avatar/thumbnail-puppy-1.jpg'");
        let options: CameraOptions = {
            //这些参数可能要配合着使用，比如选择了sourcetype是0，destinationtype要相应的设置
            quality: 50,                                            //相片质量0-100
            allowEdit: false,                                        //在选择之前允许修改截图
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: type,                                         //从哪里选择图片：PHOTOLIBRARY=0，相机拍照=1，SAVEDPHOTOALBUM=2。0和1其实都是本地图库
            encodingType: this.camera.EncodingType.JPEG,                   //保存的图片格式： JPEG = 0, PNG = 1
            targetWidth: 200,                                        //照片宽度
            targetHeight: 200,                                       //照片高度
            mediaType: 0,                                             //可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
            cameraDirection: 0,                                       //枪后摄像头类型：Back= 0,Front-facing = 1
            saveToPhotoAlbum: false                                   //保存进手机相册
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

