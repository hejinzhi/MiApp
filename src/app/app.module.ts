import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import 'rxjs/add/operator/toPromise';

import { MyApp } from './app.component';
import { ApplicationModule } from './application/application.module';
import { MessageModule } from './message/message.module';
import { ContactModule } from './contact/contact.module';
import { MeModule } from './me/me.module';
import { TabsComponent } from './tabs/tabs.component';
import { LoginModule } from './login/login.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
// import { BookLibraryModule } from './book-library/book-library.module';

@NgModule({
  declarations: [
    MyApp,
    TabsComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, { tabsHideOnSubPages: true, mode: 'ios', backButtonText: '返回', }),
    LoginModule,
    ApplicationModule,
    MeModule,
    MessageModule,
    ContactModule,
    SharedModule,
    CoreModule,
    // BookLibraryModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }