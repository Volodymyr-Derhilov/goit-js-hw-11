'use strict';

import searchPhotos from './js/pixabay-api';
import createMarkup from './js/render-functions';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const list = document.querySelector('.js-list');
const button = document.querySelector('.form button');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const { search } = event.target.elements;
  if (!search) {
    return;
  }

  list.innerHTML = '<div class="loader"></div></h1>';

  searchPhotos(search.value)
    .then(data => {
      list.innerHTML = createMarkup(data.hits);
    })
    .catch(error => {
      console.log(error);
      list.innerHTML = '<h1>Something went wrong. Please try again.</h1>';
    });

  form.reset();
}

list.addEventListener('click', event => {
  event.preventDefault();
  const elem = event.target;
  if (!elem.tagName === 'IMG' || event.currentTarget === elem) {
    return;
  }
  const lightbox = new SimpleLightbox('.gallery-item a');
  lightbox.refresh();
});
