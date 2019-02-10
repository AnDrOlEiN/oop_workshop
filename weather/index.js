import axios from 'axios';
import Utils from '../utils';

export class DarkSkyService {
  constructor() {
    this.url = Utils.darkSkyURL;
    this.apiKey = Utils.darkSkyKey;
  }

  getWeather(lat, lon) {
    const finalURL = `${this.url}${this.apiKey}/${lat},${lon}`;
    return axios.get(finalURL);
  }
}

export class OWMService {
  constructor() {
    this.url = Utils.OWMURL;
    this.apiKey = Utils.OWMKey;
  }

  getWeather(lat, lon) {
    const finalURL = `${this.url}?lat=${lat}&lon=${lon}&APPID=${this.apiKey}`;
    console.log(finalURL);
    return axios.get(finalURL);
  }
}

const defaultLocate = city => axios.get(Utils.geocodingServiceURL, {
  params: {
    key: Utils.geocodingServiceToken,
    q: city,
    format: 'json',
  },
});

export default class WeatherCollector {
  constructor(service, locator = defaultLocate) {
    this.service = service;
    this.locator = locator;
  }

  /* eslint-disable class-methods-use-this */
  getCityCoordinates(city) {
    return this.locator(city);
  }

  async collectWeather(city) {
    const result = await this.getCityCoordinates(city);
    if (!result || result.length === 0) {
      throw Error('There is no such city');
    }
    const { lat, lon } = result.data[0];
    const finalResult = await this.service.getWeather(lat, lon);
    return finalResult.data;
  }
}
