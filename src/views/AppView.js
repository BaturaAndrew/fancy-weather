import renderHeader from './HeaderView';
import renderSpeechBtn from './SpeechBtnView';

import renderTodayWeatherBlock from './TodayWeatherView';
import renderThreeDaysWeatherBlock from './ThreeDayWeatherView';
import Map from './MapView';
import renderCoordBlock from './CoordView';

import getLangMap from '../lang/getLangMap';
import translate from '../helpers/translate';

export default class AppView {
  constructor(imageUrl, country, city, date, weather, coord, timezome, lang) {
    this.country = country;
    this.city = city;
    this.imageUrl = imageUrl;
    this.date = date;
    this.weather = weather;
    this.coord = coord;
    this.timezome = timezome;
    this.lang = lang;
    this.langMap = {};
  }

  static initPage() {
    const preload = document.createElement('div');
    preload.className = 'preloader';
    preload.innerHTML = '<div class="b-ico-preloader"></div><div class="spinner"></div>';
    document.body.appendChild(preload);

    const wrap = document.createElement('div');
    wrap.className = 'wrap';

    wrap.appendChild(renderHeader());
    document.body.appendChild(wrap);
    renderSpeechBtn();
  }

  static clearPage() {
    const main = document.querySelector('.main');
    if (main) {
      main.remove();
    }
  }

  static clearWeather() {
    const weather = document.querySelector('.weather');
    if (weather) {
      weather.remove();
    }
  }

  async changeLang(lang) {
    this.langMap = await getLangMap(lang);

    const inputSearch = document.querySelector('.search-input');
    inputSearch.placeholder = this.langMap.placeholder;

    const btnSearch = document.querySelector('.search');
    btnSearch.innerHTML = this.langMap.btn;


    const twCity = document.querySelector('.today-weather__city');
    const nameCity = await translate(twCity.innerHTML, lang);
    twCity.innerHTML = nameCity;

    const twTime = document.querySelector('.today-weather__date');
    twTime.innerHTML = await translate(twTime.innerHTML, lang);

    let dayHeder = document.querySelectorAll('.day__header');
    dayHeder = Array.prototype.slice.call(dayHeder);
    dayHeder.forEach(async (el) => {
      // eslint-disable-next-line no-param-reassign
      el.innerHTML = await translate(el.innerHTML, lang);
    });


    const feels = document.querySelector('.feels');
    feels.innerHTML = `${this.langMap.feels} ${this.weather.feels}°`;
    const wind = document.querySelector('.wind');
    wind.innerHTML = `${this.langMap.wind} ${this.weather.wind} ${this.langMap.windspeed}`;
    const humidity = document.querySelector('.humidity');
    humidity.innerHTML = `${this.langMap.humidity} ${this.weather.humidity}%`;

    const lat = document.querySelector('.lat');
    lat.innerHTML = `${this.langMap.lat} ${this.coord[0]}`;
    const lon = document.querySelector('.lon');
    lon.innerHTML = `${this.langMap.lon} ${this.coord[1]}`;

    return true;
  }


  static refreshBackgroundImg(imageUrl) {
    const wrap = document.querySelector('.wrap');
    wrap.style.backgroundImage = `url(${imageUrl})`;
  }

  static refreshTime(time) {
    const twTime = document.querySelector('.today-weather__time');
    twTime.innerHTML = time;
  }

  static renderError(msg) {
    AppView.clearPage();
    const header = document.querySelector('header');
    header.remove();
    const wrap = document.querySelector('.wrap');
    wrap.remove();


    const error = document.createElement('div');
    error.className = 'error flex-column';


    const errorHearer = document.createElement('h2');
    errorHearer.innerHTML = 'Something wrong. Please, restart page';
    const errorMessage = document.createElement('p');
    errorMessage.innerHTML = msg;

    error.appendChild(errorHearer);
    error.appendChild(errorMessage);

    document.body.appendChild(error);

    const preload = document.querySelector('.preloader');
    preload.style.display = 'none';
  }

  renderPage() {
    AppView.clearPage();

    const wrap = document.querySelector('.wrap');
    wrap.style.backgroundImage = `url(${this.imageUrl})`;
    wrap.appendChild(this.renderMainBlock());
    document.body.appendChild(wrap);
    Map.renderMap(this.coord);

    const preload = document.querySelector('.preloader');
    preload.style.display = 'none';
  }

  renderWeather() {
    AppView.clearWeather();

    const main = document.querySelector('.main');
    main.prepend(this.renderWeatherBlock());
  }

  renderMainBlock() {
    const main = document.createElement('main');
    main.className = 'main flex-row';

    const location = document.createElement('div');
    location.className = 'location flex-column';
    const map = document.createElement('div');
    map.id = 'map';
    location.appendChild(map);
    location.appendChild(renderCoordBlock(this.coord));

    main.appendChild(this.renderWeatherBlock());
    main.appendChild(location);
    return main;
  }

  renderWeatherBlock() {
    const weather = document.createElement('div');
    weather.className = 'weather';

    const todayWeather = renderTodayWeatherBlock(this);
    const threeDaysBlock = renderThreeDaysWeatherBlock(this.weather);

    weather.appendChild(todayWeather);
    weather.appendChild(threeDaysBlock);

    const location = document.createElement('div');
    location.className = 'location';
    const map = document.createElement('div');
    map.id = 'map';
    location.appendChild(map);

    return weather;
  }
}
