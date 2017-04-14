import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { BookLibraryService } from '../shared/service/book-library.service';
// import { BookLibraryComponent } from '../book-library.component';

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

    book;
    type; // 记录是否由“添加图书”转跳进来的
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

    getAddQty(qty) {
        this.book.QTY = qty;
    }

    showError(msg) {
        let confirm = this.alertCtrl.create({
            title: '错误',
            subTitle: msg,
            buttons: ['OK']
        });
        confirm.present();
    }

    showInfo(msg) {
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
                // this.book = await this.bookService.scanAndGetBookInfo();
                let scanRes = await this.bookService.scan();
                if (scanRes.cancelled) {
                    // return;
                    // this.navCtrl.setPages([{ page: BookLibraryComponent }]);
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




}