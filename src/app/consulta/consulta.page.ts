import { Component, OnInit } from "@angular/core";
import {
  LoadingController,
  ToastController,
  AlertController,
  ModalController,
} from "@ionic/angular";
import { Device } from "@ionic-native/device/ngx";
import { DatabaseService } from "../services/database.service";
import { Storage } from "@ionic/storage";
import { Router } from "@angular/router";

declare var FCMPlugin;

@Component({
  selector: "app-consulta",
  templateUrl: "./consulta.page.html",
  styleUrls: ["./consulta.page.scss"],
})
export class ConsultaPage implements OnInit {
  consult: any;
  loader: any;
  toast: any;
  lista: any;
  isLoading: any;
  constructor(
    public loadingCtrl: LoadingController,
    private db: DatabaseService,
    public toastCtrl: ToastController,
    private alert: AlertController,
    public modalcontroller: ModalController,
    private storage: Storage,
    private device: Device,
    private router: Router
  ) {}

  ngOnInit() {
    this.consult = {
      name: "",
      text: "",
      type: "preguntas",
      email: "",
      phone: "",
      cellphone: "",
      category: "estudiante",
    };
    this.db
      .getRealTimeDBQuery("upds/consultas", (ref) =>
        ref.orderByChild("uuid").equalTo(this.device.uuid).limitToLast(1)
      )
      .subscribe((res) => {
        if (res[0]) {
          this.consult = {
            name: res[0].name ? res[0].name : "",
            text: "",
            type: "preguntas",
            email: res[0].email ? res[0].email : "",
            phone: res[0].phone ? res[0].phone : "",
            cellphone: res[0].cellphone ? res[0].cellphone : "",
            category: res[0].category ? res[0].category : "",
          };
        }
      });
  }
  //   async  presentLoading() {
  //     this.loader = await this.loadingCtrl.create({
  //       message: "Espere por favor..."
  //     });
  //     return this.loader.present();
  //   }
  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: "Se envio tu consulta",
      duration: 2000,
      position: "bottom",
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

  async logForm(form) {
    let confirm = await this.alert.create({
      header: "¿Enviar tu Consulta?",
      message: "",
      buttons: [
        {
          text: "Cancelar",
          handler: () => {},
        },
        {
          text: "Enviar",
          handler: async () => {
            var datos = form;
            datos.timestamp = new Date().getTime();
            datos.visto = "no";
            datos.uuid = this.device.uuid;
            let loading = await this.loadingCtrl.create({
              message: "Espera por favor...",
            });
            loading.present();
            //loading.present();
            FCMPlugin.getToken(
              (t) => {
                console.log(datos);
                datos.fcm = t;
                this.db
                  .pushRealTimeObject("upds/consultas", datos)
                  .then((res) => {
                    //loading.dismiss();
                    this.hideLoading();
                    //this.presentLoading();
                    this.presentToast();
                    this.modalcontroller.dismiss();
                    this.router.navigate(["/upds-responde"]);
                  });
                // this.db.getRealTimeDBList('upds/consultas').subscribe(async res=>{
                //   res.push(datos)

                // })
                // this.af.database.list('upds/consultas').push(datos).then((res) => {

                //   this.loader.dismiss();
                //   this.presentLoading();
                //   this.toast.present();
                //   this.modalcontroller.dismiss();
                // });
              },
              (e) => {
                //this.loader.dismiss();
                this.hideLoading();
              }
            );
          },
        },
      ],
    });
    confirm.present();
  }
  close() {
    this.modalcontroller.dismiss();
    this.router.navigate(["/upds-responde"]);
  }
}
