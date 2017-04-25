import { Injectable } from '@angular/core';

import { JMessageService } from '../../../core/services/jmessage.service';
import { Message } from '../classes/Message';

@Injectable()
export class MessageService {
    constructor(
        private jmessage: JMessageService
    ) { }


    userInfo: any;// 当前登录用户的信息
    allUserInfo: any;
    history: Message[];  // 历史消息

    getLocalMessageHistory() {
        return JSON.parse(localStorage.getItem('localMessageHistory'));
    }

    setLocalMessageHistory(messages: Message[]) {
        return localStorage.setItem('localMessageHistory', JSON.stringify(messages));
    }

    getMessageHistoryByID(username: string) {
        let history = this.history;
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let sorted = history.sort((a, b) => a.time - b.time);
                if (!username)
                    resolve(this.leftJoin(sorted, this.allUserInfo));
                else {
                    let temp = sorted.filter((v) => (v.fromUserName === username && v.toUserName === this.userInfo.username) || v.toUserName === username && v.fromUserName === this.userInfo.username);
                    temp = this.leftJoin(temp, this.allUserInfo);
                    resolve(temp);
                }
            })
        })
    }

    public getMessageHistory() {
        let history = this.history ? this.history : [];
        this.userInfo = {
            username: JSON.parse(localStorage.getItem('currentUser')).username
        };



        let distince: any = [];
        let dialoguedistince: any = [];
        let sorted = history.sort((a, b) => b.time - a.time);
        sorted.forEach((v) => {
            if (v.type === 'dialogue') {
                // 我发出去的消息
                if (v.fromUserName === this.userInfo.username && dialoguedistince.indexOf(v.toUserName) === -1) {
                    dialoguedistince.push(v.toUserName);
                    distince.push({
                        username: v.toUserName,
                        type: 'dialogue',
                        time: v.time,
                    });
                }
                // 别人发给我的信息
                if (v.toUserName === this.userInfo.username && dialoguedistince.indexOf(v.fromUserName) === -1) {
                    dialoguedistince.push(v.fromUserName);
                    distince.push({
                        username: v.fromUserName,
                        type: 'dialogue',
                        time: v.time,
                    });
                }
            }
            if (v.type === 'notice' && v.toUserName === this.userInfo.username) {
                distince.push({
                    username: v.fromUserName,
                    type: 'notice',
                    time: v.time,
                });
            }
        });


        distince.forEach((v: any) => {
            let pmsg;

            if (v.type === 'dialogue') {
                pmsg = sorted.filter((v1) => (v1.fromUserName === v.username && v1.toUserName === this.userInfo.username) || v1.toUserName === v.username && v1.fromUserName === this.userInfo.username);
            }
            else {
                pmsg = sorted.filter((msg) => msg.time === v.time);
            }
            let lastmsg = pmsg.length ? pmsg[0].content : '';
            let lastmsgType = pmsg.length ? pmsg[0].contentType : '';
            let timedesc = this.getDateDiff(pmsg[0].time);
            v.lastmsg = lastmsg;
            v.contentType = lastmsgType;
            v.timedesc = timedesc;

        });

        for (let i = 0; i < distince.length; i++) {
            let unreadMsg; // 未读消息列表
            let unreadCount;// 未读消息数
            unreadMsg = sorted.filter((value) => (value.fromUserName === distince[i].username && (value.unread === true)));
            unreadCount = unreadMsg.length;
            distince[i].unreadCount = unreadCount;
        }
        return this.leftJoin(distince, this.allUserInfo);
    }



    leftJoin(original: any, contacts: any) {
        let contactObj = contacts;
        let rst: any = [];

        original.forEach((v: any) => {
            if (v.username) {
                v.userNickName = this.getNickName(v.username, contactObj);
                v.avatarSrc = this.getAvatar(v.username, contactObj);
                rst.push(v);
            }
            if (v.fromUserName) {
                v.fromUserNickName = this.getNickName(v.fromUserName, contactObj);
                v.fromUserAvatarSrc = this.getAvatar(v.fromUserName, contactObj);

                v.toUserNickName = this.getNickName(v.toUserName, contactObj);
                v.toUserAvatarSrc = this.getAvatar(v.toUserName, contactObj);
                rst.push(v);
            }
        });
        return rst;
    }

    getNickName(username: string, contacts: any[]): string {
        for (let i = 0; i < contacts.length; i++) {
            if (contacts[i].username === username) {
                return contacts[i].nickname;
            }
        }
    }

    getAvatar(username: string, contacts: any[]) {

        for (let i = 0; i < contacts.length; i++) {
            if (contacts[i].username === username) {
                return contacts[i].avatar;
            }
        }
    }

    getContacts() {
        return new Promise((resolve, reject) => {
            this.allUserInfo = this.usersInfo2;
            resolve(this.usersInfo2);
        });
    }

    getUserInfo() {
        return new Promise((resolve, reject) => {
            resolve(this.userInfo);
        });
    }

    getItems(ev: any) {
        // var val = ev.target.value;

        // if (val && val.trim() != '') {
        //   this.msgListItem = this.msgListItem.filter((item) => {
        //     return (item.content.toLowerCase().indexOf(val.toLowerCase()) > -1)
        //   })

        // }
    };


    getDateDiff(dateTimeStamp: number) {
        let Y, M, D, W, H, I, S;
        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var d = new Date(Math.floor(dateTimeStamp / 1000) * 1000);
        var Week = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        Y = d.getFullYear();
        M = this.fillZero(d.getMonth() + 1);
        D = this.fillZero(d.getDate());
        W = Week[d.getDay()];
        H = this.fillZero(d.getHours());
        I = this.fillZero(d.getMinutes());
        S = this.fillZero(d.getSeconds());

        if (new Date(dateTimeStamp).toDateString() === new Date().toDateString()) {
            //今天
            if (H <= 12) {
                H = '上午' + H;
            } else if (H > 12 && H < 24) {
                H -= 12;
                H = '下午' + this.fillZero(H);
            } else if (H == 24) {
                H = '00';
            }
            var localTime = H + ':' + I;
        } else if (new Date(dateTimeStamp + day).toDateString() === new Date().toDateString()) {
            //昨天
            if (H <= 12) {
                H = '昨天上午' + H;
            } else if (H > 12 && H < 24) {
                H -= 12;
                H = '昨天下午' + this.fillZero(H);
            } else if (H == 24) {
                H = '00';
            }
            var localTime = H + ':' + I;
        }
        else if (new Date(dateTimeStamp) < new Date()) {
            var localTime = Y + '-' + M + '-' + D;
        }
        return localTime;
    }


    fillZero(v: any) {
        if (v < 10) { v = '0' + v; }
        return v;
    }

    setUnreadToZeroByUserName(username: string) {
        let history = this.history;
        history.forEach((v) => {
            if (v.fromUserName === username) {
                v.unread = false;
            }
        });
        this.setLocalMessageHistory(history);
    }

    usersInfo2 = [
        { username: 'mahuateng', nickname: '马化腾', avatar: 'assets/avatar/mahuateng.png' },
        { username: 'mayun', nickname: '马云', avatar: 'assets/avatar/mayun.png' },
        { username: 'dinglei', nickname: '丁磊', avatar: 'assets/avatar/dinglei.png' },
        { username: 'liyanhong', nickname: '李彦宏', avatar: 'assets/avatar/avatar-ts-squeeze.png' },
        { username: 'liuqiangdong', nickname: '刘强东', avatar: 'assets/avatar/avatar-ts-squeeze.png' },
        { username: 'liuchuanzhi', nickname: '刘传志', avatar: 'assets/avatar/avatar-ts-squeeze.png' },
        { username: 'Woody', nickname: '小明', avatar: 'assets/avatar/avatar-ts-woody.png' },
        { username: 'Slinky Dog', nickname: '小狗', avatar: 'assets/avatar/avatar-ts-slinky.png' },
        { username: 'Barbie', nickname: 'Barbie', avatar: 'assets/avatar/avatar-ts-barbie.png' },
        { username: 'Squeeze', nickname: 'Squeeze', avatar: 'assets/avatar/avatar-ts-squeeze.png' },
        { username: 'jinzhi.he', nickname: '何锦枝', avatar: 'assets/avatar/thumbnail-puppy-1.jpg' },
        { username: 'hugh.liang', nickname: '梁銘輝', avatar: 'assets/avatar/hugh.jpg' }
    ];

}

