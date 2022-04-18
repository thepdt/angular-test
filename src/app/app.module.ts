import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpHeadersInterceptor } from './interceptors/http-headers.interceptor';
import { HttpErrorsInterceptor } from './interceptors/http-errors.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/pages/home/home.component';
import { DetailComponent } from './components/pages/detail/detail.component';
import { FavoritesComponent } from './components/pages/favorites/favorites.component';
import { NavigationComponent } from './components/shares/navigation/navigation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MosaicLayerComponent } from './components/shares/mosaic-layer/mosaic-layer.component';
import { GifCardComponent } from './components/shares/gif-card/gif-card.component';
import { FavoriteIconComponent } from './components/shares/favorite-icon/favorite-icon.component';
import { BytesModule } from './pipes/bytes/bytes.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailComponent,
    FavoritesComponent,
    NavigationComponent,
    MosaicLayerComponent,
    GifCardComponent,
    FavoriteIconComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BytesModule,
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
