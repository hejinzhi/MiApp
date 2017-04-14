import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login.component';
import { PatternLockComponent } from './pattern-lock/pattern-lock.component';

@NgModule({
    imports: [CommonModule, IonicModule, SharedModule],
    declarations: [LoginComponent, PatternLockComponent],
    exports: [LoginComponent, PatternLockComponent],
    entryComponents: [LoginComponent, PatternLockComponent],
    providers: []
})
export class LoginModule { }
