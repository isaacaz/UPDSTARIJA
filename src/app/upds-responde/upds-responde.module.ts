import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdsRespondePageRoutingModule } from './upds-responde-routing.module';

import { UpdsRespondePage } from './upds-responde.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdsRespondePageRoutingModule
  ],
  declarations: [UpdsRespondePage]
})
export class UpdsRespondePageModule {}
