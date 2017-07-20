import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login.component';
import { PatternLockComponent } from './pattern-lock/pattern-lock.component';
import {LoginService} from './shared/service/login.service';

@NgModule({
    imports: [CommonModule, IonicModule, SharedModule],
    declarations: [LoginComponent, PatternLockComponent],
    exports: [LoginComponent, PatternLockComponent],
    entryComponents: [LoginComponent, PatternLockComponent],
    providers: [LoginService]
})
export class LoginModule { }
