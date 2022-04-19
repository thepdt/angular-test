import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GifCardComponent } from './gif-card.component';
import { FavoriteIconModule } from '../favorite-icon/favorite-icon.module';
import { ImagesModule } from '@core/pipes/images/images.module';

@NgModule({
  declarations: [GifCardComponent],
  imports: [CommonModule, ImagesModule, FavoriteIconModule],
  exports: [GifCardComponent],
})
export class GifCardModule {}
