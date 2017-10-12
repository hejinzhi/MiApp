import { UserState } from './models/user.model';
import { BossReportLineState } from "./../application/my-modules/inspection/boss/shared/store";
export interface MyStore {
    userReducer:UserState;
    lineReducer: BossReportLineState[];
    lineAllReducer: BossReportLineState[];
}