import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FormType } from '../shared/config/form-type';

@Component({
  selector: 'sg-sign-list',
  templateUrl: 'sign-list.component.html'
})
export class SignListComponent {

  type:string;
  items:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    this.type = new FormType().sign_list.type;
    this.items=[
      {version:1,data:[

      ]}
    ]
  }
}
