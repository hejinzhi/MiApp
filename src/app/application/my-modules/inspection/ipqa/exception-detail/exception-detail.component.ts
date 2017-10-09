import { InspectionCommonService } from './../../shared/service/inspectionCommon.service';
import { EnvConfig } from './../../../../../shared/config/env.config';
import { CommonService } from './../../../../../core/services/common.service';
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
    checklist: { CHECK_ID: number, CHECK_LIST_CN: string };
    localUser: UserModel;//当前登录人
    fromPage: string;// 获取是从哪个页面转跳过来的。“问题追踪”不显示处理人栏位，而“指派处理人”则显示
    localStorageName: string; // 记录本地存储的名字是什么
    // images: string[] = ['assets/icon/xunjian.jpg', 'assets/icon/IPQA.gif']; // 记录用户选择的照片
    images: string[]; // 记录用户选择的照片
    actionPictures: string[];// 处理后的照片
    translateText = {
        day: '',
        night: ''
    };
    formData: ExceptionModel;
    photoViewOptions: { addable: boolean, removeable: boolean, scanable: boolean }; // 控制选择图片的控件是否可以添加或删除图片
    photoViewAdminOptions: { addable: boolean, removeable: boolean, scanable: boolean }; // 控制选择图片的控件是否可以添加或删除图片
    constructor(
        private navParams: NavParams,
        private viewCtrl: ViewController,
        private inspectionService: InspectionService,
        private translate: TranslateService,
        private localStorage: LocalStorageService,
        private commonService: CommonService,
        private inspectionCommonService: InspectionCommonService
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

        this.formData = this.navParams.get('formData');

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
            this.formModel = this.fb.group({
                INSPECT_DATE: [this.formData.INSPECT_DATE, Validators.required],
                INSPECTOR: [this.formData.INSPECTOR, Validators.required],
                DUTY_KIND: [this.formData.DUTY_KIND, Validators.required],
                LOCATION: [this.formData.LOCATION, Validators.required],
                CHECK_LIST_CN: [this.formData.CHECK_LIST_CN, Validators.required],
                PROBLEM_DESC: [this.formData.PROBLEM_DESC, Validators.required],
                OWNER_EMPNO: ['', Validators.required],
            });
            let images: string[] = this.getLongImageUrl(this.formData.PROBLEM_PICTURES);
            this.images = images;
        } else if (this.fromPage === 'handler') {
            this.formModel = this.fb.group({
                INSPECT_DATE: [{ value: this.formData.INSPECT_DATE, disabled: true }, Validators.required],
                INSPECTOR: [{ value: this.formData.INSPECTOR, disabled: true }, Validators.required],
                DUTY_KIND: [{ value: this.formData.DUTY_KIND, disabled: true }, Validators.required],
                LOCATION: [{ value: this.formData.LOCATION, disabled: true }, Validators.required],
                CHECK_LIST_CN: [{ value: this.formData.CHECK_LIST_CN, disabled: true }, Validators.required],
                PROBLEM_DESC: [{ value: this.formData.PROBLEM_DESC, disabled: true }, Validators.required],
                // pictures: this.fb.array([]),
                OWNER_EMPNO: [{ value: this.formData.OWNER_EMPNO, disabled: true }, Validators.required],
                ACTION_DESC: ['', Validators.required],
                ACTION_STATUS: ['', Validators.required],
                // actionPictures: this.fb.array([]),
                ACTION_DATE: [this.inspectionService.getToday(), Validators.required],
            });
            this.photoViewOptions = {
                addable: false,
                removeable: false,
                scanable: true
            };
            let images: string[] = this.getLongImageUrl(this.formData.PROBLEM_PICTURES);
            this.images = images;
        }
        else if (this.fromPage === 'admin') {
            this.formModel = this.fb.group({
                INSPECT_DATE: [{ value: this.formData.INSPECT_DATE, disabled: true }, Validators.required],
                INSPECTOR: [{ value: this.formData.INSPECTOR, disabled: true }, Validators.required],
                DUTY_KIND: [{ value: this.formData.DUTY_KIND, disabled: true }, Validators.required],
                LOCATION: [{ value: this.formData.LOCATION, disabled: true }, Validators.required],
                CHECK_LIST_CN: [{ value: this.formData.CHECK_LIST_CN, disabled: true }, Validators.required],
                PROBLEM_DESC: [{ value: this.formData.PROBLEM_DESC, disabled: true }, Validators.required],
                // pictures: this.fb.array([]),
                OWNER_EMPNO: [{ value: this.formData.OWNER_EMPNO, disabled: true }, Validators.required],
                ACTION_DESC: [{ value: this.formData.ACTION_DESC, disabled: true }, Validators.required],
                ACTION_STATUS: [{ value: this.formData.ACTION_STATUS, disabled: true }, Validators.required],
                // actionPictures: this.fb.array([]),
                ACTION_DATE: [{ value: this.formData.ACTION_DATE, disabled: true }, Validators.required],
            });
            this.photoViewOptions = {
                addable: false,
                removeable: false,
                scanable: true
            };
            this.photoViewAdminOptions = {
                addable: false,
                removeable: false,
                scanable: true
            };
            let images: string[] = this.getLongImageUrl(this.formData.PROBLEM_PICTURES);
            this.images = images;
            let actionImages: string[] = this.getLongImageUrl(this.formData.ACTION_PICTURES);
            this.actionPictures = actionImages;
        }
    }

    // 因为服务器存放的不是完整的url，需要拼接一下
    getLongImageUrl(images: string) {
        let longImages: string[] = [];
        let imageArray: string[] = [];
        if (images) {
            imageArray = images.split(',');
        }
        if (imageArray && imageArray.length > 0) {
            for (let i = 0; i < imageArray.length; i++) {
                longImages.push(EnvConfig.baseUrl + imageArray[i]);
            }
        }
        return longImages;
    }

    async initCheckListFormModel() {
        let user = this.localUser.empno + ',' + this.localUser.nickname + ',' + this.localUser.username.toUpperCase();
        this.formModel = this.fb.group({
            INSPECT_DATE: [this.inspectionService.getToday(), Validators.required],
            INSPECTOR: [{ value: user, disabled: true }, Validators.required],
            DUTY_KIND: ['白班', Validators.required],
            LOCATION: ['', Validators.required],
            CHECK_LIST_CN: ['', Validators.required],
            PROBLEM_DESC: ['', Validators.required],
            // pictures: this.fb.array([])
        });

        let address = this.formModel.get('LOCATION') as FormControl;
        let addressName = this.inspectionService.getLocationName(this.line, this.station.STATION_NAME);
        address.setValue(addressName);
        let checklist_cn = this.formModel.get('CHECK_LIST_CN') as FormControl;
        checklist_cn.setValue(this.checklist.CHECK_LIST_CN);
        // 获取班別
        let banbie = this.formModel.get('DUTY_KIND') as FormControl;
        let duty = await this.inspectionService.getBanBie();
        if (duty.substr(0, 1) === '1') {
            banbie.setValue(this.translateText.day);
        } else {
            banbie.setValue(this.translateText.night);
        }
    }

    setCheckListFormModel(formValue: ExceptionModel) {
        this.formModel = this.fb.group({
            INSPECT_DATE: [formValue.INSPECT_DATE, Validators.required],
            INSPECTOR: [formValue.INSPECTOR, Validators.required],
            DUTY_KIND: [formValue.DUTY_KIND, Validators.required],
            LOCATION: [formValue.LOCATION, Validators.required],
            CHECK_LIST_CN: [formValue.CHECK_LIST_CN, Validators.required],
            PROBLEM_DESC: [formValue.PROBLEM_DESC, Validators.required],
            // pictures: this.fb.array(formValue.pictures)
        });
        this.images = formValue.PROBLEM_PICTURES;

    }

    async submitException() {

        if (this.fromPage === 'checklist') {
            let formValue = this.formModel.value;
            formValue.PROBLEM_PICTURES = this.images;
            formValue.INSPECTOR = this.localUser.empno + ',' + this.localUser.nickname + ',' + this.localUser.username.toUpperCase();
            this.setItem(this.localStorageName, formValue);
            this.dismiss();
        } else if (this.fromPage === 'teamLeader') {
            this.commonService.showLoading();
            let ownerEmpno = this.formModel.value.OWNER_EMPNO.split(',')[0];
            let obj = {
                PROBLEM_STATUS: 'Waiting',
                OWNER_EMPNO: ownerEmpno,
                LINE_ID: this.formData.LINE_ID
            };
            await this.inspectionService.assignOwner(obj);
            this.commonService.hideLoading();

            let formValue = this.formModel.value;
            formValue.PROBLEM_PICTURES = this.images;
            // this.setItem(this.localStorageName, formValue);
            this.dismiss();
        } else if (this.fromPage === 'handler') {
            this.commonService.showLoading();
            let obj = {
                PROBLEM_STATUS: 'Done',
                ACTION_DESC: this.formModel.value.ACTION_DESC,
                ACTION_DATE: this.formModel.value.ACTION_DATE,
                ACTION_STATUS: this.formModel.value.ACTION_STATUS,
                SCORE: 0,
                LINE_ID: this.formData.LINE_ID
            };
            await this.inspectionService.handleProblem(obj);

            if (this.actionPictures && this.actionPictures.length > 0) {
                let images: string = '';

                for (let i = 0; i < this.actionPictures.length; i++) {
                    let len = this.actionPictures.length;
                    let img = this.actionPictures[i].replace('data:image/jpeg;base64,', '');
                    try {
                        let imgUrl = await this.inspectionCommonService.uploadPicture({ PICTURE: img })
                        if (imgUrl) {
                            if (i < len - 1) {
                                images += imgUrl + ',';
                            } else {
                                images += imgUrl;
                            }
                        }
                    } catch (e) {
                        console.log('upload action picture error', e);
                    }
                }
                await this.inspectionService.UpdateReportLines({ LINE_ID: this.formData.LINE_ID, ACTION_PICTURES: images });
            }
            this.commonService.hideLoading();

            let formValue = this.formModel.value;
            formValue.ACTION_PICTURES = this.actionPictures;
            // this.setItem(this.localStorageName, formValue);
            this.dismiss();
        }

    }

    setItem(key: string, data: ExceptionModel) {
        // data = Object.assign(data, { CHECK_ID: this.checklist.CHECK_ID });
        if (this.checklist && this.checklist.CHECK_ID) {
            data.CHECK_ID = this.checklist.CHECK_ID;
        }
        let alreadyInsert: boolean = false;
        let oldData: ExceptionModel[] = this.localStorage.getItem(key);
        if (oldData) {
            for (let i = 0; i < oldData.length; i++) {
                if (oldData[i].CHECK_ID === data.CHECK_ID) {
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
                if (localData[i].CHECK_ID === checkID) {
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

    // 获取整改后图片
    getActionPicture(images: string[]) {
        this.actionPictures = images;
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

    // 重置负责人，组长重新分配
    resetOwner() {
        this.commonService.showOptionConfirm('确认', '确定要把单据回退给管理员重新分配吗？', async () => {
            this.commonService.showLoading();
            await this.inspectionService.assignOwner({ PROBLEM_STATUS: 'New', OWNER_EMPNO: '', LINE_ID: this.formData.LINE_ID });

            let formValue = this.formModel.value;
            formValue.OWNER_EMPNO = '';
            this.setItem(this.localStorageName, formValue);
            this.commonService.hideLoading();
            this.dismiss();

        });

    }


}

export class ExceptionModel {
    CHECK_ID: number;
    INSPECT_DATE: string;
    INSPECTOR: string;
    DUTY_KIND: string;
    LOCATION: string;
    CHECK_LIST_CN: string;
    PROBLEM_DESC: string;
    // PROBLEM_PICTURES: string[];
    PROBLEM_PICTURES: any;
    OWNER_EMPNO?: string;
    ACTION_DESC?: string;
    ACTION_STATUS?: string;
    ACTION_PICTURES?: string;
    ACTION_DATE?: string;
    LINE_ID?: number;
}