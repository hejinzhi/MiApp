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
  constructor(
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  goToDeatilPage(){
    this.navCtrl.push('ScheduleDetailComponent');
  }
}
