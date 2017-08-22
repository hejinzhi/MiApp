import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'sg-grid',
    templateUrl: 'grid.component.html'
})
export class GridComponent implements OnInit {


    // 设置标题信息
    @Input()
    title: string;

    @Output()
    dataChange: EventEmitter<GridModel> = new EventEmitter();

    // 传递进来的数组
    @Input()
    data: GridModel[];

    // showData: Array<GridModel>;

    // 设置右上角的勾是否显示
    toggleCheckbox: boolean = true;

    // 该组件有两种状态，MODULE_STATION是选择模块和站点 STATION是从站点进入到check list
    @Input()
    mode: number = Mode.MODULE_STATION;

    constructor() {
        // this.showData = new Array();
    }

    ngOnInit() {

    }

    onTap(item: GridModel) {
        if (this.mode == Mode.MODULE_STATION) {
            item.showCheckbox = !item.showCheckbox;
            this.dataChange.emit(item);
        } else {
            this.dataChange.emit(item);
        }

    }

    // ngOnChanges() {
    //     let temp: GridModel[] = [];
    //     this.data.forEach((data) => {
    //         let showFlag: boolean;
    //         if (this.mode === Mode.MODULE_STATION) {
    //             showFlag = true;
    //         } else {
    //             showFlag = false;
    //         }
    //         temp.push({
    //             title: data,
    //             showCheckbox: showFlag
    //         });
    //     });
    //     this.showData = temp;
    // }


}

export class GridModel {
    title: string;
    showCheckbox: boolean;
}

export enum Mode {
    MODULE_STATION,
    STATION
}