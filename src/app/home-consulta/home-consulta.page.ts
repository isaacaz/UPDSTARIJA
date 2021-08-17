import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ConsultaPage } from "../consulta/consulta.page";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-home-consulta",
  templateUrl: "./home-consulta.page.html",
  styleUrls: ["./home-consulta.page.scss"],
})
export class HomeConsultaPage implements OnInit {
  constructor(private router: Router, private modalCtrl: ModalController) {}

  ngOnInit() {}
  openPage(page) {
    this.router.navigate([page]);
  }
  async addConsulta() {
    const modal = await this.modalCtrl.create({
      component: ConsultaPage,
    });
    modal.present();
  }
}
