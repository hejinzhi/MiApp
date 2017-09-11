import { Component, ViewChild, OnInit } from '@angular/core';
import { Tabs } from 'ionic-angular'
import { NavController, NavParams, App, Platform, IonicPage } from 'ionic-angular';

import { DutyDailyService } from './dutydaily.service';
import { TranslateService } from '@ngx-translate/core';


@IonicPage()
@Component({
  selector: 'sg-dutydaily',
  templateUrl: 'dutydaily.component.html'
})
export class DutyDailyComponent implements OnInit {

  deptno: string;
  centerflag: string;
  reportdate: string;
  itemlist: any[];
  type: string = 'ALL';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dutydailyService: DutyDailyService,
    private translate: TranslateService
  ) {
    this.deptno = navParams.data.deptno;
    this.centerflag = navParams.data.center_flag;
    this.reportdate = navParams.data.reportdate;
  }

  ngOnInit() {
    this.dutydailyService.getWorkOffdutyList(this.centerflag, this.deptno, this.type, this.reportdate).then((res => {
      this.itemlist = res.json();
    }));
  }

  ionViewDidLoad() {
  }

  ionViewWillLeave() {

  }

  getItem() {
    this.dutydailyService.getWorkOffdutyList(this.centerflag, this.deptno, this.type, this.reportdate).then((res => {
      this.itemlist = res.json();
    }));
  }

}
