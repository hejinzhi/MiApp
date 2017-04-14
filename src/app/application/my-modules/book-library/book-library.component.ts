import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, ModalController, MenuController, AlertController, LoadingController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { BookLibraryService } from './shared/service/book-library.service';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { SettingComponent } from './setting/setting.component';

@Component({
    selector: 'sg-book-library',
    templateUrl: 'book-library.component.html'
})
export class BookLibraryComponent implements OnInit {
    constructor(
        public navCtrl: NavController,
        private bookService: BookLibraryService,
        private modalCtrl: ModalController,
        private alertCtrl: AlertController,
        private menuCtrl: MenuController,
        private loadingCtrl: LoadingController,
        private barcodeScanner: BarcodeScanner
    ) { }

    books;
    user;
    @ViewChild('searchbar') mySearchbar;
    @ViewChild('maincontent') mainContent;

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('currentUser'));
    }

    async ionViewWillEnter() {
        // let loading = this.loadingCtrl.create({
        //   content: 'Please wait...'
        // });

        // loading.present();
        // this.bookService.getAllBooks().then((res) => {
        //   this.books = res.json().data;
        //   // loading.dismiss();
        // });
        let res = await this.bookService.getAllBooks();
        this.books = res.json();
        if (!(localStorage.getItem('scanFlag'))) {
            localStorage.setItem('scanFlag', 'true');
            localStorage.setItem('batchAddBooks', 'true');
        }
    }

    openMenu() {
        this.menuCtrl.toggle();
    }

    exit() {
        this.menuCtrl.close().then(() => {
            this.navCtrl.pop();
        });
    }

    goToDetailPage(book) {
        this.navCtrl.push(BookDetailComponent, { book: book });
    }

    showSettingModal() {
        let settingPage = this.modalCtrl.create(SettingComponent);
        settingPage.present();
    }


    async addBooks() {
        // let book = await this.bookService.scanAndGetBookInfo();
        // if (book) {
        //     this.navCtrl.push(BookDetailComponent, { book: book, type: 'addBook' });
        //     this.menuCtrl.close();
        // }
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
                this.navCtrl.push(BookDetailComponent, { book: book, type: 'addBook' });
                this.menuCtrl.close();
            }
        } else {
            this.showError('你所扫描的并不是有效的ISBN码');
        }
    }

    showError(msg) {
        let confirm = this.alertCtrl.create({
            title: '错误',
            subTitle: msg,
            buttons: ['OK']
        });
        confirm.present();
    }


    // 借书申请
    borrowRequest() {

    }

    // 还书申请
    payBackRequest() {
    }

    // 查询图书
    queryBooks(event) {
        // Observable.of(event.target.value)
        //   .debounceTime(500)
        //   .distinctUntilChanged()
        //   .subscribe((res) => {
        //     console.log(res);
        //   });
    }


    // for test
    async  addBook() {
        // this.bookService.addBook();

        // let a = await this.bookService.getBookInfoFromDouban('9787302386414');
        // console.log(a);
    }



}