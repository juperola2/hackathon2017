import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingUtil } from '../../util/loadingUtil';
import { GeolocalizacaoServico } from '../../util/geolocalizacaoServico';
import { FormularioSucessoPage } from '../formulario-sucesso/formulario-sucesso';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
 } from '@ionic-native/google-maps';

@IonicPage()
@Component({
  selector: 'page-formulario',
  templateUrl: 'formulario.html',
})
export class FormularioPage {
  private foto: string;
  private url = "http://10.1.1.20:9000/ocorrencia";
  private tipoDeOcorrencia: string = 'outro';
  private map: GoogleMap;
  private localDaFoto: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public loadingUtil: LoadingUtil,
    private googleMaps: GoogleMaps,
    private geolocalizacao: GeolocalizacaoServico) {
    }
    
  ionViewDidLoad() {
    this.localDaFoto = this.geolocalizacao.obterLocais()[1];
    this.foto = this.navParams.get("foto");
    this.loadMap();
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

  loadMap() {
    
        let mapOptions: GoogleMapOptions = {
          camera: {
            target: {
              lat: 43.0741904,
              lng: -89.3809802
            },
            zoom: 18,
            tilt: 30
          }
        };
    
        this.map = GoogleMaps.create('map_canvas', mapOptions);
    
        // Wait the MAP_READY before using any methods.
        this.map.one(GoogleMapsEvent.MAP_READY)
          .then(() => {
            console.log('Map is ready!');
    
            // Now you can use all methods safely.
            this.map.addMarker({
                title: 'Ionic',
                icon: 'blue',
                animation: 'DROP',
                position: {
                  lat: 43.0741904,
                  lng: -89.3809802
                }
              })
              .then(marker => {
                marker.on(GoogleMapsEvent.MARKER_CLICK)
                  .subscribe(() => {
                    alert('clicked');
                  });
              });
    
          });
      }
}
