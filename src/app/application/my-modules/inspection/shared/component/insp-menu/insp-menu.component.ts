import { Component } from '@angular/core';
import { ViewController, NavController, NavParams, AlertController, IonicPage} from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'sg-insp-menu',
  templateUrl: 'insp-menu.component.html',
})
export class InspMenuComponent {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController,
    private translate: TranslateService
  ) {}
  translateTexts: any = {};

  ionViewDidLoad(){
    this.subscribeTranslateText();
  }
  ionViewWillEnter(){

  }

  subscribeTranslateText() {
    this.translate.get(['attendance.no_callback', 'attendance.delete_succ',
    'attendance.callbackSign_succ', 'attendance.callbackSign_err','attendance.cancle', 'attendance.confirm',
    'attendance.delete_alert'
  ]).subscribe((res) => {
        this.translateTexts = res;
      })
  }



}
