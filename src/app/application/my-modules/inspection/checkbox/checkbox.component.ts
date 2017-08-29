import { Component, OnInit, Input, Output, OnChanges, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
    selector: 'sg-checkbox',
    templateUrl: 'checkbox.component.html'
})
export class CheckboxComponent implements OnInit, OnChanges {
    constructor(
    ) { }


    selectOptions: string[] = ['正常', '異常'];
    public checkedIdx: number;

    @Output()
    selectedValue: EventEmitter<string> = new EventEmitter();

    @Input()
    reset: boolean;

    @Input()
    value: string;

    ngOnInit() {
        if (this.value === this.selectOptions[0]) {
            this.checkedIdx = 0;
        } else if (this.value === this.selectOptions[1]) {
            this.checkedIdx = 1;
        }
    }

    change(event: boolean, i: number) {
        if (event) {
            this.checkedIdx = i;
            this.selectedValue.emit(this.selectOptions[i]);

        } else {
            this.checkedIdx = -1
            this.selectedValue.emit('');
        }
    }

    ngOnChanges(event: SimpleChanges) {
        if (event && event.reset) {
            this.checkedIdx = -1;
        }

    }


}