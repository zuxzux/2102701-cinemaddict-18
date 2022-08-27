import { generateComment } from '../mock/comments.js';
import { COMMENT_COUNT } from '../mock/const.js';

export default class CommentsModel {
  films = Array.from({length: COMMENT_COUNT}, generateComment);

  getComments = () => this.films;
}

