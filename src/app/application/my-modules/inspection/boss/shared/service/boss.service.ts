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

    constructor(
        private myHttp: MyHttpService,
        private plugin: PluginService,
        private translate:TranslateService
    ) {this.subscribeTranslateText() }

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


    saveSchedule(data:any){
        return this.myHttp.post(BossConfig.saveSchedule, data).then((res) => {
          return Promise.resolve({ content: '', status: true })
        }).catch((err) => {
          console.log(err);
          let errTip = this.plugin.errorDeal(err);
          return Promise.resolve({ content: errTip, status: false })
        });
        
    }

    convertReportData(data:any):BossReportState {
      return new BossReportModel(data);
    }
    
    uploadReport(data:any) {
      return this.myHttp.post(BossConfig.uploadReport,this.convertReportData(data));
    }

    async getBossReport(id:string) {
      let res:any = await this.myHttp.get(BossConfig.getBossReport.replace('{header_id}',id)).catch((err:any) => {this.plugin.errorDeal(err);return ''});
      if(!res) return;
      res = res.json();
      if(res.Header) {
        return new BossReportInsideModel(res);
      }
      return;
    }

    getEmployeeSchedule() {
      let company = localStorage.getItem('appCompanyId');
      return this.myHttp.get(BossConfig.getEmployeeSchedule.replace('{company}',company));
    }

}