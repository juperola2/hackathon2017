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
  public marcadores = [];


  @ViewChild('map') mapElement: ElementRef;
  map: any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private geolocalizacao: GeolocalizacaoServico) {
      
  }

  ionViewDidLoad(){
    this.ocorrencias = this.navParams.get("ocorrencias");
    let infowindow = this.iniciarMapa();
    this.configurarLocalAtual(infowindow);

  }

  colocarMarcador( ocorrencia, infowindow ) {


    var latLng = new google.maps.LatLng(ocorrencia['latitude'] , ocorrencia['longitude']);
    var marcador = new google.maps.Marker({
      position : latLng,
      map      : this.map
    });
    marcador['ocorrencia'] = ocorrencia;
    google.maps.event.addListener(marcador, 'click', function(){
        infowindow.close(); // fechar a aberta
        infowindow.setContent( '<div><strong>'+ marcador['ocorrencia']['tipoDaOcorrencia']+'</strong><br>'+
        marcador['ocorrencia']['data'] + ' <quad>  ' + marcador['ocorrencia']['horario'] +'<br><strong>' + marcador['ocorrencia']['status']+'</strong></div>');
        infowindow.open(this.map, marcador);
    });
  }

  iniciarMapa() {
    if (this.ocorrencias.length > 0) {
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: 12,
        center: {lat: this.ocorrencias[0]['latitude'], lng: this.ocorrencias[0]['longitude']}
      });
    }

    var infowindow = new google.maps.InfoWindow();

    for(var i = 0; i < this.ocorrencias.length; i++) {
      this.colocarMarcador(this.ocorrencias[i], infowindow);
    }
  
    this.directionsDisplay.setMap(this.map);
    return infowindow;
  }

  configurarLocalAtual(infowindow) {

    var posicao = new google.maps.LatLng(GeolocalizacaoServico.latitude, GeolocalizacaoServico.longitude);
    this.marcador = new google.maps.Marker({position: posicao, title: 'Meu local', icon: {
      path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
      scale: 6,
      strokeColor	:'blue'      
    }});
    this.marcador.setMap(this.map);
    this.map.setCenter({lat: GeolocalizacaoServico.latitude, lng: GeolocalizacaoServico.longitude});
    console.log('lat', GeolocalizacaoServico.latitude);

    google.maps.event.addListener(this.marcador, 'click', function() {
      infowindow.setContent('<div><strong>Meu local</strong></div>');
      infowindow.open(this.map, this);
    });
  }

}
