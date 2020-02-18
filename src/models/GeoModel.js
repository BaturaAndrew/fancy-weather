/* eslint-disable indent */
/* eslint-disable no-undef */
export default class Geo {
  constructor(city) {
    this.city = city;
  }

  static async getGeoCoord(city) {
    const coord = await ymaps.geocode(city, {
        results: 1,
      })
      .then((res) => {
        const firstGeoObject = res.geoObjects.get(0);
        if (firstGeoObject !== undefined) {
          return firstGeoObject.geometry.getCoordinates();
        }
        return firstGeoObject;
      });
    if (coord !== undefined) return coord;
    return false;
  }

  static async getCountry(coord) {
    const response = await ymaps.geocode(coord, {
      results: 1,
    }).then(res => res);

    return response.geoObjects.get(0).properties._data
      .metaDataProperty.GeocoderMetaData.Address.Components[0].name;
  }
}
