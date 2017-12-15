import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormularioPage } from '../formulario/formulario';
import {DetalhesDaOcorrenciaPage} from '../detalhes-da-ocorrencia/detalhes-da-ocorrencia';
import { Http } from '@angular/http';
import { LoadingUtil } from '../../util/loadingUtil';
import { GeolocalizacaoServico } from '../../util/geolocalizacaoServico';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private foto: string;
  private url = "http://10.1.1.15:9000/ocorrencia";

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
            "latitude": 12.1,
            "longitude": 32.23
        },
        "nomeDoUsuario": "FULANO",
        "descricao": null
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
            "latitude": -20,
            "longitude": -54
        },
        "nomeDoUsuario": "FULANO",
        "descricao": null
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
    public loadingUtil: LoadingUtil) {
  }

  ngOnInit() {
    this.carregarOcorrencias();
  }

  ionViewDidLoad(){
    this.geolocalizacao.ativarEspiao();
  }

  public obterFoto() {
    this.camera.getPicture(this.opcoesCamera).then((imageData) => {
      this.foto = 'data:image/jpeg;base64,' + imageData;
      this.navCtrl.push(FormularioPage, {foto: this.foto});
    }, (err) => {
      console.log(err);
    });
  }



  /*
  public carregarOcorrencias(){
    console.log('carregando');
    this.loadingUtil.ativarLoading("Carregando ocorrências cadastradas.");
    this.http.get(this.url)
      .subscribe(resposta => {
        var res = resposta.json();
        this.listaDeOcorrencias = this.parsearDados(res);
        
        console.log('resposta', res);
        console.log('resposta', this.listaDeOcorrencias );
    });

    this.loadingUtil.fecharLoading();
  }*/

  public carregarOcorrencias(){
    this.loadingUtil.ativarLoading("Carregando ocorrências cadastradas.");
    this.listaDeOcorrencias = this.parsearDados(this.res);
    this.loadingUtil.fecharLoading();
  }

  public parsearDados(dados) {
    var dadosParseados = [];
    // Create Base64 Object
    //var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=0; var c1=0; var c2=0; var c3; while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};

    for(var i = 0; i< dados.length; i++) {
      let tipoDeOcorrencia  = this.tipoDeOcorrencia(dados[i]['tipoDaOcorrencia']);
      let icone = this.iconeDaOcorrencia(dados[i]['tipoDaOcorrencia']);
  
      var dado = {
        icone: icone,
        tipoDaOcorrencia : tipoDeOcorrencia,
        foto: dados[i]['registroDaOcorrencia']['dados'],
        data : dados[i]['horaDoRegistro'][2] + '/' + dados[i]['horaDoRegistro'][1] + '/' + dados[i]['horaDoRegistro'][0],
        horario: dados[i]['horaDoRegistro'][3] +':'+ dados[i]['horaDoRegistro'][3] +':' + dados[i]['horaDoRegistro'][4],
        descricao: dados[i]['descricao']
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

  private tipoDeOcorrencia(tipo) {
    if (tipo === 'ESTACIONAMENTO_INDEVIDO'){
      return 'Estacionamento indevido';
    } else{
      return 'Outro'
    }
  }

  public irParaFormulario() {
    this.navCtrl.push(FormularioPage);
  }

  public verOsDetalhesDaOcorrencia(dados) {
    console.log('dados selec', dados);
    this.navCtrl.push(DetalhesDaOcorrenciaPage, {ocorrencia: dados});
  }
}

