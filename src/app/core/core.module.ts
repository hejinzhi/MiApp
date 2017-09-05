import { CommonService } from './services/common.service';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera } from '@ionic-native/camera';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SQLite } from '@ionic-native/sqlite';
import { CodePush } from '@ionic-native/code-push';
import { Network } from '@ionic-native/network';
import { MyHttpService } from './services/myHttp.service';
import { JMessageService } from './services/jmessage.service';
import { JPushService } from './services/jpush.service.ts';

import { ArrayUtilService } from './services/arrayUtil.service';
import { PluginService } from './services/plugin.service';
import { ValidateService } from './services/validate.service';
import { NgValidatorExtendService } from './services/ng-validator-extend.service';
import { EncryptUtilService } from './services/encryptUtil.service';
import { CacheService } from './services/cache.service';


@NgModule({
    imports: [CommonModule, HttpModule],
    declarations: [],
    providers: [
        MyHttpService,
        JMessageService,
        JPushService,
        PluginService,
        ValidateService,
        NgValidatorExtendService,
        BarcodeScanner,
        Camera,
        ArrayUtilService,
        InAppBrowser,
        CodePush,
        Network,
        SQLite,
        EncryptUtilService,
        CacheService,
        CommonService
    ],
    exports: []
})
export class CoreModule {

    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}
