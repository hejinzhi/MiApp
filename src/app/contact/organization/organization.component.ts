import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ContactService } from '../shared/service/contact.service';
import { ContactDetailComponent } from '../contact-detail/contact-detail.component';
import { EnvConfig } from '../../shared/config/env.config';

@Component({
    selector: 'sg-organization',
    templateUrl: 'organization.component.html'
})
export class OrganizationComponent implements OnInit {

    parentDept: any = {
        DEPTNO: null,
        DEPTNAME: null
    };   // 父部门
    companyList: Company[] = [];
    childrenDeptList: any[] = []; // 子部门列表
    deptIndex: number = 0; // 记录目前组织的深度，初始0
    deptHistory: any[] = []; // 记录被点击过的部门历史
    peopleInDept: any[] = []; // 记录在这个部门内的人
    showPeople: boolean; // 是否显示人员信息
    site: string;//记录时哪个公司

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public contactService: ContactService
    ) { }

    async ngOnInit() {

        this.site = EnvConfig.companyID;
        this.parentDept = {
            DEPTNO: 'MITAC',
            DEPTNAME: '神達集團'
        };
        this.deptHistory.push(this.parentDept);

        let res = await this.contactService.getOrg();
        let companys: any[] = res.json();
        this.companyList = companys;
        this.addThreeCompanys();

    }

    addThreeCompanys() {
        let hardCodeCompanys: Company[] = [
            {
                COMPANY_ID: 'MSL',
                COMPANY_NAME: '佛山市順德區順達電腦廠有限公司',
                TOP_DEPTNO: '00000289',
                TOP_DEPTNAME: 'MSL 總公司董事長室'
            },
            {
                COMPANY_ID: 'MIC',
                COMPANY_NAME: '神達電腦股份有限公司',
                TOP_DEPTNO: '2S00000',
                TOP_DEPTNAME: '董事長室(S)'
            },
            {
                COMPANY_ID: 'MKL',
                COMPANY_NAME: '昆達電腦科技（昆山）有限公司',
                TOP_DEPTNO: '1000001',
                TOP_DEPTNAME: 'MKL總公司董事長'
            }
        ]
        for (let i = 0; i < hardCodeCompanys.length; i++) {
            let flag = true;
            for (let j = 0; j < this.companyList.length; j++) {
                if (hardCodeCompanys[i].COMPANY_ID === this.companyList[j].COMPANY_ID) {
                    flag = false;
                }
            }
            if (flag) {
                this.companyList.push(hardCodeCompanys[i]);
            }
        }
    }

    async viewCompanyTopDept(company: Company) {
        let dept = {
            DEPTNO: company.TOP_DEPTNO,
            DEPTNAME: company.TOP_DEPTNAME
        }
        this.site = company.COMPANY_ID;
        await this.viewChildDept(dept);
    }

    async viewChildDept(dept: any) {
        this.deptHistory.push(dept);
        this.parentDept = dept;
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
        console.log(this.parentDept);
        if (this.parentDept.DEPTNO === 'MITAC') {
            this.childrenDeptList = [];
        } else {
            let childRes = await this.contactService.getChildDeptInfo(this.site, this.parentDept.DEPTNO);
            let childResult = childRes.json();
            this.childrenDeptList = childResult;
        }
        this.showPeople = false;
        this.deptHistory.pop();
    }
}


class Company {
    COMPANY_ID: string;
    COMPANY_NAME: string;
    TOP_DEPTNAME: string;
    TOP_DEPTNO: string
}