import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreguntasFrecuentesPageRoutingModule } from './preguntas-frecuentes-routing.module';

import { PreguntasFrecuentesPage } from './preguntas-frecuentes.page';
import {AcordionComponent} from '../acordion/acordion.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreguntasFrecuentesPageRoutingModule
  ],
  declarations: [PreguntasFrecuentesPage,AcordionComponent]
})
export class PreguntasFrecuentesPageModule {}
