// import { EnvConfig } from './../../../../../shared/config/env.config';
let baseUrl: string = 'http://10.86.13.20:3000/';

export class InspectionConfig {
    static getNamesUrl = baseUrl + 'name';

    static getLinesUrl = baseUrl + 'lines';

    static getModulesUrl = baseUrl + 'category';

    static getChecklistUrl = baseUrl + 'checklist';
}