export class ReportLine {
    HEADER_ID: number; // 上面生成的header id
    COMPANY_NAME: string;
    LINE_ID: number; //当这个栏位为0时，执行insert操作。如果有值，执行update 操作
    LINE_NUM?: string;
    INSPECT_DATE: string;
    INSPECT_TIME?: string;
    LOCATION?: string;
    CHECK_ID?: number;
    CHECK_LIST_CN?: string;
    CHECK_LIST_EN?: string;
    CHECK_RESULT?: string;
    PROBLEM_FLAG?: string;
    PROBLEM_DESC?: string;
    PROBLEM_PICTURES?: [string];
    PROBLEM_STATUS?: string;
    OWNER_EMPNO?: string;
    OWNER_DEPTNO?: string;
    ACTION_DESC?: string;
    ACTION_DATE?: string;
    ACTION_STATUS?: string;
    ACTION_PICTURES?: [string];
    SCORE?: string;
    CREATION_DATE?: string;
    CREATED_BY?: string;
    LAST_UPDATE_DATE?: string;
    LAST_UPDATED_BY?: string;
    LAST_UPDATE_LOGIN?: string;
}