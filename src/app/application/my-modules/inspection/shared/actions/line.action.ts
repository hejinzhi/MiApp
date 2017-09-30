import { Action } from '@ngrx/store';
import { BossReportLineState } from "./../../boss/shared/store";

export const LINES_UPDATE = '[Lines] update';

export const LINES_CHECK = '[Lines] check';

export const LINES_DELETE = '[Lines] delete';

export class Lines_Check implements Action {
    readonly type = LINES_CHECK;
    payload: BossReportLineState[]
    constructor(issues: BossReportLineState[]) {
        this.payload = issues;
    }
}

export class Lines_Update implements Action {
    readonly type = LINES_UPDATE;
    payload: BossReportLineState
    constructor(issue: BossReportLineState) {
        this.payload = issue;
    }
}

export class Lines_Delete implements Action {
    readonly type = LINES_DELETE;
    payload: BossReportLineState
    constructor(issue: BossReportLineState) {
        this.payload = issue;
    }
}

export type LineActions = Lines_Check | Lines_Update | Lines_Delete;