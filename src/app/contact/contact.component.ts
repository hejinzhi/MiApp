import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContactService } from './shared/service/contact.service';
import { SearchResultComponent } from './search-result/search-result.component';

@Component({
  selector: 'sg-contact',
  templateUrl: 'contact.component.html'
})
export class ContactComponent {

  contacter: any[] = [];
  searchFilter: string; // 记录搜索条件
  constructor(
    public navCtrl: NavController,
    public contactService: ContactService
  ) {
    this.contacter = [{
      name: '锦枝',
      full_name: '何锦枝',
      company: 'jinzhi.he',
      position: '工程师',
      department: '电子商务部'
    },
    {
      name: '铭辉',
      full_name: '梁铭辉',
      company: 'hugh.liang',
      position: '工程师',
      department: '电子商务部'
    }];
  }

  test() {
    this.contactService.getDeptInfo('MSL').then((res) => {
      console.log(res);
    })
  }

  // 取得searchbar的值
  getItems(event: any) {
    this.searchFilter = event.target.value;
  }

  goToSearchDetail(type: string) {
    this.navCtrl.push(SearchResultComponent, { type: type });
  }
}
