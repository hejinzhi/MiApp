import { Component, OnInit, ViewChild } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { CheckList } from '../../../../shared/models/check-list.model';
import { ArrayUtilService } from '../../../../core/services/arrayUtil.service';

@Component({
    selector: 'sg-borrow-request',
    templateUrl: 'borrow-request.component.html'
})

export class BorrowRequestComponent implements OnInit {
    selectIDs: number[] = []; // 返回的借书人的清单
    userListAfterTransform: CheckList[] = []; // 对借书清单进行分组处理，保存处理后的借书清单
    constructor(
        public navParams: NavParams,
        private arrayService: ArrayUtilService
    ) { }

    ngOnInit() {
        this.userListAfterTransform = this.transformUserList();
        console.log(this.userListAfterTransform);
    }

    transformUserList() {
        let books = this.navParams.get('books');
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


    borrowConfirm() {
        console.log(this.selectIDs);
    }

    onSelectItem(id) {
        this.addItem(this.selectIDs, id);
    }

    onUnselectItem(id) {
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


}