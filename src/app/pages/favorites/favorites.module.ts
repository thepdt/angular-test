import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './favorites.component';
import { RouterModule } from '@angular/router';
import { LoadingModule } from 'src/app/components/loading/loading.module';
import { MosaicLayoutModule } from 'src/app/components/mosaic-layout/mosaic-layout.module';

@NgModule({
  declarations: [FavoritesComponent],
  imports: [
    CommonModule,
    LoadingModule,
    MosaicLayoutModule,
    RouterModule.forChild([
      {
        path: '',
        component: FavoritesComponent,
      },
    ]),
  ],
})
export class FavoritesModule {}
