import dayjs from 'dayjs';

const humanizeFilmDueDate = (dueDate) => dayjs(dueDate).format('D MMMM YYYY');

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomValue = (items) => items[getRandomInteger(0, items.length - 1)];

export {getRandomInteger, humanizeFilmDueDate, getRandomValue};
