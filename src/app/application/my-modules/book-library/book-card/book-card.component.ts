import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'sg-book-card',
    templateUrl: 'book-card.component.html'
})
export class BookCardComponent implements OnInit {
    @Input() bookList: any;
    @Input() renewFlag: boolean; // 是否续借调用
    @Output() onSelect = new EventEmitter();  // 选中时把id emit出去
    @Output() onUnselect = new EventEmitter(); // 不选中时把id emit出去
    @Input() showPayBackDate: boolean = false;  // 是否显示“应归还时间”
    selectedBorrowId: number[] = []; // 用来记录哪些记录被选中
    selectedAllFlag: boolean; // 是否全选


    constructor() { }

    ngOnInit() {
        // this.bookList.BOOKS.forEach((item: any) => { 
        //     item.selectItem = false;
        // })   
    }

    singleSelect(event: any, id: number) {
        if (event.checked) {
            this.addItem(this.selectedBorrowId, id);
            this.onSelect.emit(id);
        } else {
            this.removeItem(this.selectedBorrowId, id);
            this.onUnselect.emit(id);
        }
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
            this.bookList.BOOKS.forEach((item: any) => {
                item.selectItem = false;
            });
        } else {
            this.selectedAllFlag = true;
            this.bookList.BOOKS.forEach((item: any) => {
                if (this.renewFlag) {
                    if (item.RENEW_FLAG === 'Y') { }
                    else {
                        item.selectItem = true;
                    }
                }
                else {
                    item.selectItem = true;
                }
            });
        }
    }

}