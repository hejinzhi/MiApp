import { Injectable } from '@angular/core';

@Injectable()
export class InspectionService {

    constructor() { }

    getLines(): Promise<string[]> {
        return new Promise((resolve, reject) => {
            resolve(['S6-1F', 'S6-2F', 'S10-3F']);
        });
    }

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



}