import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

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
   ) {}

  ionViewDidLoad() {
  }
  starage_age() {
    this.navCtrl.push('StarageAgeAnalysisComponent')
  }
  quit() {
    console.log(456)
  }
}
