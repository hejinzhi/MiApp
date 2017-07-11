import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

declare let JMessage: any;
declare var window: any;
declare var document: any;

@Injectable()
export class JMessageService {

    // private JMessage = (<any>window).JMessage;
    // private JIM = new JMessage();
    public jmessagePlugin = (<any>window).plugins ? (<any>window).plugins.jmessagePlugin || null : null;
    jmessageHandler: Subscription; //接收句柄，再view被关闭的时候取消订阅，否则对已关闭的view进行数据脏检查会报错
    jmessageOffline: Subscription;
    constructor() { }

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
    init() {
        this.jmessagePlugin.init();
    };

    // 注册
    register(username: string, password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.jmessagePlugin.register(username, password, (suc: any) => {
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
            this.jmessagePlugin.getMyInfo((suc: any) => {
                resolve(suc);
            }, (err: any) => {
                reject(err);
            })
        });
    };

    // 检查是否已经登录
    async ifAlreadyLogin(username: string) {
        try {
            let userInfo = await this.getUserInfo(username);
            if (userInfo) {
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
            getInfoSuccess = await this.ifAlreadyLogin(username);
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
        return new Promise((resolve, reject) => {
            this.jmessagePlugin.login(username, password, (suc: any) => {
                resolve(true);
            }, (err: any) => {
                console.log(err);
                resolve(false);
            });
        });
    };

    // 登出
    loginOut(): void {
        this.jmessagePlugin.logout();
    };

    // 获取用户信息
    getUserInfo(username: string, appkey?: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.jmessagePlugin.getUserInfo(username, appkey, (suc: any) => {
                resolve(suc);
            }, (err: any) => {
                resolve(null);
            });
        });
    };

    // 发送单聊文本
    sendSingleTextMessage(username: string, text: string, appKey?: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.jmessagePlugin.sendSingleTextMessage(username, text, appKey, (suc: any) => {
                resolve(suc);
            }, (err: any) => {
                reject(err);
            })
        });
    };

    // 发送单聊文本并附带额外的信息
    sendSingleTextMessageWithExtras(username: string, text: string, json: any, appKey?: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.jmessagePlugin.sendSingleTextMessageWithExtras(username, text, json, appKey, (suc: any) => {
                resolve(suc);
            }, (err: any) => {
                reject(err);
            })
        });
    };

    // 发送自定义消息
    sendSingleCusCustomMessage(username: string, jsonStr: any, appKey?: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.jmessagePlugin.sendSingleCustomMessage(username, jsonStr, appKey, (suc: any) => {
                resolve(suc);
            }, (err: any) => {
                reject(err);
            })
        });
    };

    //  發送單聊圖片
    sendSingleImageMessage(username: string, imageUrl: string, appKey?: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.jmessagePlugin.sendSingleImageMessage(username, imageUrl, appKey, (suc: any) => {
                resolve(suc);
            }, (err: any) => {
                reject(err);
            })
        });
    }

    // 监听receive事件
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
        return new Promise((resolve, reject) => {
            this.jmessagePlugin.enterSingleConversation(username, appKey, (suc: any) => {
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
            this.jmessagePlugin.exitConversation((suc: any) => {
                resolve(suc);
            }, (err: any) => {
                reject(err);
            })
        });
    };

    // 设置指定单聊会话的未读消息数
    setSingleConversationUnreadMessageCount(username: string, appKey: string, unreadCount: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.jmessagePlugin.setSingleConversationUnreadMessageCount(username, appKey, unreadCount, (suc: any) => {
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
