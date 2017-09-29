import { InspectionCommonService } from './../../../shared/service/inspectionCommon.service';
import { Lines } from "./../model/lines";
import { Slides } from 'ionic-angular';
import { UserState } from './../../../../../../shared/models/user.model';
import { MyStore } from './../../../../../../shared/store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BossReportState, BossReportModel, BossReportInsideModel } from './../store';
import { PluginService } from './../../../../../../core/services/plugin.service';
import { MyHttpService } from './../../../../../../core/services/myHttp.service';
import { Injectable } from '@angular/core';
import { BossConfig } from '../config/boss.config';
import { EnvConfig } from '../../../../../../shared/config/env.config';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class BossService {

  translateTexts: any = {};
  user: UserState;
  constructor(
    private myHttp: MyHttpService,
    private plugin: PluginService,
    private translate: TranslateService,
    private $store: Store<MyStore>,
    private inspectionCommonService: InspectionCommonService
  ) {
    this.subscribeTranslateText();
    this.$store.select('userReducer').subscribe((user: UserState) => this.user = user);
  }

  subscribeTranslateText() {
    this.translate.stream(['not_found',
      'http_error1', 'http_error2', 'http_error3'
    ]).subscribe((res) => {
      this.translateTexts = res;
    })
  }

  getMriName() {
    return this.myHttp.get(BossConfig.getMriNameUrl + '?type=boss&company_name=' + EnvConfig.companyID);
  }

  get7SLocation() {
    return this.myHttp.get(BossConfig.getMriLookup + '?lookup_type=7S_LOCATION');
  }

  getMriWeek(begin: number, end: number) {
    return this.myHttp.get(BossConfig.getMriWeek + '?bweek=' + begin + '&eweek=' + end);
  }


  saveSchedule(data: any) {
    return this.myHttp.post(BossConfig.saveSchedule, data).then((res) => {
      return Promise.resolve({ content: '', status: true })
    }).catch((err) => {
      console.log(err);
      let errTip = this.plugin.errorDeal(err);
      return Promise.resolve({ content: errTip, status: false })
    });

  }

  convertReportData(data: any): BossReportState {
    return new BossReportModel(data);
  }

  uploadReport(data: any) {
    let send = this.convertReportData(data);
    let request:any[] = [];
    request.push(this.myHttp.post(BossConfig.uploadReport, this.convertReportData(data)))
    send.Lines.forEach((li) => {
      if(li.PROBLEM_PICTURES) {
        let imgs = li.PROBLEM_PICTURES.split(',');
        if(imgs && imgs.length>0) {
          imgs.forEach(i => {
            request.push(this.uploadPicture(+li.LINE_ID,i));
          })
        }
      }
    })
    return Observable.forkJoin(...request).map((res:Response[]) => res.map((r) => r.json()));
  }

  uploadPicture(line_id:number,img:string) {
    img = img.replace('data:image/jpeg;base64,', '');
    return this.inspectionCommonService.uploadPicture({LINE_ID:line_id,PICTURE:img});
  }

  async getBossReport(id: string) {
    let res: any = await this.myHttp.get(BossConfig.getBossReport.replace('{header_id}', id)).catch((err: any) => { this.plugin.errorDeal(err); return '' });
    if (!res) return;
    res = res.json();
    if (res.Header) {
      return new BossReportInsideModel(res);
    }
    return;
  }

  getEmployeeSchedule() {
    let company = localStorage.getItem('appCompanyId');
    return this.myHttp.get(BossConfig.getEmployeeSchedule.replace('{company}', company));
  }

  getExcReportData(status: string, empno: string, type: string) {
    return Observable.fromPromise(this.myHttp.get(BossConfig.getExcReportData.replace('{problemStatus}', status).replace('{empno}', empno).replace('{type}', type).replace('{company_name}', EnvConfig.companyID)))
      .map(res => res.json())
  }

  getOwnUndoneReport() {
    let userNo = this.user.empno;
    let status = ['Waiting', 'Highlight'];
    let type = 'boss';
    return Observable.forkJoin(this.getExcReportData(status[0], userNo, type), this.getExcReportData(status[1], userNo, type)).map((list:any) => {
      let filterList = list.filter((l:any) => l);
      switch (filterList.length) {
        case 0:
          return null;
        case 1:
          return filterList[0];
        case 2:
          return filterList[0].concat(filterList[1])
        default:
          return null;
      }
    })
  }

}
