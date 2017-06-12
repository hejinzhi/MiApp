import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'sg-contact-detail',
    templateUrl: 'contact-detail.component.html'
})
export class ContactDetailComponent implements OnInit {

    personData: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
    ) { }

    ngOnInit() {
        this.personData = this.navParams.get('data');
    }
}