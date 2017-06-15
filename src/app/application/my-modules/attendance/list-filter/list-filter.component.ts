import { Component, Input, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { MyFormModel } from '../shared/models/my-form.model';

import { LanguageTypeConfig } from '../shared/config/language-type.config';

@Component({
  selector: 'sg-list-filter',
  templateUrl: 'list-filter.component.html',
})
export class ListFilterComponent implements OnInit {

  fontType:string = localStorage.getItem('languageType')
  fontContent = LanguageTypeConfig.listFilterComponent[this.fontType];

  @Input() myset: any;

  type: string;
  items: MyFormModel[];
  showApproved: boolean = false;
  user: any;
  isMoving:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'))
    this.type = this.myset.type;
    this.initializeItems();
    console.log(this.items)
  }

  sortItems(type: string) {
    switch (type) {
      case '100':
        this.items = this.sortByDate(this.items, 'startTime');
        break;
      case '2':
        this.items = this.sortByDate(this.items, 'startDate');
        break;
      case '3':
        this.items = this.sortByDate(this.items, 'OTtime');
        break;
      case '4':
        this.items = this.sortByDate(this.items, 'businessTime');
        break;
      default:
        break;
    }
  }
  initializeItems() {
    this.items = this.myset.formData || [];
    this.sortItems(this.type);
  }

  sortByStatusAndDate(items: MyFormModel[], targetDateName: string) {
    items.sort((a: MyFormModel, b: MyFormModel) => {
      let first = this.getStatusPoint(a.status);
      let second = this.getStatusPoint(b.status);
      if (second === first) {
        return Date.parse(b.data[targetDateName]) - Date.parse(a.data[targetDateName])
      }
      return second - first;
    })
    return items;
  }
  sortByDate(items: MyFormModel[],targetDateName: string) {
    items.sort((a: MyFormModel, b: MyFormModel) => {
      return Date.parse(b.data[targetDateName]) - Date.parse(a.data[targetDateName])
    })
    return items;
  }
  getStatusPoint(status: string): number {
    let res = 0
    switch (status.toUpperCase()) {
      case 'NEW':
        res = 6
        break;
      case 'CANCELED':
        res = 5;
        break;
      case 'REJECTED':
        res = 4;
        break;
      case 'WAITING':
        res = 3;
        break;
      case 'APPROVED':
        res = 2;
        break;
      case 'FINISHED':
        res = 1;
        break;
      default:
        break;
    }
    return res;
  }
  getItems(ev: any) {
    this.initializeItems();
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.items = this.items.filter((item: any) => {
        return (item.No.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  toDetail(detailMes: any) {
    if(this.isMoving) return;
    let targetForm: any = '';
    switch (detailMes.type) {
      case '2':
        targetForm = 'LeaveFormComponent';
        break;
      case '3':
        targetForm = 'OverTimeFormComponent';
        break;
      case '4':
        targetForm = 'BusinessFormComponent';
        break;
      case '5':
        targetForm = 'CallbackLeaveFormComponent';
        break;
      default:
        targetForm = 'UndoneFormComponent';
        break;
    }
    this.navCtrl.push(targetForm, {
      detailMes: detailMes
    })
  }
  touchstart() {
    this.isMoving = false;
  }
  touchmove() {
    this.isMoving = true;
  }
}
