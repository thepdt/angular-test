import { Component, Input, SimpleChanges } from '@angular/core';
import { Gif, GifWithPosition } from 'src/app/models/giphy';
import { fillArray, getGifHeight } from 'src/app/utils/gif.util';

@Component({
  selector: 'app-mosaic-layer',
  templateUrl: './mosaic-layer.component.html',
  styleUrls: ['./mosaic-layer.component.scss'],
})
export class MosaicLayerComponent {
  public itemWidth!: number;
  public containerWidth!: string;
  public containerHeight!: string;
  public columnOffsets: number[] = [];
  public gifs: Array<GifWithPosition> = [];

  @Input() width!: number;
  @Input() columns!: number;
  @Input() gutter!: number;
  @Input() gifList!: Array<Gif>;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      !!changes['width'] ||
      !!changes['columns'] ||
      (!!changes['gifList'] && changes['gifList'].currentValue.length > 0)
    ) {
      const gutterOffset = this.gutter * (this.columns - 1);
      this.itemWidth = Math.floor((this.width - gutterOffset) / this.columns);
      const itemHeights = this.gifList.map((gif) =>
        getGifHeight(gif, this.itemWidth)
      );
      let columnTarget: number;
      const columnHeights: number[] = fillArray(
        this.columns,
        this.columnOffsets
      );

      this.gifs = this.gifList.map((gif, index) => {
        const position = { top: '', left: '' };
        columnTarget = columnHeights.indexOf(
          Math.min.apply(Math, columnHeights)
        );
        position.top = `${columnHeights[columnTarget]}px`;
        position.left = `${
          columnTarget * this.itemWidth + columnTarget * this.gutter
        }px`;
        const height = itemHeights[index];
        if (height) {
          columnHeights[columnTarget] += height + this.gutter;
        }
        return { ...gif, position };
      });

      this.containerWidth = `${
        this.columns * this.itemWidth + (this.columns - 1) * this.gutter
      }px`;
      this.containerHeight = `${
        Math.max.apply(Math, columnHeights) - this.gutter
      }px`;
    }
  }
}
