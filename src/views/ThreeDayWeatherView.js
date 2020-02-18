import {
  getnotTodayDate,
} from '../helpers/getDate';

export default function renderThreeDaysWeatherBlock(weather) {
  const threeDaysBlock = document.createElement('div');
  threeDaysBlock.className = 'three-days flex-row';

  for (let i = 0; i < 3; i += 1) {
    const day = renderAnotherDayWeatherBlocks(weather, i);
    threeDaysBlock.appendChild(day);
  }

  return threeDaysBlock;
}

function renderAnotherDayWeatherBlocks(weather, i) {
  const day = document.createElement('div');
  day.className = 'day';

  const dayHeader = document.createElement('p');
  dayHeader.className = 'day__header';
  dayHeader.innerHTML = getnotTodayDate('ru', 'dddd', i);

  const dayTemp = document.createElement('div');
  dayTemp.className = 'day__temp flex-row';

  const dayPicture = document.createElement('img');
  dayPicture.className = 'day__picture';
  dayPicture.src = weather.day[i].icon; // arg

  const dayDeg = document.createElement('p');
  dayDeg.innerHTML = `${weather.day[i].temp}°`; // arg

  dayTemp.appendChild(dayPicture);
  dayTemp.appendChild(dayDeg);

  day.appendChild(dayHeader);
  day.appendChild(dayTemp);
  return day;
}
