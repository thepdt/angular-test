import { Gif } from 'src/app/@core/models/giphy';

export const getGifHeight = (gif: Gif, gifWidth: number) => {
  var images = gif.images;
  var fixed_width = images.fixed_width;
  if (fixed_width) {
    var width: any = fixed_width.width,
      height: any = fixed_width.height;
    var aspectRatio: any = width / height;
    return Math.round(gifWidth / aspectRatio);
  }
  return 0;
};

export const fillArray = (length: number, columnOffsets: number[] = []) => {
  return Array.apply(null, Array(length)).map(
    (_, index) => columnOffsets[index] || 0
  );
};
