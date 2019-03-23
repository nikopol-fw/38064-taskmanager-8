// card.js

/**
 *  Создает экземпляр карточки задачи
 *
 * @param {Boolean} isEdit флаг редактируется карточка
 * @param {Boolean} isRepeating флаг задача повторяется
 * @param {Boolean} isDeadline флаг срок выполнения задачи закончился
 * @param {String} color цвет из словаря COLORS_CLASS
 * @param {String} text текст с описанием задачи в карточке
 * @param {Array} hashtags хэштеги карточки
 * @param {String} img имя файла картинки в карточке
 * @param {Number} index индекс от 1 карточки, необходим для создания уникальных id в разметке
 *
 * @return {Node} node-element с содержимым карточки
 */
const getCard = (isEdit, isRepeating, isDeadline, color, text, hashtags, img, index) => {
  // плейсхолдер для поля ввода
  const TEXTAREA_PLACEHOLDER = `Start typing your text here...`;

  // классы для карточек разных цветов
  const COLORS_CLASS = {
    black: `card--black`,
    pink: `card--pink`,
    yellow: `card--yellow`,
    blue: `card--blue`,
    green: `card--green`,
  };

  // строка определяющая дополнительный класс для svg у карточек repeating
  const svgRepeatingClass = isRepeating || isDeadline ? `class="card__color-bar-wave" ` : ``;

  // определяем шаблон с хэштегами
  let hashtagsTemplate = ``;
  hashtags.forEach((item) => {
    const itemTemplate = `<span class="card__hashtag-inner">
      <input type="hidden" name="hashtag" value="repeat" class="card__hashtag-hidden-input">
      <button type="button" class="card__hashtag-name">${item}</button>
      <button type="button" class="card__hashtag-delete">delete</button>
    </span>`;
    hashtagsTemplate += itemTemplate;
  });

  // подставляем картинку по-умолчанию если img не передан
  const imgSrc = img ? img : `add-photo.svg`;

  // определяем дополнительный класс для блока картинки если у карточки картинка отсутсвует
  let imgTemplateClass = img ? `` : ` card__img-wrap--empty`;

  // чекнутые рыба-инпуты
  const checkedNew = index === 1 ? ` checked` : ``;
  const checkedData = index === 4 ? ` checked` : ``;

  const cardTemplate = `<form class="card__from" method="get">
    <div class="card__inner">
      <div class="card__control">
        <button type="button" class="card__btn card__btn--edit">edit</button>
        <button type="button" class="card__btn card__btn--archive">archive</button>
        <button type="button" class="card__btn card__btn--favorites card__btn--disabled">favorites</button>
      </div>

      <div class="card__color-bar">
        <svg ${svgRepeatingClass}width="100%" height="10px">
          <use xlink:href="#wave"></use>
        </svg>
      </div>

      <div class="card__textarea-wrap">
        <label>
          <textarea class="card__text" placeholder="${TEXTAREA_PLACEHOLDER}" name="text">${text}</textarea>
        </label>
      </div>

      <div class="card__settings">
        <div class="card__details">
          <div class="card__dates">
            <button class="card__date-deadline-toggle" type="button">date: <span class="card__date-status">no</span></button>

            <fieldset class="card__date-deadline" disabled>
              <label class="card__input-deadline-wrap">
                <input class="card__date" type="text" placeholder="23 September" name="date"/>
              </label>
              <label class="card__input-deadline-wrap">
                <input class="card__time" type="text" placeholder="11:15 PM" name="time"/>
              </label>
            </fieldset>

            <button class="card__repeat-toggle" type="button">repeat: <span class="card__repeat-status">no</span></button>

            <fieldset class="card__repeat-days" disabled>
              <div class="card__repeat-days-inner">
                <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-mo-${index}" name="repeat" value="mo"/>
                <label class="card__repeat-day" for="repeat-mo-${index}">mo</label>

                <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-tu-${index}" name="repeat" value="tu" checked/>
                <label class="card__repeat-day" for="repeat-tu-${index}">tu</label>

                <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-we-${index}" name="repeat" value="we"/>
                <label class="card__repeat-day" for="repeat-we-${index}">we</label>

                <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-th-${index}" name="repeat" value="th"/>
                <label class="card__repeat-day" for="repeat-th-${index}">th</label>

                <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-fr-${index}" name="repeat" value="fr" checked/>
                <label class="card__repeat-day" for="repeat-fr-${index}">fr</label>

                <input class="visually-hidden card__repeat-day-input" type="checkbox" name="repeat" value="sa" id="repeat-sa-${index}"/>
                <label class="card__repeat-day" for="repeat-sa-${index}">sa</label>

                <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-su-${index}" name="repeat" value="su" checked/>
                <label class="card__repeat-day" for="repeat-su-${index}">su</label>
              </div>
            </fieldset>
          </div>
          <div class="card__hashtag">
            <div class="card__hashtag-list">${hashtagsTemplate}</div>

            <label>
              <input type="text" class="card__hashtag-input" name="hashtag-input" placeholder="Type new hashtag here">
            </label>
          </div>
        </div>

        <label class="card__img-wrap${imgTemplateClass}">
          <input type="file" class="card__img-input visually-hidden" name="img"/>
          <img src="img/${imgSrc}" alt="task picture" class="card__img"/>
        </label>

        <div class="card__colors-inner">
          <h3 class="card__colors-title">Color</h3>
          <div class="card__colors-wrap">
            <input type="radio" id="color-black-${index}" class="card__color-input card__color-input--black visually-hidden" name="color" value="black"${checkedNew}/>
            <label for="color-black-${index}" class="card__color card__color--black">black</label>

            <input type="radio" id="color-yellow-${index}" class="card__color-input card__color-input--yellow visually-hidden" name="color" value="yellow"${checkedData}/>
            <label for="color-yellow-${index}" class="card__color card__color--yellow">yellow</label>

            <input type="radio" id="color-blue-${index}" class="card__color-input card__color-input--blue visually-hidden" name="color" value="blue"/>
            <label for="color-blue-${index}" class="card__color card__color--blue">blue</label>

            <input type="radio" id="color-green-${index}" class="card__color-input card__color-input--green visually-hidden" name="color" value="green"/>
            <label for="color-green-${index}" class="card__color card__color--green">green</label>

            <input type="radio" id="color-pink-${index}" class="card__color-input card__color-input--pink visually-hidden" name="color" value="pink"/>
            <label for="color-pink-${index}" class="card__color card__color--pink">pink</label>
          </div>
        </div>
      </div>

      <div class="card__status-btns">
        <button class="card__save" type="submit">save</button>
        <button class="card__delete" type="button">delete</button>
      </div>
    </div>
  </form>`;

  const card = document.createElement(`article`);
  card.classList.add(`card`);
  if (isEdit) {
    card.classList.add(`card--edit`);
  }
  card.classList.add(COLORS_CLASS[color]);
  if (isRepeating) {
    card.classList.add(`card--repeat`);
  }
  if (isDeadline) {
    card.classList.add(`card--deadline`);
  }
  card.innerHTML = cardTemplate;

  return card;
};


export default getCard;
