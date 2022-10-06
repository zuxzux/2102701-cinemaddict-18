//import { nanoid } from 'nanoid';
import he from 'he';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizeFilmDueDate } from '../utils.js';
import { formatStringToDateWithTime, formatMinutesToTime } from '../utils.js';

const emotions = {
  angry: './images/emoji/angry.png',
  puke: './images/emoji/puke.png',
  sleeping: './images/emoji/sleeping.png',
  smile: './images/emoji/smile.png'
};

const createFilmDetailsTemplate = (film) => {
  const {filmInfo, comments, userDetails, checkedEmotion } = film;
  const saveComment = film.comment;
  let commentsList = '';

  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];
    commentsList += comment.author ? `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        ${comment.emotion ? `<img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-smile"></img>` : ''}
      </span>
      <div>
        <p class="film-details__comment-text">${comment.comment ? he.encode(comment.comment) : ''}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comment.author}</span>
          <span class="film-details__comment-day">${formatStringToDateWithTime(comment.date)}</span>
          <button class="film-details__comment-delete" data-id=${comment.id}>Delete</button>
        </p>
      </div>
    </li>` : '';
  }
  return (
    `<section class="film-details">
    <div class="film-details__inner">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src=${filmInfo.poster} alt="">
            <p class="film-details__age">${filmInfo.ageRating}+</p>
          </div>
          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${filmInfo.title}</h3>
                <p class="film-details__title-original">Original: ${filmInfo.title}</p>
              </div>
              <div class="film-details__rating">
                <p class="film-details__total-rating">${filmInfo.totalRating}</p>
              </div>
            </div>
            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${filmInfo.director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${filmInfo.writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${filmInfo.actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${humanizeFilmDueDate(filmInfo.release.date)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${formatMinutesToTime(filmInfo.runtime)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${filmInfo.release.releaseCountry}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  <span class="film-details__genre">${filmInfo.genre}</span></td>
              </tr>
            </table>
            <p class="film-details__film-description">
              ${filmInfo.description}
            </p>
          </div>
        </div>
        <section class="film-details__controls">
          <button type="button" class="film-details__control-button ${userDetails.watchlist ? 'film-details__control-button--active' : ''} film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button ${userDetails.alreadyWatched ? 'film-details__control-button--active' : ''} film-details__control-button--watched" id="watched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button ${userDetails.favorite ? 'film-details__control-button--active' : ''} film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
        </section>
      </div>
      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${film.comments.length}</span></h3>
          <ul class="film-details__comments-list">
            ${commentsList}
          </ul>
          <form class="film-details__new-comment" action="" method="get">
            <div class="film-details__add-emoji-label">
              ${checkedEmotion ? `<img src='${emotions[checkedEmotion]}' width="55" height="55" alt="emoji">` : ''}
            </div>
            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${saveComment ? he.encode(saveComment) : ''}</textarea>
            </label>
            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${checkedEmotion === '3' ? 'checked' : ''}>
              <label class="film-details__emoji-label" for="emoji-smile" data-emotion-type='smile'>
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${checkedEmotion === '2' ? 'checked' : ''}>
              <label class="film-details__emoji-label" for="emoji-sleeping" data-emotion-type='sleeping'>
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${checkedEmotion === '1' ? 'checked' : ''}>
              <label class="film-details__emoji-label" for="emoji-puke" data-emotion-type='puke'>
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${checkedEmotion === '0' ? 'checked' : ''}>
              <label class="film-details__emoji-label" for="emoji-angry" data-emotion-type='angry'>
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </form>
        </section>
      </div>
    </div>
  </section>`
  );
};

export default class FilmDetailsView extends AbstractStatefulView {
  #film = null;
  #comments = null;

  constructor(film, comments, viewData, updateViewData) {
    super();
    this.#comments = comments;

    this._state = FilmDetailsView.parseFilmToState(
      film,
      comments,
      viewData.emotion,
      viewData.comments,
      viewData.scrollPosition
    );
    this.updateViewData = updateViewData;
    this.setScrollPosition();
    this.#setInnerHandlers();
  }

  get template() {
    return createFilmDetailsTemplate(this._state);
  }

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setCloseBtnClickHandler(this._callback.closeClick);
    this.setAddToWatchlistHandler(this._callback.addToWatchlistClick);
    this.setMarkAsWatchedHandler(this._callback.markAsWatchedClick);
    this.setFavoriteHandler(this._callback.favoriteClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.setAddCommentHandler(this._callback.addComment);
  };

  setAddCommentHandler = (callback) => {
    this._callback.addComment = callback;
    this.element.addEventListener('keydown', this.#addCommentKeydown);
  };

  setScrollPosition = () => {
    this.element.scrollTop = this._state.scrollPosition;
  };

  setDeleteClickHandler = (callback) => {
    this.setScrollPosition();
    this._callback.deleteClick = callback;
    this.element.querySelectorAll('.film-details__comment-delete').forEach((button) => {button.addEventListener('click', this.#deleteBtnClickHandler);});
  };

  setCloseBtnClickHandler = (callback) => {
    this._callback.closeClick = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeBtnClickHandler);
  };

  setAddToWatchlistHandler = (callback) => {
    this._callback.addToWatchlistClick = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#addToWatchlistClickHandler);
  };

  setMarkAsWatchedHandler = (callback) => {
    this._callback.markAsWatchedClick = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#markAsWatchedClickHandler);
  };

  setFavoriteHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#favoriteClickHandler);
  };

  #addCommentKeydown = (evt) => {
    if(evt.ctrlKey && evt.key === 'Enter') {
      this._callback.addComment({
        author: this._state.comment.author,
        comment: this._state.comment,
        date: new Date(),
        emotion: this._state.checkedEmotion
      });
    }
  };

  #deleteBtnClickHandler = (evt) => {
    evt.preventDefault();
    this.#updateViewData();
    this._callback.deleteClick(evt.target.dataset.id);
  };

  #addToWatchlistClickHandler = (evt) => {
    evt.preventDefault();
    this.#updateViewData();
    this._callback.addToWatchlistClick();
  };

  #markAsWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this.#updateViewData();
    this._callback.markAsWatchedClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#updateViewData();
    this._callback.favoriteClick();
  };

  #closeBtnClickHandler = (evt) => {
    evt.preventDefault();
    this.#updateViewData();
    this._callback.closeClick();
  };

  #emotionClickHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      checkedEmotion: evt.currentTarget.dataset.emotionType,
      scrollPosition: this.element.scrollTop
    });
    this.#updateViewData();
  };

  #commentInputChangeHandler = (evt) => {
    evt.preventDefault();
    this._setState({comment: evt.target.value});
    this.#updateViewData();
  };

  #setInnerHandlers = () => {
    this.element.querySelectorAll('.film-details__emoji-label').forEach((element) => {
      element.addEventListener('click', this.#emotionClickHandler);
    });
    this.element.querySelector('.film-details__comment-input').addEventListener('input', this.#commentInputChangeHandler);
  };

  #updateViewData = () => {
    this.updateViewData({
      emotion: this._state.checkedEmotion,
      comment: this._state.comment,
      scrollPosition: this.element.scrollTop
    });
  };

  static parseFilmToState = (
    film,
    comments,
    checkedEmotion = null,
    comment = null,
    scrollPosition = 0,
  ) => ({
    ...film,
    comments,
    checkedEmotion,
    comment,
    scrollPosition
  });
}
