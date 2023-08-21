import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const URL_KEY = '38812363-41f197e3d9b9e5aeaebf3cc34';

async function getPicture(value, page = 1) {
  axios.defaults.params = {
    key: URL_KEY,
    q: value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: 40,
  };
  return await axios.get(`${BASE_URL}`);
}

export { getPicture };
