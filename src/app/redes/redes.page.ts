import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-redes',
  templateUrl: './redes.page.html',
  styleUrls: ['./redes.page.scss'],
})
export class RedesPage implements OnInit {

  constructor(private browser:InAppBrowser) { }

  openWeb(url) {
    if (url != '' || url != null) this.browser.create(url, '_system');
  }
  ngOnInit() {
  }

}
