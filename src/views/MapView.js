/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
export default class Map {
  static renderMap(coord) {
    ymaps.ready(init);

    function init() {
      const myMap = new ymaps.Map('map', {
        center: [coord[0], coord[1]],
        zoom: 10,
      }, {
        searchControlProvider: 'yandex#search',
      });
    }
  }
}
