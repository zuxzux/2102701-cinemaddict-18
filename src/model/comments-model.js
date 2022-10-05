import Observable from '../framework/observable.js';

export default class CommentsModel extends Observable {
  #filmsModel = null;
  #allComments = [];
  #comments = [];
  #commentsApiService = null;

  constructor(filmsModel, commentsApiService) {
    super();
    this.#filmsModel = filmsModel;
    this.#commentsApiService = commentsApiService;
  }

  init = async (id) => {
    try {
      this.#comments = await this.#commentsApiService.getComments(id);

    } catch(err) {
      this.#comments = [];
    }
    this._notify(this.#comments);
  };

  get comments() {
    return this.#comments;
  }

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

