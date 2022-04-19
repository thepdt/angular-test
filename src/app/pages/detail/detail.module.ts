import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail.component';
import { RouterModule } from '@angular/router';
import { BytesModule } from '@core/pipes/bytes/bytes.module';
import { GifCardModule } from '../../components/gif-card/gif-card.module';
import { LoadingModule } from './../../components/loading/loading.module';

@NgModule({
  declarations: [DetailComponent],
  imports: [
    CommonModule,
    LoadingModule,
    RouterModule.forChild([
      {
        path: '',
        component: DetailComponent,
      },
    ]),
    BytesModule,
    GifCardModule,
  ],
})
export class DetailModule {}
