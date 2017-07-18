import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { Tabs, Events, Platform } from 'ionic-angular'

import { MessageComponent } from '../message/message.component';
import { ContactComponent } from '../contact/contact.component';
import { ApplicationComponent } from '../application/application.component';

import { MeComponent } from '../me/me.component';
import { MessageService } from '../message/shared/service/message.service';
import { LanguageConfig } from './shared/config/language.config';
import { DatabaseService } from '../message/shared/service/database.service';
import { PluginService } from '../core/services/plugin.service';
import { JPushService } from '../core/services/jpush.service';

@Component({
  selector: 'sg-tabs',
  templateUrl: 'tabs.component.html'
})
export class TabsComponent implements OnInit {
  @ViewChild('mainTabs') tabRef: Tabs;
  languageType: string = localStorage.getItem('languageType');
  languageContent = LanguageConfig.tabComponent[this.languageType];
  tab1Root = MessageComponent;
  tab2Root = ApplicationComponent;
  tab3Root = ContactComponent;
  tab4Root = 'MeComponent';
  unreadCount: number;
  userinfo: any; //登录人信息

  constructor(
    private messageService: MessageService,
    private events: Events,
    private plugin: PluginService,
    private databaseService: DatabaseService,
    private ref: ChangeDetectorRef,
    private platform: Platform,
    private jPushService: JPushService
  ) {

    if (this.plugin.isCordova()) {
      this.events.subscribe('msg.onChangeTabBadge', async () => {
        await this.changeTabBadge();
        this.ref.detectChanges();
      });
    }
  }


  ngOnInit() {
    this.userinfo = JSON.parse(localStorage.getItem('currentUser'));
  }

  async ionViewDidEnter() {
    if (this.plugin.isCordova()) {
      await this.changeTabBadge();
    }

  }

  async changeTabBadge() {
    let data = await this.databaseService.getAllUnreadCount(this.userinfo.username, this.userinfo.username);
    this.unreadCount = data.rows.item(0).COUNT;
    if (this.platform.is('ios')) {
      this.jPushService.setBadge(this.unreadCount);
      this.jPushService.setApplicationIconBadgeNumber(this.unreadCount);
    }
  }

}
