import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdsRespondePage } from './upds-responde.page';

const routes: Routes = [
  {
    path: '',
    component: UpdsRespondePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdsRespondePageRoutingModule {}
