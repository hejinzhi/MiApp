import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { NavParams, NavController, Events, Content, Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Keyboard } from '@ionic-native/keyboard';
import { Geolocation } from '@ionic-native/geolocation';
import { Http } from '@angular/http';

import { MapComponent } from '../map/map.component';

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
    @ViewChild('newInput') newInput: any;
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

    showExtra: number;
    lastEditRange: any;
    lastEditSelection: any;

    jmessageHandler: Subscription; //接收句柄，再view被关闭的时候取消订阅，否则对已关闭的view进行数据脏检查会报错
    keyboardOpen: boolean;
    msgContent: string;
    plf: string;
    onShowSubscription: Subscription;
    // pos: number[] = [113.200585, 22.889573];
    addCtrl: string = 'N';


    constructor(private messageservice: MessageService,
        public params: NavParams,
        private jmessageservice: JMessageService,
        private ref: ChangeDetectorRef,
        public keyboard: Keyboard,
        public camera: Camera,
        private events: Events,
        private platform: Platform,
        private databaseService: DatabaseService,
        private geolocation: Geolocation,
        public navCtrl: NavController,
        private http: Http
    ) {

        this.userName = params.get('fromUserName');
        // this.userName = params.get('owner');
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

        document.onselectionchange = () => this.getPosition();

        // 获取当前登录人的昵称和头像
        let res = await this.messageservice.getUserAvatar(this.toUserName)
        let toUserObj = res.json();
        this.toUserNickName = toUserObj.NICK_NAME;
        this.toUserAvatarSrc = toUserObj.AVATAR_URL;
        await this.loadMessage();
    }


    async ionViewDidEnter() {
      this.newInput.nativeElement.innerHTML = '';
        this.events.subscribe('msg.onReceiveMessage', async (msg: any) => {
            if (msg) {
                // 当推送过来的消息发送者跟正在聊天的是同一个人时，在显示在画面
                if (this.userName === msg.fromUserName) {
                    this.getNickNameAndAvatar(msg);
                    this.list.push(msg);
                }

            } else {
                let data: any[] = await this.messageservice.getMessagesByUsername(this.userinfo.username, this.userName, this.userinfo.username);
                data.forEach((value, index) => {
                    this.getNickNameAndAvatar(value);
                });
                this.list = data;
            }
            this.ref.detectChanges();
            this.scroll_down();
        });

        await this.messageservice.setUnreadToZeroByUserName(this.userinfo.username, this.userName);
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
        await this.messageservice.setUnreadToZeroByUserName(this.userinfo.username, this.userName);
        this.jmessageservice.setSingleConversationUnreadMessageCount(this.userName, null, 0);
        this.events.publish('msg.onChangeTabBadge');
        this.jmessageservice.exitConversation();
        document.onselectionchange = function () { }
    }

    ionViewWillEnter() {
        this.newInput.nativeElement.innerHTML = '';
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
            this.onPlus = true;
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

    insertAfter(newElement: any, targetElement: any) {
        var parent = targetElement.parentNode;
        if (parent.lastChild == targetElement) {
            parent.appendChild(newElement);
        }
        else {
            parent.insertBefore(newElement, targetElement.nextSibling);
        }
    }
    addEmoji(emoji: string) {
        let emojiText = document.createElement('i');
        emojiText.setAttribute('class', `emoji icon-ng2_em_${emoji.replace(/\:/g, '')}`);
        emojiText.setAttribute('style', `display:inline-block;`);
        emojiText.setAttribute('contenteditable', 'false');
        // let outContent = document.createElement('span');
        // outContent.setAttribute('class','emoji-out');
        // outContent.setAttribute('contenteditable','false');
        // outContent.appendChild(emojiText);
        // 获取编辑框对象
        // debugger
        var edit = this.newInput.nativeElement;
        // 编辑框设置焦点
        edit.focus()
        // 获取选定对象
        var selection: any = getSelection()
        // 判断是否有最后光标对象存在
        if (this.lastEditRange) {
            // 存在最后光标对象，选定对象清除所有光标并添加最后光标还原之前的状态
            selection.removeAllRanges()
            selection.addRange(this.lastEditRange)
        }
        // 判断选定对象范围是编辑框还是文本节点
        if (selection.anchorNode.nodeName != '#text') {
            // 如果是编辑框范围。则创建表情文本节点进行插入
            if (edit.childNodes.length > 0) {
                // 如果文本框的子元素大于0，则表示有其他元素，则按照位置插入表情节点
                for (var i = 0; i < edit.childNodes.length; i++) {
                    if (i == selection.anchorOffset) {
                        edit.insertBefore(emojiText, edit.childNodes[i])
                    }
                }
            } else {
                // 否则直接插入一个表情元素
                edit.appendChild(emojiText)
            }
        } else {
            // 如果是文本节点则先获取光标对象
            let range = selection.getRangeAt(0)
            // 获取光标对象的范围界定对象，一般就是textNode对象
            let textNode: any = range.startContainer;
            // 获取光标位置
            let rangeStartOffset = range.startOffset;
            // 重新插入元素
            let textNode1 = document.createTextNode(textNode.data.substr(0, rangeStartOffset));
            let textNode2 = document.createTextNode(textNode.data.substr(rangeStartOffset));
            let nextNode = textNode.nextSibling;
            textNode.remove();
            if (nextNode) {
                edit.insertBefore(textNode1, nextNode)
            } else {
                edit.appendChild(textNode1);
            }
            this.insertAfter(emojiText, textNode1);
            this.insertAfter(textNode2, emojiText);
        }
        // 创建新的光标对象
        var range = document.createRange()
        let space = document.createTextNode(' ');
        // edit.appendChild(space);
        this.insertAfter(space, emojiText)
        // 光标对象的范围界定为新建的表情节点
        range.selectNodeContents(space)
        // 光标位置定位在表情节点的最大长度
        range.setStart(space, space.length)
        // 使光标开始和光标结束重叠
        range.collapse(true)
        // 清除选定对象的所有光标对象
        selection.removeAllRanges()
        // 插入新的光标对象
        selection.addRange(range)
        // 无论如何都要记录最后光标对象
        this.lastEditRange = selection.getRangeAt(0)
    }
    getPosition() {
        // 获取选定对象
        this.lastEditSelection = getSelection()
        // 设置最后光标对象
        this.lastEditRange = this.lastEditSelection.getRangeAt(0);
    }

    async loadMessage() {
        let data: any[] = await this.messageservice.getMessagesByUsername(this.userinfo.username, this.userName, this.userinfo.username);
        data.forEach((value, index) => {
            this.getNickNameAndAvatar(value);
        });
        this.list = data;
    };

    async getNickNameAndAvatar(targetUser: any) {
        // if (targetUser.fromUserName === this.userName) {
        //     targetUser.fromUserNickName = this.userNickName;
        //     targetUser.fromUserAvatarSrc = this.fromUserAvatarSrc;
        // }
        // // 这里代表是当前登陆人发出去的信息
        // else {
        //     targetUser.fromUserNickName = this.toUserNickName;
        //     targetUser.fromUserAvatarSrc = this.toUserAvatarSrc;
        // }
        //  await this.databaseService.getAvatarByUsername(targetUser.fromUserName);

        let fromUserAvatarObj = await this.databaseService.getAvatarByUsername(targetUser.fromUserName);

        // 2.如果找到了,新增昵称和头像属性
        if (fromUserAvatarObj.rows.length > 0) {
            targetUser.fromUserNickName = fromUserAvatarObj.rows.item(0).NICK_NAME;
            targetUser.fromUserAvatarSrc = fromUserAvatarObj.rows.item(0).AVATAR;
            // history[i].timedesc = this.getDateDiff(history[i].time);
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
    async sendMessage(type: number, content: string, extra?: any, childType?: any, imageHeight?: number, imageWidth?: number) {
        let contentType: string;
        let that = this;
        let _extra;

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
            extra: extra ? JSON.parse(extra) : '',
            childType: childType,
            imageHeight: imageHeight,
            imageWidth: imageWidth
        };
        this.getNickNameAndAvatar(msg);
        await this.databaseService.addMessage(msg.toUserName, msg.fromUserName, this.userinfo.username, msg.content, msg.contentType, msg.time, msg.type, msg.unread, extra ? JSON.stringify(msg.extra) : '', childType, imageHeight, imageWidth);

        if (type === 1) {
            if (extra) {
                this.jmessageservice.sendSingleTextMessageWithExtras(this.userName, content, extra);
            }
            else {
                this.jmessageservice.sendSingleTextMessage(this.userName, content);
            }
        }
        else if (type === 2) {
            this.jmessageservice.sendSingleImageMessage(this.userName, content);
        }
        this.list.push(msg)
        this.newInput.nativeElement.innerHTML = '';
        setTimeout(function () {
            that.scroll_down();
        }, 0);

    }

    getPhoto(type: number) {
        //  this.sendMessage(2,"'assets/avatar/thumbnail-puppy-1.jpg'");
        let that = this;
        let options: CameraOptions = {
            //这些参数可能要配合着使用，比如选择了sourcetype是0，destinationtype要相应的设置
            quality: 80,                                            //相片质量0-100
            allowEdit: false,                                        //在选择之前允许修改截图
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: type,                                         //从哪里选择图片：PHOTOLIBRARY=0，相机拍照=1，SAVEDPHOTOALBUM=2。0和1其实都是本地图库
            encodingType: this.camera.EncodingType.JPEG,                   //保存的图片格式： JPEG = 0, PNG = 1
            targetWidth: 800,                                        //照片宽度
            targetHeight: 800,                                       //照片高度
            mediaType: 0,                                             //可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
            cameraDirection: 0,                                       //枪后摄像头类型：Back= 0,Front-facing = 1
            saveToPhotoAlbum: false                                   //保存进手机相册
        };
        this.camera.getPicture(options).then((imageData) => {
            // imageData is a base64 encoded string
            var image = new Image();
            image.src = imageData;
            image.onload = async function () {
                await that.sendMessage(2, imageData, '', '', image.height, image.width);
                that.ref.detectChanges();
            }
            // this.sendMessage(2, imageData);
        }, (err) => {
            console.log(err);
        });
    }

    async sendLocation() {
        let extra: any;
        try {
            let geolocationresult = await this.geolocation.getCurrentPosition();
            try {
                let changeresult = await this.httpGet('http://api.map.baidu.com/geoconv/v1/?coords=' + geolocationresult.coords.longitude + ',' + geolocationresult.coords.latitude + '&from=1&to=5&ak=GTN4sZg5bVt9b7Aa9p37nSoDT4FOFUFv&mcode=F0:17:9A:F1:53:94:B3:28:CB:57:BA:47:EC:1F:C5:A3:7A:92:F6:94;io.ionic.starter')
                let changelongitude = changeresult.json().result[0].x;
                let changelatitude = changeresult.json().result[0].y;
                extra = { type: "location", title: "位置", content_type: "text", content: changelongitude + ',' + changelatitude };
                try {
                    let addressresult: any = await this.httpGet('http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=' + changelatitude + ',' + changelongitude + '&output=json&pois=1&ak=GTN4sZg5bVt9b7Aa9p37nSoDT4FOFUFv&mcode=F0:17:9A:F1:53:94:B3:28:CB:57:BA:47:EC:1F:C5:A3:7A:92:F6:94;io.ionic.starter')
                    let result = JSON.parse(addressresult._body.substring(29).slice(0, -1)).result;
                    let address = result.formatted_address + result.sematic_description;
                    this.sendMessage(1, '[' + address + ']', JSON.stringify(extra), 'location');
                }
                catch (err) {
                    console.log(err);
                }
            }
            catch (err) {
                console.log(err);
            }
        } catch (error) {
            console.log('Error getting location', error);
        };
    };

    httpGet(url: string) {
        return this.http.get(url).toPromise();
    }

    getImageClass(height: number, width: number) {
        if (height === width) {
            return 'img_fang';
        } else if (height < width) {
            return 'img_heng'
        } else {
            return 'img_shu';
        }
    }

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

    openMap(content: string) {
        this.navCtrl.push(MapComponent, content);
    }
}
