// import { EnvConfig } from './../../../../../shared/config/env.config';
let baseUrl: string = 'http://localhost:3000/';

export class InspectionConfig {
    static getNamesUrl = baseUrl + 'name';

    static getLinesUrl = baseUrl + 'lines';

    static getModulesUrl = baseUrl + 'category';

    static getChecklistUrl = baseUrl + 'checklist';
}