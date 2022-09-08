import AbstractView from '../framework/view/abstract-view.js';

const createFilmLoadingTemplate = () => (
  `<section class="films-list">
  <h2 class="films-list__title">Loading...</h2>
  </section>`
);

export default class FilmLoadingView extends AbstractView {

  get template() {
    return createFilmLoadingTemplate();
  }
}
