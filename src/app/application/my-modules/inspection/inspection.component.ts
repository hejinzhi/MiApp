import { InspectionCommonService } from './shared/service/inspectionCommon.service';
import { InspectionService } from './ipqa/shared/service/inspection.service';
import { IpqaComponent } from './ipqa/ipqa.component';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';



@IonicPage()
@Component({
    selector: 'sg-inspection',
    templateUrl: 'inspection.component.html'
})
export class InspectionComponent implements OnInit {
    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private inspectionCommonService: InspectionCommonService
    ) { }

    privilegeList: { ROLE_ID: number, ROLE_NAME: string, FUNCTION_ID: number, FUNCTION_NAME: string, FUNCTION_URL: string }[] = [];

    async ngOnInit() {
        let moduleID = this.navParams.get('moduleID');
        let res = await this.inspectionCommonService.getPrivilege(moduleID);
        this.privilegeList = res.json();
    }

    canSeeIPQA() {
        return this.hasPrivilege('IPQA');
    }

    canSeeBoss() {
        return this.hasPrivilege('BOSS');
    }

    canSeeEquip() {
        return this.hasPrivilege('EQUIP');
    }

    hasPrivilege(type: string) {
        if (this.privilegeList) {
            for (let i = 0; i < this.privilegeList.length; i++) {
                if (this.privilegeList[i].FUNCTION_NAME === type) {
                    return true;
                }
            }
        }
        return false;
    }

    goToIPQA() {
        this.navCtrl.push('MenuComponent', { privilege: this.privilegeList });
    }
    goToEuqip() {
        this.navCtrl.push('EquipComponent');
    }

    goToBoss() {
        this.navCtrl.push('BossMenuComponent')
    }
}