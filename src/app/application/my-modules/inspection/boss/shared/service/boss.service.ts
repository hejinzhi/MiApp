import { Lines_All_Search } from './../../../shared/actions/lineAll.action';
import { Lines_Check, Lines_Delete } from './../../../shared/actions/line.action';
import { InspectionService } from './../../../ipqa/shared/service/inspection.service';
import { InspectionCommonService } from './../../../shared/service/inspectionCommon.service';
import { Lines } from "./../model/lines";
import { Slides, Loading } from 'ionic-angular';
import { UserState } from './../../../../../../shared/models/user.model';
import { MyStore } from './../../../../../../shared/store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BossReportState, BossReportModel, BossReportInsideModel, BossReportLineState } from './../store';
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
    private inspectionCommonService: InspectionCommonService,
    private inspectionService: InspectionService,
  ) {
    this.subscribeTranslateText();
    this.$store.select('userReducer').subscribe((user: UserState) => this.user = user);
    this.getOwnUndoneReport();
    this.getALLReport('', '', '');
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
    let request: any[] = [];
    send.Lines && send.Lines.forEach((li) => {
      if (li.PROBLEM_PICTURES) {
        let imgs = li.PROBLEM_PICTURES.split(',');
        li.PROBLEM_PICTURES = '';
        if (imgs && imgs.length > 0) {
          imgs.forEach(i => {
            if(i.indexOf(EnvConfig.baseUrl) > -1) {
              i = i.replace(EnvConfig.baseUrl,'');
              li.PROBLEM_PICTURES = !li.PROBLEM_PICTURES? i:li.PROBLEM_PICTURES+','+i;
            } else {
              let l = request.length;
              request.push(this.uploadPicture(i),(url:any) => {
                li.PROBLEM_PICTURES = !li.PROBLEM_PICTURES? url.value:li.PROBLEM_PICTURES+','+url.value;
                console.log('完成上传图片'+(l+1));
              }); 
            }
          })
        }
      }
    })
    const upload = (sendOut:any) => Observable.fromPromise(this.myHttp.post(BossConfig.uploadReport, sendOut)).map((res) => res.json());
    if(request.length > 0) {
      return Observable.forkJoin(...request).map((l) => {
        console.log(l);
        return upload(send)
      });
    } else {
      return upload(send);
    }
  }

  uploadPicture(img:string,cb?:Function) {
    if(!img) return;
    img = img.replace('data:image/jpeg;base64,', '');
    return Observable.fromPromise(this.myHttp.post(BossConfig.uploadPicture,{ PICTURE:img })).map((res) => {
      let url = res.json()['PICTURE_URL'];
      cb && cb(url);
      return url;
    });
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

  getOwnUndoneReport(waiting: boolean = false,cb?:Function) {
    let userNo = this.user.empno;
    let status = ['Waiting', 'Highlight'];
    let type = 'boss';
    let loading: Loading;
    if (waiting) {
      loading = this.plugin.createLoading()
      loading.present();
    }
    return Observable.forkJoin(this.getExcReportData(status[0], userNo, type), this.getExcReportData(status[1], userNo, type)).map((list: any) => {
      let filterList = list.filter((l: any) => l);
      switch (filterList.length) {
        case 0:
          return [];
        case 1:
          return filterList[0];
        case 2:
          return filterList[0].concat(filterList[1])
        default:
          return [];
      }
    }).subscribe((line: BossReportLineState[]) => {
      if(waiting && line.length === 0) {
        this.plugin.showToast('没查到待改善事项')
      } else {
        cb && cb();
      }
      this.$store.dispatch(new Lines_Check(line));
    }, (err) => waiting ? this.plugin.errorDeal(err) : '', () => {
      if (loading) {
        loading.dismiss();
      }
    }
      )
  }

  getALLReport(from: string, to: string, type: string, waiting:boolean = false,cb?: Function) {
    let loading: Loading;
    if (waiting) {
      loading = this.plugin.createLoading()
      loading.present();
    }
    return this.getExcReportData('', '' , type).map((list: any) => list? list: []
    ).subscribe((line: BossReportLineState[]) => {
      if(waiting && line.length === 0) {
        this.plugin.showToast('没查到记录')
      } else {
        cb && cb();
      }
      this.$store.dispatch(new Lines_All_Search(line));
    }, (err) => waiting ? this.plugin.errorDeal(err) : '', () => {
      if (loading) {
        loading.dismiss();
      }
    }
      )
  }

  handleIssue(obj: { PROBLEM_STATUS: string, ACTION_DESC: string, ACTION_DATE: string, ACTION_STATUS: string, SCORE: string, LINE_ID: number }) {
    return Observable.fromPromise(this.inspectionService.handleProblem(obj)).map((res) => res.status);
  }

  updateReportLines(data:BossReportLineState,cb?:Function,final?:Function) {
    let request:any[];
    if(data.ACTION_PICTURES) {
      request = [];
      let imgs = data.ACTION_PICTURES.split(',');
      data.ACTION_PICTURES = '';
      imgs.forEach((i) => {
        if(i.indexOf(EnvConfig.baseUrl) > -1) {
          data.ACTION_PICTURES = data.ACTION_PICTURES?data.ACTION_PICTURES+','+i:i;
        } else {
          let l = request.length;
          request.push(this.uploadPicture(i),(url:any) => {
            data.ACTION_PICTURES = data.ACTION_PICTURES?data.ACTION_PICTURES+','+url.value:url.value;
            console.log('完成上传图片'+(l+1));
          } ); 
        }
      })
    }
    const upload = (sendOut:any) => Observable.fromPromise(this.myHttp.post(BossConfig.updateReportLines,sendOut)).map((res) => res.status).subscribe((s:any) =>{
      if(s == 200) {
        cb && cb();
      }
    },(err) => this.plugin.errorDeal(err),() => final && final());;
    
    if(request && request.length > 0) {
      return Observable.forkJoin(...request).subscribe((imgs) => upload(data),(err) => {this.plugin.errorDeal(err); final && final()});
    } else {
      return upload(data);
    }
  }

  updateLinesByAdmin(data:BossReportLineState,cb?:Function,final?:Function) {
    return Observable.fromPromise(this.myHttp.post(BossConfig.updateReportLines,data)).map((res) => res.status).subscribe((s:any) =>{
      if(s == 200) {
        cb && cb();
      }
    },(err) => this.plugin.errorDeal(err),() => final && final());
  }

  ObserveOwnLinesCount() {
    return this.$store.select('lineReducer').map((lines:BossReportLineState[]) => lines.length);
  }

  ObserveAdminLinesDealCount() {
    return this.$store.select('lineAllReducer').map((lines:BossReportLineState[]) => lines.map((l) => l.PROBLEM_STATUS === 'New').length);
  }

  ObserveAllTips() {
    return Observable.combineLatest(this.ObserveOwnLinesCount(),this.ObserveAdminLinesDealCount())
    .map(counts => counts[0]+counts[1]); 
  }

}
