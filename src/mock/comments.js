import { getRandomValue } from '../utils.js';
import { EMOTIONS, DESCRIPTIONS, FIRST_NAMES, LAST_NAMES } from '../mock/const.js';

export const generateComment = () => (
  {
    id: 1,
    author: `${getRandomValue(FIRST_NAMES)} ${getRandomValue(LAST_NAMES)}`,
    comment: getRandomValue(DESCRIPTIONS),
    date: '2019-05-11T16:12:32.554Z',
    emotion: getRandomValue(EMOTIONS)
  },
  {
    id: 2,
    author: `${getRandomValue(FIRST_NAMES)} ${getRandomValue(LAST_NAMES)}`,
    comment: getRandomValue(DESCRIPTIONS),
    date: '2019-05-11T16:12:32.554Z',
    emotion: getRandomValue(EMOTIONS)
  }
);
