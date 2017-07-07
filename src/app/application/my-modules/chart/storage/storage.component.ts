import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, Platform } from 'ionic-angular';

import { LanguageConfig } from '../shared/config/language.config';

@IonicPage()
@Component({
  selector:'sg-storage',
  templateUrl: 'storage.component.html'
})
export class StorageComponent {

  languageType: string = localStorage.getItem('languageType');
  languageContent = LanguageConfig.humanResourcesComponent[this.languageType];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
   ) {}

  ionViewDidLoad() {
  }
  starage_age() {
    this.navCtrl.push('StarageAgeAnalysisComponent')
  }
  quit() {
    console.log(456)
  }
  exit() {
    this.platform.runBackButtonAction();
  }
}
