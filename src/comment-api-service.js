import ApiService from './framework/api-service.js';

const Method = {
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class CommentsApiService extends ApiService {
  getComments(movieId) {
    return this._load({url: `comments/${movieId}`})
      .then(ApiService.parseResponse);
  }

  addComment = async (filmId, comment) => {
    const response = await this._load({
      url: `comments/${filmId}`,
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(comment)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  deleteComment = async (commentId) => {
    const response = await this._load({
      url: `comments/${commentId}`,
      method: Method.DELETE,
    });

    return response;
  };

  #adaptToServer = (comment) => {
    const adaptedComment = {
      id: comment.id,
      comment: comment.comment,
      date: comment.date instanceof Date ? comment.date.toISOString() : null,
      author: comment.author,
      emotion: comment.emotion
    };

    return adaptedComment;
  };
}
