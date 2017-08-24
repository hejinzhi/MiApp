import { PhotoViewComponent } from './../../../shared/components/photo-view/photo-view.component';
import { ExceptionDetailComponent } from './exception-detail/exception-detail.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { StationsComponent } from './stations/stations.component';
import { GridComponent } from './grid/grid.component';
import { IpqaComponent } from './ipqa/ipqa.component';
import { InspectionService } from './shared/service/inspection.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';


import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    imports: [CommonModule, IonicModule, SharedModule],
    declarations: [IpqaComponent, GridComponent, StationsComponent, ChecklistComponent, CheckboxComponent, ExceptionDetailComponent, PhotoViewComponent],
    exports: [IpqaComponent, GridComponent, StationsComponent, ChecklistComponent, CheckboxComponent, ExceptionDetailComponent, PhotoViewComponent],
    entryComponents: [IpqaComponent, GridComponent, StationsComponent, ChecklistComponent, CheckboxComponent, ExceptionDetailComponent, PhotoViewComponent],
    providers: [InspectionService]
})
export class InspectionModule { }
