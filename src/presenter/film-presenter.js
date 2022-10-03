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

    if(prevFilmDetailsComponent) {
      prevFilmDetailsComponent.updateElement(this.#film);
    } else {
      this.#createFilmDetailsComponent();
    }

    if(prevFilmComponent === null) {
      render(this.#filmComponent, this.#filmListContainer);
      this.#addOpenPopupEventListeners();
      this.#addFiltersButtonsEventListeners();
      return;
    }

    replace(this.#filmComponent, prevFilmComponent);

    this.#filmDetailsComponent.setScrollPosition();

    this.#addOpenPopupEventListeners();
    this.#addFiltersButtonsEventListeners();
    remove(prevFilmComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#removePopupHandler();
    }
  };

  #createFilmDetailsComponent = () => {
    this.#filmDetailsComponent = new FilmDetailsView(this.#film, this.#comments, this.#viewData, this.#updateViewData);

    this.#filmDetailsComponent.setCloseBtnClickHandler(() => {
      this.#removePopupHandler();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    });
    this.#filmDetailsComponent.setAddToWatchlistHandler(this.#addToWatchlistHandler);
    this.#filmDetailsComponent.setMarkAsWatchedHandler(this.#markAsWatchedHandler);
    this.#filmDetailsComponent.setFavoriteHandler(this.#favoriteHandler);
    this.#filmDetailsComponent.setDeleteClickHandler(this.#deleteClickHandler);
    this.#filmDetailsComponent.setAddCommentHandler(this.#addComment);
  };

  #addComment = (comment) => {
    this.#film.comments.push(comment);
    this.#changeData({...this.#film, comments: this.#film.comments, comment: '', checkedEmotion: ''});

  };

  #addOpenPopupEventListeners = () => {
    this.#filmComponent.setOpenPopupHandler(() => {
      this.#openPopupHandler();
      document.addEventListener('keydown', this.#onEscKeyDown);
    });
  };

  #addFiltersButtonsEventListeners = () => {
    this.#filmComponent.setAddToWatchlistHandler(this.#addToWatchlistHandler);
    this.#filmComponent.setMarkAsWatchedHandler(this.#markAsWatchedHandler);
    this.#filmComponent.setFavoriteHandler(this.#favoriteHandler);
  };

  destroy = () => {
    remove(this.#filmComponent);
    remove(this.#filmDetailsComponent);
  };

  #updateViewData = (viewData) => {
    this.#viewData = {...viewData};
  };

  #openPopupHandler = () => {
    if (!this.#filmDetailsComponent) {
      this.#createFilmDetailsComponent();
    }
    this.#filmListContainer.appendChild(this.#filmDetailsComponent.element);
    document.querySelector('body').classList.add('hide-overflow');
    this.#changeMode();
    this.#mode = Mode.OPENED;
  };

  #removePopupHandler = () => {
    if (this.#filmDetailsComponent) {
      this.#filmDetailsComponent.element.remove();
      this.#filmDetailsComponent.removeElement();
      this.#filmDetailsComponent = null;
    }
    document.querySelector('body').classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.DEFAULT;
    this.#viewData = {
      emotion: null,
      comment: '',
      scrollPosition: 0
    };
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#removePopupHandler();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #deleteClickHandler = (commentId) => {
    this.#changeData({...this.#film, comments: this.#film.comments.filter((comment) => comment.id !== commentId)});
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
