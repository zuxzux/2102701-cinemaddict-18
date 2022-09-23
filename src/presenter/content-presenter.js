import ShowMoreButtonView from '../view/showmore-button-view.js';
import FilmListView from '../view/film-list-view.js';
import { updateItem, sortFilmDate, sortFilmRating } from '../utils.js';
import { render, RenderPosition } from '../framework/render.js';
import {FILM_COUNT_PER_STEP} from '../mock/const.js';
import FilmLoadingView from '../view/film-loading-view.js';
import FilmPresenter from './film-presenter.js';
import ListSortView from '../view/list-sort-view.js';
import { SortType } from '../mock/const.js';

export default class ContentPresenter {
  #sortComponent = null;
  #filmListComponent = new FilmListView();
  #contentContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #showMoreButtonComponent = new ShowMoreButtonView();
  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #boardFilms = [];
  #filmLoadingComponent = new FilmLoadingView();
  #filmPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedBoardFilms = [];

  init (contentContainer, filmsModel, commentsModel) {
    this.#contentContainer = contentContainer;
    this.#filmsModel = filmsModel;
    this.#boardFilms = [...this.#filmsModel.films];
    this.#commentsModel = commentsModel;
    this.#sourcedBoardFilms = [...this.#filmsModel.films];

    render(this.#filmListComponent, this.#contentContainer);
    this.#renderSort();
    this.#renderFilms(0, this.#renderedFilmCount);
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
    if (this.#boardFilms.length <= 0) {
      render(this.#filmLoadingComponent, this.#filmListComponent.element);
    } else {
      this.#boardFilms
        .slice(from, to)
        .forEach((film) => this.#renderFilm(film));
      /*for(let i = 0; i < Math.min(this.#boardFilms.length, FILM_COUNT_PER_STEP); i++) {
        this.#renderFilm(this.#boardFilms[i]);
      }*/

      if (this.#boardFilms.length > FILM_COUNT_PER_STEP) {
        render(this.#showMoreButtonComponent, this.#contentContainer);

        this.#showMoreButtonComponent.setClickHandler(this.#handlerShowMoreButtonClick);
      }
    }
  };

  #handleModeChange = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetView());
  };

  #clearFilmList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedFilmCount = FILM_COUNT_PER_STEP;
    //remove(this.#showMoreButtonComponent);
  };

  #handleFilmChange = (updatedFilm) => {
    this.#boardFilms = updateItem(this.#boardFilms, updatedFilm);
    this.#sourcedBoardFilms = updateItem(this.#sourcedBoardFilms, updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm);
  };

  #sortFilm = (sortType) => {
    switch (sortType) {
      case SortType.DATE_UP:
        this.#boardFilms = this.#boardFilms.slice().sort(sortFilmDate);
        break;
      case SortType.RATING_UP:
        this.#boardFilms = this.#boardFilms.slice().sort(sortFilmRating);
        break;
      default:
        this.#boardFilms = [...this.#sourcedBoardFilms];
    }


    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortFilm(sortType);
    this.#renderSort();
    this.#clearFilmList();
    this.#renderFilms(0, this.#renderedFilmCount);
    render(this.#showMoreButtonComponent);
  };

  #renderSort = () => {
    if(this.#sortComponent){
      this.#sortComponent.element.remove();
      this.#sortComponent.removeElement();
    }
    this.#sortComponent = new ListSortView(this.#currentSortType);
    render(this.#sortComponent, this.#filmListComponent.element, RenderPosition.BEFOREBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };
}
