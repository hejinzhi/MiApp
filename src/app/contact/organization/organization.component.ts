import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ContactService } from '../shared/service/contact.service';
import { ContactDetailComponent } from '../contact-detail/contact-detail.component';
import { EnvConfig } from '../../shared/config/env.config';
import { LanguageConfig } from '../shared/config/language.config';

@Component({
    selector: 'sg-organization',
    templateUrl: 'organization.component.html'
})
export class OrganizationComponent implements OnInit {

    parentDept: any = {
        DEPTNO: null,
        DEPTNAME: null
    };   // 父部门
    childrenDeptList: any[] = []; // 子部门列表
    deptIndex: number = 1; // 记录目前组织的深度，初始1
    deptHistory: any[] = []; // 记录被点击过的部门历史
    peopleInDept: any[] = []; // 记录在这个部门内的人
    showPeople: boolean; // 是否显示人员信息
    site: string;//记录时哪个公司


    ORG = [
        {
            DEPTNO: 'MIC',
            DEPTNAME: '神達電腦'
        },
        {
            DEPTNO: 'MSL',
            DEPTNAME: '順達電腦'
        },
        {
            DEPTNO: 'MKL',
            DEPTNAME: '昆達電腦'
        }
    ];
    MSL_TOP_DEPTNO = '00000289';
    MIC_TOP_DEPTNO = '2S00000';
    MKL_TOP_DEPTNO = '1000001';


    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public contactService: ContactService
    ) { }

    async ngOnInit() {
        // let res = await this.contactService.getDeptInfoByGrade(EnvConfig.companyID, EnvConfig.maxGrade);
        // let result = res.json();
        // if (result.length > 0) {
        //     this.parentDept = result[0];
        //     this.deptHistory.push(result[0]);
        // } else {
        //     this.parentDept = {
        //         DEPTNO: null,
        //         DEPTNAME: ''
        //     };
        // }

        // let childRes = await this.contactService.getChildDeptInfo(EnvConfig.companyID, this.parentDept.DEPTNO);
        // let childResult = childRes.json();
        // this.childrenDeptList = childResult;
        this.site = EnvConfig.companyID;
        this.parentDept = {
            DEPTNO: 'MITAC',
            DEPTNAME: '神達集團'
        };
        this.deptHistory.push(this.parentDept);
        this.childrenDeptList = this.ORG;
    }

    async viewChildDept(dept: any) {
        this.deptIndex++;
        this.deptHistory.push(dept);
        this.parentDept = dept;
        if (this.parentDept.DEPTNO === 'MSL') {
            this.parentDept.DEPTNO = this.MSL_TOP_DEPTNO;
            this.site = 'MSL';
        }
        else if (this.parentDept.DEPTNO === 'MIC') {
            this.parentDept.DEPTNO = this.MIC_TOP_DEPTNO;
            this.site = 'MIC';
        }
        else if (this.parentDept.DEPTNO === 'MKL') {
            this.parentDept.DEPTNO = this.MKL_TOP_DEPTNO;
            this.site = 'MKL';
        }
        let childRes = await this.contactService.getChildDeptInfo(this.site, this.parentDept.DEPTNO);
        let childResult = childRes.json();
        if (childResult.length > 0) {
            this.childrenDeptList = childResult;
            this.showPeople = false;
        } else {
            let personRes = await this.contactService.getPersonByDept(this.site, dept.DEPTNO);
            let deptPersons = personRes.json();
            this.peopleInDept = deptPersons;
            this.showPeople = true;
        }

    }

    goToDetailPage(event: any) {
        this.navCtrl.push(ContactDetailComponent, { data: event });
        this.contactService.writeViewHistory(event);
    }

    async goBack() {
        let length = this.deptHistory.length;
        this.parentDept = this.deptHistory[length - 2];
        if (this.parentDept.DEPTNO === 'MITAC') {
            this.childrenDeptList = this.ORG;
        } else {
            let childRes = await this.contactService.getChildDeptInfo(this.site, this.parentDept.DEPTNO);
            let childResult = childRes.json();
            this.childrenDeptList = childResult;
        }
        this.showPeople = false;
        this.deptHistory.pop();

    }
}


