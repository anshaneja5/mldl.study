/**
 * Japan creator promo (YouTube + Instagram), shared by the home page,
 * Journey page, guide pages and footer.
 * Video list is hand-picked — swap IDs here when new videos should lead.
 */

export const YT_CHANNEL_URL = 'https://www.youtube.com/@TheAnshAneja';
export const YT_SUBSCRIBE_URL = `${YT_CHANNEL_URL}?sub_confirmation=1`;
export const YT_HANDLE = '@TheAnshAneja';

export const IG_URL = 'https://www.instagram.com/ansh.japan/';
export const IG_HANDLE = '@ansh.japan';
// Instagram's brand gradient, used as an inline background.
export const IG_GRADIENT = 'linear-gradient(45deg, #feda75 0%, #fa7e1e 25%, #d62976 50%, #962fbf 75%, #4f5bd5 100%)';

// YouTube red. Paired with black ink/borders in the Brutal UI.
export const YT_BRAND = '#ff0033';

export const YT_PITCH =
  'I moved to Japan as a software engineer. On YouTube I show what that life actually looks like — the work days, the taxes, the tiny apartment, and the Doraemon and Shinchan places I grew up watching on TV.';

// The lead video plays inline; the rest link out to YouTube.
export const FEATURED_VIDEO = {
  id: 'qfI2NWIKN9I',
  title: 'Mai Shinchan ke sheher pahunch gaya 😭 Kasukabe, Japan 🇯🇵',
};

export const VIDEOS = [
  { id: 'QjFeEyWwM_s', title: 'Real Doraemon Museum in Japan — Nobita ka ghar bhi hai 🏠', views: '21K' },
  { id: 'Qlrl5UuFYEk', title: 'Found a Krishna temple in Tokyo 🙏 ISKCON Japan', views: '2.8K' },
  { id: 'glQmIXI9-pk', title: '30% income tax in India vs 30% income tax in Japan 🇮🇳🇯🇵', views: '2K' },
];

export const ytThumb = (id, size = 'hqdefault') => `https://i.ytimg.com/vi/${id}/${size}.jpg`;
export const ytWatch = (id) => `https://www.youtube.com/watch?v=${id}`;
