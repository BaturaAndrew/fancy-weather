import {
  getTodayDate,
} from '../helpers/getDate';

export default function renderTodayWeatherBlock(obj) {
  const todayWeather = document.createElement('div');
  todayWeather.className = 'today-weather';

  const twCity = document.createElement('h3');
  twCity.className = 'today-weather__city';
  twCity.innerHTML = `${obj.city}, ${obj.country}`; // arg


  const twDate = document.createElement('p');
  twDate.className = 'today-weather__date';
  twDate.innerHTML = getTodayDate('ru', 'dddd, MMMM DD YYYY');
  const twTime = document.createElement('p');
  twTime.className = 'today-weather__time';
  twTime.innerHTML = obj.timezome;

  const twBlock = document.createElement('div');
  twBlock.className = 'today-weather__temp flex-row';
  const twPicture = document.createElement('img');
  twPicture.className = 'today-weather__picture';
  twPicture.src = obj.weather.icon;
  const twTemp = document.createElement('h2');
  twTemp.innerHTML = `${obj.weather.temp}°`; // arg
  twBlock.appendChild(twPicture);
  twBlock.appendChild(twTemp);


  const addInfo = document.createElement('div');
  addInfo.className = 'add-info';
  const feelsLike = document.createElement('p');
  feelsLike.className = 'feels';
  feelsLike.innerHTML = 'Feels like: ';
  const feelsLikeDeg = document.createElement('span');
  feelsLikeDeg.innerHTML = `${obj.weather.feels}°`; // arg
  feelsLike.appendChild(feelsLikeDeg);

  const wind = document.createElement('p');
  wind.className = 'wind';
  wind.innerHTML = 'Wind: ';
  const windDeg = document.createElement('span');
  windDeg.innerHTML = obj.weather.wind; // arg
  wind.appendChild(windDeg);
  wind.innerText += ' m/s';

  const humidity = document.createElement('p');
  humidity.innerHTML = 'Humidity: ';
  humidity.className = 'humidity';
  const humidityDeg = document.createElement('span');
  humidityDeg.innerHTML = obj.weather.humidity; // arg
  humidity.appendChild(humidityDeg);
  humidity.innerText += ' %';

  addInfo.appendChild(feelsLike);
  addInfo.appendChild(wind);
  addInfo.appendChild(humidity);

  todayWeather.appendChild(twCity);
  todayWeather.appendChild(twDate);
  todayWeather.appendChild(twTime);
  todayWeather.appendChild(twBlock);
  todayWeather.appendChild(addInfo);

  return todayWeather;
}
