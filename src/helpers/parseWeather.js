export default function parseWeather(response) {
  const weather = {};
  weather.icon = `https://openweathermap.org/img/wn/${response.list[0].weather[0].icon}@2x.png`;
  weather.fallout = response.list[0].weather[0].main;
  weather.temp = Math.round(response.list[0].main.temp);
  weather.humidity = response.list[0].main.humidity;
  weather.wind = Math.round(response.list[0].wind.speed);
  weather.feels = Math.round(13.12 + 0.6215 * weather.temp
    - 11.37 * (weather.wind ** 0.16)
    + 0.3965 * weather.temp * (weather.wind ** 0.16));

  weather.day = [];
  // take temprature and icon at same time as now
  for (let i = 0; i < 3; i += 1) {
    const dayWeather = {};
    dayWeather.icon = `https://openweathermap.org/img/wn/${response.list[i + 8].weather[0].icon}@2x.png`;
    dayWeather.temp = Math.round(response.list[i + 8].main.temp);
    weather.day.push(dayWeather);
  }
  return weather;
}
