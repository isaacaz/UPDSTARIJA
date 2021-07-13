import { Component ,ViewChild} from '@angular/core';
import {NavController, AlertController, ToastController, Platform,Config} from '@ionic/angular'
import { Router} from '@angular/router';
import { BrowserTab } from '@ionic-native/browser-tab/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import {DatabaseService} from '../services/database.service';
import { Storage } from '@ionic/storage';
import { FCM } from '@ionic-native/fcm/ngx';
import {IonSlides} from '@ionic/angular';

declare var FCMPlugin: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  loading;
  is_android:boolean;
  badge: boolean = false;
  update;
  banner_1;
  banner_2;
  banner_3;
  banner_4;
  banner_5: any = null;
  loaded: number = 0;
  @ViewChild(IonSlides,{static: false}) slides: IonSlides;
  constructor( public platform: Platform,private fcm: FCM,public db:DatabaseService,private config:Config,private storage:Storage,private alertCtrl:AlertController,private toastCtrl:ToastController, public router:Router,public browser: BrowserTab, public iab: InAppBrowser,private version:AppVersion) 
  {
    
    this.is_android = platform.is('android');
    this.loading = false;
    this.getBanner();
    //this.config.set('ios','statusbarPadding','true');

    // this.fcm.getToken().then(token => {
    //   console.log(token);
    // });

    platform.ready().then(() => {
      if (typeof (FCMPlugin) !== "undefined") {
        FCMPlugin.getToken((t) => {
          this.storage.set('fcm_token', t);
          console.log('FCM TOKEN',t);
          
        }, function (e) {});

        FCMPlugin.onNotification((d) => {
          if (d.wasTapped == true) {
            this.showNotification(d)
          } else {
            this.storage.set('badge', true).then(() => {
              this.badge = true;
            })
            this.presentToast();
          }
        }, (msg) => {

        }, (err) => {});
      } else console.log("Notifications disabled, only provided in Android/iOS environment");
    })
    if(this.platform.is('android')){
      this.db.getRealTimeDBObject('upds/update/android').subscribe((upd:any)=>{
        if(upd.version){
          this.version.getVersionNumber().then(version=>{
            if(version!==upd.version)this.update=upd;
            else this.update=false
          })
        }
      })
      // this.af.database.object('upds/update/android').subscribe(upd=>{
      //   if(upd.version){
      //     this.version.getVersionNumber().then(version=>{
      //       if(version!==upd.version) this.update=upd;
      //       else this.update=false;
      //     })
      //   } 
      // })
    }else{
      this.db.getRealTimeDBObject('upds/update/ios').subscribe((upd:any)=>{
        if(upd.version) {
          this.version.getVersionNumber().then(version=>{
            if(version!==upd.version) this.update=upd;
            else this.update=false;
          })
        }
      })
      // this.af.database.object('upds/update/ios').subscribe(upd=>{
      //   if(upd.version) {
      //     this.version.getVersionNumber().then(version=>{
      //       if(version!==upd.version) this.update=upd;
      //       else this.update=false;
      //     })
      //   }
      // })
    }

  
  }
  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Tienes una notificación revisa la sección...',
      duration: 5000
    });
    toast.present();
  }
  showNotification(item) {
    switch (item.type) {
      case 'noticias':
          this.router.navigate(['/noticia-detalle'], 
          {queryParams:{key:item.type}});
        break;
      case 'eventos':
        this.router.navigate(['/eventos'])
        break;
      case 'upds-responde':
        this.router.navigate(['updsRespondePage'])
        break;
      default:
        this.showAlert(item.title, item.message, false);
        break;
    }
  }
  async showAlert(title, text, load: boolean) {
    let alert = await this.alertCtrl.create({
      header: title,
      subHeader: text,
      buttons: [{
        text: (load) ? 'INSTALAR' : 'ACEPTAR',
        handler: () => {
          if (load) this.iab.create(this.update.url,'_system')
        }
      }],
    });
    alert.present();
  }
  openPage(page) {
    this.router.navigate([page]);
}
openExternalWeb(url) {
  //console.log(url);
  
  if (url != '' || url != null) {
    this.browser.isAvailable()
  .then((isAvailable: boolean) => {
    if (isAvailable) {
      this.browser.openUrl(url);
    } else {
      this.iab.create(url,'_system')
    }
  });
  }
}
openWeb(url) {
  this.browser.isAvailable()
  .then((isAvailable: boolean) => {
    if (isAvailable) {
      this.browser.openUrl(url);
    } else {
      this.iab.create(url,'_self')
    }
  });
}
ionViewDidLoad() {
  //console.log("sfdf");
  if(this.slides)this.slides.startAutoplay();
  this.getBanner();
}
getBanner() {
  this.loaded = 0;
  let query = {
    query: {
      orderByChild: 'timestamp',
      limitToLast: 1
    }
  }
  //1
  this.db.getRealTimeDBQuery('upds/banner/1',ref=>ref.orderByChild('timestamp').limitToLast(1))
  .subscribe((data:any)=>{
    this.banner_1 = data[0] || 'not_found';
    ++this.loaded;
  });
  // this.af.database.list('upds/banner/1', query).subscribe((data) => {
  //   this.banner_1 = data[0] || 'not_found';
  //   ++this.loaded;
  // })
  //2
  this.db.getRealTimeDBQuery('upds/banner/2',ref=>ref.orderByChild('timestamp').limitToLast(1))
  .subscribe((data:any)=>{
    this.banner_2 = data[0] || 'not_found';
    ++this.loaded;
  });

  // this.af.database.list('upds/banner/2', query).subscribe((data) => {
  //   this.banner_2 = data[0] || 'not_found';
  //   ++this.loaded;
  // })
  //3
  this.db.getRealTimeDBQuery('upds/banner/3',ref=>ref.orderByChild('timestamp').limitToLast(1))
  .subscribe((data:any)=>{
    this.banner_3 = data[0] || 'not_found';
    ++this.loaded;
  });
  // this.af.database.list('upds/banner/3', query).subscribe((data) => {
  //   this.banner_3 = data[0] || 'not_found';
  //   ++this.loaded;
  // })
  //4
  this.db.getRealTimeDBQuery('upds/banner/4',ref=>ref.orderByChild('timestamp').limitToLast(1))
  .subscribe((data:any)=>{
    this.banner_4 = data[0] || 'not_found';
    ++this.loaded;
  });
  // this.af.database.list('upds/banner/4', query).subscribe((data) => {
  //   this.banner_4 = data[0] || 'not_found';
  //   ++this.loaded;
  // })
  //5
  this.db.getRealTimeDBQuery('upds/banner/5',ref=>ref.orderByChild('timestamp').limitToLast(1))
  .subscribe((data:any)=>{
    this.banner_5 = data[0] || 'not_found';
    ++this.loaded;
  });
  // this.af.database.list('upds/banner/5', query).subscribe((data) => {
  //   this.banner_5 = data[0] || 'not_found';
  //   ++this.loaded;
  // })
}
async Show(){
  const alert = await this.alertCtrl.create({
        header: 'Mensaje',
        message: 'Estamos trabajando en ello.',
        buttons: ['OK']
      });
  
  await alert.present();
  }
}
