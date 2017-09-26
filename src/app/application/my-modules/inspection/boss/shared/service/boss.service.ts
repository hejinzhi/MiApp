import { BossReportState, BossReportModel } from './../store';
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
            console.log(res.json(),433);
          return Promise.resolve({ content: '', status: true })
        }).catch((err) => {
          console.log(err);
          let errTip = this.errorDeal(err);
          return Promise.resolve({ content: errTip, status: false })
        });
        
    }

    convertReportData(data:any):BossReportState {
      return new BossReportModel(data);
    }
    
    uploadReport(data:any) {
      return this.myHttp.post(BossConfig.uploadReport,this.convertReportData(data));
    }

    getEmployeeSchedule() {
      let company = localStorage.getItem('appCompanyId');
      return this.myHttp.get(BossConfig.getEmployeeSchedule.replace('{company}',company));
    }


    errorDeal(err: any, showAlert: boolean = false) {
        let errTip = '';
        switch (err.status) {
          case 404:
            this.plugin.showToast(this.translateTexts['not_found']);
            break;
          case 400:
            // if (showAlert) {
            //   this.plugin.createBasicAlert(this.chineseConv(err.json().ExceptionMessage));
            // } else {
            //   this.plugin.showToast(this.chineseConv(err.json().ExceptionMessage));
            // }
            errTip = this.plugin.chineseConv(err.json().ExceptionMessage);
            break;
          case 0:
            this.plugin.showToast(this.translateTexts['http_error1']);
            break;
          case 500:
            this.plugin.showToast(this.translateTexts['http_error2']);
            break;
          default:
            this.plugin.showToast(this.translateTexts['http_error3'] + err.status);
            break;
        }
        return errTip
      }

}
