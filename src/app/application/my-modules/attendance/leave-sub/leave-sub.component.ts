import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { LeaveFormComponent } from '../leave-form/leave-form.component';
import { FormListComponent } from '../form-list/form-list.component';
import { BusinessFormComponent } from '../business-form/business-form.component';

@Component({
  selector:'sg-leave-sub',
  templateUrl: 'leave-sub.component.html'
})
export class LeaveSubComponent {

  constructor(public navCtrl: NavController, public navParams: NavParams ) {}

  ionViewDidLoad() {
  }

  maintain_Leave() {
    this.navCtrl.push(LeaveFormComponent);
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
}
