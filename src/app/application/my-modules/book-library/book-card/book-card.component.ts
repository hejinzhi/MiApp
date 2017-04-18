import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'sg-book-card',
    templateUrl: 'book-card.component.html'
})
export class BookCardComponent implements OnInit {
    @Input() books;
    @Output() emitSelectedIds = new EventEmitter();;
    selectedBorrowId: number[] = []; // 用来记录哪些记录被选中
    selectedAllFlag: boolean; // 是否全选

    constructor() { }

    ngOnInit() {
        // this.books = this.testBook;
        // this.books.forEach((item) => {
        //     item.selectItem = false;
        // })
        // console.log(this.books);
    }

    singleSelect(event, id) {
        if (event.checked) {
            this.addItem(this.selectedBorrowId, id);
        } else {
            this.removeItem(this.selectedBorrowId, id);
        }
        console.log(this.selectedBorrowId);
    }

    addItem(array: number[], item: number) {
        if (array.indexOf(item) === -1) {
            array.push(item);
        }
    }

    test() {
        console.log(this.selectedBorrowId);
    }

    removeItem(array: number[], item: number) {
        let index = array.indexOf(item);
        if (index >= 0) {
            array.splice(index, 1);
        }
    }


    selectedAll() {
        if (this.selectedAllFlag) {
            this.selectedAllFlag = false;
            this.books.forEach((item) => {
                item.selectItem = false;
            });
        } else {
            this.selectedAllFlag = true;
            this.books.forEach((item) => {
                item.selectItem = true;
            });
        }
    }

    testBook = [{
        TITLE: 'Oracle移动网络应用程序设计——基于Oracle Application Express',
        AUTHOR: 'Roel Hartman,Christian Rokitta,David Peake',
        PRICE: '49.00元',
        PUBLISHER: '清华大学出版社',
        QTY: '9',
        IMAGE: 'https://img3.doubanio.com/mpic/s27306043.jpg',
        ISBN13: '123',
        ID: 1
    },
    {
        TITLE: 'Oracle移动网络应用程序设计——基于Oracle Application Express',
        AUTHOR: 'Roel Hartman,Christian Rokitta,David Peake',
        PRICE: '49.00元',
        PUBLISHER: '清华大学出版社',
        QTY: '9',
        IMAGE: 'https://img3.doubanio.com/mpic/s27306043.jpg',
        ISBN13: '123565',
        ID: 2
    }];
}