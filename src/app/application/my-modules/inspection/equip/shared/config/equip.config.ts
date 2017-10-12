import { EnvConfig } from './../../../../../../shared/config/env.config';

// let baseUrl: string = 'http://10.86.13.20:3000/';

export class EquipConfig {
    // static getNamesUrl = EnvConfig.baseUrl + 'name';

    static type:string = 'equip';
    static UploadMachineUrl = EnvConfig.baseUrl + 'IPQA/UploadMachineHdr';
    
    static getMachineListUrl = EnvConfig.baseUrl + 'IPQA/GetMachineList';
     
    static deleteMachineUrl = EnvConfig.baseUrl + 'IPQA/DeleteMachineHdr';

    /**
     * url
     * get
     * 2017-10-11
     * @param {string} {machineNO} 设备编号
     * @static
     */
    static getMachineCheckList = EnvConfig.baseUrl + 'IPQA/GetMachineCheckList?machineNO={machineNO}';
    
}