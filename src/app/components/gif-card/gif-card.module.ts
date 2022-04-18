import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GifCardComponent} from "./gif-card.component";
import {FavoriteIconModule} from "../favorite-icon/favorite-icon.module";



@NgModule({
  declarations: [GifCardComponent],
  imports: [
    CommonModule,
    FavoriteIconModule
  ],
  exports: [GifCardComponent]
})
export class GifCardModule { }
