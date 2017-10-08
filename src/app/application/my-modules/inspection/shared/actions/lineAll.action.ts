import { Action } from '@ngrx/store';
import { BossReportLineState } from "./../../boss/shared/store";

export const LINES_ALL_UPDATE = '[Lines all] update';

export const LINES_ALL_SEARCH = '[Lines all] search';

export class Lines_All_Search implements Action {
    readonly type = LINES_ALL_SEARCH;
    payload: BossReportLineState[];
    constructor(lines: BossReportLineState[]) {
        this.payload = lines;
    }
}

export class Lines_All_Update implements Action {
    readonly type = LINES_ALL_UPDATE;
    payload: BossReportLineState;
    constructor(line: BossReportLineState) {
        this.payload = line;
    }
}

export type LineAllActions = Lines_All_Search | Lines_All_Update;