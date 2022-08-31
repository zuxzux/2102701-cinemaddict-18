import { getRandomValue } from '../utils.js';
import { EMOTIONS, DESCRIPTIONS, FIRST_NAMES, LAST_NAMES, COMMENT_COUNT } from '../mock/const.js';

export const generateComment = (id) => (
  {
    id,
    author: `${getRandomValue(FIRST_NAMES)} ${getRandomValue(LAST_NAMES)}`,
    comment: getRandomValue(DESCRIPTIONS),
    date: '2019-05-11T16:12:32.554Z',
    emotion: getRandomValue(EMOTIONS)
  }

);
export const generateComments = () => {
  const comments = Array.from({length: COMMENT_COUNT}, (element, id)=>generateComment(id));
  return (comments);
};

