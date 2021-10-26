import { Component, OnInit } from "@angular/core";
import { AlertController, LoadingController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { Router } from "@angular/router";
import { DatabaseService } from "../services/database.service";

@Component({
  selector: "app-notificaciones",
  templateUrl: "./notificaciones.page.html",
  styleUrls: ["./notificaciones.page.scss"],
})
export class NotificacionesPage implements OnInit {
  items: Array<any> = [];
  index: number = 0;
  badge: boolean = false;
  loader: any;
  constructor(
    private router: Router,
    private db: DatabaseService,
    private alertCtrl: AlertController,
    private storage: Storage,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.storage.get("badge").then((val) => {
      if (val) this.badge = true;
    });
    this.get();
  }

  get() {
    this.presentLoading();
    this.storage.get("start_date").then((val) => {
      this.db
        .getRealTimeDBQuery("upds/notificaciones", (ref) =>
          ref.orderByChild("timestamp").limitToLast(20).startAt(val)
        )
        .subscribe((res) => {
          this.loader.dismiss();
          this.items = res.reverse();
        });
    });
  }
  async presentLoading() {
    this.loader = await this.loadingCtrl.create({
      message: "Cargando Notificaciones...",
    });
    return this.loader.present();
  }
  showItem(item, position) {
    console.log(item);
    if (position == 0) {
      this.storage.remove("badge");
      this.badge = false;
    }
    console.log(item);
    switch (item.type) {
      case "noticias":
        this.router.navigate(["/noticia-detalle"], {
          queryParams: { key: item.id_noticia },
        });
        break;
      case "eventos":
        this.router.navigate(["/eventos"]);
        break;
      case "upds-responde":
        this.router.navigate(["/upds-responde"]);
        break;
      default:
        this.showAlert(item.title, item.message);
        break;
    }
  }
  async showAlert(title, text) {
    let alert = await this.alertCtrl.create({
      header: title,
      subHeader: text,
      buttons: ["Aceptar"],
    });
    alert.present();
  }
  ionViewDidLeave() {
    this.loader.dismiss();
  }
}
