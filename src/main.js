import ContentPresenter from './presenter/content-presenter.js';

const siteMainElement = document.querySelector('.main');

const contentPresenter = new ContentPresenter();

contentPresenter.init(siteMainElement);

