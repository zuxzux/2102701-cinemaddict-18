import ContentPresenter from './presenter/content-presenter.js';
import { render } from './framework/render.js';
import UserRatingView from './view/user-rating-view.js';
import FilmsModel from './model/films-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');

const filmsModel = new FilmsModel();
const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter(siteMainElement, filmsModel, filterModel);
const contentPresenter = new ContentPresenter(siteMainElement, filmsModel, filterModel, filterPresenter);

render(new UserRatingView, siteHeaderElement);
filterPresenter.init();
contentPresenter.init();

