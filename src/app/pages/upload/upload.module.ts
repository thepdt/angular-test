import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BytesModule } from '@core/pipes/bytes/bytes.module';
import { GifCardModule } from '../../components/gif-card/gif-card.module';
import { LoadingModule } from './../../components/loading/loading.module';

@NgModule({
  declarations: [UploadComponent],
  imports: [
    CommonModule,
    LoadingModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: UploadComponent,
      },
    ]),
    BytesModule,
    GifCardModule,
  ],
})
export class UploadModule {}
