import ListFilterView from '../view/list-filter-view.js';
import ListSortView from '../view/list-sort-view.js';
import UserRatingView from '../view/user-rating-view.js';
import ShowMoreButtonView from '../view/showmore-button-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import { render } from '../render.js';

export default class ContentPresenter {
  filmListComponent = new FilmListView();

  init (contentContainer) {
    this.contentContainer = contentContainer;

    render(this.filmListComponent, this.contentContainer);
    render(new UserRatingView(), this.filmListComponent.getElement());
    render(new ListFilterView(), this.filmListComponent.getElement());
    render(new ListSortView(), this.filmListComponent.getElement());
    render(new FilmDetailsView(), this.filmListComponent.getElement());

    for(let i = 0; i < 5; i++) {
      render(new FilmCardView(), this.filmListComponent.getElement());
    }

    render(new ShowMoreButtonView(), this.filmListComponent.getElement());
  }
}
