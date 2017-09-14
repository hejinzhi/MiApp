import { PhotoViewComponentModule } from './../../../../../shared/components/photo-view/photo-view.component.module';
import { CommentComponent } from './comment.component';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        IonicPageModule.forChild(CommentComponent),
        TranslateModule.forChild(),
        PhotoViewComponentModule
    ],
    exports: [],
    declarations: [CommentComponent],
    providers: [],
    entryComponents: [
        CommentComponent
    ]
})
export class CommentComponentModule { }