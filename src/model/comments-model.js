import { generateComments } from '../mock/comments.js';


export default class CommentsModel {
  comments = generateComments();

  getComments = () => this.comments;
}

