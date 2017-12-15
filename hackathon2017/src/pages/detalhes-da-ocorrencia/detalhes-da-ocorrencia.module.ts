import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalhesDaOcorrenciaPage } from './detalhes-da-ocorrencia';

@NgModule({
  declarations: [
    DetalhesDaOcorrenciaPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalhesDaOcorrenciaPage),
  ],
})
export class DetalhesDaOcorrenciaPageModule {}
