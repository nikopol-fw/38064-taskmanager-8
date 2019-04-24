// main.js

import getFilter from './filter';
import getCard from './card';


// рыба-текст для подборки тестовых краточек
const TEXTAREA_TEXT = {
  new: `This is example of new task, you can add picture, set date and time, add tags.`,
  repeating: `It is example of repeating task. It marks by wave.`,
  deadling: `This is card with missing deadline`,
  data: `Here is a card with filled data`
};

const filters = [
  {
    id: `all`,
    name: `all`,
    countClass: `filter__all-count`,
    count: 15
  }, {
    id: `overdue`,
    name: `overdue`,
    countClass: `filter__overdue-count`,
    count: 0
  }, {
    id: `today`,
    name: `today`,
    countClass: `filter__today-count`,
    count: 0
  }, {
    id: `favorites`,
    name: `favorites`,
    countClass: `filter__favorites-count`,
    count: 7
  }, {
    id: `repeating`,
    name: `repeating`,
    countClass: `filter__repeating-count`,
    count: 2
  }, {
    id: `tags`,
    name: `tags`,
    countClass: `filter__tags-count`,
    count: 6
  }, {
    id: `archive`,
    name: `archive`,
    countClass: `filter__archive-count`,
    count: 115
  }
];

let filtersTemplate = ``;
filters.forEach((filter) => {
  const filterTemplate = getFilter(filter.id, filter.name, filter.countClass, filter.count);
  filtersTemplate += filterTemplate;
});
const filtersContainer = document.querySelector(`.main__filter`);
filtersContainer.insertAdjacentHTML(`afterBegin`, filtersTemplate);


const cardsList = [{
  isEdit: true,
  isRepeating: false,
  isDeadline: false,
  color: `black`,
  text: TEXTAREA_TEXT[`new`],
  hashtags: []
}, {
  isEdit: false,
  isRepeating: true,
  isDeadline: false,
  color: `pink`,
  text: TEXTAREA_TEXT[`repeating`],
  hashtags: [`#repeat`, `#cinema`, `#entertainment`]
}, {
  isEdit: false,
  isRepeating: false,
  isDeadline: true,
  color: `yellow`,
  text: TEXTAREA_TEXT[`deadling`],
  hashtags: [`#repeat`, `#cinema`, `#entertainment`]
}, {
  isEdit: true,
  isRepeating: true,
  isDeadline: false,
  color: `yellow`,
  text: TEXTAREA_TEXT[`data`],
  hashtags: [`#repeat`, `#cinema`, `#entertainment`],
  img: `sample-img.jpg`
}];

const cardsFragment = document.createDocumentFragment();
cardsList.forEach((item, ind) => {
  const card = getCard(item.isEdit, item.isRepeating, item.isDeadline, item.color, item.text, item.hashtags, item.img, ind + 1);
  cardsFragment.appendChild(card);
});

const taskBoard = document.querySelector(`.board__tasks`);
taskBoard.appendChild(cardsFragment);
