import { InspectionService } from './ipqa/shared/service/inspection.service';
import { IpqaComponent } from './ipqa/ipqa.component';
import { IonicPage, NavController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';



@IonicPage()
@Component({
    selector: 'sg-inspection',
    templateUrl: 'inspection.component.html'
})
export class InspectionComponent implements OnInit {
    constructor(
        private navCtrl: NavController,
        private inspectionService: InspectionService
    ) { }

    names: any[];

    async ngOnInit() {
        let res = await this.inspectionService.getNames();
        this.names = res.json();
    }

    goToDetailPage(id: number) {
        // IPQA
        if (id == 3) {
            this.navCtrl.push('IpqaComponent');
        }
        // ... others
        else {

        }
    }
}