import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DetalhesDaOcorrenciaPage} from '../detalhes-da-ocorrencia/detalhes-da-ocorrencia';

/**
 * Generated class for the RecompensasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recompensas',
  templateUrl: 'recompensas.html',
})
export class RecompensasPage {

  public ocorrenciasResolvidas = [];

  public totalDePontos = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.ocorrenciasResolvidas = this.navParams.get("ocorrenciasResolvidas");
    console.log('res', this.ocorrenciasResolvidas);
    this.totalDePontos = this.ocorrenciasResolvidas.map((item) => item.pontos).reduce((a, b) => {return a + b;}, 0);
  }

  public verOsDetalhesDaOcorrencia(dados) {
    console.log('dados selec', dados);
    this.navCtrl.push(DetalhesDaOcorrenciaPage, {ocorrencia: dados});
  }

}
