import { LoadingController, Loading } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class LoadingUtil {
    private loading: Loading;

    constructor(
        private loadingCtrl: LoadingController
    ){}

    public ativarLoading(textoDoLoading: string) {
        this.loading = this.loadingCtrl.create({
            content: textoDoLoading
        });
        this.loading.present();
    }

    public fecharLoading() {
        this.loading.dismiss();
    }
}