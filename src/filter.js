// filter.js

/**
 * Создает разметку фильтра
 *
 * @param {String} id ид для полей фильтра
 * @param {String} name отображаемое имя фильтра
 * @param {String} countClass специальный класс для определенного фильтра (непонятно зачем)
 * @param {Number} count количество карточек для этого фильтра
 *
 * @return {String} разметка одного фильтра
 */
const getFilter = (id, name, countClass, count) => {
  const disabled = count === 0 ? ` disabled` : ``;
  const checked = id === `all` ? ` checked` : ``;
  const template = `<input type="radio" id="filter__${id}" class="filter__input visually-hidden" name="filter"${disabled}${checked}>
  <label for="filter__${id}" class="filter__label">${name} <span class="${countClass}">${count}</span></label>`;

  return template;
};


export default getFilter;
