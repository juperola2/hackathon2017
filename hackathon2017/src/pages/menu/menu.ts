import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RecompensasPage} from '../recompensas/recompensas';
import {MapaDeOcorrenciasPage} from '../mapa-de-ocorrencias/mapa-de-ocorrencias';
import {UsuarioPage} from '../usuario/usuario';
/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  public listaDeOcorrencias;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.listaDeOcorrencias = this.navParams.get("ocorrencias");
  }

  public irParaRecompensas() {
    var ocorrenciasResolvidas = [];
    for (var i=0; i< this.listaDeOcorrencias.length; i++) {
      if(this.listaDeOcorrencias[i]['status'] == 'RESOLVIDA'){
        ocorrenciasResolvidas.push(this.listaDeOcorrencias[i]);
      }
    }
    console.log('res', ocorrenciasResolvidas);
    this.navCtrl.push(RecompensasPage, {ocorrenciasResolvidas: ocorrenciasResolvidas});
  }

  public irParaOMapa() {
    this.navCtrl.push(MapaDeOcorrenciasPage, {ocorrencias: this.listaDeOcorrencias});
  }

  public irParaUsuario() {
    this.navCtrl.push(UsuarioPage);
  }


}
