import { InspectionCommonService } from './../../service/inspectionCommon.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import * as moment from 'moment'

@Component({
  selector: 'sg-query-date',
  templateUrl: 'query-date.component.html'
})
export class QueryDateComponent implements OnInit {
  @Input()
  name_id: number;

  @Input()
  mri_type: string = 'IPQA';

  @Input()
  start_date: string;

  @Input()
  end_date: string;


  @Output() name_id_change = new EventEmitter();
  @Output() start_date_change = new EventEmitter();
  @Output() end_date_change = new EventEmitter();

  selectMaxYear = +moment(new Date()).format('YYYY') + 1;

  mrinamelist: any[];

  constructor(
    private commonService: InspectionCommonService
  ) { }

  async ngOnInit() {
    this.start_date = this.start_date || moment(Date.parse(new Date().toString()) - 1000 * 60 * 60 * 24 * 30).format('YYYY-MM-DD');
    this.end_date = this.end_date || moment(Date.parse(new Date().toString())).format('YYYY-MM-DD');
    let res = await this.commonService.getMriName(this.mri_type);
    this.mrinamelist = res.json();
  }

  changeNameId() {
    this.name_id_change.emit(this.name_id);
  }

  changeStartDate() {
    this.start_date_change.emit(this.start_date);
  }

  changeEndDate() {
    this.end_date_change.emit(this.end_date);
  }

}
