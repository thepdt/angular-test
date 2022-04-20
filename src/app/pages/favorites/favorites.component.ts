import { ViewportRuler } from '@angular/cdk/scrolling';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Gif } from '@core/models/giphy';
import { DestroyService } from '@core/services/destroy.service';
import { HttpService } from '@core/services/http.service';
import { getItem, StorageItem } from '@core/utils/local-storage.utils';
import { catchError, finalize, takeUntil } from 'rxjs';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  providers: [DestroyService],
})
export class FavoritesComponent implements OnInit {
  public mosaicLayerOptions: any = {};
  public gifs: Array<Gif> = [];
  public isLoading = false;

  constructor(
    private httpService: HttpService,
    private viewportRuler: ViewportRuler,
    private ngZone: NgZone,

    private destroy: DestroyService
  ) {
    this.setWindowSize();
  }

  ngOnInit(): void {
    if (this.favoriteGifs.length > 0) this.getFavoriteGifs();
    this.viewportRuler
      .change(200)
      .pipe(takeUntil(this.destroy))
      .subscribe(() => this.ngZone.run(() => this.setWindowSize()));
  }
  get favoriteGifs(): string[] {
    return (getItem(StorageItem.Gifs) as string[]) || [];
  }
  getFavoriteGifs(): void {
    this.isLoading = true;
    this.httpService
      .getGifByIds(this.favoriteGifs)
      .pipe(
        catchError((error) => {
          throw error;
        }),
        finalize(() => {
          this.isLoading = false;
        }),
        takeUntil(this.destroy)
      )
      .subscribe((data) => {
        this.gifs = data.data;
      });
  }

  setWindowSize() {
    const { width } = this.viewportRuler.getViewportSize();
    this.mosaicLayerOptions.width = Math.min(1536, width - 48);

    switch (true) {
      case this.mosaicLayerOptions.width < 600:
        this.mosaicLayerOptions.columns = 2;
        break;
      case this.mosaicLayerOptions.width < 960:
        this.mosaicLayerOptions.columns = 3;
        break;
      case this.mosaicLayerOptions.width < 1280:
        this.mosaicLayerOptions.columns = 4;
        break;
      default:
        this.mosaicLayerOptions.columns = 5;
        break;
    }
  }
}
