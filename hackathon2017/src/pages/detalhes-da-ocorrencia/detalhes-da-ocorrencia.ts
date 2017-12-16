import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var google;

@IonicPage()
@Component({
  selector: 'page-detalhes-da-ocorrencia',
  templateUrl: 'detalhes-da-ocorrencia.html',
})
export class DetalhesDaOcorrenciaPage {
  private foto: string;
  public ocorrencia = {};

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  start = 'chicago, il';
  end = 'chicago, il';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.ocorrencia = this.navParams.get("ocorrencia");
    this.foto = this.ocorrencia['foto'];
    console.log('detalhes', this.ocorrencia);
    this.iniciarMapa(this.ocorrencia['latitude'], this.ocorrencia['longitude']);
  }

  iniciarMapa(latitude, longitude) {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 16,
      center: {lat: latitude, lng: longitude}
    });

    var posicao = new google.maps.LatLng(latitude, longitude);
    var marcadorDoLocal = new google.maps.Marker({position: posicao, title: 'Local da ocorrência'});
    marcadorDoLocal.setMap(this.map);

    this.directionsDisplay.setMap(this.map);
  }


}
