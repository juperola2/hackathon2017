import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FormularioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-formulario',
  templateUrl: 'formulario.html',
})
export class FormularioPage {
  private foto: string;

  public causa: string = 'outro';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.foto = this.navParams.get("foto");
  }

  public proximo() {
    console.log('redireciona');
    console.log(document.querySelector('input').value);
<<<<<<< HEAD
=======
    console.log(this.causa);

    //this.navCtrl.push(FormularioPage);
>>>>>>> 51a3b2fa14cfed3000ed301b8054bb8f08f61ad9
  }

}
