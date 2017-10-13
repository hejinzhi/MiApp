import { EnvConfig } from './../../../../../../shared/config/env.config';

// let baseUrl: string = 'http://10.86.13.20:3000/';

export class EquipConfig {
    // static getNamesUrl = EnvConfig.baseUrl + 'name';

    static UploadMachineUrl = EnvConfig.baseUrl + 'IPQA/UploadMachineHdr';
    
    static getMachineListUrl = EnvConfig.baseUrl + 'IPQA/GetMachineList';
     
    static deleteMachineUrl = EnvConfig.baseUrl + 'IPQA/DeleteMachineHdr';

    static getMachineScheduleUrl = EnvConfig.baseUrl + 'IPQA/GetMachineSchedule';

    static setMachineScheduleUrl = EnvConfig.baseUrl + 'IPQA/SetMachineSchedule';
}