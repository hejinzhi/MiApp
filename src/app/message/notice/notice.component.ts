import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavParams, Events, NavController } from 'ionic-angular';
import { MessageService } from '../shared/service/message.service';
import { JMessageService } from '../../core/services/jmessage.service';

import { LanguageConfig } from '../shared/config/language.config';

@Component({
  selector: 'sg-notice',
  templateUrl: 'notice.component.html'
})

export class NoticeComponent implements OnInit {

  fromUserNickName: string;
  fromUserName: string;
  list: any;
  listlength: number;
  listpage: number = 1;
  listpagenum: number = 15;
  listtotal: Array<object>;
  listpageheight: number;
  userInfo: any; // 登录人信息
  alertType: string;
  showChartFlag: boolean = false;
  first: boolean = true;

  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    public messageService: MessageService,
    public jmessageService: JMessageService,
    private ref: ChangeDetectorRef,
    private events: Events) {

    this.fromUserName = params.get('fromUserName');
    this.fromUserNickName = params.get('fromUserNickName');

    if (this.fromUserName === 'alert') {
      this.alertType = params.data.childType;
    }
  }

  ionViewWillEnter() {
    if (this.first) {
      this.scroll_down();
      this.first = false;
    }
  }

  ionViewDidEnter() {
    this.events.subscribe('msg.onReceiveMessage', async () => {
      await this.loadMessage();
      this.ref.detectChanges();
      this.scroll_down();
    });
    // this.jmessageService.enterSingleConversation(this.fromUserName);
  }

  async ionViewWillLeave() {
    await this.messageService.setUnreadToZeroByUserName(this.userInfo.username, this.fromUserName, this.alertType);
    this.jmessageService.setSingleConversationUnreadMessageCount(this.fromUserName, null, 0);
    this.jmessageService.exitConversation();
    this.events.publish('msg.onChangeTabBadge');
  }

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem('currentUser'));
    this.loadMessage();

  }

  toggleChart(item: any) {
    this.showChartFlag = !this.showChartFlag;
    item.extra.showChart = this.showChartFlag;
    // setTimeout(() => {
    //   this.scroll_down();
    // }, 100);
  }

  goToDetail(page: string) {
    this.navCtrl.push(page);
  }

  goToDetail2(params: string) {
    this.navCtrl.push(JSON.parse(params)[0].page, JSON.parse(params)[0]);
  }

  show(params: string) {
    if (JSON.parse(params)[0].page, JSON.parse(params)[0].show === 'Y') {
      return true;
    } else {
      return false;
    }
  }

  async loadMessage() {

    this.listtotal = await this.messageService.getMessagesByUsername(this.userInfo.username, this.fromUserName, this.userInfo.username);
    if (this.fromUserName === 'alert') {
      this.listtotal = this.listtotal.filter((v: any) => (v.childType === this.alertType));
    }

    this.listlength = this.listtotal.length;
    this.list = this.listtotal.slice(-this.listpagenum);
  };

  doscroll(event: any) {
    if (event.srcElement.scrollTop <= 0) {
      if (this.listpage * this.listpagenum < this.listlength) {
        this.listpageheight = event.srcElement.scrollHeight;
        this.listpage++;
        let temp: Array<object> = this.listtotal.slice(-this.listpagenum * this.listpage, -this.listpagenum * (this.listpage - 1));
        temp.forEach((v) => {
          this.list.unshift(v);
        });
        setTimeout(() => {
          var div = document.getElementsByClassName('msg-content');
          div[0].setAttribute
          let dis = div[0].scrollHeight - this.listpageheight;
          div[0].scrollTop = dis;
        }, 0);
      }
    }
  }

  scroll_down() {
    setTimeout(() => {
      var div = document.getElementsByClassName('msg-content');
      div[0].scrollTop = div[0].scrollHeight;
    }, 100);

  }

}

