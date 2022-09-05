import ShowMoreButtonView from '../view/showmore-button-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import { render } from '../render.js';
import {FILM_COUNT_PER_STEP} from '../mock/const.js';
import FilmLoadingView from '../view/film-loading-view.js';

export default class ContentPresenter {
  #filmListComponent = new FilmListView();
  #contentContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #showMoreButtonComponent = new ShowMoreButtonView();
  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #boardFilms = [];
  #filmLoadingComponent = new FilmLoadingView();

  init (contentContainer, filmsModel, commentsModel) {
    this.#contentContainer = contentContainer;
    this.#filmsModel = filmsModel;
    this.#boardFilms = [...this.#filmsModel.films];
    this.#commentsModel = commentsModel;
    render(this.#filmListComponent, this.#contentContainer);

    if (this.#boardFilms.length <= 0) {
      render(this.#filmLoadingComponent, this.#filmListComponent.element);
    } else {
      for(let i = 0; i < Math.min(this.#boardFilms.length, FILM_COUNT_PER_STEP); i++) {
        this.#renderFilm(this.#boardFilms[i]);
      }

      if (this.#boardFilms.length > FILM_COUNT_PER_STEP) {
        render(this.#showMoreButtonComponent, this.#contentContainer);

        this.#showMoreButtonComponent.element.addEventListener('click', this.#handlerShowMoreButtonClick);
      }
    }
  }

  #handlerShowMoreButtonClick = (evt) => {
    evt.preventDefault();
    this.#boardFilms
      .slice(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilm(film));

    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#boardFilms.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  #renderFilm = (film) => {

    const filmComponent = new FilmCardView(film);
    const comments = [...this.#commentsModel.comments];
    const filmDetailsComponent = new FilmDetailsView(film, comments);

    const replaceCardToPopup = () => {
      this.#filmListComponent.element.appendChild(filmDetailsComponent.element);
      document.querySelector('body').classList.add('hide-overflow');
    };

    const replacePopupToCard = () => {
      this.#filmListComponent.element.removeChild(filmDetailsComponent.element);
      document.querySelector('body').classList.remove('hide-overflow');
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replacePopupToCard();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    filmComponent.element.addEventListener('click', () => {
      replaceCardToPopup();
      document.addEventListener('keydown', onEscKeyDown);
    });

    filmDetailsComponent.element.querySelector('.film-details__close-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      replacePopupToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(filmComponent, this.#filmListComponent.element);
  };
}
