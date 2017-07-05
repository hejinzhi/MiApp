import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ContactService } from '../shared/service/contact.service';
import { LanguageConfig } from '../shared/config/language.config';
import { DialogueComponent } from '../../message/dialogue/dialogue.component';

@Component({
    selector: 'sg-contact-detail',
    templateUrl: 'contact-detail.component.html'
})
export class ContactDetailComponent implements OnInit {

    languageType: string = localStorage.getItem('languageType');
    languageContent = LanguageConfig.contactDetailComponent[this.languageType];
    personData: any;
    loginUsername: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public contactService: ContactService
    ) { }

    ngOnInit() {
        this.personData = this.navParams.get('data');
        this.loginUsername = JSON.parse(localStorage.getItem('currentUser')).username;
    }

    goToChatPage() {
        this.navCtrl.push(DialogueComponent, {
            fromUserName: this.personData.USER_NAME,
            fromUserNickName: this.personData.NICK_NAME,
            fromUserAvatarSrc: this.personData.AVATAR_URL,
            toUserName: this.loginUsername
        });
    }

}