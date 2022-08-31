import ContentPresenter from './presenter/content-presenter.js';
import { render } from './render.js';
import UserRatingView from './view/user-rating-view.js';
import FilmsModel from './model/film-model.js';
import CommentsModel from './model/comments-model.js';
import ListFilterView from './view/list-filter-view.js';
import ListSortView from './view/list-sort-view.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();
const contentPresenter = new ContentPresenter();

render(new UserRatingView, siteHeaderElement);
render(new ListFilterView(), siteMainElement);
render(new ListSortView(), siteMainElement);
contentPresenter.init(siteMainElement, filmsModel, commentsModel);
