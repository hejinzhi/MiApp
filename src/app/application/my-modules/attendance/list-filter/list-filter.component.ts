import { Component, Input, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UndoneFormComponent } from '../undone-form/undone-form.component';
import { LeaveFormComponent } from '../leave-form/leave-form.component';
import { BusinessFormComponent } from '../business-form/business-form.component';
import { CallbackLeaveFormComponent } from '../callback-leave-form/callback-leave-form.component';
import { OverTimeFormComponent } from '../over-time-form/over-time-form.component';
import { TabsComponent } from '../../../../tabs/tabs.component'

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

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ngOnInit() {
    this.type = this.myset.type;
    this.initializeItems();
  }

  sortItems(type: string) {
    switch (type) {
      case '2':
        this.items = this.sortByDate(this.items, 'startDate');
        break;
      case '3':
        this.items = this.sortByDate(this.items, 'OTtime');
        break;
      default:
        break;
    }
  }
  initializeItems() {
    this.items = this.myset.formData || [];
    this.sortItems(this.type);
    if (this.items.length > 0) return;
    switch (this.type) {
      case '4':
        this.items = [
          {
            type: '4',
            status: 'New',
            No: 'HTL021703007572',
            data: {
              reasonType: '20',
              autoSet: false,
              colleague: 'xiaomi',
              businessTime: '2017-03-01',
              startTime: '01:00',
              endTime: '02:00',
              reason: '有急事'
            }
          },
          {
            type: '4',
            status: 'WAITING',
            No: 'HTL021703007572',
            data: {
              reasonType: '20',
              autoSet: false,
              colleague: 'xiaomi',
              businessTime: '2017-03-01',
              startTime: '01:00',
              endTime: '02:00',
              reason: '有急事'
            }
          },
          {
            type: '4',
            status: 'APPROVED',
            No: 'HTL021703004572',
            data: {
              reasonType: '30',
              autoSet: false,
              colleague: 'xiaomi',
              businessTime: '2017-01-01',
              startTime: '18:30',
              endTime: '21:00',
              reason: '有急事'
            }
          }
        ]
        break;
      case '5':
        this.items = [
          {
            type: '5',
            status: 'APPROVED',
            No: 'HTL021703004172',
            data: {
              leave_No: 'HTL021703002172',
              reason: '提早康复'
            }
          },
          {
            type: '5',
            status: 'New',
            No: 'HTL021704001172',
            data: {
              leave_No: 'HTL021703002152',
              reason: '车票买早了'
            }
          },
          {
            type: '5',
            status: 'WAITING',
            No: 'HTL021704001572',
            data: {
              leave_No: 'HTL021703002152',
              reason: '车票买早了'
            }
          }
        ]
        break;
      default:
        this.items = [
          {
            type: '0',
            status: 'New',
            No: 'HTL021703007172',
            data: {
              reasonType: '',
              startTime: '2017-01-01T10:00:00Z',
              endTime: '2017-01-01T11:00:00Z',//"2017-01-01T01:00:00Z",
              colleague: '',
              reason: ''
            }
          },
          {
            type: '1',
            status: 'New',
            No: 'HTL021703008116',
            data: {
              reasonType: '',
              startTime: '2017-01-01T01:00:00Z',
              endTime: '2017-01-05T01:00:00Z',//"2017-01-01T01:00:00Z",
              colleague: '',
              reason: ''
            }
          },
          {
            type: '0',
            status: 'New',
            No: 'HTL021703017188',
            data: {
              reasonType: '',
              startTime: '2017-01-01T09:00:00Z',
              endTime: '2017-01-01T11:00:00Z',//"2017-01-01T01:00:00Z",
              colleague: '',
              reason: ''
            }
          }
        ];
        break;

    }
    this.items.sort((a: MyFormModel, b: MyFormModel) => {
      let first = this.getStatusPoint(a.status);
      let second = this.getStatusPoint(b.status);
      return second - first;
    })
    if (Number(this.type) === 100) {
      this.items.sort((a: MyFormModel, b: MyFormModel) => {
        if (b.type === a.type) {
          return Date.parse(b.data.startTime) - Date.parse(a.data.startTime)
        }
        return Number(b.type) - Number(a.type);
      })
    }

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
    let targetForm: any = '';
    switch (this.type) {
      case '2':
        targetForm = LeaveFormComponent;
        break;
      case '3':
        targetForm = OverTimeFormComponent;
        break;
      case '4':
        targetForm = BusinessFormComponent;
        break;
      case '5':
        targetForm = CallbackLeaveFormComponent;
        break;
      default:
        targetForm = UndoneFormComponent;
        break;
    }
    this.navCtrl.push(targetForm, {
      detailMes: detailMes
    })
  }
}
