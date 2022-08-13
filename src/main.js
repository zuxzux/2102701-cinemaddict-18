/*import ListFilterView from './view/list-filter-view.js';
import ListSortView from './view/list-sort-view.js';
import UserRatingView from './view/user-rating-view.js';
import ShowMoreButtonView from './view/showmore-button-view.js';
import FilmCardView from './view/film-card-view.js';*/

import ContentPresenter from './presenter/content-presenter.js';

import {render} from './render.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');

/*render(new ListFilterView(), siteMainElement);
render(new ListSortView(), siteMainElement);
render(new UserRatingView(), siteHeaderElement);
render(new FilmCardView(), siteMainElement);
render(new ShowMoreButtonView(), siteMainElement);*/

const contentPresenter = new ContentPresenter();

contentPresenter.init(siteMainElement);

