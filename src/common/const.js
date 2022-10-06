const nameCount = 2;
const FILM_COUNT = 23;
const COMMENT_COUNT = 3;
const FILM_COUNT_PER_STEP = 5;
const GenresCount = {
  min: 1,
  max: 3
};

const LoadigText = {
  LOADING: 'Loading...',
  ALL: 'There are no movies in our database',
  WATCHLIST: 'There are no movies to watch now',
  HISTORY: 'There are no watched movies now',
  FAVORITES: 'There are no favorite movies now'
};

const SortType = {
  DEFAULT: 'default',
  DATE_UP: 'date-up',
  RATING_UP: 'rating-up',
};

const FilterType = {
  ALL: 'All movies',
  WATCHLIST: 'Watchlist',
  HISTORY: 'History',
  FAVORITES: 'Favorites'
};

export {SortType, LoadigText, nameCount, FILM_COUNT, GenresCount, COMMENT_COUNT, FILM_COUNT_PER_STEP, FilterType};
