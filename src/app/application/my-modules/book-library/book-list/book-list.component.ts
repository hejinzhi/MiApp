import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'sg-book-list',
    templateUrl: 'book-list.component.html'
})
export class BookListComponent {
    @Input() books;
    @Input() showAddBookInput: boolean = false;
    @Output() onClick = new EventEmitter();
    @Output() onInputChange = new EventEmitter();

    addBookQty: number = 1; // 要添加的图书数量


    constructor() {
        this.addBookQty = 1;
    }

    ionViewDidLoad() {
        console.log('book list did load')
    }

    ionViewWillEnter() {
        console.log('book list will enter')
        this.addBookQty = 1;
    }

    goToDetailPage(book): void {
        this.onClick.emit(book);
    }

    inputChange(event) {
        this.onInputChange.emit(event.target.value);
    }

    trackByBooks(index, book) {
        return book.ISBN13;
    }

}
