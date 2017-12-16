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
import { DetalhesDaOcorrenciaPage } from '../pages/detalhes-da-ocorrencia/detalhes-da-ocorrencia';
import { GeolocalizacaoServico } from '../../src/util/geolocalizacaoServico';
import { Geolocation } from '@ionic-native/geolocation';
import { MapaPage } from '../pages/mapa/mapa';
import {MapaDeOcorrenciasPage} from '../pages/mapa-de-ocorrencias/mapa-de-ocorrencias';
import { RecompensasPage } from '../pages/recompensas/recompensas';
import { UsuarioPage } from '../pages/usuario/usuario';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FormularioPage,
    FormularioSucessoPage,
    DetalhesDaOcorrenciaPage,
    MapaPage,
    MapaDeOcorrenciasPage,
    RecompensasPage,
    UsuarioPage
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
    FormularioSucessoPage,
    DetalhesDaOcorrenciaPage,
    MapaPage,
    MapaDeOcorrenciasPage,
    RecompensasPage,
    UsuarioPage
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
