import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import 'rxjs/add/operator/toPromise';

import { MyAppComponent } from './app.component';
import { ApplicationModule } from './application/application.module';
import { MessageModule } from './message/message.module';
import { ContactModule } from './contact/contact.module';
import { TabsComponent } from './tabs/tabs.component';
import { LoginModule } from './login/login.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { PipesModule } from './shared/pipe/pipes.module';

@NgModule({
  declarations: [
    MyAppComponent,
    TabsComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyAppComponent, { tabsHideOnSubPages: true, mode: 'ios', backButtonText: '返回' }),
    LoginModule,
    ApplicationModule,
    MessageModule,
    ContactModule,
    SharedModule,
    CoreModule,
    PipesModule
    // BookLibraryModule
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
