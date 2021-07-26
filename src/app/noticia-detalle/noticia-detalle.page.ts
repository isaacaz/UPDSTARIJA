import { Component, OnInit } from '@angular/core';
//import { NavParams } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import {DatabaseService} from '../services/database.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Storage } from '@ionic/storage';
import { ActivatedRoute ,Router} from '@angular/router';


@Component({
  selector: 'app-noticia-detalle',
  templateUrl: './noticia-detalle.page.html',
  styleUrls: ['./noticia-detalle.page.scss'],
})
export class NoticiaDetallePage implements OnInit  {
  key: any;
  noticia: any = {
    category: null,
    images: null,
    text: null,
    title: null,
    foot: null,
    url: null,
    timestamp: null
  }
  images:Array<any>;
  loader:any;

  constructor(private route:ActivatedRoute, private db: DatabaseService,public loadingCtrl:LoadingController,private router: Router, private storage: Storage, private social:SocialSharing, private browser: InAppBrowser) 
  {  }

  ngOnInit() {
    this.route.queryParams.subscribe(data=>{
      this.key=data.key;
      this.getNoticia();
    })
  }
  async  presentLoading() {
    this.loader = await this.loadingCtrl.create({
      message: "Cargando Noticias..."
    });
    return this.loader.present();
  }
  getNoticia() {
    console.log(this.key);
    this.db.getRealTimeDBObject('upds/noticias/' + this.key).subscribe(noticia=>{
      this.noticia=noticia;
    
    })

    this.db.getRealTimeDBList('upds/noticias/' + this.key + '/images').subscribe(imgs=>{
      this.images=imgs;
      imgs.map((img:any)=>{
      })
    })
    console.log(this.images);
  }
  like(key) {
    console.log(key);
    this.storage.get(key).then((val) => {
      if (val) {
        this.storage.remove(key).then(() => {
          this.db.getRealTimeDBObjectPromise('upds/noticias/'+key).then((o:any)=>{
            o.likes-=1;
            this.db.updateRealTimeObject('upds/noticias/'+key,o)
          });
          
          // this.firebaseApp.database().ref('upds/noticias/').child(key).child('likes').transaction((likes) => {
          //   likes--;
          //   return likes;
          // });
        })

      } else {
        this.storage.set(key, true).then(() => {
          this.db.getRealTimeDBObjectPromise('upds/noticias/'+key).then((o:any)=>{
            o.likes+=1;
            this.db.updateRealTimeObject('upds/noticias/'+key,o)
          });
          // this.firebaseApp.database().ref('upds/noticias/').child(key).child('likes').transaction((likes) => {
          //   likes++;
          //   return likes;
          // });
        })
      }
    })
  }
  share(message, imgUrl) {
   
    if (imgUrl) {
      this.convertToDataURLviaCanvas(imgUrl, "image/png")
        .then((base64Img: string) => {
          this.social.share(this.noticia.title + '\n\n' + message + '\n \n Proporcionado por UPDS Tarija', null, [base64Img], this.noticia.url).then((res) => {
          }).catch(err => {
          })
        })
    } else {
      this.social.share(this.noticia.title + '\n\n' + message + '\n \n Proporcionado por UPDS Tarija \n', null, null, this.noticia.url).then((res) => {
      }).catch(err => {
      })
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

}
