import { UserModel } from './../../../../../shared/models/user.model';
import { NavParams, ViewController, IonicPage } from 'ionic-angular';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

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
    checklist: string;
    constructor(
        private navParams: NavParams,
        private viewCtrl: ViewController
    ) {

    }

    ngOnInit() {
        let localUser: UserModel = JSON.parse(localStorage.getItem('currentUser'));
        let user = localUser.empno + ',' + localUser.nickname + ',' + localUser.username;

        this.formModel = this.fb.group({
            checkDate: [this.getToday(), Validators.required],
            checkPerson: [user, Validators.required],
            banbie: ['白班', Validators.required],
            address: ['', Validators.required],
            checklist: ['', Validators.required],
            exceptionDesc: ['', Validators.required],
            pictures: this.fb.array([]),
            handler: ['', Validators.required],
            // PQE: ['', Validators.required],
            // closer: ['', Validators.required]
        });

        // 获取线别
        this.line = this.navParams.get('line');
        this.station = this.navParams.get('station');
        let address = this.formModel.get('address') as FormControl;
        address.setValue(this.line + ' -- ' + this.station);

        // 获取违反的规定描述
        this.checklist = this.navParams.get('checklist');
        let checklist = this.formModel.get('checklist') as FormControl;
        checklist.setValue(this.checklist);
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

    getToday() {
        let newDate = new Date();
        let month = (newDate.getMonth() + 1) > 9 ? (newDate.getMonth() + 1) : '0' + (newDate.getMonth() + 1);
        let day = newDate.getDate() > 9 ? newDate.getDate() : '0' + newDate.getDate();
        return newDate.getFullYear() + '-' + month + '-' + day;
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    goBack() {
        this.viewCtrl.dismiss({ selected: false });
    }
}