import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { FormType } from '../shared/config/form-type';

@IonicPage()
@Component({
  selector: 'sg-swipe-note',
  templateUrl: 'swipe-note.component.html',
})
export class SwipeNoteComponent {
  items:any;
  type: string = '';
  user: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private translate: TranslateService
  ) {

  }
  ionViewDidLoad() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.type = new FormType().swipe_note.type;
    let swipe_note = this.navParams.data.swipe_note;
    this.items = swipe_note;
  }

}
