import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LeaveFormComponent } from './leave-form/leave-form.component';
import { OverTimeFormComponent } from './over-time-form/over-time-form.component';
import { BusinessFormComponent } from './business-form/business-form.component';
import { FormListComponent } from './form-list/form-list.component';
import { SearcheComponent } from './search/search.component';

@Component({
  selector:'sg-attendance',
  templateUrl: 'attendance.component.html'
})
export class AttendanceComponent {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {

  }

  maintain_leave():void{
    this.navCtrl.push(LeaveFormComponent);
  }

  maintain_OT():void{
    this.navCtrl.push(OverTimeFormComponent);
  }

  cancel_leave():void{
    this.navCtrl.push(FormListComponent,{
      type:'2',
      status:'APPROVED'
    });
  }

  maintain_business():void{
    this.navCtrl.push(BusinessFormComponent);
  }

  maintain_undone(num:number):void{
    this.navCtrl.push(FormListComponent,{
      type:num
    });
  }

  search():void{
    this.navCtrl.push(SearcheComponent);
  }
}
