import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'sg-grid',
    templateUrl: 'grid.component.html'
})
export class GridComponent implements OnInit, OnChanges {


    // 设置标题信息
    @Input()
    title: string;

    @Output()
    dataChange: EventEmitter<GridModel[]> = new EventEmitter();

    // 传递进来的数组
    @Input()
    data: string[];

    showData: Array<GridModel>;

    // 设置右上角的勾是否显示
    toggleCheckbox: boolean = true;

    constructor() {
        this.showData = new Array();
    }

    ngOnInit() {

    }

    onTap(item: GridModel) {
        item.showCheckbox = !item.showCheckbox;
        this.dataChange.emit(this.showData);
    }

    ngOnChanges() {
        let temp: GridModel[] = [];
        this.data.forEach((data) => {
            temp.push({
                title: data,
                showCheckbox: true
            });
        });
        this.showData = temp;
    }


}

export class GridModel {
    title: string;
    showCheckbox: boolean;
}