import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingUtil } from '../../util/loadingUtil';

@IonicPage()
@Component({
  selector: 'page-formulario',
  templateUrl: 'formulario.html',
})
export class FormularioPage {
  private foto: string;
  private url = "http://10.1.1.20:9000/ocorrencia";
  public tipoDeOcorrencia: string = 'outro';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public loadingUtil: LoadingUtil) {
  }

  ionViewDidLoad() {
    this.foto = this.navParams.get("foto");
  }

  public adicionarOcorrencia(){
    this.loadingUtil.ativarLoading("Adicionando ocorrencia");
    this.http.post(this.url, this.criarOcorrencia())
    .subscribe(resposta => resposta.json());
    this.navCtrl.pop();
    this.loadingUtil.fecharLoading();
  }

  private criarOcorrencia(){
    return {
    "imagem":this.foto,
    "tipoDaOcorrencia": this.tipoDeOcorrencia,
    "horaDoRegistro": "2016-01-25T21:34:55",
    "localizacao":{
        "latitude": 12.1,
        "longitude": 32.23
      },
    "nomeDoUsuario": "FULANO"
    }
  }

}
