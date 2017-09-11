import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';

import { ContactService } from '../shared/service/contact.service';
import { ContactDetailComponent } from '../contact-detail/contact-detail.component';
import { ContactConfig } from '../shared/config/contact.config';
import { EnvConfig } from '../../shared/config/env.config.ts';
import { LanguageConfig } from '../shared/config/language.config';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'sg-search-result',
    templateUrl: 'search-result.component.html'
})
export class SearchResultComponent implements OnInit {
    type: string; // 记录时点击哪个按钮进来的
    typeDesc: string; // 类型的中文描述
    personList: any[] = []; // 记录服务器返回的结果
    personListBackup: any[];// 备份初始结果，当searchbar清空后恢复原来的数据
    pageIndex: number = 1; // 记录当前的页码
    lastPageReached: boolean = false; // 记录是否已经到达最后一页
    filter: string;  // 记录searchbar的值

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public contactService: ContactService,
        public translate: TranslateService
    ) {

    }

    async ngOnInit() {
        this.type = this.navParams.get('type');
        if (this.type === 'sameDept') {
            // this.typeDesc = '同部门';
            this.translate.get('sameDept').subscribe((res) => {
                this.typeDesc = res;
            });
            let originRes = await this.contactService.getSameDeptPerson();
            this.formatAndSaveData(originRes.json());
        } else if (this.type === 'subordinated') {
            // this.typeDesc = '我的下属';
            this.translate.get('subordinated').subscribe((res) => {
                this.typeDesc = res;
            });
            let originRes = await this.contactService.getSubordinate();
            this.formatAndSaveData(originRes.json());
        } else if (this.type === 'all') {
            // this.typeDesc = '所有人';
            this.translate.get('all').subscribe((res) => {
                this.typeDesc = res;
            });
            let originRes = await this.contactService.getAllPersonByPage(EnvConfig.companyID, 1, ContactConfig.pageSize);
            this.formatAndSaveData(originRes.json());
        }

    }

    formatAndSaveData(obj: any) {
        // let result = obj.sort((v1: any, v2: any) => {
        //     return v1.NICK_NAME.localeCompare(v2.NICK_NAME, 'zh-Hans-CN');
        // });
        // this.personList = result;
        this.personList = obj;
        this.personListBackup = this.personList;
        this.contactService.setLocalStorage(this.type, this.personList);
    }

    getItems(event: any) {
        this.filter = event.target.value;
        if (this.type === 'all') {
            if (this.filter) {
                Observable.of(this.filter)
                    .debounceTime(500)
                    .distinctUntilChanged()
                    .switchMap((res) => {
                        return this.contactService.getPersonByName(res, EnvConfig.companyID);
                    }).subscribe((data) => {
                        this.personList = data.json();
                    });
            } else {
                this.personList = this.personListBackup;
            }

        }
        else {
            Observable.of(this.filter)
                .debounceTime(500)
                .distinctUntilChanged()
                .subscribe((filter) => {
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
                });
        }
    }

    goToDetailPage(event: any) {
        this.navCtrl.push(ContactDetailComponent, { data: event });
        this.contactService.writeViewHistory(event);
    }

    // 下拉加载数据
    async doInfinite(infiniteScroll: any) {

        this.pageIndex++;
        let res = await this.contactService.getAllPersonByPage(EnvConfig.companyID, this.pageIndex, ContactConfig.pageSize);
        let nextPagePersons: any[] = res.json();
        let personAfterConcat = this.personList.concat(nextPagePersons);
        this.formatAndSaveData(personAfterConcat);
        if (nextPagePersons.length < ContactConfig.pageSize) {
            this.lastPageReached = true;
        }
        infiniteScroll.complete();


    }

    isLastPageReached(): boolean {
        return this.lastPageReached;
    }
}