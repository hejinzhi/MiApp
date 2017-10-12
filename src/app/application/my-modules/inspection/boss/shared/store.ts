import { EnvConfig } from './../../../../../shared/config/env.config';
import * as moment from 'moment'

export interface BossReportState {
    Header:BossReportHeader;
    Lines:BossReportLineState[]
}

export interface BossReportHeader {
    HEADER_ID:string;
    SCHEDULE_HEADER_ID:string;
    COMPANY_NAME:string;
    INSPECTOR:string;
    INSPECT_DATE:string;
    SCORE:string;
    TYPE: string;
    INSPECTOR_NAME?:string;
    MACHINE_ID?:string;
    MACHINE_NAME?:string
}

export interface BossReportLineState {
    HEADER_ID?:string;
    INSPECT_DATE?:string;
    INSPECT_TIME?:string;
    LOCATION?:string;
    LINE_ID?:string;
    PROBLEM_FLAG?:'Y' | 'N' |'';
    PROBLEM_DESC?:string;
    PROBLEM_PICTURES?:string;
    PROBLEM_STATUS?: 'New' | 'Waiting' | 'Done' | 'Close' | 'Highlight';
    OWNER_EMPNO?:string;
    SCORE?:string;
    COMPANY_NAME?:string;
    ACTION_DATE?:string;
    ACTION_DESC?:string;
    ACTION_PICTURES?:string;
    ACTION_STATUS?:string;
    CHECK_ID?:string;
    CHECK_LIST_CN?:string;
    CHECK_LIST_EN?:string;
    MACHINE_ID?:string;
    MACHINE_NAME?:string
}

export class BossReportModel implements BossReportState {
    Header:BossReportHeader;
    Lines:BossReportLineState[];
    constructor(data:any) {
        let doneMark:boolean = false;
        this.Header = {} as BossReportHeader;
        this.Header.HEADER_ID =  data.REPORT_ID;
        this.Header.INSPECT_DATE = data.date;
        this.Header.SCHEDULE_HEADER_ID = data.SCHEDULE_HEADER_ID;
        this.Header.COMPANY_NAME = localStorage.getItem('appCompanyId');
        this.Header.TYPE = 'boss';
        this.Header.INSPECTOR_NAME = data.people;
        this.Lines = [];
        data.lists.forEach((el:any) => {
            let line = {} as BossReportLineState;
            line.COMPANY_NAME = this.Header.COMPANY_NAME;
            line.HEADER_ID = this.Header.HEADER_ID;
            line.INSPECT_DATE = this.Header.INSPECT_DATE;
            line.INSPECT_TIME = el.time;
            line.LOCATION = el.site;
            line.SCORE = el.mark || '';
            doneMark = !!el.mark;
            line.PROBLEM_FLAG = el.hasIssue?'Y':'N';
            line.PROBLEM_STATUS = el.hasIssue?'Waiting':'Done';
            line.LINE_ID = el.LINE_ID?el.LINE_ID:0;
            if(el.hasIssue) {
                line.PROBLEM_PICTURES = el.imgs.map((i:string) => i.replace('data:image/jpeg;base64,','')).join();
                line.PROBLEM_DESC = el.detail;
                line.OWNER_EMPNO = el.inCharge.split(',')[0];
            }
            this.Lines.push(line);
        });
        if(doneMark) {
            this.Header.SCORE = data.totalMark;
        } 
        console.log(this);
    }
}

export class BossReportInsideModel {
    date: string;
    people: string;
    issueCount: string;
    totalMark?: string;
    lists: {time:string,site:string,hasIssue:boolean,detail:string,imgs:string[],inCharge:string,mark:string}[]
    constructor(data:BossReportState) {
        this.date = moment(data.Header.INSPECT_DATE).format('YYYY-MM-DD');
        this.people = data.Header.INSPECTOR_NAME;
        this.totalMark = data.Header.SCORE;
        this.lists = [];
        data.Lines.forEach((li) => {
            let list:any = {};
            list.time = li.INSPECT_TIME;
            list.hasIssue = li.PROBLEM_FLAG === 'Y'?true:false;
            list.site = li.LOCATION;
            list.LINE_ID = li.LINE_ID;
            list.mark = li.SCORE
            if(list.hasIssue) {
                list.detail = li.PROBLEM_DESC;
                list.imgs = li.PROBLEM_PICTURES?li.PROBLEM_PICTURES.split(',').map((image) => EnvConfig.baseUrl+image):[];
                list.inCharge = li.OWNER_EMPNO;
            }
            this.lists.push(list);
        })
    }
}
