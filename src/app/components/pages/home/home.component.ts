import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Gif } from 'src/app/models/giphy';
import { HttpService } from 'src/app/services/http.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { ViewportRuler } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public gifs: Array<Gif> = [];
  public mosaicLayerOptions: any = {};
  private routeSub: Subscription = new Subscription();
  private gifSub: Subscription = new Subscription();
  private viewportSub: Subscription = new Subscription();

  searchControl: FormControl = new FormControl('');

  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute,

    private viewportRuler: ViewportRuler,
    private ngZone: NgZone
  ) {
    this.setWindowSize();
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((model) => this.router.navigate(['/search', model]));

    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['gif-search']) {
        this.searchControl.setValue(params['gif-search'], { emitEvent: false });
        this.searchGifs(params['gif-search'], 0);
      } else {
        this.getTrendingGifs(0);
      }
    });

    this.viewportSub = this.viewportRuler
      .change(200)
      .subscribe(() => this.ngZone.run(() => this.setWindowSize()));
  }

  getTrendingGifs(offset: number): void {
    this.gifSub = this.httpService.getTrendingGifs(offset).subscribe((data) => {
      this.gifs = data.data;
    });
  }

  searchGifs(key: string, offset: number): void {
    this.gifSub = this.httpService.searchGifs(key, offset).subscribe((data) => {
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

  ngOnDestroy(): void {
    if (this.gifSub) this.gifSub.unsubscribe();
    if (this.routeSub) this.routeSub.unsubscribe();
    if (this.viewportSub) this.viewportSub.unsubscribe();
  }
}
