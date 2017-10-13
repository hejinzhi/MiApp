import { BossReportLineState } from './../../boss/shared/store';
export interface Query {
    nameID:number;
    dateFM:string;
    dateTO:string
}

export interface Lines {
    type:string;
    lines:BossReportLineState[]
}