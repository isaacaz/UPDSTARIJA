import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  countrycode:string="591";
  whatsappnumber:string="75111830";
  url:string="https://wa.me/"+this.countrycode+this.whatsappnumber+"?text=Deseo realizar una consulta";

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
  }
  dismissModal(){
    this.modalCtrl.dismiss();
  }
  openUrl(){
    
  }
}
