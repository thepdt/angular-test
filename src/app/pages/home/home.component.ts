import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {finalize, takeUntil} from 'rxjs';
import {Gif} from 'src/app/@core/models/giphy';
import {HttpService} from 'src/app/@core/services/http.service';
import {catchError} from 'rxjs/operators';
import {ViewportRuler} from '@angular/cdk/scrolling';
import {DestroyService} from '@core/services/destroy.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DestroyService],
})
export class HomeComponent implements OnInit, OnDestroy {
  public keySearch: string = '';
  public gifs: Array<Gif> = [];
  public mosaicLayerOptions: any = {};
  public isLoading = false;
  public isLoadingMore = false;
  public isError = false;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute,

    private viewportRuler: ViewportRuler,
    private ngZone: NgZone,
    private destroy: DestroyService
  ) {
    this.setWindowSize();
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(takeUntil(this.destroy))
      .subscribe((params: Params) => {
        this.gifs = [];
        if (params['gif-search']) {
          this.keySearch = params['gif-search'];
          this.searchGifs(this.keySearch, 0);
        } else {
          this.getTrendingGifs(0);
        }
      });

    this.viewportRuler
      .change(200)
      .pipe(takeUntil(this.destroy))
      .subscribe(() => this.ngZone.run(() => this.setWindowSize()));
  }

  getTrendingGifs(offset: number): void {
    if (this.gifs.length === 0) this.isLoading = true;
    else this.isLoadingMore = true;
    this.isError = false;
    this.httpService
      .getTrendingGifs(offset)
      .pipe(
        catchError((error) => {
          this.isError = true;
          throw error;
        }),
        finalize(() => {
          this.isLoading = false;
          this.isLoadingMore = false;
        }),
        takeUntil(this.destroy)
      )
      .subscribe((data) => {
        this.gifs = [...this.gifs, ...data.data];
      });
  }

  searchGifs(key: string, offset: number): void {
    if (this.gifs.length === 0) this.isLoading = true;
    else this.isLoadingMore = true;
    this.isError = false;
    this.httpService
      .searchGifs(key, offset)
      .pipe(
        catchError((error) => {
          this.isError = true;
          throw error;
        }),
        finalize(() => {
          this.isLoading = false;
          this.isLoadingMore = false;
        })
      )
      .subscribe((data) => {
        this.gifs = [...this.gifs, ...data.data];
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

  onScroll() {
    if (this.isLoadingMore) return;
    if (this.keySearch) this.searchGifs(this.keySearch, this.gifs.length);
    else this.getTrendingGifs(this.gifs.length);
  }

  ngOnDestroy(): void {}
}
