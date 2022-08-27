import { getRandomInteger, getRandomValue } from '../utils.js';
import { generateComment } from './comments.js';
import {POSTERS, TITLES, Rating, Age, FIRST_NAMES, LAST_NAMES, nameCount, COUNTRIES, GENRES, RunTimes, DESCRIPTIONS, GenresCount} from './const.js';

export const generateFilm = () => (
  {
    id: 0,
    comments: generateComment(),
    filmInfo: {
      title: getRandomValue(TITLES),
      alternativeTitle: getRandomValue(TITLES),
      totalRating: getRandomInteger(Rating.min, Rating.max),
      poster: getRandomValue(POSTERS),
      ageRating: getRandomInteger(Age.min, Age.max),
      director: `${getRandomValue(FIRST_NAMES)} ${getRandomValue(LAST_NAMES)}`,
      writers: Array.from({length: nameCount}, () => `${getRandomValue(FIRST_NAMES)} ${getRandomValue(LAST_NAMES)}`),
      actors: Array.from({length: nameCount}, () => `${getRandomValue(FIRST_NAMES)} ${getRandomValue(LAST_NAMES)}`),
      release: {
        date: '2019-05-11T00:00:00.000Z',
        releaseCountry: getRandomValue(COUNTRIES)
      },
      runtime: getRandomInteger(RunTimes.min, RunTimes.max),
      genre: Array.from({length: getRandomInteger(GenresCount.min, GenresCount.max)}, () => getRandomValue(GENRES)),
      description: getRandomValue(DESCRIPTIONS)
    },
    userDetails: {
      watchlist: false,
      alreadyWatched: true,
      watchingDate: '2019-04-12T16:12:32.554Z',
      favorite: false
    }
  }
);


