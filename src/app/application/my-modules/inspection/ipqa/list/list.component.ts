import { ExceptionDetailComponent } from './../exception-detail/exception-detail.component';
import { IpqaModel } from './../shared/model/ipqa';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

@IonicPage()
@Component({
    selector: 'sg-list',
    templateUrl: 'list.component.html'
})
export class ListComponent implements OnInit {
    constructor(
        private navCtrl: NavController,
        private navParams: NavParams
    ) { }

    fromPage: string; //记录从哪个页面进来 
    formData: IpqaModel[] = [{
        checkDate: '2017-09-01',
        checkPerson: 'FE717,何錦枝,jinzhi.he',
        banbie: '白班',
        address: 'S6-1F -- 外觀檢驗檢測',
        checklist_cn: '產品放置是否不超出棧板,成品產品使用木棧板是否有熱處理標記.',
        exceptionDesc: '有雜物，放置超過線框規定位置',
        pictures: '',
        handler: '',
        actionDesc: '',
        actionStatus: '',
        actionPictures: '',
        actionDate: ''
    },
    {
        checkDate: '2017-09-02',
        checkPerson: 'FE717,何錦枝,jinzhi.he',
        banbie: '白班',
        address: 'S6-1F -- BGA',
        checklist_cn: '确認光線是否充足大於且是否定時量測大於1000LUX.如有客戶特殊要求就按客戶要求執行.',
        exceptionDesc: '光线太暗',
        pictures: '',
        handler: '',
        actionDesc: '',
        actionStatus: '',
        actionPictures: '',
        actionDate: ''
    }];

    ngOnInit() {
        this.fromPage = this.navParams.get('fromPage');
    }

    goToExceptionPage(formData: IpqaModel) {
        if (this.fromPage === 'teamLeader') {
            this.navCtrl.push('ExceptionDetailComponent', { fromPage: this.fromPage, formData: formData });
        }
    }
}