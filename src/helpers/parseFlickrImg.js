import AppView from '../views';

export default function parseWeather(response) {
  let url = '';

  try {
    const i = randomInteger(0, response.photos.photo.length - 1);
    url = `https://farm${response.photos.photo[i].farm}.static.flickr.com/${response.photos.photo[i].server}/${response.photos.photo[i].id}_${response.photos.photo[i].secret}_b.jpg`;
  } catch (error) {
    AppView.renderError(`${error}`);
  }
  return url;
}

function randomInteger(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
