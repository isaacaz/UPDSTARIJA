import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilosofiaPage } from './filosofia.page';

const routes: Routes = [
  {
    path: '',
    component: FilosofiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilosofiaPageRoutingModule {}
