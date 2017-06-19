import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import 'rxjs/add/operator/toPromise';

import { MyAppComponent } from './app.component';
import { ApplicationModule } from './application/application.module';
import { MessageModule } from './message/message.module';
import { ContactModule } from './contact/contact.module';
import { TabsComponent } from './tabs/tabs.component';
import { LoginModule } from './login/login.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
// import { BookLibraryModule } from './book-library/book-library.module';

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
    PhotoViewer,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
