import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'sg-me',
  templateUrl: 'me.component.html'
})
export class MeComponent {

  user;
  constructor(public navCtrl: NavController) {

  }

  ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }
}
