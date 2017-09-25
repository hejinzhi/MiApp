export class ReportHeader {
    HEADER_ID: number;
    COMPANY_NAME: string;
    SCHEDULE_HEADER_ID?: number;
    SCHEDULE_NAME?: string;
    TYPE: string;
    INSPECTOR: string;
    INSPECT_DATE: string; // 日期传递过来的应该是这样格式的字符串 2019-09-01
    DUTY_KIND?: string;
    SCORE?: string;
    CREATION_DATE?: string;
    CREATED_BY?: string;
    LAST_UPDATE_DATE?: string;
    LAST_UPDATED_BY?: string;
    LAST_UPDATE_LOGIN?: string;
}