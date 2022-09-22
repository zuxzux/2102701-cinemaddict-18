import ShowMoreButtonView from '../view/showmore-button-view.js';
import FilmListView from '../view/film-list-view.js';
import { updateItem } from '../utils.js';
import { remove, render } from '../framework/render.js';
import {FILM_COUNT_PER_STEP} from '../mock/const.js';
import FilmLoadingView from '../view/film-loading-view.js';
import FilmPresenter from './film-presenter.js';

export default class ContentPresenter {
  #filmListComponent = new FilmListView();
  #contentContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #showMoreButtonComponent = new ShowMoreButtonView();
  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #boardFilms = [];
  #filmLoadingComponent = new FilmLoadingView();
  #filmPresenter = new Map();

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

        this.#showMoreButtonComponent.setClickHandler(this.#handlerShowMoreButtonClick);
      }
    }
  }

  #handlerShowMoreButtonClick = () => {
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
    const filmPresenter = new FilmPresenter(this.#filmListComponent.element, this.#handleFilmChange, this.#handleModeChange);
    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  };

  #renderFilms = (from, to) => {
    this.#boardFilms
      .slice(from, to)
      .forEach((film) => this.#renderFilm(film));
  };

  #handleModeChange = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetView());
  };

  #clearFilmList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this.#showMoreButtonComponent);
  };

  #handleFilmChange = (updatedFilm) => {
    this.#boardFilms = updateItem(this.#boardFilms, updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm);
  };
}
