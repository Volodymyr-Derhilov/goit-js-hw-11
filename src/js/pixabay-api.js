const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41633304-c06bc91ac11626a6cec46e525';

export default function searchPhotos(search = '') {
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
