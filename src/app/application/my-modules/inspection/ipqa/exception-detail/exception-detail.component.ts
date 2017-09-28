import { serverUrl } from './../../../../../../../plugins/code-push/test/acquisition-rest-mock';
import { LocalStorageService } from './../../../../../core/services/localStorage.service';
import { Observable } from 'rxjs/Observable';
import { InspectionService } from './../shared/service/inspection.service';
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
    station: { STATION_ID: number, STATION_NAME: string };//站点
    checklist: any;
    localUser: UserModel;//当前登录人
    fromPage: string;// 获取是从哪个页面转跳过来的。“问题追踪”不显示处理人栏位，而“指派处理人”则显示
    localStorageName: string; // 记录本地存储的名字是什么
    // images: string[] = ['assets/icon/xunjian.jpg', 'assets/icon/IPQA.gif']; // 记录用户选择的照片
    images: string[]; // 记录用户选择的照片
    translateText = {
        day: '',
        night: ''
    };
    photoViewOptions: { addable: boolean, removeable: boolean, scanable: boolean }; // 控制选择图片的控件是否可以添加或删除图片
    constructor(
        private navParams: NavParams,
        private viewCtrl: ViewController,
        private inspectionService: InspectionService,
        private translate: TranslateService,
        private localStorage: LocalStorageService
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
        // 获取线别
        this.line = this.navParams.get('line');
        this.station = this.navParams.get('station');
        // 获取违反的规定描述
        this.checklist = this.navParams.get('checklist');
        await this.createFormMode();
    }

    async createFormMode() {
        if (this.fromPage === 'checklist') {
            this.localStorageName = this.inspectionService.getLocalStorageExceptionName(this.station.STATION_ID);
            let localData: ExceptionModel = this.getItem(this.localStorageName, this.checklist.CHECK_ID);
            if (localData) {
                this.setCheckListFormModel(localData);
            }
            else {
                await this.initCheckListFormModel();
            }


        } else if (this.fromPage === 'teamLeader') {
            let formData = this.navParams.get('formData');
            console.log(formData);
            this.formModel = this.fb.group({
                checkDate: [formData.checkDate, Validators.required],
                checkPerson: [formData.checkPerson, Validators.required],
                banbie: [formData.banbie, Validators.required],
                address: [formData.address, Validators.required],
                checklist_cn: [formData.checklist_cn, Validators.required],
                exceptionDesc: [formData.exceptionDesc, Validators.required],
                // pictures: this.fb.array([]),
                handler: ['', Validators.required],
            });
        } else if (this.fromPage === 'handler') {
            let formData = this.navParams.get('formData');
            // this.formModel = this.fb.group({
            //     checkDate: [{ value: formData.INSPECT_DATE, disabled: true }, Validators.required],
            //     checkPerson: [{ value: formData.INSPECTOR, disabled: true }, Validators.required],
            //     banbie: [{ value: formData.DUTY_KIND, disabled: true }, Validators.required],
            //     address: [{ value: formData.LOCATION, disabled: true }, Validators.required],
            //     checklist_cn: [{ value: formData.CHECK_LIST_CN, disabled: true }, Validators.required],
            //     exceptionDesc: [{ value: formData.PROBLEM_DESC, disabled: true }, Validators.required],
            //     // pictures: this.fb.array([]),
            //     handler: [{ value: '', disabled: true }, Validators.required],
            //     actionDesc: ['', Validators.required],
            //     actionStatus: ['', Validators.required],
            //     // actionPictures: this.fb.array([]),
            //     actionDate: ['', Validators.required],
            // });
            // this.photoViewOptions = {
            //     addable: false,
            //     removeable: false,
            //     scanable: true
            // }
            // this.images = ['https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png'];
        }
    }

    async initCheckListFormModel() {
        let user = this.localUser.empno + ',' + this.localUser.nickname + ',' + this.localUser.username.toUpperCase();
        this.formModel = this.fb.group({
            checkDate: [this.inspectionService.getToday(), Validators.required],
            checkPerson: [user, Validators.required],
            banbie: ['白班', Validators.required],
            address: ['', Validators.required],
            checklist_cn: ['', Validators.required],
            exceptionDesc: ['', Validators.required],
            // pictures: this.fb.array([])
        });

        let address = this.formModel.get('address') as FormControl;
        let addressName = this.inspectionService.getLocationName(this.line, this.station.STATION_NAME);
        address.setValue(addressName);
        let checklist_cn = this.formModel.get('checklist_cn') as FormControl;
        checklist_cn.setValue(this.checklist.CHECK_LIST_CN);
        // 获取班別
        let banbie = this.formModel.get('banbie') as FormControl;
        let duty = await this.inspectionService.getBanBie();
        if (duty.substr(0, 1) === '1') {
            banbie.setValue(this.translateText.day);
        } else {
            banbie.setValue(this.translateText.night);
        }
    }

    setCheckListFormModel(formValue: ExceptionModel) {
        this.formModel = this.fb.group({
            checkDate: [formValue.checkDate, Validators.required],
            checkPerson: [formValue.checkPerson, Validators.required],
            banbie: [formValue.banbie, Validators.required],
            address: [formValue.address, Validators.required],
            checklist_cn: [formValue.checklist_cn, Validators.required],
            exceptionDesc: [formValue.exceptionDesc, Validators.required],
            // pictures: this.fb.array(formValue.pictures)
        });
        this.images = formValue.pictures;

    }

    async submitException() {

        if (this.fromPage === 'checklist') {
            let formValue = this.formModel.value;
            formValue.pictures = this.images;
            console.log(formValue);
            this.setItem(this.localStorageName, this.formModel.value);
            this.dismiss();
        } else if (this.fromPage === 'teamLeader') {

            // await this.inspectionService.assignOwner({
            //     PROBLEM_STATUS: 'Waiting',
            //     OWNER_EMPNO: this.formModel.value.handler,
            //     LINE_ID: ???
            // });

            // let formValue = this.formModel.value;
            // formValue.pictures = this.images;
            // console.log(formValue);
            // this.setItem(this.localStorageName, this.formModel.value);
            // this.dismiss();
        }

    }

    setItem(key: string, data: ExceptionModel) {
        data = Object.assign(data, { checkID: this.checklist.CHECK_ID });
        let alreadyInsert: boolean = false;
        let oldData: ExceptionModel[] = this.localStorage.getItem(key);
        if (oldData) {
            for (let i = 0; i < oldData.length; i++) {
                if (oldData[i].checkID === data.checkID) {
                    oldData[i] = data;
                    alreadyInsert = true;
                }
            }
            if (!alreadyInsert) {
                oldData.push(data);
            }
            this.localStorage.setItem(key, oldData);
        } else {
            this.localStorage.setItem(key, [data]);
        }
    }

    getItem(key: string, checkID: number) {
        let localData: ExceptionModel[] = this.localStorage.getItem(key);
        if (localData) {
            for (let i = 0; i < localData.length; i++) {
                if (localData[i].checkID === checkID) {
                    return localData[i];
                }
            }
        } else {
            return;
        }
    }

    // 获取用户选择的照片
    getImages(images: string[]) {
        this.images = images;
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

export class ExceptionModel {
    checkID: number;
    checkDate: string;
    checkPerson: string;
    banbie: string;
    address: string;
    checklist_cn: string;
    exceptionDesc: string;
    pictures: string[];
    handler?: string;
    actionDesc?: string;
    actionStatus?: string;
    actionPictures?: string[];
    actionDate?: string;
}

