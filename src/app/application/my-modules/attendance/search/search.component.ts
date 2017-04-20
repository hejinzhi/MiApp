import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HoildayDetailComponent } from '../hoilday-detail/holiday-detail.component';
import { SearchFormComponent } from '../search-form/search-form.component';

@Component({
  selector:'sg-search',
  templateUrl: 'search.component.html'
})
export class SearcheComponent {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {

  }
  myMaintance(){
    this.navCtrl.push(HoildayDetailComponent);
  }
  searchForm(){
    this.navCtrl.push(SearchFormComponent);
  }
}
