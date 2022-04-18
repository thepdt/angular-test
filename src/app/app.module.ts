import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpHeadersInterceptor} from './@core/interceptors/http-headers.interceptor';
import {HttpErrorsInterceptor} from './@core/interceptors/http-errors.interceptor';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavigationComponent} from './components/navigation/navigation.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MosaicLayerComponent} from './components/mosaic-layer/mosaic-layer.component';
import {GifCardComponent} from './components/gif-card/gif-card.component';
import {FavoriteIconComponent} from './components/favorite-icon/favorite-icon.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    MosaicLayerComponent,
    GifCardComponent,
    FavoriteIconComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeadersInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorsInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
