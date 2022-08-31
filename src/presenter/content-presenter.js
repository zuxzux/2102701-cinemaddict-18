
import ShowMoreButtonView from '../view/showmore-button-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import { render } from '../render.js';


export default class ContentPresenter {
  filmListComponent = new FilmListView();

  init (contentContainer, filmsModel, commentsModel) {
    this.contentContainer = contentContainer;
    this.filmsModel = filmsModel;
    this.boardFilms = [...this.filmsModel.getFilms()];
    this.commentsModel = commentsModel;
    const comments = [...this.commentsModel.getComments()];

    render(this.filmListComponent, this.contentContainer);

    for(let i = 0; i < this.boardFilms.length; i++) {
      render(new FilmCardView(this.boardFilms[i]), this.filmListComponent.getElement());
    }
    render(new FilmDetailsView(this.boardFilms[0], comments), this.filmListComponent.getElement());
    render(new ShowMoreButtonView(), this.filmListComponent.getElement());
  }
}
