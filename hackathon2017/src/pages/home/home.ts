import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormularioPage } from '../formulario/formulario';
import { GeolocalizacaoServico } from '../../util/geolocalizacaoServico';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private foto: string;
  private localAtual: any;

  opcoesCamera: CameraOptions = {
    quality: 60,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  constructor(
    private navCtrl: NavController,
    private camera: Camera,
    private geolocalizacao: GeolocalizacaoServico) {
  }

  ionViewDidLoad(){
    this.geolocalizacao.ativarEspiao();
  }

  public obterFoto() {
    this.camera.getPicture(this.opcoesCamera).then((imageData) => {
      this.foto = 'data:image/jpeg;base64,' + imageData;
      this.navCtrl.push(FormularioPage, {foto: this.foto, localSelecionado: this.localAtual});
    }, (err) => {
      console.log(err);
    });
  }

  public irParaFormulario() {
    let self = this;
    let salvarLocais = function(locais) {
      self.localAtual = locais[1];
      console.log(self.localAtual);
      console.log(locais.results);
      self.navCtrl.push(FormularioPage, {foto: self.foto, localSelecionado: self.localAtual});
    }
    this.geolocalizacao.obterLocais(salvarLocais);
  }
}