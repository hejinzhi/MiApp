import { Action } from '@ngrx/store';
import { BossReportLineState } from "./../../boss/shared/store";

export const LINES_ALL_EQUIP_UPDATE = '[Lines all equip] update';

export const LINES_ALL_EQUIP_SEARCH = '[Lines all equip] search';

export class Lines_All_Equip_Search implements Action {
    readonly type = LINES_ALL_EQUIP_SEARCH;
    payload: BossReportLineState[];
    constructor(lines: BossReportLineState[]) {
        this.payload = lines;
    }
}

export class Lines_All_Equip_Update implements Action {
    readonly type = LINES_ALL_EQUIP_UPDATE;
    payload: BossReportLineState;
    constructor(line: BossReportLineState) {
        this.payload = line;
    }
}

export type LineAllEquipActions = Lines_All_Equip_Search | Lines_All_Equip_Update;