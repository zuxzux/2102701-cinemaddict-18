import ListFilterView from '../view/list-filter-view.js';
import { generateFilter } from '../utils.js';
import { render, replace, remove } from '../framework/render.js';

export default class FilterPresenter {
  #filterComponent = null;
  #filterModel = null;
  #filterContainer = null;
  #filmsModel = null;

  constructor(filterContainer, filmsModel, filterModel) {
    this.#filterContainer = filterContainer;
    this.#filmsModel = filmsModel;
    this.#filterModel = filterModel;
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init() {
    const filters = generateFilter(this.#filmsModel.films);

    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new ListFilterView(filters, this.#filterModel.filter);
    this.#filterComponent.setFilterTypeChangeHandler(this.#filterTypeChangeHandler);
    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #filterTypeChangeHandler = (filterType) => {
    if(this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(filterType);

  };

  #handleModelEvent = () => {
    this.init();
  };

}
