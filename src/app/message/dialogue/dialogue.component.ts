import { OriginImage } from './../../core/services/jmessage.service';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { NavParams, NavController, Events, Content, Platform, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Keyboard } from '@ionic-native/keyboard';
import { Geolocation } from '@ionic-native/geolocation';
import { Http } from '@angular/http';
import { Media, MediaObject } from '@ionic-native/media';

import { MapComponent } from '../map/map.component';

import { MessageService } from '../shared/service/message.service';
import { JMessageService } from '../../core/services/jmessage.service';
import { LanguageConfig } from '../shared/config/language.config';
import { DatabaseService } from '../shared/service/database.service';
import { KeyboardAttachDirective } from '../shared/directive/KeyboardAttachDirective';
import { UserModel } from '../../shared/models/user.model';
import { ImageViewerController } from 'ionic-img-viewer';


@Component({
    selector: 'sg-dialogue',
    templateUrl: 'dialogue.component.html'
})


export class DialogueComponent implements OnInit {
    @ViewChild(Content) content: Content;
    languageType: string = localStorage.getItem('languageType');
    languageContent = LanguageConfig.DialogueComponent[this.languageType];
    _imageViewerCtrl: ImageViewerController;
    list: any;
    listlength: number;
    listpage: number = 1;
    listpagenum: number = 20;
    listtotal: Array<object>;
    listpageheight: number;
    input_text: string;
    userinfo: UserModel;
    onPlus: boolean = false;
    selectable: number;

    userName: string;
    fromuserNickName: string;  // 聊天对象的nickname
    fromUserAvatarSrc: string; // 聊天对象的头像
    unreadCount: number; //未读消息数，如果大于0，退出dialogue页面时把未读消息更新为已读。否则不更新


    toUserName: string;
    myNickName: string; // 当前登录人的nickname
    myAvatarSrc: string; // 当前登录人的头像

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

    audioRecorderAPI = (<any>window).plugins ? (<any>window).plugins.audioRecorderAPI || null : null;
    isrec: boolean = false;
    isvoice: boolean = false;
    recvoicetime: number;
    endrcevoicetime: number;
    openvoiceflag: boolean = false;
    voiceflagdesc: string = '按住 說話';


    istop: boolean = false;


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
        private http: Http,
        private media: Media,
        public toastCtrl: ToastController,
        private imageViewerCtrl: ImageViewerController
    ) {
        this._imageViewerCtrl = imageViewerCtrl;
        this.userName = params.get('fromUserName');
        // this.userName = params.get('owner');
        this.fromuserNickName = params.get('fromUserNickName');
        this.fromUserAvatarSrc = params.get('fromUserAvatarSrc');
        this.unreadCount = params.get('unreadCount');

        // 这里的toUserName一般是指当前登陆人
        // this.toUserName = params.get('toUserName');
    }

    async presentImage(myImage: any, msgID: number, fromUserName: string) {
        let originImg: OriginImage;
        let imageViewer;
        console.log(msgID, fromUserName);

        if (msgID && msgID != 0) {
            console.log('downloadOriginalImage');
            originImg = await this.jmessageservice.downloadOriginalImage(fromUserName, msgID.toString());
            imageViewer = this._imageViewerCtrl.create(myImage, { fullResImage: originImg.filePath });
        } else {
            console.log('not downloadOriginalImage');
            imageViewer = this._imageViewerCtrl.create(myImage);
        }
        imageViewer.present();

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

        this.myNickName = this.userinfo.nickname;
        this.myAvatarSrc = this.userinfo.avatarUrl;
        await this.loadMessage();
    }


    async ionViewDidEnter() {
        this.events.subscribe('msg.onReceiveMessage', async (msg: any) => {
            if (msg) {
                // 当推送过来的消息发送者跟正在聊天的是同一个人时，在显示在画面
                if (this.userName === msg.fromUserName) {
                    // await this.getNickNameAndAvatar(msg);
                    msg.fromUserNickName = this.fromuserNickName;
                    msg.fromUserAvatarSrc = this.fromUserAvatarSrc;
                    this.list.push(msg);
                }

            } else {
                let data: any[] = await this.messageservice.getMessagesByUsername(this.userinfo.username, this.userName, this.userinfo.username);
                data.forEach(async (value, index) => {
                    // await this.getNickNameAndAvatar(value);
                    if (value.fromUserName === this.userinfo.username) {
                        value.fromUserNickName = this.userinfo.nickname;
                        value.fromUserAvatarSrc = this.userinfo.avatarUrl;
                    } else {
                        value.fromUserNickName = this.fromuserNickName;
                        value.fromUserAvatarSrc = this.fromUserAvatarSrc;
                    }
                });
                this.listtotal = data;
                this.listlength = data.length;
                this.list = this.listtotal.slice(-this.listpagenum);
            }
            this.ref.detectChanges();
            this.scroll_down();
        });

        await this.messageservice.setUnreadToZeroByUserName(this.userinfo.username, this.userName);
        this.jmessageservice.enterSingleConversation(this.userName);

        this.scroll_down();
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
                let tagName = document.activeElement.tagName;
                if (tagName == "INPUT" || tagName == "TEXTAREA") {
                    window.setTimeout(function () {
                        document.activeElement.scrollIntoView();
                    }, 0);
                }
            })

            // this.scroll_down();

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

    async loadMessage() {
        let data: any[] = await this.messageservice.getMessagesByUsername(this.userinfo.username, this.userName, this.userinfo.username);
        data.forEach(async (value, index) => {
            if (value.fromUserName === this.userinfo.username) {
                value.fromUserNickName = this.userinfo.nickname;
                value.fromUserAvatarSrc = this.userinfo.avatarUrl;
            } else {
                value.fromUserNickName = this.fromuserNickName;
                value.fromUserAvatarSrc = this.fromUserAvatarSrc;
            }

        });
        this.listtotal = data;
        this.listlength = data.length;
        this.list = this.listtotal.slice(-this.listpagenum);
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
        let fromUserAvatarObj = await this.databaseService.getAvatarByUsername(targetUser);
        if (fromUserAvatarObj.rows.length > 0) {
            return {
                nickName: fromUserAvatarObj.rows.item(0).NICK_NAME,
                avatar: fromUserAvatarObj.rows.item(0).AVATAR
            };
        } else {
            return {
                nickName: null,
                avatar: null
            };
        }


        // 2.如果找到了,新增昵称和头像属性
        // if (fromUserAvatarObj.rows.length > 0) {
        //     targetUser.fromUserNickName = fromUserAvatarObj.rows.item(0).NICK_NAME;
        //     targetUser.fromUserAvatarSrc = fromUserAvatarObj.rows.item(0).AVATAR;
        //     // history[i].timedesc = this.getDateDiff(history[i].time);
        // }
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

    //type: 1是文字，2是圖片,3是語音
    async sendMessage(type: number, content: string, extra?: any, childType?: any, imageHeight?: number, imageWidth?: number, duration?: number) {
        let contentType: string;
        let that = this;
        let _extra;
        // let _duration;

        if (type === 1) {
            contentType = "text";
        } else if (type === 2) {
            contentType = "image";
        } else if (type === 3) {
            contentType = "voice";
            // let res = await this.jmessageservice.sendSingleVoiceMessage(this.userName, content);
            // _duration = JSON.parse(res).content.duration;
        }

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
            imageWidth: imageWidth,
            duration: duration,
            vounread: 'N',
            fromUserNickName: '',
            fromUserAvatarSrc: '',
            msgID: 0
        };

        // let myAvatar = await this.getNickNameAndAvatar(msg.fromUserName);
        msg.fromUserNickName = this.userinfo.nickname;
        msg.fromUserAvatarSrc = this.userinfo.avatarUrl;
        await this.databaseService.addMessage(msg.toUserName, msg.fromUserName, this.userinfo.username, msg.content, msg.contentType, msg.time, msg.type, msg.unread, extra ? JSON.stringify(msg.extra) : '', childType, imageHeight, imageWidth, duration, msg.vounread, 0);

        if (type === 1) {
            if (extra) {
                this.jmessageservice.sendSingleTextMessageWithExtras(this.userName, content, extra);
            }
            else {
                this.jmessageservice.sendSingleTextMessage(this.userName, content);
            }
        }
        else if (type === 2) {
            this.jmessageservice.sendSingleImageMessage(this.userName, content, { height: imageHeight, width: imageWidth });
        }
        else if (type === 3) {
            this.jmessageservice.sendSingleVoiceMessage(this.userName, content);
        }

        this.list.push(msg)
        this.input_text = '';
        setTimeout(function () {
            that.scroll_down();
        }, 0);

    }

    doRefresh(event: any) {
        this.listpage++;
        // this.list = this.listtotal.slice(-this.listpagenum * this.listpage);
        let temp: Array<object> = this.listtotal.slice(-this.listpagenum * this.listpage, -this.listpagenum * (this.listpage - 1));
        temp.forEach((v) => {
            this.list.unshift(v);
        });
        this.istop = false;
        setTimeout(() => {
            var div = document.getElementsByClassName('msg-content');
            let dis = div[0].scrollHeight - this.listpageheight;
            div[0].scrollTop = dis;
        }, 100);
        event.complete();
    }

    doscroll(event: any) {
        if (event.srcElement.scrollTop <= 0) {
            if (this.listpage * this.listpagenum < this.listlength) {
                this.listpageheight = event.srcElement.scrollHeight;
                this.istop = true;
                this.listpage++;
                // this.list = this.listtotal.slice(-this.listpagenum * this.listpage);
                let temp: Array<object> = this.listtotal.slice(-this.listpagenum * this.listpage, -this.listpagenum * (this.listpage - 1));
                temp.forEach((v) => {
                    this.list.unshift(v);
                });
                this.istop = false;
                setTimeout(() => {
                    var div = document.getElementsByClassName('msg-content');
                    let dis = div[0].scrollHeight - this.listpageheight;
                    div[0].scrollTop = dis;
                }, 0);
            }
        } else {
            this.istop = false;
        }
    }

    getPhoto(type: number) {
        //  this.sendMessage(2,"'assets/avatar/thumbnail-puppy-1.jpg'");
        let that = this;
        let options: CameraOptions = {
            //这些参数可能要配合着使用，比如选择了sourcetype是0，destinationtype要相应的设置
            quality: 75,                                            //相片质量0-100
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
        this.camera.getPicture(options).then((imageData: string) => {
            var image = new Image();
            let temp: string;
            if (this.platform.is('ios')) {
                temp = imageData.replace('file://', '');
                image.src = temp;
            } else {
                image.src = imageData;
                temp = imageData.replace('file://', '');
                if (temp.indexOf('?') > -1) {
                    temp = temp.substr(0, temp.indexOf('?'));
                }
            }
            image.onload = async function () {
                await that.sendMessage(2, temp, '', '', image.height, image.width);
                that.ref.detectChanges();
            }
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
                    await this.sendMessage(1, '[' + address + ']', JSON.stringify(extra), 'location');
                    this.ref.detectChanges();
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

    onvoice() {
        this.isvoice = !this.isvoice;
    }

    rec_voice() {
        this.isrec = true;
        this.voiceflagdesc = '鬆開 結束';
        // console.log(this.isrec, 'isrec');
        this.recvoicetime = +new Date();
        this.audioRecorderAPI.record((msg: any) => {
            this.isrec = false;
            this.voiceflagdesc = '按住 說話';
            // console.log('ok: 1' + msg);
        }, (msg: any) => {
            // failed 
            this.isrec = false;
            this.voiceflagdesc = '按住 說話';
            // console.log('ko: 1' + msg);
        }, 90); // record 30 seconds 
    }

    endrce_voice() {
        // console.log('touchend');
        if (this.isrec) {
            this.isrec = false;
            this.voiceflagdesc = '按住 說話';
            this.audioRecorderAPI.stop(async (file: any) => {
                this.endrcevoicetime = +new Date();
                // let duration = this.endrcevoicetime - this.recvoicetime;
                let duration = Math.ceil((this.endrcevoicetime - this.recvoicetime) / 1000);
                console.log('ok: 2' + file);
                await this.sendMessage(3, file, '', '', null, null, duration);
                this.ref.detectChanges();
            }, (err: any) => {
                // console.log('ko: 2' + err);
            })
        } else {
            let toast = this.toastCtrl.create({
                message: '說話時間太短',
                duration: 2000,
                position: 'middle'
            });

            toast.present(toast);
        }
    }

    async  openvoice(item: any) {
        const file: MediaObject = this.media.create(item.content);
        file.onStatusUpdate.subscribe((status) => {
            if (status === 4) {
                this.openvoiceflag = false;
                this.selectable = null;
                let voice = document.getElementsByClassName('voice_play');
                if (voice[0]) {
                    voice[0].setAttribute('class', 'voice');
                }
                this.ref.detectChanges();
            }
        }); // fires when file status changes
        // file.onSuccess.subscribe(() => { console.log(file.getDuration(), 456); console.log('Action is successful') });
        file.onError.subscribe(error => console.log('Error!', error));

        if (!this.openvoiceflag) {
            file.play();
            this.openvoiceflag = true;
            console.log(item, 456);
            await this.databaseService.setvounreadByID(item.fromUserName, item.id);
            if (item.vounread = 'Y') {
                for (let i = 0; i < this.list.length; i++) {
                    if (this.list[i].id === item.id) {
                        this.list[i].vounread = 'N';
                    }
                }
            }
        }
    }
    getBlank(duration: number) {
        if (duration) {
            if (duration <= 1) {
                return null;
            } else if (duration > 1 && duration <= 2) {
                return 'voiceblank1';
            } else if (duration > 2 && duration <= 3) {
                return 'voiceblank2';
            } else if (duration > 3 && duration <= 4) {
                return 'voiceblank3';
            } else if (duration > 4 && duration <= 5) {
                return 'voiceblank4';
            } else if (duration > 5 && duration <= 6) {
                return 'voiceblank5';
            } else if (duration > 6 && duration <= 7) {
                return 'voiceblank6';
            } else if (duration > 7 && duration <= 8) {
                return 'voiceblank7';
            } else if (duration > 8 && duration <= 9) {
                return 'voiceblank8';
            } else if (duration > 9 && duration <= 10) {
                return 'voiceblank9';
            } else if (duration > 10 && duration <= 11) {
                return 'voiceblank10';
            } else if (duration > 11 && duration <= 12) {
                return 'voiceblank11';
            } else if (duration > 12 && duration <= 13) {
                return 'voiceblank12';
            } else if (duration > 13 && duration <= 14) {
                return 'voiceblank13';
            } else if (duration > 14) {
                return 'voiceblank14';
            }
        }
        return '';
    }
}
