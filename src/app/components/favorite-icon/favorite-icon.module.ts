import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FavoriteIconComponent} from "./favorite-icon.component";



@NgModule({
  declarations: [FavoriteIconComponent],
  imports: [
    CommonModule
  ],
  exports: [FavoriteIconComponent]
})
export class FavoriteIconModule { }
