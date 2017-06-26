
import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { MessageService } from '../shared/service/message.service';
import { JMessageService } from '../../core/services/jmessage.service';

import { LanguageConfig } from '../shared/config/language.config';

@Component({
    selector: 'sg-notice',
    templateUrl: 'notice.component.html'
})

export class NoticeComponent implements OnInit {

    languageType: string = localStorage.getItem('languageType');
    languageContent = LanguageConfig.AlertComponent[this.languageType];

    fromUserNickName: string;
    fromUserName: string;
    list: any;
    userInfo: any; // 登录人信息
    alertType: string;


    constructor(
        public params: NavParams,
        public messageService: MessageService,
        public jmessageService: JMessageService) {

        this.fromUserName = params.get('fromUserName');
        this.fromUserNickName = params.get('fromUserNickName');

        // if (this.fromUserName === "" || typeof this.fromUserName === 'undefined') {

        //   this.fromUserName = params.get('fromUserName');
        // }
        // if (this.fromUserNickName === "" || typeof this.fromUserNickName === 'undefined') {
        //   this.fromUserNickName = params.get('fromUserNickName');
        // }

        if (this.fromUserName === 'alert') {
            this.alertType = params.data.content.type;
        }
    }

    ionViewWillEnter() {
        setTimeout(() => {
            this.scroll_down();
        }, 0);
    }

    ionViewWillLeave() {
        // this.messageService.setUnreadToZeroByUserName(this.userName, this.alertType);
    }

    ngOnInit() {
        this.userInfo = JSON.parse(localStorage.getItem('currentUser'));
        this.loadMessage();

    }

    async loadMessage() {

        this.list = await this.messageService.getMessagesByUsername(this.fromUserName, this.userInfo.username);


        // this.list = await this.messageService.getNoticeHistoryByID(this.fromUserName);
        // if (this.fromUserName === 'alert') {
        //   this.list = this.list.filter((v: any) => (v.content.type === this.alertType));
        // }
    };

    scroll_down() {
        var div = document.getElementsByClassName('msg-content');
        div[0].scrollTop = div[0].scrollHeight;
    }

}

