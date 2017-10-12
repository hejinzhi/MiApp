import { LinesEquipEffects } from './application/my-modules/inspection/shared/effects/lines-equip.effect';
import { linesAllEquipReducer } from "./application/my-modules/inspection/shared/reducers/lines-all-equip.reducer";
import { lineAllReducer } from './application/my-modules/inspection/shared/reducers/lineAll.reducer';
import { linesEquipReducer } from "./application/my-modules/inspection/shared/reducers/lines-equip.reducer";
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpModule, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

import { userReducer } from "./shared/reducers/user.reducer";
import { lineReducer } from './application/my-modules/inspection/shared/reducers/line.reducer';

import { MyAppComponent } from './app.component';
import { ApplicationModule } from './application/application.module';
import { MessageModule } from './message/message.module';
import { ContactModule } from './contact/contact.module';
import { TabsComponent } from './tabs/tabs.component';
import { LoginModule } from './login/login.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { PipesModule } from './shared/pipe/pipes.module';
import { MeModule } from './me/me.module';

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    MyAppComponent,
    TabsComponent
  ],
  imports: [
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
    StoreModule.provideStore({ userReducer:userReducer, lineReducer:lineReducer, lineAllReducer:lineAllReducer, linesEquipReducer:linesEquipReducer, 
      linesAllEquipReducer:linesAllEquipReducer
     }),
    EffectsModule.run(LinesEquipEffects),
    BrowserModule,
    IonicModule.forRoot(MyAppComponent, {
      tabsHideOnSubPages: true,
      mode: 'ios',
      backButtonText: '返回',
      swipeBackEnabled: false
    }),
    LoginModule,
    ApplicationModule,
    MessageModule,
    ContactModule,
    MeModule,
    SharedModule,
    CoreModule,
    PipesModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyAppComponent,
    TabsComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
