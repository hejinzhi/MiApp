import { MyHttpService } from './../../../../../core/services/myHttp.service';
import { InspectionConfig } from './../config/inspection.config';
import { Injectable } from '@angular/core';


@Injectable()
export class InspectionService {

    constructor(
        private myHttp: MyHttpService
    ) { }

    getNames(): Promise<any> {
        return this.myHttp.get(InspectionConfig.getNamesUrl);
    }

    getLines(): Promise<any> {
        return this.myHttp.get(InspectionConfig.getLinesUrl);
    }

    // getModules(line: string): Promise<any> {
    //     return this.myHttp.get(InspectionConfig.getChecklistUrl + `?LINE_NAME=${line}`);
    // }

    // getLines(): Promise<string[]> {
    //     return new Promise((resolve, reject) => {
    //         resolve(['S6-1F', 'S6-2F', 'S10-3F']);
    //     });
    // }

    getModules(line: string): Promise<string[]> {
        return new Promise((resolve, reject) => {
            if (line === 'S6-1F') {
                resolve(['SMT', 'BE', 'Offline']);
            } else if (line === 'S6-2F') {
                resolve(['Online', 'Offline']);
            }
            else if (line === 'S10-3F') {
                resolve(['Module1', 'Module2', 'Module3', 'Module4']);
            }
        });
    }

    getAllStations(line: string): Promise<string[]> {
        return new Promise((resolve, reject) => {

            if (line === 'S6-1F') {
                resolve(['外觀檢驗檢測', 'BGA站', 'RMA', '錫膏存放', '物料儲存/烘烤', '加工組', '清洗房', '激光蚀刻', '系統防病毒稽核']);
            } else if (line === 'S6-2F') {
                resolve(['站点A', '站点B', '站点C', '站点D', '站点E']);
            }
            else if (line === 'S10-3F') {
                resolve(['站点F', '站点G', '站点H', '站点I', '站点J']);
            }
        });
    }

    getStationsByModules(modules: string[]): Promise<string[]> {
        let result: string[] = [];
        if (modules.indexOf('SMT') > -1) {
            result = result.concat(['外觀檢驗檢測', 'BGA站', 'RMA']);
        }
        if (modules.indexOf('BE') > -1) {
            result = result.concat(['錫膏存放', '物料儲存/烘烤', '加工組', '清洗房', '激光蚀刻']);
        }

        if (modules.indexOf('Offline') > -1) {
            result = result.concat(['系統防病毒稽核']);
        }
        return new Promise((resolve, reject) => {
            resolve(result);
        });

    }

    getChecklistByStation(station: string): Promise<Checklist[]> {
        return new Promise((resolve, reject) => {
            resolve(this.mockChecklist);
        });
    }


    mockChecklist: Checklist[] = [
        {
            no: '1',
            desc: '操作員是否帶靜電環作業(靜電環是否每天進行測試)',
            priority: 'Major',
            type: 'checkbox',
            value: ''
        },
        {
            no: '2',
            desc: '所有文件是否合法(臨時手寫指導書須有簽名及日期,使用不超過48小時)',
            priority: 'Minor',
            type: 'input',
            value: ''
        },
        {
            no: '3',
            desc: '作業員是否經過上崗培訓,且理解并按指導書進行作業;是否有做員工自我檢查表.',
            priority: 'Major',
            type: 'checkbox',
            value: ''
        },
        {
            no: '4',
            desc: '是否每個工作站的靜電皮均接地,作業員是否佩戴靜電環(靜電環/人體綜合靜電測試是否每天進行測試)',
            priority: 'Major',
            type: 'checkbox',
            value: ''
        },
        {
            no: '5',
            desc: '拿板方式是否符合要求',
            priority: 'Major',
            type: 'checkbox',
            value: ''
        },
        {
            no: '6',
            desc: '工作台面及設備接地是否良好.',
            priority: 'Major',
            type: 'checkbox',
            value: ''
        },
        {
            no: '7',
            desc: '烙鐵是否定期校驗,溫度設定与文件是否相符',
            priority: 'Major',
            type: 'checkbox',
            value: ''
        },
        {
            no: '8',
            desc: '所有的化學品是否有標示(易燃/有毒……)并且是否在有效期內',
            priority: 'Major',
            type: 'checkbox',
            value: ''
        },
        {
            no: '9',
            desc: '維修后產品是否有進行清洁并在放大鏡進行目視檢查',
            priority: 'Minor',
            type: 'checkbox',
            value: ''
        },
        {
            no: '10',
            desc: '維修工位的光線是否充足且是否定時量測大於1000LUX。如有客戶特殊要求就按客戶要求執行',
            priority: 'Minor',
            type: 'input',
            value: ''
        }
    ]



}

export class Checklist {
    no: string;
    desc: string;
    priority: string;
    type: string;
    value: any;
}