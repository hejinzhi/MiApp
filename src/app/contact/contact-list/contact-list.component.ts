import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'sg-contact-list',
    templateUrl: 'contact-list.component.html'
})
export class ContactListComponent implements OnInit {

    @Input() contacter: any[] = [];
    @Output() onClick = new EventEmitter();  // 点击的时候触发


    constructor() { }

    ngOnInit() { }

    goToDetailPage(item: any) {
        this.onClick.emit(item);
    }

}