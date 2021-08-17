import { Component, OnInit, ViewChild } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ModalPage } from "../modal/modal.page";
import { Router } from "@angular/router";

@Component({
  selector: "app-preguntas-frecuentes",
  templateUrl: "./preguntas-frecuentes.page.html",
  styleUrls: ["./preguntas-frecuentes.page.scss"],
})
export class PreguntasFrecuentesPage implements OnInit {
  countrycode: string = "591";
  whatsappnumber: string = "75111830";
  url: string =
    "https://wa.me/" +
    this.countrycode +
    this.whatsappnumber +
    "?text=Deseo realizar una consulta";

  constructor(private modalCtrl: ModalController, private router: Router) {}

  ngOnInit() {}

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: {
        nombre: "Isaac",
      },
    });
    await modal.present();
  }
}
