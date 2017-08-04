import { Component, OnInit } from '@angular/core';
import { NavParams, IonicPage } from 'ionic-angular';
import { LanguageConfig } from '../shared/config/language.config';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
    selector: 'sg-borrowed-list',
    templateUrl: 'borrowed-list.component.html'
})
export class BorrowedListComponent implements OnInit {
    constructor(
        public navParams: NavParams,
        public translate: TranslateService
    ) {

    }
    languageType: string = localStorage.getItem('languageType')
    languageContent = LanguageConfig.borrowListComponent[this.languageType];
    title: string;
    books: any[]; // 接收传递过来的书籍信息
    type: string;   // 判断是“已预约图书”还是“已借图书”转跳过来的
    showPayBackDate: boolean = false; // 判断是否显示“应归还时间”栏位
    showActualBackDate: boolean = false; // 判断是否显示“实际归还时间”栏位
    ngOnInit() {
        this.books = this.navParams.get('books');
        this.type = this.navParams.get('type');
        if (this.type === 'book') {
            // this.title = this.languageContent.booked;
            this.translate.get('bookLibrary.booked').subscribe((title) => {
                this.title = title;
            });
            this.showPayBackDate = false;
            this.showActualBackDate = false;
        }
        else if (this.type === 'borrow') {
            // this.title = this.languageContent.borrowed;
            this.translate.get('bookLibrary.borrowed').subscribe((title) => {
                this.title = title;
            });
            this.showPayBackDate = true;
            this.showActualBackDate = false;
        }
        else if (this.type === 'payback') {
            // this.title = this.languageContent.payback;
            this.translate.get('bookLibrary.paybacked').subscribe((title) => {
                this.title = title;
            });
            this.showPayBackDate = false;
            this.showActualBackDate = true;
        }
    }



    confirmBorrowBook() { }
}