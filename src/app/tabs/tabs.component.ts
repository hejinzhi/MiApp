import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { Tabs, Events } from 'ionic-angular'

import { MessageComponent } from '../message/message.component';
import { ContactComponent } from '../contact/contact.component';
import { ApplicationComponent } from '../application/application.component';

import { MeComponent } from '../me/me.component';
import { MessageService } from '../message/shared/service/message.service';
import { LanguageConfig } from './shared/config/language.config';
import { DatabaseService } from '../message/shared/service/database.service';
import { PluginService } from '../core/services/plugin.service';

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

  constructor(
    private messageService: MessageService,
    private events: Events,
    private plugin: PluginService,
    private databaseService: DatabaseService,
    private ref: ChangeDetectorRef,
  ) {
    this.events.subscribe('msg.onReceiveMessage', async () => {
      await this.changeTabBadge();
      this.ref.detectChanges();
    });

    this.events.subscribe('msg.onChangeTabBadge', async () => {
      await this.changeTabBadge();
      this.ref.detectChanges();
    });
  }


  ngOnInit() {
    this.plugin.checkAppForUpdate();
  }

  async ionViewDidEnter() {
    await this.changeTabBadge();
  }

  async changeTabBadge() {
    let data = await this.databaseService.getAllUnreadCount();
    this.unreadCount = data.rows.item(0).COUNT;
  }

}
