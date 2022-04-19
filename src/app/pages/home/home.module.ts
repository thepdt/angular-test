import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HomeComponent } from './home.component';
import { MosaicLayoutModule } from '../../components/mosaic-layout/mosaic-layout.module';
import { LoadingModule } from './../../components/loading/loading.module';
@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    MosaicLayoutModule,
    LoadingModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
    ]),
  ],
})
export class HomeModule {}
