import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'sg-table',
    templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit {
    @Input() tableData: {
      caption:string;
      data:string[][]
    };

    constructor() { }

    ngOnInit() {
      console.log(this.tableData.data.slice(1))
      console.log(JSON.stringify(this.tableData))
    }
}
