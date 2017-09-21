import { NgValidatorExtendService } from './../../../core/services/ng-validator-extend.service';
import { FormControl, AbstractControl } from '@angular/forms';
import { Subscription, Subject } from 'rxjs/Rx';
import { Observable } from 'rxjs';
import { AttendanceService } from './../../../application/my-modules/attendance/shared/service/attendance.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sg-search-colleague',
  templateUrl: 'search-colleague.component.html'
})
export class SearchColleagueComponent implements OnInit {
  @Input()
  set opt(opt: { formCtr: FormControl, label: string }) {
    this.formCtr = opt.formCtr;
    this.label = opt.label || this.label;
  }
  colleague: Observable<string[]>;// 搜索得到的候选代理人
  tempcolleague: string;
  isSelectcolleague: boolean = false;
  formCtr: FormControl;
  label: string = "负责人";
  searchTerms = new Subject<string>();

  constructor(
    private attendanceService: AttendanceService,
    private validExd: NgValidatorExtendService,
  ) { }

  ngOnInit() {
    this.colleague = this.searchTerms.debounceTime(300).distinctUntilChanged().switchMap((term: string) => {
      let empno: string[] = term.split(',');
      if (empno.length > 0) {
        term = empno[0];
      }
      if (term.trim().length > 0) {
        return this.attendanceService.getAgent(term);
      } else {
        return Observable.of<any>([])
      }
    })
      .catch((error: any) => {
        // TODO: real error handling
        console.log(error)
        return Observable.of<any>([]);
      });

    if (this.formCtr) {
      let inVal = this.formCtr.value
      if (inVal) {
        this.attendanceService.getAgent(inVal.split(',')[0]).subscribe((val) => {
          if (val && val.length === 1) {
            this.tempcolleague = name;
            this.isSelectcolleague = true;
            this.formCtr.setValue(val[0].AGENT_NAME);
            this.searchTerms.next('');
          } else {
            this.formCtr.setValue('');
          }
        })
      }
      this.formCtr.valueChanges.subscribe((item: string) => {
        this.searchTerms.next(item);
      })

      // TODO: 设置验证
      this.formCtr.setValidators(this.validExd.selfDefine(function (ctr: AbstractControl, isSelect: boolean) {
        if (this.tempcolleague) {
          this.isSelectcolleague = ctr.value != this.tempcolleague ? false : true;
        }
        return this.isSelectcolleague ? null : {
          'notSelect': true
        }
      }.bind(this), this.isSelectcolleague))
    }
  }

  search(item: string) {
    if (!this.formCtr) {
      this.searchTerms.next(item);
    }
  }

  /**
   * 选择下拉表框的值
   * 
   * @param {string} name 
   */
  getcolleague(name: string) {
    if (this.formCtr) {
      this.tempcolleague = name;
      this.isSelectcolleague = true;
      this.formCtr.setValue(name);
    }
    this.searchTerms.next('')
  }
}
