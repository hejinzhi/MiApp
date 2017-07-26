import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, ModalController, MenuController, AlertController, LoadingController, App, IonicPage, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Observable } from 'rxjs/Rx';

import { BookLibraryService } from './shared/service/book-library.service';
import { BookLibraryConfig } from './shared/config/book-library.config';
import { LanguageConfig } from './shared/config/language.config';


@IonicPage()
@Component({
    selector: 'sg-book-library',
    templateUrl: 'book-library.component.html'
})
export class BookLibraryComponent implements OnInit {
    constructor(
        public navCtrl: NavController,
        private navParams: NavParams,
        private bookService: BookLibraryService,
        private modalCtrl: ModalController,
        private alertCtrl: AlertController,
        private menuCtrl: MenuController,
        private loadingCtrl: LoadingController,
        private barcodeScanner: BarcodeScanner,
        private app: App
    ) { }

    languageType: string = localStorage.getItem('languageType');
    languageContent = LanguageConfig.bookLibraryComponent[this.languageType];
    books: any[];
    user: any;
    firstIn: boolean = true; // 记录是否第一次打开这个页面，如果是，则显示loading提示框，否则不显示
    pageIndex: number = 1; // 记录当前的页码
    lastPageReached: boolean = false; // 记录是否已经到达最后一页

    @ViewChild('bookInput') bookInput: any;
    @ViewChild('booklist') bookList: any;

    scroll: any;
    moduleID: number; // 记录当前module的ID
    privilege: string = 'common'; // 记录是什么权限,默认是一般用户 common   管理员:super

    async ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        // 进行权限判断
        this.moduleID = this.navParams.get('moduleID');
        let res = await this.bookService.getPrivilege(this.moduleID);
        let resObj = res.json();
        if (resObj.USER_ROLE.length > 0) {
            for (let i = 0; i < resObj.USER_ROLE.length; i++) {
                if (resObj.USER_ROLE[i].ROLE_NAME === 'BOOKLIBRARY_ADMIN') {
                    this.privilege = 'super';
                    break;
                }
            }
        }
    }


    async scrollAddData() {
        this.pageIndex++;
        let res = await this.bookService.getBooksByPage(this.pageIndex, BookLibraryConfig.pageCount);
        let nextPageBooks: any[] = res.json();
        nextPageBooks.forEach((book) => {
            this.books.push(book);
        })
        if (nextPageBooks.length < BookLibraryConfig.pageCount) {
            this.lastPageReached = true;
        }
    }


    async ionViewWillEnter() {

        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        if (this.firstIn) {
            loading.present();
            this.firstIn = false;
        }
        let res;
        if (this.bookInput.value) {
            res = await this.bookService.getBooksByTitle(this.bookInput.value);
        } else {
            let count = this.pageIndex * BookLibraryConfig.pageCount;
            res = await this.bookService.getBooksByPage(1, count);
        }

        this.books = res.json();
        loading.dismiss();
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

    // 转跳到明细页面
    async goToDetailPage(book: any) {
        let res = await this.bookService.getBookDetailInfo(book.ID);
        this.navCtrl.push('BookDetailComponent', { book: res.json() });
    }

    showSettingModal() {
        let settingPage = this.modalCtrl.create('SettingComponent');
        settingPage.present();
    }

    // 添加图书
    async addBooks() {
        let scanRes = await this.bookService.scan();
        if (scanRes.cancelled) {
            return;
        }
        if (!scanRes.cancelled && scanRes.text.length === 13) {
            let doubanRes = await this.bookService.getBookInfoFromDouban(scanRes.text);
            if (doubanRes.json().code === 6000) {
                this.showError(this.languageContent.errorMsg1);
            } else {
                let book = this.bookService.transformBookInfo(doubanRes.json());
                this.navCtrl.push('BookDetailComponent', { book: book, type: 'addBook' });
                this.menuCtrl.close();
            }
        } else {
            this.showError(this.languageContent.errorMsg2);
        }
    }

    showError(msg: string) {
        let confirm = this.alertCtrl.create({
            title: this.languageContent.error,
            subTitle: msg,
            buttons: ['OK']
        });
        confirm.present();
    }

    // 下拉加载数据
    async doInfinite(infiniteScroll: any) {
        this.pageIndex++;
        let res = await this.bookService.getBooksByPage(this.pageIndex, BookLibraryConfig.pageCount);
        let nextPageBooks: any[] = res.json();
        nextPageBooks.forEach((book) => {
            this.books.push(book);
        })
        if (nextPageBooks.length < BookLibraryConfig.pageCount) {
            this.lastPageReached = true;
        }
        infiniteScroll.complete();
    }

    isLastPageReached(): boolean {
        return this.lastPageReached;
    }

    // 查询图书
    queryBooks(event: any) {
        let value = event.target.value;
        Observable.of(event.target.value)
            .debounceTime(500)
            .distinctUntilChanged()
            .switchMap((res) => {
                if (res) {
                    this.pageIndex = 1;
                    this.lastPageReached = true;
                    this.bookList.nativeElement.scrollTop = 0;
                    return this.bookService.getBooksByTitle(res);
                }
                else {
                    this.pageIndex = 1;
                    this.lastPageReached = false;
                    this.bookList.nativeElement.scrollTop = 0;
                    return this.bookService.getBooksByPage(1, BookLibraryConfig.pageCount);
                }

            })
            .subscribe((resBooks) => {
                this.books = resBooks.json();
            });
    }


    // 已预约的图书
    async getOrderBooksInfo() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let res = await this.bookService.getOrderBooks(currentUser.username);
        let books = res.json();
        await this.menuCtrl.close();
        this.navCtrl.push('BorrowRequestComponent', { books: books, type: 'cancelbook' });

    }

    // 已借阅的图书
    async getBorrowedBooks() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let res = await this.bookService.getBorrowedBooks(currentUser.username);
        let books = res.json();
        await this.menuCtrl.close();
        this.navCtrl.push('BorrowedListComponent', { books: books, type: 'borrow' });
    }

    // 已归还的图书
    async getPaybackBooks() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let res = await this.bookService.getPaybackBooks(currentUser.username);
        let books = res.json();
        await this.menuCtrl.close();
        this.navCtrl.push('BorrowedListComponent', { books: books, type: 'payback' });
    }

    // 借书申请
    borrowRequest() {
        this.prompt(this.languageContent.borrowPromptTitle, this.languageContent.borrowPromptContent).then(async (username: string) => {
            let res;
            if (username) {
                res = await this.bookService.getOrderBooks(username.toLowerCase());
            } else {
                res = await this.bookService.getOrderBooks();
            }
            let books = res.json();
            await this.menuCtrl.close();
            this.navCtrl.push('BorrowRequestComponent', { books: books, type: 'borrow' });

        }).catch((err) => {
            console.log(err);
        });
    }



    // 还书申请
    payBackRequest() {
        this.prompt(this.languageContent.paybackPromptTitle, this.languageContent.paybackPromptContent).then(async (username: string) => {
            let res;
            if (username) {
                res = await this.bookService.getBorrowedBooks(username.toLowerCase());
            } else {
                res = await this.bookService.getBorrowedBooks();
            }
            let books = res.json();
            await this.menuCtrl.close();
            this.navCtrl.push('BorrowRequestComponent', { books: books, type: 'payback' });

        }).catch((err) => {
            console.log(err);
        });
    }



    prompt(title: string, message: string) {
        return new Promise((resolve, reject) => {
            let alert = this.alertCtrl.create({
                title: title,//'借书申请',
                message: message,//'请输入要借书人的AD',
                inputs: [
                    {
                        name: 'username',
                        placeholder: 'Username'
                    }
                ],
                buttons: [
                    {
                        text: this.languageContent.cancel,
                        handler: (data: any) => {
                            console.log('Cancel clicked');
                            reject();
                        }
                    },
                    {
                        text: this.languageContent.confirm,
                        handler: (data: any) => {
                            resolve(data.username);
                        }
                    }
                ]
            });
            alert.present();
        });

    }


    // for test
    async  addBook() {

        // let isbn13Array = ['9781449398583'
        // ];
        // for (let i = 0; i < isbn13Array.length; i++) {
        //     let doubanRes = await this.bookService.getBookInfoFromDouban(isbn13Array[i]);
        //     let book = this.bookService.transformBookInfo(doubanRes.json());
        //     await this.bookService.addBook(book);
        //     console.log(`insert ${isbn13Array[i]} success`);
        // }


        // let myArray: string[] = [
        //     'node', 'angular', 'html', 'oracle', 'css', 'apex', '艺术', '体育', '篮球', '足球',
        //     '排球', 'JAVA', 'WEB', 'windows', 'novell', 'unix', '硬体', 'offic', '管理', '数据库',
        //     'MYSQL', 'MONGO', 'VUE', '经济', '投资', '金钱', 'apex', '会计', '文员', '工程师'];

        // for (let i = 0; i < myArray.length; i++) {
        //     let result = await this.bookService.getBooksFromDoubanByName(myArray[i]);
        //     let bookArray = result.json().books;
        //     for (let j = 0; j < bookArray.length; j++) {
        //         let book = this.bookService.transformBookInfo(bookArray[i]);
        //         await this.bookService.addBook(book);
        //     }
        // }

        let myArray: string[] = [
            'node', 'angular', 'html', 'oracle', 'css', 'apex', '艺术', '体育', '篮球', '足球',
            '排球', 'JAVA', 'WEB', 'windows', 'novell', 'unix', '硬体', 'offic', '管理', '数据库',
            '企业', 'MONGO', 'VUE', '经济', '投资', '金钱', 'apex', '会计', '文员', '工程师'];

        for (let i = 0; i < myArray.length; i++) {
            let result = await this.bookService.getBooksFromDoubanByName(myArray[i]);
            let bookArray = result.json().books;
            for (let j = 0; j < bookArray.length; j++) {
                let book = this.bookService.transformBookInfo(bookArray[j]);
                try {
                    await this.bookService.addBook(book);
                }
                catch (err) {
                    console.log(book.ISBN13);
                }
            }
        }
    }
}