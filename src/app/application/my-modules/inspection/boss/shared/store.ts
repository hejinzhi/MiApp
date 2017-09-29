import { EnvConfig } from './../../../../../shared/config/env.config';
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
    TYPE: string;
}

interface BossReportLine {
    HEADER_ID:string;
    INSPECT_DATE:string;
    INSPECT_TIME:string;
    LOCATION:string;
    LINE_ID:string;
    PROBLEM_FLAG:'Y' | 'N' |'';
    PROBLEM_DESC:string;
    PROBLEM_PICTURES:string;
    PROBLEM_STATUS: 'New' | 'Waiting' | 'Done' | 'Close' | 'Highlight';
    OWNER_EMPNO:string;
    SCORE:string;
    COMPANY_NAME:string
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
        this.Header.TYPE = 'boss';
        this.Lines = [];
        data.lists.forEach((el:any) => {
            let line = {} as BossReportLine;
            line.COMPANY_NAME = this.Header.COMPANY_NAME;
            line.HEADER_ID = this.Header.HEADER_ID;
            line.INSPECT_DATE = this.Header.INSPECT_DATE;
            line.INSPECT_TIME = el.time;
            line.LOCATION = el.site;
            line.PROBLEM_FLAG = el.hasIssue?'Y':'N';
            line.PROBLEM_STATUS = el.PROBLEM_STATUS;
            line.LINE_ID = el.LINE_ID?el.LINE_ID:0;
            if(el.hasIssue) {
                line.PROBLEM_STATUS = data.PROBLEM_STATUS
                line.PROBLEM_PICTURES = el.imgs.join();
                line.PROBLEM_DESC = el.detail;
                line.OWNER_EMPNO = el.inCharge.split(',')[0];
            }
            this.Lines.push(line);
        }); 
        console.log(this);
        
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
            list.site = li.LOCATION;
            list.LINE_ID = li.LINE_ID;
            if(list.hasIssue) {
                list.detail = li.PROBLEM_DESC;
                list.imgs = li.PROBLEM_PICTURES?li.PROBLEM_PICTURES.split(',').map((image) => EnvConfig.baseUrl+image):[];
                list.inCharge = li.OWNER_EMPNO;
            }
            this.lists.push(list);
        })
    }
}
