import FilmCardView from '../view/film-card-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import { render, replace, remove } from '../framework/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  OPENED: 'OPENED',
};

export default class FilmPresenter {
  #filmListContainer = null;
  #comments = null;
  #film = null;
  #filmComponent = null;
  #filmDetailsComponent = null;
  #changeData = null;
  #changeMode = null;
  #mode = Mode.DEFAULT;

  #viewData = {
    emotion: null,
    comment: '',
    scrollPosition: 0
  };

  constructor(filmListContainer, changeData, changeMode) {
    this.#filmListContainer = filmListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (film) => {
    this.#film = film;
    this.#comments = film.comments;

    const prevFilmComponent = this.#filmComponent;
    const prevFilmDetailsComponent = this.#filmDetailsComponent;

    this.#filmComponent = new FilmCardView(this.#film);
    this.#filmDetailsComponent = new FilmDetailsView(this.#film, this.#comments, this.#viewData, this.#updateViewData);


    if(prevFilmComponent === null || prevFilmDetailsComponent === null) {
      render(this.#filmComponent, this.#filmListContainer);
      this.#addOpenClosePopupEventListeners();
      this.#addFiltersButtonsEventListeners();
      return;
    }

    replace(this.#filmComponent, prevFilmComponent);

    if(prevFilmDetailsComponent){
      prevFilmDetailsComponent.updateElement(this.#film);
    } else {
      this.#filmDetailsComponent = new FilmDetailsView(this.#film, this.#comments, this.#viewData, this.#updateViewData);
    }

    if(this.#mode === Mode.OPENED) {
      replace(this.#filmDetailsComponent, prevFilmDetailsComponent);
    }
    this.#filmDetailsComponent.setScrollPosition();

    this.#addOpenClosePopupEventListeners();
    this.#addFiltersButtonsEventListeners();
    remove(prevFilmComponent);
    remove(prevFilmDetailsComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#removePopupHandler();
    }
  };

  #addOpenClosePopupEventListeners = () => {
    this.#filmComponent.setOpenPopupHandler(() => {
      this.#openPopupHandler();
      document.addEventListener('keydown', this.#onEscKeyDown);
    });
    this.#filmDetailsComponent.setCloseBtnClickHandler(() => {
      this.#removePopupHandler();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    });
  };

  #addFiltersButtonsEventListeners = () => {
    this.#filmComponent.setAddToWatchlistHandler(this.#addToWatchlistHandler);
    this.#filmComponent.setMarkAsWatchedHandler(this.#markAsWatchedHandler);
    this.#filmComponent.setFavoriteHandler(this.#favoriteHandler);
    this.#filmDetailsComponent.setAddToWatchlistHandler(this.#addToWatchlistHandler);
    this.#filmDetailsComponent.setMarkAsWatchedHandler(this.#markAsWatchedHandler);
    this.#filmDetailsComponent.setFavoriteHandler(this.#favoriteHandler);
  };

  destroy = () => {
    remove(this.#filmComponent);
    remove(this.#filmDetailsComponent);
  };

  #updateViewData = (viewData) => {
    this.#viewData = {...viewData};
  };

  #openPopupHandler = () => {
    this.#filmListContainer.appendChild(this.#filmDetailsComponent.element);
    document.querySelector('body').classList.add('hide-overflow');
    this.#changeMode();
    this.#mode = Mode.OPENED;
  };

  #removePopupHandler = () => {
    this.#filmListContainer.removeChild(this.#filmDetailsComponent.element);
    document.querySelector('body').classList.remove('hide-overflow');
    this.#mode = Mode.DEFAULT;
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#removePopupHandler();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #addToWatchlistHandler = () => {
    this.#changeData({...this.#film, userDetails:{...this.#film.userDetails, watchlist: !this.#film.userDetails.watchlist}});
  };

  #markAsWatchedHandler = () => {
    this.#changeData({...this.#film, userDetails:{...this.#film.userDetails, alreadyWatched: !this.#film.userDetails.alreadyWatched, watchingDate: Date.now()}});
  };

  #favoriteHandler = () => {
    this.#changeData({...this.#film, userDetails:{...this.#film.userDetails, favorite: !this.#film.userDetails.favorite}});
  };
}
