import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';

@Component({
    selector: 'sg-checkbox',
    templateUrl: 'checkbox.component.html'
})
export class CheckboxComponent implements OnInit, OnChanges {
    constructor() { }

    @Input()
    selectOptions: string[];

    showOptions: { title: string; checked: boolean }[] = [];

    @Output()
    selectedValue: EventEmitter<string> = new EventEmitter();

    ngOnInit() { }

    change(title: string, checked: any) {
        this.showOptions.forEach((v) => {
            if (v.title === title) {
            } else {
                if (checked) {
                    this.selectedValue.emit(title);
                    v.checked = false;
                }
            }

        })

    }

    ngOnChanges() {
        let temp: { title: string; checked: boolean }[] = [];
        this.selectOptions.forEach((v) => {
            temp.push({
                title: v,
                checked: false
            })
        });
        this.showOptions = temp;
    }
}