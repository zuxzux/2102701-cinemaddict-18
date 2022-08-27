import ListFilterView from '../view/list-filter-view.js';
import ListSortView from '../view/list-sort-view.js';
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
    const comments = [...this.commentsModel.getComments(this.boardFilms[0])];

    render(this.filmListComponent, this.contentContainer);
    render(new ListFilterView(), this.filmListComponent.getElement());
    render(new ListSortView(), this.filmListComponent.getElement());
    render(new FilmDetailsView(this.boardFilms[0], comments), this.filmListComponent.getElement());

    for(let i = 0; i < this.boardFilms.length; i++) {
      render(new FilmCardView(this.boardFilms[i]), this.filmListComponent.getElement());
    }

    render(new ShowMoreButtonView(), this.filmListComponent.getElement());
  }
}
