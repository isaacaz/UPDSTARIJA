import { Component, OnInit,ViewChild } from '@angular/core';


@Component({
  selector: 'app-preguntas-frecuentes',
  templateUrl: './preguntas-frecuentes.page.html',
  styleUrls: ['./preguntas-frecuentes.page.scss'],
})
export class PreguntasFrecuentesPage implements OnInit {

  countrycode:string="591";
  whatsappnumber:string="75111830";
  url:string="https://wa.me/"+this.countrycode+this.whatsappnumber+"?text=Deseo realizar una consulta";

  constructor() {
   
   }

  ngOnInit() {
  }

}
