import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApplicationItem } from '../../shared/models/application-item.model';

// 该组件用于“应用”页面，显示功能模块
@Component({
    selector: 'sg-application-grid',
    templateUrl: 'application-grid.component.html'
})
export class ApplicationGridComponent {

    @Input() items: ApplicationItem[];
    @Input() type: string; // value: remove or add
    @Input() showBtn: boolean;// value: true or false
    @Output() onSelect = new EventEmitter();// 当点击删除图标是，把对应的id emit给父组件
    @Output() onClick = new EventEmitter();


    constructor() {
    }

    selectItem(id: number) {
        this.onSelect.emit(id);
    }

    goToDetailPage(id: number): void {
        this.onClick.emit(id);
    }



}

