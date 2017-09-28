import { PluginService } from './../../../../../../core/services/plugin.service';
import { MyHttpService } from './../../../../../../core/services/myHttp.service';
import { Injectable } from '@angular/core';
import { EquipConfig } from '../config/equip.config';

@Injectable()
export class EquipService {

    constructor(
        private myHttp: MyHttpService,
        private plugin: PluginService,
    ) { }

    saveMachine(data: any) {
        return this.myHttp.post(EquipConfig.UploadMachine, data).then((res) => {
            return Promise.resolve({ content: res.json(), status: true })
        }).catch((err) => {
            console.log(err);
            let errTip = this.plugin.errorDeal(err);
            return Promise.resolve({ content: errTip, status: false })
        });
    }

    locations = [
        {
            name: 'col1',
            options: [
                { text: '廠區', value: '廠區' },
                { text: '生活區', value: '生活區' },
                { text: '廣泓', value: '廣泓' }
            ]
        }, {
            name: 'col2',
            options: [
                { text: 'S6', value: 'S6', parentVal: '廠區' },
                { text: 'S7', value: 'S7', parentVal: '廠區' },
                { text: 'Q1', value: 'Q1', parentVal: '生活區' },
                { text: 'Q2', value: 'Q2', parentVal: '生活區' },
                { text: 'K1', value: 'K1', parentVal: '廣泓' }
            ]
        }, {
            name: 'col3',
            options: [
                { text: '1F', value: '1F', parentVal: 'S6' },
                { text: '2F', value: '2F', parentVal: 'S6' },
                { text: '3F', value: '3F', parentVal: 'S7' },
                { text: '4F', value: '4F', parentVal: 'S7' },
                { text: '1F', value: '1F', parentVal: 'Q1' },
                { text: '4F', value: '4F', parentVal: 'Q1' },
                { text: '5F', value: '5F', parentVal: 'Q2' },
                { text: '1F', value: '1F', parentVal: 'K1' },
                { text: '2F', value: '2F', parentVal: 'K1' },
                { text: '3F', value: '3F', parentVal: 'K1' }
            ]
        }
    ];
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
