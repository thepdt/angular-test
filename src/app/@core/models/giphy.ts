export interface GifWithPosition extends Gif {
  position: { top: string; left: string };
}

export interface Gif {
  type: string;
  id: string;
  slug: string;
  url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  rating: string;
  content_url: string;
  user: User;
  source_tld: string;
  source_post_url: string;
  update_datetime: string;
  create_datetime: string;
  import_datetime: string;
  trending_datetime: string;
  images: Images;
  title: string;
}

export interface APIResponse<T> {
  data: T;
}

interface User {
  avatar_url: string;
  banner_url: string;
  profile_url: string;
  username: string;
  display_name: string;
}

interface Images {
  fixed_height: Image;
  fixed_height_still: Image;
  fixed_height_downsampled: Image;
  fixed_width: Image;
  fixed_width_still: Image;
  fixed_width_downsampled: Image;
  fixed_height_small: Image;
  fixed_height_small_still: Image;
  fixed_width_small: Image;
  fixed_width_small_still: Image;
  downsized: Image;
  downsized_still: Image;
  downsized_large: Image;
  downsized_medium: Image;
  downsized_small: Image;
  original: Image;
  original_still: Image;
  looping: Image;
  preview: Image;
  preview_gif: Image;
}

interface Image {
  url: string;
  width: string;
  height: string;
  size: string;
  mp4: string;
  mp4_size: string;
  webp: string;
  webp_size: string;
}
