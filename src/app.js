import {
  convertToFarengeit,
  convertToCelsius,
} from './helpers/convertTemp';
import App from './controllers/AppController';
import VoiceRecognition from './helpers/speech-input';
import Geo from './models/GeoModel';

const app = new App();

const inputQuery = document.querySelector('.search-input');
const submitQuery = document.querySelector('.search');
const updateImg = document.querySelector('.update-img');
const buttonTempFar = document.querySelector('.button-fareg');
const buttonTempCel = document.querySelector('.button-cel');
const selectLang = document.querySelector('.select-lang');

selectLang.addEventListener('change', () => {
  const selectedlang = selectLang.options[selectLang.selectedIndex].value;

  app.changeLlang(selectedlang);
});

buttonTempFar.addEventListener('click', () => {
  if (!buttonTempFar.classList.contains('active')) {
    buttonTempFar.classList.add('active');
    buttonTempCel.classList.remove('active');
    app.renderTemperature(convertToFarengeit);
  }
});

buttonTempCel.addEventListener('click', () => {
  if (!buttonTempCel.classList.contains('active')) {
    buttonTempCel.classList.add('active');
    buttonTempFar.classList.remove('active');
    app.renderTemperature(convertToCelsius);
  }
});

updateImg.addEventListener('click', () => {
  app.refreshBackImg();
});

inputQuery.addEventListener('keydown', async (e) => {
  if (e.keyCode === 13) {
    btnResetActive();
    const city = inputQuery.value;
    let coord;
    if (city !== '') {
      coord = await Geo.getGeoCoord(city);
    }

    if (coord) {
      await app.reload();
    }
  }
});

submitQuery.addEventListener('click', async () => {
  btnResetActive();
  const city = inputQuery.value;
  let coord;
  if (city !== '') {
    coord = await Geo.getGeoCoord(city);
  }

  if (coord) {
    await app.reload();
  }
});

window.addEventListener('load', async () => {
  const microphBtn = document.querySelector('.si-btn');
  await app.reload();
  setInterval(() => {
    app.refreshTime.call(app);
  }, 30000);

  microphBtn.addEventListener('click', async (event) => {
    btnResetActive();
    event.preventDefault();

    const inputEl = document.querySelector('.speech-input');
    inputEl.value = '';

    const speech = new VoiceRecognition();
    speech.startRecognizer(app);
  }, false);
});

function btnResetActive() {
  buttonTempCel.classList.add('active');
  buttonTempFar.classList.remove('active');
  selectLang.selectedIndex = 0;
}
