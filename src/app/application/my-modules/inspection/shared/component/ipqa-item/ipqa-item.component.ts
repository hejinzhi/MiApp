import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'sg-ipqa-item',
    templateUrl: 'ipqa-item.component.html'
})
export class IpqaItemComponent implements OnInit {

    @Input()
    item: any;
    constructor() { }

    ngOnInit() {
    }

}
