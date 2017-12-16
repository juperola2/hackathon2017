import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GeolocalizacaoServico} from '../../util/geolocalizacaoServico';

declare var google;


@IonicPage()
@Component({
  selector: 'page-mapa-de-ocorrencias',
  templateUrl: 'mapa-de-ocorrencias.html',
})
export class MapaDeOcorrenciasPage {

  public ocorrencias = [];
  public marcador : any;


  @ViewChild('map') mapElement: ElementRef;
  map: any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private geolocalizacao: GeolocalizacaoServico) {
      
  }

  ionViewDidLoad(){
    this.ocorrencias = this.navParams.get("ocorrencias");
    this.iniciarMapa();
    this.configurarLocalAtual();

  }

  iniciarMapa() {
    if (this.ocorrencias.length > 0) {
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: 12,
        center: {lat: this.ocorrencias[0]['latitude'], lng: this.ocorrencias[0]['longitude']}
      });
    }
    for(var i = 0; i < this.ocorrencias.length; i++) {
      var posicao = new google.maps.LatLng(this.ocorrencias[i]['latitude'], this.ocorrencias[i]['longitude']);
      var marcadorDoLocal = new google.maps.Marker({position: posicao, title: this.ocorrencias[i]['tipoDaOcorrencia']});
      marcadorDoLocal.setMap(this.map);
    }
  
    this.directionsDisplay.setMap(this.map);
  }

  configurarLocalAtual() {
    this.geolocalizacao.obterLocalAtual();

    var posicao = new google.maps.LatLng(GeolocalizacaoServico.latitude, GeolocalizacaoServico.longitude);
    this.marcador = new google.maps.Marker({position: posicao, title: 'Meu local', icon: {
      path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
      scale: 6,
      strokeColor	:'blue'      
    }});
    this.marcador.setMap(this.map);
    this.map.setCenter({lat: GeolocalizacaoServico.latitude, lng: GeolocalizacaoServico.longitude});
    console.log('lat', GeolocalizacaoServico.latitude);
  }

}
