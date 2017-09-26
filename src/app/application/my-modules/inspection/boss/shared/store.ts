export interface BossReportState {
    Header:BossReportHeader;
    Lines:BossReportLine[]
}

interface BossReportHeader {
    HEADER_ID:string;
    SCHEDULE_HEADER_ID:string;
    INSPECTOR:string;
    INSPECT_DATE:string;
    SCORE:string;
}

interface BossReportLine {
    INSPECT_TIME:string;
    LOCATION:string;
    PROBLEM_FLAG:'Y' | 'N' |'';
    PROBLEM_DESC:string;
    PROBLEM_PICTURES:string[];
    PROBLEM_STATUS: 1|2|3|4|5|'';
    OWNER_EMPNO:string;
    SCORE:string;
}

export class BossReportModel implements BossReportState {
    Header:BossReportHeader;
    Lines:BossReportLine[];
    constructor(data:any) {
        this.Header.HEADER_ID =  data.HEADER_ID;
        this.Header.INSPECT_DATE = data.date;
        this.Header.SCHEDULE_HEADER_ID = data.SCHEDULE_HEADER_ID;
        this.Header.SCORE = data.totalMark;
        data.lists.forEach((el:any) => {
            let line = {} as BossReportLine;
            line.INSPECT_TIME = el.time;
            line.LOCATION = el.site;
            line.PROBLEM_FLAG = el.hasIssue;
            line.PROBLEM_STATUS = el.PROBLEM_STATUS;
            if(el.hasIssue) {
                line.PROBLEM_DESC = el.detail;
                line.PROBLEM_PICTURES = el.imgs;
                line.OWNER_EMPNO = el.inCharge;
            }
        });
    }
}