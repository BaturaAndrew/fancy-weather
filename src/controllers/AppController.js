import AppModel from '../models/AppModel';
import AppView from '../views';
import translate from '../helpers/translate';
import getTime from '../helpers/getTime';

export default class App {
  constructor() {
    this.keys = {
      ipToken: '98caa5d632d865',
      unplashAccessKey: '2dbae8af108d75a95a2de95cfc00ccf078729d65a3da4ee33dff81818d2c9c24',
      openweathermapKey: '892f7c08f21962e4a589349f4dee67e9',
      translateYandexKey: 'trnsl.1.1.20191211T144223Z.7a1427617ca5d436.b141f0308516674b1674a282f84cba92b8837d84',
      flirckKey: '66ddecf3ddfc4c07a3c7d69bd7b74965',
    };
    AppView.initPage();
    this.model = {};
  }

  async reload(lang) {
    const model = new AppModel(this.keys, lang);
    await model.getIP();
    await model.getWeather();
    await model.getImage();
    if (model.city) {
      model.city = await translate(model.city, 'en');
    }

    if (!model.weather.message) {
      this.model = model;
      const view = new AppView(
        model.imageUrl,
        model.country,
        model.city,
        model.date,
        model.weather,
        model.coord,
        model.timezome,
        model.lang,
      );
      view.renderPage();
    }
  }

  async refreshBackImg() {
    await this.model.getImage();
    AppView.refreshBackgroundImg(this.model.imageUrl);
  }

  async refreshTime() {
    AppView.refreshTime(await getTime(this.model.coord));
  }

  async changeLlang() {
    const selectLang = document.querySelector('.select-lang');
    const selectedlang = selectLang.options[selectLang.selectedIndex].value;
    this.model.lang = selectedlang;
    const view = new AppView(
      this.model.imageUrl,
      this.model.country,
      this.model.city,
      this.model.date,
      this.model.weather,
      this.model.coord,
      this.model.timezome,
      this.model.lang,
    );
    await view.changeLang(selectedlang);
  }

  renderTemperature(convert) {
    this.model.weather.temp = convert(this.model.weather.temp);
    this.model.weather.feels = convert(this.model.weather.feels);
    for (let i = 0; i < 3; i += 1) {
      this.model.weather.day[i].temp = convert(this.model.weather.day[i].temp);
    }

    const view = new AppView(
      this.model.imageUrl,
      this.model.country,
      this.model.city,
      this.model.date,
      this.model.weather,
      this.model.coord,
      this.model.timezome,
      this.model.lang,
    );
    view.renderWeather(this.model.weather);
  }
}
