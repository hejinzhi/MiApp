import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ContactService } from '../shared/service/contact.service';

@Component({
    selector: 'sg-contact-detail',
    templateUrl: 'contact-detail.component.html'
})
export class ContactDetailComponent implements OnInit {

    personData: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public contactService: ContactService
    ) { }

    ngOnInit() {
        this.personData = this.navParams.get('data');
    }

}