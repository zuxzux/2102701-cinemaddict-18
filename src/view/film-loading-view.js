import AbstractView from '../framework/view/abstract-view.js';

const createFilmLoadingTemplate = (text) => (
  `<section class="films-list">
  <h2 class="films-list__title">${text}</h2>
  </section>`
);

export default class FilmLoadingView extends AbstractView {
  #text = 'Loading...';

  constructor(text) {
    super();
    this.#text = text;
  }

  get template() {
    return createFilmLoadingTemplate(this.#text);
  }
}
