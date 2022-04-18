import {
  Component,
  OnDestroy,
  OnInit,
  Input,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Gif, GifWithPosition } from 'src/app/@core/models/giphy';
import { getGifHeight } from 'src/app/@core/utils/gif.util';

@Component({
  selector: 'app-gif-card',
  templateUrl: './gif-card.component.html',
  styleUrls: ['./gif-card.component.scss'],
})
export class GifCardComponent implements OnInit {
  public height!: number;

  @Input() gif!: GifWithPosition;
  @Input() width!: number;

  getRandomColor = ['#00ccff', '#00ff99', '#9933ff', '#ff6666', '#fff35c'][
    Math.round(Math.random() * 4)
    ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes['width']) {
      this.height = getGifHeight(this.gif, changes['width'].currentValue);
    }
  }

  selectGif() {
    this.router.navigate(['/gif', this.gif.id]).then();
  }
}
