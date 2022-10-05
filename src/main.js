import ContentPresenter from './presenter/content-presenter.js';
import { render } from './framework/render.js';
import UserRatingView from './view/user-rating-view.js';
import FilmsModel from './model/films-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
import FilmsApiService from './films-api-service.js';
import CommentsApiService from './comment-api-service.js';
import CommentsModel from './model/comments-model.js';

const AUTHORIZATION = 'Basic alrib56naerbin';
const END_POINT = 'https://18.ecmascript.pages.academy/cinemaddict/';


const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const commentsApiService = new CommentsApiService(END_POINT, AUTHORIZATION);
const filmsModel = new FilmsModel(new FilmsApiService(END_POINT, AUTHORIZATION));
const commentsModel = new CommentsModel(filmsModel, commentsApiService);
const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter(siteMainElement, filmsModel, filterModel);
const contentPresenter = new ContentPresenter(siteMainElement, filmsModel, filterModel, filterPresenter, commentsModel);

render(new UserRatingView, siteHeaderElement);
filterPresenter.init();
contentPresenter.init();
filmsModel.init();

