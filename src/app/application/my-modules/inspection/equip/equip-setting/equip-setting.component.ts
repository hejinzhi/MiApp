import { NavController, IonicPage } from 'ionic-angular';
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

    selectMaxYear = +moment(new Date()).format('YYYY') + 10;

    translateTexts: any = {
        'inspection.ipqa.stationTitle': '',
        'inspection.ipqa.module': ''
    }; // 记录转换后的文本(简繁体)

    constructor(
        private navCtrl: NavController,
        private translate: TranslateService,
        private equipService: EquipService
    ) {


    }

    async ngOnInit() {


        this.machine = new Machine(0,'','','', 1, '', '', '', '', moment(new Date()).format('YYYY-MM'), '', '', '', '');
        this.locations = this.equipService.locations;

        this.init(this.machine );


    }

    init(work: any = {}){
        let fb = new FormBuilder();

        this.formModel = fb.group(
            {   
                machine_id: [work.machine_id],
                machine_no: [this.machine.machine_no, [Validators.required]],
                company_name:[localStorage.getItem('appCompanyId')],
                description: [this.machine.description, [Validators.required]],
                quantity: [this.machine.quantity, [Validators.required]],
                location1: [this.machine.location1, [Validators.required]],
                location4: [this.machine.location4, [Validators.required]],
                production_date: [this.machine.production_date, [Validators.required]],
                effective_date: [this.machine.effective_date],
                owner_empno: [this.machine.owner_empno, [Validators.required]],
                name_id: [this.machine.name_id, [Validators.required]],
                disable_date: [this.machine.disable_date]
            });

    }

    showdetail() {
        console.log(this.formModel.value);
    }



}

