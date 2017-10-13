import { async } from '@angular/core/testing';
import { InspectionCommonService } from './../../../shared/service/inspectionCommon.service';
import { PluginService } from './../../../../../../core/services/plugin.service';
import { MyHttpService } from './../../../../../../core/services/myHttp.service';
import { Injectable } from '@angular/core';
import { EquipConfig } from '../config/equip.config';

@Injectable()
export class EquipService {

    constructor(
        private myHttp: MyHttpService,
        private plugin: PluginService,
        private inspectionCommonService: InspectionCommonService,
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

    getMachineSchedule(year: string, month: string, nameID: number) {
        let company = localStorage.getItem('appCompanyId');
        return this.myHttp.get(EquipConfig.getMachineScheduleUrl + '?companyName=' + company + '&year=' + year + '&month=' + month + '&nameID=' + nameID);
    }

    setMachineSchedule(year: string, month: string, nameID: number) {
        let company = localStorage.getItem('appCompanyId');
        let send = { COMPANY_NAME: company, YEAR: year, MONTH: month, NAME_ID: nameID };
        return this.myHttp.post(EquipConfig.setMachineScheduleUrl, send);
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
