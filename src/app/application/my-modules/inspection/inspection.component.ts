import { EquipService } from './equip/shared/service/equip.service';
import { User_Update_Privilege } from './../../../shared/actions/user.action';
import { MyStore } from './../../../shared/store';
import { Store } from '@ngrx/store';
import { BossService } from './boss/shared/service/boss.service';
import { Observable } from 'rxjs/Rx';
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

    bossTips:Observable<number>;
    equipTips:Observable<number>;
    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private inspectionCommonService: InspectionCommonService,
        private bossService: BossService,
        private equipService: EquipService,
        private $store: Store<MyStore>
    ) { }

    privilegeList: { FUNCTION_ID: string, FUNCTION_NAME: string, FUNCTION_URL: string, ROLE_ID: number, ROLE_NAME: string }[];

    async ngOnInit() {
        this.bossTips = this.bossService.ObserveAllTips();
        this.equipTips = this.equipService.ObserveAllTips();
        let moduleID = this.navParams.get('moduleID');
        let res = await this.inspectionCommonService.getPrivilege(moduleID);
        this.privilegeList = res.json();
        this.$store.dispatch(new User_Update_Privilege({ moduleID: moduleID, function: this.privilegeList }));
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
        if (this.privilegeList && this.privilegeList.length > 0) {
            for (let i = 0; i < this.privilegeList.length; i++) {
                if (this.privilegeList[i].FUNCTION_NAME === type) {
                    return true;
                }
            }
        }
        return false;
    }

    getPrivilegeRoleId(type: string) {
        let target: { ROLE_ID: number, ROLE_NAME: string } = { ROLE_ID: 0, ROLE_NAME: '' };
        if (this.privilegeList && this.privilegeList.length > 0) {
            let pri = ['INSPECT_IPQA_ADMIN', 'INSPECT_IPQA_LEADER', 'INSPECT_IPQA_COMMON'];
            let index: number = -1;
            let done: boolean = false;
            for (let i = 0; i < pri.length; i++) {
                for (let j = 0; j < this.privilegeList.length; j++) {
                    if (this.privilegeList[j].ROLE_NAME === pri[i]) {
                        target.ROLE_ID = this.privilegeList[j].ROLE_ID;
                        target.ROLE_NAME = this.privilegeList[j].ROLE_NAME;
                        done = true;
                        break;
                    }
                }
                if (done) {
                    break;
                }
            }
        }
        return target;
    }

    goToIPQA() {
        this.navCtrl.push('MenuComponent', { privilege: this.privilegeList, role: this.getPrivilegeRoleId('IPQA') });
    }
    goToEuqip() {
        this.navCtrl.push('EquipComponent');
    }

    goToBoss() {
        this.navCtrl.push('BossMenuComponent')
    }
}


