import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import * as moment from 'moment'

@Component({
  selector: 'sg-query-date',
  templateUrl: 'query-date.component.html'
})
export class QueryDateComponent implements OnInit, OnChanges {
  // @Input()
  // start_date: string;

  // @Input()
  // end_date: string;

  // @Output()
  // start_date_change = new EventEmitter();

  // @Output()
  // end_date_change = new EventEmitter();

  selectMaxYear = +moment(new Date()).format('YYYY') + 1;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    // this.start_date_change.emit(this.start_date);
    // this.end_date_change.emit(this.end_date);
  }

}
