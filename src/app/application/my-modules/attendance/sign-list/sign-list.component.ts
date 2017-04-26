import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'sg-sign-list',
  templateUrl: 'sign-list.component.html'
})
export class SignListComponent {

  type:string;
  items:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    this.items=[
      {version:1,data:[
        {NO:1,status:'APPROVED',id:'JANE.KUANG',toTime:'2017/03/01 10:55:23',outTime:'2017/03/01 11:35:13',PS:''},
        {NO:2,status:'APPROVED',id:'XXX.XXX',toTime:'2017/03/01 11:35:13',outTime:'2017/03/01 14:35:13',PS:''}
      ]},
      {version:2,data:[
        {NO:1,status:'APPROVED',id:'JANE.KUANG',toTime:'2017/03/01 10:55:23',outTime:'2017/03/01 11:35:13',PS:''},
        {NO:2,status:'APPROVED',id:'XXX.XXX',toTime:'2017/03/01 11:35:13',outTime:'2017/03/01 14:35:13',PS:''}
      ]}
    ]
    this.items.sort((a:any,b:any) =>{
      return b.version-a.version
    })
  }
}
