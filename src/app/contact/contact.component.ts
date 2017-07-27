import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';

import { EnvConfig } from '../shared/config/env.config';
import { ContactService } from './shared/service/contact.service';
import { SearchResultComponent } from './search-result/search-result.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { OrganizationComponent } from './organization/organization.component';
import { LanguageConfig } from './shared/config/language.config';


@Component({
  selector: 'sg-contact',
  templateUrl: 'contact.component.html'
})
export class ContactComponent {

  languageType: string = localStorage.getItem('languageType');
  languageContent = LanguageConfig.contactComponent[this.languageType];
  contacter: any[] = [];
  searchFilter: string; // 记录搜索条件
  searchResult: any[] = []; // 保存通过searchbar搜索后返回的结果
  placeholder: string;
  constructor(
    public navCtrl: NavController,
    public contactService: ContactService,
  ) {
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
  }

  goToSearchDetail(type: string) {
    this.navCtrl.push(SearchResultComponent, { type: type });
  }

  goToDetailPage(event: any) {
    this.navCtrl.push(ContactDetailComponent, { data: event });
    this.contactService.writeViewHistory(event);
  }

  goToOrganizationPage() {
    this.navCtrl.push(OrganizationComponent);
  }
}
