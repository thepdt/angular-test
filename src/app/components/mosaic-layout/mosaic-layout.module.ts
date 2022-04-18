import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MosaicLayoutComponent} from "./mosaic-layout.component";
import {GifCardModule} from "../gif-card/gif-card.module";



@NgModule({
  declarations: [MosaicLayoutComponent],
  imports: [
    CommonModule,
    GifCardModule
  ],
  exports: [MosaicLayoutComponent]
})
export class MosaicLayoutModule { }
