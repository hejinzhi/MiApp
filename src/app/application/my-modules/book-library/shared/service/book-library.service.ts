import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { EnvConfig } from '../../../../../shared/config/env.config';
import { BookLibraryConfig } from '../config/book-library.config';
import { MyHttpService } from '../../../../../core/services/myHttp.service';
import { LanguageConfig } from '../config/language.config';
import { Http } from '@angular/http';
import { TranslateService } from '@ngx-translate/core';

export class TranslateMode {
    error: string;
    errorMsg1: string;
    errorMsg2: string;
    errorMsg3: string;
    errorMsg4: string;
    successMsg1: string;
    successMsg2: string;
    borrowPromptTitle: string;
    borrowPromptContent: string;
    paybackPromptTitle: string;
    paybackPromptContent: string;
    cancel: string;
    confirm: string;
}

@Injectable()
export class BookLibraryService {

    translateTexts: TranslateMode = new TranslateMode(); // 记录转换后的文本(简繁体)
    constructor(
        private myHttp: MyHttpService,
        private barcodeScanner: BarcodeScanner,
        private alertCtrl: AlertController,
        private http: Http,
        private translate: TranslateService
    ) {
        this.translateLanguage();
    }


    async translateLanguage() {

        await this.setLanguage();

        this.translate.onLangChange.subscribe(async () => {
            await this.setLanguage();
        })
    }

    async setLanguage() {
        let res = await this.translate.get(['bookLibrary.error', 'bookLibrary.errorMsg1', 'bookLibrary.errorMsg2', 'bookLibrary.errorMsg3',
            'bookLibrary.errorMsg4', 'bookLibrary.successMsg1', 'bookLibrary.successMsg2', 'bookLibrary.borrowPromptTitle',
            'bookLibrary.borrowPromptContent', 'bookLibrary.paybackPromptTitle', 'bookLibrary.paybackPromptContent'
            , 'bookLibrary.cancel', 'bookLibrary.confirm']).toPromise();
        this.translateTexts.error = res['bookLibrary.error'];
        this.translateTexts.errorMsg1 = res['bookLibrary.errorMsg1'];
        this.translateTexts.errorMsg2 = res['bookLibrary.errorMsg2'];
        this.translateTexts.errorMsg3 = res['bookLibrary.errorMsg3'];
        this.translateTexts.errorMsg4 = res['bookLibrary.errorMsg4'];
        this.translateTexts.successMsg1 = res['bookLibrary.successMsg1'];
        this.translateTexts.successMsg2 = res['bookLibrary.successMsg2'];
        this.translateTexts.borrowPromptTitle = res['bookLibrary.borrowPromptTitle'];
        this.translateTexts.borrowPromptContent = res['bookLibrary.borrowPromptContent'];
        this.translateTexts.paybackPromptTitle = res['bookLibrary.paybackPromptTitle'];
        this.translateTexts.paybackPromptContent = res['bookLibrary.paybackPromptContent'];
        this.translateTexts.cancel = res['bookLibrary.cancel'];
        this.translateTexts.confirm = res['bookLibrary.confirm'];
    }




    getAllBooks() {
        return this.myHttp.get(BookLibraryConfig.getBooksUrl + '?companyID=' + EnvConfig.companyID);
    }

    // 从豆瓣获取图书信息
    getBookInfoFromDouban(isbn13: string) {
        return this.http.get(BookLibraryConfig.doubanUrl + isbn13).toPromise();
    }

    // 从豆瓣模糊查询图书信息
    getBooksFromDoubanByName(name: string) {
        return this.myHttp.get(BookLibraryConfig.doubanByName + name);
    }

    // 预约图书
    borrowBook(isbn13: string) {
        return this.myHttp.post(BookLibraryConfig.borrowBookUrl, { ISBN13: isbn13 });
    }

    // 调用摄像头扫描
    scan() {
        return this.barcodeScanner.scan({ resultDisplayDuration: 0, showFlipCameraButton: true, showTorchButton: true });
    }

    // 把豆瓣上的book对象转换成大写的book对象
    transformBookInfo(book: any) {
        let newBookObj = {
            AUTHOR: book.author.join(),
            AUTHOR_INFO: book.author_intro,
            BINDING: book.binding,
            IMAGE: book.image,
            ISBN13: book.isbn13,
            PAGES: book.pages,
            PRICE: book.price,
            PUBDATE: book.pubdate,
            PUBLISHER: book.publisher,
            SUBTITLE: book.subtitle,
            SUMMARY: book.summary,
            TITLE: book.title,
            CATALOG: book.catalog,
            ENABLED: 'Y',
            QTY: book.qty | 1
        }
        return newBookObj;
    }

    showError(msg: string) {
        let confirm = this.alertCtrl.create({
            title: this.translateTexts.error,
            subTitle: msg,
            buttons: ['OK']
        });
        confirm.present();
    }

    // 新增图书
    addBook(book: any) {
        return this.myHttp.post(BookLibraryConfig.addBookUrl, book);
    }

    // 根据书名模糊查询
    getBooksByTitle(title: string) {
        return this.myHttp.get(BookLibraryConfig.getBooksByTitleUrl + '?title=' + title);
    }

    // 分页查询书籍信息
    getBooksByPage(page: number, count: number) {
        return this.myHttp.get(BookLibraryConfig.getBooksByPage + `?pageIndex=${page}&pageSize=${count}`)
    }

    // 获取已预约图书信息
    getOrderBooks(username?: string) {
        if (username) {
            return this.myHttp.get(BookLibraryConfig.getOrderBooksByUser + `?userName=${username}`);
        } else {
            return this.myHttp.get(BookLibraryConfig.getOrderBooksByUser + '?userName=');
        }

    }

    // 获取已借阅的图书信息
    getBorrowedBooks(username?: string) {
        if (username) {
            return this.myHttp.get(BookLibraryConfig.getBorrowedBooks + `?userName=${username}`);
        } else {
            return this.myHttp.get(BookLibraryConfig.getBorrowedBooks + '?userName=');
        }

    }

    // 获取指定图书的详细信息
    getBookDetailInfo(id: number) {
        return this.myHttp.get(BookLibraryConfig.getBookDetailInfo + '?id=' + id);
    }

    // 获取已归还图书信息
    getPaybackBooks(username?: string) {
        if (username) {
            return this.myHttp.get(BookLibraryConfig.getPaybackBooks + `?userName=${username}`);
        } else {
            return this.myHttp.get(BookLibraryConfig.getPaybackBooks + '?userName=');
        }

    }

    // 管理员同意借书
    approveBorrowBooks(ids: number[]) {
        return this.myHttp.post(BookLibraryConfig.approveBorrowBooks, { borrowID: ids });
    }

    // 管理员还书
    payback(ids: number[]) {
        return this.myHttp.post(BookLibraryConfig.paybackUrl, { borrowID: ids });
    }

    // 续借
    renewBooks(ids: number[]) {
        return this.myHttp.post(BookLibraryConfig.renewBooksUrl, { borrowID: ids });
    }

    // 取消预约
    cancelBook(ids: number[]) {
        return this.myHttp.post(BookLibraryConfig.cancelBookUrl, { borrowID: ids });
    }

    // 获取权限
    getPrivilege(moduleID: number) {
        return this.myHttp.get(BookLibraryConfig.getPrivilegeUrl + `?moduleID=${moduleID}`);
    }
}

