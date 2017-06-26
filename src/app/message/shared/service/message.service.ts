
import { Injectable, EventEmitter } from '@angular/core';
import { Events } from 'ionic-angular';
import { Observable, Subscription, Subject } from 'rxjs/Rx';
import { JMessageService } from '../../../core/services/jmessage.service';
import { Message } from '../classes/Message';

@Injectable()
export class MessageService {
  constructor(
    private jmessage: JMessageService,
    public events: Events
  ) { }


  userInfo: any;// 当前登录用户的信息
  allUserInfo: any;
  // history: Message[];  // 历史消息

  history = [
    {
      "toUserName": "mahuateng",
      "fromUserName": "hugh.liang",
      "content": "test1",
      "contentType": "text",
      "time": 1496306792505,
      "type": "dialogue",
      "unread": true
    }, {
      "toUserName": "mahuateng",
      "fromUserName": "hugh.liang",
      "content": "test2",
      "contentType": "text",
      "time": 1496306792506,
      "type": "dialogue",
      "unread": true
    }, {
      "toUserName": "mahuateng",
      "fromUserName": "hugh.liang",
      "content": "test3",
      "contentType": "text",
      "time": 1496306792507,
      "type": "dialogue",
      "unread": true
    }, {
      "toUserName": "mahuateng",
      "fromUserName": "hugh.liang",
      "content": "test4",
      "contentType": "text",
      "time": 1496306792508,
      "type": "dialogue",
      "unread": true
    }, {
      "toUserName": "mahuateng",
      "fromUserName": "hugh.liang",
      "content": "test5",
      "contentType": "text",
      "time": 1496306792509,
      "type": "dialogue",
      "unread": true
    }, {
      "toUserName": "mahuateng",
      "fromUserName": "hugh.liang",
      "content": "test6",
      "contentType": "text",
      "time": 1496306792510,
      "type": "dialogue",
      "unread": true
    }, {
      "toUserName": "mahuateng",
      "fromUserName": "hugh.liang",
      "content": "test7",
      "contentType": "text",
      "time": 1496306792511,
      "type": "dialogue",
      "unread": true
    }, {
      "toUserName": "mahuateng",
      "fromUserName": "hugh.liang",
      "content": "test8",
      "contentType": "text",
      "time": 1496306792512,
      "type": "dialogue",
      "unread": true
    }, {
      "toUserName": "mahuateng",
      "fromUserName": "hugh.liang",
      "content": "test9",
      "contentType": "text",
      "time": 1496306792513,
      "type": "dialogue",
      "unread": true
    }, {
      "toUserName": "mahuateng",
      "fromUserName": "hugh.liang",
      "content": "test10",
      "contentType": "text",
      "time": 1496306792514,
      "type": "dialogue",
      "unread": true
    }, {
      "toUserName": "mahuateng",
      "fromUserName": "hugh.liang",
      "content": "test11",
      "contentType": "text",
      "time": 1496306792515,
      "type": "dialogue",
      "unread": true
    }, {
      "toUserName": "hugh.liang",
      "fromUserName": "mahuateng",
      "content": "test12",
      "contentType": "text",
      "time": 1496306792516,
      "type": "dialogue",
      "unread": true
    }, {
      "toUserName": "mahuateng",
      "fromUserName": "hugh.liang",
      "content": "test13",
      "contentType": "text",
      "time": 1496306792517,
      "type": "dialogue",
      "unread": true
    }, {
      "toUserName": "mahuateng",
      "fromUserName": "hugh.liang",
      "content": "test14",
      "contentType": "text",
      "time": 1496306792518,
      "type": "dialogue",
      "unread": true
    }, {
      "toUserName": "mahuateng",
      "fromUserName": "hugh.liang",
      "content": "test15",
      "contentType": "text",
      "time": 1496306792519,
      "type": "dialogue",
      "unread": true
    }, {
      "toUserName": "mahuateng",
      "fromUserName": "hugh.liang",
      "content": "test19",
      "contentType": "text",
      "time": 1496306792520,
      "type": "dialogue",
      "unread": true
    }, {
      "toUserName": "mahuateng",
      "fromUserName": "hugh.liang",
      "content": "test20",
      "contentType": "text",
      "time": 1496306792521,
      "type": "dialogue",
      "unread": true
    }, {
      "toUserName": "mahuateng",
      "fromUserName": "hugh.liang",
      "content": "test21",
      "contentType": "text",
      "time": 1496306792522,
      "type": "dialogue",
      "unread": true
    }, {
      "toUserName": "mahuateng",
      "fromUserName": "hugh.liang",
      "content": "test22",
      "contentType": "text",
      "time": 1496306792523,
      "type": "dialogue",
      "unread": true
    }
    , {
      "toUserName": "hugh.liang",
      "fromUserName": "signlist",
      "content": {
        "type": "att",
        "title":"請假單簽核",
        "content": "請假單簽核1"
      },
      "contentType": "text",
      "time": 1496306792526,
      "type": "notice",
      "unread": true
    }, {
      "toUserName": "hugh.liang",
      "fromUserName": "news",
      "content": {
        "type": "att",
        "title":"天氣預告",
        "content": "天氣預告1"
      },
      "contentType": "text",
      "time": 1496306792520,
      "type": "notice",
      "unread": true
    }, {
      "toUserName": "hugh.liang",
      "fromUserName": "report",
      "content": {
        "type": "庫存報表",
        "title":"庫存信息",
        "content": "庫存信息1"
      },
      "contentType": "text",
      "time": 1496306792527,
      "type": "notice",
      "unread": true
    }, {
      "toUserName": "hugh.liang",
      "fromUserName": "alert",
      "content": {
        "type": "att",
        "title":"假單維護",
        "content": "考勤異常"
      },
      "contentType": "text",
      "time": 1496306792527,
      "type": "notice",
      "unread": true
    }, {
      "toUserName": "hugh.liang",
      "fromUserName": "alert",
      "content": {
        "type": "pro",
        "title":"生產管理",
        "content": "生產管理1"
      },
      "contentType": "text",
      "time": 1496306792550,
      "type": "notice",
      "unread": true
    }, {
      "toUserName": "hugh.liang",
      "fromUserName": "alert",
      "content": {
        "type": "pro",
        "title":"生產管理",
        "content": "生產管理2"
      },
      "contentType": "text",
      "time": 1496306792551,
      "type": "notice",
      "unread": true
    }, {
      "toUserName": "hugh.liang",
      "fromUserName": "alert",
      "content": {
        "type": "att",
        "title":"離職注意事項1",
        "content": "尊敬的XXX: 您的离职日xxxx年x月x 日,请您在离职日16:30前携带以下物品前往招聘办公室办理离职手续(住宿的同仁请先找宿管办理退宿手续),17:00后您的厂牌将失效. 感谢您的配合!\r\n1.离职申请单(在贵部门助理处领取)\r\n2.辞呈\r\n3.工作移交清单\r\n4.厂牌\r\n5.员工手册\r\n6.工衣(进厂不满2年者,退还发放的全部工衣:两年以上者, 退还入职时发放的所有工衣和近两年满年限发放的工衣)"
      },
      "contentType": "text",
      "time": 1496306792900,
      "type": "notice",
      "unread": true
    },{
      "toUserName": "hugh.liang",
      "fromUserName": "alert",
      "content": {
        "type": "att",
        "title":"離職注意事項2",
        "content": "尊敬的XXX: 您的离职日xxxx年x月x 日,请您在离职日16:30前携带以下物品前往招聘办公室办理离职手续(住宿的同仁请先找宿管办理退宿手续),17:00后您的厂牌将失效. 感谢您的配合!\r\n1.离职申请单(在贵部门助理处领取)\n2.辞呈\r\n3.工作移交清单\n4.厂牌\r\n5.员工手册\r\n6.工衣(进厂不满2年者,退还发放的全部工衣:两年以上者, 退还入职时发放的所有工衣和近两年满年限发放的工衣)"
      },
      "contentType": "text",
      "time": 1496306852900,
      "type": "notice",
      "unread": true
    }
    ];

  getLocalMessageHistory() {
    //return JSON.parse(localStorage.getItem('localMessageHistory'));
    return this.history;
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

  getNoticeHistoryByID(username: string) {
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
      // if (v.type === 'dialogue') {
      // 我发出去的消息
      if (v.fromUserName === this.userInfo.username && dialoguedistince.indexOf(v.toUserName) === -1) {
        dialoguedistince.push(v.toUserName);
        distince.push({
          username: v.toUserName,
          // type: 'dialogue',
          type: v.type,
          time: v.time,
        });
      }
      // 别人发给我的信息
      if (v.toUserName === this.userInfo.username && dialoguedistince.indexOf(v.fromUserName) === -1) {
        dialoguedistince.push(v.fromUserName);
        distince.push({
          username: v.fromUserName,
          // type: 'dialogue',
          type: v.type,
          time: v.time,
        });
      }
      // }
      // if (v.type === 'notice' && v.toUserName === this.userInfo.username) {
      //   distince.push({
      //     username: v.fromUserName,
      //     type: 'notice',
      //     time: v.time,
      //   });
      // }
    });


    distince.forEach((v: any) => {
      let pmsg;

      // if (v.type === 'dialogue') {
      pmsg = sorted.filter((v1) => (v1.fromUserName === v.username && v1.toUserName === this.userInfo.username) || v1.toUserName === v.username && v1.fromUserName === this.userInfo.username);
      // }
      // else {
      //   pmsg = sorted.filter((msg) => msg.time === v.time);
      // }
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

  setUnreadToZeroByUserName(username: string, type: string) {
    let history = this.history.filter((v: any) => (v.unread === true));
    history.forEach((v: any) => {
      if (v.fromUserName === username) {
        if (username === 'alert') {
          if (v.content.type === type) {
            v.unread = false;
          }
        } else { v.unread = false; }
      }
    });
    this.setLocalMessageHistory(history);
    this.events.publish('messageUnreadCount');
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
    { username: 'hugh.liang', nickname: '梁銘輝', avatar: 'assets/avatar/hugh.jpg' },
    { username: 'kaoqinyichang', nickname: '考勤異常', avatar: 'assets/icon/document.ico' },
    { username: 'signlist', nickname: '待簽單據', avatar: 'assets/icon/signlist.ico' },
    { username: 'alert', nickname: '提醒消息', avatar: 'assets/icon/alert.ico' },
    { username: 'report', nickname: '推送報表', avatar: 'assets/icon/report.ico' },
    { username: 'news', nickname: '新聞公告', avatar: 'assets/icon/news.ico' }
  ];

}

