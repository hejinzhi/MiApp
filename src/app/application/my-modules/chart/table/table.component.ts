import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sg-table',
  templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit {
  @Input() tableData: any;

  constructor() { }

  ngOnInit() {
    if(this.tableData instanceof Object) {
      this.tableData = this.tableData;
    }  else {
      this.tableData = JSON.parse(this.tableData);
    }
  }
}
