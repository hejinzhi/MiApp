import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FormType } from '../shared/config/form-type';

@Component({
  selector: 'sg-swipe-note',
  templateUrl: 'swipe-note.component.html',
})
export class SwipeNoteComponent {
  items:any;
  type: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }
  ionViewDidLoad() {
    this.type = new FormType().swipe_note.type;
    this.items = [
      {
        date:'2017-3-24',
        time:'07:56:32',
        type:'+',
        workType:'1F4',
        inOrOut:'进厂',
        wipeSite:'新厂北門'
      },
      {
        date:'2017-3-24',
        time:'12:03:32',
        type:'$',
        workType:'1F4',
        inOrOut:'出厂',
        wipeSite:'新厂北門'
      },
      {
        date:'2017-3-24',
        time:'12:36:38',
        type:'@',
        workType:'1F4',
        inOrOut:'进厂',
        wipeSite:'新厂北門'
      },
      {
        date:'2017-3-24',
        time:'07:56:32',
        type:'-',
        workType:'1F4',
        inOrOut:'出厂',
        wipeSite:'新厂北門'
      }
    ]

  }

}
