import { Component, ViewChild, OnInit } from '@angular/core';
import { Tabs, Events } from 'ionic-angular'

import { MessageComponent } from '../message/message.component';
import { ContactComponent } from '../contact/contact.component';
import { ApplicationComponent } from '../application/application.component';

import { MeComponent } from '../me/me.component';
import { MessageService } from '../message/shared/service/message.service';
import { LanguageConfig } from './shared/config/language.config';

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

  constructor(private messageService: MessageService, private events: Events, private plugin:PluginService) {
    this.events.subscribe('messageUnreadCount', () => {
      this.changeTabBadge();
    })
  }


  ngOnInit() {
      this.plugin.checkAppForUpdate();
  }

  ionViewDidEnter() {
    this.changeTabBadge();
  }

  changeTabBadge() {
    this.unreadCount = 0;
    let hisobj = this.messageService.getMessageHistory();
    for (let i = 0; i < hisobj.length; i++) {
      this.unreadCount = this.unreadCount + hisobj[i].unreadCount;
    }

    setTimeout(() => {
      var div: any = document.getElementsByTagName('ion-badge');
      if (parseInt(div[0].innerHTML) <= 0) {
        div[0].style.display = "none";
      } else {
        div[0].style.display = "block";
      }
    }, 0)
  }

}
