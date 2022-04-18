import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DetailComponent} from "./detail.component";
import {RouterModule} from "@angular/router";
import {BytesModule} from "../../pipes/bytes/bytes.module";

@NgModule({
  declarations: [DetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DetailComponent,
      },
    ]),
    BytesModule,
  ]
})
export class DetailModule { }
