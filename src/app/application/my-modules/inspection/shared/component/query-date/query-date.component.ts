import { Query } from './../../model/common';
import { InspectionCommonService } from './../../service/inspectionCommon.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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


  @Output()
  change = new EventEmitter<Query>()

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
    if (!this.name_id) {
      this.name_id = this.mrinamelist[0].NAME_ID;
    }
    this.changeQuery();
  }

  changeQuery() {
    this.change.emit({
      nameID: this.name_id,
      dateFM: this.start_date,
      dateTO: this.end_date
    });
  }

}
