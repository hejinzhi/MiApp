import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { ApplicationItem } from '../../shared/models/application-item.model';
import { ApplicationService } from '../shared/service/application.service';


@Component({
    selector: 'sg-more-application',
    templateUrl: 'more-application.component.html'
})
export class MoreApplicationComponent implements OnInit {

    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private appService: ApplicationService) { }
    items: ApplicationItem[];
    showBtn: boolean = false;
    //   router: MyRouter = new MyRouter();

    moveItemToAppPage(id: number): void {
        this.items.filter
        this.appService.moveItemToAppPage(id);
        this.updateLocalModuleList(id);
        this.refreshData();
    }

    goToDetailPage(id: number) {
        // this.router.go(this.navCtrl, this.navParams, id);
    }

    ngOnInit() {
        let moduleList = JSON.parse(localStorage.getItem('moduleList'));
        this.items = moduleList.filter((value, index, newArray) => {
            return value.DISPLAY === 'N';
        });
    }

    showEditBtn(): void {
        this.showBtn = true;
    }

    hideEditBtn(): void {
        this.showBtn = false;
    }

    updateLocalModuleList(id) {
        let list: any[] = JSON.parse(localStorage.getItem('moduleList'));
        for (let i = 0; i < list.length; i++) {
            if (list[i].MODULE_ID === id) {
                list[i].DISPLAY = 'Y';
            }
        }
        localStorage.setItem('moduleList', JSON.stringify(list));
    }

    refreshData(): void {
        let moduleList = JSON.parse(localStorage.getItem('moduleList'));
        this.items = moduleList.filter((value, index, newArray) => {
            return value.DISPLAY === 'N';
        });
    }


}
