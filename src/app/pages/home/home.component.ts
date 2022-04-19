import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, finalize, takeUntil } from 'rxjs';
import { Gif } from 'src/app/@core/models/giphy';
import { HttpService } from 'src/app/@core/services/http.service';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  catchError,
} from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { DestroyService } from '@core/services/destroy.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DestroyService],
})
export class HomeComponent implements OnInit, OnDestroy {
  public gifs: Array<Gif> = [];
  public mosaicLayerOptions: any = {};
  public isLoading = false;
  public isError = false;

  searchControl: FormControl = new FormControl('');

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
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy))
      .subscribe((model) => this.router.navigate(['/search', model]));

    this.activatedRoute.params
      .pipe(takeUntil(this.destroy))
      .subscribe((params: Params) => {
        if (params['gif-search']) {
          this.searchControl.setValue(params['gif-search'], {
            emitEvent: false,
          });
          this.searchGifs(params['gif-search'], 0);
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
    this.isLoading = true;
    this.isError = false;
    this.httpService
      .getTrendingGifs(offset)
      .pipe(
        catchError((error) => {
          this.isError = true;
          throw error;
        }),
        finalize(() => (this.isLoading = false)),
        takeUntil(this.destroy)
      )
      .subscribe((data) => {
        this.gifs = data.data;
      });
  }

  searchGifs(key: string, offset: number): void {
    this.isLoading = true;
    this.isError = false;
    this.httpService
      .searchGifs(key, offset)
      .pipe(
        catchError((error) => {
          this.isError = true;
          throw error;
        }),
        finalize(() => (this.isLoading = false))
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

  ngOnDestroy(): void {}
}
