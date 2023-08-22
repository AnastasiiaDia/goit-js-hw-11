import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getData } from './js/api';
import { createMarkup } from './js/create-markup';

const gallery = document.querySelector('.gallery');
const endpoint = document.querySelector('.endpoint');
const target = document.querySelector('.js-guard');
const searchform = document.querySelector('.search-form');
const loader = document.querySelector(`.loader`);

searchform.addEventListener('submit', search);

let lightBox = new SimpleLightbox('.gallery a');

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

function search(event) {
  event.preventDefault();
  endpoint.hidden = true;
  gallery.innerHTML = '';
  currentPage = 1;
  loadCard = 0;
  inputValue = event.currentTarget.elements.searchQuery.value.trim();
  getCards(inputValue);
}

function onLoad() {
  currentPage += 1;
  getCards(inputValue, currentPage);
}

async function getCards(value, page) {
  try {
    const response = await getData(value, page);
    loadCard += response.data.hits.length;
    loadedPage();
    gallery.insertAdjacentHTML('beforeend', createMarkup(response.data.hits));

    if (response.data.total === 0) {
      Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    if (loadCard === response.data.totalHits) {
      observer.unobserve(target);
      endpoint.hidden = false;
      Notify.info("We're sorry, but you've reached the end of search results.");
      return;
    }
  } catch (error) {
    Notify.Error(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  lightBox.refresh();
  observer.observe(target);
}

function loadedPage() {
  loader.textContent = ``;
  loader.style.display = 'none';
}
