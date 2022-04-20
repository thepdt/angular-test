import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { getItem, setItem, StorageItem } from '@core/utils/local-storage.utils';
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

  get favoriteGifs(): string[] {
    return (getItem(StorageItem.Gifs) as string[]) || [];
  }

  set favoriteGifs(gifIds: string[]) {
    setItem(StorageItem.Gifs, gifIds);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes['gif']) {
      this.isFavorite = !!this.favoriteGifs?.includes(this.gif.id);
    }
  }

  toggleFavorite() {
    if (this.isFavorite)
      this.favoriteGifs = this.favoriteGifs.filter((id) => this.gif.id !== id);
    else this.favoriteGifs = [...this.favoriteGifs, this.gif.id];
    this.isFavorite = !this.isFavorite;
  }
}
