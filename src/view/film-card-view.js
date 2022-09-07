import AbstractView from '../framework/view/abstract-view.js';

const createFilmCardTemplate = (film) => {
  const {filmInfo} = film;
  return (
    `<article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${filmInfo.title}</h3>
        <p class="film-card__rating">${filmInfo.totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">1955</span>
          <span class="film-card__duration">${filmInfo.runtime}'m'</span>
          <span class="film-card__genre">${filmInfo.genre}</span>
        </p>
        <img src=${filmInfo.poster} alt="" class="film-card__poster">
        <p class="film-card__description">${filmInfo.description}</p>
        <span class="film-card__comments">18 comments</span>
      </a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched film-card__controls-item--active" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
      </div>
    </article>

  `
  );
};

export default class FilmCardView extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }

  setOpenPopupHandler = (callback) => {
    this._callback.openPopupClick = callback;
    this.element.addEventListener('click', this.#openPopupClickHandler);
  };

  #openPopupClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.openPopupClick();
  };
}
