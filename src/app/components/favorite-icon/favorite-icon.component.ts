import { Component, Input, OnInit } from '@angular/core';
import { GifWithPosition } from 'src/app/@core/models/giphy';

@Component({
  selector: 'app-favorite-icon',
  templateUrl: './favorite-icon.component.html',
  styleUrls: ['./favorite-icon.component.scss'],
})
export class FavoriteIconComponent implements OnInit {
  public isFavorite?: boolean;
  @Input() gif!: GifWithPosition;
  constructor() {}

  ngOnInit(): void {}

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }
}
