import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ViewportRuler} from '@angular/cdk/scrolling';
import {GifWithPosition} from "@core/models/giphy";
import {HttpService} from "@core/services/http.service";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
  public gif!: GifWithPosition;
  public gifWidth: number = 500;
  private routeSub: Subscription = new Subscription();
  private gifSub: Subscription = new Subscription();
  private viewportSub: Subscription = new Subscription();

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
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['gifId']) {
        this.getGifById(params['gifId']);
      } else {
        this.router.navigate(['/']);
      }
    });
    this.viewportSub = this.viewportRuler
      .change(200)
      .subscribe(() => this.ngZone.run(() => this.setWindowSize()));
  }

  getGifById(id: string): void {
    this.gifSub = this.httpService.getGifById(id).subscribe((data) => {
      console.log('data: ', data);

      this.gif = { ...data.data, position: { top: '0px', left: '0px' } };
      console.log(this.gif.position);
    });
  }

  setWindowSize() {
    const { width } = this.viewportRuler.getViewportSize();
    this.gifWidth = Math.min(750, width - 48);
  }
  ngOnDestroy(): void {
    if (this.gifSub) this.gifSub.unsubscribe();
    if (this.routeSub) this.routeSub.unsubscribe();
  }
}
