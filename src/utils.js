import dayjs from 'dayjs';
import { FilterType } from './mock/const.js';


const humanizeFilmDueDate = (dueDate) => dayjs(dueDate).format('D MMMM YYYY');

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomValue = (items) => items[getRandomInteger(0, items.length - 1)];

const filter = {
  [FilterType.ALL]: (films) => films.filter,
  [FilterType.WATCHLIST]: (films) => films.filter,
  [FilterType.HISTORY]: (films) => films.filter,
  [FilterType.FAVORITES]: (films) => films.filter
};

export {getRandomInteger, humanizeFilmDueDate, getRandomValue, filter};
