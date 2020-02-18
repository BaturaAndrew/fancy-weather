export default async function getTime(coord) {
  const key = '18WHARD25R8O';

  const url = `https://api.timezonedb.com/v2.1/get-time-zone?key=${key}&format=json&by=position&lat=${coord[0]}&lng=${coord[1]}`;
  const response = await fetch(url)
    .then(res => res.json())
    .then(data => data);
  const time = response.formatted;
  const date = new Date(time);

  const hours = date.getHours();
  const mins = date.getMinutes();
  // const secs = date.getSeconds();
  let temp = ((hours < 10) ? '0' : '') + hours;
  temp += ((mins < 10) ? ':0' : ':') + mins;
  // temp += ((secs < 10) ? ':0' : ':') + secs;

  return temp;
}
