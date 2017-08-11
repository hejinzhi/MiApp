import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Observable, Subscription } from 'rxjs/Rx';

declare var window: any;

@Injectable()
export class JMessageService {

    // private JMessage2 = window.JMessage;
    // private JIM = new JMessage();
    // public jmessagePlugin = (<any>window).plugins ? (<any>window).plugins.jmessagePlugin || null : null;
    public jmessagePlugin: any;
    jmessageHandler: Subscription; //接收句柄，再view被关闭的时候取消订阅，否则对已关闭的view进行数据脏检查会报错
    jmessageOffline: Subscription;
    constructor(private platform:Platform) {
        // console.log(this.JMessage2, 'sdasdasdasda');
        // console.log(window.JMessage, '111');
        // this.jmessagePlugin = window.JMessage;
    }

    wrapEventObservable(event: string): Observable<any> {
        return new Observable(observer => {
            document.addEventListener(event, observer.next.bind(observer), false);
            return () => document.removeEventListener(event, observer.next.bind(observer), false);
        });
    }

    // 初始化
    // init(): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.jmessagePlugin.init();
    //     });
    // };
    init(isOpenMessageRoaming: boolean = true) {
        if(!this.platform.is('cordova')) return;
        window.JMessage.setDebugMode({ 'enable': true });
        window.JMessage.init({ 'isOpenMessageRoaming': isOpenMessageRoaming });
        // console.log(window.JMessage);
    };

    // 注册
    register(username: string, password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            window.JMessage.register({ 'username': username, 'password': password }, (suc: any) => {
                console.log(suc);
                resolve(true);
            }, (err: any) => {
                console.log(err);
                reject(false);
            });
        });
    };

    // 获取当前用户信息
    getMyInfo(): Promise<any> {
        return new Promise((resolve, reject) => {
            window.JMessage.getMyInfo((suc: any) => {
                resolve(suc);
            }, (err: any) => {
                reject(err);
            })
        });
    };

    // 检查是否已经登录
    async ifAlreadyLogin() {
        try {
            // let userInfo = await this.getUserInfo(username);
            let userInfo = await this.getMyInfo();
            if (userInfo.username != undefined) {
                return true;
            } else {
                return false;
            }
        }
        catch (err) {
            return false;

        }
    };

    // auto login登陆前先检查是否已登陆，是，则不需登陆
    async autoLogin(username: string, password: string, is_md5?: boolean) {
        let getInfoSuccess: boolean;
        try {
            getInfoSuccess = await this.ifAlreadyLogin();
            if (getInfoSuccess) {
                return getInfoSuccess;
            }
        }
        catch (err) {
            getInfoSuccess = false;
            return getInfoSuccess;
        }


        let loginFlag = await this.login(username, password);
        return loginFlag;



    }

    // 登录
    login(username: string, password: string, is_md5?: boolean): Promise<any> {
        // this.init();
        return new Promise((resolve, reject) => {
            window.JMessage.login({ 'username': username, 'password': password }, (suc: any) => {
                console.log('login success');
                resolve(true);
            }, (err: any) => {
                console.log(err);
                resolve(false);
            });
        });
    };

    // 登出
    loginOut(): void {
        window.JMessage.logout();
    };

    // 获取用户信息
    getUserInfo(username: string): Promise<any> {
        return new Promise((resolve, reject) => {
            window.JMessage.getUserInfo({ 'username': username }, (suc: any) => {
                resolve(suc);
            }, (err: any) => {
                resolve(null);
            });
        });
    };

    // 发送单聊文本
    sendSingleTextMessage(username: string, text: string): Promise<any> {
        let textParams: TextMessage = new TextMessage();
        textParams.type = 'single';
        textParams.username = username;
        textParams.text = text;
        return new Promise((resolve, reject) => {
            window.JMessage.sendTextMessage(textParams, (suc: any) => {
                resolve(suc);
            }, (err: any) => {
                reject(err);
            })
        });
    };

    // 发送单聊文本并附带额外的信息
    sendSingleTextMessageWithExtras(username: string, text: string, extras: any): Promise<any> {
        let textParams: TextMessage = new TextMessage();
        textParams.type = 'single';
        textParams.username = username;
        textParams.text = text;
        textParams.extras = extras;
        return new Promise((resolve, reject) => {
            window.JMessage.sendTextMessage(textParams, (suc: any) => {
                resolve(suc);
            }, (err: any) => {
                reject(err);
            })
        });
    };

    // 发送单聊语音
    sendSingleVoiceMessage(username: string, fileUrl: string, appKey?: string): Promise<any> {
        let voiceParams: VoiceMessage = new VoiceMessage();
        voiceParams.type = 'single';
        voiceParams.username = username;
        voiceParams.path = fileUrl;
        return new Promise((resolve, reject) => {
            console.log(fileUrl + '  JMVOICE URL');
            // this.jmessagePlugin.sendVoiceMessage(username, 'file://' + fileUrl, appKey, (suc: any) => {
            window.JMessage.sendVoiceMessage(voiceParams, (suc: any) => {
                resolve(suc);
            }, (err: any) => {
                reject(err);
            })
        });
    };

    // 发送自定义消息
    sendSingleCusCustomMessage(username: string, jsonStr: any, appKey?: string): Promise<any> {
        return new Promise((resolve, reject) => {
            window.JMessage.sendSingleCustomMessage(username, jsonStr, appKey, (suc: any) => {
                resolve(suc);
            }, (err: any) => {
                reject(err);
            })
        });
    };

    //  發送單聊圖片
    sendSingleImageMessage(username: string, imageUrl: string, extra: object): Promise<any> {
        let params = {
            type: 'single',                                // 'single' / 'group'
            //  groupId: string,                             // 当 type = group 时，groupId 不能为空
            username: username,                            // 当 type = single 时，username 不能为空
            //  appKey: string,                              // 当 type = single 时，用于指定对象所属应用的 appKey。如果为空，默认为当前应用。
            path: imageUrl,                                // 本地图片路径
            extras: extra                              // Optional. 自定义键值对 = {'key1': 'value1'}
            //  messageSendingOptions: MessageSendingOptions // Optional. MessageSendingOptions 对象
        };
        console.log(params);
        return new Promise((resolve, reject) => {
            try {
                window.JMessage.sendImageMessage(params, (suc: any) => {
                    console.log('sendImageSuc');
                    resolve(suc);
                }, (err: any) => {
                    console.log('failimage');
                    reject(err);
                })
            }
            catch (e) {
                console.log(e);
            }

        });
    }

    // 下载原图
    downloadOriginalImage(username: string, messageId: string): Promise<OriginImage> {
        let params = {
            type: 'single',
            username: username,
            messageId: messageId
        };
        return new Promise((resolve, reject) => {
            try {
                window.JMessage.downloadOriginalImage(params, (suc: any) => {
                    console.log('suc');
                    resolve(suc);
                }, (err: any) => {
                    console.log(err);
                    console.log('fail');
                    reject(err);
                })
            }
            catch (e) {
                console.log(e);
            }

        });
    }

    // 监听receive事件

    addReceiveMessageListener(cb: any) {
        window.JMessage.addReceiveMessageListener(cb);
    }

    onReceiveMessage(): Observable<any> {
        return this.wrapEventObservable('jmessage.onReceiveMessage');
    }


    onSyncOfflineMessage(): Observable<any> {
        return this.wrapEventObservable('jmessage.onSyncOfflineMessage');
    }

    // 监听点击消息栏打开消息事件
    onOpenMessage(): Observable<any> {
        return this.wrapEventObservable('jmessage.onOpenMessage');
    }

    // 进入单聊会话
    enterSingleConversation(username: string, appKey?: string): Promise<any> {
        let params = {
            type: 'single',            // 'single' / 'group'
            //  groupId: string,         // 目标群组 id。
            username: username,        // 目标用户名。
            //  appKey: string,          // 目标用户所属 AppKey。
        }
        return new Promise((resolve, reject) => {
            window.JMessage.enterConversation(params, (suc: any) => {
                resolve(suc);
            }, (err: any) => {
                reject(err);
            })
        });
    };

    //设置对某个用户免打扰。isNoDisturb: 0 - 普通状态，1 - 免打扰状态。
    setUserNoDisturb(username: string, isNoDisturb: number) {
        return new Promise((resolve, reject) => {
            this.jmessagePlugin.setUserNoDisturb(username, isNoDisturb, (suc: any) => {
                resolve(suc);
            }, (err: any) => {
                reject(err);
            })
        });
    }

    // 关闭当前会话
    exitConversation(): Promise<any> {
        return new Promise((resolve, reject) => {
            window.JMessage.exitConversation((suc: any) => {
                resolve(suc);
            }, (err: any) => {
                reject(err);
            })
        });
    };

    // 设置指定单聊会话的未读消息数
    setSingleConversationUnreadMessageCount(username: string, appKey: string, unreadCount: number): Promise<any> {
        let params = {
            type: 'single',            // 'single' / 'group'
            //  groupId: string,         // 目标群组 id。
            username: username,        // 目标用户名。
            // appKey: string,          // 目标用户所属 AppKey。
        };
        return new Promise((resolve, reject) => {
            window.JMessage.resetUnreadMessageCount(params, (suc: any) => {
                resolve(suc);
            }, (err: any) => {
                reject(err);
            })
        });
    };


    // 获取会话列表
    getConversationList(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.jmessagePlugin.getConversationList((suc: any) => {
                console.log(JSON.parse(suc), 666);
                resolve(suc);
            }, (err: any) => {
                reject(err);
            })
        });
    };

    // 获取指定会话中从新到旧的部分历史消息。
    getHistoryMessages(conversationType: string, value: string, appKey: string, from: number, limit: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.jmessagePlugin.getHistoryMessages(conversationType, value, appKey, from, limit, (suc: any) => {
                resolve(suc);
            }, (err: any) => {
                reject(err);
            })
        });
    }



    // 更新用户头像
    updateMyAvatar(avatarFileUrl: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.jmessagePlugin.updateMyAvatar(avatarFileUrl, (suc: any) => {
                resolve(suc);
            }, (err: any) => {
                reject(err);
            })
        });
    }

    updateMyAvatarByPath(avatarFilePath: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.jmessagePlugin.updateMyAvatarByPath(avatarFilePath, (suc: any) => {
                resolve(suc);
            }, (err: any) => {
                reject(err);
            })
        });
    }

    // 取得用户头像的缩略图地址，如果 username 为空，默认取得当前登录用户的头像缩略图地址。
    getUserAvatar(username?: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.jmessagePlugin.getUserAvatar(username, (suc: any) => {
                resolve(suc);
            }, (err: any) => {
                reject(err);
            })
        });
    }

    // 下载用户头像大图，如果 username 为空，默认为当前用户。
    getOriginalUserAvatar(username?: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.jmessagePlugin.getOriginalUserAvatar(username, (suc: any) => {
                resolve(suc);
            }, (err: any) => {
                reject(err);
            })
        });
    }

}

export class MessageSendingOptions {
    /**
     * 接收方是否针对此次消息发送展示通知栏通知。
     * @type {boolean}
     * @defaultvalue
     */
    isShowNotification: boolean;
    /**
     * 是否让后台在对方不在线时保存这条离线消息，等到对方上线后再推送给对方。
     * @type {boolean}
     * @defaultvalue
     */
    isRetainOffline: boolean;
    /**
     * 是否开启了自定义接收方通知栏功能。
     * @type {?boolean}
     */
    isCustomNotificationEnabled: boolean;
    /**
     * 设置此条消息在接收方通知栏所展示通知的标题。
     * @type {?string}
     */
    notificationTitle: string;
    /**
     * 设置此条消息在接收方通知栏所展示通知的内容。
     * @type {?string}
     */
    notificationText: string;
}

export class TextMessage {
    type: string;                               // 'single' / 'group'
    groupId?: string;                             // 当 type = group 时，groupId 不能为空
    username: string;                            // 当 type = single 时，username 不能为空
    appKey?: string;                            // 当 type = single 时，用于指定对象所属应用的 appKey。如果为空，默认为当前应用
    text: string;                                // 消息内容
    extras?: object;                              // Optional. 自定义键值对 = {'key1': 'value1'}
    messageSendingOptions?: MessageSendingOptions; // Optional. MessageSendingOptions 对象
}

export class VoiceMessage {
    type: string;                              // 'single' / 'group'
    groupId?: string;                             // 当 type = group 时，groupId 不能为空
    username: string;                            // 当 type = single 时，username 不能为空
    appKey?: string;                            // 当 type = single 时，用于指定对象所属应用的 appKey。如果为空，默认为当前应用。
    path: string;                              // 本地图片路径
    extras?: object;                              // Optional. 自定义键值对 = {'key1': 'value1'}
    messageSendingOptions?: MessageSendingOptions // Optional. MessageSendingOptions 对象
}

export class OriginImage {
    filePath: string;
    messageId: string;
}
