import { Gif } from 'src/app/@core/models/giphy';

export const getGifHeight = (gif: Gif, gifWidth: number) => {
  const images = gif.images;
  const fixed_width = images.fixed_width;
  if (fixed_width) {
    const width: any = fixed_width.width,
      height: any = fixed_width.height;
    const aspectRatio: any = width / height;
    return Math.round(gifWidth / aspectRatio);
  }
  return 0;
};

export const fillArray = (length: number, columnOffsets: number[] = []): number[] => {
  return Array.apply(null, Array(length)).map(
    (_, index) => columnOffsets[index] || 0
  );
};
