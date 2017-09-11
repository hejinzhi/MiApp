import { Component, OnInit, Input, Output, OnChanges, EventEmitter, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'sg-checkbox',
    templateUrl: 'checkbox.component.html'
})
export class CheckboxComponent implements OnInit, OnChanges {
    constructor(
        private translate: TranslateService
    ) { }

    // translateTexts: any = {
    //     'inspection.ipqa.normal': '',
    //     'inspection.ipqa.exception': ''
    // }; // 记录转换后的文本(简繁体)
    translateTexts: any;
    // selectOptions: string[] = ['正常', '異常'];
    selectOptions: string[] = [];
    public checkedIdx: number;
    @Output() selectedValue: EventEmitter<string> = new EventEmitter();
    @Input() reset: boolean;
    @Input() value: string;

    async ngOnInit() {
        this.selectOptions = [];
        this.translateTexts = await this.translate.get(['inspection.ipqa.normal', 'inspection.ipqa.exception']).toPromise();
        this.selectOptions.push(this.translateTexts['inspection.ipqa.normal']);
        this.selectOptions.push(this.translateTexts['inspection.ipqa.exception']);
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