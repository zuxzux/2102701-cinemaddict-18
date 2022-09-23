import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../mock/const.js';

const createListSortTemplate = (currentSortType) => (
  `<ul class="sort">
  <li><a href="#" class="sort__button ${currentSortType === SortType.DEFAULT ? 'sort__button--active' : ''}" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
  <li><a href="#" class="sort__button ${currentSortType === SortType.DATE_UP ? 'sort__button--active' : ''}" data-sort-type="${SortType.DATE_UP}">Sort by date</a></li>
  <li><a href="#" class="sort__button ${currentSortType === SortType.RATING_UP ? 'sort__button--active' : ''}" data-sort-type="${SortType.RATING_UP}">Sort by rating</a></li>
</ul>`
);

export default class ListSortView extends AbstractView {
  #currentSortType = null;

  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  get template() {
    return createListSortTemplate(this.#currentSortType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}
