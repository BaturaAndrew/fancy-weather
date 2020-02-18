export default function renderCoordBlock(coord) {
  const coordBlock = document.createElement('div');
  coordBlock.className = 'coord flex-row';

  const latitude = document.createElement('p');
  latitude.className = 'lat';
  latitude.innerHTML = `Latitude: ${coord[0]}`;
  const longitude = document.createElement('p');
  longitude.className = 'lon';
  longitude.innerHTML = `Longitude: ${coord[1]}`;

  coordBlock.appendChild(latitude);
  coordBlock.appendChild(longitude);
  return coordBlock;
}
