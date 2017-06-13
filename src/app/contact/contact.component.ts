import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';

import { EnvConfig } from '../shared/config/env.config';
import { ContactService } from './shared/service/contact.service';
import { SearchResultComponent } from './search-result/search-result.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';


@Component({
  selector: 'sg-contact',
  templateUrl: 'contact.component.html'
})
export class ContactComponent {

  contacter: any[] = [];
  searchFilter: string; // 记录搜索条件
  searchResult: any[] = []; // 保存通过searchbar搜索后返回的结果
  constructor(
    public navCtrl: NavController,
    public contactService: ContactService
  ) {
    // this.contacter = [{
    //   NICK_NAME: '何锦枝',
    //   USER_NAME: 'jinzhi.he',
    //   JOB_TITLE: '工程师',
    //   DEPT_NAME: '电子商务部'
    // },
    // {
    //   NICK_NAME: '梁铭辉',
    //   USER_NAME: 'hugh.liang',
    //   JOB_TITLE: '工程师',
    //   DEPT_NAME: '电子商务部'
    // }];
  }

  ionViewWillEnter() {
    this.contacter = this.contactService.getLocalStorage('viewHistory');
  }



  // 取得searchbar的值
  async getItems(event: any) {
    this.searchFilter = event.target.value;
    Observable.of(this.searchFilter)
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap((res) => {
        if (res) {
          return this.contactService.getPersonByName(this.searchFilter, EnvConfig.companyID);
        } else {
          return [];
        }

      })
      .subscribe((persons) => {
        this.searchResult = persons.json();
      });

    // if (this.searchFilter) {
    //   let result = await this.contactService.getPersonByName(this.searchFilter)
    //   this.searchResult = result.json();
    // }

  }

  goToSearchDetail(type: string) {
    this.navCtrl.push(SearchResultComponent, { type: type });
  }

  goToDetailPage(event: any) {
    this.navCtrl.push(ContactDetailComponent, { data: event });
    this.contactService.writeViewHistory(event);
  }
}
