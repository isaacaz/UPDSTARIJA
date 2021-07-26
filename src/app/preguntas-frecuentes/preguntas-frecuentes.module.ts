import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreguntasFrecuentesPageRoutingModule } from './preguntas-frecuentes-routing.module';

import { PreguntasFrecuentesPage } from './preguntas-frecuentes.page';
import {AcordionComponent} from '../acordion/acordion.component'
import { ModalPage } from '../modal/modal.page';
import { ModalPageModule } from '../modal/modal.module';

@NgModule({
  entryComponents:[
    ModalPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreguntasFrecuentesPageRoutingModule,
    ModalPageModule
  ],
  declarations: [PreguntasFrecuentesPage,AcordionComponent]
})
export class PreguntasFrecuentesPageModule {}
