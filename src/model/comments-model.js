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

  addComment = async (filmId, update) => {
    try {
      const response = await this.#commentsApiService.addComment(filmId, update);
      const newComments = response.comments.map(this.#adaptToClient);
      this.#comments = newComments;
      this._notify('update', filmId);

    } catch(err) {
      throw new Error('Can\'t add comment');
    }
  };

  deleteComment = async (commentId) => {
    const index = this.#comments.findIndex((comment) => comment.id === commentId);

    if(index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    try {
      await this.#commentsApiService.deleteComment(commentId);
      this.#comments = [
        ...this.#comments.slice(0, index),
        ...this.#comments.slice(index + 1)
      ];

      this._notify('delete', commentId);

    } catch(err) {
      throw new Error('Can\'t delete comment');
    }


  };

  #adaptToClient = (comment) => {
    const adaptedComment = {
      id: comment.id,
      comment: comment.comment,
      date: comment.date !== null ? new Date(comment.date) : null,
      author: comment.author,
      emotion: comment.emotion
    };

    return adaptedComment;
  };
}

