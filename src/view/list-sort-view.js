import AbstractView from '../framework/view/abstract-view.js';

const createListSortTemplate = () => (
  `<ul class="sort">
  <li><a href="#" class="sort__button">Sort by default</a></li>
  <li><a href="#" class="sort__button">Sort by date</a></li>
  <li><a href="#" class="sort__button sort__button--active">Sort by rating</a></li>
</ul>`
);

export default class ListSortView extends AbstractView {

  get template() {
    return createListSortTemplate();
  }
}
