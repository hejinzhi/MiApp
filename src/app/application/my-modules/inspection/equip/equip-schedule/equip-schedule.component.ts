import { Component, OnInit } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'sg-equip-schedule',
  templateUrl: './equip-schedule.component.html'
})
export class EquipScheduleComponent implements OnInit {

  selectMaxYear = +moment(new Date()).format('YYYY') + 10;
  year:any;
  month:any;
  constructor(
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  ionViewDidLoad(){
    this.year = moment(new Date()).format('YYYY-MM-DD');
    this.month = moment(new Date()).format('YYYY-MM-DD');
  }

  goToDeatilPage() {
    this.navCtrl.push('ScheduleDetailComponent');
  }

  showdetail(){
    console.log(this.year);
  }
}
