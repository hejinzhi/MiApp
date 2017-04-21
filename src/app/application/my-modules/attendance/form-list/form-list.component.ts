import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';

import { UndoneFormComponent } from '../undone-form/undone-form.component';
import { LeaveFormComponent } from '../leave-form/leave-form.component';
import { BusinessFormComponent } from '../business-form/business-form.component';
import { CallbackLeaveFormComponent } from '../callback-leave-form/callback-leave-form.component';
import { OverTimeFormComponent } from '../over-time-form/over-time-form.component';
import { TabsComponent } from '../../../../tabs/tabs.component'

import { MyFormModel } from '../shared/models/my-form.model';

@Component({
  selector: 'sg-form-list',
  templateUrl: 'form-list.component.html',
})
export class FormListComponent {
  searchQuery: string = '';
  showApproved: boolean = false;
  items: MyFormModel[];
  type: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private app: App) {

  }
  ionViewDidLoad() {
    this.type = this.navParams.data.type;
    if(this.navParams.data.status) {
      this.showApproved = this.navParams.data.status === 'APPROVED'? true:false;
    }
    this.initializeItems();
  }
  initializeItems() {
    switch (this.type) {
      case '2':
        this.items = [
          {
            type:'2',
            status: 'APPROVED',
            No: 'HTL021703007171',
            data: {
              type: 'P',
              startTime: '2017-01-01T01:00:00Z',
              endTime: '2017-01-05T01:00:00Z',//"2017-01-01T01:00:00Z",
              boss: '小米',
              reason: '有急事'
            }
          },
          {
            type:'2',
            status: 'New',
            No: 'HTL021703008115',
            data: {
              type: 'P',
              startTime: '2017-01-01T01:00:00Z',
              endTime: '2017-01-05T01:00:00Z',//"2017-01-01T01:00:00Z",
              boss: '小米',
              reason: '有急事'
            }
          },
          {
            type:'2',
            status: 'WAITING',
            No: 'HTL021703017178',
            data: {
              type: 'P',
              startTime: '2017-01-01T01:00:00Z',
              endTime: '2017-01-05T01:00:00Z',//"2017-01-01T01:00:00Z",
              boss: '小米',
              reason: '有急事'
            }
          }
        ];
        if(this.showApproved){
          console.log(456)
          this.items = this.items.filter((item:any) => {
            return item.status.toUpperCase() === 'APPROVED';
          })
        }
        break;
      case '3':
        this.items = [
          {
            type:'3',
            status: 'APPROVED',
            No: 'HTL021704006124',
            data: {
              type: '01',
              OTtime: '2017-04-01',
              startTime: '11:00',
              endTime: '22:00',
              reason: '有急事'
            }
          },
          {
            type:'3',
            status: 'New',
            No: 'HTL021703007572',
            data: {
              type: '01',
              OTtime: '2017-04-06',
              startTime: '11:00',
              endTime: '12:00',
              reason: '有急事'
            }
          }
        ]
        break;
      case '4':
        this.items = [
          {
            type:'4',
            status: 'New',
            No: 'HTL021703007572',
            data: {
              type: '20',
              autoSet: false,
              boss: 'xiaomi',
              businessTime: '2017-03-01',
              startTime: '01:00',
              endTime: '02:00',
              reason: '有急事'
            }
          },
          {
            type:'4',
            status: 'WAITING',
            No: 'HTL021703007572',
            data: {
              type: '20',
              autoSet: false,
              boss: 'xiaomi',
              businessTime: '2017-03-01',
              startTime: '01:00',
              endTime: '02:00',
              reason: '有急事'
            }
          },
          {
            type:'4',
            status: 'APPROVED',
            No: 'HTL021703004572',
            data: {
              type: '30',
              autoSet: false,
              boss: 'xiaomi',
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
            type:'0',
            status: 'APPROVED',
            No: 'HTL021703004172',
            data: {
              leave_No: 'HTL021703002172',
              reason: '提早康复'
            }
          },
          {
            type:'0',
            status: 'New',
            No: 'HTL021704001172',
            data: {
              leave_No: 'HTL021703002152',
              reason: '车票买早了'
            }
          },
          {
            type:'0',
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
            type:'0',
            status: 'New',
            No: 'HTL021703007172',
            data: {
              type: '',
              startTime: '2017-01-01T01:00:00Z',
              endTime: '2017-01-05T01:00:00Z',//"2017-01-01T01:00:00Z",
              boss: '',
              reason: ''
            }
          },
          {
            type:'1',
            status: 'APPROVED',
            No: 'HTL021703008116',
            data: {
              type: '',
              startTime: '2017-01-01T01:00:00Z',
              endTime: '2017-01-05T01:00:00Z',//"2017-01-01T01:00:00Z",
              boss: '',
              reason: ''
            }
          },
          {
            type:'0',
            status: 'WAITING',
            No: 'HTL021703017188',
            data: {
              type: '',
              startTime: '2017-01-01T01:00:00Z',
              endTime: '2017-01-05T01:00:00Z',//"2017-01-01T01:00:00Z",
              boss: '',
              reason: ''
            }
          }
        ];
        break;

    }


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
    let targetForm:any= '';
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

  exit() {
    this.app.getRootNav().setRoot(TabsComponent)
  }
}
