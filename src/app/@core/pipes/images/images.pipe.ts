import { Pipe, PipeTransform } from '@angular/core';
import { Images } from '@core/models/giphy';

@Pipe({
  name: 'images',
})
export class ImagesPipe implements PipeTransform {
  transform(images: Images): string {
    if (images.downsized?.url) return images.downsized.url;
    Object.entries(images).forEach(([_key, value]) => {
      if (value.url) return value.url;
    });

    return '';
  }
}
