import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FormularioPage } from '../pages/formulario/formulario';
import { LoadingUtil } from '../../src/util/loadingUtil';
import { FormularioSucessoPage } from '../pages/formulario-sucesso/formulario-sucesso';
import { GeolocalizacaoServico } from '../../src/util/geolocalizacaoServico';
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FormularioPage,
    FormularioSucessoPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FormularioPage,
    FormularioSucessoPage
  ],
  providers: [
    StatusBar,
    Camera,
    Geolocation,
    SplashScreen,
    LoadingUtil,
    GeolocalizacaoServico,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
