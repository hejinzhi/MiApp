import { EnvConfig } from './../../../../../../shared/config/env.config';
import { BossService } from './../../../boss/shared/service/boss.service';
import { BossReportState, BossReportHeader, BossReportLineState } from './../../../boss/shared/store';
import { BossConfig } from './../../../boss/shared/config/boss.config';
import { Observable } from 'rxjs/Rx';
import { EquipConfig } from './../config/equip.config';
import { async } from '@angular/core/testing';
import { InspectionCommonService } from './../../../shared/service/inspectionCommon.service';
import { PluginService } from './../../../../../../core/services/plugin.service';
import { MyHttpService } from './../../../../../../core/services/myHttp.service';
import { Injectable } from '@angular/core';

@Injectable()
export class EquipService {

    constructor(
        private myHttp: MyHttpService,
        private plugin: PluginService,
        private inspectionCommonService: InspectionCommonService,
        private bossService: BossService
    ) { }

    saveMachine(data: any) {
        return this.myHttp.post(EquipConfig.UploadMachineUrl, data).then((res) => {
            return Promise.resolve({ content: res.json(), status: true })
        }).catch((err) => {
            console.log(err);
            let errTip = this.plugin.errorDeal(err);
            return Promise.resolve({ content: errTip, status: false })
        });
    }

    getMachineList(location1: string, location2: string, location3: string, machine_no: string) {
        return this.myHttp.get(EquipConfig.getMachineListUrl + '?loc1=' + location1 + '&loc2=' + location2 + '&loc3=' + location3 + '&machine_no=' + machine_no);
    }

    deleteMachine(machine_id: number) {
        return this.myHttp.delete(EquipConfig.deleteMachineUrl + '?machine_id=' + machine_id);
    }

    async  getLocations() {
        let res1: any = await this.inspectionCommonService.getMriLookup('EQUIP_LOCATION1');
        let location1 = res1.json();
        let res2: any = await this.inspectionCommonService.getMriLookup('EQUIP_LOCATION2');
        let location2 = res2.json();
        let res3: any = await this.inspectionCommonService.getMriLookup('EQUIP_LOCATION3');
        let location3 = res3.json();
        let location1_data: any[] = [];
        let location2_data: any[] = [];
        let location3_data: any[] = [];
        location1.forEach((location: any) => {
            location1_data.push({ text: location.LOOKUP_CODE, value: location.LOOKUP_CODE });
        });
        location2.forEach((location: any) => {
            location2_data.push({ text: location.LOOKUP_CODE, value: location.LOOKUP_CODE, parentVal: location.DESCRIPTION });
        });
        location3.forEach((location: any) => {
            location3_data.push({ text: location.LOOKUP_CODE, value: location.LOOKUP_CODE, parentVal: location.DESCRIPTION });
        });

        let locations: any[] = [
            {
                name: 'col1',
                options: location1_data
            }, {
                name: 'col2',
                options: location2_data
            }, {
                name: 'col3',
                options: location3_data
            }
        ];
        return locations;
    }

    getMachineCheckList(id:string) {
        return Observable.fromPromise(this.myHttp.get(EquipConfig.getMachineCheckList.replace('{machineNO}',id))).map((res) => res.json());
    }

    updateQquipReport(data:any) {
        let send = new EquipReportModule(data);
        let request: any[] = [];
        send.Lines && send.Lines.forEach((li) => {
          if (li.PROBLEM_PICTURES) {
            let imgs = li.PROBLEM_PICTURES.split(',');
            li.PROBLEM_PICTURES = '';
            if (imgs && imgs.length > 0) {
              imgs.forEach(i => {
                if (i.indexOf(EnvConfig.baseUrl) > -1) {
                  i = i.replace(EnvConfig.baseUrl, '');
                  li.PROBLEM_PICTURES = !li.PROBLEM_PICTURES ? i : li.PROBLEM_PICTURES + ',' + i;
                } else {
                  let l = request.length;
                  request.push(this.bossService.uploadPicture(i), (url: any) => {
                    li.PROBLEM_PICTURES = !li.PROBLEM_PICTURES ? url : li.PROBLEM_PICTURES + ',' + url;
                    console.log('完成上传图片' + (l + 1));
                  });
                }
              })
            }
          }
        })
        const upload = (sendOut: any) => Observable.fromPromise(this.myHttp.post(BossConfig.uploadReport, sendOut)).map((res) => res.json());
        if (request.length > 0) {
          return Observable.forkJoin(...request).map((l) => {
            console.log(l);
            return upload(send)
          });
        } else {
          return upload(send);
        }
    }
}

export class EquipReportModule implements BossReportState {
    Header:BossReportHeader;
    Lines:BossReportLineState[];
    constructor(data:any) {
        this.Header = {} as BossReportHeader
        this.Header.HEADER_ID = data.HEADER_ID || 0;
        this.Header.INSPECT_DATE = data.INSPECT_DATE;
        this.Header.MACHINE_ID = data.MACHINE_ID;
        this.Header.MACHINE_NAME = data.MACHINE_NO;
        this.Header.COMPANY_NAME = localStorage.getItem('appCompanyId');
        this.Header.TYPE = 'equip';
        this.Lines = [];
        if(data.lists && data.lists.length > 0) {
            data.lists.forEach((el:any) => {
                let l:BossReportLineState = {};
                l.COMPANY_NAME = this.Header.COMPANY_NAME;
                l.HEADER_ID = this.Header.HEADER_ID;
                l.INSPECT_DATE = this.Header.INSPECT_DATE?this.Header.INSPECT_DATE.substr(0,10):'';
                l.INSPECT_TIME = this.Header.INSPECT_DATE?this.Header.INSPECT_DATE.substr(11):'';
                l.LINE_ID = el.LINE_ID?el.LINE_ID:0;
                l.PROBLEM_FLAG = el.check?'Y':'N';
                l.CHECK_ID = el.CHECK_ID;
                l.CHECK_LIST_CN = el.CHECK_LIST_CN;
                l.CHECK_LIST_EN = el.CHECK_LIST_EN;
                l.PROBLEM_STATUS = el.check?'Waiting':'Done';
                if(el.check) {
                    l.PROBLEM_DESC = el.PROBLEM_DESC;
                    l.OWNER_EMPNO = el.OWNER_EMPNO.split(',')[0];
                    l.PROBLEM_PICTURES = el.imgs?el.imgs.map((i:string) => i.replace('data:image/jpeg;base64,','')).join():'';
                }
                this.Lines.push(l);
            });
        }
        console.log(this);
        
    }
}

export class Machine {
    constructor(
        public machine_id: number,
        public machine_no: string,
        public company_name: string,
        public description: string,
        public quantity: number,
        public location1: string,
        public location2: string,
        public location3: string,
        public location4: string,
        public production_date: string,
        public effective_date: string,
        public owner_empno: string,
        public name_id: string,
        public disable_date: string,

    ) { }
}
