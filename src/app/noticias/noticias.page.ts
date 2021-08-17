import { Component, ViewChild, OnInit } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { IonInfiniteScroll, LoadingController } from "@ionic/angular";
import { DatabaseService } from "../services/database.service";
import { Router, NavigationExtras } from "@angular/router";

@Component({
  selector: "app-noticias",
  templateUrl: "./noticias.page.html",
  styleUrls: ["./noticias.page.scss"],
})
export class NoticiasPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: false })
  infiniteScroll: IonInfiniteScroll;

  items: Array<any[]> = [];
  prioridades: Array<any> = [];
  noticias: any;
  empty: boolean = false;
  limite: 12;
  category;
  lastKey: string;
  //infiniteScroll: any = null;
  limit: BehaviorSubject<number> = new BehaviorSubject<number>(12);
  queryable: boolean = true;
  loader: any;
  isLoading = false;
  constructor(
    private db: AngularFireDatabase,
    private loadingCtrl: LoadingController,
    private Data: DatabaseService,
    private router: Router
  ) {}

  ngOnInit() {
    //this.presentLoading();
    this.showLoading();
    this.limite = 12;
    //this.get();
    this.getPrioridades();
    this.plus();
    this.queryable = false;
  }

  async showLoading(message?: string) {
    this.isLoading = true;
    this.loadingCtrl
      .create({
        message: message ? message : "Cargando Noticias...",
      })
      .then((loader) => {
        loader.present().then(() => {
          if (!this.isLoading) {
            loader.dismiss();
          }
        });
      });
  }

  async hideLoading() {
    this.isLoading = false;
    this.loadingCtrl.getTop().then((loader) => {
      if (loader) {
        loader.dismiss();
      }
    });
  }

  // async presentLoading() {
  //   const loading = await this.loadingCtrl.create({
  //     cssClass: 'my-custom-class',
  //     message: 'Please wait...',
  //     //duration: 2000
  //   });
  //   await loading.present();

  //   const { role, data } = await loading.onDidDismiss();
  //   console.log('Loading dismissed!');
  // }

  // async  presentLoading() {
  //   this.loader = await this.loadingCtrl.create({
  //     message: "Cargando Noticias..."
  //   });
  //   return this.loader.present();
  // }

  // get(){
  //   this.empty = false;
  //   this.noticias=this.Data.getRealTimeDBQuery('upds/noticias',ref=>
  //    ref.orderByChild('timestamp').limitToLast(this.limit.getValue()).endAt(new Date().getTime()))

  //   this.noticias.subscribe((snap: Array < any > ) => {
  //     this.loader.onDidDismiss();
  //     this.items = snap;
  //     if (snap.length > 0) {
  //       this.items = this.items.filter((a:any) => {
  //         return a.priority == 0;
  //       })
  //       this.items.sort((a:any, b:any) => {
  //         if (a.timestamp < b.timestamp) return 1;
  //         else if(a.timestamp > b.timestamp) return -1;
  //         else return 0;
  //       })

  //       this.items.map((noticia:any) => {
  //         if (noticia.images != null) {
  //           noticia.images.reverse().map(img => {
  //             noticia.image_main = img;
  //             return false;
  //           })
  //         }
  //       })

  //       if (snap.length % 12 !=0) {
  //         this.queryable = false;
  //         if (this.infiniteScroll != null) this.infiniteScroll.disabled=true;
  //         console.log('FIN');

  //       } else {
  //         this.queryable = true;
  //       }
  //     } else this.empty = true;

  //     if (this.infiniteScroll != null) this.infiniteScroll.complete();
  //   })

  // }

  plus() {
    this.noticias = this.Data.getRealTimeDBQuery("upds/noticias", (ref) =>
      ref
        .orderByChild("timestamp")
        .limitToLast(this.limite)
        .endAt(new Date().getTime())
    );
    this.noticias.subscribe((snap: Array<any>) => {
      //this.loader.dismiss();
      this.hideLoading();
      this.items = snap;

      if (snap.length > 0) {
        this.items = this.items.filter((a: any) => {
          return a.priority == 0;
        });
        this.items.sort((a: any, b: any) => {
          if (a.timestamp < b.timestamp) return 1;
          else if (a.timestamp > b.timestamp) return -1;
          else return 0;
        });

        this.items.map((noticia: any) => {
          if (noticia.images != null) {
            noticia.images.reverse().map((img) => {
              noticia.image_main = img;
              return false;
            });
          }
        });
      }
    });
  }
  getMore(event) {
    setTimeout(() => {
      if (this.items.length > 500) {
        event.target.complete();
        this.infiniteScroll.disabled = true;
        return;
      }
      this.limite += 12;
      this.plus();
      event.target.complete();
    }, 1000);
  }

  getPrioridades() {
    this.Data.getRealTimeDBQuery("upds/noticias", (ref) =>
      ref.orderByChild("priority").equalTo("1")
    ).subscribe((snap: any) => {
      this.prioridades = snap;
    });
    this.prioridades.sort((a, b) => {
      if (a.timestamp < b.timestamp) return 1;
      else if (a.timestamp > b.timestamp) return -1;
      else return 0;
    });
    this.prioridades.map((noticia: any) => {
      if (noticia.images) {
        noticia.images.reverse().map((img) => {
          noticia.image_main = img;
          return false;
        });
      }
    });
  }

  getByCategory(ev: any) {
    if (this.category != "todas") {
      this.prioridades = [];
      this.items = [];
      //this.presentLoading();
      this.showLoading();
      this.Data.getRealTimeDBQuery("upds/noticias", (ref) =>
        ref.orderByChild("category").equalTo(this.category).limitToLast(50)
      ).subscribe((snap: Array<any>) => {
        //this.loader.dismiss();
        this.hideLoading();
        this.items = snap;
        if (snap.length > 0) {
          this.items.sort((a: any, b: any) => {
            return a.timestamp < b.timestamp ? 1 : 0;
          });

          this.items.map((noticia: any) => {
            if (noticia.images != null) {
              noticia.images.reverse().map((img) => {
                noticia.image_main = img;
                return false;
              });
            }
          });
        } else this.empty = true;
        if (this.infiniteScroll != null) this.infiniteScroll.complete();
      });
    } else {
      this.plus();
      this.getPrioridades();
    }
  }

  showPageSearch() {
    this.router.navigate(["/search"]);
  }

  showNoticia(key) {
    this.router.navigate(["/noticia-detalle"], { queryParams: { key: key } });
  }
}
