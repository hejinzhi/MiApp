import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';

@Component({
    selector: 'sg-checkbox',
    templateUrl: 'checkbox.component.html'
})
export class CheckboxComponent implements OnInit, OnChanges {
    constructor() { }


    selectOptions: string[] = ['正常', '異常'];

    showOptions: { title: string; checked: boolean }[] = [];

    @Output()
    // selectedValue: EventEmitter<string> = new EventEmitter();
    selectedValue: EventEmitter<{ title: string; checked: boolean }> = new EventEmitter();

    ngOnInit() {
        let temp: { title: string; checked: boolean }[] = [];
        this.selectOptions.forEach((v) => {
            temp.push({
                title: v,
                checked: false
            })
        });
        this.showOptions = temp;
    }

    change(option: { title: string; checked: boolean }) {
        // if (option.title === this.selectOptions[1] && option.checked) {
        //     this.selectedValue.emit(option);
        // }
        if (option.checked) {
            this.selectedValue.emit(option);
        }
        this.showOptions.forEach((v) => {
            if (v.title === option.title) {
            } else {
                if (option.checked) {
                    // this.selectedValue.emit(title);
                    v.checked = false;
                }
            }

        });

        // for (let i = 0; i < this.showOptions.length; i++) {
        //     // if (this.showOptions[i].checked) {
        //     //     this.selectedValue.emit(this.showOptions[i]);
        //     //     break;
        //     // }
        //     if (this.showOptions[i].title === title) {
        //         break;
        //     } else {
        //         if (checked) {
        //             this.selectedValue.emit(this.showOptions[i]);
        //             this.showOptions[i].checked = false;
        //         }
        //     }
        // }



    }

    ngOnChanges() {

    }
}