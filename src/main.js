import ContentPresenter from './presenter/content-presenter.js';
import { render } from './render.js';
import UserRatingView from './view/user-rating-view.js';
import FilmsModel from './model/film-model.js';
import CommentsModel from './model/comments-model.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();
const contentPresenter = new ContentPresenter();

render(new UserRatingView, siteHeaderElement);
contentPresenter.init(siteMainElement, filmsModel, commentsModel);
