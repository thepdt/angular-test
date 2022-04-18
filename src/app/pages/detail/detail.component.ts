import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Gif } from 'src/app/@core/models/giphy';
import { HttpService } from 'src/app/@core/services/http.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { ViewportRuler } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
  public gif!: Gif;
  private routeSub: Subscription = new Subscription();
  private gifSub: Subscription = new Subscription();

  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['gifId']) {
        this.getGifById(params['gifId']);
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  getGifById(id: string): void {
    this.gifSub = this.httpService.getGifById(id).subscribe((data) => {
      console.log('data: ', data);

      this.gif = data.data;
    });
  }
  ngOnDestroy(): void {}
}
