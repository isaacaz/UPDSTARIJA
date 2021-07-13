import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-filosofia',
  templateUrl: './filosofia.page.html',
  styleUrls: ['./filosofia.page.scss'],
})
export class FilosofiaPage implements OnInit {

  constructor(public platform: Platform, private browser: InAppBrowser) { }

  ngOnInit() {
  }
  openMap(){
    if(this.platform.is('ios')) this.browser.create("http://maps.apple.com/?q=Universidad+Privada+Domingo+Savio&sll=-21.537030,-64.741632&z=10&t=s", '_system');
    else this.browser.create("geo:-21.537030,-64.741632?q=-21.537030,-64.741632(Universidad Privada Domingo Savio)", '_system');
  }
}
