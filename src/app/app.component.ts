import { Component, ViewChild } from '@angular/core';

import { Platform, IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
declare var window: any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  @ViewChild(IonRouterOutlet,{static:false}) routerOutlet:IonRouterOutlet;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.statusBar.overlaysWebView(false);
       this.statusBar.backgroundColorByHexString('#0B2C56');
      this.platform.backButton.subscribeWithPriority(0,()=>{
        if(this.routerOutlet && this.routerOutlet.canGoBack())
        {
          this.routerOutlet.pop();
        }
        else if(this.router.url==="/home")
        navigator["app"].exitApp();
      })
    });
  }
}
