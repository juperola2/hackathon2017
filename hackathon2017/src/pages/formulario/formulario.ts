import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingUtil } from '../../util/loadingUtil';
import { GeolocalizacaoServico } from '../../util/geolocalizacaoServico';
import { FormularioSucessoPage } from '../formulario-sucesso/formulario-sucesso';

@IonicPage()
@Component({
  selector: 'page-formulario',
  templateUrl: 'formulario.html',
})
export class FormularioPage {
  private foto: string;
  private url = "http://10.1.1.20:9000/ocorrencia";
  private tipoDeOcorrencia: string = 'outro';
  private localDaFoto: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public loadingUtil: LoadingUtil,
    private geolocalizacao: GeolocalizacaoServico) {
      let locais = this.geolocalizacao.obterLocais();
      this.localDaFoto = locais[1];
      console.log(locais[1]);
    }
    
  ionViewDidLoad() {
    this.foto = this.navParams.get("foto");
  }

  public adicionarOcorrencia(){
    this.loadingUtil.ativarLoading("Adicionando ocorrencia");
    this.http.post(this.url, this.criarOcorrencia())
    .subscribe(resposta => resposta.json());
    this.navCtrl.pop();
    this.navCtrl.push(FormularioSucessoPage);
    this.loadingUtil.fecharLoading();
  }

  private criarOcorrencia(){
    return {
    "imagem":this.foto,
    "tipoDaOcorrencia": this.tipoDeOcorrencia,
    "horaDoRegistro": Date.now(),
    "localizacao":{
        "latitude": GeolocalizacaoServico.latitude,
        "longitude": GeolocalizacaoServico.longitude
      },
    "nomeDoUsuario": "FULANO"
    }
  }
}
