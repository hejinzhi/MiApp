import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

import { LanguageConfig } from '../shared/config/language.config';

@IonicPage()
@Component({
  selector: 'sg-human-resources',
  templateUrl: 'human-resources.component.html'
})
export class HumanResourcesComponent {


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) { }

  ionViewDidLoad() {
  }
  salary() {
    this.navCtrl.push('SalaryAnalysisComponent')
  }
  dismission() {
    this.navCtrl.push('DimissionAnalysisComponent')
  }
}
