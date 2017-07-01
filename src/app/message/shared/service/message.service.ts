import {
  Injectable,
  EventEmitter
} from '@angular/core';
import {
  Events
} from 'ionic-angular';
import {
  Observable,
  Subscription,
  Subject
} from 'rxjs/Rx';
import {
  JMessageService
} from '../../../core/services/jmessage.service';
import {
  DatabaseService
} from './database.service';
import {
  Message
} from '../classes/Message';

@Injectable()
export class MessageService {
  constructor(
    private jmessage: JMessageService,
    public events: Events,
    public databaseService: DatabaseService
  ) { }


  userInfo: any; // 当前登录用户的信息
  allUserInfo: any;
  // history: Message[];  // 历史消息


  getMessagesByUsername(fromUsername: string, toUsername: string) {
    return this.databaseService.getMessagesByUsername(fromUsername, toUsername).then((data) => {
      return this.leftJoin(data, this.allUserInfo);
    });
  }


  public async getMessageHistory(loginUsername: string, type?: string, child_type?: string) {
    let history: any[] = await this.databaseService.getMessageList(loginUsername, type, child_type);
    console.log(history);
    for (let i = 0; i < history.length; i++) {
      // 1.先在本机存储找是否有这个人的头像
      let fromUserAvatarObj = await this.databaseService.getAvatarByUsername(history[i].fromUserName);

      // 2.如果找到了,新增昵称和头像属性
      if (fromUserAvatarObj.length > 0) {
        history[i].fromUserNickName = fromUserAvatarObj[0].USER_NAME;
        history[i].fromUserAvatarSrc = fromUserAvatarObj[0].AVATAR;
        history[i].timedesc = this.getDateDiff(history[i].time);
      }
      // 3.如果找不到，则请求服务器,并写入本地
      else {
        let fromUserServeObj = await this.getUserAvatar(history[i].fromUserName);
        if (fromUserServeObj.length > 0) {
          history[i].fromUserNickName = fromUserServeObj[0].NICK_NAME;
          history[i].fromUserAvatarSrc = fromUserServeObj[0].AVATAR_URL;
          history[i].timedesc = this.getDateDiff(history[i].time);
        }
      }
    }
    return history;

    // return this.leftJoin(history, this.allUserInfo);
  }



  leftJoin(original: any[], contacts: any[]) {
    let contactObj = contacts;
    let rst: any = [];

    original.forEach((v: any) => {
      v.fromUserNickName = this.getNickName(v.fromUserName, contactObj);
      v.fromUserAvatarSrc = this.getAvatar(v.fromUserName, contactObj);

      v.toUserNickName = this.getNickName(v.toUserName, contactObj);
      v.toUserAvatarSrc = this.getAvatar(v.toUserName, contactObj);
      v.timedesc = this.getDateDiff(v.time);
      rst.push(v);
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
    } else if (new Date(dateTimeStamp) < new Date()) {
      var localTime = Y + '-' + M + '-' + D;
    }
    return localTime;
  }


  fillZero(v: any) {
    if (v < 10) {
      v = '0' + v;
    }
    return v;
  }

  async setUnreadToZeroByUserName(username: string, child_type?: string) {
    await this.databaseService.setUnreadToZeroByUserName(username, child_type);
  }

  getUserAvatar(username: string) {

    // return new Promise((resolve, reject) => {
    //    this.usersInfo2.forEach((value, index) => {
    //     if (value.username === username) {
    //       // resolve(true);
    //     }
    //   });
    //   resolve(false);
    // });
    let obj: any[];
    this.usersInfo2.forEach((value, index) => {
      if (value.username === username) {
        obj = [{
          NICK_NAME: value.nickname,
          AVATAR_URL: value.avatar
        }]
      }
    });
    return obj;

  }

  usersInfo2 = [{
    username: 'mahuateng',
    nickname: '马化腾',
    avatar: 'assets/avatar/mahuateng.png'
  },
  {
    username: 'mayun',
    nickname: '马云',
    avatar: 'assets/avatar/mayun.png'
  },
  {
    username: 'dinglei',
    nickname: '丁磊',
    avatar: 'assets/avatar/dinglei.png'
  },
  {
    username: 'liyanhong',
    nickname: '李彦宏',
    avatar: 'assets/avatar/avatar-ts-squeeze.png'
  },
  {
    username: 'liuqiangdong',
    nickname: '刘强东',
    avatar: 'assets/avatar/avatar-ts-squeeze.png'
  },
  {
    username: 'liuchuanzhi',
    nickname: '刘传志',
    avatar: 'assets/avatar/avatar-ts-squeeze.png'
  },
  {
    username: 'Woody',
    nickname: '小明',
    avatar: 'assets/avatar/avatar-ts-woody.png'
  },
  {
    username: 'Slinky Dog',
    nickname: '小狗',
    avatar: 'assets/avatar/avatar-ts-slinky.png'
  },
  {
    username: 'Barbie',
    nickname: 'Barbie',
    avatar: 'assets/avatar/avatar-ts-barbie.png'
  },
  {
    username: 'Squeeze',
    nickname: 'Squeeze',
    avatar: 'assets/avatar/avatar-ts-squeeze.png'
  },
  {
    username: 'jinzhi.he',
    nickname: '何锦枝',
    avatar: 'assets/avatar/thumbnail-puppy-1.jpg'
  },
  {
    username: 'hugh.liang',
    nickname: '梁銘輝',
    avatar: 'assets/avatar/hugh.jpg'
  },
  {
    username: 'gary.h',
    nickname: '黄家骏',
    avatar: 'assets/avatar/default.png'
  },
  {
    username: 'kaoqinyichang',
    nickname: '考勤異常',
    avatar: 'assets/icon/document.ico'
  },
  {
    username: 'signlist',
    nickname: '待簽單據',
    avatar: 'assets/icon/signlist.ico'
  },
  {
    username: 'alert',
    nickname: '提醒消息',
    avatar: 'assets/icon/alert.ico'
  },
  {
    username: 'report',
    nickname: '推送報表',
    avatar: 'assets/icon/report.ico'
  },
  {
    username: 'news',
    nickname: '新聞公告',
    avatar: 'assets/icon/news.ico'
  }
  ];

}
