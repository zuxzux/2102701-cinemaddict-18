import ShowMoreButtonView from '../view/showmore-button-view.js';
import FilmListView from '../view/film-list-view.js';
import {sortFilmDate, sortFilmRating, filter } from '../utils.js';
import { render, RenderPosition } from '../framework/render.js';
import {FILM_COUNT_PER_STEP, FilterType, LoadigText} from '../mock/const.js';
import FilmLoadingView from '../view/film-loading-view.js';
import FilmPresenter from './film-presenter.js';
import ListSortView from '../view/list-sort-view.js';
import { SortType } from '../mock/const.js';
export default class ContentPresenter {
  #sortComponent = null;
  #filterPresenter = null;
  #filterType = FilterType.ALL.toLowerCase();
  #filterModel = null;
  #filmListComponent = new FilmListView();
  #contentContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #showMoreButtonComponent = null;
  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #filmLoadingComponent = null;
  #filmPresenter = new Map();
  #currentSortType = SortType.DEFAULT;

  constructor (contentContainer, filmsModel, filterModel, filterPresenter) {
    this.#contentContainer = contentContainer;
    this.#filmsModel = filmsModel;
    this.#filterModel = filterModel;
    this.#filterPresenter = filterPresenter;

    this.#filterModel.addObserver(this.#handleFilterTypeChange);
  }

  get films() {
    this.#filterType = this.#filterModel.filter.toLowerCase();
    const films = this.#filmsModel.films;
    const filteredFilms = filter[this.#filterType](films);

    switch (this.#currentSortType) {
      case SortType.DATE_UP:
        return filteredFilms.sort(sortFilmDate);
      case SortType.RATING_UP:
        return filteredFilms.sort(sortFilmRating);
      default:
        return filteredFilms;
    }
  }

  init () {
    render(this.#filmListComponent, this.#contentContainer);
    this.#renderSort();
    this.#renderFilms(this.films);
  }

  #handlerShowMoreButtonClick = () => {
    this.films
      .slice(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilm(film));

    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.films.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  #renderFilm = (film) => {
    const filmPresenter = new FilmPresenter(this.#filmListComponent.element, this.#handleFilmChange, this.#handleModeChange);
    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  };

  #renderFilms = (films) => {
    this.#showMoreButtonComponent = new ShowMoreButtonView();
    this.#filmLoadingComponent = new FilmLoadingView(LoadigText[this.#filterType.toUpperCase()]);
    this.#filterPresenter.init();
    if (films.length <= 0) {
      render(this.#filmLoadingComponent, this.#filmListComponent.element);
    } else {
      const tmpFilms = films.slice(0, Math.min(films.length, FILM_COUNT_PER_STEP));
      tmpFilms.forEach((film) => this.#renderFilm(film));

      if (films.length > FILM_COUNT_PER_STEP) {
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
    this.#filmLoadingComponent.element.remove();
    this.#filmLoadingComponent.removeElement();
    this.#filmLoadingComponent = null;
    this.#showMoreButtonComponent.element.remove();
    this.#showMoreButtonComponent.removeElement();
    this.#showMoreButtonComponent = null;
  };

  #handleFilmChange = (updatedFilm) => {
    this.#filmsModel.update(updatedFilm);
    this.#filterPresenter.init();
    if(this.#filterType !== FilterType.ALL.toLowerCase()) {
      this.#clearFilmList();
      this.#renderFilms(this.films);
      return;
    }
    if(this.#filmPresenter.get(updatedFilm.id)) {
      this.#filmPresenter.get(updatedFilm.id).init(updatedFilm);
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#renderSort();
    this.#clearFilmList();
    this.#renderFilms(this.films);
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

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterType === filterType) {
      return;
    }

    this.#filterType = filterType;
    this.#clearFilmList();
    this.#renderFilms(this.films);
  };

}
