import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getPicture } from './js/api';
import { createMarkup } from './js/create-markup';

const gallery = document.querySelector('.gallery');

const target = document.querySelector('.js-guard');
const searchform = document.querySelector('.search-form');

searchform.addEventListener('submit', search);
let loadCard = null;

let inputValue = null;
let currentPage = 1;
let options = {
  root: null,
  rootMargin: '300px',
  threshold: 1,
};
const observer = new IntersectionObserver(onScroll, options);

function onScroll(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      onLoad();
    }
  });
}
function onLoad() {
  currentPage += 1;

  getCards(inputValue, currentPage);
}

async function getCards(value, page) {
  try {
    const response = await getPicture(value, page);
    loadCard += response.data.hits.length;

    gallery.insertAdjacentHTML('beforeend', createMarkup(response.data.hits));

    if (loadCard === response.data.totalHits) {
      console.log('finish');
      observer.unobserve(target);
      return;
    }
  } catch (error) {
    // console.log(error.message);
    Notify.Error(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  observer.observe(target);
}

function search(event) {
  event.preventDefault();
  gallery.innerHTML = '';
  currentPage = 1;
  loadCard = 0;

  inputValue = event.currentTarget.elements.searchQuery.value.trim();

  getCards(inputValue);
}
