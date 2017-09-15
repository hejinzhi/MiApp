import { Component, OnInit } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'sg-schedule-detail',
  templateUrl: 'schedule-detail.component.html'
})
export class ScheduleDetailComponent implements OnInit {

  type: string = '1';

  constructor() { }

  ngOnInit() {
  }

}
