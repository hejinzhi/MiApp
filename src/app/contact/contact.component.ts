import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'sg-contact',
  templateUrl: 'contact.component.html'
})
export class ContactComponent {

  contacter: any[] = [];
  constructor(public navCtrl: NavController) {
    this.contacter = [{
      name: '锦枝',
      full_name: '何锦枝',
      company: '顺达电脑',
      position: '工程师',
      department: '电子商务部'
    },
    {
      name: '铭辉',
      full_name: '梁铭辉',
      company: '顺达电脑',
      position: '工程师',
      department: '电子商务部'
    }];
  }
}
