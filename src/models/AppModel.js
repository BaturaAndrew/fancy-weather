import Geo from './GeoModel';
import getTime from '../helpers/getTime';
import parseWeather from '../helpers/parseWeather';
import parseFlickrImg from '../helpers/parseFlickrImg';
import checkStatus from '../helpers/checkStatus';
import failureCallback from '../helpers/failureCallback';

export default class AppModel {
  constructor(keys, lang) {
    this.keys = keys;
    this.imageUrl = 'https://farm66.static.flickr.com/65535/48691681313_d11a72d71e_b.jpg';
    this.country = '';
    this.city = '';
    this.date = new Date();
    this.timezone = '';
    this.weather = {};
    this.lang = lang;
    this.timezome = '';
  }


  async getIP() {
    const url = `https://ipinfo.io/json?token=${this.keys.ipToken}`;
    const ipInfo = await fetch(url)
      .then(res => checkStatus(res))
      .then(res => res.json())
      .then(data => data)
      .catch(e => failureCallback(e, 'ipinfo'));

    if (ipInfo) {
      this.country = ipInfo.country;
      this.city = ipInfo.city;
    }
  }

  async getImage() {
    const city = AppModel.getCity(this);
    if (!city) return false;

    const {
      fallout,
    } = this.weather;

    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.keys.flirckKey}&tags=${city},${fallout}&tag_mode=all&per_page=50&content_type=1&format=json&nojsoncallback=1`;
    const response = await fetch(url)
      .then(res => checkStatus(res))
      .then(res => res.json())
      .then(data => data)
      .catch(e => failureCallback(e, 'api.flickr'));

    if (response.stat === 'ok' && response.photos.photo.length !== 0) {
      this.imageUrl = parseFlickrImg(response);
    }
    return this.imageUrl;
  }

  async getWeather() {
    const city = AppModel.getCity(this);
    if (!city) {
      this.weather.message = 'City is empty';
      return false;
    }

    this.coord = await Geo.getGeoCoord(city);

    if (this.coord) {
      this.country = await Geo.getCountry(this.coord);
      this.timezome = await getTime(this.coord);
      this.city = city;
    }

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${this.coord[0]}&lon=${this.coord[1]}&units=metric&APPID=${this.keys.openweathermapKey}`;

    const response = await fetch(url)
      .then(res => checkStatus(res))
      .then(res => res.json())
      .catch(e => failureCallback(e, 'api.openweathermap'));


    if (response.cod !== '404') {
      this.weather = parseWeather(response);
    } else {
      this.weather.message = response.message;
    }
    return this.weather;
  }

  static getQuery() {
    const elem = document.querySelector('.search-input');
    return elem.value;
  }

  static getCity(obj) {
    let city = AppModel.getQuery();
    if (!city) {
      ({
        city,
      } = obj);
    }
    if (!city) return false;
    return city;
  }
}
