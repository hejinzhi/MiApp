import { GridComponent } from './grid/grid.component';
import { IpqaComponent } from './ipqa/ipqa.component';
import { InspectionService } from './shared/service/inspection.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';


import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    imports: [CommonModule, IonicModule, SharedModule],
    declarations: [IpqaComponent, GridComponent],
    exports: [IpqaComponent, GridComponent],
    entryComponents: [IpqaComponent, GridComponent],
    providers: [InspectionService]
})
export class InspectionModule { }
