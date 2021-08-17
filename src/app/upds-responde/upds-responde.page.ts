import { Component, OnInit,ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Storage } from '@ionic/storage';
import { Device } from '@ionic-native/device/ngx';
import { ModalController} from '@ionic/angular';
import {DatabaseService} from '../services/database.service';

import { ConsultaPage } from '../consulta/consulta.page';

@Component({
  selector: 'app-upds-responde',
  templateUrl: './upds-responde.page.html',
  styleUrls: ['./upds-responde.page.scss'],
})
export class UpdsRespondePage implements OnInit {
  //@ViewChild(Content,{static:false}) content:Content;
  loader: any;
  items: Array < any > = [];
  uuid:any=null;
  isLoading=false;
  constructor(private db: DatabaseService,private loadingCtrl: LoadingController, private modalCtrl: ModalController,private storage:Storage, private browser: InAppBrowser, private device: Device) { }

  ngOnInit() {
    this.get();
  }
  async addConsulta() {
    const modal = await this.modalCtrl.create({
      component:ConsultaPage
    });
    modal.present();
    // let modal = this.modalCtrl.create('ConsultaPage');
    // modal.present();
  }
  // async  presentLoading() {
  //   this.loader = await this.loadingCtrl.create({
  //     message: "Cargando..."
  //   });
  //   return this.loader.present();
  // }

  async showLoading(message?: string) {
    this.isLoading = true;
    this.loadingCtrl.create({
      message: message ? message : 'Cargando Mensajes...'
    }).then(loader => {
      loader.present().then(() => {
        if (!this.isLoading) {
          loader.dismiss();
        }
      });
    });
  }

  async hideLoading() {
    this.isLoading = false;
    this.loadingCtrl.getTop().then(loader => {
      if (loader) {
        loader.dismiss();
      }
    });
  }

  get() {
    this.uuid=this.device.uuid;
    console.log(this.uuid);
    if (this.uuid) {
      this.showLoading();
      //this.presentLoading();
      this.db.getRealTimeDBQuery('upds/consultas',
      ref=>ref.orderByChild('uuid').equalTo(this.device.uuid).limitToLast(20))
          .subscribe((res) => {
        this.items = res;
            this.hideLoading();
        //this.loader.dismiss();
        // setTimeout(() => {
        //   this.content.resize();
        //   this.content.scrollToBottom(500);
        // }, 300);s

      })
    }
  }
  ionViewDidLeave() {
    if(this.loader)this.loader.dismiss();
  }
  openWeb(url) {
    if (url != '' || url != null) this.browser.create(url, '_self');
  }
}
