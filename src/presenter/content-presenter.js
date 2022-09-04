import ShowMoreButtonView from '../view/showmore-button-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import { render } from '../render.js';


export default class ContentPresenter {
  #filmListComponent = new FilmListView();

  #contentContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #boardFilms = null;

  init (contentContainer, filmsModel, commentsModel) {
    this.#contentContainer = contentContainer;
    this.#filmsModel = filmsModel;
    this.#boardFilms = [...this.#filmsModel.films];
    this.#commentsModel = commentsModel;

    render(this.#filmListComponent, this.#contentContainer);

    for(let i = 0; i < this.#boardFilms.length; i++) {
      this.#renderFilm(i);
    }
    //render(new FilmDetailsView(this.#boardFilms[0], comments), this.#filmListComponent.element);

    render(new ShowMoreButtonView(), this.#filmListComponent.element);
  }

  #renderFilm = (filmIndex) => {
    const film = this.#boardFilms[filmIndex];
    const filmComponent = new FilmCardView(film);
    const comments = [...this.#commentsModel.comments];
    const filmDetailsComponent = new FilmDetailsView(film, comments);

    const replaceCardToPopup = () => {
      this.#filmListComponent.element.appendChild(filmDetailsComponent.element);
      document.querySelector('body').classList.add('hide-overflow');
    };

    const replacePopupToCard = () => {
      this.#filmListComponent.element.removeChild(filmDetailsComponent.element);
      document.querySelector('body').classList.remove('hide-overflow');
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replacePopupToCard();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    filmComponent.element.addEventListener('click', () => {
      replaceCardToPopup();
      document.addEventListener('keydown', onEscKeyDown);
    });

    filmDetailsComponent.element.querySelector('.film-details__close-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      replacePopupToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(filmComponent, this.#filmListComponent.element);
  };
}
