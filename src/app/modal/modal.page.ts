import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  countrycode:string="591";
  whatsappnumber:string="";
  url:string="";
  constructor(private modalCtrl:ModalController,private platform:Platform,private browser:InAppBrowser) { }

  ngOnInit() {
    //this.whatsappnumber="69300480";
    //this.url="https://wa.me/"+this.countrycode+this.whatsappnumber+"?text=Deseo realizar una consulta";
  }
  dismissModal(){
    this.modalCtrl.dismiss();
  }
  openUrl(key){
    switch (key) {
      case 'ST':
        this.whatsappnumber="69300480";
        this.url="https://wa.me/"+this.countrycode+this.whatsappnumber+"?text=Deseo realizar una consulta";
        break;
      case 'CJ':
        this.whatsappnumber="69325133";
        this.url="https://wa.me/"+this.countrycode+this.whatsappnumber+"?text=Deseo realizar una consulta";
        break;
      case 'RG':
        this.whatsappnumber="69316771";
        this.url="https://wa.me/"+this.countrycode+this.whatsappnumber+"?text=Deseo realizar una consulta";
        break;
      case 'PV':
        this.whatsappnumber="75128080";
        this.url="https://wa.me/"+this.countrycode+this.whatsappnumber+"?text=Deseo realizar una consulta";
        break;
      case 'MI':
        this.whatsappnumber="75148828";
        this.url="https://wa.me/"+this.countrycode+this.whatsappnumber+"?text=Deseo realizar una consulta";
        break;
      default:
        break; 
    }  
    this.browser.create(this.url, '_system')
  }
  chat() {
    this.platform.ready().then(() => {
     window.open('https://api.whatsapp.com/send?phone=75148828')
    });}
    
}
