import { InspectionService } from './../shared/service/inspection.service';
import { CommonService } from './../../../../../core/services/common.service';
import { UserModel } from './../../../../../shared/models/user.model';
import { NavParams, ViewController, IonicPage } from 'ionic-angular';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
    selector: 'sg-exception-detail',
    templateUrl: 'exception-detail.component.html'
})
export class ExceptionDetailComponent implements OnInit {

    private fb: FormBuilder = new FormBuilder();
    formModel: FormGroup;
    line: string; //线别
    station: string;//站点
    checklist: any;
    localUser: UserModel;//当前登录人
    fromPage: string;// 获取是从哪个页面转跳过来的。“问题追踪”不显示处理人栏位，而“指派处理人”则显示
    translateText = {
        day: '',
        night: ''
    };
    options: any = {
        placeholder: '请输入工号/姓名/AD'
    };
    constructor(
        private navParams: NavParams,
        private viewCtrl: ViewController,
        private commonService: CommonService,
        private inspectionService: InspectionService,
        private translate: TranslateService
    ) {

    }

    async ngOnInit() {
        this.translate.get(['inspection.ipqa.day', 'inspection.ipqa.night']).subscribe((res) => {
            this.translateText.day = res['inspection.ipqa.day'];
            this.translateText.night = res['inspection.ipqa.night'];
        });

        // 获取是从哪个页面转跳过来的。“问题追踪”不显示处理人栏位(checklist)，而“指派处理人”则显示(teamLeader)
        this.fromPage = this.navParams.get('fromPage');
        this.localUser = JSON.parse(localStorage.getItem('currentUser'));
        this.createFormMode();


    }

    async createFormMode() {
        if (this.fromPage === 'checklist') {
            let user = this.localUser.empno + ',' + this.localUser.nickname + ',' + this.localUser.username;
            this.formModel = this.fb.group({
                checkDate: [this.commonService.getToday(), Validators.required],
                checkPerson: [user, Validators.required],
                banbie: ['白班', Validators.required],
                address: ['', Validators.required],
                checklist_cn: ['', Validators.required],
                exceptionDesc: ['', Validators.required],
                pictures: this.fb.array([])
            });
            // 获取线别
            this.line = this.navParams.get('line');
            this.station = this.navParams.get('station');
            let address = this.formModel.get('address') as FormControl;
            address.setValue(this.line + ' -- ' + this.station);

            // 获取违反的规定描述
            this.checklist = this.navParams.get('checklist');
            console.log(this.checklist);
            let checklist_cn = this.formModel.get('checklist_cn') as FormControl;
            checklist_cn.setValue(this.checklist.CHECK_LIST_CN);

            // 获取班別
            let banbie = this.formModel.get('banbie') as FormControl;
            let res: any = await this.inspectionService.getDutyKind();
            let temp: any = res.json();
            let duty: string = temp.DUTY_KIND;
            if (duty.substr(0, 1) === '1') {
                banbie.setValue(this.translateText.day);
            } else {
                banbie.setValue(this.translateText.night);
            }
        } else if (this.fromPage === 'teamLeader') {
            let formData = this.navParams.get('formData');
            this.formModel = this.fb.group({
                checkDate: [formData.checkDate, Validators.required],
                checkPerson: [formData.checkPerson, Validators.required],
                banbie: [formData.banbie, Validators.required],
                address: [formData.address, Validators.required],
                checklist_cn: [formData.checklist_cn, Validators.required],
                exceptionDesc: [formData.exceptionDesc, Validators.required],
                pictures: this.fb.array([]),
                handler: ['', Validators.required],
            });
        } else if (this.fromPage === 'handler') {
            this.formModel = this.fb.group({
                checkDate: ['', Validators.required],
                checkPerson: ['', Validators.required],
                banbie: ['', Validators.required],
                address: ['', Validators.required],
                checklist_cn: ['', Validators.required],
                exceptionDesc: ['', Validators.required],
                pictures: this.fb.array([]),
                handler: ['', Validators.required],
                actionDesc: ['', Validators.required],
                actionStatus: ['', Validators.required],
                actionPictures: this.fb.array([]),
                actionDate: ['', Validators.required],
            });
        }
    }

    submitException() {
        console.log(this.formModel);
        console.log(this.formModel.value);
        this.viewCtrl.dismiss();
    }



    removeCheckPerson(index: number) {
        let checkPersons = this.formModel.get('checkPersons') as FormArray;
        checkPersons.removeAt(index);
    }

    addPictures() {
        let pictures = this.formModel.get('pictures') as FormArray;
        pictures.push(new FormControl(''));
    }

    addCheckPerson() {
        let checkPersons = this.formModel.get('checkPersons') as FormArray;
        checkPersons.push(new FormControl(''));
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    goBack() {
        this.viewCtrl.dismiss({ selected: false });
    }
}