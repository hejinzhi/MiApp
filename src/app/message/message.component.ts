import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MessageModel } from '../shared/models/message.model';

@Component({
  selector: 'sg-message',
  templateUrl: 'message.component.html'
})
export class MessageComponent {

  constructor(public navCtrl: NavController) {
  }

  msgListItem: MessageModel[] = [];
  historyMsg: any[] = []; // 在app.component.ts被赋值
  messageListItem;

}
