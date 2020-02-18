/* eslint-disable no-unused-vars */
/* eslint-disable no-return-await */
/* eslint-disable no-undef */
/* eslint-disable new-cap */
import Geo from '../models/GeoModel';
import translate from './translate';

export default class VoiceRecognition {
  constructor() {
    this.SpeechRecognition = {};
  }

  startRecognizer(app) {
    let result;

    if ('webkitSpeechRecognition' in window) {
      const recognition = new webkitSpeechRecognition();
      this.SpeechRecognition = recognition;
      recognition.lang = 'ru';

      recognition.onresult = async (event) => {
        result = event.results[event.resultIndex];
        const inputEl = document.querySelector('.speech-input');
        let nameCity = result[0].transcript;

        if (nameCity.indexOf('.') !== -1) {
          nameCity = nameCity.slice(0, nameCity.length - 1);
        }
        nameCity = await translate(nameCity, 'en');
        inputEl.value = nameCity;

        let coord;
        if (nameCity !== '') {
          coord = await Geo.getGeoCoord(nameCity);
        }

        if (coord) {
          await app.reload();
        }
      };

      recognition.onend = () => {};

      recognition.start();
    }
    return result;
  }
}
