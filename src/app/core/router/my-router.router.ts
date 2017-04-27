
import { NavController, App } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { BookLibraryComponent } from '../../application/my-modules/book-library/book-library.component';
import { AttendanceComponent } from '../../application/my-modules/attendance/attendance.component'


export class MyRouter {
  constructor(private iab: InAppBrowser) { }

  public go(navCtrl: NavController, id: number, app: App): void {
    switch (id) {

      case 1:
        // app.getRootNav().setRoot(BookLibraryComponent);
        navCtrl.push(BookLibraryComponent);
        break;
      case 21:
        // app.getRootNav().setRoot(AttendanceComponent);
        navCtrl.push(AttendanceComponent);
        break;
      case 22:
        // const browser = this.iab.create('http://oaweb.mic.com.tw/gsc/mobile/');
        const browser = this.iab.create('http://10.86.0.18:8080/default.aspx?username=jinzhi.he&password=Mitac123');
      default:
        break;
    }

  }

}
