import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { EnvConfig } from '../../../../../shared/config/env.config';
import { BookLibraryConfig } from '../config/book-library.config';
import { MyHttpService } from '../../../../../core/services/myHttp.service';


@Injectable()
export class BookLibraryService {

    constructor(
        private myHttp: MyHttpService,
        private barcodeScanner: BarcodeScanner,
        private alertCtrl: AlertController,
    ) { }

    getAllBooks() {
        return this.myHttp.get(BookLibraryConfig.getBooksUrl + '?companyID=' + EnvConfig.companyID);
        // return new Promise((resolve, reject) => {
        //     resolve(this.mockBookList);
        // });
    }

    // 从豆瓣获取图书信息
    getBookInfoFromDouban(isbn13: string) {
        // return this.myHttp.originGet('https://api.douban.com/v2/book/isbn/' + isbn13);
        return this.myHttp.get(BookLibraryConfig.doubanUrl + isbn13);
    }

    // 预约图书
    borrowBook(isbn13: string) {
        return this.myHttp.post(BookLibraryConfig.borrowBookUrl, { ISBN13: isbn13 });
    }



    // 调用摄像头扫描二维码后从豆瓣获取图书信息，返回图书信息
    // async scanAndGetBookInfo() {
    //     let scanRes= await this.barcodeScanner.scan({ resultDisplayDuration: 0, showFlipCameraButton: true, showTorchButton: true });

    //     if (scanRes.cancelled) {
    //         return Promise.reject('camera cancel');
    //     }
    //     else if (scanRes.text.length === 13) {
    //         try {
    //             return  this.getBookInfoFromDouban(scanRes.text);
    //             // let newBookObj = this.transformBookInfo(book.json());
    //             // return newBookObj;
    //         }
    //         catch (err) {
    //             // this.showError('豆瓣上找不到该书籍的信息，请人工输入.');
    //             // return {};
    //             return Promise.reject('豆瓣上找不到该书籍的信息，请人工输入.');
    //         }
    //     } else if (scanRes.text.length > 0) {
    //         // this.showError('你所扫描的并不是有效的ISBN码');
    //         // return {};
    //         return Promise.reject('你所扫描的并不是有效的ISBN码');
    //     }
    // }

    // 调用摄像头扫描
    scan() {
        return this.barcodeScanner.scan({ resultDisplayDuration: 0, showFlipCameraButton: true, showTorchButton: true });
    }

    // 把豆瓣上的book对象转换成大写的book对象
    transformBookInfo(book: any) {
        let newBookObj = {
            AUTHOR: book.author.join(),
            AUTHOR_INFO: book.author_info,
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
            title: '错误',
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


}