import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: async () =>
      (await import('@pages/home/home.module')).HomeModule,
  },
  {
    path: 'search/:gif-search',
    loadChildren: async () =>
      (await import('@pages/home/home.module')).HomeModule,
  },
  {
    path: 'gif/:gifId',
    loadChildren: async () =>
      (await import('@pages/detail/detail.module')).DetailModule,
  },
  {
    path: 'favorites',
    loadChildren: async () =>
      (await import('@pages/favorites/favorites.module')).FavoritesModule,
  },
  {
    path: 'upload',
    loadChildren: async () =>
      (await import('@pages/upload/upload.module')).UploadModule,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
