import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sg-table',
  templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit {
  @Input() tableData: any;

  constructor() { }

  ngOnInit() {
    this.tableData = JSON.parse(this.tableData);
  }
}
