import dayjs from 'dayjs';
import { FilterType } from './mock/const.js';


const humanizeFilmDueDate = (date) => dayjs(date).format('D MMMM');

const getWeightForNull = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomValue = (items) => items[getRandomInteger(0, items.length - 1)];

const filter = {
  [FilterType.ALL]: (films) => films.slice(),
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.userDetails.watchlist),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.userDetails.alreadyWatched),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.userDetails.favorite)
};

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);
  if(index === -1) {
    return items;
  }
  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};


const sortFilmDate = (filmA, filmB) => {
  const weight = getWeightForNull(filmA.filmInfo.release.date, filmB.filmInfo.release.date);
  return weight ?? dayjs(filmA.filmInfo.release.date).diff(dayjs(filmB.filmInfo.release.date));
};

const sortFilmRating = (filmA, filmB) => {
  const weight = getWeightForNull(filmA.filmInfo.totalRating, filmB.filmInfo.totalRating);
  return weight ?? filmB.filmInfo.totalRating - filmA.filmInfo.totalRating;
};


export {getRandomInteger, humanizeFilmDueDate, sortFilmDate, sortFilmRating, getRandomValue, filter, updateItem};
