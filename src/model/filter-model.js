import Observable from '../framework/observable.js';
import { FilterType} from '../mock/const.js';

export default class FilterModel extends Observable {
  #filter = FilterType.ALL;

  get filter() {
    return this.#filter;
  }

  setFilter = (update) => {
    this.#filter = update;
    this._notify(update);
  };
}
