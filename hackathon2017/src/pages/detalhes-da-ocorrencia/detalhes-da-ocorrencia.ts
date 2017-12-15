import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetalhesDaOcorrenciaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalhes-da-ocorrencia',
  templateUrl: 'detalhes-da-ocorrencia.html',
})
export class DetalhesDaOcorrenciaPage {
  private foto: string;
  public ocorrencia = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.ocorrencia = this.navParams.get("ocorrencia");
    this.foto = this.ocorrencia['foto'];
    console.log('detalhes', this.ocorrencia);
  }


}
