import { Component, OnInit } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { LoadingController } from '@ionic/angular';
import {DatabaseService} from '../services/database.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {
  eventos: any;
  empty: boolean = false;
  infiniteScroll: any = null;
  lastKey: string;
  //limit: BehaviorSubject < number > = new BehaviorSubject < number > (10);
  queryable: boolean = true;
  limite=10;
  loader: any;
  // , @Inject(FirebaseApp) private firebaseApp: any
  
  constructor(private db:DatabaseService, private loadingCtrl: LoadingController, private storage: Storage, private social: SocialSharing, private browser: InAppBrowser) 
  { }

  ngOnInit() {
    this.presentLoading();
    this.getLast();
    this.get();
    this.queryable = false;
  }

  async  presentLoading() {
    this.loader = await this.loadingCtrl.create({
      message: "Cargando Eventos..."
    });
    return this.loader.present();
  }
  getLast() {
    this.db.getRealTimeDBQuery('upds/eventos',ref=>
    ref.orderByChild('timestamp').startAt(new Date().getTime()).limitToLast(1))
      .subscribe((data: any) => {
      if (data.length > 0) {
        this.lastKey = data[0].$key;
      } else {
        this.lastKey = '';
      }
    });
  }
  get() {
    this.empty = false;
    this.eventos=this.db.getRealTimeDBQuery('upds/eventos/',ref=>
    ref.orderByChild('timestamp').limitToLast(1))

    this.eventos.subscribe((snap) => {
      this.loader.dismiss();
      if (snap.length > 0) {

        if (snap[snap.length - 1].$key === this.lastKey) {
          this.queryable = false;
        } else {
          this.queryable = true;
        }
      } else this.empty = true;
      if (this.infiniteScroll != null) this.infiniteScroll.complete();
    })
  }
  getMore(event) {
        setTimeout(() => {
          if(this.eventos.length>500){
            event.target.complete();
            this.infiniteScroll.disabled=true;
            return;
          }
          this.limite+=10;
          this.get();
          event.target.complete();
        }, 1000);
        
      }
  // getMore(infiniteScroll) {
  //   if (this.queryable) {
  //     this.infiniteScroll = infiniteScroll;
  //     this.limit.next(this.limit.getValue() + 10);
  //   } else infiniteScroll.enable(false);
  // }
  like(eventId) {
    this.db.getRealTimeDBQuery('upds/eventos',ref=>
    ref.orderByChild('timestamp').startAt(new Date().getTime()).limitToFirst(this.limite))
    .subscribe().unsubscribe();
    this.storage.get(eventId).then((val) => {
      if (val) {
        this.storage.remove(eventId).then(() => {
          this.db.getRealTimeDBObject('upds/eventos/'+eventId).subscribe((o:any)=>{
            
            o.likes--;
            this.db.updateRealTimeObject('upds/eventos/'+eventId,o);
          })
          // this.firebaseApp.database().ref('upds/eventos/').child(eventId).child('likes').transaction((likes) => {
          //   likes--;
          //   return likes;
          // });
        })

      } else {
        this.storage.set(eventId, true).then(() => {
          this.db.getRealTimeDBObject('upds/eventos/'+eventId).subscribe((o:any)=>{
            o.likes++;
            this.db.updateRealTimeObject('upds/eventos/'+eventId,o);
          })
          // this.firebaseApp.database().ref('upds/eventos/').child(eventId).child('likes').transaction((likes) => {
          //   likes++;
          //   return likes;
          // });
        })
      }
    })
  }
  share(title, message, imgUrl, url) {
    if (imgUrl) {
      this.convertToDataURLviaCanvas(imgUrl, "image/jpeg")
        .then((base64Img: string) => {
          this.social.share(title + '\n\n' + message + '\n \n Proporcionado por UPDS Tarija', null, [base64Img], url).then((res) => {}).catch(err => {})
        })
    } else {
      this.social.share(title + '\n\n' + message + '\n \n Proporcionado por UPDS Tarija \n', null, null, url).then((res) => {}).catch(err => {})
    }

  }
  convertToDataURLviaCanvas(url, outputFormat) {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = function () {
        let canvas = < HTMLCanvasElement > document.createElement('CANVAS'),
          ctx = canvas.getContext('2d'),
          dataURL;
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        //callback(dataURL);
        canvas = null;
        resolve(dataURL);
      };
      img.src = url;
    });
  }
  openWeb(url) {
    if (url != '' || url != null) this.browser.create(url, '_self');
  }
  ionViewDidLeave() {
    this.loader.dismiss();
  }
}