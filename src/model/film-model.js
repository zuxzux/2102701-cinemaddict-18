import { FILM_COUNT } from '../mock/const.js';
import {generateFilm} from '../mock/film.js';

export default class FilmsModel {
  films = Array.from({length: FILM_COUNT}, generateFilm);

  getFilms = () => this.films;
}
