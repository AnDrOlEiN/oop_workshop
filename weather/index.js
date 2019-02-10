import axios from 'axios';
import Utils from '../utils';

const defaultHTTPClient = (url, options) => axios.get(url, options);
export class GeocodingService {
  constructor(httpClient = defaultHTTPClient) {
    this.httpClient = httpClient;
  }

  locate = city => this.httpClient(Utils.geocodingServiceURL, {
    params: {
      key: Utils.geocodingServiceToken,
      q: city,
      format: 'json',
    },
  });
}
const defaultGeocodingService = new GeocodingService().locate;

export class DarkSkyService {
  constructor(httpClient = defaultHTTPClient, locator = defaultGeocodingService) {
    this.httpClient = httpClient;
    this.locator = locator;
    this.url = Utils.darkSkyURL;
    this.apiKey = Utils.darkSkyKey;
  }

  async getCityCoordinates(city) {
    const result = await this.locator(city);
    const parsedResult = result.data[0];
    return parsedResult;
  }

  async getWeather(city) {
    const { lat, lon } = await this.getCityCoordinates(city);
    const finalURL = `${this.url}${this.apiKey}/${lat},${lon}`;
    const result = await this.httpClient(finalURL);
    return result.data;
  }
}

export class OWMService {
  constructor(httpClient = defaultHTTPClient, locator = defaultGeocodingService) {
    this.httpClient = httpClient;
    this.locator = locator;
    this.url = Utils.OWMURL;
    this.apiKey = Utils.OWMKey;
  }

  async getCityCoordinates(city) {
    const result = await this.locator(city);
    const parsedResult = result.data[0];
    return parsedResult;
  }

  async getWeather(city) {
    const { lat, lon } = await this.getCityCoordinates(city);
    const finalURL = `${this.url}?lat=${lat}&lon=${lon}&APPID=${this.apiKey}`;
    const result = await this.httpClient(finalURL);
    return result.data;
  }
}

export default class WeatherCollector {
  constructor(service) {
    this.service = service;
  }

  async collectWeather(city) {
    const finalResult = await this.service.getWeather(city);
    if (!finalResult) {
      throw Error('There is no such city');
    }
    return finalResult;
  }
}
