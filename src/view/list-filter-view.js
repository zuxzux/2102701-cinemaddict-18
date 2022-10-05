import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../mock/const.js';

const createFilterItemTemplate = (filter, filterType) => {
  const {name, count, type} = filter;
  return (
    `<a href=#${name} class="main-navigation__item ${filterType === type ? 'main-navigation__item--active' : ''}" data-filter-type="${type}">${name}${type === 'All movies' ? '' : `<span class="main-navigation__item-count" data-filter-type="${type}">${count}</span>`}</a>`
  );
};

const createListFilterTemplate = (filterItems, filterType) => {
  const filterItemsTemplate = filterItems.map((filter) => createFilterItemTemplate(filter, filterType)).join('');
  return (
    `<nav class="main-navigation">${filterItemsTemplate}</nav>`
  );
};

export default class ListFilterView extends AbstractView {
  #filters = null;

  #filterType = FilterType.ALL;
  constructor(filters, filterType) {
    super();
    this.#filters = filters;
    this.#filterType = filterType;
  }

  get template() {
    return createListFilterTemplate(this.#filters, this.#filterType);

  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A' && !evt.target.classList.contains('main-navigation__item-count')) {
      return;
    }

    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.filterType);
  };
}
