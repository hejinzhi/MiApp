import { Component, ViewChild } from '@angular/core';
import { Tabs } from 'ionic-angular'

import { MessageComponent } from '../message/message.component';
import { ContactComponent } from '../contact/contact.component';
import { ApplicationComponent } from '../application/application.component';
import { MeComponent } from '../me/me.component';



@Component({
  templateUrl: 'tabs.component.html'
})
export class TabsComponent {
  @ViewChild('mainTabs') tabRef: Tabs;

  tab1Root = MessageComponent;
  tab2Root = ApplicationComponent;
  tab3Root = ContactComponent;
  tab4Root = MeComponent;

  constructor() {

  }
}
