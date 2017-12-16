import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapaDeOcorrenciasPage } from './mapa-de-ocorrencias';

@NgModule({
  declarations: [
    MapaDeOcorrenciasPage,
  ],
  imports: [
    IonicPageModule.forChild(MapaDeOcorrenciasPage),
  ],
})
export class MapaDeOcorrenciasPageModule {}
