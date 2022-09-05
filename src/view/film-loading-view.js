import {createElement} from '../render.js';

const createFilmLoadingTemplate = () => (
  `<section class="films-list">
  <h2 class="films-list__title">Loading...</h2>
  </section>`
);

export default class FilmLoadingView {
  #element = null;

  get template() {
    return createFilmLoadingTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
