import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ContactService } from '../shared/service/contact.service';

@Component({
    selector: 'sg-search-result',
    templateUrl: 'search-result.component.html'
})
export class SearchResultComponent implements OnInit {
    type: string; // 记录时点击哪个按钮进来的
    typeDesc: string; // 类型的中文描述

    personList: any[] = []; // 记录服务器返回的结果
    personListBackup: any[];// 备份初始结果，当searchbar清空后恢复原来的数据
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public contactService: ContactService
    ) { }

    async ngOnInit() {
        this.type = this.navParams.get('type');
        if (this.type === 'sameDept') {
            this.typeDesc = '同部门';
            let originRes = await this.contactService.getSameDeptPerson();
            this.personList = originRes.json();
            this.personList = this.personList.sort((v1, v2) => {
                return v1.NICK_NAME.localeCompare(v2.NICK_NAME, 'zh-Hans-CN');
            });
            this.personListBackup = this.personList;
            this.contactService.setLocalStorage(this.type, this.personList);
        } else if (this.type === 'subordinated') {
            this.typeDesc = '我的下属';
            let originRes = await this.contactService.getSubordinate();
            this.personList = originRes.json();
            this.personListBackup = this.personList;
            this.contactService.setLocalStorage(this.type, this.personList);
        }

    }

    getItems(event: any) {
        let filter = event.target.value;
        if (filter) {
            let localValue: any[] = this.contactService.getLocalStorage(this.type);
            this.personList = localValue.filter((person, index) => {
                let combineString = person.NICK_NAME + person.EMPNO + person.USER_NAME;
                if (combineString.toUpperCase().indexOf(filter.toUpperCase()) >= 0) {
                    return true;
                }
            });
        } else {
            this.personList = this.personListBackup;
        }
    }
}