import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, IonicPage } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { BookLibraryService } from '../shared/service/book-library.service';
import { LanguageConfig } from '../shared/config/language.config';

@IonicPage()
@Component({
    selector: 'sg-book-detail',
    templateUrl: 'book-detail.component.html'
})
export class BookDetailComponent implements OnInit {
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private alertCtrl: AlertController,
        private barcodeScanner: BarcodeScanner,
        private bookService: BookLibraryService
    ) { }

    languageType: string = localStorage.getItem('languageType')
    languageContent = LanguageConfig.bookDetailComponent[this.languageType];
    book: any;
    type: string; // 记录是否由“添加图书”转跳进来的
    showAddBtn: boolean; // 是否显示“录入”按钮
    showBorrowBtn: boolean; //是否显示“借阅”按钮

    ngOnInit() {
        this.book = this.navParams.get('book');
        this.type = this.navParams.get('type');
        if (this.type === 'addBook') {
            this.showAddBtn = true;
            this.showBorrowBtn = false;
        } else {
            if (this.book.QTY > 0) {
                this.showAddBtn = false;
                this.showBorrowBtn = true;
            } else {
                this.showAddBtn = false;
                this.showBorrowBtn = false;
            }

        }
    }

    getAddQty(qty: number) {
        this.book.QTY = qty;
    }

    showError(msg: string) {
        let confirm = this.alertCtrl.create({
            title: '错误',
            subTitle: msg,
            buttons: ['OK']
        });
        confirm.present();
    }

    showInfo(msg: string) {
        let confirm = this.alertCtrl.create({
            subTitle: msg,
            buttons: [
                {
                    text: 'OK',
                    handler: () => {
                        this.navCtrl.pop();
                    }
                }]
        });
        confirm.present();
    }

    async addBook() {
        try {
            await this.bookService.addBook(this.book);
            if (localStorage.getItem('batchAddBooks') === 'true') {
                let scanRes = await this.bookService.scan();
                if (scanRes.cancelled) {
                    return;
                }
                if (!scanRes.cancelled && scanRes.text.length === 13) {
                    let doubanRes = await this.bookService.getBookInfoFromDouban(scanRes.text);
                    if (doubanRes.json().code === 6000) {
                        this.showError('豆瓣上找不到该书籍的信息，请人工输入.');
                    } else {
                        let book = this.bookService.transformBookInfo(doubanRes.json());
                        this.book = book;
                    }
                } else {
                    this.showError('你所扫描的并不是有效的ISBN码');
                }
            } else {
                this.showInfo('录入成功');
            }
        } catch (err) {
            this.showError('添加图书错误');
        }

    }

    async borrowBook(isbn13: string) {
        try {
            await this.bookService.borrowBook(isbn13);
            this.showInfo('预约成功');
        }
        catch (err) {
            this.showError('预约图书失败');
        }
    }




}