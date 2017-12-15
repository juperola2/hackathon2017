import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingUtil } from '../util/loadingUtil';
import { Platform } from 'ionic-angular';

@Injectable()
export class GeolocalizacaoServico {
    public static latitude: number;
    public static longitude: number;
    private chaveGoogleApi: string;
    private urlGoogleApi: string;
    locais = [];

    opcoes: {} = {
        timeout: 8000,
        enableHighAccuaracy: true
    };

    constructor(
        private http: Http,
        private loadingUtil: LoadingUtil,
        private platform: Platform,
        private geolocation: Geolocation
    ) {
        this.chaveGoogleApi = "AIzaSyB09ez3C-YuSVrrTPjIfsiNuUcGOvZkc3s";
        this.urlGoogleApi = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?language=pt-BR&radius=100&key=" + this.chaveGoogleApi;
    }

    ativarEspiao() {
        return new Promise((resolve, reject) => {
            this.geolocation.watchPosition(this.opcoes).subscribe(posicao => {
                console.log(posicao);
                GeolocalizacaoServico.latitude = posicao.coords.latitude;
                GeolocalizacaoServico.longitude = posicao.coords.longitude;
                resolve(true);
            },
            erro => {
                reject(erro);
            });
        });
    }
    
    obterLocais() {
        this.loadingUtil.ativarLoading("carregando");
        return this.http
        .get(this.urlGoogleApi + "&location=" + GeolocalizacaoServico.latitude + "," + GeolocalizacaoServico.longitude)
        .map(response => response.json())
        .subscribe(sucesso => {
            console.log(sucesso.results);
            this.loadingUtil.fecharLoading();
            return sucesso.results;
        });
    }

    obterLocaisParaAvaliacao(){
        return this.http
            .get(this.urlGoogleApi + "&location=" + GeolocalizacaoServico.latitude + "," + GeolocalizacaoServico.longitude)
            .map(response => response.json());
    }

    //Documentação: https://gist.github.com/Bloggerschmidt/aec7ed3dae3262d975d6d53009ef6aa8
    navegarAte(destino) {
        this.platform.ready().then(() => {
            this.loadingUtil.ativarLoading("Preparando rota...");
            this.geolocation.getCurrentPosition().then((position) => {
                window.open('geo://' + position.coords.latitude + ',' + position.coords.longitude + '?q=' + destino.endereco , '_system');
                this.loadingUtil.fecharLoading();
            });
        });
    };
}