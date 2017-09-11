import { Component, OnInit } from '@angular/core';
import { NavController, App } from 'ionic-angular';

import { ApplicationItem } from '../shared/models/application-item.model';
import { ApplicationService } from './shared/service/application.service';
import { MoreApplicationComponent } from './more-application/more-application.component';
import { MyRouter } from '../core/router/my-router.router';
import { AttendanceComponent } from './my-modules/attendance/attendance.component';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LanguageConfig } from './shared/config/language.config';

@Component({
  selector: 'sg-application',
  templateUrl: 'application.component.html'
})
export class ApplicationComponent implements OnInit {


  constructor(
    public navCtrl: NavController,
    private appService: ApplicationService,
    private iab: InAppBrowser,
    public app: App) {
  }

  items: ApplicationItem[]; // 不分类的所有数据
  itemsByGroup: ApplicationItem[][] = []; //按group分组
  showBtn: boolean = false; // 控制是否显示右上角的减号
  router: MyRouter = new MyRouter(this.iab);

  ngOnInit() { }

  refreshData(): void {
    let moduleList = JSON.parse(localStorage.getItem('moduleList'));
    this.items = moduleList.filter((value: any) => {
      return value.DISPLAY === 'Y';
    });
    this.itemsByGroup = this.selectItems(this.items);
  }

  ionViewWillEnter() {
    this.refreshData();
  }

  showEditBtn(): void {
    this.showBtn = true;
  }

  hideEditBtn(): void {
    this.showBtn = false;
  }

  goToMorePage(): void {
    this.navCtrl.push(MoreApplicationComponent);
  }

  goToDetailPage(id: number) {
    this.router.go(this.navCtrl, id, this.app);
  }

  // 作用：用于把一维数组的数据按group分成二维数组存储
  selectItems(data: ApplicationItem[]): ApplicationItem[][] {
    let temp: ApplicationItem[][] = [];
    let groupTypes: string[] = [];
    for (let i = 0; i < data.length; i++) {
      if ((groupTypes.indexOf(data[i].GROUP_NAME) === -1)) {
        groupTypes.push(data[i].GROUP_NAME);
      }
    }

    // 数组初始化
    for (let i = 0; i < groupTypes.length; i++) {
      temp[i] = [];
    }

    for (let i = 0; i < groupTypes.length; i++) {
      for (let j = 0; j < data.length; j++) {
        if (data[j].GROUP_NAME === groupTypes[i]) {
          temp[i].push(data[j]);
        }
      }
    }

    return temp;
  }

  removeItemById(id: number): void {
    for (let i = 0; i < this.itemsByGroup.length; i++) {

      // 判断这个group是否只有一个值，当只有一个值且id等于要删除的元素的id时，把整个group删除
      if (this.itemsByGroup[i].length === 1 && this.itemsByGroup[i][0].MODULE_ID === id) {
        this.itemsByGroup.splice(i, 1);
        // 把id传递出去，后端把这个id的item.DISPLAY更新为false
        // this.dataService.moveAppToMorePage(id);
        this.appService.moveAppToMorePage(id);
        this.updateLocalModuleList(id);
      }
      // else代表group的个数大于等于2个，只需要把要删除的元素清除就可以
      else {
        for (let j = 0; j < this.itemsByGroup[i].length; j++) {
          if (this.itemsByGroup[i][j].MODULE_ID === id) {
            this.itemsByGroup[i].splice(j, 1);
            // 把id传递出去，后端把这个id的item.DISPLAY更新为false
            // this.dataService.moveAppToMorePage(id);
            this.appService.moveAppToMorePage(id);
            this.updateLocalModuleList(id);
          }
        }
      }
    }
  }

  moveItemToMoreGroup(id: number) {
    this.removeItemById(id);
  }

  updateLocalModuleList(id: number) {
    let list: any[] = JSON.parse(localStorage.getItem('moduleList'));
    for (let i = 0; i < list.length; i++) {
      if (list[i].MODULE_ID === id) {
        list[i].DISPLAY = 'N';
      }
    }
    localStorage.setItem('moduleList', JSON.stringify(list));
  }

  toAttendance() {
    this.navCtrl.push(AttendanceComponent);
  }
}
