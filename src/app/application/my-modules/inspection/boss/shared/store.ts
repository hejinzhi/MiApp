import * as moment from 'moment'

export interface BossReportState {
    Header:BossReportHeader;
    Lines:BossReportLine[]
}

interface BossReportHeader {
    HEADER_ID:string;
    SCHEDULE_HEADER_ID:string;
    COMPANY_NAME:string;
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
        this.Header = {} as BossReportHeader;
        this.Header.HEADER_ID =  data.REPORT_ID;
        this.Header.INSPECT_DATE = data.date;
        this.Header.SCHEDULE_HEADER_ID = data.SCHEDULE_HEADER_ID;
        this.Header.SCORE = data.totalMark;
        this.Header.COMPANY_NAME = localStorage.getItem('appCompanyId');
        this.Lines = [];
        data.lists.forEach((el:any) => {
            let line = {} as BossReportLine;
            line.INSPECT_TIME = el.time;
            line.LOCATION = el.site;
            line.PROBLEM_FLAG = el.hasIssue?'Y':'N';
            line.PROBLEM_STATUS = el.PROBLEM_STATUS;
            if(el.hasIssue) {
                line.PROBLEM_DESC = el.detail;
                line.PROBLEM_PICTURES = el.imgs;
                line.OWNER_EMPNO = el.inCharge;
            }
            this.Lines.push(line);
        });
    }
}

export class BossReportInsideModel {
    date: string;
    people: string;
    issueCount: string;
    lists: {time:string,site:string,hasIssue:boolean,detail:string,imgs:string[],inCharge:string}[]
    constructor(data:BossReportState) {
        this.date = moment(data.Header.INSPECT_DATE).format('YYYY-MM-DD');
        this.people = data.Header.INSPECTOR;
        this.lists = [];
        data.Lines.forEach((li) => {
            let list:any = {};
            list.time = li.INSPECT_TIME;
            list.hasIssue = li.PROBLEM_FLAG === 'Y'?true:false;
            if(list.hasIssue) {
                list.detail = li.PROBLEM_DESC;
                list.imgs = li.PROBLEM_PICTURES;
                list.inCharge = li.OWNER_EMPNO;
            }
            this.lists.push(list);
        })
    }
}
