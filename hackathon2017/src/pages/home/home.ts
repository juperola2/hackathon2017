import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormularioPage } from '../formulario/formulario';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private foto: string;

  opcoesCamera: CameraOptions = {
    quality: 60,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  constructor(
    private navCtrl: NavController,
    private camera: Camera) {
  }

  public obterFoto() {
    this.camera.getPicture(this.opcoesCamera).then((imageData) => {
      this.foto = 'data:image/jpeg;base64,' + imageData;
      this.navCtrl.push(FormularioPage, {foto: this.foto});
    }, (err) => {
      console.log(err);
    });
  }

  public irParaFormulario() {
    this.navCtrl.push(FormularioPage);
  }
}
