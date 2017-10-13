import { Action } from '@ngrx/store';
import { BossReportLineState } from "./../../boss/shared/store";

export const LINES_EQUIP_UPDATE = '[Lines equip] update';

export const LINES_EQUIP_CHECK = '[Lines equip] check';

export const LINES_EQUIP_DELETE = '[Lines equip] delete';

export class Lines_Equip_Check implements Action {
    readonly type = LINES_EQUIP_CHECK;
    payload: BossReportLineState[]
    constructor(issues: BossReportLineState[]) {
        this.payload = issues;
    }
}

export class Lines_Equip_Update implements Action {
    readonly type = LINES_EQUIP_UPDATE;
    payload: BossReportLineState
    constructor(issue: BossReportLineState) {
        this.payload = issue;
    }
}

export class Lines_Equip_Delete implements Action {
    readonly type = LINES_EQUIP_DELETE;
    payload: BossReportLineState
    constructor(issue: BossReportLineState) {
        this.payload = issue;
    }
}

export type LineActions = Lines_Equip_Check | Lines_Equip_Update | Lines_Equip_Delete;