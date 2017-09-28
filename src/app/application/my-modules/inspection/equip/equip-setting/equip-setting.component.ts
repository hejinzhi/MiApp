import { async } from '@angular/core/testing';
import { PluginService } from './../../../../../core/services/plugin.service';
import { InspectionCommonService } from './../../shared/service/inspectionCommon.service';
import { NavController, IonicPage, AlertController } from 'ionic-angular';
import { Observable, Observer } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { EquipService, Machine } from '../shared/service/equip.service';

@IonicPage()
@Component({
    selector: 'sg-equip-setting',
    templateUrl: 'equip-setting.component.html'
})
export class EquipSettingComponent implements OnInit {

    formModel: FormGroup;

    machine: Machine;

    locations: any[] = [];
    mrinamelist: any[];

    selectMaxYear = +moment(new Date()).format('YYYY') + 10;

    translateTexts: any = {
        'inspection.ipqa.stationTitle': '',
        'inspection.ipqa.module': ''
    }; // 记录转换后的文本(简繁体)

    constructor(
        private navCtrl: NavController,
        private translate: TranslateService,
        private equipService: EquipService,
        private inspectionCommonService: InspectionCommonService,
        private alertCtrl: AlertController,
        private plugin: PluginService,
    ) {


    }

    async ngOnInit() {


        this.machine = new Machine(0, '', '', '', 1, '', '', '', '', moment(new Date()).format('YYYY-MM'), '', '', '', '');
        this.locations = this.equipService.locations;

        let res = await this.inspectionCommonService.getMriName('equip');
        this.mrinamelist = res.json();

        this.init(this.machine);
        this.subscribeTranslateText();
    }

    init(work: any = {}) {
        let fb = new FormBuilder();

        this.formModel = fb.group(
            {
                machine_id: [work.machine_id],
                machine_no: [work.machine_no, [Validators.required]],
                company_name: [localStorage.getItem('appCompanyId')],
                description: [work.description, [Validators.required]],
                quantity: [work.quantity, [Validators.required]],
                location1: [work.location1, [Validators.required]],
                location4: [work.location4, [Validators.required]],
                production_date: [work.production_date, [Validators.required]],
                effective_date: [work.effective_date],
                owner_empno: [work.owner_empno, [Validators.required]],
                name_id: [work.name_id, [Validators.required]],
                disable_date: [work.disable_date]
            });

    }

    subscribeTranslateText() {
        this.translate.get(['attendance.cancle', 'attendance.confirm',
            'reset_title', 'new_title', 'submit_success'
        ]).subscribe((res) => {
            this.translateTexts = res;
        })
    }

    showdetail() {
        console.log(this.formModel.value);
    }

    reSet(machineid: number) {
        let title;
        if (machineid == 0) {
             title = this.translateTexts['reset_title'];
        } else {
             title = this.translateTexts['new_title'];
        }

        let confirm = this.alertCtrl.create({
            title: title,
            buttons: [
                {
                    text: this.translateTexts['attendance.cancle'],
                    handler: () => {
                    }
                },
                {
                    text: this.translateTexts['attendance.confirm'],
                    handler: () => {
                        this.init(this.machine);
                    }
                }
            ]
        });
        confirm.present();
    }

    async  saveForm() {

        console.log(this.formModel.value);
        let sendDate = {
            "MACHINE_ID": this.formModel.value.machine_id,
            "MACHINE_NO": this.formModel.value.machine_no,
            "COMPANY_NAME": this.formModel.value.company_name,
            "DESCRIPTION": this.formModel.value.description,
            "QUANTITY": this.formModel.value.quantity,
            "LOCATION1": this.formModel.value.location1.split('_')[0],
            "LOCATION2": this.formModel.value.location1.split('_')[1],
            "LOCATION3": this.formModel.value.location1.split('_')[2],
            "LOCATION4": this.formModel.value.location4,
            "PRODUCTION_DATE": this.formModel.value.production_date,
            "EFFECTIVE_DATE": this.formModel.value.effective_date,
            "OWNER_EMPNO": this.formModel.value.owner_empno.split(',')[0],
            "NAME_ID": this.formModel.value.name_id,
            "DISABLE_DATE": this.formModel.value.disable_date
        }

        let test = {
            "MACHINE_ID": 0,
            "MACHINE_NO": "123",
            "COMPANY_NAME": "MSL",
            "DESCRIPTION": "456",
            "QUANTITY": 1,
            "LOCATION1": "廠區",
            "LOCATION2": "S6",
            "LOCATION3": "1F",
            "LOCATION4": "test",
            "PRODUCTION_DATE": "2017-09",
            "EFFECTIVE_DATE": "2027-01",
            "OWNER_EMPNO": "FE716",
            "NAME_ID": 5,
            "DISABLE_DATE": "2017-01-01"
        }



        console.log(JSON.stringify(sendDate));

        let loading = this.plugin.createLoading();
        loading.present();
        let res: any = await this.equipService.saveMachine(sendDate);
        loading.dismiss();
        console.log(res.content, 422);

        if (!res.status) {
            // this.errTip = res.content;
        } else {
            this.plugin.showToast(this.translateTexts['submit_success']);
            this.formModel.patchValue({
                machine_id: res.content.MACHINE_ID
            })
        };
    }

}

