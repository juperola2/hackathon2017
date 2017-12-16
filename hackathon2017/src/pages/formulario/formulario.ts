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
  private url = "http://10.1.1.15:9000/ocorrencia";
  private tipoDeOcorrencia: string = '';
  private localDaFoto: any;
  private descricao = '';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public loadingUtil: LoadingUtil,
    private geolocalizacao: GeolocalizacaoServico) {
    }
    
  ionViewDidLoad() {
    this.foto = this.navParams.get("foto") ? this.navParams.get("foto") : "";
    this.localDaFoto = this.navParams.get("localSelecionado");
  }

  public adicionarOcorrencia(){
    this.loadingUtil.ativarLoading("Adicionando ocorrencia");
    let ocorrencia = this.criarOcorrencia();
    console.log(ocorrencia);
    this.http.post(this.url, ocorrencia);
    this.navCtrl.pop();
    this.navCtrl.push(FormularioSucessoPage);
    this.loadingUtil.fecharLoading();
  }

  private criarOcorrencia(){
    console.log(Date.now());
    return {
    "imagem":this.foto,
    "tipoDaOcorrencia": this.tipoDeOcorrencia,
    "horaDoRegistro": "2076-12-16T14:34:55",
    "localizacao":{
        "latitude": GeolocalizacaoServico.latitude,
        "longitude": GeolocalizacaoServico.longitude
      },
    "nomeDoUsuario": "FULANO",
    "descricao": this.descricao
    }
  }


}
