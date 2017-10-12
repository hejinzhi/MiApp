import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

@IonicPage()
@Component({
    selector: 'sg-menu',
    templateUrl: 'menu.component.html'
})
export class MenuComponent implements OnInit {
    translateTexts: any = {
        'inspection.ipqa.assignOwner': '',
        'inspection.ipqa.handleProblem': ''
    }; // 记录转换后的文本(简繁体)
    privilegeList: { FUNCTION_ID: string, FUNCTION_NAME: string, FUNCTION_URL: string, ROLE_ID: number, ROLE_NAME: string }[];
    role: { ROLE_ID: number, ROLE_NAME: string };
    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private translate: TranslateService
    ) { }

    async ngOnInit() {
        this.privilegeList = this.navParams.get('privilege');
        this.role = this.navParams.get('role');

        this.privilegeList = this.privilegeList.filter((value, index) => {
            return value.ROLE_ID === this.role.ROLE_ID;
        });

        this.translateTexts = await this.translate.get(['inspection.ipqa.assignOwner', 'inspection.ipqa.handleProblem']).toPromise();
    }

    goToReportPage() {
        this.navCtrl.push('IpqaComponent');
    }

    goToTeamLeader() {
        this.navCtrl.push('ListComponent', { fromPage: 'teamLeader', title: this.translateTexts['inspection.ipqa.assignOwner'] })
    }

    goToTeamHandler() {
        this.navCtrl.push('ListComponent', { fromPage: 'handler', title: this.translateTexts['inspection.ipqa.handleProblem'], roleName: this.role.ROLE_NAME })
    }

    goToAllProblems() {
        this.navCtrl.push('AllProblemsComponent', { title: this.translateTexts['inspection.ipqa.handleProblem'] });
    }

    hasPrivilege(type: string) {
        let result: boolean = false;
        if (this.privilegeList && this.privilegeList.length > 0 && this.role.ROLE_ID > 0) {
            for (let i = 0; i < this.privilegeList.length; i++) {
                if (this.privilegeList[i].FUNCTION_URL === type) {
                    result = true;
                    break;
                }
            }
        }
        return result;
    }


}