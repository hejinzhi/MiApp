import { Component, OnInit, ViewChild } from '@angular/core';
import { NavParams, AlertController } from 'ionic-angular';
import { CheckList } from '../../../../shared/models/check-list.model';
import { ArrayUtilService } from '../../../../core/services/arrayUtil.service';
import { BookLibraryService } from '../shared/service/book-library.service';

@Component({
    selector: 'sg-borrow-request',
    templateUrl: 'borrow-request.component.html'
})

// 借书申请，还书，取消预约共用这一个页面
export class BorrowRequestComponent implements OnInit {
    selectIDs: number[] = []; // 返回的借书人的清单
    books: any[] = []; // 记录后端返回的原始数据
    userListAfterTransform: CheckList[] = []; // 对借书清单进行分组处理，保存处理后的借书清单
    title: string;// 页面title
    type: string; // 记录时哪个页面转跳过来的，borrow代表借书申请 payback 代表还书  cancelbook 代表取消预约
    showBorrow: boolean = false; // 是否借书申请转跳过来的
    showPayback: boolean = false; // 是否还书转跳过来的
    showCancelBook: boolean = false; // 是否取消预约转跳过来的
    constructor(
        public navParams: NavParams,
        private arrayService: ArrayUtilService,
        private bookService: BookLibraryService,
        private alertCtrl: AlertController,
    ) { }

    ngOnInit() {
        this.books = this.navParams.get('books');
        this.type = this.navParams.get('type');
        if (this.type === 'borrow') {
            this.title = '借书申请';
            this.showBorrow = true;
            this.showPayback = false;
            this.showCancelBook = false;
        } else if (this.type === 'payback') {
            this.title = '还书';
            this.showBorrow = false;
            this.showPayback = true;
            this.showCancelBook = false;
        } else if (this.type === 'cancelbook') {
            this.title = '取消预约';
            this.showBorrow = false;
            this.showPayback = false;
            this.showCancelBook = true;
        }
        if (this.books) {
            this.userListAfterTransform = this.transformUserList(this.books);
        }
    }

    transformUserList(books: any[]) {
        let temp: string[] = [];
        books.forEach((value) => {
            temp.push(value.USER_NAME);
        });
        let userList: string[];
        userList = this.arrayService.unique(temp);
        let result: CheckList[] = [];
        for (let i = 0; i < userList.length; i++) {
            let bookList = books.filter((book) => {
                return book.USER_NAME === userList[i];
            });
            result.push({
                USER_NAME: userList[i],
                BOOKS: bookList
            });
        }
        return result;
    }


    async borrowConfirm() {
        try {
            await this.bookService.approveBorrowBooks(this.selectIDs);
            this.showInfo('借阅成功!');
            this.removeItemFromLocalList(this.selectIDs);
            this.userListAfterTransform = this.transformUserList(this.books);
        }
        catch (err) {
            this.showError('借阅失败! ' + err);
        }
    }

    // 取消预约
    cancelBook() { }

    // 确认还书
    async paybackConfirm() {
        try {
            await this.bookService.payback(this.selectIDs);
            this.showInfo('还书成功!');
            this.removeItemFromLocalList(this.selectIDs);
            this.userListAfterTransform = this.transformUserList(this.books);
        }
        catch (err) {
            this.showError('还书失败! ' + err);
        }
    }

    // 当把后台的数据更新后，同步把本地的数据也删除，刷新页面
    removeItemFromLocalList(ids: number[]) {
        for (let i = 0; i < ids.length; i++) {
            for (let j = 0; j < this.books.length; j++) {
                if (this.books[j].ID === ids[i]) {
                    this.books.splice(j, 1);
                    return;
                }
            }
        }
    }

    onSelectItem(id: number) {
        this.addItem(this.selectIDs, id);
    }

    onUnselectItem(id: number) {
        this.removeItem(this.selectIDs, id);
    }

    addItem(array: number[], item: number) {
        if (array.indexOf(item) === -1) {
            array.push(item);
        }
    }


    removeItem(array: number[], item: number) {
        let index = array.indexOf(item);
        if (index >= 0) {
            array.splice(index, 1);
        }
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

                    }
                }]
        });
        confirm.present();
    }


}