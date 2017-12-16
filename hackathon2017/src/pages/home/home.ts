import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormularioPage } from '../formulario/formulario';
import {DetalhesDaOcorrenciaPage} from '../detalhes-da-ocorrencia/detalhes-da-ocorrencia';
import { Http } from '@angular/http';
import { LoadingUtil } from '../../util/loadingUtil';
import { GeolocalizacaoServico } from '../../util/geolocalizacaoServico';
import {MapaDeOcorrenciasPage} from '../mapa-de-ocorrencias/mapa-de-ocorrencias';
import { MenuController } from 'ionic-angular';
import { RecompensasPage } from '../recompensas/recompensas';
import { UsuarioPage } from '../usuario/usuario';
import { MenuPage } from '../menu/menu';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private foto: string;
  private localAtual: any;
  private url = "http://10.1.1.15:9000/ocorrencia";
  private self = this;
  public listaDeOcorrencias;

  private res = [
    {
        "registroDaOcorrencia": {
            "dados": "dlsfdsfiwoufouwhifjwijfoiwhofhwiofg=",
            "tipoDoRegistro": "IMAGEM"
        },
        "tipoDaOcorrencia": "ESTACIONAMENTO_INDEVIDO",
        "horaDoRegistro": [
            2016,
            1,
            25,
            21,
            34,
            55
        ],
        "localizacao": {
            "latitude": -20.46818922,
            "longitude": -54.61692095
        },
        "nomeDoUsuario": "FULANO",
        "descricao": null,
        "status": "RESOLVIDA",
        "pontos": 15
    },
    {
        "registroDaOcorrencia": {
            "dados": "dlsfdsfiwoufouwhifjwijfoiwhofhwiofg=",
            "tipoDoRegistro": "IMAGEM"
        },
        "tipoDaOcorrencia": "ESTACIONAMENTO_INDEVIDO",
        "horaDoRegistro": [
            2016,
            1,
            25,
            21,
            34,
            55
        ],
        "localizacao": {
            "latitude": -20.4709232,
            "longitude": -54.61717844
        },
        "nomeDoUsuario": "FULANO",
        "descricao": null,
        "status" : "ABERTA",
        "pontos" : 10
    }
 ];

  opcoesCamera: CameraOptions = {
    quality: 60,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  constructor(
    private navCtrl: NavController,
    private camera: Camera,
    public http: Http,
    private geolocalizacao: GeolocalizacaoServico,
    public menuCtrl: MenuController,
    public loadingUtil: LoadingUtil,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad(){
    this.carregarOcorrencias();
    this.geolocalizacao.ativarEspiao();
  }

  public irParaMenu() {
    this.navCtrl.push(MenuPage, {ocorrencias: this.listaDeOcorrencias});
  }

  public obterFoto() {
    let self = this;
    this.camera.getPicture(this.opcoesCamera).then((imageData) => {
      let salvarLocais = function(locais) {
        self.localAtual = locais[1];
        self.foto = 'data:image/jpeg;base64,' + imageData;
        self.navCtrl.push(FormularioPage, {foto: self.foto, localSelecionado: self.localAtual});
      }
      this.geolocalizacao.obterLocais(salvarLocais);
    }, (err) => {
      console.log(err);
    });
  }

  public irParaFormulario() {
    let self = this;
    let salvarLocais = function(locais) {
      self.navCtrl.push(FormularioPage, {foto: self.foto, localSelecionado: locais[1]});
    }
    
    this.geolocalizacao.obterLocais(salvarLocais);
  }

  public irParaOMapa() {
    this.navCtrl.push(MapaDeOcorrenciasPage, {ocorrencias: this.listaDeOcorrencias});
  }

  public carregarOcorrencias(){
    this.loadingUtil.ativarLoading("Carregando ocorrências cadastradas.");
    this.http.get(this.url)
      .map(response => response.json())
      .subscribe(resposta => {
        this.listaDeOcorrencias = this.parsearDados(resposta);
        this.loadingUtil.fecharLoading();
    });
  }

  // public carregarOcorrencias(){
  //   this.loadingUtil.ativarLoading("Carregando ocorrências cadastradas.");
  //   this.listaDeOcorrencias = this.parsearDados(this.res);
  //   this.loadingUtil.fecharLoading();
  // }

  public parsearDados(dados) {
    var dadosParseados = [];
    // Create Base64 Object
    for(var i = 0; i< dados.length; i++) {
      let tipoDeOcorrencia  = dados[i]['tipoDaOcorrencia'];
      let icone = this.iconeDaOcorrencia(dados[i]['tipoDaOcorrencia']);
      var dado = {
        icone: icone,
        tipoDaOcorrencia : tipoDeOcorrencia,
        foto: dados[i]['registroDaOcorrencia']['dados'],
        data : dados[i]['horaDoRegistro'][2] + '/' + dados[i]['horaDoRegistro'][1] + '/' + dados[i]['horaDoRegistro'][0],
        horario: dados[i]['horaDoRegistro'][3] +':'+ dados[i]['horaDoRegistro'][3] +':' + dados[i]['horaDoRegistro'][4],
        descricao: dados[i]['descricao'],
        latitude: dados[i]['localizacao']['latitude'],
        longitude: dados[i]['localizacao']['longitude'],
        status: dados[i]['status'],
        pontos: dados[i]['pontos']
      }
      dadosParseados.push(dado);
    }
    return dadosParseados;
  }

  private iconeDaOcorrencia(tipo) {
    if (tipo === 'ESTACIONAMENTO_INDEVIDO'){
      return 'ios-warning-outline';
    }
    return 'ios-checkmark-circle-outline';
  }

  public verOsDetalhesDaOcorrencia(dados) {
    console.log('dados selec', dados);
    this.navCtrl.push(DetalhesDaOcorrenciaPage, {ocorrencia: dados});
  }
}

