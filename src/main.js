'use strict';

// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41633304-c06bc91ac11626a6cec46e525';

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
      console.log(data);
      list.innerHTML = createMarkup(data.hits);
    })
    .catch(error => {
      console.log(error);
      list.innerHTML = '<h1>Something went wrong. Please try again.</h1>';
    });

  form.reset();
}

function searchPhotos(search = '') {
  const params = new URLSearchParams({
    key: API_KEY,
    q: search,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  return fetch(`${BASE_URL}?${params}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

function createMarkup(arr) {
  if (!arr.length) {
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      position: 'bottomRight',
    });
    return '';
  }
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class = "gallery-item"><a class = "gallery-link" href = "${largeImageURL}"><img class = "gallery-image" src=${webformatURL} alt="${tags}"></a>
            <div class="social-activity">
            <ul class="social-activity-list">
            <li class="social-activity-list-item">Likes <span class="number">${likes}</span></li>
            <li class="social-activity-list-item">Views <span class="number"> ${views}</span></li>
            <li class="social-activity-list-item">Comments <span class="number"> ${comments}</span></li>
            <li class="social-activity-list-item">Downloads <span class="number">${downloads}</span></li>
            </ul>
            </div>
          </li>`
    )
    .join('');
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
