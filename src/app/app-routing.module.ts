import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'filosofia',
    loadChildren: () => import('./filosofia/filosofia.module').then( m => m.FilosofiaPageModule)
  },
  {
    path: 'redes',
    loadChildren: () => import('./redes/redes.module').then( m => m.RedesPageModule)
  },
  {
    path: 'noticias',
    loadChildren: () => import('./noticias/noticias.module').then( m => m.NoticiasPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'noticia-detalle',
    loadChildren: () => import('./noticia-detalle/noticia-detalle.module').then( m => m.NoticiaDetallePageModule)
  },
  {
    path: 'upds-responde',
    loadChildren: () => import('./upds-responde/upds-responde.module').then( m => m.UpdsRespondePageModule)
  },
  {
    path: 'notificaciones',
    loadChildren: () => import('./notificaciones/notificaciones.module').then( m => m.NotificacionesPageModule)
  },
  {
    path: 'eventos',
    loadChildren: () => import('./eventos/eventos.module').then( m => m.EventosPageModule)
  },
  {
    path: 'documento',
    loadChildren: () => import('./documento/documento.module').then( m => m.DocumentoPageModule)
  },
  {
    path: 'preguntas-frecuentes',
    loadChildren: () => import('./preguntas-frecuentes/preguntas-frecuentes.module').then( m => m.PreguntasFrecuentesPageModule)
  },
 
  // {
  //   path: 'consulta',
  //   loadChildren: () => import('./consulta/consulta.module').then( m => m.ConsultaPageModule)
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
