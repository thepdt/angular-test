import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { catchError, finalize, takeUntil } from 'rxjs';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { GifWithPosition } from '@core/models/giphy';
import { HttpService } from '@core/services/http.service';
import { DestroyService } from '@core/services/destroy.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  providers: [DestroyService],
})
export class DetailComponent implements OnInit, OnDestroy {
  public gif!: GifWithPosition;
  public gifWidth: number = 500;
  public isLoading = false;

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
        if (params['gifId']) {
          this.getGifById(params['gifId']);
        } else {
          this.router.navigate(['/']).then();
        }
      });
    this.viewportRuler
      .change(200)
      .pipe(takeUntil(this.destroy))
      .subscribe(() => this.ngZone.run(() => this.setWindowSize()));
  }

  getGifById(id: string): void {
    this.isLoading = true;
    this.httpService
      .getGifById(id)
      .pipe(
        catchError((error) => {
          throw error;
        }),
        finalize(() => (this.isLoading = false)),
        takeUntil(this.destroy)
      )
      .subscribe((data) => {
        this.gif = { ...data.data, position: { top: '0px', left: '0px' } };
        console.log(this.gif.position);
      });
  }

  setWindowSize() {
    const { width } = this.viewportRuler.getViewportSize();
    this.gifWidth = Math.min(750, width - 48);
  }
  ngOnDestroy(): void {}
}
