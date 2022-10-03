import Observable from '../framework/observable.js';
import { generateComments } from '../mock/comments.js';

export default class CommentsModel extends Observable {
  #filmsModel = null;
  #allComments = [];
  #comments = [];

  constructor(filmsModel) {
    super();
    this.#filmsModel = filmsModel;
    this.#generateAllComments();
  }

  #generateAllComments() {this.#allComments = generateComments(this.#filmsModel.get());}


  get = (film) => {
    this.#comments = film.comments.map((commentId) => this.#allComments.find((comment) => comment.id === commentId));

    return this.#comments;
  };

  add = (update) => {
    this.#allComments.push(update);
    this._notify(update);
  };

  delete = (update) => {
    const index = this.#allComments.findIndex((comment) => comment.id === update.id);

    if(index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this.#allComments = [
      ...this.#allComments.slice(0, index),
      ...this.#allComments.slice(index + 1)
    ];

    this._notify(update);
  };
}

