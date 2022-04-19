import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImagesPipe } from './images.pipe';

@NgModule({
  declarations: [ImagesPipe],
  imports: [CommonModule],
  exports: [ImagesPipe],
})
export class ImagesModule {}
